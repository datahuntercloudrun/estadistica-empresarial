"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";

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
            <div className="bg-white dark:bg-gray-900 p-2 rounded text-sm font-mono grid grid-cols-5 sm:grid-cols-10 gap-1">
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
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-sm">a) Centralización</Badge>
              <p className="text-sm text-muted-foreground">&quot;¿Cuál es el valor típico de las ventas?&quot;</p>
              <p className="text-sm">→ Media, mediana, moda</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 text-sm">b) Dispersión</Badge>
              <p className="text-sm text-muted-foreground">&quot;¿Cuánto varían las ventas?&quot;</p>
              <p className="text-sm">→ Varianza, σ, CV, recorrido</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 text-violet-800 dark:text-violet-200 text-sm">c) Posición</Badge>
              <p className="text-sm text-muted-foreground">&quot;¿Dónde se sitúa un valor concreto?&quot;</p>
              <p className="text-sm">→ Cuartiles, percentiles</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 1: Datos ordenados ============ */}
      <StepCard stepNumber={2} title="Primer paso: ordenar los datos" variant="explanation">
        <Card className="bg-gray-50 dark:bg-gray-800 border mb-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">¿Por qué ordenar primero?</p>
            <p className="text-muted-foreground">
              Muchas medidas (mediana, cuartiles, percentiles) necesitan que los datos estén ordenados.
              Es el primer paso en cualquier análisis descriptivo.
            </p>
          </CardContent>
        </Card>
        <p className="text-sm font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded leading-relaxed">
          {sorted.map((v) => `${v}`).join(", ")}
        </p>
        <p className="text-sm text-muted-foreground mt-1">n = {rawData.length} semanas. Rango: desde {sorted[0]} hasta {sorted[sorted.length - 1]} miles €.</p>
      </StepCard>

      {/* ============ PASO 2: Media aritmética ============ */}
      <StepCard stepNumber={3} title="a) Media aritmética" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Qué pregunta responde la media?</p>
            <p className="text-muted-foreground">
              &quot;Si repartiéramos todas las ventas equitativamente entre las 30 semanas, ¿cuánto correspondería a cada una?&quot;
            </p>
            <FormulaDisplay math={`\\bar{x} = \\frac{\\text{suma de todos los valores}}{\\text{número de datos}} = \\frac{\\sum x_i}{n}`} />
          </CardContent>
        </Card>
        <FormulaDisplay math={`\\bar{x} = \\frac{${rawData.reduce((s, x) => s + x, 0).toFixed(1)}}{${rawData.length}} = ${round(m, 4)} \\text{ miles €}`} />
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Interpretación:</strong> En promedio, la empresa vendió {round(m, 2)} miles de euros por semana. Esto son {round(m * 1000, 0)}€ semanales.</p>
          </CardContent>
        </Card>
        <ResultCard label="Media" value={`${round(m, 4)} miles €`} />
      </StepCard>

      {/* ============ PASO 3: Mediana ============ */}
      <StepCard stepNumber={4} title="a) Mediana" variant="calculation">
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">¿Qué pregunta responde la mediana?</p>
            <p className="text-muted-foreground">
              &quot;¿Cuál es el valor que deja exactamente la mitad de las semanas por debajo y la mitad por encima?&quot;
            </p>
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">¿Por qué no usar la media directamente?</p>
            <p className="text-muted-foreground">
              La media es sensible a valores extremos. Si una semana se vendiera 100.000€, la media subiría
              enormemente, pero la mediana apenas cambiaría. Por eso la mediana es una medida <strong>robusta</strong>:
              refleja el centro &quot;real&quot; de los datos sin dejarse influir por extremos.
            </p>
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">¿Por qué promediamos dos valores cuando n es par?</p>
            <p className="text-muted-foreground">
              Con n = {rawData.length} datos (número <strong>par</strong>), no hay un dato exactamente en el centro.
              Hay 15 datos a cada lado, pero ninguno &quot;en medio&quot;. La solución: tomamos los dos valores centrales
              (posiciones 15 y 16) y calculamos su media. Así obtenemos un punto que realmente divide los datos en dos mitades iguales.
              Si n fuera impar (ej: 31), el dato central sería directamente el de la posición 16.
            </p>
          </CardContent>
        </Card>
        <FormulaDisplay math={`\\text{Posición} = \\frac{n+1}{2} = \\frac{31}{2} = 15{,}5`} />
        <FormulaDisplay math={`Me = \\frac{x_{(15)} + x_{(16)}}{2} = \\frac{${sorted[14]} + ${sorted[15]}}{2} = ${round(med, 2)} \\text{ miles €}`} />
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Interpretación:</strong> La mitad de las semanas se vendió menos de {round(med, 2)} miles € y la otra mitad más. La mediana ({round(med, 2)}) es cercana a la media ({round(m, 2)}), lo que sugiere una distribución bastante simétrica.</p>
          </CardContent>
        </Card>
        <ResultCard label="Mediana" value={`${round(med, 2)} miles €`} />
      </StepCard>

      {/* ============ PASO 4: Moda ============ */}
      <StepCard stepNumber={5} title="a) Moda" variant="calculation">
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-violet-800 dark:text-violet-200">¿Qué pregunta responde la moda?</p>
            <p className="text-muted-foreground">
              &quot;¿Cuál es la cifra de ventas que más se repite?&quot; Es la medida más intuitiva: el valor más &quot;popular&quot;.
            </p>
            <p className="font-semibold text-violet-800 dark:text-violet-200">¿Por qué la moda es problemática con datos continuos?</p>
            <p className="text-muted-foreground">
              Piensa en las alturas de 30 personas medidas con precisión de milímetros: 1.723m, 1.724m, 1.681m...
              Es muy raro que dos personas midan <em>exactamente</em> lo mismo. Lo mismo pasa con las ventas:
              al tener decimales, la probabilidad de que dos semanas vendan <em>exactamente</em> 17.9 miles € es baja.
              Si aparece una coincidencia, probablemente sea casualidad, no un patrón real.
            </p>
            <p className="text-muted-foreground">
              Por eso, con datos continuos, la moda es poco fiable como medida de centralización.
              Es más útil con datos <strong>discretos</strong> (ej: nº de hijos) o <strong>cualitativos</strong> (ej: color favorito),
              donde las repeticiones sí son significativas.
            </p>
          </CardContent>
        </Card>
        <FormulaDisplay math={`Mo = ${mod.join(", ")} \\text{ miles €}`} />
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p><strong>Interpretación:</strong> Los valores {mod.join(", ")} son los que más se repiten.
            Con datos continuos, es frecuente tener varias modas o que la moda sea poco informativa.
            En este caso, es más útil fijarse en la media y la mediana.</p>
          </CardContent>
        </Card>
        <ResultCard label="Moda" value={`${mod.join(", ")} miles €`} />
      </StepCard>

      {/* ============ PASO 5: Varianza y desviación típica ============ */}
      <StepCard stepNumber={6} title="b) Varianza y desviación típica" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Qué preguntas responden estas medidas?</p>
            <p className="text-muted-foreground">
              &quot;¿Cuánto se alejan las ventas semanales del promedio?&quot;
            </p>
            <p className="font-semibold text-blue-800 dark:text-blue-200">La varianza (s²): el promedio de las desviaciones al cuadrado</p>
            <FormulaDisplay math={`s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n}`} />
            <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
              <p><InlineMath math="(x_i - \bar{x})" /> = cuánto se desvía cada dato de la media (su &quot;error&quot;)</p>
              <p><InlineMath math="(x_i - \bar{x})^2" /> = elevamos al cuadrado para que los errores negativos y positivos no se cancelen</p>
              <p><InlineMath math="\frac{\sum}{n}" /> = hacemos el promedio de estos errores cuadráticos</p>
            </div>
            <p className="font-semibold text-blue-800 dark:text-blue-200 mt-2">La desviación típica (s): la raíz de la varianza</p>
            <FormulaDisplay math={`s = \\sqrt{s^2}`} />
            <p className="text-muted-foreground">
              <strong>¿Por qué la raíz?</strong> La varianza está en &quot;unidades al cuadrado&quot; (miles €)², lo cual no es intuitivo.
              La raíz la devuelve a las unidades originales (miles €), haciéndola más interpretable.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n} = ${round(v, 4)} \\text{ (miles €)}^2`} />
        <FormulaDisplay math={`s = \\sqrt{${round(v, 4)}} = ${round(s, 4)} \\text{ miles €}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
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
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">¿Por qué necesitamos el Coeficiente de Variación (CV)?</p>
            <p className="text-muted-foreground">
              La desviación típica (σ = {round(s, 2)} miles €) nos dice cuánto varían los datos, pero <strong>ese número solo
              tiene sentido si lo comparamos con la media</strong>. Ejemplo: una desviación de 2 miles € es &quot;mucha&quot;
              si la media es 5, pero &quot;poca&quot; si la media es 500. El CV resuelve esto: expresa la desviación
              como porcentaje de la media, creando una medida <strong>sin unidades</strong> que permite comparar
              distribuciones completamente distintas.
            </p>
            <FormulaDisplay math={`CV = \\frac{s}{|\\bar{x}|} \\times 100`} />
            <p className="text-muted-foreground">
              <strong>¿Por qué el umbral del 50%?</strong> Es una convención práctica: si la desviación es menos
              de la mitad de la media (CV &lt; 50%), los datos están suficientemente &quot;agrupados&quot; alrededor del centro
              como para que la media sea un buen resumen. Si CV &gt; 50%, la dispersión es tan grande que la media
              &quot;engaña&quot; — como decir que la temperatura media es 20°C cuando oscila entre -10°C y 50°C.
            </p>

            <p className="font-semibold text-emerald-800 dark:text-emerald-200 mt-2">¿Por qué el Recorrido (Re) es útil pero limitado?</p>
            <p className="text-muted-foreground">
              Es la medida de dispersión más simple: la diferencia entre el mayor y el menor valor.
              Su ventaja es que se entiende al instante. Su gran debilidad: <strong>depende solo de dos datos</strong>
              (el máximo y el mínimo), ignorando los otros 28.
            </p>
            <FormulaDisplay math={`Re = x_{max} - x_{min}`} />
            <p className="text-muted-foreground">
              <strong>Ejemplo de su sensibilidad:</strong> Si una sola semana hubiera vendido 50 miles € (un valor atípico),
              el recorrido saltaría de {round(r, 1)} a {round(50 - Math.min(...rawData), 1)} miles €, ¡una distorsión enorme!
              Mientras tanto, la desviación típica apenas cambiaría porque promedia <em>todos</em> los datos.
              Por eso el recorrido se usa como primera impresión, nunca como medida definitiva.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`CV = \\frac{${round(s, 4)}}{${round(m, 4)}} \\times 100 = ${round(cvVal, 2)}\\%`} />
        <FormulaDisplay math={`Re = ${Math.max(...rawData)} - ${Math.min(...rawData)} = ${round(r, 1)} \\text{ miles €}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm space-y-1">
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
        {/* --- Bloque conceptual --- */}
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-violet-800 dark:text-violet-200">¿Qué son los cuartiles y percentiles?</p>
            <p className="text-muted-foreground">
              Imagina que colocas las 30 semanas en una fila ordenada de menor a mayor venta.
              Los cuartiles y percentiles son <strong>marcas</strong> que te dicen: &quot;a esta altura de la fila,
              ya has dejado atrás el X% de los datos&quot;.
            </p>
            <p className="text-muted-foreground">
              Es como las marcas de un termómetro: no cambian los datos, pero te permiten
              <strong> situar cualquier semana</strong> en el contexto general. &quot;¿Fue buena semana?&quot;
              → Si está por encima de Q₃, estuvo en el top 25%.
            </p>
          </CardContent>
        </Card>

        {/* --- Comparación visual cuartiles vs percentiles --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Cuartiles (Q) — Cortan en 4 trozos</p>
              <p className="text-sm text-muted-foreground">Cada trozo tiene el 25% de los datos.</p>
              <div className="relative mt-2">
                {/* Barra continua */}
                <div className="flex items-center h-10 rounded-lg overflow-hidden">
                  <div className="flex-1 h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-semibold text-blue-700 dark:text-blue-300">25%</div>
                  <div className="flex-1 h-full bg-blue-200 dark:bg-blue-800/40 flex items-center justify-center text-sm font-semibold text-blue-700 dark:text-blue-300">25%</div>
                  <div className="flex-1 h-full bg-blue-300 flex items-center justify-center text-sm font-semibold text-blue-800 dark:text-blue-200">25%</div>
                  <div className="flex-1 h-full bg-blue-400 flex items-center justify-center text-sm font-semibold text-white">25%</div>
                </div>
                {/* Marcas de corte con líneas verticales */}
                <div className="absolute inset-0 flex">
                  <div className="flex-1 border-r-3 border-red-500" />
                  <div className="flex-1 border-r-3 border-red-500" />
                  <div className="flex-1 border-r-3 border-red-500" />
                  <div className="flex-1" />
                </div>
              </div>
              {/* Etiquetas de los cortes */}
              <div className="relative h-12 -mt-1">
                <div className="absolute left-0 text-center" style={{ transform: "translateX(-50%)" }}>
                  <p className="text-sm text-muted-foreground">Min</p>
                </div>
                <div className="absolute text-center" style={{ left: "25%", transform: "translateX(-50%)" }}>
                  <p className="text-sm font-bold text-red-600">Q₁</p>
                  <p className="text-sm text-muted-foreground">25%</p>
                </div>
                <div className="absolute text-center" style={{ left: "50%", transform: "translateX(-50%)" }}>
                  <p className="text-sm font-bold text-red-600">Q₂ = Me</p>
                  <p className="text-sm text-muted-foreground">50%</p>
                </div>
                <div className="absolute text-center" style={{ left: "75%", transform: "translateX(-50%)" }}>
                  <p className="text-sm font-bold text-red-600">Q₃</p>
                  <p className="text-sm text-muted-foreground">75%</p>
                </div>
                <div className="absolute right-0 text-center" style={{ transform: "translateX(50%)" }}>
                  <p className="text-sm text-muted-foreground">Max</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Percentiles (P) — Cortan en 100 trozos</p>
              <p className="text-sm text-muted-foreground">Cada trozo tiene el 1% de los datos. Máxima precisión.</p>
              <div className="relative mt-2">
                <div className="flex items-center h-10 rounded-lg overflow-hidden">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className={`flex-1 h-full ${
                      i < 3 ? "bg-emerald-100 dark:bg-emerald-900/30" : i < 5 ? "bg-emerald-200 dark:bg-emerald-800/40" : i < 8 ? "bg-emerald-300" : "bg-emerald-400"
                    }`} />
                  ))}
                </div>
                {/* Marcas de corte en P25, P50, P75 */}
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className={`flex-1 ${
                      i === 2 || i === 4 || i === 7 ? "border-r-3 border-red-500" : i < 9 ? "border-r border-emerald-400/50" : ""
                    }`} />
                  ))}
                </div>
              </div>
              <div className="relative h-12 -mt-1">
                <div className="absolute left-0 text-center" style={{ transform: "translateX(-50%)" }}>
                  <p className="text-sm text-muted-foreground">P₀</p>
                </div>
                <div className="absolute text-center" style={{ left: "25%", transform: "translateX(-50%)" }}>
                  <p className="text-sm font-bold text-red-600">P₂₅ = Q₁</p>
                </div>
                <div className="absolute text-center" style={{ left: "50%", transform: "translateX(-50%)" }}>
                  <p className="text-sm font-bold text-red-600">P₅₀ = Me</p>
                </div>
                <div className="absolute text-center" style={{ left: "75%", transform: "translateX(-50%)" }}>
                  <p className="text-sm font-bold text-red-600">P₇₅ = Q₃</p>
                </div>
                <div className="absolute right-0 text-center" style={{ transform: "translateX(50%)" }}>
                  <p className="text-sm text-muted-foreground">P₁₀₀</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Los cuartiles son casos especiales de percentiles: Q₁ = P₂₅, Q₂ = P₅₀, Q₃ = P₇₅.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* --- Fórmulas de posición --- */}
        <Card className="bg-gray-50 dark:bg-gray-800 border mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold">¿Cómo se calculan? Dos pasos sencillos:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200">Paso 1: Calcular la posición</Badge>
                <FormulaDisplay math={`\\text{Cuartil } Q_k: \\quad \\text{pos} = \\frac{k \\cdot (n+1)}{4}`} />
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2 space-y-1 text-muted-foreground">
                  <p className="font-medium text-blue-700 dark:text-blue-300">Ejemplos con n = {rawData.length}:</p>
                  <p><InlineMath math={`Q_1: \\; \\text{pos} = \\frac{1 \\cdot ${rawData.length + 1}}{4} = ${((rawData.length + 1) / 4).toFixed(2)}`} /></p>
                  <p><InlineMath math={`Q_3: \\; \\text{pos} = \\frac{3 \\cdot ${rawData.length + 1}}{4} = ${((3 * (rawData.length + 1)) / 4).toFixed(2)}`} /></p>
                </div>
                <FormulaDisplay math={`\\text{Percentil } P_p: \\quad \\text{pos} = \\frac{p \\cdot (n+1)}{100}`} />
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2 space-y-1 text-muted-foreground">
                  <p className="font-medium text-blue-700 dark:text-blue-300">Ejemplos con n = {rawData.length}:</p>
                  <p><InlineMath math={`P_{45}: \\; \\text{pos} = \\frac{45 \\cdot ${rawData.length + 1}}{100} = ${((45 * (rawData.length + 1)) / 100).toFixed(2)}`} /></p>
                  <p><InlineMath math={`P_{78}: \\; \\text{pos} = \\frac{78 \\cdot ${rawData.length + 1}}{100} = ${((78 * (rawData.length + 1)) / 100).toFixed(2)}`} /></p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200">Paso 2: Obtener el valor</Badge>
                <p className="text-muted-foreground">
                  <strong>Si la posición es entera</strong> (ej: 8): el valor es directamente <InlineMath math="x_{(8)}" />.
                </p>
                <p className="text-muted-foreground">
                  <strong>Si es decimal</strong> (ej: 7.75): interpolamos entre los dos datos adyacentes.
                  Es como preguntar: &quot;¿qué valor hay a 3/4 del camino entre <InlineMath math="x_{(7)}" /> y <InlineMath math="x_{(8)}" />?&quot;
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded p-2 space-y-1 text-muted-foreground">
                  <p className="font-medium text-emerald-700 dark:text-emerald-300">Ejemplo con Q₁ (pos = 7.75):</p>
                  <p>Parte entera = 7, parte decimal = 0.75</p>
                  <p><InlineMath math={`Q_1 = x_{(7)} + 0.75 \\cdot (x_{(8)} - x_{(7)})`} /></p>
                  <p><InlineMath math={`Q_1 = ${sorted[6]} + 0.75 \\cdot (${sorted[7]} - ${sorted[6]}) = ${q1}`} /></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- Ejemplo visual de interpolación --- */}
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mb-3">
          <CardContent className="p-4 text-sm space-y-3">
            <p className="font-semibold text-amber-800 dark:text-amber-200">¿Qué significa &quot;interpolar&quot;? Ejemplo visual con Q₃</p>
            <p className="text-muted-foreground">
              La posición de Q₃ es 23.25. Esto quiere decir que Q₃ está entre el dato en la posición 23 y el de la posición 24,
              concretamente <strong>a 1/4 del camino</strong> (0.25 = 1/4). Veámoslo:
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mt-1">
              {/* Valores extremos */}
              <div className="flex items-end justify-between mb-2">
                <div className="text-center">
                  <p className="text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded">Pos. 23</p>
                  <p className="font-mono text-lg font-bold mt-1">{sorted[22]}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded">Pos. 24</p>
                  <p className="font-mono text-lg font-bold mt-1">{sorted[23]}</p>
                </div>
              </div>
              {/* Barra de interpolación */}
              <div className="relative h-4 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full my-3">
                {/* Marca de Q₃ al 25% */}
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 shadow-md" style={{ left: "25%", transform: "translate(-50%, -50%)" }} />
              </div>
              {/* Escala porcentual */}
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>0%</span>
                <span className="font-bold text-red-600">25% (Q₃)</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
              {/* Resultado */}
              <div className="text-center mt-3 bg-red-50 dark:bg-red-950/20 rounded-lg py-2">
                <p className="font-semibold text-red-700">Q₃ = {round(q3, 2)} miles €</p>
                <p className="text-sm text-muted-foreground">A un 25% del camino entre {sorted[22]} y {sorted[23]}</p>
              </div>
            </div>
            <FormulaDisplay math={`Q_3 = x_{(23)} + 0{,}25 \\cdot (x_{(24)} - x_{(23)}) = ${sorted[22]} + 0{,}25 \\cdot (${sorted[23]} - ${sorted[22]}) = ${round(q3, 2)}`} />
            <p className="text-muted-foreground">
              <strong>La idea clave:</strong> si la posición fuera 23.00, el valor sería exactamente {sorted[22]}.
              Si fuera 24.00, sería {sorted[23]}. Como es 23.25, &quot;avanzamos&quot; un 25% del trecho entre ambos.
            </p>
          </CardContent>
        </Card>

        {/* --- Cálculos individuales --- */}
        <p className="font-semibold text-sm mb-2">Cálculo de cada medida:</p>
        <div className="space-y-3">
          {/* === Q₁ === */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Primer cuartil (Q₁): &quot;¿por debajo de qué valor está el 25%?&quot;</p>

              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <p className="font-medium">Paso 1: Calcular la posición</p>
                <FormulaDisplay math={`\\text{pos} = \\frac{k \\cdot (n+1)}{4} = \\frac{1 \\cdot (30+1)}{4} = \\frac{31}{4} = 7{,}75`} />

                <p className="font-medium">Paso 2: Descomponer la posición</p>
                <p className="text-muted-foreground">La posición 7,75 no es entera, así que necesitamos interpolar.</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2 text-center">
                    <p className="text-muted-foreground">Parte entera</p>
                    <p className="font-bold text-lg">7</p>
                    <p className="text-muted-foreground">→ dato inferior</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2 text-center">
                    <p className="text-muted-foreground">Parte decimal</p>
                    <p className="font-bold text-lg">0,75</p>
                    <p className="text-muted-foreground">→ cuánto avanzar</p>
                  </div>
                </div>

                <p className="font-medium">Paso 3: Identificar los datos adyacentes</p>
                <p className="text-muted-foreground">
                  Buscamos en los datos ordenados las posiciones 7 y 8:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                    <p className="text-muted-foreground">Posición 7</p>
                    <p className="font-mono font-bold text-lg"><InlineMath math={`x_{(7)} = ${sorted[6]}`} /></p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                    <p className="text-muted-foreground">Posición 8</p>
                    <p className="font-mono font-bold text-lg"><InlineMath math={`x_{(8)} = ${sorted[7]}`} /></p>
                  </div>
                </div>

                <p className="font-medium">Paso 4: Aplicar la interpolación</p>
                <p className="text-muted-foreground">
                  Fórmula: valor inferior + parte decimal × (valor superior − valor inferior)
                </p>
                <FormulaDisplay math={`Q_1 = x_{(7)} + 0{,}75 \\cdot (x_{(8)} - x_{(7)})`} />
                <FormulaDisplay math={`Q_1 = ${sorted[6]} + 0{,}75 \\cdot (${sorted[7]} - ${sorted[6]})`} />
                <FormulaDisplay math={`Q_1 = ${sorted[6]} + 0{,}75 \\cdot ${round(sorted[7] - sorted[6], 2)}`} />
                <FormulaDisplay math={`\\boxed{Q_1 = ${round(q1, 2)} \\text{ miles €}}`} />
              </div>

              <p className="text-muted-foreground">
                <strong>Significado:</strong> el 25% de las semanas (unas 7-8 semanas) tuvo ventas ≤ {round(q1, 2)} miles €.
                Si eres el gerente y una semana vendiste menos que esto, fue una semana &quot;floja&quot;.
              </p>
            </CardContent>
          </Card>

          {/* === Q₃ === */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Tercer cuartil (Q₃): &quot;¿por debajo de qué valor está el 75%?&quot;</p>

              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <p className="font-medium">Paso 1: Calcular la posición</p>
                <FormulaDisplay math={`\\text{pos} = \\frac{3 \\cdot (30+1)}{4} = \\frac{93}{4} = 23{,}25`} />

                <p className="font-medium">Paso 2: Descomponer la posición</p>
                <p className="text-muted-foreground">La posición 23,25 no es entera → interpolamos.</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2 text-center">
                    <p className="text-muted-foreground">Parte entera</p>
                    <p className="font-bold text-lg">23</p>
                    <p className="text-muted-foreground">→ dato inferior</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2 text-center">
                    <p className="text-muted-foreground">Parte decimal</p>
                    <p className="font-bold text-lg">0,25</p>
                    <p className="text-muted-foreground">→ cuánto avanzar</p>
                  </div>
                </div>

                <p className="font-medium">Paso 3: Identificar los datos adyacentes</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                    <p className="text-muted-foreground">Posición 23</p>
                    <p className="font-mono font-bold text-lg"><InlineMath math={`x_{(23)} = ${sorted[22]}`} /></p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                    <p className="text-muted-foreground">Posición 24</p>
                    <p className="font-mono font-bold text-lg"><InlineMath math={`x_{(24)} = ${sorted[23]}`} /></p>
                  </div>
                </div>

                <p className="font-medium">Paso 4: Aplicar la interpolación</p>
                <FormulaDisplay math={`Q_3 = x_{(23)} + 0{,}25 \\cdot (x_{(24)} - x_{(23)})`} />
                <FormulaDisplay math={`Q_3 = ${sorted[22]} + 0{,}25 \\cdot (${sorted[23]} - ${sorted[22]})`} />
                <FormulaDisplay math={`Q_3 = ${sorted[22]} + 0{,}25 \\cdot ${round(sorted[23] - sorted[22], 2)}`} />
                <FormulaDisplay math={`Q_3 = ${sorted[22]} + ${round(0.25 * (sorted[23] - sorted[22]), 4)}`} />
                <FormulaDisplay math={`\\boxed{Q_3 = ${round(q3, 2)} \\text{ miles €}}`} />
              </div>

              <p className="text-muted-foreground">
                <strong>Significado:</strong> el 75% de las semanas vendió ≤ {round(q3, 2)} miles €.
                Solo el <strong>top 25%</strong> de las semanas superó este valor. Si vendiste más que {round(q3, 2)}, fue una semana excelente.
              </p>
            </CardContent>
          </Card>

          {/* === P₄₅ === */}
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Percentil 45 (P₄₅): &quot;¿por debajo de qué valor está el 45%?&quot;</p>

              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <p className="font-medium">Paso 1: Calcular la posición</p>
                <FormulaDisplay math={`\\text{pos} = \\frac{p \\cdot (n+1)}{100} = \\frac{45 \\cdot 31}{100} = \\frac{1395}{100} = 13{,}95`} />

                <p className="font-medium">Paso 2: Descomponer la posición</p>
                <p className="text-muted-foreground">La posición 13,95 no es entera → interpolamos.</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded p-2 text-center">
                    <p className="text-muted-foreground">Parte entera</p>
                    <p className="font-bold text-lg">13</p>
                    <p className="text-muted-foreground">→ dato inferior</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded p-2 text-center">
                    <p className="text-muted-foreground">Parte decimal</p>
                    <p className="font-bold text-lg">0,95</p>
                    <p className="text-muted-foreground">→ cuánto avanzar</p>
                  </div>
                </div>

                <p className="font-medium">Paso 3: Identificar los datos adyacentes</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                    <p className="text-muted-foreground">Posición 13</p>
                    <p className="font-mono font-bold text-lg"><InlineMath math={`x_{(13)} = ${sorted[12]}`} /></p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                    <p className="text-muted-foreground">Posición 14</p>
                    <p className="font-mono font-bold text-lg"><InlineMath math={`x_{(14)} = ${sorted[13]}`} /></p>
                  </div>
                </div>

                <p className="font-medium">Paso 4: Aplicar la interpolación</p>
                <FormulaDisplay math={`P_{45} = x_{(13)} + 0{,}95 \\cdot (x_{(14)} - x_{(13)})`} />
                <FormulaDisplay math={`P_{45} = ${sorted[12]} + 0{,}95 \\cdot (${sorted[13]} - ${sorted[12]})`} />
                <FormulaDisplay math={`P_{45} = ${sorted[12]} + 0{,}95 \\cdot ${round(sorted[13] - sorted[12], 2)}`} />
                <FormulaDisplay math={`\\boxed{P_{45} = ${round(p45, 2)} \\text{ miles €}}`} />
              </div>

              <p className="text-muted-foreground">
                <strong>Significado:</strong> el 45% de las semanas vendió menos de {round(p45, 2)} miles €.
                Fíjate que P₄₅ ({round(p45, 2)}) está muy cerca de la mediana ({round(med, 2)}), lo cual tiene sentido:
                el 45% y el 50% están a solo 5 puntos porcentuales de distancia.
              </p>
            </CardContent>
          </Card>

          {/* === P₇₈ === */}
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Percentil 78 (P₇₈): &quot;¿por debajo de qué valor está el 78%?&quot;</p>

              <div className="bg-white dark:bg-gray-900 rounded p-3 space-y-2">
                <p className="font-medium">Paso 1: Calcular la posición</p>
                <FormulaDisplay math={`\\text{pos} = \\frac{78 \\cdot 31}{100} = \\frac{2418}{100} = 24{,}18`} />

                <p className="font-medium">Paso 2: Descomponer la posición</p>
                <p className="text-muted-foreground">La posición 24,18 no es entera → interpolamos.</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded p-2 text-center">
                    <p className="text-muted-foreground">Parte entera</p>
                    <p className="font-bold text-lg">24</p>
                    <p className="text-muted-foreground">→ dato inferior</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded p-2 text-center">
                    <p className="text-muted-foreground">Parte decimal</p>
                    <p className="font-bold text-lg">0,18</p>
                    <p className="text-muted-foreground">→ cuánto avanzar</p>
                  </div>
                </div>

                <p className="font-medium">Paso 3: Identificar los datos adyacentes</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                    <p className="text-muted-foreground">Posición 24</p>
                    <p className="font-mono font-bold text-lg"><InlineMath math={`x_{(24)} = ${sorted[23]}`} /></p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                    <p className="text-muted-foreground">Posición 25</p>
                    <p className="font-mono font-bold text-lg"><InlineMath math={`x_{(25)} = ${sorted[24]}`} /></p>
                  </div>
                </div>

                <p className="font-medium">Paso 4: Aplicar la interpolación</p>
                <FormulaDisplay math={`P_{78} = x_{(24)} + 0{,}18 \\cdot (x_{(25)} - x_{(24)})`} />
                <FormulaDisplay math={`P_{78} = ${sorted[23]} + 0{,}18 \\cdot (${sorted[24]} - ${sorted[23]})`} />
                <FormulaDisplay math={`P_{78} = ${sorted[23]} + 0{,}18 \\cdot ${round(sorted[24] - sorted[23], 2)}`} />
                <FormulaDisplay math={`\\boxed{P_{78} = ${round(p78, 2)} \\text{ miles €}}`} />
              </div>

              <p className="text-muted-foreground">
                <strong>Significado:</strong> el 78% de las semanas vendió menos de {round(p78, 2)} miles €.
                Solo el 22% de las semanas superó esta cifra. Fíjate que P₇₈ ({round(p78, 2)}) está cerca de Q₃ ({round(q3, 2)}),
                porque 78% es cercano a 75%.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <ResultCard label="Q1" value={`${round(q1, 2)} miles €`} />
          <ResultCard label="Q3" value={`${round(q3, 2)} miles €`} />
          <ResultCard label="P45" value={`${round(p45, 2)} miles €`} />
          <ResultCard label="P78" value={`${round(p78, 2)} miles €`} />
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
