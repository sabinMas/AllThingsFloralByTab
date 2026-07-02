import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");
const PLACEHOLDER_DIR = path.join(process.cwd(), "public", "images", "placeholder");
const VALID_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);

function readImageDir(dir: string, publicPrefix: string): GalleryImage[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => VALID_EXT.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => {
      let width = 800;
      let height = 1000;
      try {
        const dimensions = imageSize(fs.readFileSync(path.join(dir, file)));
        width = dimensions.width;
        height = dimensions.height;
      } catch {
        // fall back to the 4:5 default above if dimensions can't be read
      }
      return {
        src: `${publicPrefix}/${file}`,
        alt: "All Things Floral by Tab — wedding floral design",
        width,
        height,
      };
    });
}

/**
 * Reads public/images/gallery/ for curated wedding photos. Falls back to
 * public/images/placeholder/ so the site never breaks before real photos
 * are dropped in.
 */
export function getGalleryImages(): GalleryImage[] {
  const real = readImageDir(GALLERY_DIR, "/images/gallery");
  if (real.length > 0) return real;
  return readImageDir(PLACEHOLDER_DIR, "/images/placeholder");
}
