// A time-based crossing avoids sweeping across the screen on a tiny scroll.
export function crossingPosition(start: number, end: number, center: number, progress: number) {
  const t = Math.max(0, Math.min(1, progress));
  const eased = t * t * (3 - 2 * t);
  return { x: start + (end - start) * eased, y: center - 39 };
}
