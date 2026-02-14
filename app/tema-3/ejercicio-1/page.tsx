"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BarChartCustom } from "@/components/charts/bar-chart-custom";

// Datos
const tuboA = { media: 1495, sigma: 280 };
const tuboB = { media: 1875, sigma: 310 };
const cvA = (tuboA.sigma / tuboA.media) * 100;
const cvB = (tuboB.sigma / tuboB.media) * 100;

export default function Ejercicio1() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={1}
      title="Comparación de Dispersión en Tubos de TV"
      difficulty="Bajo"
      category="Medidas de dispersión"
      statement={
        <div className="space-y-2">
          <p>Un fabricante de tubos de televisión produce dos tipos de tubos, A y B.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Tubo A: media = 1.495 h, desviación típica = 280 h</li>
            <li>Tubo B: media = 1.875 h, desviación típica = 310 h</li>
          </ul>
          <p>Determine:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) ¿Qué tubo tiene mayor dispersión absoluta?</li>
            <li>b) ¿Qué tubo tiene mayor dispersión relativa?</li>
          </ul>
        </div>
      }
      prevUrl="/tema-2/complementario-2"
      nextUrl="/tema-3/ejercicio-2"
    >
      <StepCard stepNumber={1} title="a) Dispersión absoluta" variant="calculation">
        <p>La <strong>dispersión absoluta</strong> se mide con la desviación típica (σ):</p>
        <FormulaDisplay math={`\\sigma_A = 280 \\text{ h} \\quad \\text{vs} \\quad \\sigma_B = 310 \\text{ h}`} />
        <FormulaDisplay math={`\\sigma_B > \\sigma_A \\implies \\text{B tiene mayor dispersión absoluta}`} />
        <ResultCard label="Mayor dispersión absoluta" value="Tubo B (σ = 310 h > 280 h)" />
      </StepCard>

      <StepCard stepNumber={2} title="b) Dispersión relativa" variant="calculation">
        <p>La <strong>dispersión relativa</strong> se mide con el coeficiente de variación (CV), que permite comparar distribuciones con medias diferentes:</p>
        <FormulaDisplay math={`CV = \\frac{\\sigma}{|\\bar{x}|} \\times 100`} />
        <FormulaDisplay math={`CV_A = \\frac{280}{1495} \\times 100 = ${cvA.toFixed(2)}\\%`} />
        <FormulaDisplay math={`CV_B = \\frac{310}{1875} \\times 100 = ${cvB.toFixed(2)}\\%`} />
        <FormulaDisplay math={`CV_A = ${cvA.toFixed(2)}\\% > CV_B = ${cvB.toFixed(2)}\\%`} />
        <ResultCard label="Mayor dispersión relativa" value={`Tubo A (CV = ${cvA.toFixed(2)}% > ${cvB.toFixed(2)}%)`} />
      </StepCard>

      <StepCard stepNumber={3} title="Comparación visual" variant="explanation">
        <BarChartCustom
          data={[
            { name: "Tubo A", value: cvA, color: "hsl(var(--chart-1))" },
            { name: "Tubo B", value: cvB, color: "hsl(var(--chart-2))" },
          ]}
          title="Coeficiente de Variación (%)"
          yLabel="CV (%)"
        />
        <p className="text-xs text-muted-foreground mt-2">
          <strong>Conclusión:</strong> Aunque el tubo B tiene mayor dispersión absoluta (σ=310 &gt; 280),
          el tubo A tiene mayor dispersión relativa (CV=18.73% &gt; 16.53%) porque su media es menor.
          Esto significa que la media del tubo A es menos representativa.
        </p>
      </StepCard>
    </ExerciseLayout>
  );
}
