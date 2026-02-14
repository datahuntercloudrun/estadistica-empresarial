import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ResultCardProps {
  label: string;
  value: string;
  className?: string;
}

export function ResultCard({ label, value, className = "" }: ResultCardProps) {
  return (
    <Card className={`bg-amber-50 border-amber-200 ${className}`}>
      <CardContent className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4">
        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 shrink-0" />
        <div className="min-w-0">
          <span className="text-xs sm:text-sm text-amber-800 font-medium">{label}: </span>
          <span className="text-xs sm:text-sm font-bold text-amber-900 break-words">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
