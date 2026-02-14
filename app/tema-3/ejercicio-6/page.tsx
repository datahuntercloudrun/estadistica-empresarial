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
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">La intuición antes de calcular</p>
            <p className="text-muted-foreground">
              Tenemos 100 datos con media = 5 y varianza = 15 (bastante dispersos).
              Añadimos 20 datos nuevos, <strong>todos exactamente iguales al valor 5</strong> (la media).
            </p>
            <p className="text-muted-foreground">
              <strong>¿Qué debería pasar intuitivamente?</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-xs">¿Cambia la media?</p>
                <p className="text-[10px] text-muted-foreground">
                  Los nuevos datos valen 5, que es exactamente la media original.
                  Añadir datos iguales a la media <strong>no cambia la media</strong>.
                </p>
              </div>
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-xs">¿Cambia la varianza?</p>
                <p className="text-[10px] text-muted-foreground">
                  Los nuevos datos no se desvían nada de la media (son exactamente la media).
                  Al mezclarlos con datos que sí varían, la dispersión total debería <strong>disminuir</strong>.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-1">
              Es como añadir agua a un café: el café (dispersión) se diluye pero no desaparece.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 1: Datos iniciales ============ */}
      <StepCard stepNumber={2} title="Datos que nos dan" variant="explanation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 text-xs space-y-1">
              <Badge className="bg-blue-200 text-blue-800">Distribución original</Badge>
              <FormulaDisplay math={`n_1 = 100, \\quad \\bar{x}_1 = 5, \\quad s_1^2 = 15`} />
              <p className="text-muted-foreground">100 observaciones con media 5 y varianza 15.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 text-xs space-y-1">
              <Badge className="bg-emerald-200 text-emerald-800">Nuevos datos</Badge>
              <FormulaDisplay math={`n_2 = 20, \\quad \\text{todos valen } 5`} />
              <p className="text-muted-foreground">20 observaciones nuevas, todas idénticas (valor 5). Su media es 5 y su varianza interna es 0 (no varían entre sí).</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 2: Nueva media ============ */}
      <StepCard stepNumber={3} title="Paso 1: ¿Cuál es la nueva media?" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">Fórmula de la media combinada</p>
            <p className="text-muted-foreground">
              Para combinar dos grupos, usamos la media ponderada (cada grupo &quot;pesa&quot; según su tamaño):
            </p>
            <FormulaDisplay math={`\\bar{x}_{new} = \\frac{n_1 \\cdot \\bar{x}_1 + n_2 \\cdot \\bar{x}_2}{n_1 + n_2}`} />
          </CardContent>
        </Card>

        <FormulaDisplay math={`\\bar{x}_{new} = \\frac{100 \\cdot 5 + 20 \\cdot 5}{120} = \\frac{500 + 100}{120} = \\frac{600}{120} = 5`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>¿Tiene sentido?</strong> Sí. Como los nuevos datos valen exactamente la media (5),
            añadirlos no puede cambiar el promedio. Es como si la media de un grupo de 5 personas es 170 cm
            y añades 2 personas que miden exactamente 170 cm: la media sigue siendo 170.</p>
          </CardContent>
        </Card>

        <ResultCard label="Nueva media" value="5 (no cambia)" />
      </StepCard>

      {/* ============ PASO 3: Nueva varianza ============ */}
      <StepCard stepNumber={4} title="Paso 2: ¿Cuál es la nueva varianza?" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">Fórmula de la varianza combinada - desglosada</p>
            <p className="text-muted-foreground">
              Para combinar las varianzas de dos grupos, no basta con promediar las varianzas.
              Hay que tener en cuenta <strong>dos fuentes de variación</strong>:
            </p>
            <FormulaDisplay math={`s_{new}^2 = \\frac{n_1 \\cdot [s_1^2 + (\\bar{x}_1 - \\bar{x}_{new})^2] + n_2 \\cdot [s_2^2 + (\\bar{x}_2 - \\bar{x}_{new})^2]}{n_1 + n_2}`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="s_k^2" /> = varianza interna del grupo k (cuánto varían los datos dentro de ese grupo)</p>
              <p><InlineMath math="(\bar{x}_k - \bar{x}_{new})^2" /> = varianza entre grupos (cuánto se aleja la media del grupo k de la media global)</p>
              <p className="text-muted-foreground mt-1"><strong>En palabras:</strong> La varianza total = varianza dentro de cada grupo + varianza entre los grupos.</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-sm mb-2">En nuestro caso, como <InlineMath math="\bar{x}_1 = \bar{x}_2 = \bar{x}_{new} = 5" />, las diferencias entre medias son 0:</p>
        <FormulaDisplay math={`s_{new}^2 = \\frac{100 \\cdot [15 + (5-5)^2] + 20 \\cdot [0 + (5-5)^2]}{120}`} />
        <FormulaDisplay math={`= \\frac{100 \\cdot [15 + 0] + 20 \\cdot [0 + 0]}{120} = \\frac{1500 + 0}{120} = ${round(newVar, 2)}`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs space-y-1">
            <p><strong>¿Tiene sentido?</strong> La varianza bajó de 15 a {round(newVar, 2)}.
            Los 20 datos nuevos (todos = 5) aportan <strong>0 variación</strong>, así que &quot;diluyen&quot; la variación original.
            Es exactamente como mezclar 100 mL de café (concentrado = varianza 15) con 20 mL de agua (varianza 0):
            el resultado es café menos concentrado (varianza {round(newVar, 2)}).</p>
            <p><strong>Fórmula simplificada:</strong> Como las medias son iguales, se reduce a <InlineMath math="s_{new}^2 = \frac{n_1 \cdot s_1^2}{n_1 + n_2} = \frac{100 \cdot 15}{120} = 12.5" />.</p>
          </CardContent>
        </Card>

        <ResultCard label="Nueva varianza" value={`${round(newVar, 2)}`} />
      </StepCard>

      {/* ============ PASO 4: Nuevo CV ============ */}
      <StepCard stepNumber={5} title="Paso 3: Nuevo coeficiente de variación" variant="result">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">Recordatorio: CV = σ / |media| × 100</p>
            <p className="text-muted-foreground">
              Mide qué porcentaje de la media representa la desviación. Menor CV = media más representativa.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`s_{new} = \\sqrt{${round(newVar, 2)}} = ${round(newStd, 4)}`} />
        <FormulaDisplay math={`CV_{new} = \\frac{${round(newStd, 4)}}{5} \\times 100 = ${round(newCV, 2)}\\%`} />

        <ResultCard label="Nuevo CV" value={`${round(newCV, 2)}%`} />

        <Card className="bg-blue-50 border-blue-200 mt-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">Comparación antes y después</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Card className="bg-white">
                <CardContent className="p-2">
                  <p className="font-semibold text-xs">Antes (n=100)</p>
                  <p className="text-[10px]">Media = 5 | Varianza = 15 | σ = {round(Math.sqrt(15), 4)}</p>
                  <p className="text-[10px]">CV = {round(oldCV, 2)}%</p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-2">
                  <p className="font-semibold text-xs">Después (n=120)</p>
                  <p className="text-[10px]">Media = 5 | Varianza = {round(newVar, 2)} | σ = {round(newStd, 4)}</p>
                  <p className="text-[10px]">CV = {round(newCV, 2)}%</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground">
              <strong>Conclusión:</strong> Al añadir observaciones iguales a la media, la media no cambia pero la varianza y el CV disminuyen.
              El CV pasó de {round(oldCV, 2)}% a {round(newCV, 2)}%, haciendo que la media sea más representativa.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Lección clave</p>
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
