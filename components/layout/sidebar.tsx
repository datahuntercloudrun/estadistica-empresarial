"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BarChart3,
  Calculator,
  Check,
  ChevronRight,
  GraduationCap,
  Home,
  TrendingUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { NOT_NEEDED_PATHS } from "@/lib/not-needed-paths";

const navigation = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Tema 1: Introducción",
    icon: BookOpen,
    color: "text-blue-500",
    items: [
      { title: "Teoría", url: "/tema-1" },
    ],
  },
  {
    title: "Tema 2: Mundo de los Datos",
    icon: BarChart3,
    color: "text-emerald-500",
    badge: "7",
    items: [
      { title: "Resumen Teoría", url: "/tema-2" },
      { title: "Ej.1 Clasificación de variables", url: "/tema-2/ejercicio-1" },
      { title: "Ej.2 Distribución de frecuencias", url: "/tema-2/ejercicio-2" },
      { title: "Ej.3 Marginales y condicionadas", url: "/tema-2/ejercicio-3" },
      { title: "Ej.4 Marginal y condicionada X|Y=3", url: "/tema-2/ejercicio-4" },
      { title: "Ej.5 Clasificación de gráficos", url: "/tema-2/ejercicio-5" },
      { title: "Comp.1 Distribución salarios", url: "/tema-2/complementario-1" },
      { title: "Comp.2 Puestos de trabajo", url: "/tema-2/complementario-2" },
    ],
  },
  {
    title: "Tema 3: Análisis Estadístico",
    icon: Calculator,
    color: "text-violet-500",
    badge: "11",
    items: [
      { title: "Resumen Teoría", url: "/tema-3" },
      { title: "Ej.1 Dispersión tubos TV", url: "/tema-3/ejercicio-1" },
      { title: "Ej.2 Lanzamiento de dado", url: "/tema-3/ejercicio-2" },
      { title: "Ej.3 Cifras de ventas", url: "/tema-3/ejercicio-3" },
      { title: "Ej.4 Duración de baterías", url: "/tema-3/ejercicio-4" },
      { title: "Ej.5 Comparación calificaciones", url: "/tema-3/ejercicio-5" },
      { title: "Ej.6 Efecto nuevas observaciones", url: "/tema-3/ejercicio-6" },
      { title: "Ej.7 Media ponderada estratificada", url: "/tema-3/ejercicio-7" },
      { title: "Ej.8 Análisis holding empresarial", url: "/tema-3/ejercicio-8" },
      { title: "Comp.1 Análisis completo salarios", url: "/tema-3/complementario-1" },
      { title: "Comp.2 Comparación calificaciones", url: "/tema-3/complementario-2" },
      { title: "Comp.3 Relación σ y CV", url: "/tema-3/complementario-3" },
    ],
  },
  {
    title: "Tema 4: Dos Variables",
    icon: TrendingUp,
    color: "text-teal-500",
    badge: "9",
    items: [
      { title: "Resumen Teoría", url: "/tema-4" },
      { title: "Ej.1 Frecuencias conjuntas", url: "/tema-4/ejercicio-1" },
      { title: "Ej.2 Publicidad vs ventas", url: "/tema-4/ejercicio-2" },
      { title: "Ej.3 Rectas de regresión", url: "/tema-4/ejercicio-3" },
      { title: "Ej.4 Clientes y facturación", url: "/tema-4/ejercicio-4" },
      { title: "Ej.5 Empresas madereras", url: "/tema-4/ejercicio-5" },
      { title: "Ej.6 Vacas vs leche", url: "/tema-4/ejercicio-6" },
      { title: "Comp.1 Accidentes vs velocidad", url: "/tema-4/complementario-1" },
      { title: "Comp.2 Distribución bidimensional", url: "/tema-4/complementario-2" },
      { title: "Comp.3 Parking coste vs tiempo", url: "/tema-4/complementario-3" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 h-12 sm:h-14 flex items-center">
        <div className="flex items-center gap-2 w-full">
          <Link href="/" className="flex items-center gap-2 min-w-0" onClick={() => setOpenMobile(false)}>
            <GraduationCap className="h-5 w-5 text-primary shrink-0" />
            <span className="text-sm font-semibold truncate">Estadística Empresarial I — FBS · UCM</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) =>
                item.items ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen={item.items?.some((sub) => pathname === sub.url || pathname.startsWith(sub.url + "/"))}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon className={`h-4 w-4 ${item.color || ""}`} />
                          <span className="flex-1 truncate">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto h-5 min-w-5 px-1 text-sm">
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((sub) => {
                            const isRecommended = !NOT_NEEDED_PATHS.includes(sub.url);
                            return (
                              <SidebarMenuSubItem key={sub.url}>
                                <SidebarMenuSubButton asChild isActive={pathname === sub.url}>
                                  <Link href={sub.url} onClick={() => setOpenMobile(false)}>
                                    {isRecommended && (
                                      <span className="sidebar-recommended inline-flex h-4 min-w-4 items-center justify-center rounded-full shrink-0">
                                        <Check className="h-2.5 w-2.5 text-white" />
                                      </span>
                                    )}
                                    <span>{sub.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url!} onClick={() => setOpenMobile(false)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
