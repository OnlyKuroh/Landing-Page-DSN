"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SOCIAL } from "@/lib/constants";

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative border-t border-border/30">
      {/* Top decorative divider */}
      <div className="section-divider" />

      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Col 1: Logo + tagline */}
          <div className="space-y-4">
            <a href="#inicio" className="inline-block">
              <p className="text-lg font-tusker tracking-tight text-bone uppercase">
                Athila <span className="text-cognac">Cabrall</span>
              </p>
            </a>
            <p className="text-sm text-bone/35 font-poppins font-light leading-relaxed max-w-xs">
              Design Estratégico que transforma a visão do seu negócio em
              faturamento real. +6 anos de experiência.
            </p>
          </div>

          {/* Col 2: Quick links */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-bone/30 font-poppins font-medium">
              Navegação
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Portfólio", href: "#portfolio" },
                { label: "Sobre", href: "#sobre" },
                { label: "Ensaios IA", href: "#ensaios-ia" },
                { label: "Mentoria", href: "#mentoria" },
                { label: "Contato", href: "#contato" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-bone/40 hover:text-cognac transition-colors font-poppins py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Social */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-bone/30 font-poppins font-medium">
              Redes Sociais
            </p>
            <div className="flex items-center gap-3">
              {/* Behance */}
              <motion.a
                href={SOCIAL.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full glass-card hover:border-cognac/30 transition-colors"
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.05 }}
                aria-label="Behance"
              >
                <svg className="w-4 h-4 text-bone/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                </svg>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full glass-card hover:border-cognac/30 transition-colors"
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.05 }}
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-bone/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full glass-card hover:border-[#25D366]/30 transition-colors"
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.05 }}
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 text-bone/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-bone/25 font-poppins">
            &copy; {new Date().getFullYear()} Athila Cabrall. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-bone/15 font-poppins">
            Feito com <span className="text-cognac/40">♥</span> e estratégia
          </p>
        </div>
      </div>
    </footer>
  );
}
