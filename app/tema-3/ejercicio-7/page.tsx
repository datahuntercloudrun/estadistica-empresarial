"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { PieChartCustom } from "@/components/charts/pie-chart-custom";
import { round, weightedMean } from "@/lib/stats/descriptive";

const estratos = [
  { nombre: "A1", n: 50, media: 2 },
  { nombre: "A2", n: 100, media: 7 },
  { nombre: "A3", n: 200, media: 10 },
];

const totalN = estratos.reduce((s, e) => s + e.n, 0);
const mediaPoblacion = weightedMean(
  estratos.map((e) => e.media),
  estratos.map((e) => e.n)
);

export default function Ejercicio7() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={7}
      title="Media Ponderada de Población Estratificada"
      difficulty="Bajo"
      category="Media ponderada"
      statement={
        <div className="space-y-2">
          <p>Tenemos una población dividida en tres estratos: A1, A2 y A3.</p>
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead><tr className="bg-gray-100"><th className="border p-2">Estrato</th><th className="border p-2">N</th><th className="border p-2">Media</th></tr></thead>
              <tbody>
                {estratos.map((e) => (
                  <tr key={e.nombre}><td className="border p-2 text-center">{e.nombre}</td><td className="border p-2 text-center">{e.n}</td><td className="border p-2 text-center">{e.media}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Obtenga la media aritmética para el conjunto de la población.</p>
        </div>
      }
      prevUrl="/tema-3/ejercicio-6"
      nextUrl="/tema-3/ejercicio-8"
    >
      <StepCard stepNumber={1} title="Fórmula de la media ponderada" variant="explanation">
        <p>Cuando la población está dividida en estratos, la media global es la media ponderada por el tamaño de cada estrato:</p>
        <FormulaDisplay math={`\\bar{x} = \\frac{\\sum N_k \\cdot \\bar{x}_k}{\\sum N_k} = \\frac{N_1 \\cdot \\bar{x}_1 + N_2 \\cdot \\bar{x}_2 + N_3 \\cdot \\bar{x}_3}{N_1 + N_2 + N_3}`} />
      </StepCard>

      <StepCard stepNumber={2} title="Cálculo" variant="calculation">
        <FormulaDisplay math={`\\bar{x} = \\frac{50 \\cdot 2 + 100 \\cdot 7 + 200 \\cdot 10}{50 + 100 + 200}`} />
        <FormulaDisplay math={`\\bar{x} = \\frac{100 + 700 + 2000}{350} = \\frac{2800}{350} = ${round(mediaPoblacion, 2)}`} />
        <ResultCard label="Media de la población" value={`${round(mediaPoblacion, 2)}`} />
      </StepCard>

      <StepCard stepNumber={3} title="Peso de cada estrato" variant="explanation">
        <PieChartCustom
          data={estratos.map((e) => ({ name: `${e.nombre} (n=${e.n})`, value: e.n }))}
          title="Proporción de cada estrato en la población"
        />
        <p className="text-xs text-muted-foreground mt-2">
          El estrato A3 (N=200) representa el {round((200 / 350) * 100, 1)}% de la población,
          por lo que su media de 10 tiene el mayor peso en el cálculo.
        </p>
      </StepCard>
    </ExerciseLayout>
  );
}
