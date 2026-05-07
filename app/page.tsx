"use client";

import { useState, useRef } from "react";

/* ─── Data ──────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Servicios",    href: "#servicios" },
  { label: "Proceso",      href: "#proceso" },
  { label: "Stack",        href: "#stack" },
  { label: "Quiénes somos", href: "#quienes-somos" },
];

const SERVICES = [
  { n: "01", name: "Desarrollo de Software",   desc: "Construimos MVPs, apps y plataformas a medida que escalan. Código limpio, entregas iterativas, sin humo." },
  { n: "02", name: "Diseño de Producto",        desc: "UX/UI centrado en conversión y usabilidad. Prototipamos, testeamos y validamos antes de escribir una línea de código." },
  { n: "03", name: "Consultoría Tecnológica",   desc: "Ayudamos equipos a tomar mejores decisiones técnicas: arquitectura, stack, roadmap y estrategia de producto." },
];

const PROCESS = [
  { n: "01", name: "Estrategia",   desc: "Entendemos el problema, los objetivos y los usuarios. Sin esto, el mejor código no sirve de nada." },
  { n: "02", name: "Diseño",       desc: "Prototipamos y validamos la experiencia antes de construir. Fallamos rápido y barato." },
  { n: "03", name: "Desarrollo",   desc: "Construimos iterativamente. Cada sprint entrega valor real, no promesas." },
  { n: "04", name: "Escala",       desc: "Optimizamos performance, métricas y crecimiento. El producto mejora con los datos." },
];

const STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
  "Supabase", "Redis", "AWS", "Vercel", "Figma", "Tailwind CSS", "Docker",
];

const AVOID = [
  "Productos sobreingenierizados",
  "Procesos eternos con slides infinitos",
  "Interfaces que confunden al usuario",
  "Deuda técnica acumulada sin plan",
  "Promesas sin delivery",
];

const FORM_STEPS = [
  { id: 1, label: "Nombre",  placeholder: "Juan García",       type: "text"     as const },
  { id: 2, label: "Email",   placeholder: "juan@empresa.com",  type: "email"    as const },
  { id: 3, label: "Empresa", placeholder: "Acme Inc.",         type: "text"     as const },
  { id: 4, label: "Mensaje", placeholder: "Cuéntanos qué estás creando", type: "textarea" as const },
];

const CONTACT_EMAIL = "hellothere@thenerdcompany.com";

/* ─── Types ─────────────────────────────────────────────────── */
type FormStatus = "idle" | "loading" | "success" | "error";

/* ─── Page ──────────────────────────────────────────────────── */
export default function Home() {
  const [step, setStep]         = useState(0);
  const [values, setValues]     = useState(["", "", "", ""]);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [blurring, setBlurring] = useState(false);
  const [copied, setCopied]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef                = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const contactRef              = useRef<HTMLElement>(null);

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
      setErrorMsg("Ingresá un email válido."); setFormStatus("error"); return false;
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

  /* ── Shared input styles ── */
  const inputStyle = (isError: boolean) => ({
    background: "rgba(255,255,255,0.03)", color: "var(--fg)",
    border: `1px solid ${isError ? "#ff4d4f" : "rgba(255,255,255,0.07)"}`,
    caretColor: "var(--accent)", transition: "border-color 0.2s, box-shadow 0.2s",
  });
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,255,135,0.35)";
    e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(0,255,135,0.06)";
  };
  const onBlur = (isError: boolean) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = isError ? "#ff4d4f" : "rgba(255,255,255,0.07)";
    e.currentTarget.style.boxShadow   = "none";
  };

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <div className="flex flex-col">

      {/* ── HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(8,8,9,0.75)" }}
      >
        <button
          onClick={() => scrollTo("#hero")}
          className="text-lg select-none"
          style={{ fontFamily: "var(--font-special-gothic)", color: "var(--fg)", letterSpacing: "0.03em" }}
        >
          The Nerd Company
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm transition-colors duration-200"
              style={{ color: "#666" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#666"; }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={copyEmail}
          className="hidden md:block text-sm px-4 py-1.5 rounded-full transition-all duration-200"
          style={{ border: `1px solid ${copied ? "rgba(0,255,135,0.3)" : "rgba(255,255,255,0.1)"}`, color: copied ? "var(--accent)" : "#888" }}
          onMouseEnter={(e) => { if (!copied) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ccc"; } }}
          onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#888"; } }}
        >
          {copied ? "copiado ✓" : "contáctanos"}
        </button>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-sm" style={{ color: "#888" }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden" style={{ background: "rgba(8,8,9,0.97)", backdropFilter: "blur(20px)" }}>
          {NAV_LINKS.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-2xl font-semibold" style={{ color: "var(--fg)" }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { copyEmail(); setMenuOpen(false); }} className="text-sm mt-4" style={{ color: "var(--accent)" }}>
            {copied ? "copiado ✓" : "contáctanos"}
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" className="dot-grid relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <div className="page-in w-full max-w-[800px] flex flex-col items-center gap-8">

          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{ border: "1px solid rgba(0,255,135,0.25)", color: "var(--accent)", letterSpacing: "0.1em" }}
          >
            ● Disponibles para nuevos proyectos
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
            <span className="cursor">Diseñamos y desarrollamos<br />productos digitales.</span>
          </h1>

          <p className="text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: "#888" }}>
            Para equipos y fundadores obsesionados con construir cosas que funcionen.
            MVPs, apps, plataformas internas y experiencias web.
          </p>

          <p className="text-sm max-w-md italic" style={{ color: "#444" }}>
            "No somos una software factory. Trabajamos con pocos proyectos a la vez para construir mejor."
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => scrollTo("#contacto")}
              className="btn-glow px-8 py-3 text-sm font-semibold rounded-full"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              Construyamos algo →
            </button>
            <button
              onClick={() => scrollTo("#servicios")}
              className="px-8 py-3 text-sm rounded-full transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#888" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ccc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#888"; }}
            >
              Ver servicios
            </button>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "#333" }}>
          <span className="text-xs tracking-widest uppercase">scroll</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)" }} />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicios" className="px-6 py-24" style={{ background: "var(--bg-alt)", borderTop: "1px solid rgba(0,255,135,0.06)" }}>
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-12">

          <div data-reveal>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Servicios</p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight" style={{ letterSpacing: "-0.02em" }}>Lo que hacemos</h2>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {SERVICES.map((s, i) => (
              <div key={s.n} data-reveal data-delay={i * 80} className="flex gap-6 py-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-xs pt-1.5 shrink-0 font-mono" style={{ color: "var(--accent)", opacity: 0.6 }}>{s.n}</span>
                <div>
                  <h3 className="text-base font-semibold mb-2">{s.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="proceso" className="px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-12">

          <div data-reveal>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Proceso</p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight" style={{ letterSpacing: "-0.02em" }}>Cómo trabajamos</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROCESS.map((p, i) => (
              <div
                key={p.n}
                data-reveal
                data-delay={i * 80}
                className="flex flex-col gap-3 p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span className="text-xs font-mono" style={{ color: "var(--accent)", opacity: 0.7 }}>{p.n}</span>
                <h3 className="text-base font-semibold">{p.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── STACK ── */}
      <section id="stack" className="px-6 py-24" style={{ background: "var(--bg-alt)", borderTop: "1px solid rgba(0,255,135,0.06)" }}>
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-10">

          <div data-reveal>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Tecnologías</p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight" style={{ letterSpacing: "-0.02em" }}>Nuestro stack</h2>
          </div>

          <div data-reveal data-delay="100" className="flex flex-wrap gap-2">
            {STACK.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>

          <p data-reveal data-delay="200" className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)", maxWidth: 480 }}>
            Elegimos herramientas probadas que permiten moverse rápido sin sacrificar estabilidad.
            Nada de hype tecnológico sin propósito.
          </p>

        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section id="quienes-somos" className="px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-14">

          <div className="flex flex-col gap-6">
            <div data-reveal>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Quiénes somos</p>
              <h2 className="text-3xl sm:text-4xl font-semibold leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Preferimos lanzar rápido<br />y mejorar iterando.
              </h2>
            </div>
            <p data-reveal data-delay="100" className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)", maxWidth: 480 }}>
              Somos un equipo técnico pequeño y enfocado. Trabajamos con pocos proyectos en paralelo
              para poder pensar bien cada uno. No vendemos horas, construimos productos.
            </p>
          </div>

          <div data-reveal data-delay="150" className="flex flex-col gap-4">
            <p className="text-xs tracking-widest uppercase" style={{ color: "#444" }}>Lo que evitamos</p>
            <div className="flex flex-col gap-3">
              {AVOID.map((a, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-muted)" }}>
                  <span style={{ color: "#ff4d4f", fontSize: 10 }}>✕</span>
                  {a}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contacto" ref={contactRef} className="px-6 py-24" style={{ background: "var(--bg-alt)", borderTop: "1px solid rgba(0,255,135,0.06)" }}>
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-10">

          {formStatus === "success" ? (
            <div className="page-in text-center flex flex-col items-center gap-6 py-16">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.3)" }}>
                <span style={{ color: "var(--accent)", fontSize: 20 }}>✓</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Mensaje enviado</h2>
                <p className="text-sm" style={{ color: "var(--fg-muted)" }}>Nos pondremos en contacto en menos de 24 horas.</p>
              </div>
            </div>
          ) : (
            <>
              <div data-reveal>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Contacto</p>
                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  <span className="cursor">Cuéntanos qué<br />estás creando.</span>
                </h2>
              </div>

              {/* Steps */}
              <div data-reveal data-delay="80" className="flex items-start justify-start gap-4">
                {FORM_STEPS.map((s, i) => {
                  const isActive = i === step, isDone = i < step;
                  return (
                    <div key={s.id} className="flex flex-col items-center gap-2" style={{ minWidth: 52 }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                        style={{ background: isActive || isDone ? "var(--accent)" : "transparent", color: isActive || isDone ? "var(--bg)" : "#444", border: isActive || isDone ? "none" : "1px solid #2a2a2a", transition: "background 0.3s, color 0.3s" }}>
                        {isDone ? "✓" : s.id}
                      </div>
                      <span className="text-xs text-center leading-tight" style={{ color: isActive ? "var(--accent)" : isDone ? "#555" : "#333", transition: "color 0.3s" }}>{s.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div className={`flex flex-col gap-3 step-content${blurring ? " blurring" : ""}`}>
                <label className="text-xs tracking-widest uppercase" style={{ color: "#555" }}>{current.label}</label>
                {current.type === "textarea" ? (
                  <textarea
                    ref={(el) => { inputRef.current = el; }}
                    value={value} onChange={(e) => handleChange(e.target.value)}
                    placeholder={current.placeholder} rows={5} disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none"
                    style={inputStyle(formStatus === "error")}
                    onFocus={onFocus} onBlur={onBlur(formStatus === "error")}
                  />
                ) : (
                  <input
                    ref={(el) => { inputRef.current = el; }}
                    type={current.type} value={value} onChange={(e) => handleChange(e.target.value)}
                    placeholder={current.placeholder} disabled={formStatus === "loading"}
                    onKeyDown={(e) => { if (e.key === "Enter") { isLast ? handleSubmit() : handleNext(); } }}
                    className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                    style={inputStyle(formStatus === "error")}
                    onFocus={onFocus} onBlur={onBlur(formStatus === "error")}
                  />
                )}
                {formStatus === "error" && <p className="text-xs" style={{ color: "#ff4d4f" }}>{errorMsg}</p>}
              </div>

              {/* Nav */}
              <div className={`flex items-center ${step === 0 ? "justify-end" : "justify-between"}`}>
                {step > 0 && (
                  <button onClick={handleBack} className="px-6 py-2.5 text-sm rounded-full"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#888", transition: "border-color 0.2s, color 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ccc"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#888"; }}>
                    Atrás
                  </button>
                )}
                <button onClick={isLast ? handleSubmit : handleNext} disabled={formStatus === "loading"}
                  className="btn-glow px-8 py-2.5 text-sm font-semibold rounded-full disabled:opacity-50"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}>
                  {formStatus === "loading" ? "Enviando..." : isLast ? "Enviar" : "Siguiente →"}
                </button>
              </div>

              {/* Microcopy */}
              <p className="text-xs text-center" style={{ color: "#333" }}>
                Respondemos en menos de 24 horas · Sin spam · Sin presiones
              </p>
            </>
          )}

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-12" style={{ background: "var(--bg-alt)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span style={{ fontFamily: "var(--font-special-gothic)", fontSize: "1rem", letterSpacing: "0.03em" }}>The Nerd Company</span>
            <span className="text-xs" style={{ color: "#444" }}>Buenos Aires — Remote Worldwide</span>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <button onClick={copyEmail} className="text-sm transition-colors duration-200" style={{ color: copied ? "var(--accent)" : "#555" }}
              onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = "#555"; }}>
              {copied ? "copiado ✓" : CONTACT_EMAIL}
            </button>
            <span className="text-xs" style={{ color: "#333" }}>
              Open for selected projects · © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
