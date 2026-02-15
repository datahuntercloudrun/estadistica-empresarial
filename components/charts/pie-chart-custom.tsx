"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface PieChartData {
  name: string;
  value: number;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#00C49F",
];

interface PieChartCustomProps {
  data: PieChartData[];
  title?: string;
  showPercentage?: boolean;
}

export function PieChartCustom({ data, title, showPercentage = true }: PieChartCustomProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const isMobile = useIsMobile();

  return (
    <Card>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-sm sm:text-sm">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={!isMobile}
              label={isMobile ? false : ({ name, value }) =>
                showPercentage
                  ? `${name}: ${((value / total) * 100).toFixed(1)}%`
                  : `${name}: ${value}`
              }
              outerRadius={isMobile ? 70 : 100}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [String(value), "Frecuencia"]} />
            <Legend wrapperStyle={isMobile ? { fontSize: "11px" } : undefined} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
