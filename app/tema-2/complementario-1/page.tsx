"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FrequencyTable } from "@/components/stats/frequency-table";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { HistogramChart } from "@/components/charts/histogram-chart";
import { frequencyTable } from "@/lib/stats/frequencies";

const rawData = [
  19, 30, 20, 23, 24, 21, 20, 25, 26, 20, 21, 29, 28,
  30, 19, 27, 29, 22, 25, 28, 20, 27, 26, 21, 30, 28,
  27, 26, 19, 27, 25, 23, 22, 29, 21, 26, 24, 28, 30,
  25, 25, 24, 26, 23, 29, 27, 28, 26, 27, 26, 22, 26,
  27, 29, 28, 23, 22, 24, 26, 23,
];

// a) Tabla sin agrupar
const ungroupedTable = frequencyTable(rawData);

// b) Tabla agrupada en intervalos de amplitud 2
const groupedIntervals: [number, number][] = [
  [19, 21], [21, 23], [23, 25], [25, 27], [27, 29], [29, 31],
];

function computeGrouped() {
  const n = rawData.length;
  const rows: { xi: string; ni: number; fi: number; Ni: number; Fi: number }[] = [];
  let Ni = 0;
  for (let k = 0; k < groupedIntervals.length; k++) {
    const [lower, upper] = groupedIntervals[k];
    let count = 0;
    for (const x of rawData) {
      if (k === 0) {
        if (x >= lower && x < upper) count++;
      } else if (k === groupedIntervals.length - 1) {
        if (x >= lower && x <= upper) count++;
      } else {
        if (x >= lower && x < upper) count++;
      }
    }
    Ni += count;
    rows.push({
      xi: k === groupedIntervals.length - 1 ? `[${lower}, ${upper}]` : `[${lower}, ${upper})`,
      ni: count,
      fi: count / n,
      Ni,
      Fi: Ni / n,
    });
  }
  return rows;
}

const groupedTable = computeGrouped();

const histogramData = groupedTable.map((row) => ({
  interval: row.xi,
  frequency: row.ni,
}));

export default function Complementario1() {
  return (
    <ExerciseLayout
      tema={2}
      exerciseNumber="C1"
      title="Distribución de Salarios"
      difficulty="Medio"
      category="Distribuciones de frecuencias"
      statement={
        <div className="space-y-2">
          <p>
            En el departamento de personal de una fábrica se ha realizado una investigación estadística sobre los
            salarios diarios percibidos por su personal (en 10 euros). Los resultados son:
          </p>
          <div className="overflow-x-auto"><div className="bg-white p-3 rounded text-xs font-mono grid grid-cols-13 gap-1">
            {rawData.map((d, i) => (
              <span key={i} className="text-center">{d}</span>
            ))}
          </div></div>
          <p>Se pide:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Distribución de salarios sin agrupar y agrupando en intervalos de igual amplitud</li>
            <li>b) Representación gráfica mediante histograma</li>
          </ul>
        </div>
      }
      prevUrl="/tema-2/ejercicio-5"
      nextUrl="/tema-2/complementario-2"
    >
      <StepCard stepNumber={1} title="a) Distribución sin agrupar" variant="calculation">
        <p>Contamos cuántas veces aparece cada valor de salario:</p>
        <FrequencyTable
          data={ungroupedTable.map((r) => ({ xi: r.xi, ni: r.ni, fi: r.fi, Ni: r.Ni, Fi: r.Fi }))}
          title="Distribución de salarios sin agrupar (en 10€)"
        />
        <FormulaDisplay math={`n = ${rawData.length} \\text{ trabajadores}`} />
      </StepCard>

      <StepCard stepNumber={2} title="a) Distribución agrupada" variant="calculation">
        <p>Agrupamos en intervalos de amplitud 2:</p>
        <FrequencyTable
          data={groupedTable}
          title="Distribución agrupada en intervalos de amplitud 2"
          grouped
        />
      </StepCard>

      <StepCard stepNumber={3} title="b) Histograma" variant="explanation">
        <HistogramChart
          data={histogramData}
          title="Histograma de salarios diarios (en 10€)"
          xLabel="Salario (×10€)"
          yLabel="Frecuencia absoluta"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Se observa que la mayor concentración de salarios está en el intervalo [25, 27), con {groupedTable[3]?.ni} trabajadores.
        </p>
      </StepCard>
    </ExerciseLayout>
  );
}
