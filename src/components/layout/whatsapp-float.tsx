"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { WHATSAPP } from "@/lib/constants";

export function WhatsAppFloat() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={WHATSAPP.link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] transition-colors duration-200"
      aria-label="Falar no WhatsApp"
      initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
      animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
      {!shouldReduceMotion && (
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30" />
      )}
    </motion.a>
  );
}
