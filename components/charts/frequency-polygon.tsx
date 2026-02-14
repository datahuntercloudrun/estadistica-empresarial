"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PolygonData {
  x: number;
  y: number;
  label?: string;
}

interface FrequencyPolygonProps {
  data: PolygonData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
}

export function FrequencyPolygon({
  data,
  title,
  xLabel,
  yLabel = "Frecuencia",
  color = "hsl(var(--chart-2))",
}: FrequencyPolygonProps) {
  return (
    <Card>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="x"
              tick={{ fontSize: 12 }}
              label={xLabel ? { value: xLabel, position: "bottom", offset: 15 } : undefined}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", offset: -5 } : undefined}
            />
            <Tooltip
              formatter={(value) => [String(value), yLabel]}
              labelFormatter={(label) => `x = ${label}`}
            />
            <Line
              type="linear"
              dataKey="y"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 4, fill: color }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
