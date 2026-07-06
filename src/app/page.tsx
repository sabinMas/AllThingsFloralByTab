import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ImageGallery from "@/components/ImageGallery";
import MobileGallerySlideshow from "@/components/MobileGallerySlideshow";
import ServiceCard from "@/components/ServiceCard";
import CTAButton from "@/components/CTAButton";
import { getGalleryImages } from "@/lib/gallery";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

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

  return (
    <>
      {/* Mobile only: hero + full-screen slideshow snap-scroll together; desktop keeps normal flow below */}
      <div className="h-dvh snap-y snap-mandatory overflow-y-auto md:hidden">
        <div className="flex h-dvh snap-start snap-always flex-col items-center justify-center">
          <Hero />
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

      <section className="bg-cream-dark/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Services"
            title="Wedding Floral Design"
            subtitle="From full-service design to intimate elopements, every arrangement is built around your day."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
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
