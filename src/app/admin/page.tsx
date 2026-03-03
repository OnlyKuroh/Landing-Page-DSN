"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import {
  ADMIN_CONTENT_KEY,
  DEFAULT_SITE_CONTENT,
  mergeSiteContent,
  type EditableProject,
  type HummingNoteConfig,
  type SiteContent,
} from "@/lib/admin-content";
import { Button } from "@/components/ui/button";

function reorder<T>(array: T[], from: number, to: number): T[] {
  const copy = [...array];
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved);
  return copy;
}

export default function AdminPage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window === "undefined") return DEFAULT_SITE_CONTENT;
    try {
      const stored = window.localStorage.getItem(ADMIN_CONTENT_KEY);
      if (!stored) return DEFAULT_SITE_CONTENT;
      return mergeSiteContent(JSON.parse(stored));
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [savedAt, setSavedAt] = useState<string>("");
  const [activeNoteId, setActiveNoteId] = useState<string>("hero-main");
  const [previewSize, setPreviewSize] = useState({ width: 960, height: 540 });

  const projectCount = useMemo(() => content.portfolio.projects.length, [content.portfolio.projects.length]);
  const hummingNotes = content.hummingNotes;
  const activeNote =
    (hummingNotes[activeNoteId] ?? Object.values(hummingNotes)[0]) as HummingNoteConfig;

  const noteBoxSize = useMemo(() => {
    const text = activeNote?.text ?? "";
    const size = activeNote?.size ?? 16;
    const lines = text.split("\n");
    const maxChars = lines.reduce((max, line) => Math.max(max, line.length), 0);

    const width = Math.min(Math.max(maxChars * size * 0.55 + 26, 110), 420);
    const height = Math.min(Math.max(lines.length * size * 1.28 + 20, 58), 240);

    return { width, height };
  }, [activeNote?.text, activeNote?.size]);

  useEffect(() => {
    const element = previewRef.current;
    if (!element) return;

    const resize = () => {
      const rect = element.getBoundingClientRect();
      setPreviewSize({ width: rect.width, height: rect.height });
    };

    resize();

    const observer = new ResizeObserver(() => resize());
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const updateProject = (id: string, patch: Partial<EditableProject>) => {
    setContent((prev) => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        projects: prev.portfolio.projects.map((project) =>
          project.id === id ? { ...project, ...patch } : project
        ),
      },
    }));
  };

  const updateNote = (id: string, patch: Partial<HummingNoteConfig>) => {
    setContent((prev) => ({
      ...prev,
      hummingNotes: {
        ...prev.hummingNotes,
        [id]: {
          ...prev.hummingNotes[id],
          ...patch,
        },
      },
    }));
  };

  const save = () => {
    window.localStorage.setItem(ADMIN_CONTENT_KEY, JSON.stringify(content));
    const now = new Date();
    setSavedAt(now.toLocaleTimeString("pt-BR"));
  };

  const reset = () => {
    window.localStorage.removeItem(ADMIN_CONTENT_KEY);
    setContent(DEFAULT_SITE_CONTENT);
    setSavedAt("");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "admin-content.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const raw = JSON.parse(String(reader.result));
        setContent(mergeSiteContent(raw));
      } catch {
        alert("JSON inválido");
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="min-h-screen bg-obsidian text-bone py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-2">
          <h1 className="font-tusker text-3xl sm:text-4xl uppercase tracking-wide text-bone">
            Painel Admin
          </h1>
          <p className="text-bone/60 font-poppins">
            Edite títulos, descrição e projetos. Arraste e solte para reordenar a grade do portfólio.
          </p>
          <p className="text-cognac/80 text-sm font-poppins">
            Este painel salva no navegador local (não em banco online).
          </p>
        </header>

        <section className="rounded-xl border border-border bg-navy/20 p-5 sm:p-6 space-y-4">
          <h2 className="font-tusker text-xl uppercase">Textos do Portfólio</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-sm text-bone/70 font-poppins">Título linha 1</span>
              <input
                value={content.portfolio.titleTop}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    portfolio: { ...prev.portfolio, titleTop: e.target.value },
                  }))
                }
                className="w-full rounded-lg bg-obsidian border border-border px-3 py-2 text-bone"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm text-bone/70 font-poppins">Título linha 2</span>
              <input
                value={content.portfolio.titleBottom}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    portfolio: { ...prev.portfolio, titleBottom: e.target.value },
                  }))
                }
                className="w-full rounded-lg bg-obsidian border border-border px-3 py-2 text-bone"
              />
            </label>
          </div>

          <label className="space-y-2 block">
            <span className="text-sm text-bone/70 font-poppins">Descrição</span>
            <textarea
              value={content.portfolio.description}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  portfolio: { ...prev.portfolio, description: e.target.value },
                }))
              }
              rows={3}
              className="w-full rounded-lg bg-obsidian border border-border px-3 py-2 text-bone"
            />
          </label>
        </section>

        <section className="rounded-xl border border-border bg-navy/20 p-5 sm:p-6 space-y-4">
          <h2 className="font-tusker text-xl uppercase">Projetos ({projectCount})</h2>

          <div className="space-y-3">
            {content.portfolio.projects.map((project, index) => (
              <div
                key={project.id}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragIndex === null || dragIndex === index) return;
                  setContent((prev) => ({
                    ...prev,
                    portfolio: {
                      ...prev.portfolio,
                      projects: reorder(prev.portfolio.projects, dragIndex, index),
                    },
                  }));
                  setDragIndex(null);
                }}
                className="rounded-lg border border-border bg-obsidian/70 p-4 cursor-move"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className="space-y-1">
                    <span className="text-xs text-bone/60 font-poppins">Título</span>
                    <input
                      value={project.title}
                      onChange={(e) => updateProject(project.id, { title: e.target.value })}
                      className="w-full rounded-md bg-obsidian border border-border px-3 py-2 text-bone"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="text-xs text-bone/60 font-poppins">Categoria</span>
                    <input
                      value={project.category}
                      onChange={(e) => updateProject(project.id, { category: e.target.value })}
                      className="w-full rounded-md bg-obsidian border border-border px-3 py-2 text-bone"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="text-xs text-bone/60 font-poppins">Pasta de imagens</span>
                    <input
                      value={project.folder}
                      onChange={(e) => updateProject(project.id, { folder: e.target.value })}
                      className="w-full rounded-md bg-obsidian border border-border px-3 py-2 text-bone"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-navy/20 p-5 sm:p-6 space-y-4">
          <h2 className="font-tusker text-xl uppercase">Layout dos textos Humming (arraste e solte)</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="space-y-1 block">
                <span className="text-xs text-bone/60 font-poppins">Texto alvo</span>
                <select
                  value={activeNoteId}
                  onChange={(e) => setActiveNoteId(e.target.value)}
                  className="w-full rounded-md bg-obsidian border border-border px-3 py-2 text-bone"
                >
                  {Object.values(hummingNotes).map((note) => (
                    <option key={note.id} value={note.id}>
                      {note.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 block">
                <span className="text-xs text-bone/60 font-poppins">Texto</span>
                <textarea
                  rows={3}
                  value={activeNote?.text ?? ""}
                  onChange={(e) => updateNote(activeNote.id, { text: e.target.value })}
                  className="w-full rounded-md bg-obsidian border border-border px-3 py-2 text-bone"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1 block">
                  <span className="text-xs text-bone/60 font-poppins">Rotação ({activeNote?.rotate ?? 0}°)</span>
                  <input
                    type="range"
                    min={-25}
                    max={25}
                    value={activeNote?.rotate ?? 0}
                    onChange={(e) => updateNote(activeNote.id, { rotate: Number(e.target.value) })}
                    className="w-full"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="text-xs text-bone/60 font-poppins">Tamanho ({activeNote?.size ?? 16}px)</span>
                  <input
                    type="range"
                    min={12}
                    max={42}
                    value={activeNote?.size ?? 16}
                    onChange={(e) => updateNote(activeNote.id, { size: Number(e.target.value) })}
                    className="w-full"
                  />
                </label>
              </div>

              <label className="space-y-1 block">
                <span className="text-xs text-bone/60 font-poppins">Opacidade ({Math.round((activeNote?.opacity ?? 0.35) * 100)}%)</span>
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.01}
                  value={activeNote?.opacity ?? 0.35}
                  onChange={(e) => updateNote(activeNote.id, { opacity: Number(e.target.value) })}
                  className="w-full"
                />
              </label>

              <label className="inline-flex items-center gap-2 text-sm font-poppins text-bone/70">
                <input
                  type="checkbox"
                  checked={activeNote?.enabled ?? true}
                  onChange={(e) => updateNote(activeNote.id, { enabled: e.target.checked })}
                />
                Mostrar no site
              </label>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-bone/50 font-poppins">
                Área segura (16:9): arraste o texto para definir posição. Ideal para evitar bordas em monitor 2560x1080.
              </p>
              <div ref={previewRef} className="relative aspect-video rounded-xl border border-border bg-obsidian/70 overflow-hidden">
                <div className="absolute inset-6 border border-dashed border-cognac/35 rounded-lg" />

                {activeNote ? (
                  <Rnd
                    size={{ width: noteBoxSize.width, height: noteBoxSize.height }}
                    position={{
                      x: (activeNote.x / 100) * previewSize.width - noteBoxSize.width / 2,
                      y: (activeNote.y / 100) * previewSize.height - noteBoxSize.height / 2,
                    }}
                    bounds="parent"
                    disableDragging={false}
                    enableResizing={false}
                    onDragStop={(_, data) => {
                      const newX = ((data.x + noteBoxSize.width / 2) / previewSize.width) * 100;
                      const newY = ((data.y + noteBoxSize.height / 2) / previewSize.height) * 100;
                      updateNote(activeNote.id, {
                        x: Math.max(0, Math.min(100, Number(newX.toFixed(2)))),
                        y: Math.max(0, Math.min(100, Number(newY.toFixed(2)))),
                      });
                    }}
                  >
                    <div className="h-full w-full flex items-center justify-center rounded-md border border-cognac/45 bg-navy/45 px-3 py-2">
                      <p
                        className="font-humming text-cognac text-center whitespace-pre leading-tight"
                        style={{
                          fontSize: `${activeNote.size}px`,
                          opacity: activeNote.opacity,
                          transform: `rotate(${activeNote.rotate}deg)`,
                        }}
                      >
                        {activeNote.text}
                      </p>
                    </div>
                  </Rnd>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-navy/20 p-5 sm:p-6 space-y-4">
          <h2 className="font-tusker text-xl uppercase">Ações</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={save}>Salvar no navegador</Button>
            <Button variant="outline" onClick={exportJson}>Exportar JSON</Button>
            <label className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm cursor-pointer">
              Importar JSON
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => importJson(e.target.files?.[0] ?? null)}
              />
            </label>
            <Button variant="outline" onClick={reset}>Resetar</Button>
          </div>

          {savedAt ? (
            <p className="text-sm text-cognac font-poppins">Salvo às {savedAt}</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
