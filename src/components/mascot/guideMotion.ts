export const smoothstep = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

// First descend into the lane, then accelerate across it and ease into the dock.
export function crossingPosition(start: number, end: number, center: number, progress: number, startY = center - 43) {
  const turn = smoothstep(progress / .24);
  const run = smoothstep((progress - .12) / .88);
  return { x: start + (end - start) * run, y: startY + (center - 43 - startY) * turn };
}

// Exponential smoothing is independent of display refresh rate.
export function followPosition(current: number, target: number, seconds: number) {
  return current + (target - current) * (1 - Math.exp(-10 * Math.max(0, seconds)));
}
export function crossingDuration(distance: number) {
  return Math.max(3.2, Math.min(5.2, Math.abs(distance) / 240));
}
