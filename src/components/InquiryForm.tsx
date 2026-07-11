"use client";

import { useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

const inputClass =
  "w-full rounded-md border border-ink/20 bg-white px-4 py-3 font-body text-lg text-ink placeholder:text-ink-soft/50 focus:border-blush focus:outline-none focus:ring-1 focus:ring-blush";
const labelClass = "block font-body text-base font-medium text-ink mb-1.5";

const florals = [
  "Bridal Bouquet",
  "Bridesmaid Bouquets",
  "Boutonnieres",
  "Corsages",
  "Ceremony Arch / Arbor",
  "Aisle Decor",
  "Centerpieces",
  "Reception Decor",
  "Installations",
];

const QTY_PREFIX = "qty__";
const QTY_MAX = 99;
const TEXT_MAX = 2000;

// Strips HTML tags, angle brackets, and non-printing control characters
// (keeping tabs/newlines) so nothing markup-like reaches the email.
function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]*>?/g, "")
    .replace(/[<>]/g, "")
    .replace(/\p{Cc}/gu, (c) => (c === "\n" || c === "\r" || c === "\t" ? c : ""))
    .trim()
    .slice(0, TEXT_MAX);
}

type Status = "idle" | "submitting" | "success" | "error";

export default function InquiryForm() {
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

      if (name.startsWith(QTY_PREFIX)) {
        // Quantity fields: coerce to a whole number in [1, QTY_MAX]; skip blanks/zeros.
        const qty = Math.floor(Number(value));
        if (!Number.isFinite(qty) || qty <= 0) continue;
        formData.append(`${name.slice(QTY_PREFIX.length)} (quantity)`, String(Math.min(qty, QTY_MAX)));
      } else {
        formData.append(name, sanitizeText(value));
      }
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
          Your inquiry has been sent &mdash; Tab will be in touch within 2&ndash;3
          business days to talk through your wedding.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Honeypot for spam protection */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value="New Wedding Inquiry — All Things Floral by Tab" />

      <fieldset className="space-y-6">
        <legend className="font-script text-3xl text-blush">Couple &amp; Contact</legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="partner1" className={labelClass}>
              Partner 1 Full Name *
            </label>
            <input id="partner1" name="partner1Name" type="text" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="partner2" className={labelClass}>
              Partner 2 Full Name
            </label>
            <input id="partner2" name="partner2Name" type="text" className={inputClass} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone *
            </label>
            <input id="phone" name="phone" type="tel" required className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="contactMethod" className={labelClass}>
            Preferred Contact Method
          </label>
          <select id="contactMethod" name="preferredContactMethod" className={inputClass}>
            <option>Email</option>
            <option>Phone</option>
            <option>Text</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-script text-3xl text-blush">Wedding Details</legend>

        <div>
          <label htmlFor="weddingDate" className={labelClass}>
            Wedding Date *
          </label>
          <input id="weddingDate" name="weddingDate" type="date" required className={inputClass} />
          <p className="mt-1 font-body text-sm text-ink-soft">
            Or your estimated date if not finalized.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="venueName" className={labelClass}>
              Venue Name
            </label>
            <input
              id="venueName"
              name="venueName"
              type="text"
              placeholder="TBD is okay"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="venueLocation" className={labelClass}>
              Venue City / Location *
            </label>
            <input id="venueLocation" name="venueLocation" type="text" required className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="guestCount" className={labelClass}>
            Estimated Guest Count
          </label>
          <select id="guestCount" name="guestCount" className={inputClass}>
            <option>Under 50</option>
            <option>50–100</option>
            <option>100–150</option>
            <option>150–200</option>
            <option>200+</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-script text-3xl text-blush">Florals &amp; Vision</legend>

        <div>
          <span className={labelClass}>What florals are you interested in?</span>
          <p className="mb-3 font-body text-sm text-ink-soft">
            Enter a quantity for each item you&rsquo;d like &mdash; leave blank for none.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {florals.map((item) => (
              <label
                key={item}
                className="flex items-center justify-between gap-3 rounded-md border border-ink/20 bg-white px-4 py-2.5 font-body text-base text-ink"
              >
                <span>{item}</span>
                <input
                  type="number"
                  name={`${QTY_PREFIX}${item}`}
                  min={0}
                  max={QTY_MAX}
                  step={1}
                  inputMode="numeric"
                  placeholder="0"
                  className="w-20 rounded-md border border-ink/20 px-2 py-1.5 text-center text-ink focus:border-blush focus:outline-none focus:ring-1 focus:ring-blush"
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="floralsOther" className={labelClass}>
            Other floral needs
          </label>
          <input
            id="floralsOther"
            name="floralsOther"
            type="text"
            maxLength={200}
            placeholder="Anything not listed above"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="visionDescription" className={labelClass}>
            Describe your dream wedding florals: colors, mood, style *
          </label>
          <textarea
            id="visionDescription"
            name="visionDescription"
            required
            rows={4}
            maxLength={TEXT_MAX}
            className={inputClass}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="inspirationLink" className={labelClass}>
              Inspiration Link
            </label>
            <input
              id="inspirationLink"
              name="inspirationLink"
              type="url"
              placeholder="Pinterest, Instagram, etc."
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="colorPalette" className={labelClass}>
              Preferred Color Palette
            </label>
            <input id="colorPalette" name="colorPalette" type="text" className={inputClass} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-script text-3xl text-blush">Budget &amp; Logistics</legend>

        <div>
          <label htmlFor="estimatedBudget" className={labelClass}>
            Estimated Floral Budget
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
              $
            </span>
            <input
              id="estimatedBudget"
              name="estimatedBudget"
              type="number"
              min="0"
              step="50"
              inputMode="numeric"
              placeholder="e.g. 3000"
              className={`${inputClass} pl-8`}
            />
          </div>
          <p className="mt-1 font-body text-sm text-ink-soft">
            Not sure yet? Leave this blank and we can talk through it together.
          </p>
        </div>

        <div>
          <label htmlFor="hearAbout" className={labelClass}>
            How did you hear about All Things Floral by Tab?
          </label>
          <select id="hearAbout" name="hearAboutUs" className={inputClass}>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Google Search</option>
            <option>Referral</option>
            <option>Vendor Recommendation</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="anythingElse" className={labelClass}>
            Anything else we should know?
          </label>
          <textarea
            id="anythingElse"
            name="anythingElse"
            rows={3}
            maxLength={TEXT_MAX}
            className={inputClass}
          />
        </div>
      </fieldset>

      <fieldset>
        <label className="flex items-start gap-3 font-body text-base text-ink">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 accent-blush"
          />
          <span>
            I understand this is an inquiry, not a booking confirmation, and
            that Tab will follow up to discuss availability and pricing. *
          </span>
        </label>
      </fieldset>

      {status === "error" ? (
        <p className="rounded-md bg-blush/20 p-4 font-body text-base text-ink">
          Something went wrong sending your inquiry. Please try again, or
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
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
