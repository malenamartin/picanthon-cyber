import type { Metadata } from "next";
import { InvestmentShell } from "./ui";
import "./investing.css";

export const metadata: Metadata = {
  title: "la ronda · picanthon",
  description: "Un millón de dólares de juego. Invertí en los equipos que creas que tienen más futuro en picanthon.",
  alternates: { canonical: "/invertir" },
  robots: { index: false, follow: false },
};

export default function InvestmentLayout({ children }: { children: React.ReactNode }) {
  return <InvestmentShell>{children}</InvestmentShell>;
}
