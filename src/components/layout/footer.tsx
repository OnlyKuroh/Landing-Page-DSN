import { Separator } from "@/components/ui/separator";
import { SITE, SOCIAL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative bg-obsidian">
      <Separator className="bg-cognac/30" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 text-center md:grid-cols-3 md:items-center md:text-left">
          <div>
            <p className="text-lg font-tusker uppercase text-bone">
              Athila <span className="text-cognac">Cabrall</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground font-poppins">
              Senior Visual Designer & Creative Strategist
            </p>
          </div>

          <div className="order-3 md:order-2 text-center">
            <p className="text-xs text-muted-foreground font-poppins">
              © Agência Cabrall {new Date().getFullYear()}. Todos os direitos reservados.
            </p>
          </div>

          <div className="order-2 md:order-3 flex items-center justify-center gap-6 md:justify-end">
            <a
              href={SOCIAL.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-bone/60 hover:text-cognac transition-colors"
            >
              Behance
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-bone/60 hover:text-cognac transition-colors"
            >
              Instagram
            </a>
            <a
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-bone/60 hover:text-cognac transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
