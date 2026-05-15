"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── 1. Scroll progress bar ── */
      gsap.to("#gsap-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      /* ── 2. Hero prompt ── */
      gsap.from("#hero-prompt", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.out",
      });

      /* ── 3. Hero H1 — line 1 then line 2 ── */
      gsap.from("#hero-line-1", {
        opacity: 0,
        y: 28,
        duration: 0.65,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from("#hero-line-2", {
        opacity: 0,
        y: 28,
        duration: 0.65,
        delay: 0.62,
        ease: "power3.out",
      });

      /* ── 4. Hero subtext ── */
      gsap.from("#hero-sub", {
        opacity: 0,
        y: 16,
        duration: 0.65,
        delay: 0.9,
        ease: "power2.out",
      });

      /* ── 5. Hero buttons stagger ── */
      gsap.from("#hero-btns > *", {
        opacity: 0,
        y: 10,
        stagger: 0.12,
        duration: 0.5,
        delay: 1.15,
        ease: "power2.out",
      });

      /* ── 7. Marquee (infinite horizontal scroll) ── */
      const marqueeEl = document.querySelector<HTMLElement>("#gsap-marquee-inner");
      if (marqueeEl) {
        const halfW = marqueeEl.scrollWidth / 2;
        gsap.to("#gsap-marquee-inner", {
          x: -halfW,
          duration: 24,
          ease: "none",
          repeat: -1,
        });
      }

      /* ── 9. Quote section ── */
      gsap.from("#quote-text", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "#quote-text", start: "top 88%" },
      });

      /* ── 10. Section labels ── */
      gsap.utils.toArray<Element>(".gsap-label").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -14,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      /* ── 11. Section headings ── */
      gsap.utils.toArray<Element>(".gsap-heading").forEach((el) => {
        gsap.from(el, {
          y: 38,
          opacity: 0,
          duration: 0.78,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      /* ── 12. Service rows slide from left with stagger ── */
      gsap.from(".gsap-srv-row", {
        x: -28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#servicios", start: "top 78%" },
      });

      /* ── 13. Project cards stagger up ── */
      gsap.from(".gsap-proj-card", {
        y: 50,
        opacity: 0,
        stagger: 0.13,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: { trigger: "#proyectos", start: "top 80%" },
      });

      /* ── 14. Process cards stagger ── */
      gsap.from(".gsap-proc-card", {
        y: 28,
        scale: 0.97,
        opacity: 0,
        stagger: 0.09,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#proceso", start: "top 80%" },
      });

      /* ── 15. Stack tags cascade (like being printed) ── */
      gsap.from(".gsap-stack-tag", {
        opacity: 0,
        y: 8,
        stagger: 0.04,
        duration: 0.4,
        ease: "power1.out",
        scrollTrigger: { trigger: "#stack", start: "top 82%" },
      });

      /* ── 16. Stack description text ── */
      gsap.from("#stack-desc", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#stack-desc", start: "top 90%" },
      });

      /* ── 17. Who we are body text ── */
      gsap.from("#quienes-body", {
        opacity: 0,
        y: 16,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: "#quienes-body", start: "top 88%" },
      });

      /* ── 18. Avoid list items slide from left ── */
      gsap.from(".gsap-avoid-item", {
        x: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: "#quienes-somos", start: "top 78%" },
      });

      /* ── 19. Contact heading ── */
      gsap.from("#contact-heading", {
        y: 28,
        opacity: 0,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: { trigger: "#contacto", start: "top 86%" },
      });

      /* ── 20. Contact steps indicator ── */
      gsap.from("#contact-steps", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: "#contacto", start: "top 84%" },
      });

      /* ── 21. Service grid cards stagger up ── */
      gsap.from(".gsap-srv-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: "#servicios-grid", start: "top 82%" },
      });


      /* ── 22. Technology rows — reveal on scroll, one by one ── */
      gsap.utils.toArray<Element>(".gsap-srv-detail").forEach((row) => {
        gsap.from(row, {
          y: 36,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 94%", end: "top 65%", toggleActions: "play none none reverse" },
        });
      });

      /* ── 23. CTA heading reveal ── */
      gsap.from("#cta-heading", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "#cta-heading", start: "top 88%" },
      });

    });

    return () => ctx.revert();
  }, []);

  return null;
}
