import GalleryImage from "@/components/GalleryImage";
import type { GalleryImage as GalleryImageType } from "@/lib/gallery";

type ImageGalleryProps = {
  images: GalleryImageType[];
  className?: string;
};

export default function ImageGallery({ images, className = "" }: ImageGalleryProps) {
  return (
    <div className={`columns-2 gap-4 md:columns-3 ${className}`}>
      {images.map((image) => (
        <GalleryImage key={image.src} {...image} />
      ))}
    </div>
  );
}
