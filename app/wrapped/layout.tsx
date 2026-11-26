import { pageMetadata } from "../page-metadata";
import "./wrapped.css";

// /wrapped: las tarjetas de la hackathon. Fuera del menú, del sitemap y de
// los buscadores.
export const metadata = {
  ...pageMetadata(
    "/wrapped",
    "Picathon Wrapped | La hackathon en números",
    "Recorré el trabajo de los equipos durante la hackathon, tarjeta por tarjeta.",
  ),
  robots: { index: false, follow: false },
};

export default function WrappedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
