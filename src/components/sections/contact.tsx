"use client";

import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { LeadForm } from "@/components/forms/lead-form";
import { FloatingIconsSparse } from "@/components/ui/floating-icons";
import { HummingNote } from "@/components/ui/humming-note";
import { WHATSAPP } from "@/lib/constants";

export function Contact() {
  return (
    <section id="contato" className="relative py-24 lg:py-32 overflow-hidden">
      <FloatingIconsSparse variant={6} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-cognac mb-4 font-poppins">
            Contato
          </p>
          <h2 className="text-bone leading-[0.95]">
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide">Vamos transformar</span>
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mt-1">sua marca?</span>
          </h2>
          <p className="mt-6 text-lg text-bone/50 max-w-2xl mx-auto font-poppins font-light">
            Preencha o formulário abaixo ou fale diretamente comigo no WhatsApp.
            Respondo em até 24 horas.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3" direction="left">
            <Card className="bg-navy/30 border-border">
              <CardContent className="p-6 sm:p-8">
                <LeadForm />
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Side info */}
          <AnimatedSection className="lg:col-span-2 space-y-8" direction="right">
            <div className="relative">
              <HummingNote noteId="contact-main" fallbackText={"bora conversar"} />
            </div>

            {/* Quick WhatsApp */}
            <Card className="bg-navy/30 border-border">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-semibold text-bone">WhatsApp Direto</p>
                    <p className="text-sm text-bone/50">Resposta rápida</p>
                  </div>
                </div>
                <p className="text-sm text-bone/60">
                  Prefere ir direto ao ponto? Clique abaixo e inicie uma
                  conversa agora mesmo.
                </p>
                <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white" asChild>
                  <a
                    href={WHATSAPP.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chamar no WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Info cards */}
            <Card className="bg-navy/30 border-border">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <p className="text-sm text-bone/50 mb-1">Localização</p>
                  <p className="text-bone font-medium">Goiânia, GO — Brasil</p>
                </div>
                <div>
                  <p className="text-sm text-bone/50 mb-1">Atendimento</p>
                  <p className="text-bone font-medium">
                    Remoto para todo o Brasil
                  </p>
                </div>
                <div>
                  <p className="text-sm text-bone/50 mb-1">Portfólio</p>
                  <a
                    href="https://behance.net/athilapsd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cognac font-medium hover:underline"
                  >
                    behance.net/athilapsd
                  </a>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
