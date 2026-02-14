import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StepCardProps {
  stepNumber: number;
  title: React.ReactNode;
  children: React.ReactNode;
  variant?: "explanation" | "calculation" | "result";
}

const variantStyles = {
  explanation: "border-l-4 border-l-blue-400",
  calculation: "border-l-4 border-l-emerald-400",
  result: "border-l-4 border-l-amber-400 bg-amber-50/50",
};

export function StepCard({ stepNumber, title, children, variant = "explanation" }: StepCardProps) {
  return (
    <Card className={`${variantStyles[variant]}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {stepNumber}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-3">
        {children}
      </CardContent>
    </Card>
  );
}
