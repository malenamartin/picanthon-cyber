import { pageMetadata } from "../page-metadata";
import Link from "next/link";
import { SiteFooter, SiteNav } from "../components/SiteChrome";
import { PressCards } from "../components/Press";
import { PRESS, PRESS_EMAIL } from "../press";
import { TEAM } from "../event";

const PRESS_CONTACT = TEAM.find((p) => p.email === PRESS_EMAIL)!;

// A diferencia de /equipos, esta sí se indexa y va al sitemap: no tiene datos
// personales y suma cobertura para buscadores.
export const metadata = pageMetadata(
  "/prensa",
  "Picathon en la prensa | Notas y contacto",
  "Leé la cobertura de Forbes Uruguay sobre Picante y la Picathon. Contactá al equipo de prensa para entrevistas, fotos y datos del evento.",
);

export default function PrensaPage() {
  return (
    <>
      <SiteNav />
      <main id="contenido" tabIndex={-1} className="press-page">
        <div className="wrap">
          <header className="press-hero">
            <p className="eyebrow">
              <Link href="/" className="press-crumb">
                picante
              </Link>{" "}
              · prensa
            </p>
            <h1 className="h2">prensa.</h1>
          </header>

          <p className="eyebrow">// {PRESS.length === 1 ? "1 nota" : `${PRESS.length} notas`}</p>
          <PressCards full />

          <div className="press-contact cells">
            <div>
              <p className="label">contacto de prensa</p>
              <p className="h4">
                Escribile a {PRESS_CONTACT.name} para entrevistas, fotos o datos.
              </p>
            </div>
            <div className="press-contact-cta">
              <a href={`mailto:${PRESS_EMAIL}`} className="btn btn-primary">
                {PRESS_EMAIL} <span className="arr">↗</span>
              </a>
            </div>
          </div>

          <p className="press-sign mono-line">build. ship. repeat.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
