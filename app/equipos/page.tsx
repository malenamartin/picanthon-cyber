import type { Metadata } from "next";
import { FooterMark } from "../components/FooterMark";

export const metadata: Metadata = {
  title: "próximamente · picathon",
  description: "Los equipos de Picathon Cyberseguridad 2026 se publican cuando estén.",
  alternates: { canonical: "/equipos" },
};

export default function EquiposPage() {
  return (
    <div className="eq-soon">
      <p className="eyebrow">// los equipos</p>
      <h1 className="sr-only">próximamente</h1>
      <FooterMark word="próximamente" />
    </div>
  );
}
