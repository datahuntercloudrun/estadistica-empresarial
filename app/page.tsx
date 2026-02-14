import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, BarChart3, Calculator } from "lucide-react";
import Link from "next/link";

const temas = [
  {
    numero: 1,
    titulo: "Introducción a la Estadística",
    descripcion: "Conceptos básicos, población y muestra, método estadístico, fenómenos deterministas y aleatorios.",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    ejercicios: 0,
    url: "/tema-1",
    temas: ["Concepto de Estadística", "Método Estadístico", "Población y Muestra", "Estadística Económica"],
  },
  {
    numero: 2,
    titulo: "El Mundo de los Datos",
    descripcion: "Variables estadísticas, distribuciones de frecuencias, distribuciones bivariantes y representaciones gráficas.",
    icon: BarChart3,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    ejercicios: 7,
    url: "/tema-2",
    temas: ["Tipos de Variables", "Distribuciones de Frecuencias", "Datos Agrupados", "Distribuciones Bivariantes", "Gráficos Estadísticos"],
  },
  {
    numero: 3,
    titulo: "Análisis Estadístico",
    descripcion: "Medidas de posición, dispersión y forma. Media, mediana, moda, varianza, cuartiles, asimetría y curtosis.",
    icon: Calculator,
    color: "text-violet-500",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    ejercicios: 11,
    url: "/tema-3",
    temas: ["Media, Mediana y Moda", "Cuartiles y Percentiles", "Varianza y Desviación Típica", "Coeficiente de Variación", "Asimetría y Curtosis", "Tipificación"],
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Estadística Empresarial I</h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Ejercicios resueltos paso a paso con visualizaciones interactivas
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {temas.map((tema) => (
          <Link key={tema.numero} href={tema.url}>
            <Card className={`h-full transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer border ${tema.borderColor}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${tema.bgColor}`}>
                    <tema.icon className={`h-6 w-6 ${tema.color}`} />
                  </div>
                  {tema.ejercicios > 0 && (
                    <Badge variant="secondary">
                      {tema.ejercicios} ejercicios
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">Tema {tema.numero}</CardTitle>
                <CardDescription className="font-medium text-foreground/80">
                  {tema.titulo}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {tema.descripcion}
                </p>
                <div className="flex flex-wrap gap-1">
                  {tema.temas.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sobre esta aplicación</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Esta aplicación resuelve los ejercicios de Estadística Empresarial I de forma visual e intuitiva.
            Cada ejercicio incluye:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Enunciado completo del ejercicio</li>
            <li>Resolución paso a paso con explicaciones claras</li>
            <li>Fórmulas matemáticas renderizadas</li>
            <li>Gráficos interactivos para visualizar los datos</li>
            <li>Resultados destacados y verificados</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
