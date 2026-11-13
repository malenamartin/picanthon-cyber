import { DotPhrase } from "./DotPhrase";
import { IkTrace } from "./IkTrace";
import { Countdown } from "./Countdown";
import {
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
        <div className="hero-frame rise">
          <IkTrace />
          <div className="hero-copy">
            <p className="eyebrow">picathon · ciberseguridad · buenos aires</p>
            <h1 className="hero-title">
              encontramos
              <br />
              lo que falla.
              <br />
              el sábado.
            </h1>
            <p className="hero-lede">
              Un sábado, de 9 a 21 hs, para hallar fallas, construir la defensa y mostrarla en vivo.
            </p>
            <div className="hero-cta">
              <a href="#evento" className="btn btn-primary">
                ver el sábado <span className="arr">→</span>
              </a>
            </div>
          </div>
          <div className="hero-side">
            <DotPhrase />
          </div>
        </div>

        <Countdown />

        <dl className="hero-meta rise d2">
          <div>
            <dt>picathon</dt>
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
        </dl>

        <div className="coorg rise">
          <p className="sr-only">organizan</p>
          <ul className="coorg-logos">
            {ORGANIZERS.flatMap((org, i) => {
              const name = (
                <li key={org.name}>
                  {"url" in org && org.url ? (
                    <a href={org.url} target="_blank" rel="noopener noreferrer" className="coorg-name">
                      {org.name === "Picante" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="logo-picante" src="/picante-wordmark.png" alt="Picante" width={822} height={167} />
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="logo-safeu" src="/safeu-logo.png" alt={org.name} width={625} height={99} />
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
      </div>
    </header>
  );
}
