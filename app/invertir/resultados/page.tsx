import { pageMetadata } from "../../page-metadata";
import { ResultsBoard } from "../results-board";

export const metadata = pageMetadata(
  "/invertir/resultados",
  "Resultados de la ronda | Picathon",
  "Consultá el ranking de los equipos en el juego de inversión de Picathon.",
);

export default function InvestmentResultsPage() {
  return <ResultsBoard />;
}
