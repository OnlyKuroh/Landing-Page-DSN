"use client";

import { useEffect, useRef, useCallback } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!glowRef.current) return;
    glowRef.current.style.left = `${e.clientX}px`;
    glowRef.current.style.top = `${e.clientY}px`;
    glowRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500"
      style={{
        width: "400px",
        height: "400px",
        background:
          "radial-gradient(circle, rgba(184, 134, 78, 0.06) 0%, rgba(184, 134, 78, 0.02) 30%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}
