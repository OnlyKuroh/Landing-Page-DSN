import { Separator } from "@/components/ui/separator";
import { SITE, SOCIAL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative bg-obsidian">
      <Separator className="bg-cognac/30" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo & copyright */}
          <div className="text-center md:text-left">
            <p className="text-lg font-tusker uppercase text-bone">
              Athila <span className="text-cognac">Cabrall</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground font-poppins">
              Senior Visual Designer & Creative Strategist
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
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

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-poppins">
            © Agência Cabrall {new Date().getFullYear()}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
