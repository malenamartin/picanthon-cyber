import Image from "next/image";
import Link from "next/link";
import { DotPhrase } from "./DotPhrase";
import { IkTrace } from "./IkTrace";
import { Countdown } from "./Countdown";
import {
  APPLY_CLOSED_LABEL,
  APPLY_OPEN,
  APPLY_PATH,
  EVENT_DATES,
  EVENT_NAME,
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
        <div className="hero-frame">
          <IkTrace />
          <div className="hero-copy">
            <p className="eyebrow">hackathon · {VENUE_LOCALITY}</p>
            <h1 className="hero-title">{EVENT_NAME}</h1>
            <p className="hero-lede">
              El <time dateTime={EVENT_START_DATE}>{EVENT_DATES}</time>, de {EVENT_HOURS}, nos encontramos en {VENUE} para construir y mostrar defensas en vivo.
            </p>
            <div className="hero-cta">
              <a href="#evento" className="btn btn-primary">
                ver el programa <span className="arr" aria-hidden>→</span>
              </a>
              {APPLY_OPEN ? (
                <Link href={APPLY_PATH} className="link-strong">inscribite</Link>
              ) : (
                <Link href={APPLY_PATH} prefetch={false} className="link-quiet">{APPLY_CLOSED_LABEL}</Link>
              )}
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
                        <img loading="lazy" className="logo-picante" src="/picante-wordmark.png" alt="Picante" width={822} height={167} />
                      ) : org.name === "Faraday" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="logo-faraday" src="/faraday-logo.png" alt="Faraday" width={125} height={26} />
                      ) : org.name === "Fardo" ? (
                        <Image loading="lazy" sizes="60px" className="logo-fardo" src="/fardo-logo.png" alt="Fardo" width={616} height={206} />
                      ) : org.name === "Build101" ? (
                        <Image loading="lazy" sizes="108px" className="logo-b101" src="/build101-logo.png" alt="Build101" width={1024} height={153} />
                      ) : (
                        org.name
                      )}
                    </a>
                  ) : (
                    <span className="coorg-name">
                      <Image loading="lazy" sizes="139px" className="logo-safeu" src="/safeu-logo.png" alt={org.name} width={625} height={99} />
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
