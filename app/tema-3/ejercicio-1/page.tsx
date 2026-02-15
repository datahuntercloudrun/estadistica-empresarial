"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
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
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">¿Qué es la dispersión y por qué importa?</p>
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
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Problema: ¿cómo comparar dispersiones de cosas con medias diferentes?</p>
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
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-2">
              <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200">Dispersión Absoluta</Badge>
              <p className="text-sm font-semibold">Se mide con: Desviación típica (σ)</p>
              <p className="text-sm text-muted-foreground">
                <strong>¿Qué mide?</strong> Cuánto se desvían los datos de la media, <em>en las mismas unidades que los datos</em>.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>¿Cuándo sirve?</strong> Cuando comparamos cosas <strong>medidas en la misma escala</strong>
                (por ejemplo, dos tubos con la misma media).
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-2 text-sm">
                <p><strong>Ejemplo cotidiano:</strong> &quot;Las temperaturas en Madrid varían ±5°C respecto a la media&quot;.
                Ese ±5°C es una dispersión absoluta.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-2">
              <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200">Dispersión Relativa</Badge>
              <p className="text-sm font-semibold">Se mide con: Coeficiente de Variación (CV)</p>
              <p className="text-sm text-muted-foreground">
                <strong>¿Qué mide?</strong> Qué <em>porcentaje</em> de la media representa la desviación.
                Es una medida <strong>sin unidades</strong> (adimensional).
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>¿Cuándo sirve?</strong> Cuando comparamos cosas <strong>con medias muy distintas</strong>
                o en unidades diferentes (kg vs metros, horas vs minutos...).
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-2 text-sm">
                <p><strong>Ejemplo cotidiano:</strong> Un error de 1€ es mucho si compras un café (2€),
                pero nada si compras un coche (20.000€). El CV captura esa idea.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 mt-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-rose-800 dark:text-rose-200">¿Por qué no basta con la dispersión absoluta?</p>
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
        <Card className="bg-gray-50 dark:bg-gray-800 border mb-3">
          <CardContent className="p-3 text-sm space-y-1">
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

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Qué significa esto en la práctica?</p>
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
        <Card className="bg-gray-50 dark:bg-gray-800 border mb-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">¿Qué pregunta responde este apartado?</p>
            <p className="text-muted-foreground">
              &quot;Teniendo en cuenta que las medias son diferentes, ¿en cuál de los dos tubos
              la duración varía <em>proporcionalmente</em> más?&quot;
              Es decir, ¿en cuál la media es <strong>menos representativa</strong>?
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Fórmula del Coeficiente de Variación (CV) - desglosada</p>
            <FormulaDisplay math={`CV = \\frac{\\sigma}{|\\bar{x}|} \\times 100`} />
            <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
              <p><InlineMath math="\sigma" /> = desviación típica (cuánto varían los datos de la media, en las mismas unidades)</p>
              <p><InlineMath math="|\bar{x}|" /> = valor absoluto de la media (la &quot;referencia&quot; contra la que medimos)</p>
              <p><InlineMath math="\times 100" /> = lo pasamos a porcentaje para que sea más intuitivo</p>
            </div>
            <p className="text-muted-foreground mt-1">
              <strong>En palabras:</strong> &quot;¿Qué porcentaje de la media representa la desviación?&quot;
              Un CV del 20% significa que los datos se desvían, en promedio, un 20% respecto a la media.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded p-2 mt-1 space-y-1">
              <p className="font-semibold text-amber-800 dark:text-amber-200">Regla práctica para interpretar el CV:</p>
              <div className="flex flex-wrap gap-1">
                <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-sm">CV &lt; 10%: Muy homogéneo</Badge>
                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm">10-25%: Bastante homogéneo</Badge>
                <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-sm">25-50%: Heterogéneo</Badge>
                <Badge className="bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200 text-sm">CV &gt; 50%: Muy heterogéneo</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">A menor CV, más representativa es la media. A mayor CV, menos podemos fiarnos de la media.</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-sm font-medium mb-2">Calculamos el CV para cada tubo:</p>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Tubo A:</p>
            <FormulaDisplay math={`CV_A = \\frac{\\sigma_A}{|\\bar{x}_A|} \\times 100 = \\frac{280}{1495} \\times 100 = ${cvA.toFixed(2)}\\%`} />
            <p className="text-muted-foreground">Los datos del tubo A se desvían, en promedio, un {cvA.toFixed(2)}% respecto a su media.</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mb-3">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">Tubo B:</p>
            <FormulaDisplay math={`CV_B = \\frac{\\sigma_B}{|\\bar{x}_B|} \\times 100 = \\frac{310}{1875} \\times 100 = ${cvB.toFixed(2)}\\%`} />
            <p className="text-muted-foreground">Los datos del tubo B se desvían, en promedio, un {cvB.toFixed(2)}% respecto a su media.</p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`CV_A = ${cvA.toFixed(2)}\\% > CV_B = ${cvB.toFixed(2)}\\%`} />

        <ResultCard label="Mayor dispersión relativa" value={`Tubo A (CV = ${cvA.toFixed(2)}% > ${cvB.toFixed(2)}%)`} />
      </StepCard>

    </ExerciseLayout>
  );
}
