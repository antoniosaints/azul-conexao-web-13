import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScrollRevealVariant = "up" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
  variant?: ScrollRevealVariant;
}

const hiddenVariants: Record<ScrollRevealVariant, string> = {
  up: "opacity-0 translate-y-6",
  scale: "opacity-0 translate-y-3 scale-[0.98]",
  fade: "opacity-0",
};

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  durationMs = 700,
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
  variant = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        setIsVisible(true);
        return;
      }
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
        transitionDuration: `${durationMs}ms`,
      }}
      className={cn(
        "will-change-transform transition-all ease-out motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none",
        isVisible ? "translate-y-0 scale-100 opacity-100" : hiddenVariants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
