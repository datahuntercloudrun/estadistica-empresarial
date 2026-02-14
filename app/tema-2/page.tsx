"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ArrowRight, BarChart3, Database, GitBranch, Grid3X3, PieChart, TrendingUp, Layers, ArrowDownUp, BookOpen } from "lucide-react";
import Link from "next/link";

const ejercicios = [
  { num: "1", title: "Clasificación de variables", url: "/tema-2/ejercicio-1", difficulty: "Bajo", sections: ["Variables"] },
  { num: "2", title: "Distribución de frecuencias de pesos", url: "/tema-2/ejercicio-2", difficulty: "Medio-Alto", sections: ["Frecuencias", "Agrupados", "Gráficos"] },
  { num: "3", title: "Distribuciones marginales y condicionadas", url: "/tema-2/ejercicio-3", difficulty: "Medio", sections: ["Bivariante"] },
  { num: "4", title: "Marginales y condicionada X|Y=3", url: "/tema-2/ejercicio-4", difficulty: "Bajo-Medio", sections: ["Bivariante"] },
  { num: "5", title: "Clasificación de gráficos", url: "/tema-2/ejercicio-5", difficulty: "Bajo", sections: ["Gráficos"] },
  { num: "C1", title: "Distribución de salarios", url: "/tema-2/complementario-1", difficulty: "Medio", sections: ["Frecuencias", "Agrupados", "Gráficos"] },
  { num: "C2", title: "Puestos de trabajo en empresas", url: "/tema-2/complementario-2", difficulty: "Bajo-Medio", sections: ["Frecuencias", "Gráficos"] },
];

const difficultyColors: Record<string, string> = {
  "Bajo": "bg-green-100 text-green-800",
  "Bajo-Medio": "bg-lime-100 text-lime-800",
  "Medio": "bg-yellow-100 text-yellow-800",
  "Medio-Alto": "bg-orange-100 text-orange-800",
};

export default function Tema2Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-100 text-emerald-800">Tema 2</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">El Mundo de los Datos</h1>
        <p className="text-muted-foreground">
          Variables estadísticas, distribuciones de frecuencias, análisis bivariante y representaciones gráficas
        </p>
      </div>

      {/* Tabs de contenido teórico */}
      <Tabs defaultValue="variables" className="space-y-4" style={{ display: 'block' }}>
        <div className="z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-4 sm:pt-6 pb-2 bg-background border-b shadow-sm" style={{ position: 'sticky', top: '-1rem' }}>
          <div className="overflow-x-auto scrollbar-hide">
            <TabsList className="inline-flex w-max h-auto gap-1">
              <TabsTrigger value="variables" className="text-xs px-3 shrink-0">Variables</TabsTrigger>
              <TabsTrigger value="frecuencias" className="text-xs px-3 shrink-0">Frecuencias</TabsTrigger>
              <TabsTrigger value="agrupados" className="text-xs px-3 shrink-0">Agrupados</TabsTrigger>
              <TabsTrigger value="bivariante" className="text-xs px-3 shrink-0">Bivariante</TabsTrigger>
              <TabsTrigger value="graficos" className="text-xs px-3 shrink-0">Gráficos</TabsTrigger>
              <TabsTrigger value="otros" className="text-xs px-3 shrink-0">Otros</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ===================== TAB 1: TIPOS DE VARIABLES ===================== */}
        <TabsContent value="variables" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-emerald-600" />
                Tipos de Variables
              </CardTitle>
              <CardDescription>
                Los <strong>datos</strong> son los resultados medidos y registrados de cierta característica en cada elemento de una muestra o población.
                A cada una de estas características la llamamos <strong>variable</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Clasificación 1: Escala de medida */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">1</span>
                  Según la escala de medida
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Cualitativas */}
                  <Card className="border-l-4 border-l-purple-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-purple-700">Cualitativas</CardTitle>
                      <CardDescription className="text-xs">No son directamente asimilables a números. Los resultados se denominan <strong>modalidades</strong> o categorías.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3 space-y-2">
                        <div>
                          <p className="text-xs font-semibold text-purple-800">Nominales</p>
                          <p className="text-xs text-muted-foreground">Las categorías NO admiten un orden canónico.</p>
                          <p className="text-xs mt-1">Ej: estado civil, sexo, color de ojos, marca de coche</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-xs font-semibold text-purple-800">Ordinales</p>
                          <p className="text-xs text-muted-foreground">Las categorías SÍ admiten un orden canónico.</p>
                          <p className="text-xs mt-1">Ej: meses del año, satisfacción (1-5), calificaciones (Suspenso-MH)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cuantitativas */}
                  <Card className="border-l-4 border-l-blue-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-blue-700">Cuantitativas</CardTitle>
                      <CardDescription className="text-xs">Toman <strong>valores numéricos</strong>. Los resultados se denominan <strong>valores</strong>.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                        <div>
                          <p className="text-xs font-semibold text-blue-800">Discretas</p>
                          <p className="text-xs text-muted-foreground">Valores asimilables a los números enteros (conjunto numerable).</p>
                          <p className="text-xs mt-1">Ej: n.° de hijos, saldo en el banco (euros y céntimos), goles marcados</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-xs font-semibold text-blue-800">Continuas</p>
                          <p className="text-xs text-muted-foreground">Valores asimilables a los números reales (conjunto no numerable).</p>
                          <p className="text-xs mt-1">Ej: estatura, peso, temperatura, tiempo de espera</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Clasificación 2: Número de características */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">2</span>
                  Según el número de características observadas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-4 space-y-1">
                      <p className="font-semibold text-sm text-amber-800">Unidimensionales</p>
                      <p className="text-xs text-muted-foreground">Se estudia <strong>una sola</strong> característica de la población.</p>
                      <p className="text-xs">Ej: solo la edad de los alumnos de una clase.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-4 space-y-1">
                      <p className="font-semibold text-sm text-orange-800">Multidimensionales</p>
                      <p className="text-xs text-muted-foreground">Se estudian <strong>varias</strong> características a la vez.</p>
                      <p className="text-xs">Ej: edad, altura y sexo de los alumnos observados simultáneamente.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Clasificación 3: Periodo de tiempo */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">3</span>
                  Según el periodo de tiempo de recogida
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="bg-sky-50 border-sky-200">
                    <CardContent className="p-4 space-y-1">
                      <p className="font-semibold text-sm text-sky-800">Transversales</p>
                      <p className="text-xs text-muted-foreground">Se toman datos en un <strong>único momento</strong> del tiempo.</p>
                      <p className="text-xs">Ej: encuesta de opinión, saldo a cierre de 2026.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-indigo-50 border-indigo-200">
                    <CardContent className="p-4 space-y-2">
                      <p className="font-semibold text-sm text-indigo-800">Longitudinales</p>
                      <p className="text-xs text-muted-foreground">Las observaciones se realizan en <strong>distintos momentos</strong> del tiempo.</p>
                      <div className="text-xs space-y-1 pl-3 border-l-2 border-indigo-200">
                        <p><strong>Series temporales:</strong> una observación en cada momento (IPC de los últimos 12 meses).</p>
                        <p><strong>Datos de panel:</strong> se observa una muestra fija en distintos momentos (índices de audiencia).</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Vector y Matriz de datos */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">4</span>
                  Vector y Matriz de datos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="border-l-4 border-l-teal-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Vector de datos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">Lista de observaciones de <strong>una variable</strong> en n elementos:</p>
                      <FormulaDisplay math={`\\mathbf{x} = (x_1, x_2, \\cdots, x_n)`} />
                      <div className="bg-teal-50 rounded p-2">
                        <p className="text-xs font-semibold mb-1">Ejemplo: Días de vacaciones</p>
                        <Table className="text-xs">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="h-7 text-center">Individuo</TableHead>
                              <TableHead className="h-7 text-center">1</TableHead>
                              <TableHead className="h-7 text-center">2</TableHead>
                              <TableHead className="h-7 text-center">3</TableHead>
                              <TableHead className="h-7 text-center">4</TableHead>
                              <TableHead className="h-7 text-center">5</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-center font-medium">Días</TableCell>
                              <TableCell className="text-center">8</TableCell>
                              <TableCell className="text-center">9</TableCell>
                              <TableCell className="text-center">7</TableCell>
                              <TableCell className="text-center">9</TableCell>
                              <TableCell className="text-center">8</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <p className="text-[10px] text-muted-foreground mt-1">x = (8, 9, 7, 9, 8)</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-cyan-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Matriz de datos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">Registros de <strong>varias variables</strong> observadas en varios elementos. Filas = individuos, Columnas = variables.</p>
                      <div className="bg-cyan-50 rounded p-2">
                        <p className="text-xs font-semibold mb-1">Ejemplo: Alumnos de una clase</p>
                        <Table className="text-xs">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="h-7 text-center">Alumno</TableHead>
                              <TableHead className="h-7 text-center">Edad</TableHead>
                              <TableHead className="h-7 text-center">Altura</TableHead>
                              <TableHead className="h-7 text-center">Color fav.</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-center">1</TableCell>
                              <TableCell className="text-center">18</TableCell>
                              <TableCell className="text-center">1,88</TableCell>
                              <TableCell className="text-center">Verde</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-center">2</TableCell>
                              <TableCell className="text-center">19</TableCell>
                              <TableCell className="text-center">1,76</TableCell>
                              <TableCell className="text-center">Azul</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-center">3</TableCell>
                              <TableCell className="text-center">22</TableCell>
                              <TableCell className="text-center">1,81</TableCell>
                              <TableCell className="text-center">Rojo</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================== TAB 2: FRECUENCIAS ===================== */}
        <TabsContent value="frecuencias" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-600" />
                Distribuciones de Frecuencias (Datos No Agrupados)
              </CardTitle>
              <CardDescription>
                Sea X una variable y <InlineMath math="\\mathbf{x} = (x_1, x_2, \\cdots, x_n)" /> un vector de datos de tamaño n.
                Se definen cuatro tipos de frecuencias.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Definiciones de frecuencias */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-200 text-blue-800"><InlineMath math="n_i" /></Badge>
                      <p className="font-semibold text-sm">Frecuencia Absoluta</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Número de veces que se repite cada valor de la variable en el vector de datos.
                    </p>
                    <div className="bg-white rounded p-2 text-center">
                      <FormulaDisplay math={`n_i = \\text{n.° de veces que aparece } x_i`} />
                    </div>
                    <p className="text-[10px] text-muted-foreground">La suma de todas las frecuencias absolutas es n: <InlineMath math="\\sum n_i = n" /></p>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-200 text-emerald-800"><InlineMath math="f_i" /></Badge>
                      <p className="font-semibold text-sm">Frecuencia Relativa</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Frecuencia absoluta dividida por el total de datos. Indica la proporción.
                    </p>
                    <div className="bg-white rounded p-2 text-center">
                      <FormulaDisplay math={`f_i = \\frac{n_i}{n}`} />
                    </div>
                    <p className="text-[10px] text-muted-foreground">La suma de todas las frecuencias relativas es 1: <InlineMath math="\\sum f_i = 1" /></p>
                  </CardContent>
                </Card>

                <Card className="bg-violet-50 border-violet-200">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-violet-200 text-violet-800"><InlineMath math="N_i" /></Badge>
                      <p className="font-semibold text-sm">Frecuencia Absoluta Acumulada</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Número de datos iguales o inferiores al considerado. Requiere variable cuantitativa u ordinal.
                    </p>
                    <div className="bg-white rounded p-2 text-center">
                      <FormulaDisplay math={`N_i = \\sum_{j=1}^{i} n_j = n_1 + n_2 + \\cdots + n_i`} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-rose-50 border-rose-200">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-rose-200 text-rose-800"><InlineMath math="F_i" /></Badge>
                      <p className="font-semibold text-sm">Frecuencia Relativa Acumulada</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Frecuencia absoluta acumulada dividida por el total de datos. Proporción acumulada.
                    </p>
                    <div className="bg-white rounded p-2 text-center">
                      <FormulaDisplay math={`F_i = \\frac{N_i}{n} = \\sum_{j=1}^{i} f_j`} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Ejemplo completo */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Ejemplo: Tabla de frecuencias (datos no agrupados)</h3>
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs">
                      En un despacho de abogados se observa, para 10 socios, los asuntos resueltos favorablemente en el último mes:
                      <span className="font-mono ml-1">(0, 2, 2, 0, 1, 2, 3, 1, 3, 1)</span>
                    </p>
                    <div className="overflow-x-auto">
                      <Table className="text-xs">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center h-8 bg-emerald-100 text-emerald-800"><InlineMath math="x_i" /></TableHead>
                            <TableHead className="text-center h-8 bg-blue-100 text-blue-800"><InlineMath math="n_i" /></TableHead>
                            <TableHead className="text-center h-8 bg-emerald-100 text-emerald-800"><InlineMath math="f_i" /></TableHead>
                            <TableHead className="text-center h-8 bg-violet-100 text-violet-800"><InlineMath math="N_i" /></TableHead>
                            <TableHead className="text-center h-8 bg-rose-100 text-rose-800"><InlineMath math="F_i" /></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-center font-medium">0</TableCell>
                            <TableCell className="text-center">2</TableCell>
                            <TableCell className="text-center">0.2</TableCell>
                            <TableCell className="text-center">2</TableCell>
                            <TableCell className="text-center">0.2</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-center font-medium">1</TableCell>
                            <TableCell className="text-center">3</TableCell>
                            <TableCell className="text-center">0.3</TableCell>
                            <TableCell className="text-center">5</TableCell>
                            <TableCell className="text-center">0.5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-center font-medium">2</TableCell>
                            <TableCell className="text-center">3</TableCell>
                            <TableCell className="text-center">0.3</TableCell>
                            <TableCell className="text-center">8</TableCell>
                            <TableCell className="text-center">0.8</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-center font-medium">3</TableCell>
                            <TableCell className="text-center">2</TableCell>
                            <TableCell className="text-center">0.2</TableCell>
                            <TableCell className="text-center">10</TableCell>
                            <TableCell className="text-center">1</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-100 font-semibold">
                            <TableCell className="text-center">Suma</TableCell>
                            <TableCell className="text-center">10</TableCell>
                            <TableCell className="text-center">1</TableCell>
                            <TableCell className="text-center"></TableCell>
                            <TableCell className="text-center"></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded p-2">
                      <p className="text-[10px] text-amber-800">
                        <strong>Clave:</strong> La <InlineMath math="F_i" /> de la última fila siempre es 1 (todos los datos acumulados).
                        La <InlineMath math="N_i" /> de la última fila siempre es n (total de datos).
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================== TAB 3: DATOS AGRUPADOS ===================== */}
        <TabsContent value="agrupados" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-600" />
                Datos Agrupados en Intervalos
              </CardTitle>
              <CardDescription>
                Cuando una variable <strong>cuantitativa continua</strong> toma muchos valores diferentes, conviene agrupar los datos en clases o intervalos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Conceptos clave */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-3 space-y-1">
                    <p className="font-semibold text-xs text-blue-800">Clases (Intervalos)</p>
                    <p className="text-[10px] text-muted-foreground">Semiabiertas por la izquierda, salvo el primero que es cerrado.</p>
                    <FormulaDisplay math={`[L_{i-1}, L_i) \\text{ o } (L_{i-1}, L_i]`} className="text-xs" />
                  </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-3 space-y-1">
                    <p className="font-semibold text-xs text-emerald-800">Marca de clase</p>
                    <p className="text-[10px] text-muted-foreground">Punto medio del intervalo. Representa a todos los datos de la clase.</p>
                    <FormulaDisplay math={`x_i = \\frac{L_{i-1} + L_i}{2}`} className="text-xs" />
                  </CardContent>
                </Card>
                <Card className="bg-violet-50 border-violet-200">
                  <CardContent className="p-3 space-y-1">
                    <p className="font-semibold text-xs text-violet-800">Amplitud de clase</p>
                    <p className="text-[10px] text-muted-foreground">Tamaño del intervalo. Puede ser constante o variable.</p>
                    <FormulaDisplay math={`a_i = L_i - L_{i-1}`} className="text-xs" />
                  </CardContent>
                </Card>
                <Card className="bg-rose-50 border-rose-200">
                  <CardContent className="p-3 space-y-1">
                    <p className="font-semibold text-xs text-rose-800">Densidad de frecuencia</p>
                    <p className="text-[10px] text-muted-foreground">Frecuencia relativa entre amplitud. Necesaria para histogramas con amplitud variable.</p>
                    <FormulaDisplay math={`d_i = \\frac{f_i}{a_i}`} className="text-xs" />
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Ejemplo completo */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Ejemplo: Gasto de clientes en un restaurante</h3>
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs">
                      30 clientes, gasto en euros. Amplitud de clase = 2. Se construye la tabla de frecuencias agrupada:
                    </p>
                    <div className="overflow-x-auto">
                      <Table className="text-xs">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center h-8">Intervalo</TableHead>
                            <TableHead className="text-center h-8">Marca clase (<InlineMath math="x_i" />)</TableHead>
                            <TableHead className="text-center h-8 bg-blue-50"><InlineMath math="n_i" /></TableHead>
                            <TableHead className="text-center h-8 bg-emerald-50"><InlineMath math="f_i" /></TableHead>
                            <TableHead className="text-center h-8 bg-violet-50"><InlineMath math="N_i" /></TableHead>
                            <TableHead className="text-center h-8 bg-rose-50"><InlineMath math="F_i" /></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { int: "[9, 11)", mc: 10, ni: 4, fi: "0.13", Ni: 4, Fi: "0.13" },
                            { int: "[11, 13)", mc: 12, ni: 11, fi: "0.37", Ni: 15, Fi: "0.50" },
                            { int: "[13, 15)", mc: 14, ni: 8, fi: "0.27", Ni: 23, Fi: "0.77" },
                            { int: "[15, 17)", mc: 16, ni: 6, fi: "0.20", Ni: 29, Fi: "0.97" },
                            { int: "[17, 19]", mc: 18, ni: 1, fi: "0.03", Ni: 30, Fi: "1.00" },
                          ].map((r, i) => (
                            <TableRow key={i}>
                              <TableCell className="text-center font-mono">{r.int}</TableCell>
                              <TableCell className="text-center">{r.mc}</TableCell>
                              <TableCell className="text-center bg-blue-50/50">{r.ni}</TableCell>
                              <TableCell className="text-center bg-emerald-50/50">{r.fi}</TableCell>
                              <TableCell className="text-center bg-violet-50/50">{r.Ni}</TableCell>
                              <TableCell className="text-center bg-rose-50/50">{r.Fi}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-gray-100 font-semibold">
                            <TableCell className="text-center">Suma</TableCell>
                            <TableCell className="text-center"></TableCell>
                            <TableCell className="text-center">30</TableCell>
                            <TableCell className="text-center">1</TableCell>
                            <TableCell className="text-center"></TableCell>
                            <TableCell className="text-center"></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded p-2">
                      <p className="text-[10px] text-amber-800">
                        <strong>Nota:</strong> La <InlineMath math="F_i" /> = 0.50 en la fila [11, 13) nos dice que el 50% de los clientes gastó menos de 13€.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================== TAB 4: BIVARIANTE ===================== */}
        <TabsContent value="bivariante" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid3X3 className="h-5 w-5 text-emerald-600" />
                Distribuciones Bivariantes
              </CardTitle>
              <CardDescription>
                Cuando se estudian <strong>dos variables</strong> (X, Y) simultáneamente sobre la misma población, obtenemos datos de la forma
                {" "}<InlineMath math="((x_1, y_1), (x_2, y_2), \\cdots, (x_n, y_n))" />.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Distribución Conjunta */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">1</span>
                  Distribución Conjunta
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      La <strong>frecuencia absoluta conjunta</strong> <InlineMath math="n_{ij}" /> es el número de veces que aparece el par <InlineMath math="(x_i, y_j)" /> en los datos.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      La <strong>frecuencia relativa conjunta</strong> es:
                    </p>
                    <FormulaDisplay math={`f_{ij} = \\frac{n_{ij}}{n}`} />
                    <p className="text-xs text-muted-foreground">
                      Se representan en una <strong>tabla de correlación</strong> (cuantitativas) o de <strong>contingencia</strong> (cualitativas).
                    </p>
                  </div>
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-3">
                      <p className="text-xs font-semibold mb-2">Estructura de la tabla conjunta:</p>
                      <div className="overflow-x-auto">
                      <Table className="text-[10px]">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center h-7 bg-blue-100">X \ Y</TableHead>
                            <TableHead className="text-center h-7 bg-blue-100"><InlineMath math="y_1" /></TableHead>
                            <TableHead className="text-center h-7 bg-blue-100"><InlineMath math="y_2" /></TableHead>
                            <TableHead className="text-center h-7 bg-blue-100">...</TableHead>
                            <TableHead className="text-center h-7 bg-emerald-100"><InlineMath math="n_{i\cdot}" /></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-center font-medium bg-blue-50"><InlineMath math="x_1" /></TableCell>
                            <TableCell className="text-center"><InlineMath math="n_{11}" /></TableCell>
                            <TableCell className="text-center"><InlineMath math="n_{12}" /></TableCell>
                            <TableCell className="text-center">...</TableCell>
                            <TableCell className="text-center bg-emerald-50 font-medium"><InlineMath math="n_{1\cdot}" /></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-center font-medium bg-blue-50"><InlineMath math="x_2" /></TableCell>
                            <TableCell className="text-center"><InlineMath math="n_{21}" /></TableCell>
                            <TableCell className="text-center"><InlineMath math="n_{22}" /></TableCell>
                            <TableCell className="text-center">...</TableCell>
                            <TableCell className="text-center bg-emerald-50 font-medium"><InlineMath math="n_{2\cdot}" /></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-center font-medium bg-rose-100"><InlineMath math="n_{\cdot j}" /></TableCell>
                            <TableCell className="text-center bg-rose-50 font-medium"><InlineMath math="n_{\cdot 1}" /></TableCell>
                            <TableCell className="text-center bg-rose-50 font-medium"><InlineMath math="n_{\cdot 2}" /></TableCell>
                            <TableCell className="text-center bg-rose-50 font-medium">...</TableCell>
                            <TableCell className="text-center bg-gray-100 font-bold">N</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      </div>
                      <div className="flex gap-3 mt-2 text-[10px]">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-200 rounded-full"></span> Marginal X</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-rose-200 rounded-full"></span> Marginal Y</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Distribución Marginal */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">2</span>
                  Distribuciones Marginales
                </h3>
                <p className="text-xs text-muted-foreground">
                  Permiten estudiar cada variable <strong>por separado</strong>, ignorando la otra. Se obtienen sumando filas (para X) o columnas (para Y) de la tabla conjunta.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="bg-emerald-50 border-emerald-200">
                    <CardContent className="p-4 space-y-2">
                      <p className="font-semibold text-xs text-emerald-800">Marginal de X</p>
                      <p className="text-xs text-muted-foreground">Sumamos por filas (todas las columnas de Y):</p>
                      <div className="overflow-x-auto"><FormulaDisplay math={`n_{i\\cdot} = \\sum_{j=1}^{k} n_{ij} \\quad \\rightarrow \\quad f_{i\\cdot} = \\frac{n_{i\\cdot}}{n}`} /></div>
                    </CardContent>
                  </Card>
                  <Card className="bg-rose-50 border-rose-200">
                    <CardContent className="p-4 space-y-2">
                      <p className="font-semibold text-xs text-rose-800">Marginal de Y</p>
                      <p className="text-xs text-muted-foreground">Sumamos por columnas (todas las filas de X):</p>
                      <div className="overflow-x-auto"><FormulaDisplay math={`n_{\\cdot j} = \\sum_{i=1}^{h} n_{ij} \\quad \\rightarrow \\quad f_{\\cdot j} = \\frac{n_{\\cdot j}}{n}`} /></div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Distribución Condicionada */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-xs font-bold">3</span>
                  Distribuciones Condicionadas
                </h3>
                <p className="text-xs text-muted-foreground">
                  Estudian el comportamiento de una variable <strong>fijando un valor</strong> de la otra. Es como &quot;filtrar&quot; la tabla por una fila o columna concreta.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="bg-violet-50 border-violet-200">
                    <CardContent className="p-4 space-y-2">
                      <p className="font-semibold text-xs text-violet-800">Y condicionada a X = <InlineMath math="x_i" /></p>
                      <p className="text-xs text-muted-foreground">Fijamos una fila (un valor de X) y miramos cómo se distribuye Y:</p>
                      <FormulaDisplay math={`f_{j|i} = \\frac{n_{ij}}{n_{i\\cdot}}`} />
                      <p className="text-[10px] text-muted-foreground">El total ahora es <InlineMath math="n_{i\cdot}" /> (la marginal de esa fila), no n.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-fuchsia-50 border-fuchsia-200">
                    <CardContent className="p-4 space-y-2">
                      <p className="font-semibold text-xs text-fuchsia-800">X condicionada a Y = <InlineMath math="y_j" /></p>
                      <p className="text-xs text-muted-foreground">Fijamos una columna (un valor de Y) y miramos cómo se distribuye X:</p>
                      <FormulaDisplay math={`f_{i|j} = \\frac{n_{ij}}{n_{\\cdot j}}`} />
                      <p className="text-[10px] text-muted-foreground">El total ahora es <InlineMath math="n_{\cdot j}" /> (la marginal de esa columna), no n.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Ejemplo completo bivariante */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Ejemplo completo</h3>
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs">Dada la distribución conjunta:</p>
                    <div className="overflow-x-auto">
                      <Table className="text-xs">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center h-7 bg-blue-100">X \ Y</TableHead>
                            <TableHead className="text-center h-7">-1</TableHead>
                            <TableHead className="text-center h-7">0</TableHead>
                            <TableHead className="text-center h-7">1</TableHead>
                            <TableHead className="text-center h-7 bg-emerald-100"><InlineMath math="n_{i\cdot}" /></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-center font-medium bg-blue-50">1</TableCell>
                            <TableCell className="text-center">4</TableCell>
                            <TableCell className="text-center">2</TableCell>
                            <TableCell className="text-center">6</TableCell>
                            <TableCell className="text-center bg-emerald-50 font-semibold">12</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-center font-medium bg-blue-50">2</TableCell>
                            <TableCell className="text-center">6</TableCell>
                            <TableCell className="text-center">3</TableCell>
                            <TableCell className="text-center">9</TableCell>
                            <TableCell className="text-center bg-emerald-50 font-semibold">18</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-center font-medium bg-blue-50">3</TableCell>
                            <TableCell className="text-center">2</TableCell>
                            <TableCell className="text-center">1</TableCell>
                            <TableCell className="text-center">3</TableCell>
                            <TableCell className="text-center bg-emerald-50 font-semibold">6</TableCell>
                          </TableRow>
                          <TableRow className="font-semibold">
                            <TableCell className="text-center bg-rose-100"><InlineMath math="n_{\cdot j}" /></TableCell>
                            <TableCell className="text-center bg-rose-50">12</TableCell>
                            <TableCell className="text-center bg-rose-50">6</TableCell>
                            <TableCell className="text-center bg-rose-50">18</TableCell>
                            <TableCell className="text-center bg-gray-200">36</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      <div className="bg-emerald-50 rounded p-2 text-xs">
                        <p className="font-semibold text-emerald-800 mb-1">Marginal X:</p>
                        <p>x=1: 12, x=2: 18, x=3: 6</p>
                      </div>
                      <div className="bg-rose-50 rounded p-2 text-xs">
                        <p className="font-semibold text-rose-800 mb-1">Marginal Y:</p>
                        <p>y=-1: 12, y=0: 6, y=1: 18</p>
                      </div>
                      <div className="bg-violet-50 rounded p-2 text-xs">
                        <p className="font-semibold text-violet-800 mb-1">Y | X=2:</p>
                        <p>y=-1: 6/18, y=0: 3/18, y=1: 9/18</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================== TAB 5: GRÁFICOS ===================== */}
        <TabsContent value="graficos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-emerald-600" />
                Representaciones Gráficas
              </CardTitle>
              <CardDescription>
                Elegir el gráfico adecuado depende del tipo de variable y del objetivo del análisis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Variables categóricas */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-800">Cualitativas / Discretas</Badge>
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      name: "Diagrama de sectores",
                      desc: "Representación circular de las frecuencias relativas. El área de cada sector es proporcional a la frecuencia.",
                      when: "Pocas categorías (< 6). Mostrar proporciones del total.",
                      color: "bg-blue-50 border-blue-200",
                      textColor: "text-blue-800",
                    },
                    {
                      name: "Diagrama de barras",
                      desc: "Representación en un eje de las frecuencias. Puede ser vertical u horizontal, sencillo, múltiple o apilado.",
                      when: "Comparar frecuencias entre categorías. Cualquier número de categorías.",
                      color: "bg-emerald-50 border-emerald-200",
                      textColor: "text-emerald-800",
                    },
                    {
                      name: "Pictograma",
                      desc: "Diagrama de barras donde se usan imágenes representativas en lugar de barras.",
                      when: "Presentaciones divulgativas, hacer los datos más visuales.",
                      color: "bg-amber-50 border-amber-200",
                      textColor: "text-amber-800",
                    },
                    {
                      name: "Cartograma",
                      desc: "Mapa geográfico coloreado según los valores de la variable en cada región.",
                      when: "Datos geográficos (densidad de población, renta por comunidad).",
                      color: "bg-rose-50 border-rose-200",
                      textColor: "text-rose-800",
                    },
                  ].map((g) => (
                    <Card key={g.name} className={`${g.color}`}>
                      <CardContent className="p-3 space-y-2">
                        <p className={`font-semibold text-xs ${g.textColor}`}>{g.name}</p>
                        <p className="text-[10px] text-muted-foreground">{g.desc}</p>
                        <div className="bg-white/50 rounded p-1.5">
                          <p className="text-[10px]"><strong>Usar cuando:</strong> {g.when}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Variables cuantitativas continuas */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Cuantitativas continuas</Badge>
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    {
                      name: "Histograma",
                      desc: "Rectángulos adyacentes (sin separación). El área es proporcional a la frecuencia. Si la amplitud es constante, la altura = frecuencia. Si no, la altura = densidad.",
                      key: "No hay separación entre barras (a diferencia del diagrama de barras).",
                      color: "bg-indigo-50 border-indigo-200",
                      textColor: "text-indigo-800",
                    },
                    {
                      name: "Polígono de frecuencias",
                      desc: "Se unen los puntos medios (marcas de clase) de las bases superiores de las barras del histograma.",
                      key: "Útil para superponer varias distribuciones y comparar.",
                      color: "bg-teal-50 border-teal-200",
                      textColor: "text-teal-800",
                    },
                    {
                      name: "Diagrama de caja (Boxplot)",
                      desc: "Representa 5 valores clave: mínimo, Q1, mediana, Q3 y máximo. Permite detectar datos atípicos y analizar la dispersión.",
                      key: "Ideal para comparar distribuciones y ver simetría/asimetría.",
                      color: "bg-cyan-50 border-cyan-200",
                      textColor: "text-cyan-800",
                    },
                  ].map((g) => (
                    <Card key={g.name} className={`${g.color}`}>
                      <CardContent className="p-3 space-y-2">
                        <p className={`font-semibold text-xs ${g.textColor}`}>{g.name}</p>
                        <p className="text-[10px] text-muted-foreground">{g.desc}</p>
                        <div className="bg-white/50 rounded p-1.5">
                          <p className="text-[10px]"><strong>Clave:</strong> {g.key}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Bivariante */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Badge className="bg-violet-100 text-violet-800">Análisis bivariante</Badge>
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Card className="bg-violet-50 border-violet-200">
                    <CardContent className="p-3 space-y-2">
                      <p className="font-semibold text-xs text-violet-800">Nube de puntos (Dispersión)</p>
                      <p className="text-[10px] text-muted-foreground">Cada observación (<InlineMath math="x_i" />, <InlineMath math="y_i" />) es un punto en el plano. Permite visualizar si existe relación entre las variables y de qué tipo (lineal, cuadrática, etc.).</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-fuchsia-50 border-fuchsia-200">
                    <CardContent className="p-3 space-y-2">
                      <p className="font-semibold text-xs text-fuchsia-800">Barras apiladas / múltiples</p>
                      <p className="text-[10px] text-muted-foreground">Para datos bivariantes categóricos. Cada barra se divide por los valores de la segunda variable, permitiendo comparar composiciones.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Resumen visual de elección */}
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <p className="font-semibold text-xs text-amber-800 mb-2">Guía rápida para elegir gráfico</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-white rounded p-2">
                      <p className="font-semibold">Categórica + pocas categorías</p>
                      <p className="text-muted-foreground">Sectores o barras</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <p className="font-semibold">Categórica + muchas categorías</p>
                      <p className="text-muted-foreground">Barras (horizontal mejor)</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <p className="font-semibold">Cuantitativa continua</p>
                      <p className="text-muted-foreground">Histograma, polígono o boxplot</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <p className="font-semibold">Dos variables cuantitativas</p>
                      <p className="text-muted-foreground">Nube de puntos (dispersión)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================== TAB 6: OTROS CONCEPTOS ===================== */}
        <TabsContent value="otros" className="space-y-6">
          {/* Transformación lineal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownUp className="h-5 w-5 text-emerald-600" />
                Transformación Lineal
              </CardTitle>
              <CardDescription>
                Se pueden transformar los datos aplicando cambios de origen, de escala o ambos. Esto es fundamental para entender cómo cambian las medidas estadísticas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 space-y-2">
                    <p className="font-semibold text-sm text-blue-800">Cambio de Origen</p>
                    <FormulaDisplay math={`Y = X + b`} />
                    <p className="text-xs text-muted-foreground">
                      Sumamos o restamos una <strong>cantidad fija</strong> a todos los valores.
                    </p>
                    <div className="bg-white rounded p-2">
                      <p className="text-[10px]"><strong>Ejemplo:</strong> Si todos los empleados ganan 100€ más al mes.</p>
                    </div>
                    <div className="bg-blue-100 rounded p-2 text-[10px]">
                      <p><strong>Efecto:</strong> La media cambia, la varianza NO cambia.</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-4 space-y-2">
                    <p className="font-semibold text-sm text-emerald-800">Cambio de Escala</p>
                    <FormulaDisplay math={`Y = a \\cdot X`} />
                    <p className="text-xs text-muted-foreground">
                      Multiplicamos todos los valores por un <strong>factor constante</strong>.
                    </p>
                    <div className="bg-white rounded p-2">
                      <p className="text-[10px]"><strong>Ejemplo:</strong> Si a todos se les sube un 5% el salario.</p>
                    </div>
                    <div className="bg-emerald-100 rounded p-2 text-[10px]">
                      <p><strong>Efecto:</strong> La media se multiplica por a, la varianza por a².</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-violet-50 border-violet-200">
                  <CardContent className="p-4 space-y-2">
                    <p className="font-semibold text-sm text-violet-800">Transformación Lineal</p>
                    <FormulaDisplay math={`Y = a \\cdot X + b`} />
                    <p className="text-xs text-muted-foreground">
                      Combinación de cambio de escala y origen.
                    </p>
                    <div className="bg-white rounded p-2">
                      <p className="text-[10px]"><strong>Ejemplo:</strong> Subida del 5% + 100€ fijos.</p>
                    </div>
                    <div className="bg-violet-100 rounded p-2 text-[10px]">
                      <p><strong>Media:</strong> <InlineMath math="\\bar{y} = a \\cdot \\bar{x} + b" /></p>
                      <p><strong>Varianza:</strong> <InlineMath math="s_y^2 = a^2 \\cdot s_x^2" /></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Operadores matemáticos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Operadores Matemáticos
              </CardTitle>
              <CardDescription>
                Notación esencial para las fórmulas estadísticas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 space-y-3">
                    <p className="font-semibold text-sm text-blue-800">Sumatorio <InlineMath math="\\sum" /></p>
                    <p className="text-xs text-muted-foreground">
                      Indica que debemos sumar los valores desde el índice inferior hasta el superior.
                    </p>
                    <div className="overflow-x-auto"><FormulaDisplay math={`\\sum_{i=1}^{n} x_i = x_1 + x_2 + x_3 + \\cdots + x_n`} /></div>
                    <div className="bg-white rounded p-2">
                      <p className="text-[10px]"><strong>Ejemplo:</strong> <InlineMath math="\\sum_{i=1}^{3} x_i = x_1 + x_2 + x_3" /></p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-4 space-y-3">
                    <p className="font-semibold text-sm text-emerald-800">Productorio <InlineMath math="\\prod" /></p>
                    <p className="text-xs text-muted-foreground">
                      Indica que debemos multiplicar los valores desde el índice inferior hasta el superior.
                    </p>
                    <div className="overflow-x-auto"><FormulaDisplay math={`\\prod_{i=1}^{n} x_i = x_1 \\cdot x_2 \\cdot x_3 \\cdots x_n`} /></div>
                    <div className="bg-white rounded p-2">
                      <p className="text-[10px]"><strong>Ejemplo:</strong> <InlineMath math="\\prod_{i=1}^{3} x_i = x_1 \\cdot x_2 \\cdot x_3" /></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Lista de ejercicios */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Ejercicios</h2>
        <p className="text-sm text-muted-foreground">Practica los conceptos del tema con estos ejercicios resueltos paso a paso.</p>
        {ejercicios.map((ej) => (
          <Link key={ej.url} href={ej.url}>
            <Card className="hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer">
              <CardContent className="flex items-center justify-between py-4 px-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-sm font-bold">
                    {ej.num}
                  </span>
                  <div>
                    <span className="font-medium text-sm">{ej.title}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <BookOpen className="h-3 w-3 text-muted-foreground shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {ej.sections.map((s) => (
                          <Badge key={s} variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal text-emerald-700 border-emerald-200">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge className={difficultyColors[ej.difficulty]}>{ej.difficulty}</Badge>
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
