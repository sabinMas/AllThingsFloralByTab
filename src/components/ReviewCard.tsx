import type { Review } from "@/data/reviews";
import StarRating from "@/components/StarRating";

export default function ReviewCard({ names, weddingDate, quote, rating }: Review) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-ink/10 bg-cream-dark/60 p-6">
      <StarRating rating={rating} />
      <blockquote className="mt-4 flex-1 font-body text-lg leading-relaxed text-ink-soft">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 font-display text-lg text-ink">
        {names}
        {weddingDate ? (
          <span className="ml-2 font-body text-sm font-normal text-ink-soft">
            {weddingDate}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
