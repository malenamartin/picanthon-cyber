"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "./useInView";

const JOINTS = 7;

type Point = { x: number; y: number };

function reach(points: Point[], base: Point, target: Point, lengths: number[]) {
  const last = points.length - 1;
  for (let pass = 0; pass < 6; pass++) {
    points[last].x = target.x;
    points[last].y = target.y;
    for (let i = last - 1; i >= 0; i--) {
      const dx = points[i].x - points[i + 1].x;
      const dy = points[i].y - points[i + 1].y;
      const dist = Math.hypot(dx, dy) || 1;
      points[i].x = points[i + 1].x + (dx / dist) * lengths[i];
      points[i].y = points[i + 1].y + (dy / dist) * lengths[i];
    }
    points[0].x = base.x;
    points[0].y = base.y;
    for (let i = 0; i < last; i++) {
      const dx = points[i + 1].x - points[i].x;
      const dy = points[i + 1].y - points[i].y;
      const dist = Math.hypot(dx, dy) || 1;
      points[i + 1].x = points[i].x + (dx / dist) * lengths[i];
      points[i + 1].y = points[i].y + (dy / dist) * lengths[i];
    }
  }
}

/** Cadena corta que sigue el puntero dentro del hero. Con reduced motion
 *  queda en la pose de reposo. */
export function IkTrace() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv?.closest(".hero");
    const ctx = cv?.getContext("2d");
    if (!cv || !host || !ctx) return;

    const still = reducedMotion();
    const points = Array.from({ length: JOINTS }, () => ({ x: 0, y: 0 }));
    const lengths = Array.from({ length: JOINTS - 1 }, () => 0);
    const base = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const aim = { x: 0, y: 0 };
    let inside = false;
    let raf = 0;
    let visible = true;

    const restY = () => {
      const lane = band();
      return (lane.y0 + lane.y1) / 2;
    };

    const band = () => {
      const title = host.querySelector(".hero-title");
      const lede = host.querySelector(".hero-lede");
      const h = cv.clientHeight;
      const top = cv.getBoundingClientRect().top;
      if (!title || !lede || !h) return { y0: h * 0.42, y1: h * 0.62 };
      const y0 = title.getBoundingClientRect().bottom - top + 10;
      const y1 = lede.getBoundingClientRect().top - top - 10;
      if (y1 - y0 < 12) return { y0, y1: y0 + 16 };
      return { y0, y1 };
    };

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (!w || !h) return;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const seg = Math.min(w, h) * 0.16;
      lengths.fill(seg);
      const y = restY();
      base.x = w * 0.06;
      base.y = y;
      if (!inside) {
        aim.x = w * 0.78;
        aim.y = y;
        target.x = aim.x;
        target.y = aim.y;
      }
      reach(points, base, target, lengths);
    };

    const color = () => getComputedStyle(cv).getPropertyValue("--accent").trim() || "#ff3300";

    const draw = () => {
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const accent = color();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      const tip = points[points.length - 1];
      ctx.lineTo(tip.x, tip.y);
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.globalAlpha = 1;
      for (const point of points) {
        ctx.fillStyle = accent;
        ctx.fillRect(point.x - 2.5, point.y - 2.5, 5, 5);
      }
    };

    const tick = () => {
      target.x += (aim.x - target.x) * 0.18;
      target.y += (aim.y - target.y) * 0.18;
      reach(points, base, target, lengths);
      draw();
      raf = requestAnimationFrame(tick);
    };

    const play = () => {
      cancelAnimationFrame(raf);
      if (still || !visible) {
        reach(points, base, target, lengths);
        draw();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      const lane = band();
      inside = true;
      aim.x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      aim.y = Math.min(lane.y1, Math.max(lane.y0, y));
    };
    const onLeave = () => {
      inside = false;
      aim.x = cv.clientWidth * 0.78;
      aim.y = restY();
    };

    host.addEventListener("pointermove", onMove as EventListener);
    host.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => {
      layout();
      draw();
    });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else cancelAnimationFrame(raf);
    });
    layout();
    ro.observe(cv);
    io.observe(cv);
    play();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="ik-trace" aria-hidden />;
}
