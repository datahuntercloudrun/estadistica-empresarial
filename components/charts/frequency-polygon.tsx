"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <Card>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-sm sm:text-sm">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
          <LineChart data={data} margin={isMobile ? { top: 5, right: 5, left: 0, bottom: 15 } : { top: 5, right: 30, left: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="x"
              tick={{ fontSize: isMobile ? 10 : 12 }}
              label={xLabel && !isMobile ? { value: xLabel, position: "bottom", offset: 15 } : undefined}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 30 : undefined}
              label={yLabel && !isMobile ? { value: yLabel, angle: -90, position: "insideLeft", offset: -5 } : undefined}
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
              dot={{ r: isMobile ? 3 : 4, fill: color }}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
