"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { HummingNote } from "@/components/ui/humming-note";
import { WHATSAPP } from "@/lib/constants";

/**
 * Hero images rotate randomly on each page load.
 * Place your photos in public/images/hero/ and list them here.
 */
const HERO_IMAGES = [
  "/images/hero/freepik__candid-relaxed-studio-portrait-of-a-young-man-with__57261.png",
  "/images/hero/freepik__ultrarealistic-studio-portrait-scene-with-a-deep-c__57226.png",
  "/images/hero/freepik__ultrarealistic-studio-portrait-scene-with-a-deep-c__57227.png",
];

export function Hero() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [heroPool, setHeroPool] = useState<string[]>(HERO_IMAGES);

  useEffect(() => {
    let cancelled = false;

    const loadHeroImages = async () => {
      try {
        const response = await fetch("/api/hero-images", { cache: "no-store" });
        const data = (await response.json()) as { images?: string[] };
        const images = data.images ?? [];
        if (!cancelled && images.length > 0) setHeroPool(images);
      } catch {
        // keep fallback list
      }
    };

    loadHeroImages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Pick a random image on every mount, avoiding immediate repeat from last reload
    const storageKey = "hero-last-index";
    const previousIndexRaw = window.sessionStorage.getItem(storageKey);
    const previousIndex = previousIndexRaw !== null ? Number(previousIndexRaw) : -1;

    let nextIndex = Math.floor(Math.random() * heroPool.length);
    if (heroPool.length > 1 && nextIndex === previousIndex) {
      nextIndex = (nextIndex + 1) % heroPool.length;
    }

    window.sessionStorage.setItem(storageKey, String(nextIndex));
    setHeroImage(heroPool[nextIndex] ?? heroPool[0] ?? null);
  }, [heroPool]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center gradient-hero overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-cognac/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-navy/30 blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(222,220,213,1) 1px, transparent 1px), linear-gradient(90deg, rgba(222,220,213,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Design Tool Icons */}
      <FloatingIcons />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pb-20 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 relative">
            <AnimatedSection delay={0}>
              <Badge variant="outline" className="text-xs uppercase tracking-widest font-poppins">
                Senior Visual Designer & Creative Strategist
              </Badge>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h1 className="leading-[0.9] tracking-tight text-bone">
                <span className="block font-tusker text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-wide">
                  Transformo a visão do
                </span>
                <span className="block font-tusker text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-wide mt-1">
                  seu negócio
                </span>
                <span className="block font-tusker text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-wide mt-1">
                  em <span className="text-cognac">faturamento</span>
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-lg sm:text-xl text-bone/60 max-w-xl leading-relaxed font-poppins font-light">
                Senior Designer com{" "}
                <span className="text-bone font-medium">+6 anos</span>{" "}
                criando artes que{" "}
                <span className="font-humming text-2xl text-cognac/80">vendem</span>.{" "}
                <span className="text-bone/40">
                  Não que só ficam bonitas.
                </span>
              </p>
            </AnimatedSection>

            <HummingNote noteId="hero-main" fallbackText={"esse cara é\nbom demais"} />

            <AnimatedSection delay={0.45}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a href="#contato">
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a
                    href="https://behance.net/athilapsd"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Portfólio
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </AnimatedSection>
          </div>

          {/* Visual Element */}
          <AnimatedSection delay={0.3} direction="right">
            <div className="relative block">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto rounded-2xl overflow-hidden border border-border glow-cognac">
                {/* Rotating hero image — changes on each page load */}
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt="Athila Cabrall — Senior Visual Designer"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-navy via-obsidian to-navy" />
                )}
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
                {/* Decorative overlay line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cognac to-transparent" />
              </div>

              {/* Floating decorative badge */}
              <div className="absolute -bottom-3 -left-2 sm:-left-4 bg-navy border border-border rounded-xl p-3 sm:p-4 glow-cognac">
                <p className="text-2xl font-tusker text-cognac">132+</p>
                <p className="text-xs text-bone/60 font-poppins">Clientes</p>
              </div>

              <div className="absolute -top-3 -right-2 sm:-right-4 bg-navy border border-border rounded-xl p-3 sm:p-4 glow-cognac">
                <p className="text-2xl font-tusker text-cognac">6+</p>
                <p className="text-xs text-bone/60 font-poppins">Anos</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <a
        href="#expertise"
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 text-bone/50 hover:text-cognac transition-colors"
        aria-label="Rolar para próxima seção"
      >
        <span className="font-poppins text-[11px] tracking-widest uppercase">Role</span>
        <span className="w-6 h-10 rounded-full border border-cognac/45 flex justify-center pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cognac animate-scroll-cue" />
        </span>
      </a>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent" />
    </section>
  );
}
