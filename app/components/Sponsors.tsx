import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { TIERS, type Sponsor, type Tier } from "../sponsors";

function Logo({ s }: { s: Sponsor }) {
  const style = { "--w": `${s.w}px`, "--h": `${s.h}px` } as CSSProperties;
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={s.logo} alt={s.name} loading="lazy" className={s.invert ? "invert" : undefined} />;
  return (
    <li className={["sponsor", s.featured && "featured", s.tight && "tight"].filter(Boolean).join(" ")} style={style}>
      {s.url ? (
        <a href={s.url} target="_blank" rel="noopener noreferrer sponsored">
          {img}
        </a>
      ) : (
        img
      )}
    </li>
  );
}

function Card({ s }: { s: Sponsor }) {
  const body = (
    <>
      <div className="reel-logo">
        {s.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.logo} alt="" className={s.invert ? "invert" : undefined} />
        ) : (
          <span className="reel-word">{s.name}</span>
        )}
      </div>
      {s.blurb ? <p>{s.blurb}</p> : null}
      {s.url ? <span className="reel-more">Visitá su web ›</span> : null}
    </>
  );
  if (!s.url) return <article className="reel-card">{body}</article>;
  return (
    <a className="reel-card" href={s.url} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  );
}

function Reel({ tier }: { tier: Tier }) {
  const loop = [...tier.items, ...tier.items];
  return (
    <div className="reel">
      <div className="reel-copy">
        <h3>{tier.label}</h3>
        <p>
          {tier.key === "partners"
            ? "Equipos y herramientas para construir y defender. Algunos salen de la plataforma de Vercel."
            : "Quienes empujan el ecosistema, más las guías para dejar el trabajo desplegado."}
        </p>
      </div>
      <div className="reel-viewport">
        <ul className="reel-track">
          {loop.map((s, i) => (
            <li key={`${s.name}-${i}`} inert={i >= tier.items.length ? true : undefined}>
              <Card s={s} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Sponsors() {
  const tiers = TIERS.filter((t) => t.items.length > 0);
  return (
    <section id="sponsors" className="section">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">// nos acompañan</p>
          <h2 className="h2">picanthon se construye en equipo.</h2>
          <p className="lede">
            {tiers.length
              ? "Partners e instituciones para un sábado de ciberseguridad."
              : "Todavía no están confirmados."}
          </p>
        </Reveal>

        {tiers.map((t) => {
          if (t.key === "partners" || t.key === "instituciones") {
            return (
              <Reveal key={t.key}>
                <Reel tier={t} />
              </Reveal>
            );
          }
          const grid = `sponsor-grid size-${t.size}${t.cols ? ` cols-${t.cols}` : ""}`;
          const featured = t.items.filter((s) => s.featured);
          const fullRow = t.items.filter((s) => s.fullWidth);
          const rest = t.items.filter((s) => !s.featured && !s.fullWidth);
          return (
            <Reveal key={t.key} className="tier">
              <h3 className="tier-tab">{t.label}</h3>
              {featured.length || fullRow.length ? (
                <div className="sponsor-stack">
                  {featured.length > 0 && (
                    <ul className="sponsor-grid sponsor-featured">
                      {featured.map((s) => (
                        <Logo key={s.name} s={s} />
                      ))}
                    </ul>
                  )}
                  <ul className={grid}>
                    {rest.map((s) => (
                      <Logo key={s.name} s={s} />
                    ))}
                  </ul>
                  {fullRow.length > 0 && (
                    <ul className={`${grid} sponsor-full-row`}>
                      {fullRow.map((s) => (
                        <Logo key={s.name} s={s} />
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <ul className={grid}>
                  {t.items.map((s) => (
                    <Logo key={s.name} s={s} />
                  ))}
                </ul>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
