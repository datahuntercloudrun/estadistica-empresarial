"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
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
// Varianza con fórmula: s²_new = (n1*(s²_1 + (x̄_1 - x̄_new)²) + n2*(0 + (5 - x̄_new)²)) / newN
// Como las nuevas observaciones son todas 5, su varianza interna es 0, y su media es 5
// x̄_new = (100*5 + 20*5) / 120 = 5 (no cambia)
const newVar = (n1 * (var1 + (mean1 - newMean) ** 2) + n2 * (0 + (val2 - newMean) ** 2)) / newN;
const newStd = Math.sqrt(newVar);
const newCV = (newStd / Math.abs(newMean)) * 100;

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
      <StepCard stepNumber={1} title="Datos iniciales" variant="explanation">
        <FormulaDisplay math={`n_1 = 100, \\quad \\bar{x}_1 = 5, \\quad s_1^2 = 15`} />
        <FormulaDisplay math={`\\text{Se añaden } n_2 = 20 \\text{ observaciones, todas con valor } x = 5`} />
      </StepCard>

      <StepCard stepNumber={2} title="Nueva media" variant="calculation">
        <p>Como todas las nuevas observaciones valen 5 (igual que la media original):</p>
        <FormulaDisplay math={`\\bar{x}_{new} = \\frac{n_1 \\cdot \\bar{x}_1 + n_2 \\cdot 5}{n_1 + n_2} = \\frac{100 \\cdot 5 + 20 \\cdot 5}{120} = \\frac{600}{120} = 5`} />
        <ResultCard label="Nueva media" value="5 (no cambia)" />
      </StepCard>

      <StepCard stepNumber={3} title="Nueva varianza" variant="calculation">
        <p>Usamos la fórmula de combinación de varianzas. Las 20 nuevas observaciones tienen varianza interna = 0 (todas son iguales) y media = 5:</p>
        <FormulaDisplay math={`s_{new}^2 = \\frac{n_1 \\cdot [s_1^2 + (\\bar{x}_1 - \\bar{x}_{new})^2] + n_2 \\cdot [s_2^2 + (\\bar{x}_2 - \\bar{x}_{new})^2]}{n_1 + n_2}`} />
        <FormulaDisplay math={`s_{new}^2 = \\frac{100 \\cdot [15 + (5-5)^2] + 20 \\cdot [0 + (5-5)^2]}{120}`} />
        <FormulaDisplay math={`s_{new}^2 = \\frac{100 \\cdot 15 + 20 \\cdot 0}{120} = \\frac{1500}{120} = ${round(newVar, 2)}`} />
        <ResultCard label="Nueva varianza" value={`${round(newVar, 2)}`} />
      </StepCard>

      <StepCard stepNumber={4} title="Nuevo coeficiente de variación" variant="result">
        <FormulaDisplay math={`s_{new} = \\sqrt{${round(newVar, 2)}} = ${round(newStd, 4)}`} />
        <FormulaDisplay math={`CV_{new} = \\frac{s_{new}}{|\\bar{x}_{new}|} \\times 100 = \\frac{${round(newStd, 4)}}{5} \\times 100 = ${round(newCV, 2)}\\%`} />
        <ResultCard label="Nuevo CV" value={`${round(newCV, 2)}%`} />
        <p className="text-sm text-muted-foreground">
          <strong>Interpretación:</strong> Al añadir observaciones iguales a la media, la varianza disminuye
          (de 15 a {round(newVar, 2)}) y el CV también baja
          (de {round((Math.sqrt(15) / 5) * 100, 2)}% a {round(newCV, 2)}%), haciendo la media más representativa.
        </p>
      </StepCard>
    </ExerciseLayout>
  );
}
