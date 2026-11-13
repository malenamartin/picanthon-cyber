"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "./useInView";

// 5×7. El acento de Á/É se dibuja una fila arriba de la letra.
const FONT: Record<string, string> = {
  A: "01110100011000111111100011000110001",
  C: "01110100011000010000100001000101110",
  D: "11110100011000110001100011000111110",
  E: "11111100001100011110100001000011111",
  F: "11111100001100011110100001000010000",
  I: "11111001000010000100001000010011111",
  L: "10000100001000010000100001000011111",
  N: "10001110011010110011100011000110001",
  O: "01110100011000110001100011000101110",
  R: "11110100011000111110101001001010001",
  S: "01111100001000001110000010000111110",
  T: "11111001000010000100001000010000100",
};

type Tone = "accent" | "paper";
type Line = { text: string; tone: Tone; indent: number; mark?: "open" | "close" };

const BEATS: Line[][] = [
  [
    { text: "SI", tone: "accent", indent: 0 },
    { text: "LO", tone: "paper", indent: 1, mark: "open" },
    { text: "ENCONTRÁS", tone: "paper", indent: 2, mark: "close" },
  ],
  [
    { text: "ENTONCES", tone: "accent", indent: 0 },
    { text: "LO", tone: "paper", indent: 1, mark: "open" },
    { text: "DEFENDÉS", tone: "paper", indent: 2, mark: "close" },
  ],
];

const COLS = 5;
const ROWS = 7;
const SCRAMBLE = 0.72;
const HOLD = 2.4;
const OUT = 0.36;
const BEAT = SCRAMBLE + HOLD + OUT;

function bits(ch: string) {
  const accent = ch === "Á" || ch === "É";
  const base = accent ? (ch === "Á" ? "A" : "E") : ch;
  const raw = FONT[base];
  if (!raw) return null;
  return { raw, accent };
}

function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function DotPhrase() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let alive = true;
    let onScreen = true;
    let start = performance.now();

    const paint = (now: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bw = Math.floor(w * dpr);
      const bh = Math.floor(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const elapsed = motion.matches ? SCRAMBLE : (now - start) / 1000;
      const beatIndex = Math.floor(elapsed / BEAT) % BEATS.length;
      const local = elapsed % BEAT;
      const lines = BEATS[beatIndex];
      const resolving = local < SCRAMBLE ? local / SCRAMBLE : local > SCRAMBLE + HOLD ? 1 - (local - SCRAMBLE - HOLD) / OUT : 1;
      const settle = Math.max(0, Math.min(1, resolving));

      const widest = Math.max(...lines.map((line) => line.indent * 3 + line.text.length * (COLS + 1)));
      const rows = lines.length * (ROWS + 3) + 1;
      const cell = Math.max(3, Math.min(w / (widest + 2), h / (rows + 2)));
      const blockW = widest * cell;
      const blockH = rows * cell;
      const ox = (w - blockW) / 2;
      const oy = (h - blockH) / 2;

      const accent =
        getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#ff3300";

      const dot = (x: number, y: number, on: boolean, flicker: number) => {
        const show = settle > 0.98 ? on : on ? hash(flicker) < 0.35 + settle * 0.65 : hash(flicker + 9) < (1 - settle) * 0.22;
        if (!show) return;
        ctx.beginPath();
        ctx.arc(x, y, cell * 0.34, 0, Math.PI * 2);
        ctx.fill();
      };

      lines.forEach((line, li) => {
        const y0 = oy + li * (ROWS + 3) * cell;
        let col = line.indent * 3;
        ctx.fillStyle = line.tone === "accent" ? accent : "#f4f1ea";
        for (const ch of line.text) {
          const glyph = bits(ch);
          if (!glyph) {
            col += COLS + 1;
            continue;
          }
          if (glyph.accent && settle > 0.45) {
            ctx.globalAlpha = Math.min(1, (settle - 0.45) / 0.4);
            dot(ox + (col + 2) * cell, y0 + cell * 0.55, true, li * 100);
            dot(ox + (col + 3.15) * cell, y0 + cell * 0.12, true, li * 100 + 3);
            ctx.globalAlpha = 1;
          }
          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              const on = glyph.raw[r * COLS + c] === "1";
              const px = ox + (col + c) * cell;
              const py = y0 + (r + 1) * cell;
              dot(px, py, on, li * 400 + r * 17 + c * 3 + beatIndex * 80 + Math.floor(now / 70));
            }
          }
          col += COLS + 1;
        }
      });

      if (settle > 0.2) {
        ctx.globalAlpha = Math.min(1, (settle - 0.2) / 0.5);
        ctx.strokeStyle = accent;
        ctx.lineWidth = Math.max(1.25, cell * 0.16);
        const open = lines.findIndex((line) => line.mark === "open");
        const close = lines.findIndex((line) => line.mark === "close");
        if (open >= 0) {
          const y = oy + open * (ROWS + 3) * cell + cell * 0.2;
          const x = ox + lines[open].indent * 3 * cell - cell * 1.3;
          const arm = cell * 2.2;
          ctx.beginPath();
          ctx.moveTo(x + arm, y);
          ctx.lineTo(x, y);
          ctx.lineTo(x, y + arm);
          ctx.stroke();
        }
        if (close >= 0) {
          const y = oy + (close + 1) * (ROWS + 3) * cell - cell * 1.4;
          const chars = lines[close].text.length * (COLS + 1) + lines[close].indent * 3;
          const x = ox + chars * cell + cell * 0.2;
          const arm = cell * 2.2;
          ctx.beginPath();
          ctx.moveTo(x - arm, y);
          ctx.lineTo(x, y);
          ctx.lineTo(x, y - arm);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    };

    const frame = (now: number) => {
      if (!alive) return;
      paint(now);
      if (!motion.matches && onScreen) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && !motion.matches) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    raf = requestAnimationFrame(frame);

    const onMotion = () => {
      cancelAnimationFrame(raf);
      start = performance.now();
      raf = requestAnimationFrame(frame);
    };
    motion.addEventListener("change", onMotion);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <div className="dot-phrase">
      <p className="sr-only">Si lo encontrás, entonces lo defendés.</p>
      <canvas ref={ref} />
    </div>
  );
}
