const TAGLINE = 'Shaping the future of data at Ohio State.';
const words = TAGLINE.split(' ');

export function AnimatedTagline({
  className = '',
  highlightClassName = 'text-[var(--highlight)]',
}: {
  className?: string;
  highlightClassName?: string;
}) {
  return (
    <span className={className}>
      <span className="sr-only">{TAGLINE}</span>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`tagline-word ${word === 'data' ? highlightClassName : ''}`}
          style={{ animationDelay: `${150 + i * 110}ms` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
