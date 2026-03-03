import { Navbar } from "@/components/layout/navbar";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Expertise } from "@/components/sections/expertise";
import { Portfolio } from "@/components/sections/portfolio";
import { AiPortraits } from "@/components/sections/ai-portraits";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Mentorship } from "@/components/sections/mentorship";
import { Contact } from "@/components/sections/contact";
import { FloatingIconsGlobal } from "@/components/ui/floating-icons";
import { CursorOrb } from "@/components/ui/cursor-orb";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <CursorOrb />
        <FloatingIconsGlobal />
        <Hero />
        <SocialProof />
        <Expertise />
        <Portfolio />
        <AiPortraits />
        <About />
        <Testimonials />
        <Mentorship />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

