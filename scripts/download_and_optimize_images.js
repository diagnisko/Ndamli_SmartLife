const fetch = require('node-fetch');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  { url: 'https://source.unsplash.com/featured/?thieboudienne', name: 'thieboudienne' },
  { url: 'https://source.unsplash.com/featured/?yassa,chicken', name: 'yassa' },
  { url: 'https://source.unsplash.com/featured/?mafe,peanut', name: 'mafe' },
  { url: 'https://source.unsplash.com/featured/?thiakry', name: 'thiakry' },
  { url: 'https://source.unsplash.com/featured/?pastel,fish', name: 'pastels' },
  { url: 'https://source.unsplash.com/featured/?gombo,soup', name: 'kandia' },
];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function run() {
  const outDir = path.join(__dirname, '..', 'client', 'public', 'images', 'recipes');
  await ensureDir(outDir);

  for (const img of images) {
    try {
      console.log(`Downloading ${img.url}`);
      const buffer = await downloadBuffer(img.url);

      const jpgPath = path.join(outDir, `${img.name}.jpg`);
      const webpPath = path.join(outDir, `${img.name}.webp`);

      // Save optimized jpg
      await sharp(buffer)
        .resize(1200, 800, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(jpgPath);

      // Save webp
      await sharp(buffer)
        .resize(1200, 800, { fit: 'cover' })
        .webp({ quality: 75 })
        .toFile(webpPath);

      console.log(`Saved ${jpgPath} and ${webpPath}`);
    } catch (err) {
      console.error(`Error processing ${img.name}:`, err.message);
    }
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
