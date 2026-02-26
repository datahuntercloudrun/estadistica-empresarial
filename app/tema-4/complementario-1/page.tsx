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
  predict,
} from "@/lib/stats/bivariate";
import { ScatterChartCustom } from "@/components/charts/scatter-chart-custom";

// X = nº vehículos > 120 km/h, Y = nº accidentes
const vehiculos = [15, 18, 10, 8, 20];
const accidentes = [5, 7, 2, 1, 9];
const n = vehiculos.length;

const xMean = mean(vehiculos);
const yMean = mean(accidentes);
const sx2 = variance(vehiculos);
const sy2 = variance(accidentes);
const sx = stdDev(vehiculos);
const sy = stdDev(accidentes);
const sxy = covarianceFromPairs(vehiculos, accidentes);
const r = correlation(sxy, sx, sy);
const R2 = rSquared(sxy, sx2, sy2);
const lineYX = regressionYX(xMean, yMean, sxy, sx2);

const estimacion16 = predict(lineYX, 16);
const scatterData = vehiculos.map((v, i) => ({ x: v, y: accidentes[i] }));

export default function Complementario1() {
  return (
    <ExerciseLayout
      tema={4}
      exerciseNumber="C1"
      title="Accidentes vs Vehículos a más de 120 km/h"
      difficulty="Medio"
      category="Covarianza y regresión"
      statement={
        <div className="space-y-2">
          <p>Una compañía de seguros analiza accidentes en autopista vs vehículos que circulan a más de 120 km/h (5 días):</p>
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700/30">
                  <th className="border p-2">Accidentes</th>
                  {accidentes.map((a, i) => <th key={i} className="border p-2 text-center">{a}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">Vehículos &gt;120</td>
                  {vehiculos.map((v, i) => <td key={i} className="border p-2 text-center">{v}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <p>a) Representación gráfica &nbsp; b) Covarianza &nbsp; c) Estimación accidentes si 16 vehículos &nbsp; d) R² y r</p>
        </div>
      }
      prevUrl="/tema-4/ejercicio-6"
      nextUrl="/tema-4/complementario-2"
    >
      {/* PASO 1 */}
      <StepCard stepNumber={1} title="Estadísticos básicos" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <FormulaDisplay math={`\\bar{x} = \\frac{${vehiculos.join(" + ")}}{${n}} = ${round(xMean, 2)}`} />
            <FormulaDisplay math={`\\bar{y} = \\frac{${accidentes.join(" + ")}}{${n}} = ${round(yMean, 2)}`} />
            <FormulaDisplay math={`s_x^2 = ${round(sx2, 4)} \\quad ; \\quad s_y^2 = ${round(sy2, 4)}`} />
          </CardContent>
        </Card>
      </StepCard>

      {/* PASO 2: Diagrama */}
      <StepCard stepNumber={2} title="a) Diagrama de dispersión" variant="result">
        <ScatterChartCustom
          data={scatterData}
          title="Vehículos >120 km/h vs Accidentes"
          xLabel="Vehículos >120 km/h"
          yLabel="Accidentes"
          gravityCenter={{ x: xMean, y: yMean }}
          regressionLines={[
            { slope: lineYX.beta, intercept: lineYX.alpha, label: "Regresión Y/X", color: "#e11d48" },
          ]}
          color="#e11d48"
        />
      </StepCard>

      {/* PASO 3: Covarianza */}
      <StepCard stepNumber={3} title="b) Covarianza" variant="calculation">
        <FormulaDisplay math={`\\overline{xy} = \\frac{${vehiculos.map((v, i) => `${v} \\times ${accidentes[i]}`).join(" + ")}}{${n}} = \\frac{${vehiculos.reduce((s, v, i) => s + v * accidentes[i], 0)}}{${n}} = ${round(vehiculos.reduce((s, v, i) => s + v * accidentes[i], 0) / n, 4)}`} />
        <FormulaDisplay math={`s_{xy} = \\overline{xy} - \\bar{x} \\cdot \\bar{y} = ${round(vehiculos.reduce((s, v, i) => s + v * accidentes[i], 0) / n, 4)} - ${round(xMean, 2)} \\times ${round(yMean, 2)} = ${round(sxy, 4)}`} />

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="text-muted-foreground">
              <InlineMath math={`s_{xy} = ${round(sxy, 4)} > 0`} /> → relación directa: más vehículos rápidos → más accidentes.
            </p>
          </CardContent>
        </Card>
        <ResultCard label="Covarianza" value={`sxy = ${round(sxy, 4)}`} />
      </StepCard>

      {/* PASO 4: Estimación */}
      <StepCard stepNumber={4} title="c) Estimación: 16 vehículos a más de 120 km/h" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <FormulaDisplay math={`\\beta = \\frac{s_{xy}}{s_x^2} = \\frac{${round(sxy, 4)}}{${round(sx2, 4)}} = ${round(lineYX.beta, 4)}`} />
            <FormulaDisplay math={`\\alpha = ${round(yMean, 2)} - ${round(lineYX.beta, 4)} \\times ${round(xMean, 2)} = ${round(lineYX.alpha, 4)}`} />
            <FormulaDisplay math={`\\hat{y}(x) = ${round(lineYX.alpha, 4)} + ${round(lineYX.beta, 4)}x`} />
          </CardContent>
        </Card>

        <FormulaDisplay math={`\\hat{y}(16) = ${round(lineYX.alpha, 4)} + ${round(lineYX.beta, 4)} \\times 16 = ${round(estimacion16, 4)}`} />
        <ResultCard label="Accidentes estimados (16 vehículos)" value={`${round(estimacion16, 2)} accidentes`} />
      </StepCard>

      {/* PASO 5: R² y r */}
      <StepCard stepNumber={5} title="d) Coeficientes de determinación y correlación" variant="result">
        <FormulaDisplay math={`R^2 = \\frac{s_{xy}^2}{s_x^2 \\cdot s_y^2} = \\frac{${round(sxy, 4)}^2}{${round(sx2, 4)} \\times ${round(sy2, 4)}} = ${round(R2, 4)}`} />
        <FormulaDisplay math={`r = +\\sqrt{R^2} = +\\sqrt{${round(R2, 4)}} = ${round(r, 4)}`} />
        <p className="text-xs text-muted-foreground">(Positivo porque <InlineMath math={`s_{xy} > 0`} />)</p>

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="text-muted-foreground">
              <InlineMath math={`R^2 = ${round(R2, 4)}`} /> → el modelo explica el <strong>{round(R2 * 100, 2)}%</strong> de la variabilidad
              de los accidentes en función de los vehículos rápidos. Es un ajuste muy bueno.
            </p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-2">
          <ResultCard label="R²" value={`${round(R2, 4)} (${round(R2 * 100, 2)}%)`} />
          <ResultCard label="r" value={`${round(r, 4)}`} />
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
