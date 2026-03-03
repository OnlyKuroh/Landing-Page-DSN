import { PORTFOLIO_ITEMS } from "@/lib/constants";

export const ADMIN_CONTENT_KEY = "athila-admin-content-v1";

export type EditableProject = {
  id: string;
  folder: string;
  title: string;
  category: string;
  description: string;
};

export type HummingNoteConfig = {
  id: string;
  label: string;
  text: string;
  x: number;
  y: number;
  rotate: number;
  size: number;
  opacity: number;
  enabled: boolean;
};

export type SiteContent = {
  portfolio: {
    titleTop: string;
    titleBottom: string;
    description: string;
    projects: EditableProject[];
  };
  hummingNotes: Record<string, HummingNoteConfig>;
};

const DEFAULT_HUMMING_NOTES: Record<string, HummingNoteConfig> = {
  "hero-main": {
    id: "hero-main",
    label: "Hero",
    text: "esse cara é\nbom demais",
    x: 22,
    y: 74,
    rotate: -6,
    size: 20,
    opacity: 0.4,
    enabled: true,
  },
  "expertise-main": {
    id: "expertise-main",
    label: "Expertise",
    text: "estratégia é\ntudo",
    x: 88,
    y: 86,
    rotate: -3,
    size: 16,
    opacity: 0.35,
    enabled: true,
  },
  "portfolio-open": {
    id: "portfolio-open",
    label: "Portfólio (abrir)",
    text: "clique no projeto\npara abrir o case",
    x: 17,
    y: 35,
    rotate: 6,
    size: 18,
    opacity: 0.4,
    enabled: true,
  },
  "portfolio-behance": {
    id: "portfolio-behance",
    label: "Portfólio (Behance)",
    text: "abra no behance\npara ver tudo",
    x: 78,
    y: 80,
    rotate: -3,
    size: 16,
    opacity: 0.35,
    enabled: true,
  },
  "about-main": {
    id: "about-main",
    label: "Sobre",
    text: "design com\npropósito",
    x: 76,
    y: 88,
    rotate: 2,
    size: 16,
    opacity: 0.35,
    enabled: true,
  },
  "testimonials-main": {
    id: "testimonials-main",
    label: "Depoimentos",
    text: "resultados\nreais",
    x: 88,
    y: 16,
    rotate: 6,
    size: 16,
    opacity: 0.35,
    enabled: true,
  },
  "mentorship-main": {
    id: "mentorship-main",
    label: "Mentoria",
    text: "invista em\nvocê",
    x: 78,
    y: 92,
    rotate: -2,
    size: 14,
    opacity: 0.35,
    enabled: true,
  },
  "contact-main": {
    id: "contact-main",
    label: "Contato",
    text: "bora conversar",
    x: 80,
    y: 30,
    rotate: 3,
    size: 16,
    opacity: 0.35,
    enabled: true,
  },
  "ai-main": {
    id: "ai-main",
    label: "Ensaios IA",
    text: "parece foto\nde verdade",
    x: 86,
    y: 20,
    rotate: 3,
    size: 16,
    opacity: 0.35,
    enabled: true,
  },
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  portfolio: {
    titleTop: "Trabalhos que falam",
    titleBottom: "por si",
    description:
      "Uma seleção de projetos que ilustram minha abordagem estratégica e o impacto visual que entrego.",
    projects: PORTFOLIO_ITEMS.map((item, index) => ({
      id: `project-${index + 1}`,
      folder: `projeto-${index + 1}`,
      title: item.title,
      category: item.category,
      description: "",
    })),
  },
  hummingNotes: DEFAULT_HUMMING_NOTES,
};

export function mergeSiteContent(raw: unknown): SiteContent {
  if (!raw || typeof raw !== "object") return DEFAULT_SITE_CONTENT;
  const data = raw as Partial<SiteContent>;

  const incomingProjects = Array.isArray(data.portfolio?.projects)
    ? data.portfolio?.projects
    : [];

  const fallbackById = new Map(DEFAULT_SITE_CONTENT.portfolio.projects.map((p) => [p.id, p]));

  const projects = incomingProjects
    .map((project) => {
      if (!project || typeof project !== "object") return null;
      const p = project as Partial<EditableProject>;
      const fallback = (p.id && fallbackById.get(p.id)) || null;
      const folderById = fallback?.folder ?? "";

      if (!p.id || typeof p.id !== "string") return null;

      return {
        id: p.id,
        folder: typeof p.folder === "string" && p.folder ? p.folder : folderById,
        title: typeof p.title === "string" ? p.title : fallback?.title ?? "Projeto",
        category: typeof p.category === "string" ? p.category : fallback?.category ?? "Categoria",
        description: typeof p.description === "string" ? p.description : fallback?.description ?? "",
      } as EditableProject;
    })
    .filter((p): p is EditableProject => Boolean(p));

  const safeProjects = projects.length > 0 ? projects : DEFAULT_SITE_CONTENT.portfolio.projects;

  const inputNotes =
    data.hummingNotes && typeof data.hummingNotes === "object"
      ? (data.hummingNotes as Record<string, Partial<HummingNoteConfig>>)
      : {};

  const mergedNotes = Object.fromEntries(
    Object.entries(DEFAULT_HUMMING_NOTES).map(([key, fallback]) => {
      const incoming = inputNotes[key] ?? {};
      return [
        key,
        {
          id: key,
          label: typeof incoming.label === "string" ? incoming.label : fallback.label,
          text: typeof incoming.text === "string" ? incoming.text : fallback.text,
          x: typeof incoming.x === "number" ? incoming.x : fallback.x,
          y: typeof incoming.y === "number" ? incoming.y : fallback.y,
          rotate: typeof incoming.rotate === "number" ? incoming.rotate : fallback.rotate,
          size: typeof incoming.size === "number" ? incoming.size : fallback.size,
          opacity: typeof incoming.opacity === "number" ? incoming.opacity : fallback.opacity,
          enabled: typeof incoming.enabled === "boolean" ? incoming.enabled : fallback.enabled,
        } as HummingNoteConfig,
      ];
    })
  ) as Record<string, HummingNoteConfig>;

  return {
    portfolio: {
      titleTop:
        typeof data.portfolio?.titleTop === "string"
          ? data.portfolio.titleTop
          : DEFAULT_SITE_CONTENT.portfolio.titleTop,
      titleBottom:
        typeof data.portfolio?.titleBottom === "string"
          ? data.portfolio.titleBottom
          : DEFAULT_SITE_CONTENT.portfolio.titleBottom,
      description:
        typeof data.portfolio?.description === "string"
          ? data.portfolio.description
          : DEFAULT_SITE_CONTENT.portfolio.description,
      projects: safeProjects,
    },
    hummingNotes: mergedNotes,
  };
}
