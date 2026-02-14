"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { HistogramChart } from "@/components/charts/histogram-chart";
import { BoxPlot } from "@/components/charts/box-plot";
import { mean, median, mode, variance, stdDev, cv, range, round } from "@/lib/stats/descriptive";
import { quartile, percentile } from "@/lib/stats/position";

const rawData = [
  19.3, 20.5, 17.9, 17.3, 17.1, 15.8, 16.9, 17.1, 19.5, 22.5,
  20.7, 18.5, 22.5, 19.1, 17.9, 18.4, 18.7, 18.8, 17.5, 17.9,
  14.9, 12.3, 19.4, 16.8, 20.1, 17.3, 18.0, 19.5, 17.4, 16.3,
];

const sorted = [...rawData].sort((a, b) => a - b);
const m = mean(rawData);
const med = median(rawData);
const mod = mode(rawData);
const v = variance(rawData);
const s = stdDev(rawData);
const cvVal = cv(rawData);
const r = range(rawData);
const q1 = quartile(rawData, 1);
const q3 = quartile(rawData, 3);
const p45 = percentile(rawData, 45);
const p78 = percentile(rawData, 78);

export default function Ejercicio3() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={3}
      title="Análisis Completo de Cifras de Ventas"
      difficulty="Medio-Alto"
      category="Medidas de centralización, dispersión y posición"
      statement={
        <div className="space-y-2">
          <p>Las cifras de ventas (en miles de €) de una empresa durante 30 semanas:</p>
          <div className="overflow-x-auto">
            <div className="bg-white p-2 rounded text-xs font-mono grid grid-cols-10 gap-1">
              {rawData.map((d, i) => <span key={i} className="text-center">{d}</span>)}
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Media, mediana y moda</li>
            <li>b) Varianza, desviación típica, coeficiente de variación y recorrido</li>
            <li>c) Primer y tercer cuartil, percentiles 45 y 78</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-2"
      nextUrl="/tema-3/ejercicio-4"
    >
      <StepCard stepNumber={1} title="Datos ordenados" variant="explanation">
        <p className="text-xs font-mono bg-gray-50 p-2 rounded leading-relaxed">
          {sorted.map((v, i) => `${v}`).join(", ")}
        </p>
        <p className="text-xs text-muted-foreground">n = {rawData.length} semanas</p>
      </StepCard>

      <StepCard stepNumber={2} title="a) Media aritmética" variant="calculation">
        <FormulaDisplay math={`\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${rawData.reduce((s, x) => s + x, 0).toFixed(1)}}{${rawData.length}} = ${round(m, 4)} \\text{ miles €}`} />
        <ResultCard label="Media" value={`${round(m, 4)} miles €`} />
      </StepCard>

      <StepCard stepNumber={3} title="a) Mediana" variant="calculation">
        <FormulaDisplay math={`\\text{Posición} = \\frac{n+1}{2} = \\frac{31}{2} = 15{,}5`} />
        <FormulaDisplay math={`Me = \\frac{x_{(15)} + x_{(16)}}{2} = \\frac{${sorted[14]} + ${sorted[15]}}{2} = ${round(med, 2)} \\text{ miles €}`} />
        <ResultCard label="Mediana" value={`${round(med, 2)} miles €`} />
      </StepCard>

      <StepCard stepNumber={4} title="a) Moda" variant="calculation">
        <p>Buscamos el valor que más se repite:</p>
        <FormulaDisplay math={`Mo = ${mod.join(", ")} \\text{ miles €}`} />
        <ResultCard label="Moda" value={`${mod.join(", ")} miles €`} />
      </StepCard>

      <StepCard stepNumber={5} title="b) Varianza y desviación típica" variant="calculation">
        <FormulaDisplay math={`s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n} = ${round(v, 4)} \\text{ (miles €)}^2`} />
        <FormulaDisplay math={`s = \\sqrt{s^2} = \\sqrt{${round(v, 4)}} = ${round(s, 4)} \\text{ miles €}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ResultCard label="Varianza" value={`${round(v, 4)} (miles €)²`} />
          <ResultCard label="Desviación típica" value={`${round(s, 4)} miles €`} />
        </div>
      </StepCard>

      <StepCard stepNumber={6} title="b) Coeficiente de variación y recorrido" variant="calculation">
        <FormulaDisplay math={`CV = \\frac{s}{|\\bar{x}|} \\times 100 = \\frac{${round(s, 4)}}{${round(m, 4)}} \\times 100 = ${round(cvVal, 2)}\\%`} />
        <FormulaDisplay math={`Re = x_{max} - x_{min} = ${Math.max(...rawData)} - ${Math.min(...rawData)} = ${round(r, 1)} \\text{ miles €}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ResultCard label="Coeficiente de variación" value={`${round(cvVal, 2)}%`} />
          <ResultCard label="Recorrido" value={`${round(r, 1)} miles €`} />
        </div>
      </StepCard>

      <StepCard stepNumber={7} title="c) Cuartiles y percentiles" variant="calculation">
        <FormulaDisplay math={`Q_1: \\text{posición} = \\frac{n+1}{4} = \\frac{31}{4} = 7{,}75 \\implies Q_1 = ${round(q1, 2)}`} />
        <FormulaDisplay math={`Q_3: \\text{posición} = \\frac{3(n+1)}{4} = \\frac{93}{4} = 23{,}25 \\implies Q_3 = ${round(q3, 2)}`} />
        <FormulaDisplay math={`P_{45}: \\text{posición} = \\frac{45 \\cdot 31}{100} = 13{,}95 \\implies P_{45} = ${round(p45, 2)}`} />
        <FormulaDisplay math={`P_{78}: \\text{posición} = \\frac{78 \\cdot 31}{100} = 24{,}18 \\implies P_{78} = ${round(p78, 2)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ResultCard label="Q1" value={`${round(q1, 2)} miles €`} />
          <ResultCard label="Q3" value={`${round(q3, 2)} miles €`} />
          <ResultCard label="P45" value={`${round(p45, 2)} miles €`} />
          <ResultCard label="P78" value={`${round(p78, 2)} miles €`} />
        </div>
      </StepCard>

      <StepCard stepNumber={8} title="Boxplot de las ventas" variant="explanation">
        <BoxPlot
          min={Math.min(...rawData)}
          q1={round(q1, 2)}
          median={round(med, 2)}
          q3={round(q3, 2)}
          max={Math.max(...rawData)}
          title="Diagrama de caja - Ventas semanales (miles €)"
          label="Ventas (miles €)"
        />
      </StepCard>
    </ExerciseLayout>
  );
}
