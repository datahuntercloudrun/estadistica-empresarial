/**
 * Distribuciones bivariantes: conjunta, marginal, condicionada
 */

export interface JointEntry {
  x: number;
  y: number;
  nij: number;
}

export interface JointTable {
  xValues: number[];
  yValues: number[];
  frequencies: number[][];
  marginalX: number[];
  marginalY: number[];
  n: number;
}

export function buildJointTable(entries: JointEntry[]): JointTable {
  const xSet = new Set<number>();
  const ySet = new Set<number>();
  for (const e of entries) {
    xSet.add(e.x);
    ySet.add(e.y);
  }

  const xValues = [...xSet].sort((a, b) => a - b);
  const yValues = [...ySet].sort((a, b) => a - b);

  const frequencies: number[][] = xValues.map(() => yValues.map(() => 0));

  for (const e of entries) {
    const i = xValues.indexOf(e.x);
    const j = yValues.indexOf(e.y);
    frequencies[i][j] = e.nij;
  }

  const marginalX = frequencies.map((row) => row.reduce((sum, v) => sum + v, 0));
  const marginalY = yValues.map((_, j) => frequencies.reduce((sum, row) => sum + row[j], 0));
  const n = marginalX.reduce((sum, v) => sum + v, 0);

  return { xValues, yValues, frequencies, marginalX, marginalY, n };
}

export function buildJointTableFromMatrix(
  xValues: number[],
  yValues: number[],
  matrix: number[][]
): JointTable {
  const marginalX = matrix.map((row) => row.reduce((sum, v) => sum + v, 0));
  const marginalY = yValues.map((_, j) => matrix.reduce((sum, row) => sum + row[j], 0));
  const n = marginalX.reduce((sum, v) => sum + v, 0);

  return { xValues, yValues, frequencies: matrix, marginalX, marginalY, n };
}

export function conditionalYGivenX(
  table: JointTable,
  xValue: number
): { y: number; nij: number; fij: number }[] {
  const i = table.xValues.indexOf(xValue);
  if (i === -1) return [];
  const totalX = table.marginalX[i];

  return table.yValues.map((y, j) => ({
    y,
    nij: table.frequencies[i][j],
    fij: totalX > 0 ? table.frequencies[i][j] / totalX : 0,
  }));
}

export function conditionalXGivenY(
  table: JointTable,
  yValue: number
): { x: number; nij: number; fij: number }[] {
  const j = table.yValues.indexOf(yValue);
  if (j === -1) return [];
  const totalY = table.marginalY[j];

  return table.xValues.map((x, i) => ({
    x,
    nij: table.frequencies[i][j],
    fij: totalY > 0 ? table.frequencies[i][j] / totalY : 0,
  }));
}

/**
 * Estadística bivariante: covarianza, correlación, regresión
 */

/** Media de X o Y a partir de tabla conjunta */
export function meanFromTable(table: JointTable, axis: "x" | "y"): number {
  const values = axis === "x" ? table.xValues : table.yValues;
  const marginal = axis === "x" ? table.marginalX : table.marginalY;
  return values.reduce((sum, v, i) => sum + v * marginal[i], 0) / table.n;
}

/** Varianza de X o Y a partir de tabla conjunta */
export function varianceFromTable(table: JointTable, axis: "x" | "y"): number {
  const values = axis === "x" ? table.xValues : table.yValues;
  const marginal = axis === "x" ? table.marginalX : table.marginalY;
  const m = meanFromTable(table, axis);
  return values.reduce((sum, v, i) => sum + (v - m) ** 2 * marginal[i], 0) / table.n;
}

/** Momento al origen a(r,s) desde tabla conjunta */
export function momentOrigin(table: JointTable, r: number, s: number): number {
  let sum = 0;
  for (let i = 0; i < table.xValues.length; i++) {
    for (let j = 0; j < table.yValues.length; j++) {
      sum += Math.pow(table.xValues[i], r) * Math.pow(table.yValues[j], s) * table.frequencies[i][j];
    }
  }
  return sum / table.n;
}

/** Covarianza desde tabla conjunta: sxy = media(xy) - media(x)*media(y) */
export function covarianceFromTable(table: JointTable): number {
  const xyMean = momentOrigin(table, 1, 1);
  const xMean = meanFromTable(table, "x");
  const yMean = meanFromTable(table, "y");
  return xyMean - xMean * yMean;
}

/** Covarianza desde pares de datos (x[], y[]) */
export function covarianceFromPairs(x: number[], y: number[]): number {
  const n = x.length;
  const xMean = x.reduce((s, v) => s + v, 0) / n;
  const yMean = y.reduce((s, v) => s + v, 0) / n;
  const xyMean = x.reduce((s, v, i) => s + v * y[i], 0) / n;
  return xyMean - xMean * yMean;
}

/** Covarianza desde sumas: sxy = (Σxiyi/n) - x̄·ȳ */
export function covarianceFromSums(
  sumXY: number, sumX: number, sumY: number, n: number
): number {
  return sumXY / n - (sumX / n) * (sumY / n);
}

/** Coeficiente de correlación lineal: r = sxy / (sx * sy) */
export function correlation(sxy: number, sx: number, sy: number): number {
  if (sx === 0 || sy === 0) return 0;
  return sxy / (sx * sy);
}

/** Coeficiente de determinación: R² = sxy² / (sx² * sy²) */
export function rSquared(sxy: number, sx2: number, sy2: number): number {
  if (sx2 === 0 || sy2 === 0) return 0;
  return (sxy * sxy) / (sx2 * sy2);
}

export interface RegressionLine {
  alpha: number;
  beta: number;
  equation: string;
}

/** Recta de regresión de Y sobre X: ŷ(x) = α + βx */
export function regressionYX(
  xMean: number, yMean: number, sxy: number, sx2: number
): RegressionLine {
  const beta = sxy / sx2;
  const alpha = yMean - beta * xMean;
  return { alpha, beta, equation: `ŷ(x) = ${alpha.toFixed(2)} + ${beta.toFixed(2)}x` };
}

/** Recta de regresión de X sobre Y: x̂(y) = α' + β'y */
export function regressionXY(
  xMean: number, yMean: number, sxy: number, sy2: number
): RegressionLine {
  const beta = sxy / sy2;
  const alpha = xMean - beta * yMean;
  return { alpha, beta, equation: `x̂(y) = ${alpha.toFixed(2)} + ${beta.toFixed(2)}y` };
}

/** Predicción con recta de regresión */
export function predict(line: RegressionLine, value: number): number {
  return line.alpha + line.beta * value;
}

/** Verificar independencia estadística: fij = fi. * f.j para todo i,j */
export function checkIndependence(table: JointTable): {
  isIndependent: boolean;
  expectedFreqs: number[][];
} {
  const expectedFreqs = table.xValues.map((_, i) =>
    table.yValues.map((_, j) =>
      (table.marginalX[i] * table.marginalY[j]) / table.n
    )
  );

  let isIndependent = true;
  for (let i = 0; i < table.xValues.length; i++) {
    for (let j = 0; j < table.yValues.length; j++) {
      if (Math.abs(table.frequencies[i][j] - expectedFreqs[i][j]) > 0.0001) {
        isIndependent = false;
        break;
      }
    }
    if (!isIndependent) break;
  }

  return { isIndependent, expectedFreqs };
}

/** Varianza desde sumas: s² = (Σx²/n) - x̄² */
export function varianceFromSums(sumX2: number, sumX: number, n: number): number {
  const mean = sumX / n;
  return sumX2 / n - mean * mean;
}
