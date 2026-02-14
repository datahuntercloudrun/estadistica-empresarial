"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BarChartCustom } from "@/components/charts/bar-chart-custom";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const data = [
  { interval: "0-100", empresas: 25 },
  { interval: "100-200", empresas: 37 },
  { interval: "200-300", empresas: 12 },
  { interval: "300-400", empresas: 20 },
  { interval: "400-500", empresas: 22 },
  { interval: "500-600", empresas: 21 },
  { interval: "600-700", empresas: 13 },
  { interval: "700-800", empresas: 5 },
  { interval: "800-900", empresas: 3 },
  { interval: "900-1000", empresas: 2 },
];

const totalEmpresas = data.reduce((sum, d) => sum + d.empresas, 0);

// a) Empresas con más de 200 puestos
const masde200 = data.filter((d) => {
  const lower = parseInt(d.interval.split("-")[0]);
  return lower >= 200;
}).reduce((sum, d) => sum + d.empresas, 0);

// b) Empresas con más de 100 y menos de 400 puestos
const entre100y400 = data.filter((d) => {
  const lower = parseInt(d.interval.split("-")[0]);
  return lower >= 100 && lower < 400;
}).reduce((sum, d) => sum + d.empresas, 0);

const porcentaje100a400 = (entre100y400 / totalEmpresas) * 100;

export default function Complementario2() {
  return (
    <ExerciseLayout
      tema={2}
      exerciseNumber="C2"
      title="Puestos de Trabajo en Empresas"
      difficulty="Bajo-Medio"
      category="Distribuciones de frecuencias"
      statement={
        <div className="space-y-2">
          <p>Tomada al azar una muestra de 160 pequeñas y medianas empresas, se obtuvo la siguiente distribución:</p>
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Puestos de trabajo</TableHead>
                  <TableHead className="text-center">N.o de empresas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell>{d.interval}</TableCell>
                    <TableCell className="text-center">{d.empresas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <p>Se pide:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Número de empresas con más de 200 puestos de trabajo</li>
            <li>b) Empresas con más de 100 y menos de 400 puestos (en %)</li>
            <li>c) Represente gráficamente la distribución</li>
          </ul>
        </div>
      }
      prevUrl="/tema-2/complementario-1"
      nextUrl="/tema-3/ejercicio-1"
    >
      <StepCard stepNumber={1} title="a) Empresas con más de 200 puestos" variant="calculation">
        <p>Sumamos las frecuencias de los intervalos desde 200 en adelante:</p>
        <FormulaDisplay math={`\\text{Empresas} = ${data.filter(d => parseInt(d.interval.split("-")[0]) >= 200).map(d => d.empresas).join(" + ")} = ${masde200}`} />
        <ResultCard label="Empresas con más de 200 puestos" value={`${masde200} empresas`} />
      </StepCard>

      <StepCard stepNumber={2} title="b) Empresas entre 100 y 400 puestos" variant="calculation">
        <p>Sumamos los intervalos [100-200), [200-300) y [300-400):</p>
        <FormulaDisplay math={`\\text{Empresas} = 37 + 12 + 20 = ${entre100y400}`} />
        <FormulaDisplay math={`\\text{Porcentaje} = \\frac{${entre100y400}}{${totalEmpresas}} \\times 100 = ${porcentaje100a400.toFixed(2)}\\%`} />
        <ResultCard label="Empresas entre 100-400 puestos" value={`${entre100y400} empresas (${porcentaje100a400.toFixed(2)}%)`} />
      </StepCard>

      <StepCard stepNumber={3} title="c) Representación gráfica" variant="explanation">
        <BarChartCustom
          data={data.map((d) => ({ name: d.interval, value: d.empresas }))}
          title="Distribución de puestos de trabajo por empresas"
          xLabel="Puestos de trabajo"
          yLabel="N.o de empresas"
        />
      </StepCard>
    </ExerciseLayout>
  );
}
