// ============================================
// ATHILA CABRALL — CONSTANTS
// ============================================

export const SITE = {
  name: "Athila Cabrall",
  title: "Athila Cabrall | Senior Visual Designer & Creative Strategist",
  description:
    "Transformo a visão do seu negócio em faturamento através do Design Estratégico. +6 anos de experiência, +132 clientes atendidos. Artes de alto impacto, branding e estratégia visual.",
  url: "https://athilacabrall.com",
  ogImage: "/og-image.png",
  locale: "pt_BR",
} as const;

export const WHATSAPP = {
  number: "5562993688127",
  defaultMessage:
    "Olá! Vim pelo seu site e gostaria de saber mais sobre seus serviços de design.",
  get link() {
    return `https://wa.me/${this.number}?text=${encodeURIComponent(this.defaultMessage)}`;
  },
  buildLink(name: string, projectType: string) {
    const message = `Olá, Athila! Meu nome é ${name} e tenho interesse em ${projectType}. Vim pelo seu site e gostaria de conversar sobre meu projeto.`;
    return `https://wa.me/${this.number}?text=${encodeURIComponent(message)}`;
  },
  mentoriaLink() {
    const message = "Olá, Athila! Tenho interesse na Mentoria de Design Estratégico. Vim pelo seu site.";
    return `https://wa.me/${this.number}?text=${encodeURIComponent(message)}`;
  },
  aiPortraitsLink() {
    const message = "Olá, Athila! Tenho interesse nos Ensaios de Inteligência Artificial. Vim pelo seu site.";
    return `https://wa.me/${this.number}?text=${encodeURIComponent(message)}`;
  },
} as const;

export const SOCIAL = {
  behance: "https://behance.net/athilapsd",
  whatsapp: WHATSAPP.link,
  instagram: "https://instagram.com/athilacabrall",
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Ensaios IA", href: "#ensaios-ia" },
  { label: "Contato", href: "#contato" },
] as const;

export const STATS = [
  { value: "132+", label: "Clientes" },
  { value: "6+", label: "Anos" },
  { value: "15+", label: "Segmentos" },
] as const;

export const SERVICES = [
  {
    icon: "Palette" as const,
    title: "Artes de Alto Impacto",
    description:
      "Feed, stories, banners e material impresso que capturam atenção e geram resultados reais.",
  },
  {
    icon: "Gem" as const,
    title: "Branding & Identidade Visual",
    description:
      "Logotipos, brandbooks e sistemas visuais que posicionam sua marca com autoridade.",
  },
  {
    icon: "Target" as const,
    title: "Criativos para Anúncios",
    description:
      "Artes otimizadas para Meta Ads e Google Ads, focadas em CTR e conversão.",
  },
  {
    icon: "Brain" as const,
    title: "Estratégia Visual + IA",
    description:
      "Planejamento criativo com integração de inteligência artificial no fluxo de design.",
  },
] as const;

export const PORTFOLIO_PROJECTS = [
  {
    title: "Campanha de Lançamento",
    category: "Criativos para Ads",
    folder: "projeto-1",
  },
  {
    title: "Identidade Visual Completa",
    category: "Branding",
    folder: "projeto-2",
  },
  {
    title: "Material Educacional",
    category: "Design Editorial",
    folder: "projeto-3",
  },
  {
    title: "Campanha Solidária",
    category: "Artes Estáticas",
    folder: "projeto-4",
  },
  {
    title: "Redesign de Marca",
    category: "Branding",
    folder: "projeto-5",
  },
  {
    title: "Posts para Redes Sociais",
    category: "Social Media",
    folder: "projeto-6",
  },
] as const;

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  "brand-identity": "Branding & Identidade Visual",
  "social-ads": "Criativos para Anúncios / Social Media",
  "educational": "Material Educacional / Editorial",
  "ai-portraits": "Ensaio de Inteligência Artificial",
  "other": "Outro projeto",
};
