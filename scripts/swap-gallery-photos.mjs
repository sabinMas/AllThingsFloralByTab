// One-off local tooling script: replaces public/images/gallery/ entirely
// with processed photos from the two client-provided folders. Not part of
// the deployed app. Run with: node scripts/swap-gallery-photos.mjs
import fs from "fs";
import path from "path";
import sharp from "sharp";
import convert from "heic-convert";

const ROOT = process.cwd();
const SOURCE_DIRS = [
  "C:\\Users\\mason\\Downloads\\Weddings-3-001\\People",
  "C:\\Users\\mason\\Downloads\\Weddings-3-001\\decor",
];
const GALLERY_DIR = path.join(ROOT, "public", "images", "gallery");

const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 80;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Clear out the old gallery contents
for (const file of fs.readdirSync(GALLERY_DIR)) {
  fs.unlinkSync(path.join(GALLERY_DIR, file));
}

let allFiles = [];
for (const dir of SOURCE_DIRS) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|heic)$/i.test(f))
    .map((f) => ({ dir, file: f }));
  allFiles.push(...files);
}

allFiles = shuffle(allFiles);

let i = 0;
for (const { dir, file } of allFiles) {
  i += 1;
  const srcPath = path.join(dir, file);
  const ext = path.extname(file).toLowerCase();
  const outName = `wedding-${String(i).padStart(3, "0")}.jpg`;
  const outPath = path.join(GALLERY_DIR, outName);

  try {
    let inputBuffer = fs.readFileSync(srcPath);

    if (ext === ".heic") {
      try {
        inputBuffer = Buffer.from(
          await convert({ buffer: inputBuffer, format: "JPEG", quality: 0.9 })
        );
      } catch {
        // some "*.heic" exports are actually already JPEG bytes with a
        // stale extension - sharp auto-detects the real format
      }
    }

    await sharp(inputBuffer)
      .rotate()
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY })
      .toFile(outPath);

    const stat = fs.statSync(outPath);
    console.log(`[${i}/${allFiles.length}] ${file} -> ${outName} (${Math.round(stat.size / 1024)} KB)`);
  } catch (err) {
    console.error(`FAILED: ${file}:`, err.message);
  }
}

console.log(`\nDone. Wrote ${i} images to ${GALLERY_DIR}`);
