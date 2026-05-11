"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.getAttribute("data-delay") ?? "0");
            setTimeout(() => entry.target.classList.add("is-visible"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    return () => { lenis.destroy(); observer.disconnect(); };
  }, []);

  return <>{children}</>;
}
