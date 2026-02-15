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
const mate = { media: 4.68, varianza: 8.70, curtosis: -1.19, asimetria: 0.24 };
const estad = { media: 5.67, varianza: 4.19, curtosis: 0.04, asimetria: -0.43 };
const mateSigma = Math.sqrt(mate.varianza);
const estadSigma = Math.sqrt(estad.varianza);
const mateCV = (mateSigma / mate.media) * 100;
const estadCV = (estadSigma / estad.media) * 100;

// Deciles
const mateDeciles = [1.07, 2.03, 2.62, 3.08, 4.02, 5.43, 6.55, 8.10, 8.77];
const estadDeciles = [3.25, 3.96, 4.47, 5.11, 5.96, 6.30, 6.70, 7.70, 8.20];

// Tipificación
const zMate = (5 - mate.media) / mateSigma;
const zEstad = (5 - estad.media) / estadSigma;

export default function Ejercicio5() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={5}
      title="Comparación de Calificaciones"
      difficulty="Alto"
      category="Análisis comparativo, CV, asimetría, curtosis"
      statement={
        <div className="space-y-2">
          <p>Se tienen las siguientes medidas de calificaciones:</p>
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
                <TableRow><TableCell>Curtosis</TableCell><TableCell className="text-center">{mate.curtosis}</TableCell><TableCell className="text-center">{estad.curtosis}</TableCell></TableRow>
                <TableRow><TableCell>Asimetría</TableCell><TableCell className="text-center">{mate.asimetria}</TableCell><TableCell className="text-center">{estad.asimetria}</TableCell></TableRow>
              </TableBody>
            </Table>
            </div>
          </Card>
          <p>Un alumno obtiene un 5 en ambas. Se pide:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) ¿Son representativas las medias? ¿Cuál goza de mayor representatividad?</li>
            <li>b) Si obtiene 5 en ambas, ¿en cuál está mejor posicionado?</li>
            <li>c) Nota de corte con el 30% de notas más altas en cada asignatura</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-4"
      nextUrl="/tema-3/ejercicio-6"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio combina <strong>tres conceptos clave</strong> que nos permiten comparar distribuciones diferentes
          (como notas de dos asignaturas distintas):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-sm">Representatividad</Badge>
              <p className="text-sm text-muted-foreground">&quot;¿Puedo fiarme de la media?&quot;</p>
              <p className="text-sm">→ Coeficiente de Variación (CV)</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 text-sm">Posición relativa</Badge>
              <p className="text-sm text-muted-foreground">&quot;¿Un 5 es bueno o malo en cada asignatura?&quot;</p>
              <p className="text-sm">→ Tipificación (valor z)</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 dark:bg-violet-800/40 text-violet-800 dark:text-violet-200 text-sm">Nota de corte</Badge>
              <p className="text-sm text-muted-foreground">&quot;¿A partir de qué nota estás en el top 30%?&quot;</p>
              <p className="text-sm">→ Deciles / Percentiles</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 1: Representatividad ============ */}
      <StepCard stepNumber={2} title="a) ¿Son representativas las medias?" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Qué significa &quot;representativa&quot;?</p>
            <p className="text-muted-foreground">
              Decimos que la media es representativa cuando los datos no varían demasiado respecto a ella.
              Si la media de Mate es 4.68 pero las notas van de 0 a 10 con mucha dispersión, esa media
              no nos dice mucho. En cambio, si casi todos sacaron entre 4 y 6, la media sí es un buen resumen.
            </p>
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Cómo lo medimos? Con el CV</p>
            <FormulaDisplay math={`CV = \\frac{\\sigma}{|\\bar{x}|} \\times 100`} />
            <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
              <p><strong>Primero calculamos σ</strong> (desviación típica) a partir de la varianza que nos dan:</p>
              <p><InlineMath math="\sigma = \sqrt{s^2}" /> → es la raíz cuadrada de la varianza</p>
              <p><strong>Luego dividimos entre la media</strong> y multiplicamos por 100 para obtener el porcentaje.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded p-2 mt-1">
              <p className="font-semibold">Regla: CV &lt; 50% → la media SÍ es representativa</p>
              <p className="text-sm text-muted-foreground">A menor CV, mayor representatividad (los datos son más homogéneos).</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">Matemáticas:</p>
            <FormulaDisplay math={`\\sigma_{Mat} = \\sqrt{${mate.varianza}} = ${round(mateSigma, 4)}`} />
            <FormulaDisplay math={`CV_{Mat} = \\frac{${round(mateSigma, 4)}}{${mate.media}} \\times 100 = ${round(mateCV, 2)}\\%`} />
            <p className="text-muted-foreground">CV = {round(mateCV, 2)}% &gt; 50% → <strong>la media NO es muy representativa</strong>. Hay mucha dispersión en las notas.</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mb-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">Estadística:</p>
            <FormulaDisplay math={`\\sigma_{Est} = \\sqrt{${estad.varianza}} = ${round(estadSigma, 4)}`} />
            <FormulaDisplay math={`CV_{Est} = \\frac{${round(estadSigma, 4)}}{${estad.media}} \\times 100 = ${round(estadCV, 2)}\\%`} />
            <p className="text-muted-foreground">CV = {round(estadCV, 2)}% &lt; 50% → <strong>la media SÍ es representativa</strong>. Las notas son más homogéneas.</p>
          </CardContent>
        </Card>

        <ResultCard label="Mayor representatividad" value={`Estadística (CV=${round(estadCV, 2)}% < ${round(mateCV, 2)}%)`} />
      </StepCard>

      {/* ============ PASO 2: Tipificación ============ */}
      <StepCard stepNumber={3} title="b) ¿En cuál está mejor posicionado con un 5?" variant="calculation">
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">El problema: ¿cómo comparar un 5 en dos asignaturas diferentes?</p>
            <p className="text-muted-foreground">
              Un 5 en Matemáticas (donde la media es 4.68) no es lo mismo que un 5 en Estadística
              (donde la media es 5.67). En una estás por encima de la media y en otra por debajo.
              Pero, ¿cuánto por encima o por debajo? Para eso necesitamos <strong>tipificar</strong>.
            </p>
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">¿Qué es la tipificación (valor z)?</p>
            <FormulaDisplay math={`z = \\frac{x - \\bar{x}}{\\sigma}`} />
            <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
              <p><InlineMath math="x" /> = la nota del alumno (5 en ambos casos)</p>
              <p><InlineMath math="\bar{x}" /> = la media de la asignatura</p>
              <p><InlineMath math="\sigma" /> = la desviación típica de la asignatura</p>
              <p><InlineMath math="z" /> = cuántas desviaciones típicas está el alumno por encima (+) o por debajo (-) de la media</p>
            </div>
            <p className="text-muted-foreground">
              <strong>En palabras:</strong> z convierte la nota a una &quot;escala universal&quot;.
              Un z = 0 significa que estás justo en la media. Un z = 1 significa que estás
              1 desviación típica por encima. Un z = -1, una desviación por debajo.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded p-2 mt-1">
              <p className="font-semibold">Regla: z mayor = mejor posición relativa</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">Matemáticas (nota 5, media 4.68):</p>
            <FormulaDisplay math={`z_{Mat} = \\frac{5 - ${mate.media}}{${round(mateSigma, 4)}} = \\frac{${round(5 - mate.media, 2)}}{${round(mateSigma, 4)}} = ${round(zMate, 4)}`} />
            <p className="text-muted-foreground">z = +{round(zMate, 4)} → está <strong>por encima</strong> de la media (el 5 supera al 4.68).</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mb-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">Estadística (nota 5, media 5.67):</p>
            <FormulaDisplay math={`z_{Est} = \\frac{5 - ${estad.media}}{${round(estadSigma, 4)}} = \\frac{${round(5 - estad.media, 2)}}{${round(estadSigma, 4)}} = ${round(zEstad, 4)}`} />
            <p className="text-muted-foreground">z = {round(zEstad, 4)} → está <strong>por debajo</strong> de la media (el 5 no llega al 5.67).</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2 mb-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Comparación:</strong> z_Mat = {round(zMate, 4)} &gt; z_Est = {round(zEstad, 4)}.
            En Matemáticas, el alumno está por encima de la media. En Estadística, por debajo.
            Por tanto, <strong>está mejor posicionado en Matemáticas</strong>.</p>
          </CardContent>
        </Card>

        <ResultCard
          label="Mejor posicionado en"
          value={`Matemáticas (z=${round(zMate, 4)} > z=${round(zEstad, 4)})`}
        />
      </StepCard>

      {/* ============ PASO 3: Nota de corte ============ */}
      <StepCard stepNumber={4} title="c) Nota de corte (30% más altas)" variant="calculation">
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-violet-800 dark:text-violet-200">Traducción de la pregunta</p>
            <p className="text-muted-foreground">
              &quot;¿A partir de qué nota estás en el 30% de alumnos con mejor nota?&quot;
            </p>
            <p className="text-muted-foreground">
              Si el 30% son las más altas, significa que el 70% son más bajas.
              El valor que separa el 70% inferior del 30% superior es el <strong>percentil 70</strong>,
              que equivale al <strong>decil 7 (D₇)</strong>.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded p-2">
              <p><strong>Recordatorio:</strong> Los deciles dividen los datos en 10 partes iguales (10% cada una).
              D₇ deja el 70% por debajo y el 30% por encima. Como los deciles nos los dan en el enunciado, solo hay que mirarlos.</p>
            </div>
          </CardContent>
        </Card>

        <FormulaDisplay math={`D_7^{Mat} = ${mateDeciles[6]} \\quad \\text{(nota de corte para el top 30% en Mate)}`} />
        <FormulaDisplay math={`D_7^{Est} = ${estadDeciles[6]} \\quad \\text{(nota de corte para el top 30% en Estad.)}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm space-y-1">
            <p><strong>Interpretación Mate:</strong> Para estar en el top 30% en Matemáticas, necesitas al menos un {mateDeciles[6]}. El 70% de los alumnos sacó menos de eso.</p>
            <p><strong>Interpretación Estad.:</strong> Para estar en el top 30% en Estadística, necesitas al menos un {estadDeciles[6]}. La nota de corte es similar.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <ResultCard label="Nota de corte Matemáticas" value={`${mateDeciles[6]}`} />
          <ResultCard label="Nota de corte Estadística" value={`${estadDeciles[6]}`} />
        </div>
      </StepCard>

      {/* ============ PASO 4: Resumen ============ */}
      <StepCard stepNumber={5} title="Resumen: ¿qué hemos aprendido?" variant="result">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-blue-800 dark:text-blue-200">CV → ¿Es fiable la media?</p>
              <p className="text-sm text-muted-foreground">CV &lt; 50% → sí. Cuanto menor sea el CV, más representativa es la media.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-emerald-800 dark:text-emerald-200">z → ¿Dónde estoy respecto a los demás?</p>
              <p className="text-sm text-muted-foreground">z &gt; 0 → por encima de la media. z &lt; 0 → por debajo. Mayor z = mejor posición.</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-violet-800 dark:text-violet-200">Deciles → Notas de corte</p>
              <p className="text-sm text-muted-foreground">D₇ = nota mínima para estar en el top 30%. D₉ = top 10%. Etc.</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
