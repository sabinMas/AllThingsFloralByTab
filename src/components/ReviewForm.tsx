"use client";

import { useState, type FormEvent } from "react";
import { sanitizeText } from "@/lib/sanitize";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_REVIEWS_ENDPOINT;

const inputClass =
  "w-full rounded-md border border-ink/20 bg-white px-4 py-3 font-body text-lg text-ink placeholder:text-ink-soft/50 focus:border-blush focus:outline-none focus:ring-1 focus:ring-blush";
const labelClass = "block font-body text-base font-medium text-ink mb-1.5";
const TEXT_MAX = 1000;

type Status = "idle" | "submitting" | "success" | "error";

export default function ReviewForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const raw = new FormData(form);
    const formData = new FormData();

    for (const [name, value] of raw.entries()) {
      if (typeof value !== "string") continue;
      formData.append(name, name === "rating" ? value : sanitizeText(value, TEXT_MAX));
    }

    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-cream-dark p-8 text-center">
        <p className="font-display text-2xl text-ink">Thank you!</p>
        <p className="mt-3 font-body text-lg text-ink-soft">
          Your review means the world &mdash; Tab reads every one and will add
          yours to the site soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot for spam protection */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value="New Review — All Things Floral by Tab" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="reviewNames" className={labelClass}>
            Your Name(s) *
          </label>
          <input
            id="reviewNames"
            name="names"
            type="text"
            required
            placeholder="e.g. Emily &amp; Jordan"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="reviewWeddingDate" className={labelClass}>
            Wedding Month / Year
          </label>
          <input
            id="reviewWeddingDate"
            name="weddingDate"
            type="text"
            placeholder="e.g. September 2025"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="reviewEmail" className={labelClass}>
          Email *
        </label>
        <input id="reviewEmail" name="email" type="email" required className={inputClass} />
        <p className="mt-1 font-body text-sm text-ink-soft">
          Only used to confirm it&rsquo;s really you &mdash; never shown publicly.
        </p>
      </div>

      <div>
        <span className={labelClass}>Rating *</span>
        <div className="flex gap-4">
          {[5, 4, 3, 2, 1].map((n) => (
            <label
              key={n}
              className="flex items-center gap-1.5 font-body text-base text-ink"
            >
              <input type="radio" name="rating" value={n} required className="accent-blush" />
              {n}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="reviewQuote" className={labelClass}>
          Your Review *
        </label>
        <textarea
          id="reviewQuote"
          name="quote"
          required
          rows={5}
          maxLength={TEXT_MAX}
          placeholder="Tell other couples about your experience"
          className={inputClass}
        />
      </div>

      {status === "error" ? (
        <p className="rounded-md bg-blush/20 p-4 font-body text-base text-ink">
          Something went wrong sending your review. Please try again, or
          reach out directly via{" "}
          <a
            href="https://www.instagram.com/allthingsfloralbytab/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Instagram
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-ink px-6 py-4 font-body text-lg tracking-wide uppercase text-cream transition-colors hover:bg-ink-soft disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Submit Review"}
      </button>
    </form>
  );
}
