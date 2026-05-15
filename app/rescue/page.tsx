import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Rescue — The Nerd Company",
  description: "Auditamos lo que implementaste, encontramos qué falla y lo resolvemos.",
};

export default function RescuePage() {
  const W = { width: "80%", margin: "0 auto" } as const;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      <SiteHeader />

      {/* ── HERO ── */}
      <section className="services-texture" style={{ paddingTop: "calc(80px + 5rem)", paddingBottom: "5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={W} className="text-center">
          <p className="font-mono text-xs mb-4" style={{ color: "var(--fg-muted)" }}>// rescate</p>
          <h1 className="font-display leading-none mb-8" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "var(--fg)" }}>
            ¿TU IA NO FUNCIONA<br />
            <span className="highlight-bar">COMO QUERÉS?</span>
          </h1>
          <p style={{ color: "var(--fg-dim)", fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>
            Auditamos lo que implementaste, encontramos qué falla y lo resolvemos — ya sea ajustando lo que hay o rehaciendo lo que no tiene arreglo.
          </p>
        </div>
      </section>

      {/* ── QUÉ HACEMOS ── */}
      <section style={{ paddingTop: "5rem", paddingBottom: "5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={W}>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>// el problema</p>
          <h2 className="font-display mb-12" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--accent)" }}>
            CUÁNDO NOS LLAMAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { n: "01", title: "El piloto nunca llegó a producción", desc: "Tuvieron una prueba de concepto que funcionó en demo pero que nunca pudo escalar ni integrarse con los sistemas reales." },
              { n: "02", title: "El modelo dejó de funcionar", desc: "Algo cambió — los datos, el contexto, el comportamiento de los usuarios — y el sistema que antes respondía bien ahora falla." },
              { n: "03", title: "Nadie sabe cómo mantenerse", desc: "Implementaron algo, el proveedor o consultor desapareció, y ahora tienen un sistema que nadie entiende ni puede modificar." },
              { n: "04", title: "Los resultados no son los esperados", desc: "El sistema está en producción pero no está generando el valor prometido. Necesitan saber por qué y cómo arreglarlo." },
            ].map((item) => (
              <div key={item.n} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <span className="font-display" style={{ fontSize: "2.5rem", color: "rgba(168,255,60,0.12)", lineHeight: 1, flexShrink: 0 }}>{item.n}</span>
                <div>
                  <h3 className="font-display mb-2" style={{ fontSize: "1.2rem", color: "var(--fg)" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--fg-dim)", lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section style={{ background: "var(--bg-alt)", paddingTop: "5rem", paddingBottom: "5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={W}>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>// cómo trabajamos</p>
          <h2 className="font-display mb-12" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--accent)" }}>
            CÓMO TRABAJAMOS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Auditoría", desc: "Revisamos todo lo que implementaron: arquitectura, modelos, datos, integraciones. Sin juicios, con foco en encontrar qué está fallando y por qué." },
              { n: "02", title: "Diagnóstico", desc: "Entregamos un reporte claro: qué funciona, qué está roto, qué se puede salvar y qué hay que rehacer. Con prioridades y estimaciones reales." },
              { n: "03", title: "Resolución", desc: "Ejecutamos el fix: ajustamos lo que se puede ajustar, reconstruimos lo que no tiene arreglo, y entregamos un sistema que tu equipo entiende y puede mantener." },
            ].map((item) => (
              <div key={item.n} className="flex flex-col gap-3">
                <span className="font-display" style={{ fontSize: "3.5rem", color: "rgba(168,255,60,0.12)", lineHeight: 1 }}>{item.n}</span>
                <p className="font-mono text-xs" style={{ color: "var(--accent)" }}>{item.title.toUpperCase()}</p>
                <p style={{ fontSize: "1rem", color: "var(--fg-dim)", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div style={W}>
          <p className="font-mono text-xs mb-6" style={{ color: "var(--fg-muted)" }}>// siguiente paso</p>
          <h2 className="font-display leading-none mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--fg)" }}>
            CONTANOS QUÉ<br />
            <span className="highlight-bar">SALIÓ MAL.</span>
          </h2>
          <p style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.75, maxWidth: 480, marginBottom: "2rem" }}>
            La primera conversación es sin costo. Te decimos si podemos ayudar — y cómo.
          </p>
          <Link href="/contact" className="btn-primary" style={{ fontSize: "0.9rem", padding: "12px 28px" }}>
            Iniciar auditoría →
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
