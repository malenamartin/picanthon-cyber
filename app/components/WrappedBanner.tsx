import Link from "next/link";
import metrics from "@/wrapped/metrics.json";

// Cinta arriba de todo de la landing: anuncia /wrapped con los números del
// snapshot (wrapped/metrics.json) pasando en loop. Toda la cinta es el link.

const fmt = new Intl.NumberFormat("es-UY");
const t = metrics.totals;
const edition = new Intl.DateTimeFormat("es-AR", { month: "long", timeZone: "America/Argentina/Buenos_Aires" }).format(new Date(metrics.window.kickoff));
const ITEMS = [
  `edición de ${edition}`,
  `${fmt.format(t.commits)} commits`,
  `${fmt.format(t.linesAdded)} líneas escritas`,
  `${fmt.format(t.teams)} equipos`,
  `${fmt.format(t.builders)} builders`,
  "mirá los números del finde →",
];

function Strip({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="wbanner-strip" aria-hidden={hidden || undefined}>
      {ITEMS.map((item, i) => (
        <span key={i} className={i === 0 ? "wbanner-item hot" : "wbanner-item"}>
          {item}
        </span>
      ))}
    </span>
  );
}

export function WrappedBanner() {
  return (
    <Link href="/wrapped" prefetch={false} className="wbanner">
      <span className="wbanner-tag">
        <span className="wbanner-dot" aria-hidden />
        picathon wrapped
      </span>
      <span className="wbanner-rail">
        {/* dos copias iguales: la animación corre una y la otra la reemplaza sin salto */}
        <span className="wbanner-track">
          <Strip />
          <Strip hidden />
        </span>
      </span>
    </Link>
  );
}
