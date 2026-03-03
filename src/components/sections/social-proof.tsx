"use client";

import { Users, Clock, Briefcase } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FloatingIconsSparse } from "@/components/ui/floating-icons";

const stats = [
  {
    icon: Users,
    value: 132,
    suffix: "+",
    label: "Clientes Atendidos",
  },
  {
    icon: Clock,
    value: 6,
    suffix: "+",
    label: "Anos de Experiência",
  },
  {
    icon: Briefcase,
    value: 15,
    suffix: "+",
    label: "Segmentos Atendidos",
  },
];

export function SocialProof() {
  return (
    <section className="relative bg-navy/50 border-y border-border py-16 overflow-hidden">
      <FloatingIconsSparse variant={3} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <Icon className="h-6 w-6 text-cognac" strokeWidth={1.5} />
                  <div>
                    <Counter
                      to={stat.value}
                      suffix={stat.suffix}
                      className="text-4xl sm:text-5xl font-tusker text-bone"
                    />
                  </div>
                  <p className="text-sm text-bone/60 uppercase tracking-wider font-poppins">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
