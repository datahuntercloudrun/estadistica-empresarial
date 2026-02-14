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
      <CardContent className="flex items-center gap-3 py-3 px-4">
        <CheckCircle className="h-5 w-5 text-amber-600 shrink-0" />
        <div>
          <span className="text-sm text-amber-800 font-medium">{label}: </span>
          <span className="text-sm font-bold text-amber-900">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
