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

      {/* TODO(Tab): replace with real bio copy — background, how the business
          started, design philosophy, personal touch for PNW couples. */}
      <div className="mt-10 space-y-5 font-body text-xl leading-relaxed text-ink-soft">
        <p>
          Hi, I&rsquo;m Tab &mdash; the hands, heart, and design eye behind All
          Things Floral by Tab. Based in Buckley, Washington, I design wedding
          florals for couples across the Pacific Northwest, from full
          ceremony-to-reception installations to intimate elopement bouquets.
        </p>
        <p>
          I believe your florals should feel like an extension of your
          story: personal, unfussy, and full of life. Every bouquet,
          centerpiece, and arch is built around your venue, your season, and
          the way you want your day to feel.
        </p>
        <p>
          When I&rsquo;m not elbow-deep in stems, you can find me exploring
          the PNW&rsquo;s farms and forests for inspiration &mdash; and
          probably sharing it all on Instagram.
        </p>
      </div>

      <div className="mt-10 text-center">
        <CTAButton href="/inquire">Inquire About Your Wedding</CTAButton>
      </div>
    </div>
  );
}
