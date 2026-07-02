import type { Service } from "@/data/services";

export default function ServiceCard({ title, description }: Service) {
  return (
    <div className="rounded-lg border border-ink/10 bg-cream-dark/60 p-6 text-left">
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mt-3 font-body text-lg text-ink-soft">{description}</p>
    </div>
  );
}
