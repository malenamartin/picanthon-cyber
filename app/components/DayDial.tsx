"use client";

import Image from "next/image";
import { useRef } from "react";

const HOURS = [
  { at: 0, label: "09" },
  { at: 0.5, label: "15" },
  { at: 1, label: "21" },
] as const;

export const DAY_STOPS = [
  {
    hour: "09 hs",
    title: "encontrá la falla",
    body: "Elegí una superficie y reproducí el problema.",
  },
  {
    hour: "15 hs",
    title: "construí la defensa",
    body: "Dejá algo que se pueda correr antes de que cierre el día.",
  },
  {
    hour: "21 hs",
    title: "mostrala en vivo",
    body: "El hallazgo se muestra funcionando, delante de quien tiene que verlo.",
  },
] as const;

export function hourFromValue(value: number) {
  return Math.round(9 + value * 12);
}

export function activeStop(value: number) {
  const hour = hourFromValue(value);
  if (hour <= 12) return 0;
  if (hour <= 17) return 1;
  return 2;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function DayDial({
  value,
  onChange,
  onHold,
}: {
  value: number;
  onChange: (value: number) => void;
  onHold: (holding: boolean) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hour = hourFromValue(value);
  const stop = activeStop(value);
  const readout = `${String(hour).padStart(2, "0")} hs, ${DAY_STOPS[stop].title}`;

  const fromPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const span = Math.max(rect.width, 1);
    onChange(clamp01((clientX - rect.left) / span));
  };

  return (
    <div className="day-dial" style={{ ["--p" as string]: value }}>
      <div className="day-dome" aria-hidden>
        <Image sizes="140px" className="day-chili" src="/picante-chili.png" alt="" width={338} height={336} />
      </div>

      <p className="day-readout">
        <span className="label">{String(hour).padStart(2, "0")} hs</span>
        <span className="day-readout-title">{DAY_STOPS[stop].title}</span>
      </p>

      <div
        className="day-track"
        ref={trackRef}
        onPointerDown={(event) => {
          onHold(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          fromPointer(event.clientX);
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          fromPointer(event.clientX);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          onHold(false);
        }}
        onPointerCancel={() => onHold(false)}
      >
        <span className="day-track-line" />
        <span className="day-track-fill" />
        <button
          type="button"
          className="day-knob"
          role="slider"
          aria-label="hora del sábado"
          aria-valuemin={9}
          aria-valuemax={21}
          aria-valuenow={hour}
          aria-valuetext={readout}
          onKeyDown={(event) => {
            const step = 1 / 12;
            if (event.key === "ArrowRight" || event.key === "ArrowUp") {
              event.preventDefault();
              onChange(clamp01(value + step));
            } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
              event.preventDefault();
              onChange(clamp01(value - step));
            } else if (event.key === "Home") {
              event.preventDefault();
              onChange(0);
            } else if (event.key === "End") {
              event.preventDefault();
              onChange(1);
            }
          }}
        />
      </div>

      <div className="day-hours" role="group" aria-label="paradas del día">
        {HOURS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`day-hour${stop === index ? " is-on" : ""}`}
            aria-pressed={stop === index}
            onClick={() => onChange(item.at)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
