"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

// b) Variabilidad del 40% centrado
const empresasDeciles = [
  { nombre: "A", d3: 454.1, d7: 623.8 },
  { nombre: "B", d3: 401.1, d7: 776.2 },
  { nombre: "C", d3: 69.8, d7: 136.1 },
];
const riDeciles = empresasDeciles.map(e => ({
  nombre: e.nombre,
  ri: round(e.d7 - e.d3, 1),
}));

// c)
const facturacionC_D2 = 61.8;

// d)
const newMediaB = round(empresas[1].media * 1.15, 2);
const newVarB = round(empresas[1].var * (1.15 ** 2), 2);
const newMediaA = round(empresas[0].media + 100, 2);
const newVarA = round(empresas[0].var, 2);

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
            <div className="overflow-x-auto">
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
            </div>
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
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este es un <strong>ejercicio integrador</strong> que combina varios conceptos del tema.
          Cada apartado usa una herramienta diferente:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 text-blue-800 text-[10px]">Media ponderada</Badge>
              <p className="text-[10px] text-muted-foreground">Calcular la media del holding combinando empresas de distinto peso.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 text-emerald-800 text-[10px]">Deciles</Badge>
              <p className="text-[10px] text-muted-foreground">Usar D3 y D7 para medir variabilidad del 40% central, y D2 para el 20% inferior.</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 text-violet-800 text-[10px]">Cambio de escala</Badge>
              <p className="text-[10px] text-muted-foreground">Subir un 15% = multiplicar por 1.15. Afecta a media Y varianza.</p>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-rose-200 text-rose-800 text-[10px]">Cambio de origen</Badge>
              <p className="text-[10px] text-muted-foreground">Sumar 100€ = cambio de origen. Afecta a la media pero NO a la varianza.</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 1: Media del holding ============ */}
      <StepCard stepNumber={2} title="a) Media de facturación del holding" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Qué nos piden?</p>
            <p className="text-muted-foreground">
              La facturación media del holding es la <strong>media ponderada</strong> de las tres empresas,
              donde los pesos son las proporciones del holding (A=30%, B=45%, C=25%).
            </p>
            <FormulaDisplay math={`\\bar{x}_{holding} = \\sum w_k \\cdot \\bar{x}_k`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="w_k" /> = peso (proporción) de cada empresa en el holding</p>
              <p><InlineMath math="\bar{x}_k" /> = media de facturación de cada empresa</p>
              <p className="text-muted-foreground">Como los pesos ya suman 1 (30% + 45% + 25% = 100%), no necesitamos dividir.</p>
            </div>
          </CardContent>
        </Card>

        <FormulaDisplay math={`\\bar{x}_{holding} = 0.30 \\cdot 541.6 + 0.45 \\cdot 601.8 + 0.25 \\cdot 137.3`} />
        <FormulaDisplay math={`= ${round(0.30 * 541.6, 2)} + ${round(0.45 * 601.8, 2)} + ${round(0.25 * 137.3, 2)} = ${round(mediaHolding, 2)} €`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>Interpretación:</strong> El holding factura en promedio {round(mediaHolding, 2)}€ diarios.
            La empresa C (media=137.3€) tira la media hacia abajo, pero pesa solo un 25%.
            La empresa B (media=601.8€, peso=45%) es la que más influye.</p>
          </CardContent>
        </Card>

        <ResultCard label="Media del holding" value={`${round(mediaHolding, 2)} €`} />
      </StepCard>

      {/* ============ PASO 2: Variabilidad 40% centrado ============ */}
      <StepCard stepNumber={3} title="b) Variabilidad del 40% centrado" variant="calculation">
        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">¿Qué es el &quot;40% centrado&quot;?</p>
            <p className="text-muted-foreground">
              El 40% central de una distribución es la franja que va desde el <strong>decil 3 (D₃)</strong>
              hasta el <strong>decil 7 (D₇)</strong>.
            </p>
            <div className="bg-white rounded p-2 space-y-1">
              <p>D₃ deja el 30% por debajo → el límite inferior del 40% central.</p>
              <p>D₇ deja el 70% por debajo → el límite superior del 40% central.</p>
              <p>Entre D₃ y D₇ está exactamente el 40% central (70% - 30% = 40%).</p>
            </div>
            <p className="text-muted-foreground">
              La <strong>variabilidad de esta franja</strong> se mide con el rango: D₇ - D₃.
              Cuanto mayor sea esta diferencia, más varían los datos en su zona central.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`RI_{40\\%} = D_7 - D_3`} />
        {riDeciles.map((e) => (
          <FormulaDisplay key={e.nombre} math={`RI_{${e.nombre}} = ${empresasDeciles.find(d => d.nombre === e.nombre)!.d7} - ${empresasDeciles.find(d => d.nombre === e.nombre)!.d3} = ${e.ri}`} />
        ))}

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>Interpretación:</strong> La empresa B tiene el mayor rango en su 40% central ({riDeciles[1].ri}€),
            lo que significa que incluso sus días &quot;normales&quot; son bastante variables.
            La empresa C tiene el menor rango ({riDeciles[2].ri}€), siendo la más estable en su zona central.</p>
          </CardContent>
        </Card>

        <ResultCard label="Mayor variabilidad en 40% centrado" value={`Empresa B (RI = ${riDeciles[1].ri})`} />
      </StepCard>

      {/* ============ PASO 3: D2 de C ============ */}
      <StepCard stepNumber={4} title="c) Facturación máxima del 20% inferior en C" variant="calculation">
        <Card className="bg-violet-50 border-violet-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-violet-800">Traducción de la pregunta</p>
            <p className="text-muted-foreground">
              &quot;Del 20% de días en que la empresa C menos factura, ¿cuál es la facturación más alta?&quot;
            </p>
            <p className="text-muted-foreground">
              El valor que separa el 20% inferior del 80% superior es el <strong>decil 2 (D₂)</strong>.
              D₂ deja exactamente el 20% de los datos por debajo.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`D_2^C = ${facturacionC_D2} €`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>Interpretación:</strong> El 20% de los peores días de la empresa C factura como máximo {facturacionC_D2}€.
            El otro 80% de los días factura más que eso.</p>
          </CardContent>
        </Card>

        <ResultCard label="Facturación máxima del 20% inferior (C)" value={`${facturacionC_D2} €`} />
      </StepCard>

      {/* ============ PASO 4: Transformaciones ============ */}
      <StepCard stepNumber={5} title="d) Transformaciones de variables" variant="calculation">
        <Card className="bg-rose-50 border-rose-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-rose-800">Las dos reglas fundamentales de transformaciones lineales</p>
            <p className="text-muted-foreground">Si transformamos una variable X mediante Y = a·X + b:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <Card className="bg-white">
                <CardContent className="p-2 space-y-1">
                  <p className="font-semibold text-xs">La media se transforma igual</p>
                  <FormulaDisplay math={`\\bar{y} = a \\cdot \\bar{x} + b`} />
                  <p className="text-[10px] text-muted-foreground">Tanto multiplicar (a) como sumar (b) afectan a la media.</p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-2 space-y-1">
                  <p className="font-semibold text-xs">La varianza solo depende de la escala</p>
                  <FormulaDisplay math={`s_Y^2 = a^2 \\cdot s_X^2`} />
                  <p className="text-[10px] text-muted-foreground">Solo multiplicar (a²) afecta la varianza. Sumar (b) NO la cambia.</p>
                </CardContent>
              </Card>
            </div>
            <div className="bg-white rounded p-2 mt-1">
              <p className="font-semibold text-xs">¿Por qué sumar una constante no cambia la varianza?</p>
              <p className="text-[10px] text-muted-foreground">
                La varianza mide cuánto se alejan los datos <em>entre sí</em>. Si a todos les sumas 100,
                todos suben igual → las distancias entre ellos no cambian → la varianza no cambia.
                Es como subir un ascensor: todos suben, pero siguen a la misma distancia entre sí.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-sm mb-2">Empresa B: incremento del 15% (cambio de escala)</p>
            <p className="text-muted-foreground">Subir un 15% = multiplicar por 1.15. Aquí a = 1.15, b = 0.</p>
            <FormulaDisplay math={`Y_B = 1.15 \\cdot X_B`} />
            <FormulaDisplay math={`\\bar{y}_B = 1.15 \\cdot ${empresas[1].media} = ${newMediaB} €`} />
            <FormulaDisplay math={`s_{Y_B}^2 = 1.15^2 \\cdot s_{X_B}^2 = ${round(1.15 ** 2, 4)} \\cdot ${empresas[1].var} = ${newVarB}`} />
            <p className="text-muted-foreground">
              <strong>Ojo:</strong> La varianza se multiplica por 1.15² = {round(1.15 ** 2, 4)}, no por 1.15.
              La varianza está al cuadrado, así que el factor también se eleva al cuadrado.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-sm mb-2">Empresa A: incremento de 100€ (cambio de origen)</p>
            <p className="text-muted-foreground">Sumar 100€ fijos = cambio de origen. Aquí a = 1, b = 100.</p>
            <FormulaDisplay math={`Y_A = X_A + 100`} />
            <FormulaDisplay math={`\\bar{y}_A = ${empresas[0].media} + 100 = ${newMediaA} €`} />
            <FormulaDisplay math={`s_{Y_A}^2 = 1^2 \\cdot s_{X_A}^2 = ${newVarA}`} />
            <p className="text-muted-foreground">
              <strong>La varianza NO cambia</strong> porque solo sumamos una constante. Todos los días suben 100€,
              así que las diferencias entre días siguen siendo las mismas.
            </p>
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
