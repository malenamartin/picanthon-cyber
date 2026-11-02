import { Terminal } from "./Terminal";
import { IkTrace } from "./IkTrace";
import { Countdown } from "./Countdown";
import { PixelBlocks, PIXELS_HERO } from "./PixelBlocks";
import {
  APPLY_OPEN,
  EVENT_DATES,
  EVENT_HOURS,
  EVENT_START_DATE,
  ORGANIZERS,
  VENUE,
  VENUE_LOCALITY,
} from "../event";

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <p className="hero-badge rise">
          <span className="badge">picanthon</span>
          ciberseguridad · buenos aires
        </p>

        <div className="coorg rise">
          <p className="sr-only">organizan</p>
          <ul className="coorg-logos">
            {ORGANIZERS.flatMap((org, i) => {
              const name = (
                <li key={org.name}>
                  {"url" in org && org.url ? (
                    <a href={org.url} target="_blank" rel="noopener noreferrer" className="coorg-name">
                      {org.name === "Picante" ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className="logo-chili" src="/picante-chili.png" alt="" width={338} height={336} />
                          {org.name}
                        </>
                      ) : org.name === "Faraday" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="logo-faraday" src="/faraday-logo.png" alt="Faraday" width={125} height={26} />
                      ) : org.name === "Fardo" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="logo-fardo" src="/fardo-logo.png" alt="Fardo" width={616} height={206} />
                      ) : org.name === "Build101" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="logo-b101" src="/build101-logo.png" alt="Build101" width={1024} height={153} />
                      ) : (
                        org.name
                      )}
                    </a>
                  ) : (
                    <span className="coorg-name">
                      {org.name === "Safe U" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="logo-safeu" src="/safeu-logo.png" alt="Safe U" width={625} height={99} />
                      ) : (
                        org.name
                      )}
                    </span>
                  )}
                </li>
              );
              return i === 0
                ? [name]
                : [<li key={`${org.name}-sep`} aria-hidden className="coorg-sep" />, name];
            })}
          </ul>
        </div>

        <div className="hero-frame rise d1">
          <IkTrace />
          <div className="hero-copy">
            <h1 className="hero-title">
              encontramos <br />
              lo que falla.
              <br />
              el sábado.
            </h1>
            <p className="hero-lede">
              Picanthon Cyberseguridad 2026 es la hackathon de ciberseguridad.
              <br />
              Un sábado, de 9 a 21 hs, para hallar fallas, construir la defensa y mostrarla en vivo.
            </p>
            <div className="hero-cta">
              <a href="#evento" className="btn btn-primary">
                ver el formato →
              </a>
              <a href="#redes" className="link-quiet">
                seguinos para lo que viene ↗
              </a>
            </div>
            {APPLY_OPEN ? (
              <p className="fine">
                Inscribirte no garantiza un lugar.
                <br />
                La participación queda sujeta a selección y confirmación del equipo.
              </p>
            ) : null}
          </div>

          <div className="hero-side">
            <PixelBlocks id="px-hero" cells={PIXELS_HERO} className="hero-pixels" />
            <div className="hero-card">
              <Terminal />
            </div>
          </div>
        </div>

        <dl className="hero-meta rise d2">
          <div>
            <dt>picanthon</dt>
            <dd>
              <time dateTime={EVENT_START_DATE}>{EVENT_DATES}</time>
              <br />
              {EVENT_HOURS}
            </dd>
          </div>
          <div>
            <dt>sede</dt>
            <dd>
              {VENUE}
              <br />
              {VENUE_LOCALITY} · presencial
            </dd>
          </div>
          <div>
            <Countdown />
          </div>
        </dl>
      </div>
    </header>
  );
}
