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
