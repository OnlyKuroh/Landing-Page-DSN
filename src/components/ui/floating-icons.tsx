"use client";

/**
 * Floating Design Tool Icons
 * Hero = full dense set, inner sections = sparse (2 icons each).
 */

/** Full icon set for hero */
export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* NEAR */}
      <div className="absolute top-[14%] right-[7%] animate-float-slow blur-distance-near">
        <div className="w-[4.4rem] h-[4.4rem] rounded-xl bg-[#31A8FF]/15 border border-[#31A8FF]/25 flex items-center justify-center shadow-lg shadow-[#31A8FF]/10">
          <span className="text-[#31A8FF] font-bold text-2xl font-tusker">Ps</span>
        </div>
      </div>
      <div className="absolute bottom-[28%] left-[4%] animate-float-medium blur-distance-near" style={{ animationDelay: "1.2s" }}>
        <div className="w-[3.85rem] h-[3.85rem] rounded-xl bg-[#A259FF]/15 border border-[#A259FF]/25 flex items-center justify-center shadow-lg shadow-[#A259FF]/10">
          <svg className="w-8 h-8 text-[#A259FF]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2H8.5C6.567 2 5 3.567 5 5.5S6.567 9 8.5 9H12V2z"/>
            <path d="M12 2h3.5C17.433 2 19 3.567 19 5.5S17.433 9 15.5 9H12V2z" opacity="0.8"/>
            <path d="M12 9H8.5C6.567 9 5 10.567 5 12.5S6.567 16 8.5 16H12V9z" opacity="0.6"/>
            <path d="M5 19.5C5 17.567 6.567 16 8.5 16H12v3.5c0 1.933-1.567 3.5-3.5 3.5S5 21.433 5 19.5z" opacity="0.4"/>
            <path d="M12 9h3.5c1.933 0 3.5 1.567 3.5 3.5S17.433 16 15.5 16 12 14.433 12 12.5V9z" opacity="0.7"/>
          </svg>
        </div>
      </div>

      {/* MID */}
      <div className="absolute top-[38%] left-[10%] animate-float-fast blur-distance-mid" style={{ animationDelay: "2.2s" }}>
        <div className="w-12 h-12 rounded-lg bg-[#FF9A00]/15 border border-[#FF9A00]/20 flex items-center justify-center">
          <span className="text-[#FF9A00] font-bold text-base font-tusker">Ai</span>
        </div>
      </div>
      <div className="absolute bottom-[42%] right-[12%] animate-float-slow blur-distance-mid" style={{ animationDelay: "3.5s" }}>
        <div className="w-12 h-12 rounded-lg bg-[#D4A574]/15 border border-[#D4A574]/20 flex items-center justify-center">
          <span className="text-[#D4A574] font-bold text-sm font-tusker">Cl</span>
        </div>
      </div>
      <div className="absolute top-[22%] right-[28%] animate-float-medium blur-distance-mid" style={{ animationDelay: "0.8s" }}>
        <div className="w-11 h-11 rounded-lg bg-[#92003B]/15 border border-[#92003B]/20 flex items-center justify-center">
          <span className="text-[#FF6F6F] font-bold text-xs font-tusker">El</span>
        </div>
      </div>
      <div className="absolute bottom-[18%] left-[18%] animate-float-slow blur-distance-mid" style={{ animationDelay: "4s" }}>
        <div className="w-10 h-10 rounded-lg bg-[#31A8FF]/12 border border-[#31A8FF]/18 flex items-center justify-center">
          <span className="text-[#31A8FF]/60 font-bold text-sm font-tusker">Lr</span>
        </div>
      </div>

      {/* FAR */}
      <div className="absolute top-[58%] right-[22%] animate-float-medium blur-distance-far" style={{ animationDelay: "0.5s" }}>
        <div className="w-9 h-9 rounded-lg bg-[#9999FF]/12 border border-[#9999FF]/12 flex items-center justify-center">
          <span className="text-[#9999FF] font-bold text-xs font-tusker">Ae</span>
        </div>
      </div>
      <div className="absolute top-[18%] left-[32%] animate-float-fast blur-distance-far" style={{ animationDelay: "3s" }}>
        <div className="w-8 h-8 rounded-md bg-[#FF3366]/12 border border-[#FF3366]/12 flex items-center justify-center">
          <span className="text-[#FF3366] font-bold text-[10px] font-tusker">Id</span>
        </div>
      </div>
      <div className="absolute top-[48%] left-[2%] animate-float-medium blur-distance-far" style={{ animationDelay: "2.5s" }}>
        <div className="w-8 h-8 rounded-md bg-[#9999FF]/12 border border-[#9999FF]/12 flex items-center justify-center">
          <span className="text-[#9999FF] font-bold text-[10px] font-tusker">Pr</span>
        </div>
      </div>
      <div className="absolute bottom-[35%] right-[38%] animate-float-slow blur-distance-far" style={{ animationDelay: "1.8s" }}>
        <div className="w-7 h-7 rounded-md bg-[#00C4CC]/12 border border-[#00C4CC]/12 flex items-center justify-center">
          <span className="text-[#00C4CC] font-bold text-[9px] font-tusker">Cv</span>
        </div>
      </div>

      {/* Ambient dots */}
      <div className="absolute top-[10%] left-[50%] w-3 h-3 rounded-full bg-cognac/8 blur-distance-mid animate-float-slow" style={{ animationDelay: "3.5s" }} />
      <div className="absolute bottom-[22%] left-[28%] w-3 h-3 rounded-full bg-[#31A8FF]/8 blur-distance-far animate-float-fast" style={{ animationDelay: "1.2s" }} />
      <div className="absolute top-[72%] right-[8%] w-2 h-2 rounded-full bg-[#FF9A00]/10 blur-distance-near animate-float-medium" style={{ animationDelay: "2.8s" }} />
    </div>
  );
}

/** Global floating icons layer across the whole page */
export function FloatingIconsGlobal() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="absolute top-[6%] left-[2%] animate-float-slow blur-distance-mid">
        <div className="w-10 h-10 rounded-lg bg-[#31A8FF]/16 border border-[#31A8FF]/20 flex items-center justify-center">
          <span className="text-[#31A8FF] font-bold text-xs font-tusker">Ps</span>
        </div>
      </div>
      <div className="absolute top-[12%] right-[5%] animate-float-medium blur-distance-mid" style={{ animationDelay: "1.3s" }}>
        <div className="w-9 h-9 rounded-lg bg-[#A259FF]/16 border border-[#A259FF]/20 flex items-center justify-center">
          <span className="text-[#A259FF] font-bold text-[10px] font-tusker">Fg</span>
        </div>
      </div>
      <div className="absolute top-[20%] left-[6%] animate-float-fast blur-distance-far" style={{ animationDelay: "2.1s" }}>
        <div className="w-8 h-8 rounded-md bg-[#FF9A00]/16 border border-[#FF9A00]/20 flex items-center justify-center">
          <span className="text-[#FF9A00] font-bold text-[10px] font-tusker">Ai</span>
        </div>
      </div>
      <div className="absolute top-[28%] right-[8%] animate-float-slow blur-distance-far" style={{ animationDelay: "3.6s" }}>
        <div className="w-9 h-9 rounded-lg bg-[#00C4CC]/16 border border-[#00C4CC]/20 flex items-center justify-center">
          <span className="text-[#00C4CC] font-bold text-[10px] font-tusker">Cv</span>
        </div>
      </div>
      <div className="absolute top-[36%] left-[3%] animate-float-medium blur-distance-far" style={{ animationDelay: "1.9s" }}>
        <div className="w-8 h-8 rounded-md bg-[#9999FF]/16 border border-[#9999FF]/20 flex items-center justify-center">
          <span className="text-[#9999FF] font-bold text-[10px] font-tusker">Pr</span>
        </div>
      </div>

      <div className="absolute top-[44%] right-[4%] animate-float-slow blur-distance-mid" style={{ animationDelay: "2.7s" }}>
        <div className="w-10 h-10 rounded-lg bg-[#FF3366]/14 border border-[#FF3366]/18 flex items-center justify-center">
          <span className="text-[#FF3366] font-bold text-xs font-tusker">Id</span>
        </div>
      </div>

      <div className="absolute top-[52%] left-[7%] animate-float-medium blur-distance-far" style={{ animationDelay: "1.1s" }}>
        <div className="w-8 h-8 rounded-md bg-[#D4A574]/14 border border-[#D4A574]/18 flex items-center justify-center">
          <span className="text-[#D4A574] font-bold text-[10px] font-tusker">Cl</span>
        </div>
      </div>

      <div className="absolute top-[60%] right-[6%] animate-float-fast blur-distance-far" style={{ animationDelay: "3.1s" }}>
        <div className="w-8 h-8 rounded-md bg-[#31A8FF]/14 border border-[#31A8FF]/18 flex items-center justify-center">
          <span className="text-[#31A8FF] font-bold text-[10px] font-tusker">Lr</span>
        </div>
      </div>

      <div className="absolute top-[68%] left-[3%] animate-float-slow blur-distance-mid" style={{ animationDelay: "1.6s" }}>
        <div className="w-9 h-9 rounded-lg bg-[#92003B]/14 border border-[#92003B]/18 flex items-center justify-center">
          <span className="text-[#FF6F6F] font-bold text-[10px] font-tusker">El</span>
        </div>
      </div>

      <div className="absolute top-[76%] right-[3%] animate-float-medium blur-distance-far" style={{ animationDelay: "0.9s" }}>
        <div className="w-8 h-8 rounded-md bg-[#9999FF]/14 border border-[#9999FF]/18 flex items-center justify-center">
          <span className="text-[#9999FF] font-bold text-[10px] font-tusker">Ae</span>
        </div>
      </div>

      <div className="absolute top-[84%] left-[5%] animate-float-fast blur-distance-mid" style={{ animationDelay: "2.2s" }}>
        <div className="w-9 h-9 rounded-lg bg-[#A259FF]/14 border border-[#A259FF]/18 flex items-center justify-center">
          <span className="text-[#A259FF] font-bold text-[10px] font-tusker">Fg</span>
        </div>
      </div>

      <div className="absolute top-[92%] right-[7%] animate-float-slow blur-distance-mid" style={{ animationDelay: "3.4s" }}>
        <div className="w-10 h-10 rounded-lg bg-[#31A8FF]/16 border border-[#31A8FF]/20 flex items-center justify-center">
          <span className="text-[#31A8FF] font-bold text-xs font-tusker">Ps</span>
        </div>
      </div>
    </div>
  );
}

/** Sparse floating icons — 2 subtle FAR-layer icons per variant */
export function FloatingIconsSparse({ variant = 1 }: { variant?: number }) {
  const sets: Record<number, React.ReactNode> = {
    1: (
      <>
        <div className="absolute top-[12%] right-[5%] animate-float-slow blur-distance-far" style={{ animationDelay: "0.5s" }}>
          <div className="w-9 h-9 rounded-lg bg-[#31A8FF]/8 border border-[#31A8FF]/8 flex items-center justify-center">
            <span className="text-[#31A8FF] font-bold text-xs font-tusker">Ps</span>
          </div>
        </div>
        <div className="absolute bottom-[15%] left-[3%] animate-float-medium blur-distance-far" style={{ animationDelay: "2s" }}>
          <div className="w-8 h-8 rounded-md bg-[#A259FF]/8 border border-[#A259FF]/8 flex items-center justify-center">
            <span className="text-[#A259FF] font-bold text-[10px] font-tusker">Fg</span>
          </div>
        </div>
      </>
    ),
    2: (
      <>
        <div className="absolute top-[18%] left-[4%] animate-float-medium blur-distance-far" style={{ animationDelay: "1s" }}>
          <div className="w-8 h-8 rounded-md bg-[#FF9A00]/8 border border-[#FF9A00]/8 flex items-center justify-center">
            <span className="text-[#FF9A00] font-bold text-[10px] font-tusker">Ai</span>
          </div>
        </div>
        <div className="absolute bottom-[20%] right-[6%] animate-float-slow blur-distance-far" style={{ animationDelay: "3s" }}>
          <div className="w-9 h-9 rounded-lg bg-[#D4A574]/8 border border-[#D4A574]/8 flex items-center justify-center">
            <span className="text-[#D4A574] font-bold text-xs font-tusker">Cl</span>
          </div>
        </div>
      </>
    ),
    3: (
      <>
        <div className="absolute top-[10%] right-[3%] animate-float-fast blur-distance-far" style={{ animationDelay: "0.8s" }}>
          <div className="w-8 h-8 rounded-md bg-[#92003B]/8 border border-[#92003B]/8 flex items-center justify-center">
            <span className="text-[#FF6F6F] font-bold text-[10px] font-tusker">El</span>
          </div>
        </div>
        <div className="absolute bottom-[10%] left-[5%] animate-float-slow blur-distance-far" style={{ animationDelay: "2.5s" }}>
          <div className="w-7 h-7 rounded-md bg-[#9999FF]/8 border border-[#9999FF]/8 flex items-center justify-center">
            <span className="text-[#9999FF] font-bold text-[9px] font-tusker">Ae</span>
          </div>
        </div>
      </>
    ),
    4: (
      <>
        <div className="absolute top-[15%] left-[6%] animate-float-medium blur-distance-far" style={{ animationDelay: "1.5s" }}>
          <div className="w-9 h-9 rounded-lg bg-[#31A8FF]/8 border border-[#31A8FF]/8 flex items-center justify-center">
            <span className="text-[#31A8FF] font-bold text-xs font-tusker">Lr</span>
          </div>
        </div>
        <div className="absolute bottom-[18%] right-[4%] animate-float-fast blur-distance-far" style={{ animationDelay: "3.5s" }}>
          <div className="w-8 h-8 rounded-md bg-[#FF3366]/8 border border-[#FF3366]/8 flex items-center justify-center">
            <span className="text-[#FF3366] font-bold text-[10px] font-tusker">Id</span>
          </div>
        </div>
      </>
    ),
    5: (
      <>
        <div className="absolute top-[8%] right-[4%] animate-float-slow blur-distance-far" style={{ animationDelay: "0.3s" }}>
          <div className="w-8 h-8 rounded-md bg-[#A259FF]/8 border border-[#A259FF]/8 flex items-center justify-center">
            <span className="text-[#A259FF] font-bold text-[10px] font-tusker">Fg</span>
          </div>
        </div>
        <div className="absolute bottom-[12%] left-[3%] animate-float-medium blur-distance-far" style={{ animationDelay: "2.2s" }}>
          <div className="w-7 h-7 rounded-md bg-[#00C4CC]/8 border border-[#00C4CC]/8 flex items-center justify-center">
            <span className="text-[#00C4CC] font-bold text-[9px] font-tusker">Cv</span>
          </div>
        </div>
      </>
    ),
    6: (
      <>
        <div className="absolute top-[12%] left-[5%] animate-float-fast blur-distance-far" style={{ animationDelay: "1.8s" }}>
          <div className="w-8 h-8 rounded-md bg-[#9999FF]/8 border border-[#9999FF]/8 flex items-center justify-center">
            <span className="text-[#9999FF] font-bold text-[10px] font-tusker">Pr</span>
          </div>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-slow blur-distance-far" style={{ animationDelay: "4s" }}>
          <div className="w-9 h-9 rounded-lg bg-[#31A8FF]/8 border border-[#31A8FF]/8 flex items-center justify-center">
            <span className="text-[#31A8FF] font-bold text-xs font-tusker">Ps</span>
          </div>
        </div>
      </>
    ),
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {sets[variant] ?? sets[1]}
    </div>
  );
}
