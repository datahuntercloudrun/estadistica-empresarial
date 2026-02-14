"use client";

import { ExerciseLayout } from "@/components/stats/exercise-layout";
import { StepCard } from "@/components/stats/step-card";
import { FormulaDisplay } from "@/components/stats/formula-display";
import { ResultCard } from "@/components/stats/result-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { round } from "@/lib/stats/descriptive";

// Datos
const mate = { media: 4.68, varianza: 8.70, curtosis: -1.19, asimetria: 0.24 };
const estad = { media: 5.67, varianza: 4.19, curtosis: 0.04, asimetria: -0.43 };
const mateSigma = Math.sqrt(mate.varianza);
const estadSigma = Math.sqrt(estad.varianza);
const mateCV = (mateSigma / mate.media) * 100;
const estadCV = (estadSigma / estad.media) * 100;

// Deciles
const mateDeciles = [1.07, 2.03, 2.62, 3.08, 4.02, 5.43, 6.55, 8.10, 8.77];
const estadDeciles = [3.25, 3.96, 4.47, 5.11, 5.96, 6.30, 6.70, 7.70, 8.20];

export default function Ejercicio5() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber={5}
      title="Comparación de Calificaciones"
      difficulty="Alto"
      category="Análisis comparativo, CV, asimetría, curtosis"
      statement={
        <div className="space-y-2">
          <p>Se tienen las siguientes medidas de calificaciones:</p>
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medida</TableHead>
                  <TableHead className="text-center">Matemáticas</TableHead>
                  <TableHead className="text-center">Estadística</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>Media</TableCell><TableCell className="text-center">{mate.media}</TableCell><TableCell className="text-center">{estad.media}</TableCell></TableRow>
                <TableRow><TableCell>Varianza</TableCell><TableCell className="text-center">{mate.varianza}</TableCell><TableCell className="text-center">{estad.varianza}</TableCell></TableRow>
                <TableRow><TableCell>Curtosis</TableCell><TableCell className="text-center">{mate.curtosis}</TableCell><TableCell className="text-center">{estad.curtosis}</TableCell></TableRow>
                <TableRow><TableCell>Asimetría</TableCell><TableCell className="text-center">{mate.asimetria}</TableCell><TableCell className="text-center">{estad.asimetria}</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>
          <p>Un alumno obtiene un 5 en ambas. Se pide:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a) ¿Son representativas las medias? ¿Cuál goza de mayor representatividad?</li>
            <li>b) Si obtiene 5 en ambas, ¿en cuál está mejor posicionado?</li>
            <li>c) Nota de corte con el 30% de notas más altas en cada asignatura</li>
          </ul>
        </div>
      }
      prevUrl="/tema-3/ejercicio-4"
      nextUrl="/tema-3/ejercicio-6"
    >
      <StepCard stepNumber={1} title="a) Representatividad de las medias" variant="calculation">
        <p>Calculamos el coeficiente de variación para cada asignatura:</p>
        <FormulaDisplay math={`\\sigma_{Mat} = \\sqrt{${mate.varianza}} = ${round(mateSigma, 4)}`} />
        <FormulaDisplay math={`CV_{Mat} = \\frac{${round(mateSigma, 4)}}{${mate.media}} \\times 100 = ${round(mateCV, 2)}\\%`} />
        <FormulaDisplay math={`\\sigma_{Est} = \\sqrt{${estad.varianza}} = ${round(estadSigma, 4)}`} />
        <FormulaDisplay math={`CV_{Est} = \\frac{${round(estadSigma, 4)}}{${estad.media}} \\times 100 = ${round(estadCV, 2)}\\%`} />
        <p className="text-sm">
          En general, si CV &lt; 50%, la media es representativa. Además, <strong>menor CV = mayor representatividad</strong>.
        </p>
        <ResultCard label="Mayor representatividad" value={`Estadística (CV=${round(estadCV, 2)}% < ${round(mateCV, 2)}%)`} />
      </StepCard>

      <StepCard stepNumber={2} title="b) Posición relativa con nota 5" variant="calculation">
        <p>Tipificamos la nota 5 en cada asignatura para comparar:</p>
        <FormulaDisplay math={`z_{Mat} = \\frac{5 - ${mate.media}}{${round(mateSigma, 4)}} = \\frac{${round(5 - mate.media, 2)}}{${round(mateSigma, 4)}} = ${round((5 - mate.media) / mateSigma, 4)}`} />
        <FormulaDisplay math={`z_{Est} = \\frac{5 - ${estad.media}}{${round(estadSigma, 4)}} = \\frac{${round(5 - estad.media, 2)}}{${round(estadSigma, 4)}} = ${round((5 - estad.media) / estadSigma, 4)}`} />
        <p className="text-sm">
          Un valor tipificado mayor indica mejor posición relativa dentro de la distribución.
        </p>
        <ResultCard
          label="Mejor posicionado en"
          value={`Matemáticas (z=${round((5 - mate.media) / mateSigma, 4)} > z=${round((5 - estad.media) / estadSigma, 4)})`}
        />
        <p className="text-xs text-muted-foreground">
          En Matemáticas, un 5 está por encima de la media (4.68), mientras que en Estadística está por debajo (5.67).
        </p>
      </StepCard>

      <StepCard stepNumber={3} title="c) Nota de corte (30% más altas)" variant="calculation">
        <p>El 30% de notas más altas corresponde al percentil 70, es decir, el <strong>decil 7 (D7)</strong>:</p>
        <FormulaDisplay math={`D_7^{Mat} = ${mateDeciles[6]}`} />
        <FormulaDisplay math={`D_7^{Est} = ${estadDeciles[6]}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ResultCard label="Nota de corte Matemáticas" value={`${mateDeciles[6]}`} />
          <ResultCard label="Nota de corte Estadística" value={`${estadDeciles[6]}`} />
        </div>
      </StepCard>
    </ExerciseLayout>
  );
}
