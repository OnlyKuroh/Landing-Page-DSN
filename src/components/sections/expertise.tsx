"use client";

import { Palette, Gem, Target, Brain, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FloatingIconsSparse } from "@/components/ui/floating-icons";
import { HummingNote } from "@/components/ui/humming-note";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Gem,
  Target,
  Brain,
};

export function Expertise() {
  return (
    <section id="expertise" className="relative py-24 lg:py-32 overflow-hidden">
      <FloatingIconsSparse variant={1} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-cognac mb-4 font-poppins">
            Expertise
          </p>
          <h2 className="text-bone leading-[0.95]">
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide">O que eu faço pelo</span>
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mt-1">seu negócio</span>
          </h2>
          <p className="mt-6 text-lg text-bone/50 max-w-2xl mx-auto font-poppins font-light">
            Cada projeto é tratado como uma ferramenta estratégica para gerar
            resultados reais — não apenas peças bonitas.
          </p>
        </AnimatedSection>

        {/* Services grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <StaggerItem key={service.title}>
                <Card className="group relative overflow-hidden bg-navy/40 border-border hover:border-cognac/40 transition-all duration-500 h-full">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cognac/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cognac/10 border border-cognac/20 group-hover:bg-cognac/20 transition-colors duration-300">
                        <Icon
                          className="h-6 w-6 text-cognac"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg sm:text-xl font-poppins font-bold uppercase tracking-wide">
                          {service.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative">
                    <p className="text-bone/60 leading-relaxed font-poppins font-light">
                      {service.description}
                    </p>
                  </CardContent>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cognac/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <HummingNote noteId="expertise-main" fallbackText={"estratégia é\ntudo"} />
      </div>
    </section>
  );
}
