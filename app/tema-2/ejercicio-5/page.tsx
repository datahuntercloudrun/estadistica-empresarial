"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BoxPlot } from "@/components/charts/box-plot";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Line,
  ScatterChart,
  Scatter,
} from "recharts";

// ===== DATOS DE LOS GRÁFICOS =====

// Gráfico 1: Diagrama de sectores (ciudades)
const citiesData = [
  { name: "Madrid", value: 35 },
  { name: "Barcelona", value: 28 },
  { name: "Valencia", value: 22 },
  { name: "Bilbao", value: 15 },
];
const CITY_COLORS = ["#6baed6", "#fc8d62", "#66c2a5", "#e5c494"];

// Gráfico 3: Diagrama de sectores (muchas categorías)
const animalCountryData = [
  { name: "cat", value: 6.6 },
  { name: "dog", value: 11.0 },
  { name: "deer", value: 2.9 },
  { name: "chicken", value: 4.3 },
  { name: "duck", value: 5.9 },
  { name: "monkey", value: 9.5 },
  { name: "fish", value: 12.8 },
  { name: "cow", value: 19.0 },
  { name: "horse", value: 3.3 },
  { name: "US", value: 8.5 },
  { name: "UK", value: 9.6 },
  { name: "China", value: 6.6 },
];
const ANIMAL_COLORS = [
  "#4caf50", "#2e7d32", "#81c784", "#c62828", "#ff7043",
  "#795548", "#42a5f5", "#607d8b", "#fdd835", "#5c6bc0",
  "#00bcd4", "#cddc39",
];

// Gráficos 4-5: Datos barras apiladas/agrupadas
const barGroupData = [
  { name: "A", grupo1: 0.35, grupo2: 0.35 },
  { name: "B", grupo1: 0.30, grupo2: 0.35 },
  { name: "C", grupo1: 0.35, grupo2: 0.40 },
  { name: "D", grupo1: 0.30, grupo2: 0.25 },
  { name: "E", grupo1: 0.20, grupo2: 0.10 },
];

// Gráfico 6: Histograma con polígono de frecuencias
const histPolyData = [
  { name: "", frequency: 0, polygon: 0 },
  { name: "0-1", frequency: 1, polygon: 1 },
  { name: "1-2", frequency: 2, polygon: 2 },
  { name: "2-3", frequency: 3, polygon: 3 },
  { name: "3-4", frequency: 15, polygon: 15 },
  { name: "4-5", frequency: 10, polygon: 10 },
  { name: "5-6", frequency: 2, polygon: 2 },
  { name: "6-7", frequency: 1, polygon: 1 },
  { name: "7-8", frequency: 1, polygon: 1 },
  { name: " ", frequency: 0, polygon: 0 },
];

// Gráfico 7: Pictograma (lanzamientos espaciales)
const rocketData = [
  { country: "Rusia", launches: 33 },
  { country: "EE.UU", launches: 23 },
  { country: "China", launches: 22 },
  { country: "EU", launches: 10 },
  { country: "India", launches: 6 },
  { country: "Japón", launches: 5 },
];

// Gráfico 9: Dispersión sin línea
const scatter1Data = [
  { x: 3, y: -15 }, { x: 5, y: 8 }, { x: 8, y: -5 }, { x: 10, y: 15 }, { x: 12, y: 5 },
  { x: 15, y: 20 }, { x: 17, y: 10 }, { x: 18, y: 25 }, { x: 20, y: 30 }, { x: 22, y: 15 },
  { x: 23, y: 20 }, { x: 25, y: 35 }, { x: 27, y: 28 }, { x: 28, y: 40 }, { x: 30, y: 25 },
  { x: 30, y: 35 }, { x: 32, y: 40 }, { x: 33, y: 30 }, { x: 35, y: 45 }, { x: 37, y: 38 },
  { x: 38, y: 50 }, { x: 40, y: 55 }, { x: 42, y: 45 }, { x: 43, y: 60 }, { x: 45, y: 50 },
  { x: 47, y: 55 }, { x: 48, y: 65 }, { x: 50, y: 50 }, { x: 50, y: 60 }, { x: 52, y: 70 },
  { x: 53, y: 55 }, { x: 55, y: 65 }, { x: 57, y: 75 }, { x: 58, y: 60 }, { x: 60, y: 80 },
  { x: 62, y: 70 }, { x: 63, y: 75 }, { x: 65, y: 85 }, { x: 65, y: 90 }, { x: 67, y: 80 },
  { x: 68, y: 85 }, { x: 70, y: 95 }, { x: 72, y: 80 }, { x: 73, y: 90 }, { x: 75, y: 100 },
  { x: 77, y: 90 }, { x: 78, y: 95 }, { x: 80, y: 105 }, { x: 82, y: 100 }, { x: 83, y: 95 },
  { x: 85, y: 110 }, { x: 87, y: 105 }, { x: 88, y: 115 }, { x: 90, y: 120 },
];

// Gráfico 10: Dispersión con recta de regresión
const scatter2Data = [
  { x: 2, y: -25 }, { x: 5, y: -10 }, { x: 8, y: 5 }, { x: 10, y: 0 },
  { x: 15, y: 10 }, { x: 18, y: 15 }, { x: 20, y: 5 }, { x: 22, y: 20 },
  { x: 25, y: 15 }, { x: 25, y: 25 }, { x: 28, y: 20 }, { x: 30, y: 30 },
  { x: 30, y: 15 }, { x: 32, y: 25 }, { x: 35, y: 30 }, { x: 35, y: 20 },
  { x: 38, y: 35 }, { x: 40, y: 40 }, { x: 42, y: 30 }, { x: 45, y: 50 },
  { x: 48, y: 45 }, { x: 50, y: 55 }, { x: 50, y: 40 }, { x: 52, y: 50 },
  { x: 55, y: 60 }, { x: 58, y: 55 }, { x: 58, y: 65 }, { x: 60, y: 50 },
  { x: 62, y: 60 }, { x: 63, y: 70 }, { x: 65, y: 65 }, { x: 68, y: 70 },
  { x: 70, y: 75 }, { x: 72, y: 80 }, { x: 75, y: 85 }, { x: 75, y: 70 },
  { x: 78, y: 80 }, { x: 80, y: 90 }, { x: 82, y: 85 }, { x: 85, y: 95 },
  { x: 88, y: 100 }, { x: 90, y: 110 }, { x: 92, y: 105 }, { x: 95, y: 115 },
];
const regressionLine = [
  { x: 0, y: -15 },
  { x: 95, y: 105 },
];

// ===== DATOS DE CLASIFICACIÓN =====
const classifications = [
  { num: 1, tipo: "Diagrama de sectores", variable: "Cualitativa Nominal", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200", reason: "Círculo dividido en porciones proporcionales. Representa categorías (ciudades) sin orden natural. Adecuado porque tiene pocas categorías (4)." },
  { num: 2, tipo: "Cartograma (mapa coroplético)", variable: "Datos geográficos", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200", reason: "Mapa donde cada zona se colorea según la intensidad del dato. Muestra la distribución espacial de una variable (densidad de población)." },
  { num: 3, tipo: "Diagrama de sectores (mal uso)", variable: "Cualitativa Nominal", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200", reason: "Es un diagrama de sectores, pero con demasiadas categorías (12). Es difícil distinguir las porciones → no recomendado. Mejor usar un diagrama de barras." },
  { num: 4, tipo: "Diagrama de barras apilado", variable: "Cualitativa / Discreta", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200", reason: "Barras divididas en segmentos que muestran la composición de cada categoría. Permite ver tanto el total como las partes." },
  { num: 5, tipo: "Diagrama de barras agrupado", variable: "Cualitativa / Discreta", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200", reason: "Barras separadas agrupadas por categoría. Facilita la comparación directa entre grupos para cada categoría." },
  { num: 6, tipo: "Histograma + Polígono de frecuencias", variable: "Cuantitativa Continua", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200", reason: "Rectángulos adyacentes (sin huecos) = histograma. La línea que conecta los puntos medios = polígono de frecuencias. Datos agrupados en intervalos." },
  { num: 7, tipo: "Pictograma", variable: "Cualitativa / Discreta", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200", reason: "Usa figuras (cohetes) cuyo tamaño o cantidad es proporcional al dato. Muy visual e intuitivo, pero poco preciso." },
  { num: 8, tipo: "Diagrama de caja y bigotes (boxplot)", variable: "Cuantitativa", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200", reason: "Resume la distribución con 5 valores (mín, Q1, mediana, Q3, máx) y muestra outliers (los dos puntos por encima del bigote superior)." },
  { num: 9, tipo: "Diagrama de dispersión", variable: "Bivariante Cuantitativa", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200", reason: "Cada punto representa un par (X, Y). La nube ascendente indica correlación positiva entre las dos variables." },
  { num: 10, tipo: "Diagrama de dispersión con recta de regresión", variable: "Bivariante Cuantitativa", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200", reason: "Igual que el anterior, pero incluye la recta de regresión (línea roja) que resume la tendencia lineal de los datos." },
];

// ===== COMPONENTE PRINCIPAL =====
export default function Ejercicio5() {
  return (
    <ExerciseLayout
      tema={2}
      exerciseNumber={5}
      title="Clasificación de Gráficos Estadísticos"
      difficulty="Bajo"
      category="Representaciones gráficas"
      statement={
        <p>Clasifique los siguientes gráficos estadísticos según el tipo de variable que representan y sus características principales.</p>
      }
      prevUrl="/tema-2/ejercicio-4"
      nextUrl="/tema-2/complementario-1"
    >
      {/* ============ PASO 1: Los 10 gráficos a clasificar ============ */}
      <StepCard stepNumber={1} title="Los 10 gráficos a clasificar" variant="explanation">
        <p className="text-sm text-muted-foreground mb-3">Observa cada gráfico e intenta identificar de qué tipo es antes de ver la solución.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Gráfico 1: Diagrama de sectores (ciudades) */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 1</Badge>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={citiesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name }) => name}
                    labelLine={true}
                    isAnimationActive={false}
                  >
                    {citiesData.map((_, i) => (
                      <Cell key={`c1-${i}`} fill={CITY_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico 2: Cartograma (mapa coroplético simplificado) */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 2</Badge>
              <p className="text-sm font-semibold text-center mb-2">Densidad de población en España</p>
              <div className="grid grid-cols-5 gap-0.5 max-w-[240px] mx-auto">
                {/* Fila 1: Norte */}
                <div className="bg-orange-200 dark:bg-orange-800/40 rounded text-[7px] p-1.5 text-center font-medium">GAL</div>
                <div className="bg-orange-200 dark:bg-orange-800/40 rounded text-[7px] p-1.5 text-center font-medium">AST</div>
                <div className="bg-orange-300 dark:bg-orange-700/50 rounded text-[7px] p-1.5 text-center font-medium">CANT</div>
                <div className="bg-orange-500 rounded text-[7px] p-1.5 text-center font-medium text-white">PV</div>
                <div></div>
                {/* Fila 2 */}
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded text-[7px] p-1.5 text-center font-medium col-span-2">C. Y LEÓN</div>
                <div className="bg-orange-200 dark:bg-orange-800/40 rounded text-[7px] p-1.5 text-center font-medium">NAV</div>
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded text-[7px] p-1.5 text-center font-medium">ARAG</div>
                <div></div>
                {/* Fila 3 */}
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded text-[7px] p-1.5 text-center font-medium">EXT</div>
                <div className="bg-orange-700 rounded text-[7px] p-1.5 text-center font-bold text-white">MAD</div>
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded text-[7px] p-1.5 text-center font-medium">CLM</div>
                <div className="bg-orange-200 dark:bg-orange-800/40 rounded text-[7px] p-1.5 text-center font-medium">ARAG</div>
                <div className="bg-orange-500 rounded text-[7px] p-1.5 text-center font-medium text-white">CAT</div>
                {/* Fila 4 */}
                <div className="bg-orange-300 dark:bg-orange-700/50 rounded text-[7px] p-1.5 text-center font-medium col-span-2">ANDALUCÍA</div>
                <div className="bg-orange-300 dark:bg-orange-700/50 rounded text-[7px] p-1.5 text-center font-medium">MUR</div>
                <div className="bg-orange-400 dark:bg-orange-600/50 rounded text-[7px] p-1.5 text-center font-medium text-white">VAL</div>
                <div></div>
              </div>
              <div className="flex items-center gap-1 justify-center mt-3 text-[8px] text-muted-foreground">
                <span>Menor</span>
                <div className="w-4 h-2.5 bg-orange-100 dark:bg-orange-900/30 rounded"></div>
                <div className="w-4 h-2.5 bg-orange-200 dark:bg-orange-800/40 rounded"></div>
                <div className="w-4 h-2.5 bg-orange-300 dark:bg-orange-700/50 rounded"></div>
                <div className="w-4 h-2.5 bg-orange-500 rounded"></div>
                <div className="w-4 h-2.5 bg-orange-700 rounded"></div>
                <span>Mayor densidad</span>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 3: Diagrama de sectores (muchas categorías) */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 3</Badge>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={animalCountryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                    labelLine={true}
                    isAnimationActive={false}
                  >
                    {animalCountryData.map((_, i) => (
                      <Cell key={`c3-${i}`} fill={ANIMAL_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                  <Legend
                    wrapperStyle={{ fontSize: "9px" }}
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico 4: Diagrama de barras apilado */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 4</Badge>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barGroupData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 0.8]} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="grupo1" name="Grupo 1" stackId="stack" fill="#4caf50" isAnimationActive={false} />
                  <Bar dataKey="grupo2" name="Grupo 2" stackId="stack" fill="#8b8b00" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico 5: Diagrama de barras agrupado */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 5</Badge>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barGroupData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 0.7]} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="grupo1" name="Grupo 1" fill="#4caf50" isAnimationActive={false} />
                  <Bar dataKey="grupo2" name="Grupo 2" fill="#8b8b00" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico 6: Histograma + Polígono de frecuencias */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 6</Badge>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={histPolyData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }} barCategoryGap={0}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    label={{ value: "Hectáreas", position: "bottom", offset: 5, style: { fontSize: 11 } }}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    label={{ value: "Frequency", angle: -90, position: "insideLeft", offset: -5, style: { fontSize: 11 } }}
                    domain={[0, 20]}
                  />
                  <Tooltip />
                  <Bar dataKey="frequency" fill="#b0b0b0" isAnimationActive={false} />
                  <Line
                    type="linear"
                    dataKey="polygon"
                    stroke="#4caf50"
                    strokeWidth={2}
                    dot={{ fill: "#4caf50", r: 3 }}
                    isAnimationActive={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico 7: Pictograma (lanzamientos espaciales) */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 7</Badge>
              <p className="text-sm font-semibold text-center mb-2">Lanzamientos espaciales</p>
              <div className="space-y-1.5">
                {rocketData.map((d) => (
                  <div key={d.country} className="flex items-center gap-2">
                    <span className="w-12 text-sm text-right font-medium shrink-0">{d.country}</span>
                    <div className="flex gap-px flex-1 flex-wrap">
                      {Array.from({ length: Math.ceil(d.launches / 5) }).map((_, i) => (
                        <span key={i} className="text-base leading-none">🚀</span>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 shrink-0">{d.launches}</span>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-muted-foreground text-center mt-2">🚀 = 5 lanzamientos</p>
            </CardContent>
          </Card>

          {/* Gráfico 8: Boxplot */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 8</Badge>
              <BoxPlot
                min={0}
                q1={20}
                median={35}
                q3={55}
                max={80}
                outliers={[130, 155]}
              />
            </CardContent>
          </Card>

          {/* Gráfico 9: Diagrama de dispersión (sin línea) */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 9</Badge>
              <ResponsiveContainer width="100%" height={220}>
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="X"
                    tick={{ fontSize: 11 }}
                    label={{ value: "X", position: "bottom", offset: 5, style: { fontSize: 12 } }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Y"
                    tick={{ fontSize: 11 }}
                    label={{ value: "Y", angle: -90, position: "insideLeft", offset: -5, style: { fontSize: 12 } }}
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={scatter1Data} fill="#26a69a" isAnimationActive={false} />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico 10: Diagrama de dispersión con recta de regresión */}
          <Card className="border-2">
            <CardContent className="p-3">
              <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">Gráfico 10</Badge>
              <ResponsiveContainer width="100%" height={220}>
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="X"
                    tick={{ fontSize: 11 }}
                    label={{ value: "X", position: "bottom", offset: 5, style: { fontSize: 12 } }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Y"
                    tick={{ fontSize: 11 }}
                    label={{ value: "Y", angle: -90, position: "insideLeft", offset: -5, style: { fontSize: 12 } }}
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Datos" data={scatter2Data} fill="#333333" isAnimationActive={false} />
                  <Scatter
                    name="Regresión"
                    data={regressionLine}
                    fill="transparent"
                    line={{ stroke: "#ef4444", strokeWidth: 2 }}
                    isAnimationActive={false}
                    legendType="none"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 2: ¿Para qué sirven los gráficos? ============ */}
      <StepCard stepNumber={2} title="¿Para qué sirven los gráficos estadísticos?" variant="explanation">
        <p>
          Los gráficos estadísticos son <strong>representaciones visuales</strong> de los datos. Permiten ver patrones, tendencias y comparaciones de forma inmediata, algo que una tabla de números por sí sola no consigue.
        </p>
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Regla fundamental: el tipo de gráfico depende del tipo de variable</p>
            <p className="text-muted-foreground">No todos los gráficos sirven para todos los datos. El primer paso siempre es identificar si la variable es <strong>cualitativa</strong> (categorías) o <strong>cuantitativa</strong> (números), y dentro de cuantitativa, si es <strong>discreta</strong> (valores aislados) o <strong>continua</strong> (cualquier valor en un intervalo).</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">Cualitativas</p>
                <p className="text-sm text-muted-foreground">Categorías sin escala numérica → gráficos que muestran proporciones o conteos por categoría</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded p-2">
                <p className="font-semibold text-blue-700 dark:text-blue-300">Cuantitativas</p>
                <p className="text-sm text-muted-foreground">Valores numéricos con escala → gráficos que reflejan la escala y la distribución de los datos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 3: Gráficos para cualitativas ============ */}
      <StepCard stepNumber={3} title="Gráficos para variables cualitativas (y discretas con pocos valores)" variant="explanation">
        <p>Estos gráficos muestran <strong>categorías</strong> y cuántas veces aparece cada una. También sirven para variables cuantitativas discretas con pocos valores distintos.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">Diagrama de sectores (tarta)</p>
              <Badge variant="outline" className="text-sm">Cualitativas / Discretas con pocos valores</Badge>
              <p className="text-sm text-muted-foreground">Círculo dividido en &quot;porciones&quot; (sectores). Cada porción representa una categoría y su tamaño es proporcional a la frecuencia relativa.</p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm space-y-1">
                  <p><strong>¿Cómo se construye?</strong> El ángulo de cada sector = frecuencia relativa × 360°.</p>
                  <p>Ej: si una categoría tiene el 25% de los datos → su ángulo es 0.25 × 360° = 90°.</p>
                  <p className="text-muted-foreground"><strong>Cuándo usarlo:</strong> Cuando hay <strong>pocas categorías</strong> (3-6) y queremos ver proporciones. Con muchas categorías se vuelve confuso.</p>
                  <p className="text-muted-foreground"><strong>No usar cuando:</strong> Las categorías tienen valores muy similares (difícil distinguir sectores parecidos).</p>
                  <p className="text-blue-600 mt-1"><strong>→ Gráficos 1 y 3</strong> del enunciado</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">Diagrama de barras</p>
              <Badge variant="outline" className="text-sm">Cualitativas / Discretas</Badge>
              <p className="text-sm text-muted-foreground">Barras verticales u horizontales cuya <strong>altura</strong> (o longitud) es proporcional a la frecuencia de cada categoría o valor.</p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm space-y-1">
                  <p><strong>Característica clave:</strong> Las barras están <strong>separadas entre sí</strong> por huecos, porque representan categorías o valores aislados (no un continuo).</p>
                  <p><strong>Variantes:</strong> Sencillo (una barra por categoría), múltiple/agrupado (varias barras agrupadas para comparar), apilado (barras divididas por subcategorías).</p>
                  <p className="text-muted-foreground"><strong>Cuándo usarlo:</strong> Es el gráfico más versátil. Sirve para cualitativas (nominales, ordinales) y cuantitativas discretas.</p>
                  <p className="text-blue-600 mt-1"><strong>→ Gráficos 4 y 5</strong> del enunciado</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">Pictograma</p>
              <Badge variant="outline" className="text-sm">Cualitativas / Discretas</Badge>
              <p className="text-sm text-muted-foreground">Usa <strong>figuras o símbolos</strong> (personas, coches, monedas...) para representar los datos. El número o tamaño de los símbolos es proporcional a la frecuencia.</p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm space-y-1">
                  <p><strong>Ejemplo:</strong> Un símbolo de persona = 1000 habitantes. Si una ciudad tiene 5000 hab., se dibujan 5 símbolos.</p>
                  <p className="text-muted-foreground"><strong>Cuándo usarlo:</strong> En presentaciones o infografías para un público no técnico. Es muy visual e intuitivo.</p>
                  <p className="text-muted-foreground"><strong>Limitación:</strong> Poco preciso para datos que requieren exactitud.</p>
                  <p className="text-blue-600 mt-1"><strong>→ Gráfico 7</strong> del enunciado</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">Cartograma (mapa coroplético)</p>
              <Badge variant="outline" className="text-sm">Datos geográficos</Badge>
              <p className="text-sm text-muted-foreground">Mapa donde cada <strong>región se colorea</strong> según la intensidad del dato que representa (más oscuro = valor más alto).</p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm space-y-1">
                  <p><strong>Ejemplo:</strong> Mapa de España coloreado por tasa de desempleo: las provincias con más desempleo aparecen más oscuras.</p>
                  <p className="text-muted-foreground"><strong>Cuándo usarlo:</strong> Cuando los datos tienen un componente geográfico y queremos ver diferencias entre regiones.</p>
                  <p className="text-blue-600 mt-1"><strong>→ Gráfico 2</strong> del enunciado</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 4: Gráficos para cuantitativas ============ */}
      <StepCard stepNumber={4} title="Gráficos para variables cuantitativas" variant="explanation">
        <p>Estos gráficos trabajan con <strong>valores numéricos</strong> y necesitan una escala en el eje. Reflejan la distribución y forma de los datos.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">Histograma</p>
              <Badge variant="outline" className="text-sm">Cuantitativas continuas (datos agrupados)</Badge>
              <p className="text-sm text-muted-foreground">Rectángulos <strong>adyacentes sin separación</strong> donde el eje X muestra los intervalos y el <strong>área</strong> de cada rectángulo es proporcional a la frecuencia.</p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm space-y-1">
                  <p><strong>¿Por qué no hay huecos?</strong> Porque la variable es continua: entre un intervalo y el siguiente no hay &quot;vacío&quot;, los valores fluyen sin interrupción.</p>
                  <p><strong>¿Altura o área?</strong> Si todos los intervalos tienen la <strong>misma amplitud</strong>, la altura es proporcional a la frecuencia. Si tienen <strong>amplitudes distintas</strong>, lo correcto es que el <strong>área</strong> sea proporcional (se usa la densidad de frecuencia).</p>
                  <p className="text-blue-600 mt-1"><strong>→ Gráfico 6</strong> del enunciado (las barras grises)</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">Polígono de frecuencias</p>
              <Badge variant="outline" className="text-sm">Cuantitativas (agrupadas o no)</Badge>
              <p className="text-sm text-muted-foreground">Línea que une los <strong>puntos medios</strong> (marcas de clase) de las barras superiores de un histograma o diagrama de barras.</p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm space-y-1">
                  <p><strong>¿Cómo se construye?</strong> Se coloca un punto en el centro de cada barra (marca de clase) a la altura de la frecuencia, y se unen con líneas rectas. Se cierra con el eje X.</p>
                  <p className="text-muted-foreground"><strong>Ventaja sobre el histograma:</strong> Permite superponer varios polígonos para comparar distribuciones.</p>
                  <p className="text-blue-600 mt-1"><strong>→ Gráfico 6</strong> del enunciado (la línea verde)</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">Diagrama de caja y bigotes (Boxplot)</p>
              <Badge variant="outline" className="text-sm">Cuantitativas</Badge>
              <p className="text-sm text-muted-foreground">Resume la distribución en <strong>5 valores clave</strong> y permite detectar valores atípicos de un vistazo.</p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm space-y-1">
                  <p><strong>Los 5 valores:</strong></p>
                  <div className="flex gap-1 flex-wrap">
                    <Badge className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 text-[9px]">Mínimo</Badge>
                    <Badge className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 text-[9px]">Q1 (25%)</Badge>
                    <Badge className="bg-cyan-200 dark:bg-cyan-800/40 text-cyan-900 dark:text-cyan-100 text-[9px]">Mediana (50%)</Badge>
                    <Badge className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 text-[9px]">Q3 (75%)</Badge>
                    <Badge className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 text-[9px]">Máximo</Badge>
                  </div>
                  <p className="mt-1">La <strong>caja</strong> va de Q1 a Q3 (contiene el 50% central de los datos). La línea dentro es la mediana. Los <strong>bigotes</strong> se extienden hasta el mínimo y máximo.</p>
                  <p className="text-blue-600 mt-1"><strong>→ Gráfico 8</strong> del enunciado</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">Diagrama de dispersión (nube de puntos)</p>
              <Badge variant="outline" className="text-sm">Variables bivariantes cuantitativas</Badge>
              <p className="text-sm text-muted-foreground">Cada observación es un <strong>punto en un plano</strong> con coordenadas (X, Y). Muestra si existe relación entre dos variables.</p>
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-2 text-sm space-y-1">
                  <p><strong>¿Qué se ve?</strong> Si los puntos siguen un patrón (nube ascendente, descendente, curva...) hay relación entre las variables. Si están dispersos sin patrón, no hay relación clara.</p>
                  <p><strong>Con recta de regresión:</strong> A veces se añade una línea recta que resume la tendencia lineal de los datos.</p>
                  <p className="text-blue-600 mt-1"><strong>→ Gráficos 9 y 10</strong> del enunciado</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </StepCard>

      {/* ============ PASO 5: Histograma vs Barras ============ */}
      <StepCard stepNumber={5} title="Error común: ¿Histograma o diagrama de barras?" variant="explanation">
        <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-rose-800 dark:text-rose-200">Esta es la confusión más frecuente en estadística descriptiva</p>
            <p className="text-muted-foreground">Ambos usan rectángulos, pero representan cosas muy distintas:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <Card className="bg-white dark:bg-gray-900 border-violet-200 dark:border-violet-800">
                <CardContent className="p-3 space-y-1">
                  <p className="font-semibold text-violet-800 dark:text-violet-200 text-sm">Diagrama de barras</p>
                  <div className="space-y-0.5 text-sm">
                    <p><strong>Variable:</strong> Cualitativa o discreta</p>
                    <p><strong>Barras:</strong> Separadas por huecos</p>
                    <p><strong>Eje X:</strong> Categorías o valores aislados</p>
                    <p><strong>Lo que importa:</strong> La <strong>altura</strong> de cada barra</p>
                    <p><strong>Orden:</strong> Se pueden reordenar las barras (si es nominal)</p>
                  </div>
                  <div className="bg-violet-50 dark:bg-violet-950/20 rounded p-1.5 mt-1">
                    <p className="text-sm text-muted-foreground"><strong>→ Gráficos 4 y 5:</strong> Barras separadas, categorías A-E.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-900 border-amber-200 dark:border-amber-800">
                <CardContent className="p-3 space-y-1">
                  <p className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Histograma</p>
                  <div className="space-y-0.5 text-sm">
                    <p><strong>Variable:</strong> Cuantitativa continua (agrupada)</p>
                    <p><strong>Barras:</strong> Pegadas (sin huecos)</p>
                    <p><strong>Eje X:</strong> Intervalos numéricos consecutivos</p>
                    <p><strong>Lo que importa:</strong> El <strong>área</strong> de cada rectángulo</p>
                    <p><strong>Orden:</strong> No se pueden reordenar (son intervalos consecutivos)</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/20 rounded p-1.5 mt-1">
                    <p className="text-sm text-muted-foreground"><strong>→ Gráfico 6:</strong> Barras pegadas, intervalos de hectáreas.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
              <CardContent className="p-2 text-sm">
                <p><strong>Regla rápida:</strong> Si puedes cambiar el orden de las barras sin que pierda sentido → es un <strong>diagrama de barras</strong>. Si cambiar el orden no tiene sentido (porque son intervalos consecutivos) → es un <strong>histograma</strong>.</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 6: Clasificación de cada gráfico ============ */}
      <StepCard stepNumber={6} title="Clasificación de cada gráfico" variant="result">
        <p className="text-sm text-muted-foreground mb-3">Aplicamos la teoría a cada uno de los 10 gráficos del enunciado:</p>
        <div className="space-y-3">
          {classifications.map((c) => (
            <div key={c.num} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                {c.num}
              </span>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{c.tipo}</p>
                <Badge className={c.color}>{c.variable}</Badge>
                <p className="text-sm text-muted-foreground">{c.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </StepCard>

      {/* ============ PASO 7: Resumen ============ */}
      <StepCard stepNumber={7} title="Resumen: ¿Qué gráfico usar según el tipo de variable?" variant="result">
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Tipo de variable</th>
                <th className="text-left p-3 font-medium">Gráficos recomendados</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Clave</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3"><Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200">Cualitativa Nominal</Badge></td>
                <td className="p-3 text-sm">Sectores, barras, pictograma</td>
                <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">Las barras se pueden reordenar</td>
              </tr>
              <tr className="border-t">
                <td className="p-3"><Badge className="bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-200">Cualitativa Ordinal</Badge></td>
                <td className="p-3 text-sm">Barras (respetando el orden)</td>
                <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">El orden de las barras importa</td>
              </tr>
              <tr className="border-t">
                <td className="p-3"><Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">Cuantitativa Discreta</Badge></td>
                <td className="p-3 text-sm">Barras, polígono de frecuencias</td>
                <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">Barras separadas (valores aislados)</td>
              </tr>
              <tr className="border-t">
                <td className="p-3"><Badge className="bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200">Cuantitativa Continua</Badge></td>
                <td className="p-3 text-sm">Histograma, polígono, boxplot</td>
                <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">Barras pegadas (intervalos consecutivos)</td>
              </tr>
              <tr className="border-t">
                <td className="p-3"><Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">Bivariante</Badge></td>
                <td className="p-3 text-sm">Diagrama de dispersión</td>
                <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">Un punto por cada par (X, Y)</td>
              </tr>
              <tr className="border-t">
                <td className="p-3"><Badge className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200">Geográfica</Badge></td>
                <td className="p-3 text-sm">Cartograma (mapa coroplético)</td>
                <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">Colores por regiones</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3 text-sm">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-2 space-y-1">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Comparar distribuciones</p>
              <p className="text-muted-foreground text-sm">Boxplots (uno por grupo) o polígonos de frecuencias superpuestos.</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-2 space-y-1">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Ver proporciones</p>
              <p className="text-muted-foreground text-sm">Diagrama de sectores (pocas categorías) o barras apiladas (muchas).</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-2 space-y-1">
              <p className="font-semibold text-orange-800 dark:text-orange-200">Ver relación entre 2 variables</p>
              <p className="text-muted-foreground text-sm">Diagrama de dispersión. Si hay relación, los puntos forman un patrón.</p>
            </CardContent>
          </Card>
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
