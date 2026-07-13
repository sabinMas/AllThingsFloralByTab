type StarRatingProps = {
  rating: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

export default function StarRating({ rating, className = "" }: StarRatingProps) {
  return (
    <div
      className={`flex items-center gap-0.5 text-blush ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path
            strokeLinejoin="round"
            d="M10 1.6l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.8l-5.2 2.82.99-5.8-4.21-4.1 5.82-.85L10 1.6z"
          />
        </svg>
      ))}
    </div>
  );
}
