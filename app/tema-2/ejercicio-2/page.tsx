"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FrequencyTable } from "@/components/stats/frequency-table";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Datos del ejercicio
const rawData = [
  80.1, 72.8, 76.3, 79.3, 78.5, 78.9, 85.4, 69.4,
  75.8, 77.9, 75.6, 83.1, 77.7, 71.6, 72.8, 84.7,
  76.2, 74.1, 82.4, 88.2, 82.2, 65.8, 83.2, 78.1,
  80.4, 69.7, 72.2, 81.2, 76.3, 81.2, 82.5, 69.3,
  70.8, 75.6, 77.5, 78.3, 71.5, 68.6, 90.32, 82.3,
  79.2, 88.8, 92.3, 81.3, 78.9, 69.4, 85.2, 84.5,
  77.6, 81.7, 89.1, 81.4, 80.2, 79.4, 72.6, 77.6,
  77.2, 78.7, 82.3, 75.4,
];

// Intervalos de amplitud 2: [64, 66], (66, 68], (68, 70], ..., (92, 94]
const intervals: [number, number][] = [
  [64, 66], [66, 68], [68, 70], [70, 72], [72, 74],
  [74, 76], [76, 78], [78, 80], [80, 82], [82, 84],
  [84, 86], [86, 88], [88, 90], [90, 92], [92, 94],
];

// Calcular tabla de frecuencias
function computeTable() {
  const n = rawData.length;
  const rows: { xi: string; ni: number; fi: number; Ni: number; Fi: number }[] = [];
  let Ni = 0;

  for (let k = 0; k < intervals.length; k++) {
    const [lower, upper] = intervals[k];
    let count = 0;
    for (const x of rawData) {
      if (k === 0) {
        if (x >= lower && x <= upper) count++;
      } else {
        if (x > lower && x <= upper) count++;
      }
    }
    if (count === 0 && Ni === 0) continue; // skip empty leading intervals
    Ni += count;
    rows.push({
      xi: k === 0 ? `[${lower}, ${upper}]` : `(${lower}, ${upper}]`,
      ni: count,
      fi: count / n,
      Ni,
      Fi: Ni / n,
    });
    if (Ni === n) break;
  }
  return rows;
}

const tableData = computeTable();

// Para cada intervalo, qué valores originales caen dentro (ordenados)
const intervalWithValues = intervals.map(([lower, upper], k) => ({
  label: k === 0 ? `[${lower}, ${upper}]` : `(${lower}, ${upper}]`,
  values: rawData
    .filter(x => k === 0 ? (x >= lower && x <= upper) : (x > lower && x <= upper))
    .sort((a, b) => a - b),
}));


export default function Ejercicio2() {
  return (
    <ExerciseLayout
      tema={2}
      exerciseNumber={2}
      title="Distribución de Frecuencias de Pesos"
      difficulty="Medio-Alto"
      category="Distribuciones de frecuencias"
      statement={
        <div className="space-y-2">
          <p>
            Para estudiar el efecto de una determinada dieta alimenticia se ha tomado al azar una muestra de
            <strong> 60 personas</strong>. Los pesos obtenidos (en kg) son:
          </p>
          <div className="bg-white dark:bg-gray-900 p-3 rounded text-sm font-mono grid grid-cols-4 sm:grid-cols-8 gap-x-3 gap-y-1.5">
            {rawData.map((d, i) => (
              <span key={i} className="text-center tabular-nums">{d}</span>
            ))}
          </div>
          <p>Determine:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>a) La distribución de frecuencias agrupada en intervalos de amplitud 2</li>
            <li>b) Frecuencias absolutas, relativas, absolutas acumuladas y relativas acumuladas</li>
            <li>c) Estime el % de personas con peso entre 75 y 85 kg mediante el polígono de frecuencias</li>
          </ul>
        </div>
      }
      prevUrl="/tema-2/ejercicio-1"
      nextUrl="/tema-2/ejercicio-3"
    >
      {/* Paso 0: ¿Por qué agrupar? */}
      <StepCard stepNumber={1} title="¿Por qué agrupar datos en intervalos?" variant="explanation">
        <p>
          Tenemos 60 valores de peso, casi todos diferentes. Si hiciéramos una tabla con un valor por fila,
          tendríamos una tabla enorme donde cada valor aparece 1 o 2 veces. Eso no nos dice nada útil.
        </p>
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Solución: agrupar en intervalos (clases)</p>
            <p>En vez de tratar cada peso individualmente, creamos &quot;cajones&quot; de tamaño fijo (amplitud = 2 kg) y contamos cuántas personas caen en cada cajón.</p>
            <p className="text-muted-foreground">Por ejemplo: ¿cuántas personas pesan entre 76 y 78 kg? Eso es mucho más informativo.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* Paso 1.5: Demostración visual del agrupamiento */}
      <StepCard stepNumber={2} title="¿Cómo se clasifican los datos en intervalos?" variant="explanation">
        <p>
          Vamos a ver el proceso paso a paso. Cada dato decimal original se &quot;mete&quot; en el cajón (intervalo) al que pertenece.
          Los datos originales <strong>no desaparecen</strong>, simplemente se agrupan y solo nos quedamos con <strong>cuántos hay en cada cajón</strong> (eso es <InlineMath math="n_i" />).
        </p>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Ejemplo concreto: intervalo (76, 78]</p>
            <p>Recorremos los 60 datos y buscamos los que cumplen: 76 &lt; x ≤ 78</p>
            <div className="bg-white dark:bg-gray-900 rounded p-2 font-mono text-[11px]">
              {intervalWithValues.find(d => d.label === "(76, 78]")?.values.join(", ") || "-"}
            </div>
            <p>Encontramos <strong>{intervalWithValues.find(d => d.label === "(76, 78]")?.values.length} valores</strong> → eso es <InlineMath math="n_i" /> = {intervalWithValues.find(d => d.label === "(76, 78]")?.values.length}. La marca de clase <InlineMath math="x_i" /> = (76+78)/2 = 77 los representa a todos.</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Todos los intervalos con sus datos originales:</p>
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
                      <span className="text-sm text-muted-foreground italic">vacío</span>
                    )}
                  </div>
                  <Badge className={`text-sm shrink-0 ${d.values.length > 5 ? "bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200" : d.values.length > 0 ? "bg-gray-200 dark:bg-gray-700/40 text-gray-800 dark:text-gray-200" : "bg-gray-100 dark:bg-gray-700/30 text-gray-400"}`}>
                    <InlineMath math="n_i" />={d.values.length}
                  </Badge>
                </div>
              ))}
            </div>
            <Separator className="my-2" />
            <p className="text-sm text-muted-foreground">
              Total: {intervalWithValues.reduce((sum, d) => sum + d.values.length, 0)} datos = los 60 originales. Ninguno se pierde, solo se agrupan.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Conclusión:</strong> La tabla de frecuencias es un &quot;resumen&quot; de esta clasificación. En vez de ver los 60 valores, solo vemos cuántos hay en cada intervalo (<InlineMath math="n_i" />). Los decimales originales &quot;viven&quot; dentro de sus intervalos, representados por la marca de clase <InlineMath math="x_i" />.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* Paso 2: Construcción de intervalos */}
      <StepCard stepNumber={3} title="Construir los intervalos de amplitud 2" variant="calculation">
        <p>
          El enunciado nos dice amplitud = 2 kg. Como el dato más bajo es {Math.min(...rawData)} y el más alto es {Math.max(...rawData)},
          necesitamos intervalos que cubran todo ese rango.
        </p>
        <Card className="bg-gray-50 dark:bg-gray-800 border mt-2 mb-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">¿Por qué empezamos en 64?</p>
            <p className="text-muted-foreground">El dato más bajo es 65.8 kg. Necesitamos que el primer intervalo lo contenga, así que elegimos un número par por debajo: 64. Los intervalos van de 2 en 2 (amplitud = 2), así que: 64, 66, 68, 70, ... hasta cubrir el dato más alto (92.3 kg), lo que nos lleva hasta 94.</p>
          </CardContent>
        </Card>
        <div className="flex flex-wrap gap-1 mt-2">
          {intervals.map(([l, u], k) => (
            <Badge key={k} variant="outline" className="text-sm font-mono">
              {k === 0 ? `[${l}, ${u}]` : `(${l}, ${u}]`}
            </Badge>
          ))}
        </div>
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mt-3">
          <CardContent className="p-3 space-y-1">
            <p className="font-semibold text-sm text-violet-800 dark:text-violet-200">¿Por qué el primer intervalo usa [ y los demás (?</p>
            <div className="text-sm space-y-1">
              <p><Badge variant="outline" className="text-sm mr-1">[64, 66]</Badge> Cerrado por ambos lados: incluye el 64 y el 66. Así no perdemos el valor mínimo (65.8).</p>
              <p><Badge variant="outline" className="text-sm mr-1">(66, 68]</Badge> Abierto por la izquierda: NO incluye el 66 (ya está en el intervalo anterior) pero SÍ incluye el 68.</p>
              <p className="text-muted-foreground mt-1">Así cada dato cae en <strong>exactamente un</strong> intervalo, sin repetirse ni quedar fuera.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Qué es la marca de clase (<InlineMath math="x_i" />)?</p>
            <p className="text-muted-foreground">Es el <strong>punto medio</strong> de cada intervalo. Sirve como valor representativo de todos los datos que caen dentro de ese intervalo.</p>
            <FormulaDisplay math={`x_i = \\frac{\\text{límite inferior} + \\text{límite superior}}{2}`} />
            <p className="text-muted-foreground">Ej: intervalo (76, 78] → <InlineMath math="x_i" /> = (76+78)/2 = 77. Todos los datos de ese intervalo (76.2, 76.3, 77.2...) se &quot;representan&quot; por 77.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* Paso 3: Explicación de las 4 frecuencias */}
      <StepCard stepNumber={4} title="¿Qué son las 4 frecuencias y cómo se calculan?" variant="explanation">
        <p>Para cada intervalo calculamos 4 valores. Están relacionados entre sí como una cadena:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 border-l-4">
            <CardContent className="p-3 space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-sm"><InlineMath math="n_i" /></Badge>
                <p className="font-semibold text-sm">Frecuencia Absoluta</p>
              </div>
              <p className="text-sm text-muted-foreground"><strong>¿Qué es?</strong> Simplemente contar: ¿cuántas personas hay en este intervalo?</p>
              <p className="text-sm"><strong>¿Cómo se calcula?</strong> Se recorren los 60 datos y se cuenta cuántos caen dentro del intervalo.</p>
              <div className="bg-white dark:bg-gray-900 rounded p-2 mt-1">
                <p className="text-sm">Ej: intervalo (76, 78] → contamos los datos entre 76 y 78 → <InlineMath math="n_i" /> = 10</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 border-l-4">
            <CardContent className="p-3 space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 text-sm"><InlineMath math="f_i" /></Badge>
                <p className="font-semibold text-sm">Frecuencia Relativa</p>
              </div>
              <p className="text-sm text-muted-foreground"><strong>¿Qué es?</strong> La proporción (%) que representa ese intervalo sobre el total.</p>
              <FormulaDisplay math={`f_i = \\frac{n_i}{n}`} />
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p className="text-sm">Ej: si <InlineMath math="n_i" /> = 10 y n = 60 → <InlineMath math="f_i" /> = 10/60 = 0.1667 = 16.67%</p>
              </div>
              <p className="text-sm text-muted-foreground">Se obtiene <strong>a partir de <InlineMath math="n_i" /></strong>. La suma de todas las <InlineMath math="f_i" /> = 1 (100%).</p>
            </CardContent>
          </Card>

          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 border-l-4">
            <CardContent className="p-3 space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-violet-200 dark:bg-violet-800/40 text-violet-800 dark:text-violet-200 text-sm"><InlineMath math="N_i" /></Badge>
                <p className="font-semibold text-sm">Frecuencia Absoluta Acumulada</p>
              </div>
              <p className="text-sm text-muted-foreground"><strong>¿Qué es?</strong> ¿Cuántas personas hay <em>hasta</em> este intervalo (incluido)?</p>
              <FormulaDisplay math={`N_i = n_1 + n_2 + \\cdots + n_i`} />
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p className="text-sm">Ej: si los 3 primeros intervalos tienen <InlineMath math="n_i" /> = 1, 2, 5 → <InlineMath math="N_3" /> = 1+2+5 = 8 personas pesan hasta 70 kg.</p>
              </div>
              <p className="text-sm text-muted-foreground">Se obtiene <strong>sumando las <InlineMath math="n_i" /> anteriores</strong>. La última <InlineMath math="N_i" /> siempre es n (60).</p>
            </CardContent>
          </Card>

          <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 border-l-4">
            <CardContent className="p-3 space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-rose-200 dark:bg-rose-800/40 text-rose-800 dark:text-rose-200 text-sm"><InlineMath math="F_i" /></Badge>
                <p className="font-semibold text-sm">Frecuencia Relativa Acumulada</p>
              </div>
              <p className="text-sm text-muted-foreground"><strong>¿Qué es?</strong> ¿Qué proporción de personas pesa <em>hasta</em> este intervalo?</p>
              <FormulaDisplay math={`F_i = \\frac{N_i}{n} = f_1 + f_2 + \\cdots + f_i`} />
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p className="text-sm">Ej: si <InlineMath math="N_i" /> = 8 y n = 60 → <InlineMath math="F_i" /> = 8/60 = 0.1333 = 13.33% pesan hasta 70 kg.</p>
              </div>
              <p className="text-sm text-muted-foreground">Se puede calcular de <strong>dos formas</strong>: <InlineMath math="N_i/n" /> o sumando las <InlineMath math="f_i" />. La última <InlineMath math="F_i" /> siempre es 1.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-3">
          <CardContent className="p-3">
            <p className="font-semibold text-sm text-amber-800 dark:text-amber-200 mb-1">Relación entre las 4 frecuencias:</p>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200"><InlineMath math="n_i" /></Badge>
              <span>÷ n →</span>
              <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200"><InlineMath math="f_i" /></Badge>
              <span className="mx-2">|</span>
              <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200"><InlineMath math="n_i" /></Badge>
              <span>acumular →</span>
              <Badge className="bg-violet-200 dark:bg-violet-800/40 text-violet-800 dark:text-violet-200"><InlineMath math="N_i" /></Badge>
              <span>÷ n →</span>
              <Badge className="bg-rose-200 dark:bg-rose-800/40 text-rose-800 dark:text-rose-200"><InlineMath math="F_i" /></Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Todo parte de <InlineMath math="n_i" /> (contar). Dividir entre n da la proporción. Acumular da el &quot;hasta aquí&quot;. Combinar ambos da <InlineMath math="F_i" />.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* Paso 4.5: Ejemplo paso a paso */}
      <StepCard stepNumber={5} title="Ejemplo: calcular una fila completa paso a paso" variant="calculation">
        <p>Antes de ver la tabla final, veamos cómo se calcula <strong>una fila concreta</strong> de principio a fin. Tomemos el intervalo (68, 70]:</p>
        <div className="space-y-2 mt-2">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold text-blue-800 dark:text-blue-200">1. Frecuencia absoluta (<InlineMath math="n_i" />): contar</p>
              <p>Buscamos los datos que cumplen 68 &lt; x ≤ 70:</p>
              <p className="font-mono bg-white dark:bg-gray-900 rounded p-1.5 text-sm">{intervalWithValues.find(d => d.label === "(68, 70]")?.values.join(", ") || "-"}</p>
              <p>Hay <strong>{intervalWithValues.find(d => d.label === "(68, 70]")?.values.length}</strong> datos → <InlineMath math="n_i" /> = {intervalWithValues.find(d => d.label === "(68, 70]")?.values.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">2. Frecuencia relativa (<InlineMath math="f_i" />): dividir entre n</p>
              <FormulaDisplay math={`f_i = \\frac{n_i}{n} = \\frac{${intervalWithValues.find(d => d.label === "(68, 70]")?.values.length}}{60} = ${((intervalWithValues.find(d => d.label === "(68, 70]")?.values.length || 0) / 60).toFixed(4)}`} />
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold text-violet-800 dark:text-violet-200">3. Frecuencia absoluta acumulada (<InlineMath math="N_i" />): sumar las anteriores</p>
              <p>Los intervalos anteriores son [64, 66] con <InlineMath math="n_i" />=1 y (66, 68] con <InlineMath math="n_i" />=1:</p>
              <FormulaDisplay math={`N_i = 1 + 1 + ${intervalWithValues.find(d => d.label === "(68, 70]")?.values.length} = ${1 + 1 + (intervalWithValues.find(d => d.label === "(68, 70]")?.values.length || 0)}`} />
              <p className="text-muted-foreground">Significa que {1 + 1 + (intervalWithValues.find(d => d.label === "(68, 70]")?.values.length || 0)} personas pesan 70 kg o menos.</p>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold text-rose-800 dark:text-rose-200">4. Frecuencia relativa acumulada (<InlineMath math="F_i" />): dividir <InlineMath math="N_i" /> entre n</p>
              <FormulaDisplay math={`F_i = \\frac{N_i}{n} = \\frac{${1 + 1 + (intervalWithValues.find(d => d.label === "(68, 70]")?.values.length || 0)}}{60} = ${((1 + 1 + (intervalWithValues.find(d => d.label === "(68, 70]")?.values.length || 0)) / 60).toFixed(4)}`} />
              <p className="text-muted-foreground">El {(((1 + 1 + (intervalWithValues.find(d => d.label === "(68, 70]")?.values.length || 0)) / 60) * 100).toFixed(1)}% de las personas pesa 70 kg o menos.</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* Paso 5: Tabla */}
      <StepCard stepNumber={6} title="a) y b) Tabla de frecuencias completa" variant="calculation">
        <p>Aplicamos el mismo proceso a todos los intervalos. Aquí está la tabla completa:</p>
        <FrequencyTable data={tableData} title="Distribución de frecuencias - Pesos (kg)" grouped />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-2 text-sm space-y-1">
              <p><strong>Verificación <InlineMath math="n_i" />:</strong> La suma de todos los <InlineMath math="n_i" /> debe ser n = {rawData.length} ✓</p>
              <p><strong>Verificación <InlineMath math="f_i" />:</strong> La suma de todos los <InlineMath math="f_i" /> debe ser 1 (100%) ✓</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-2 text-sm space-y-1">
              <p><strong>Verificación <InlineMath math="N_i" />:</strong> La última <InlineMath math="N_i" /> debe ser n = {rawData.length} ✓</p>
              <p><strong>Verificación <InlineMath math="F_i" />:</strong> La última <InlineMath math="F_i" /> debe ser 1 ✓</p>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>¿Cómo leer la tabla?</strong> Por ejemplo, la fila (76, 78]: <InlineMath math="n_i" />=10 significa que 10 personas pesan entre 76 y 78 kg.
            <InlineMath math="F_i" />=0.50 significa que el 50% de las personas pesa 78 kg o menos. Este es el intervalo con más personas (moda).</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* Paso 6: Estimación */}
      <StepCard stepNumber={7} title="c) Estimación del % entre 75 y 85 kg" variant="calculation">
        <Card className="bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800 mb-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-cyan-800 dark:text-cyan-200">¿Cómo estimamos un porcentaje con datos agrupados?</p>
            <p>Como los datos están agrupados en intervalos y los límites 75 y 85 caen <strong>dentro</strong> de intervalos (no en sus extremos), no podemos calcular el porcentaje exacto. Lo estimamos sumando las frecuencias relativas (<InlineMath math="f_i" />) de los intervalos que se solapan con el rango 75-85 kg.</p>
            <p className="text-muted-foreground">Es una estimación porque asumimos que los datos se reparten uniformemente dentro de cada intervalo. En la práctica, el resultado es una buena aproximación.</p>
          </CardContent>
        </Card>

        <p className="text-sm font-medium">Intervalos entre 75 y 85 kg:</p>
        <div className="space-y-1 mt-2 text-sm">
          {tableData.filter(row => {
            const match = row.xi.match(/[\[(](\d+\.?\d*),\s*(\d+\.?\d*)[\]]/);
            const lower = parseFloat(match![1]);
            const upper = parseFloat(match![2]);
            return upper > 75 && lower < 85;
          }).map((row, i) => (
            <div key={i} className="flex justify-between px-3 py-1.5 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-100 dark:border-amber-800">
              <span className="font-mono">{row.xi}</span>
              <span className="text-sm">
                <Badge variant="outline" className="text-sm mr-1"><InlineMath math="n_i" /> = {row.ni}</Badge>
                <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-sm"><InlineMath math="f_i" /> = {(row.fi * 100).toFixed(2)}%</Badge>
              </span>
            </div>
          ))}
        </div>
        {(() => {
          const relevant = tableData.filter(row => {
            const match = row.xi.match(/[\[(](\d+\.?\d*),\s*(\d+\.?\d*)[\]]/);
            const lower = parseFloat(match![1]);
            const upper = parseFloat(match![2]);
            return upper > 75 && lower < 85;
          });
          const totalPercent = relevant.reduce((sum, row) => sum + row.fi * 100, 0);
          return (
            <>
              <FormulaDisplay math={`\\text{Porcentaje} = \\sum f_i = ${relevant.map(r => (r.fi * 100).toFixed(2)).join(" + ")} = ${totalPercent.toFixed(2)}\\%`} />
              <ResultCard
                label="Porcentaje estimado de personas con peso entre 75-85 kg"
                value={`${totalPercent.toFixed(2)}%`}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Aproximadamente <strong>{Math.round(totalPercent)}%</strong> de las personas tiene un peso entre 75 y 85 kg.
                Esto se corresponde con la zona central de la distribución.
              </p>
            </>
          );
        })()}
      </StepCard>

      {/* Paso resumen */}
      <StepCard stepNumber={8} title="Resumen: ¿qué hemos aprendido?" variant="result">
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-2 space-y-1">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Agrupar datos</p>
                <p className="text-muted-foreground">Cuando hay muchos valores diferentes, agrupamos en intervalos de amplitud fija para poder analizar patrones.</p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-2 space-y-1">
                <p className="font-semibold text-emerald-800 dark:text-emerald-200">4 frecuencias</p>
                <p className="text-muted-foreground"><InlineMath math="n_i" /> (contar) → <InlineMath math="f_i" /> (proporción) → <InlineMath math="N_i" /> (acumular) → <InlineMath math="F_i" /> (proporción acumulada). Todo parte de contar.</p>
              </CardContent>
            </Card>
            <Card className="bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-2 space-y-1">
                <p className="font-semibold text-indigo-800 dark:text-indigo-200">Estimación</p>
                <p className="text-muted-foreground">Sumando <InlineMath math="f_i" /> de los intervalos relevantes podemos estimar porcentajes.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
