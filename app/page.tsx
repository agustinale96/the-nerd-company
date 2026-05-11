"use client";

import { useState, useRef, useEffect } from "react";
import GsapAnimations from "./components/GsapAnimations";
import ChatPanel from "./components/ChatPanel";
import Link from "next/link";
import { T, type Lang } from "./lib/i18n";

const STACK = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Redis", "AWS", "Vercel", "Figma", "Docker", "n8n", "Make", "Zapier"];
const CONTACT_EMAIL = "hellothere@thenerdcompany.com";
const FOUNDERS = [
  { name: "Agustín Ale",       role: "Co-founder" },
  { name: "Cristóbal Cantolla", role: "Co-founder" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

function Globe() {
  return (
    <svg viewBox="0 0 400 400" fill="none" className="w-full h-full" style={{ color: "var(--fg-dim)" }}>
      <circle cx="200" cy="200" r="178" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="200" cy="200" rx="178" ry="60" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="200" cy="200" rx="178" ry="115" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="200" cy="200" rx="60" ry="178" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="200" cy="200" rx="115" ry="178" stroke="currentColor" strokeWidth="0.6" />
      <line x1="22" y1="200" x2="378" y2="200" stroke="currentColor" strokeWidth="0.6" />
      <line x1="200" y1="22" x2="200" y2="378" stroke="currentColor" strokeWidth="0.6" />
      <line x1="70" y1="88" x2="330" y2="312" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 4" style={{ color: "var(--accent)", opacity: 0.5 }} />
      <circle cx="260" cy="148" r="5" fill="var(--accent)" opacity="0.8" />
      <circle cx="155" cy="230" r="3" fill="var(--accent)" opacity="0.5" />
      <circle cx="300" cy="270" r="3" fill="var(--accent)" opacity="0.5" />
      <line x1="260" y1="148" x2="155" y2="230" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      <line x1="155" y1="230" x2="300" y2="270" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}

export default function Home() {
  const [lang, setLang]             = useState<Lang>("es");
  const [step, setStep]             = useState(0);
  const [values, setValues]         = useState(["", "", "", ""]);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg]     = useState("");
  const [blurring, setBlurring]     = useState(false);
  const [copied, setCopied]         = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const inputRef                    = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("tnc-lang") as Lang | null;
    if (saved && saved in T) setLang(saved);
  }, []);

  function switchLang(l: Lang) {
    setLang(l);
    localStorage.setItem("tnc-lang", l);
  }

  const t = T[lang];
  const formSteps = t.contact.steps;
  const current = formSteps[step];
  const isLast  = step === formSteps.length - 1;
  const value   = values[step];

  const NAV_LINKS = [
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.process,  href: "#proceso" },
    { label: t.nav.about,    href: "#quienes-somos" },
  ];

  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }

  function handleChange(v: string) {
    const next = [...values]; next[step] = v; setValues(next);
    if (formStatus === "error") setFormStatus("idle");
  }

  function validate(): boolean {
    const v = value.trim();
    if (!v) { setErrorMsg(t.contact.error_required); setFormStatus("error"); return false; }
    if (step === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setErrorMsg(t.contact.error_email); setFormStatus("error"); return false;
    }
    return true;
  }

  function transition(fn: () => void) {
    setBlurring(true);
    setTimeout(() => { fn(); setBlurring(false); setFormStatus("idle"); setTimeout(() => inputRef.current?.focus(), 50); }, 180);
  }

  function handleNext() { if (!validate()) return; transition(() => setStep((s) => s + 1)); }
  function handleBack() { transition(() => setStep((s) => s - 1)); }

  async function handleSubmit() {
    if (!validate()) return;
    setFormStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values[0].trim(), email: values[1].trim().toLowerCase(), company: values[2].trim(), message: values[3].trim() }),
      });
      if (!res.ok) throw new Error();
      transition(() => setFormStatus("success"));
    } catch {
      setFormStatus("error");
      setErrorMsg(t.contact.error_submit);
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputStyle = {
    background: "rgba(0,0,0,0.5)",
    color: "var(--fg)",
    border: `1px solid ${formStatus === "error" ? "#ff4d4f" : "var(--border)"}`,
    caretColor: "var(--accent)",
    fontFamily: "var(--font-space-mono), monospace",
    fontSize: "0.8rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
    borderRadius: 0,
    outline: "none",
  };

  const LANGS: Lang[] = ["es", "en", "pt"];

  return (
    <div className="flex flex-col">

      <GsapAnimations />
      <ChatPanel lang={lang} />

      {/* ── SCROLL PROGRESS BAR ── */}
      <div id="gsap-progress" style={{ position: "fixed", top: 0, left: 0, height: 2, width: "100%", background: "var(--accent)", transformOrigin: "left center", transform: "scaleX(0)", zIndex: 9997 }} />

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(6,12,6,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
        <button onClick={() => scrollTo("#hero")} className="text-lg select-none" style={{ fontFamily: "var(--font-special-gothic)", color: "var(--fg)", letterSpacing: "0.03em" }}>
          The Nerd Company
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="font-mono text-xs uppercase tracking-widest transition-colors duration-200" style={{ color: "var(--fg-dim)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-dim)"; }}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center" style={{ border: "1px solid var(--border)" }}>
            {LANGS.map((l) => (
              <button key={l} onClick={() => switchLang(l)}
                className="font-mono text-xs uppercase"
                style={{
                  padding: "4px 8px",
                  color: lang === l ? "var(--bg)" : "var(--fg-muted)",
                  background: lang === l ? "var(--accent)" : "transparent",
                  transition: "background 0.15s, color 0.15s",
                  letterSpacing: "0.05em",
                }}>
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
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: "rgba(6,12,6,0.98)", backdropFilter: "blur(20px)" }}>
          {NAV_LINKS.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="font-display text-4xl" style={{ color: "var(--fg)" }}>
              {l.label}
            </button>
          ))}
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

      {/* ── HERO ── */}
      <section id="hero" className="min-h-[80vh] flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <div className="page-in w-full max-w-[1200px] mx-auto flex flex-col items-center text-center gap-8">
          <div id="hero-prompt" className="font-mono text-xs" style={{ color: "var(--fg-dim)" }}>
            <span style={{ color: "var(--accent)" }}>$</span> {t.hero.prompt.replace("$ ", "")}
          </div>
          <h1 id="hero-h1" className="font-display text-6xl sm:text-7xl md:text-8xl leading-none" style={{ color: "var(--fg)" }}>
            {t.hero.h1_1}<br />
            <span className="highlight-bar">{t.hero.h1_2}</span><span className="cursor" />
          </h1>
          <p id="hero-sub" className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace" }}>
            {t.hero.sub}
          </p>
          <div id="hero-btns" className="flex flex-col sm:flex-row gap-3 mt-2 justify-center">
            <button onClick={() => scrollTo("#contacto")} className="btn-primary">{t.hero.cta}</button>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-3" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div id="gsap-marquee-inner" className="flex whitespace-nowrap" style={{ willChange: "transform" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {t.marquee.map((w, j) => (
                <span key={`${copy}-${j}`} className="font-mono text-xs uppercase tracking-widest shrink-0"
                  style={{ color: w === "▸" ? "var(--accent)" : "var(--fg-dim)", padding: "0 20px" }}>
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── QUOTE ── */}
      <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-6 py-20 flex flex-col items-center gap-10 text-center">
          <div id="quote-text" className="flex flex-col items-center gap-4">
            <p className="gsap-label font-mono text-xs" style={{ color: "var(--fg-dim)" }}>{t.quote.label}</p>
            <blockquote className="font-display text-4xl sm:text-5xl leading-tight" style={{ color: "var(--fg)" }}>
              {t.quote.text}<br />
              <span className="highlight-bar">{t.quote.highlight}</span>
            </blockquote>
            <p className="text-xs" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}>
              {t.quote.sub}
            </p>
          </div>
          <div id="globe-wrap" className="w-72 h-72"><Globe /></div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicios" className="services-texture px-6 py-24">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12">
          <div>
            <p className="gsap-label font-mono text-xs mb-3" style={{ color: "rgba(168,255,60,0.4)" }}>{t.services.label}</p>
            <h2 className="gsap-heading glitch-title font-display text-5xl sm:text-6xl" style={{ color: "var(--accent)" }}>{t.services.heading}</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(168,255,60,0.15)" }}>
            {t.services.items.map((s) => (
              <div key={s.n} className="gsap-srv-row py-10 flex gap-6" style={{ borderBottom: "1px solid rgba(168,255,60,0.15)" }}>
                <span className="font-mono text-xs pt-1 shrink-0" style={{ color: "rgba(168,255,60,0.35)", minWidth: 24 }}>{s.n}</span>
                <div>
                  <div className="font-display text-4xl sm:text-5xl leading-none mb-3" style={{ color: "var(--fg)" }}>{s.verb}</div>
                  <h3 className="font-mono text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>{s.name}</h3>
                  <p style={{ color: "rgba(168,255,60,0.45)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button onClick={() => scrollTo("#contacto")} className="btn-primary">{t.services.cta}</button>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="proceso" className="px-6 py-24" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12">
          <div>
            <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>{t.process.label}</p>
            <h2 className="gsap-heading font-display text-5xl sm:text-6xl" style={{ color: "var(--fg)" }}>{t.process.heading}</h2>
          </div>
          <div className="flex flex-col" style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 11, top: 12, bottom: 12, width: 1, background: "var(--border)" }} />
            {t.process.items.map((p) => (
              <div key={p.n} className="gsap-proc-card flex gap-6 pb-10" style={{ position: "relative" }}>
                <div style={{ width: 23, height: 23, borderRadius: "50%", background: "var(--bg-alt)", border: "1px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />
                </div>
                <div className="flex flex-col gap-2 pt-0.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>{p.n}</span>
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider" style={{ color: "var(--fg)" }}>{p.name}</h3>
                  </div>
                  <p style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", lineHeight: 1.7, maxWidth: 520 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK + QUIÉNES SOMOS ── */}
      <section id="quienes-somos" className="px-6 py-24" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div id="stack" className="flex flex-col gap-8">
              <div>
                <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>{t.stack.label}</p>
                <h2 className="gsap-heading font-display text-4xl sm:text-5xl" style={{ color: "var(--fg)" }}>{t.stack.heading}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {STACK.map((s) => <span key={s} className="gsap-stack-tag tech-tag">{s}</span>)}
              </div>
              <p id="stack-desc" className="text-xs leading-relaxed" style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace" }}>
                {t.stack.desc}
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>{t.about.label}</p>
                <h2 className="gsap-heading font-display text-4xl sm:text-5xl leading-none" style={{ color: "var(--fg)" }}>
                  {t.about.heading1} <span className="highlight-bar">{t.about.heading2}</span>
                </h2>
              </div>
              <p id="quienes-body" className="text-xs leading-relaxed" style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace" }}>
                {t.about.body}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {FOUNDERS.map((f) => (
                  <div key={f.name} className="flex flex-col gap-1 p-4" style={{ border: "1px solid var(--border)", background: "rgba(0,0,0,0.3)" }}>
                    <span className="font-mono text-xs font-bold" style={{ color: "var(--fg)" }}>{f.name}</span>
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)", fontSize: "0.6rem" }}>{f.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contacto" className="px-6 py-24" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-10">
          {formStatus === "success" ? (
            <div className="page-in flex flex-col gap-4 py-12">
              <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>{t.contact.success_label}</span>
              <h2 className="font-display text-5xl" style={{ color: "var(--fg)" }}>{t.contact.success_heading}</h2>
              <p className="font-mono text-xs" style={{ color: "var(--fg-dim)" }}>{t.contact.success_sub}</p>
            </div>
          ) : (
            <>
              <div>
                <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>{t.contact.label}</p>
                <h2 id="contact-heading" className="font-display text-5xl sm:text-6xl leading-none" style={{ color: "var(--fg)" }}>
                  <span className="cursor">{t.contact.heading}</span>
                </h2>
              </div>
              <div id="contact-steps" className="flex gap-4 overflow-x-auto pb-1">
                {formSteps.map((s, i) => {
                  const isActive = i === step, isDone = i < step;
                  return (
                    <div key={s.id} className="flex flex-col items-center gap-1.5 shrink-0" style={{ minWidth: 60 }}>
                      <div className="w-7 h-7 flex items-center justify-center font-mono text-xs"
                        style={{ background: isActive || isDone ? "var(--accent)" : "transparent", color: isActive || isDone ? "var(--bg)" : "var(--fg-dim)", border: isActive || isDone ? "none" : "1px solid var(--border)", transition: "background 0.3s" }}>
                        {isDone ? "✓" : s.id}
                      </div>
                      <span className="font-mono text-center leading-tight" style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)", fontSize: "0.6rem", textTransform: "uppercase" }}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className={`flex flex-col gap-3 step-content${blurring ? " blurring" : ""}`}>
                <label className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--fg-dim)" }}>
                  <span style={{ color: "var(--accent)" }}>›</span> {current.label}
                </label>
                {current.type === "textarea" ? (
                  <textarea ref={(el) => { inputRef.current = el; }} value={value} onChange={(e) => handleChange(e.target.value)}
                    placeholder={current.placeholder} rows={5} disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 resize-none" style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(168,255,60,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(168,255,60,0.15)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
                ) : (
                  <input ref={(el) => { inputRef.current = el; }} type={current.type} value={value} onChange={(e) => handleChange(e.target.value)}
                    placeholder={current.placeholder} disabled={formStatus === "loading"}
                    onKeyDown={(e) => { if (e.key === "Enter") { isLast ? handleSubmit() : handleNext(); } }}
                    className="w-full px-4 py-3" style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(168,255,60,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(168,255,60,0.15)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
                )}
                {formStatus === "error" && <p className="font-mono text-xs" style={{ color: "#ff4d4f" }}>{errorMsg}</p>}
              </div>
              <div className={`flex items-center ${step === 0 ? "justify-end" : "justify-between"}`}>
                {step > 0 && <button onClick={handleBack} className="btn-ghost">{t.contact.back}</button>}
                <button onClick={isLast ? handleSubmit : handleNext} disabled={formStatus === "loading"} className="btn-primary disabled:opacity-50">
                  {formStatus === "loading" ? t.contact.sending : isLast ? t.contact.send : t.contact.next}
                </button>
              </div>
              <p className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>{t.contact.fine_print}</p>
            </>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-10" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span style={{ fontFamily: "var(--font-special-gothic)", fontSize: "1rem", letterSpacing: "0.03em", color: "var(--fg)" }}>The Nerd Company</span>
            <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>{t.footer.location}</span>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <button onClick={copyEmail} className="font-mono text-xs transition-colors duration-200" style={{ color: copied ? "var(--accent)" : "var(--fg-dim)" }}
              onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = "var(--fg)"; }}
              onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = "var(--fg-dim)"; }}>
              {copied ? t.footer.copied : CONTACT_EMAIL}
            </button>
            <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>
              {t.footer.open} · © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
