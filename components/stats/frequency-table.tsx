"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { InlineMath } from "@/components/stats/formula-display";

interface FrequencyRow {
  xi: string;
  ni: number;
  fi: number;
  Ni: number;
  Fi: number;
  di?: number;
}

interface FrequencyTableProps {
  data: FrequencyRow[];
  title?: string;
  showDensity?: boolean;
  highlightRows?: number[];
  /** Si es true, la primera columna se llama "Intervalo" en vez de "x_i" */
  grouped?: boolean;
}

export function FrequencyTable({ data, title, showDensity = false, highlightRows = [], grouped = false }: FrequencyTableProps) {
  const totalNi = data.reduce((sum, row) => sum + row.ni, 0);

  return (
    <Card className="overflow-hidden">
      {title && (
        <div className="px-3 sm:px-4 py-2 bg-muted/50 border-b">
          <span className="text-xs sm:text-sm font-medium">{title}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-bold">{grouped ? "Intervalo" : <InlineMath math="x_i" />}</TableHead>
              <TableHead className="text-center font-bold"><InlineMath math="n_i" /></TableHead>
              <TableHead className="text-center font-bold"><InlineMath math="f_i" /></TableHead>
              <TableHead className="text-center font-bold"><InlineMath math="N_i" /></TableHead>
              <TableHead className="text-center font-bold"><InlineMath math="F_i" /></TableHead>
              {showDensity && <TableHead className="text-center font-bold"><InlineMath math="d_i" /></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i} className={highlightRows.includes(i) ? "bg-amber-50" : i % 2 === 0 ? "bg-muted/20" : ""}>
                <TableCell className="text-center font-medium text-xs sm:text-sm">{row.xi}</TableCell>
                <TableCell className="text-center text-xs sm:text-sm">{row.ni}</TableCell>
                <TableCell className="text-center text-xs sm:text-sm">{row.fi.toFixed(4)}</TableCell>
                <TableCell className="text-center text-xs sm:text-sm">{row.Ni}</TableCell>
                <TableCell className="text-center text-xs sm:text-sm">{row.Fi.toFixed(4)}</TableCell>
                {showDensity && <TableCell className="text-center text-xs sm:text-sm">{row.di?.toFixed(4)}</TableCell>}
              </TableRow>
            ))}
            <TableRow className="font-bold bg-muted/40">
              <TableCell className="text-center text-xs sm:text-sm">Total</TableCell>
              <TableCell className="text-center text-xs sm:text-sm">{totalNi}</TableCell>
              <TableCell className="text-center text-xs sm:text-sm">1.0000</TableCell>
              <TableCell className="text-center text-xs sm:text-sm">-</TableCell>
              <TableCell className="text-center text-xs sm:text-sm">-</TableCell>
              {showDensity && <TableCell className="text-center text-xs sm:text-sm">-</TableCell>}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
