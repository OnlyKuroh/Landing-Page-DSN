"use client";

import { Palette, Gem, Target, Brain, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = { Palette, Gem, Target, Brain };

const gridSpans = [
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
];

export function Expertise() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="expertise" className="relative section-padding">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-cognac mb-4 font-poppins font-medium">
            Expertise
          </p>
          <h2 className="font-tusker text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-bone leading-[0.9]">
            O que eu faço pelo{" "}
            <span className="text-gradient-gold">seu negócio</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-bone/40 max-w-2xl mx-auto font-poppins font-light leading-relaxed">
            Cada projeto é tratado como ferramenta estratégica para gerar resultados
            — não apenas peças bonitas.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <StaggerItem key={service.title} className={gridSpans[index]}>
                <motion.div
                  className="glass-card-hover rounded-2xl p-6 sm:p-8 h-full relative overflow-hidden group"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Ordinal number */}
                  <span className="absolute top-4 right-5 text-6xl sm:text-7xl font-tusker text-bone/[0.03] pointer-events-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cognac/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative flex flex-col h-full">
                    {/* Icon */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cognac/10 border border-cognac/15 group-hover:border-cognac/30 group-hover:bg-cognac/15 transition-all duration-300">
                        <Icon className="h-5 w-5 text-cognac" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-base sm:text-lg font-poppins font-bold text-bone uppercase tracking-wide">
                        {service.title}
                      </h3>
                    </div>

                    {/* Content */}
                    <p className="text-sm sm:text-base text-bone/45 leading-relaxed font-poppins font-light flex-grow">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
