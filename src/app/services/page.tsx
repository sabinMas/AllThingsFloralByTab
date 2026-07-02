import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTAButton from "@/components/CTAButton";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding floral design services from All Things Floral by Tab — full-service weddings, elopements, and design consultations in Buckley, WA and the Pacific Northwest.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Services"
        title="Wedding Floral Design"
        subtitle="Every couple's day looks different — here's how I can help bring your florals to life."
      />

      <div className="mt-12 space-y-6">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>

      <p className="mt-10 text-center font-body text-lg text-ink-soft">
        Pricing varies by season, guest count, and design scope &mdash;
        every quote is custom to your wedding.
      </p>

      <div className="mt-6 text-center">
        <CTAButton href="/inquire">Inquire About Your Wedding</CTAButton>
      </div>
    </div>
  );
}
