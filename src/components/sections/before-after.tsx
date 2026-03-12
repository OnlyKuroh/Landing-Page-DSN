"use client";

import { useRef, useState, useCallback } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";

interface BeforeAfterImage {
  before: string;
  after: string;
  labelBefore?: string;
  labelAfter?: string;
}

const EXAMPLES: BeforeAfterImage[] = [
  {
    before: "/images/portfolio/projeto-5/FEED%20-%20AGILIDADE.webp",
    after: "/images/portfolio/projeto-6/FEED%201%20-%20TRATAMENTO%20SUAVIZA.webp",
    labelBefore: "Antes",
    labelAfter: "Depois",
  },
];

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
      setSliderPosition(pct);
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      updatePosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const example = EXAMPLES[0];

  return (
    <section className="relative section-padding gradient-section-alt">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-cognac mb-4 font-poppins font-medium">
            Transformação
          </p>
          <h2 className="font-tusker text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-bone leading-[0.9]">
            O poder do{" "}
            <span className="text-gradient-gold">design estratégico</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-bone/40 max-w-2xl mx-auto font-poppins font-light">
            Arraste para comparar — o resultado fala por si.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="scale">
          <div
            ref={containerRef}
            className="relative max-w-3xl mx-auto aspect-square rounded-2xl overflow-hidden border border-border/50 glow-cognac cursor-col-resize select-none touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* After (background, full image) */}
            <img
              src={example.after}
              alt="Depois — Design profissional"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Before (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={example.before}
                alt="Antes — Design amador"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  width: containerRef.current
                    ? `${containerRef.current.offsetWidth}px`
                    : "100%",
                  maxWidth: "none",
                }}
                draggable={false}
              />
            </div>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-bone/80 z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bone/90 shadow-xl flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-[#0A0A0C]"
                >
                  <path
                    d="M5 3L2 8L5 13M11 3L14 8L11 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-poppins font-bold bg-black/50 text-bone/80 backdrop-blur-sm">
                {example.labelBefore}
              </span>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-poppins font-bold bg-cognac/30 text-cognac backdrop-blur-sm border border-cognac/20">
                {example.labelAfter}
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
