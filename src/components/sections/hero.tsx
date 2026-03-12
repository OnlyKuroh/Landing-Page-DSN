"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { STATS, SOCIAL } from "@/lib/constants";

const HERO_IMAGES = [
  "/images/hero/freepik__candid-relaxed-studio-portrait-of-a-young-man-with__57261.webp",
  "/images/hero/freepik__ultrarealistic-medium-shot-of-a-detailed-creative-__57250.webp",
  "/images/hero/freepik__a-photorealistic-candid-portrait-captures-a-young-__57245.webp",
  "/images/hero/freepik__cozy-cinematic-portrait-of-a-young-man-with-curly-__66246.webp",
];

const headlineWords = ["Design", "que", "Vende."];

export function Hero() {
  const [heroImage, setHeroImage] = useState(HERO_IMAGES[0]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const idx = Math.floor(Math.random() * HERO_IMAGES.length);
    setHeroImage(HERO_IMAGES[idx]);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >

      {/* Background image — right side on desktop, full on mobile */}
      <div className="absolute inset-0 lg:left-1/2">
        <img
          src={heroImage}
          alt="Athila Cabrall — Senior Visual Designer"
          className="h-full w-full object-cover object-center"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/90 to-[#0A0A0C]/20 lg:from-[#0A0A0C] lg:via-[#0A0A0C]/80 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/60 lg:from-[#0A0A0C]/60 lg:via-transparent lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/30 via-transparent to-transparent" />
      </div>

      {/* Decorative elements */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-cognac/30"
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-2/3 left-[30%] w-1.5 h-1.5 rounded-full bg-cognac/20"
            animate={{ y: [8, -8, 8], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-[10%] w-1 h-1 rounded-full bg-bone/10"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative section-container pt-32 pb-24 lg:pt-0 lg:pb-0">
        <div className="max-w-2xl space-y-8 lg:space-y-10">
          {/* Subtitle */}
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-cognac font-poppins font-medium"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Senior Visual Designer & Creative Strategist
          </motion.p>

          {/* Headline — word by word */}
          <div className="leading-[0.85]">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                className={`inline-block font-tusker text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem] xl:text-[8rem] mr-4 lg:mr-6 ${
                  i === 2 ? "text-cognac" : "text-bone"
                }`}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 60, rotateX: -15 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.12,
                  ease: [0.22, 0.68, 0.35, 1.0],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Decorative script line */}
          <motion.p
            className="font-humming text-xl sm:text-2xl lg:text-3xl text-bone/40 -mt-2"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            transformando visão em faturamento
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-bone/50 max-w-lg leading-relaxed font-poppins font-light"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Artes estratégicas, branding e criativos que{" "}
            <span className="text-bone font-medium">convertem de verdade</span>.
            Mais que design bonito — resultados mensuráveis.
          </motion.p>

          {/* Stats — floating glass cards */}
          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-card rounded-xl px-5 py-3 sm:px-6 sm:py-4"
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <p className="text-xl sm:text-2xl font-tusker text-cognac leading-none">
                  <CountUp end={parseInt(stat.value)} suffix="+" />
                </p>
                <p className="text-[10px] sm:text-xs text-bone/40 font-poppins uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Button size="lg" className="rounded-full group" asChild>
              <a href="#contato">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full group" asChild>
              <a href={SOCIAL.behance} target="_blank" rel="noopener noreferrer">
                Ver Portfólio
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/50 to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-bone/30 font-poppins">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 text-bone/30 animate-scroll-hint" />
        </motion.div>
      )}
    </section>
  );
}
