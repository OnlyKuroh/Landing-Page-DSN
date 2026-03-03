import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres.")
    .max(100, "Nome muito longo."),
  email: z
    .string()
    .email("E-mail inválido.")
    .min(1, "E-mail é obrigatório."),
  phone: z
    .string()
    .min(10, "WhatsApp deve ter pelo menos 10 dígitos.")
    .max(20, "WhatsApp inválido.")
    .regex(
      /^[\d\s()+-]+$/,
      "WhatsApp deve conter apenas números, espaços, parênteses, + ou -."
    ),
  projectType: z.enum([
    "artes-estaticas",
    "branding",
    "criativos-ads",
    "estrategia-visual",
    "outro",
  ], { message: "Selecione o tipo de projeto." }),
  message: z
    .string()
    .max(500, "Mensagem muito longa.")
    .optional()
    .or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const projectTypeLabels: Record<string, string> = {
  "artes-estaticas": "Artes Estáticas de Alto Impacto",
  branding: "Branding & Identidade Visual",
  "criativos-ads": "Criativos para Anúncios",
  "estrategia-visual": "Estratégia Visual + IA",
  outro: "Outro",
};
