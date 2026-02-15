"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ArrowRight, Target, ArrowLeftRight, Shapes, Sigma, BookOpen } from "lucide-react";
import Link from "next/link";

const ejercicios = [
  { num: "1", title: "Comparación de dispersión: tubos TV", url: "/tema-3/ejercicio-1", difficulty: "Bajo", sections: ["Dispersión", "CV"] },
  { num: "2", title: "Lanzamiento de dado", url: "/tema-3/ejercicio-2", difficulty: "Bajo", sections: ["Posición", "Dispersión"] },
  { num: "3", title: "Cifras de ventas (30 semanas)", url: "/tema-3/ejercicio-3", difficulty: "Medio-Alto", sections: ["Posición", "Dispersión", "Forma"] },
  { num: "4", title: "Duración de baterías", url: "/tema-3/ejercicio-4", difficulty: "Medio", sections: ["Posición", "Dispersión"] },
  { num: "5", title: "Comparación de calificaciones", url: "/tema-3/ejercicio-5", difficulty: "Alto", sections: ["Forma", "Curtosis"] },
  { num: "6", title: "Efecto de nuevas observaciones", url: "/tema-3/ejercicio-6", difficulty: "Medio", sections: ["Propiedades"] },
  { num: "7", title: "Media ponderada estratificada", url: "/tema-3/ejercicio-7", difficulty: "Bajo", sections: ["Posición"] },
  { num: "8", title: "Análisis de holding empresarial", url: "/tema-3/ejercicio-8", difficulty: "Alto", sections: ["Dispersión", "CV"] },
  { num: "C1", title: "Análisis completo de salarios", url: "/tema-3/complementario-1", difficulty: "Medio", sections: ["Posición", "Dispersión"] },
  { num: "C2", title: "Comparación de calificaciones", url: "/tema-3/complementario-2", difficulty: "Medio-Alto", sections: ["Forma", "CV"] },
  { num: "C3", title: "Relación entre σ y CV", url: "/tema-3/complementario-3", difficulty: "Medio", sections: ["Dispersión", "CV"] },
];

const difficultyColors: Record<string, string> = {
  "Bajo": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
  "Bajo-Medio": "bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-200",
  "Medio": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
  "Medio-Alto": "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200",
  "Alto": "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200",
};

export default function Tema3Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ===== HEADER ===== */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200">Tema 3</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Análisis Estadístico de Variables Unidimensionales</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Medidas de posición, dispersión y forma</p>
      </div>

      {/* ===== INTRODUCCIÓN FEYNMAN ===== */}
      <Card className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 border-violet-200 dark:border-violet-800">
        <CardContent className="p-4 sm:p-5 space-y-3 text-sm">
          <p>
            Imagina que tienes las <strong>notas de 30 alumnos</strong> de tu clase. Son 30 números.
            Si alguien te pregunta <em>&quot;¿cómo les fue en el examen?&quot;</em>, no vas a leerle los 30 números uno a uno. Necesitas <strong>resumir</strong>.
          </p>
          <p>
            La estadística te da herramientas para convertir muchos datos en <strong>unos pocos números</strong> que cuentan la historia completa.
            Este tema trata exactamente de eso: las <strong>medidas estadísticas</strong>.
          </p>
          <p>Todo se reduce a responder <strong>tres preguntas fundamentales</strong>:</p>
        </CardContent>
      </Card>

      {/* ===== LAS 3 PREGUNTAS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="p-4 space-y-1">
            <p className="font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2"><Target className="h-5 w-5" /> ¿Dónde está el centro?</p>
            <p className="text-sm text-muted-foreground">Las medidas de <strong>posición</strong> nos dicen alrededor de qué valor se concentran los datos.</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/50">
          <CardContent className="p-4 space-y-1">
            <p className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2"><ArrowLeftRight className="h-5 w-5" /> ¿Cuánto se dispersan?</p>
            <p className="text-sm text-muted-foreground">Las medidas de <strong>dispersión</strong> nos dicen si los datos están juntos o desperdigados.</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-violet-500 bg-violet-50/50 dark:bg-violet-950/20">
          <CardContent className="p-4 space-y-1">
            <p className="font-bold text-violet-800 dark:text-violet-200 flex items-center gap-2"><Shapes className="h-5 w-5" /> ¿Qué forma tienen?</p>
            <p className="text-sm text-muted-foreground">Las medidas de <strong>forma</strong> nos dicen si la distribución es simétrica, estirada o achatada.</p>
          </CardContent>
        </Card>
      </div>

      {/* ===== NOTA: ESTADÍSTICOS vs PARÁMETROS ===== */}
      <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-3 text-sm text-muted-foreground">
          <strong className="text-gray-700 dark:text-gray-300">Detalle importante:</strong> si calculas estas medidas con <strong>todos</strong> los datos de una población, se llaman <strong>parámetros</strong>. Si las calculas con una muestra (un subconjunto), se llaman <strong>estadísticos</strong>. Las fórmulas son las mismas, pero el nombre cambia.
        </CardContent>
      </Card>

      {/* ===== TABS DE CONTENIDO ===== */}
      <Tabs defaultValue="posicion" className="space-y-4" style={{ display: 'block' }}>
        <div className="z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-4 sm:pt-6 pb-2 bg-background border-b shadow-sm" style={{ position: 'sticky', top: '-1rem' }}>
          <div className="overflow-x-auto scrollbar-hide">
            <TabsList className="inline-flex w-max sm:w-full h-auto gap-1">
              <TabsTrigger value="posicion" className="text-sm px-3 shrink-0">Posición</TabsTrigger>
              <TabsTrigger value="dispersion" className="text-sm px-3 shrink-0">Dispersión</TabsTrigger>
              <TabsTrigger value="forma" className="text-sm px-3 shrink-0">Forma</TabsTrigger>
              <TabsTrigger value="momentos" className="text-sm px-3 shrink-0">Momentos</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ======================================================= */}
        {/* ===== TAB 1: MEDIDAS DE POSICIÓN ===== */}
        {/* ======================================================= */}
        <TabsContent value="posicion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Medidas de Posición: ¿dónde está el centro?
              </CardTitle>
              <CardDescription>
                Resumen de los datos en un único valor representativo. Incluyen medidas de <strong>tendencia central</strong> (media, mediana, moda) y medidas de posición <strong>no centrales</strong> (cuantiles).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Analogía Feynman */}
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4 text-sm space-y-2">
                  <p>
                    Imagina que <strong>5 amigos</strong> tienen 2€, 4€, 5€, 6€ y 8€.
                    Si juntan todo el dinero y lo reparten por igual, cada uno recibe <strong>5€</strong>.
                    Eso es la <strong>media</strong>: el reparto justo.
                  </p>
                  <p>
                    Pero, ¿y si un amigo tiene 100€? La media se dispara a 23,4€,
                    cuando la mayoría tiene menos de 10€.
                    Por eso existe la <strong>mediana</strong> (el valor del medio al ordenar): no le afectan los extremos.
                    Y la <strong>moda</strong> (el valor más repetido) nos dice qué es lo &quot;normal&quot;.
                  </p>
                </CardContent>
              </Card>

              {/* MEDIA ARITMÉTICA */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold">1</span>
                  Media Aritmética
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Card className="border-l-4 border-l-blue-400">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">Definición</Badge>
                        <InlineMath math="\bar{x}" />
                      </div>
                      <FormulaDisplay math="\bar{x} = \frac{\displaystyle\sum_{i=1}^{k} x_i \cdot n_i}{n}" />
                      <p className="text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/20 rounded p-2 mt-1"><strong>En simple:</strong> multiplica cada valor por las veces que aparece, suma todo, y divide entre el total de datos. Es como <strong>juntar todo el dinero y repartirlo por igual</strong>.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">Características</Badge>
                      <div className="space-y-1.5 text-sm">
                        <div className="flex items-start gap-2">
                          <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 shrink-0">Ventaja</Badge>
                          <span className="text-muted-foreground">Usa todos los datos, cálculo sencillo, es única</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Badge variant="outline" className="text-[9px] bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 shrink-0">Cuidado</Badge>
                          <span className="text-muted-foreground">Sensible a valores atípicos (outliers)</span>
                        </div>
                      </div>
                      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-2">
                        <CardContent className="p-2 text-sm space-y-1">
                          <p><strong>Propiedad clave:</strong> si a todos les sumas un fijo o les multiplicas por algo, la media cambia igual. Si <InlineMath math="Y = a \cdot X + b" />, entonces <InlineMath math="\bar{y} = a \cdot \bar{x} + b" /></p>
                          <p><strong>Media ponderada:</strong> si juntas dos grupos, la media total es:</p>
                          <FormulaDisplay math="\bar{x} = \frac{\bar{x}_1 \cdot n_1 + \bar{x}_2 \cdot n_2}{n_1 + n_2}" />
                          <p className="text-muted-foreground">Multiplica la media de cada grupo por su tamaño, suma y divide entre el total.</p>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* MEDIANA */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold">2</span>
                  Mediana
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Card className="border-l-4 border-l-blue-400">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">Definición</Badge>
                        <InlineMath math="Me" />
                      </div>
                      <FormulaDisplay math="\text{Posición} = \frac{n+1}{2}" />
                      <p className="text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/20 rounded p-2 mt-1"><strong>En simple:</strong> ordena todos los datos de menor a mayor y <strong>coge el que queda justo en la mitad</strong>. Para saber cuál es, suma 1 al total de datos y divide entre 2.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">¿Cómo se calcula?</Badge>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2">
                          <p className="font-semibold text-blue-800 dark:text-blue-200">Si <InlineMath math="n" /> es impar:</p>
                          <p>La posición es un entero → la mediana es ese dato directamente.</p>
                          <p className="text-sm mt-1">Ej: datos <InlineMath math="0, 1, 3, 3, 5" /> → posición <InlineMath math="\frac{5+1}{2} = 3" /> → <InlineMath math="Me = 3" /></p>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded p-2">
                          <p className="font-semibold text-indigo-800 dark:text-indigo-200">Si <InlineMath math="n" /> es par:</p>
                          <p>La posición no es entera → media de los dos valores centrales.</p>
                          <p className="text-sm mt-1">Ej: datos <InlineMath math="1, 2, 5, 7, 9, 10" /> → posición <InlineMath math="3{,}5" /> → <InlineMath math="Me = \frac{5+7}{2} = 6" /></p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">No le afectan los extremos</Badge>
                        <Badge variant="outline" className="text-[9px] bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300">No usa todos los datos</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* MODA */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold">3</span>
                  Moda
                </h3>
                <Card className="border-l-4 border-l-blue-400">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">Definición</Badge>
                      <InlineMath math="Mo" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      El <strong>valor que más veces se repite</strong>. Si en una cafetería el café más pedido es el mediano, la moda es &quot;mediano&quot;.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-sm">
                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-2 text-center">
                        <p className="font-semibold">Unimodal</p>
                        <p className="text-muted-foreground">Una sola moda</p>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded p-2 text-center">
                        <p className="font-semibold">Bimodal / Multimodal</p>
                        <p className="text-muted-foreground">Varios valores con la misma frecuencia máxima</p>
                      </div>
                      <div className="bg-violet-50 dark:bg-violet-950/20 rounded p-2 text-center">
                        <p className="font-semibold">Amodal</p>
                        <p className="text-muted-foreground">Todos se repiten igual → no hay moda</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">Sirve para variables cualitativas</Badge>
                      <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">No le afectan los atípicos</Badge>
                      <Badge variant="outline" className="text-[9px] bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300">No usa todos los datos</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* OUTLIERS */}
              <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <CardContent className="p-4 space-y-2">
                  <p className="font-semibold text-sm text-amber-800 dark:text-amber-200">Cuidado con los outliers</p>
                  <p className="text-sm text-muted-foreground">
                    Los valores atípicos distorsionan la media pero <strong>no afectan</strong> a la mediana ni a la moda.
                    Ejemplo: en <InlineMath math="100,\ 150,\ 150,\ 200,\ 250,\ 50000" />, la media es <InlineMath math="8475" />, pero <InlineMath math="Me = 175" /> y <InlineMath math="Mo = 150" />. Si el <InlineMath math="50000" /> es un error de medida, la mediana da una imagen mucho más fiel.
                  </p>
                </CardContent>
              </Card>

              <Separator />

              {/* CUANTILES */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold">4</span>
                  Cuantiles: medidas de posición NO centrales
                </h3>

                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4 text-sm space-y-2">
                    <p>
                      Imagina que ordenas a toda tu clase <strong>de menor a mayor nota</strong> y la divides en trozos iguales.
                      Si la divides en <strong>4 trozos</strong>, los puntos de corte son los cuartiles.
                      Si la divides en <strong>10</strong>, deciles. En <strong>100</strong>, percentiles.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">Cuartiles</Badge>
                      <p className="text-sm text-muted-foreground">Dividen los datos en <strong>4 partes</strong> iguales.</p>
                      <div className="space-y-1 text-sm">
                        <p><InlineMath math="Q_1" /> → deja el 25% por debajo</p>
                        <p><InlineMath math="Q_2 = Me" /> → deja el 50%</p>
                        <p><InlineMath math="Q_3" /> → deja el 75%</p>
                      </div>
                      <FormulaDisplay math="\text{Pos}(Q_j) = \frac{j(n+1)}{4}" />
                      <p className="text-sm text-muted-foreground mt-1">Multiplica el número del cuartil (1, 2 o 3) por (total de datos + 1) y divide entre 4. Eso te dice en qué posición está.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">Deciles</Badge>
                      <p className="text-sm text-muted-foreground">Dividen los datos en <strong>10 partes</strong> iguales.</p>
                      <div className="space-y-1 text-sm">
                        <p><InlineMath math="D_1" /> → deja el 10% por debajo</p>
                        <p><InlineMath math="D_5 = Me" /> → deja el 50%</p>
                        <p><InlineMath math="D_9" /> → deja el 90%</p>
                      </div>
                      <FormulaDisplay math="\text{Pos}(D_j) = \frac{j(n+1)}{10}" />
                      <p className="text-sm text-muted-foreground mt-1">Mismo truco: multiplica el número del decil por (total + 1) y divide entre 10.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">Percentiles</Badge>
                      <p className="text-sm text-muted-foreground">Dividen los datos en <strong>100 partes</strong> iguales.</p>
                      <div className="space-y-1 text-sm">
                        <p><InlineMath math="P_{25} = Q_1" /></p>
                        <p><InlineMath math="P_{50} = Me" /></p>
                        <p><InlineMath math="P_{75} = Q_3" /></p>
                      </div>
                      <FormulaDisplay math="\text{Pos}(P_j) = \frac{j(n+1)}{100}" />
                      <p className="text-sm text-muted-foreground mt-1">El número del percentil por (total + 1) entre 100. Siempre la misma idea.</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-2 text-sm text-amber-800 dark:text-amber-200">
                    <strong>Recuerda:</strong> los cuantiles pueden no coincidir con un dato real de la distribución (al igual que ocurre con la mediana cuando <InlineMath math="n" /> es par).
                  </CardContent>
                </Card>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* ======================================================= */}
        {/* ===== TAB 2: MEDIDAS DE DISPERSIÓN ===== */}
        {/* ======================================================= */}
        <TabsContent value="dispersion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Medidas de Dispersión: ¿cuánto se alejan del centro?
              </CardTitle>
              <CardDescription>
                La media sola no basta. Necesitamos saber si los datos están <strong>apretujados</strong> cerca del centro o <strong>desperdigados</strong> lejos de él.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Analogía Feynman */}
              <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <CardContent className="p-4 text-sm space-y-2">
                  <p>
                    Dos tiradores disparan 10 flechas a una diana. Ambos aciertan <strong>&quot;de media&quot; en el centro</strong>.
                    Pero uno clava todas las flechas juntitas en el centro, y el otro las esparce por toda la diana.
                  </p>
                  <p>
                    <strong>Misma media, rendimiento muy distinto.</strong> Dos poblaciones pueden tener la misma media pero ser completamente diferentes.
                    Ejemplo: una población A donde todos ganan 1.000€, y otra B con uno que gana 100.000€ y diez que ganan 1.000€. Ambas con media 10.000€, pero la riqueza está distribuida de forma muy diferente.
                  </p>
                </CardContent>
              </Card>

              {/* RECORRIDO y RIC */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold">1</span>
                  Recorridos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">Recorrido</Badge>
                        <InlineMath math="Re" />
                      </div>
                      <FormulaDisplay math="Re = x_{\max} - x_{\min}" />
                      <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 rounded p-2 mt-1"><strong>En simple:</strong> coge el dato más grande, réstale el más pequeño. Ya está. Es la medida más fácil, pero si hay un dato raro lo estropea todo.</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">Rápido y sencillo</Badge>
                        <Badge variant="outline" className="text-[9px] bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300">Solo depende de 2 valores</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">Rango Intercuartílico</Badge>
                        <InlineMath math="RIC" />
                      </div>
                      <FormulaDisplay math="RIC = Q_3 - Q_1" />
                      <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 rounded p-2 mt-1"><strong>En simple:</strong> réstale al cuartil 3 el cuartil 1. Te dice <strong>cuánto abarca el 50% central</strong> de los datos, ignorando el 25% más bajo y el 25% más alto.</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">No afectado por atípicos</Badge>
                        <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">Mide el 50% central</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* DESVIACIÓN MEDIA */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold">2</span>
                  Desviaciones Medias
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">Respecto a la media</Badge>
                      <FormulaDisplay math="D_{\bar{x}} = \frac{1}{n} \sum_{i=1}^{k} |x_i - \bar{x}| \cdot n_i" />
                      <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 rounded p-2 mt-1"><strong>En simple:</strong> para cada dato, calcula <strong>cuánto se aleja de la media</strong> (sin signo negativo). Luego haz la media de todas esas distancias.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">Respecto a la mediana</Badge>
                      <FormulaDisplay math="D_{Me} = \frac{1}{n} \sum_{i=1}^{k} |x_i - Me| \cdot n_i" />
                      <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 rounded p-2 mt-1"><strong>En simple:</strong> lo mismo pero midiendo la distancia a la <strong>mediana</strong> en vez de a la media.</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-2 text-sm text-amber-800 dark:text-amber-200">
                    <strong>Limitación:</strong> el valor absoluto es complicado de manejar algebraicamente, por eso en la práctica se prefiere la varianza (que usa el cuadrado en lugar del valor absoluto).
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* VARIANZA y DESVIACIÓN TÍPICA */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold">3</span>
                  Varianza y Desviación Típica
                </h3>

                <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-4 text-sm space-y-2">
                    <p>
                      El problema del valor absoluto se resuelve <strong>elevando al cuadrado</strong>: así las diferencias nunca se cancelan y además es más fácil de manejar algebraicamente. El resultado es la <strong>varianza</strong>. Pero como queda en &quot;unidades al cuadrado&quot; (€², kg²...), le sacamos la raíz para volver a las unidades originales: eso es la <strong>desviación típica</strong>.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Card className="border-l-4 border-l-amber-400">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">Varianza</Badge>
                        <InlineMath math="s^2" />
                      </div>
                      <FormulaDisplay math="s^2 = \frac{1}{n}\sum_{i=1}^{k} (x_i - \bar{x})^2 \cdot n_i" />
                      <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 rounded p-2 mt-1"><strong>En simple:</strong> 1) a cada dato le <strong>restas la media</strong>, 2) <strong>elevas al cuadrado</strong> esa diferencia, 3) haces <strong>la media</strong> de todos esos cuadrados. Cuanto mayor sea, más dispersos están los datos.</p>
                      <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <CardContent className="p-2 text-sm space-y-1">
                          <p className="font-semibold">Fórmula alternativa (muy útil):</p>
                          <FormulaDisplay math="s^2 = \overline{x^2} - \bar{x}^2" />
                          <p className="text-muted-foreground">Es decir: la media de los cuadrados menos el cuadrado de la media.</p>
                        </CardContent>
                      </Card>
                      <Badge variant="outline" className="text-[9px] bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300">Está en unidades al cuadrado (€², kg²...)</Badge>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-amber-400">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">Desviación Típica</Badge>
                        <InlineMath math="s" />
                      </div>
                      <FormulaDisplay math="s = +\sqrt{s^2}" />
                      <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 rounded p-2 mt-1"><strong>En simple:</strong> es la <strong>raíz cuadrada de la varianza</strong>. Como la varianza está en unidades al cuadrado (€², cm²...), le sacamos la raíz para que vuelva a estar en € o cm. Es la medida de dispersión más usada.</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">Mismas unidades que los datos</Badge>
                        <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">Usa todos los datos</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Propiedades de la varianza */}
                <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 space-y-2">
                    <p className="font-semibold text-sm">Propiedades de la varianza ante transformaciones lineales</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="bg-white dark:bg-gray-900 rounded p-2">
                        <p className="font-semibold">Cambio de origen: <InlineMath math="Y = X + b" /></p>
                        <p className="text-muted-foreground"><InlineMath math="s_Y^2 = s_X^2" /> → la varianza <strong>no cambia</strong></p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded p-2">
                        <p className="font-semibold">Cambio de escala: <InlineMath math="Y = a \cdot X" /></p>
                        <p className="text-muted-foreground"><InlineMath math="s_Y^2 = a^2 \cdot s_X^2" /> → se multiplica por <InlineMath math="a^2" /></p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded p-2 text-sm">
                      <p className="font-semibold">En general: <InlineMath math="Y = a \cdot X + b" /></p>
                      <p className="text-muted-foreground"><InlineMath math="\bar{y} = a \cdot \bar{x} + b" /> y <InlineMath math="s_Y^2 = a^2 \cdot s_X^2" /> → el origen no afecta a la dispersión, solo la escala.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* COEFICIENTE DE VARIACIÓN */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold">4</span>
                  Coeficiente de Variación de Pearson
                </h3>
                <Card className="border-l-4 border-l-amber-400">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">CV</Badge>
                    </div>
                    <FormulaDisplay math="CV = \frac{s}{|\bar{x}|} \times 100" />
                    <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 rounded p-2 mt-1"><strong>En simple:</strong> divide la desviación típica entre la media y multiplica por 100. Te da la dispersión en <strong>porcentaje</strong>. Si el CV es alto, la media no es fiable. Si es bajo, la media representa bien los datos. Sirve para <strong>comparar cosas con diferentes unidades</strong> (€ vs cm).</p>

                    <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                      <CardContent className="p-3 text-sm space-y-2">
                        <p className="font-semibold text-amber-800 dark:text-amber-200">Ejemplo: ¿quién es más fiable?</p>
                        <p className="text-muted-foreground">
                          Un inversor quiere comprar una asesoría y compara tres empresas por sus consultas semanales:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-sm">
                          <div className="bg-white dark:bg-gray-900 rounded p-2">
                            <p className="font-bold">Empresa X</p>
                            <p><InlineMath math="\bar{x}=2{,}3" />, <InlineMath math="s=1" /></p>
                            <p className="font-semibold text-amber-700 dark:text-amber-300"><InlineMath math="CV = 43{,}5\%" /></p>
                          </div>
                          <div className="bg-white dark:bg-gray-900 rounded p-2">
                            <p className="font-bold">Empresa Y</p>
                            <p><InlineMath math="\bar{x}=3" />, <InlineMath math="s=1{,}6" /></p>
                            <p className="font-semibold text-amber-700 dark:text-amber-300"><InlineMath math="CV = 53{,}3\%" /></p>
                          </div>
                          <div className="bg-white dark:bg-gray-900 rounded p-2">
                            <p className="font-bold">Empresa Z</p>
                            <p><InlineMath math="\bar{x}=3{,}6" />, <InlineMath math="s=5" /></p>
                            <p className="font-semibold text-red-700 dark:text-red-300"><InlineMath math="CV = 138{,}9\%" /></p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">La empresa X tiene la media más representativa (menor CV). La Z tiene un CV altísimo: su media no es fiable.</p>
                      </CardContent>
                    </Card>

                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-[9px] bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">Adimensional: compara escalas distintas</Badge>
                      <Badge variant="outline" className="text-[9px] bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300">No se puede usar si la media es 0</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* TIPIFICACIÓN */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold">5</span>
                  Tipificación (Estandarización)
                </h3>
                <Card className="border-l-4 border-l-amber-400">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">Variable Tipificada</Badge>
                      <InlineMath math="Z" />
                    </div>
                    <FormulaDisplay math="Z = \frac{X - \bar{x}}{s}" />
                    <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 rounded p-2 mt-1"><strong>En simple:</strong> coge tu dato, <strong>réstale la media</strong> y <strong>divide entre la desviación típica</strong>. El resultado te dice <strong>a cuántas desviaciones típicas está de la media</strong>. Sirve para comparar datos de escalas totalmente diferentes (notas de Mates vs Historia, sueldos de distintas empresas...).</p>

                    <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                      <CardContent className="p-3 text-sm space-y-2">
                        <p className="font-semibold text-amber-800 dark:text-amber-200">Ejemplo: ¿en qué asignatura destaca más?</p>
                        <p className="text-muted-foreground">
                          Un alumno saca un 8 en Mates (<InlineMath math="\bar{x}=6,\ s=1" />) y un 7 en Historia (<InlineMath math="\bar{x}=5,\ s=0{,}5" />).
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                            <CardContent className="p-2 text-center">
                              <p className="text-sm text-muted-foreground">Mates</p>
                              <FormulaDisplay math="Z = \frac{8-6}{1} = 2" />
                            </CardContent>
                          </Card>
                          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
                            <CardContent className="p-2 text-center">
                              <p className="text-sm text-muted-foreground">Historia</p>
                              <FormulaDisplay math="Z = \frac{7-5}{0{,}5} = 4" />
                            </CardContent>
                          </Card>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          En Historia está a 4 desviaciones de la media, frente a 2 en Mates. <strong>Destaca más en Historia</strong>, aunque su nota sea menor.
                        </p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* ======================================================= */}
        {/* ===== TAB 3: MEDIDAS DE FORMA ===== */}
        {/* ======================================================= */}
        <TabsContent value="forma" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shapes className="h-5 w-5 text-violet-600" />
                Medidas de Forma: ¿qué pinta tiene la distribución?
              </CardTitle>
              <CardDescription>
                Solo se aplican a distribuciones <strong>unimodales</strong>. Describen la silueta de la distribución: su simetría y su apuntamiento.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Analogía Feynman */}
              <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
                <CardContent className="p-4 text-sm space-y-2">
                  <p>
                    Imagina la distribución de datos como una <strong>montaña vista de perfil</strong>.
                    Ya sabemos dónde está (posición) y cuánto ocupa de ancho (dispersión).
                    Pero, ¿qué <strong>forma</strong> tiene?
                  </p>
                  <p>
                    ¿Es <strong>simétrica</strong> como el Monte Fuji? ¿O tiene una cola más larga hacia un lado (<strong>asimetría</strong>)?
                    ¿Es un <strong>pico puntiagudo</strong> como los Alpes o una <strong>meseta achatada</strong> como una colina suave (<strong>curtosis</strong>)?
                  </p>
                </CardContent>
              </Card>

              {/* ASIMETRÍA */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-bold">1</span>
                  Asimetría
                </h3>

                <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
                  <CardContent className="p-4 text-sm space-y-2">
                    <p>
                      La asimetría mide si la distribución está <strong>equilibrada</strong> respecto a su centro o si tiene una cola más larga hacia un lado.
                      La clave es comparar la posición relativa de la media, la mediana y la moda:
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-sm">
                  <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                    <CardContent className="p-3 space-y-1">
                      <p className="font-bold text-red-800 dark:text-red-200">Asimetría negativa</p>
                      <p className="text-sm text-muted-foreground">Cola larga a la izquierda</p>
                      <FormulaDisplay math="\bar{x} \leq Me \leq Mo" />
                      <p className="text-sm">La media se &quot;arrastra&quot; hacia los valores bajos</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="p-3 space-y-1">
                      <p className="font-bold text-green-800 dark:text-green-200">Simétrica</p>
                      <p className="text-sm text-muted-foreground">Equilibrada</p>
                      <FormulaDisplay math="Me = Mo = \bar{x}" />
                      <p className="text-sm">Las tres medidas coinciden</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-3 space-y-1">
                      <p className="font-bold text-blue-800 dark:text-blue-200">Asimetría positiva</p>
                      <p className="text-sm text-muted-foreground">Cola larga a la derecha</p>
                      <FormulaDisplay math="Mo \leq Me \leq \bar{x}" />
                      <p className="text-sm">La media se &quot;arrastra&quot; hacia los valores altos</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200">Asimetría de Fisher</Badge>
                        <InlineMath math="g_1" />
                      </div>
                      <FormulaDisplay math="g_1 = \frac{m_3}{s^3}" />
                      <p className="text-sm text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/20 rounded p-2 mt-1"><strong>En simple:</strong> a cada dato le restas la media y lo <strong>elevas al cubo</strong> (no al cuadrado, al cubo). Haces la media de esos cubos y divides entre la desviación típica al cubo. Si el resultado es <strong>negativo</strong> → cola a la izquierda. Si es <strong>positivo</strong> → cola a la derecha. Si es <strong>cero</strong> → simétrica.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-2 text-center text-[9px]">
                        <div className="bg-red-50 dark:bg-red-950/20 rounded p-1.5">
                          <p className="font-bold"><InlineMath math="g_1 < 0" /></p>
                          <p>Asim. negativa</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/20 rounded p-1.5">
                          <p className="font-bold"><InlineMath math="g_1 = 0" /></p>
                          <p>Simétrica</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-1.5">
                          <p className="font-bold"><InlineMath math="g_1 > 0" /></p>
                          <p>Asim. positiva</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200">Asimetría de Pearson</Badge>
                        <InlineMath math="g_P" />
                      </div>
                      <FormulaDisplay math="g_P = \frac{\bar{x} - Mo}{s}" />
                      <p className="text-sm text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/20 rounded p-2 mt-1"><strong>En simple:</strong> réstale la moda a la media y divide entre la desviación típica. Si la media y la moda son iguales → simétrica. Si la media es <strong>mayor</strong> que la moda → cola a la derecha (la media se &quot;arrastra&quot; hacia los valores altos).</p>
                      <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mt-2">
                        <CardContent className="p-3 text-sm space-y-1">
                          <p className="font-semibold text-violet-800 dark:text-violet-200">Ejemplo: 3 navieras</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-center">
                            <div className="bg-white dark:bg-gray-900 rounded p-1">
                              <p className="font-bold">A</p>
                              <p><InlineMath math="\bar{x}=6" />, <InlineMath math="Mo=5" /></p>
                              <p><InlineMath math="g_P = 0{,}63" /></p>
                              <p className="text-blue-700 dark:text-blue-300">Asim. positiva</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded p-1">
                              <p className="font-bold">B</p>
                              <p><InlineMath math="\bar{x}=7" />, <InlineMath math="Mo=8" /></p>
                              <p><InlineMath math="g_P = -0{,}45" /></p>
                              <p className="text-red-700 dark:text-red-300">Asim. negativa</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded p-1">
                              <p className="font-bold">C</p>
                              <p><InlineMath math="\bar{x}=5" />, <InlineMath math="Mo=5" /></p>
                              <p><InlineMath math="g_P = 0" /></p>
                              <p className="text-green-700 dark:text-green-300">Simétrica</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* CURTOSIS */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-bold">2</span>
                  Curtosis (Apuntamiento)
                </h3>

                <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
                  <CardContent className="p-4 text-sm space-y-2">
                    <p>
                      La <strong>curtosis</strong> mide la <strong>concentración de datos alrededor de la media</strong> comparándola con la distribución Normal (campana de Gauss). Se resta 3 para que la Normal tenga curtosis 0 como referencia.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-violet-400">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200">Coeficiente de Curtosis</Badge>
                      <InlineMath math="g_2" />
                    </div>
                    <FormulaDisplay math="g_2 = \frac{m_4}{s^4} - 3" />
                    <p className="text-sm text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/20 rounded p-2 mt-1"><strong>En simple:</strong> igual que la asimetría pero elevando a la <strong>cuarta potencia</strong> en vez de al cubo. Divides entre la desviación típica a la cuarta y <strong>restas 3</strong> (para que la campana normal de Gauss dé 0). Si sale <strong>positivo</strong> → más puntiaguda que la Normal. Si sale <strong>negativo</strong> → más achatada.</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-sm">
                  <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
                    <CardContent className="p-3 space-y-1">
                      <p className="font-bold text-orange-800 dark:text-orange-200">Platicúrtica</p>
                      <p className="font-bold"><InlineMath math="g_2 < 0" /></p>
                      <p className="text-sm text-muted-foreground">Más <strong>achatada</strong> que la Normal. Datos más repartidos, menos concentrados en el centro.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="p-3 space-y-1">
                      <p className="font-bold text-green-800 dark:text-green-200">Mesocúrtica</p>
                      <p className="font-bold"><InlineMath math="g_2 = 0" /></p>
                      <p className="text-sm text-muted-foreground">Igual que la Normal. Es la referencia estándar.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
                    <CardContent className="p-3 space-y-1">
                      <p className="font-bold text-violet-800 dark:text-violet-200">Leptocúrtica</p>
                      <p className="font-bold"><InlineMath math="g_2 > 0" /></p>
                      <p className="text-sm text-muted-foreground">Más <strong>puntiaguda</strong> que la Normal. Datos muy concentrados en el centro, con colas más largas.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* ======================================================= */}
        {/* ===== TAB 4: MOMENTOS ===== */}
        {/* ======================================================= */}
        <TabsContent value="momentos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sigma className="h-5 w-5 text-teal-600" />
                Momentos
              </CardTitle>
              <CardDescription>
                Los momentos son una <strong>generalización</strong> de muchas medidas que ya conocemos. Todas las medidas de posición, dispersión y forma se pueden expresar como momentos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              <Card className="bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800">
                <CardContent className="p-4 text-sm space-y-2">
                  <p>
                    Piensa en los momentos como una <strong>familia de promedios</strong> donde cada miembro usa una potencia diferente.
                    Los de orden 1 nos dan la posición, los de orden 2 la dispersión, los de orden 3 la asimetría, y los de orden 4 la curtosis.
                    Es una sola fórmula que lo unifica todo.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Momentos respecto al origen */}
                <Card className="border-l-4 border-l-teal-400">
                  <CardContent className="p-4 space-y-3">
                    <Badge className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200">Momentos respecto al origen</Badge>
                    <p className="text-sm text-muted-foreground">También llamados <strong>no centrales</strong>. Se calculan respecto al cero:</p>
                    <FormulaDisplay math="a_r = \frac{1}{n}\sum_{i=1}^{k} x_i^r \cdot n_i" />
                    <div className="bg-teal-100/60 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-lg p-2.5 text-sm text-teal-900 dark:text-teal-100">
                      <span className="font-semibold">En simple:</span> eleva cada dato a la potencia <InlineMath math="r" />, multiplica por las veces que aparece, suma todo y divide entre el total. Si <InlineMath math="r = 1" /> te sale la media.
                    </div>
                    <div className="space-y-1.5 text-sm bg-teal-50 dark:bg-teal-950/20 rounded p-3">
                      <p className="font-semibold text-teal-800 dark:text-teal-200">Casos particulares:</p>
                      <div className="space-y-1">
                        <p><InlineMath math="a_0 = 1" /> (siempre vale 1)</p>
                        <p><InlineMath math="a_1 = \bar{x}" /> (la media aritmética)</p>
                        <p><InlineMath math="a_2 = \overline{x^2}" /> (media de los cuadrados)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Momentos centrales */}
                <Card className="border-l-4 border-l-cyan-400">
                  <CardContent className="p-4 space-y-3">
                    <Badge className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200">Momentos centrales</Badge>
                    <p className="text-sm text-muted-foreground">Se calculan respecto a la <strong>media aritmética</strong>:</p>
                    <FormulaDisplay math="m_r = \frac{1}{n}\sum_{i=1}^{k} (x_i - \bar{x})^r \cdot n_i" />
                    <div className="bg-cyan-100/60 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 rounded-lg p-2.5 text-sm text-cyan-900 dark:text-cyan-100">
                      <span className="font-semibold">En simple:</span> a cada dato le restas la media, elevas esa diferencia a la potencia <InlineMath math="r" />, multiplicas por las veces que aparece, sumas todo y divides entre el total. Si <InlineMath math="r = 2" /> te sale la varianza.
                    </div>
                    <div className="space-y-1.5 text-sm bg-cyan-50 dark:bg-cyan-950/20 rounded p-3">
                      <p className="font-semibold text-cyan-800 dark:text-cyan-200">Casos particulares:</p>
                      <div className="space-y-1">
                        <p><InlineMath math="m_0 = 1" /> (siempre vale 1)</p>
                        <p><InlineMath math="m_1 = 0" /> (siempre vale 0)</p>
                        <p><InlineMath math="m_2 = s^2" /> (la varianza)</p>
                        <p><InlineMath math="m_3" /> → se usa para la <strong>asimetría</strong></p>
                        <p><InlineMath math="m_4" /> → se usa para la <strong>curtosis</strong></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Relación entre momentos y medidas */}
              <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border-2">
                <CardContent className="p-4 space-y-3">
                  <p className="font-semibold text-sm text-center">Relación entre momentos y medidas</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
                      <p className="font-semibold">Varianza</p>
                      <FormulaDisplay math="s^2 = m_2 = a_2 - a_1^2" />
                      <p className="text-sm text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/20 rounded px-2 py-1"><span className="font-semibold">En simple:</span> la varianza es el momento central de orden 2. También se puede calcular como la media de los cuadrados menos el cuadrado de la media.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
                      <p className="font-semibold">Asimetría de Fisher</p>
                      <FormulaDisplay math="g_1 = \frac{m_3}{s^3} = \frac{m_3}{m_2^{3/2}}" />
                      <p className="text-sm text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/20 rounded px-2 py-1"><span className="font-semibold">En simple:</span> coge el momento central de orden 3 y divídelo entre la desviación típica al cubo. Así normalizas la asimetría.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
                      <p className="font-semibold">Curtosis</p>
                      <FormulaDisplay math="g_2 = \frac{m_4}{s^4} - 3 = \frac{m_4}{m_2^2} - 3" />
                      <p className="text-sm text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/20 rounded px-2 py-1"><span className="font-semibold">En simple:</span> coge el momento central de orden 4, divídelo entre la varianza al cuadrado, y réstale 3 (para que la Normal dé cero).</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded p-2 space-y-1">
                      <p className="font-semibold">Ejemplo de clasificación</p>
                      <div className="text-sm text-muted-foreground space-y-0.5">
                        <p><InlineMath math="\bar{x}" /> → momento de orden 1 al origen</p>
                        <p><InlineMath math="s^2" /> → momento de orden 2 central</p>
                        <p><InlineMath math="P_{38}" /> → NO es un momento</p>
                        <p><InlineMath math="Mo" /> → NO es un momento</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ===== RESUMEN VISUAL ===== */}
      <Card className="bg-gradient-to-r from-blue-50 via-amber-50 to-violet-50 dark:from-blue-950/20 dark:via-amber-950/20 dark:to-violet-950/20 border-2">
        <CardContent className="p-4">
          <p className="font-semibold text-sm text-center mb-3">En resumen: 3 preguntas, 3 grupos de medidas</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="space-y-1">
              <p className="font-bold text-blue-800 dark:text-blue-200">Posición</p>
              <p className="text-muted-foreground">¿Dónde está el centro?</p>
              <p><InlineMath math="\bar{x}" />, <InlineMath math="Me" />, <InlineMath math="Mo" />, <InlineMath math="Q_1" />, <InlineMath math="Q_2" />, <InlineMath math="Q_3" /></p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-amber-800 dark:text-amber-200">Dispersión</p>
              <p className="text-muted-foreground">¿Cuánto se alejan?</p>
              <p><InlineMath math="Re" />, <InlineMath math="RIC" />, <InlineMath math="s^2" />, <InlineMath math="s" />, <InlineMath math="CV" />, <InlineMath math="Z" /></p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-violet-800 dark:text-violet-200">Forma</p>
              <p className="text-muted-foreground">¿Qué pinta tiene?</p>
              <p><InlineMath math="g_1" />, <InlineMath math="g_P" />, <InlineMath math="g_2" /></p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* ===== LISTA DE EJERCICIOS ===== */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Ejercicios</h2>
        <p className="text-sm text-muted-foreground">Practica los conceptos del tema con estos ejercicios resueltos paso a paso.</p>
        {ejercicios.map((ej) => (
          <Link key={ej.url} href={ej.url}>
            <Card className="hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer">
              <CardContent className="flex items-center justify-between py-3 sm:py-4 px-4 sm:px-5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-bold">
                    {ej.num}
                  </span>
                  <div className="min-w-0">
                    <span className="font-medium text-sm block truncate">{ej.title}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <BookOpen className="h-3 w-3 text-muted-foreground shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {ej.sections.map((s) => (
                          <Badge key={s} variant="outline" className="text-sm px-1.5 py-0 h-4 font-normal text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <Badge className={`hidden sm:inline-flex ${difficultyColors[ej.difficulty]}`}>{ej.difficulty}</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
