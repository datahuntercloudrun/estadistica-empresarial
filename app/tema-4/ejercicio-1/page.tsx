"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { round } from "@/lib/stats/descriptive";
import {
  buildJointTable,
  meanFromTable,
  varianceFromTable,
  covarianceFromTable,
  momentOrigin,
  checkIndependence,
  regressionYX,
  regressionXY,
  correlation,
} from "@/lib/stats/bivariate";
import { ScatterChartCustom } from "@/components/charts/scatter-chart-custom";

const entries = [
  { x: 1, y: 2, nij: 1 },
  { x: 1, y: 6, nij: 1 },
  { x: 2, y: 2, nij: 2 },
  { x: 3, y: 2, nij: 1 },
  { x: 3, y: 4, nij: 1 },
  { x: 4, y: 2, nij: 1 },
  { x: 4, y: 4, nij: 2 },
  { x: 4, y: 6, nij: 1 },
];

const table = buildJointTable(entries);
const xMean = meanFromTable(table, "x");
const yMean = meanFromTable(table, "y");
const sx2 = varianceFromTable(table, "x");
const sy2 = varianceFromTable(table, "y");
const xyMean = momentOrigin(table, 1, 1);
const sxy = covarianceFromTable(table);
const sx = Math.sqrt(sx2);
const sy = Math.sqrt(sy2);
const r = correlation(sxy, sx, sy);
const { isIndependent, expectedFreqs } = checkIndependence(table);
const lineYX = regressionYX(xMean, yMean, sxy, sx2);
const lineXY = regressionXY(xMean, yMean, sxy, sy2);

const scatterData = entries.flatMap((e) =>
  Array.from({ length: e.nij }, () => ({ x: e.x, y: e.y }))
);

export default function Ejercicio1() {
  return (
    <ExerciseLayout
      tema={4}
      exerciseNumber={1}
      title="Distribución de Frecuencias Conjuntas"
      difficulty="Medio-Alto"
      category="Covarianza y regresión"
      statement={
        <div className="space-y-2">
          <p>Dada la siguiente distribución de frecuencias conjuntas:</p>
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700/30">
                  <th className="border p-2"><InlineMath math="x_i" /></th>
                  <th className="border p-2"><InlineMath math="y_j" /></th>
                  <th className="border p-2"><InlineMath math="n_{ij}" /></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, idx) => (
                  <tr key={idx}>
                    <td className="border p-2 text-center">{e.x}</td>
                    <td className="border p-2 text-center">{e.y}</td>
                    <td className="border p-2 text-center">{e.nij}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Construya una tabla de correlación, obteniendo:</p>
          <p>a) Covarianza &nbsp; b) Independencia &nbsp; c) Rectas de regresión X/Y e Y/X</p>
        </div>
      }
      prevUrl="/tema-4"
      nextUrl="/tema-4/ejercicio-2"
    >
      {/* ===== PASO 1: Qué vamos a aprender ===== */}
      <StepCard stepNumber={1} title="¿Qué vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio es el <strong>ejercicio fundacional</strong> del tema: partimos de datos &quot;crudos&quot; (pares de valores con frecuencias)
          y extraemos toda la información sobre la relación entre X e Y.
        </p>
        <Card className="bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold text-teal-800 dark:text-teal-200">El camino completo</p>
            <p className="text-muted-foreground">
              1. Organizar los datos en una <strong>tabla de correlación</strong> (bidimensional) →
              2. Calcular <strong>covarianza</strong> (¿se mueven juntas?) →
              3. Verificar <strong>independencia</strong> →
              4. Obtener <strong>rectas de regresión</strong> (fórmulas para predecir).
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ===== PASO 2: Tabla de correlación ===== */}
      <StepCard stepNumber={2} title="Construir la tabla de correlación" variant="calculation">
        <p className="text-muted-foreground">
          Los datos vienen como pares <InlineMath math="(x_i, y_j, n_{ij})" />.
          Los reorganizamos en una tabla donde las filas son valores de X, las columnas son valores de Y,
          y en cada celda ponemos la frecuencia conjunta.
        </p>

        <div className="overflow-x-auto mt-2">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700/30">
                <th className="border p-2"><InlineMath math="x_i \backslash y_j" /></th>
                {table.yValues.map((y) => (
                  <th key={y} className="border p-2 text-center">{y}</th>
                ))}
                <th className="border p-2 text-center font-bold bg-blue-50 dark:bg-blue-950/20"><InlineMath math="n_{i\cdot}" /></th>
              </tr>
            </thead>
            <tbody>
              {table.xValues.map((x, i) => (
                <tr key={x}>
                  <td className="border p-2 text-center font-medium">{x}</td>
                  {table.yValues.map((_, j) => (
                    <td key={j} className="border p-2 text-center">
                      {table.frequencies[i][j]}
                    </td>
                  ))}
                  <td className="border p-2 text-center font-bold bg-blue-50 dark:bg-blue-950/20">{table.marginalX[i]}</td>
                </tr>
              ))}
              <tr className="bg-blue-50 dark:bg-blue-950/20">
                <td className="border p-2 text-center font-bold"><InlineMath math="n_{\cdot j}" /></td>
                {table.marginalY.map((m, j) => (
                  <td key={j} className="border p-2 text-center font-bold">{m}</td>
                ))}
                <td className="border p-2 text-center font-bold">{table.n}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 mt-2">
          <CardContent className="p-2 text-sm text-muted-foreground">
            <InlineMath math="n_{i\cdot}" /> = suma de la fila (frecuencia marginal de X).
            <InlineMath math="n_{\cdot j}" /> = suma de la columna (frecuencia marginal de Y).
            Total: n = {table.n}.
          </CardContent>
        </Card>
      </StepCard>

      {/* ===== PASO 3: Medias y momentos ===== */}
      <StepCard stepNumber={3} title="Calcular medias y momentos" variant="calculation">
        <p className="text-muted-foreground">
          Necesitamos tres valores clave: <InlineMath math="\bar{x}" />, <InlineMath math="\bar{y}" /> y <InlineMath math="\overline{xy}" />.
        </p>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Medias (momentos de primer orden)</p>
            <FormulaDisplay math={`\\bar{x} = \\frac{\\sum x_i \\cdot n_{i\\cdot}}{n} = \\frac{${table.xValues.map((x, i) => `${x} \\cdot ${table.marginalX[i]}`).join(" + ")}}{${table.n}} = \\frac{${table.xValues.reduce((s, x, i) => s + x * table.marginalX[i], 0)}}{${table.n}} = ${round(xMean, 2)}`} />
            <FormulaDisplay math={`\\bar{y} = \\frac{\\sum y_j \\cdot n_{\\cdot j}}{n} = \\frac{${table.yValues.map((y, j) => `${y} \\cdot ${table.marginalY[j]}`).join(" + ")}}{${table.n}} = \\frac{${table.yValues.reduce((s, y, j) => s + y * table.marginalY[j], 0)}}{${table.n}} = ${round(yMean, 2)}`} />
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">Media del producto <InlineMath math="\overline{xy}" /></p>
            <FormulaDisplay math={`\\overline{xy} = \\frac{\\sum x_i \\cdot y_j \\cdot n_{ij}}{n} = \\frac{${entries.map((e) => `${e.x} \\cdot ${e.y} \\cdot ${e.nij}`).join(" + ")}}{${table.n}}`} />
            <FormulaDisplay math={`= \\frac{${entries.reduce((s, e) => s + e.x * e.y * e.nij, 0)}}{${table.n}} = ${round(xyMean, 2)}`} />
          </CardContent>
        </Card>
      </StepCard>

      {/* ===== PASO 4: Covarianza ===== */}
      <StepCard stepNumber={4} title="a) Covarianza" variant="calculation">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Fórmula atajo de la covarianza</p>
            <FormulaDisplay math={`s_{xy} = \\overline{xy} - \\bar{x} \\cdot \\bar{y}`} />
            <p className="text-muted-foreground">&quot;La media del producto menos el producto de las medias&quot;</p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`s_{xy} = ${round(xyMean, 2)} - ${round(xMean, 2)} \\times ${round(yMean, 2)} = ${round(xyMean, 2)} - ${round(xMean * yMean, 4)} = ${round(sxy, 4)}`} />

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="text-muted-foreground">
              <InlineMath math={`s_{xy} = ${round(sxy, 4)} > 0`} /> → relación lineal <strong>directa pero muy débil</strong>.
              Cuando X sube, Y tiende ligeramente a subir, pero la relación es casi inexistente.
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Covarianza" value={`sxy = ${round(sxy, 4)}`} />
      </StepCard>

      {/* ===== PASO 5: Independencia ===== */}
      <StepCard stepNumber={5} title="b) Estudio de independencia" variant="calculation">
        {/* --- BLOQUE 1: La pregunta que queremos responder --- */}
        <Card className="bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-teal-800 dark:text-teal-200">La pregunta clave</p>
            <p className="text-muted-foreground">
              Si te digo que <strong>X = 4</strong>, ¿eso te ayuda a predecir qué valor tomará Y?
            </p>
            <p className="text-muted-foreground">
              Si <strong>sí</strong> → las variables están <strong>relacionadas</strong> (dependientes).
              Si <strong>no</strong> → son <strong>independientes</strong> (saber X no cambia nada sobre Y).
            </p>
          </CardContent>
        </Card>

        {/* --- BLOQUE 2: La analogía intuitiva --- */}
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Analogía: dos dados</p>
            <p className="text-muted-foreground">
              Piensa en tirar dos dados. El resultado del dado 1 no influye en el dado 2: son independientes.
              Pero si te digo que &quot;la suma de los dos dados es 7&quot;, entonces saber que el dado 1 sacó un 2
              te dice que el dado 2 sacó un 5. Ahora están <strong>relacionados por una condición</strong>.
            </p>
          </CardContent>
        </Card>

        {/* --- BLOQUE 3: El método formal --- */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mt-2">
          <CardContent className="p-3 text-sm space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">El método: comparar lo real con lo esperado</p>
            <p className="text-muted-foreground">
              Si X e Y fueran independientes, podríamos calcular <strong>qué frecuencia esperaríamos</strong> en cada celda
              simplemente multiplicando las marginales:
            </p>
            <FormulaDisplay math={`n_{ij}^{\\text{esperado}} = \\frac{n_{i\\cdot} \\times n_{\\cdot j}}{n}`} />
            <p className="text-muted-foreground">
              <strong>Ejemplo:</strong> para la celda (x=1, y=2): el total de la fila x=1 es {table.marginalX[0]} y el total
              de la columna y=2 es {table.marginalY[0]}, sobre n={table.n} observaciones:
            </p>
            <FormulaDisplay math={`n_{\\text{esperado}} = \\frac{${table.marginalX[0]} \\times ${table.marginalY[0]}}{${table.n}} = ${round(expectedFreqs[0][0], 2)}`} />
            <p className="text-muted-foreground">
              La frecuencia observada real es <strong>{table.frequencies[0][0]}</strong>.
              {Math.abs(table.frequencies[0][0] - expectedFreqs[0][0]) < 0.001
                ? " Coincide."
                : ` No coincide (${table.frequencies[0][0]} ≠ ${round(expectedFreqs[0][0], 2)}).`}
            </p>
          </CardContent>
        </Card>

        {/* --- BLOQUE 4: La regla decisiva --- */}
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-violet-800 dark:text-violet-200">La regla</p>
            <p className="text-muted-foreground">
              Si <strong>TODAS</strong> las celdas cumplen (observada = esperada) → independientes.
              Si <strong>una sola</strong> celda falla → <strong>NO son independientes</strong>.
            </p>
          </CardContent>
        </Card>

        {/* --- BLOQUE 5: Tabla comparativa --- */}
        <p className="text-sm font-semibold mt-3">Comprobamos celda por celda:</p>
        <p className="text-xs text-muted-foreground mb-1">En cada celda: <strong>observada</strong> vs esperada. Las celdas rojas no coinciden.</p>

        <div className="overflow-x-auto mt-1">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700/30">
                <th className="border p-2"><InlineMath math="x_i \backslash y_j" /></th>
                {table.yValues.map((y) => (
                  <th key={y} className="border p-2 text-center">{y}</th>
                ))}
                <th className="border p-2 text-center bg-blue-50 dark:bg-blue-950/20"><InlineMath math="n_{i\cdot}" /></th>
              </tr>
            </thead>
            <tbody>
              {table.xValues.map((x, i) => (
                <tr key={x}>
                  <td className="border p-2 text-center font-medium">{x}</td>
                  {table.yValues.map((_, j) => {
                    const obs = table.frequencies[i][j];
                    const exp = round(expectedFreqs[i][j], 2);
                    const match = Math.abs(obs - exp) < 0.001;
                    return (
                      <td key={j} className={`border p-2 text-center text-xs ${match ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-rose-50 dark:bg-rose-950/20"}`}>
                        <span className="font-bold text-base">{obs}</span>
                        <span className="text-muted-foreground block text-[10px]">esperada: {exp}</span>
                        {match
                          ? <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs block">&#10003;</span>
                          : <span className="text-rose-600 dark:text-rose-400 font-bold text-xs block">&#10007; ≠</span>}
                      </td>
                    );
                  })}
                  <td className="border p-2 text-center font-bold bg-blue-50 dark:bg-blue-950/20">{table.marginalX[i]}</td>
                </tr>
              ))}
              <tr className="bg-blue-50 dark:bg-blue-950/20">
                <td className="border p-2 text-center font-bold"><InlineMath math="n_{\cdot j}" /></td>
                {table.marginalY.map((m, j) => (
                  <td key={j} className="border p-2 text-center font-bold">{m}</td>
                ))}
                <td className="border p-2 text-center font-bold">{table.n}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- BLOQUE 6: Conclusión --- */}
        <Card className={`mt-3 ${isIndependent ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800" : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800"}`}>
          <CardContent className="p-3 text-sm space-y-2">
            <p className={`font-bold text-base ${isIndependent ? "text-emerald-800 dark:text-emerald-200" : "text-rose-800 dark:text-rose-200"}`}>
              {isIndependent ? "Conclusión: Las variables SON independientes" : "Conclusión: Las variables NO son independientes"}
            </p>
            {!isIndependent && (
              <>
                <p className="text-muted-foreground">
                  Hay celdas donde lo observado no coincide con lo esperado bajo independencia.
                  Esto significa que <strong>saber el valor de X sí te da información sobre Y</strong> (y viceversa).
                </p>
                <p className="text-muted-foreground">
                  Por ejemplo: si te dicen que X = 1, las frecuencias reales para Y son distintas de las que habría
                  si X e Y no tuvieran nada que ver. Las variables están relacionadas (aunque débilmente, como
                  confirma la covarianza pequeña).
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* --- BLOQUE 7: Ojo para el examen --- */}
        <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 mt-2">
          <CardContent className="p-3 text-sm space-y-1">
            <p className="font-semibold">Ojo para el examen</p>
            <p className="text-muted-foreground">
              <strong>Independientes → covarianza = 0</strong> (siempre cierto).
            </p>
            <p className="text-muted-foreground">
              <strong>Covarianza = 0 → ¿independientes?</strong> NO necesariamente. Puede haber dependencia no lineal
              (ej: Y = X², donde la covarianza puede ser 0 pero claramente Y depende de X).
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Independencia" value={isIndependent ? "Sí, son independientes" : "No son independientes"} />
      </StepCard>

      {/* ===== PASO 6: Varianzas ===== */}
      <StepCard stepNumber={6} title="Calcular varianzas (necesarias para la regresión)" variant="calculation">
        <FormulaDisplay math={`s_x^2 = \\overline{x^2} - \\bar{x}^2 = \\frac{${table.xValues.map((x, i) => `${x}^2 \\cdot ${table.marginalX[i]}`).join(" + ")}}{${table.n}} - ${round(xMean, 2)}^2 = ${round(momentOrigin(table, 2, 0), 4)} - ${round(xMean * xMean, 4)} = ${round(sx2, 4)}`} />

        <FormulaDisplay math={`s_y^2 = \\overline{y^2} - \\bar{y}^2 = \\frac{${table.yValues.map((y, j) => `${y}^2 \\cdot ${table.marginalY[j]}`).join(" + ")}}{${table.n}} - ${round(yMean, 2)}^2 = ${round(momentOrigin(table, 0, 2), 4)} - ${round(yMean * yMean, 4)} = ${round(sy2, 4)}`} />

        <div className="grid grid-cols-2 gap-2 mt-2">
          <ResultCard label="Varianza X" value={`sx² = ${round(sx2, 4)}`} />
          <ResultCard label="Varianza Y" value={`sy² = ${round(sy2, 4)}`} />
        </div>
      </StepCard>

      {/* ===== PASO 7: Rectas de regresión ===== */}
      <StepCard stepNumber={7} title="c) Rectas de regresión" variant="calculation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Recta Y/X (predecir Y dado X)</p>
              <FormulaDisplay math={`\\beta = \\frac{s_{xy}}{s_x^2} = \\frac{${round(sxy, 4)}}{${round(sx2, 4)}} = ${round(lineYX.beta, 4)}`} />
              <FormulaDisplay math={`\\alpha = \\bar{y} - \\beta \\bar{x} = ${round(yMean, 2)} - ${round(lineYX.beta, 4)} \\cdot ${round(xMean, 2)} = ${round(lineYX.alpha, 4)}`} />
              <FormulaDisplay math={`\\boxed{\\hat{y}(x) = ${round(lineYX.alpha, 4)} + ${round(lineYX.beta, 4)}x}`} />
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-3 text-sm space-y-2">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Recta X/Y (predecir X dado Y)</p>
              <FormulaDisplay math={`\\beta' = \\frac{s_{xy}}{s_y^2} = \\frac{${round(sxy, 4)}}{${round(sy2, 4)}} = ${round(lineXY.beta, 4)}`} />
              <FormulaDisplay math={`\\alpha' = \\bar{x} - \\beta' \\bar{y} = ${round(xMean, 2)} - ${round(lineXY.beta, 4)} \\cdot ${round(yMean, 2)} = ${round(lineXY.alpha, 4)}`} />
              <FormulaDisplay math={`\\boxed{\\hat{x}(y) = ${round(lineXY.alpha, 4)} + ${round(lineXY.beta, 4)}y}`} />
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mt-2">
          <CardContent className="p-3 text-sm">
            <p className="font-semibold text-amber-800 dark:text-amber-200">Interpretación</p>
            <p className="text-muted-foreground mt-1">
              <InlineMath math={`r = ${round(r, 4)}`} /> → correlación lineal muy débil y positiva.
              Las rectas son casi planas (pendientes muy pequeñas), lo que indica que X e Y apenas tienen relación lineal.
              Estas predicciones serían poco fiables.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ===== PASO 8: Visualización ===== */}
      <StepCard stepNumber={8} title="Diagrama de dispersión con rectas" variant="result">
        <ScatterChartCustom
          data={scatterData}
          title="Diagrama de dispersión con rectas de regresión"
          xLabel="X"
          yLabel="Y"
          gravityCenter={{ x: xMean, y: yMean }}
          regressionLines={[
            { slope: lineYX.beta, intercept: lineYX.alpha, label: "Recta Y/X", color: "#2563eb" },
            { slope: 1 / lineXY.beta, intercept: -lineXY.alpha / lineXY.beta, label: "Recta X/Y", color: "#16a34a" },
          ]}
          color="#0d9488"
        />
        <p className="text-xs text-muted-foreground mt-1">
          El punto rojo marca el centro de gravedad <InlineMath math={`(\\bar{x}, \\bar{y}) = (${round(xMean, 2)},\\, ${round(yMean, 2)})`} />.
          Ambas rectas pasan por él.
        </p>
      </StepCard>
    </ExerciseLayout>
  );
}
