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
} as const;

export const SOCIAL = {
  behance: "https://behance.net/athilapsd",
  whatsapp: WHATSAPP.link,
  instagram: "https://instagram.com/athilacabrall",
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Expertise", href: "#expertise" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Ensaios IA", href: "#ensaios-ia" },
  { label: "Sobre", href: "#sobre" },
  { label: "Mentoria", href: "#mentoria" },
  { label: "Contato", href: "#contato" },
] as const;

export const STATS = [
  { value: 132, suffix: "+", label: "Clientes Atendidos" },
  { value: 6, suffix: "+", label: "Anos de Experiência" },
  { value: 15, suffix: "+", label: "Segmentos Atendidos" },
] as const;

export const SERVICES = [
  {
    icon: "Palette" as const,
    title: "Artes Estáticas de Alto Impacto",
    description:
      "Feed, stories, banners e material impresso que capturam atenção e geram resultados reais para o seu negócio.",
  },
  {
    icon: "Gem" as const,
    title: "Branding & Identidade Visual",
    description:
      "Logotipos, brandbooks e sistemas visuais que posicionam sua marca com autoridade e diferenciação no mercado.",
  },
  {
    icon: "Target" as const,
    title: "Criativos para Anúncios",
    description:
      "Artes otimizadas para Meta Ads e Google Ads, focadas em CTR e conversão. Design que performa.",
  },
  {
    icon: "Brain" as const,
    title: "Estratégia Visual + IA",
    description:
      "Planejamento criativo com integração de ferramentas de inteligência artificial no fluxo de design.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Carlos Mendes",
    role: "CEO, Tech Solutions",
    text: "O Athila transformou completamente a identidade visual da nossa empresa. As artes que ele cria não são apenas bonitas — elas vendem. Nosso engajamento nas redes aumentou 340% em 3 meses.",
  },
  {
    name: "Ana Beatriz",
    role: "Diretora de Marketing, Estúdio Criativo",
    text: "Trabalhar com o Athila é ter a certeza de que cada pixel tem um propósito estratégico. Ele não entrega design, entrega resultado. Recomendo de olhos fechados.",
  },
  {
    name: "Roberto Silva",
    role: "Fundador, RS Educação",
    text: "Precisávamos de materiais educacionais de alto nível e o Athila superou todas as expectativas. Profissionalismo, pontualidade e uma visão criativa impressionante.",
  },
  {
    name: "Juliana Costa",
    role: "Social Media Manager",
    text: "Os criativos do Athila para nossas campanhas de anúncios reduziram nosso CPL em 60%. Ele entende de design E de performance. É raro encontrar essa combinação.",
  },
] as const;

export const PORTFOLIO_ITEMS = [
  { title: "Campanha de Lançamento", category: "Criativos para Ads" },
  { title: "Identidade Visual Completa", category: "Branding" },
  { title: "Material Educacional", category: "Design Editorial" },
  { title: "Campanha Solidária", category: "Artes Estáticas" },
  { title: "Redesign de Marca", category: "Branding" },
  { title: "Posts para Redes Sociais", category: "Social Media" },
] as const;
