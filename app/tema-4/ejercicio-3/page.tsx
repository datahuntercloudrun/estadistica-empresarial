"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { round } from "@/lib/stats/descriptive";

// Datos: r = 0.6, sx = 3, ȳ = 2, recta X/Y: x = 0.15y
// La recta X/Y es: x̂(y) = α' + β'y → α' = 0, β' = 0.15
const r = 0.6;
const sx = 3;
const yMean = 2;
const betaPrimeXY = 0.15; // β' = sxy / sy²
const alphaPrimeXY = 0; // α' = x̄ - β'·ȳ → x̄ = α' + β'·ȳ

// De β' = sxy / sy² y r = sxy / (sx · sy):
// sxy = β' · sy²
// r = β' · sy² / (sx · sy) = β' · sy / sx
// 0.6 = 0.15 · sy / 3 → sy = 0.6 · 3 / 0.15 = 12
const sy = (r * sx) / betaPrimeXY;

// sxy = β' · sy² = 0.15 · 144 = 21.6
const sxy = betaPrimeXY * sy * sy;

// x̄ = α' + β' · ȳ = 0 + 0.15 · 2 = 0.3
const xMean = alphaPrimeXY + betaPrimeXY * yMean;

// Recta Y/X: β = sxy / sx² = 21.6 / 9 = 2.4
const sx2 = sx * sx;
const betaYX = sxy / sx2;
const alphaYX = yMean - betaYX * xMean;

export default function Ejercicio3() {
  return (
    <ExerciseLayout
      tema={4}
      exerciseNumber={3}
      title="Rectas de Regresión a Partir de Datos"
      difficulty="Medio"
      category="Regresión y correlación"
      statement={
        <div className="space-y-2">
          <p>Sabiendo que <InlineMath math="r = 0{,}6" />, <InlineMath math="s_x = 3" />, <InlineMath math="\bar{y} = 2" /> y que la recta de regresión de X sobre Y es <InlineMath math="x = 0{,}15y" />, determine:</p>
          <ul className="list-disc list-inside">
            <li>La recta de regresión de Y sobre X</li>
            <li><InlineMath math="s_{xy}" /></li>
            <li><InlineMath math="\bar{x}" /></li>
            <li><InlineMath math="s_y" /></li>
          </ul>
        </div>
      }
      prevUrl="/tema-4/ejercicio-2"
      nextUrl="/tema-4/ejercicio-4"
    >
      {/* PASO 1 */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender?" variant="explanation">
        <p>
          Este ejercicio es de <strong>ingeniería inversa</strong>: en lugar de calcular todo desde los datos originales,
          nos dan algunos resultados y tenemos que deducir el resto. Es un ejercicio clave para entender
          las <strong>relaciones entre fórmulas</strong>.
        </p>
        <Card className="bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-teal-800 dark:text-teal-200">Lo que tenemos vs lo que buscamos</p>
            <div className="grid grid-cols-2 gap-2 mt-1 text-muted-foreground">
              <div><strong>Conocido:</strong> r, sx, ȳ, recta X/Y</div>
              <div><strong>Buscar:</strong> recta Y/X, sxy, x̄, sy</div>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* PASO 2: Extraer info de la recta X/Y */}
      <StepCard stepNumber={2} title="Extraer información de la recta X/Y" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Identificar los coeficientes</p>
            <p className="text-muted-foreground">
              La recta X/Y tiene la forma: <InlineMath math="\hat{x}(y) = \alpha' + \beta' y" />
            </p>
            <p className="text-muted-foreground">
              Nos dicen que <InlineMath math="x = 0{,}15y" />, así que:
            </p>
            <FormulaDisplay math={`\\alpha' = 0 \\quad ; \\quad \\beta' = 0{,}15`} />
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Recordar las fórmulas de la recta X/Y</p>
            <FormulaDisplay math={`\\beta' = \\frac{s_{xy}}{s_y^2} \\qquad \\alpha' = \\bar{x} - \\beta' \\cdot \\bar{y}`} />
          </CardContent>
        </Card>
      </StepCard>

      {/* PASO 3: Encontrar sy */}
      <StepCard stepNumber={3} title="Encontrar sy" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Usar la relación entre r, β' y las desviaciones</p>
            <p className="text-muted-foreground">
              Sabemos que <InlineMath math="r = \frac{s_{xy}}{s_x \cdot s_y}" /> y que <InlineMath math="\beta' = \frac{s_{xy}}{s_y^2}" />.
            </p>
            <p className="text-muted-foreground">
              De <InlineMath math="\beta'" /> despejamos: <InlineMath math="s_{xy} = \beta' \cdot s_y^2" />. Sustituyendo en r:
            </p>
            <FormulaDisplay math={`r = \\frac{\\beta' \\cdot s_y^2}{s_x \\cdot s_y} = \\frac{\\beta' \\cdot s_y}{s_x}`} />
            <p className="text-muted-foreground">Despejamos <InlineMath math="s_y" />:</p>
            <FormulaDisplay math={`s_y = \\frac{r \\cdot s_x}{\\beta'} = \\frac{0{,}6 \\times 3}{0{,}15} = \\frac{1{,}8}{0{,}15} = ${round(sy, 2)}`} />
          </CardContent>
        </Card>
        <ResultCard label="Desviación típica de Y" value={`sy = ${round(sy, 2)}`} />
      </StepCard>

      {/* PASO 4: Encontrar sxy */}
      <StepCard stepNumber={4} title="Encontrar sxy" variant="calculation">
        <FormulaDisplay math={`s_{xy} = \\beta' \\cdot s_y^2 = 0{,}15 \\times ${round(sy, 2)}^2 = 0{,}15 \\times ${round(sy * sy, 2)} = ${round(sxy, 2)}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="text-muted-foreground">
              <strong>Verificación:</strong> <InlineMath math={`r = \\frac{s_{xy}}{s_x \\cdot s_y} = \\frac{${round(sxy, 2)}}{3 \\times ${round(sy, 2)}} = \\frac{${round(sxy, 2)}}{${round(sx * sy, 2)}} = ${round(r, 2)}`} /> ✓
            </p>
          </CardContent>
        </Card>
        <ResultCard label="Covarianza" value={`sxy = ${round(sxy, 2)}`} />
      </StepCard>

      {/* PASO 5: Encontrar x̄ */}
      <StepCard stepNumber={5} title="Encontrar x̄" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Usar la ordenada en el origen de la recta X/Y</p>
            <FormulaDisplay math={`\\alpha' = \\bar{x} - \\beta' \\cdot \\bar{y}`} />
            <FormulaDisplay math={`\\bar{x} = \\alpha' + \\beta' \\cdot \\bar{y} = 0 + 0{,}15 \\times 2 = ${round(xMean, 2)}`} />
          </CardContent>
        </Card>
        <ResultCard label="Media de X" value={`x̄ = ${round(xMean, 2)}`} />
      </StepCard>

      {/* PASO 6: Recta Y/X */}
      <StepCard stepNumber={6} title="Recta de regresión de Y sobre X" variant="result">
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-3 text-sm space-y-2">
            <FormulaDisplay math={`\\beta = \\frac{s_{xy}}{s_x^2} = \\frac{${round(sxy, 2)}}{${round(sx2, 2)}} = ${round(betaYX, 4)}`} />
            <FormulaDisplay math={`\\alpha = \\bar{y} - \\beta \\cdot \\bar{x} = ${round(yMean, 2)} - ${round(betaYX, 4)} \\times ${round(xMean, 2)} = ${round(alphaYX, 4)}`} />
            <FormulaDisplay math={`\\boxed{\\hat{y}(x) = ${round(alphaYX, 4)} + ${round(betaYX, 4)}x}`} />
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Resumen completo</p>
            <div className="grid grid-cols-2 gap-2 mt-1 text-muted-foreground">
              <p><InlineMath math={`\\bar{x} = ${round(xMean, 2)}`} /></p>
              <p><InlineMath math={`s_y = ${round(sy, 2)}`} /></p>
              <p><InlineMath math={`s_{xy} = ${round(sxy, 2)}`} /></p>
              <p><InlineMath math={`r = ${round(r, 2)}`} /></p>
            </div>
          </CardContent>
        </Card>

        <ResultCard label="Recta Y/X" value={`ŷ(x) = ${round(alphaYX, 4)} + ${round(betaYX, 4)}x`} />
      </StepCard>
    </ExerciseLayout>
  );
}
