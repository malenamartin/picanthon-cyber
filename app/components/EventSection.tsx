"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "./Terminal";
import { PixelBlocks, PIXELS_HERO } from "./PixelBlocks";
import { DayDial, DAY_STOPS, activeStop } from "./DayDial";
import { reducedMotion } from "./useInView";

export function EventSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const holding = useRef(false);
  const anchor = useRef<number | null>(null);
  const [value, setValue] = useState(0.5);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const still = reducedMotion();
    setReduced(still);
    if (still) {
      setValue(0.5);
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (holding.current) return;
      if (anchor.current !== null && Math.abs(window.scrollY - anchor.current) < 32) return;
      anchor.current = null;
      const rect = stage.getBoundingClientRect();
      const view = window.innerHeight;
      // 0 cuando el bloque recién llega bajo la nav; 1 cuando el último tramo entra.
      const start = Math.min(view * 0.42, 280);
      const end = view * 0.55 - rect.height;
      const span = start - end;
      const next = span === 0 ? 0 : (start - rect.top) / span;
      setValue(Math.min(1, Math.max(0, next)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const active = reduced ? -1 : activeStop(value);

  return (
    <section id="evento" className="section">
      <div className="wrap">
        <p className="eyebrow">// el sábado</p>
        <div ref={stageRef} className={`event-stage${reduced ? " is-still" : ""}`}>
          <h2 className="h2 event-title">
            un día para encontrar
            <br />
            fallas y construir defensas.
          </h2>
          <div className="event-dial-col">
            <div className="event-dial-sticky">
              <PixelBlocks
                id="px-day"
                cells={PIXELS_HERO}
                progress={reduced ? 1 : value}
                className="event-pixels"
              />
              <DayDial
                value={value}
                reduced={reduced}
                onHold={(next) => {
                  holding.current = next;
                }}
                onChange={(next) => {
                  anchor.current = window.scrollY;
                  setValue(next);
                }}
              />
            </div>
          </div>
          <ol className="day-beats">
            {DAY_STOPS.map((stop, index) => (
              <li key={stop.hour} className={`day-beat${active === index ? " is-on" : ""}`}>
                <p className="day-beat-hour">{stop.hour}</p>
                <h3 className="h3">{stop.title}</h3>
                <p>{stop.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <ol className="steps cells">
          {DAY_STOPS.map((stop, index) => (
            <li key={stop.hour}>
              <div className={`step${active === index ? " is-on" : ""}`}>
                <span className="step-n">{stop.hour}</span>
                <h3 className="h3">{stop.title}</h3>
                <p>{stop.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="event-terminal">
          <p className="eyebrow">preguntale</p>
          <Terminal />
        </div>
      </div>
    </section>
  );
}
