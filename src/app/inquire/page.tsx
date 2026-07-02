import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Tell us about your wedding — venue, date, vision, and budget — and Tab will follow up to discuss your florals.",
};

export default function InquirePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Let's Talk Florals"
        title="Wedding Inquiry"
        subtitle="Tell me a bit about your day. The more detail you share, the better I can tailor a proposal for your wedding."
      />

      <div className="mt-12">
        <InquiryForm />
      </div>
    </div>
  );
}
