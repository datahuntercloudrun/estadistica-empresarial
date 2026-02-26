"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Line,
  Legend,
  ReferenceDot,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScatterPoint {
  x: number;
  y: number;
}

interface RegressionLineData {
  slope: number;
  intercept: number;
  label?: string;
  color?: string;
}

interface ScatterChartCustomProps {
  data: ScatterPoint[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  regressionLines?: RegressionLineData[];
  gravityCenter?: { x: number; y: number };
  color?: string;
}

function generateLinePoints(
  line: RegressionLineData,
  xMin: number,
  xMax: number
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const step = (xMax - xMin) / 50;
  for (let x = xMin; x <= xMax; x += step) {
    points.push({ x, y: line.intercept + line.slope * x });
  }
  return points;
}

const LINE_COLORS = ["#e11d48", "#2563eb", "#16a34a", "#d97706"];

export function ScatterChartCustom({
  data,
  title,
  xLabel,
  yLabel,
  regressionLines,
  gravityCenter,
  color = "hsl(var(--chart-1))",
}: ScatterChartCustomProps) {
  const isMobile = useIsMobile();

  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  const xPad = (xMax - xMin) * 0.1 || 1;
  const yPad = (yMax - yMin) * 0.1 || 1;

  return (
    <Card>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-sm sm:text-sm">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 320}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name={xLabel || "X"}
              domain={[xMin - xPad, xMax + xPad]}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              label={
                xLabel
                  ? { value: xLabel, position: "insideBottom", offset: -10, fontSize: isMobile ? 10 : 12 }
                  : undefined
              }
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yLabel || "Y"}
              domain={[Math.min(yMin - yPad, 0), yMax + yPad]}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              label={
                yLabel
                  ? { value: yLabel, angle: -90, position: "insideLeft", offset: 5, fontSize: isMobile ? 10 : 12 }
                  : undefined
              }
            />
            <Tooltip
              formatter={(value) => typeof value === "number" ? value.toFixed(2) : String(value)}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Scatter
              name="Datos"
              data={data}
              fill={color}
              r={isMobile ? 4 : 5}
            />
            {regressionLines?.map((line, idx) => {
              const linePoints = generateLinePoints(
                line,
                xMin - xPad,
                xMax + xPad
              );
              const lineColor = line.color || LINE_COLORS[idx % LINE_COLORS.length];
              return (
                <Scatter
                  key={`line-${idx}`}
                  name={line.label || `Recta ${idx + 1}`}
                  data={linePoints}
                  fill="none"
                  line={{ stroke: lineColor, strokeWidth: 2 }}
                  legendType="line"
                  shape={() => null}
                />
              );
            })}
            {gravityCenter && (
              <ReferenceDot
                x={gravityCenter.x}
                y={gravityCenter.y}
                r={isMobile ? 6 : 8}
                fill="#dc2626"
                stroke="#fff"
                strokeWidth={2}
              />
            )}
            {regressionLines && regressionLines.length > 0 && (
              <Legend wrapperStyle={isMobile ? { fontSize: "11px" } : undefined} />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
