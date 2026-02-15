"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-12 sm:h-14 shrink-0 items-center gap-2 border-b bg-background px-3 sm:px-4">
      <SidebarTrigger className="-ml-1" />
      <span className="flex-1 truncate text-sm font-medium text-muted-foreground">
        Estadística Empresarial I — FBS · UCM
      </span>
      <ThemeToggle />
    </header>
  );
}
