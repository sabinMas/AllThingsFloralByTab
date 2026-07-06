"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage as GalleryImageType } from "@/lib/gallery";

const AUTOPLAY_MS = 3500;
const SWIPE_THRESHOLD = 40;

export default function MobileGallerySlideshow({
  images,
}: {
  images: GalleryImageType[];
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (next: number) => {
    setIndex(((next % images.length) + images.length) % images.length);
  };

  const restartAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      goTo(index + (deltaX < 0 ? 1 : -1));
    } else {
      goTo(index + 1);
    }
    restartAutoplay();
  };

  const handleTap = () => {
    goTo(index + 1);
    restartAutoplay();
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-ink"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleTap}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((image, i) => (
          <div key={image.src} className="relative h-full w-full flex-shrink-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
