"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Service, WhatYouNeedItem, UseCaseIndustry, WhenYouNeedItRichItem } from "../data";

gsap.registerPlugin(ScrollTrigger);

export function BackLink() {
  return (
    <Link href="/solutions" className="font-mono text-xs uppercase tracking-widest"
      style={{ color: "var(--fg-dim)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}>
      ← Solutions
    </Link>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/solutions/${s.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${hovered ? "rgba(168,255,60,0.35)" : "var(--border)"}`,
        background: "rgba(0,0,0,0.3)",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* image placeholder */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "rgba(255,255,255,0.02)", borderBottom: "1px dashed var(--border)" }}>
        <span className="font-mono" style={{ position: "absolute", bottom: "0.6rem", left: "0.75rem", fontSize: "0.65rem", color: "var(--accent)", opacity: 0.4, letterSpacing: "0.06em" }}>
          {s.n}
        </span>
      </div>

      {/* text */}
      <div style={{ padding: "1rem 1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {!s.serviceImage && (
          <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--accent)", opacity: 0.5 }}>{s.n}</span>
        )}
        <span className="font-display" style={{ fontSize: "1.15rem", lineHeight: 1.25, color: "var(--fg)" }}>
          {s.name}
        </span>
        {s.cardTagline && (
          <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--fg-dim)", lineHeight: 1.6 }}>
            {s.cardTagline}
          </span>
        )}
      </div>
    </Link>
  );
}

export function WhenYouNeedItList({ items }: { items: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
            padding: "1.4rem 0",
            borderBottom: "1px solid var(--border)",
            cursor: "default",
          }}>
          <span
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1,
              color: active === i ? "rgba(168,255,60,0.45)" : "rgba(168,255,60,0.07)",
              flexShrink: 0,
              minWidth: "3ch",
              transition: "color 0.25s ease",
              userSelect: "none",
            }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <p
            style={{
              fontSize: "1rem",
              color: active === i ? "var(--fg)" : "var(--fg-dim)",
              lineHeight: 1.75,
              paddingTop: "0.55rem",
              transition: "color 0.25s ease",
            }}>
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

export function WhenYouNeedItRich({ items }: { items: WhenYouNeedItRichItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          style={{
            display: "flex",
            gap: "1.75rem",
            alignItems: "flex-start",
            padding: "1.75rem 0",
            borderBottom: "1px solid var(--border)",
            cursor: "default",
          }}>
          <span style={{
            fontFamily: "var(--font-special-gothic, sans-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1,
            color: active === i ? "rgba(168,255,60,0.45)" : "rgba(168,255,60,0.07)",
            flexShrink: 0,
            minWidth: "3ch",
            transition: "color 0.25s ease",
            userSelect: "none",
          }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div style={{ paddingTop: "0.3rem" }}>
            <p style={{
              fontFamily: "var(--font-special-gothic, sans-serif)",
              fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
              color: "var(--fg)",
              lineHeight: 1.25,
              marginBottom: "0.55rem",
            }}>
              {item.title}
            </p>
            <p style={{
              fontSize: "0.95rem",
              color: active === i ? "var(--fg)" : "var(--fg-dim)",
              lineHeight: 1.8,
              transition: "color 0.25s ease",
            }}>
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WhatYouNeedStepper({ items }: { items: WhatYouNeedItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const isLast = i === items.length - 1;

        return (
          <div key={i} style={{ position: "relative" }}>
            {/* vertical connector line */}
            {!isLast && (
              <div
                style={{
                  position: "absolute",
                  left: 17,
                  top: 38,
                  width: 1,
                  bottom: 0,
                  background: isOpen ? "rgba(168,255,60,0.25)" : "var(--border)",
                  transition: "background 0.25s ease",
                  zIndex: 0,
                }}
              />
            )}

            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
                width: "100%",
                textAlign: "left",
                padding: "1rem 0",
                cursor: item.description ? "pointer" : "default",
                background: "none",
                border: "none",
              }}>
              {/* circle indicator */}
              <div
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  border: `1px solid ${isOpen ? "var(--accent)" : "var(--border)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                  background: isOpen ? "rgba(168,255,60,0.08)" : "var(--bg)",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.62rem",
                  color: isOpen ? "var(--accent)" : "var(--fg-dim)",
                  transition: "all 0.25s ease",
                }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              <div style={{ flex: 1, paddingTop: "0.4rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: isOpen ? "var(--fg)" : "var(--fg-dim)",
                      lineHeight: 1.5,
                      transition: "color 0.25s ease",
                    }}>
                    {item.title}
                  </p>
                  {item.description && (
                    <span
                      style={{
                        color: isOpen ? "var(--accent)" : "var(--fg-dim)",
                        fontSize: "1.1rem",
                        marginLeft: "1rem",
                        flexShrink: 0,
                        display: "inline-block",
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: "transform 0.25s ease, color 0.25s ease",
                        lineHeight: 1,
                      }}>
                      +
                    </span>
                  )}
                </div>

                {isOpen && item.description && (
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "rgba(168,255,60,0.65)",
                      lineHeight: 1.75,
                      marginTop: "0.6rem",
                    }}>
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function StatementText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>(".gsap-word");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        once: true,
      },
    });

    tl.fromTo(
      words,
      { opacity: 0, y: 28, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.65, stagger: 0.055, ease: "power3.out" }
    );

    return () => { tl.kill(); };
  }, [text]);

  return (
    <p
      ref={ref}
      className="font-display"
      style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: 1.15, color: "var(--fg)" }}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="gsap-word"
          style={{ display: "inline-block", marginRight: "0.3em", opacity: 0 }}>
          {word}
        </span>
      ))}
    </p>
  );
}

export function HorizontalScrollSection({ items }: { items: UseCaseIndustry[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [maxExtra, setMaxExtra] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const track = trackRef.current;
      if (!track) return;
      const extra = Math.max(0, track.scrollWidth - window.innerWidth);
      setMaxExtra(extra);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [items.length]);

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper || maxExtra === 0) return;
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const scrolled = Math.max(0, window.scrollY - wrapperTop);
      const p = Math.min(1, scrolled / maxExtra);
      setProgress(p);
      setTranslateX(p * maxExtra);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [maxExtra]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100vh + ${maxExtra}px)`, borderTop: "1px solid var(--border)" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "clamp(3rem, 7vh, 5rem)",
          paddingBottom: "2rem",
          gap: "1.25rem",
          background: "var(--bg)",
        }}>

        {/* header */}
        <div style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
          <p className="font-mono text-xs mb-2" style={{ color: "var(--fg-dim)" }}>// aplicaciones reales</p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1, color: "var(--fg)" }}>
            CASOS DE USO
          </h2>
        </div>

        {/* cards track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
            paddingRight: "clamp(1.5rem, 5vw, 6rem)",
            transform: `translateX(-${translateX}px)`,
            willChange: "transform",
            height: "clamp(340px, 50vh, 500px)",
          }}>

          {items.map((uc, i) => (
            <div
              key={i}
              style={{
                width: "clamp(260px, 30vw, 400px)",
                flexShrink: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid var(--border)",
                overflow: "hidden",
                background: "var(--bg)",
              }}>
              <div style={{ height: "52%", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.02)", borderBottom: "1px dashed var(--border)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.8) 100%)" }} />
                <p className="font-mono" style={{
                  position: "absolute", bottom: "0.75rem", left: "1.1rem",
                  fontSize: "0.65rem", color: "var(--accent)",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {uc.industry}
                </p>
              </div>
              <div style={{ flex: 1, padding: "1rem 1.25rem", overflow: "hidden", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {uc.problem ? (
                  <>
                    <div>
                      <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--fg-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.2rem" }}>El problema</span>
                      <p className="font-mono" style={{ fontSize: "0.82rem", color: "var(--fg-dim)", lineHeight: 1.6 }}>{uc.problem}</p>
                    </div>
                    <div>
                      <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.2rem", opacity: 0.7 }}>Con el sistema</span>
                      <p className="font-mono" style={{ fontSize: "0.82rem", color: "var(--fg)", lineHeight: 1.6 }}>{uc.solution}</p>
                    </div>
                    {uc.benefits && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.2rem" }}>
                        {uc.benefits.map((b, bi) => (
                          <span key={bi} className="font-mono" style={{ fontSize: "0.6rem", color: "var(--fg-muted)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 3 }}>{b}</span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="font-mono" style={{ fontSize: "1rem", color: "var(--fg-dim)", lineHeight: 1.65 }}>{uc.description}</p>
                )}
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div
            style={{
              width: "clamp(260px, 30vw, 400px)",
              flexShrink: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(168,255,60,0.25)",
              padding: "1.75rem 2rem 2rem",
              background: "rgba(168,255,60,0.02)",
            }}>
            <p className="font-mono text-xs" style={{ color: "var(--accent)", opacity: 0.6 }}>// siguiente paso</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p className="font-display" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.25rem)", lineHeight: 1.15, color: "var(--fg)" }}>
                ¿Tu sector no está acá?
              </p>
              <p className="font-mono" style={{ fontSize: "1rem", color: "var(--fg-dim)", lineHeight: 1.65 }}>
                Trabajamos con cualquier industria que genere datos.
              </p>
            </div>
            <Link href="/contact" className="btn-primary" style={{ width: "fit-content" }}>
              Contactar →
            </Link>
          </div>

          {/* trailing spacer */}
          <div style={{ width: "clamp(1.5rem, 5vw, 6rem)", flexShrink: 0 }} />
        </div>

        {/* progress bar */}
        <div style={{
          padding: "0 clamp(1.5rem, 5vw, 6rem)",
          display: "flex", alignItems: "center", gap: "1rem",
        }}>
          <div style={{ width: 160, height: 1, background: "var(--border)", flexShrink: 0 }}>
            <div style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "var(--accent)",
              transition: "width 0.05s linear",
            }} />
          </div>
          <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--fg-dim)", letterSpacing: "0.06em" }}>
            scroll →
          </span>
        </div>
      </div>
    </div>
  );
}
