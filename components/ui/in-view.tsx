"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface InViewProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Tailwind classes applied before the element is in view.
   * Defaults to a subtle fade/slide.
   */
  initialClassName?: string;
  /**
   * Tailwind classes applied once the element enters the viewport.
   */
  inViewClassName?: string;
  /**
   * IntersectionObserver threshold (0..1)
   */
  threshold?: number;
  /**
   * Root margin for the observer, e.g., "0px 0px -10% 0px"
   */
  rootMargin?: string;
  /**
   * Delay (ms) before applying inView classes after intersection.
   */
  delayMs?: number;
  /**
   * If true, the animation will run only the first time the element enters
   * the viewport and will keep the in-view state afterwards.
   */
  once?: boolean;
  as?: ElementType;
}

export function InView({
  children,
  className,
  initialClassName = "opacity-0 translate-y-6",
  inViewClassName = "opacity-100 translate-y-0",
  threshold = 0.15,
  rootMargin = "0px",
  delayMs = 0,
  once = true,
  as = "div",
}: InViewProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let timeoutId: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            timeoutId = window.setTimeout(() => {
              setIsInView(true);
              setHasEntered(true);
            }, delayMs);
          } else {
            setIsInView(true);
            setHasEntered(true);
          }
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, delayMs, once]);

  const Component = (as as ElementType) || "div";

  return (
    <Component
      ref={ref as any}
      className={cn(
        // Always include transition utilities for smoothness
        "transition-all duration-700 ease-out will-change-transform will-change-opacity",
        hasEntered ? (isInView ? inViewClassName : initialClassName) : initialClassName,
        className
      )}
    >
      {children}
    </Component>
  );
}

export default InView;


