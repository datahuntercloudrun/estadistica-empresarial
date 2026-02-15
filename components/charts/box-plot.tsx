"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BoxPlotProps {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  title?: string;
  label?: string;
  outliers?: number[];
}

export function BoxPlot({ min, q1, median, q3, max, title, label, outliers = [] }: BoxPlotProps) {
  const dataMin = outliers.length > 0 ? Math.min(min, ...outliers) : min;
  const dataMax = outliers.length > 0 ? Math.max(max, ...outliers) : max;
  const range = dataMax - dataMin;
  const padding = range * 0.1;
  const totalRange = range + 2 * padding;
  const startVal = dataMin - padding;

  const toPercent = (value: number) => ((value - startVal) / totalRange) * 100;

  return (
    <Card>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-sm sm:text-sm">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="px-2 sm:px-6">
        <div className="relative h-32 sm:h-36 mx-2 sm:mx-8">
          {/* Labels */}
          <div className="absolute top-0 left-0 right-0 h-6 flex items-center">
            {label && <span className="text-sm sm:text-sm text-muted-foreground">{label}</span>}
          </div>

          {/* Box plot area */}
          <div className="absolute top-8 left-0 right-0 h-16">
            {/* Whisker line from min to max */}
            <div
              className="absolute top-1/2 h-0.5 bg-gray-400 -translate-y-1/2"
              style={{ left: `${toPercent(min)}%`, width: `${toPercent(max) - toPercent(min)}%` }}
            />

            {/* Min line */}
            <div
              className="absolute top-1/4 h-1/2 w-0.5 bg-gray-600"
              style={{ left: `${toPercent(min)}%` }}
            />

            {/* Max line */}
            <div
              className="absolute top-1/4 h-1/2 w-0.5 bg-gray-600"
              style={{ left: `${toPercent(max)}%` }}
            />

            {/* Box from Q1 to Q3 */}
            <div
              className="absolute top-1/4 h-1/2 bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 rounded"
              style={{
                left: `${toPercent(q1)}%`,
                width: `${toPercent(q3) - toPercent(q1)}%`,
              }}
            />

            {/* Median line */}
            <div
              className="absolute top-1/4 h-1/2 w-0.5 bg-red-500"
              style={{ left: `${toPercent(median)}%` }}
            />

            {/* Outliers */}
            {outliers.map((o, i) => (
              <div
                key={i}
                className="absolute top-1/2 w-2 h-2 bg-red-400 rounded-full -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${toPercent(o)}%` }}
              />
            ))}
          </div>

          {/* Value labels - two rows to prevent overlap */}
          <div className="absolute bottom-4 left-0 right-0 h-5">
            <span className="absolute text-[8px] sm:text-sm text-muted-foreground -translate-x-1/2" style={{ left: `${toPercent(min)}%` }}>
              {min}
            </span>
            <span className="absolute text-[8px] sm:text-sm text-red-600 font-bold -translate-x-1/2" style={{ left: `${toPercent(median)}%` }}>
              Me={median}
            </span>
            <span className="absolute text-[8px] sm:text-sm text-muted-foreground -translate-x-1/2" style={{ left: `${toPercent(max)}%` }}>
              {max}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-5">
            <span className="absolute text-[8px] sm:text-sm text-blue-600 font-medium -translate-x-1/2" style={{ left: `${toPercent(q1)}%` }}>
              Q1={q1}
            </span>
            <span className="absolute text-[8px] sm:text-sm text-blue-600 font-medium -translate-x-1/2" style={{ left: `${toPercent(q3)}%` }}>
              Q3={q3}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
