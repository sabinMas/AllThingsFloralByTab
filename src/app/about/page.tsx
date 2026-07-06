import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Tab, the wedding florist behind All Things Floral by Tab, based in Buckley, WA.",
};

const PORTRAIT_PATH = path.join(
  process.cwd(),
  "public",
  "images",
  "about",
  "tab-portrait.jpg"
);

export default function AboutPage() {
  const hasPortrait = fs.existsSync(PORTRAIT_PATH);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="About" title="Meet Tab" />

      <div className="mt-10 overflow-hidden rounded-lg bg-cream-dark">
        {hasPortrait ? (
          <Image
            src="/images/about/tab-portrait.jpg"
            alt="Tab, owner of All Things Floral by Tab"
            width={900}
            height={1100}
            className="h-auto w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[4/5] items-center justify-center">
            <p className="font-script text-3xl text-blush">Photo coming soon</p>
          </div>
        )}
      </div>

      <div className="mt-10 space-y-5 font-body text-xl leading-relaxed text-ink-soft">
        <p>
          Hi, I&rsquo;m Tabatha, the owner and floral designer behind All
          Things Floral by Tab.
        </p>
        <p>
          For the past 10 years, I&rsquo;ve had the joy of creating wedding
          flowers that celebrate each couple&rsquo;s unique love story. I
          believe every wedding deserves florals that feel personal, timeless,
          and thoughtfully designed to reflect your vision.
        </p>
        <p>
          When I&rsquo;m not designing for weddings, you&rsquo;ll usually find
          me in my garden growing flowers to incorporate into my arrangements
          and bouquets. There&rsquo;s something incredibly special about
          using blooms I&rsquo;ve nurtured from seed to create meaningful
          pieces for someone&rsquo;s wedding day.
        </p>
        <p>
          I&rsquo;m also a wife, mother, and proud grandmother. My family and
          I love spending time outdoors, whether we&rsquo;re exploring,
          gardening, or simply enjoying nature together.
        </p>
      </div>

      <div className="mt-10 text-center">
        <CTAButton href="/inquire">Inquire About Your Wedding</CTAButton>
      </div>
    </div>
  );
}
