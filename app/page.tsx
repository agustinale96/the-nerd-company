"use client";

import { useState, useRef } from "react";

const STEPS = [
  { id: 1, label: "Nombre",  placeholder: "Juan García",       type: "text"     as const },
  { id: 2, label: "Email",   placeholder: "juan@empresa.com",  type: "email"    as const },
  { id: 3, label: "Empresa", placeholder: "Acme Inc.",         type: "text"     as const },
  { id: 4, label: "Mensaje", placeholder: "Cuéntanos tu idea", type: "textarea" as const },
];

const SERVICES = [
  {
    number: "01",
    name:   "Desarrollo de Software",
    desc:   "Construimos productos digitales a medida, desde MVPs hasta sistemas escalables.",
  },
  {
    number: "02",
    name:   "Consultoría Tech",
    desc:   "Ayudamos a equipos y empresas a tomar mejores decisiones tecnológicas.",
  },
  {
    number: "03",
    name:   "Diseño de Producto",
    desc:   "Diseño de experiencias digitales centradas en el usuario y la conversión.",
  },
];

const CONTACT_EMAIL = "agustin@thenerdcompany.com";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [step, setStep]         = useState(0);
  const [values, setValues]     = useState(["", "", "", ""]);
  const [status, setStatus]     = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [blurring, setBlurring] = useState(false);
  const [copied, setCopied]     = useState(false);
  const inputRef                = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const formRef                 = useRef<HTMLDivElement>(null);

  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;
  const value   = values[step];

  function handleChange(v: string) {
    const next = [...values];
    next[step] = v;
    setValues(next);
    if (status === "error") setStatus("idle");
  }

  function validate(): boolean {
    const v = value.trim();
    if (!v) { setErrorMsg("Este campo es requerido."); setStatus("error"); return false; }
    if (step === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setErrorMsg("Ingresá un email válido."); setStatus("error"); return false;
    }
    return true;
  }

  function transition(fn: () => void) {
    setBlurring(true);
    setTimeout(() => {
      fn();
      setBlurring(false);
      setStatus("idle");
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 180);
  }

  function handleNext()  { if (!validate()) return; transition(() => setStep((s) => s + 1)); }
  function handleBack()  { transition(() => setStep((s) => s - 1)); }

  async function handleSubmit() {
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    values[0].trim(),
          email:   values[1].trim().toLowerCase(),
          company: values[2].trim(),
          message: values[3].trim(),
        }),
      });
      if (!res.ok) throw new Error();
      transition(() => setStatus("success"));
    } catch {
      setStatus("error");
      setErrorMsg("Algo salió mal. Intentá de nuevo.");
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4"
        style={{ backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span
          className="text-xl select-none"
          style={{ fontFamily: "var(--font-special-gothic)", color: "var(--fg)", letterSpacing: "0.03em" }}
        >
          The Nerd Company
        </span>

        <button
          onClick={copyEmail}
          className="text-sm px-4 py-1.5 rounded-full transition-all duration-200"
          style={{
            border:      `1px solid ${copied ? "rgba(0,255,135,0.3)" : "rgba(255,255,255,0.1)"}`,
            color:       copied ? "var(--accent)" : "#888",
          }}
          onMouseEnter={(e) => {
            if (!copied) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ccc"; }
          }}
          onMouseLeave={(e) => {
            if (!copied) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#888"; }
          }}
        >
          {copied ? "copiado ✓" : "contáctanos"}
        </button>
      </header>

      {/* Form section */}
      <section ref={formRef} className="min-h-screen flex items-center justify-center px-6 pt-20">
        {status === "success" ? (
          <div className="page-in text-center flex flex-col items-center gap-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.3)" }}
            >
              <span style={{ color: "var(--accent)", fontSize: 20 }}>✓</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Mensaje enviado</h2>
              <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                Nos pondremos en contacto a la brevedad.
              </p>
            </div>
          </div>
        ) : (
          <div className="page-in w-full max-w-md flex flex-col gap-10">

            <h1 className="text-3xl sm:text-[2.4rem] font-semibold text-center leading-tight tracking-tight fade-up fade-up-delay-1">
              <span className="cursor">Cuéntanos sobre tu<br />proyecto o idea.</span>
            </h1>

            {/* Step indicators */}
            <div className="fade-up fade-up-delay-2 flex items-start justify-center gap-4">
              {STEPS.map((s, i) => {
                const isActive = i === step;
                const isDone   = i < step;
                return (
                  <div key={s.id} className="flex flex-col items-center gap-2" style={{ minWidth: 52 }}>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                      style={{
                        background: isActive || isDone ? "var(--accent)" : "transparent",
                        color:      isActive || isDone ? "var(--bg)"     : "#444",
                        border:     isActive || isDone ? "none"          : "1px solid #2a2a2a",
                        transition: "background 0.3s, color 0.3s",
                      }}
                    >
                      {isDone ? "✓" : s.id}
                    </div>
                    <span
                      className="text-xs text-center leading-tight"
                      style={{ color: isActive ? "var(--accent)" : isDone ? "#555" : "#383838", transition: "color 0.3s" }}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className={`fade-up fade-up-delay-2 flex flex-col gap-3 step-content${blurring ? " blurring" : ""}`}>
              <label className="text-xs tracking-widest uppercase" style={{ color: "#555" }}>
                {current.label}
              </label>

              {current.type === "textarea" ? (
                <textarea
                  ref={(el) => { inputRef.current = el; }}
                  value={value}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={current.placeholder}
                  rows={5}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none"
                  style={{
                    background: "rgba(255,255,255,0.03)", color: "var(--fg)",
                    border: `1px solid ${status === "error" ? "#ff4d4f" : "rgba(255,255,255,0.07)"}`,
                    caretColor: "var(--accent)", transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,255,135,0.35)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,255,135,0.06)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = status === "error" ? "#ff4d4f" : "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              ) : (
                <input
                  ref={(el) => { inputRef.current = el; }}
                  type={current.type}
                  value={value}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={current.placeholder}
                  disabled={status === "loading"}
                  onKeyDown={(e) => { if (e.key === "Enter") { isLast ? handleSubmit() : handleNext(); } }}
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                  style={{
                    background: "rgba(255,255,255,0.03)", color: "var(--fg)",
                    border: `1px solid ${status === "error" ? "#ff4d4f" : "rgba(255,255,255,0.07)"}`,
                    caretColor: "var(--accent)", transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,255,135,0.35)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,255,135,0.06)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = status === "error" ? "#ff4d4f" : "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              )}

              {status === "error" && (
                <p className="text-xs" style={{ color: "#ff4d4f" }}>{errorMsg}</p>
              )}
            </div>

            {/* Navigation */}
            <div className={`fade-up fade-up-delay-3 flex items-center ${step === 0 ? "justify-end" : "justify-between"}`}>
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-2.5 text-sm rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#888", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ccc"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#888"; }}
                >
                  Atrás
                </button>
              )}
              <button
                onClick={isLast ? handleSubmit : handleNext}
                disabled={status === "loading"}
                className="px-8 py-2.5 text-sm font-semibold rounded-full disabled:opacity-50"
                style={{ background: "var(--accent)", color: "var(--bg)", transition: "opacity 0.2s, transform 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {status === "loading" ? "Enviando..." : isLast ? "Enviar" : "Siguiente →"}
              </button>
            </div>

          </div>
        )}
      </section>

      {/* Services section */}
      <section className="px-6 py-24 flex flex-col items-center gap-16" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="w-full max-w-2xl flex flex-col gap-12">

          <h2
            className="text-3xl sm:text-4xl font-semibold text-center leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Lo que hacemos
          </h2>

          <div className="flex flex-col gap-px" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {SERVICES.map((s) => (
              <div
                key={s.number}
                className="flex gap-6 py-8 group"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span
                  className="text-xs pt-1 shrink-0 font-mono"
                  style={{ color: "var(--accent)", opacity: 0.7, minWidth: 24 }}
                >
                  {s.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-lg font-semibold transition-colors duration-200"
                    style={{ color: "var(--fg)" }}
                  >
                    {s.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={scrollToForm}
              className="px-10 py-3 text-sm font-semibold rounded-full transition-all duration-200"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Hablemos de tu proyecto →
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p className="text-xs" style={{ color: "#333" }}>
          © {new Date().getFullYear()} The Nerd Company
        </p>
      </footer>

    </div>
  );
}
