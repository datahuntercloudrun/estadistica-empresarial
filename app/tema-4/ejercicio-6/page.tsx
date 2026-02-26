"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { round } from "@/lib/stats/descriptive";

// Datos del gráfico: y = 32.313x - 616.18, R² = 0.6182
// n = 49 granjas, X = vacas, Y = litros leche
// sxy = 26246.1

const beta = 32.313;
const alpha = -616.18;
const R2 = 0.6182;
const sxy = 26246.1;

// De β = sxy / sx² → sx² = sxy / β
const sx2 = sxy / beta;

// De R² = sxy² / (sx² · sy²) → sy² = sxy² / (R² · sx²) = sxy² / (R² · sx²)
// O también: R² = β · β' → β' = R² / β (pero β' = sxy/sy²)
// Mejor: R² = sxy² / (sx² · sy²)
const sy2 = (sxy * sxy) / (R2 * sx2);

// Estimación 70 vacas
const produccion70 = alpha + beta * 70;

// r desde R²
const r = Math.sqrt(R2); // positivo porque β > 0

export default function Ejercicio6() {
  return (
    <ExerciseLayout
      tema={4}
      exerciseNumber={6}
      title="Vacas vs Producción de Leche"
      difficulty="Medio"
      category="Regresión y R²"
      statement={
        <div className="space-y-2">
          <p>En un gráfico aparece la relación entre el número de vacas (X) y la producción diaria de litros de leche (Y) de 49 granjas.</p>
          <p>La recta de regresión mostrada es: <InlineMath math="y = 32{,}313x - 616{,}18" /> con <InlineMath math="R^2 = 0{,}6182" /></p>
          <ul className="list-disc list-inside">
            <li>Describir los elementos del gráfico y sus implicaciones</li>
            <li>Estimar producción para 70 vacas y evaluar fiabilidad</li>
            <li>Dado <InlineMath math="s_{xy} = 26.246{,}1" />, calcular las varianzas</li>
          </ul>
        </div>
      }
      prevUrl="/tema-4/ejercicio-5"
      nextUrl="/tema-4/complementario-1"
    >
      {/* PASO 1 */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender?" variant="explanation">
        <p>
          Este ejercicio es al revés de lo habitual: <strong>nos dan la recta ya calculada</strong> (como sale de un gráfico Excel)
          y nos piden interpretar y deducir otros estadísticos. Es muy práctico para el mundo real.
        </p>
      </StepCard>

      {/* PASO 2: Describir el gráfico */}
      <StepCard stepNumber={2} title="Descripción de los elementos del gráfico" variant="explanation">
        <div className="space-y-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Diagrama de dispersión</p>
              <p className="text-muted-foreground">
                Cada punto representa una granja. El eje X muestra el número de vacas y el eje Y la producción diaria de leche en litros.
                Los puntos muestran una tendencia ascendente clara.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Recta de regresión: y = 32,313x - 616,18</p>
              <p className="text-muted-foreground">
                <InlineMath math="\beta = 32{,}313" />: por cada vaca adicional, la producción de leche aumenta en <strong>32,3 litros diarios</strong>.
              </p>
              <p className="text-muted-foreground">
                <InlineMath math="\alpha = -616{,}18" />: la ordenada en el origen es negativa, lo que no tiene sentido físico
                (no puede haber producción negativa). Esto indica que el modelo solo es válido dentro del rango de datos observado.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-3 text-sm space-y-1">
              <p className="font-semibold text-amber-800 dark:text-amber-200">R² = 0,6182</p>
              <p className="text-muted-foreground">
                El modelo lineal explica el <strong>61,82%</strong> de la variación en la producción de leche.
                El <strong>38,18%</strong> restante se debe a otros factores (raza de vacas, alimentación, clima, etc.).
              </p>
              <p className="text-muted-foreground">
                <InlineMath math={`r = +\\sqrt{0{,}6182} = ${round(r, 4)}`} /> (positivo porque la pendiente es positiva).
                Correlación moderada-fuerte.
              </p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* PASO 3: Estimación 70 vacas */}
      <StepCard stepNumber={3} title="Estimación: producción con 70 vacas" variant="calculation">
        <FormulaDisplay math={`\\hat{y}(70) = 32{,}313 \\times 70 - 616{,}18 = ${round(32.313 * 70, 2)} - 616{,}18 = ${round(produccion70, 2)} \\text{ litros}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-amber-800 dark:text-amber-200">¿Es fiable?</p>
            <p className="text-muted-foreground">
              Con <InlineMath math="R^2 = 0{,}6182" />, el modelo explica el 61,82% de la variación.
              Es un ajuste moderado, por lo que la estimación tiene un margen de error considerable.
              Debemos verificar que 70 vacas está dentro del rango de datos observado (el gráfico va de 40 a 160 vacas aproximadamente),
              así que 70 vacas está dentro del rango y la estimación es aceptable, aunque con precaución.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Producción estimada (70 vacas)" value={`${round(produccion70, 2)} litros diarios`} />
      </StepCard>

      {/* PASO 4: Varianzas */}
      <StepCard stepNumber={4} title="Calcular las varianzas a partir de sxy y la recta" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Varianza de X (número de vacas)</p>
            <p className="text-muted-foreground">
              De la fórmula <InlineMath math="\beta = \frac{s_{xy}}{s_x^2}" /> despejamos:
            </p>
            <FormulaDisplay math={`s_x^2 = \\frac{s_{xy}}{\\beta} = \\frac{26.246{,}1}{32{,}313} = ${round(sx2, 4)}`} />
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">Varianza de Y (producción de leche)</p>
            <p className="text-muted-foreground">
              De la fórmula <InlineMath math="R^2 = \frac{s_{xy}^2}{s_x^2 \cdot s_y^2}" /> despejamos:
            </p>
            <FormulaDisplay math={`s_y^2 = \\frac{s_{xy}^2}{R^2 \\cdot s_x^2} = \\frac{26.246{,}1^2}{0{,}6182 \\times ${round(sx2, 4)}} = \\frac{${round(sxy * sxy, 2)}}{${round(R2 * sx2, 4)}} = ${round(sy2, 4)}`} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <ResultCard label="Varianza de X (vacas)" value={`sx² = ${round(sx2, 2)}`} />
          <ResultCard label="Varianza de Y (litros)" value={`sy² = ${round(sy2, 2)}`} />
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
