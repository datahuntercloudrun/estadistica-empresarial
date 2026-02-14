"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FrequencyTable } from "@/components/stats/frequency-table";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BarChartCustom } from "@/components/charts/bar-chart-custom";
import { BoxPlot } from "@/components/charts/box-plot";
import { mean, median, mode, variance, stdDev, round } from "@/lib/stats/descriptive";
import { quartile, decile } from "@/lib/stats/position";
import { frequencyTable } from "@/lib/stats/frequencies";

const rawData = [
  19, 30, 20, 23, 24, 21, 20, 25, 26, 20, 21, 29, 28,
  30, 19, 27, 29, 22, 25, 28, 20, 27, 26, 21, 30, 28,
  27, 26, 19, 27, 25, 23, 22, 29, 21, 26, 24, 28, 30,
  25, 25, 24, 26, 23, 29, 27, 28, 26, 27, 26, 22, 26,
  27, 29, 28, 23, 22, 24, 26, 23,
];

const sorted = [...rawData].sort((a, b) => a - b);
const freqTable = frequencyTable(rawData);
const m = mean(rawData);
const med = median(rawData);
const mod = mode(rawData);
const v = variance(rawData);
const s = stdDev(rawData);
const q1 = quartile(rawData, 1);
const q3 = quartile(rawData, 3);
const d2 = decile(rawData, 2);

export default function Complementario1() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber="C1"
      title="Análisis Completo de Salarios"
      difficulty="Medio"
      category="Estadística descriptiva completa"
      statement={
        <div className="space-y-2">
          <p>Salarios diarios (en 10€) de trabajadores de una fábrica:</p>
          <p className="font-mono text-xs bg-white p-2 rounded">{rawData.join(", ")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Mediana</li>
            <li>b) Moda</li>
            <li>c) Salario medio</li>
            <li>d) Varianza y desviación típica</li>
            <li>e) Primer cuartil y segundo decil</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-8"
      nextUrl="/tema-3/complementario-2"
    >
      <StepCard stepNumber={1} title="Tabla de frecuencias" variant="calculation">
        <FrequencyTable
          data={freqTable.map(r => ({ xi: r.xi, ni: r.ni, fi: r.fi, Ni: r.Ni, Fi: r.Fi }))}
          title="Distribución de salarios (en 10€)"
        />
      </StepCard>

      <StepCard stepNumber={2} title="Diagrama de barras" variant="explanation">
        <BarChartCustom
          data={freqTable.map(r => ({ name: r.xi, value: r.ni }))}
          title="Frecuencia de salarios"
          xLabel="Salario (×10€)"
          yLabel="Frecuencia"
        />
      </StepCard>

      <StepCard stepNumber={3} title="a) Mediana" variant="calculation">
        <FormulaDisplay math={`n = ${rawData.length}, \\quad \\text{Posición} = \\frac{${rawData.length}+1}{2} = ${(rawData.length + 1) / 2}`} />
        <FormulaDisplay math={`Me = ${round(med, 2)} \\text{ (×10€)}`} />
        <ResultCard label="Mediana" value={`${round(med, 2)} (×10€) = ${round(med * 10, 0)}€`} />
      </StepCard>

      <StepCard stepNumber={4} title="b) Moda" variant="calculation">
        <FormulaDisplay math={`Mo = ${mod.join(", ")} \\text{ (×10€)}`} />
        <p className="text-xs text-muted-foreground">Es el valor con mayor frecuencia ({freqTable.find(r => r.xNum === mod[0])?.ni} veces)</p>
        <ResultCard label="Moda" value={`${mod.join(", ")} (×10€) = ${mod.map(m => m * 10).join(", ")}€`} />
      </StepCard>

      <StepCard stepNumber={5} title="c) Salario medio" variant="calculation">
        <FormulaDisplay math={`\\bar{x} = \\frac{\\sum x_i \\cdot n_i}{n} = ${round(m, 4)} \\text{ (×10€)}`} />
        <ResultCard label="Media" value={`${round(m, 4)} (×10€) = ${round(m * 10, 2)}€`} />
      </StepCard>

      <StepCard stepNumber={6} title="d) Varianza y desviación típica" variant="calculation">
        <FormulaDisplay math={`s^2 = ${round(v, 4)} \\text{ (×10€)}^2`} />
        <FormulaDisplay math={`s = ${round(s, 4)} \\text{ (×10€)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ResultCard label="Varianza" value={`${round(v, 4)}`} />
          <ResultCard label="Desviación típica" value={`${round(s, 4)}`} />
        </div>
      </StepCard>

      <StepCard stepNumber={7} title="e) Primer cuartil y segundo decil" variant="calculation">
        <FormulaDisplay math={`Q_1: \\text{posición} = \\frac{${rawData.length}+1}{4} = ${(rawData.length + 1) / 4} \\implies Q_1 = ${round(q1, 2)}`} />
        <FormulaDisplay math={`D_2: \\text{posición} = \\frac{2 \\cdot (${rawData.length}+1)}{10} = ${(2 * (rawData.length + 1)) / 10} \\implies D_2 = ${round(d2, 2)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ResultCard label="Q1" value={`${round(q1, 2)} (×10€)`} />
          <ResultCard label="D2" value={`${round(d2, 2)} (×10€)`} />
        </div>
      </StepCard>

      <StepCard stepNumber={8} title="Boxplot" variant="explanation">
        <BoxPlot
          min={Math.min(...rawData)}
          q1={round(q1, 2)}
          median={round(med, 2)}
          q3={round(q3, 2)}
          max={Math.max(...rawData)}
          title="Diagrama de caja - Salarios (×10€)"
          label="Salario (×10€)"
        />
      </StepCard>
    </ExerciseLayout>
  );
}
