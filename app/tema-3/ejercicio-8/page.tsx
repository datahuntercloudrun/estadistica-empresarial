"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { round } from "@/lib/stats/descriptive";

// Datos
const empresas = [
  { nombre: "A", peso: 0.30, media: 541.6, var: 53033.5, d2: 325.9, d8: 776.3 },
  { nombre: "B", peso: 0.45, media: 601.8, var: 63172.1, d2: 340.6, d8: 810.6 },
  { nombre: "C", peso: 0.25, media: 137.3, var: 21970.7, d2: 61.8, d8: 151.0 },
];

// a) Media del holding
const mediaHolding = empresas.reduce((sum, e) => sum + e.peso * e.media, 0);
const mediaSimple = round((empresas[0].media + empresas[1].media + empresas[2].media) / 3, 2);

// b) Variabilidad del 40% centrado
const empresasDeciles = [
  { nombre: "A", d3: 454.1, d7: 623.8 },
  { nombre: "B", d3: 401.1, d7: 776.2 },
  { nombre: "C", d3: 69.8, d7: 136.1 },
];
const riDeciles = empresasDeciles.map(e => ({
  nombre: e.nombre,
  ri: round(e.d7 - e.d3, 1),
}));

// c)
const facturacionC_D2 = 61.8;

// d)
const newMediaB = round(empresas[1].media * 1.15, 2);
const newVarB = round(empresas[1].var * (1.15 ** 2), 2);
const newMediaA = round(empresas[0].media + 100, 2);
const newVarA = round(empresas[0].var, 2);

export default function Ejercicio8() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={8}
      title="Análisis de Holding Empresarial"
      difficulty="Alto"
      category="Media ponderada, dispersión, transformación"
      statement={
        <div className="space-y-2">
          <p>Considere un holding de tres empresas: A (30%), B (45%) y C (25%). La facturación diaria se resume en:</p>
          <Card className="overflow-hidden text-sm">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead className="text-center">Media</TableHead>
                  <TableHead className="text-center">s²</TableHead>
                  <TableHead className="text-center">D2</TableHead>
                  <TableHead className="text-center">D3</TableHead>
                  <TableHead className="text-center">D7</TableHead>
                  <TableHead className="text-center">D8</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { n: "A", m: 541.6, v: "53033.5", d2: 325.9, d3: 454.1, d7: 623.8, d8: 776.3 },
                  { n: "B", m: 601.8, v: "63172.1", d2: 340.6, d3: 401.1, d7: 776.2, d8: 810.6 },
                  { n: "C", m: 137.3, v: "21970.7", d2: 61.8, d3: 69.8, d7: 136.1, d8: 151.0 },
                ].map((e) => (
                  <TableRow key={e.n}>
                    <TableCell className="font-medium">{e.n}</TableCell>
                    <TableCell className="text-center">{e.m}</TableCell>
                    <TableCell className="text-center">{e.v}</TableCell>
                    <TableCell className="text-center">{e.d2}</TableCell>
                    <TableCell className="text-center">{e.d3}</TableCell>
                    <TableCell className="text-center">{e.d7}</TableCell>
                    <TableCell className="text-center">{e.d8}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </Card>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Media de facturación del holding</li>
            <li>¿Cuál tiene más variabilidad en el 40% de la distribución centrada?</li>
            <li>En C, facturación máxima del 20% de días con menos facturación</li>
            <li>Si B sube 15% y A sube 100€, nuevas medias y varianzas</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-7"
      nextUrl="/tema-3/complementario-1"
    >
      {/* ============ PASO 0: ¿Qué vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este es un <strong>ejercicio integrador</strong> que combina varios conceptos del tema.
          Cada apartado plantea una <strong>pregunta real de negocio</strong> y nosotros tenemos que saber
          qué herramienta estadística responde a esa pregunta. Vamos a ver:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-sm">a) Media ponderada</Badge>
              <p className="text-sm text-muted-foreground">
                <strong>Pregunta de negocio:</strong> &quot;¿Cuánto factura el holding en promedio?&quot;
                No vale promediar las 3 medias porque las empresas tienen distinto peso.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-emerald-200 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 text-sm">b) Rango interdecílico</Badge>
              <p className="text-sm text-muted-foreground">
                <strong>Pregunta de negocio:</strong> &quot;¿Qué empresa tiene los días más impredecibles
                en su zona central?&quot; Usamos D₃ y D₇ para medir esa variabilidad.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-violet-200 dark:bg-violet-800/40 text-violet-800 dark:text-violet-200 text-sm">c) Decil 2</Badge>
              <p className="text-sm text-muted-foreground">
                <strong>Pregunta de negocio:</strong> &quot;¿Cuál es el peor escenario para el 20% de días
                más flojos de C?&quot; El D₂ responde exactamente a esto.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800">
            <CardContent className="p-3 space-y-1">
              <Badge className="bg-rose-200 dark:bg-rose-800/40 text-rose-800 dark:text-rose-200 text-sm">d) Transformaciones</Badge>
              <p className="text-sm text-muted-foreground">
                <strong>Pregunta de negocio:</strong> &quot;Si subo los precios un 15% o añado 100€ fijos,
                ¿cómo cambian las estadísticas?&quot; Hay reglas claras para esto.
              </p>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 1: Media del holding ============ */}
      <StepCard stepNumber={2} title="a) Media de facturación del holding" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Por qué NO podemos simplemente promediar las tres medias?</p>
            <p className="text-muted-foreground">
              La tentación es calcular (541.6 + 601.8 + 137.3) / 3 = {mediaSimple}€. Pero eso sería
              <strong> tratar a las tres empresas como si pesaran lo mismo</strong>, y no es así.
            </p>
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="p-2 text-sm space-y-1">
                <p className="font-semibold">Analogía: tres amigos ponen dinero en un bote</p>
                <p className="text-muted-foreground">
                  Si Juan pone 30€, María pone 45€ y Pedro pone 25€, la &quot;contribución media&quot;
                  no es dividir entre 3. María contribuyó más, así que su parte pesa más.
                  Lo mismo pasa con el holding: la empresa B contribuye el 45% del negocio,
                  así que su facturación media debe tener más peso en el cálculo.
                </p>
              </CardContent>
            </Card>
            <p className="text-muted-foreground mt-1">
              <strong>¿Por qué media ponderada?</strong> Porque cada empresa representa una proporción
              diferente del holding. Si B es el 45% del holding, su media debe &quot;pesar&quot; el 45%
              en el resultado final. Si las tres fueran iguales (33% cada una), la media ponderada
              coincidiría con la simple. Pero no es el caso.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-violet-800 dark:text-violet-200">La fórmula y qué significa cada parte</p>
            <FormulaDisplay math={`\\bar{x}_{holding} = \\sum w_k \\cdot \\bar{x}_k = w_A \\cdot \\bar{x}_A + w_B \\cdot \\bar{x}_B + w_C \\cdot \\bar{x}_C`} />
            <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
              <p><InlineMath math="w_k" /> = peso (proporción) de cada empresa → cuánto representa del total</p>
              <p><InlineMath math="\bar{x}_k" /> = media de facturación de cada empresa → cuánto factura en promedio</p>
              <p><InlineMath math="w_k \cdot \bar{x}_k" /> = contribución de esa empresa al holding → &quot;de los X€ del holding, cuántos aporta esta empresa&quot;</p>
            </div>
            <p className="text-muted-foreground">
              <strong>¿Por qué no dividimos al final?</strong> Porque los pesos ya suman 1
              (0.30 + 0.45 + 0.25 = 1.00). Si en vez de proporciones nos dieran cantidades absolutas
              (ej: 300, 450, 250 empleados), sí dividiríamos entre el total (1000).
            </p>
          </CardContent>
        </Card>

        <p className="text-sm font-medium">Cálculo paso a paso:</p>
        <FormulaDisplay math={`\\bar{x}_{holding} = 0.30 \\cdot 541.6 + 0.45 \\cdot 601.8 + 0.25 \\cdot 137.3`} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-2">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-2 text-center text-sm">
              <p className="font-semibold">A aporta:</p>
              <p>0.30 × 541.6 = <strong>{round(0.30 * 541.6, 2)}€</strong></p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-2 text-center text-sm">
              <p className="font-semibold">B aporta:</p>
              <p>0.45 × 601.8 = <strong>{round(0.45 * 601.8, 2)}€</strong></p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-2 text-center text-sm">
              <p className="font-semibold">C aporta:</p>
              <p>0.25 × 137.3 = <strong>{round(0.25 * 137.3, 2)}€</strong></p>
            </CardContent>
          </Card>
        </div>

        <FormulaDisplay math={`= ${round(0.30 * 541.6, 2)} + ${round(0.45 * 601.8, 2)} + ${round(0.25 * 137.3, 2)} = ${round(mediaHolding, 2)} €`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">¿Tiene sentido el resultado?</p>
            <p className="text-muted-foreground">
              El holding factura en promedio <strong>{round(mediaHolding, 2)}€</strong> diarios.
              Comparemos: la media simple sería {mediaSimple}€. La ponderada es <strong>mayor</strong> porque
              B (la empresa que más factura, 601.8€) tiene el mayor peso (45%), y C (la que menos
              factura, 137.3€) tiene el menor peso (25%). El resultado está &quot;tirado&quot; hacia
              las empresas grandes, que es exactamente lo que debe pasar.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Media del holding" value={`${round(mediaHolding, 2)} €`} />
      </StepCard>

      {/* ============ PASO 2: Variabilidad 40% centrado ============ */}
      <StepCard stepNumber={3} title="b) Variabilidad del 40% centrado" variant="calculation">
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">¿Por qué nos interesa el &quot;40% centrado&quot; y no la variabilidad total?</p>
            <p className="text-muted-foreground">
              La varianza (s²) mide la variabilidad de <strong>todos</strong> los datos, incluyendo los
              extremos (los mejores y peores días). Pero a veces queremos saber:
              <em> &quot;ignorando los días excepcionalmente buenos y los excepcionalmente malos,
              ¿cuánto varían los días normales?&quot;</em>
            </p>
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="p-2 text-sm space-y-1">
                <p className="font-semibold">Analogía: el rendimiento de un jugador de fútbol</p>
                <p className="text-muted-foreground">
                  Si quieres saber lo consistente que es un jugador, no miras su mejor partido ni su peor partido
                  (esos son excepciones). Miras sus partidos &quot;normales&quot; — el 40% del medio.
                  Si ese rango es estrecho, el jugador es consistente. Si es amplio, es impredecible.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Qué son D₃ y D₇ y por qué delimitan el 40% central?</p>
            <p className="text-muted-foreground">
              Los <strong>deciles</strong> dividen los datos ordenados en 10 partes iguales, cada una con el 10%.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
              <p><InlineMath math="D_3" /> = el valor que deja el <strong>30%</strong> por debajo. Todo lo que está debajo de D₃ son los días &quot;flojos&quot; (el 30% peor).</p>
              <p><InlineMath math="D_7" /> = el valor que deja el <strong>70%</strong> por debajo. Todo lo que está por encima de D₇ son los días &quot;excepcionales&quot; (el 30% mejor).</p>
              <p className="mt-1 font-semibold">Entre D₃ y D₇: queda exactamente el 70% - 30% = <strong>40% central</strong></p>
            </div>
            <p className="text-muted-foreground mt-1">
              <strong>¿Por qué D₇ - D₃ mide la variabilidad?</strong> Porque es la <strong>amplitud</strong>
              (rango) de esa franja central. Si D₇ - D₃ es grande, los días &quot;normales&quot; varían mucho
              entre sí. Si es pequeño, los días normales son bastante parecidos.
            </p>
            <p className="text-muted-foreground">
              Es exactamente la misma idea que el <strong>rango intercuartílico</strong> (Q₃ - Q₁ mide el 50% central),
              pero aquí usamos un recorte diferente (40% en vez de 50%).
            </p>
          </CardContent>
        </Card>

        <p className="text-sm font-medium">Cálculo del rango D₇ - D₃ para cada empresa:</p>
        <FormulaDisplay math={`RI_{40\\%} = D_7 - D_3`} />

        <div className="space-y-2 my-2">
          {empresasDeciles.map((e, i) => (
            <Card key={e.nombre} className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-2 text-sm">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="font-semibold">Empresa {e.nombre}:</span>
                  <span>D₇ ({e.d7}) - D₃ ({e.d3}) = <strong>{riDeciles[i].ri}€</strong></span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">¿Qué nos dice esto de cada empresa?</p>
            <p className="text-muted-foreground">
              <strong>Empresa B (RI = {riDeciles[1].ri}€):</strong> Tiene la mayor variabilidad en sus días
              &quot;normales&quot;. Incluso descartando los extremos, la facturación fluctúa en un rango
              de {riDeciles[1].ri}€. Es la más <strong>impredecible</strong> en su zona central.
            </p>
            <p className="text-muted-foreground">
              <strong>Empresa A (RI = {riDeciles[0].ri}€):</strong> Variabilidad intermedia.
              Sus días normales varían en {riDeciles[0].ri}€.
            </p>
            <p className="text-muted-foreground">
              <strong>Empresa C (RI = {riDeciles[2].ri}€):</strong> Es la más <strong>estable</strong>
              en su zona central. Sus días normales solo varían en {riDeciles[2].ri}€.
              Tiene sentido: C factura mucho menos (media=137.3€), así que sus fluctuaciones
              también son más pequeñas en términos absolutos.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Mayor variabilidad en 40% centrado" value={`Empresa B (RI = ${riDeciles[1].ri}€)`} />
      </StepCard>

      {/* ============ PASO 3: D2 de C ============ */}
      <StepCard stepNumber={4} title="c) Facturación máxima del 20% inferior en C" variant="calculation">
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-violet-800 dark:text-violet-200">¿Cómo traducimos esta pregunta a estadística?</p>
            <p className="text-muted-foreground">
              La pregunta es: <em>&quot;Del 20% de días en que la empresa C menos factura,
              ¿cuál es la facturación más alta?&quot;</em>
            </p>
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="p-2 text-sm space-y-1">
                <p className="font-semibold">Razonamiento paso a paso:</p>
                <p className="text-muted-foreground">
                  1. &quot;El 20% de días que menos factura&quot; = el 20% inferior de la distribución.<br />
                  2. &quot;La facturación más alta de ese grupo&quot; = el <strong>techo</strong> de ese 20%.<br />
                  3. ¿Qué valor estadístico separa el 20% inferior del 80% superior? → El <strong>decil 2 (D₂)</strong>.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Por qué es D₂ y no otro decil?</p>
            <p className="text-muted-foreground">
              Los deciles dividen los datos en 10 partes iguales. <InlineMath math="D_k" /> deja
              el <InlineMath math="k \cdot 10\%" /> de los datos por debajo.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
              <p><InlineMath math="D_1" /> → deja el 10% por debajo</p>
              <p><strong><InlineMath math="D_2" /> → deja el 20% por debajo ← este es el que necesitamos</strong></p>
              <p><InlineMath math="D_3" /> → deja el 30% por debajo</p>
              <p className="text-muted-foreground text-sm mt-1">...y así sucesivamente hasta D₉ (90%).</p>
            </div>
            <p className="text-muted-foreground">
              Como queremos el <strong>techo del 20% inferior</strong>, necesitamos el valor que
              deja exactamente el 20% por debajo = D₂. El día más &quot;bueno&quot; del 20% peor
              es exactamente D₂.
            </p>
          </CardContent>
        </Card>

        <p className="text-sm font-medium">Respuesta (dato directo de la tabla):</p>
        <FormulaDisplay math={`D_2^C = ${facturacionC_D2} €`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">¿Qué significa esto en la práctica?</p>
            <p className="text-muted-foreground">
              <strong>El 20% de los peores días de la empresa C factura como máximo {facturacionC_D2}€.</strong>
              Dicho de otra forma: 2 de cada 10 días, la empresa C factura {facturacionC_D2}€ o menos.
              Los otros 8 de cada 10 días, factura más que eso.
            </p>
            <p className="text-muted-foreground">
              Esto es útil para planificación financiera: si la empresa necesita al menos 100€/día
              para cubrir costes, sabemos que incluso en sus peores días (el peor 20%) ya cubre gastos,
              porque {facturacionC_D2}€ &lt; 137.3€ (media) pero aún es un nivel razonable.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Facturación máxima del 20% inferior (C)" value={`${facturacionC_D2} €`} />
      </StepCard>

      {/* ============ PASO 4: Transformaciones - Teoría ============ */}
      <StepCard stepNumber={5} title="d) Transformaciones: la teoría detrás" variant="explanation">
        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-rose-800 dark:text-rose-200">¿Por qué necesitamos reglas de transformación?</p>
            <p className="text-muted-foreground">
              En el mundo real, los datos cambian: suben precios, se aplican descuentos, se añaden bonificaciones.
              Sería muy costoso recalcular todo desde cero cada vez. Las <strong>reglas de transformación
              lineal</strong> nos permiten actualizar media y varianza <strong>instantáneamente</strong>,
              sin necesidad de volver a los datos originales.
            </p>
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="p-2 text-sm space-y-1">
                <p className="font-semibold">Analogía: recibo de la luz</p>
                <p className="text-muted-foreground">
                  Si la compañía eléctrica sube un 15% todas las facturas, no necesitas mirar cada factura individual
                  para saber la nueva media. Solo multiplicas la media antigua por 1.15. Lo mismo con la variabilidad.
                  <strong> Estas reglas nos ahorran recalcular todo.</strong>
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">La transformación lineal: Y = a·X + b</p>
            <p className="text-muted-foreground">
              Cualquier cambio que sea &quot;multiplicar por algo y/o sumar algo&quot; es una transformación lineal.
              <InlineMath math="a" /> es el <strong>factor de escala</strong> (multiplicar) y
              <InlineMath math="b" /> es el <strong>desplazamiento</strong> (sumar/restar).
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Regla 1: La media se transforma completa</p>
              <FormulaDisplay math={`\\bar{y} = a \\cdot \\bar{x} + b`} />
              <p className="text-muted-foreground">
                <strong>¿Por qué?</strong> La media es el &quot;centro de gravedad&quot; de los datos.
                Si multiplicas todos los datos por <InlineMath math="a" />, el centro se multiplica por <InlineMath math="a" />.
                Si a todos les sumas <InlineMath math="b" />, el centro se desplaza <InlineMath math="b" />.
              </p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm">
                  <p className="font-semibold">Ejemplo intuitivo:</p>
                  <p className="text-muted-foreground">
                    Si 5 personas pesan 60, 65, 70, 75, 80 kg (media = 70), y todas engordan 5 kg,
                    la nueva media es 70 + 5 = 75. Si todas adelgazan un 10%, la nueva media es 70 × 0.9 = 63.
                    En ambos casos, basta con transformar la media.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-violet-800 dark:text-violet-200">Regla 2: La varianza SOLO depende de la escala</p>
              <FormulaDisplay math={`s_Y^2 = a^2 \\cdot s_X^2`} />
              <p className="text-muted-foreground">
                <strong>¿Por qué <InlineMath math="a^2" /> y no simplemente <InlineMath math="a" />?</strong> Porque
                la varianza usa diferencias al cuadrado: <InlineMath math="(x_i - \bar{x})^2" />.
                Si multiplicas cada <InlineMath math="x_i" /> por <InlineMath math="a" />,
                cada diferencia se multiplica por <InlineMath math="a" />, y al elevar al cuadrado
                queda <InlineMath math="a^2" />.
              </p>
              <p className="text-muted-foreground">
                <strong>¿Por qué <InlineMath math="b" /> no aparece?</strong> Porque la varianza mide
                <em> distancias entre los datos</em>, no su valor absoluto.
              </p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm">
                  <p className="font-semibold">Analogía del ascensor:</p>
                  <p className="text-muted-foreground">
                    5 personas en un ascensor están a alturas: 1.60, 1.65, 1.70, 1.75, 1.80m.
                    Si el ascensor sube 10 pisos, todos suben igual → las <strong>diferencias entre ellos
                    no cambian</strong> → la varianza no cambia.
                    Pero si todos crecen un 10% (× 1.10), las diferencias se amplifican → la varianza sí cambia.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-3">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Resumen de las reglas</p>
            <div className="overflow-x-auto mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Operación</TableHead>
                  <TableHead className="text-center">Tipo</TableHead>
                  <TableHead className="text-center">Media</TableHead>
                  <TableHead className="text-center">Varianza</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-sm">Sumar b (ej: +100€)</TableCell>
                  <TableCell className="text-center text-sm">Origen</TableCell>
                  <TableCell className="text-center text-sm">Cambia (+b)</TableCell>
                  <TableCell className="text-center text-sm font-bold text-rose-600 dark:text-rose-400">NO cambia</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">Multiplicar por a (ej: ×1.15)</TableCell>
                  <TableCell className="text-center text-sm">Escala</TableCell>
                  <TableCell className="text-center text-sm">Cambia (×a)</TableCell>
                  <TableCell className="text-center text-sm font-bold text-emerald-600 dark:text-emerald-400">Cambia (×a²)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 5: Aplicación B ============ */}
      <StepCard stepNumber={6} title="d.1) Empresa B: incremento del 15%" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Cómo traducimos &quot;subir un 15%&quot; a la fórmula Y = a·X + b?</p>
            <p className="text-muted-foreground">
              &quot;Subir un 15%&quot; significa que el nuevo valor es el valor original <strong>más el 15%
              del original</strong>: Y = X + 0.15·X = 1.15·X.
            </p>
            <p className="text-muted-foreground">
              Esto es un <strong>cambio de escala puro</strong>: <InlineMath math="a = 1.15" />, <InlineMath math="b = 0" />.
              No se suma ninguna cantidad fija, solo se multiplica.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`Y_B = 1.15 \\cdot X_B \\quad (a = 1.15,\\; b = 0)`} />

        <p className="text-sm font-medium mt-2">Nueva media:</p>
        <FormulaDisplay math={`\\bar{y}_B = 1.15 \\cdot \\bar{x}_B = 1.15 \\cdot ${empresas[1].media} = ${newMediaB} €`} />

        <p className="text-sm font-medium mt-2">Nueva varianza:</p>
        <FormulaDisplay math={`s_{Y_B}^2 = 1.15^2 \\cdot s_{X_B}^2 = ${round(1.15 ** 2, 4)} \\cdot ${empresas[1].var} = ${newVarB}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">¿Por qué la varianza se multiplica por 1.15² y no por 1.15?</p>
            <p className="text-muted-foreground">
              Porque la varianza está en <strong>unidades al cuadrado</strong> (€²).
              Si cada dato se multiplica por 1.15, las distancias al centro también se multiplican por 1.15.
              Pero la varianza <em>eleva al cuadrado</em> esas distancias, por eso el factor es 1.15² = {round(1.15 ** 2, 4)}.
            </p>
            <p className="text-muted-foreground">
              Si usáramos la <strong>desviación típica</strong> (que está en €, no en €²), sí se multiplicaría
              directamente por 1.15: <InlineMath math="s_Y = 1.15 \cdot s_X" />.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          <ResultCard label="Nueva media B" value={`${newMediaB} €`} />
          <ResultCard label="Nueva varianza B" value={`${newVarB} €²`} />
        </div>
      </StepCard>

      {/* ============ PASO 6: Aplicación A ============ */}
      <StepCard stepNumber={7} title="d.2) Empresa A: incremento fijo de 100€" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">¿Cómo traducimos &quot;sumar 100€ fijos&quot; a Y = a·X + b?</p>
            <p className="text-muted-foreground">
              Aquí no se multiplica nada: el nuevo valor es simplemente el original <strong>más 100</strong>.
              Y = X + 100 = 1·X + 100.
            </p>
            <p className="text-muted-foreground">
              Esto es un <strong>cambio de origen puro</strong>: <InlineMath math="a = 1" />, <InlineMath math="b = 100" />.
              Todos los días suben exactamente 100€, sin importar cuánto facturaban antes.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`Y_A = X_A + 100 \\quad (a = 1,\\; b = 100)`} />

        <p className="text-sm font-medium mt-2">Nueva media:</p>
        <FormulaDisplay math={`\\bar{y}_A = 1 \\cdot ${empresas[0].media} + 100 = ${newMediaA} €`} />

        <p className="text-sm font-medium mt-2">Nueva varianza:</p>
        <FormulaDisplay math={`s_{Y_A}^2 = 1^2 \\cdot s_{X_A}^2 = 1 \\cdot ${empresas[0].var} = ${newVarA}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-2 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">¿Por qué la varianza NO cambia?</p>
            <p className="text-muted-foreground">
              Esto es la parte que más sorprende. <strong>La varianza mide dispersión (cuánto varían los datos
              entre sí), no nivel (cuánto valen).</strong>
            </p>
            <p className="text-muted-foreground">
              Si todos los días suben 100€, el día que antes facturaba más sigue facturando más,
              y el que facturaba menos sigue facturando menos. Las <strong>diferencias entre días
              no cambian</strong>.
            </p>
            <Card className="bg-white dark:bg-gray-900 mt-1">
              <CardContent className="p-2 text-sm">
                <p className="font-semibold">Ejemplo numérico rápido:</p>
                <p className="text-muted-foreground">
                  Datos: 100, 200, 300 → diferencias con media (200): -100, 0, +100<br/>
                  Sumamos 100: 200, 300, 400 → diferencias con media (300): -100, 0, +100<br/>
                  <strong>Las diferencias son idénticas</strong> → la varianza no cambia.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          <ResultCard label="Nueva media A" value={`${newMediaA} €`} />
          <ResultCard label="Nueva varianza A" value={`${newVarA} (sin cambio)`} />
        </div>
      </StepCard>

      {/* ============ PASO 7: Resumen ============ */}
      <StepCard stepNumber={8} title="Resumen: ¿qué hemos aprendido?" variant="result">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-blue-800 dark:text-blue-200">Media ponderada</p>
              <p className="text-sm text-muted-foreground">
                Cuando las partes tienen distinto peso, no vale promediar las medias.
                Hay que ponderar: cada media se multiplica por su peso.
                El resultado se acerca más a las partes con mayor peso.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-emerald-800 dark:text-emerald-200">Rango interdecílico</p>
              <p className="text-sm text-muted-foreground">
                D₇ - D₃ mide la amplitud del 40% central: cuánto varían los días &quot;normales&quot;,
                ignorando los extremos. Mayor rango = más impredecible en sus días típicos.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-violet-800 dark:text-violet-200">Deciles como &quot;traductores&quot;</p>
              <p className="text-sm text-muted-foreground">
                &quot;Máxima del 20% inferior&quot; = D₂. &quot;Mínima del 30% superior&quot; = D₇.
                Los deciles traducen preguntas de negocio a valores concretos.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800">
            <CardContent className="p-3 space-y-1">
              <p className="font-semibold text-sm text-rose-800 dark:text-rose-200">Transformaciones lineales</p>
              <p className="text-sm text-muted-foreground">
                Multiplicar (escala) → media y varianza cambian. Sumar (origen) → solo la media cambia.
                La varianza solo se ve afectada por lo que &quot;estira o comprime&quot; los datos,
                no por lo que los &quot;desplaza&quot;.
              </p>
            </CardContent>
          </Card>
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
