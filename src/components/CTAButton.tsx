import Link from "next/link";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export default function CTAButton({
  href,
  children,
  variant = "solid",
  className = "",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-body text-sm tracking-wide uppercase transition-colors";
  const styles =
    variant === "solid"
      ? "bg-ink text-cream hover:bg-ink-soft"
      : "border border-ink text-ink hover:bg-ink hover:text-cream";
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
