"use client";

import { useState, useCallback, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FloatingIconsSparse } from "@/components/ui/floating-icons";
import { HummingNote } from "@/components/ui/humming-note";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  }, []);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative py-24 lg:py-32 gradient-section overflow-hidden">
      <FloatingIconsSparse variant={4} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-cognac mb-4 font-poppins">
            Depoimentos
          </p>
          <h2 className="text-bone leading-[0.95]">
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide">O que dizem sobre</span>
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mt-1">meu trabalho</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative max-w-3xl mx-auto">
            {/* Carousel */}
            <Card className="bg-navy/40 border-border overflow-hidden">
              <CardContent className="p-8 sm:p-12">
                <Quote
                  className="h-10 w-10 text-cognac/30 mb-6"
                  strokeWidth={1}
                  fill="currentColor"
                />

                <div className="min-h-[120px] flex items-center">
                  <blockquote className="text-lg sm:text-xl text-bone/80 leading-relaxed italic">
                    &ldquo;{TESTIMONIALS[current].text}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="h-12 w-12 rounded-full bg-cognac/20 flex items-center justify-center border border-cognac/30">
                    <span className="text-sm font-bold text-cognac">
                      {TESTIMONIALS[current].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-bone">
                      {TESTIMONIALS[current].name}
                    </p>
                    <p className="text-sm text-bone/50">
                      {TESTIMONIALS[current].role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={prev}
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-5 w-5 text-bone" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-cognac"
                        : "w-2 bg-bone/20 hover:bg-bone/40"
                    }`}
                    aria-label={`Ir para depoimento ${i + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={next}
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-5 w-5 text-bone" />
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <HummingNote noteId="testimonials-main" fallbackText={"resultados\nreais"} />
      </div>
    </section>
  );
}
