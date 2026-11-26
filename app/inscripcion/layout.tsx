import { pageMetadata } from "../page-metadata";
import { FlowNav } from "../components/SiteChrome";
import { APPLY_OPEN } from "../event";

export const metadata = pageMetadata(
  "/inscripcion",
  "Inscripción | Picathon Cyberseguridad 2026",
  APPLY_OPEN
    ? "Inscribite a la hackathon de ciberseguridad en Buenos Aires. Vení con tu equipo de tres o anotate por tu cuenta."
    : "Las inscripciones a Picathon Cyberseguridad 2026 en Buenos Aires están cerradas. Consultá al equipo organizador si tenés dudas sobre tu postulación.",
);

export default function InscripcionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FlowNav />
      <main id="contenido" tabIndex={-1} className="flow-page">{children}</main>
    </>
  );
}
