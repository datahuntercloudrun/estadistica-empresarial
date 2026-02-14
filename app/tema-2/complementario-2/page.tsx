"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay, InlineMath } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { BarChartCustom } from "@/components/charts/bar-chart-custom";
import { HistogramChart } from "@/components/charts/histogram-chart";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

// ===== DATOS =====
const data = [
  { interval: "0-100", empresas: 25 },
  { interval: "100-200", empresas: 37 },
  { interval: "200-300", empresas: 12 },
  { interval: "300-400", empresas: 20 },
  { interval: "400-500", empresas: 22 },
  { interval: "500-600", empresas: 21 },
  { interval: "600-700", empresas: 13 },
  { interval: "700-800", empresas: 5 },
  { interval: "800-900", empresas: 3 },
  { interval: "900-1000", empresas: 2 },
];

const totalEmpresas = data.reduce((sum, d) => sum + d.empresas, 0);

// a) Empresas con más de 200 puestos
const intervalosMas200 = data.filter((d) => {
  const lower = parseInt(d.interval.split("-")[0]);
  return lower >= 200;
});
const masde200 = intervalosMas200.reduce((sum, d) => sum + d.empresas, 0);

// b) Empresas con más de 100 y menos de 400 puestos
const intervalos100a400 = data.filter((d) => {
  const lower = parseInt(d.interval.split("-")[0]);
  return lower >= 100 && lower < 400;
});
const entre100y400 = intervalos100a400.reduce((sum, d) => sum + d.empresas, 0);
const porcentaje100a400 = (entre100y400 / totalEmpresas) * 100;

// Frecuencias relativas y acumuladas para la tabla completa
const tablaCompleta = data.map((d, i) => {
  const Ni = data.slice(0, i + 1).reduce((sum, r) => sum + r.empresas, 0);
  const fi = d.empresas / totalEmpresas;
  const Fi = Ni / totalEmpresas;
  return {
    ...d,
    ni: d.empresas,
    fi,
    Ni,
    Fi,
    fiPct: fi * 100,
    FiPct: Fi * 100,
  };
});

export default function Complementario2() {
  return (
    <ExerciseLayout
      tema={2}
      exerciseNumber="C2"
      title="Puestos de Trabajo en Empresas"
      difficulty="Bajo-Medio"
      category="Distribuciones de frecuencias"
      statement={
        <div className="space-y-2">
          <p>Tomada al azar una muestra de 160 pequenas y medianas empresas, se obtuvo la siguiente distribucion:</p>
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Puestos de trabajo</TableHead>
                  <TableHead className="text-center">N.o de empresas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell>{d.interval}</TableCell>
                    <TableCell className="text-center">{d.empresas}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-semibold bg-muted/50">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-center">{totalEmpresas}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <p>Se pide:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) Numero de empresas con mas de 200 puestos de trabajo</li>
            <li>b) Empresas con mas de 100 y menos de 400 puestos (en %)</li>
            <li>c) Represente graficamente la distribucion</li>
          </ul>
        </div>
      }
      prevUrl="/tema-2/complementario-1"
      nextUrl="/tema-3/ejercicio-1"
    >
      {/* ============ PASO 0: ¿Que vamos a aprender? ============ */}
      <StepCard stepNumber={1} title="¿Que vamos a aprender en este ejercicio?" variant="explanation">
        <p>
          Este ejercicio nos ensena a <strong>leer e interpretar una distribucion de frecuencias ya construida</strong>.
          Es decir, los datos ya estan agrupados en intervalos y solo debemos extraer informacion de la tabla.
        </p>
        <Card className="bg-amber-50 border-amber-200 mt-2">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">¿Que es una distribucion de frecuencias agrupada?</p>
            <p className="text-muted-foreground">
              Imagina que preguntas a 160 empresas cuantos empleados tienen. Obtendrias 160 numeros distintos.
              Trabajar con 160 datos individuales es incomodo, asi que se <strong>agrupan en intervalos</strong>
              (0-100, 100-200, etc.) y se cuenta cuantas empresas caen en cada intervalo.
            </p>
            <p className="text-muted-foreground">
              Eso es exactamente lo que nos da el enunciado: una tabla donde cada fila dice
              &quot;hay X empresas que tienen entre Y y Z empleados&quot;.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200 mt-2">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">Las tres habilidades clave de este ejercicio</p>
            <div className="space-y-1 text-muted-foreground">
              <p><strong>1. Identificar intervalos relevantes:</strong> Dado un rango (por ejemplo &quot;mas de 200&quot;), saber cuales filas de la tabla usar.</p>
              <p><strong>2. Sumar frecuencias:</strong> Una vez identificados los intervalos, sumar las frecuencias absolutas para obtener el total.</p>
              <p><strong>3. Convertir a porcentaje:</strong> Dividir el resultado entre el total y multiplicar por 100.</p>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 1: Tabla completa de frecuencias ============ */}
      <StepCard stepNumber={2} title="Tabla completa de frecuencias" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Por que construir la tabla completa?</p>
            <p className="text-muted-foreground">
              El enunciado solo da las <strong>frecuencias absolutas</strong> (<InlineMath math="n_i" />). Para responder
              a las preguntas, conviene anadir las <strong>frecuencias relativas</strong> (<InlineMath math="f_i" />) y las
              <strong> frecuencias acumuladas</strong> (<InlineMath math="N_i" /> y <InlineMath math="F_i" />).
              Asi tendremos toda la informacion a mano.
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Puestos</TableHead>
                <TableHead className="text-center"><InlineMath math="n_i" /></TableHead>
                <TableHead className="text-center"><InlineMath math="f_i" /></TableHead>
                <TableHead className="text-center"><InlineMath math="f_i\%" /></TableHead>
                <TableHead className="text-center"><InlineMath math="N_i" /></TableHead>
                <TableHead className="text-center"><InlineMath math="F_i" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tablaCompleta.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs">{row.interval}</TableCell>
                  <TableCell className="text-center">{row.ni}</TableCell>
                  <TableCell className="text-center">{row.fi.toFixed(4)}</TableCell>
                  <TableCell className="text-center">{row.fiPct.toFixed(2)}%</TableCell>
                  <TableCell className="text-center">{row.Ni}</TableCell>
                  <TableCell className="text-center">{row.Fi.toFixed(4)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-semibold bg-muted/50">
                <TableCell>Total</TableCell>
                <TableCell className="text-center">{totalEmpresas}</TableCell>
                <TableCell className="text-center">1.0000</TableCell>
                <TableCell className="text-center">100%</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        <Card className="bg-blue-50 border-blue-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">Recordatorio: ¿que significa cada columna?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <div className="bg-white rounded p-2 text-[10px] space-y-1">
                <p><InlineMath math="n_i" /> = <strong>Frecuencia absoluta:</strong> cuantas empresas hay en ese intervalo.</p>
                <p><InlineMath math="f_i" /> = <strong>Frecuencia relativa:</strong> proporcion del total (<InlineMath math="f_i = n_i / n" />).</p>
              </div>
              <div className="bg-white rounded p-2 text-[10px] space-y-1">
                <p><InlineMath math="N_i" /> = <strong>Frec. absoluta acumulada:</strong> cuantas empresas hay hasta ese intervalo (inclusive).</p>
                <p><InlineMath math="F_i" /> = <strong>Frec. relativa acumulada:</strong> proporcion acumulada (<InlineMath math="F_i = N_i / n" />).</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 2: a) Empresas con mas de 200 puestos ============ */}
      <StepCard stepNumber={3} title="a) Empresas con mas de 200 puestos de trabajo" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Cual es la logica de este apartado?</p>
            <p className="text-muted-foreground">
              Nos piden las empresas con <strong>mas de 200 puestos</strong>. Esto significa que debemos identificar
              todos los intervalos cuyo <strong>limite inferior sea 200 o mas</strong>.
            </p>
            <p className="text-muted-foreground">
              ¿Por que el limite inferior? Porque el intervalo [200, 300) contiene a todas las empresas con 200
              o mas puestos (y menos de 300). Si una empresa tiene exactamente 200 empleados, cae en este intervalo.
              Asi que todos los intervalos desde [200, 300) en adelante cuentan.
            </p>
          </CardContent>
        </Card>

        <p className="text-sm font-medium mb-2">Identificamos los intervalos relevantes:</p>

        <Card className="overflow-hidden mb-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intervalo</TableHead>
                <TableHead className="text-center"><InlineMath math="n_i" /></TableHead>
                <TableHead className="text-center">¿Incluir?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((d, i) => {
                const lower = parseInt(d.interval.split("-")[0]);
                const incluir = lower >= 200;
                return (
                  <TableRow key={i} className={incluir ? "bg-emerald-50" : "opacity-50"}>
                    <TableCell className="text-xs">{d.interval}</TableCell>
                    <TableCell className="text-center">{d.empresas}</TableCell>
                    <TableCell className="text-center">
                      {incluir ? (
                        <Badge className="bg-emerald-100 text-emerald-800 text-xs">Si</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">No</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>

        <Card className="bg-amber-50 border-amber-200 mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">Truco: usar la frecuencia acumulada</p>
            <p className="text-muted-foreground">
              Otra forma de resolverlo: las empresas con mas de 200 puestos son
              <strong> todas menos las que tienen 200 o menos</strong>.
              Sabemos que <InlineMath math="N_2" /> (acumulada hasta el intervalo [100, 200)) = {tablaCompleta[0].Ni + tablaCompleta[1].ni} empresas.
            </p>
            <FormulaDisplay math={`\\text{Empresas con mas de 200} = n - N_2 = ${totalEmpresas} - ${tablaCompleta[0].ni + tablaCompleta[1].ni} = ${masde200}`} />
          </CardContent>
        </Card>

        <p className="text-sm mb-2">Sumamos las frecuencias de los intervalos seleccionados:</p>
        <FormulaDisplay math={`\\text{Empresas (>200)} = ${intervalosMas200.map(d => d.empresas).join(" + ")} = ${masde200}`} />

        <Card className="bg-blue-50 border-blue-200 mt-3 mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">Interpretacion</p>
            <p className="text-muted-foreground">
              De las 160 empresas encuestadas, <strong>{masde200}</strong> tienen mas de 200 empleados.
              Esto representa el <strong>{((masde200 / totalEmpresas) * 100).toFixed(2)}%</strong> de la muestra.
              Es decir, aproximadamente <strong>6 de cada 10</strong> empresas de la muestra son medianas
              o grandes (con mas de 200 trabajadores).
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Empresas con mas de 200 puestos" value={`${masde200} empresas (${((masde200 / totalEmpresas) * 100).toFixed(2)}% del total)`} />
      </StepCard>

      {/* ============ PASO 3: b) Empresas entre 100 y 400 puestos ============ */}
      <StepCard stepNumber={4} title="b) Empresas entre 100 y 400 puestos (en porcentaje)" variant="calculation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold">¿Cual es la logica de este apartado?</p>
            <p className="text-muted-foreground">
              Ahora nos piden las empresas con <strong>mas de 100 y menos de 400 puestos</strong>.
              Esto implica identificar los intervalos que caen <em>completamente</em> dentro de ese rango:
              [100, 200), [200, 300) y [300, 400).
            </p>
            <p className="text-muted-foreground">
              Ademas, el resultado debe estar <strong>en porcentaje</strong>, asi que tras sumar
              las frecuencias absolutas, dividiremos entre el total (n = {totalEmpresas}) y multiplicaremos por 100.
            </p>
          </CardContent>
        </Card>

        <p className="text-sm font-medium mb-2">Paso 1: Identificar los intervalos</p>

        <Card className="overflow-hidden mb-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intervalo</TableHead>
                <TableHead className="text-center"><InlineMath math="n_i" /></TableHead>
                <TableHead className="text-center">¿Incluir?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((d, i) => {
                const lower = parseInt(d.interval.split("-")[0]);
                const incluir = lower >= 100 && lower < 400;
                return (
                  <TableRow key={i} className={incluir ? "bg-violet-50" : "opacity-50"}>
                    <TableCell className="text-xs">{d.interval}</TableCell>
                    <TableCell className="text-center">{d.empresas}</TableCell>
                    <TableCell className="text-center">
                      {incluir ? (
                        <Badge className="bg-violet-100 text-violet-800 text-xs">Si</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">No</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>

        <p className="text-sm font-medium mb-2">Paso 2: Sumar frecuencias absolutas</p>
        <FormulaDisplay math={`\\text{Empresas (100-400)} = ${intervalos100a400.map(d => d.empresas).join(" + ")} = ${entre100y400}`} />

        <p className="text-sm font-medium mb-2 mt-3">Paso 3: Convertir a porcentaje</p>

        <Card className="bg-amber-50 border-amber-200 mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold text-amber-800">¿Como se calcula un porcentaje a partir de frecuencias?</p>
            <p className="text-muted-foreground">
              El porcentaje responde a la pregunta: <em>&quot;de cada 100 empresas, ¿cuantas estan en este rango?&quot;</em>
            </p>
            <FormulaDisplay math={`\\text{Porcentaje} = \\frac{n_i \\text{ (del rango)}}{n \\text{ (total)}} \\times 100`} />
            <p className="text-muted-foreground">
              Esto es lo mismo que calcular la <strong>frecuencia relativa</strong> (<InlineMath math="f_i" />) y multiplicar por 100.
              Es decir, la frecuencia relativa ya es la proporcion, y el porcentaje es esa proporcion expresada &quot;de cada 100&quot;.
            </p>
          </CardContent>
        </Card>

        <FormulaDisplay math={`\\text{Porcentaje} = \\frac{${entre100y400}}{${totalEmpresas}} \\times 100 = ${porcentaje100a400.toFixed(2)}\\%`} />

        <Card className="bg-blue-50 border-blue-200 mt-3 mb-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">Interpretacion</p>
            <p className="text-muted-foreground">
              El <strong>{porcentaje100a400.toFixed(2)}%</strong> de las empresas encuestadas tiene entre 100 y 400 empleados.
              Dicho de otro modo, aproximadamente <strong>{entre100y400} de cada {totalEmpresas}</strong> empresas
              se encuentran en ese rango de tamano.
            </p>
            <p className="text-muted-foreground">
              Esto nos indica que un porcentaje significativo de la muestra corresponde a empresas
              de tamano &quot;medio&quot; (ni las mas pequenas, ni las mas grandes).
            </p>
          </CardContent>
        </Card>

        <ResultCard label="Empresas entre 100 y 400 puestos" value={`${entre100y400} empresas = ${porcentaje100a400.toFixed(2)}%`} />
      </StepCard>

      {/* ============ PASO 4: c) Representacion grafica ============ */}
      <StepCard stepNumber={5} title="c) Representacion grafica de la distribucion" variant="explanation">
        <Card className="bg-gray-50 border mb-3">
          <CardContent className="p-3 text-xs space-y-2">
            <p className="font-semibold">¿Que tipo de grafico es apropiado y por que?</p>
            <p className="text-muted-foreground">
              Tenemos una variable <strong>cuantitativa continua agrupada en intervalos</strong>
              (el numero de puestos de trabajo). El grafico adecuado para este tipo de datos es el
              <strong> histograma</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-2 text-[10px] space-y-1">
                  <p className="font-semibold text-emerald-800">¿Por que histograma y no diagrama de barras?</p>
                  <p className="text-muted-foreground">
                    Porque los datos estan en <strong>intervalos consecutivos</strong> (0-100, 100-200, ...).
                    Los intervalos no tienen &quot;huecos&quot; entre ellos: donde termina uno, empieza el siguiente.
                    Por eso las barras del histograma van <strong>pegadas</strong>.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-2 text-[10px] space-y-1">
                  <p className="font-semibold text-blue-800">¿Que nos muestra el histograma?</p>
                  <p className="text-muted-foreground">
                    Nos permite ver de un vistazo <strong>como se distribuyen</strong> las empresas segun
                    su tamano. ¿La mayoria son pequenas? ¿Hay muchas grandes? ¿La distribucion es simetrica?
                    Todo esto se responde visualmente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <HistogramChart
          data={data.map((d) => ({ interval: d.interval, frequency: d.empresas }))}
          title="Histograma: Distribucion de puestos de trabajo por empresas"
          xLabel="Puestos de trabajo"
          yLabel="N.o de empresas"
        />

        <Card className="bg-blue-50 border-blue-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-blue-800">Lectura del histograma</p>
            <p className="text-muted-foreground">
              El histograma muestra claramente que la distribucion esta <strong>sesgada a la derecha</strong>
              (asimetria positiva): la mayoria de empresas tienen pocos empleados (concentradas en los primeros
              intervalos) y solo unas pocas tienen muchos empleados (la cola se extiende hacia la derecha).
            </p>
            <p className="text-muted-foreground">
              El intervalo con mas empresas es <strong>[100, 200)</strong> con {data[1].empresas} empresas,
              seguido de <strong>[0, 100)</strong> con {data[0].empresas} empresas.
              Solo {data[7].empresas + data[8].empresas + data[9].empresas} empresas tienen mas de 700 empleados.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 5: Visualizacion complementaria ============ */}
      <StepCard stepNumber={6} title="Visualizacion complementaria: frecuencias relativas" variant="explanation">
        <p className="text-xs text-muted-foreground mb-3">
          Ademas del histograma de frecuencias absolutas, es util ver las <strong>frecuencias relativas (porcentajes)</strong>,
          ya que permiten interpretar mejor el peso de cada intervalo sobre el total.
        </p>

        <BarChartCustom
          data={tablaCompleta.map((d) => ({
            name: d.interval,
            value: parseFloat(d.fiPct.toFixed(2)),
            color: parseInt(d.interval.split("-")[0]) >= 100 && parseInt(d.interval.split("-")[0]) < 400
              ? "hsl(var(--chart-3))"
              : "hsl(var(--chart-1))",
          }))}
          title="Distribucion porcentual de empresas por puestos de trabajo"
          xLabel="Puestos de trabajo"
          yLabel="Porcentaje (%)"
        />

        <Card className="bg-amber-50 border-amber-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-amber-800">¿Que significan los colores?</p>
            <p className="text-muted-foreground">
              Las barras destacadas corresponden a los intervalos del apartado b) (empresas entre 100 y 400 puestos),
              que suman el <strong>{porcentaje100a400.toFixed(2)}%</strong> del total.
            </p>
          </CardContent>
        </Card>
      </StepCard>

      {/* ============ PASO 6: Resumen ============ */}
      <StepCard stepNumber={7} title="Resumen: ¿que hemos aprendido?" variant="result">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 text-xs space-y-3">
            <p className="font-semibold text-blue-800">Habilidades practicadas en este ejercicio</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Badge className="bg-emerald-100 text-emerald-800 shrink-0">1</Badge>
                <p className="text-muted-foreground">
                  <strong>Lectura de tabla de frecuencias:</strong> Sabemos identificar que filas de la tabla
                  corresponden a un rango concreto (&quot;mas de 200&quot;, &quot;entre 100 y 400&quot;).
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-emerald-100 text-emerald-800 shrink-0">2</Badge>
                <p className="text-muted-foreground">
                  <strong>Suma selectiva de frecuencias:</strong> Para responder &quot;¿cuantas empresas cumplen X?&quot;,
                  basta sumar las <InlineMath math="n_i" /> de los intervalos relevantes.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-emerald-100 text-emerald-800 shrink-0">3</Badge>
                <p className="text-muted-foreground">
                  <strong>Conversion a porcentaje:</strong> <InlineMath math="\text{Porcentaje} = \frac{\text{parte}}{\text{total}} \times 100" />.
                  Es la frecuencia relativa expresada como porcentaje.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-emerald-100 text-emerald-800 shrink-0">4</Badge>
                <p className="text-muted-foreground">
                  <strong>Eleccion de grafico:</strong> Para datos cuantitativos continuos agrupados en intervalos,
                  el grafico adecuado es el <strong>histograma</strong> (barras pegadas).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-emerald-800">{masde200}</p>
              <p className="text-xs text-muted-foreground">empresas con mas de 200 puestos</p>
              <Badge className="bg-emerald-200 text-emerald-800 mt-1 text-[10px]">
                {((masde200 / totalEmpresas) * 100).toFixed(1)}% del total
              </Badge>
            </CardContent>
          </Card>
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-violet-800">{porcentaje100a400.toFixed(2)}%</p>
              <p className="text-xs text-muted-foreground">empresas entre 100 y 400 puestos</p>
              <Badge className="bg-violet-200 text-violet-800 mt-1 text-[10px]">
                {entre100y400} de {totalEmpresas} empresas
              </Badge>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-amber-800">100-200</p>
              <p className="text-xs text-muted-foreground">intervalo mas frecuente (moda)</p>
              <Badge className="bg-amber-200 text-amber-800 mt-1 text-[10px]">
                {data[1].empresas} empresas
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-rose-50 border-rose-200 mt-3">
          <CardContent className="p-3 text-xs space-y-1">
            <p className="font-semibold text-rose-800">Conclusion sobre la muestra</p>
            <p className="text-muted-foreground">
              La distribucion de puestos de trabajo en estas 160 PYMES muestra una <strong>clara asimetria positiva</strong>:
              la mayoria de empresas son pequenas (menos de 200 empleados), mientras que pocas empresas
              superan los 700 empleados. Esto es tipico en el tejido empresarial real, donde las pequenas empresas
              son mucho mas numerosas que las grandes.
            </p>
          </CardContent>
        </Card>
      </StepCard>
    </ExerciseLayout>
  );
}
