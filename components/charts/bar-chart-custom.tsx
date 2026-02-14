"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BarChartData {
  name: string;
  value: number;
  value2?: number;
  color?: string;
}

interface BarChartCustomProps {
  data: BarChartData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  color2?: string;
  dataKey2Label?: string;
  showLegend?: boolean;
  horizontal?: boolean;
}

export function BarChartCustom({
  data,
  title,
  xLabel,
  yLabel = "Frecuencia",
  color = "hsl(var(--chart-1))",
  color2 = "hsl(var(--chart-2))",
  dataKey2Label,
  showLegend = false,
  horizontal = false,
}: BarChartCustomProps) {
  return (
    <Card>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout={horizontal ? "vertical" : "horizontal"}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            {horizontal ? (
              <>
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  label={xLabel ? { value: xLabel, position: "bottom", offset: 15 } : undefined}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", offset: -5 } : undefined}
                />
              </>
            )}
            <Tooltip />
            {showLegend && <Legend />}
            <Bar dataKey="value" name={yLabel} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || color} />
              ))}
            </Bar>
            {dataKey2Label && (
              <Bar dataKey="value2" name={dataKey2Label} fill={color2} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
