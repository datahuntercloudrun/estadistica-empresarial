"use client";

import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_NAME = "estadistica_auth";
const COOKIE_VALUE = "granted";
const PASSWORD = "FBSUCM";

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setAuthed(getCookie(COOKIE_NAME) === COOKIE_VALUE);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setCookie(COOKIE_NAME, COOKIE_VALUE, 365);
      setAuthed(true);
    } else {
      setError(true);
      setInput("");
    }
  };

  if (authed === null) return null;

  if (authed) return <>{children}</>;

  return (
    <div className="min-h-svh flex items-center justify-center bg-background p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <GraduationCap className="h-12 w-12 text-primary" />
          <h1 className="text-xl font-bold">Estadística Empresarial I</h1>
          <p className="text-sm text-muted-foreground">FBS · UCM</p>
        </div>
        <div className="space-y-3">
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Contraseña"
            autoFocus
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          {error && <p className="text-sm text-red-500">Contraseña incorrecta</p>}
          <Button type="submit" className="w-full">Acceder</Button>
        </div>
      </form>
    </div>
  );
}
