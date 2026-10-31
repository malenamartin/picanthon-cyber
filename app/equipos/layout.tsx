import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../components/SiteChrome";
import "./equipos.css";

// Fuera del menú y del sitemap: se comparte por link. Tiene nombres y LinkedIn
// de los participantes, así que tampoco se indexa.
export const metadata: Metadata = {
  title: "los equipos · picanthon",
  description: "13 equipos construyeron en un fin de semana. Conocé qué hicieron y quiénes son.",
  robots: { index: false, follow: false },
};

export default function EquiposLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav page="equipos" />
      <main className="eq-page">{children}</main>
      <SiteFooter />
    </>
  );
}
