import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ImageGallery from "@/components/ImageGallery";
import MobileGallerySlideshow from "@/components/MobileGallerySlideshow";
import ServiceCard from "@/components/ServiceCard";
import ReviewCard from "@/components/ReviewCard";
import CTAButton from "@/components/CTAButton";
import { getGalleryImages } from "@/lib/gallery";
import { siteConfig } from "@/lib/site";
import { reviews } from "@/data/reviews";

const pricingHighlights = [
  { title: "Bridal Bouquets", description: "Starts at $225.00" },
  { title: "Bridesmaid Bouquets", description: "Starts at $100.00" },
  { title: "Centerpieces", description: "Starts at $75.00" },
];

function shuffled<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Home() {
  const allImages = getGalleryImages();
  const teaserImages = allImages.slice(0, 6);
  const slideshowImages = shuffled(allImages);
  const featuredReviews = reviews.filter((r) => r.featured).slice(0, 3);
  const homepageReviews = featuredReviews.length > 0 ? featuredReviews : reviews.slice(0, 3);

  return (
    <>
      {/* Mobile only: hero + full-screen slideshow snap-scroll together; desktop keeps normal flow below */}
      <div className="h-dvh snap-y snap-mandatory overflow-y-auto md:hidden">
        <div className="relative flex h-dvh snap-start snap-always flex-col items-center justify-center pb-28">
          <Hero />
          <div className="absolute bottom-14 flex flex-col items-center gap-2 text-ink-soft">
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-blush">
              Now Booking 2026 &amp; 2027
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5 animate-bounce"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
            <span className="font-body text-xs uppercase tracking-wide">Swipe for more</span>
          </div>
        </div>
        <div className="h-dvh snap-start snap-always">
          <MobileGallerySlideshow images={slideshowImages} />
        </div>
      </div>
      <div className="hidden md:block">
        <Hero />
      </div>

      <section className="mx-auto hidden max-w-6xl px-4 py-16 sm:px-6 md:block">
        <SectionHeading
          eyebrow="Our Work"
          title="Recent Weddings"
          subtitle="A glimpse at the blooms, bouquets, and moments we've been trusted to create."
        />
        <div className="mt-10">
          <ImageGallery images={teaserImages} />
        </div>
        <div className="mt-8 text-center">
          <CTAButton href="/portfolio" variant="outline">
            See Full Portfolio
          </CTAButton>
        </div>
      </section>

      {homepageReviews.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Kind Words"
            title="What Couples Are Saying"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homepageReviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <CTAButton href="/reviews" variant="outline">
              Read All Reviews
            </CTAButton>
          </div>
        </section>
      ) : null}

      <section className="bg-cream-dark/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Services"
            title="Wedding Floral Design"
            subtitle="From full-service design to intimate elopements, every arrangement is built around your day."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {pricingHighlights.map((item) => (
              <ServiceCard key={item.title} {...item} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <CTAButton href="/services" variant="outline">
              View All Services
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <SectionHeading
          eyebrow="Follow Along"
          title={siteConfig.instagramHandle}
          subtitle="See the latest arrangements, behind-the-scenes moments, and wedding day florals on Instagram."
        />
        <div className="mt-8">
          <CTAButton href={siteConfig.instagramUrl}>Follow on Instagram</CTAButton>
        </div>
      </section>
    </>
  );
}
