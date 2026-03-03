"use client";

import { useEffect, useRef, useState } from "react";

export function CursorOrb() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(canHover && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-enabled");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (event: MouseEvent) => {
      targetPos.current = { x: event.clientX, y: event.clientY };
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseDown = () => {
      dot.style.transform += " scale(1.2)";
      ring.style.transform += " scale(0.9)";
    };

    const onMouseUp = () => {
      dot.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
    };

    const animateRing = () => {
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * 0.15;
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      rafRef.current = window.requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    rafRef.current = window.requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
