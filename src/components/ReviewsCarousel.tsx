"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/data/reviews";
import ReviewCard from "@/components/ReviewCard";

const AUTOPLAY_MS = 7000;
const PAGE_SIZE = 2;

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const pages = chunk(reviews, PAGE_SIZE);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % pages.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.length]);

  const goTo = (next: number) => {
    setIndex(((next % pages.length) + pages.length) % pages.length);
    restartAutoplay();
  };

  if (pages.length === 0) return null;

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {pages.map((page, i) => (
            <div
              key={i}
              className="grid w-full flex-shrink-0 items-start gap-6 sm:grid-cols-2"
            >
              {page.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          ))}
        </div>
      </div>
      {pages.length > 1 ? (
        <div className="mt-6 flex justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show reviews ${i + 1} of ${pages.length}`}
              aria-current={i === index}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-blush" : "bg-ink/20"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
