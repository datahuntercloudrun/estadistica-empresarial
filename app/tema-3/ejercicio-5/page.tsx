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

      {/* ============ PASO 1b: Varianza, Asimetría y Curtosis ============ */}
      <StepCard stepNumber={2} title="Recordatorio: Varianza, Asimetría y Curtosis" variant="explanation">
        {/* Varianza */}
        <Card className="bg-gray-50 dark:bg-gray-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm">Varianza (σ²)</Badge>
              <p className="font-semibold">¿Cuánto se dispersan los datos?</p>
            </div>
            <p className="text-muted-foreground">
              La varianza mide la <strong>dispersión</strong> de los datos respecto a la media.
              Es el promedio de las desviaciones al cuadrado: si los datos están lejos de la media, la varianza es grande; si están cerca, es pequeña.
            </p>
            <FormulaDisplay math={`\\sigma^2 = \\frac{\\sum (x_i - \\bar{x})^2 \\cdot n_i}{n}`} />
            <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
              <p className="text-muted-foreground"><strong>σ (desviación típica)</strong> = √σ² → está en las mismas unidades que los datos (puntos), por eso es más intuitiva para interpretar.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p><strong>Mate:</strong> σ² = {mate.varianza} → σ = {round(mateSigma, 2)}</p>
                <p className="text-xs text-muted-foreground">Las notas varían en promedio ±{round(mateSigma, 2)} puntos respecto a la media de {mate.media}.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p><strong>Estad:</strong> σ² = {estad.varianza} → σ = {round(estadSigma, 2)}</p>
                <p className="text-xs text-muted-foreground">Las notas varían en promedio ±{round(estadSigma, 2)} puntos respecto a la media de {estad.media}.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Mate tiene mayor varianza ({mate.varianza} vs {estad.varianza}): las notas están más dispersas. En Estadística los alumnos sacan notas más parecidas entre sí.
            </p>
          </CardContent>
        </Card>

        {/* Asimetría */}
        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-rose-200 dark:bg-rose-800/40 text-rose-800 dark:text-rose-200 text-sm">Asimetría (g₁)</Badge>
              <p className="font-semibold">¿Hacia dónde se &quot;estiran&quot; los datos?</p>
            </div>
            <p className="text-muted-foreground">
              Imagina un histograma de notas: el eje horizontal va de notas bajas (izquierda) a notas altas (derecha).
              Cada barra muestra <strong>cuántos alumnos</strong> sacaron esa nota. La &quot;cola&quot; es el lado donde hay <strong>pocas personas</strong> (barras pequeñas) con valores extremos.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded p-2 mb-2">
              <p className="text-xs text-muted-foreground"><strong>Clave:</strong> Barra alta = muchos alumnos con esa nota. Barra baja = pocos alumnos. La cola apunta hacia donde hay pocos alumnos con notas extremas.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Asimetría negativa */}
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <div className="flex items-end gap-0.5 justify-center h-12">
                  {[1, 1, 2, 3, 5, 7, 8, 9, 8, 6].map((h, i) => (
                    <div key={i} className={`w-2 rounded-t-sm ${i < 4 ? "bg-blue-300/60 dark:bg-blue-400/40" : "bg-blue-500 dark:bg-blue-400"}`} style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
                  <span>Notas bajas</span>
                  <span>Notas altas</span>
                </div>
                <div className="text-center">
                  <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200">g₁ &lt; 0</Badge>
                  <p className="text-xs font-semibold mt-1">Asimetría negativa</p>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  La <strong>mayoría sacó notas altas</strong> (barras grandes a la derecha).
                  Unos pocos sacaron notas muy bajas (barras claras a la izquierda = la &quot;cola&quot;).
                </p>
                <p className="text-[10px] text-muted-foreground text-left italic">Ejemplo: examen fácil donde casi todos aprobaron, pero algunos suspendieron con notas muy bajas.</p>
              </div>
              {/* Simétrica */}
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2 ring-2 ring-emerald-300 dark:ring-emerald-700">
                <div className="flex items-end gap-0.5 justify-center h-12">
                  {[2, 3, 5, 7, 9, 9, 7, 5, 3, 2].map((h, i) => (
                    <div key={i} className="w-2 bg-emerald-400 dark:bg-emerald-500 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
                  <span>Notas bajas</span>
                  <span>Notas altas</span>
                </div>
                <div className="text-center">
                  <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200">g₁ ≈ 0</Badge>
                  <p className="text-xs font-semibold mt-1">Simétrica</p>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  <strong>Equilibrada:</strong> tantos alumnos con notas bajas como con notas altas, y la mayoría en el centro.
                </p>
                <p className="text-[10px] text-muted-foreground text-left italic">Ejemplo: examen donde las notas se reparten de forma pareja alrededor de la media.</p>
              </div>
              {/* Asimetría positiva */}
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <div className="flex items-end gap-0.5 justify-center h-12">
                  {[6, 8, 9, 8, 7, 5, 3, 2, 1, 1].map((h, i) => (
                    <div key={i} className={`w-2 rounded-t-sm ${i > 5 ? "bg-amber-300/60 dark:bg-amber-400/40" : "bg-amber-500 dark:bg-amber-400"}`} style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
                  <span>Notas bajas</span>
                  <span>Notas altas</span>
                </div>
                <div className="text-center">
                  <Badge className="bg-amber-200 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200">g₁ &gt; 0</Badge>
                  <p className="text-xs font-semibold mt-1">Asimetría positiva</p>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  La <strong>mayoría sacó notas bajas</strong> (barras grandes a la izquierda).
                  Unos pocos sacaron notas muy altas (barras claras a la derecha = la &quot;cola&quot;).
                </p>
                <p className="text-[10px] text-muted-foreground text-left italic">Ejemplo: examen muy difícil donde casi todos suspendieron, pero algunos sacaron notazas.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p><strong>Mate:</strong> g₁ = {mate.asimetria} → <strong>ligeramente positiva</strong></p>
                <p className="text-xs text-muted-foreground">La mayoría sacó notas bajas-medias, pero unos pocos sacaron notas bastante altas que &quot;estiran&quot; la cola hacia la derecha.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p><strong>Estad:</strong> g₁ = {estad.asimetria} → <strong>ligeramente negativa</strong></p>
                <p className="text-xs text-muted-foreground">La mayoría sacó notas medias-altas, pero unos pocos sacaron notas muy bajas que &quot;estiran&quot; la cola hacia la izquierda.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Curtosis */}
        <Card className="bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800">
          <CardContent className="p-3 text-sm space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-200 dark:bg-indigo-800/40 text-indigo-800 dark:text-indigo-200 text-sm">Curtosis (g₂)</Badge>
              <p className="font-semibold">¿Es la distribución &quot;puntiaguda&quot; o &quot;aplanada&quot;?</p>
            </div>
            <p className="text-muted-foreground">
              La curtosis mide si los datos se <strong>concentran mucho en el centro</strong> (pico alto) o se <strong>reparten más uniformemente</strong> (pico bajo).
              Se compara siempre con la campana de Gauss (distribución normal), que es la referencia.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded p-2 mb-2">
              <p className="text-xs text-muted-foreground"><strong>Clave:</strong> Fíjate en la &quot;forma&quot; del histograma: ¿las barras centrales son mucho más altas que las de los lados? → leptocúrtica. ¿Las barras son todas parecidas en altura? → platicúrtica.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Platicúrtica */}
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <div className="flex items-end gap-0.5 justify-center h-12">
                  {[4, 5, 6, 7, 7, 7, 7, 6, 5, 4].map((h, i) => (
                    <div key={i} className="w-2 bg-blue-400 dark:bg-blue-500 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
                  <span>Notas bajas</span>
                  <span>Notas altas</span>
                </div>
                <div className="text-center">
                  <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200">g₂ &lt; 0</Badge>
                  <p className="text-xs font-semibold mt-1">Platicúrtica</p>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Las barras son <strong>todas parecidas en altura</strong>. No hay un pico claro: las notas se reparten de forma bastante uniforme.
                </p>
                <p className="text-[10px] text-muted-foreground text-left italic">Ejemplo: examen donde hay tantos suspensos como aprobados y sobresalientes, sin un valor dominante.</p>
              </div>
              {/* Mesocúrtica */}
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2 ring-2 ring-emerald-300 dark:ring-emerald-700">
                <div className="flex items-end gap-0.5 justify-center h-12">
                  {[1, 2, 4, 7, 10, 10, 7, 4, 2, 1].map((h, i) => (
                    <div key={i} className="w-2 bg-emerald-400 dark:bg-emerald-500 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
                  <span>Notas bajas</span>
                  <span>Notas altas</span>
                </div>
                <div className="text-center">
                  <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200">g₂ ≈ 0</Badge>
                  <p className="text-xs font-semibold mt-1">Mesocúrtica (normal)</p>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Forma de <strong>campana clásica</strong>: la mayoría de notas están en el centro, y hay cada vez menos hacia los extremos, de forma equilibrada.
                </p>
                <p className="text-[10px] text-muted-foreground text-left italic">Es la referencia (g₂ = 0). La campana de Gauss tiene exactamente esta forma.</p>
              </div>
              {/* Leptocúrtica */}
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <div className="flex items-end gap-0.5 justify-center h-12">
                  {[1, 1, 2, 4, 10, 10, 4, 2, 1, 1].map((h, i) => (
                    <div key={i} className={`w-2 rounded-t-sm ${(i < 3 || i > 6) ? "bg-amber-300/60 dark:bg-amber-400/40" : "bg-amber-500 dark:bg-amber-400"}`} style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
                  <span>Notas bajas</span>
                  <span>Notas altas</span>
                </div>
                <div className="text-center">
                  <Badge className="bg-amber-200 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200">g₂ &gt; 0</Badge>
                  <p className="text-xs font-semibold mt-1">Leptocúrtica</p>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Pico <strong>muy pronunciado</strong> en el centro: casi todos sacaron notas parecidas. Pero las barras claras de los extremos indican que también hay algunos valores muy alejados (&quot;colas pesadas&quot;).
                </p>
                <p className="text-[10px] text-muted-foreground text-left italic">Ejemplo: la mayoría sacó 5-6, pero unos pocos sacaron 0 o 10.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p><strong>Mate:</strong> g₂ = {mate.curtosis} → <strong>platicúrtica</strong></p>
                <p className="text-xs text-muted-foreground">Las notas están bastante repartidas (barras parecidas). No hay un rango de notas que domine claramente sobre los demás.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p><strong>Estad:</strong> g₂ = {estad.curtosis} → <strong>mesocúrtica (≈ normal)</strong></p>
                <p className="text-xs text-muted-foreground">Las notas se distribuyen en forma de campana: la mayoría cerca de la media ({estad.media}) y menos hacia los extremos.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Representación combinada real */}
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Entonces, ¿cómo se ven las distribuciones de este ejercicio?</p>
            <p className="text-muted-foreground">
              Combinando la asimetría y la curtosis de cada asignatura, así es <strong>aproximadamente</strong> como se distribuyen las notas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Matemáticas: g1=0.24 (leve +), g2=-1.19 (platicúrtica) */}
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <p className="text-xs font-bold text-center text-blue-800 dark:text-blue-200">Matemáticas</p>
                <div className="flex items-end gap-0.5 justify-center h-14">
                  {[5, 6, 7, 7, 7, 7, 6, 5, 4, 3].map((h, i) => (
                    <div key={i} className={`w-2.5 rounded-t-sm ${i > 7 ? "bg-blue-300/60 dark:bg-blue-400/40" : "bg-blue-500 dark:bg-blue-400"}`} style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
                  <span>0</span>
                  <span>media = {mate.media}</span>
                  <span>10</span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge className="bg-amber-200 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200 text-[10px]">g₁={mate.asimetria} (asim. +)</Badge>
                  <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-[10px]">g₂={mate.curtosis} (platic.)</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Forma <strong>aplanada</strong> (barras parecidas) con una ligera cola hacia notas altas. Hay de todo: suspensos, aprobados y notazas. Las notas están muy repartidas.
                </p>
              </div>
              {/* Estadística: g1=-0.43 (leve -), g2=0.04 (mesocúrtica) */}
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <p className="text-xs font-bold text-center text-emerald-800 dark:text-emerald-200">Estadística</p>
                <div className="flex items-end gap-0.5 justify-center h-14">
                  {[2, 3, 5, 7, 8, 9, 9, 8, 6, 4].map((h, i) => (
                    <div key={i} className={`w-2.5 rounded-t-sm ${i < 2 ? "bg-emerald-300/60 dark:bg-emerald-400/40" : "bg-emerald-500 dark:bg-emerald-400"}`} style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
                  <span>0</span>
                  <span>media = {estad.media}</span>
                  <span>10</span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-[10px]">g₁={estad.asimetria} (asim. -)</Badge>
                  <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 text-[10px]">g₂={estad.curtosis} (mesoc.)</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Forma de <strong>campana</strong> desplazada hacia notas altas, con una pequeña cola de notas bajas. La mayoría sacó entre 5 y 8, y pocos suspendieron con notas muy bajas.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded p-2 mt-1">
              <p className="text-xs text-muted-foreground"><strong>Comparación visual:</strong> En Matemáticas las barras son todas parecidas (aplanada, g₂ negativo) → notas repartidas, difícil predecir la nota de un alumno. En Estadística hay una campana clara (g₂ ≈ 0) centrada en notas medias-altas → la mayoría sacó notas parecidas, más predecible.</p>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Representatividad ============ */}
      <StepCard stepNumber={3} title="a) ¿Son representativas las medias?" variant="calculation">
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

      {/* ============ PASO 3: Tipificación ============ */}
      <StepCard stepNumber={4} title="b) ¿En cuál está mejor posicionado con un 5?" variant="calculation">
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

      {/* ============ PASO 4: Nota de corte ============ */}
      <StepCard stepNumber={5} title="c) Nota de corte (30% más altas)" variant="calculation">
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

        <FormulaDisplay math={`D_7^{Mat} = ${mateDeciles[6]} \\quad \\text{(nota de corte para el top 30\\% en Mate)}`} />
        <FormulaDisplay math={`D_7^{Est} = ${estadDeciles[6]} \\quad \\text{(nota de corte para el top 30\\% en Estad.)}`} />

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

      {/* ============ PASO 5: Resumen ============ */}
      <StepCard stepNumber={6} title="Resumen: ¿qué hemos aprendido?" variant="result">
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
