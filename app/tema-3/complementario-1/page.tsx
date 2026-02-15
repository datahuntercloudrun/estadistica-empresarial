"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FrequencyTable } from "@/components/stats/frequency-table";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BarChartCustom } from "@/components/charts/bar-chart-custom";
import { BoxPlot } from "@/components/charts/box-plot";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mean, median, mode, variance, stdDev, round } from "@/lib/stats/descriptive";
import { quartile, decile } from "@/lib/stats/position";
import { frequencyTable } from "@/lib/stats/frequencies";

const rawData = [
  19, 30, 20, 23, 24, 21, 20, 25, 26, 20, 21, 29, 28,
  30, 19, 27, 29, 22, 25, 28, 20, 27, 26, 21, 30, 28,
  27, 26, 19, 27, 25, 23, 22, 29, 21, 26, 24, 28, 30,
  25, 25, 24, 26, 23, 29, 27, 28, 26, 27, 26, 22, 26,
  27, 29, 28, 23, 22, 24, 26, 23,
];

const sorted = [...rawData].sort((a, b) => a - b);
const freqTable = frequencyTable(rawData);
const m = mean(rawData);
const med = median(rawData);
const mod = mode(rawData);
const v = variance(rawData);
const s = stdDev(rawData);
const q1 = quartile(rawData, 1);
const q3 = quartile(rawData, 3);
const d2 = decile(rawData, 2);

const n = rawData.length;
const sumXi = rawData.reduce((acc, x) => acc + x, 0);
const modFreq = freqTable.find(r => r.xNum === mod[0])?.ni ?? 0;
const posMediana1 = n / 2;
const posMediana2 = n / 2 + 1;
const posQ1 = (n + 1) / 4;
const posD2 = (2 * (n + 1)) / 10;
const cvValue = round((s / m) * 100, 2);

export default function Complementario1() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber="C1"
      title="Análisis Completo de Salarios"
      difficulty="Medio"
      category="Estadística descriptiva completa"
      statement={
        <div className="space-y-2">
          <p>Salarios diarios (en 10€) de trabajadores de una fábrica:</p>
          <p className="font-mono text-xs bg-white p-2 rounded">{rawData.join(", ")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Mediana</li>
            <li>b) Moda</li>
            <li>c) Salario medio</li>
            <li>d) Varianza y desviación típica</li>
            <li>e) Primer cuartil y segundo decil</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-8"
      nextUrl="/tema-3/complementario-2"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio es un <strong>análisis estadístico completo</strong> de un conjunto de datos reales:
          los salarios diarios de 60 trabajadores de una fábrica. Vamos a aplicar todas las herramientas
          de estadística descriptiva que hemos aprendido, una por una.
        </p>
        <Card className="bg-amber-50 border-amber-200 mt-2 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">Nota sobre las unidades</p>
            <p className="text-muted-foreground">
              Los datos están expresados en <strong>unidades de 10€</strong>. Esto significa que un valor de 26 equivale
              a 260€ de salario diario. Es una forma habitual de simplificar los cálculos sin perder información.
              Al final, basta multiplicar por 10 para obtener euros.
            </p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 text-blue-800 text-[10px]">Mediana</Badge>
              <p className="text-[10px] text-muted-foreground">El valor del &quot;trabajador del medio&quot;. Divide la muestra en dos mitades iguales.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 text-emerald-800 text-[10px]">Moda</Badge>
              <p className="text-[10px] text-muted-foreground">El salario más frecuente. &quot;¿Cuánto cobra la mayoría?&quot;</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 text-violet-800 text-[10px]">Media</Badge>
              <p className="text-[10px] text-muted-foreground">El promedio clásico. Reparte el total equitativamente entre todos.</p>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-rose-200 text-rose-800 text-[10px]">Varianza y desv. típica</Badge>
              <p className="text-[10px] text-muted-foreground">¿Los salarios son parecidos entre sí o hay mucha diferencia?</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-amber-200 text-amber-800 text-[10px]">Cuartiles y deciles</Badge>
              <p className="text-[10px] text-muted-foreground">Puntos de corte que dividen los datos en partes iguales (4 o 10 partes).</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 1: Organizar los datos ============ */}
      <StepCard stepNumber={2} title="Organizar los datos: tabla de frecuencias" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Por qué necesitamos una tabla de frecuencias?</p>
            <p className="text-muted-foreground">
              Tenemos {n} datos en bruto, un montón de números desordenados. Es como tener una habitación
              desordenada: antes de analizar algo, hay que <strong>organizarlo</strong>.
            </p>
            <p className="text-muted-foreground">
              La tabla de frecuencias cuenta cuántas veces aparece cada valor de salario. Es el primer
              paso obligatorio en cualquier análisis estadístico porque nos da una visión ordenada de los datos.
            </p>
            <div className="bg-white rounded p-2 space-y-1 mt-1">
              <p><InlineMath math="x_i" /> = cada valor distinto de salario</p>
              <p><InlineMath math="n_i" /> = frecuencia absoluta (cuántos trabajadores cobran exactamente <InlineMath math="x_i" />)</p>
              <p><InlineMath math="f_i" /> = frecuencia relativa (<InlineMath math="n_i / n" />): proporción del total</p>
              <p><InlineMath math="N_i" /> = frecuencia absoluta acumulada (cuántos cobran <InlineMath math="x_i" /> o menos)</p>
              <p><InlineMath math="F_i" /> = frecuencia relativa acumulada (<InlineMath math="N_i / n" />)</p>
            </div>
          </CardContent>
        </Card>

        <FrequencyTable
          data={freqTable.map(r => ({ xi: r.xi, ni: r.ni, fi: r.fi, Ni: r.Ni, Fi: r.Fi }))}
          title="Distribución de salarios (en 10€)"
        />

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">¿Qué nos dice esta tabla a simple vista?</p>
            <p className="text-muted-foreground">
              Los salarios van desde 19 (190€) hasta 30 (300€). Los valores más frecuentes están
              en la zona de 26-27 (260€-270€). Hay relativamente pocos trabajadores en los extremos
              (19 o 30), y la mayoría se concentra en la franja central-alta.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Visualización ============ */}
      <StepCard stepNumber={3} title="Visualización: diagrama de barras" variant="explanation">
        <Card className="bg-violet-50 border-violet-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-violet-800">¿Por qué un gráfico de barras?</p>
            <p className="text-muted-foreground">
              Un gráfico vale más que mil números. El diagrama de barras nos permite ver de un vistazo
              la <strong>forma de la distribución</strong>: dónde se concentran los datos, si hay asimetría,
              y cuáles son los valores más y menos frecuentes. En este caso usamos barras porque
              los salarios son valores discretos (números enteros en unidades de 10€).
            </p>
          </CardContent>
        </Card>

        <BarChartCustom
          data={freqTable.map(r => ({ name: r.xi, value: r.ni }))}
          title="Frecuencia de salarios"
          xLabel="Salario (×10€)"
          yLabel="Frecuencia"
        />

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs">
            <p><strong>Interpretación visual:</strong> Se observa que la distribución tiene un pico claro en
            torno a 26-27 (260€-270€). La distribución no es perfectamente simétrica: hay una ligera
            cola hacia la izquierda (valores bajos como 19-20). La barra más alta corresponde al valor 26,
            lo cual anticipamos que será nuestra moda.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 3: Mediana ============ */}
      <StepCard stepNumber={4} title="a) Mediana" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Qué es la mediana y para qué sirve?</p>
            <p className="text-muted-foreground">
              Imagina que pones a los {n} trabajadores en fila, ordenados de menor a mayor salario.
              La <strong>mediana</strong> es el salario del trabajador que queda justo en el centro de la fila.
              Es decir, la mitad de los trabajadores cobra menos que la mediana y la otra mitad cobra más.
            </p>
            <p className="text-muted-foreground">
              La mediana es especialmente útil cuando hay valores extremos. Si el director de la fábrica
              cobrara 500 (5000€), la media subiría mucho, pero la mediana apenas cambiaría, porque
              sigue siendo el &quot;trabajador del medio&quot;. Por eso la mediana es una medida <strong>robusta</strong>.
            </p>
            <div className="bg-white rounded p-2 space-y-1 mt-1">
              <p className="font-semibold">Procedimiento para calcular la mediana:</p>
              <p>1. Ordenar todos los datos de menor a mayor</p>
              <p>2. Calcular la posición central: <InlineMath math="\frac{n+1}{2}" /></p>
              <p>3. Si <InlineMath math="n" /> es impar: la mediana es el dato en esa posición exacta</p>
              <p>4. Si <InlineMath math="n" /> es par: la mediana es la media de los dos datos centrales</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">Cálculo paso a paso</p>
            <p className="text-muted-foreground">
              Tenemos <InlineMath math={`n = ${n}`} /> datos (número par), así que la mediana será la media
              de los dos valores centrales.
            </p>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground mb-2">
          Como n={n} es <strong>par</strong>, no hay un dato exactamente en el centro.
          Las dos posiciones centrales son <InlineMath math={`\\frac{n}{2} = ${posMediana1}`} /> y <InlineMath math={`\\frac{n}{2}+1 = ${posMediana2}`} />.
          La mediana es la media de los valores en las posiciones <strong>{posMediana1} y {posMediana2}</strong> de los datos ordenados:
        </p>
        <FormulaDisplay math={`Me = \\frac{x_{(${posMediana1})} + x_{(${posMediana2})}}{2} = \\frac{${sorted[posMediana1 - 1]} + ${sorted[posMediana2 - 1]}}{2} = ${round(med, 2)}`} />

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Interpretación</p>
            <p className="text-muted-foreground">
              La mediana es <strong>{round(med, 2)}</strong> (en unidades de 10€), es decir, <strong>{round(med * 10, 0)}€</strong>.
              Esto significa que el 50% de los trabajadores de la fábrica cobra {round(med * 10, 0)}€ diarios o menos,
              y el otro 50% cobra {round(med * 10, 0)}€ o más. Es el salario que divide a la plantilla exactamente por la mitad.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Mediana" value={`${round(med, 2)} (×10€) = ${round(med * 10, 0)}€`} />
      </StepCard>

      {/* ============ PASO 4: Moda ============ */}
      <StepCard stepNumber={5} title="b) Moda" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Qué es la moda?</p>
            <p className="text-muted-foreground">
              La moda es el concepto más intuitivo de todos: es simplemente el <strong>valor que más se repite</strong>.
              Si estamos hablando de salarios, la moda nos dice cuál es el salario más frecuente,
              el que cobra el mayor número de trabajadores.
            </p>
            <p className="text-muted-foreground">
              A diferencia de la media y la mediana, la moda no requiere ningún cálculo matemático: solo
              hay que contar. Sin embargo, es muy informativa: si la moda es 26 (260€), sabemos que ese es el
              salario &quot;típico&quot; en el sentido de que es el más habitual en la fábrica.
            </p>
            <div className="bg-white rounded p-2 mt-1">
              <p className="font-semibold">¿Cómo se encuentra?</p>
              <p>Miramos la columna <InlineMath math="n_i" /> de la tabla de frecuencias y buscamos el valor más alto.
              El <InlineMath math="x_i" /> correspondiente es la moda.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">Identificación</p>
            <p className="text-muted-foreground">
              Buscamos en la tabla de frecuencias el valor con la frecuencia absoluta (<InlineMath math="n_i" />) más alta.
              El valor <InlineMath math={`x_i = ${mod[0]}`} /> aparece <strong>{modFreq} veces</strong>,
              más que cualquier otro valor.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`Mo = ${mod.join(", ")} \\quad \\text{(con } n_i = ${modFreq} \\text{, la frecuencia más alta)}`} />

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Interpretación</p>
            <p className="text-muted-foreground">
              La moda es <strong>{mod.join(", ")}</strong> (×10€), es decir, <strong>{mod.map(m => m * 10).join(", ")}€</strong>.
              El salario más común en la fábrica es {mod.map(m => m * 10).join(", ")}€ diarios: hay {modFreq} trabajadores
              que cobran exactamente esa cantidad, más que cualquier otro salario.
            </p>
            <p className="text-muted-foreground mt-1">
              Observa que la moda ({mod[0]}) es muy cercana a la mediana ({round(med, 2)}). Cuando media,
              mediana y moda están próximas, la distribución es bastante <strong>simétrica</strong>. En este caso están
              cerca pero no son idénticas, lo que indica una ligera asimetría.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Moda" value={`${mod.join(", ")} (×10€) = ${mod.map(m => m * 10).join(", ")}€`} />
      </StepCard>

      {/* ============ PASO 5: Media ============ */}
      <StepCard stepNumber={6} title="c) Salario medio" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Qué es la media aritmética y qué pregunta responde?</p>
            <p className="text-muted-foreground">
              La media responde a esta pregunta: <em>&quot;Si repartimos todo el dinero de los salarios de forma
              equitativa entre todos los trabajadores, ¿cuánto tocaría a cada uno?&quot;</em>
            </p>
            <p className="text-muted-foreground">
              Es la medida de posición central más usada, pero tiene un punto débil: es sensible a valores
              extremos. Si un trabajador cobrara muchísimo más que los demás, la media subiría para todos,
              aunque la mayoría siga cobrando lo mismo. Por eso es importante compararla con la mediana.
            </p>
            <div className="bg-white rounded p-2 mt-1 space-y-1">
              <p className="font-semibold">Fórmula:</p>
              <FormulaDisplay math={`\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}`} />
              <p className="text-muted-foreground">En palabras: &quot;Suma todos los valores y divide entre cuántos hay.&quot;</p>
              <p className="text-muted-foreground">
                Con tabla de frecuencias podemos usar la forma equivalente:
              </p>
              <FormulaDisplay math={`\\bar{x} = \\frac{\\sum x_i \\cdot n_i}{n}`} />
              <p className="text-muted-foreground">Es decir, multiplicamos cada salario por cuántos trabajadores lo cobran y sumamos.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">Cálculo</p>
            <p className="text-muted-foreground">
              Sumamos todos los {n} salarios: <InlineMath math={`\\sum x_i = ${sumXi}`} />
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${sumXi}}{${n}} = ${round(m, 4)}`} />

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Interpretación</p>
            <p className="text-muted-foreground">
              El salario medio es <strong>{round(m, 4)}</strong> (×10€), es decir, <strong>{round(m * 10, 2)}€</strong> diarios.
              Si toda la masa salarial de la fábrica se repartiera a partes iguales entre los {n} trabajadores,
              cada uno recibiría {round(m * 10, 2)}€ al día.
            </p>
            <p className="text-muted-foreground mt-1">
              <strong>Comparación con la mediana:</strong> La media ({round(m, 4)}) es {round(m, 4) < med ? "menor" : round(m, 4) > med ? "mayor" : "igual"} que
              la mediana ({round(med, 2)}). {round(m, 4) < med
                ? "Esto indica una ligera asimetría negativa: hay algunos salarios bajos que tiran de la media hacia abajo."
                : round(m, 4) > med
                ? "Esto indica una ligera asimetría positiva: hay algunos salarios altos que tiran de la media hacia arriba."
                : "Son prácticamente iguales, lo que indica simetría."}
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Media" value={`${round(m, 4)} (×10€) = ${round(m * 10, 2)}€`} />
      </StepCard>

      {/* ============ PASO 6: Varianza y desviación típica ============ */}
      <StepCard stepNumber={7} title="d) Varianza y desviación típica" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Qué miden la varianza y la desviación típica?</p>
            <p className="text-muted-foreground">
              La media nos dice el &quot;centro&quot; de los datos, pero no nos cuenta nada sobre cómo se reparten
              los datos alrededor de ese centro. ¿Están todos los trabajadores cobrando parecido?
              ¿O hay unos que cobran mucho y otros muy poco?
            </p>
            <p className="text-muted-foreground">
              La <strong>varianza</strong> y la <strong>desviación típica</strong> responden a esta pregunta:
              miden cuánto se alejan, en promedio, los datos de la media. Cuanto mayor es la desviación típica,
              más &quot;dispersos&quot; o &quot;desiguales&quot; son los salarios.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-violet-50 border-violet-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-violet-800">Las fórmulas explicadas paso a paso</p>
            <div className="bg-white rounded p-2 space-y-2">
              <div>
                <p className="font-semibold">Varianza (<InlineMath math="s^2" />):</p>
                <FormulaDisplay math={`s^2 = \\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})^2}{n}`} />
                <p className="text-muted-foreground mt-1">Procedimiento:</p>
                <p className="text-muted-foreground">1. Calcula la distancia de cada dato a la media: <InlineMath math="(x_i - \bar{x})" /></p>
                <p className="text-muted-foreground">2. Eleva al cuadrado cada distancia (para que no se cancelen positivos con negativos)</p>
                <p className="text-muted-foreground">3. Calcula el promedio de esas distancias al cuadrado</p>
              </div>
              <div className="border-t pt-2">
                <p className="font-semibold">Desviación típica (<InlineMath math="s" />):</p>
                <FormulaDisplay math={`s = \\sqrt{s^2}`} />
                <p className="text-muted-foreground">
                  La varianza está en unidades al cuadrado (10€)², lo cual es difícil de interpretar.
                  La desviación típica, al ser la raíz cuadrada, vuelve a las unidades originales (10€) y es
                  mucho más intuitiva: nos dice &quot;en promedio, los salarios se desvían <InlineMath math="s" /> unidades de la media&quot;.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">Cálculo</p>
            <FormulaDisplay math={`s^2 = \\frac{\\sum (x_i - ${round(m, 4)})^2}{${n}} = ${round(v, 4)} \\text{ (×10€)}^2`} />
            <FormulaDisplay math={`s = \\sqrt{${round(v, 4)}} = ${round(s, 4)} \\text{ (×10€)}`} />
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200 mt-2 mb-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Interpretación</p>
            <p className="text-muted-foreground">
              La desviación típica es <strong>{round(s, 4)}</strong> (×10€), es decir, <strong>{round(s * 10, 2)}€</strong>.
              Esto significa que, en promedio, el salario de cada trabajador se desvía unos {round(s * 10, 2)}€
              respecto al salario medio de {round(m * 10, 2)}€.
            </p>
            <p className="text-muted-foreground mt-1">
              <strong>Coeficiente de variación:</strong> <InlineMath math={`CV = \\frac{s}{\\bar{x}} \\cdot 100 = \\frac{${round(s, 4)}}{${round(m, 4)}} \\cdot 100 = ${cvValue}\\%`} />.
              {cvValue < 50
                ? ` Como CV < 50%, la dispersión es moderada y la media es representativa del conjunto.`
                : ` Como CV > 50%, hay alta dispersión y la media no es muy representativa.`}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ResultCard label="Varianza" value={`${round(v, 4)} (×10€)²`} />
          <ResultCard label="Desviación típica" value={`${round(s, 4)} (×10€) = ${round(s * 10, 2)}€`} />
        </div>
      </StepCard>

      {/* ============ PASO 7: Cuartiles y deciles ============ */}
      <StepCard stepNumber={8} title="e) Primer cuartil y segundo decil" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Qué son los cuartiles y los deciles?</p>
            <p className="text-muted-foreground">
              Los cuartiles y deciles son <strong>medidas de posición</strong> que generalizan la idea de la mediana.
              La mediana divide los datos en 2 partes iguales (50%/50%). Pues bien:
            </p>
            <div className="bg-white rounded p-2 space-y-1 mt-1">
              <p><strong>Cuartiles</strong> dividen los datos en <strong>4 partes iguales</strong> (cada una con el 25%).</p>
              <p className="text-muted-foreground pl-3">
                - <InlineMath math="Q_1" />: el 25% cobra menos que <InlineMath math="Q_1" /> (el &quot;cuarto inferior&quot;)
              </p>
              <p className="text-muted-foreground pl-3">
                - <InlineMath math="Q_2" />: el 50% cobra menos (es la mediana)
              </p>
              <p className="text-muted-foreground pl-3">
                - <InlineMath math="Q_3" />: el 75% cobra menos que <InlineMath math="Q_3" />
              </p>
            </div>
            <div className="bg-white rounded p-2 space-y-1 mt-1">
              <p><strong>Deciles</strong> dividen los datos en <strong>10 partes iguales</strong> (cada una con el 10%).</p>
              <p className="text-muted-foreground pl-3">
                - <InlineMath math="D_1" />: el 10% cobra menos que <InlineMath math="D_1" />
              </p>
              <p className="text-muted-foreground pl-3">
                - <InlineMath math="D_2" />: el 20% cobra menos que <InlineMath math="D_2" />
              </p>
              <p className="text-muted-foreground pl-3">
                - ... y así sucesivamente hasta <InlineMath math="D_9" /> (90%)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-violet-50 border-violet-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-violet-800">¿Cómo se calcula la posición?</p>
            <p className="text-muted-foreground">
              La idea es la misma que con la mediana, pero en vez de buscar el dato del &quot;medio&quot;
              buscamos el dato que deja un cierto porcentaje por debajo:
            </p>
            <div className="bg-white rounded p-2 space-y-1 mt-1">
              <FormulaDisplay math={`\\text{Posición de } Q_k = \\frac{k \\cdot (n+1)}{4}`} />
              <FormulaDisplay math={`\\text{Posición de } D_k = \\frac{k \\cdot (n+1)}{10}`} />
              <p className="text-muted-foreground">
                Si la posición resulta ser un número decimal (ej: 15.25), se interpola entre los dos
                datos adyacentes. Esto es como &quot;hacer una media ponderada&quot; entre el dato de la posición 15 y el de la 16.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">Cálculo del primer cuartil (Q₁)</p>
            <FormulaDisplay math={`Q_1: \\text{posición} = \\frac{1 \\cdot (${n}+1)}{4} = \\frac{${n + 1}}{4} = ${posQ1}`} />
            <p className="text-muted-foreground">
              La posición {posQ1} {Number.isInteger(posQ1)
                ? `es un número entero, así que Q₁ es directamente el dato en la posición ${posQ1} de los datos ordenados.`
                : `no es un número entero, así que interpolamos entre el dato en la posición ${Math.floor(posQ1)} (que vale ${sorted[Math.floor(posQ1) - 1]}) y el de la posición ${Math.ceil(posQ1)} (que vale ${sorted[Math.ceil(posQ1) - 1]}).`}
            </p>
            <FormulaDisplay math={`Q_1 = ${round(q1, 2)}`} />
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">Cálculo del segundo decil (D₂)</p>
            <FormulaDisplay math={`D_2: \\text{posición} = \\frac{2 \\cdot (${n}+1)}{10} = \\frac{${2 * (n + 1)}}{10} = ${posD2}`} />
            <p className="text-muted-foreground">
              La posición {posD2} {Number.isInteger(posD2)
                ? `es un número entero, así que D₂ es directamente el dato en la posición ${posD2} de los datos ordenados.`
                : `no es un número entero, así que interpolamos entre el dato en la posición ${Math.floor(posD2)} (que vale ${sorted[Math.floor(posD2) - 1]}) y el de la posición ${Math.ceil(posD2)} (que vale ${sorted[Math.ceil(posD2) - 1]}).`}
            </p>
            <FormulaDisplay math={`D_2 = ${round(d2, 2)}`} />
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200 mt-2 mb-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Interpretación</p>
            <p className="text-muted-foreground">
              <strong>Q₁ = {round(q1, 2)}</strong> (×10€) = {round(q1 * 10, 0)}€: el 25% de los trabajadores con menores salarios
              cobra {round(q1 * 10, 0)}€ diarios o menos. Dicho de otra forma, si estás en el primer cuartil,
              cobras menos que el 75% de tus compañeros.
            </p>
            <p className="text-muted-foreground mt-1">
              <strong>D₂ = {round(d2, 2)}</strong> (×10€) = {round(d2 * 10, 0)}€: el 20% de los trabajadores con menores salarios
              cobra {round(d2 * 10, 0)}€ diarios o menos. Es un corte más bajo que Q₁ porque el 20% es un grupo
              más pequeño que el 25%.
            </p>
            <p className="text-muted-foreground mt-1">
              Observa que D₂ ({round(d2, 2)}) &lt; Q₁ ({round(q1, 2)}), lo cual tiene sentido: el punto que
              deja el 20% por debajo siempre es menor o igual que el que deja el 25% por debajo.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ResultCard label="Q₁" value={`${round(q1, 2)} (×10€) = ${round(q1 * 10, 0)}€`} />
          <ResultCard label="D₂" value={`${round(d2, 2)} (×10€) = ${round(d2 * 10, 0)}€`} />
        </div>
      </StepCard>

      {/* ============ PASO 8: Boxplot ============ */}
      <StepCard stepNumber={9} title="Diagrama de caja (Boxplot)" variant="explanation">
        <Card className="bg-violet-50 border-violet-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-violet-800">¿Qué es un diagrama de caja y cómo se lee?</p>
            <p className="text-muted-foreground">
              El boxplot (diagrama de caja y bigotes) es un resumen visual que condensa cinco estadísticos
              clave en un solo gráfico. Es la &quot;radiografía&quot; de una distribución.
            </p>
            <div className="bg-white rounded p-2 space-y-1 mt-1">
              <p><strong>Los 5 valores que muestra:</strong></p>
              <p className="text-muted-foreground">
                - <strong>Mínimo</strong> ({Math.min(...rawData)}): el salario más bajo
              </p>
              <p className="text-muted-foreground">
                - <strong>Q₁</strong> ({round(q1, 2)}): el borde izquierdo de la caja (25% por debajo)
              </p>
              <p className="text-muted-foreground">
                - <strong>Mediana</strong> ({round(med, 2)}): la línea central dentro de la caja (50%)
              </p>
              <p className="text-muted-foreground">
                - <strong>Q₃</strong> ({round(q3, 2)}): el borde derecho de la caja (75% por debajo)
              </p>
              <p className="text-muted-foreground">
                - <strong>Máximo</strong> ({Math.max(...rawData)}): el salario más alto
              </p>
            </div>
            <p className="text-muted-foreground mt-1">
              La <strong>caja</strong> contiene el 50% central de los datos (entre Q₁ y Q₃).
              Los <strong>bigotes</strong> se extienden hasta el mínimo y el máximo.
              Cuanto más ancha es la caja, mayor es la dispersión del 50% central.
            </p>
          </CardContent>
        </Card>

        <BoxPlot
          min={Math.min(...rawData)}
          q1={round(q1, 2)}
          median={round(med, 2)}
          q3={round(q3, 2)}
          max={Math.max(...rawData)}
          title="Diagrama de caja - Salarios (×10€)"
          label="Salario (×10€)"
        />

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Lectura del boxplot</p>
            <p className="text-muted-foreground">
              La caja va de {round(q1, 2)} a {round(q3, 2)} (rango intercuartílico = {round(q3 - q1, 2)}).
              La mediana ({round(med, 2)}) está {round(med - q1, 2) > round(q3 - med, 2) ? "más cerca de Q₃ que de Q₁, lo que indica una ligera asimetría negativa (cola hacia la izquierda)" : round(med - q1, 2) < round(q3 - med, 2) ? "más cerca de Q₁ que de Q₃, lo que indica una ligera asimetría positiva (cola hacia la derecha)" : "centrada en la caja, lo que indica simetría"}.
              El bigote izquierdo (de {Math.min(...rawData)} a {round(q1, 2)}) es {round(q1 - Math.min(...rawData), 2) > round(Math.max(...rawData) - q3, 2) ? "más largo que" : "más corto que"} el
              derecho (de {round(q3, 2)} a {Math.max(...rawData)}), lo que confirma la dirección de la asimetría.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 9: Resumen final ============ */}
      <StepCard stepNumber={10} title="Resumen: ¿qué hemos aprendido de estos salarios?" variant="result">
        <p className="text-sm mb-3">
          Hemos realizado un análisis descriptivo completo. Aquí reunimos todos los resultados
          y lo que nos dicen sobre los salarios de la fábrica:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 text-blue-800 text-[10px]">Posición central</Badge>
              <p className="text-[10px] text-muted-foreground">
                Media = {round(m, 4)} ({round(m * 10, 2)}€), Mediana = {round(med, 2)} ({round(med * 10, 0)}€),
                Moda = {mod.join(", ")} ({mod.map(m => m * 10).join(", ")}€).
                Las tres medidas están próximas, indicando una distribución bastante centrada
                en torno a los 250-260€ diarios.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 text-emerald-800 text-[10px]">Dispersión</Badge>
              <p className="text-[10px] text-muted-foreground">
                Desviación típica = {round(s, 4)} ({round(s * 10, 2)}€), CV = {cvValue}%.
                {cvValue < 50
                  ? " La dispersión es moderada: los salarios no son todos iguales, pero tampoco hay enormes diferencias."
                  : " Hay bastante dispersión en los salarios."}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 text-violet-800 text-[10px]">Posición (cuartiles)</Badge>
              <p className="text-[10px] text-muted-foreground">
                Q₁ = {round(q1, 2)} ({round(q1 * 10, 0)}€), D₂ = {round(d2, 2)} ({round(d2 * 10, 0)}€).
                El 25% peor pagado cobra menos de {round(q1 * 10, 0)}€/día, y el 20% peor pagado
                cobra menos de {round(d2 * 10, 0)}€/día.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-rose-200 text-rose-800 text-[10px]">Rango salarial</Badge>
              <p className="text-[10px] text-muted-foreground">
                Los salarios van de {Math.min(...rawData) * 10}€ a {Math.max(...rawData) * 10}€ diarios
                (rango = {(Math.max(...rawData) - Math.min(...rawData)) * 10}€).
                El 50% central de los trabajadores cobra entre {round(q1 * 10, 0)}€ y {round(q3 * 10, 0)}€.
              </p>
            </CardContent>
          </Card>
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
