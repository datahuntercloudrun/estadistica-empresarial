/**
 * Medidas de tendencia central y dispersión
 */

export function mean(data: number[]): number {
  if (data.length === 0) return 0;
  return data.reduce((sum, x) => sum + x, 0) / data.length;
}

export function weightedMean(values: number[], weights: number[]): number {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const weightedSum = values.reduce((sum, v, i) => sum + v * weights[i], 0);
  return weightedSum / totalWeight;
}

export function median(data: number[]): number {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  if (n === 0) return 0;
  if (n % 2 === 1) {
    return sorted[Math.floor(n / 2)];
  }
  return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

export function mode(data: number[]): number[] {
  const freq = new Map<number, number>();
  for (const x of data) {
    freq.set(x, (freq.get(x) || 0) + 1);
  }
  const maxFreq = Math.max(...freq.values());
  const modes: number[] = [];
  for (const [value, count] of freq) {
    if (count === maxFreq) modes.push(value);
  }
  return modes.sort((a, b) => a - b);
}

export function variance(data: number[]): number {
  const m = mean(data);
  return data.reduce((sum, x) => sum + (x - m) ** 2, 0) / data.length;
}

export function stdDev(data: number[]): number {
  return Math.sqrt(variance(data));
}

export function cv(data: number[]): number {
  const m = mean(data);
  if (m === 0) return Infinity;
  return (stdDev(data) / Math.abs(m)) * 100;
}

export function range(data: number[]): number {
  if (data.length === 0) return 0;
  return Math.max(...data) - Math.min(...data);
}

export function meanDeviation(data: number[]): number {
  const m = mean(data);
  return data.reduce((sum, x) => sum + Math.abs(x - m), 0) / data.length;
}

export function round(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
