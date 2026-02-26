"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ArrowRight, Link2, Sigma, TrendingUp, BarChart3, BookOpen } from "lucide-react";
import Link from "next/link";

const ejercicios = [
  { num: "1", title: "Distribución de frecuencias conjuntas", url: "/tema-4/ejercicio-1", difficulty: "Medio-Alto", sections: ["Covarianza", "Independencia", "Regresión"] },
  { num: "2", title: "Gastos publicidad vs ventas", url: "/tema-4/ejercicio-2", difficulty: "Medio", sections: ["Dispersión", "Correlación", "Regresión"] },
  { num: "3", title: "Rectas de regresión a partir de datos", url: "/tema-4/ejercicio-3", difficulty: "Medio", sections: ["Regresión", "Correlación"] },
  { num: "4", title: "Establecimiento 30 días", url: "/tema-4/ejercicio-4", difficulty: "Medio-Alto", sections: ["Correlación", "Regresión", "Estimación"] },
  { num: "5", title: "Empresas madereras (TICs)", url: "/tema-4/ejercicio-5", difficulty: "Medio", sections: ["Correlación", "Regresión", "R²"] },
  { num: "6", title: "Vacas vs litros de leche", url: "/tema-4/ejercicio-6", difficulty: "Medio", sections: ["Regresión", "R²", "Varianzas"] },
  { num: "C1", title: "Accidentes vs vehículos", url: "/tema-4/complementario-1", difficulty: "Medio", sections: ["Covarianza", "Regresión", "R²"] },
  { num: "C2", title: "Distribución bidimensional", url: "/tema-4/complementario-2", difficulty: "Bajo-Medio", sections: ["Regresión", "Correlación"] },
  { num: "C3", title: "Parking: coste vs tiempo", url: "/tema-4/complementario-3", difficulty: "Bajo", sections: ["Regresión", "R²", "Estimación"] },
];

const difficultyColors: Record<string, string> = {
  "Bajo": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
  "Bajo-Medio": "bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-200",
  "Medio": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
  "Medio-Alto": "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200",
  "Alto": "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200",
};

export default function Tema4Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ===== HEADER ===== */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200">Tema 4</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Descripción Estadística Conjunta de Dos Variables</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Covarianza, correlación y regresión lineal</p>
      </div>

      {/* ===== INTRODUCCIÓN FEYNMAN ===== */}
      <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border-teal-200 dark:border-teal-800">
        <CardContent className="p-4 sm:p-5 space-y-3 text-sm">
          <p>
            Hasta ahora hemos analizado <strong>una sola variable</strong> a la vez: ¿cuánto miden los alumnos? ¿cuánto venden las tiendas?
            Pero en la vida real, casi siempre nos interesa saber si <strong>dos cosas están relacionadas</strong>.
          </p>
          <p>
            ¿Estudiar más horas lleva a mejores notas? ¿Gastar más en publicidad genera más ventas?
            ¿Tener más vacas produce más leche? Este tema nos da las herramientas para responder esas preguntas.
          </p>
          <p>Todo se reduce a responder <strong>tres preguntas fundamentales</strong>:</p>
        </CardContent>
      </Card>

      {/* ===== LAS 3 PREGUNTAS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="border-l-4 border-l-teal-500 bg-teal-50/50 dark:bg-teal-950/20">
          <CardContent className="p-4 space-y-1">
            <p className="font-bold text-teal-800 dark:text-teal-200 flex items-center gap-2"><Link2 className="h-5 w-5" /> ¿Están relacionadas?</p>
            <p className="text-sm text-muted-foreground">La <strong>covarianza</strong> y la <strong>correlación</strong> miden si dos variables se mueven juntas (y en qué dirección).</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="p-4 space-y-1">
            <p className="font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2"><TrendingUp className="h-5 w-5" /> ¿Cómo predecir una a partir de otra?</p>
            <p className="text-sm text-muted-foreground">La <strong>regresión lineal</strong> nos da una fórmula (recta) para estimar Y conociendo X.</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-violet-500 bg-violet-50/50 dark:bg-violet-950/20">
          <CardContent className="p-4 space-y-1">
            <p className="font-bold text-violet-800 dark:text-violet-200 flex items-center gap-2"><BarChart3 className="h-5 w-5" /> ¿Qué tan buena es la predicción?</p>
            <p className="text-sm text-muted-foreground">El <strong>coeficiente de determinación</strong> (<InlineMath math="R^2" />) nos dice qué % de la variación queda explicada.</p>
          </CardContent>
        </Card>
      </div>

      {/* ===== TABS DE CONTENIDO ===== */}
      <Tabs defaultValue="dependencia" className="space-y-4" style={{ display: "block" }}>
        <div className="z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-4 sm:pt-6 pb-2 bg-background border-b shadow-sm" style={{ position: "sticky", top: "-1rem" }}>
          <div className="overflow-x-auto scrollbar-hide">
            <TabsList className="inline-flex w-max sm:w-full h-auto gap-1">
              <TabsTrigger value="dependencia" className="text-sm px-3 shrink-0">Dependencia</TabsTrigger>
              <TabsTrigger value="covarianza" className="text-sm px-3 shrink-0">Covarianza</TabsTrigger>
              <TabsTrigger value="correlacion" className="text-sm px-3 shrink-0">Correlación</TabsTrigger>
              <TabsTrigger value="regresion" className="text-sm px-3 shrink-0">Regresión</TabsTrigger>
              <TabsTrigger value="determinacion" className="text-sm px-3 shrink-0">R²</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ===== TAB 1: DEPENDENCIA ===== */}
        <TabsContent value="dependencia" className="space-y-4">
          <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border-teal-200 dark:border-teal-800">
            <CardContent className="p-4 text-sm space-y-2">
              <p className="font-semibold text-teal-800 dark:text-teal-200">Analogía: el termómetro y el helado</p>
              <p className="text-muted-foreground">
                Cuando sube la temperatura, las heladerías venden más. Pero no siempre exactamente lo mismo:
                un día de 30°C puede vender 200 helados y otro día igual puede vender 180. Hay una <strong>tendencia</strong>, pero no es perfecta.
              </p>
              <p className="text-muted-foreground">
                Esa &quot;tendencia imperfecta&quot; es la <strong>dependencia estadística</strong>: X influye en Y, pero no la determina al 100%.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardContent className="p-3 text-sm space-y-1">
                <p className="font-bold text-green-800 dark:text-green-200">Independencia</p>
                <p className="text-muted-foreground">X no influye para nada en Y. Ejemplo: tu signo del zodíaco y tu nota en el examen.</p>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-3 text-sm space-y-1">
                <p className="font-bold text-amber-800 dark:text-amber-200">Dependencia estadística</p>
                <p className="text-muted-foreground">X influye en Y, pero no al 100%. Ejemplo: horas de estudio y nota (estudiar más ayuda, pero no garantiza un 10).</p>
              </CardContent>
            </Card>
            <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800">
              <CardContent className="p-3 text-sm space-y-1">
                <p className="font-bold text-rose-800 dark:text-rose-200">Dependencia funcional</p>
                <p className="text-muted-foreground">X determina Y al 100%. Ejemplo: el lado de un cuadrado y su perímetro (<InlineMath math="P = 4l" />).</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Condición de independencia estadística</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Dos variables X e Y son <strong>independientes</strong> si y solo si, para <strong>todos</strong> los pares de valores:
              </p>
              <FormulaDisplay math="f_{ij} = f_{i\cdot} \cdot f_{\cdot j} \quad \forall\, i, j" />
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-3 text-sm space-y-1">
                  <p className="text-muted-foreground">
                    <strong>En palabras:</strong> la frecuencia relativa conjunta de cada celda debe ser igual al producto de las marginales. Si <strong>una sola celda falla</strong>, ya no son independientes.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Consecuencia:</strong> si son independientes, las distribuciones condicionadas son iguales a las marginales. Es decir, saber el valor de X no te da información nueva sobre Y.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <CardContent className="p-3 text-sm">
                  <p className="font-semibold text-amber-800 dark:text-amber-200">En frecuencias absolutas</p>
                  <FormulaDisplay math="\frac{n_{ij}}{n} = \frac{n_{i\cdot}}{n} \cdot \frac{n_{\cdot j}}{n} \quad \Leftrightarrow \quad n_{ij} = \frac{n_{i\cdot} \cdot n_{\cdot j}}{n}" />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== TAB 2: COVARIANZA ===== */}
        <TabsContent value="covarianza" className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-sm space-y-2">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Analogía: ¿se mueven juntas o en sentido contrario?</p>
              <p className="text-muted-foreground">
                Imagina dos amigos en una montaña rusa. Si los dos suben y bajan juntos, su &quot;covarianza&quot; es positiva.
                Si cuando uno sube el otro baja, es negativa. Si van cada uno a su rollo, es cercana a cero.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Momentos de una distribución bivariante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Los momentos son las &quot;herramientas de cálculo&quot; que necesitamos. Son generalizaciones de la media y la varianza para dos variables.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-3 space-y-2">
                    <p className="font-semibold text-sm">Momentos al origen <InlineMath math="a_{(r,s)}" /></p>
                    <FormulaDisplay math="a_{(r,s)} = \frac{1}{n}\sum_{i}\sum_{j} x_i^r \cdot y_j^s \cdot n_{ij}" />
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p><InlineMath math="a_{(1,0)} = \bar{x}" /> (media de X)</p>
                      <p><InlineMath math="a_{(0,1)} = \bar{y}" /> (media de Y)</p>
                      <p><InlineMath math="a_{(1,1)} = \overline{xy}" /> (media del producto)</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-3 space-y-2">
                    <p className="font-semibold text-sm">Momentos centrales <InlineMath math="m_{(r,s)}" /></p>
                    <FormulaDisplay math="m_{(r,s)} = \frac{1}{n}\sum_{i}\sum_{j} (x_i-\bar{x})^r (y_j-\bar{y})^s n_{ij}" />
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p><InlineMath math="m_{(2,0)} = s_x^2" /> (varianza de X)</p>
                      <p><InlineMath math="m_{(0,2)} = s_y^2" /> (varianza de Y)</p>
                      <p><InlineMath math="m_{(1,1)} = s_{xy}" /> (covarianza)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">La covarianza</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                La covarianza mide la <strong>dirección</strong> de la relación lineal entre dos variables:
              </p>
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-3 space-y-2">
                  <p className="font-semibold text-blue-800 dark:text-blue-200">Fórmula (atajo)</p>
                  <FormulaDisplay math="s_{xy} = \overline{xy} - \bar{x} \cdot \bar{y}" />
                  <p className="text-xs text-muted-foreground">
                    &quot;La media del producto menos el producto de las medias&quot;
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                  <CardContent className="p-3 text-sm space-y-1">
                    <p className="font-bold text-emerald-800 dark:text-emerald-200"><InlineMath math="s_{xy} > 0" /></p>
                    <p className="text-muted-foreground">Relación <strong>directa</strong>: cuando X sube, Y tiende a subir.</p>
                  </CardContent>
                </Card>
                <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800">
                  <CardContent className="p-3 text-sm space-y-1">
                    <p className="font-bold text-rose-800 dark:text-rose-200"><InlineMath math="s_{xy} < 0" /></p>
                    <p className="text-muted-foreground">Relación <strong>inversa</strong>: cuando X sube, Y tiende a bajar.</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-3 text-sm space-y-1">
                    <p className="font-bold text-gray-800 dark:text-gray-200"><InlineMath math="s_{xy} \approx 0" /></p>
                    <p className="text-muted-foreground">Relación <strong>débil</strong> (lineal). Puede haber otro tipo de relación.</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <CardContent className="p-3 text-sm">
                  <p className="font-semibold text-amber-800 dark:text-amber-200">Independencia y covarianza</p>
                  <p className="text-muted-foreground mt-1">
                    Si X e Y son <strong>independientes</strong> → <InlineMath math="s_{xy} = 0" />. Pero <strong>cuidado</strong>: el recíproco NO es cierto.
                    Puede haber <InlineMath math="s_{xy} = 0" /> y que las variables estén relacionadas (de forma no lineal, por ejemplo un círculo).
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== TAB 3: CORRELACIÓN ===== */}
        <TabsContent value="correlacion" className="space-y-4">
          <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-4 text-sm space-y-2">
              <p className="font-semibold text-violet-800 dark:text-violet-200">El problema de la covarianza: no tiene escala</p>
              <p className="text-muted-foreground">
                Si la covarianza entre horas de estudio y nota es 5, ¿es mucho o poco? No podemos saberlo, porque depende de las unidades.
                Si cambiamos de horas a minutos, la covarianza se multiplica por 60.
              </p>
              <p className="text-muted-foreground">
                Necesitamos una medida que vaya <strong>siempre de -1 a 1</strong>, independientemente de las unidades.
                Eso es el <strong>coeficiente de correlación lineal</strong>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Coeficiente de correlación lineal (r)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
                <CardContent className="p-3 space-y-2">
                  <FormulaDisplay math="r = \frac{s_{xy}}{s_x \cdot s_y}" />
                  <p className="text-xs text-muted-foreground text-center">
                    &quot;La covarianza dividida por el producto de las desviaciones típicas&quot;
                  </p>
                </CardContent>
              </Card>

              <div className="overflow-x-auto">
                <table className="text-sm border-collapse w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700/30">
                      <th className="border p-2 text-left">Valor de r</th>
                      <th className="border p-2 text-left">Interpretación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border p-2"><InlineMath math="r = 1" /></td><td className="border p-2">Relación lineal perfecta y <strong>directa</strong></td></tr>
                    <tr><td className="border p-2"><InlineMath math="r \in (0, 1)" /></td><td className="border p-2">Relación lineal directa (positiva)</td></tr>
                    <tr><td className="border p-2"><InlineMath math="r = 0" /></td><td className="border p-2">No existe relación lineal</td></tr>
                    <tr><td className="border p-2"><InlineMath math="r \in (-1, 0)" /></td><td className="border p-2">Relación lineal inversa (negativa)</td></tr>
                    <tr><td className="border p-2"><InlineMath math="r = -1" /></td><td className="border p-2">Relación lineal perfecta e <strong>inversa</strong></td></tr>
                  </tbody>
                </table>
              </div>

              <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800">
                <CardContent className="p-3 text-sm">
                  <p className="font-semibold text-rose-800 dark:text-rose-200">Correlación NO implica causalidad</p>
                  <p className="text-muted-foreground mt-1">
                    Que dos variables estén correlacionadas no significa que una cause la otra. Ejemplo: la venta de helados y los ahogamientos
                    en piscina están correlacionados positivamente. ¿Los helados causan ahogamientos? No. Ambos aumentan en verano por el calor.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== TAB 4: REGRESIÓN ===== */}
        <TabsContent value="regresion" className="space-y-4">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-4 text-sm space-y-2">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Analogía: la línea del GPS</p>
              <p className="text-muted-foreground">
                Imagina que tienes puntos esparcidos en un mapa (diagrama de dispersión). La recta de regresión es como
                la &quot;ruta del GPS&quot;: no pasa por todos los puntos, pero es la mejor línea recta que puedes trazar entre ellos.
              </p>
              <p className="text-muted-foreground">
                Se obtiene por el <strong>método de mínimos cuadrados</strong>: la recta que minimiza la suma de los errores al cuadrado.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-800 dark:text-blue-200">Recta de Y sobre X</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <FormulaDisplay math="\hat{y}(x) = \alpha + \beta x" />
                <Separator />
                <div className="space-y-1 text-xs text-muted-foreground">
                  <FormulaDisplay math="\beta = \frac{s_{xy}}{s_x^2}" />
                  <FormulaDisplay math="\alpha = \bar{y} - \beta \cdot \bar{x}" />
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Uso:</strong> predecir Y conociendo X. <InlineMath math="\beta" /> = cuánto cambia Y por cada unidad que sube X.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-emerald-800 dark:text-emerald-200">Recta de X sobre Y</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <FormulaDisplay math="\hat{x}(y) = \alpha' + \beta' y" />
                <Separator />
                <div className="space-y-1 text-xs text-muted-foreground">
                  <FormulaDisplay math="\beta' = \frac{s_{xy}}{s_y^2}" />
                  <FormulaDisplay math="\alpha' = \bar{x} - \beta' \cdot \bar{y}" />
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Uso:</strong> predecir X conociendo Y. <InlineMath math="\beta'" /> = cuánto cambia X por cada unidad que sube Y.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-amber-800 dark:text-amber-200">Propiedades importantes</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Ambas rectas pasan por el <strong>centro de gravedad</strong> <InlineMath math="(\bar{x}, \bar{y})" /></li>
                <li>El signo de <InlineMath math="\beta" /> y <InlineMath math="\beta'" /> es el mismo que el de <InlineMath math="s_{xy}" /></li>
                <li>Si <InlineMath math="s_{xy} > 0" /> → rectas crecientes. Si <InlineMath math="s_{xy} < 0" /> → rectas decrecientes</li>
                <li>Si <InlineMath math="s_{xy} = 0" /> → rectas perpendiculares (paralelas a los ejes)</li>
                <li>Son rectas <strong>diferentes</strong> (excepto si <InlineMath math="|r| = 1" />, relación perfecta)</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== TAB 5: R² ===== */}
        <TabsContent value="determinacion" className="space-y-4">
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4 text-sm space-y-2">
              <p className="font-semibold text-amber-800 dark:text-amber-200">Analogía: la nota del GPS</p>
              <p className="text-muted-foreground">
                Ya tenemos la recta (la ruta del GPS). Ahora queremos saber: ¿qué tan buena es esa ruta?
                ¿Pasa cerca de todos los puntos o se desvía mucho? El <InlineMath math="R^2" /> es la &quot;puntuación&quot; de nuestra recta.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Coeficiente de determinación (<InlineMath math="R^2" />)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <CardContent className="p-3 space-y-2">
                  <FormulaDisplay math="R^2 = r^2 = \frac{s_{xy}^2}{s_x^2 \cdot s_y^2} = \beta \cdot \beta'" />
                  <p className="text-xs text-muted-foreground text-center">
                    Acotado entre 0 y 1
                  </p>
                </CardContent>
              </Card>

              <div className="overflow-x-auto">
                <table className="text-sm border-collapse w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700/30">
                      <th className="border p-2 text-left">Valor</th>
                      <th className="border p-2 text-left">Interpretación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border p-2"><InlineMath math="R^2 = 0" /></td><td className="border p-2">El modelo no explica nada de la variación</td></tr>
                    <tr><td className="border p-2"><InlineMath math="R^2 \in (0, 1)" /></td><td className="border p-2">% de variación explicada por el modelo</td></tr>
                    <tr><td className="border p-2"><InlineMath math="R^2 = 1" /></td><td className="border p-2">El modelo explica el 100% (ajuste perfecto)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                  <CardContent className="p-3 text-sm">
                    <p className="font-semibold text-emerald-800 dark:text-emerald-200"><InlineMath math="R^2" /> = % explicado</p>
                    <p className="text-muted-foreground mt-1">
                      Si <InlineMath math="R^2 = 0{,}85" />, el modelo lineal explica el <strong>85%</strong> de la variabilidad de Y en función de X.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800">
                  <CardContent className="p-3 text-sm">
                    <p className="font-semibold text-rose-800 dark:text-rose-200"><InlineMath math="1 - R^2" /> = % no explicado</p>
                    <p className="text-muted-foreground mt-1">
                      Si <InlineMath math="R^2 = 0{,}85" />, hay un <strong>15%</strong> de la variabilidad que no queda explicada por el modelo. Puede deberse a otras variables o a azar.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-3 text-sm">
                  <p className="font-semibold text-blue-800 dark:text-blue-200">Relación entre r y R²</p>
                  <FormulaDisplay math="r = \text{signo}(s_{xy}) \cdot \sqrt{R^2}" />
                  <p className="text-muted-foreground mt-1">
                    <InlineMath math="R^2" /> es simplemente <InlineMath math="r^2" />. Si conoces uno, conoces el otro.
                    La diferencia: <InlineMath math="r" /> tiene signo (dirección), <InlineMath math="R^2" /> no (solo intensidad).
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ===== RESUMEN VISUAL ===== */}
      <Card className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20 border-teal-200 dark:border-teal-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-500" />
            Resumen: el flujo completo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center">
            <Card className="bg-white dark:bg-gray-900 p-2">
              <p className="font-bold text-xs">1. Datos</p>
              <p className="text-xs text-muted-foreground">Pares (x, y)</p>
            </Card>
            <Card className="bg-white dark:bg-gray-900 p-2">
              <p className="font-bold text-xs">2. Covarianza</p>
              <p className="text-xs text-muted-foreground"><InlineMath math="s_{xy}" /> → dirección</p>
            </Card>
            <Card className="bg-white dark:bg-gray-900 p-2">
              <p className="font-bold text-xs">3. Correlación</p>
              <p className="text-xs text-muted-foreground"><InlineMath math="r" /> → intensidad</p>
            </Card>
            <Card className="bg-white dark:bg-gray-900 p-2">
              <p className="font-bold text-xs">4. Regresión</p>
              <p className="text-xs text-muted-foreground"><InlineMath math="\hat{y} = \alpha + \beta x" /></p>
            </Card>
            <Card className="bg-white dark:bg-gray-900 p-2">
              <p className="font-bold text-xs">5. Bondad</p>
              <p className="text-xs text-muted-foreground"><InlineMath math="R^2" /> → fiabilidad</p>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* ===== LISTA DE EJERCICIOS ===== */}
      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-teal-500" />
          Ejercicios del Tema 4
        </h2>
        <div className="grid gap-2">
          {ejercicios.map((ej) => (
            <Link key={ej.url} href={ej.url}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-3 py-2.5 px-3 sm:px-4">
                  <Badge className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 h-8 w-8 flex items-center justify-center shrink-0 p-0 text-sm">
                    {ej.num}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{ej.title}</p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {ej.sections.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs py-0 h-5">{s}</Badge>
                      ))}
                    </div>
                  </div>
                  <Badge className={`${difficultyColors[ej.difficulty]} shrink-0 text-xs`}>{ej.difficulty}</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
