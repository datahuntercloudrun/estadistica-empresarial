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

// Datos del ejercicio: (xi, yj, nij)
const jointData = [
  { x: 1, y: 2, n: 1 }, { x: 1, y: 6, n: 1 },
  { x: 2, y: 2, n: 2 },
  { x: 3, y: 2, n: 1 }, { x: 3, y: 4, n: 1 },
  { x: 4, y: 2, n: 1 }, { x: 4, y: 4, n: 2 }, { x: 4, y: 6, n: 1 },
];

const xValues = [1, 2, 3, 4];
const yValues = [2, 4, 6];

// Construir la tabla de correlación
function getFreq(x: number, y: number): number {
  const entry = jointData.find((d) => d.x === x && d.y === y);
  return entry ? entry.n : 0;
}

const marginalX = xValues.map((x) => yValues.reduce((sum, y) => sum + getFreq(x, y), 0));
const marginalY = yValues.map((y) => xValues.reduce((sum, x) => sum + getFreq(x, y), 0));
const totalN = marginalX.reduce((sum, v) => sum + v, 0);

export default function Ejercicio3() {
  return (
    <ExerciseLayout
      tema={2}
      exerciseNumber={3}
      title="Distribuciones Marginales y Condicionadas"
      difficulty="Medio"
      category="Distribuciones bivariantes"
      statement={
        <div className="space-y-2">
          <p>Dada la siguiente distribución conjunta de frecuencias:</p>
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2"><InlineMath math="x_i" /></th><th className="border p-2"><InlineMath math="y_j" /></th><th className="border p-2"><InlineMath math="n_{ij}" /></th>
                </tr>
              </thead>
              <tbody>
                {jointData.map((d, i) => (
                  <tr key={i}><td className="border p-2 text-center">{d.x}</td><td className="border p-2 text-center">{d.y}</td><td className="border p-2 text-center">{d.n}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Construya una tabla de correlación y obtenga:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Distribuciones marginales de X e Y</li>
            <li>b) Distribución de Y condicionada a X = 3</li>
            <li>c) Distribución de X condicionada a Y = 2</li>
          </ul>
        </div>
      }
      prevUrl="/tema-2/ejercicio-2"
      nextUrl="/tema-2/ejercicio-4"
    >
      {/* ============ PASO 1: Explicar la notación ============ */}
      <StepCard stepNumber={1} title={<>¿Qué significan <InlineMath math="x_i" />, <InlineMath math="y_j" /> y <InlineMath math="n_{ij}" />?</>} variant="explanation">
        <p>
          En este ejercicio tenemos <strong>dos variables</strong> medidas a la vez (distribución bivariante).
          Los datos nos dicen: &quot;para esta combinación de X e Y, ¿cuántas veces ocurre?&quot;
        </p>
        <div className="grid md:grid-cols-3 gap-3 mt-2">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 text-blue-800 text-xs"><InlineMath math="x_i" /></Badge>
              <p className="text-xs text-muted-foreground">Los valores posibles de la <strong>variable X</strong> (primera variable).</p>
              <p className="text-[10px]">En este ejercicio: <InlineMath math="x_i" /> = 1, 2, 3, 4</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 text-emerald-800 text-xs"><InlineMath math="y_j" /></Badge>
              <p className="text-xs text-muted-foreground">Los valores posibles de la <strong>variable Y</strong> (segunda variable).</p>
              <p className="text-[10px]">En este ejercicio: <InlineMath math="y_j" /> = 2, 4, 6</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 text-violet-800 text-xs"><InlineMath math="n_{ij}" /></Badge>
              <p className="text-xs text-muted-foreground">Cuántas veces aparece <strong>la combinación</strong> (<InlineMath math="x_i" />, <InlineMath math="y_j" />) en los datos.</p>
              <p className="text-[10px]">Ej: <InlineMath math="n_{22}" /> = 2 significa que la pareja (X=2, Y=2) ocurre 2 veces</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">¿Y la tabla de correlación?</p>
            <p>Es simplemente organizar estos datos en una tabla de doble entrada: las filas son los valores de X, las columnas los de Y, y en cada celda va <InlineMath math="n_{ij}" /> (cuántas veces ocurre esa combinación).</p>
            <div className="mt-2 space-y-1">
              <p><Badge className="bg-blue-100 text-blue-800 text-[10px]"><InlineMath math="n_{i\cdot}" /></Badge> = suma de toda la <strong>fila</strong> i → cuántas veces aparece X = <InlineMath math="x_i" /> (sin importar Y). Es la <strong>marginal de X</strong>.</p>
              <p><Badge className="bg-emerald-100 text-emerald-800 text-[10px]"><InlineMath math="n_{\cdot j}" /></Badge> = suma de toda la <strong>columna</strong> j → cuántas veces aparece Y = <InlineMath math="y_j" /> (sin importar X). Es la <strong>marginal de Y</strong>.</p>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Construir la tabla ============ */}
      <StepCard stepNumber={2} title="Construir la tabla de correlación" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Cómo se construye?</p>
            <p className="text-muted-foreground">Recorremos los 8 datos del enunciado y colocamos cada <InlineMath math="n_{ij}" /> en la celda correspondiente (fila = valor de X, columna = valor de Y). Las combinaciones que no aparecen en los datos tienen frecuencia 0.</p>
          </CardContent>
        </Card>
        <p>Organizamos los datos en una tabla bidimensional, con X en filas e Y en columnas:</p>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center font-bold">X \ Y</TableHead>
                {yValues.map((y) => <TableHead key={y} className="text-center font-bold">{y}</TableHead>)}
                <TableHead className="text-center font-bold bg-blue-50"><InlineMath math="n_{i\cdot}" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {xValues.map((x, i) => (
                <TableRow key={x}>
                  <TableCell className="text-center font-medium">{x}</TableCell>
                  {yValues.map((y) => (
                    <TableCell key={y} className="text-center">{getFreq(x, y)}</TableCell>
                  ))}
                  <TableCell className="text-center font-bold bg-blue-50">{marginalX[i]}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-emerald-50">
                <TableCell className="text-center font-bold"><InlineMath math="n_{\cdot j}" /></TableCell>
                {yValues.map((y, j) => (
                  <TableCell key={y} className="text-center font-bold">{marginalY[j]}</TableCell>
                ))}
                <TableCell className="text-center font-bold">{totalN}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        <Card className="bg-blue-50 border-blue-200 mt-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Cómo leer esta tabla?</p>
            <div className="space-y-1">
              <p>Cada <strong>celda interior</strong> es <InlineMath math="n_{ij}" />: cuántas veces ocurre la combinación (X=fila, Y=columna).</p>
              <p>Ejemplo: la celda de la fila X=4 y columna Y=4 vale 2, es decir, la combinación (4, 4) aparece 2 veces.</p>
              <p>Las celdas con 0 significan que esa combinación <strong>no aparece</strong> en los datos.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <div className="bg-white rounded p-2">
                <p><strong className="text-blue-700">Última columna</strong> (<InlineMath math="n_{i\cdot}" />): suma de cada fila.</p>
                <p className="text-[10px] text-muted-foreground">Ej: fila X=4: 1+2+1 = 4</p>
              </div>
              <div className="bg-white rounded p-2">
                <p><strong className="text-emerald-700">Última fila</strong> (<InlineMath math="n_{\cdot j}" />): suma de cada columna.</p>
                <p className="text-[10px] text-muted-foreground">Ej: columna Y=2: 1+2+1+1 = 5</p>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground">La casilla inferior derecha (N = {totalN}) es el total de observaciones: la suma de todas las <InlineMath math="n_{ij}" />.</p>
            <div className="bg-white rounded p-2 mt-1 space-y-1">
              <p className="font-semibold text-blue-800">¿Para qué sirven los marginales?</p>
              <p><strong>1. Ver cada variable por separado:</strong> <InlineMath math="n_{i\cdot}" /> te dice cuántas veces aparece cada valor de X <em>sin importar Y</em> (como si no hubieras medido Y). <InlineMath math="n_{\cdot j}" /> hace lo mismo para Y. Convierten la tabla bivariante en dos distribuciones univariantes.</p>
              <p><strong>2. Son el denominador de las condicionadas:</strong> sin ellos no puedes calcular los apartados b) y c). Para Y|X=3 necesitas <InlineMath math="n_{3\cdot}" /> = {marginalX[2]} como denominador; para X|Y=2 necesitas <InlineMath math="n_{\cdot 1}" /> = {marginalY[0]}.</p>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 3: Distribuciones marginales ============ */}
      <StepCard stepNumber={3} title="a) Distribuciones marginales" variant="result">
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
                <p><InlineMath math="n_{1\cdot}" /> = {yValues.map(y => getFreq(1, y)).join(" + ")} = {marginalX[0]}</p>
                <p><InlineMath math="n_{2\cdot}" /> = {yValues.map(y => getFreq(2, y)).join(" + ")} = {marginalX[1]}</p>
                <p><InlineMath math="n_{3\cdot}" /> = {yValues.map(y => getFreq(3, y)).join(" + ")} = {marginalX[2]}</p>
                <p><InlineMath math="n_{4\cdot}" /> = {yValues.map(y => getFreq(4, y)).join(" + ")} = {marginalX[3]}</p>
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
                      <TableCell className="text-center">{(marginalX[i] / totalN).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold"><TableCell className="text-center">Total</TableCell><TableCell className="text-center">{totalN}</TableCell><TableCell className="text-center">1.00</TableCell></TableRow>
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
                <p><InlineMath math="n_{\cdot 1}" /> (Y=2) = {xValues.map(x => getFreq(x, 2)).join(" + ")} = {marginalY[0]}</p>
                <p><InlineMath math="n_{\cdot 2}" /> (Y=4) = {xValues.map(x => getFreq(x, 4)).join(" + ")} = {marginalY[1]}</p>
                <p><InlineMath math="n_{\cdot 3}" /> (Y=6) = {xValues.map(x => getFreq(x, 6)).join(" + ")} = {marginalY[2]}</p>
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
                      <TableCell className="text-center">{(marginalY[j] / totalN).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold"><TableCell className="text-center">Total</TableCell><TableCell className="text-center">{totalN}</TableCell><TableCell className="text-center">1.00</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">Verificación</p>
            <p>La suma de todas las <InlineMath math="n_{i\cdot}" /> debe ser igual a la suma de todas las <InlineMath math="n_{\cdot j}" />, y ambas deben ser N = {totalN}. ✓</p>
            <div className="bg-white rounded p-2 space-y-1">
              <p className="font-semibold text-amber-800">¿Por qué tienen que ser iguales?</p>
              <p className="text-muted-foreground">Porque <strong>ambas sumas cuentan exactamente lo mismo</strong>: el total de observaciones. Solo cambia la forma de contarlas.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <div className="bg-blue-50 rounded p-2">
                  <p><strong className="text-blue-700">Sumar todos los <InlineMath math="n_{i\cdot}" /></strong></p>
                  <p className="text-[10px] text-muted-foreground">= sumar fila por fila. Cada fila contiene todas las observaciones de un valor de X. Al sumar todas las filas, has contado <strong>todas</strong> las observaciones → N.</p>
                </div>
                <div className="bg-emerald-50 rounded p-2">
                  <p><strong className="text-emerald-700">Sumar todos los <InlineMath math="n_{\cdot j}" /></strong></p>
                  <p className="text-[10px] text-muted-foreground">= sumar columna por columna. Cada columna contiene todas las observaciones de un valor de Y. Al sumar todas las columnas, has contado <strong>todas</strong> las observaciones → N.</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Es como contar personas sentadas en un aula: puedes contar fila por fila o columna por columna, pero el total siempre es el mismo.</p>
              <div className="bg-gray-50 rounded p-2 mt-1">
                <p className="text-[10px]">En nuestro caso: <InlineMath math="n_{1\cdot} + n_{2\cdot} + n_{3\cdot} + n_{4\cdot}" /> = {marginalX.join(" + ")} = {totalN} &nbsp;y&nbsp; <InlineMath math="n_{\cdot 1} + n_{\cdot 2} + n_{\cdot 3}" /> = {marginalY.join(" + ")} = {totalN} ✓</p>
              </div>
            </div>
            <p>Las frecuencias relativas (<InlineMath math="f_{i\cdot}" /> y <InlineMath math="f_{\cdot j}" />) deben sumar 1.00 cada una. ✓</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 4: Y condicionada a X=3 ============ */}
      <StepCard stepNumber={4} title="b) Distribución de Y condicionada a X = 3" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Qué es una distribución condicionada?</p>
            <p className="text-muted-foreground">Es fijarnos <strong>solo en los casos</strong> donde una variable tiene un valor concreto, y ver cómo se distribuye la otra.</p>
            <p className="text-muted-foreground">Aquí fijamos X = 3 y preguntamos: <strong>de las observaciones con X = 3, ¿cuántas tienen Y = 2, Y = 4, Y = 6?</strong></p>
            <p className="text-muted-foreground mt-1">Es como mirar <strong>solo la fila X = 3</strong> de la tabla de correlación y calcular las proporciones dentro de esa fila.</p>
          </CardContent>
        </Card>

        <p className="font-medium text-sm">Paso 1: Identificar la fila X = 3 en la tabla</p>
        <p className="text-xs text-muted-foreground mb-2">Miramos solo la fila de X = 3 (resaltada en la tabla del paso 2). Las frecuencias son:</p>
        <div className="bg-blue-50 rounded p-2 text-xs mb-3">
          <p>Fila X = 3: <InlineMath math="n_{31}" /> = {getFreq(3, 2)} (Y=2), <InlineMath math="n_{32}" /> = {getFreq(3, 4)} (Y=4), <InlineMath math="n_{33}" /> = {getFreq(3, 6)} (Y=6)</p>
          <p className="mt-1">Total de la fila: <InlineMath math="n_{3\cdot}" /> = {getFreq(3, 2)} + {getFreq(3, 4)} + {getFreq(3, 6)} = {marginalX[2]}</p>
        </div>

        <p className="font-medium text-sm">Paso 2: Calcular las frecuencias relativas condicionadas</p>
        <p className="text-xs text-muted-foreground mb-2">Dividimos cada frecuencia de la fila entre el total de la fila (<InlineMath math="n_{3\cdot}" /> = {marginalX[2]}), NO entre N = {totalN}:</p>
        <FormulaDisplay math={`f(y_j \\mid X=3) = \\frac{n_{3j}}{n_{3\\cdot}} = \\frac{n_{3j}}{${marginalX[2]}}`} />

        <div className="bg-violet-50 rounded p-2 text-[10px] space-y-0.5 mb-3">
          {yValues.map((y, j) => {
            const freq = getFreq(3, y);
            return (
              <p key={y}><InlineMath math={`f(Y=${y} \\mid X=3)`} /> = {freq} / {marginalX[2]} = {(freq / marginalX[2]).toFixed(2)}{freq === 0 ? " (no hay observaciones con X=3 e Y=6)" : ""}</p>
            );
          })}
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center"><InlineMath math="y_j" /></TableHead>
                <TableHead className="text-center"><InlineMath math="n_{3j}" /></TableHead>
                <TableHead className="text-center"><InlineMath math="f(y_j \mid X=3)" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {yValues.map((y) => {
                const freq = getFreq(3, y);
                return (
                  <TableRow key={y}>
                    <TableCell className="text-center">{y}</TableCell>
                    <TableCell className="text-center">{freq}</TableCell>
                    <TableCell className="text-center">{(freq / marginalX[2]).toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="font-bold">
                <TableCell className="text-center">Total</TableCell>
                <TableCell className="text-center">{marginalX[2]}</TableCell>
                <TableCell className="text-center">1.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">¿Cómo interpretar este resultado?</p>
            <p>De las {marginalX[2]} observaciones donde X = 3, la mitad (50%) tienen Y = 2 y la otra mitad (50%) tienen Y = 4. Ninguna tiene Y = 6.</p>
            <p className="text-muted-foreground mt-1"><strong>Diferencia clave con la marginal:</strong> en la marginal de Y, dividíamos entre N = {totalN} (todos los datos). Aquí dividimos solo entre <InlineMath math="n_{3\cdot}" /> = {marginalX[2]} (los datos con X = 3). Por eso las proporciones son diferentes.</p>
          </CardContent>
        </Card>

        <ResultCard label="Y|X=3" value="Y=2 con freq 1/2, Y=4 con freq 1/2, Y=6 con freq 0" />
      </StepCard>

      {/* ============ PASO 5: X condicionada a Y=2 ============ */}
      <StepCard stepNumber={5} title="c) Distribución de X condicionada a Y = 2" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Qué cambia respecto al apartado anterior?</p>
            <p className="text-muted-foreground">Ahora fijamos Y = 2 en vez de X = 3. Es decir, miramos <strong>solo la columna Y = 2</strong> de la tabla y preguntamos: de las observaciones con Y = 2, ¿cuántas tienen X = 1, X = 2, X = 3, X = 4?</p>
          </CardContent>
        </Card>

        <p className="font-medium text-sm">Paso 1: Identificar la columna Y = 2 en la tabla</p>
        <p className="text-xs text-muted-foreground mb-2">Miramos solo la columna de Y = 2. Las frecuencias son:</p>
        <div className="bg-emerald-50 rounded p-2 text-xs mb-3">
          <p>Columna Y = 2: <InlineMath math="n_{12}" /> = {getFreq(1, 2)} (X=1), <InlineMath math="n_{22}" /> = {getFreq(2, 2)} (X=2), <InlineMath math="n_{32}" /> = {getFreq(3, 2)} (X=3), <InlineMath math="n_{42}" /> = {getFreq(4, 2)} (X=4)</p>
          <p className="mt-1">Total de la columna: <InlineMath math="n_{\cdot 1}" /> = {getFreq(1, 2)} + {getFreq(2, 2)} + {getFreq(3, 2)} + {getFreq(4, 2)} = {marginalY[0]}</p>
        </div>

        <p className="font-medium text-sm">Paso 2: Calcular las frecuencias relativas condicionadas</p>
        <p className="text-xs text-muted-foreground mb-2">Dividimos cada frecuencia de la columna entre el total de la columna (<InlineMath math="n_{\cdot 1}" /> = {marginalY[0]}):</p>
        <FormulaDisplay math={`f(x_i \\mid Y=2) = \\frac{n_{i1}}{n_{\\cdot 1}} = \\frac{n_{i1}}{${marginalY[0]}}`} />

        <div className="bg-violet-50 rounded p-2 text-[10px] space-y-0.5 mb-3">
          {xValues.map((x) => {
            const freq = getFreq(x, 2);
            return (
              <p key={x}><InlineMath math={`f(X=${x} \\mid Y=2)`} /> = {freq} / {marginalY[0]} = {(freq / marginalY[0]).toFixed(2)}</p>
            );
          })}
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center"><InlineMath math="x_i" /></TableHead>
                <TableHead className="text-center"><InlineMath math="n_{i1}" /></TableHead>
                <TableHead className="text-center"><InlineMath math="f(x_i \mid Y=2)" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {xValues.map((x) => {
                const freq = getFreq(x, 2);
                return (
                  <TableRow key={x}>
                    <TableCell className="text-center">{x}</TableCell>
                    <TableCell className="text-center">{freq}</TableCell>
                    <TableCell className="text-center">{(freq / marginalY[0]).toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="font-bold">
                <TableCell className="text-center">Total</TableCell>
                <TableCell className="text-center">{marginalY[0]}</TableCell>
                <TableCell className="text-center">1.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">¿Cómo interpretar este resultado?</p>
            <p>De las {marginalY[0]} observaciones donde Y = 2: 1 tiene X=1 (20%), 2 tienen X=2 (40%), 1 tiene X=3 (20%) y 1 tiene X=4 (20%).</p>
            <p className="text-muted-foreground mt-1">El valor X = 2 es el más frecuente cuando Y = 2 (aparece 2 de 5 veces, es decir, el 40%).</p>
          </CardContent>
        </Card>

        <ResultCard label="X|Y=2" value={`X=1: ${(1/5).toFixed(2)}, X=2: ${(2/5).toFixed(2)}, X=3: ${(1/5).toFixed(2)}, X=4: ${(1/5).toFixed(2)}`} />
      </StepCard>
    </ExerciseLayout>
  );
}
