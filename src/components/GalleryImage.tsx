import Image from "next/image";
import type { GalleryImage as GalleryImageType } from "@/lib/gallery";

export default function GalleryImage({ src, alt, width, height }: GalleryImageType) {
  const isSvg = src.endsWith(".svg");

  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-lg bg-cream-dark">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized={isSvg}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
    </div>
  );
}
