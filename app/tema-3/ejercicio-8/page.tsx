"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { round } from "@/lib/stats/descriptive";

// Datos
const empresas = [
  { nombre: "A", peso: 0.30, media: 541.6, var: 53033.5, d2: 325.9, d8: 776.3 },
  { nombre: "B", peso: 0.45, media: 601.8, var: 63172.1, d2: 340.6, d8: 810.6 },
  { nombre: "C", peso: 0.25, media: 137.3, var: 21970.7, d2: 61.8, d8: 151.0 },
];

// a) Media del holding
const mediaHolding = empresas.reduce((sum, e) => sum + e.peso * e.media, 0);

// b) Variabilidad del 40% centrado (D3 a D7, o lo que es recorrido D8-D2 para el 60% central simplificado)
// El "40% de la distribución centrada" se refiere al recorrido entre D3 y D7 (40% central)
// Usamos D3 y D7 del enunciado
const empresasDeciles = [
  { nombre: "A", d3: 454.1, d7: 623.8 },
  { nombre: "B", d3: 401.1, d7: 776.2 },
  { nombre: "C", d3: 69.8, d7: 136.1 },
];
const riDeciles = empresasDeciles.map(e => ({
  nombre: e.nombre,
  ri: round(e.d7 - e.d3, 1),
}));

// c) Facturación máxima del 20% de días con menos facturación en C → D2 de C
const facturacionC_D2 = 61.8;

// d) Empresa B: incremento 15%, Empresa A: +100€
const newMediaB = round(empresas[1].media * 1.15, 2);
const newVarB = round(empresas[1].var * (1.15 ** 2), 2);
const newMediaA = round(empresas[0].media + 100, 2);
const newVarA = round(empresas[0].var, 2); // la varianza no cambia con cambio de origen

export default function Ejercicio8() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={8}
      title="Análisis de Holding Empresarial"
      difficulty="Alto"
      category="Media ponderada, dispersión, transformación"
      statement={
        <div className="space-y-2">
          <p>Considere un holding de tres empresas: A (30%), B (45%) y C (25%). La facturación diaria se resume en:</p>
          <Card className="overflow-hidden text-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead className="text-center">Media</TableHead>
                  <TableHead className="text-center">s²</TableHead>
                  <TableHead className="text-center">D2</TableHead>
                  <TableHead className="text-center">D3</TableHead>
                  <TableHead className="text-center">D7</TableHead>
                  <TableHead className="text-center">D8</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { n: "A", m: 541.6, v: "53033.5", d2: 325.9, d3: 454.1, d7: 623.8, d8: 776.3 },
                  { n: "B", m: 601.8, v: "63172.1", d2: 340.6, d3: 401.1, d7: 776.2, d8: 810.6 },
                  { n: "C", m: 137.3, v: "21970.7", d2: 61.8, d3: 69.8, d7: 136.1, d8: 151.0 },
                ].map((e) => (
                  <TableRow key={e.n}>
                    <TableCell className="font-medium">{e.n}</TableCell>
                    <TableCell className="text-center">{e.m}</TableCell>
                    <TableCell className="text-center">{e.v}</TableCell>
                    <TableCell className="text-center">{e.d2}</TableCell>
                    <TableCell className="text-center">{e.d3}</TableCell>
                    <TableCell className="text-center">{e.d7}</TableCell>
                    <TableCell className="text-center">{e.d8}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Media de facturación del holding</li>
            <li>¿Cuál tiene más variabilidad en el 40% de la distribución centrada?</li>
            <li>En C, facturación máxima del 20% de días con menos facturación</li>
            <li>Si B sube 15% y A sube 100€, nuevas medias y varianzas</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-7"
      nextUrl="/tema-3/complementario-1"
    >
      <StepCard stepNumber={1} title="Media del holding" variant="calculation">
        <FormulaDisplay math={`\\bar{x}_{holding} = \\sum w_k \\cdot \\bar{x}_k = 0.30 \\cdot 541.6 + 0.45 \\cdot 601.8 + 0.25 \\cdot 137.3`} />
        <FormulaDisplay math={`= ${round(0.30 * 541.6, 2)} + ${round(0.45 * 601.8, 2)} + ${round(0.25 * 137.3, 2)} = ${round(mediaHolding, 2)} €`} />
        <ResultCard label="Media del holding" value={`${round(mediaHolding, 2)} €`} />
      </StepCard>

      <StepCard stepNumber={2} title="Variabilidad del 40% centrado" variant="calculation">
        <p>El 40% de la distribución centrada corresponde al rango entre el <strong>decil 3 (D3)</strong> y el <strong>decil 7 (D7)</strong>:</p>
        <FormulaDisplay math={`RI_{40\\%} = D_7 - D_3`} />
        {riDeciles.map((e) => (
          <FormulaDisplay key={e.nombre} math={`RI_{${e.nombre}} = ${empresasDeciles.find(d => d.nombre === e.nombre)!.d7} - ${empresasDeciles.find(d => d.nombre === e.nombre)!.d3} = ${e.ri}`} />
        ))}
        <ResultCard label="Mayor variabilidad en 40% centrado" value={`Empresa B (RI = ${riDeciles[1].ri})`} />
      </StepCard>

      <StepCard stepNumber={3} title="Facturación máxima del 20% inferior en C" variant="calculation">
        <p>El 20% de días con menos facturación tiene su máximo en el <strong>decil 2 (D2)</strong>:</p>
        <FormulaDisplay math={`D_2^C = ${facturacionC_D2} €`} />
        <ResultCard label="Facturación máxima del 20% inferior (C)" value={`${facturacionC_D2} €`} />
      </StepCard>

      <StepCard stepNumber={4} title="Transformaciones de variables" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3">
            <p className="font-semibold text-sm mb-2">Empresa B: incremento del 15% (cambio de escala)</p>
            <FormulaDisplay math={`Y_B = 1.15 \\cdot X_B`} />
            <FormulaDisplay math={`\\bar{y}_B = 1.15 \\cdot ${empresas[1].media} = ${newMediaB} €`} />
            <FormulaDisplay math={`s_{Y_B}^2 = 1.15^2 \\cdot s_{X_B}^2 = ${round(1.15 ** 2, 4)} \\cdot ${empresas[1].var} = ${newVarB}`} />
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-3">
            <p className="font-semibold text-sm mb-2">Empresa A: incremento de 100€ (cambio de origen)</p>
            <FormulaDisplay math={`Y_A = X_A + 100`} />
            <FormulaDisplay math={`\\bar{y}_A = ${empresas[0].media} + 100 = ${newMediaA} €`} />
            <FormulaDisplay math={`s_{Y_A}^2 = s_{X_A}^2 = ${newVarA} \\text{ (la varianza NO cambia con cambio de origen)}`} />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          <ResultCard label="Nueva media B" value={`${newMediaB} €`} />
          <ResultCard label="Nueva varianza B" value={`${newVarB}`} />
          <ResultCard label="Nueva media A" value={`${newMediaA} €`} />
          <ResultCard label="Nueva varianza A" value={`${newVarA} (sin cambio)`} />
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
