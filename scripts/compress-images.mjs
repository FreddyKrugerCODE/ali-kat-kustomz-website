import sharp from 'sharp';
import { readdir, stat, writeFile, readFile } from 'fs/promises';
import { join, extname } from 'path';

async function findWebp(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await findWebp(full)));
    else if (extname(entry.name).toLowerCase() === '.webp') files.push(full);
  }
  return files;
}

const files = await findWebp('public/images');
let totalSaved = 0;

for (const file of files) {
  const before = (await stat(file)).size;
  const input = await readFile(file);
  const buf = await sharp(input)
    .webp({ quality: 78, effort: 4, smartSubsample: true })
    .toBuffer();

  if (buf.length < before) {
    await writeFile(file, buf);
    const saved = before - buf.length;
    totalSaved += saved;
    console.log(
      `✓  ${file.replace('public/images/', '')}  ${Math.round(before / 1024)}KB → ${Math.round(buf.length / 1024)}KB  (−${Math.round(saved / 1024)}KB)`
    );
  } else {
    console.log(`   ${file.replace('public/images/', '')}  already optimal, skipped`);
  }
}

console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB`);
