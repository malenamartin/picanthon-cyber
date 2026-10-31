import {
  APPLY_CLOSED_MESSAGE,
  APPLY_DEADLINE_FULL,
  APPLY_OPEN,
  CANONICAL_URL,
  EVENT_DATES_LONG,
  EVENT_DESCRIPTION,
  EVENT_NAME,
  ORGANIZERS,
  JURY,
  MENTORS_DESCRIPTION,
  APPLY_URL,
  SCHEDULE,
  SOCIALS,
  TEAM_EMAILS,
  TEAM_SIZE,
  TEAMS_TOTAL,
  VENUE,
  VENUE_ADDRESS,
} from "../event";
import { FAQS } from "../faqs";
import { TIERS } from "../sponsors";
import { PRESS, formatPressDate } from "../press";

// /llms.txt — resumen del sitio en markdown para answer engines y crawlers de
// LLMs (convención emergente, https://llmstxt.org). Se genera en build desde
// event.ts + faqs.tsx + sponsors.ts: nunca puede divergir del contenido visible.
export const dynamic = "force-static";

export function GET() {
  const body = `# ${EVENT_NAME}

> ${EVENT_DESCRIPTION}

## datos clave

- qué: ${EVENT_NAME}, hackathon de ciberseguridad presencial en Buenos Aires. El sábado se buscan fallas, se construye una defensa y se muestra en vivo.
- edición: ${EVENT_DATES_LONG}, con ${TEAMS_TOTAL} equipos. las novedades salen primero en redes.
- equipos y proyectos: ${CANONICAL_URL}equipos
- dónde: ${VENUE}, ${VENUE_ADDRESS}, Argentina.
- precio: gratis, con cupos limitados y selección del equipo organizador.
- equipos: ${TEAM_SIZE} personas${APPLY_OPEN ? "; podés inscribir a tu equipo o inscribirte solo y te ayudamos a formar uno." : "."}
- horario: ${SCHEDULE.map((d) => `${d.day} de ${d.hours}`).join(" y ")}; la sede cierra a las 21 hs.
${
    APPLY_OPEN
      ? `- cierre de inscripción: ${APPLY_DEADLINE_FULL} (hora de uruguay).
- inscripción: ${APPLY_URL}`
      : `- inscripción: ${APPLY_CLOSED_MESSAGE}`
  }
- sitio oficial: ${CANONICAL_URL}
- contacto: ${TEAM_EMAILS.join(" · ")}
- redes: ${SOCIALS.map((s) => `${s.label.toLowerCase()} ${s.url}`).join(" · ")}

## organizan

${ORGANIZERS.map((org) => `- ${org.name}${"url" in org && org.url ? ` (${org.url})` : ""}`).join("\n")}

## mentores

${MENTORS_DESCRIPTION}

## jurado

${JURY.map((j) => `- ${j.name}: ${j.role}${j.note ? ` · ${j.note}` : ""}`).join("\n")}

## prensa

${PRESS.map((p) => `- ${p.outlet} (${formatPressDate(p.date)}): "${p.title}" ${p.url}`).join("\n")}
- todas las notas: ${CANONICAL_URL}prensa

## sponsors

${TIERS.map(
    (t) =>
      `### ${t.label}\n\n${t.items.map((s) => `- ${s.name}${s.url ? ` (${s.url})` : ""}`).join("\n")}`,
  ).join("\n\n")}

## preguntas frecuentes

${FAQS.map((f) => `### ${f.q}\n\n${f.aText}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
