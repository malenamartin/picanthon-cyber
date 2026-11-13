// ============================================================
// <picathon> — prensa (fuente única de verdad)
// Alimenta /prensa, la franja de la landing, el schema (subjectOf) y
// /llms.txt. Para sumar una nota: agregá un objeto acá y su imagen 16:9
// (1200×675, webp) en public/prensa/. Los titulares van textuales: son citas.
// ============================================================

import { TEAM } from "./event";

export type PressItem = {
  key: string;
  outlet: string;
  /** sección del medio o formato ("crónica"), en minúsculas */
  kind: string;
  title: string;
  dek?: string;
  author?: string;
  url: string;
  /** fecha de publicación (YYYY-MM-DD) */
  date: string;
  image: string;
  /** el medio también coorganizó picathon (se marca para ser transparentes) */
  coorg?: boolean;
};

export const PRESS: readonly PressItem[] = [
  {
    key: "forbes",
    outlet: "Forbes Uruguay",
    kind: "innovación",
    title:
      "Qué es Picante, el fondo argentino que desembarcó en Uruguay en busca de jóvenes emprendedores talentosos y resilientes",
    dek: "El fondo y aceleradora Picante desembarcó en Uruguay. La nota recorre el foco en jóvenes fundadores y la Picathon.",
    author: "Mariana Malek",
    url: "https://www.forbesuruguay.com/innovacion/que-picante-fondo-argentino-desembarco-uruguay-busca-jovenes-emprendedores-talentosos-resilientes-n80564",
    date: "2025-10-28",
    image: "/prensa/forbes.webp",
  },
];

/** Contacto para medios. */
export const PRESS_EMAIL = TEAM[2].email;

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** "2026-10-20" → "20 oct 2026" (sin Date: no depende del huso horario). */
export function formatPressDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
