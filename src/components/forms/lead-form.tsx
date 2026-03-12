"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WHATSAPP, PROJECT_TYPE_LABELS } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "WhatsApp inválido"),
  projectType: z.string().min(1, "Selecione o tipo de projeto"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmitted(true);

    const projectLabel = PROJECT_TYPE_LABELS[data.projectType] || data.projectType;
    const whatsappUrl = WHATSAPP.buildLink(data.name, projectLabel);

    setTimeout(() => {
      reset();
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setSubmitted(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-cognac/20 flex items-center justify-center">
          <Send className="h-8 w-8 text-cognac" />
        </div>
        <h3 className="text-xl font-bold text-bone">Mensagem Enviada!</h3>
        <p className="text-bone/60">Redirecionando para o WhatsApp...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome *</Label>
        <Input id="name" placeholder="Seu nome completo" {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} aria-invalid={!!errors.email} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">WhatsApp *</Label>
        <Input id="phone" type="tel" placeholder="(62) 99999-9999" {...register("phone")} aria-invalid={!!errors.phone} />
        {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectType">Tipo de Projeto *</Label>
        <select
          id="projectType"
          {...register("projectType")}
          className="flex h-12 w-full rounded-lg border border-border bg-obsidian/50 px-4 py-3 text-sm text-bone transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-cognac appearance-none cursor-pointer"
          aria-invalid={!!errors.projectType}
          defaultValue=""
        >
          <option value="" disabled className="text-muted-foreground bg-obsidian">
            Selecione o tipo de projeto
          </option>
          {Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value} className="bg-obsidian text-bone">
              {label}
            </option>
          ))}
        </select>
        {errors.projectType && <p className="text-xs text-destructive">{errors.projectType.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Mensagem <span className="text-bone/40">(opcional)</span>
        </Label>
        <Textarea id="message" placeholder="Conte um pouco sobre seu projeto..." rows={4} {...register("message")} />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Enviar e Falar no WhatsApp
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}
