import { pageMetadata } from "../page-metadata";
import { SiteFooter, SiteNav } from "../components/SiteChrome";
import "./equipos.css";

// Fuera del menú y del sitemap: se comparte por link. Tiene nombres y LinkedIn
// de los participantes, así que tampoco se indexa.
export const metadata = {
  ...pageMetadata(
    "/equipos",
    "Equipos | Picathon Cyberseguridad 2026",
    "Los equipos de Picathon Cyberseguridad 2026 se anunciarán en esta página.",
  ),
  robots: { index: false, follow: false },
};

export default function EquiposLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav page="equipos" />
      <main id="contenido" tabIndex={-1} className="eq-page">{children}</main>
      <SiteFooter />
    </>
  );
}
