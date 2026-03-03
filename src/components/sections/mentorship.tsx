"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Users, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { WHATSAPP } from "@/lib/constants";
import { FloatingIconsSparse } from "@/components/ui/floating-icons";
import { HummingNote } from "@/components/ui/humming-note";

const mentorshipBenefits = [
  {
    icon: Zap,
    title: "Acelere seus Resultados",
    description:
      "Aprenda em semanas o que levei 6 anos de mercado para dominar. Atalhos reais, sem enrolação.",
  },
  {
    icon: BookOpen,
    title: "Método Comprovado",
    description:
      "O mesmo processo criativo que usei para atender +132 clientes, adaptado pra sua realidade.",
  },
  {
    icon: Users,
    title: "Acompanhamento Próximo",
    description:
      "Mentorias individuais com feedback direto no seu trabalho. Evolução visível a cada sessão.",
  },
];

export function Mentorship() {
  const [mentoriaImage, setMentoriaImage] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadRandomMentoriaImage = async () => {
      try {
        const response = await fetch("/api/mentoria-images", { cache: "no-store" });
        const data = (await response.json()) as { images?: string[] };
        const images = data.images ?? [];

        if (!cancelled && images.length > 0) {
          const randomIndex = Math.floor(Math.random() * images.length);
          setMentoriaImage(images[randomIndex]);
          setImageFailed(false);
        }
      } catch {
        if (!cancelled) {
          setMentoriaImage(null);
          setImageFailed(true);
        }
      }
    };

    loadRandomMentoriaImage();

    return () => {
      cancelled = true;
    };
  }, []);

  const whatsappMentoria = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(
    "Olá, Athila! Vim pelo seu site e tenho interesse na mentoria de design. Gostaria de saber mais!"
  )}`;

  return (
    <section id="mentoria" className="relative py-24 lg:py-32 overflow-hidden">
      <FloatingIconsSparse variant={5} />
      {/* Background visual */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-cognac/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-navy/20 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Novo
          </Badge>
          <h2 className="text-bone leading-[0.95]">
            <span className="block font-tusker text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wide">
              Mentoria de
            </span>
            <span className="block font-tusker text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wide mt-1">
              Design Estratégico
            </span>
          </h2>
          <p className="mt-6 text-lg text-bone/50 max-w-2xl mx-auto font-poppins font-light">
            Para designers que querem sair do &ldquo;faço arte bonita&rdquo; e entrar no
            território do <span className="text-cognac font-medium">design que fatura</span>.
          </p>
        </AnimatedSection>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Mini Banners / Benefits */}
          <StaggerContainer className="lg:col-span-3 space-y-6" staggerDelay={0.12}>
            {mentorshipBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.title}>
                  <div className="mini-banner rounded-xl p-6 sm:p-8 flex gap-5 items-start group hover:border-cognac/40 transition-all duration-500">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cognac/15 border border-cognac/25 group-hover:bg-cognac/25 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-cognac" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-tusker text-lg sm:text-xl uppercase text-bone tracking-wide">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-bone/50 font-poppins font-light leading-relaxed text-sm sm:text-base">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* CTA Card */}
          <AnimatedSection className="lg:col-span-2" direction="right">
            <Card className="bg-gradient-to-br from-navy/60 via-obsidian to-navy/40 border-cognac/30 sticky top-24 overflow-hidden">
              <div className="relative aspect-[16/10] border-b border-border">
                {mentoriaImage && !imageFailed ? (
                  <img
                    src={mentoriaImage}
                    alt="Preview da mentoria"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    onError={() => setImageFailed(true)}
                  />
                ) : null}

                <div
                  className={`absolute inset-0 bg-gradient-to-br from-navy via-obsidian to-navy ${
                    mentoriaImage && !imageFailed ? "hidden" : "block"
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cognac/5 rounded-bl-full" />

              <CardContent className="relative p-8 space-y-6">
                <div>
                  <p className="font-poppins font-bold text-2xl sm:text-3xl text-bone">
                    Transforme seu design
                  </p>
                  <p className="font-tusker text-2xl sm:text-3xl uppercase text-cognac mt-1">
                    Em ferramenta de vendas
                  </p>
                </div>

                <div className="space-y-3 font-poppins">
                  <div className="flex items-center gap-3 text-sm text-bone/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-cognac" />
                    Sessões individuais 1:1
                  </div>
                  <div className="flex items-center gap-3 text-sm text-bone/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-cognac" />
                    Análise de portfólio e posicionamento
                  </div>
                  <div className="flex items-center gap-3 text-sm text-bone/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-cognac" />
                    Estratégia de precificação
                  </div>
                  <div className="flex items-center gap-3 text-sm text-bone/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-cognac" />
                    Fluxo criativo com IA integrada
                  </div>
                  <div className="flex items-center gap-3 text-sm text-bone/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-cognac" />
                    Suporte via WhatsApp entre sessões
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <Button size="lg" className="w-full" asChild>
                    <a
                      href={whatsappMentoria}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Quero a Mentoria
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <p className="text-center text-xs text-bone/30 font-poppins">
                    Vagas limitadas — atendimento exclusivo
                  </p>
                </div>

                <div className="relative h-16">
                  <HummingNote noteId="mentorship-main" fallbackText={"invista em\nvocê"} />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
