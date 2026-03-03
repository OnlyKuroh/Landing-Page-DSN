"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

interface CounterProps {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  from = 0,
  to,
  suffix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      if (ref.current) {
        ref.current.textContent = `${to}${suffix}`;
      }
      return;
    }

    const controls = animate(motionValue, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      },
    });

    return controls.stop;
  }, [isInView, motionValue, to, suffix, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {from}
      {suffix}
    </span>
  );
}
