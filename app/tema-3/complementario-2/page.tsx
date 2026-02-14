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

const mate = { media: 5.51, varianza: 11.07, cv: 60, asimetria: -0.03, curtosis: -1.26 };
const estad = { media: 6.11, varianza: 10.34, cv: 53, asimetria: -0.33, curtosis: -1.03 };

// Alumno R.C.: 6 en Mate, 7 en Estad
const mateSigma = Math.sqrt(mate.varianza);
const estadSigma = Math.sqrt(estad.varianza);
const zMate = (6 - mate.media) / mateSigma;
const zEstad = (7 - estad.media) / estadSigma;

export default function Complementario2() {
  return (
    <ExerciseLayout
      tema={3}
      exerciseNumber="C2"
      title="Comparación de Calificaciones"
      difficulty="Medio-Alto"
      category="Análisis comparativo, CV, asimetría, curtosis"
      statement={
        <div className="space-y-2">
          <p>La siguiente tabla contiene medidas sobre calificaciones en dos asignaturas:</p>
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
                <TableRow><TableCell>CV</TableCell><TableCell className="text-center">{mate.cv}%</TableCell><TableCell className="text-center">{estad.cv}%</TableCell></TableRow>
                <TableRow><TableCell>Asimetría</TableCell><TableCell className="text-center">{mate.asimetria}</TableCell><TableCell className="text-center">{estad.asimetria}</TableCell></TableRow>
                <TableRow><TableCell>Curtosis</TableCell><TableCell className="text-center">{mate.curtosis}</TableCell><TableCell className="text-center">{estad.curtosis}</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>
          <p>Alumno R.C. obtuvo 6 en Matemáticas y 7 en Estadística.</p>
          <p>Comentar dispersión y forma de ambas distribuciones, así como la posición relativa de R.C.</p>
        </div>
      }
      prevUrl="/tema-3/complementario-1"
      nextUrl="/tema-3/complementario-3"
    >
      <StepCard stepNumber={1} title="Análisis de dispersión" variant="calculation">
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <p className="font-semibold text-sm mb-2">Matemáticas</p>
              <p className="text-xs">CV = {mate.cv}% &gt; 50%</p>
              <p className="text-xs text-muted-foreground">La media NO es muy representativa (alta dispersión relativa)</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-3">
              <p className="font-semibold text-sm mb-2">Estadística</p>
              <p className="text-xs">CV = {estad.cv}% &gt; 50%</p>
              <p className="text-xs text-muted-foreground">La media tampoco es muy representativa, aunque algo más que en Matemáticas</p>
            </CardContent>
          </Card>
        </div>
        <ResultCard label="Mayor dispersión relativa" value={`Matemáticas (CV=${mate.cv}% > ${estad.cv}%)`} />
      </StepCard>

      <StepCard stepNumber={2} title="Análisis de asimetría" variant="calculation">
        <FormulaDisplay math={`g_{f,Mat} = ${mate.asimetria} \\approx 0 \\implies \\text{Casi simétrica}`} />
        <FormulaDisplay math={`g_{f,Est} = ${estad.asimetria} < 0 \\implies \\text{Asimetría negativa (sesgo izquierdo)}`} />
        <p className="text-sm">
          <strong>Matemáticas:</strong> Distribución prácticamente simétrica.
          <strong> Estadística:</strong> Asimetría negativa - hay más notas altas concentradas.
        </p>
      </StepCard>

      <StepCard stepNumber={3} title="Análisis de curtosis" variant="calculation">
        <FormulaDisplay math={`g_{c,Mat} = ${mate.curtosis} < 0 \\implies \\text{Platicúrtica (más aplanada que la normal)}`} />
        <FormulaDisplay math={`g_{c,Est} = ${estad.curtosis} < 0 \\implies \\text{Platicúrtica (más aplanada que la normal)}`} />
        <p className="text-sm">
          Ambas distribuciones son platicúrticas (más aplanadas que la normal),
          pero Matemáticas lo es más ({mate.curtosis} vs {estad.curtosis}).
        </p>
      </StepCard>

      <StepCard stepNumber={4} title="Posición relativa de R.C." variant="result">
        <p>Tipificamos las notas de R.C.:</p>
        <FormulaDisplay math={`z_{Mat} = \\frac{6 - ${mate.media}}{\\sqrt{${mate.varianza}}} = \\frac{${round(6 - mate.media, 2)}}{${round(mateSigma, 4)}} = ${round(zMate, 4)}`} />
        <FormulaDisplay math={`z_{Est} = \\frac{7 - ${estad.media}}{\\sqrt{${estad.varianza}}} = \\frac{${round(7 - estad.media, 2)}}{${round(estadSigma, 4)}} = ${round(zEstad, 4)}`} />
        <ResultCard label="Mejor posición relativa" value={`Estadística (z=${round(zEstad, 4)} > z=${round(zMate, 4)})`} />
        <p className="text-xs text-muted-foreground mt-2">
          Aunque ambas notas están por encima de sus respectivas medias, la nota de Estadística (7) supone una mejor posición relativa
          porque z_Est &gt; z_Mat.
        </p>
      </StepCard>
    </ExerciseLayout>
  );
}
