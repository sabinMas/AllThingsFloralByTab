type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow ? (
        <p className="font-script text-2xl text-blush">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl text-ink sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-xl font-body text-lg text-ink-soft">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
