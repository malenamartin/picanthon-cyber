import { Reveal } from "./Reveal";
import { PixelBlocks, PIXELS_SMALL } from "./PixelBlocks";
import { FOUNDERS } from "../event";

export function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
      />
    </svg>
  );
}

// Los dos founders, siempre visibles: una celda por persona. Al pasar el
// mouse (o con foco) la celda sube y se enciende; la otra se atenúa.
export function Founders() {
  return (
    <section id="equipo" className="section section-compact">
      <div className="wrap">
        <Reveal className="founders-head">
          <div>
            <p className="eyebrow">// el equipo</p>
            <h2 className="h2 h2-sm">
              no solo organizamos.
              <br />
              también invertimos.
            </h2>
          </div>
          <p className="founders-aside">
            En Picante financiamos y aceleramos
            <br />
            a founders jóvenes, desde el principio.
          </p>
        </Reveal>

        <Reveal>
          <ul className="team">
            {FOUNDERS.map((p, i) => (
              <li key={p.key} className="member">
                <div className="member-photo member-photo-color halftone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={`foto de ${p.name}`} width={720} height={720} loading="lazy" />
                  <PixelBlocks id={`px-team-${i}`} cells={PIXELS_SMALL} cols={4} rows={4} className="member-pixels" />
                </div>
                <div className="member-id">
                  <div className="member-top">
                    <div>
                      <p className="member-name">{p.name}</p>
                      <p className="member-role">{p.role}</p>
                    </div>
                    <a
                      className="member-link"
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} en LinkedIn`}
                    >
                      <LinkedInIcon />
                    </a>
                  </div>
                  <p className="member-orgs">{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
