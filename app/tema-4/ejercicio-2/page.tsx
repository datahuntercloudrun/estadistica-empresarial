"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { round, mean, variance, stdDev } from "@/lib/stats/descriptive";
import {
  covarianceFromPairs,
  correlation,
  rSquared,
  regressionYX,
  regressionXY,
  predict,
} from "@/lib/stats/bivariate";
import { ScatterChartCustom } from "@/components/charts/scatter-chart-custom";

const gastos = [1, 2, 3, 4, 5, 6];
const ventas = [10, 17, 30, 28, 39, 47];
const n = gastos.length;

const xMean = mean(gastos);
const yMean = mean(ventas);
const sx2 = variance(gastos);
const sy2 = variance(ventas);
const sx = stdDev(gastos);
const sy = stdDev(ventas);
const sxy = covarianceFromPairs(gastos, ventas);
const r = correlation(sxy, sx, sy);
const R2 = rSquared(sxy, sx2, sy2);
const lineYX = regressionYX(xMean, yMean, sxy, sx2);
const lineXY = regressionXY(xMean, yMean, sxy, sy2);

const target = 43;
const gastosEstimados = predict(lineXY, target);

const scatterData = gastos.map((g, i) => ({ x: g, y: ventas[i] }));

export default function Ejercicio2() {
  return (
    <ExerciseLayout
      tema={4}
      exerciseNumber={2}
      title="Gastos en Publicidad vs Ventas"
      difficulty="Medio"
      category="Correlación y regresión"
      statement={
        <div className="space-y-2">
          <p>La siguiente tabla recoge la relación entre los gastos en publicidad (miles de euros) y las ventas (miles de euros):</p>
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700/30">
                  <th className="border p-2">Gastos</th>
                  {gastos.map((g) => <th key={g} className="border p-2 text-center">{g}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">Ventas</td>
                  {ventas.map((v, i) => <td key={i} className="border p-2 text-center">{v}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <p>a) Diagrama de dispersión &nbsp; b) Centro de gravedad &nbsp; c) Correlación &nbsp; d) Rectas de regresión &nbsp; e) Gastos para 43.000 euros de beneficio &nbsp; f) R²</p>
        </div>
      }
      prevUrl="/tema-4/ejercicio-1"
      nextUrl="/tema-4/ejercicio-3"
    >
      {/* PASO 1 */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender?" variant="explanation">
        <p>
          Este es el ejercicio <strong>tipo</strong> de regresión: tenemos pares de datos y queremos saber si
          gastar más en publicidad lleva a vender más. Seguiremos el flujo completo: dispersión → correlación → regresión → predicción → R².
        </p>
      </StepCard>

      {/* PASO 2: Medias */}
      <StepCard stepNumber={2} title="Estadísticos básicos" variant="calculation">
        <p className="text-muted-foreground">Calculamos las medias, varianzas, desviaciones y la covarianza.</p>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <FormulaDisplay math={`\\bar{x} = \\frac{${gastos.join(" + ")}}{${n}} = \\frac{${gastos.reduce((a, b) => a + b, 0)}}{${n}} = ${round(xMean, 2)}`} />
            <FormulaDisplay math={`\\bar{y} = \\frac{${ventas.join(" + ")}}{${n}} = \\frac{${ventas.reduce((a, b) => a + b, 0)}}{${n}} = ${round(yMean, 4)}`} />
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <FormulaDisplay math={`s_x^2 = \\overline{x^2} - \\bar{x}^2 = \\frac{${gastos.map((g) => `${g}^2`).join(" + ")}}{${n}} - ${round(xMean, 2)}^2 = ${round(gastos.reduce((s, g) => s + g * g, 0) / n, 4)} - ${round(xMean * xMean, 4)} = ${round(sx2, 4)}`} />
            <FormulaDisplay math={`s_y^2 = \\overline{y^2} - \\bar{y}^2 = ${round(ventas.reduce((s, v) => s + v * v, 0) / n, 4)} - ${round(yMean * yMean, 4)} = ${round(sy2, 4)}`} />
            <FormulaDisplay math={`\\overline{xy} = \\frac{${gastos.map((g, i) => `${g} \\cdot ${ventas[i]}`).join(" + ")}}{${n}} = \\frac{${gastos.reduce((s, g, i) => s + g * ventas[i], 0)}}{${n}} = ${round(gastos.reduce((s, g, i) => s + g * ventas[i], 0) / n, 4)}`} />
            <FormulaDisplay math={`s_{xy} = \\overline{xy} - \\bar{x} \\cdot \\bar{y} = ${round(gastos.reduce((s, g, i) => s + g * ventas[i], 0) / n, 4)} - ${round(xMean, 2)} \\times ${round(yMean, 4)} = ${round(sxy, 4)}`} />
          </CardContent>
        </Card>
      </StepCard>

      {/* PASO 3: Diagrama de dispersión + Centro de gravedad */}
      <StepCard stepNumber={3} title="a-b) Diagrama de dispersión y centro de gravedad" variant="result">
        <ScatterChartCustom
          data={scatterData}
          title="Gastos en publicidad vs Ventas"
          xLabel="Gastos (miles €)"
          yLabel="Ventas (miles €)"
          gravityCenter={{ x: xMean, y: yMean }}
          color="#0d9488"
        />
        <ResultCard label="Centro de gravedad" value={`(x̄, ȳ) = (${round(xMean, 2)}, ${round(yMean, 2)})`} />
        <p className="text-xs text-muted-foreground mt-1">
          Los puntos muestran una clara tendencia ascendente: a más publicidad, más ventas.
          El punto rojo es el centro de gravedad por el que pasan ambas rectas.
        </p>
      </StepCard>

      {/* PASO 4: Correlación */}
      <StepCard stepNumber={4} title="c) Coeficiente de correlación lineal" variant="calculation">
        <FormulaDisplay math={`r = \\frac{s_{xy}}{s_x \\cdot s_y} = \\frac{${round(sxy, 4)}}{${round(sx, 4)} \\times ${round(sy, 4)}} = \\frac{${round(sxy, 4)}}{${round(sx * sy, 4)}} = ${round(r, 4)}`} />

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="text-muted-foreground">
              <InlineMath math={`r = ${round(r, 4)}`} /> → correlación lineal <strong>positiva y fuerte</strong>.
              Existe una relación directa intensa: cuando los gastos en publicidad aumentan, las ventas también aumentan de forma significativa.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Correlación" value={`r = ${round(r, 4)}`} />
      </StepCard>

      {/* PASO 5: Rectas de regresión */}
      <StepCard stepNumber={5} title="d) Rectas de regresión" variant="calculation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Recta Y/X (ventas en función de gastos)</p>
              <FormulaDisplay math={`\\beta = \\frac{s_{xy}}{s_x^2} = \\frac{${round(sxy, 4)}}{${round(sx2, 4)}} = ${round(lineYX.beta, 4)}`} />
              <FormulaDisplay math={`\\alpha = ${round(yMean, 4)} - ${round(lineYX.beta, 4)} \\cdot ${round(xMean, 2)} = ${round(lineYX.alpha, 4)}`} />
              <FormulaDisplay math={`\\boxed{\\hat{y}(x) = ${round(lineYX.alpha, 4)} + ${round(lineYX.beta, 4)}x}`} />
              <p className="text-xs text-muted-foreground">
                Por cada 1.000 euros adicionales en publicidad, las ventas aumentan en {round(lineYX.beta, 2)} miles de euros.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Recta X/Y (gastos en función de ventas)</p>
              <FormulaDisplay math={`\\beta' = \\frac{s_{xy}}{s_y^2} = \\frac{${round(sxy, 4)}}{${round(sy2, 4)}} = ${round(lineXY.beta, 4)}`} />
              <FormulaDisplay math={`\\alpha' = ${round(xMean, 2)} - ${round(lineXY.beta, 4)} \\cdot ${round(yMean, 4)} = ${round(lineXY.alpha, 4)}`} />
              <FormulaDisplay math={`\\boxed{\\hat{x}(y) = ${round(lineXY.alpha, 4)} + ${round(lineXY.beta, 4)}y}`} />
            </CardContent>
          </Card>
        </div>

        <ScatterChartCustom
          data={scatterData}
          title="Rectas de regresión sobre el diagrama"
          xLabel="Gastos (miles €)"
          yLabel="Ventas (miles €)"
          gravityCenter={{ x: xMean, y: yMean }}
          regressionLines={[
            { slope: lineYX.beta, intercept: lineYX.alpha, label: "Y/X (Ventas~Gastos)", color: "#2563eb" },
          ]}
          color="#0d9488"
        />
      </StepCard>

      {/* PASO 6: Estimación */}
      <StepCard stepNumber={6} title="e) Estimación: gastos para 43.000 euros de beneficio" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Usamos la recta X/Y (predecir gastos a partir de ventas)</p>
            <p className="text-muted-foreground">
              Queremos saber X (gastos) para Y = 43 (ventas de 43.000 euros):
            </p>
            <FormulaDisplay math={`\\hat{x}(43) = ${round(lineXY.alpha, 4)} + ${round(lineXY.beta, 4)} \\times 43 = ${round(gastosEstimados, 4)}`} />
          </CardContent>
        </Card>

        <ResultCard label="Gastos estimados para 43k€ de ventas" value={`${round(gastosEstimados, 2)} miles de euros = ${round(gastosEstimados * 1000, 0)} euros`} />
      </StepCard>

      {/* PASO 7: R² */}
      <StepCard stepNumber={7} title="f) Coeficiente de determinación R²" variant="result">
        <FormulaDisplay math={`R^2 = r^2 = ${round(r, 4)}^2 = ${round(R2, 4)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Variación explicada</p>
              <p className="text-muted-foreground">
                El modelo lineal explica el <strong>{round(R2 * 100, 2)}%</strong> de la variación de las ventas
                en función de los gastos en publicidad.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800">
            <CardContent className="p-3 text-sm">
              <p className="font-semibold text-rose-800 dark:text-rose-200">Variación no explicada</p>
              <p className="text-muted-foreground">
                El <strong>{round((1 - R2) * 100, 2)}%</strong> restante se debe a otros factores no recogidos en el modelo.
              </p>
            </CardContent>
          </Card>
        </div>

        <ResultCard label="R²" value={`${round(R2, 4)} (${round(R2 * 100, 2)}%)`} />
      </StepCard>
    </ExerciseLayout>
  );
}
