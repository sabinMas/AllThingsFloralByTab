import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ReviewCard from "@/components/ReviewCard";
import CTAButton from "@/components/CTAButton";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Kind words from couples who trusted All Things Floral by Tab with their wedding day florals.",
};

export default function ReviewsPage() {
  const hasReviews = reviews.length > 0;
  const averageRating = hasReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {hasReviews ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Florist",
              name: siteConfig.name,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: averageRating.toFixed(1),
                reviewCount: reviews.length,
              },
              review: reviews.map((r) => ({
                "@type": "Review",
                author: { "@type": "Person", name: r.names },
                reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
                reviewBody: r.quote,
              })),
            }),
          }}
        />
      ) : null}

      <SectionHeading
        eyebrow="Kind Words"
        title="Reviews"
        subtitle="What couples have said after their wedding day."
      />

      {hasReviews ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      ) : (
        <p className="mx-auto mt-10 max-w-xl text-center font-body text-lg text-ink-soft">
          Reviews are on their way &mdash; check back soon to hear from
          couples Tab has worked with.
        </p>
      )}

      <div className="mt-12 rounded-lg bg-cream-dark/60 p-8 text-center">
        <p className="font-display text-2xl text-ink">Recently married?</p>
        <p className="mx-auto mt-2 max-w-md font-body text-lg text-ink-soft">
          We&rsquo;d love to hear about your day and share your kind words
          with future couples.
        </p>
        <div className="mt-6">
          <CTAButton href="/reviews/share">Share Your Review</CTAButton>
        </div>
      </div>
    </div>
  );
}
