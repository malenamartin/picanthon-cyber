"use client";

import { useEffect, useState } from "react";
import { APPLY_DEADLINE_ISO, APPLY_OPEN, EVENT_END_ISO, EVENT_KICKOFF_ISO } from "../event";

const DEADLINE = Date.parse(APPLY_DEADLINE_ISO);
const KICKOFF = Date.parse(EVENT_KICKOFF_ISO);
const END = Date.parse(EVENT_END_ISO);

const pad = (n: number) => String(n).padStart(2, "0");

/** Qué se cuenta: primero el cierre de inscripciones, después el kickoff. */
function target(now: number): { label: string; at: number | null } {
  if (APPLY_OPEN && now < DEADLINE) return { label: "cierran las inscripciones", at: DEADLINE };
  if (now < KICKOFF) return { label: "arranca picathon", at: KICKOFF };
  return { label: now < END ? "picathon en curso" : "próxima edición", at: null };
}

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { k: "d", n: pad(Math.floor(s / 86400)), l: "días" },
    { k: "h", n: pad(Math.floor((s % 86400) / 3600)), l: "hs" },
    { k: "m", n: pad(Math.floor((s % 3600) / 60)), l: "min" },
    { k: "s", n: pad(s % 60), l: "seg" },
  ];
}

const PLACEHOLDER = [
  { k: "d", n: "--", l: "días" },
  { k: "h", n: "--", l: "hs" },
  { k: "m", n: "--", l: "min" },
  { k: "s", n: "--", l: "seg" },
];

/** Cuenta regresiva grande, aparte de la fecha y la sede. El cuadrado
 *  naranja parpadea con el segundo: marca el tiempo que falta. */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const t = target(now ?? 0);
  const live = now !== null && t.at === null && now < END;
  const label = now === null ? (APPLY_OPEN ? "cierran las inscripciones" : "arranca picathon") : t.label;
  const units = now === null ? PLACEHOLDER : t.at !== null ? parts(t.at - now) : null;
  const word = t.at === null ? (live ? "en vivo" : "pronto") : null;

  return (
    <div className="kickoff" role="timer" aria-label="Cuenta regresiva de Picathon">
      <p className="kickoff-label">{label}</p>
      {units ? (
        <ol className="kickoff-units">
          {units.map((u) => (
            <li key={u.k}>
              <span className="kickoff-n">{u.n}</span>
              <span className="kickoff-u">
                {u.l}
                {u.k === "s" ? <i className="kickoff-tick" aria-hidden /> : null}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="kickoff-n">{word}</p>
      )}
    </div>
  );
}
