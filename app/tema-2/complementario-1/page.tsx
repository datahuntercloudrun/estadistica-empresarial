"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FrequencyTable } from "@/components/stats/frequency-table";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { HistogramChart } from "@/components/charts/histogram-chart";
import { frequencyTable } from "@/lib/stats/frequencies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ===== DATOS DEL EJERCICIO =====
const rawData = [
  19, 30, 20, 23, 24, 21, 20, 25, 26, 20, 21, 29, 28,
  30, 19, 27, 29, 22, 25, 28, 20, 27, 26, 21, 30, 28,
  27, 26, 19, 27, 25, 23, 22, 29, 21, 26, 24, 28, 30,
  25, 25, 24, 26, 23, 29, 27, 28, 26, 27, 26, 22, 26,
  27, 29, 28, 23, 22, 24, 26, 23,
];

const n = rawData.length;
const sorted = [...rawData].sort((a, b) => a - b);
const minVal = sorted[0];
const maxVal = sorted[sorted.length - 1];
const distinctValues = [...new Set(sorted)].sort((a, b) => a - b);

// a) Tabla sin agrupar
const ungroupedTable = frequencyTable(rawData);

// b) Tabla agrupada en intervalos de amplitud 2
const groupedIntervals: [number, number][] = [
  [19, 21], [21, 23], [23, 25], [25, 27], [27, 29], [29, 31],
];

function computeGrouped() {
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

// Datos para el histograma
const histogramData = groupedTable.map((row) => ({
  interval: row.xi,
  frequency: row.ni,
}));

// Para mostrar qué valores caen en cada intervalo agrupado
const intervalWithValues = groupedIntervals.map(([lower, upper], k) => {
  const values = rawData
    .filter(x => {
      if (k === 0) return x >= lower && x < upper;
      if (k === groupedIntervals.length - 1) return x >= lower && x <= upper;
      return x >= lower && x < upper;
    })
    .sort((a, b) => a - b);
  const label = k === groupedIntervals.length - 1
    ? `[${lower}, ${upper}]`
    : `[${lower}, ${upper})`;
  return { label, values, lower, upper };
});

// Encontrar intervalo con mayor frecuencia (moda agrupada)
const maxFreqRow = groupedTable.reduce((max, row) => row.ni > max.ni ? row : max, groupedTable[0]);

export default function Complementario1() {
  return (
    <ExerciseLayout
      tema={2}
      exerciseNumber="C1"
      title="Distribucion de Salarios"
      difficulty="Medio"
      category="Distribuciones de frecuencias"
      statement={
        <div className="space-y-2">
          <p>
            En el departamento de personal de una fabrica se ha realizado una investigacion estadistica sobre los
            salarios diarios percibidos por su personal (en 10 euros). Los resultados son:
          </p>
          <div className="overflow-x-auto"><div className="bg-white dark:bg-gray-900 p-3 rounded text-sm font-mono grid grid-cols-13 gap-1">
            {rawData.map((d, i) => (
              <span key={i} className="text-center">{d}</span>
            ))}
          </div></div>
          <p>Se pide:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Distribucion de salarios sin agrupar y agrupando en intervalos de igual amplitud</li>
            <li>b) Representacion grafica mediante histograma</li>
          </ul>
        </div>
      }
      prevUrl="/tema-2/ejercicio-5"
      nextUrl="/tema-2/complementario-2"
    >
      {/* ============ PASO 1: Que vamos a aprender ============ */}
      <StepCard stepNumber={1} title="Que vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          En este ejercicio vamos a aprender a <strong>organizar datos en bruto</strong> de dos formas distintas:
          sin agrupar (valor por valor) y agrupados en intervalos. Ademas, aprenderemos a representar datos
          agrupados con un <strong>histograma</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm">1. Tabla sin agrupar</p>
              <p className="text-sm text-muted-foreground">Cada valor diferente tiene su propia fila. Vemos exactamente cuantas veces aparece cada salario.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200 text-sm">2. Tabla agrupada</p>
              <p className="text-sm text-muted-foreground">Los valores se agrupan en intervalos (rangos). Se simplifica la tabla y se ven mejor los patrones generales.</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-violet-800 dark:text-violet-200 text-sm">3. Histograma</p>
              <p className="text-sm text-muted-foreground">Grafico de barras pegadas que muestra visualmente como se distribuyen los datos en los intervalos.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Datos del problema</p>
            <p className="text-muted-foreground">Tenemos <strong>{n} trabajadores</strong> con salarios diarios (en decenas de euros) que van desde <strong>{minVal}</strong> hasta <strong>{maxVal}</strong>. Hay <strong>{distinctValues.length} valores distintos</strong> de salario.</p>
            <p className="text-muted-foreground">Con solo {distinctValues.length} valores distintos, la tabla sin agrupar es manejable. Pero aun asi, agrupar nos dara una vision mas clara de donde se concentran los salarios.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Por que hacer tablas de frecuencias ============ */}
      <StepCard stepNumber={2} title="Por que hacemos tablas de frecuencias?" variant="explanation">
        <p>
          Los {n} datos en bruto son dificiles de interpretar. Una tabla de frecuencias los <strong>organiza y resume</strong>,
          respondiendo a la pregunta clave: <em>cuantas veces aparece cada valor (o cada rango de valores)?</em>
        </p>

        <Card className="bg-gray-50 dark:bg-gray-800 border mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold">Que significa cada columna de una tabla de frecuencias:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-sm"><InlineMath math="x_i" /></Badge>
                  <p className="font-semibold text-sm text-blue-800 dark:text-blue-200">Valor del salario</p>
                </div>
                <p className="text-sm text-muted-foreground">Cada valor diferente que aparece en los datos: 19, 20, 21, ..., 30.</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-sm"><InlineMath math="n_i" /></Badge>
                  <p className="font-semibold text-sm text-blue-800 dark:text-blue-200">Frecuencia absoluta</p>
                </div>
                <p className="text-sm text-muted-foreground">Cuantas veces aparece ese valor. Ej: si el salario 26 aparece 10 veces, <InlineMath math="n_i" /> = 10.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded p-2 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 text-sm"><InlineMath math="f_i" /></Badge>
                  <p className="font-semibold text-sm text-emerald-800 dark:text-emerald-200">Frecuencia relativa</p>
                </div>
                <p className="text-sm text-muted-foreground">Proporcion respecto al total: <InlineMath math="f_i = n_i / n" />. Indica que porcentaje de trabajadores cobra ese salario.</p>
              </div>
              <div className="bg-violet-50 dark:bg-violet-950/20 rounded p-2 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-violet-200 text-violet-800 dark:text-violet-200 text-sm"><InlineMath math="N_i" /> y <InlineMath math="F_i" /></Badge>
                  <p className="font-semibold text-sm text-violet-800 dark:text-violet-200">Acumuladas</p>
                </div>
                <p className="text-sm text-muted-foreground"><InlineMath math="N_i" /> = cuantos trabajadores cobran ese salario <strong>o menos</strong>. <InlineMath math="F_i" /> = proporcion acumulada.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Idea clave:</strong> la tabla no cambia los datos, solo los <strong>organiza</strong>. Pasar de 60 numeros sueltos a una tabla nos permite ver de un vistazo donde se concentran los salarios y que valores son raros.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 3: Tabla sin agrupar ============ */}
      <StepCard stepNumber={3} title="a) Distribucion sin agrupar" variant="calculation">
        <p>Contamos cuantas veces aparece cada valor de salario. Los datos tienen {distinctValues.length} valores distintos ({distinctValues.join(", ")}), asi que la tabla tendra {distinctValues.length} filas:</p>

        <FrequencyTable
          data={ungroupedTable.map((r) => ({ xi: r.xi, ni: r.ni, fi: r.fi, Ni: r.Ni, Fi: r.Fi }))}
          title={`Distribucion de salarios sin agrupar (en 10 euros) - n = ${n}`}
        />

        <FormulaDisplay math={`n = \\sum n_i = ${ungroupedTable.map(r => r.ni).join(" + ")} = ${n} \\text{ trabajadores}`} />

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Como interpretar esta tabla:</p>
            <div className="space-y-1">
              <p>El salario mas frecuente es <strong>{ungroupedTable.reduce((max, r) => r.ni > max.ni ? r : max, ungroupedTable[0]).xi} (x10 euros)</strong> con <InlineMath math="n_i" /> = {ungroupedTable.reduce((max, r) => r.ni > max.ni ? r : max, ungroupedTable[0]).ni} trabajadores. Este es el <strong>valor modal</strong> (moda).</p>
              <p>Los salarios menos frecuentes son <strong>{ungroupedTable.filter(r => r.ni === Math.min(...ungroupedTable.map(r => r.ni))).map(r => r.xi).join(", ")}</strong> con solo {Math.min(...ungroupedTable.map(r => r.ni))} trabajador{Math.min(...ungroupedTable.map(r => r.ni)) > 1 ? "es" : ""} cada uno.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded p-2 mt-1">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Lectura de <InlineMath math="F_i" /> (frecuencia relativa acumulada):</p>
              <p className="text-muted-foreground mt-1">Busquemos en la tabla el valor 25: <InlineMath math="F_i" /> = {ungroupedTable.find(r => r.xi === "25")?.Fi.toFixed(4)}. Esto significa que el <strong>{((ungroupedTable.find(r => r.xi === "25")?.Fi || 0) * 100).toFixed(1)}%</strong> de los trabajadores cobra 25 (x10 euros) o menos.</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-2 text-sm space-y-1">
              <p><strong>Verificacion <InlineMath math="n_i" />:</strong> La suma de todos los <InlineMath math="n_i" /> = {n} ✓</p>
              <p><strong>Verificacion <InlineMath math="f_i" />:</strong> La suma de todos los <InlineMath math="f_i" /> = 1.0000 ✓</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-2 text-sm space-y-1">
              <p><strong>Verificacion <InlineMath math="N_i" />:</strong> El ultimo <InlineMath math="N_i" /> = {n} ✓</p>
              <p><strong>Verificacion <InlineMath math="F_i" />:</strong> El ultimo <InlineMath math="F_i" /> = 1.0000 ✓</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 4: Por que agrupar ============ */}
      <StepCard stepNumber={4} title="Por que agrupamos si ya tenemos la tabla sin agrupar?" variant="explanation">
        <p>
          Aunque la tabla sin agrupar tiene &quot;solo&quot; {distinctValues.length} filas, <strong>agrupar simplifica aun mas</strong> y permite
          ver la tendencia general de la distribucion. Pasamos de {distinctValues.length} filas a solo {groupedIntervals.length}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm">Sin agrupar ({distinctValues.length} filas)</p>
              <p className="text-sm text-muted-foreground">Vemos el detalle exacto de cada salario. Util para datos con pocos valores distintos.</p>
              <p className="text-sm text-muted-foreground"><strong>Problema:</strong> con muchos valores distintos, la tabla seria enorme y dificil de interpretar.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200 text-sm">Agrupada ({groupedIntervals.length} filas)</p>
              <p className="text-sm text-muted-foreground">Vemos la tendencia general: donde se concentran los salarios. Mas facil de representar graficamente (histograma).</p>
              <p className="text-sm text-muted-foreground"><strong>Coste:</strong> perdemos el detalle de cada valor individual.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Como se construyen los intervalos</p>
            <p className="text-muted-foreground">Elegimos intervalos de <strong>amplitud 2</strong> (cada intervalo cubre un rango de 2 unidades). Empezamos en {minVal} (el valor mas bajo) y avanzamos de 2 en 2 hasta cubrir {maxVal} (el valor mas alto).</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {groupedIntervals.map(([l, u], k) => (
                <Badge key={k} variant="outline" className="text-sm font-mono">
                  {k === groupedIntervals.length - 1 ? `[${l}, ${u}]` : `[${l}, ${u})`}
                </Badge>
              ))}
            </div>
            <Card className="bg-white dark:bg-gray-900 mt-2">
              <CardContent className="p-2 text-sm space-y-1">
                <p className="font-semibold">Notacion de los intervalos:</p>
                <p><Badge variant="outline" className="text-sm mr-1">[19, 21)</Badge> = incluye 19 y 20, pero <strong>no incluye 21</strong>. El corchete [ incluye el extremo, el parentesis ) lo excluye.</p>
                <p><Badge variant="outline" className="text-sm mr-1">[29, 31]</Badge> = el ultimo intervalo incluye ambos extremos para no dejar fuera el valor {maxVal}.</p>
                <p className="text-muted-foreground mt-1">Asi cada dato cae en <strong>exactamente un</strong> intervalo, sin repetirse ni quedar fuera.</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 5: Clasificacion visual de datos en intervalos ============ */}
      <StepCard stepNumber={5} title="Como se clasifican los datos en cada intervalo" variant="explanation">
        <p>
          Veamos a que intervalo va cada dato. Recorremos los {n} valores y los metemos en su &quot;cajon&quot; correspondiente.
          Solo nos quedamos con <strong>cuantos hay en cada cajon</strong> (<InlineMath math="n_i" />).
        </p>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Todos los intervalos con sus datos:</p>
            <div className="space-y-1.5">
              {intervalWithValues.map((d, i) => (
                <div key={i} className={`flex items-start gap-2 p-1.5 rounded ${d.values.length > 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800 opacity-50"}`}>
                  <Badge variant="outline" className="text-sm shrink-0 mt-0.5 font-mono w-16 justify-center">
                    {d.label}
                  </Badge>
                  <div className="flex-1">
                    {d.values.length > 0 ? (
                      <span className="text-sm font-mono">{d.values.join(", ")}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">vacio</span>
                    )}
                  </div>
                  <Badge className={`text-sm shrink-0 ${d.values.length > 8 ? "bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200" : d.values.length > 0 ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200" : "bg-gray-100 dark:bg-gray-700/30 text-gray-400"}`}>
                    <InlineMath math="n_i" />={d.values.length}
                  </Badge>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Total: {intervalWithValues.reduce((sum, d) => sum + d.values.length, 0)} datos = los {n} originales. Ningun dato se pierde, solo se agrupan.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Ejemplo concreto: intervalo [25, 27)</p>
            <p>Buscamos los datos que cumplen: 25 ≤ x &lt; 27. Los valores 25 y 26 caben, pero el 27 no (porque el parentesis ) lo excluye).</p>
            <p className="font-mono bg-white dark:bg-gray-900 rounded p-1.5 text-sm mt-1">
              {intervalWithValues.find(d => d.label === "[25, 27)")?.values.join(", ") || "-"}
            </p>
            <p className="mt-1">Encontramos <strong>{intervalWithValues.find(d => d.label === "[25, 27)")?.values.length}</strong> datos → <InlineMath math="n_i" /> = {intervalWithValues.find(d => d.label === "[25, 27)")?.values.length}. Este es el intervalo con <strong>mas trabajadores</strong>.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 6: Tabla agrupada ============ */}
      <StepCard stepNumber={6} title="a) Distribucion agrupada en intervalos de amplitud 2" variant="calculation">
        <p>Agrupamos los {n} datos en {groupedIntervals.length} intervalos de amplitud 2:</p>
        <FrequencyTable
          data={groupedTable}
          title={`Distribucion agrupada en intervalos de amplitud 2 - n = ${n}`}
          grouped
        />

        <FormulaDisplay math={`n = \\sum n_i = ${groupedTable.map(r => r.ni).join(" + ")} = ${n} \\text{ trabajadores}`} />

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Como leer esta tabla:</p>
            <div className="space-y-1">
              <p><strong>Intervalo {maxFreqRow.xi}:</strong> <InlineMath math="n_i" /> = {maxFreqRow.ni} trabajadores. Es el intervalo con mayor frecuencia (el mas comun). Esto significa que <strong>{maxFreqRow.ni} de {n} trabajadores</strong> ({(maxFreqRow.fi * 100).toFixed(1)}%) cobran un salario en ese rango.</p>
              <p><strong>Ultimo intervalo {groupedTable[groupedTable.length - 1].xi}:</strong> <InlineMath math="F_i" /> = {groupedTable[groupedTable.length - 1].Fi.toFixed(4)} = 100%. Logicamente, todos los trabajadores cobran un salario dentro del rango total.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded p-2 mt-1">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Comparacion con la tabla sin agrupar:</p>
              <p className="text-muted-foreground mt-1">La tabla sin agrupar tenia {distinctValues.length} filas (un nivel de detalle alto). La tabla agrupada tiene solo {groupedIntervals.length} filas y muestra claramente que <strong>los salarios se concentran en la zona central</strong> (intervalos [25, 27) y [27, 29)).</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-2 text-sm space-y-1">
              <p><strong>Verificacion <InlineMath math="n_i" />:</strong> La suma de todos los <InlineMath math="n_i" /> = {n} ✓</p>
              <p><strong>Verificacion <InlineMath math="f_i" />:</strong> La suma de todos los <InlineMath math="f_i" /> = 1.0000 ✓</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-2 text-sm space-y-1">
              <p><strong>Verificacion <InlineMath math="N_i" />:</strong> El ultimo <InlineMath math="N_i" /> = {n} ✓</p>
              <p><strong>Verificacion <InlineMath math="F_i" />:</strong> El ultimo <InlineMath math="F_i" /> = 1.0000 ✓</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 7: Explicacion del histograma ============ */}
      <StepCard stepNumber={7} title="Que es un histograma y por que lo usamos aqui?" variant="explanation">
        <p>
          Un <strong>histograma</strong> es un grafico de barras <strong>pegadas</strong> (sin huecos entre ellas)
          que representa la distribucion de datos agrupados en intervalos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-violet-800 dark:text-violet-200 text-sm">Eje X (horizontal)</p>
              <p className="text-sm text-muted-foreground">Los <strong>intervalos</strong> de salario. Cada barra cubre un rango de 2 unidades. Estan en orden y son consecutivos.</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-violet-800 dark:text-violet-200 text-sm">Eje Y (vertical)</p>
              <p className="text-sm text-muted-foreground">La <strong>frecuencia absoluta</strong> (<InlineMath math="n_i" />). La altura de cada barra indica cuantos trabajadores hay en ese intervalo.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Por que un histograma y no un diagrama de barras?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-0.5">
                <p className="font-semibold text-sm">Diagrama de barras</p>
                <p className="text-sm text-muted-foreground">Barras <strong>separadas</strong>. Para variables cualitativas o cuantitativas discretas (valores aislados).</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-0.5">
                <p className="font-semibold text-sm">Histograma</p>
                <p className="text-sm text-muted-foreground">Barras <strong>pegadas</strong>. Para datos agrupados en intervalos. Refleja que los intervalos son consecutivos (no hay &quot;huecos&quot;).</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-1">En este ejercicio, aunque los salarios son valores discretos (enteros), al agruparlos en intervalos los tratamos como si fueran continuos. Por eso el histograma es la representacion adecuada.</p>
          </CardContent>
        </Card>

        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Dato importante:</strong> cuando todos los intervalos tienen la <strong>misma amplitud</strong> (como aqui, amplitud = 2), la <strong>altura</strong> de cada barra es directamente proporcional a la frecuencia. Si los intervalos tuvieran amplitudes diferentes, tendriamos que usar la <strong>densidad de frecuencia</strong> (<InlineMath math="d_i = f_i / c_i" />) para que el <strong>area</strong> sea proporcional.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 8: Histograma ============ */}
      <StepCard stepNumber={8} title="b) Histograma de salarios diarios" variant="result">
        <HistogramChart
          data={histogramData}
          title="Histograma de salarios diarios (en 10 euros)"
          xLabel="Salario (x10 euros)"
          yLabel="Frecuencia absoluta"
          highlightIndex={groupedTable.indexOf(maxFreqRow)}
        />

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Interpretacion del histograma:</p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-sm shrink-0">Concentracion</Badge>
                <p className="text-muted-foreground">La mayor concentracion de salarios esta en el intervalo <strong>{maxFreqRow.xi}</strong>, con <strong>{maxFreqRow.ni} trabajadores</strong> ({(maxFreqRow.fi * 100).toFixed(1)}% del total). Le sigue el intervalo {groupedTable.sort((a, b) => b.ni - a.ni)[1]?.xi} con {groupedTable.sort((a, b) => b.ni - a.ni)[1]?.ni} trabajadores.</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 text-sm shrink-0">Forma</Badge>
                <p className="text-muted-foreground">La distribucion tiene forma aproximadamente <strong>simetrica</strong> o ligeramente sesgada, con los salarios mas frecuentes en la zona central (25-29) y menos frecuentes en los extremos (19-21 y 29-31).</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-violet-200 text-violet-800 dark:text-violet-200 text-sm shrink-0">Extremos</Badge>
                <p className="text-muted-foreground">Los intervalos con menos trabajadores son <strong>{groupedTable[0].xi}</strong> ({groupedTable[0].ni} trabajadores) y podemos ver que pocos trabajadores cobran los salarios mas bajos.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Conclusion practica</p>
            <p className="text-muted-foreground">Si fueras el director de personal, este histograma te diria que la <strong>mayoria de los trabajadores</strong> cobra entre 25 y 29 (x10 euros). Pocos cobran menos de 21 o mas de 29. Esta informacion es util para planificar presupuestos, negociar convenios o detectar posibles desigualdades salariales.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 9: Resumen ============ */}
      <StepCard stepNumber={9} title="Resumen: que hemos aprendido?" variant="result">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Tabla sin agrupar</p>
              <p className="text-muted-foreground">Cada valor distinto tiene su fila. Muestra el detalle exacto ({distinctValues.length} filas en este caso). Util cuando hay pocos valores distintos.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Tabla agrupada</p>
              <p className="text-muted-foreground">Los valores se juntan en intervalos de amplitud fija ({groupedIntervals.length} intervalos de amplitud 2). Simplifica la informacion y muestra tendencias generales.</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-violet-800 dark:text-violet-200">Histograma</p>
              <p className="text-muted-foreground">Barras pegadas que representan datos agrupados. La altura de cada barra = <InlineMath math="n_i" /> (si la amplitud es constante). Permite ver la &quot;forma&quot; de la distribucion.</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-amber-800 dark:text-amber-200">4 frecuencias</p>
              <p className="text-muted-foreground"><InlineMath math="n_i" /> (contar) → <InlineMath math="f_i" /> (proporcion) → <InlineMath math="N_i" /> (acumular) → <InlineMath math="F_i" /> (proporcion acumulada). Todo parte de contar cuantos datos hay en cada grupo.</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
