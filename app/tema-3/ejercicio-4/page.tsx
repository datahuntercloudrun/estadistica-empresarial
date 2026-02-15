"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mean, median, variance, stdDev, cv, range, round } from "@/lib/stats/descriptive";
import { quartile, percentile, iqr } from "@/lib/stats/position";

const rawData = [
  163, 132, 154, 152, 148, 159, 144, 139, 146, 144,
  150, 125, 139, 134, 156, 136, 157, 168, 158, 167,
];

const sorted = [...rawData].sort((a, b) => a - b);
const m = mean(rawData);
const s = stdDev(rawData);
const cvVal = cv(rawData);
const med = median(rawData);
const q1 = quartile(rawData, 1);
const q3 = quartile(rawData, 3);
const p95 = percentile(rawData, 95);
const iqrVal = iqr(rawData);
const rangeVal = range(rawData);

export default function Ejercicio4() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={4}
      title="Duración de Baterías"
      difficulty="Medio"
      category="Medidas de posición, dispersión y CV"
      statement={
        <div className="space-y-2">
          <p>Duración (en horas) de 20 baterías producidas en una fábrica:</p>
          <p className="font-mono text-sm bg-white dark:bg-gray-900 p-2 rounded">
            {rawData.join(", ")}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Duración media. Coeficiente de variación</li>
            <li>b) Duración máxima del 50% que menos duran y mínima del 5% que más duran</li>
            <li>c) Recorrido de la variable y recorrido intercuartílico</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-3"
      nextUrl="/tema-3/ejercicio-5"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio combina <strong>medidas de centralización, dispersión y posición</strong>,
          pero lo interesante es que las preguntas del apartado b) están formuladas en lenguaje cotidiano,
          no con jerga estadística. Aprenderemos a <strong>traducir</strong> preguntas del día a día a herramientas estadísticas:
        </p>
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Traducción pregunta → herramienta estadística</p>
            <div className="space-y-1.5">
              <div className="bg-white dark:bg-gray-900 rounded p-2 flex items-start gap-2">
                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm shrink-0 mt-0.5">Pregunta</Badge>
                <p>&quot;Duración media&quot; → <strong>Media aritmética</strong> (el promedio)</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2 flex items-start gap-2">
                <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-sm shrink-0 mt-0.5">Pregunta</Badge>
                <p>&quot;¿Es fiable esta media?&quot; → <strong>Coeficiente de variación</strong> (CV &lt; 50% → fiable)</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2 flex items-start gap-2">
                <Badge className="bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200 text-sm shrink-0 mt-0.5">Pregunta</Badge>
                <p>&quot;Máxima del 50% que menos duran&quot; → <strong>Mediana</strong> (el valor que deja el 50% por debajo)</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2 flex items-start gap-2">
                <Badge className="bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200 text-sm shrink-0 mt-0.5">Pregunta</Badge>
                <p>&quot;Mínima del 5% que más duran&quot; → <strong>Percentil 95</strong> (el valor que deja el 95% por debajo)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 1: Datos ordenados ============ */}
      <StepCard stepNumber={2} title="Datos ordenados" variant="explanation">
        <p className="text-sm font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">{sorted.join(", ")}</p>
        <p className="text-sm text-muted-foreground mt-1">n = {rawData.length} baterías. De {sorted[0]}h a {sorted[sorted.length - 1]}h.</p>
      </StepCard>

      {/* ============ PASO 2: Duración media ============ */}
      <StepCard stepNumber={3} title="a) Duración media" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Qué nos dice la media aquí?</p>
            <p className="text-muted-foreground">
              &quot;Si todas las baterías duraran exactamente lo mismo, ¿cuántas horas duraría cada una?&quot;
              Es el valor &quot;equitativo&quot; que representa a todas las baterías.
            </p>
          </CardContent>
        </Card>
        <FormulaDisplay math={`\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${rawData.reduce((s, x) => s + x, 0)}}{${rawData.length}} = ${round(m, 2)} \\text{ horas}`} />
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Interpretación:</strong> Una batería de esta fábrica dura, en promedio, {round(m, 2)} horas ({round(m / 24, 1)} días aproximadamente).</p>
          </CardContent>
        </Card>
        <ResultCard label="Media" value={`${round(m, 2)} horas`} />
      </StepCard>

      {/* ============ PASO 3: Coeficiente de variación ============ */}
      <StepCard stepNumber={4} title="a) Coeficiente de variación" variant="calculation">
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mb-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">¿Qué nos dice el CV?</p>
            <p className="text-muted-foreground">
              &quot;¿Es de fiar la media de {round(m, 2)}h? ¿O las baterías varían tanto que esa media no representa bien la realidad?&quot;
              Regla: CV &lt; 50% → la media es representativa.
            </p>
          </CardContent>
        </Card>
        <FormulaDisplay math={`s = ${round(s, 4)} \\text{ h}`} />
        <FormulaDisplay math={`CV = \\frac{s}{|\\bar{x}|} \\times 100 = \\frac{${round(s, 4)}}{${round(m, 2)}} \\times 100 = ${round(cvVal, 2)}\\%`} />
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Interpretación:</strong> CV = {round(cvVal, 2)}%, que es mucho menor que 50%.
            Esto significa que las baterías tienen una duración bastante <strong>homogénea</strong> (parecida entre sí)
            y la media de {round(m, 2)}h es un buen resumen de los datos.</p>
          </CardContent>
        </Card>
        <ResultCard label="Coeficiente de variación" value={`${round(cvVal, 2)}%`} />
      </StepCard>

      {/* ============ PASO 4: Mediana (50% que menos duran) ============ */}
      <StepCard stepNumber={5} title="b) Duración máxima del 50% que menos duran" variant="calculation">
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-violet-800 dark:text-violet-200">Traducción de la pregunta</p>
            <p className="text-muted-foreground">
              &quot;Del 50% de baterías que menos duran, ¿cuál es la que más dura?&quot;
            </p>
            <p className="text-muted-foreground">
              Esto es exactamente <strong>la mediana</strong>: el valor que deja el 50% de los datos por debajo.
              Si coges las 10 baterías peores (50% de 20), la que más dura de esas 10 es la mediana.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded p-2">
              <p><strong>Truco para el examen:</strong> Cuando leas &quot;máxima del X% que menos...&quot; o
              &quot;mínima del X% que más...&quot;, piensa en percentiles. El percentil P divide: P% por debajo, (100-P)% por encima.</p>
            </div>
          </CardContent>
        </Card>
        <FormulaDisplay math={`Me = Q_2 = ${round(med, 2)} \\text{ horas}`} />
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Interpretación:</strong> De las 10 baterías que menos duran, la &quot;mejor&quot; de ellas dura {round(med, 2)} horas.
            Cualquier batería del otro 50% dura más que eso.</p>
          </CardContent>
        </Card>
        <ResultCard label="Duración máxima del 50% inferior" value={`${round(med, 2)} horas (mediana)`} />
      </StepCard>

      {/* ============ PASO 5: Percentil 95 (5% que más duran) ============ */}
      <StepCard stepNumber={6} title="b) Duración mínima del 5% que más duran" variant="calculation">
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-violet-800 dark:text-violet-200">Traducción de la pregunta</p>
            <p className="text-muted-foreground">
              &quot;Del 5% de baterías que más duran, ¿cuál es la que menos dura?&quot;
            </p>
            <p className="text-muted-foreground">
              El 5% que más dura = el 5% superior. El valor que separa el 95% inferior del 5% superior
              es el <strong>percentil 95 (P₉₅)</strong>.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded p-2">
              <p><strong>Razonamiento:</strong> Si el 5% más alto está por encima de P₉₅,
              entonces la batería más baja de ese 5% es exactamente P₉₅.</p>
            </div>
          </CardContent>
        </Card>
        <FormulaDisplay math={`P_{95}: \\text{posición} = \\frac{95 \\cdot (20+1)}{100} = 19{,}95`} />
        <FormulaDisplay math={`P_{95} = ${round(p95, 2)} \\text{ horas}`} />
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Interpretación:</strong> Solo el 5% de las baterías (1 de cada 20) dura más de {round(p95, 2)} horas.
            Estas son las baterías &quot;estrella&quot; de la producción.</p>
          </CardContent>
        </Card>
        <ResultCard label="Duración mínima del 5% superior" value={`${round(p95, 2)} horas (P95)`} />
      </StepCard>

      {/* ============ PASO 6: Recorrido y RIC ============ */}
      <StepCard stepNumber={7} title="c) Recorrido y recorrido intercuartílico" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Dos formas de medir el &quot;rango&quot; de los datos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p className="font-semibold">Recorrido (Re)</p>
                <FormulaDisplay math={`Re = x_{max} - x_{min}`} />
                <p className="text-sm text-muted-foreground">
                  &quot;¿Cuál es la diferencia entre la batería que más y menos dura?&quot;
                  <strong> Problema:</strong> muy sensible a valores extremos.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p className="font-semibold">Recorrido intercuartílico (RIC)</p>
                <FormulaDisplay math={`RIC = Q_3 - Q_1`} />
                <p className="text-sm text-muted-foreground">
                  &quot;¿Cuál es el rango del 50% central de los datos?&quot;
                  <strong> Ventaja:</strong> ignora los extremos, mucho más robusto.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <FormulaDisplay math={`Re = x_{max} - x_{min} = ${Math.max(...rawData)} - ${Math.min(...rawData)} = ${rangeVal} \\text{ horas}`} />
        <FormulaDisplay math={`RIC = Q_3 - Q_1 = ${round(q3, 2)} - ${round(q1, 2)} = ${round(iqrVal, 2)} \\text{ horas}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm space-y-1">
            <p><strong>Recorrido = {rangeVal}h:</strong> La batería más duradera supera a la peor en {rangeVal} horas. Pero este dato puede estar inflado por una sola batería excepcional.</p>
            <p><strong>RIC = {round(iqrVal, 2)}h:</strong> El 50% central de las baterías tiene un rango de solo {round(iqrVal, 2)} horas. Esto confirma que la mayoría de baterías son bastante similares.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <ResultCard label="Recorrido" value={`${rangeVal} horas`} />
          <ResultCard label="RIC" value={`${round(iqrVal, 2)} horas`} />
        </div>
      </StepCard>

    </ExerciseLayout>
  );
}
