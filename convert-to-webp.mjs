// convert-to-webp.mjs
// Konversi semua PNG di public/photo ke format WebP (hemat 60-80% ukuran)
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = './public/photo';
const QUALITY = 85;

async function getAllPngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await getAllPngs(fullPath));
    } else if (extname(entry.name).toLowerCase() === '.png') {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertFile(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const before = (await stat(pngPath)).size;
  await sharp(pngPath).webp({ quality: QUALITY, effort: 4 }).toFile(webpPath);
  const after = (await stat(webpPath)).size;
  const saved = ((1 - after / before) * 100).toFixed(1);
  console.log(`✓ ${basename(pngPath)} → ${basename(webpPath)} | ${(before/1024/1024).toFixed(2)}MB → ${(after/1024/1024).toFixed(2)}MB (hemat ${saved}%)`);
}

async function main() {
  console.log('Mulai konversi PNG → WebP...\n');
  const pngs = await getAllPngs(INPUT_DIR);
  console.log(`Ditemukan ${pngs.length} file PNG\n`);
  let totalBefore = 0, totalAfter = 0;
  for (const f of pngs) { totalBefore += (await stat(f)).size; }
  await Promise.all(pngs.map(convertFile));
  for (const f of pngs) {
    const webp = f.replace(/\.png$/i, '.webp');
    try { totalAfter += (await stat(webp)).size; } catch {}
  }
  console.log(`\nSelesai!`);
  console.log(`Total: ${(totalBefore/1024/1024).toFixed(1)}MB -> ${(totalAfter/1024/1024).toFixed(1)}MB`);
  console.log(`Hemat: ${((1 - totalAfter/totalBefore)*100).toFixed(1)}%`);
}

main().catch(console.error);
