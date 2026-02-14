"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HistogramData {
  interval: string;
  frequency: number;
  label?: string;
}

interface HistogramChartProps {
  data: HistogramData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  highlightIndex?: number;
}

export function HistogramChart({
  data,
  title,
  xLabel = "",
  yLabel = "Frecuencia",
  color = "hsl(var(--chart-1))",
  highlightIndex,
}: HistogramChartProps) {
  return (
    <Card>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="interval"
              tick={{ fontSize: 11 }}
              angle={-20}
              textAnchor="end"
              label={xLabel ? { value: xLabel, position: "bottom", offset: 15 } : undefined}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", offset: -5 } : undefined}
            />
            <Tooltip
              formatter={(value) => [String(value), yLabel]}
              labelFormatter={(label) => `Intervalo: ${label}`}
            />
            <Bar dataKey="frequency" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={highlightIndex === index ? "hsl(var(--chart-4))" : color}
                  opacity={highlightIndex !== undefined && highlightIndex !== index ? 0.5 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
