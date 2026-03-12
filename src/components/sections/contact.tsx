"use client";

import { MessageCircle, MapPin, Clock, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { LeadForm } from "@/components/forms/lead-form";
import { WHATSAPP } from "@/lib/constants";

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contato" className="relative section-padding">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111827]/20 to-[#0A0A0C] pointer-events-none" />

      <div className="section-container relative">
        <AnimatedSection className="text-center mb-14 lg:mb-18">
          <p className="text-xs uppercase tracking-[0.25em] text-cognac mb-4 font-poppins font-medium">
            Contato
          </p>
          <h2 className="font-tusker text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-bone leading-[0.9]">
            Vamos transformar{" "}
            <span className="text-gradient">sua marca?</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-bone/40 max-w-2xl mx-auto font-poppins font-light">
            Preencha o formulário ou fale diretamente comigo no WhatsApp.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
          {/* Form */}
          <AnimatedSection className="lg:col-span-7" direction="left">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <LeadForm />
            </div>
          </AnimatedSection>

          {/* Side info */}
          <AnimatedSection className="lg:col-span-5 space-y-4" direction="right">
            {/* WhatsApp CTA */}
            <motion.div
              className="glass-card rounded-2xl p-6 space-y-4 relative overflow-hidden"
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#25D366]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-11 w-11 rounded-full bg-[#25D366]/15 flex items-center justify-center border border-[#25D366]/20">
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-semibold text-bone text-sm">WhatsApp Direto</p>
                    <p className="text-xs text-bone/40">Resposta rápida</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full"
                  asChild
                >
                  <a href={WHATSAPP.link} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chamar no WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Info cards */}
            <div className="glass-card rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-cognac shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-bone/35 mb-0.5 font-poppins uppercase tracking-wider">
                    Localização
                  </p>
                  <p className="text-sm text-bone font-medium font-poppins">
                    Goiânia, GO — Brasil
                  </p>
                </div>
              </div>

              <div className="section-divider" />

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-cognac shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-bone/35 mb-0.5 font-poppins uppercase tracking-wider">
                    Atendimento
                  </p>
                  <p className="text-sm text-bone font-medium font-poppins">
                    Remoto para todo o Brasil
                  </p>
                </div>
              </div>

              <div className="section-divider" />

              <div className="flex items-start gap-3">
                <ExternalLink className="h-4 w-4 text-cognac shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-bone/35 mb-0.5 font-poppins uppercase tracking-wider">
                    Portfólio
                  </p>
                  <a
                    href="https://behance.net/athilapsd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cognac font-medium hover:text-cognac-light transition-colors font-poppins"
                  >
                    behance.net/athilapsd
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
