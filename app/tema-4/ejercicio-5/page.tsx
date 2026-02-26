"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { round } from "@/lib/stats/descriptive";
import { correlation, rSquared, regressionYX, predict } from "@/lib/stats/bivariate";

// Datos del ejercicio
const n = 23;
const xMean = 35.42; // facturación (M€)
const yMean = 3.09;  // inversión TICs (M€)
// OJO: la facturación es X, la inversión TICs es Y
// Pero el enunciado pide: recta donde facturación viene explicada por TICs
// Es decir: facturación = f(TICs) → X = f(Y) → o mejor, si hacemos TICs = variable independiente y facturación = dependiente
// Replanteemos: sea X = inversión TICs (independiente), Y = facturación (dependiente)
// x̄ = 3.09, ȳ = 35.42, sx² = 12.17, sy² = 969.40, sxy = 90.72

const xMeanTICs = 3.09;
const yMeanFact = 35.42;
const sx2 = 12.17;
const sy2 = 969.40;
const sxy = 90.72;
const sx = Math.sqrt(sx2);
const sy = Math.sqrt(sy2);
const r = correlation(sxy, sx, sy);
const R2 = rSquared(sxy, sx2, sy2);
const lineYX = regressionYX(xMeanTICs, yMeanFact, sxy, sx2);

// Estimación: inversión TICs = 750.000€ = 0.75 M€
const estimacion = predict(lineYX, 0.75);

export default function Ejercicio5() {
  return (
    <ExerciseLayout
      tema={4}
      exerciseNumber={5}
      title="Empresas Madereras: Facturación y TICs"
      difficulty="Medio"
      category="Correlación y regresión"
      statement={
        <div className="space-y-2">
          <p>Un grupo de 23 empresas del sector maderero tiene los siguientes datos:</p>
          <div className="text-sm space-y-1">
            <p>Media facturación: <InlineMath math="\bar{x}_{fact} = 35{,}42" /> M euros</p>
            <p>Media inversión TICs: <InlineMath math="\bar{x}_{TICs} = 3{,}09" /> M euros</p>
            <p>Varianza facturación: <InlineMath math="s^2_{fact} = 969{,}40" /> M euros²</p>
            <p>Varianza inversión TICs: <InlineMath math="s^2_{TICs} = 12{,}17" /> M euros²</p>
            <p>Covarianza: <InlineMath math="s_{xy} = 90{,}72" /> M euros²</p>
          </div>
          <p>a) Sentido e intensidad de la relación lineal &nbsp; b) Recta regresión facturación~TICs &nbsp; c) Estimación para 750.000 euros en TICs</p>
        </div>
      }
      prevUrl="/tema-4/ejercicio-4"
      nextUrl="/tema-4/ejercicio-6"
    >
      {/* PASO 1 */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender?" variant="explanation">
        <p>
          Este ejercicio ya nos da todos los estadísticos calculados (medias, varianzas, covarianza).
          Solo tenemos que aplicar las fórmulas. Es un buen ejercicio para practicar la <strong>interpretación</strong>.
        </p>
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Atención a las variables</p>
            <p className="text-muted-foreground">
              El enunciado pide que la facturación venga explicada por las TICs.
              Eso significa: <strong>X = inversión TICs</strong> (independiente) y <strong>Y = facturación</strong> (dependiente).
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* PASO 2: Correlación */}
      <StepCard stepNumber={2} title="a) Sentido e intensidad de la relación" variant="calculation">
        <FormulaDisplay math={`r = \\frac{s_{xy}}{s_x \\cdot s_y} = \\frac{${sxy}}{\\sqrt{${sx2}} \\times \\sqrt{${sy2}}} = \\frac{${sxy}}{${round(sx, 4)} \\times ${round(sy, 4)}} = ${round(r, 4)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Sentido: directo (positivo)</p>
              <p className="text-muted-foreground">
                <InlineMath math={`r = ${round(r, 4)} > 0`} /> → a mayor inversión en TICs, mayor facturación.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Intensidad: {Math.abs(r) > 0.7 ? "fuerte" : Math.abs(r) > 0.4 ? "moderada" : "débil"}</p>
              <p className="text-muted-foreground">
                <InlineMath math={`|r| = ${round(Math.abs(r), 4)}`} /> → la relación lineal es de intensidad {Math.abs(r) > 0.7 ? "fuerte" : Math.abs(r) > 0.4 ? "moderada" : "débil"}.
              </p>
            </CardContent>
          </Card>
        </div>
        <ResultCard label="Correlación" value={`r = ${round(r, 4)}`} />
      </StepCard>

      {/* PASO 3: Regresión */}
      <StepCard stepNumber={3} title="b) Recta de regresión: facturación ~ TICs" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <FormulaDisplay math={`\\beta = \\frac{s_{xy}}{s_x^2} = \\frac{${sxy}}{${sx2}} = ${round(lineYX.beta, 4)}`} />
            <FormulaDisplay math={`\\alpha = \\bar{y} - \\beta \\cdot \\bar{x} = ${yMeanFact} - ${round(lineYX.beta, 4)} \\times ${xMeanTICs} = ${round(lineYX.alpha, 4)}`} />
            <FormulaDisplay math={`\\boxed{\\hat{y}(x) = ${round(lineYX.alpha, 2)} + ${round(lineYX.beta, 2)}x}`} />
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Interpretación de los coeficientes</p>
            <p className="text-muted-foreground">
              <InlineMath math={`\\beta = ${round(lineYX.beta, 2)}`} />: por cada millón de euros adicional invertido en TICs, la facturación aumenta en <strong>{round(lineYX.beta, 2)} millones de euros</strong>.
            </p>
            <p className="text-muted-foreground">
              <InlineMath math={`\\alpha = ${round(lineYX.alpha, 2)}`} />: facturación base estimada cuando la inversión en TICs es cero.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* PASO 4: Estimación */}
      <StepCard stepNumber={4} title="c) Estimación para 750.000 euros en TICs" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Convertir unidades</p>
            <p className="text-muted-foreground">
              750.000 euros = 0,75 millones de euros → <InlineMath math="x = 0{,}75" />
            </p>
            <FormulaDisplay math={`\\hat{y}(0{,}75) = ${round(lineYX.alpha, 2)} + ${round(lineYX.beta, 2)} \\times 0{,}75 = ${round(estimacion, 2)} \\text{ M€}`} />
          </CardContent>
        </Card>

        <ResultCard label="Facturación estimada para 750k€ en TICs" value={`${round(estimacion, 2)} M€ (${round(estimacion * 1000000, 0).toLocaleString("es-ES")} euros)`} />

        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-rose-800 dark:text-rose-200">Fiabilidad de la estimación</p>
            <FormulaDisplay math={`R^2 = r^2 = ${round(r, 4)}^2 = ${round(R2, 4)}`} />
            <p className="text-muted-foreground">
              El modelo explica solo el <strong>{round(R2 * 100, 2)}%</strong> de la variación.
              Además, x = 0,75 está <strong>muy lejos</strong> de la media (<InlineMath math={`\\bar{x} = ${xMeanTICs}`} />),
              lo que implica <strong>extrapolación</strong>. La estimación es poco fiable.
            </p>
          </CardContent>
        </Card>
      </StepCard>
    </ExerciseLayout>
  );
}
