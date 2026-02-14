"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { round, mean, variance, stdDev, cv } from "@/lib/stats/descriptive";

// Datos: {-10, 3, x, 10, 1, 0}, σ = CV (en valor, no en porcentaje)
// CV de Pearson = σ / |x̄|
// Si σ = CV → σ = σ / |x̄| → |x̄| = 1 → x̄ = 1 o x̄ = -1
// Suma = -10 + 3 + x + 10 + 1 + 0 = 4 + x
// x̄ = (4 + x) / 6

// Si x̄ = 1: (4 + x)/6 = 1 → 4 + x = 6 → x = 2
// Si x̄ = -1: (4 + x)/6 = -1 → 4 + x = -6 → x = -10

// Verificamos x = 2:
const data1 = [-10, 3, 2, 10, 1, 0];
const mean1 = mean(data1);
const std1 = stdDev(data1);
const cv1 = std1 / Math.abs(mean1); // CV como cociente, no porcentaje

// Verificamos x = -10:
const data2 = [-10, 3, -10, 10, 1, 0];
const mean2 = mean(data2);
const std2 = stdDev(data2);
// cv2 = std2 / |mean2| - pero mean2 = -6/6 = -1, so |mean2| = 1
const cv2 = std2 / Math.abs(mean2);

export default function Complementario3() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber="C3"
      title="Relación entre Desviación Típica y CV"
      difficulty="Medio"
      category="Propiedades de medidas de dispersión"
      statement={
        <div className="space-y-2">
          <p>Dada la serie de datos &#123;-10, 3, x, 10, 1, 0&#125;, se sabe que su desviación típica es igual a su coeficiente de variación de Pearson.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) El valor de x</li>
            <li>b) La media de los seis valores</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/complementario-2"
    >
      <StepCard stepNumber={1} title="Planteamiento algebraico" variant="explanation">
        <p>El coeficiente de variación de Pearson es:</p>
        <FormulaDisplay math={`CV = \\frac{\\sigma}{|\\bar{x}|}`} />
        <p>Si σ = CV, entonces:</p>
        <FormulaDisplay math={`\\sigma = \\frac{\\sigma}{|\\bar{x}|}`} />
        <p>Simplificando (σ ≠ 0):</p>
        <FormulaDisplay math={`1 = \\frac{1}{|\\bar{x}|} \\implies |\\bar{x}| = 1 \\implies \\bar{x} = 1 \\text{ o } \\bar{x} = -1`} />
      </StepCard>

      <StepCard stepNumber={2} title="Calcular la suma de datos" variant="calculation">
        <FormulaDisplay math={`\\sum x_i = -10 + 3 + x + 10 + 1 + 0 = 4 + x`} />
        <FormulaDisplay math={`\\bar{x} = \\frac{4 + x}{6}`} />
      </StepCard>

      <StepCard stepNumber={3} title="Caso 1: x̄ = 1" variant="calculation">
        <FormulaDisplay math={`\\frac{4 + x}{6} = 1 \\implies 4 + x = 6 \\implies x = 2`} />
        <p>Verificamos: datos = &#123;-10, 3, 2, 10, 1, 0&#125;</p>
        <FormulaDisplay math={`\\bar{x} = \\frac{-10+3+2+10+1+0}{6} = \\frac{6}{6} = 1 \\checkmark`} />
        <FormulaDisplay math={`\\sigma = ${round(std1, 4)}`} />
        <FormulaDisplay math={`CV = \\frac{${round(std1, 4)}}{|1|} = ${round(cv1, 4)}`} />
        <FormulaDisplay math={`\\sigma = ${round(std1, 4)} = CV = ${round(cv1, 4)} \\checkmark`} />
      </StepCard>

      <StepCard stepNumber={4} title="Caso 2: x̄ = -1" variant="calculation">
        <FormulaDisplay math={`\\frac{4 + x}{6} = -1 \\implies 4 + x = -6 \\implies x = -10`} />
        <p>Verificamos: datos = &#123;-10, 3, -10, 10, 1, 0&#125;</p>
        <FormulaDisplay math={`\\bar{x} = \\frac{-10+3+(-10)+10+1+0}{6} = \\frac{-6}{6} = -1 \\checkmark`} />
        <FormulaDisplay math={`\\sigma = ${round(std2, 4)}`} />
        <FormulaDisplay math={`CV = \\frac{${round(std2, 4)}}{|-1|} = ${round(cv2, 4)}`} />
        <FormulaDisplay math={`\\sigma = ${round(std2, 4)} = CV = ${round(cv2, 4)} \\checkmark`} />
      </StepCard>

      <StepCard stepNumber={5} title="Soluciones" variant="result">
        <div className="space-y-3">
          <ResultCard label="Solución 1" value={`x = 2, media = 1`} />
          <ResultCard label="Solución 2" value={`x = -10, media = -1`} />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Ambas soluciones son matemáticamente válidas. La condición σ = CV se cumple cuando |x̄| = 1.
        </p>
      </StepCard>
    </ExerciseLayout>
  );
}
