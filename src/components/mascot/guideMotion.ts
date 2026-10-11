// A single there-and-back journey through the page, always inside the viewport.
export function guidePosition(progress: number, viewportWidth: number, guideWidth: number, still: boolean) {
  const p = Math.min(1, Math.max(0, progress));
  const inset = Math.min(16, Math.max(0, (viewportWidth - guideWidth) / 2));
  const available = Math.max(0, viewportWidth - guideWidth - inset * 2);
  return {
    x: inset + available * (still ? 1 : 0.5 + 0.5 * Math.cos(p * Math.PI * 2)),
    y: still ? 0 : -Math.sin(p * Math.PI * 2) * 12,
  };
}
