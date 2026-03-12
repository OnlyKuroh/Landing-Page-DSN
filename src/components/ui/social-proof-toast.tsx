"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const NOTIFICATIONS = [
  { name: "Maria", city: "São Paulo", action: "solicitou orçamento", time: "há 12 min" },
  { name: "Rafael", city: "Goiânia", action: "contratou ensaio de IA", time: "há 34 min" },
  { name: "Camila", city: "Brasília", action: "iniciou mentoria", time: "há 1h" },
  { name: "Lucas", city: "Belo Horizonte", action: "solicitou orçamento", time: "há 2h" },
  { name: "Juliana", city: "Goiânia", action: "contratou pacote social media", time: "há 3h" },
  { name: "Pedro", city: "Curitiba", action: "fechou projeto de branding", time: "há 4h" },
  { name: "Ana Clara", city: "Goiânia", action: "agendou reunião", time: "há 5h" },
  { name: "Fernando", city: "Ribeirão Preto", action: "solicitou ensaio de IA", time: "há 6h" },
  { name: "Beatriz", city: "Uberlândia", action: "contratou criativos para ads", time: "há 8h" },
  { name: "Diego", city: "Goiânia", action: "iniciou mentoria", time: "há 10h" },
];

export function SocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  /* Ensure client-only rendering */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* First toast after 8s */
  useEffect(() => {
    if (!mounted || dismissed) return;

    const timer = setTimeout(() => {
      setCurrentIndex(0);
    }, 8000);

    return () => clearTimeout(timer);
  }, [mounted, dismissed]);

  /* Cycle through notifications */
  useEffect(() => {
    if (currentIndex < 0 || dismissed || !mounted) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setCurrentIndex(-1);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [currentIndex, dismissed, mounted]);

  /* Show next after hiding */
  useEffect(() => {
    if (currentIndex !== -1 || dismissed || !mounted) return;

    // Determine next index
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= NOTIFICATIONS.length) return -1; // stop cycling
        return next;
      });
    }, 12000);

    return () => clearTimeout(nextTimer);
  }, [currentIndex, dismissed, mounted]);

  if (!mounted || dismissed) return null;

  const notification = currentIndex >= 0 && currentIndex < NOTIFICATIONS.length
    ? NOTIFICATIONS[currentIndex]
    : null;

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          className="fixed bottom-24 left-5 z-40 glass-card rounded-xl px-4 py-3 pr-10 max-w-xs shadow-2xl shadow-black/40"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -60, y: 10 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.4, ease: [0.22, 0.68, 0.35, 1] }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-cognac/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-cognac font-poppins">
                {notification.name[0]}
              </span>
            </div>
            <div>
              <p className="text-xs text-bone/80 font-poppins leading-relaxed">
                <span className="font-semibold text-bone">{notification.name}</span>{" "}
                de {notification.city}{" "}
                <span className="text-cognac">{notification.action}</span>
              </p>
              <p className="text-[10px] text-bone/30 font-poppins mt-0.5">
                {notification.time}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 p-1 text-bone/20 hover:text-bone/50 transition-colors"
            aria-label="Fechar notificações"
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
