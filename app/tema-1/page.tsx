import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FlaskConical, Users, TrendingUp, Lightbulb, Target } from "lucide-react";

export default function Tema1Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-100 text-blue-800">Tema 1</Badge>
          <Badge variant="outline">Teoría</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Introducción a la Estadística</h1>
        <p className="text-muted-foreground">Conceptos fundamentales, método estadístico, población y muestra</p>
      </div>

      {/* Qué es la Estadística */}
      <Card className="border-l-4 border-l-blue-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            ¿Qué es la Estadística?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            La <strong>Estadística</strong> es la ciencia que se encarga de la <strong>sistematización, recogida,
            ordenación y presentación</strong> de datos referentes a fenómenos con variabilidad o incertidumbre,
            para su estudio metódico, con el fin de deducir leyes, hacer previsiones y tomar decisiones.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-1">Estadística Descriptiva</h4>
                <p className="text-xs text-blue-700">Recogida, representación y análisis de datos de la muestra. Estudia sucesos que han ocurrido.</p>
              </CardContent>
            </Card>
            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-indigo-800 mb-1">Teoría de la Probabilidad</h4>
                <p className="text-xs text-indigo-700">Técnicas matemáticas para manejar la incertidumbre. Fase deductiva.</p>
              </CardContent>
            </Card>
            <Card className="bg-violet-50 border-violet-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-violet-800 mb-1">Inferencia Estadística</h4>
                <p className="text-xs text-violet-700">Trasladar resultados de la muestra a la población. Fase inductiva.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Fenómenos */}
      <Card className="border-l-4 border-l-emerald-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-emerald-500" />
            Fenómenos Observables
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Fenómenos Deterministas</h4>
                <p className="text-muted-foreground text-xs mb-2">
                  Realizados siempre en las mismas condiciones, proporcionan <strong>siempre los mismos resultados</strong>.
                </p>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">Caída libre de un objeto</Badge>
                  <Badge variant="outline" className="text-xs">Cambio de estado físico</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Fenómenos Aleatorios</h4>
                <p className="text-muted-foreground text-xs mb-2">
                  Realizados en las mismas condiciones, <strong>NO siempre</strong> proporcionan los mismos resultados.
                </p>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">Juegos de azar</Badge>
                  <Badge variant="outline" className="text-xs">Comportamiento del consumidor</Badge>
                  <Badge variant="outline" className="text-xs">Duración de un viaje</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Fuentes de Aleatoridad</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium">1. Referencia al futuro</p>
                  <p className="text-xs text-muted-foreground">Incertidumbre de un resultado que aún no se ha producido</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium">2. Información incompleta</p>
                  <p className="text-xs text-muted-foreground">No se dispone de todos los datos del fenómeno</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium">3. Información defectuosa</p>
                  <p className="text-xs text-muted-foreground">Parte de la información se ha perdido</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium">4. Errores de medición</p>
                  <p className="text-xs text-muted-foreground">Aunque el fenómeno sea determinista, la medición introduce error</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Método Estadístico */}
      <Card className="border-l-4 border-l-violet-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-violet-500" />
            Método Estadístico
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="space-y-3">
            {[
              { step: 1, title: "Plantear hipótesis", desc: "Formular la pregunta sobre la población" },
              { step: 2, title: "Diseñar el experimento", desc: "Decidir qué individuos y qué datos recoger" },
              { step: 3, title: "Recoger los datos", desc: "Muestreo: obtener los datos de la muestra" },
              { step: 4, title: "Describir los datos", desc: "Resumir y organizar la información obtenida" },
              { step: 5, title: "Realizar inferencia", desc: "Trasladar conclusiones de la muestra a la población" },
              { step: 6, title: "Cuantificar la confianza", desc: "Medir la fiabilidad de las conclusiones" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-sm font-bold">
                  {item.step}
                </span>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Población y Muestra */}
      <Card className="border-l-4 border-l-amber-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-amber-500" />
            Población y Muestra
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Población</h4>
                <p className="text-xs text-blue-700">
                  Conjunto de <strong>todos los elementos</strong> portadores de características que nos interesa estudiar.
                  Debe estar definida con absoluta precisión.
                </p>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  Investigación exhaustiva = Censo
                </p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-emerald-800 mb-2">Muestra</h4>
                <p className="text-xs text-emerald-700">
                  <strong>Subconjunto</strong> de la población al que tenemos acceso y sobre el que hacemos las observaciones.
                  Debe ser representativa.
                </p>
                <p className="text-xs text-emerald-600 mt-2 font-medium">
                  Investigación parcial = Estudio muestral
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Diagrama visual */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm h-48">
              <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                <span className="absolute top-1 left-2 text-xs text-gray-400">Grupo de elementos</span>
                <div className="w-4/5 h-36 border-2 border-blue-300 bg-blue-50/50 rounded-lg relative flex items-center justify-center">
                  <span className="absolute top-1 left-2 text-xs text-blue-500 font-medium">Población (N)</span>
                  <div className="w-24 h-24 border-2 border-emerald-400 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-xs text-emerald-700 font-bold">Muestra (n)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadística Económica */}
      <Card className="border-l-4 border-l-rose-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-rose-500" />
            Estadística en la Economía
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="mb-4">El fenómeno económico es intrínsecamente aleatorio: no es determinista ni experimentable.</p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { area: "Contabilidad", ejemplo: "Selección de muestras en auditoría, análisis de costes" },
              { area: "Área Financiera", ejemplo: "Elección de carteras de inversión, tendencias financieras" },
              { area: "Producción", ejemplo: "Control de calidad" },
              { area: "Marketing", ejemplo: "Estudios de mercado, estrategias publicitarias" },
            ].map((item) => (
              <Card key={item.area} className="bg-gray-50">
                <CardContent className="p-3">
                  <p className="font-medium text-sm">{item.area}</p>
                  <p className="text-xs text-muted-foreground">{item.ejemplo}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
