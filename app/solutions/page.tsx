import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import { SERVICES } from "./data";

export const metadata: Metadata = {
  title: "Solutions — The Nerd Company",
  description: "AI solutions for chatbots, automation, retention, and data analytics.",
};

export default function SolutionsPage() {
  const W = { width: "80%", margin: "0 auto" } as const;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="services-texture" style={{ paddingTop: "calc(80px + 4rem)", paddingBottom: "4rem", borderBottom: "1px solid var(--border)" }}>
        <div style={W}>
          <p className="font-mono text-xs mb-4" style={{ color: "var(--fg-muted)" }}>// soluciones</p>
          <h1 className="font-display leading-none mb-6" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--fg)" }}>
            NUESTRAS <span className="highlight-bar">SOLUCIONES</span>
          </h1>
          <p style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.75, maxWidth: 560 }}>
            Cuatro áreas de impacto donde la IA genera resultados reales y medibles para tu negocio.
          </p>
        </div>
      </section>

      {/* ── SOLUTIONS LIST ── */}
      <section style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div style={W}>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "3rem",
                  borderBottom: "1px solid var(--border)",
                  padding: "3rem 0",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                className="group hover:bg-[rgba(168,255,60,0.02)]"
              >
                <span className="font-mono text-sm" style={{ color: "var(--fg-muted)", flexShrink: 0, paddingTop: 6 }}>{s.n}</span>
                <div style={{ flex: 1 }}>
                  <h2 className="font-display mb-3 group-hover:text-[var(--accent)]"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", color: "var(--fg)", transition: "color 0.2s" }}>
                    {s.name}
                  </h2>
                  <p style={{ fontSize: "0.95rem", color: "var(--fg-dim)", lineHeight: 1.75, maxWidth: 560 }}>
                    {s.cardTagline ?? s.description}
                  </p>
                </div>
                <span style={{ color: "var(--fg-muted)", fontSize: "1.2rem", flexShrink: 0, paddingTop: 6, transition: "color 0.2s, transform 0.2s" }}
                  className="group-hover:text-[var(--accent)] group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div style={{ ...W, textAlign: "center" }} className="flex flex-col items-center gap-6">
          <p className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>// no encontrás lo que buscás?</p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--fg)" }}>
            DISEÑAMOS A MEDIDA
          </h2>
          <p style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.75, maxWidth: 480 }}>
            Cada empresa es distinta. Si tu problema no encaja en ninguna categoría, contanos — lo resolvemos de todas formas.
          </p>
          <Link href="/contact" className="btn-primary" style={{ fontSize: "0.9rem", padding: "12px 28px" }}>
            Iniciar conversación →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 mt-auto" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div style={W} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span style={{ fontFamily: "var(--font-special-gothic)", fontSize: "1rem", letterSpacing: "0.03em", color: "var(--fg)" }}>
              The Nerd Company
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>Buenos Aires — Remote Worldwide</span>
          </div>
          <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>
            Open for selected projects · © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}
