"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    lenis.on("scroll", ScrollTrigger.update);

    function lenisRaf(time: number) { lenis.raf(time * 1000); }
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    /* CRT scanline sweep — runs on every page */
    gsap.to("#crt-scanline", {
      y: "100vh",
      duration: 6,
      ease: "none",
      repeat: -1,
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenisRaf);
    };
  }, []);

  return <>{children}</>;
}
