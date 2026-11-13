import type { ReactNode } from "react";
import {
  APPLY_OPEN,
  APPLY_PATH,
  EVENT_DATES_LONG,
  ORGANIZERS,
  PICANTE_EMAIL,
  TEAM_SIZE,
  TEAMS_TOTAL,
  VENUE,
  VENUE_LOCALITY,
} from "./event";

/**
 * FAQs — fuente única de verdad.
 * `aText` (texto plano) alimenta el JSON-LD FAQPage y /llms.txt; `a` (JSX)
 * es la versión con links que se muestra en la página. Si editás una,
 * editá la otra: el schema debe decir lo mismo que se ve en pantalla.
 */
export type FaqItem = {
  q: string;
  /** Respuesta en texto plano (schema.org / llms.txt). */
  aText: string;
  /** Respuesta con markup para la página. Si falta, se usa aText. */
  a?: ReactNode;
};

const organizerNames = ORGANIZERS.map((org) => org.name);
const organizerList = `${organizerNames.slice(0, -1).join(", ")} y ${organizerNames.at(-1)}`;

export const FAQS: FaqItem[] = [
  {
    q: "qué es picathon?",
    aText: `Picathon Cyberseguridad 2026 es la hackathon de ciberseguridad. un sábado presencial para hallar fallas, construir la defensa y mostrarla en vivo. organizan ${organizerList}.`,
  },
  {
    q: "cuándo y dónde?",
    aText: `el ${EVENT_DATES_LONG}, en ${VENUE}, ${VENUE_LOCALITY}. es un solo día: el domingo no se usa.`,
  },
  {
    q: "qué se hace el sábado?",
    aText: `son ${TEAMS_TOTAL} equipos de ${TEAM_SIZE}. cada uno elige una superficie, reproduce una falla, deja una defensa que se puede correr y la muestra en vivo ese mismo sábado. durante el día hay mentores para intercambiar ideas, resolver dudas y avanzar.`,
  },
  {
    q: "quién organiza?",
    aText: `organizan ${organizerList}.`,
    a: (
      <>
        organizan{" "}
        {ORGANIZERS.map((org, i) => {
          const last = i === ORGANIZERS.length - 1;
          const sep = i === 0 ? "" : last ? " y " : ", ";
          const name =
            "url" in org && org.url ? (
              <a href={org.url} className="bracket" target="_blank" rel="noopener noreferrer">
                {org.name}
              </a>
            ) : (
              org.name
            );
          return (
            <span key={org.name}>
              {sep}
              {name}
            </span>
          );
        })}
        .
      </>
    ),
  },
  {
    q: "cómo me anoto?",
    aText: APPLY_OPEN ? "la inscripción está abierta." : "las inscripciones están cerradas.",
    a: APPLY_OPEN ? (
      <>
        la inscripción está abierta.{" "}
        <a href={APPLY_PATH} className="bracket">
          inscribite
        </a>
        .
      </>
    ) : undefined,
  },
  {
    q: "a quién le escribo?",
    aText: `a equipo picante: ${PICANTE_EMAIL}.`,
    a: (
      <>
        a equipo picante:{" "}
        <a href={`mailto:${PICANTE_EMAIL}`} className="bracket">
          {PICANTE_EMAIL}
        </a>
        .
      </>
    ),
  },
];
