"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
const cv1 = std1 / Math.abs(mean1);

// Verificamos x = -10:
const data2 = [-10, 3, -10, 10, 1, 0];
const mean2 = mean(data2);
const std2 = stdDev(data2);
const cv2 = std2 / Math.abs(mean2);

// Varianzas para verificación detallada
const var1 = variance(data1);
const var2 = variance(data2);

// Desviaciones individuales para x = 2
const deviations1 = data1.map((x) => round((x - mean1) ** 2, 4));
const sumDeviations1 = deviations1.reduce((a, b) => a + b, 0);

// Desviaciones individuales para x = -10
const deviations2 = data2.map((x) => round((x - mean2) ** 2, 4));
const sumDeviations2 = deviations2.reduce((a, b) => a + b, 0);

export default function Complementario3() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber="C3"
      title="Relacion entre Desviacion Tipica y CV"
      difficulty="Medio"
      category="Propiedades de medidas de dispersión"
      statement={
        <div className="space-y-2">
          <p>
            Dada la serie de datos &#123;-10, 3, x, 10, 1, 0&#125;, se sabe
            que su desviacion tipica es igual a su coeficiente de variacion de
            Pearson.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) El valor de x</li>
            <li>b) La media de los seis valores</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/complementario-2"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard
        stepNumber={1}
        title="¿Que vamos a aprender en este ejercicio?"
        variant="explanation"
      >
        <p>
          Este ejercicio nos ensena a <strong>razonar algebraicamente</strong>{" "}
          con las formulas de estadistica. En lugar de calcular directamente,
          vamos a <em>pensar</em> sobre que implica una condicion matematica.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-sm">
                Razonamiento algebraico
              </Badge>
              <p className="text-sm text-muted-foreground">
                Traducir la condicion &quot;sigma = CV&quot; en una ecuacion
                resoluble para hallar x.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 text-sm">
                Valor absoluto
              </Badge>
              <p className="text-sm text-muted-foreground">
                Una ecuacion con valor absoluto puede dar dos soluciones
                distintas.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 dark:bg-violet-800/40 text-violet-800 dark:text-violet-200 text-sm">
                Verificacion
              </Badge>
              <p className="text-sm text-muted-foreground">
                Siempre comprobar que las soluciones obtenidas realmente cumplen
                la condicion original.
              </p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 1: Recordar qué son σ y CV ============ */}
      <StepCard
        stepNumber={2}
        title="Recordemos: ¿Que son sigma y CV?"
        variant="explanation"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-blue-800 dark:text-blue-200">
                Desviacion tipica (<InlineMath math="\sigma" />)
              </p>
              <FormulaDisplay
                math={`\\sigma = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n}}`}
              />
              <p className="text-muted-foreground">
                Mide cuanto se alejan los datos de su media,{" "}
                <strong>en las mismas unidades</strong> que los datos. Ejemplo:
                si los datos son en euros, sigma esta en euros.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                Coeficiente de Variacion de Pearson (
                <InlineMath math="CV" />)
              </p>
              <FormulaDisplay
                math={`CV = \\frac{\\sigma}{|\\bar{x}|}`}
              />
              <p className="text-muted-foreground">
                Es la desviacion tipica <strong>dividida entre la media</strong>{" "}
                (en valor absoluto). Es adimensional: sirve para comparar
                dispersiones entre distribuciones con distintas unidades o
                escalas.
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-3">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-amber-800 dark:text-amber-200">
              La relacion clave entre ambos
            </p>
            <p className="text-muted-foreground mt-1">
              El CV es simplemente sigma &quot;normalizado&quot; por la media.
              Dicho de otra forma:{" "}
              <InlineMath math="CV = \sigma \cdot \frac{1}{|\bar{x}|}" />. El
              CV siempre es menor que sigma cuando{" "}
              <InlineMath math="|\bar{x}| > 1" />, igual cuando{" "}
              <InlineMath math="|\bar{x}| = 1" />, y mayor cuando{" "}
              <InlineMath math="|\bar{x}| < 1" />.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Planteamiento algebraico ============ */}
      <StepCard
        stepNumber={3}
        title="Planteamiento: si sigma = CV, ¿que implica?"
        variant="calculation"
      >
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">
              Idea clave del ejercicio
            </p>
            <p className="text-muted-foreground">
              No necesitamos calcular sigma directamente. Vamos a usar la{" "}
              <strong>relacion entre las formulas</strong> para deducir
              informacion sobre la media, y de ahi obtener x.
            </p>
          </CardContent>
        </Card>

        <p>Nos dicen que la desviacion tipica es igual al coeficiente de variacion:</p>
        <FormulaDisplay math={`\\sigma = CV`} />

        <p>Sustituimos la definicion del CV:</p>
        <FormulaDisplay
          math={`\\sigma = \\frac{\\sigma}{|\\bar{x}|}`}
        />

        <p>
          Dividimos ambos lados entre <InlineMath math="\sigma" /> (podemos
          hacerlo porque <InlineMath math="\sigma \neq 0" />, ya que los datos
          no son todos iguales):
        </p>
        <FormulaDisplay
          math={`1 = \\frac{1}{|\\bar{x}|}`}
        />

        <p>Despejamos:</p>
        <FormulaDisplay math={`|\\bar{x}| = 1`} />

        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-violet-800 dark:text-violet-200">
              ¿Que significa esto?
            </p>
            <p className="text-muted-foreground mt-1">
              Hemos descubierto que{" "}
              <strong>
                la media de los datos tiene que ser exactamente 1 o -1
              </strong>
              . El valor absoluto admite dos posibilidades:
            </p>
            <FormulaDisplay
              math={`\\bar{x} = 1 \\quad \\text{o} \\quad \\bar{x} = -1`}
            />
            <p className="text-muted-foreground">
              Tenemos que explorar ambos casos y ver que valor de x produce cada uno.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 3: Expresar la media en función de x ============ */}
      <StepCard
        stepNumber={4}
        title="Expresar la media en funcion de x"
        variant="calculation"
      >
        <p>Calculamos la suma de todos los datos (dejando x como incognita):</p>
        <FormulaDisplay
          math={`\\sum x_i = -10 + 3 + x + 10 + 1 + 0 = 4 + x`}
        />
        <p>
          Como hay <InlineMath math="n = 6" /> datos, la media es:
        </p>
        <FormulaDisplay math={`\\bar{x} = \\frac{4 + x}{6}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p className="text-muted-foreground">
              Ahora tenemos una expresion sencilla que relaciona la media con x.
              Combinandola con la condicion{" "}
              <InlineMath math="|\bar{x}| = 1" />, podemos despejar x.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 4: Caso 1 ============ */}
      <StepCard
        stepNumber={5}
        title={
          <span>
            Caso 1: <InlineMath math="\bar{x} = 1" />
          </span>
        }
        variant="calculation"
      >
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">
              Suponemos que la media es positiva e igual a 1
            </p>
            <p className="text-muted-foreground">
              Si <InlineMath math="\bar{x} = 1" />, igualamos nuestra expresion de
              la media a 1 y despejamos x.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay
          math={`\\frac{4 + x}{6} = 1`}
        />
        <p>Multiplicamos ambos lados por 6:</p>
        <FormulaDisplay math={`4 + x = 6`} />
        <p>Restamos 4:</p>
        <FormulaDisplay math={`x = 6 - 4 = 2`} />

        <ResultCard label="Solucion Caso 1" value="x = 2, media = 1" />

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p className="text-muted-foreground">
              <strong>Interpretacion:</strong> Si x = 2, los datos serian &#123;-10,
              3, 2, 10, 1, 0&#125; con media igual a 1. Como{" "}
              <InlineMath math="|\bar{x}| = |1| = 1" />, la desviacion tipica y
              el CV coincidirian.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 5: Caso 2 ============ */}
      <StepCard
        stepNumber={6}
        title={
          <span>
            Caso 2: <InlineMath math="\bar{x} = -1" />
          </span>
        }
        variant="calculation"
      >
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">
              Suponemos que la media es negativa e igual a -1
            </p>
            <p className="text-muted-foreground">
              Si <InlineMath math="\bar{x} = -1" />, igualamos nuestra expresion
              de la media a -1 y despejamos x.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay
          math={`\\frac{4 + x}{6} = -1`}
        />
        <p>Multiplicamos ambos lados por 6:</p>
        <FormulaDisplay math={`4 + x = -6`} />
        <p>Restamos 4:</p>
        <FormulaDisplay math={`x = -6 - 4 = -10`} />

        <ResultCard label="Solucion Caso 2" value="x = -10, media = -1" />

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-2 text-sm">
            <p className="text-muted-foreground">
              <strong>Interpretacion:</strong> Si x = -10, los datos serian
              &#123;-10, 3, -10, 10, 1, 0&#125; con media igual a -1. Como{" "}
              <InlineMath math="|\bar{x}| = |-1| = 1" />, la condicion tambien
              se cumple. Notemos que ahora hay dos valores iguales a -10 en el
              conjunto de datos.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 6: Verificación Caso 1 ============ */}
      <StepCard
        stepNumber={7}
        title="Verificacion detallada: Caso 1 (x = 2)"
        variant="calculation"
      >
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mb-3">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-violet-800 dark:text-violet-200">
              ¿Por que verificar?
            </p>
            <p className="text-muted-foreground mt-1">
              Nuestra deduccion algebraica fue correcta, pero en estadistica
              siempre es buena practica comprobar numericamente. Vamos a calcular
              sigma y CV por separado y confirmar que coinciden.
            </p>
          </CardContent>
        </Card>

        <p>
          Datos: &#123;-10, 3, 2, 10, 1, 0&#125;
        </p>

        <p className="font-semibold text-sm mt-2">1. Media:</p>
        <FormulaDisplay
          math={`\\bar{x} = \\frac{-10 + 3 + 2 + 10 + 1 + 0}{6} = \\frac{6}{6} = ${round(mean1, 4)}`}
        />

        <p className="font-semibold text-sm mt-2">2. Varianza:</p>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-sm my-2">
            {data1.map((xi, i) => (
              <Card key={i} className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-2 text-center">
                  <InlineMath
                    math={`(${xi} - ${round(mean1, 0)})^2 = ${deviations1[i]}`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <FormulaDisplay
          math={`\\sigma^2 = \\frac{${deviations1.join(" + ")}}{6} = \\frac{${round(sumDeviations1, 4)}}{6} = ${round(var1, 4)}`}
        />

        <p className="font-semibold text-sm mt-2">3. Desviacion tipica:</p>
        <FormulaDisplay
          math={`\\sigma = \\sqrt{${round(var1, 4)}} = ${round(std1, 4)}`}
        />

        <p className="font-semibold text-sm mt-2">4. Coeficiente de variacion:</p>
        <FormulaDisplay
          math={`CV = \\frac{\\sigma}{|\\bar{x}|} = \\frac{${round(std1, 4)}}{|${round(mean1, 4)}|} = \\frac{${round(std1, 4)}}{${Math.abs(round(mean1, 4))}} = ${round(cv1, 4)}`}
        />

        <Card className="bg-green-50 dark:bg-green-950/20 border-green-300 mt-3">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-green-800 dark:text-green-200">
              Comprobacion exitosa
            </p>
            <FormulaDisplay
              math={`\\sigma = ${round(std1, 4)} = CV = ${round(cv1, 4)} \\quad \\checkmark`}
            />
            <p className="text-muted-foreground">
              Ambos valores coinciden exactamente, lo que confirma que x = 2 es
              solucion valida. Esto tiene sentido: cuando{" "}
              <InlineMath math="|\bar{x}| = 1" />, dividir sigma entre 1 da el
              mismo sigma.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 7: Verificación Caso 2 ============ */}
      <StepCard
        stepNumber={8}
        title="Verificacion detallada: Caso 2 (x = -10)"
        variant="calculation"
      >
        <p>
          Datos: &#123;-10, 3, -10, 10, 1, 0&#125;
        </p>

        <p className="font-semibold text-sm mt-2">1. Media:</p>
        <FormulaDisplay
          math={`\\bar{x} = \\frac{-10 + 3 + (-10) + 10 + 1 + 0}{6} = \\frac{-6}{6} = ${round(mean2, 4)}`}
        />

        <p className="font-semibold text-sm mt-2">2. Varianza:</p>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-sm my-2">
            {data2.map((xi, i) => (
              <Card key={i} className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-2 text-center">
                  <InlineMath
                    math={`(${xi} - (${round(mean2, 0)}))^2 = ${deviations2[i]}`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <FormulaDisplay
          math={`\\sigma^2 = \\frac{${deviations2.join(" + ")}}{6} = \\frac{${round(sumDeviations2, 4)}}{6} = ${round(var2, 4)}`}
        />

        <p className="font-semibold text-sm mt-2">3. Desviacion tipica:</p>
        <FormulaDisplay
          math={`\\sigma = \\sqrt{${round(var2, 4)}} = ${round(std2, 4)}`}
        />

        <p className="font-semibold text-sm mt-2">4. Coeficiente de variacion:</p>
        <FormulaDisplay
          math={`CV = \\frac{\\sigma}{|\\bar{x}|} = \\frac{${round(std2, 4)}}{|${round(mean2, 4)}|} = \\frac{${round(std2, 4)}}{${Math.abs(round(mean2, 4))}} = ${round(cv2, 4)}`}
        />

        <Card className="bg-green-50 dark:bg-green-950/20 border-green-300 mt-3">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-green-800 dark:text-green-200">
              Comprobacion exitosa
            </p>
            <FormulaDisplay
              math={`\\sigma = ${round(std2, 4)} = CV = ${round(cv2, 4)} \\quad \\checkmark`}
            />
            <p className="text-muted-foreground">
              Tambien coinciden. La desviacion tipica es mayor en este caso (
              {round(std2, 4)} vs {round(std1, 4)}) porque los datos estan mas
              dispersos al tener dos valores de -10.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 8: Comparación de soluciones ============ */}
      <StepCard
        stepNumber={9}
        title="Comparacion de ambas soluciones"
        variant="explanation"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm">
                Solucion 1: x = 2
              </p>
              <div className="space-y-1">
                <p>
                  Datos: &#123;-10, 3, 2, 10, 1, 0&#125;
                </p>
                <p>
                  Media: <InlineMath math={`\\bar{x} = ${round(mean1, 4)}`} />
                </p>
                <p>
                  Sigma:{" "}
                  <InlineMath math={`\\sigma = ${round(std1, 4)}`} />
                </p>
                <p>
                  CV: <InlineMath math={`CV = ${round(cv1, 4)}`} />
                </p>
              </div>
              <p className="text-muted-foreground">
                La media positiva indica que el &quot;centro&quot; de los datos esta
                ligeramente por encima de cero.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200 text-sm">
                Solucion 2: x = -10
              </p>
              <div className="space-y-1">
                <p>
                  Datos: &#123;-10, 3, -10, 10, 1, 0&#125;
                </p>
                <p>
                  Media: <InlineMath math={`\\bar{x} = ${round(mean2, 4)}`} />
                </p>
                <p>
                  Sigma:{" "}
                  <InlineMath math={`\\sigma = ${round(std2, 4)}`} />
                </p>
                <p>
                  CV: <InlineMath math={`CV = ${round(cv2, 4)}`} />
                </p>
              </div>
              <p className="text-muted-foreground">
                La media negativa y una sigma mayor reflejan datos mas dispersos,
                arrastrados por los dos -10.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-3">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-amber-800 dark:text-amber-200">
              ¿Por que hay dos soluciones?
            </p>
            <p className="text-muted-foreground mt-1">
              La condicion <InlineMath math="|\bar{x}| = 1" /> admite dos
              valores de la media (1 y -1) porque el valor absoluto &quot;pierde&quot;
              la informacion del signo. En general, cuando una ecuacion involucra
              valores absolutos, hay que considerar siempre ambos casos. Ambas
              soluciones son matematicamente validas.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 9: Resultado final ============ */}
      <StepCard stepNumber={10} title="Resultado final" variant="result">
        <div className="space-y-3">
          <ResultCard label="Solucion 1" value="x = 2, media = 1" />
          <ResultCard label="Solucion 2" value="x = -10, media = -1" />
        </div>

        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mt-4">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-violet-800 dark:text-violet-200">
              Leccion aprendida
            </p>
            <p className="text-muted-foreground">
              La condicion <InlineMath math="\sigma = CV" /> es equivalente a
              decir que <InlineMath math="|\bar{x}| = 1" />. Esto es una
              consecuencia directa de la definicion del CV: al dividir sigma
              entre un denominador igual a 1, el cociente no cambia. Este tipo
              de razonamiento algebraico -- manipular formulas antes de
              sustituir numeros -- es una herramienta muy poderosa en
              estadistica que permite resolver problemas sin necesidad de
              calculos complicados.
            </p>
          </CardContent>
        </Card>
      </StepCard>
    </ExerciseLayout>
  );
}
