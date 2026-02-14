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

// Datos del ejercicio
const xValues = [1, 4, 5];
const yValues = [1, 3, 6];
const matrix = [
  [2, 3, 0],
  [1, 4, 1],
  [0, 3, 4],
];

const marginalX = matrix.map((row) => row.reduce((s, v) => s + v, 0));
const marginalY = yValues.map((_, j) => matrix.reduce((s, row) => s + row[j], 0));
const totalN = marginalX.reduce((s, v) => s + v, 0);

export default function Ejercicio4() {
  return (
    <ExerciseLayout
      tema={2}
      exerciseNumber={4}
      title="Distribuciones Marginales y Condicionada X|Y=3"
      difficulty="Bajo-Medio"
      category="Distribuciones bivariantes"
      statement={
        <div className="space-y-2">
          <p>Obtenga de la siguiente tabla las distribuciones marginales y la distribución condicionada de X para Y = 3.</p>
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">X \ Y</th>
                  {yValues.map((y) => <th key={y} className="border p-2">{y}</th>)}
                </tr>
              </thead>
              <tbody>
                {xValues.map((x, i) => (
                  <tr key={x}>
                    <td className="border p-2 font-medium text-center">{x}</td>
                    {matrix[i].map((v, j) => <td key={j} className="border p-2 text-center">{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      prevUrl="/tema-2/ejercicio-3"
      nextUrl="/tema-2/ejercicio-5"
    >
      {/* ============ PASO 1: Explicar la notación ============ */}
      <StepCard stepNumber={1} title={<>¿Qué nos da el enunciado?</>} variant="explanation">
        <p>
          El enunciado nos da directamente una <strong>tabla de correlación</strong> (tabla de doble entrada) con dos variables X e Y medidas a la vez (distribución bivariante).
        </p>
        <div className="grid md:grid-cols-3 gap-3 mt-2">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 text-blue-800 text-xs"><InlineMath math="x_i" /></Badge>
              <p className="text-xs text-muted-foreground">Los valores posibles de la <strong>variable X</strong> (filas de la tabla).</p>
              <p className="text-[10px]">En este ejercicio: <InlineMath math="x_i" /> = 1, 4, 5</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 text-emerald-800 text-xs"><InlineMath math="y_j" /></Badge>
              <p className="text-xs text-muted-foreground">Los valores posibles de la <strong>variable Y</strong> (columnas de la tabla).</p>
              <p className="text-[10px]">En este ejercicio: <InlineMath math="y_j" /> = 1, 3, 6</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 text-violet-800 text-xs"><InlineMath math="n_{ij}" /></Badge>
              <p className="text-xs text-muted-foreground">Cuántas veces aparece <strong>la combinación</strong> (<InlineMath math="x_i" />, <InlineMath math="y_j" />) en los datos.</p>
              <p className="text-[10px]">Ej: celda (X=4, Y=3) = 4, esa pareja ocurre 4 veces</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">¿Qué nos pide el ejercicio?</p>
            <ol className="list-decimal pl-4 space-y-0.5">
              <li>Las <strong>distribuciones marginales</strong> de X e Y (ver cada variable por separado).</li>
              <li>La <strong>distribución condicionada de X para Y = 3</strong> (fijamos Y = 3 y vemos cómo se distribuye X).</li>
            </ol>
            <div className="mt-2 space-y-1">
              <p><Badge className="bg-blue-100 text-blue-800 text-[10px]"><InlineMath math="n_{i\cdot}" /></Badge> = suma de toda la <strong>fila</strong> i → cuántas veces aparece X = <InlineMath math="x_i" /> (sin importar Y). Es la <strong>marginal de X</strong>.</p>
              <p><Badge className="bg-emerald-100 text-emerald-800 text-[10px]"><InlineMath math="n_{\cdot j}" /></Badge> = suma de toda la <strong>columna</strong> j → cuántas veces aparece Y = <InlineMath math="y_j" /> (sin importar X). Es la <strong>marginal de Y</strong>.</p>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Distribuciones marginales ============ */}
      <StepCard stepNumber={2} title="Distribuciones marginales" variant="result">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Qué es una distribución marginal?</p>
            <p className="text-muted-foreground">Es &quot;olvidarse&quot; de una variable y ver solo la otra. Por ejemplo, la marginal de X nos dice cuántas veces aparece cada valor de X, <strong>sin importar qué valor tenga Y</strong>. Se obtiene sumando toda la fila (o columna) de la tabla.</p>
            <p className="text-muted-foreground">Se llama &quot;marginal&quot; porque los totales aparecen en los <strong>márgenes</strong> (bordes) de la tabla.</p>
          </CardContent>
        </Card>

        <p>Sumamos por filas (para X) y por columnas (para Y):</p>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-3">
              <p className="font-semibold text-sm mb-2 text-blue-700">Marginal de X</p>
              <p className="text-xs text-muted-foreground mb-2">Sumamos cada fila (todos los valores de Y para cada X):</p>
              <FormulaDisplay math={`n_{i\\cdot} = \\sum_{j} n_{ij}`} />
              <div className="bg-blue-50 rounded p-2 text-[10px] space-y-0.5 mb-2">
                <p><InlineMath math="n_{1\cdot}" /> (X=1) = {matrix[0].join(" + ")} = {marginalX[0]}</p>
                <p><InlineMath math="n_{2\cdot}" /> (X=4) = {matrix[1].join(" + ")} = {marginalX[1]}</p>
                <p><InlineMath math="n_{3\cdot}" /> (X=5) = {matrix[2].join(" + ")} = {marginalX[2]}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">La frecuencia relativa se obtiene dividiendo entre el total N = {totalN}:</p>
              <FormulaDisplay math={`f_{i\\cdot} = \\frac{n_{i\\cdot}}{N}`} />
              <Table>
                <TableHeader><TableRow><TableHead className="text-center"><InlineMath math="x_i" /></TableHead><TableHead className="text-center"><InlineMath math="n_{i\cdot}" /></TableHead><TableHead className="text-center"><InlineMath math="f_{i\cdot}" /></TableHead></TableRow></TableHeader>
                <TableBody>
                  {xValues.map((x, i) => (
                    <TableRow key={x}>
                      <TableCell className="text-center">{x}</TableCell>
                      <TableCell className="text-center">{marginalX[i]}</TableCell>
                      <TableCell className="text-center">{(marginalX[i] / totalN).toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold"><TableCell className="text-center">Total</TableCell><TableCell className="text-center">{totalN}</TableCell><TableCell className="text-center">1.0000</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="font-semibold text-sm mb-2 text-emerald-700">Marginal de Y</p>
              <p className="text-xs text-muted-foreground mb-2">Sumamos cada columna (todos los valores de X para cada Y):</p>
              <FormulaDisplay math={`n_{\\cdot j} = \\sum_{i} n_{ij}`} />
              <div className="bg-emerald-50 rounded p-2 text-[10px] space-y-0.5 mb-2">
                <p><InlineMath math="n_{\cdot 1}" /> (Y=1) = {matrix[0][0]} + {matrix[1][0]} + {matrix[2][0]} = {marginalY[0]}</p>
                <p><InlineMath math="n_{\cdot 2}" /> (Y=3) = {matrix[0][1]} + {matrix[1][1]} + {matrix[2][1]} = {marginalY[1]}</p>
                <p><InlineMath math="n_{\cdot 3}" /> (Y=6) = {matrix[0][2]} + {matrix[1][2]} + {matrix[2][2]} = {marginalY[2]}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Dividimos entre N = {totalN}:</p>
              <FormulaDisplay math={`f_{\\cdot j} = \\frac{n_{\\cdot j}}{N}`} />
              <Table>
                <TableHeader><TableRow><TableHead className="text-center"><InlineMath math="y_j" /></TableHead><TableHead className="text-center"><InlineMath math="n_{\cdot j}" /></TableHead><TableHead className="text-center"><InlineMath math="f_{\cdot j}" /></TableHead></TableRow></TableHeader>
                <TableBody>
                  {yValues.map((y, j) => (
                    <TableRow key={y}>
                      <TableCell className="text-center">{y}</TableCell>
                      <TableCell className="text-center">{marginalY[j]}</TableCell>
                      <TableCell className="text-center">{(marginalY[j] / totalN).toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold"><TableCell className="text-center">Total</TableCell><TableCell className="text-center">{totalN}</TableCell><TableCell className="text-center">1.0000</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Verificación</p>
            <p>La suma de todas las <InlineMath math="n_{i\cdot}" /> debe ser igual a la suma de todas las <InlineMath math="n_{\cdot j}" />, y ambas deben ser N = {totalN}: {marginalX.join(" + ")} = {marginalY.join(" + ")} = {totalN} ✓</p>
            <p>Las frecuencias relativas (<InlineMath math="f_{i\cdot}" /> y <InlineMath math="f_{\cdot j}" />) deben sumar 1.0000 cada una. ✓</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 3: Distribución condicionada X|Y=3 ============ */}
      <StepCard stepNumber={3} title="Distribución condicionada de X para Y = 3" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Qué es una distribución condicionada?</p>
            <p className="text-muted-foreground">Es fijarnos <strong>solo en los casos</strong> donde una variable tiene un valor concreto, y ver cómo se distribuye la otra.</p>
            <p className="text-muted-foreground">Aquí fijamos Y = 3 y preguntamos: <strong>de las observaciones con Y = 3, ¿cuántas tienen X = 1, X = 4, X = 5?</strong></p>
            <p className="text-muted-foreground mt-1">Es como mirar <strong>solo la columna Y = 3</strong> de la tabla de correlación del enunciado y calcular las proporciones dentro de esa columna.</p>
          </CardContent>
        </Card>

        <p className="font-medium text-sm">Paso 1: Identificar la columna Y = 3 en la tabla</p>
        <p className="text-xs text-muted-foreground mb-2">Miramos solo la columna de Y = 3 (la columna central, resaltada en amarillo). Las frecuencias conjuntas son:</p>
        <div className="bg-yellow-50 rounded p-2 text-xs mb-3">
          <p>Columna Y = 3: <InlineMath math="n_{1,3}" /> = {matrix[0][1]} (X=1), <InlineMath math="n_{4,3}" /> = {matrix[1][1]} (X=4), <InlineMath math="n_{5,3}" /> = {matrix[2][1]} (X=5)</p>
          <p className="mt-1">Total de la columna: <InlineMath math="n_{\cdot 2}" /> = {matrix[0][1]} + {matrix[1][1]} + {matrix[2][1]} = {marginalY[1]}</p>
        </div>

        <p className="font-medium text-sm">Paso 2: Calcular las frecuencias relativas condicionadas</p>
        <p className="text-xs text-muted-foreground mb-2">Dividimos cada frecuencia de la columna entre el total de esa columna (<InlineMath math="n_{\cdot 2}" /> = {marginalY[1]}), <strong>NO</strong> entre N = {totalN}:</p>
        <FormulaDisplay math={`f(x_i \\mid Y=3) = \\frac{n_{i,3}}{n_{\\cdot 2}} = \\frac{n_{i,3}}{${marginalY[1]}}`} />

        <div className="bg-violet-50 rounded p-2 text-[10px] space-y-0.5 mb-3">
          {xValues.map((x, i) => {
            const freq = matrix[i][1];
            return (
              <p key={x}><InlineMath math={`f(X=${x} \\mid Y=3)`} /> = {freq} / {marginalY[1]} = {(freq / marginalY[1]).toFixed(4)}</p>
            );
          })}
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center"><InlineMath math="x_i" /></TableHead>
                <TableHead className="text-center"><InlineMath math="n_{i,3}" /></TableHead>
                <TableHead className="text-center"><InlineMath math="f(x_i \mid Y=3)" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {xValues.map((x, i) => (
                <TableRow key={x}>
                  <TableCell className="text-center">{x}</TableCell>
                  <TableCell className="text-center">{matrix[i][1]}</TableCell>
                  <TableCell className="text-center">{(matrix[i][1] / marginalY[1]).toFixed(4)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold">
                <TableCell className="text-center">Total</TableCell>
                <TableCell className="text-center">{marginalY[1]}</TableCell>
                <TableCell className="text-center">1.0000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">¿Cómo interpretar este resultado?</p>
            <p>De las {marginalY[1]} observaciones donde Y = 3: 3 tienen X=1 (30%), 4 tienen X=4 (40%), y 3 tienen X=5 (30%).</p>
            <p>El valor X = 4 es el más frecuente cuando Y = 3 (aparece 4 de 10 veces).</p>
            <p className="text-muted-foreground mt-1"><strong>Diferencia clave con la marginal:</strong> en la marginal de X, dividíamos entre N = {totalN} (todos los datos). Aquí dividimos solo entre <InlineMath math="n_{\cdot 2}" /> = {marginalY[1]} (las observaciones con Y = 3). Por eso las proporciones son distintas.</p>
          </CardContent>
        </Card>

        <ResultCard
          label="X | Y=3"
          value={`X=1: ${(matrix[0][1]/marginalY[1]).toFixed(2)}, X=4: ${(matrix[1][1]/marginalY[1]).toFixed(2)}, X=5: ${(matrix[2][1]/marginalY[1]).toFixed(2)}`}
        />
      </StepCard>
    </ExerciseLayout>
  );
}
