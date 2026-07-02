// One-off local tooling script: converts the raw wedding photo export into
// web-ready files and a contact sheet for manual curation. Not part of the
// deployed app. Run with: node scripts/process-photos.mjs
import fs from "fs";
import path from "path";
import sharp from "sharp";
import convert from "heic-convert";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "_photo-staging", "raw", "Weddings");
const PROCESSED_DIR = path.join(ROOT, "_photo-staging", "processed");
const CONTACT_SHEET = path.join(ROOT, "_photo-staging", "contact-sheet.html");

const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 80;

fs.mkdirSync(PROCESSED_DIR, { recursive: true });

const files = fs.readdirSync(RAW_DIR);
const imageFiles = files.filter((f) => /\.(jpe?g|png|heic)$/i.test(f));
const skipped = files.filter((f) => !/\.(jpe?g|png|heic)$/i.test(f));

console.log(`Found ${files.length} files: ${imageFiles.length} images, ${skipped.length} skipped (video/other).`);
if (skipped.length) {
  console.log("Skipped (not images):", skipped.join(", "));
}

const results = [];

for (const [i, file] of imageFiles.entries()) {
  const srcPath = path.join(RAW_DIR, file);
  const ext = path.extname(file).toLowerCase();
  const baseName = path.basename(file, ext);
  const outName = `${baseName}.jpg`;
  const outPath = path.join(PROCESSED_DIR, outName);

  try {
    let inputBuffer = fs.readFileSync(srcPath);

    if (ext === ".heic") {
      try {
        inputBuffer = Buffer.from(
          await convert({ buffer: inputBuffer, format: "JPEG", quality: 0.9 })
        );
      } catch {
        // Some "*.heic" exports (e.g. from Google Photos) are actually
        // already JPEG bytes with a stale extension - sharp auto-detects
        // the real format from content, so just pass the buffer through.
      }
    }

    await sharp(inputBuffer)
      .rotate() // apply EXIF orientation
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY })
      .toFile(outPath);

    const stat = fs.statSync(outPath);
    results.push({ original: file, processed: outName, sizeKB: Math.round(stat.size / 1024) });
    console.log(`[${i + 1}/${imageFiles.length}] ${file} -> ${outName} (${Math.round(stat.size / 1024)} KB)`);
  } catch (err) {
    console.error(`FAILED: ${file}:`, err.message);
  }
}

const rows = results
  .map(
    (r) => `
    <figure>
      <img src="processed/${r.processed}" loading="lazy" alt="${r.original}" />
      <figcaption>${r.original}<br><small>${r.sizeKB} KB</small></figcaption>
    </figure>`
  )
  .join("\n");

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>All Things Floral by Tab — Photo Contact Sheet</title>
<style>
  body { font-family: system-ui, sans-serif; background: #f5f0e8; margin: 0; padding: 24px; }
  h1 { font-size: 20px; }
  p { color: #5c4a42; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  figure { margin: 0; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
  img { width: 100%; height: 220px; object-fit: cover; display: block; }
  figcaption { font-size: 12px; padding: 8px; word-break: break-all; color: #3a2e2a; }
</style>
</head>
<body>
  <h1>All Things Floral by Tab — Photo Contact Sheet</h1>
  <p>${results.length} processed images. Note the filenames of the ones to keep, then tell Claude which ones to copy into public/images/gallery/.</p>
  <div class="grid">
    ${rows}
  </div>
</body>
</html>`;

fs.writeFileSync(CONTACT_SHEET, html);
console.log(`\nDone. Processed ${results.length}/${imageFiles.length} images.`);
console.log(`Contact sheet: ${CONTACT_SHEET}`);
