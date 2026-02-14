"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BarChartCustom } from "@/components/charts/bar-chart-custom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio nos enseña a <strong>comparar la variabilidad (dispersión)</strong> de dos conjuntos de datos.
          La pregunta clave es: <em>&quot;¿En cuál de los dos tubos la duración varía más?&quot;</em>
        </p>
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">¿Qué es la dispersión y por qué importa?</p>
            <p className="text-muted-foreground">
              Imagina que compras dos marcas de pilas. Ambas dicen durar &quot;unas 100 horas&quot;. Pero la marca A
              a veces dura 90h y a veces 110h (poca variación), mientras que la marca B a veces dura 50h y a veces 150h
              (mucha variación). <strong>La media es la misma, pero la fiabilidad es muy distinta.</strong>
            </p>
            <p className="text-muted-foreground">
              La <strong>dispersión</strong> mide exactamente eso: cuánto se alejan los datos de la media.
              A mayor dispersión, menos fiables son los datos y menos representativa es la media.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200 mt-2">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">Problema: ¿cómo comparar dispersiones de cosas con medias diferentes?</p>
            <p className="text-muted-foreground">
              El tubo A tiene una media de 1.495h y el tubo B de 1.875h. Son escalas distintas.
              Una desviación de 280h puede ser &quot;mucha&quot; o &quot;poca&quot; dependiendo de la media.
              Por eso necesitamos <strong>dos formas</strong> de medir la dispersión: absoluta y relativa.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 1: Conceptos de dispersión ============ */}
      <StepCard stepNumber={2} title="Los dos tipos de dispersión" variant="explanation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-2">
              <Badge className="bg-blue-200 text-blue-800">Dispersión Absoluta</Badge>
              <p className="text-xs font-semibold">Se mide con: Desviación típica (σ)</p>
              <p className="text-xs text-muted-foreground">
                <strong>¿Qué mide?</strong> Cuánto se desvían los datos de la media, <em>en las mismas unidades que los datos</em>.
              </p>
              <p className="text-xs text-muted-foreground">
                <strong>¿Cuándo sirve?</strong> Cuando comparamos cosas <strong>medidas en la misma escala</strong>
                (por ejemplo, dos tubos con la misma media).
              </p>
              <div className="bg-white rounded p-2 text-[10px]">
                <p><strong>Ejemplo cotidiano:</strong> &quot;Las temperaturas en Madrid varían ±5°C respecto a la media&quot;.
                Ese ±5°C es una dispersión absoluta.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-2">
              <Badge className="bg-emerald-200 text-emerald-800">Dispersión Relativa</Badge>
              <p className="text-xs font-semibold">Se mide con: Coeficiente de Variación (CV)</p>
              <p className="text-xs text-muted-foreground">
                <strong>¿Qué mide?</strong> Qué <em>porcentaje</em> de la media representa la desviación.
                Es una medida <strong>sin unidades</strong> (adimensional).
              </p>
              <p className="text-xs text-muted-foreground">
                <strong>¿Cuándo sirve?</strong> Cuando comparamos cosas <strong>con medias muy distintas</strong>
                o en unidades diferentes (kg vs metros, horas vs minutos...).
              </p>
              <div className="bg-white rounded p-2 text-[10px]">
                <p><strong>Ejemplo cotidiano:</strong> Un error de 1€ es mucho si compras un café (2€),
                pero nada si compras un coche (20.000€). El CV captura esa idea.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-rose-50 border-rose-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-rose-800">¿Por qué no basta con la dispersión absoluta?</p>
            <p className="text-muted-foreground">
              Porque σ = 280h puede ser &quot;poca dispersión&quot; si la media es 10.000h, o &quot;mucha dispersión&quot;
              si la media es 300h. <strong>La dispersión absoluta no tiene contexto sin la media.</strong>
              El CV soluciona esto al expresar la dispersión como porcentaje de la media.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Dispersión absoluta ============ */}
      <StepCard stepNumber={3} title="a) Dispersión absoluta: ¿qué tubo varía más en horas?" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Qué pregunta responde este apartado?</p>
            <p className="text-muted-foreground">
              &quot;Sin tener en cuenta que las medias son diferentes, ¿qué tubo tiene más variación en su duración?&quot;
              Simplemente comparamos las desviaciones típicas directamente.
            </p>
          </CardContent>
        </Card>

        <p className="text-sm mb-2">La <strong>desviación típica (σ)</strong> ya nos la da el enunciado. Solo hay que compararlas:</p>
        <FormulaDisplay math={`\\sigma_A = 280 \\text{ h} \\quad \\text{vs} \\quad \\sigma_B = 310 \\text{ h}`} />
        <FormulaDisplay math={`\\sigma_B > \\sigma_A \\implies \\text{B tiene mayor dispersión absoluta}`} />

        <Card className="bg-blue-50 border-blue-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">¿Qué significa esto en la práctica?</p>
            <p className="text-muted-foreground">
              Los tubos de tipo B tienen más variación en su duración <strong>medida en horas</strong>.
              Es decir, hay más diferencia entre un tubo B que dura mucho y uno que dura poco,
              comparado con los tubos A.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Mayor dispersión absoluta" value="Tubo B (σ = 310 h > 280 h)" />
      </StepCard>

      {/* ============ PASO 3: Dispersión relativa ============ */}
      <StepCard stepNumber={4} title="b) Dispersión relativa: ¿cuál es menos fiable?" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Qué pregunta responde este apartado?</p>
            <p className="text-muted-foreground">
              &quot;Teniendo en cuenta que las medias son diferentes, ¿en cuál de los dos tubos
              la duración varía <em>proporcionalmente</em> más?&quot;
              Es decir, ¿en cuál la media es <strong>menos representativa</strong>?
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">Fórmula del Coeficiente de Variación (CV) - desglosada</p>
            <FormulaDisplay math={`CV = \\frac{\\sigma}{|\\bar{x}|} \\times 100`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="\sigma" /> = desviación típica (cuánto varían los datos de la media, en las mismas unidades)</p>
              <p><InlineMath math="|\\bar{x}|" /> = valor absoluto de la media (la &quot;referencia&quot; contra la que medimos)</p>
              <p><InlineMath math="\times 100" /> = lo pasamos a porcentaje para que sea más intuitivo</p>
            </div>
            <p className="text-muted-foreground mt-1">
              <strong>En palabras:</strong> &quot;¿Qué porcentaje de la media representa la desviación?&quot;
              Un CV del 20% significa que los datos se desvían, en promedio, un 20% respecto a la media.
            </p>
            <div className="bg-white rounded p-2 mt-1 space-y-1">
              <p className="font-semibold text-amber-800">Regla práctica para interpretar el CV:</p>
              <div className="flex flex-wrap gap-1">
                <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">CV &lt; 10%: Muy homogéneo</Badge>
                <Badge className="bg-blue-100 text-blue-800 text-[10px]">10-25%: Bastante homogéneo</Badge>
                <Badge className="bg-amber-100 text-amber-800 text-[10px]">25-50%: Heterogéneo</Badge>
                <Badge className="bg-rose-100 text-rose-800 text-[10px]">CV &gt; 50%: Muy heterogéneo</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">A menor CV, más representativa es la media. A mayor CV, menos podemos fiarnos de la media.</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-sm font-medium mb-2">Calculamos el CV para cada tubo:</p>

        <Card className="bg-blue-50 border-blue-200 mb-2">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">Tubo A:</p>
            <FormulaDisplay math={`CV_A = \\frac{\\sigma_A}{|\\bar{x}_A|} \\times 100 = \\frac{280}{1495} \\times 100 = ${cvA.toFixed(2)}\\%`} />
            <p className="text-muted-foreground">Los datos del tubo A se desvían, en promedio, un {cvA.toFixed(2)}% respecto a su media.</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-emerald-800">Tubo B:</p>
            <FormulaDisplay math={`CV_B = \\frac{\\sigma_B}{|\\bar{x}_B|} \\times 100 = \\frac{310}{1875} \\times 100 = ${cvB.toFixed(2)}\\%`} />
            <p className="text-muted-foreground">Los datos del tubo B se desvían, en promedio, un {cvB.toFixed(2)}% respecto a su media.</p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`CV_A = ${cvA.toFixed(2)}\\% > CV_B = ${cvB.toFixed(2)}\\%`} />

        <ResultCard label="Mayor dispersión relativa" value={`Tubo A (CV = ${cvA.toFixed(2)}% > ${cvB.toFixed(2)}%)`} />
      </StepCard>

      {/* ============ PASO 4: Comparación visual ============ */}
      <StepCard stepNumber={5} title="Comparación visual" variant="explanation">
        <BarChartCustom
          data={[
            { name: "Tubo A", value: cvA, color: "hsl(var(--chart-1))" },
            { name: "Tubo B", value: cvB, color: "hsl(var(--chart-2))" },
          ]}
          title="Coeficiente de Variación (%)"
          yLabel="CV (%)"
        />
      </StepCard>

      {/* ============ PASO 5: Resultado sorprendente ============ */}
      <StepCard stepNumber={6} title="¡Resultado contraintuitivo! ¿Cómo es posible?" variant="result">
        <Card className="bg-rose-50 border-rose-200">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-rose-800">El tubo B tiene mayor σ pero menor CV. ¿No es contradictorio?</p>
            <p className="text-muted-foreground">
              <strong>No.</strong> La clave está en la media. Veamos la analogía:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <Card className="bg-white">
                <CardContent className="p-2">
                  <p className="font-semibold text-xs">Tubo A (σ=280, media=1.495)</p>
                  <p className="text-[10px] text-muted-foreground">
                    Una desviación de 280h sobre una media de 1.495h es un {cvA.toFixed(1)}% de error.
                    Es como errar 280€ en un presupuesto de 1.495€ → error considerable.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-2">
                  <p className="font-semibold text-xs">Tubo B (σ=310, media=1.875)</p>
                  <p className="text-[10px] text-muted-foreground">
                    Una desviación de 310h sobre una media de 1.875h es un {cvB.toFixed(1)}% de error.
                    Es como errar 310€ en un presupuesto de 1.875€ → error proporcionalmente menor.
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground mt-1">
              <strong>Conclusión:</strong> Aunque el tubo B varía más en valor absoluto (σ=310 &gt; 280),
              proporcionalmente a su media varía menos (CV=16.53% &lt; 18.73%).
              Esto significa que <strong>la media del tubo B es más representativa</strong> que la del tubo A.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">Resumen: ¿qué hemos aprendido?</p>
            <div className="space-y-1">
              <p>1. La <strong>dispersión absoluta (σ)</strong> compara variabilidad en las mismas unidades → gana quien tiene σ mayor (Tubo B).</p>
              <p>2. La <strong>dispersión relativa (CV)</strong> compara variabilidad proporcionalmente a la media → gana quien tiene CV mayor (Tubo A).</p>
              <p>3. <strong>Siempre que las medias sean diferentes</strong>, debemos usar el CV para una comparación justa.</p>
              <p>4. A menor CV, más representativa es la media y más &quot;fiables&quot; son los datos.</p>
            </div>
          </CardContent>
        </Card>
      </StepCard>
    </ExerciseLayout>
  );
}
