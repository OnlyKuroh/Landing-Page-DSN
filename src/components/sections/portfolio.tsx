"use client";

import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PORTFOLIO_PROJECTS, SOCIAL } from "@/lib/constants";

const PROJECT_FILES: Record<string, string[]> = {
  "projeto-1": [
    "CARD - BENS BLOQUEADOS (18.09).webp",
    "CARD - DIREITO MEDICO  (02.09).webp",
    "CARD - ERRO MEDICO (27.09).webp",
    "CARD - EXECUÇÃO FISCAL (11.09).webp",
    "CARD - FUNDO MEZANINO (30.09).webp",
    "CARD - INCOR. IMOBILIARIA (09.09).webp",
    "CARD - INVENTARIO RURAL (20.09).webp",
    "CARD - NF ELETRONICA (23.09).webp",
    "CARD - NOTICIA (06.09).webp",
    "CARD - PROCEDIMENTOS DERMA. (13.09).webp",
    "CARD - QUEBRA DE SAFRA (04.09).webp",
    "CARD - REDUZIR CARGA (19.09).webp",
    "CARD - REGULARIZAR IMOVEIS (25.09).webp",
  ],
  "projeto-2": [
    "CARD 1 - GESTÃO PERSONALIZADA.webp",
    "CARD 10 - SISTEMA PROPRIO.webp",
    "CARD 11 - POWER BI.webp",
    "CARD 12 - CASOS DE SUCESSO.webp",
    "CARD 13 - DESIGN DE SISTEMA.webp",
    "CARD 14 - ACADEMIA.webp",
    "CARD 15 - SOLUÇÕES PEQUENAS.webp",
    "CARD 2 - AUTOMAÇÃO DE PROCESSOS.webp",
    "CARD 3 - GESTÃO EFICIENTE.webp",
    "CARD 4 - SISTEMA DE LÓGICA.webp",
    "CARD 5 - VAREJO.webp",
    "CARD 6 - ESTOQUE_.webp",
    "CARD 7 - EDUCAÇÃO.webp",
    "CARD 8 - CALENDARIO.webp",
    "CARD 9 - SEGURANÇA NA NUVEM.webp",
  ],
  "projeto-3": [
    "CARD - ACOMPANHADO DESDE O INICIO.webp",
    "CARD - APRENDA E COLOQUE.webp",
    "CARD - AREA TECH INCLUSIVA_.webp",
    "CARD - COMUNIDADE +.webp",
    "CARD - FUTURO DA SUA CARREIRA.webp",
    "CARD - MENTOR CERTO.webp",
    "CARD - MUDANDO DE CARREIRA.webp",
    "CARD - NETWORKING COM DEVS.webp",
    "CARD - NINGUÉM CRESCE SOZINHO.webp",
    "CARD - NOSSA MENTORIA.webp",
    "CARD - PODER DA MENTORIA.webp",
    "CARD - PQ GASTAR_.webp",
    "CARD - PRIMEIRO PASSO.webp",
    "CARD - PROGRAMAÇÃO DESCOMPLICADA.webp",
    "CARD - QUER SER DEV_.webp",
    "CARD - SE DESTAQUE NO MERCADO.webp",
    "CARD - TECNOLOGIA PRA TODOS.webp",
    "CARD - TECNOLOGIA.webp",
    "CARD - TRANSFORMA SUA CARREIRA.webp",
  ],
  "projeto-4": [
    "CARD - 1 CARTA.webp",
    "CARD - 1 CARTAS.webp",
    "CARD - 2 CARTA.webp",
    "CARD - 3 CARTAS.webp",
    "CARD - ARIES E TOURO.webp",
    "CARD - DESCUBRA O AMOR.webp",
    "CARD - O LOUCO.webp",
    "CARD - SEGREDOS DOS TAROS.webp",
    "CARD - TAROT E PROSPERIDADE.webp",
  ],
  "projeto-5": [
    "FEED - AGILIDADE.webp",
    "FEED - AGRICOLA.webp",
    "FEED - DIA DAS ARTES.webp",
    "FEED - DIA DO CLIENTE.webp",
    "FEED - DIA DO TRANSITO.webp",
    "FEED - EVENTO TRAGICO.webp",
    "FEED - GUIA PRATICO.webp",
    "FEED - IR E VIR.webp",
    "FEED - MOMENTO DE AGIR.webp",
    "FEED - NAO PRECISA.webp",
    "FEED - PATRIMONIO.webp",
    "FEED - SEGURO AGRICULTURA.webp",
    "FEED - SEGURO CONDOMINIO.webp",
    "FEED - SEGURO MOTO.webp",
    "FEED - SEGURO RESIDENCIAL.webp",
    "FEED - SEU LAR SEGURO.webp",
    "FEED - SOLUCAO PARA VOCE.webp",
  ],
  "projeto-6": [
    "FEED 1 - TRATAMENTO SUAVIZA.webp",
    "FEED 2 - O LASER TRANSFORMA.webp",
    "FEED 3 - RENOVE SUA PELE.webp",
    "FEED 4 - NOSSAS CRIANÇAS.webp",
    "FEED 5 - ALIMENTAÇÃO.webp",
    "FEED 5 - TRANSFORMAÇÃO NOTAVEL.webp",
    "FEED 6 - CIDADE.webp",
    "FEED 7 - QUEDA DE CABELO.webp",
    "FEED 9 - INTRADERMOTERAPIA.webp",
    "FEED 10 - CUIDADOS DA PELE.webp",
    "FEED 11 - DESCUBRA A ELEGANCIA.webp",
    "FEED 12 - COLAGENO.webp",
    "FEED 14 - APARENCIA MAIS JOVEM.webp",
    "FEED 15 - BELEZA INCOMPARAVEL.webp",
  ],
};

function getProjectImages(folder: string): string[] {
  const files = PROJECT_FILES[folder];
  if (files) {
    return files.map(
      (f) => `/images/portfolio/${folder}/${encodeURIComponent(f)}`
    );
  }
  return Array.from(
    { length: 6 },
    (_, i) => `/images/portfolio/${folder}/${i + 1}.webp`
  );
}

export function Portfolio() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  /* Main carousel */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  /* Modal carousel for project images */
  const [modalEmblaRef, modalEmblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });

  const modalPrev = useCallback(() => modalEmblaApi?.scrollPrev(), [modalEmblaApi]);
  const modalNext = useCallback(() => modalEmblaApi?.scrollNext(), [modalEmblaApi]);

  const projects = PORTFOLIO_PROJECTS.map((p) => ({
    ...p,
    images: getProjectImages(p.folder),
  }));

  const currentProject = activeProject !== null ? projects[activeProject] : null;
  const currentImages = currentProject?.images ?? [];

  return (
    <section id="portfolio" className="relative section-padding gradient-section">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-cognac mb-4 font-poppins font-medium">
            Portfólio
          </p>
          <h2 className="font-tusker text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-bone leading-[0.9]">
            Trabalhos que{" "}
            <span className="text-gradient">falam por si</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-bone/40 max-w-2xl mx-auto font-poppins font-light">
            Uma seleção dos projetos que geraram resultados reais para os clientes.
          </p>
        </AnimatedSection>

        {/* Carousel */}
        <AnimatedSection direction="scale">
          <div className="relative">
            {/* Embla container */}
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex gap-4 lg:gap-6">
                {projects.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0"
                  >
                    <motion.button
                      type="button"
                      onClick={() => setActiveProject(index)}
                      className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border hover:border-cognac/30 transition-all duration-500 cursor-pointer"
                      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <img
                        src={item.images[0]}
                        alt={`Capa — ${item.title}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />

                      {/* Fallback */}
                      <div className="absolute inset-0 bg-gradient-to-br from-navy to-obsidian flex items-center justify-center -z-10">
                        <ImageIcon className="h-12 w-12 text-bone/10" strokeWidth={1} />
                      </div>

                      {/* Bottom overlay always visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/80 via-[#0A0A0C]/20 to-transparent" />

                      {/* Info */}
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <Badge className="mb-2 text-[10px] bg-cognac/20 text-cognac border-cognac/30">
                          {item.category}
                        </Badge>
                        <h3 className="text-sm font-poppins font-bold uppercase text-bone tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-bone/40 font-poppins mt-1">
                          {item.images.length} peças • Clique para ver
                        </p>
                      </div>

                      {/* Corner icon */}
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                        <ExternalLink className="h-4 w-4 text-cognac" />
                      </div>
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav arrows */}
            <button
              type="button"
              onClick={scrollPrev}
              className="absolute left-2 lg:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center border border-border/50 hover:border-cognac/30 transition-colors"
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="h-5 w-5 text-bone/60" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="absolute right-2 lg:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center border border-border/50 hover:border-cognac/30 transition-colors"
              aria-label="Próximo projeto"
            >
              <ChevronRight className="h-5 w-5 text-bone/60" />
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center mt-12 lg:mt-16">
          <Button size="lg" variant="outline" className="rounded-full group" asChild>
            <a href={SOCIAL.behance} target="_blank" rel="noopener noreferrer">
              Ver Portfólio Completo no Behance
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </AnimatedSection>
      </div>

      {/* Project gallery modal — Behance-style with blurred background */}
      <AnimatePresence>
        {currentProject && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-xl"
            onClick={() => {
              setLightboxIndex(null);
              setActiveProject(null);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative mx-auto mt-4 sm:mt-8 w-[95%] max-w-5xl max-h-[90vh] rounded-2xl border border-border/30 bg-[#0A0A0C]/95 backdrop-blur-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.22, 0.68, 0.35, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/30 px-5 sm:px-7 py-4">
                <div>
                  <Badge className="mb-1.5 text-[10px] bg-cognac/20 text-cognac border-cognac/30">
                    {currentProject.category}
                  </Badge>
                  <h3 className="font-poppins font-bold uppercase text-bone text-lg tracking-wide">
                    {currentProject.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-bone/30 font-poppins">
                    {currentImages.length} peças
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setActiveProject(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Carousel of project images */}
              <div className="relative">
                <div className="overflow-hidden" ref={modalEmblaRef}>
                  <div className="flex">
                    {currentImages.map((image, i) => (
                      <div key={image} className="flex-[0_0_100%] min-w-0">
                        <div className="flex items-center justify-center p-4 sm:p-8 max-h-[calc(90vh-80px)]">
                          <img
                            src={image}
                            alt={`${currentProject.title} — ${i + 1}`}
                            className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal nav arrows */}
                {currentImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={modalPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center border border-border/40 hover:border-cognac/30 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-bone/60" />
                    </button>
                    <button
                      type="button"
                      onClick={modalNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center border border-border/40 hover:border-cognac/30 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-bone/60" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
