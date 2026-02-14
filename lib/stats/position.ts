/**
 * Medidas de posición: cuartiles, deciles, percentiles
 */

export function quantile(data: number[], p: number): number {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const pos = p * (n + 1);
  const intPart = Math.floor(pos);
  const fracPart = pos - intPart;

  if (intPart <= 0) return sorted[0];
  if (intPart >= n) return sorted[n - 1];

  return sorted[intPart - 1] + fracPart * (sorted[intPart] - sorted[intPart - 1]);
}

export function quartile(data: number[], q: 1 | 2 | 3): number {
  return quantile(data, q / 4);
}

export function decile(data: number[], d: number): number {
  return quantile(data, d / 10);
}

export function percentile(data: number[], p: number): number {
  return quantile(data, p / 100);
}

export function iqr(data: number[]): number {
  return quartile(data, 3) - quartile(data, 1);
}
