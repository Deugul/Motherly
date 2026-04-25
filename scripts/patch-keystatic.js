const fs = require("fs");
const path = require("path");

const files = [
  "node_modules/@keystatic/core/dist/keystatic-core-api-generic.js",
  "node_modules/@keystatic/core/dist/keystatic-core-api-generic.node.js",
];

const OLD_TOKEN_BLOCK = `  const _tokenData = await tokenRes.json();
  let tokenData;
  try {
    tokenData = tokenDataResultType.create(_tokenData);
  } catch {
    return {
      status: 401,
      body: 'Authorization failed'
    };
  }`;

const NEW_TOKEN_BLOCK = `  const _tokenData = await tokenRes.json();
  if (!_tokenData.access_token || typeof _tokenData.access_token !== 'string') {
    return {
      status: 401,
      body: 'Authorization failed'
    };
  }
  const ONE_YEAR_SECS = 365 * 24 * 60 * 60;
  const tokenData = {
    access_token: _tokenData.access_token,
    expires_in: _tokenData.expires_in ?? ONE_YEAR_SECS,
    refresh_token: _tokenData.refresh_token ?? null,
    refresh_token_expires_in: _tokenData.refresh_token_expires_in ?? ONE_YEAR_SECS,
    scope: _tokenData.scope ?? '',
    token_type: 'bearer'
  };`;

const OLD_COOKIES_BLOCK = `async function getTokenCookies(tokenData, config) {
  const headers = [['Set-Cookie', cookie.serialize('keystatic-gh-access-token', tokenData.access_token, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: tokenData.expires_in,
    expires: new Date(Date.now() + tokenData.expires_in * 1000),
    path: '/'
  })], ['Set-Cookie', cookie.serialize('keystatic-gh-refresh-token', await encryptValue(tokenData.refresh_token, config.secret), {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: tokenData.refresh_token_expires_in,
    expires: new Date(Date.now() + tokenData.refresh_token_expires_in * 100),
    path: '/'
  })]];
  return headers;
}`;

const NEW_COOKIES_BLOCK = `async function getTokenCookies(tokenData, config) {
  const headers = [['Set-Cookie', cookie.serialize('keystatic-gh-access-token', tokenData.access_token, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: tokenData.expires_in,
    expires: new Date(Date.now() + tokenData.expires_in * 1000),
    path: '/'
  })]];
  if (tokenData.refresh_token) {
    headers.push(['Set-Cookie', cookie.serialize('keystatic-gh-refresh-token', await encryptValue(tokenData.refresh_token, config.secret), {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: tokenData.refresh_token_expires_in,
      expires: new Date(Date.now() + tokenData.refresh_token_expires_in * 100),
      path: '/'
    })]);
  }
  return headers;
}`;

let patched = 0;
for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping (not found): ${file}`);
    continue;
  }
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes("ONE_YEAR_SECS")) {
    console.log(`Already patched: ${file}`);
    continue;
  }
  content = content.replace(OLD_TOKEN_BLOCK, NEW_TOKEN_BLOCK);
  content = content.replace(OLD_COOKIES_BLOCK, NEW_COOKIES_BLOCK);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Patched: ${file}`);
  patched++;
}
console.log(`Done. Patched ${patched} file(s).`);
