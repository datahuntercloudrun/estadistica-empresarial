"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BoxPlot } from "@/components/charts/box-plot";
import { mean, median, variance, stdDev, cv, range, round } from "@/lib/stats/descriptive";
import { quartile, percentile, iqr } from "@/lib/stats/position";

const rawData = [
  163, 132, 154, 152, 148, 159, 144, 139, 146, 144,
  150, 125, 139, 134, 156, 136, 157, 168, 158, 167,
];

const sorted = [...rawData].sort((a, b) => a - b);
const m = mean(rawData);
const s = stdDev(rawData);
const cvVal = cv(rawData);
const med = median(rawData);
const q1 = quartile(rawData, 1);
const q3 = quartile(rawData, 3);
const p95 = percentile(rawData, 95);
const iqrVal = iqr(rawData);
const rangeVal = range(rawData);

export default function Ejercicio4() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={4}
      title="Duración de Baterías"
      difficulty="Medio"
      category="Medidas de posición, dispersión y CV"
      statement={
        <div className="space-y-2">
          <p>Duración (en horas) de 20 baterías producidas en una fábrica:</p>
          <p className="font-mono text-xs bg-white p-2 rounded">
            {rawData.join(", ")}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Duración media. Coeficiente de variación</li>
            <li>b) Duración máxima del 50% que menos duran y mínima del 5% que más duran</li>
            <li>c) Recorrido de la variable y recorrido intercuartílico</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-3"
      nextUrl="/tema-3/ejercicio-5"
    >
      <StepCard stepNumber={1} title="Datos ordenados" variant="explanation">
        <p className="text-xs font-mono bg-gray-50 p-2 rounded">{sorted.join(", ")}</p>
      </StepCard>

      <StepCard stepNumber={2} title="a) Duración media" variant="calculation">
        <FormulaDisplay math={`\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${rawData.reduce((s, x) => s + x, 0)}}{${rawData.length}} = ${round(m, 2)} \\text{ horas}`} />
        <ResultCard label="Media" value={`${round(m, 2)} horas`} />
      </StepCard>

      <StepCard stepNumber={3} title="a) Coeficiente de variación" variant="calculation">
        <FormulaDisplay math={`s = ${round(s, 4)} \\text{ h}`} />
        <FormulaDisplay math={`CV = \\frac{s}{|\\bar{x}|} \\times 100 = \\frac{${round(s, 4)}}{${round(m, 2)}} \\times 100 = ${round(cvVal, 2)}\\%`} />
        <ResultCard label="Coeficiente de variación" value={`${round(cvVal, 2)}%`} />
      </StepCard>

      <StepCard stepNumber={4} title="b) Mediana (50% que menos duran)" variant="calculation">
        <p>La duración máxima del 50% de baterías que menos duran es la <strong>mediana</strong>:</p>
        <FormulaDisplay math={`Me = Q_2 = ${round(med, 2)} \\text{ horas}`} />
        <ResultCard label="Duración máxima del 50% inferior" value={`${round(med, 2)} horas (mediana)`} />
      </StepCard>

      <StepCard stepNumber={5} title="b) Percentil 95 (5% que más duran)" variant="calculation">
        <p>La duración mínima del 5% de baterías que más duran es el <strong>percentil 95</strong>:</p>
        <FormulaDisplay math={`P_{95}: \\text{posición} = \\frac{95 \\cdot (20+1)}{100} = 19{,}95`} />
        <FormulaDisplay math={`P_{95} = ${round(p95, 2)} \\text{ horas}`} />
        <ResultCard label="Duración mínima del 5% superior" value={`${round(p95, 2)} horas (P95)`} />
      </StepCard>

      <StepCard stepNumber={6} title="c) Recorrido y recorrido intercuartílico" variant="calculation">
        <FormulaDisplay math={`Re = x_{max} - x_{min} = ${Math.max(...rawData)} - ${Math.min(...rawData)} = ${rangeVal} \\text{ horas}`} />
        <FormulaDisplay math={`RIC = Q_3 - Q_1 = ${round(q3, 2)} - ${round(q1, 2)} = ${round(iqrVal, 2)} \\text{ horas}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ResultCard label="Recorrido" value={`${rangeVal} horas`} />
          <ResultCard label="RIC" value={`${round(iqrVal, 2)} horas`} />
        </div>
      </StepCard>

      <StepCard stepNumber={7} title="Boxplot" variant="explanation">
        <BoxPlot
          min={Math.min(...rawData)}
          q1={round(q1, 2)}
          median={round(med, 2)}
          q3={round(q3, 2)}
          max={Math.max(...rawData)}
          title="Diagrama de caja - Duración de baterías (horas)"
          label="Duración (horas)"
        />
      </StepCard>
    </ExerciseLayout>
  );
}
