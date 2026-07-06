import fs from "fs";
import path from "path";
import Image from "next/image";
import CTAButton from "@/components/CTAButton";

const BANNER_LOGO_PATH = path.join(
  process.cwd(),
  "public",
  "images",
  "logo",
  "logo-banner.png"
);

export default function Hero() {
  const hasBannerLogo = fs.existsSync(BANNER_LOGO_PATH);

  return (
    <section className="mx-auto max-w-4xl px-4 pt-14 pb-16 text-center sm:px-6 sm:pt-20">
      {hasBannerLogo ? (
        <Image
          src="/images/logo/logo-banner.png"
          alt="All Things Floral by Tab"
          width={1200}
          height={500}
          priority
          className="mx-auto h-auto w-full max-w-xl"
        />
      ) : (
        <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl">
          All Things Floral{" "}
          <span className="font-script text-6xl text-blush sm:text-7xl">by Tab</span>
        </h1>
      )}

      <p className="mx-auto mt-6 max-w-lg font-body text-xl italic text-ink-soft">
        &lsquo;Flowers make people better, happier &amp; more hopeful; they
        are sunshine, food &amp; medicine for the soul&rsquo;
        <br />
        <span className="text-base not-italic">~ Luther Burbank</span>
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <CTAButton href="/inquire">Inquire About Your Wedding</CTAButton>
        <CTAButton href="/portfolio" variant="outline">
          View Portfolio
        </CTAButton>
      </div>
    </section>
  );
}
