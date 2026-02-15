"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AlertTriangle, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { NOT_NEEDED_PATHS } from "@/lib/not-needed-paths";

export function NotNeededWarning({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const [dismissed, setDismissed] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDismissed(false);
    setShow(NOT_NEEDED_PATHS.includes(pathname));
  }, [pathname]);

  if (!show || dismissed) return <>{children}</>;

  return (
    <>
      {children}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-sm rounded-lg border bg-background p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-amber-500 shrink-0" />
            <h2 className="text-lg font-bold">Contenido no prioritario</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Estudiar desde este apartado <strong>no es la forma más efectiva</strong> de preparar
            el examen y el seminario de esta semana. Hay otros ejercicios que te van a ser mucho más útiles.
          </p>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                setDismissed(true);
                if (isMobile) {
                  setOpenMobile(true);
                }
              }}
              className="w-full"
            >
              <PanelLeft className="h-4 w-4 mr-2" />
              Seleccionar otro contenido
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDismissed(true)}
              className="w-full text-muted-foreground text-xs"
            >
              Continuar de todos modos (perder el tiempo)
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
