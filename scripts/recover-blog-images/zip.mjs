/**
 * Minimal dependency-free ZIP reader (central-directory based).
 *
 * Only what recovery needs: list entries and inflate one entry to a Buffer.
 * Handles stored (method 0) and deflate (method 8), which covers every archive
 * produced by Windows Explorer, macOS Archive Utility and standard zip tools.
 */

import fs from "node:fs";
import zlib from "node:zlib";

const EOCD_SIG = 0x06054b50;
const EOCD64_LOCATOR_SIG = 0x07064b50;
const EOCD64_SIG = 0x06064b50;
const CEN_SIG = 0x02014b50;

function findEocd(buf) {
  // EOCD is at most 22 + 65535 bytes from the end.
  const start = Math.max(0, buf.length - (22 + 0xffff));
  for (let i = buf.length - 22; i >= start; i--) {
    if (buf.readUInt32LE(i) === EOCD_SIG) return i;
  }
  return -1;
}

/** Read the central directory. Returns [{ name, method, offset, compressedSize, size }]. */
export function listEntries(zipPath) {
  const buf = fs.readFileSync(zipPath);
  const eocd = findEocd(buf);
  if (eocd < 0) throw new Error("not a zip file (no end-of-central-directory record)");

  let count = buf.readUInt16LE(eocd + 10);
  let cenOffset = buf.readUInt32LE(eocd + 16);

  // ZIP64: the 32-bit fields saturate and the real values live in the ZIP64 EOCD.
  if (cenOffset === 0xffffffff || count === 0xffff) {
    for (let i = eocd - 20; i >= 0; i--) {
      if (buf.readUInt32LE(i) === EOCD64_LOCATOR_SIG) {
        const z64 = Number(buf.readBigUInt64LE(i + 8));
        if (buf.readUInt32LE(z64) === EOCD64_SIG) {
          count = Number(buf.readBigUInt64LE(z64 + 32));
          cenOffset = Number(buf.readBigUInt64LE(z64 + 48));
        }
        break;
      }
    }
  }

  const entries = [];
  let p = cenOffset;

  for (let i = 0; i < count && p + 46 <= buf.length; i++) {
    if (buf.readUInt32LE(p) !== CEN_SIG) break;

    const method = buf.readUInt16LE(p + 10);
    const compressedSize = buf.readUInt32LE(p + 20);
    const size = buf.readUInt32LE(p + 24);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const offset = buf.readUInt32LE(p + 42);
    const name = buf.subarray(p + 46, p + 46 + nameLen).toString("utf8");

    if (!name.endsWith("/")) {
      entries.push({ name, method, offset, compressedSize, size });
    }
    p += 46 + nameLen + extraLen + commentLen;
  }

  return { buffer: buf, entries };
}

/** Inflate a single entry to a Buffer. */
export function readEntry(buf, entry) {
  // The local header repeats name/extra lengths, which may differ from central.
  const lh = entry.offset;
  const nameLen = buf.readUInt16LE(lh + 26);
  const extraLen = buf.readUInt16LE(lh + 28);
  const dataStart = lh + 30 + nameLen + extraLen;
  const raw = buf.subarray(dataStart, dataStart + entry.compressedSize);

  if (entry.method === 0) return Buffer.from(raw);
  if (entry.method === 8) return zlib.inflateRawSync(raw);
  throw new Error(`unsupported zip compression method ${entry.method}`);
}
