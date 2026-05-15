"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { T, type Lang } from "../lib/i18n";

const LANGS: Lang[] = ["es", "en", "pt"];

type Props = { onLangChange?: (lang: Lang) => void };

export default function SiteHeader({ onLangChange }: Props = {}) {
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
    onLangChange?.(l);
  }

  const t          = T[lang];
  const activeSlug = hoveredService ?? t.services.items[0].slug;
  const active     = t.services.items.find(s => s.slug === activeSlug) ?? t.services.items[0];
  const seeMore    = lang === "en" ? "View service →" : lang === "pt" ? "Ver serviço →" : "Ver servicio →";

  return (
    <>
      {/* ── Page dimming overlay ── */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.6)", opacity: servicesOpen ? 1 : 0, transition: "opacity 0.25s ease", pointerEvents: servicesOpen ? "auto" : "none" }}
        onClick={() => setServicesOpen(false)}
      />

      {/* ── Header ── */}
      <header className="fixed left-0 right-0 z-50"
        style={{ top: 0, background: "rgba(9,9,11,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}
        onMouseLeave={() => setServicesOpen(false)}>

        {/* Main row */}
        <div className="flex items-center justify-between px-6 py-4" style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <Link href="/" className="select-none font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-special-gothic)", color: "var(--fg)", letterSpacing: "0.03em", textDecoration: "none", fontSize: "1.1rem" }}>
            The Nerd Company
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="transition-colors duration-200"
              style={{ fontSize: "1rem", color: "var(--fg-dim)", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; setServicesOpen(false); }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}>
              {t.nav.home}
            </Link>

            <button className="transition-colors duration-200 flex items-center gap-1"
              style={{ fontSize: "1rem", color: servicesOpen ? "var(--fg)" : "var(--fg-dim)" }}
              onMouseEnter={() => setServicesOpen(true)}>
              {t.nav.services}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5, transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <Link href="/rescue" className="transition-colors duration-200"
              style={{ fontSize: "1rem", color: "var(--fg-dim)", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; setServicesOpen(false); }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}>
              {t.nav.rescue}
            </Link>

            <Link href="/about" className="transition-colors duration-200"
              style={{ fontSize: "1rem", color: "var(--fg-dim)", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; setServicesOpen(false); }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}>
              {t.nav.about}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center" style={{ border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden" }}>
              {LANGS.map((l) => (
                <button key={l} onClick={() => switchLang(l)}
                  className="uppercase"
                  style={{ fontSize: "0.8rem", padding: "4px 10px", color: lang === l ? "#000" : "var(--fg-muted)", background: lang === l ? "var(--accent)" : "transparent", transition: "background 0.15s, color 0.15s", letterSpacing: "0.04em" }}>
                  {l}
                </button>
              ))}
            </div>
            <Link href="/contact" className="btn-primary" style={{ padding: "6px 18px", fontSize: "0.9rem" }}>
              {t.nav.cta}
            </Link>
          </div>

          <button className="md:hidden text-xl" style={{ color: "var(--fg-dim)", lineHeight: 1 }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Expanding services panel */}
        <div className="hidden md:block overflow-hidden" style={{ maxHeight: servicesOpen ? "310px" : "0", transition: "max-height 0.3s ease" }}>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", paddingLeft: "1.5rem" }}>
            <div className="flex" style={{ height: 260, maxWidth: 780 }}>

              {/* Left: vertical service list */}
              <div className="flex flex-col justify-start gap-0.5 pr-8 py-7" style={{ width: 260, flexShrink: 0 }}>
                {t.services.items.map((s) => {
                  const isActive = activeSlug === s.slug;
                  return (
                    <Link key={s.slug}
                      href={`/solutions/${s.slug}`}
                      className="font-display text-left"
                      style={{
                        fontSize: "1.15rem", lineHeight: 1.3,
                        color: "var(--fg)",
                        opacity: isActive ? 1 : 0.2,
                        transition: "opacity 0.15s",
                        padding: "6px 0", cursor: "pointer",
                        textDecoration: "none", display: "block",
                      }}
                      onMouseEnter={() => setHoveredService(s.slug)}
                      onClick={() => setServicesOpen(false)}>
                      <span style={{ fontSize: "0.7rem", color: "var(--fg-muted)", marginRight: "0.6rem" }}>{s.n}</span>
                      {s.name}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div style={{ width: 1, background: "var(--border)", flexShrink: 0 }} />

              {/* Center: description + category + link */}
              <div className="flex flex-col justify-start gap-4 px-8 py-7" style={{ flex: 1, minWidth: 0 }}>
                <p className="text-sm" style={{ color: "var(--fg-dim)", lineHeight: 1.75 }}>
                  {active.headerDesc}
                </p>
                <span className="text-xs" style={{ color: "var(--fg-muted)" }}>
                  {active.category}
                </span>
                <Link href={`/solutions/${activeSlug}`}
                  className="text-sm font-medium"
                  style={{ color: "var(--accent)", textDecoration: "none" }}
                  onClick={() => setServicesOpen(false)}>
                  {seeMore}
                </Link>
              </div>

            </div>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: "rgba(9,9,11,0.98)", backdropFilter: "blur(20px)" }}>
          <Link href="/" className="font-display text-3xl font-bold" style={{ color: "var(--fg)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
            {t.nav.home}
          </Link>
          <Link href="/#soluciones" className="font-display text-3xl font-bold" style={{ color: "var(--fg)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
            {t.nav.solutions}
          </Link>
          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-3xl font-bold" style={{ color: "var(--fg)" }}>{t.nav.services}</span>
            <div className="flex flex-col items-center gap-2">
              {t.services.items.map((s) => (
                <Link key={s.slug} href={`/solutions/${s.slug}`}
                  className="text-sm"
                  style={{ color: "var(--fg-dim)", textDecoration: "none" }}
                  onClick={() => setMenuOpen(false)}>
                  {s.n} — {s.headerName}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/rescue" className="font-display text-3xl font-bold" style={{ color: "var(--fg)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
            {t.nav.rescue}
          </Link>
          <Link href="/about" className="font-display text-3xl font-bold" style={{ color: "var(--fg)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
            {t.nav.about}
          </Link>
          <div className="flex items-center gap-2 mt-2" style={{ border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden" }}>
            {LANGS.map((l) => (
              <button key={l} onClick={() => { switchLang(l); setMenuOpen(false); }}
                className="text-sm uppercase"
                style={{ padding: "8px 16px", color: lang === l ? "#000" : "var(--fg-muted)", background: lang === l ? "var(--accent)" : "transparent" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
