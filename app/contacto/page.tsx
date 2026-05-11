"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const FORM_STEPS = [
  { id: 1, label: "Nombre",  placeholder: "Juan García",            type: "text"     as const },
  { id: 2, label: "Email",   placeholder: "juan@empresa.com",       type: "email"    as const },
  { id: 3, label: "Empresa", placeholder: "Acme Inc.",              type: "text"     as const },
  { id: 4, label: "Mensaje", placeholder: "¿Qué querés automatizar?", type: "textarea" as const },
];

const CONTACT_EMAIL = "hellothere@thenerdcompany.com";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [step, setStep]             = useState(0);
  const [values, setValues]         = useState(["", "", "", ""]);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg]     = useState("");
  const [blurring, setBlurring]     = useState(false);
  const inputRef                    = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const current = FORM_STEPS[step];
  const isLast  = step === FORM_STEPS.length - 1;
  const value   = values[step];

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <Link href="/" style={{ fontFamily: "var(--font-special-gothic)", color: "var(--fg)", fontSize: "1rem", letterSpacing: "0.03em" }}>
          The Nerd Company
        </Link>
        <Link href="/" className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--fg-dim)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fg)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-dim)"; }}>
          ← Volver
        </Link>
      </header>

      {/* Form */}
      <main className="flex-1 flex flex-col justify-center px-6 py-16">
        <div className="w-full max-w-[600px] mx-auto flex flex-col gap-10">

          {formStatus === "success" ? (
            <div className="page-in flex flex-col gap-4 py-12">
              <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>✓ transmisión recibida</span>
              <h2 className="font-display text-5xl" style={{ color: "var(--fg)" }}>MENSAJE ENVIADO.</h2>
              <p className="font-mono text-xs" style={{ color: "var(--fg-dim)" }}>Respondemos en menos de 24 horas.</p>
              <Link href="/" className="btn-ghost inline-block mt-4" style={{ width: "fit-content" }}>← Volver al inicio</Link>
            </div>
          ) : (
            <>
              <div>
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// iniciar proyecto</p>
                <h1 className="font-display text-5xl sm:text-6xl leading-none" style={{ color: "var(--fg)" }}>
                  ¿CÓMO PUEDE LA IA <span className="cursor">POTENCIAR TU PRODUCTO?</span>
                </h1>
              </div>

              {/* Steps */}
              <div className="flex gap-4 overflow-x-auto pb-1">
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
                › {CONTACT_EMAIL} · Respondemos en menos de 24 horas
              </p>
            </>
          )}
        </div>
      </main>

    </div>
  );
}
