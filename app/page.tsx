"use client";

import { useState, useEffect, useRef } from "react";
import GsapAnimations from "./components/GsapAnimations";
import SiteHeader from "./components/SiteHeader";
import Link from "next/link";
import { T, type Lang } from "./lib/i18n";

const CONTACT_EMAIL = "hellothere@thenerdcompany.com";

export default function Home() {
  const [lang, setLang]                     = useState<Lang>("es");
  const [copied, setCopied]                 = useState(false);
  const [wordIdx, setWordIdx]               = useState(0);
  const [wordVisible, setWordVisible]       = useState(true);
  const ctaTiltRef                          = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ctaTiltRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -4;
      const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  4;
      card.style.transition = "none";
      card.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    };
    const onLeave = () => {
      card.style.transition = "transform 0.55s cubic-bezier(0.23,1,0.32,1)";
      card.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("tnc-lang") as Lang | null;
    if (saved && saved in T) { setLang(saved); return; }
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("pt")) setLang("pt");
    else if (browser.startsWith("en")) setLang("en");
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % t.hero.rotating.length);
        setWordVisible(true);
      }, 220);
    }, 2200);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  function copyEmail() {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const t = T[lang];

  const CARD_STYLES = [
    { bg: "linear-gradient(145deg, #111113 0%, #0e1b11 100%)", border: "rgba(190,243,101,0.14)" },
    { bg: "linear-gradient(150deg, #111113 0%, #0d1a10 100%)", border: "rgba(190,243,101,0.11)" },
    { bg: "linear-gradient(140deg, #111113 0%, #0f1d12 100%)", border: "rgba(190,243,101,0.16)" },
    { bg: "linear-gradient(145deg, #111113 0%, #0c1810 100%)", border: "rgba(190,243,101,0.10)" },
    { bg: "linear-gradient(150deg, #111113 0%, #101e13 100%)", border: "rgba(190,243,101,0.13)" },
    { bg: "linear-gradient(140deg, #111113 0%, #0e1c12 100%)", border: "rgba(190,243,101,0.12)" },
  ];

  return (
    <div id="page-root" className="flex flex-col">

      <GsapAnimations />

      {/* ── SCROLL PROGRESS BAR ── */}
      <div id="gsap-progress" style={{ position: "fixed", top: 0, left: 0, height: 2, width: "100%", background: "var(--accent)", transformOrigin: "left center", transform: "scaleX(0)", zIndex: 9997 }} />

      <SiteHeader onLangChange={setLang} />

      {/* ── HERO ── */}
      <section id="hero" style={{ height: "80vh", minHeight: 480, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {/* Subtle dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1.5px, transparent 1.5px)", backgroundSize: "36px 36px", pointerEvents: "none", zIndex: 0 }} />
        {/* Soft green gradient */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 50% 92%, rgba(74,222,128,0.14) 0%, transparent 65%), radial-gradient(ellipse 45% 35% at 85% 10%, rgba(34,197,94,0.06) 0%, transparent 55%)", pointerEvents: "none", zIndex: 0 }} />

        <div className="page-in" style={{ width: "80%", zIndex: 1, textAlign: "center" }}>
          <p id="hero-prompt" style={{ fontFamily: "var(--font-special-gothic)", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", color: "var(--fg-muted)", letterSpacing: "0.08em", marginBottom: 28 }}>
            The Nerd Company
          </p>
          <h1 className="font-display leading-none" style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)", color: "var(--fg)" }}>
            <span id="hero-line-1" style={{ display: "block" }}>
              {t.hero.h1_1}{" "}
              <span style={{
                color: "var(--accent)",
                display: "inline-block",
                opacity: wordVisible ? 1 : 0,
                transform: wordVisible ? "translateY(0)" : "translateY(-8px)",
                transition: "opacity 0.22s ease, transform 0.22s ease",
              }}>
                {t.hero.rotating[wordIdx]}
              </span>
              ,
            </span>
            <span id="hero-line-2" style={{ display: "block" }}>
              <span className="highlight-bar">{t.hero.h1_2}</span>
            </span>
          </h1>
          <p id="hero-sub" className="text-base leading-relaxed mt-6" style={{ color: "var(--fg-dim)", maxWidth: 520, margin: "24px auto 0" }}>
            {t.hero.sub}
          </p>
          <div id="hero-btns" className="flex items-center justify-center mt-10">
            <Link href="/contact" className="btn-primary">{t.nav.cta}</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 2 }}>
          <span style={{ fontSize: "0.6rem", color: "var(--fg-muted)", letterSpacing: "0.14em", textTransform: "uppercase" }}>scroll</span>
          <span className="scroll-arrow" style={{ color: "var(--fg-muted)", fontSize: "0.9rem", lineHeight: 1 }}>↓</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-3" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div id="gsap-marquee-inner" className="flex whitespace-nowrap" style={{ willChange: "transform" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {t.marquee.map((w, j) => (
                <span key={`${copy}-${j}`} className="text-xs uppercase tracking-widest shrink-0"
                  style={{ color: w === "▸" ? "var(--accent)" : "var(--fg-muted)", padding: "0 20px", fontFamily: "var(--font-space-mono), monospace" }}>
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── SOLUTIONS STACKED CARDS ── */}
      <section id="soluciones" style={{ paddingBottom: 120, background: "var(--bg)" }}>
        <div style={{ width: "80%", margin: "0 auto", paddingTop: 96, paddingBottom: 48 }}>
          <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: "var(--fg-muted)", textAlign: "center" }}>{t.solutions.label}</p>
          <h2 className="font-display leading-tight" style={{ fontSize: "clamp(1.44rem, 3vw, 2.488rem)", color: "var(--accent)" }}>
            {t.solutions.heading_1} <span className="highlight-bar">{t.solutions.heading_2}</span>
          </h2>
        </div>
        {t.solutions.items.map((s, i) => {
          const topOffset = 80 + i * 18;
          const cardStyle = CARD_STYLES[i % CARD_STYLES.length];
          return (
            <div
              key={s.n}
              className="gsap-srv-card"
              style={{
                position: "sticky",
                top: topOffset,
                zIndex: 10 + i,
                margin: "0 auto",
                width: "80%",
                borderRadius: 16,
                background: cardStyle.bg,
                border: `1px solid ${cardStyle.border}`,
                padding: "clamp(36px, 5vw, 60px) clamp(40px, 5vw, 80px)",
                display: "flex",
                flexDirection: "column",
                gap: 32,
              }}
            >
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--accent)" }}>
                {s.name}
              </span>
              <h3 className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)", color: "var(--fg)", lineHeight: 1.2, fontStyle: "italic" }}>
                {s.problem}
              </h3>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {s.tags.map((tag, ti) => (
                  <span key={tag} className="flex items-center gap-5">
                    <span style={{ fontSize: "0.78rem", color: "var(--fg-muted)", letterSpacing: "0.02em" }}>{tag}</span>
                    {ti < s.tags.length - 1 && <span style={{ color: "var(--fg-muted)", opacity: 0.3, fontSize: "0.65rem" }}>|</span>}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 items-start" style={{ maxWidth: 600 }}>
                <span style={{ color: "var(--accent)", fontSize: "1rem", lineHeight: 1.8, flexShrink: 0, marginTop: 3 }}>✳</span>
                <p style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.8 }}>{s.desc}</p>
              </div>

              <div>
                <Link href={s.link} className="btn-primary" style={{ fontSize: "0.85rem" }}>
                  {t.solutions.linkLabel}
                </Link>
              </div>
            </div>
          );
        })}

      </section>

      {/* ── SOLUTIONS CTA CARD (standalone) ── */}
      <section style={{ background: "var(--bg)", paddingBottom: 80 }}>
        <div
          ref={ctaTiltRef}
          className="cta-card-accent"
          style={{
            width: "80%",
            margin: "0 auto",
            borderRadius: 16,
            padding: "clamp(36px, 5vw, 60px) clamp(40px, 5vw, 80px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            textAlign: "center",
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
        >
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#0a1a00", lineHeight: 1.15 }}>
            {t.solutions.ctaCard.heading}
          </h2>
          <p style={{ fontSize: "1rem", color: "#1a3300", lineHeight: 1.7, maxWidth: 520 }}>
            {t.solutions.ctaCard.heading_2}
          </p>
          <div style={{ marginTop: 8 }}>
            <Link href="/contact"
              style={{ display: "inline-block", background: "#0a1a00", color: "#bef365", padding: "12px 28px", borderRadius: 8, fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}>
              {t.solutions.ctaCard.button}
            </Link>
          </div>
        </div>
      </section>

      {/* ── AUDIT MODULE ── */}
      <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ width: "80%", margin: "0 auto", padding: "clamp(64px, 8vw, 100px) 0", display: "flex", gap: "clamp(72px, 9vw, 120px)", alignItems: "stretch" }}>
          <div className="flex flex-col gap-6" style={{ flex: "0 0 38%", alignItems: "flex-start", justifyContent: "flex-start" }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>{t.audit.label}</p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--fg)", lineHeight: 1.15, textAlign: "left" }}>
              {t.audit.heading}
            </h2>
            <p style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.75, textAlign: "left" }}>
              {t.audit.sub}
            </p>
            <Link href="/rescue"
              style={{ display: "inline-block", background: "var(--accent)", color: "#0a1a00", padding: "10px 24px", borderRadius: 6, fontSize: "0.85rem", fontWeight: 500, textDecoration: "none" }}>
              {t.audit.button}
            </Link>
          </div>
          <div style={{ flex: 1, borderRadius: 12, overflow: "hidden", minHeight: 320 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/landing-foto.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY DETAIL ── */}
      <section id="tecnologia" className="py-24" style={{ background: "var(--bg)" }}>
        <div style={{ width: "80%", margin: "0 auto" }} className="flex flex-col gap-12">
          <div>
            <p className="gsap-label text-xs mb-3 uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>{t.services.label}</p>
            <h2 className="gsap-heading font-display leading-tight" style={{ fontSize: "clamp(1.44rem, 3vw, 2.488rem)", color: "var(--accent)" }}>
              {t.services.heading_1} <span className="highlight-bar">{t.services.heading_2}</span>
            </h2>
          </div>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {t.services.items.map((s) => (
              <div
                key={s.slug}
                className="gsap-srv-detail flex gap-6 items-start"
                style={{ borderBottom: "1px solid var(--border)", padding: "28px 0" }}
              >
                <span style={{
                  color: "var(--fg-muted)",
                  fontSize: "0.7rem", minWidth: 32, flexShrink: 0, paddingTop: 4,
                  fontFamily: "var(--font-space-mono), monospace",
                }}>{s.n}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="font-display leading-tight" style={{
                    fontSize: "clamp(1.2rem, 2vw, 2.074rem)",
                    color: "var(--fg)",
                    marginBottom: 8,
                  }}>{s.headerName}</h3>
                  <p style={{
                    color: "var(--fg-dim)",
                    fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 10,
                  }}>{s.headerDesc}</p>
                  <span className="tech-tag">{s.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ width: "80%", margin: "0 auto", paddingTop: 96, paddingBottom: 96 }} className="flex flex-col gap-6">
          <h2 id="cta-heading" className="font-display leading-none" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            <span className="highlight-bar">{t.cta.heading_1} {t.cta.heading_2}</span>
          </h2>
          <p style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.7, textAlign: "center" }}>{t.cta.sub}</p>
          <div className="mt-2" style={{ textAlign: "center" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: "0.9rem", padding: "12px 28px" }}>
              {t.cta.button}
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div style={{ width: "80%", margin: "0 auto" }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span style={{ fontFamily: "var(--font-special-gothic)", fontSize: "1rem", letterSpacing: "0.03em", color: "var(--fg)" }}>The Nerd Company</span>
            <span className="text-xs" style={{ color: "var(--fg-muted)" }}>{t.footer.location}</span>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <button onClick={copyEmail} className="text-sm transition-colors duration-200" style={{ color: copied ? "var(--accent)" : "var(--fg-dim)" }}
              onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = "var(--fg)"; }}
              onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = "var(--fg-dim)"; }}>
              {copied ? t.footer.copied : CONTACT_EMAIL}
            </button>
            <span className="text-xs" style={{ color: "var(--fg-muted)" }}>
              {t.footer.open} · © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
