interface GuidePath {
  progress: number;
  viewportWidth: number;
  viewportHeight: number;
  guideWidth: number;
  guideHeight: number;
  crossingCenter: number | null;
  still: boolean;
}

// Follow the outer gutter; traverse only while the dedicated empty lane is visible.
export function guidePosition({ progress, viewportWidth, viewportHeight, guideWidth, guideHeight, crossingCenter, still }: GuidePath) {
  const right = Math.max(0, viewportWidth - guideWidth - 2);
  const left = Math.min(2, right);
  const bottom = Math.max(0, viewportHeight - guideHeight - 16);
  if (still) return { x: right, y: bottom };
  if (crossingCenter !== null) {
    const start = viewportHeight * 0.75;
    const end = viewportHeight * 0.25;
    const crossing = Math.min(1, Math.max(0, (start - crossingCenter) / (start - end)));
    if (crossingCenter <= start && crossingCenter >= end) {
      return { x: right + (left - right) * crossing, y: crossingCenter - guideHeight / 2 };
    }
    if (crossingCenter < end) {
      return { x: left, y: Math.min(bottom, end - guideHeight / 2 + (end - crossingCenter) * 0.12) };
    }
    return { x: right, y: Math.max(90, start - guideHeight / 2 - (crossingCenter - start) * 0.12) };
  }
  return { x: right, y: Math.min(bottom, 90 + Math.max(0, Math.min(1, progress)) * (bottom - 90)) };
}
