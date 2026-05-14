"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { T, type Lang } from "../lib/i18n";

const LANGS: Lang[] = ["es", "en", "pt"];

function glitchEnter(el: HTMLElement) {
  el.style.transform = "translateX(3px)";
  el.style.filter = "hue-rotate(90deg) saturate(3) brightness(1.3)";
  setTimeout(() => {
    el.style.transform = "translateX(-2px)";
    el.style.filter = "";
    setTimeout(() => {
      el.style.transform = "translateX(1px)";
      setTimeout(() => { el.style.transform = ""; }, 30);
    }, 35);
  }, 35);
}

export default function SiteHeader() {
  const [lang, setLang]                     = useState<Lang>("es");
  const [servicesOpen, setServicesOpen]     = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [menuOpen, setMenuOpen]             = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tnc-lang") as Lang | null;
    if (saved && saved in T) { setLang(saved); return; }
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("pt")) setLang("pt");
    else if (browser.startsWith("en")) setLang("en");
  }, []);

  function switchLang(l: Lang) {
    setLang(l);
    localStorage.setItem("tnc-lang", l);
  }

  const t          = T[lang];
  const activeSlug = hoveredService ?? t.services.items[0].slug;
  const active     = t.services.items.find(s => s.slug === activeSlug) ?? t.services.items[0];
  const seeMore    = lang === "en" ? "See more →" : lang === "pt" ? "Ver mais →" : "Ver más →";

  return (
    <>
      {/* ── Page dimming overlay ── */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.78)", opacity: servicesOpen ? 1 : 0, transition: "opacity 0.25s ease", pointerEvents: servicesOpen ? "auto" : "none" }}
        onClick={() => setServicesOpen(false)}
      />

      {/* ── Header ── */}
      <header className="fixed left-0 right-0 z-50"
        style={{ top: 0, background: "rgba(6,12,6,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}
        onMouseLeave={() => setServicesOpen(false)}>

        {/* Main row */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg select-none"
            style={{ fontFamily: "var(--font-special-gothic)", color: "var(--fg)", letterSpacing: "0.03em", textDecoration: "none" }}>
            The Nerd Company
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <Link href="/" className="font-mono uppercase tracking-widest transition-colors duration-200"
              style={{ color: "var(--fg-dim)", fontSize: "0.8rem", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; setServicesOpen(false); }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}>
              {t.nav.home}
            </Link>

            <button className="font-mono uppercase tracking-widest transition-colors duration-200 flex items-center gap-1.5"
              style={{ color: servicesOpen ? "var(--accent)" : "var(--fg-dim)", fontSize: "0.8rem" }}
              onMouseEnter={() => setServicesOpen(true)}>
              {t.nav.services}
              <span style={{ fontSize: "0.55rem", opacity: 0.6, transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▾</span>
            </button>

            <Link href="/quienes-somos" className="font-mono uppercase tracking-widest transition-colors duration-200"
              style={{ color: "var(--fg-dim)", fontSize: "0.8rem", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; setServicesOpen(false); }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}>
              {t.nav.about}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center" style={{ border: "1px solid var(--border)" }}>
              {LANGS.map((l) => (
                <button key={l} onClick={() => switchLang(l)}
                  className="font-mono text-xs uppercase"
                  style={{ padding: "4px 8px", color: lang === l ? "var(--bg)" : "var(--fg-muted)", background: lang === l ? "var(--accent)" : "transparent", transition: "background 0.15s, color 0.15s", letterSpacing: "0.05em" }}>
                  {l}
                </button>
              ))}
            </div>
            <Link href="/contacto" className="btn-primary text-xs" style={{ padding: "6px 16px" }}>
              {t.nav.cta}
            </Link>
          </div>

          <button className="md:hidden font-mono text-sm" style={{ color: "var(--fg-dim)" }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "[✕]" : "[☰]"}
          </button>
        </div>

        {/* Expanding services panel */}
        <div className="hidden md:block overflow-hidden" style={{ maxHeight: servicesOpen ? "310px" : "0", transition: "max-height 0.3s ease" }}>
          <div className="flex" style={{ borderTop: "1px solid rgba(168,255,60,0.12)", height: 290 }}>

            {/* Left: vertical service list */}
            <div className="flex flex-col justify-start gap-1 px-8 py-8" style={{ width: "34%", flexShrink: 0 }}>
              {t.services.items.map((s) => {
                const isActive = activeSlug === s.slug;
                return (
                  <Link key={s.slug}
                    href={`/servicios/${s.slug}`}
                    className="font-display text-left"
                    style={{
                      fontSize: "1.35rem", lineHeight: 1.25,
                      color: "var(--fg)",
                      opacity: isActive ? 1 : 0.18,
                      transition: "opacity 0.15s",
                      padding: "5px 0", cursor: "pointer",
                      textDecoration: "none", display: "block",
                    }}
                    onMouseEnter={(e) => { setHoveredService(s.slug); glitchEnter(e.currentTarget as HTMLElement); }}
                    onClick={() => setServicesOpen(false)}>
                    <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.65rem", color: "var(--accent)", opacity: 0.7, marginRight: "0.6rem" }}>{s.n}</span>
                    {s.headerName}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div style={{ width: 1, background: "rgba(168,255,60,0.12)", flexShrink: 0 }} />

            {/* Center: description + category + link */}
            <div className="flex flex-col justify-start gap-5 px-10 py-8" style={{ flex: 1, minWidth: 0 }}>
              <p className="font-mono" style={{ fontSize: "0.92rem", color: "var(--fg-dim)", lineHeight: 1.85 }}>
                {active.headerDesc}
              </p>
              <span className="font-mono" style={{ fontSize: "0.78rem", color: "var(--accent)", opacity: 0.75 }}>
                {active.category}
              </span>
              <Link href={`/servicios/${activeSlug}`}
                className="font-mono font-bold uppercase tracking-widest"
                style={{ fontSize: "0.75rem", color: "var(--accent)", textDecoration: "none" }}
                onClick={() => setServicesOpen(false)}>
                {seeMore}
              </Link>
            </div>

            {/* Divider */}
            <div style={{ width: 1, background: "rgba(168,255,60,0.12)", flexShrink: 0 }} />

            {/* Right: service image */}
            <div style={{ width: "26%", flexShrink: 0, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/s${parseInt(active.n)}.png`}
                alt={active.headerName}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

          </div>
        </div>

      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden"
          style={{ background: "rgba(6,12,6,0.98)", backdropFilter: "blur(20px)" }}>
          <Link href="/" className="font-display text-4xl" style={{ color: "var(--fg)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
            {t.nav.home}
          </Link>
          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-4xl" style={{ color: "var(--fg)" }}>{t.nav.services}</span>
            <div className="flex flex-col items-center gap-2">
              {t.services.items.map((s) => (
                <Link key={s.slug} href={`/servicios/${s.slug}`}
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--accent)", textDecoration: "none" }}
                  onClick={() => setMenuOpen(false)}>
                  {s.n} — {s.headerName}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/quienes-somos" className="font-display text-4xl" style={{ color: "var(--fg)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
            {t.nav.about}
          </Link>
          <div className="flex items-center gap-2 mt-4">
            {LANGS.map((l) => (
              <button key={l} onClick={() => { switchLang(l); setMenuOpen(false); }}
                className="font-mono text-sm uppercase"
                style={{ padding: "6px 14px", color: lang === l ? "var(--bg)" : "var(--fg-muted)", background: lang === l ? "var(--accent)" : "transparent", border: "1px solid var(--border)" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
