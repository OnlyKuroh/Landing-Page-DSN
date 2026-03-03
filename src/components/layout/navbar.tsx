"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { NAV_LINKS, WHATSAPP } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-border shadow-lg shadow-obsidian/50"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
          <span className="text-xl font-tusker tracking-tight text-bone uppercase">
            Athila <span className="text-cognac">Cabrall</span>
          </span>
          <Badge variant="outline" className="hidden sm:inline-flex text-[10px] uppercase tracking-widest">
            Senior Designer
          </Badge>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-bone/60 hover:text-bone transition-colors duration-200 font-poppins"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" asChild>
            <a
              href={WHATSAPP.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale Comigo
            </a>
          </Button>
        </div>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-bone" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-12">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-bone/80 hover:text-cognac transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-4" asChild>
                <a
                  href={WHATSAPP.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fale Comigo no WhatsApp
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
