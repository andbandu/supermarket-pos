/** Round up to the nearest step (e.g., 0.5, 1, 5, 10) */
export function roundUp(n: number, step: number) {
  return Math.ceil(n / step) * step;
}


