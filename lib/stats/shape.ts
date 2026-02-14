/**
 * Medidas de forma: asimetría y curtosis
 */

import { mean, stdDev } from "./descriptive";

export function fisherAsymmetry(data: number[]): number {
  const m = mean(data);
  const s = stdDev(data);
  const n = data.length;
  if (s === 0) return 0;
  return data.reduce((sum, x) => sum + ((x - m) / s) ** 3, 0) / n;
}

export function pearsonAsymmetry(meanVal: number, modeVal: number, stdVal: number): number {
  if (stdVal === 0) return 0;
  return (meanVal - modeVal) / stdVal;
}

export function kurtosis(data: number[]): number {
  const m = mean(data);
  const s = stdDev(data);
  const n = data.length;
  if (s === 0) return 0;
  return data.reduce((sum, x) => sum + ((x - m) / s) ** 4, 0) / n - 3;
}
