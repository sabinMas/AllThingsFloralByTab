import { siteConfig } from "@/lib/site";

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
};

export default function SocialLinks({
  className = "",
  iconClassName = "h-5 w-5",
}: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="All Things Floral by Tab on Instagram"
        className="text-ink hover:text-blush transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={iconClassName}
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      </a>
      {siteConfig.facebookUrl ? (
        <a
          href={siteConfig.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="All Things Floral by Tab on Facebook"
          className="text-ink hover:text-blush transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={iconClassName}
          >
            <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2H15l-.5 3H11.5v6h-3v-6H7v-3h1.5v-2A4 4 0 0 1 12.5 5H15v3.5Z" />
          </svg>
        </a>
      ) : null}
    </div>
  );
}
