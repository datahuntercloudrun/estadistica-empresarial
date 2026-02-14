"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BoxPlot } from "@/components/charts/box-plot";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mean, median, mode, variance, stdDev, cv, range, round } from "@/lib/stats/descriptive";
import { quartile, percentile } from "@/lib/stats/position";

const rawData = [
  19.3, 20.5, 17.9, 17.3, 17.1, 15.8, 16.9, 17.1, 19.5, 22.5,
  20.7, 18.5, 22.5, 19.1, 17.9, 18.4, 18.7, 18.8, 17.5, 17.9,
  14.9, 12.3, 19.4, 16.8, 20.1, 17.3, 18.0, 19.5, 17.4, 16.3,
];

const sorted = [...rawData].sort((a, b) => a - b);
const m = mean(rawData);
const med = median(rawData);
const mod = mode(rawData);
const v = variance(rawData);
const s = stdDev(rawData);
const cvVal = cv(rawData);
const r = range(rawData);
const q1 = quartile(rawData, 1);
const q3 = quartile(rawData, 3);
const p45 = percentile(rawData, 45);
const p78 = percentile(rawData, 78);

export default function Ejercicio3() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={3}
      title="Análisis Completo de Cifras de Ventas"
      difficulty="Medio-Alto"
      category="Medidas de centralización, dispersión y posición"
      statement={
        <div className="space-y-2">
          <p>Las cifras de ventas (en miles de €) de una empresa durante 30 semanas:</p>
          <div className="overflow-x-auto">
            <div className="bg-white p-2 rounded text-xs font-mono grid grid-cols-5 sm:grid-cols-10 gap-1">
              {rawData.map((d, i) => <span key={i} className="text-center">{d}</span>)}
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Media, mediana y moda</li>
            <li>b) Varianza, desviación típica, coeficiente de variación y recorrido</li>
            <li>c) Primer y tercer cuartil, percentiles 45 y 78</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-2"
      nextUrl="/tema-3/ejercicio-4"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este es un ejercicio <strong>completo de análisis descriptivo</strong>. Vamos a responder tres grandes preguntas sobre los datos de ventas:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 text-blue-800 text-[10px]">a) Centralización</Badge>
              <p className="text-xs text-muted-foreground">&quot;¿Cuál es el valor típico de las ventas?&quot;</p>
              <p className="text-[10px]">→ Media, mediana, moda</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 text-emerald-800 text-[10px]">b) Dispersión</Badge>
              <p className="text-xs text-muted-foreground">&quot;¿Cuánto varían las ventas?&quot;</p>
              <p className="text-[10px]">→ Varianza, σ, CV, recorrido</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 text-violet-800 text-[10px]">c) Posición</Badge>
              <p className="text-xs text-muted-foreground">&quot;¿Dónde se sitúa un valor concreto?&quot;</p>
              <p className="text-[10px]">→ Cuartiles, percentiles</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 1: Datos ordenados ============ */}
      <StepCard stepNumber={2} title="Primer paso: ordenar los datos" variant="explanation">
        <Card className="bg-gray-50 border mb-2">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Por qué ordenar primero?</p>
            <p className="text-muted-foreground">
              Muchas medidas (mediana, cuartiles, percentiles) necesitan que los datos estén ordenados.
              Es el primer paso en cualquier análisis descriptivo.
            </p>
          </CardContent>
        </Card>
        <p className="text-xs font-mono bg-gray-50 p-2 rounded leading-relaxed">
          {sorted.map((v) => `${v}`).join(", ")}
        </p>
        <p className="text-xs text-muted-foreground mt-1">n = {rawData.length} semanas. Rango: desde {sorted[0]} hasta {sorted[sorted.length - 1]} miles €.</p>
      </StepCard>

      {/* ============ PASO 2: Media aritmética ============ */}
      <StepCard stepNumber={3} title="a) Media aritmética" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">¿Qué pregunta responde la media?</p>
            <p className="text-muted-foreground">
              &quot;Si repartiéramos todas las ventas equitativamente entre las 30 semanas, ¿cuánto correspondería a cada una?&quot;
            </p>
            <FormulaDisplay math={`\\bar{x} = \\frac{\\text{suma de todos los valores}}{\\text{número de datos}} = \\frac{\\sum x_i}{n}`} />
          </CardContent>
        </Card>
        <FormulaDisplay math={`\\bar{x} = \\frac{${rawData.reduce((s, x) => s + x, 0).toFixed(1)}}{${rawData.length}} = ${round(m, 4)} \\text{ miles €}`} />
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>Interpretación:</strong> En promedio, la empresa vendió {round(m, 2)} miles de euros por semana. Esto son {round(m * 1000, 0)}€ semanales.</p>
          </CardContent>
        </Card>
        <ResultCard label="Media" value={`${round(m, 4)} miles €`} />
      </StepCard>

      {/* ============ PASO 3: Mediana ============ */}
      <StepCard stepNumber={4} title="a) Mediana" variant="calculation">
        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-emerald-800">¿Qué pregunta responde la mediana?</p>
            <p className="text-muted-foreground">
              &quot;¿Cuál es el valor que deja exactamente la mitad de las semanas por debajo y la mitad por encima?&quot;
              Con n={rawData.length} (par), tomamos la media de los valores en posiciones 15 y 16.
            </p>
          </CardContent>
        </Card>
        <FormulaDisplay math={`\\text{Posición} = \\frac{n+1}{2} = \\frac{31}{2} = 15{,}5`} />
        <FormulaDisplay math={`Me = \\frac{x_{(15)} + x_{(16)}}{2} = \\frac{${sorted[14]} + ${sorted[15]}}{2} = ${round(med, 2)} \\text{ miles €}`} />
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>Interpretación:</strong> La mitad de las semanas se vendió menos de {round(med, 2)} miles € y la otra mitad más. La mediana ({round(med, 2)}) es cercana a la media ({round(m, 2)}), lo que sugiere una distribución bastante simétrica.</p>
          </CardContent>
        </Card>
        <ResultCard label="Mediana" value={`${round(med, 2)} miles €`} />
      </StepCard>

      {/* ============ PASO 4: Moda ============ */}
      <StepCard stepNumber={5} title="a) Moda" variant="calculation">
        <Card className="bg-violet-50 border-violet-200 mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-violet-800">¿Qué pregunta responde la moda?</p>
            <p className="text-muted-foreground">
              &quot;¿Cuál es la cifra de ventas que más se repite?&quot; Con datos continuos como estos,
              es habitual que la moda sea poco representativa porque muchos valores son únicos.
            </p>
          </CardContent>
        </Card>
        <FormulaDisplay math={`Mo = ${mod.join(", ")} \\text{ miles €}`} />
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>Interpretación:</strong> Los valores {mod.join(", ")} son los que más se repiten.
            Con datos continuos, es frecuente tener varias modas o que la moda sea poco informativa.
            En este caso, es más útil fijarse en la media y la mediana.</p>
          </CardContent>
        </Card>
        <ResultCard label="Moda" value={`${mod.join(", ")} miles €`} />
      </StepCard>

      {/* ============ PASO 5: Varianza y desviación típica ============ */}
      <StepCard stepNumber={6} title="b) Varianza y desviación típica" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Qué preguntas responden estas medidas?</p>
            <p className="text-muted-foreground">
              &quot;¿Cuánto se alejan las ventas semanales del promedio?&quot;
            </p>
            <p className="font-semibold text-blue-800">La varianza (s²): el promedio de las desviaciones al cuadrado</p>
            <FormulaDisplay math={`s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n}`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="(x_i - \bar{x})" /> = cuánto se desvía cada dato de la media (su &quot;error&quot;)</p>
              <p><InlineMath math="(x_i - \bar{x})^2" /> = elevamos al cuadrado para que los errores negativos y positivos no se cancelen</p>
              <p><InlineMath math="\frac{\sum}{n}" /> = hacemos el promedio de estos errores cuadráticos</p>
            </div>
            <p className="font-semibold text-blue-800 mt-2">La desviación típica (s): la raíz de la varianza</p>
            <FormulaDisplay math={`s = \\sqrt{s^2}`} />
            <p className="text-muted-foreground">
              <strong>¿Por qué la raíz?</strong> La varianza está en &quot;unidades al cuadrado&quot; (miles €)², lo cual no es intuitivo.
              La raíz la devuelve a las unidades originales (miles €), haciéndola más interpretable.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n} = ${round(v, 4)} \\text{ (miles €)}^2`} />
        <FormulaDisplay math={`s = \\sqrt{${round(v, 4)}} = ${round(s, 4)} \\text{ miles €}`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>Interpretación:</strong> Las ventas semanales se desvían, en promedio, unos ±{round(s, 2)} miles € respecto a la media de {round(m, 2)}.
            Es decir, la mayoría de semanas se vendió entre {round(m - s, 1)} y {round(m + s, 1)} miles €.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <ResultCard label="Varianza" value={`${round(v, 4)} (miles €)²`} />
          <ResultCard label="Desviación típica" value={`${round(s, 4)} miles €`} />
        </div>
      </StepCard>

      {/* ============ PASO 6: CV y Recorrido ============ */}
      <StepCard stepNumber={7} title="b) Coeficiente de variación y recorrido" variant="calculation">
        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">Coeficiente de Variación (CV)</p>
            <p className="text-muted-foreground">
              &quot;¿Qué porcentaje de la media representa la desviación?&quot; Mide la dispersión relativa.
              Si CV &lt; 50%, la media se considera representativa.
            </p>
            <FormulaDisplay math={`CV = \\frac{s}{|\\bar{x}|} \\times 100`} />
            <p className="font-semibold text-emerald-800 mt-2">Recorrido (Re)</p>
            <p className="text-muted-foreground">
              La medida de dispersión más simple: la diferencia entre el valor mayor y el menor.
              Es muy sensible a valores extremos.
            </p>
            <FormulaDisplay math={`Re = x_{max} - x_{min}`} />
          </CardContent>
        </Card>

        <FormulaDisplay math={`CV = \\frac{${round(s, 4)}}{${round(m, 4)}} \\times 100 = ${round(cvVal, 2)}\\%`} />
        <FormulaDisplay math={`Re = ${Math.max(...rawData)} - ${Math.min(...rawData)} = ${round(r, 1)} \\text{ miles €}`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs space-y-1">
            <p><strong>CV = {round(cvVal, 2)}%:</strong> Como es menor que 50%, la media ({round(m, 2)} miles €) es representativa de las ventas semanales. Los datos son relativamente homogéneos.</p>
            <p><strong>Recorrido = {round(r, 1)} miles €:</strong> La diferencia entre la mejor y peor semana es de {round(r * 1000, 0)}€.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <ResultCard label="Coeficiente de variación" value={`${round(cvVal, 2)}%`} />
          <ResultCard label="Recorrido" value={`${round(r, 1)} miles €`} />
        </div>
      </StepCard>

      {/* ============ PASO 7: Cuartiles y percentiles ============ */}
      <StepCard stepNumber={8} title="c) Cuartiles y percentiles" variant="calculation">
        <Card className="bg-violet-50 border-violet-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-violet-800">¿Qué son los cuartiles y percentiles?</p>
            <p className="text-muted-foreground">
              Son valores que <strong>dividen los datos ordenados en partes iguales</strong>.
              Responden a la pregunta: &quot;¿por debajo de qué valor está el X% de los datos?&quot;
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-xs">Cuartiles (Q)</p>
                <p className="text-[10px] text-muted-foreground">Dividen en 4 partes iguales (25% cada una)</p>
                <p className="text-[10px]"><InlineMath math="Q_1" />: 25% por debajo | <InlineMath math="Q_3" />: 75% por debajo</p>
              </div>
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-xs">Percentiles (P)</p>
                <p className="text-[10px] text-muted-foreground">Dividen en 100 partes iguales (1% cada una)</p>
                <p className="text-[10px]"><InlineMath math="P_{45}" />: 45% por debajo | <InlineMath math="P_{78}" />: 78% por debajo</p>
              </div>
            </div>
            <p className="font-semibold text-violet-800 mt-2">¿Cómo se calculan?</p>
            <div className="bg-white rounded p-2 space-y-1">
              <p><strong>Paso 1:</strong> Calcula la posición: <InlineMath math="k \cdot (n+1) / 4" /> para cuartiles o <InlineMath math="p \cdot (n+1) / 100" /> para percentiles.</p>
              <p><strong>Paso 2:</strong> Si la posición es entera, el cuartil/percentil es ese valor. Si no, interpolamos entre los dos valores adyacentes.</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 text-xs space-y-1">
              <p className="font-semibold text-blue-800">Primer cuartil (Q₁): &quot;¿por debajo de qué valor está el 25% de las semanas?&quot;</p>
              <FormulaDisplay math={`Q_1: \\text{posición} = \\frac{n+1}{4} = \\frac{31}{4} = 7{,}75 \\implies Q_1 = ${round(q1, 2)}`} />
              <p className="text-muted-foreground">El 25% de las semanas tuvo ventas ≤ {round(q1, 2)} miles €.</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 text-xs space-y-1">
              <p className="font-semibold text-blue-800">Tercer cuartil (Q₃): &quot;¿por debajo de qué valor está el 75%?&quot;</p>
              <FormulaDisplay math={`Q_3: \\text{posición} = \\frac{3(n+1)}{4} = \\frac{93}{4} = 23{,}25 \\implies Q_3 = ${round(q3, 2)}`} />
              <p className="text-muted-foreground">El 75% de las semanas tuvo ventas ≤ {round(q3, 2)} miles €. O equivalentemente, el 25% mejor superó este valor.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 text-xs space-y-1">
              <p className="font-semibold text-emerald-800">Percentil 45 (P₄₅): &quot;¿por debajo de qué valor está el 45%?&quot;</p>
              <FormulaDisplay math={`P_{45}: \\text{posición} = \\frac{45 \\cdot 31}{100} = 13{,}95 \\implies P_{45} = ${round(p45, 2)}`} />
              <p className="text-muted-foreground">El 45% de las semanas vendió menos de {round(p45, 2)} miles €.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 text-xs space-y-1">
              <p className="font-semibold text-emerald-800">Percentil 78 (P₇₈): &quot;¿por debajo de qué valor está el 78%?&quot;</p>
              <FormulaDisplay math={`P_{78}: \\text{posición} = \\frac{78 \\cdot 31}{100} = 24{,}18 \\implies P_{78} = ${round(p78, 2)}`} />
              <p className="text-muted-foreground">El 78% de las semanas vendió menos de {round(p78, 2)} miles €.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          <ResultCard label="Q1" value={`${round(q1, 2)} miles €`} />
          <ResultCard label="Q3" value={`${round(q3, 2)} miles €`} />
          <ResultCard label="P45" value={`${round(p45, 2)} miles €`} />
          <ResultCard label="P78" value={`${round(p78, 2)} miles €`} />
        </div>
      </StepCard>

      {/* ============ PASO 8: Boxplot ============ */}
      <StepCard stepNumber={9} title="Diagrama de caja (Boxplot)" variant="explanation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Para qué sirve el boxplot?</p>
            <p className="text-muted-foreground">
              Resume visualmente toda la información anterior: la mediana (línea central),
              los cuartiles (bordes de la caja), el recorrido (bigotes) y posibles valores atípicos.
              La caja central contiene el <strong>50% de los datos</strong>.
            </p>
          </CardContent>
        </Card>
        <BoxPlot
          min={Math.min(...rawData)}
          q1={round(q1, 2)}
          median={round(med, 2)}
          q3={round(q3, 2)}
          max={Math.max(...rawData)}
          title="Diagrama de caja - Ventas semanales (miles €)"
          label="Ventas (miles €)"
        />
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>Lectura del boxplot:</strong> La caja va de Q₁={round(q1, 2)} a Q₃={round(q3, 2)} → el 50% central de las semanas vendió entre {round(q1, 2)} y {round(q3, 2)} miles €. La mediana ({round(med, 2)}) está centrada en la caja, confirmando una distribución bastante simétrica.</p>
          </CardContent>
        </Card>
      </StepCard>
    </ExerciseLayout>
  );
}
