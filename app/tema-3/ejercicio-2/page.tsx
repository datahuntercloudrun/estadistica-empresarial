"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FrequencyTable } from "@/components/stats/frequency-table";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BarChartCustom } from "@/components/charts/bar-chart-custom";
import { frequencyTable } from "@/lib/stats/frequencies";
import { mean, median, mode, round } from "@/lib/stats/descriptive";

const rawData = [6, 1, 6, 3, 1, 4, 5, 2, 5, 6, 1, 5, 3, 4, 1, 4, 6, 1, 2, 1];

const freqTable = frequencyTable(rawData);
const m = mean(rawData);
const med = median(rawData);
const mod = mode(rawData);

export default function Ejercicio2() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={2}
      title="Análisis de Lanzamiento de Dado"
      difficulty="Bajo"
      category="Estadística descriptiva básica"
      statement={
        <div className="space-y-2">
          <p>Se ha lanzado un dado 20 veces y se han obtenido los resultados:</p>
          <p className="font-mono text-sm bg-white p-2 rounded">
            {rawData.join(", ")}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Presente los resultados en una tabla estadística</li>
            <li>b) Realice su representación gráfica</li>
            <li>c) Obtenga la media aritmética, mediana y moda</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-1"
      nextUrl="/tema-3/ejercicio-3"
    >
      <StepCard stepNumber={1} title="a) Tabla estadística" variant="calculation">
        <FrequencyTable
          data={freqTable.map((r) => ({ xi: r.xi, ni: r.ni, fi: r.fi, Ni: r.Ni, Fi: r.Fi }))}
          title="Tabla de frecuencias - Lanzamiento de dado"
        />
      </StepCard>

      <StepCard stepNumber={2} title="b) Representación gráfica" variant="explanation">
        <BarChartCustom
          data={freqTable.map((r) => ({ name: r.xi, value: r.ni }))}
          title="Diagrama de barras - Resultados del dado"
          xLabel="Cara del dado"
          yLabel="Frecuencia absoluta"
        />
      </StepCard>

      <StepCard stepNumber={3} title="c) Media aritmética" variant="calculation">
        <FormulaDisplay math={`\\bar{x} = \\frac{\\sum x_i \\cdot n_i}{n} = \\frac{${rawData.reduce((s, x) => s + x, 0)}}{${rawData.length}} = ${round(m, 2)}`} />
        <ResultCard label="Media aritmética" value={`${round(m, 2)}`} />
      </StepCard>

      <StepCard stepNumber={4} title="c) Mediana" variant="calculation">
        <p>Ordenamos los datos y buscamos la posición central:</p>
        <FormulaDisplay math={`\\text{Posición} = \\frac{n+1}{2} = \\frac{${rawData.length}+1}{2} = ${(rawData.length + 1) / 2}`} />
        <p>Como n={rawData.length} es par, la mediana es la media de los valores en posiciones 10 y 11:</p>
        <p className="text-xs font-mono bg-gray-50 p-2 rounded">
          Datos ordenados: {[...rawData].sort((a, b) => a - b).join(", ")}
        </p>
        <FormulaDisplay math={`Me = \\frac{x_{(10)} + x_{(11)}}{2} = \\frac{${[...rawData].sort((a, b) => a - b)[9]} + ${[...rawData].sort((a, b) => a - b)[10]}}{2} = ${med}`} />
        <ResultCard label="Mediana" value={`${med}`} />
      </StepCard>

      <StepCard stepNumber={5} title="c) Moda" variant="calculation">
        <p>La moda es el valor que más se repite. Mirando la tabla de frecuencias:</p>
        <FormulaDisplay math={`Mo = ${mod.join(", ")} \\quad (\\text{frecuencia} = ${freqTable.find(r => r.xNum === mod[0])?.ni})`} />
        <ResultCard label="Moda" value={`${mod.join(", ")}`} />
      </StepCard>
    </ExerciseLayout>
  );
}
