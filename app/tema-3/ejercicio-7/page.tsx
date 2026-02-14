"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { PieChartCustom } from "@/components/charts/pie-chart-custom";
import { Card, CardContent } from "@/components/ui/card";
import { round, weightedMean } from "@/lib/stats/descriptive";

const estratos = [
  { nombre: "A1", n: 50, media: 2 },
  { nombre: "A2", n: 100, media: 7 },
  { nombre: "A3", n: 200, media: 10 },
];

const totalN = estratos.reduce((s, e) => s + e.n, 0);
const mediaPoblacion = weightedMean(
  estratos.map((e) => e.media),
  estratos.map((e) => e.n)
);
const mediaSimple = estratos.reduce((s, e) => s + e.media, 0) / estratos.length;

export default function Ejercicio7() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={7}
      title="Media Ponderada de Población Estratificada"
      difficulty="Bajo"
      category="Media ponderada"
      statement={
        <div className="space-y-2">
          <p>Tenemos una población dividida en tres estratos: A1, A2 y A3.</p>
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead><tr className="bg-gray-100"><th className="border p-2">Estrato</th><th className="border p-2">N</th><th className="border p-2">Media</th></tr></thead>
              <tbody>
                {estratos.map((e) => (
                  <tr key={e.nombre}><td className="border p-2 text-center">{e.nombre}</td><td className="border p-2 text-center">{e.n}</td><td className="border p-2 text-center">{e.media}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Obtenga la media aritmética para el conjunto de la población.</p>
        </div>
      }
      prevUrl="/tema-3/ejercicio-6"
      nextUrl="/tema-3/ejercicio-8"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio nos enseña que <strong>no todas las medias pesan lo mismo</strong>.
          Cuando una población se divide en grupos de distinto tamaño, la media global no es
          simplemente el promedio de las medias de cada grupo.
        </p>
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">Analogía: las notas de un curso</p>
            <p className="text-muted-foreground">
              Imagina un curso con 3 clases: A (10 alumnos, media 6), B (30 alumnos, media 8) y C (60 alumnos, media 9).
              La media del curso NO es (6+8+9)/3 = 7.67. Eso trataría a las tres clases como si tuvieran el mismo tamaño.
            </p>
            <p className="text-muted-foreground">
              La clase C tiene 60 alumnos con media 9, y eso debería &quot;pesar&quot; mucho más que la clase A con solo 10 alumnos.
              La media correcta da más peso a los grupos más grandes → <strong>media ponderada</strong>.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 1: El error de la media simple ============ */}
      <StepCard stepNumber={2} title="¿Por qué NO vale la media simple?" variant="explanation">
        <Card className="bg-rose-50 border-rose-200">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-rose-800">Error frecuente: promediar las medias directamente</p>
            <FormulaDisplay math={`\\text{Media simple (INCORRECTO)} = \\frac{2 + 7 + 10}{3} = ${round(mediaSimple, 2)}`} />
            <p className="text-muted-foreground">
              Esto sería correcto solo si los tres estratos tuvieran <strong>exactamente el mismo tamaño</strong> (50 cada uno).
              Pero A1 tiene 50, A2 tiene 100 y A3 tiene 200. El estrato A3 es 4 veces más grande que A1.
            </p>
            <p className="text-muted-foreground">
              <strong>Si usamos la media simple, estamos diciendo que la opinión de 50 personas vale igual que la de 200.</strong>
              Eso no es justo ni representativo.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Fórmula de la media ponderada ============ */}
      <StepCard stepNumber={3} title="La fórmula correcta: media ponderada" variant="calculation">
        <Card className="bg-blue-50 border-blue-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-blue-800">Fórmula desglosada</p>
            <FormulaDisplay math={`\\bar{x} = \\frac{\\sum N_k \\cdot \\bar{x}_k}{\\sum N_k} = \\frac{N_1 \\cdot \\bar{x}_1 + N_2 \\cdot \\bar{x}_2 + N_3 \\cdot \\bar{x}_3}{N_1 + N_2 + N_3}`} />
            <div className="bg-white rounded p-2 space-y-1">
              <p><InlineMath math="N_k" /> = tamaño del estrato k (cuántas personas tiene)</p>
              <p><InlineMath math="\bar{x}_k" /> = media del estrato k</p>
              <p><InlineMath math="N_k \cdot \bar{x}_k" /> = &quot;contribución total&quot; del estrato k (tamaño × media)</p>
              <p><InlineMath math="\sum N_k" /> = población total</p>
            </div>
            <p className="text-muted-foreground">
              <strong>En palabras:</strong> &quot;Multiplica la media de cada grupo por su tamaño (para calcular la suma total
              de todos los valores del grupo), suma todo, y divide entre la población total.&quot;
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`\\bar{x} = \\frac{50 \\cdot 2 + 100 \\cdot 7 + 200 \\cdot 10}{50 + 100 + 200}`} />
        <FormulaDisplay math={`= \\frac{100 + 700 + 2000}{350} = \\frac{2800}{350} = ${round(mediaPoblacion, 2)}`} />

        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-2 text-xs space-y-1">
            <p><strong>¿Tiene sentido?</strong> La media ponderada ({round(mediaPoblacion, 2)}) es mayor que la simple ({round(mediaSimple, 2)}).
            Esto es porque el grupo más grande (A3, con 200 personas) tiene la media más alta (10),
            y &quot;tira&quot; de la media global hacia arriba.</p>
            <p>Nota cómo {round(mediaPoblacion, 2)} está más cerca de 10 (media de A3) que de 2 (media de A1), reflejando que A3 es 4 veces más grande.</p>
          </CardContent>
        </Card>

        <ResultCard label="Media de la población" value={`${round(mediaPoblacion, 2)}`} />
      </StepCard>

      {/* ============ PASO 3: Peso de cada estrato ============ */}
      <StepCard stepNumber={4} title="Visualización: peso de cada estrato" variant="explanation">
        <Card className="bg-gray-50 border mb-2">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Cuánto &quot;pesa&quot; cada estrato en el resultado?</p>
            <p className="text-muted-foreground">
              El gráfico muestra la proporción de cada estrato. El A3 domina con el {round((200 / 350) * 100, 1)}% de la población,
              por eso su media de 10 tiene el mayor impacto en el resultado final.
            </p>
          </CardContent>
        </Card>
        <PieChartCustom
          data={estratos.map((e) => ({ name: `${e.nombre} (n=${e.n}, media=${e.media})`, value: e.n }))}
          title="Proporción de cada estrato en la población"
        />
        <div className="grid grid-cols-3 gap-2 mt-3">
          {estratos.map((e) => (
            <Card key={e.nombre} className="bg-gray-50">
              <CardContent className="p-2 text-center">
                <p className="font-semibold text-xs">{e.nombre}</p>
                <p className="text-[10px]">{round((e.n / totalN) * 100, 1)}% de la población</p>
                <p className="text-[10px]">Contribuye: {e.n} × {e.media} = {e.n * e.media}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </StepCard>

      {/* ============ PASO 4: Resumen ============ */}
      <StepCard stepNumber={5} title="Resumen: ¿qué hemos aprendido?" variant="result">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-xs text-blue-800">Media ponderada vs simple</p>
              <p className="text-[10px] text-muted-foreground">
                Cuando los grupos tienen tamaños diferentes, la media ponderada da resultados correctos.
                La media simple solo vale si todos los grupos son del mismo tamaño.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-xs text-emerald-800">El grupo grande domina</p>
              <p className="text-[10px] text-muted-foreground">
                La media global siempre está más cercana a la media del grupo más grande.
                En nuestro caso: A3 (200 personas, media 10) → la media global ({round(mediaPoblacion, 2)}) se acerca más a 10.
              </p>
            </CardContent>
          </Card>
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
