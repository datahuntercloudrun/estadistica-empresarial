"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { round } from "@/lib/stats/descriptive";

// Datos: y = 3.5 + 2.3x, R² = 94% = 0.94
// X = tiempo (horas), Y = coste (euros)
const alpha = 3.5;
const beta = 2.3;
const R2 = 0.94;

const coste3_5h = alpha + beta * 3.5;
const coste4_5h = alpha + beta * 4.5;
const incremento1h = beta; // por cada hora extra

export default function Complementario3() {
  return (
    <ExerciseLayout
      tema={4}
      exerciseNumber="C3"
      title="Parking: Coste vs Tiempo"
      difficulty="Bajo"
      category="Regresión e interpretación"
      statement={
        <div className="space-y-2">
          <p>Un usuario de un aparcamiento sabe que el coste (en euros) depende del tiempo (en horas) según:</p>
          <FormulaDisplay math="y = 3{,}5 + 2{,}3x" />
          <p>Con un coeficiente de determinación del 94%.</p>
          <p>a) Interpretación de los coeficientes &nbsp; b) Fiabilidad y variabilidad no explicada &nbsp; c) Coste para 3,5h y 4,5h</p>
        </div>
      }
      prevUrl="/tema-4/complementario-2"
      nextUrl="/tema-4/ejercicio-1"
    >
      {/* PASO 1 */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender?" variant="explanation">
        <p>
          Este ejercicio es puramente de <strong>interpretación</strong>: nos dan la recta y el R² ya calculados
          y debemos explicar qué significan en lenguaje cotidiano. Es el tipo de pregunta que aparece en examen.
        </p>
      </StepCard>

      {/* PASO 2: Interpretación coeficientes */}
      <StepCard stepNumber={2} title="a) Interpretación de los coeficientes" variant="explanation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-bold text-blue-800 dark:text-blue-200"><InlineMath math="\alpha = 3{,}5" /> (ordenada en el origen)</p>
              <p className="text-muted-foreground">
                Es el <strong>coste fijo</strong> del aparcamiento. Aunque estés 0 horas (teóricamente),
                pagarías 3,50 euros. En la práctica, representa la tarifa mínima de entrada.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-bold text-emerald-800 dark:text-emerald-200"><InlineMath math="\beta = 2{,}3" /> (pendiente)</p>
              <p className="text-muted-foreground">
                Es el <strong>coste por hora</strong> adicional. Por cada hora extra que estés aparcado,
                pagas <strong>2,30 euros más</strong>.
              </p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* PASO 3: Fiabilidad */}
      <StepCard stepNumber={3} title="b) Fiabilidad del modelo" variant="explanation">
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-bold text-emerald-800 dark:text-emerald-200">R² = 0,94 (94%)</p>
            <p className="text-muted-foreground">
              El modelo lineal explica el <strong>94% de la variabilidad</strong> del coste en función del tiempo.
              Es un ajuste <strong>muy bueno</strong>. La expresión es muy fiable para estimar costes.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-bold text-rose-800 dark:text-rose-200">Variabilidad no explicada</p>
            <FormulaDisplay math={`1 - R^2 = 1 - 0{,}94 = 0{,}06 = 6\\%`} />
            <p className="text-muted-foreground">
              Solo el <strong>6%</strong> de la variación en lo que paga el usuario no queda explicado por el tiempo.
              Esto puede deberse a: tarifas nocturnas/diurnas, descuentos, redondeos, etc.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* PASO 4: Estimaciones */}
      <StepCard stepNumber={4} title="c) Estimación de costes" variant="result">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-bold text-blue-800 dark:text-blue-200">3,5 horas</p>
              <FormulaDisplay math={`y = 3{,}5 + 2{,}3 \\times 3{,}5 = 3{,}5 + ${round(beta * 3.5, 2)} = ${round(coste3_5h, 2)} \\text{ euros}`} />
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-bold text-emerald-800 dark:text-emerald-200">4,5 horas (1 hora más)</p>
              <FormulaDisplay math={`y = 3{,}5 + 2{,}3 \\times 4{,}5 = 3{,}5 + ${round(beta * 4.5, 2)} = ${round(coste4_5h, 2)} \\text{ euros}`} />
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="text-muted-foreground">
              La diferencia entre 4,5h y 3,5h es exactamente <InlineMath math={`\\beta = 2{,}3`} /> euros,
              como esperábamos. Cada hora adicional cuesta 2,30 euros.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <ResultCard label="Coste 3,5 horas" value={`${round(coste3_5h, 2)} euros`} />
          <ResultCard label="Coste 4,5 horas" value={`${round(coste4_5h, 2)} euros`} />
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
