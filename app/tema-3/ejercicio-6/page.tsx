"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { round } from "@/lib/stats/descriptive";

// Datos iniciales
const n1 = 100;
const mean1 = 5;
const var1 = 15;
const n2 = 20;
const val2 = 5;

// Cálculos
const newN = n1 + n2;
const newMean = (mean1 * n1 + val2 * n2) / newN;
const newVar = (n1 * (var1 + (mean1 - newMean) ** 2) + n2 * (0 + (val2 - newMean) ** 2)) / newN;
const newStd = Math.sqrt(newVar);
const newCV = (newStd / Math.abs(newMean)) * 100;
const oldCV = (Math.sqrt(var1) / Math.abs(mean1)) * 100;

export default function Ejercicio6() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={6}
      title="Efecto de Nuevas Observaciones en la Varianza"
      difficulty="Medio"
      category="Propiedades de la varianza"
      statement={
        <div className="space-y-2">
          <p>Sea una distribución de frecuencias donde n = 100, la media aritmética vale 5 y la varianza vale 15.</p>
          <p>Se incluyen 20 nuevas observaciones, todas con valor 5.</p>
          <p><strong>¿Qué valor tomaría el nuevo coeficiente de variación?</strong></p>
        </div>
      }
      prevUrl="/tema-3/ejercicio-5"
      nextUrl="/tema-3/ejercicio-7"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio nos enseña <strong>cómo cambian las medidas estadísticas al añadir datos</strong>.
          Es un concepto clave porque en el mundo real constantemente se añaden nuevas observaciones.
        </p>
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">La intuición antes de calcular</p>
            <p className="text-muted-foreground">
              Tenemos 100 datos con media = 5 y varianza = 15 (bastante dispersos).
              Añadimos 20 datos nuevos, <strong>todos exactamente iguales al valor 5</strong> (la media).
            </p>
            <p className="text-muted-foreground">
              <strong>¿Qué debería pasar intuitivamente?</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
                <p className="font-semibold text-sm">¿Cambia la media?</p>
                <p className="text-sm text-muted-foreground">
                  Para saberlo, necesitamos la <strong>suma total</strong> de todos los valores.
                  Si 100 datos tienen media 5, su suma es 100 × 5 = 500.
                  Los 20 nuevos valen 5 cada uno, así que suman 20 × 5 = 100.
                </p>
                <p className="text-sm text-muted-foreground">
                  Nueva media = (500 + 100) / 120 = <strong>5</strong>. No cambia porque los nuevos datos
                  valen exactamente la media original.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
                <p className="font-semibold text-sm">¿Cambia la varianza?</p>
                <p className="text-sm text-muted-foreground">
                  La varianza mide cuánto se desvían los datos de la media. Los 20 nuevos datos
                  valen exactamente 5 (la media), así que su desviación es <strong>0</strong>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Al mezclar 100 datos dispersos con 20 datos que no varían nada,
                  la dispersión del conjunto se <strong>reduce</strong>.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-1">
              <strong>Resumen:</strong> la media se mantiene (los nuevos datos coinciden con ella),
              pero la varianza baja (los nuevos datos no aportan dispersión).
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 1: Datos iniciales ============ */}
      <StepCard stepNumber={2} title="Datos que nos dan" variant="explanation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-1">
              <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200">Distribución original</Badge>
              <FormulaDisplay math={`n_1 = 100, \\quad \\bar{x}_1 = 5, \\quad s_1^2 = 15`} />
              <p className="text-muted-foreground">100 observaciones con media 5 y varianza 15.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-1">
              <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200">Nuevos datos</Badge>
              <FormulaDisplay math={`n_2 = 20, \\quad \\text{todos valen } 5`} />
              <p className="text-muted-foreground">20 observaciones nuevas, todas idénticas (valor 5). Su media es 5 y su varianza interna es 0 (no varían entre sí).</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 2: Nueva media ============ */}
      <StepCard stepNumber={3} title="Paso 1: ¿Cuál es la nueva media?" variant="calculation">
        <Card className="bg-gray-50 dark:bg-gray-800 border mb-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">Fórmula de la media combinada</p>
            <p className="text-muted-foreground">
              Para combinar dos grupos, usamos la media ponderada (cada grupo &quot;pesa&quot; según su tamaño):
            </p>
            <FormulaDisplay math={`\\bar{x}_{new} = \\frac{n_1 \\cdot \\bar{x}_1 + n_2 \\cdot \\bar{x}_2}{n_1 + n_2}`} />
          </CardContent>
        </Card>

        <FormulaDisplay math={`\\bar{x}_{new} = \\frac{100 \\cdot 5 + 20 \\cdot 5}{120} = \\frac{500 + 100}{120} = \\frac{600}{120} = 5`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>¿Tiene sentido?</strong> Sí. Como los nuevos datos valen exactamente la media (5),
            añadirlos no puede cambiar el promedio. Es como si la media de un grupo de 5 personas es 170 cm
            y añades 2 personas que miden exactamente 170 cm: la media sigue siendo 170.</p>
          </CardContent>
        </Card>

        <ResultCard label="Nueva media" value="5 (no cambia)" />
      </StepCard>

      {/* ============ PASO 3: Nueva varianza ============ */}
      <StepCard stepNumber={4} title="Paso 2: ¿Cuál es la nueva varianza?" variant="calculation">
        {/* --- ¿Por qué no podemos simplemente promediar? --- */}
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Antes de calcular: ¿cómo se combinan las varianzas?</p>
            <p className="text-muted-foreground">
              No basta con promediar las varianzas de cada grupo. La fórmula de la varianza combinada
              tiene en cuenta <strong>dos cosas</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p className="font-semibold text-sm">1. Variación dentro de cada grupo</p>
                <p className="text-sm text-muted-foreground">
                  Cuánto varían los datos <strong>dentro</strong> de su propio grupo.
                  Grupo 1: varianza = 15 (dispersos). Grupo 2: varianza = 0 (todos iguales).
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p className="font-semibold text-sm">2. Variación entre los grupos</p>
                <p className="text-sm text-muted-foreground">
                  Cuánto se alejan las medias de cada grupo <strong>entre sí</strong>.
                  Aquí ambas medias son 5, así que esta parte es 0.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- La fórmula --- */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">La fórmula general</p>
            <FormulaDisplay math={`s_{new}^2 = \\frac{n_1 \\cdot [s_1^2 + (\\bar{x}_1 - \\bar{x}_{new})^2] + n_2 \\cdot [s_2^2 + (\\bar{x}_2 - \\bar{x}_{new})^2]}{n_1 + n_2}`} />
            <div className="bg-white dark:bg-gray-900 rounded p-2 text-sm space-y-2">
              <div>
                <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">¿Qué hace cada parte de la fórmula?</p>
                <p><InlineMath math="s_k^2" /> = varianza interna del grupo k (cuánto varían los datos <strong>dentro</strong> de ese grupo)</p>
                <p><InlineMath math="(\bar{x}_k - \bar{x}_{new})^2" /> = distancia entre la media del grupo k y la media global (cuánto se alejan los grupos <strong>entre sí</strong>)</p>
              </div>
              <hr className="border-border" />
              <div>
                <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">Valores en nuestro ejercicio:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  <p><InlineMath math="n_1" /> = datos del grupo 1 → <strong>100</strong></p>
                  <p><InlineMath math="n_2" /> = datos del grupo 2 → <strong>20</strong></p>
                  <p><InlineMath math="s_1^2" /> = varianza del grupo 1 → <strong>15</strong></p>
                  <p><InlineMath math="s_2^2" /> = varianza del grupo 2 → <strong>0</strong> (todos iguales)</p>
                  <p><InlineMath math="\bar{x}_1" /> = media del grupo 1 → <strong>5</strong></p>
                  <p><InlineMath math="\bar{x}_2" /> = media del grupo 2 → <strong>5</strong></p>
                  <p className="sm:col-span-2"><InlineMath math="\bar{x}_{new}" /> = media global (la que calculamos en el paso anterior) → <strong>5</strong> (coincide con las anteriores, pero había que comprobarlo)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- Aplicación paso a paso --- */}
        <div className="space-y-3">
          <p className="text-sm font-semibold">Aplicamos paso a paso:</p>

          {/* Sub-paso A */}
          <Card className="bg-gray-50 dark:bg-gray-800 border">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold">A) ¿Cuánto aporta el grupo 1 (los 100 datos originales)?</p>
              <p className="text-muted-foreground">
                Su varianza interna es 15, y su media (5) coincide con la media global (5),
                así que la distancia entre medias es 0:
              </p>
              <FormulaDisplay math={`100 \\cdot [15 + (5 - 5)^2] = 100 \\cdot [15 + 0] = 1500`} />
            </CardContent>
          </Card>

          {/* Sub-paso B */}
          <Card className="bg-gray-50 dark:bg-gray-800 border">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold">B) ¿Cuánto aporta el grupo 2 (los 20 datos nuevos)?</p>
              <p className="text-muted-foreground">
                Todos valen 5, así que su varianza interna es 0. Su media (5) también coincide
                con la global (5), así que la distancia entre medias también es 0:
              </p>
              <FormulaDisplay math={`20 \\cdot [0 + (5 - 5)^2] = 20 \\cdot [0 + 0] = 0`} />
            </CardContent>
          </Card>

          {/* Sub-paso C */}
          <Card className="bg-gray-50 dark:bg-gray-800 border">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold">C) Juntamos todo y dividimos entre el total de datos:</p>
              <FormulaDisplay math={`s_{new}^2 = \\frac{1500 + 0}{120} = ${round(newVar, 2)}`} />
            </CardContent>
          </Card>
        </div>

        {/* --- Interpretación --- */}
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">¿Tiene sentido el resultado?</p>
            <p className="text-muted-foreground">
              La varianza bajó de 15 a {round(newVar, 2)}. Los 20 datos nuevos aportan <strong>0 variación</strong> (todos
              son idénticos), así que al mezclarlos con los 100 datos dispersos, la dispersión total se reduce.
            </p>
            <p className="text-muted-foreground">
              <strong>Atajo:</strong> como las medias de ambos grupos son iguales, la fórmula se simplifica a
              solo repartir la variación del grupo 1 entre todos los datos:
            </p>
            <FormulaDisplay math={`s_{new}^2 = \\frac{n_1 \\cdot s_1^2}{n_1 + n_2} = \\frac{100 \\cdot 15}{120} = 12.5`} />
          </CardContent>
        </Card>

        <ResultCard label="Nueva varianza" value={`${round(newVar, 2)}`} />
      </StepCard>

      {/* ============ PASO 4: Nuevo CV ============ */}
      <StepCard stepNumber={5} title="Paso 3: Nuevo coeficiente de variación" variant="result">
        <Card className="bg-gray-50 dark:bg-gray-800 border mb-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">Recordatorio: CV = σ / |media| × 100</p>
            <p className="text-muted-foreground">
              Mide qué porcentaje de la media representa la desviación. Menor CV = media más representativa.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`s_{new} = \\sqrt{${round(newVar, 2)}} = ${round(newStd, 4)}`} />
        <FormulaDisplay math={`CV_{new} = \\frac{${round(newStd, 4)}}{5} \\times 100 = ${round(newCV, 2)}\\%`} />

        <ResultCard label="Nuevo CV" value={`${round(newCV, 2)}%`} />

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Comparación antes y después</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2">
                  <p className="font-semibold text-sm">Antes (n=100)</p>
                  <p className="text-sm">Media = 5 | Varianza = 15 | σ = {round(Math.sqrt(15), 4)}</p>
                  <p className="text-sm">CV = {round(oldCV, 2)}%</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2">
                  <p className="font-semibold text-sm">Después (n=120)</p>
                  <p className="text-sm">Media = 5 | Varianza = {round(newVar, 2)} | σ = {round(newStd, 4)}</p>
                  <p className="text-sm">CV = {round(newCV, 2)}%</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground">
              <strong>Conclusión:</strong> Al añadir observaciones iguales a la media, la media no cambia pero la varianza y el CV disminuyen.
              El CV pasó de {round(oldCV, 2)}% a {round(newCV, 2)}%, haciendo que la media sea más representativa.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Lección clave</p>
            <p className="text-muted-foreground">
              Añadir datos que no varían (todos iguales a la media) reduce la dispersión del conjunto.
              <strong> No confundir con añadir datos diferentes:</strong> si los 20 datos fueran valores dispersos
              (como 0, 10, 0, 10...), la varianza podría incluso aumentar.
            </p>
          </CardContent>
        </Card>
      </StepCard>
    </ExerciseLayout>
  );
}
