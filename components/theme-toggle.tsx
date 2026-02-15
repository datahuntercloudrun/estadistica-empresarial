"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const modes = ["light", "dark", "system"] as const;
const labels: Record<string, string> = {
  light: "Claro",
  dark: "Oscuro",
  system: "Sistema",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const cycle = () => {
    const i = modes.indexOf((theme ?? "system") as (typeof modes)[number]);
    setTheme(modes[(i + 1) % modes.length]);
  };

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="shrink-0"><Sun className="h-5 w-5" /><span className="sr-only">Cambiar tema</span></Button>;
  }

  return (
    <Button variant="ghost" size="icon" onClick={cycle} className="shrink-0" title={labels[theme ?? "system"]}>
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : theme === "system" ? (
        <Monitor className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Cambiar tema: {labels[theme ?? "system"]}</span>
    </Button>
  );
}
