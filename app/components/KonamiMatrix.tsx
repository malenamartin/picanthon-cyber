"use client";

import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "arrowup", "arrowup", "arrowdown", "arrowdown",
  "arrowleft", "arrowright", "arrowleft", "arrowright",
  "b", "a",
];
const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソ01<>{}[]/=+*#$;ABCDEF日本語ハック";

/** Easter egg: Konami code (or typing "deploy") triggers a matrix rain. */
export function KonamiMatrix() {
  const [on, setOn] = useState(false);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let ki = 0;
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      // konami
      if (k === KONAMI[ki]) {
        ki++;
        if (ki === KONAMI.length) {
          ki = 0;
          setOn(true);
        }
      } else {
        ki = k === KONAMI[0] ? 1 : 0;
      }
      // typed word
      if (k.length === 1) {
        buf = (buf + k).slice(-6);
        if (buf === "deploy") setOn(true);
      }
    };
    const onTrigger = () => setOn(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("uru:matrix", onTrigger);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("uru:matrix", onTrigger);
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const canvas = cv.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const box = canvas.parentElement ?? canvas;
    const resize = () => {
      const vw = box.clientWidth;
      const vh = box.clientHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      return { vw, vh };
    };
    let { vw, vh } = resize();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const fontSize = 14;
    let cols = Math.max(1, Math.floor(vw / fontSize));
    let drops = Array.from({ length: cols }, () => Math.floor((Math.random() * vh) / fontSize));

    let raf = 0;
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      ctx.fillRect(0, 0, vw, vh);
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      for (let i = 0; i < cols; i++) {
        const ch = MATRIX_CHARS[(Math.random() * MATRIX_CHARS.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() < 0.08 ? "#ff3300" : "#a3a3a3";
        ctx.fillText(ch, x, y);
        if (y > vh && Math.random() > 0.96) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      ({ vw, vh } = resize());
      cols = Math.max(1, Math.floor(vw / fontSize));
      drops = Array.from({ length: cols }, () => Math.floor((Math.random() * vh) / fontSize));
    };
    window.addEventListener("resize", onResize);

    const t = setTimeout(() => setOn(false), 4200);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [on]);

  if (!on) return null;
  return (
    <div className="matrix-overlay" role="status">
      <canvas ref={cv} className="matrix-cv" aria-hidden />
      <div className="matrix-toast">encontraste la falla</div>
    </div>
  );
}
