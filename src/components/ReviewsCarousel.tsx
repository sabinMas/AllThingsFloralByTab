"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/data/reviews";
import ReviewCard from "@/components/ReviewCard";

const AUTOPLAY_MS = 7000;
const FADE_MS = 200;
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
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);
  indexRef.current = index;

  const changeTo = (nextIndex: number) => {
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    setFading(true);
    fadeTimeoutRef.current = setTimeout(() => {
      setIndex(nextIndex);
      setFading(false);
    }, FADE_MS);
  };

  const restartAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      changeTo((indexRef.current + 1) % pages.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.length]);

  const goTo = (next: number) => {
    changeTo(((next % pages.length) + pages.length) % pages.length);
    restartAutoplay();
  };

  if (pages.length === 0) return null;

  const activePage = pages[index];

  return (
    <div>
      <div
        className={`grid gap-6 transition-opacity duration-200 ease-out sm:grid-cols-2 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        {activePage.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
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
