"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-ink/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-ink"
          onClick={() => setOpen(false)}
        >
          All Things Floral{" "}
          <span className="font-script text-2xl text-blush">by Tab</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-base transition-colors hover:text-blush ${
                pathname === link.href ? "text-blush" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/inquire"
            className="rounded-full bg-ink px-5 py-2 font-body text-sm tracking-wide uppercase text-cream transition-colors hover:bg-ink-soft"
          >
            Inquire
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 bg-ink transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-0.5 w-6 bg-ink transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-4 block h-0.5 w-6 bg-ink transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile nav panel */}
      {open ? (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-cream px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-2 py-3 font-body text-lg transition-colors ${
                pathname === link.href ? "text-blush" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/inquire"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-ink px-5 py-3 text-center font-body text-sm tracking-wide uppercase text-cream"
          >
            Inquire
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
