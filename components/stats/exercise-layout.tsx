import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExerciseLayoutProps {
  tema: number;
  exerciseNumber: number | string;
  title: string;
  difficulty: "Bajo" | "Bajo-Medio" | "Medio" | "Medio-Alto" | "Alto";
  category: string;
  statement: React.ReactNode;
  children: React.ReactNode;
  prevUrl?: string;
  nextUrl?: string;
}

const difficultyColors: Record<string, string> = {
  "Bajo": "bg-green-100 text-green-800",
  "Bajo-Medio": "bg-lime-100 text-lime-800",
  "Medio": "bg-yellow-100 text-yellow-800",
  "Medio-Alto": "bg-orange-100 text-orange-800",
  "Alto": "bg-red-100 text-red-800",
};

const temaColors: Record<number, string> = {
  1: "bg-blue-100 text-blue-800",
  2: "bg-emerald-100 text-emerald-800",
  3: "bg-violet-100 text-violet-800",
};

export function ExerciseLayout({
  tema,
  exerciseNumber,
  title,
  difficulty,
  category,
  statement,
  children,
  prevUrl,
  nextUrl,
}: ExerciseLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge className={temaColors[tema]}>Tema {tema}</Badge>
        <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
        <Badge variant="outline">{category}</Badge>
      </div>

      <h1 className="text-2xl font-bold">
        Ejercicio {exerciseNumber}: {title}
      </h1>

      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Enunciado</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          {statement}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Resolución paso a paso</h2>
        {children}
      </div>

      <div className="flex justify-between pt-4 border-t">
        {prevUrl ? (
          <Button variant="outline" asChild>
            <Link href={prevUrl}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Link>
          </Button>
        ) : <div />}
        {nextUrl ? (
          <Button variant="outline" asChild>
            <Link href={nextUrl}>
              Siguiente
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        ) : <div />}
      </div>
    </div>
  );
}
