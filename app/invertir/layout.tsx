import { pageMetadata } from "../page-metadata";
import { InvestmentShell } from "./ui";
import "./investing.css";

export const metadata = {
  ...pageMetadata(
    "/invertir",
    "La ronda | Picathon",
    "Invertí capital ficticio en los equipos de Picathon y seguí tu cartera en el juego La ronda.",
  ),
  robots: { index: false, follow: false },
};

export default function InvestmentLayout({ children }: { children: React.ReactNode }) {
  return <InvestmentShell>{children}</InvestmentShell>;
}
