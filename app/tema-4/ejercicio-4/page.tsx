"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { round } from "@/lib/stats/descriptive";
import {
  covarianceFromSums,
  varianceFromSums,
  correlation,
  rSquared,
  regressionYX,
  predict,
} from "@/lib/stats/bivariate";

// Datos del ejercicio
const n = 30;
const sumX = 1435;
const sumX2 = 77715;
const sumXY = 1017499.61;
const sumY = 19490.29;
const sumY2 = 13821840.4;

// Cálculos
const xMean = sumX / n;
const yMean = sumY / n;
const sx2 = varianceFromSums(sumX2, sumX, n);
const sy2 = varianceFromSums(sumY2, sumY, n);
const sx = Math.sqrt(sx2);
const sy = Math.sqrt(sy2);
const sxy = covarianceFromSums(sumXY, sumX, sumY, n);
const r = correlation(sxy, sx, sy);
const R2 = rSquared(sxy, sx2, sy2);
const lineYX = regressionYX(xMean, yMean, sxy, sx2);

const escenarios = [
  { nombre: "Pesimista", clientes: 30 },
  { nombre: "Neutro", clientes: 50 },
  { nombre: "Optimista", clientes: 70 },
];

export default function Ejercicio4() {
  return (
    <ExerciseLayout
      tema={4}
      exerciseNumber={4}
      title="Establecimiento: Clientes y Facturación"
      difficulty="Medio-Alto"
      category="Correlación y regresión"
      statement={
        <div className="space-y-2">
          <p>Se toman las observaciones de 30 días de un establecimiento: X = número de clientes, Y = facturación diaria.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p><InlineMath math={`\\sum x_i = ${sumX}`} /></p>
            <p><InlineMath math={`\\sum x_i^2 = ${sumX2}`} /></p>
            <p><InlineMath math={`\\sum x_i y_i = ${sumXY}`} /></p>
            <p><InlineMath math={`\\sum y_i = ${sumY}`} /></p>
            <p><InlineMath math={`\\sum y_i^2 = ${sumY2}`} /></p>
          </div>
          <p>a) Correlación &nbsp; b) Recta regresión facturación~clientes &nbsp; c) Estimación escenarios (30, 50, 70 clientes)</p>
        </div>
      }
      prevUrl="/tema-4/ejercicio-3"
      nextUrl="/tema-4/ejercicio-5"
    >
      {/* PASO 1 */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender?" variant="explanation">
        <p>
          Este ejercicio es muy <strong>práctico</strong>: un negocio real quiere saber si el número de clientes
          predice la facturación. La particularidad es que <strong>no nos dan los datos individuales</strong>,
          sino las sumas directamente (como sale de un programa informático).
        </p>
        <Card className="bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-teal-800 dark:text-teal-200">Truco: calcular desde sumas</p>
            <p className="text-muted-foreground">
              Usamos: <InlineMath math="\bar{x} = \frac{\sum x_i}{n}" />, <InlineMath math="s_x^2 = \frac{\sum x_i^2}{n} - \bar{x}^2" />, <InlineMath math="s_{xy} = \frac{\sum x_i y_i}{n} - \bar{x} \cdot \bar{y}" />
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* PASO 2: Estadísticos */}
      <StepCard stepNumber={2} title="Calcular estadísticos desde las sumas" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Medias</p>
            <FormulaDisplay math={`\\bar{x} = \\frac{${sumX}}{${n}} = ${round(xMean, 4)}`} />
            <FormulaDisplay math={`\\bar{y} = \\frac{${sumY}}{${n}} = ${round(yMean, 4)}`} />
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">Varianzas</p>
            <FormulaDisplay math={`s_x^2 = \\frac{${sumX2}}{${n}} - ${round(xMean, 4)}^2 = ${round(sumX2 / n, 4)} - ${round(xMean * xMean, 4)} = ${round(sx2, 4)}`} />
            <FormulaDisplay math={`s_y^2 = \\frac{${sumY2}}{${n}} - ${round(yMean, 4)}^2 = ${round(sumY2 / n, 4)} - ${round(yMean * yMean, 4)} = ${round(sy2, 4)}`} />
          </CardContent>
        </Card>

        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-violet-800 dark:text-violet-200">Covarianza</p>
            <FormulaDisplay math={`s_{xy} = \\frac{${sumXY}}{${n}} - \\bar{x} \\cdot \\bar{y} = ${round(sumXY / n, 4)} - ${round(xMean, 4)} \\times ${round(yMean, 4)}`} />
            <FormulaDisplay math={`= ${round(sumXY / n, 4)} - ${round(xMean * yMean, 4)} = ${round(sxy, 4)}`} />
          </CardContent>
        </Card>
      </StepCard>

      {/* PASO 3: Correlación */}
      <StepCard stepNumber={3} title="a) Correlación entre variables" variant="calculation">
        <FormulaDisplay math={`r = \\frac{s_{xy}}{s_x \\cdot s_y} = \\frac{${round(sxy, 4)}}{${round(sx, 4)} \\times ${round(sy, 4)}} = ${round(r, 4)}`} />

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="text-muted-foreground">
              <InlineMath math={`r = ${round(r, 4)}`} /> → correlación lineal <strong>positiva y {Math.abs(r) > 0.7 ? "fuerte" : Math.abs(r) > 0.4 ? "moderada" : "débil"}</strong>.
              {r > 0 ? " A más clientes, mayor facturación." : " A más clientes, menor facturación."}
            </p>
          </CardContent>
        </Card>
        <ResultCard label="Correlación" value={`r = ${round(r, 4)}`} />
      </StepCard>

      {/* PASO 4: Recta de regresión */}
      <StepCard stepNumber={4} title="b) Recta de regresión: facturación ~ clientes" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Recta Y/X: ŷ(x) = α + βx</p>
            <FormulaDisplay math={`\\beta = \\frac{s_{xy}}{s_x^2} = \\frac{${round(sxy, 4)}}{${round(sx2, 4)}} = ${round(lineYX.beta, 4)}`} />
            <FormulaDisplay math={`\\alpha = \\bar{y} - \\beta \\cdot \\bar{x} = ${round(yMean, 4)} - ${round(lineYX.beta, 4)} \\times ${round(xMean, 4)} = ${round(lineYX.alpha, 4)}`} />
            <FormulaDisplay math={`\\boxed{\\hat{y}(x) = ${round(lineYX.alpha, 2)} + ${round(lineYX.beta, 2)}x}`} />
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Interpretación de los coeficientes</p>
            <p className="text-muted-foreground">
              <InlineMath math={`\\beta = ${round(lineYX.beta, 2)}`} />: por cada cliente adicional, la facturación aumenta en <strong>{round(lineYX.beta, 2)} euros</strong>.
            </p>
            <p className="text-muted-foreground">
              <InlineMath math={`\\alpha = ${round(lineYX.alpha, 2)}`} />: facturación base (costes fijos / ingresos mínimos) cuando no hay clientes.
            </p>
          </CardContent>
        </Card>
        <ResultCard label="Recta regresión" value={`ŷ(x) = ${round(lineYX.alpha, 2)} + ${round(lineYX.beta, 2)}x`} />
      </StepCard>

      {/* PASO 5: Escenarios */}
      <StepCard stepNumber={5} title="c) Estimación por escenarios" variant="result">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {escenarios.map((esc) => {
            const facturacion = predict(lineYX, esc.clientes);
            const colorMap: Record<string, { bg: string; border: string; text: string }> = {
              Pesimista: { bg: "bg-rose-50 dark:bg-rose-950/20", border: "border-rose-200 dark:border-rose-800", text: "text-rose-800 dark:text-rose-200" },
              Neutro: { bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-800", text: "text-amber-800 dark:text-amber-200" },
              Optimista: { bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800", text: "text-emerald-800 dark:text-emerald-200" },
            };
            const c = colorMap[esc.nombre];
            return (
              <Card key={esc.nombre} className={`${c.bg} ${c.border}`}>
                <CardContent className="p-3 text-sm space-y-2">
                  <p className={`font-bold ${c.text}`}>{esc.nombre}: {esc.clientes} clientes</p>
                  <FormulaDisplay math={`\\hat{y}(${esc.clientes}) = ${round(lineYX.alpha, 2)} + ${round(lineYX.beta, 2)} \\times ${esc.clientes}`} />
                  <p className="font-bold text-center text-lg">{round(facturacion, 2)} euros</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-3">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Son fiables estos resultados?</p>
            <FormulaDisplay math={`R^2 = r^2 = ${round(r, 4)}^2 = ${round(R2, 4)}`} />
            <p className="text-muted-foreground mt-1">
              El modelo explica el <strong>{round(R2 * 100, 2)}%</strong> de la variación.
              {R2 > 0.7 ? " Es un ajuste razonablemente bueno, las estimaciones son fiables."
                : R2 > 0.5 ? " Es un ajuste moderado, las estimaciones deben tomarse con cautela."
                  : " El ajuste es bajo, las estimaciones son poco fiables."}
            </p>
            <p className="text-muted-foreground mt-1">
              <strong>Nota:</strong> las estimaciones para valores muy alejados de la media ({round(xMean, 0)} clientes)
              son menos fiables por el riesgo de <strong>extrapolación</strong>.
            </p>
          </CardContent>
        </Card>
      </StepCard>
    </ExerciseLayout>
  );
}
