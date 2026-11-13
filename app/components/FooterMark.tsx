"use client";

import { useEffect, useRef } from "react";

const GLYPHS = [".", ":", "-", "+", "*", "#"] as const;
const ALPHAS = [0.38, 0.7, 1] as const;

type Cell = { g: number; a: number };

// El recorte del pie se llena de caracteres que se van reemplazando. La
// palabra hace de máscara, así que el movimiento queda adentro de las letras.
export function FooterMark({ word = "Picante" }: { word?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cells: Cell[] = [];
    let cols = 0;
    let rows = 0;
    let step = 12;
    let raf = 0;
    let last = 0;
    let onScreen = false;
    let alive = true;

    const syncLive = () => {
      if (motion.matches) root.removeAttribute("data-live");
      else root.setAttribute("data-live", "");
    };

    const paint = () => {
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

      const accent =
        getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#ff3300";
      ctx.font = `500 ${step}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = accent;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cell = cells[y * cols + x];
          ctx.globalAlpha = ALPHAS[cell.a];
          ctx.fillText(GLYPHS[cell.g], x * step + step / 2, y * step + step / 2);
        }
      }

      const cs = getComputedStyle(root);
      const fontSize = parseFloat(cs.fontSize);
      const lineHeight = parseFloat(cs.lineHeight);
      const emTop = Number.isFinite(lineHeight) ? (lineHeight - fontSize) / 2 : 0;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-in";
      ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      ctx.letterSpacing = cs.letterSpacing;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#000";
      ctx.fillText(word, w / 2, emTop);
      ctx.globalCompositeOperation = "source-over";
      ctx.letterSpacing = "0px";
    };

    const rebuild = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      step = Math.max(9, Math.round(w / 110));
      const nextCols = Math.max(1, Math.ceil(w / step));
      const nextRows = Math.max(1, Math.ceil(h / step));
      if (nextCols !== cols || nextRows !== rows) {
        cols = nextCols;
        rows = nextRows;
        cells = Array.from({ length: cols * rows }, () => ({
          g: Math.floor(Math.random() * GLYPHS.length),
          a: Math.floor(Math.random() * ALPHAS.length),
        }));
      }
      paint();
    };

    const shuffle = () => {
      const n = Math.max(1, Math.floor(cells.length * 0.08));
      for (let i = 0; i < n; i++) {
        const at = Math.floor(Math.random() * cells.length);
        cells[at] = {
          g: Math.floor(Math.random() * GLYPHS.length),
          a: Math.floor(Math.random() * ALPHAS.length),
        };
      }
    };

    const frame = (t: number) => {
      if (!alive || !onScreen || motion.matches) return;
      raf = requestAnimationFrame(frame);
      if (t - last < 120) return;
      last = t;
      shuffle();
      paint();
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!onScreen || motion.matches) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    syncLive();
    rebuild();

    const ro = new ResizeObserver(() => rebuild());
    ro.observe(root);
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else cancelAnimationFrame(raf);
      },
      { rootMargin: "160px" },
    );
    io.observe(root);
    const onMotion = () => {
      syncLive();
      if (motion.matches) cancelAnimationFrame(raf);
      else start();
    };
    motion.addEventListener("change", onMotion);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      motion.removeEventListener("change", onMotion);
    };
  }, [word]);

  return (
    <div className="footer-mark" ref={rootRef} aria-hidden="true">
      <canvas ref={canvasRef} />
      <span>{word}</span>
    </div>
  );
}
