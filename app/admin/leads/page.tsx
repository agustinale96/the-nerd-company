"use client";
import { useState } from "react";

interface Lead {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  source?: string;
  createdAt?: string;
}

export default function LeadsPage() {
  const [secret, setSecret] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchLeads() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/leads?secret=${encodeURIComponent(secret)}`);
      if (res.status === 401) { setError("Contraseña incorrecta."); return; }
      if (!res.ok) { setError("Error al cargar leads."); return; }
      setLeads(await res.json());
    } catch {
      setError("Error de red.");
    } finally {
      setLoading(false);
    }
  }

  const fmt = (iso?: string) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("es-AR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--fg)",
      fontFamily: "var(--font-space-mono), monospace",
      padding: "48px 32px",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: "0.6rem", color: "var(--fg-muted)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
            TNC / admin
          </div>
          <h1 style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "2.5rem", lineHeight: 1 }}>
            LEADS
          </h1>
        </div>

        {leads === null && (
          <div style={{ display: "flex", gap: 8, maxWidth: 400 }}>
            <input
              type="password"
              placeholder="contraseña"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
              style={{
                flex: 1,
                background: "rgba(168,255,60,0.04)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.75rem",
                padding: "10px 14px",
                outline: "none",
              }}
            />
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "..." : "entrar"}
            </button>
          </div>
        )}

        {error && (
          <div style={{ color: "#ff6b6b", fontSize: "0.7rem", marginTop: 12 }}>{error}</div>
        )}

        {leads !== null && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: "0.7rem", color: "var(--fg-dim)" }}>
                {leads.length} lead{leads.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() => { setLeads(null); setSecret(""); }}
                style={{ background: "none", border: "none", color: "var(--fg-muted)", cursor: "pointer", fontSize: "0.7rem", fontFamily: "var(--font-space-mono), monospace" }}
              >
                cerrar sesión
              </button>
            </div>

            {leads.length === 0 ? (
              <div style={{ fontSize: "0.75rem", color: "var(--fg-muted)", padding: "24px 0" }}>
                sin leads todavía.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {leads.map((lead) => (
                  <div key={lead.id} style={{
                    border: "1px solid var(--border)",
                    background: "rgba(0,0,0,0.3)",
                    padding: "16px 20px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px 24px",
                  }}>
                    <Row label="email" value={lead.email} accent />
                    <Row label="fecha" value={fmt(lead.createdAt)} />
                    <Row label="nombre" value={lead.name} />
                    <Row label="empresa" value={lead.company} />
                    <Row label="fuente" value={lead.source === "chat_agent" ? "🤖 chat agent" : "📋 formulario"} />
                    {lead.message && (
                      <div style={{ gridColumn: "1 / -1" }}>
                        <Row label="mensaje" value={lead.message} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value?: string; accent?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: "0.55rem", color: "var(--fg-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: "0.75rem", color: accent ? "var(--accent)" : "var(--fg)", wordBreak: "break-all" }}>
        {value || "—"}
      </div>
    </div>
  );
}
