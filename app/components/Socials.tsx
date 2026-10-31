import { EVENT_DATES_LONG, SOCIALS, VENUE } from "../event";

type SocialKey = (typeof SOCIALS)[number]["key"];

/** Íconos de línea (trazo 1.8, esquinas redondeadas) para que pesen igual que
 *  el resto de la UI. Toman el color del texto. */
export function SocialIcon({ k, size = 20 }: { k: SocialKey; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;
  if (k === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (k === "web") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" />
        <path d="M10 14.5 L16.5 8 M12.5 8 H16.5 V12" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        fill="currentColor"
        d="M7.3 10.2h2.2v6.9H7.3zM8.4 6.7a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM11.1 10.2h2.1v.95c.35-.66 1.2-1.15 2.35-1.15 2 0 2.75 1.25 2.75 3.25v3.85h-2.2v-3.4c0-.95-.2-1.75-1.2-1.75s-1.6.75-1.6 1.75v3.4h-2.2z"
      />
    </svg>
  );
}

/** Íconos de la barra de arriba. */
export function NavSocials() {
  return (
    <ul className="nav-socials" aria-label="redes">
      {SOCIALS.map((s) => (
        <li key={s.key}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Picante en ${s.label}`}>
            <SocialIcon k={s.key} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Links del footer: ícono + nombre de la red. */
export function FooterSocials() {
  return (
    <ul className="footer-socials" aria-label="redes">
      {SOCIALS.map((s) => (
        <li key={s.key}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Picante en ${s.label}`}>
            <SocialIcon k={s.key} size={18} />
            {s.label} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Cierre de la página: una tarjeta y dos caminos. Las redes quedan en el footer. */
export function FollowSection() {
  const picante = SOCIALS.find((s) => s.key === "web");
  return (
    <section id="redes" className="section closer">
      <div className="wrap">
        <div className="closer-card">
          <h2 className="h2">hacé algo que se recuerde.</h2>
          <p className="closer-lede">
            {EVENT_DATES_LONG}, en {VENUE}.
          </p>
          <div className="closer-actions">
            <a href="#evento" className="btn btn-primary">
              ver el formato <span className="arr">→</span>
            </a>
            {picante ? (
              <a href={picante.url} className="btn closer-secondary" target="_blank" rel="noopener noreferrer">
                conocé picante <span className="arr">↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
