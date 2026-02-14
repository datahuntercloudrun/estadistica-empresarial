"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const variables = [
  { id: "a", text: "Número de teléfonos por hogar", tipo: "Cuantitativa Discreta", color: "bg-blue-100 text-blue-800", reason: "Se mide con números (cuantitativa). Solo puede tomar valores enteros: 0, 1, 2, 3... No puedes tener 2.5 teléfonos → discreta." },
  { id: "b", text: "Tipo de teléfono principal (móvil o fijo)", tipo: "Cualitativa Nominal", color: "bg-emerald-100 text-emerald-800", reason: "No es un número, son categorías: «móvil» o «fijo». No tienen orden natural (no podemos decir que «móvil» > «fijo») → nominal." },
  { id: "c", text: "Número de llamadas interprovinciales realizadas mensualmente", tipo: "Cuantitativa Discreta", color: "bg-blue-100 text-blue-800", reason: "Se mide con números (cuantitativa). Son conteos enteros: 0, 1, 2, 3... No puedes hacer 5.7 llamadas → discreta." },
  { id: "d", text: "Duración de la llamada interprovincial más larga realizada cada mes", tipo: "Cuantitativa Continua", color: "bg-violet-100 text-violet-800", reason: "Se mide con números (cuantitativa). La duración puede tomar cualquier valor: 3.5 min, 12.73 min... → continua." },
  { id: "e", text: "Color del teléfono fijo", tipo: "Cualitativa Nominal", color: "bg-emerald-100 text-emerald-800", reason: "No es un número, son categorías: negro, blanco, gris... No tienen orden natural → nominal." },
  { id: "f", text: "El cargo mensual (en euros y céntimos) de las llamadas interprovinciales", tipo: "Cuantitativa Continua", color: "bg-violet-100 text-violet-800", reason: "Se mide con números (cuantitativa). Aunque se redondea a céntimos, el importe puede ser cualquier valor real: 12.37€, 45.89€... → continua." },
  { id: "g", text: "Titular del contrato del teléfono fijo", tipo: "Cualitativa Nominal", color: "bg-emerald-100 text-emerald-800", reason: "Son nombres de personas (categorías). No tienen orden natural → nominal." },
  { id: "h", text: "Número de llamadas realizadas en un mes", tipo: "Cuantitativa Discreta", color: "bg-blue-100 text-blue-800", reason: "Se mide con números (cuantitativa). Son conteos enteros: 0, 1, 2... → discreta." },
  { id: "i", text: "Si hay internet por fibra óptica en la vivienda", tipo: "Cualitativa Nominal (Binaria)", color: "bg-amber-100 text-amber-800", reason: "Solo dos respuestas posibles: «Sí» o «No». Son categorías sin orden → nominal. Al tener solo 2 opciones se llama binaria." },
  { id: "j", text: "Si hay red wifi en la vivienda", tipo: "Cualitativa Nominal (Binaria)", color: "bg-amber-100 text-amber-800", reason: "Solo dos respuestas posibles: «Sí» o «No» → cualitativa nominal binaria." },
];

export default function Ejercicio1() {
  return (
    <ExerciseLayout
      tema={2}
      exerciseNumber={1}
      title="Clasificación de Variables"
      difficulty="Bajo"
      category="Tipos de variables"
      statement={
        <div className="space-y-2">
          <p>En una encuesta telefónica a hogares se recogen los siguientes datos. Clasifique cada variable estadística según su tipo:</p>
          <ol className="list-[lower-alpha] pl-5 space-y-1 text-sm">
            {variables.map(v => (
              <li key={v.id}>{v.text}</li>
            ))}
          </ol>
        </div>
      }
      nextUrl="/tema-2/ejercicio-2"
    >
      {/* ============ PASO 1: ¿Qué es una variable estadística? ============ */}
      <StepCard stepNumber={1} title="¿Qué es una variable estadística?" variant="explanation">
        <p>
          Una <strong>variable estadística</strong> es cualquier característica que podemos observar o medir en los individuos de un estudio,
          y que varía de uno a otro. Si todos tuvieran el mismo valor, no sería interesante estudiarla.
        </p>
        <Card className="bg-gray-50 border mt-2">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">Ejemplo con este ejercicio:</p>
            <p className="text-muted-foreground">Los individuos son <strong>hogares</strong>. Para cada hogar registramos varias variables: cuántos teléfonos tienen, de qué tipo son, cuántas llamadas hacen, cuánto pagan, etc. Cada una es una variable diferente.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: Los tipos de variables ============ */}
      <StepCard stepNumber={2} title="Los 4 tipos de variables" variant="explanation">
        <p>Toda variable estadística se clasifica en uno de estos 4 tipos. La clave es hacerse <strong>dos preguntas</strong> en orden:</p>

        <Card className="bg-amber-50 border-amber-200 mt-2 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">Árbol de decisión (memoriza esto)</p>
            <div className="bg-white rounded p-3 space-y-2">
              <p><strong>Pregunta 1: ¿El resultado es un número con el que se pueden hacer operaciones matemáticas (sumar, restar...)?</strong></p>
              <div className="pl-4 space-y-2">
                <div className="bg-blue-50 rounded p-2">
                  <p className="font-semibold text-blue-800">Sí → CUANTITATIVA</p>
                  <p className="text-muted-foreground mt-1"><strong>Pregunta 2: ¿Puede tomar cualquier valor en un intervalo (incluidos decimales), o solo valores aislados (enteros)?</strong></p>
                  <div className="pl-4 mt-1 space-y-1">
                    <p><Badge className="bg-blue-200 text-blue-800 text-[10px]">Solo enteros</Badge> → <strong>Discreta</strong> (ej: n.° de hijos: 0, 1, 2, 3...)</p>
                    <p><Badge className="bg-violet-200 text-violet-800 text-[10px]">Cualquier valor</Badge> → <strong>Continua</strong> (ej: peso: 72.35 kg, 80.1 kg...)</p>
                  </div>
                </div>
                <div className="bg-emerald-50 rounded p-2">
                  <p className="font-semibold text-emerald-800">No → CUALITATIVA</p>
                  <p className="text-muted-foreground mt-1"><strong>Pregunta 2: ¿Las categorías tienen un orden natural?</strong></p>
                  <div className="pl-4 mt-1 space-y-1">
                    <p><Badge className="bg-emerald-200 text-emerald-800 text-[10px]">Sin orden</Badge> → <strong>Nominal</strong> (ej: color de ojos: azul, marrón, verde)</p>
                    <p><Badge className="bg-lime-200 text-lime-800 text-[10px]">Con orden</Badge> → <strong>Ordinal</strong> (ej: satisfacción: baja, media, alta)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 space-y-2">
              <p className="font-semibold text-blue-800 text-xs">Cuantitativas (= números)</p>
              <div className="space-y-1.5">
                <div>
                  <p className="text-xs text-blue-700 font-semibold">Discretas: valores enteros contables</p>
                  <p className="text-[10px] text-muted-foreground ml-2">N.° de hijos, goles marcados, libros leídos, n.° de aprobados</p>
                  <p className="text-[10px] text-muted-foreground ml-2"><strong>Test:</strong> ¿Tiene sentido un valor de 2.5? Si no → discreta.</p>
                </div>
                <div>
                  <p className="text-xs text-blue-700 font-semibold">Continuas: cualquier valor real en un intervalo</p>
                  <p className="text-[10px] text-muted-foreground ml-2">Peso, estatura, temperatura, tiempo, dinero</p>
                  <p className="text-[10px] text-muted-foreground ml-2"><strong>Test:</strong> ¿Tiene sentido un valor de 72.35? Si sí → continua.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 space-y-2">
              <p className="font-semibold text-emerald-800 text-xs">Cualitativas (= categorías)</p>
              <div className="space-y-1.5">
                <div>
                  <p className="text-xs text-emerald-700 font-semibold">Nominales: categorías sin orden</p>
                  <p className="text-[10px] text-muted-foreground ml-2">Sexo, color de ojos, estado civil, marca de coche</p>
                  <p className="text-[10px] text-muted-foreground ml-2"><strong>Test:</strong> ¿Puedes ordenar las categorías de menor a mayor? Si no → nominal.</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-700 font-semibold">Ordinales: categorías con orden</p>
                  <p className="text-[10px] text-muted-foreground ml-2">Satisfacción (1-5), nivel de estudios, calificaciones (Suspenso-MH)</p>
                  <p className="text-[10px] text-muted-foreground ml-2"><strong>Test:</strong> ¿Puedes decir que una categoría es &quot;mayor&quot; que otra? Si sí → ordinal.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-rose-50 border-rose-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-rose-800">Caso especial: Variables binarias</p>
            <p className="text-muted-foreground">Cuando una variable cualitativa nominal solo tiene <strong>dos categorías</strong> (Sí/No, Verdadero/Falso, Hombre/Mujer), se llama <strong>binaria</strong> o dicotómica. Sigue siendo nominal, pero tiene nombre propio.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 3: Clasificación ============ */}
      <StepCard stepNumber={3} title="Clasificación de cada variable" variant="result">
        <p className="text-xs text-muted-foreground mb-2">Aplicamos el árbol de decisión a cada variable. Lee la columna &quot;Razonamiento&quot; para entender por qué.</p>
        <div className="space-y-3">
          {variables.map((v) => (
            <div key={v.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold">
                {v.id}
              </span>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{v.text}</p>
                <Badge className={v.color}>{v.tipo}</Badge>
                <p className="text-[10px] text-muted-foreground">{v.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </StepCard>

      {/* ============ PASO 4: Caso dudoso ============ */}
      <StepCard stepNumber={4} title="¿Caso dudoso? El cargo mensual" variant="explanation">
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">¿El dinero es discreto o continuo?</p>
            <p className="text-muted-foreground">El <strong>cargo mensual</strong> (variable f) podría parecer discreto porque los céntimos son la unidad mínima (no existen 0.5 céntimos). Sin embargo, en estadística se clasifica como <strong>continua</strong> porque:</p>
            <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
              <li>El rango de valores posibles es muy amplio (desde 0€ hasta cientos de €)</li>
              <li>Los céntimos hacen que sea prácticamente cualquier valor en un intervalo</li>
              <li>No tiene sentido hacer un diagrama de barras con cada posible importe</li>
              <li>En la práctica, se agrupa en intervalos como las variables continuas</li>
            </ul>
            <p className="mt-1"><strong>Regla práctica:</strong> si una variable tiene tantos valores posibles que la tratas como un continuo (la agrupas en intervalos), se clasifica como continua aunque técnicamente sea discreta.</p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 5: Resumen ============ */}
      <StepCard stepNumber={5} title="Resumen por categoría" variant="result">
        <div className="grid md:grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <p className="font-semibold text-sm mb-1">Cuantitativas Discretas</p>
              <p className="text-xs">a) Teléfonos por hogar, c) Llamadas interprovinciales, h) Llamadas mensuales</p>
              <p className="text-[10px] text-muted-foreground mt-1">Todas son conteos (valores enteros).</p>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-3">
              <p className="font-semibold text-sm mb-1">Cuantitativas Continuas</p>
              <p className="text-xs">d) Duración de llamada, f) Cargo mensual</p>
              <p className="text-[10px] text-muted-foreground mt-1">Valores que admiten decimales (tiempo, dinero).</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3">
              <p className="font-semibold text-sm mb-1">Cualitativas Nominales</p>
              <p className="text-xs">b) Tipo teléfono, e) Color, g) Titular</p>
              <p className="text-[10px] text-muted-foreground mt-1">Categorías sin orden natural entre ellas.</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-3">
              <p className="font-semibold text-sm mb-1">Cualitativas Binarias</p>
              <p className="text-xs">i) Fibra óptica, j) WiFi</p>
              <p className="text-[10px] text-muted-foreground mt-1">Nominales con solo 2 categorías (Sí/No).</p>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-gray-50 border mt-3">
          <CardContent className="p-2 text-[10px] text-muted-foreground">
            <strong>Nota:</strong> En este ejercicio no hay ninguna variable ordinal. Un ejemplo sería &quot;satisfacción con el servicio: baja, media, alta&quot; (categorías con orden).
          </CardContent>
        </Card>
      </StepCard>
    </ExerciseLayout>
  );
}
