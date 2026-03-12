"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, WHATSAPP } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const [isAdmin, setIsAdmin] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  /* Check admin session */
  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.authenticated))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Active section tracking via Intersection Observer */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-border/50 shadow-2xl shadow-obsidian/60"
          : "bg-transparent"
      )}
    >
      <nav className="section-container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#inicio"
          className="text-lg font-tusker tracking-tight text-bone uppercase"
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.68, 0.35, 1] }}
        >
          Athila <span className="text-cognac">Cabrall</span>
        </motion.a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {isAdmin && (
            <a
              href="/admin"
              className="px-4 py-2 text-[13px] font-medium tracking-wide text-cognac/80 hover:text-cognac font-poppins rounded-full transition-colors"
            >
              Administração
            </a>
          )}
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 font-poppins rounded-full",
                activeSection === link.href
                  ? "text-cognac"
                  : "text-bone/50 hover:text-bone"
              )}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
            >
              {link.label}
              {activeSection === link.href && !shouldReduceMotion && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-cognac/10 border border-cognac/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button size="sm" className="ml-4 rounded-full" asChild>
              <a href={WHATSAPP.link} target="_blank" rel="noopener noreferrer">
                Fale Comigo
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-bone hover:text-cognac transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass border-t border-border/50 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.68, 0.35, 1] }}
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "py-3 px-4 text-lg font-poppins rounded-xl transition-colors",
                    activeSection === link.href
                      ? "text-cognac bg-cognac/5"
                      : "text-bone/70 hover:text-bone hover:bg-white/5"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <Button className="mt-4 rounded-full" asChild>
                <a href={WHATSAPP.link} target="_blank" rel="noopener noreferrer">
                  Fale Comigo no WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
