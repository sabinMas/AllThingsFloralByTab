// One-off local tooling script: flags visually near-duplicate photos in
// public/images/gallery using a simple average-hash perceptual comparison.
// Not part of the deployed app. Run with: node scripts/find-similar-photos.mjs
import fs from "fs";
import path from "path";
import sharp from "sharp";

const GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");
const HASH_SIZE = 16; // 16x16 grayscale -> 256-bit hash

async function ahash(filePath) {
  const { data } = await sharp(filePath)
    .resize(HASH_SIZE, HASH_SIZE, { fit: "fill" })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const avg = data.reduce((sum, v) => sum + v, 0) / data.length;
  let bits = "";
  for (const v of data) bits += v >= avg ? "1" : "0";
  return bits;
}

function hamming(a, b) {
  let dist = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) dist++;
  return dist;
}

const files = fs
  .readdirSync(GALLERY_DIR)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort();

const hashes = {};
for (const f of files) {
  hashes[f] = await ahash(path.join(GALLERY_DIR, f));
}

const THRESHOLD = 20; // out of 256 bits; lower = more similar
const pairs = [];
for (let i = 0; i < files.length; i++) {
  for (let j = i + 1; j < files.length; j++) {
    const dist = hamming(hashes[files[i]], hashes[files[j]]);
    if (dist <= THRESHOLD) {
      pairs.push({ a: files[i], b: files[j], dist });
    }
  }
}

pairs.sort((a, b) => a.dist - b.dist);
console.log(`Found ${pairs.length} candidate near-duplicate pairs (threshold ${THRESHOLD}/256):\n`);
for (const p of pairs) {
  console.log(`dist=${p.dist}\t${p.a}  <->  ${p.b}`);
}
