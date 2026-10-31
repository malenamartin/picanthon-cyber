import type { Metadata } from "next";
import { ResultsBoard } from "../results-board";

export const metadata: Metadata = { title: "resultados de la ronda · picanthon", alternates: { canonical: "/invertir/resultados" } };

export default function InvestmentResultsPage() {
  return <ResultsBoard />;
}
