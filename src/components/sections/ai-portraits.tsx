"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { FloatingIconsSparse } from "@/components/ui/floating-icons";
import { HummingNote } from "@/components/ui/humming-note";
import { WHATSAPP } from "@/lib/constants";

const FALLBACK_AI_PORTRAITS = [
  { src: "/images/ai-portraits/freepik__candid-lifestyle-indoor-shot-of-a-young-man-with-s__57278.webp", label: "Ensaio IA 01", client: true },
  { src: "/images/ai-portraits/freepik__candid-lifestyle-indoor-shot-of-a-young-man-with-s__57279.webp", label: "Ensaio IA 02", client: true },
];

type FormatKind = "portrait-4x5" | "square" | "other";

type ResolvedPortrait = {
  src: string;
  label: string;
  client: boolean;
  kind: FormatKind;
};

const FORMAT_ORDER: FormatKind[] = ["portrait-4x5", "square", "other"];
const PAGE_SIZE = 4;

function getGridClass(count: number, kind: FormatKind): string {
  if (count <= 1) return "grid-cols-1 max-w-sm mx-auto";

  if (kind === "portrait-4x5") {
    if (count === 2) return "grid-cols-2 max-w-3xl mx-auto";
    if (count === 3) return "grid-cols-1 sm:grid-cols-3";
    if (count === 5) return "grid-cols-2 lg:grid-cols-3";
    return "grid-cols-2 lg:grid-cols-4";
  }

  if (kind === "square") {
    if (count === 2) return "grid-cols-2 max-w-2xl mx-auto";
    if (count === 3) return "grid-cols-1 sm:grid-cols-3";
    return "grid-cols-2 lg:grid-cols-4";
  }

  return "grid-cols-2 lg:grid-cols-4";
}

export function AiPortraits() {
  const [page, setPage] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [resolvedItems, setResolvedItems] = useState<ResolvedPortrait[]>(
    FALLBACK_AI_PORTRAITS.map((item) => ({
      ...item,
      kind: "portrait-4x5" as FormatKind,
    }))
  );

  useEffect(() => {
    let cancelled = false;

    const loadPortraits = async () => {
      try {
        const response = await fetch("/api/ai-portraits-images", { cache: "no-store" });
        const data = (await response.json()) as { images?: string[] };
        const images = data.images ?? [];

        if (!cancelled && images.length > 0) {
          const nextPortraits = images.map((src, index) => ({
            src,
            label: `Ensaio IA ${String(index + 1).padStart(2, "0")}`,
            client: true,
          }));

          setResolvedItems(
            nextPortraits.map((item) => ({
              ...item,
              kind: "portrait-4x5" as FormatKind,
            }))
          );
        }
      } catch {
        // keep fallback list
      }
    };

    loadPortraits();

    return () => {
      cancelled = true;
    };
  }, []);

  const pages = useMemo(() => {
    const ordered = FORMAT_ORDER.flatMap((kind) =>
      resolvedItems.filter((item) => item.kind === kind)
    );

    const result: { kind: FormatKind; items: ResolvedPortrait[] }[] = [];
    let current: ResolvedPortrait[] = [];

    for (const item of ordered) {
      const currentKind = current[0]?.kind;
      const changingKind = currentKind && currentKind !== item.kind;

      if (changingKind || current.length >= PAGE_SIZE) {
        if (current.length > 0) {
          result.push({ kind: current[0].kind, items: current });
        }
        current = [];
      }

      current.push(item);
    }

    if (current.length > 0) {
      result.push({ kind: current[0].kind, items: current });
    }

    return result;
  }, [resolvedItems]);

  useEffect(() => {
    if (page > pages.length - 1) setPage(0);
  }, [page, pages.length]);

  const totalPages = Math.max(1, pages.length);
  const currentPage =
    pages[page] ??
    ({ kind: (resolvedItems[0]?.kind ?? "portrait-4x5") as FormatKind, items: resolvedItems.slice(0, PAGE_SIZE) });
  const visibleItems = currentPage.items;
  const gridClass = getGridClass(visibleItems.length, currentPage.kind);
  const aspectClass =
    currentPage.kind === "square"
      ? "aspect-square"
      : currentPage.kind === "portrait-4x5"
      ? "aspect-[4/5]"
      : "aspect-[4/5]";

  const whatsappAi = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(
    "Olá, Athila! Vi os ensaios de IA no seu site e quero fazer o meu! Pode me contar mais?"
  )}`;

  const goToNextImage = () => {
    if (activeImageIndex === null || visibleItems.length === 0) return;
    setActiveImageIndex((activeImageIndex + 1) % visibleItems.length);
  };

  const goToPreviousImage = () => {
    if (activeImageIndex === null || visibleItems.length === 0) return;
    setActiveImageIndex((activeImageIndex - 1 + visibleItems.length) % visibleItems.length);
  };

  return (
    <section id="ensaios-ia" className="relative py-24 lg:py-32 gradient-section overflow-hidden">
      <FloatingIconsSparse variant={4} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Novo serviço
          </Badge>
          <h2 className="text-bone leading-[0.95]">
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide">
              Ensaios de
            </span>
            <span className="block font-tusker text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mt-1">
              <span className="text-cognac">Inteligência Artificial</span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-bone/50 max-w-2xl mx-auto font-poppins font-light">
            Retratos profissionais criados com IA de última geração. Resultado
            realista, sem estúdio, sem deslocamento — apenas{" "}
            <span className="text-bone font-medium">suas fotos</span> e a minha direção criativa.
          </p>
        </AnimatedSection>

        <StaggerContainer key={`ensaios-page-${page}`} className={`grid ${gridClass} gap-3 sm:gap-4`}>
          {visibleItems.map((item, index) => (
            <div key={item.src}>
              <button
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`group hover-lift-soft relative w-full rounded-xl overflow-hidden border border-border hover:border-cognac/40 transition-all duration-500 cursor-pointer ${aspectClass}`}
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const attemptedFallback = target.dataset.extFallback === "1";

                    if (!attemptedFallback) {
                      if (target.src.endsWith(".webp")) {
                        target.dataset.extFallback = "1";
                        target.src = target.src.replace(/\.webp$/i, ".png");
                        return;
                      }

                      if (target.src.endsWith(".png")) {
                        target.dataset.extFallback = "1";
                        target.src = target.src.replace(/\.png$/i, ".webp");
                        return;
                      }
                    }

                    target.style.display = "none";
                    target.parentElement?.querySelector<HTMLDivElement>(".placeholder")?.style.setProperty("display", "flex");
                  }}
                />

                {/* Placeholder fallback */}
                <div
                  className="placeholder absolute inset-0 hidden flex-col items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(${135 + index * 25}deg, #14213D ${10 + index * 5}%, #0F0F11 ${50 + index * 5}%, #14213D 100%)`,
                  }}
                >
                  <ImageIcon className="h-8 w-8 text-bone/20" strokeWidth={1} />
                  <p className="text-[10px] text-bone/20 font-poppins">{item.label}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Label overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm font-poppins font-medium text-bone">{item.label}</p>
                  {item.client && (
                    <span className="text-[10px] text-cognac font-poppins">Cliente real</span>
                  )}
                </div>

                {/* AI badge */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-6 w-6 rounded-full bg-cognac/30 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-cognac" />
                  </div>
                </div>
              </button>
            </div>
          ))}
        </StaggerContainer>

        {activeImageIndex !== null && visibleItems.length > 0 && (
          <div
            className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setActiveImageIndex(null)}
          >
            <div
              className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={visibleItems[activeImageIndex].src}
                alt={`${visibleItems[activeImageIndex].label} ampliada`}
                className="max-h-[88vh] w-auto max-w-full rounded-xl border border-border object-contain bg-obsidian/90"
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute left-2 sm:left-6"
                onClick={goToPreviousImage}
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute right-2 sm:right-6"
                onClick={goToNextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 sm:top-4 sm:right-4"
                onClick={() => setActiveImageIndex(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Navegação por formato */}
        <AnimatedSection className="mt-8 flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setPage((prev) => (prev - 1 + totalPages) % totalPages)}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <p className="font-poppins text-sm text-bone/60 min-w-16 text-center">
            {Math.min(page + 1, totalPages)} / {totalPages}
          </p>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setPage((prev) => (prev + 1) % totalPages)}
            aria-label="Próxima página"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12 space-y-4">
          <div>
            <Button size="lg" asChild>
              <a href={whatsappAi} target="_blank" rel="noopener noreferrer">
                <Sparkles className="mr-2 h-5 w-5" />
                Quero meu ensaio de IA
              </a>
            </Button>
          </div>
        </AnimatedSection>

        <HummingNote noteId="ai-main" fallbackText={"parece foto\nde verdade"} />
      </div>
    </section>
  );
}
