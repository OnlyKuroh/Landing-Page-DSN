"use client";

import { lazy, Suspense } from "react";
import { useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Expertise } from "@/components/sections/expertise";
import { Portfolio } from "@/components/sections/portfolio";
import { About } from "@/components/sections/about";
import { AiPortraits } from "@/components/sections/ai-portraits";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { SocialProofToast } from "@/components/ui/social-proof-toast";

const ParticleField = lazy(() =>
  import("@/components/ui/particle-field").then((m) => ({
    default: m.ParticleField,
  }))
);

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Global particle field — visible on all sections */}
      {!shouldReduceMotion && (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      )}

      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <Expertise />
        <Portfolio />
        <AiPortraits />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CursorGlow />
      <SocialProofToast />
    </>
  );
}
