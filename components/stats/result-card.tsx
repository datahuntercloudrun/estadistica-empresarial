import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ResultCardProps {
  label: string;
  value: string;
  className?: string;
}

export function ResultCard({ label, value, className = "" }: ResultCardProps) {
  return (
    <Card className={`bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 ${className}`}>
      <CardContent className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4">
        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400 shrink-0" />
        <div className="min-w-0">
          <span className="text-sm sm:text-sm text-amber-800 dark:text-amber-200 font-medium">{label}: </span>
          <span className="text-sm sm:text-sm font-bold text-amber-900 dark:text-amber-100 break-words">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
