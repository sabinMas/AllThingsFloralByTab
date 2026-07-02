import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site";
import SocialLinks from "@/components/SocialLinks";
import CTAButton from "@/components/CTAButton";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream-dark">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6">
        <p className="font-display text-2xl text-ink">
          All Things Floral <span className="font-script text-3xl text-blush">by Tab</span>
        </p>

        <p className="font-body text-lg text-ink-soft">
          {siteConfig.location} &mdash; {siteConfig.serviceArea}
        </p>

        <CTAButton href="/inquire">Inquire About Your Wedding</CTAButton>

        <SocialLinks className="mt-2" />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-sm text-ink-soft">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blush">
              {link.label}
            </Link>
          ))}
          <Link href="/inquire" className="hover:text-blush">
            Inquire
          </Link>
        </nav>

        <p className="font-body text-xs text-ink-soft/80">
          &copy; {new Date().getFullYear()} All Things Floral by Tab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
