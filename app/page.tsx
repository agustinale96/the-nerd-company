"use client";

import { useState, useRef } from "react";
import GsapAnimations from "./components/GsapAnimations";

/* ─── Data ──────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Servicios",     href: "#servicios" },
  { label: "Proyectos",     href: "#proyectos" },
  { label: "Proceso",       href: "#proceso" },
  { label: "Quiénes somos", href: "#quienes-somos" },
];

const SERVICES = [
  {
    n: "01",
    name: "Automatización de Procesos",
    desc: "Identificamos procesos repetitivos y los automatizamos. Menos errores humanos, más tiempo para lo que realmente importa. Integraciones, workflows, notificaciones y pipelines.",
  },
  {
    n: "02",
    name: "Desarrollo de Productos Digitales",
    desc: "MVPs, apps y plataformas que se integran con tus workflows existentes desde el día uno. Sin deuda técnica innecesaria.",
  },
  {
    n: "03",
    name: "Consultoría e Integración",
    desc: "Conectamos tus herramientas y sistemas para que trabajen juntos sin fricción. Slack, HubSpot, Notion, ERPs, APIs propias — lo que necesites.",
  },
];

const PROJECTS = [
  {
    tag:  "Automatización",
    name: "AutoOps",
    desc: "Plataforma de automatización de operaciones para e-commerce. Redujo tiempo manual de seguimiento de órdenes un 80%.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Zapier API"],
    year: "2024",
  },
  {
    tag:  "Integración",
    name: "FlowSync",
    desc: "Sistema de notificaciones y workflows automáticos integrando Slack, HubSpot y Notion para equipo de ventas de SaaS B2B.",
    stack: ["TypeScript", "Redis", "Webhooks", "Slack API"],
    year: "2024",
  },
  {
    tag:  "Dashboard",
    name: "CommandCenter",
    desc: "Dashboard interno de métricas y alertas en tiempo real para equipo de operaciones. Reemplazó 4 hojas de cálculo manuales.",
    stack: ["React", "Supabase", "Vercel", "Recharts"],
    year: "2023",
  },
];

const PROCESS = [
  { n: "01", name: "Diagnóstico",  desc: "Mapeamos tus procesos actuales, identificamos los cuellos de botella y los puntos de automatización con mayor impacto." },
  { n: "02", name: "Diseño",       desc: "Diseñamos la solución antes de escribir código. Prototipo, validación y aprobación antes de avanzar." },
  { n: "03", name: "Construcción", desc: "Desarrollo iterativo con entregas semanales. Cada sprint agrega valor real, no promesas." },
  { n: "04", name: "Escala",       desc: "Monitoreamos, optimizamos y expandimos. Los sistemas mejoran con el tiempo y los datos." },
];

const STACK = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Redis", "AWS", "Vercel", "Figma", "Docker", "n8n", "Make", "Zapier"];

const AVOID = [
  "Automatizaciones frágiles sin monitoreo",
  "Integraciones ad-hoc sin documentación",
  "Productos sobreingenierizados",
  "Procesos eternos con slides infinitos",
  "Deuda técnica acumulada sin plan",
];

const FORM_STEPS = [
  { id: 1, label: "Nombre",  placeholder: "Juan García",       type: "text"     as const },
  { id: 2, label: "Email",   placeholder: "juan@empresa.com",  type: "email"    as const },
  { id: 3, label: "Empresa", placeholder: "Acme Inc.",         type: "text"     as const },
  { id: 4, label: "Mensaje", placeholder: "¿Qué querés automatizar?", type: "textarea" as const },
];

const CONTACT_EMAIL = "hellothere@thenerdcompany.com";

const MARQUEE_WORDS = ["AUTOMATIZAMOS", "▸", "CONSTRUIMOS", "▸", "OPTIMIZAMOS", "▸", "ESCALAMOS", "▸", "INTEGRAMOS", "▸", "DESPLEGAMOS", "▸"];

type FormStatus = "idle" | "loading" | "success" | "error";

/* ─── Inline SVG: Wireframe Globe ─── */
function Globe() {
  return (
    <svg viewBox="0 0 400 400" fill="none" className="w-full h-full opacity-60" style={{ color: "var(--fg-dim)" }}>
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

/* ─── Terminal Window ─── */
function TerminalWindow() {
  return (
    <div className="term-box w-full">
      <div className="flex flex-col gap-1.5" style={{ color: "var(--fg-dim)", fontSize: "0.76rem", lineHeight: 1.7 }}>
        <span className="gsap-terminal-line"><span style={{ color: "var(--accent)" }}>$</span> analyze --processes all</span>
        <span className="gsap-terminal-line" style={{ color: "var(--fg-muted)" }}>› Scanning 47 manual processes...</span>
        <span className="gsap-terminal-line"><span style={{ color: "var(--accent)" }}>✓</span> Found 12 automation candidates</span>
        <span className="gsap-terminal-line" style={{ color: "var(--fg-muted)" }}>› Estimating time savings...</span>
        <span className="gsap-terminal-line"><span style={{ color: "var(--accent)" }}>✓</span> Projected: <span style={{ color: "var(--fg)" }}>340 hrs/month</span> recovered</span>
        <span className="gsap-terminal-line"><span style={{ color: "var(--accent)" }}>$</span> deploy --env production<span className="cursor" /></span>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Home() {
  const [step, setStep]             = useState(0);
  const [values, setValues]         = useState(["", "", "", ""]);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg]     = useState("");
  const [blurring, setBlurring]     = useState(false);
  const [copied, setCopied]         = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const inputRef                    = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const current = FORM_STEPS[step];
  const isLast  = step === FORM_STEPS.length - 1;
  const value   = values[step];

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
    if (!v) { setErrorMsg("Este campo es requerido."); setFormStatus("error"); return false; }
    if (step === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setErrorMsg("Email inválido."); setFormStatus("error"); return false;
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
      setErrorMsg("Algo salió mal. Intentá de nuevo.");
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

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <div className="flex flex-col">

      <GsapAnimations />

      {/* ── SCROLL PROGRESS BAR ── */}
      <div
        id="gsap-progress"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 2,
          width: "100%",
          background: "var(--accent)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          zIndex: 9997,
        }}
      />

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
        <button onClick={copyEmail} className="hidden md:block btn-ghost text-xs" style={{ padding: "6px 16px" }}>
          {copied ? "copiado ✓" : "> contacto"}
        </button>
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
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16">
        <div className="page-in w-full max-w-[1200px] mx-auto flex flex-col gap-8">

          <div id="hero-prompt" className="font-mono text-xs" style={{ color: "var(--fg-dim)" }}>
            <span style={{ color: "var(--accent)" }}>$</span> whoami — The Nerd Company v1.0
          </div>

          <h1 id="hero-h1" className="font-display text-6xl sm:text-7xl md:text-8xl leading-none" style={{ color: "var(--fg)" }}>
            AUTOMATIZAMOS <span className="highlight-bar">TUS PROCESOS.</span><span className="cursor" />
          </h1>

          <p id="hero-sub" className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace" }}>
            Diseñamos y desarrollamos sistemas que trabajan solos. Para equipos y fundadores obsesionados con hacer más con menos.
          </p>

          <div id="hero-btns" className="flex flex-col sm:flex-row gap-3 mt-2">
            <button onClick={() => scrollTo("#contacto")} className="btn-primary">
              Empecemos →
            </button>
            <button onClick={() => scrollTo("#servicios")} className="btn-ghost">
              Ver servicios
            </button>
          </div>

          <div id="hero-terminal" className="mt-8 max-w-lg">
            <TerminalWindow />
          </div>

        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-3" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div id="gsap-marquee-inner" className="flex whitespace-nowrap" style={{ willChange: "transform" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {MARQUEE_WORDS.map((w, j) => (
                <span
                  key={`${copy}-${j}`}
                  className="font-mono text-xs uppercase tracking-widest shrink-0"
                  style={{
                    color: w === "▸" ? "var(--accent)" : "var(--fg-dim)",
                    padding: "0 20px",
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── QUOTE: phrase + globe ── */}
      <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div id="quote-text" className="flex flex-col gap-4">
            <p className="gsap-label font-mono text-xs" style={{ color: "var(--fg-dim)" }}>// insight</p>
            <blockquote className="font-display text-4xl sm:text-5xl leading-tight" style={{ color: "var(--fg)" }}>
              "Los mejores sistemas trabajan <span className="highlight-bar">mientras dormís."</span>
            </blockquote>
            <p className="text-xs" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}>
              Un proceso manual es deuda técnica disfrazada.
            </p>
          </div>
          <div id="globe-wrap" className="w-full aspect-square max-w-xs mx-auto">
            <Globe />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicios" className="px-6 py-24">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12">
          <div>
            <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// servicios</p>
            <h2 className="gsap-heading font-display text-5xl sm:text-6xl" style={{ color: "var(--fg)" }}>LO QUE HACEMOS</h2>
          </div>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {SERVICES.map((s) => (
              <div key={s.n} className="gsap-srv-row flex gap-6 py-8" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="font-mono text-xs pt-1 shrink-0" style={{ color: "var(--accent)", minWidth: 24 }}>{s.n}</span>
                <div>
                  <h3 className="font-mono text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--fg)" }}>{s.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button onClick={() => scrollTo("#contacto")} className="btn-primary">Hablemos de tu proceso →</button>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="proyectos" className="px-6 py-24">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12">
          <div>
            <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// proyectos anteriores</p>
            <h2 className="gsap-heading font-display text-5xl sm:text-6xl" style={{ color: "var(--fg)" }}>PRODUCTOS QUE CONSTRUIMOS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTS.map((p) => (
              <div key={p.name}
                className="gsap-proj-card flex flex-col gap-4 p-6"
                style={{ border: "1px solid var(--border)", background: "rgba(0,0,0,0.3)" }}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase" style={{ color: "var(--accent)", fontSize: "0.65rem" }}>{p.tag}</span>
                  <span className="font-mono text-xs" style={{ color: "var(--fg-muted)", fontSize: "0.65rem" }}>{p.year}</span>
                </div>
                <h3 className="font-display text-3xl" style={{ color: "var(--fg)" }}>{p.name}</h3>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1 mt-auto pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                  {p.stack.map((t) => (
                    <span key={t} className="font-mono" style={{ fontSize: "0.6rem", color: "var(--fg-muted)", padding: "2px 6px", border: "1px solid var(--border)" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="proceso" className="px-6 py-24" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12">
          <div>
            <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// cómo trabajamos</p>
            <h2 className="gsap-heading font-display text-5xl sm:text-6xl" style={{ color: "var(--fg)" }}>PROCESO</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROCESS.map((p) => (
              <div key={p.n} className="gsap-proc-card flex flex-col gap-3 p-6"
                style={{ border: "1px solid var(--border)", background: "rgba(0,0,0,0.3)" }}>
                <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>{p.n}</span>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider" style={{ color: "var(--fg)" }}>{p.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section id="stack" className="px-6 py-24" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-10">
          <div>
            <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// tecnologías</p>
            <h2 className="gsap-heading font-display text-5xl sm:text-6xl" style={{ color: "var(--fg)" }}>NUESTRO STACK</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {STACK.map((t) => <span key={t} className="gsap-stack-tag tech-tag">{t}</span>)}
          </div>
          <p id="stack-desc" className="text-xs leading-relaxed" style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace", maxWidth: 480 }}>
            Herramientas probadas que permiten moverse rápido sin sacrificar estabilidad. Nada de hype tecnológico sin propósito.
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section id="quienes-somos" className="px-6 py-24" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12">
          <div>
            <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// quiénes somos</p>
            <h2 className="gsap-heading font-display text-5xl sm:text-6xl leading-none" style={{ color: "var(--fg)" }}>
              NO SOMOS UNA <span className="highlight-bar">SOFTWARE FACTORY.</span>
            </h2>
          </div>
          <p id="quienes-body" className="text-xs leading-relaxed" style={{ color: "var(--fg-dim)", fontFamily: "var(--font-space-mono), monospace", maxWidth: 520 }}>
            Somos un equipo técnico pequeño y enfocado. Trabajamos con pocos proyectos en paralelo para poder pensar bien cada uno. No vendemos horas — construimos sistemas que funcionan.
          </p>
          <div className="flex flex-col gap-3">
            <p className="gsap-label font-mono text-xs uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>// lo que evitamos</p>
            {AVOID.map((a, i) => (
              <div key={i} className="gsap-avoid-item flex items-center gap-3 font-mono text-xs" style={{ color: "var(--fg-dim)" }}>
                <span style={{ color: "#ff4d4f" }}>✕</span> {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contacto" className="px-6 py-24" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-10">
          {formStatus === "success" ? (
            <div className="page-in flex flex-col gap-4 py-12">
              <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>✓ transmisión recibida</span>
              <h2 className="font-display text-5xl" style={{ color: "var(--fg)" }}>MENSAJE ENVIADO.</h2>
              <p className="font-mono text-xs" style={{ color: "var(--fg-dim)" }}>Respondemos en menos de 24 horas.</p>
            </div>
          ) : (
            <>
              <div>
                <p className="gsap-label font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// iniciar proyecto</p>
                <h2 id="contact-heading" className="font-display text-5xl sm:text-6xl leading-none" style={{ color: "var(--fg)" }}>
                  ¿QUÉ QUERÉS <span className="cursor">AUTOMATIZAR?</span>
                </h2>
              </div>

              {/* Steps */}
              <div id="contact-steps" className="flex gap-4 overflow-x-auto pb-1">
                {FORM_STEPS.map((s, i) => {
                  const isActive = i === step, isDone = i < step;
                  return (
                    <div key={s.id} className="flex flex-col items-center gap-1.5 shrink-0" style={{ minWidth: 60 }}>
                      <div className="w-7 h-7 flex items-center justify-center font-mono text-xs"
                        style={{ background: isActive ? "var(--accent)" : isDone ? "var(--accent)" : "transparent", color: isActive || isDone ? "var(--bg)" : "var(--fg-dim)", border: isActive || isDone ? "none" : "1px solid var(--border)", transition: "background 0.3s" }}>
                        {isDone ? "✓" : s.id}
                      </div>
                      <span className="font-mono text-center leading-tight" style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)", fontSize: "0.6rem", textTransform: "uppercase" }}>{s.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div className={`flex flex-col gap-3 step-content${blurring ? " blurring" : ""}`}>
                <label className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--fg-dim)" }}>
                  <span style={{ color: "var(--accent)" }}>›</span> {current.label}
                </label>
                {current.type === "textarea" ? (
                  <textarea ref={(el) => { inputRef.current = el; }} value={value} onChange={(e) => handleChange(e.target.value)}
                    placeholder={current.placeholder} rows={5} disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 resize-none"
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(168,255,60,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(168,255,60,0.15)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                ) : (
                  <input ref={(el) => { inputRef.current = el; }} type={current.type} value={value} onChange={(e) => handleChange(e.target.value)}
                    placeholder={current.placeholder} disabled={formStatus === "loading"}
                    onKeyDown={(e) => { if (e.key === "Enter") { isLast ? handleSubmit() : handleNext(); } }}
                    className="w-full px-4 py-3"
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(168,255,60,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(168,255,60,0.15)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                )}
                {formStatus === "error" && <p className="font-mono text-xs" style={{ color: "#ff4d4f" }}>{errorMsg}</p>}
              </div>

              {/* Nav */}
              <div className={`flex items-center ${step === 0 ? "justify-end" : "justify-between"}`}>
                {step > 0 && <button onClick={handleBack} className="btn-ghost">← Atrás</button>}
                <button onClick={isLast ? handleSubmit : handleNext} disabled={formStatus === "loading"} className="btn-primary disabled:opacity-50">
                  {formStatus === "loading" ? "Enviando..." : isLast ? "Enviar →" : "Siguiente →"}
                </button>
              </div>

              <p className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>
                › Respondemos en menos de 24 horas · Sin spam · Sin presiones
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-10" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span style={{ fontFamily: "var(--font-special-gothic)", fontSize: "1rem", letterSpacing: "0.03em", color: "var(--fg)" }}>The Nerd Company</span>
            <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>Buenos Aires — Remote Worldwide</span>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <button onClick={copyEmail} className="font-mono text-xs transition-colors duration-200" style={{ color: copied ? "var(--accent)" : "var(--fg-dim)" }}
              onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = "var(--fg)"; }}
              onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = "var(--fg-dim)"; }}>
              {copied ? "✓ copiado" : CONTACT_EMAIL}
            </button>
            <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>
              Open for selected projects · © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
