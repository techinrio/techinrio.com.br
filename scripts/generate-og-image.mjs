/**
 * Regenerates public/img/og-image.jpg from scripts/og-image.html.
 * Requires local Chrome and Python Pillow. The committed JPEG is the production asset.
 */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { access, readFile, unlink, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const root = fileURLToPath(new URL('..', import.meta.url));
const pngPath = join(root, 'public/img/og-image.png');
const jpgPath = join(root, 'public/img/og-image.jpg');
const chrome = process.env.CHROME_PATH ?? 'google-chrome';
const userDataDir = join(tmpdir(), `techinrio-og-chrome-${process.pid}`);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.css': 'text/css; charset=utf-8',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  const pathname = url.pathname === '/' ? '/scripts/og-image.html' : url.pathname;
  const filePath = await resolvePublicPath(pathname);

  if (!filePath) {
    res.writeHead(404);
    res.end();
    return;
  }

  try {
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const pageUrl = `http://127.0.0.1:${port}/scripts/og-image.html`;

await mkdir(userDataDir, { recursive: true });

await run('timeout', [
  '20',
  chrome,
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--hide-scrollbars',
  '--disable-extensions',
  '--disable-background-networking',
  '--disable-sync',
  '--disable-default-apps',
  '--no-first-run',
  `--user-data-dir=${userDataDir}`,
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  `--screenshot=${pngPath}`,
  '--virtual-time-budget=8000',
  pageUrl,
]);

server.close();

const png = await readFile(pngPath);
const size = readPngSize(png);
if (size.width !== 1200 || size.height !== 630) {
  throw new Error(`Unexpected OG image size: ${size.width}x${size.height}`);
}

const jpeg = await pngToJpeg(pngPath, jpgPath);
await unlink(pngPath).catch(() => {});

console.log(`OG JPEG ${size.width}x${size.height} (${jpeg.byteLength} bytes)`);

async function resolvePublicPath(pathname) {
  const relative = pathname.replace(/^\/+/, '');
  const candidates = [join(root, relative), join(root, 'public', relative)];

  for (const candidate of candidates) {
    if (!candidate.startsWith(root)) continue;
    try {
      await access(candidate);
      return candidate;
    } catch {
      // try the next location
    }
  }

  return null;
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0 || code === 124) resolve();
      else reject(new Error(`${command} exited with ${code}`));
    });
  });
}

function readPngSize(buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function pngToJpeg(inputPath, outputPath) {
  const proc = spawn('python3', [
    '-c',
    `
from PIL import Image
im = Image.open(${JSON.stringify(inputPath)}).convert('RGB')
im.save(${JSON.stringify(outputPath)}, 'JPEG', quality=86, optimize=True, progressive=True)
print(im.size)
`,
  ], { stdio: 'inherit' });

  await new Promise((resolve, reject) => {
    proc.on('error', reject);
    proc.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`jpeg conversion exited with ${code}`));
    });
  });

  return readFile(outputPath);
}
