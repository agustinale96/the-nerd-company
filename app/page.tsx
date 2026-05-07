"use client";

import { useState } from "react";

const STEPS = [
  { id: 1, label: "Nombre", placeholder: "Juan García", type: "text" as const },
  { id: 2, label: "Correo electrónico", placeholder: "juan@empresa.com", type: "email" as const },
  { id: 3, label: "Empresa", placeholder: "Acme Inc.", type: "text" as const },
  { id: 4, label: "Mensaje", placeholder: "Cuéntanos tu idea", type: "textarea" as const },
];

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(["", "", "", ""]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const value = values[step];

  function handleChange(v: string) {
    const next = [...values];
    next[step] = v;
    setValues(next);
    if (status === "error") setStatus("idle");
  }

  function validate(): boolean {
    const v = value.trim();
    if (!v) { setErrorMsg("Este campo es requerido."); setStatus("error"); return false; }
    if (step === 1) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        setErrorMsg("Ingresá un email válido."); setStatus("error"); return false;
      }
    }
    return true;
  }

  function handleNext() {
    if (!validate()) return;
    setStatus("idle");
    setStep((s) => s + 1);
  }

  async function handleSubmit() {
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values[0].trim(),
          email: values[1].trim().toLowerCase(),
          company: values[2].trim(),
          message: values[3].trim(),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Algo salió mal. Intentá de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md text-center flex flex-col items-center gap-6 fade-up">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{ background: "rgba(0,255,135,0.12)", border: "1px solid var(--accent)" }}
          >
            ✓
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Mensaje enviado</h2>
            <p style={{ color: "#888" }} className="text-sm">
              Nos pondremos en contacto a la brevedad.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md flex flex-col gap-10">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center leading-tight fade-up fade-up-delay-1">
          Cuéntanos sobre tu<br />proyecto o idea.
        </h1>

        {/* Step indicators */}
        <div className="fade-up fade-up-delay-2 flex items-start justify-center gap-3">
          {STEPS.map((s, i) => {
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1.5" style={{ minWidth: 56 }}>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: isActive ? "var(--accent)" : isDone ? "var(--accent)" : "var(--border)",
                    color: isActive || isDone ? "var(--bg)" : "#555",
                    border: isActive || isDone ? "none" : "1px solid var(--muted)",
                  }}
                >
                  {isDone ? "✓" : s.id}
                </div>
                <span
                  className="text-xs text-center leading-tight"
                  style={{ color: isActive ? "var(--accent)" : isDone ? "#666" : "#444" }}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input area */}
        <div className="fade-up fade-up-delay-2 flex flex-col gap-4">
          <label className="text-xs tracking-widest uppercase" style={{ color: "#666" }}>
            {current.label}
          </label>

          {current.type === "textarea" ? (
            <textarea
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={current.placeholder}
              rows={5}
              disabled={status === "loading"}
              className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none transition-all duration-200"
              style={{
                background: "var(--border)",
                color: "var(--fg)",
                border: `1px solid ${status === "error" ? "#ff4d4f" : "var(--muted)"}`,
                caretColor: "var(--accent)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0,255,135,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = status === "error" ? "#ff4d4f" : "var(--muted)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          ) : (
            <input
              type={current.type}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={current.placeholder}
              disabled={status === "loading"}
              onKeyDown={(e) => { if (e.key === "Enter") isLast ? handleSubmit() : handleNext(); }}
              className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200"
              style={{
                background: "var(--border)",
                color: "var(--fg)",
                border: `1px solid ${status === "error" ? "#ff4d4f" : "var(--muted)"}`,
                caretColor: "var(--accent)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0,255,135,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = status === "error" ? "#ff4d4f" : "var(--muted)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          )}

          {status === "error" && (
            <p className="text-xs" style={{ color: "#ff4d4f" }}>{errorMsg}</p>
          )}
        </div>

        {/* Navigation */}
        <div className="fade-up fade-up-delay-3 flex items-center justify-between">
          <button
            onClick={() => { setStep((s) => s - 1); setStatus("idle"); }}
            disabled={step === 0}
            className="px-6 py-3 text-sm font-semibold rounded-full transition-all duration-200 disabled:opacity-0"
            style={{ border: "1px solid var(--muted)", color: "#ccc" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#666"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--muted)"; }}
          >
            Atrás
          </button>

          <button
            onClick={isLast ? handleSubmit : handleNext}
            disabled={status === "loading"}
            className="px-8 py-3 text-sm font-bold rounded-full transition-all duration-200 disabled:opacity-60"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.opacity = "1";
            }}
          >
            {status === "loading" ? "Enviando..." : isLast ? "Enviar" : "Siguiente →"}
          </button>
        </div>

        {/* Email fallback */}
        <p className="text-center text-xs fade-up fade-up-delay-3" style={{ color: "#444" }}>
          o envíanos un correo a{" "}
          <a
            href="mailto:agustinale96@gmail.com"
            style={{ color: "#666" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#666"; }}
          >
            agustinale96@gmail.com
          </a>
        </p>

      </div>
    </main>
  );
}
