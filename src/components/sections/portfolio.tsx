"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, ExternalLink, Image as ImageIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { SOCIAL } from "@/lib/constants";
import { FloatingIconsSparse } from "@/components/ui/floating-icons";
import { useSiteContent } from "@/hooks/use-site-content";
import { HummingNote } from "@/components/ui/humming-note";

const toImageUrl = (folder: string, fileName: string) =>
  `/images/portfolio/${folder}/${encodeURIComponent(fileName)}`;

const PROJECT_1_FILES = [
  "CARD - BENS BLOQUEADOS (18.09).png",
  "CARD - DIREITO MEDICO  (02.09).png",
  "CARD - ERRO MEDICO (27.09).png",
  "CARD - EXECUÇÃO FISCAL (11.09).png",
  "CARD - FUNDO MEZANINO (30.09).png",
  "CARD - INCOR. IMOBILIARIA (09.09).png",
  "CARD - INVENTARIO RURAL (20.09).png",
  "CARD - NF ELETRONICA (23.09).png",
  "CARD - NOTICIA (06.09).png",
  "CARD - PROCEDIMENTOS DERMA. (13.09).png",
  "CARD - QUEBRA DE SAFRA (04.09).png",
  "CARD - REDUZIR CARGA (19.09).png",
  "CARD - REGULARIZAR IMOVEIS (25.09).png",
] as const;

const PROJECT_2_FILES = [
  "CARD 1 - GESTÃO PERSONALIZADA.png",
  "CARD 10 - SISTEMA PROPRIO.png",
  "CARD 11 - POWER BI.png",
  "CARD 12 - CASOS DE SUCESSO.png",
  "CARD 13 - DESIGN DE SISTEMA.png",
  "CARD 14 - ACADEMIA.png",
  "CARD 15 - SOLUÇÕES PEQUENAS.png",
  "CARD 2 - AUTOMAÇÃO DE PROCESSOS.png",
  "CARD 3 - GESTÃO EFICIENTE.png",
  "CARD 4 - SISTEMA DE LÓGICA.png",
  "CARD 5 - VAREJO.png",
  "CARD 6 - ESTOQUE_.png",
  "CARD 7 - EDUCAÇÃO.png",
  "CARD 8 - CALENDARIO.png",
  "CARD 9 - SEGURANÇA NA NUVEM.png",
] as const;

const PROJECT_3_FILES = [
  "CARD - ACOMPANHADO DESDE O INICIO.png",
  "CARD - APRENDA E COLOQUE.png",
  "CARD - AREA TECH INCLUSIVA_.png",
  "CARD - COMUNIDADE +.png",
  "CARD - FUTURO DA SUA CARREIRA.png",
  "CARD - MENTOR CERTO.png",
  "CARD - MUDANDO DE CARREIRA.png",
  "CARD - NETWORKING COM DEVS.png",
  "CARD - NINGUÉM CRESCE SOZINHO.png",
  "CARD - NOSSA MENTORIA.png",
  "CARD - PODER DA MENTORIA.png",
  "CARD - PQ GASTAR_.png",
  "CARD - PRIMEIRO PASSO.png",
  "CARD - PROGRAMAÇÃO DESCOMPLICADA.png",
  "CARD - QUER SER DEV_.png",
  "CARD - SE DESTAQUE NO MERCADO.png",
  "CARD - TECNOLOGIA PRA TODOS.png",
  "CARD - TECNOLOGIA.png",
  "CARD - TRANSFORMA SUA CARREIRA.png",
] as const;

const FALLBACK_FILES_BY_FOLDER: Record<string, readonly string[]> = {
  "projeto-1": PROJECT_1_FILES,
  "projeto-2": PROJECT_2_FILES,
  "projeto-3": PROJECT_3_FILES,
};

export function Portfolio() {
  const content = useSiteContent();
  const editableProjects = content.portfolio.projects;

  const projectGalleries = useMemo(
    () =>
      editableProjects.map((item) => ({
        ...item,
        images:
          (FALLBACK_FILES_BY_FOLDER[item.folder]?.length ?? 0) > 0
            ? FALLBACK_FILES_BY_FOLDER[item.folder].map((fileName) =>
                toImageUrl(item.folder, fileName)
              )
            : [
                `/images/portfolio/${item.folder}/1.jpg`,
                `/images/portfolio/${item.folder}/2.jpg`,
                `/images/portfolio/${item.folder}/3.jpg`,
                `/images/portfolio/${item.folder}/4.jpg`,
                `/images/portfolio/${item.folder}/5.jpg`,
                `/images/portfolio/${item.folder}/6.jpg`,
              ],
      })),
    [editableProjects]
  );

  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [folderImages, setFolderImages] = useState<Record<string, string[]>>({});
  const [coverImages, setCoverImages] = useState<string[]>(
    projectGalleries.map((project) => project.images[0])
  );
  const [coverZoom, setCoverZoom] = useState<number[]>(
    projectGalleries.map(() => 1)
  );

  useEffect(() => {
    let cancelled = false;

    const loadImagesFromFolders = async () => {
      const folders = [...new Set(projectGalleries.map((project) => project.folder))];

      const entries = await Promise.all(
        folders.map(async (folder) => {
          try {
            const response = await fetch(`/api/portfolio-images/${folder}`, { cache: "no-store" });
            const data = (await response.json()) as { images?: string[] };
            return [folder, data.images ?? []] as const;
          } catch {
            return [folder, []] as const;
          }
        })
      );

      if (!cancelled) {
        setFolderImages(Object.fromEntries(entries));
      }
    };

    loadImagesFromFolders();

    return () => {
      cancelled = true;
    };
  }, [projectGalleries]);

  const galleriesWithRealImages = useMemo(
    () =>
      projectGalleries.map((project) => ({
        ...project,
        images:
          folderImages[project.folder] && folderImages[project.folder].length > 0
            ? folderImages[project.folder]
            : project.images,
      })),
    [projectGalleries, folderImages]
  );

  useEffect(() => {
    setCoverImages(
      galleriesWithRealImages.map((project) => {
        const randomIndex = Math.floor(Math.random() * project.images.length);
        return project.images[randomIndex];
      })
    );
  }, [galleriesWithRealImages]);

  useEffect(() => {
    let cancelled = false;

    const resolveZoom = (src: string) =>
      new Promise<number>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const ratio = img.naturalWidth / img.naturalHeight;
          if (Math.abs(ratio - 1) <= 0.03) {
            resolve(1.12);
            return;
          }
          if (ratio > 1) {
            resolve(1.2);
            return;
          }
          resolve(1.02);
        };
        img.onerror = () => resolve(1.04);
        img.src = src;
      });

    Promise.all(coverImages.map(resolveZoom)).then((zooms) => {
      if (!cancelled) setCoverZoom(zooms);
    });

    return () => {
      cancelled = true;
    };
  }, [coverImages]);

  const activeProject =
    activeProjectIndex !== null ? galleriesWithRealImages[activeProjectIndex] : null;

  const goToNextProject = () => {
    if (activeProjectIndex === null) return;
    setActiveProjectIndex((activeProjectIndex + 1) % galleriesWithRealImages.length);
  };

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 gradient-section overflow-hidden">
      <FloatingIconsSparse variant={2} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-cognac mb-4 font-poppins">
            Portfólio
          </p>
          <h2 className="text-bone leading-[0.95]">
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide">{content.portfolio.titleTop}</span>
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mt-1">{content.portfolio.titleBottom}</span>
          </h2>
          <p className="mt-6 text-lg text-bone/50 max-w-2xl mx-auto font-poppins font-light">
            {content.portfolio.description}
          </p>
        </AnimatedSection>

        <HummingNote noteId="portfolio-open" fallbackText={"clique no projeto\npara abrir o case"} />
        <HummingNote noteId="portfolio-behance" fallbackText={"abra no behance\npara ver tudo"} />

        {/* Portfolio grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleriesWithRealImages.map((item, index) => (
            <StaggerItem key={item.title}>
              <button
                type="button"
                onClick={() => setActiveProjectIndex(index)}
                className="group hover-lift-soft relative w-full text-left aspect-[4/5] rounded-xl overflow-hidden border border-border hover:border-cognac/40 transition-all duration-500 cursor-pointer"
              >
                <img
                  src={coverImages[index]}
                  alt={`Capa do projeto ${item.title}`}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700"
                  style={{ transform: `scale(${coverZoom[index] ?? 1.04})` }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement
                      ?.querySelector<HTMLDivElement>(".cover-placeholder")
                      ?.style.setProperty("display", "flex");
                  }}
                />
                <div
                  className="cover-placeholder absolute inset-0 hidden flex-col items-center justify-center gap-3"
                  style={{
                    background: `linear-gradient(${135 + index * 30}deg, #14213D ${10 + index * 5}%, #0F0F11 ${60 + index * 5}%, #14213D 100%)`,
                  }}
                >
                  <ImageIcon className="h-12 w-12 text-bone/30" strokeWidth={1} />
                  <p className="text-xs text-bone/30">Imagem de capa</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Badge className="mb-2 text-[10px]">{item.category}</Badge>
                  <h3 className="text-[28px] leading-[0.95] font-tusker uppercase text-bone">
                    {item.title}
                  </h3>
                </div>

                {/* Top-right indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cognac/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="h-4 w-4 text-cognac" />
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <a
              href={SOCIAL.behance}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Portfólio Completo no Behance
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </AnimatedSection>
      </div>

      {/* Behance-style popup viewer */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-md p-4 sm:p-6 lg:p-10"
          onClick={() => setActiveProjectIndex(null)}
        >
          <div
            className="relative mx-auto mt-2 sm:mt-6 w-full max-w-6xl max-h-[88vh] rounded-2xl border border-border bg-obsidian/95 overflow-hidden shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-cognac font-poppins">Projeto aberto</p>
                <h3 className="font-tusker uppercase text-bone text-xl sm:text-2xl">
                  {activeProject.title}
                </h3>
                <p className="text-bone/55 font-poppins text-sm">{activeProject.category}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={goToNextProject}>
                  Próximo
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="icon" onClick={() => setActiveProjectIndex(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="max-h-[calc(88vh-86px)] overflow-y-auto p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeProject.images.map((image, imageIndex) => (
                  <div key={image} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border">
                    <img
                      src={image}
                      alt={`${activeProject.title} imagem ${imageIndex + 1}`}
                      className="absolute inset-0 w-full h-full object-contain bg-obsidian p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement
                          ?.querySelector<HTMLDivElement>(".gallery-placeholder")
                          ?.style.setProperty("display", "flex");
                      }}
                    />
                    <div
                      className="gallery-placeholder absolute inset-0 hidden items-center justify-center"
                      style={{
                        background: `linear-gradient(${125 + imageIndex * 8}deg, #14213D 0%, #0F0F11 70%, #14213D 100%)`,
                      }}
                    >
                      <ImageIcon className="h-9 w-9 text-bone/30" strokeWidth={1} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
