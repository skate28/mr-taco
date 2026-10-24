"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type RevealFrom = "up" | "side" | "pop" | "tilt";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** How an offscreen block enters once it actually intersects. */
  from?: RevealFrom;
};

/**
 * Scroll reveal that never hides content.
 * The first paint is always visible. Motion only plays once an offscreen block
 * actually enters the viewport. Reduced motion, a missing observer, and the
 * server render all leave the block fully visible.
 */
const ENTER = {
  up: {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
  },
  side: {
    initial: { opacity: 0, x: -56 },
    animate: { opacity: 1, x: 0 },
  },
  pop: {
    initial: { opacity: 0, y: 16, scale: 0.92 },
    animate: { opacity: 1, y: 0, scale: 1 },
  },
  tilt: {
    initial: { opacity: 0, y: 18, rotate: -7, scale: 0.94 },
    animate: { opacity: 1, y: 0, rotate: 0, scale: 1 },
  },
} as const;

export function Reveal({ children, className, delay = 0, from = "up" }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduce !== false) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setPlay(true);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  if (play) {
    const enter = ENTER[from];
    const spring = from === "up" ? { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } : { type: "spring" as const, stiffness: from === "pop" ? 460 : 320, damping: from === "pop" ? 14 : 16, delay };
    return (
      <motion.div className={cn("reveal", className)} initial={enter.initial} animate={enter.animate} transition={spring}>
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={cn("reveal", className)} style={{ opacity: 1 }}>
      {children}
    </div>
  );
}
