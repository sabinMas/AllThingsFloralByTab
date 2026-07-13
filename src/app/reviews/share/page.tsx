import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ReviewForm from "@/components/ReviewForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Share Your Review",
  description:
    "Share your experience working with All Things Floral by Tab on your wedding day.",
};

export default function ShareReviewPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Kind Words"
        title="Share Your Review"
        subtitle="Thank you for taking a moment to share your experience."
      />

      <div className="mt-10">
        <ReviewForm />
      </div>

      {siteConfig.googleReviewUrl ? (
        <p className="mt-8 text-center font-body text-base text-ink-soft">
          You can also leave a review on{" "}
          <a
            href={siteConfig.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blush"
          >
            Google
          </a>{" "}
          &mdash; it helps other couples find us.
        </p>
      ) : null}
    </div>
  );
}
