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

const mate = { media: 5.51, varianza: 11.07, cv: 60, asimetria: -0.03, curtosis: -1.26 };
const estad = { media: 6.11, varianza: 10.34, cv: 53, asimetria: -0.33, curtosis: -1.03 };

// Alumno R.C.: 6 en Mate, 7 en Estad
const mateSigma = Math.sqrt(mate.varianza);
const estadSigma = Math.sqrt(estad.varianza);
const zMate = (6 - mate.media) / mateSigma;
const zEstad = (7 - estad.media) / estadSigma;

export default function Complementario2() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber="C2"
      title="Comparación de Calificaciones"
      difficulty="Medio-Alto"
      category="Análisis comparativo, CV, asimetría, curtosis"
      statement={
        <div className="space-y-2">
          <p>La siguiente tabla contiene medidas sobre calificaciones en dos asignaturas:</p>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medida</TableHead>
                  <TableHead className="text-center">Matemáticas</TableHead>
                  <TableHead className="text-center">Estadística</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>Media</TableCell><TableCell className="text-center">{mate.media}</TableCell><TableCell className="text-center">{estad.media}</TableCell></TableRow>
                <TableRow><TableCell>Varianza</TableCell><TableCell className="text-center">{mate.varianza}</TableCell><TableCell className="text-center">{estad.varianza}</TableCell></TableRow>
                <TableRow><TableCell>CV</TableCell><TableCell className="text-center">{mate.cv}%</TableCell><TableCell className="text-center">{estad.cv}%</TableCell></TableRow>
                <TableRow><TableCell>Asimetría</TableCell><TableCell className="text-center">{mate.asimetria}</TableCell><TableCell className="text-center">{estad.asimetria}</TableCell></TableRow>
                <TableRow><TableCell>Curtosis</TableCell><TableCell className="text-center">{mate.curtosis}</TableCell><TableCell className="text-center">{estad.curtosis}</TableCell></TableRow>
              </TableBody>
            </Table>
            </div>
          </Card>
          <p>El alumno R.C. obtuvo <strong>6 en Matemáticas</strong> y <strong>7 en Estadística</strong>.</p>
          <p>Comentar dispersión y forma de ambas distribuciones, así como la posición relativa de R.C.</p>
        </div>
      }
      prevUrl="/tema-3/complementario-1"
      nextUrl="/tema-3/complementario-3"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio nos pide hacer un <strong>análisis completo</strong> de dos distribuciones de notas,
          usando cuatro herramientas estadísticas distintas. Cada una responde a una pregunta diferente:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 text-blue-800 text-[10px]">Dispersión</Badge>
              <p className="text-xs text-muted-foreground">&quot;¿Las notas son parecidas entre sí o hay mucha variedad?&quot;</p>
              <p className="text-[10px]">Herramienta: Coeficiente de Variación (CV)</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-purple-200 text-purple-800 text-[10px]">Asimetría</Badge>
              <p className="text-xs text-muted-foreground">&quot;¿Hay más notas altas que bajas, o al revés?&quot;</p>
              <p className="text-[10px]">Herramienta: Coeficiente de asimetría de Fisher</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-orange-200 text-orange-800 text-[10px]">Curtosis</Badge>
              <p className="text-xs text-muted-foreground">&quot;¿Las notas se concentran en el centro o se reparten?&quot;</p>
              <p className="text-[10px]">Herramienta: Coeficiente de curtosis</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 text-emerald-800 text-[10px]">Posición relativa</Badge>
              <p className="text-xs text-muted-foreground">&quot;¿En qué asignatura destaca más R.C.?&quot;</p>
              <p className="text-[10px]">Herramienta: Tipificación (valor z)</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 1: Dispersión (CV) ============ */}
      <StepCard stepNumber={2} title="Análisis de dispersión (CV)" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Qué mide la dispersión?</p>
            <p className="text-muted-foreground">
              Imagina que todos los alumnos sacan exactamente la misma nota: dispersión cero.
              Ahora imagina que unos sacan 0 y otros 10: dispersión máxima. La dispersión mide
              <strong> cuánto varían las notas entre los alumnos</strong>.
            </p>
            <p className="font-semibold text-blue-800">¿Qué es el Coeficiente de Variación (CV)?</p>
            <p className="text-muted-foreground">
              El CV nos dice qué porcentaje de la media representa la desviación típica.
              Es la herramienta perfecta para <strong>comparar la dispersión entre dos distribuciones distintas</strong>,
              porque es un porcentaje (no tiene unidades).
            </p>
            <FormulaDisplay math={`CV = \\frac{\\sigma}{|\\bar{x}|} \\times 100`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="\sigma" /> = desviación típica (raíz de la varianza)</p>
              <p><InlineMath math="\bar{x}" /> = media aritmética</p>
            </div>
            <div className="bg-white rounded p-2 mt-1">
              <p className="font-semibold">Regla de interpretación:</p>
              <p>CV &lt; 50% → La media es representativa (datos homogéneos)</p>
              <p>CV &gt; 50% → La media NO es representativa (datos muy dispersos)</p>
              <p className="text-[10px] text-muted-foreground mt-1">A menor CV, más homogéneos son los datos y más representativa es la media.</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 text-xs space-y-1">
              <p className="font-semibold">Matemáticas</p>
              <FormulaDisplay math={`CV_{Mat} = ${mate.cv}\\%`} />
              <p className="text-muted-foreground">
                CV = {mate.cv}% &gt; 50% → <strong>La media NO es muy representativa</strong>.
                Las notas están muy repartidas; hay mucha diferencia entre los alumnos.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 text-xs space-y-1">
              <p className="font-semibold">Estadística</p>
              <FormulaDisplay math={`CV_{Est} = ${estad.cv}\\%`} />
              <p className="text-muted-foreground">
                CV = {estad.cv}% &gt; 50% → <strong>La media tampoco es muy representativa</strong>,
                aunque es algo más representativa que en Matemáticas.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Interpretación</p>
            <p className="text-muted-foreground">
              Ambas asignaturas tienen una dispersión alta (CV &gt; 50%), lo que significa que en ambas
              hay mucha variabilidad en las notas. Sin embargo, <strong>Matemáticas es más dispersa</strong> ({mate.cv}% &gt; {estad.cv}%),
              es decir, en Mate las notas de los alumnos varían más. La media de Estadística, aunque no ideal,
              es algo más fiable como resumen de las notas.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Mayor dispersión relativa" value={`Matemáticas (CV=${mate.cv}% > ${estad.cv}%)`} />
      </StepCard>

      {/* ============ PASO 2: Asimetría ============ */}
      <StepCard stepNumber={3} title="Análisis de asimetría" variant="calculation">
        <Card className="bg-purple-50 border-purple-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-purple-800">¿Qué mide la asimetría?</p>
            <p className="text-muted-foreground">
              La asimetría nos dice si la distribución de notas es <strong>simétrica</strong> (la misma forma a ambos lados de la media)
              o si está <strong>desequilibrada</strong> hacia un lado. Imagina un histograma de las notas:
            </p>
            <div className="bg-white rounded p-2 space-y-1">
              <p className="font-semibold">Analogía: una balanza</p>
              <p className="text-muted-foreground">
                Si la distribución fuera un objeto sobre una balanza, la asimetría nos dice si está equilibrada o se inclina
                hacia un lado. Si se inclina a la izquierda, hay más concentración de notas altas. Si se inclina a la derecha,
                hay más concentración de notas bajas.
              </p>
            </div>

            <p className="font-semibold text-purple-800 mt-2">¿Qué fórmula usamos?</p>
            <p className="text-muted-foreground">El coeficiente de asimetría de Fisher:</p>
            <FormulaDisplay math={`g_f = \\frac{\\frac{1}{n} \\sum_{i=1}^{k}(x_i - \\bar{x})^3 \\cdot n_i}{s^3}`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="g_f" /> = coeficiente de asimetría de Fisher</p>
              <p><InlineMath math="x_i" /> = cada valor de la variable</p>
              <p><InlineMath math="\bar{x}" /> = media aritmética</p>
              <p><InlineMath math="s" /> = desviación típica</p>
            </div>

            <p className="font-semibold text-purple-800 mt-2">¿Cómo se interpreta?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-2 text-center">
                  <p className="font-bold text-sm">g<sub>f</sub> = 0</p>
                  <Badge className="bg-green-200 text-green-800 text-[10px]">Simétrica</Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">Las notas se reparten igual a ambos lados de la media</p>
                </CardContent>
              </Card>
              <Card className="bg-rose-50 border-rose-200">
                <CardContent className="p-2 text-center">
                  <p className="font-bold text-sm">g<sub>f</sub> &gt; 0</p>
                  <Badge className="bg-rose-200 text-rose-800 text-[10px]">Asimetría positiva</Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">Cola a la derecha: predominan valores bajos, con algunos altos aislados</p>
                </CardContent>
              </Card>
              <Card className="bg-sky-50 border-sky-200">
                <CardContent className="p-2 text-center">
                  <p className="font-bold text-sm">g<sub>f</sub> &lt; 0</p>
                  <Badge className="bg-sky-200 text-sky-800 text-[10px]">Asimetría negativa</Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">Cola a la izquierda: predominan valores altos, con algunos bajos aislados</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 text-xs space-y-2">
              <p className="font-semibold">Matemáticas</p>
              <FormulaDisplay math={`g_{f,Mat} = ${mate.asimetria}`} />
              <Badge className="bg-green-200 text-green-800 text-[10px]">Casi simétrica</Badge>
              <p className="text-muted-foreground mt-1">
                El valor {mate.asimetria} es prácticamente 0, lo que indica que la distribución
                de notas en Matemáticas es <strong>casi simétrica</strong>. Las notas se reparten de forma
                equilibrada a ambos lados de la media.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 text-xs space-y-2">
              <p className="font-semibold">Estadística</p>
              <FormulaDisplay math={`g_{f,Est} = ${estad.asimetria}`} />
              <Badge className="bg-sky-200 text-sky-800 text-[10px]">Asimetría negativa</Badge>
              <p className="text-muted-foreground mt-1">
                El valor {estad.asimetria} &lt; 0 indica <strong>asimetría negativa</strong> (sesgo a la izquierda).
                Esto significa que hay una mayor concentración de notas altas.
                La &quot;cola&quot; se extiende hacia la izquierda (hay algunos alumnos con notas muy bajas, pero la mayoría aprueba bien).
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Interpretación conjunta</p>
            <p className="text-muted-foreground">
              En <strong>Matemáticas</strong>, las notas se distribuyen de forma bastante simétrica alrededor de la media (5.51):
              hay aproximadamente la misma cantidad de alumnos por encima y por debajo.
            </p>
            <p className="text-muted-foreground">
              En <strong>Estadística</strong>, la distribución está ligeramente sesgada hacia la izquierda:
              hay más alumnos con notas altas y unos pocos con notas muy bajas que &quot;tiran&quot; de la cola izquierda.
              En este caso se cumple aproximadamente que <InlineMath math="\bar{x} \leq Me \leq Mo" />.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 3: Curtosis ============ */}
      <StepCard stepNumber={4} title="Análisis de curtosis (apuntamiento)" variant="calculation">
        <Card className="bg-orange-50 border-orange-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-orange-800">¿Qué mide la curtosis?</p>
            <p className="text-muted-foreground">
              La curtosis (o apuntamiento) mide <strong>cómo de concentrados están los datos alrededor de la media</strong>,
              comparándolo con la distribución Normal (la famosa &quot;campana de Gauss&quot;).
            </p>
            <div className="bg-white rounded p-2 space-y-1">
              <p className="font-semibold">Analogía: la forma de una montaña</p>
              <p className="text-muted-foreground">
                Imagina que el histograma de notas tiene forma de montaña. La curtosis te dice si esa montaña es
                <strong> un pico afilado</strong> (los datos se concentran mucho en el centro),
                <strong> una colina redondeada</strong> (como la Normal), o
                <strong> una meseta plana</strong> (los datos se reparten más uniformemente).
              </p>
            </div>

            <p className="font-semibold text-orange-800 mt-2">¿Qué fórmula usamos?</p>
            <FormulaDisplay math={`g_c = \\frac{\\frac{1}{n} \\sum_{i=1}^{k}(x_i - \\bar{x})^4 \\cdot n_i}{s^4} - 3`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="g_c" /> = coeficiente de curtosis (exceso de curtosis)</p>
              <p className="text-[10px] text-muted-foreground">Se resta 3 para que la distribución Normal tenga curtosis = 0 (referencia).</p>
            </div>

            <p className="font-semibold text-orange-800 mt-2">¿Cómo se interpreta?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-2 text-center">
                  <p className="font-bold text-sm">g<sub>c</sub> = 0</p>
                  <Badge className="bg-green-200 text-green-800 text-[10px]">Mesocúrtica</Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">Igual de apuntada que la Normal. Es la referencia.</p>
                </CardContent>
              </Card>
              <Card className="bg-pink-50 border-pink-200">
                <CardContent className="p-2 text-center">
                  <p className="font-bold text-sm">g<sub>c</sub> &gt; 0</p>
                  <Badge className="bg-pink-200 text-pink-800 text-[10px]">Leptocúrtica</Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">Más apuntada que la Normal. Datos muy concentrados en el centro + colas pesadas.</p>
                </CardContent>
              </Card>
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-2 text-center">
                  <p className="font-bold text-sm">g<sub>c</sub> &lt; 0</p>
                  <Badge className="bg-amber-200 text-amber-800 text-[10px]">Platicúrtica</Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">Más aplanada que la Normal. Datos más repartidos, sin un pico claro.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 text-xs space-y-2">
              <p className="font-semibold">Matemáticas</p>
              <FormulaDisplay math={`g_{c,Mat} = ${mate.curtosis}`} />
              <Badge className="bg-amber-200 text-amber-800 text-[10px]">Platicúrtica</Badge>
              <p className="text-muted-foreground mt-1">
                El valor {mate.curtosis} &lt; 0 indica que la distribución es <strong>platicúrtica</strong>:
                más aplanada que la Normal. Las notas no se concentran en torno a la media, sino que
                se reparten de forma más uniforme. Es como una meseta, no un pico.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 text-xs space-y-2">
              <p className="font-semibold">Estadística</p>
              <FormulaDisplay math={`g_{c,Est} = ${estad.curtosis}`} />
              <Badge className="bg-amber-200 text-amber-800 text-[10px]">Platicúrtica</Badge>
              <p className="text-muted-foreground mt-1">
                El valor {estad.curtosis} &lt; 0 también indica <strong>platicúrtica</strong>, aunque
                menos aplanada que Matemáticas. Las notas están algo más concentradas alrededor de la media
                que en Mate, pero menos que en una distribución Normal.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Interpretación conjunta</p>
            <p className="text-muted-foreground">
              Ambas distribuciones son platicúrticas (más aplanadas que la Normal), pero <strong>Matemáticas
              lo es más</strong> (g<sub>c</sub> = {mate.curtosis} vs {estad.curtosis}). Esto significa que en Matemáticas
              las notas se reparten de manera aún más uniforme (hay de todo: muchos suspensos, aprobados,
              notables y sobresalientes), mientras que en Estadística hay algo más de concentración
              alrededor de la media.
            </p>
            <p className="text-muted-foreground">
              Esto es coherente con el CV: la mayor dispersión de Matemáticas se refleja también
              en una distribución más aplanada.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 4: Tipificación ============ */}
      <StepCard stepNumber={5} title="Posición relativa de R.C. (Tipificación)" variant="calculation">
        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">El problema: ¿cómo comparar notas de asignaturas diferentes?</p>
            <p className="text-muted-foreground">
              R.C. sacó un 6 en Mate y un 7 en Estadística. A primera vista parece que le fue mejor en Estadística.
              Pero, ¿es realmente así? Depende de <strong>cómo se comparen esas notas con las del resto de la clase</strong>.
            </p>
            <div className="bg-white rounded p-2 space-y-1">
              <p className="font-semibold">Analogía: dos carreras diferentes</p>
              <p className="text-muted-foreground">
                Imagina que en una carrera de 100m haces 12 segundos y en una de 200m haces 25 segundos.
                No puedes comparar directamente 12 con 25. Necesitas ver dónde quedas respecto a los demás en cada carrera.
                <strong> La tipificación hace exactamente eso: convierte cada nota a una &quot;escala universal&quot;</strong>.
              </p>
            </div>

            <p className="font-semibold text-emerald-800 mt-2">La fórmula de tipificación</p>
            <FormulaDisplay math={`z = \\frac{x - \\bar{x}}{\\sigma}`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="x" /> = la nota del alumno</p>
              <p><InlineMath math="\bar{x}" /> = la media de la asignatura</p>
              <p><InlineMath math="\sigma" /> = la desviación típica de la asignatura</p>
              <p><InlineMath math="z" /> = cuántas desviaciones típicas está el alumno por encima (+) o por debajo (-) de la media</p>
            </div>
            <div className="bg-white rounded p-2 mt-1">
              <p className="font-semibold">Interpretación del valor z:</p>
              <p>z = 0 → Estás justo en la media</p>
              <p>z &gt; 0 → Estás por encima de la media</p>
              <p>z &lt; 0 → Estás por debajo de la media</p>
              <p className="mt-1 font-semibold">Regla: z mayor = mejor posición relativa</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200 mb-2">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">Matemáticas (nota: 6, media: {mate.media})</p>
            <p className="text-muted-foreground">Primero calculamos la desviación típica:</p>
            <FormulaDisplay math={`\\sigma_{Mat} = \\sqrt{${mate.varianza}} = ${round(mateSigma, 4)}`} />
            <p className="text-muted-foreground">Ahora tipificamos:</p>
            <FormulaDisplay math={`z_{Mat} = \\frac{6 - ${mate.media}}{${round(mateSigma, 4)}} = \\frac{${round(6 - mate.media, 2)}}{${round(mateSigma, 4)}} = ${round(zMate, 4)}`} />
            <p className="text-muted-foreground">
              z = +{round(zMate, 4)} → R.C. está <strong>{round(zMate, 4)} desviaciones típicas por encima</strong> de la media
              de Matemáticas. Su 6 supera la media de {mate.media}.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200 mb-2">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">Estadística (nota: 7, media: {estad.media})</p>
            <p className="text-muted-foreground">Desviación típica:</p>
            <FormulaDisplay math={`\\sigma_{Est} = \\sqrt{${estad.varianza}} = ${round(estadSigma, 4)}`} />
            <p className="text-muted-foreground">Tipificamos:</p>
            <FormulaDisplay math={`z_{Est} = \\frac{7 - ${estad.media}}{${round(estadSigma, 4)}} = \\frac{${round(7 - estad.media, 2)}}{${round(estadSigma, 4)}} = ${round(zEstad, 4)}`} />
            <p className="text-muted-foreground">
              z = +{round(zEstad, 4)} → R.C. está <strong>{round(zEstad, 4)} desviaciones típicas por encima</strong> de la media
              de Estadística. Su 7 supera la media de {estad.media}.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200 mt-3 mb-2">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Comparación final</p>
            <p className="text-muted-foreground">
              <strong>z<sub>Est</sub> = {round(zEstad, 4)} &gt; z<sub>Mat</sub> = {round(zMate, 4)}</strong>
            </p>
            <p className="text-muted-foreground">
              Ambas notas están por encima de sus respectivas medias (ambos z son positivos),
              pero el valor z de Estadística es mayor. Esto significa que el 7 en Estadística
              &quot;destaca más&quot; respecto a sus compañeros que el 6 en Matemáticas.
            </p>
            <p className="text-muted-foreground">
              <strong>Aunque la diferencia entre los z es pequeña</strong>, la posición relativa de R.C.
              es ligeramente mejor en Estadística.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Mejor posición relativa" value={`Estadística (z=${round(zEstad, 4)} > z=${round(zMate, 4)})`} />
      </StepCard>

      {/* ============ PASO 5: Tabla resumen ============ */}
      <StepCard stepNumber={6} title="Tabla resumen comparativa" variant="result">
        <Card className="overflow-hidden mb-3">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                <TableHead className="text-center">Matemáticas</TableHead>
                <TableHead className="text-center">Estadística</TableHead>
                <TableHead className="text-center">Conclusión</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Dispersión (CV)</TableCell>
                <TableCell className="text-center">{mate.cv}%</TableCell>
                <TableCell className="text-center">{estad.cv}%</TableCell>
                <TableCell className="text-center text-xs">Mate más dispersa</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Asimetría (g<sub>f</sub>)</TableCell>
                <TableCell className="text-center">{mate.asimetria}</TableCell>
                <TableCell className="text-center">{estad.asimetria}</TableCell>
                <TableCell className="text-center text-xs">Mate simétrica, Estad. negativa</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Curtosis (g<sub>c</sub>)</TableCell>
                <TableCell className="text-center">{mate.curtosis}</TableCell>
                <TableCell className="text-center">{estad.curtosis}</TableCell>
                <TableCell className="text-center text-xs">Ambas platicúrticas, Mate más</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">z de R.C.</TableCell>
                <TableCell className="text-center">{round(zMate, 4)}</TableCell>
                <TableCell className="text-center">{round(zEstad, 4)}</TableCell>
                <TableCell className="text-center text-xs">Mejor posición en Estad.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
        </Card>
      </StepCard>

      {/* ============ PASO 6: Resumen conceptual ============ */}
      <StepCard stepNumber={7} title="Resumen: ¿qué hemos aprendido?" variant="result">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-xs text-blue-800">CV → ¿Es fiable la media?</p>
              <p className="text-[10px] text-muted-foreground">
                CV &lt; 50% → sí, la media resume bien los datos.
                CV &gt; 50% → no, hay demasiada variabilidad.
                En este ejercicio ambas medias son poco representativas, pero la de Estadística algo más.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-xs text-purple-800">Asimetría → ¿Hacia dónde se inclina?</p>
              <p className="text-[10px] text-muted-foreground">
                g<sub>f</sub> = 0 → simétrica. g<sub>f</sub> &gt; 0 → cola a la derecha (más valores bajos).
                g<sub>f</sub> &lt; 0 → cola a la izquierda (más valores altos).
                En Estad. predominan las notas altas.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-xs text-orange-800">Curtosis → ¿Pico o meseta?</p>
              <p className="text-[10px] text-muted-foreground">
                g<sub>c</sub> = 0 → como la Normal (mesocúrtica). g<sub>c</sub> &gt; 0 → más puntiaguda (leptocúrtica).
                g<sub>c</sub> &lt; 0 → más aplanada (platicúrtica).
                Ambas asignaturas tienen distribuciones aplanadas.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-xs text-emerald-800">Tipificación → ¿Dónde estoy respecto a los demás?</p>
              <p className="text-[10px] text-muted-foreground">
                z &gt; 0 → por encima de la media. z &lt; 0 → por debajo.
                Mayor z = mejor posición.
                R.C. está mejor posicionado en Estadística (z = {round(zEstad, 4)}).
              </p>
            </CardContent>
          </Card>
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
