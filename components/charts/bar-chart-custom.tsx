"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

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
          <BarChart
            data={data}
            layout={horizontal ? "vertical" : "horizontal"}
            margin={isMobile ? { top: 5, right: 5, left: 0, bottom: 20 } : { top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            {horizontal ? (
              <>
                <XAxis type="number" tick={{ fontSize: isMobile ? 10 : 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: isMobile ? 9 : 11 }} width={isMobile ? 50 : 80} />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  label={xLabel && !isMobile ? { value: xLabel, position: "bottom", offset: 15 } : undefined}
                />
                <YAxis
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 30 : undefined}
                  label={yLabel && !isMobile ? { value: yLabel, angle: -90, position: "insideLeft", offset: -5 } : undefined}
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
