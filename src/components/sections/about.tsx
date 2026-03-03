"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { FloatingIconsSparse } from "@/components/ui/floating-icons";
import { HummingNote } from "@/components/ui/humming-note";

const highlights = [
  "Visão estratégica aliada a execução impecável",
  "Integração de inteligência artificial no fluxo criativo",
  "Experiência com projetos complexos e multi-segmento",
  "Foco obsessivo em conversão e resultados mensuráveis",
  "Atendimento premium e entregas dentro do prazo",
];

export function About() {
  const [aboutImage, setAboutImage] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadRandomAboutImage = async () => {
      try {
        const response = await fetch("/api/about-images", { cache: "no-store" });
        const data = (await response.json()) as { images?: string[] };
        const images = data.images ?? [];

        if (!cancelled && images.length > 0) {
          const randomIndex = Math.floor(Math.random() * images.length);
          setAboutImage(images[randomIndex]);
          setImageFailed(false);
        }
      } catch {
        if (!cancelled) {
          setAboutImage(null);
          setImageFailed(true);
        }
      }
    };

    loadRandomAboutImage();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="sobre" className="relative py-24 lg:py-32 overflow-hidden">
      <FloatingIconsSparse variant={3} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:items-stretch">
          {/* Photo side */}
          <AnimatedSection direction="left" className="h-full">
            <div className="relative h-full">
              <div className="h-full min-h-[460px] lg:min-h-[720px] w-full max-w-md lg:max-w-none mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border glow-cognac">
                {aboutImage && !imageFailed ? (
                  <img
                    src={aboutImage}
                    alt="Athila Cabrall"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    onError={() => setImageFailed(true)}
                  />
                ) : null}

                {/* Placeholder fallback */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-navy via-obsidian to-navy flex items-center justify-center ${
                    aboutImage && !imageFailed ? "hidden" : "flex"
                  }`}
                >
                  <div className="text-center space-y-4 p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-cognac/20 flex items-center justify-center border-2 border-cognac/30">
                      <span className="text-5xl font-tusker text-cognac">AC</span>
                    </div>
                    <p className="text-bone/40 text-sm">
                      Foto profissional
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 -left-8 w-full h-full rounded-2xl border border-cognac/20" />
            </div>
          </AnimatedSection>

          {/* Text side */}
          <div className="space-y-8 h-full">
            <AnimatedSection>
              <p className="text-sm uppercase tracking-widest text-cognac mb-4 font-poppins">
                Sobre
              </p>
              <h2 className="text-bone leading-[0.95]">
                <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide">Design que une</span>
                <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mt-1">tradição e inovação</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="space-y-4 text-bone/60 leading-relaxed border-l-2 border-cognac/40 pl-6 font-poppins font-light">
                <p>
                  Nos últimos <span className="text-bone font-semibold">6 anos</span>, 
                  ajudei mais de <span className="text-bone font-semibold">132 negócios</span> a 
                  transformar sua presença visual em resultados concretos.
                </p>
                <p>
                  Minha abordagem une a solidez do design tradicional com a 
                  inovação das ferramentas de ponta — incluindo{" "}
                  <span className="text-cognac">inteligência artificial</span> como 
                  parte do fluxo criativo.
                </p>
                <p>
                  Desde campanhas solidárias até materiais educacionais e 
                  acadêmicos, cada projeto é uma oportunidade de criar algo que 
                  não apenas impressiona visualmente, mas que{" "}
                  <span className="text-bone font-semibold">
                    gera impacto real no faturamento
                  </span>{" "}
                  do cliente.
                </p>
              </div>
            </AnimatedSection>

            <StaggerContainer className="space-y-3" staggerDelay={0.08}>
              {highlights.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cognac shrink-0 mt-0.5" />
                    <span className="text-sm text-bone/70 font-poppins">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimatedSection delay={0.4}>
              <div className="pt-4">
                <p className="text-lg font-poppins font-bold uppercase text-bone">
                  Athila <span className="text-cognac">Cabrall</span>
                </p>
                <p className="text-sm text-bone/40 font-poppins">
                  Senior Visual Designer & Creative Strategist
                </p>
              </div>
            </AnimatedSection>

            <HummingNote noteId="about-main" fallbackText={"design com\npropósito"} />
          </div>
        </div>
      </div>
    </section>
  );
}
