"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FrequencyTable } from "@/components/stats/frequency-table";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BarChartCustom } from "@/components/charts/bar-chart-custom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { frequencyTable } from "@/lib/stats/frequencies";
import { mean, median, mode, round } from "@/lib/stats/descriptive";

const rawData = [6, 1, 6, 3, 1, 4, 5, 2, 5, 6, 1, 5, 3, 4, 1, 4, 6, 1, 2, 1];

const freqTable = frequencyTable(rawData);
const m = mean(rawData);
const med = median(rawData);
const mod = mode(rawData);
const sorted = [...rawData].sort((a, b) => a - b);

export default function Ejercicio2() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={2}
      title="Análisis de Lanzamiento de Dado"
      difficulty="Bajo"
      category="Estadística descriptiva básica"
      statement={
        <div className="space-y-2">
          <p>Se ha lanzado un dado 20 veces y se han obtenido los resultados:</p>
          <p className="font-mono text-sm bg-white p-2 rounded">
            {rawData.join(", ")}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Presente los resultados en una tabla estadística</li>
            <li>b) Realice su representación gráfica</li>
            <li>c) Obtenga la media aritmética, mediana y moda</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-1"
      nextUrl="/tema-3/ejercicio-3"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio nos enseña las <strong>tres medidas de centralización más importantes</strong> de la estadística:
          media, mediana y moda. Las tres responden a la misma pregunta pero de formas diferentes:
        </p>
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">La gran pregunta: &quot;¿Cuál es el valor típico de estos datos?&quot;</p>
            <p className="text-muted-foreground">
              Si alguien te pregunta: &quot;¿Qué suele salir cuando lanzas este dado?&quot;, podrías responder de tres formas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-blue-700">Media</p>
                <p className="text-[10px] text-muted-foreground">&quot;El promedio de todos los lanzamientos&quot;</p>
              </div>
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-emerald-700">Mediana</p>
                <p className="text-[10px] text-muted-foreground">&quot;El valor que queda justo en el centro&quot;</p>
              </div>
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-violet-700">Moda</p>
                <p className="text-[10px] text-muted-foreground">&quot;El valor que más veces ha salido&quot;</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-1">
              Las tres son &quot;respuestas válidas&quot;, pero cada una tiene ventajas y desventajas que veremos.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 1: Tabla estadística ============ */}
      <StepCard stepNumber={2} title="a) Tabla estadística" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Por qué hacer una tabla de frecuencias?</p>
            <p className="text-muted-foreground">
              Tenemos 20 resultados sueltos que no nos dicen mucho. La tabla organiza estos datos
              respondiendo: <strong>&quot;¿cuántas veces ha salido cada cara del dado?&quot;</strong>
            </p>
            <p className="text-muted-foreground">
              Como la variable (cara del dado) es <strong>discreta</strong> (solo valores 1, 2, 3, 4, 5, 6),
              no necesitamos agrupar en intervalos. Cada valor tiene su propia fila.
            </p>
          </CardContent>
        </Card>
        <FrequencyTable
          data={freqTable.map((r) => ({ xi: r.xi, ni: r.ni, fi: r.fi, Ni: r.Ni, Fi: r.Fi }))}
          title="Tabla de frecuencias - Lanzamiento de dado"
        />
        <Card className="bg-blue-50 border-blue-200 mt-2">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">¿Cómo leer esta tabla?</p>
            <div className="space-y-1 text-muted-foreground">
              <p>Fila del valor 1: <InlineMath math="n_i" />=6 → el 1 salió 6 veces. <InlineMath math="f_i" />=0.30 → supone el 30% de los lanzamientos.</p>
              <p><InlineMath math="N_i" />=6 → hay 6 resultados ≤ 1. <InlineMath math="F_i" />=0.30 → el 30% de los resultados son ≤ 1.</p>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Representación gráfica ============ */}
      <StepCard stepNumber={3} title="b) Representación gráfica" variant="explanation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Por qué un diagrama de barras y no un histograma?</p>
            <p className="text-muted-foreground">
              Porque la variable es <strong>discreta</strong> (las caras del dado son valores aislados: 1, 2, 3, 4, 5, 6).
              Las barras van <strong>separadas</strong> para indicar que entre un valor y otro no hay nada
              (no existe la cara 2.5 del dado). Si fuera una variable continua, usaríamos un histograma (barras pegadas).
            </p>
          </CardContent>
        </Card>
        <BarChartCustom
          data={freqTable.map((r) => ({ name: r.xi, value: r.ni }))}
          title="Diagrama de barras - Resultados del dado"
          xLabel="Cara del dado"
          yLabel="Frecuencia absoluta"
        />
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>¿Qué nos dice el gráfico?</strong> El dado parece &quot;cargado&quot;: el 1 sale mucho más que el resto (6 veces de 20).
            Un dado justo daría cada cara unas 3-4 veces de 20 lanzamientos (20/6 ≈ 3.33).</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 3: Media aritmética ============ */}
      <StepCard stepNumber={4} title="c) Media aritmética" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">¿Qué es la media aritmética?</p>
            <p className="text-muted-foreground">
              Es el <strong>valor promedio</strong>: si repartiéramos todos los resultados equitativamente,
              ¿qué valor le tocaría a cada lanzamiento?
            </p>
            <p className="font-semibold text-blue-800">La fórmula, paso a paso:</p>
            <FormulaDisplay math={`\\bar{x} = \\frac{\\sum x_i \\cdot n_i}{n}`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="\bar{x}" /> = la media (lo que buscamos)</p>
              <p><InlineMath math="x_i" /> = cada valor posible (1, 2, 3, 4, 5, 6)</p>
              <p><InlineMath math="n_i" /> = cuántas veces aparece ese valor</p>
              <p><InlineMath math="n" /> = total de datos (20 lanzamientos)</p>
              <p><InlineMath math="\sum x_i \cdot n_i" /> = &quot;suma de cada valor multiplicado por las veces que aparece&quot;</p>
            </div>
            <p className="text-muted-foreground">
              <strong>En palabras:</strong> &quot;Multiplica cada cara por las veces que salió, suma todo, y divide entre el total de lanzamientos.&quot;
            </p>
          </CardContent>
        </Card>

        <p className="text-sm mb-1">Aplicamos la fórmula:</p>
        <FormulaDisplay math={`\\sum x_i \\cdot n_i = (1 \\cdot 6) + (2 \\cdot 2) + (3 \\cdot 2) + (4 \\cdot 3) + (5 \\cdot 3) + (6 \\cdot 4)`} />
        <FormulaDisplay math={`= 6 + 4 + 6 + 12 + 15 + 24 = ${rawData.reduce((s, x) => s + x, 0)}`} />
        <FormulaDisplay math={`\\bar{x} = \\frac{${rawData.reduce((s, x) => s + x, 0)}}{${rawData.length}} = ${round(m, 2)}`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>¿Tiene sentido?</strong> La media de un dado justo sería (1+2+3+4+5+6)/6 = 3.5.
            Nuestra media es {round(m, 2)}, que es menor porque el 1 (valor bajo) salió muchas veces.
            Tiene sentido: muchos resultados bajos tiran la media hacia abajo.</p>
          </CardContent>
        </Card>

        <ResultCard label="Media aritmética" value={`${round(m, 2)}`} />
      </StepCard>

      {/* ============ PASO 4: Mediana ============ */}
      <StepCard stepNumber={5} title="c) Mediana" variant="calculation">
        <Card className="bg-emerald-50 border-emerald-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-emerald-800">¿Qué es la mediana?</p>
            <p className="text-muted-foreground">
              Es el <strong>valor que divide los datos ordenados exactamente por la mitad</strong>:
              el 50% de los datos son menores o iguales que la mediana, y el otro 50% son mayores o iguales.
            </p>
            <p className="text-muted-foreground">
              <strong>Ventaja sobre la media:</strong> No se ve afectada por valores extremos.
              Si un lanzamiento fuera &quot;1000&quot; por error, la media se dispararía pero la mediana apenas cambiaría.
            </p>
            <p className="font-semibold text-emerald-800">¿Cómo se calcula?</p>
            <div className="bg-white rounded p-2 space-y-1">
              <p><strong>Paso 1:</strong> Ordena todos los datos de menor a mayor.</p>
              <p><strong>Paso 2:</strong> Busca la posición central.</p>
              <p>- Si n es <strong>impar</strong>: la mediana es el valor que está en la posición (n+1)/2.</p>
              <p>- Si n es <strong>par</strong>: la mediana es la media de los dos valores centrales.</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-sm font-medium mb-1">Paso 1: Ordenamos los {rawData.length} datos:</p>
        <p className="text-xs font-mono bg-gray-50 p-2 rounded mb-2">
          {sorted.map((v, i) => (
            <span key={i}>
              {i === 9 || i === 10 ? <strong className="text-emerald-700 bg-emerald-100 px-0.5 rounded">{v}</strong> : v}
              {i < sorted.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>

        <p className="text-sm font-medium mb-1">Paso 2: Buscamos la posición central:</p>
        <p className="text-xs text-muted-foreground mb-2">
          Como n={rawData.length} es <strong>par</strong>, no hay un dato exactamente en el centro.
          Las dos posiciones centrales son <InlineMath math={`\\frac{n}{2} = ${rawData.length / 2}`} /> y <InlineMath math={`\\frac{n}{2}+1 = ${rawData.length / 2 + 1}`} />.
          La mediana es la media de los valores en las posiciones <strong>{rawData.length / 2} y {rawData.length / 2 + 1}</strong> (los resaltados arriba):
        </p>
        <FormulaDisplay math={`Me = \\frac{x_{(10)} + x_{(11)}}{2} = \\frac{${sorted[9]} + ${sorted[10]}}{2} = ${med}`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>¿Qué significa?</strong> El 50% de los lanzamientos dieron un valor ≤ {med},
            y el otro 50% dieron un valor ≥ {med}. Es el &quot;punto medio&quot; de los datos.</p>
          </CardContent>
        </Card>

        <ResultCard label="Mediana" value={`${med}`} />
      </StepCard>

      {/* ============ PASO 5: Moda ============ */}
      <StepCard stepNumber={6} title="c) Moda" variant="calculation">
        <Card className="bg-violet-50 border-violet-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-violet-800">¿Qué es la moda?</p>
            <p className="text-muted-foreground">
              Es simplemente el <strong>valor que más veces se repite</strong>.
              Es la medida más intuitiva: si preguntas &quot;¿qué suele salir?&quot;, la moda es la respuesta más directa.
            </p>
            <p className="font-semibold text-violet-800">¿Cómo se encuentra?</p>
            <div className="bg-white rounded p-2 space-y-1">
              <p>Miras la tabla de frecuencias y buscas cuál tiene la <InlineMath math="n_i" /> más grande.</p>
              <p><strong>Ojo:</strong> Puede haber más de una moda (bimodal, trimodal...) si varios valores empatan en frecuencia máxima.</p>
            </div>
            <p className="text-muted-foreground">
              <strong>Ventaja:</strong> Es la única medida que sirve para variables cualitativas
              (ej: el color más popular es &quot;azul&quot; → esa es la moda).
            </p>
          </CardContent>
        </Card>

        <p className="text-sm mb-1">Miramos la tabla de frecuencias y buscamos el <InlineMath math="n_i" /> mayor:</p>
        <div className="space-y-1 mt-2">
          {freqTable.map((r) => (
            <div key={r.xi} className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs ${r.xNum === mod[0] ? "bg-violet-100 border-violet-300 border font-semibold" : "bg-gray-50"}`}>
              <span className="w-8">x={r.xi}</span>
              <span className="flex-1">
                <InlineMath math="n_i" /> = {r.ni}
              </span>
              {r.xNum === mod[0] && <Badge className="bg-violet-200 text-violet-800 text-[10px]">Máximo</Badge>}
            </div>
          ))}
        </div>

        <FormulaDisplay math={`Mo = ${mod.join(", ")} \\quad (\\text{frecuencia máxima} = ${freqTable.find(r => r.xNum === mod[0])?.ni})`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs">
            <p><strong>¿Qué significa?</strong> El resultado que más veces sale al lanzar este dado es el <strong>{mod.join(", ")}</strong>,
            que apareció {freqTable.find(r => r.xNum === mod[0])?.ni} de 20 veces (un {((freqTable.find(r => r.xNum === mod[0])?.ni || 0) / 20 * 100).toFixed(0)}% de las veces).</p>
          </CardContent>
        </Card>

        <ResultCard label="Moda" value={`${mod.join(", ")}`} />
      </StepCard>

      {/* ============ PASO 6: Resumen comparativo ============ */}
      <StepCard stepNumber={7} title="Resumen: comparación de las tres medidas" variant="result">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-blue-800">Media = {round(m, 2)}</p>
              <p className="text-[10px] text-muted-foreground"><strong>¿Qué responde?</strong> &quot;¿Cuál es el promedio de los resultados?&quot;</p>
              <p className="text-[10px] text-muted-foreground"><strong>Ventaja:</strong> Usa todos los datos.</p>
              <p className="text-[10px] text-muted-foreground"><strong>Desventaja:</strong> Sensible a valores extremos.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-emerald-800">Mediana = {med}</p>
              <p className="text-[10px] text-muted-foreground"><strong>¿Qué responde?</strong> &quot;¿Cuál es el valor central?&quot;</p>
              <p className="text-[10px] text-muted-foreground"><strong>Ventaja:</strong> No le afectan valores extremos.</p>
              <p className="text-[10px] text-muted-foreground"><strong>Desventaja:</strong> No usa la magnitud de todos los datos.</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-violet-800">Moda = {mod.join(", ")}</p>
              <p className="text-[10px] text-muted-foreground"><strong>¿Qué responde?</strong> &quot;¿Cuál es el más frecuente?&quot;</p>
              <p className="text-[10px] text-muted-foreground"><strong>Ventaja:</strong> Funciona con cualquier tipo de variable.</p>
              <p className="text-[10px] text-muted-foreground"><strong>Desventaja:</strong> Puede no existir o no ser única.</p>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-2 text-xs">
            <p><strong>Observación:</strong> Media ({round(m, 2)}) &lt; Mediana ({med}) &lt; Moda ({mod.join(", ")}).
            Cuando Media &lt; Mediana, esto sugiere una distribución con <strong>asimetría negativa</strong>
            (cola hacia la izquierda, es decir, hay valores bajos que tiran de la media hacia abajo).
            Tiene sentido porque el 1 salió muchas veces.</p>
          </CardContent>
        </Card>
      </StepCard>
    </ExerciseLayout>
  );
}
