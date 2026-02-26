"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { round } from "@/lib/stats/descriptive";

// Datos: sxy = -4.1, sy² = 9, x̄ = 2, ȳ = 5, β (coef. regresión Y/X) = -1.1
const sxy = -4.1;
const sy2 = 9;
const xMean = 2;
const yMean = 5;
const betaYX = -1.1; // coeficiente de regresión de Y sobre X

// De β = sxy / sx² → sx² = sxy / β
const sx2 = sxy / betaYX;

// Recta Y/X: ŷ(x) = α + βx
const alphaYX = yMean - betaYX * xMean;

// Recta X/Y: x̂(y) = α' + β'y
const betaXY = sxy / sy2;
const alphaXY = xMean - betaXY * yMean;

// Correlación
const sx = Math.sqrt(sx2);
const sy = Math.sqrt(sy2);
const r = sxy / (sx * sy);

// R²
const R2 = r * r;

export default function Complementario2() {
  return (
    <ExerciseLayout
      tema={4}
      exerciseNumber="C2"
      title="Distribución Bidimensional"
      difficulty="Bajo-Medio"
      category="Regresión y correlación"
      statement={
        <div className="space-y-2">
          <p>Sea una distribución bidimensional donde:</p>
          <div className="text-sm space-y-1">
            <p><InlineMath math="s_{xy} = -4{,}1" />, <InlineMath math="s_y^2 = 9" />, <InlineMath math="\bar{x} = 2" />, <InlineMath math="\bar{y} = 5" /></p>
            <p>El coeficiente de regresión de la recta de Y sobre X es <InlineMath math="\beta = -1{,}1" /></p>
          </div>
          <p>a) Las dos rectas de regresión &nbsp; b) El coeficiente de correlación lineal</p>
        </div>
      }
      prevUrl="/tema-4/complementario-1"
      nextUrl="/tema-4/complementario-3"
    >
      {/* PASO 1 */}
      <StepCard stepNumber={1} title="Encontrar sx² (dato oculto)" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Extraer sx² del coeficiente de regresión</p>
            <p className="text-muted-foreground">
              Sabemos que <InlineMath math="\beta = \frac{s_{xy}}{s_x^2}" />, así que:
            </p>
            <FormulaDisplay math={`s_x^2 = \\frac{s_{xy}}{\\beta} = \\frac{${sxy}}{${betaYX}} = ${round(sx2, 4)}`} />
          </CardContent>
        </Card>
        <ResultCard label="Varianza de X" value={`sx² = ${round(sx2, 4)}`} />
      </StepCard>

      {/* PASO 2: Recta Y/X */}
      <StepCard stepNumber={2} title="a) Recta de regresión de Y sobre X" variant="calculation">
        <FormulaDisplay math={`\\alpha = \\bar{y} - \\beta \\cdot \\bar{x} = ${yMean} - (${betaYX}) \\times ${xMean} = ${yMean} - (${round(betaYX * xMean, 2)}) = ${round(alphaYX, 2)}`} />
        <FormulaDisplay math={`\\boxed{\\hat{y}(x) = ${round(alphaYX, 2)} + (${round(betaYX, 2)})x = ${round(alphaYX, 2)} - ${round(Math.abs(betaYX), 2)}x}`} />
        <ResultCard label="Recta Y/X" value={`ŷ(x) = ${round(alphaYX, 2)} ${betaYX >= 0 ? "+" : "-"} ${round(Math.abs(betaYX), 2)}x`} />
      </StepCard>

      {/* PASO 3: Recta X/Y */}
      <StepCard stepNumber={3} title="Recta de regresión de X sobre Y" variant="calculation">
        <FormulaDisplay math={`\\beta' = \\frac{s_{xy}}{s_y^2} = \\frac{${sxy}}{${sy2}} = ${round(betaXY, 4)}`} />
        <FormulaDisplay math={`\\alpha' = \\bar{x} - \\beta' \\cdot \\bar{y} = ${xMean} - (${round(betaXY, 4)}) \\times ${yMean} = ${round(alphaXY, 4)}`} />
        <FormulaDisplay math={`\\boxed{\\hat{x}(y) = ${round(alphaXY, 4)} + (${round(betaXY, 4)})y}`} />
        <ResultCard label="Recta X/Y" value={`x̂(y) = ${round(alphaXY, 4)} ${betaXY >= 0 ? "+" : "-"} ${round(Math.abs(betaXY), 4)}y`} />
      </StepCard>

      {/* PASO 4: Correlación */}
      <StepCard stepNumber={4} title="b) Coeficiente de correlación lineal" variant="result">
        <FormulaDisplay math={`r = \\frac{s_{xy}}{s_x \\cdot s_y} = \\frac{${sxy}}{\\sqrt{${round(sx2, 4)}} \\times \\sqrt{${sy2}}} = \\frac{${sxy}}{${round(sx, 4)} \\times ${round(sy, 4)}} = ${round(r, 4)}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Verificación alternativa</p>
            <FormulaDisplay math={`r = \\text{signo}(s_{xy}) \\cdot \\sqrt{\\beta \\cdot \\beta'} = -\\sqrt{${round(betaYX, 4)} \\times ${round(betaXY, 4)}} = -\\sqrt{${round(Math.abs(betaYX * betaXY), 4)}} = ${round(r, 4)}`} />
          </CardContent>
        </Card>

        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="text-muted-foreground">
              <InlineMath math={`r = ${round(r, 4)} < 0`} /> → relación lineal <strong>inversa</strong> (negativa) de intensidad {Math.abs(r) > 0.7 ? "fuerte" : Math.abs(r) > 0.4 ? "moderada" : "débil"}.
              Cuando X sube, Y tiende a bajar.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Correlación" value={`r = ${round(r, 4)}`} />
      </StepCard>
    </ExerciseLayout>
  );
}
