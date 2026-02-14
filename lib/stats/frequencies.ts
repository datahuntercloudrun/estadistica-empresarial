/**
 * Tablas de frecuencias
 */

export interface FrequencyRow {
  xi: string;
  xNum: number;
  ni: number;
  fi: number;
  Ni: number;
  Fi: number;
  di?: number;
}

export function frequencyTable(data: number[]): FrequencyRow[] {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const freq = new Map<number, number>();
  for (const x of sorted) {
    freq.set(x, (freq.get(x) || 0) + 1);
  }

  const rows: FrequencyRow[] = [];
  let Ni = 0;
  for (const [value, count] of [...freq.entries()].sort((a, b) => a[0] - b[0])) {
    Ni += count;
    rows.push({
      xi: value.toString(),
      xNum: value,
      ni: count,
      fi: count / n,
      Ni,
      Fi: Ni / n,
    });
  }
  return rows;
}

export interface GroupedFrequencyRow {
  interval: string;
  lowerBound: number;
  upperBound: number;
  xi: number;
  ni: number;
  fi: number;
  Ni: number;
  Fi: number;
  di: number;
  amplitude: number;
}

export function groupedFrequencyTable(
  data: number[],
  intervals: [number, number][]
): GroupedFrequencyRow[] {
  const n = data.length;
  const rows: GroupedFrequencyRow[] = [];
  let Ni = 0;

  for (let k = 0; k < intervals.length; k++) {
    const [lower, upper] = intervals[k];
    const amplitude = upper - lower;
    const xi = (lower + upper) / 2;

    let count = 0;
    for (const x of data) {
      if (k === 0) {
        if (x >= lower && x <= upper) count++;
      } else {
        if (x > lower && x <= upper) count++;
      }
    }

    Ni += count;
    const fi = count / n;

    rows.push({
      interval: k === 0 ? `[${lower}, ${upper}]` : `(${lower}, ${upper}]`,
      lowerBound: lower,
      upperBound: upper,
      xi,
      ni: count,
      fi,
      Ni,
      Fi: Ni / n,
      di: fi / amplitude,
      amplitude,
    });
  }

  return rows;
}

export function createEqualIntervals(
  min: number,
  max: number,
  amplitude: number
): [number, number][] {
  const intervals: [number, number][] = [];
  let current = min;
  while (current < max) {
    intervals.push([current, Math.min(current + amplitude, max + amplitude)]);
    current += amplitude;
  }
  return intervals;
}
