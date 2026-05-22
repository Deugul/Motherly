const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '../public');

// Recursively get all files in a directory
function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    return null; // Skip non-images
  }

  const relativePath = path.relative(PUBLIC_DIR, filePath);
  const statsBefore = fs.statSync(filePath);
  const sizeBeforeKB = (statsBefore.size / 1024).toFixed(1);

  try {
    // Read the file into a buffer to prevent Windows EBUSY locking
    const inputBuffer = fs.readFileSync(filePath);
    let pipeline = sharp(inputBuffer);
    const metadata = await pipeline.metadata();

    const isLogo = path.basename(filePath).toLowerCase() === 'logo.png';

    if (isLogo) {
      // Resize logo to 216px width (3x for high-res retina displays of the 72px rendered width)
      pipeline = pipeline.resize({ width: 216, withoutEnlargement: true });
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true });
    } else {
      // For all other images: resize large photos to max 1920px width
      if (metadata.width > 1920) {
        pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
      }

      if (ext === '.png') {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true });
      } else {
        pipeline = pipeline.jpeg({ quality: 78, progressive: true, mozjpeg: true });
      }
    }

    const outputBuffer = await pipeline.toBuffer();
    
    // Only overwrite if the new file is actually smaller
    if (outputBuffer.length < statsBefore.size) {
      fs.writeFileSync(filePath, outputBuffer);
      const statsAfter = fs.statSync(filePath);
      const sizeAfterKB = (statsAfter.size / 1024).toFixed(1);
      const savingsKB = (sizeBeforeKB - sizeAfterKB).toFixed(1);
      const savingsPercent = ((statsBefore.size - statsAfter.size) / statsBefore.size * 100).toFixed(1);
      
      console.log(`[COMPRESSED] ${relativePath}: ${sizeBeforeKB} KB -> ${sizeAfterKB} KB (-${savingsKB} KB, -${savingsPercent}%)`);
      return { before: statsBefore.size, after: statsAfter.size };
    } else {
      console.log(`[SKIPPED] ${relativePath} is already fully optimized: ${sizeBeforeKB} KB`);
      return { before: statsBefore.size, after: statsBefore.size };
    }
  } catch (error) {
    console.error(`[ERROR] Failed to compress ${relativePath}:`, error.message);
    return null;
  }
}

async function run() {
  console.log('Scanning public/ directory for images...');
  const files = getFilesRecursively(PUBLIC_DIR);
  console.log(`Found ${files.length} files. Processing JPEGs and PNGs...\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let compressedCount = 0;

  for (const file of files) {
    const result = await compressImage(file);
    if (result) {
      totalBefore += result.before;
      totalAfter += result.after;
      if (result.after < result.before) {
        compressedCount++;
      }
    }
  }

  const beforeMB = (totalBefore / (1024 * 1024)).toFixed(2);
  const afterMB = (totalAfter / (1024 * 1024)).toFixed(2);
  const savingsMB = (beforeMB - afterMB).toFixed(2);
  const totalPercent = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);

  console.log('\n=============================================');
  console.log(`COMPRESSION SUMMARY:`);
  console.log(`- Images Compressed: ${compressedCount}`);
  console.log(`- Total Initial Size: ${beforeMB} MB`);
  console.log(`- Total Optimized Size: ${afterMB} MB`);
  console.log(`- Total Savings: ${savingsMB} MB (-${totalPercent}%)`);
  console.log('=============================================\n');
}

run();
