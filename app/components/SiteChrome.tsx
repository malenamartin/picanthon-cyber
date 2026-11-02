import Link from "next/link";
import { Logo } from "./Logo";
import { ShareLinks } from "./ShareLinks";
import { FooterSocials, NavSocials } from "./Socials";
import { PICANTE_EMAIL } from "../event";
import { FooterMark } from "./FooterMark";

/** La nav del sitio. En /equipos va con `page="equipos"`: el botón pasa a
 *  ser "volver al sitio". */
export function SiteNav({ page }: { page?: "equipos" } = {}) {
  return (
    <nav className="topnav" aria-label="principal">
      <div className="wrap topnav-inner">
        <Link href="/" aria-label="Picante, inicio">
          <Logo />
        </Link>
        <div className="nav-links">
          <Link href="/#evento">el evento</Link>
          <Link href="/#recap">after movie</Link>
          <Link href="/#sponsors">sponsors</Link>
          <Link href="/prensa">prensa</Link>
          <Link href="/#contacto">contacto</Link>
        </div>
        <div className="topnav-end">
          <NavSocials />
          {page === "equipos" ? (
            <Link href="/" className="btn btn-primary btn-sm">
              ← volver al sitio
            </Link>
          ) : (
            <Link href="/equipos" className="btn btn-primary btn-sm">
              ver los equipos →
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

/** Nav mínima de las pantallas de inscripción: logo + volver. */
export function FlowNav() {
  return (
    <nav className="topnav" aria-label="principal">
      <div className="wrap topnav-inner">
        <Link href="/" aria-label="Picante, inicio">
          <Logo />
        </Link>
        <Link href="/" className="link-quiet">
          ← volver al sitio
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer" id="contacto">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Logo className="footer-logo" />
            <p className="footer-tagline">build. ship. defend.</p>
            <FooterSocials />
          </div>
        </div>
        <div className="footer-bottom">
          <a className="footer-write" href={`mailto:${PICANTE_EMAIL}`}>
            escribir a equipo picante <span>{PICANTE_EMAIL}</span>
          </a>
          <ShareLinks />
        </div>
      </div>
      <FooterMark />
    </footer>
  );
}
