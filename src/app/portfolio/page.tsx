import type { Metadata } from "next";
import ImageGallery from "@/components/ImageGallery";
import { getGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A collection of wedding floral design work by All Things Floral by Tab, based in Buckley, WA.",
};

export default function PortfolioPage() {
  const images = getGalleryImages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Portfolio</h1>
        <p className="mt-3 font-body text-lg text-ink-soft">
          A look at real weddings, real blooms, real love stories.
        </p>
      </div>
      <ImageGallery images={images} />
    </div>
  );
}
