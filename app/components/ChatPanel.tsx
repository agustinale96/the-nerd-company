"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface Msg {
  role: "assistant" | "user";
  text: string;
  streaming?: boolean;
}

type Lang = "es" | "en" | "pt";

const INTRO: Record<Lang, string> = {
  es: "contanos sobre tu producto, ¿qué estás buscando potenciar?",
  en: "tell us about your product, what are you looking to enhance?",
  pt: "conte-nos sobre seu produto, o que você quer potencializar?",
};

const OPTIONS: Record<Lang, string[]> = {
  es: ["Producto digital", "Servicio / proceso interno", "E-commerce", "Otro"],
  en: ["Digital product",  "Service / internal process", "E-commerce", "Other"],
  pt: ["Produto digital",  "Serviço / processo interno", "E-commerce", "Outro"],
};

const PLACEHOLDER: Record<Lang, string> = {
  es: "escribí algo...",
  en: "type something...",
  pt: "escreva algo...",
};

const LEAD_BANNER: Record<Lang, string> = {
  es: "✓ lead guardado — el equipo te contacta pronto",
  en: "✓ lead saved — the team will contact you soon",
  pt: "✓ lead salvo — a equipe vai entrar em contato",
};

export default function ChatPanel({ lang = "es" }: { lang?: Lang }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(true);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const seqDone = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Sync body class with panel open state */
  useEffect(() => {
    if (visible && open) {
      document.body.classList.add("chat-open");
    } else {
      document.body.classList.remove("chat-open");
    }
    return () => document.body.classList.remove("chat-open");
  }, [visible, open]);

  /* Trigger on hero exit */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !seqDone.current) {
          seqDone.current = true;
          setVisible(true);
          runIntro();
        }
      },
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runIntro() {
    let fullText = "";
    let msgIndex = 0;

    const sequence = [
      { text: "wake up neo...", delay: 50 },
      { pause: 700 },
      { text: INTRO[lang], delay: 38 },
    ];

    for (const step of sequence) {
      if ("pause" in step) {
        await sleep(step.pause as number);
        continue;
      }
      const { text, delay } = step as { text: string; delay: number; pause?: never };
      if (msgIndex === 0) {
        setMsgs([{ role: "assistant", text: "", streaming: true }]);
      } else {
        setMsgs((prev) => [...prev, { role: "assistant", text: "", streaming: true }]);
        fullText = "";
      }
      for (const char of text) {
        fullText += char;
        const captured = fullText;
        setMsgs((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", text: captured, streaming: true };
          return next;
        });
        await sleep(delay);
      }
      setMsgs((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", text: fullText, streaming: false };
        return next;
      });
      msgIndex++;
    }
    setShowOptions(true);
    inputRef.current?.focus();
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const sendText = useCallback(async (text: string) => {
    if (!text || busy) return;
    setInput("");
    setShowOptions(false);
    setBusy(true);

    const history = msgs
      .filter((m) => !m.streaming)
      .map((m) => ({ role: m.role, content: m.text }));

    setMsgs((prev) => [
      ...prev,
      { role: "user", text },
      { role: "assistant", text: "", streaming: true },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, lang }),
      });
      if (!res.body) throw new Error("no body");
      const captured_lead = res.headers.get("X-Lead-Captured") === "true";
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const captured = accumulated;
        setMsgs((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", text: captured, streaming: true };
          return next;
        });
      }
      setMsgs((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", text: accumulated, streaming: false };
        return next;
      });
      if (captured_lead) setLeadSaved(true);
    } catch {
      setMsgs((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", text: "error de conexión.", streaming: false };
        return next;
      });
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }, [busy, msgs]);

  const send = useCallback(() => sendText(input.trim()), [sendText, input]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  if (!visible) return null;

  return (
    <>
      {/* Reopen tab */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRight: "none",
            color: "var(--accent)",
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            padding: "14px 8px",
            cursor: "pointer",
            zIndex: 9990,
            textTransform: "uppercase",
          }}
        >
          TNC agent
        </button>
      )}

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: 360,
          background: "rgba(6,12,6,0.97)",
          borderLeft: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          zIndex: 9990,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
              boxShadow: "0 0 6px var(--accent)",
              animation: "blink 1.4s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.7rem",
              color: "var(--fg-dim)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>TNC agent</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--fg-muted)", fontSize: "1rem", lineHeight: 1,
              fontFamily: "monospace",
            }}
          >×</button>
        </div>

        {/* Lead captured banner */}
        {leadSaved && (
          <div style={{
            padding: "8px 16px",
            background: "rgba(168,255,60,0.08)",
            borderBottom: "1px solid var(--border)",
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--accent)",
            letterSpacing: "0.08em",
            flexShrink: 0,
          }}>
            {LEAD_BANNER[lang]}
          </div>
        )}

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          {msgs.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "88%",
            }}>
              {m.role === "assistant" && (
                <div style={{
                  fontSize: "0.6rem",
                  fontFamily: "var(--font-space-mono), monospace",
                  color: "var(--fg-muted)",
                  letterSpacing: "0.1em",
                  marginBottom: 4,
                  textTransform: "uppercase",
                }}>agent_</div>
              )}
              <div style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.75rem",
                lineHeight: 1.6,
                color: m.role === "user" ? "var(--bg)" : "var(--fg)",
                background: m.role === "user" ? "var(--accent)" : "rgba(168,255,60,0.05)",
                border: m.role === "user" ? "none" : "1px solid var(--border)",
                padding: "8px 12px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
                {m.text}
                {m.streaming && (
                  <span style={{ color: "var(--accent)", animation: "blink 1s step-end infinite" }}>█</span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick options */}
        {showOptions && (
          <div style={{
            padding: "0 16px 12px",
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            flexShrink: 0,
          }}>
            {OPTIONS[lang].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  if (opt === OPTIONS[lang][OPTIONS[lang].length - 1]) {
                    setShowOptions(false);
                    inputRef.current?.focus();
                  } else {
                    sendText(opt);
                  }
                }}
                style={{
                  background: "rgba(168,255,60,0.05)",
                  border: "1px solid var(--border)",
                  color: "var(--fg-dim)",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.65rem",
                  padding: "5px 10px",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.color = "var(--fg)";
                  (e.target as HTMLButtonElement).style.borderColor = "rgba(168,255,60,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.color = "var(--fg-dim)";
                  (e.target as HTMLButtonElement).style.borderColor = "var(--border)";
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--border)",
          flexShrink: 0,
          display: "flex",
          gap: 8,
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={PLACEHOLDER[lang]}
            disabled={busy}
            style={{
              flex: 1,
              background: "rgba(168,255,60,0.04)",
              border: "1px solid var(--border)",
              color: "var(--fg)",
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.72rem",
              padding: "8px 12px",
              outline: "none",
            }}
          />
          <button
            onClick={send}
            disabled={busy || !input.trim()}
            style={{
              background: busy || !input.trim() ? "transparent" : "var(--accent)",
              border: "1px solid var(--border)",
              color: busy || !input.trim() ? "var(--fg-muted)" : "var(--bg)",
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.7rem",
              padding: "8px 14px",
              cursor: busy || !input.trim() ? "default" : "pointer",
              transition: "background 0.15s, color 0.15s",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >→</button>
        </div>
      </div>
    </>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
