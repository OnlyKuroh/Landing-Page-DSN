"use client";

import { useCallback, useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";

const TESTIMONIALS = [
  {
    name: "Marina S.",
    role: "CEO, Boutique de Moda",
    text: "O Athila transformou completamente a identidade visual da minha marca. As vendas aumentaram 40% no primeiro mês após o rebranding.",
  },
  {
    name: "Rafael M.",
    role: "Advogado Tributarista",
    text: "Profissional excepcional. Entregou um trabalho de altíssima qualidade que superou minhas expectativas em todos os aspectos.",
  },
  {
    name: "Camila F.",
    role: "Dermatologista",
    text: "O design das redes sociais ficou incrível. Meus pacientes sempre elogiam a qualidade visual do meu perfil profissional.",
  },
  {
    name: "Lucas P.",
    role: "Fundador, Tech Startup",
    text: "A mentoria mudou minha visão sobre design estratégico. Aprendi a usar o visual como ferramenta de vendas real.",
  },
  {
    name: "Juliana R.",
    role: "Corretora de Seguros",
    text: "Contratei para social media e nunca mais troquei. Qualidade impecável, entregas no prazo e criatividade sem igual.",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  /* Auto-advance */
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="depoimentos" className="relative section-padding gradient-section">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-cognac mb-4 font-poppins font-medium">
            Depoimentos
          </p>
          <h2 className="font-tusker text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-bone leading-[0.9]">
            O que dizem{" "}
            <span className="text-gradient">meus clientes</span>
          </h2>
        </AnimatedSection>

        {/* Testimonial carousel */}
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="glass-card rounded-2xl p-8 sm:p-12 relative overflow-hidden min-h-[260px] sm:min-h-[220px] flex flex-col justify-center">
              {/* Decorative quote */}
              <Quote className="absolute top-6 left-6 h-10 w-10 text-cognac/10" strokeWidth={1} />

              {/* Decorative blob */}
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-cognac/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? {} : { opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: [0.22, 0.68, 0.35, 1] }}
                    className="text-center space-y-6"
                  >
                    <p className="text-base sm:text-lg text-bone/70 font-poppins font-light leading-relaxed italic">
                      &ldquo;{TESTIMONIALS[current].text}&rdquo;
                    </p>

                    <div>
                      <p className="font-poppins font-bold text-bone text-sm">
                        {TESTIMONIALS[current].name}
                      </p>
                      <p className="text-xs text-bone/35 font-poppins">
                        {TESTIMONIALS[current].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </AnimatedSection>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-8 h-2 bg-cognac"
                    : "w-2 h-2 bg-bone/15 hover:bg-bone/30"
                }`}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
