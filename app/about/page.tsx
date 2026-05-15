import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import FounderCard from "./FounderCard";

export const metadata: Metadata = {
  title: "About — The Nerd Company",
  description: "El equipo técnico detrás de The Nerd Company.",
};

const FOUNDERS = [
  {
    name: "Agustín Ale",
    role: "Co-founder · Design & Product",
    bio: "Diseñador industrial y líder de producto con base en Buenos Aires. Traduce problemas de negocio complejos en experiencias digitales claras, liderando la identidad visual y la visión de producto de lo que construimos.",
    photo: "/agustin1.png",
    linkedin: "https://www.linkedin.com/in/agustin-ale/",
  },
  {
    name: "Cristóbal Cantolla",
    role: "Co-founder · AI & LLM Engineering",
    bio: "Ingeniero en IA especializado en LLMs, visión artificial y sistemas multi-agente. 3x fundador con track record en startups de inteligencia artificial con financiamiento internacional.",
    photo: "/cristobal2.png",
    linkedin: "https://www.linkedin.com/in/cris-cantolla-ai/",
  },
  {
    name: "Robinson Ureña",
    role: "Co-founder · CTO",
    bio: "Desarrollador full-stack senior especializado en TypeScript, Next.js y agentes de IA en producción. Ha liderado arquitecturas SaaS de alto impacto y sistemas distribuidos para empresas en crecimiento.",
    photo: "/robinson3.png",
    linkedin: "https://www.linkedin.com/in/robinsonur/",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      <SiteHeader />

      {/* ── HERO ── */}
      <section className="px-6 py-24" style={{ paddingTop: "calc(80px + 6rem)", borderBottom: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto text-center">
          <p className="font-mono text-xs mb-4" style={{ color: "var(--fg-dim)" }}>// quiénes somos</p>
          <h1 className="font-display leading-none mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--fg)" }}>
            NO SOMOS UNA<br />
            <span className="highlight-bar">AGENCIA DE IA.</span>
          </h1>
          <p className="font-mono leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "0.82rem", color: "var(--fg-dim)" }}>
            Somos un equipo técnico chico y obsesionado con el resultado. Trabajamos con pocos proyectos
            para poder ir a fondo en cada uno. No vendemos soluciones genéricas — construimos ventaja
            competitiva real.
          </p>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="px-6 py-24 flex-1">
        <div className="w-full max-w-[1200px] mx-auto">
          <p className="font-mono text-xs mb-10" style={{ color: "var(--fg-dim)" }}>// el equipo</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
            {FOUNDERS.map((f) => (
              <FounderCard key={f.name} name={f.name} role={f.role} bio={f.bio} photo={f.photo} linkedin={f.linkedin} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-10" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span style={{ fontFamily: "var(--font-special-gothic)", fontSize: "1rem", color: "var(--fg)" }}>The Nerd Company</span>
          <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>Buenos Aires — Remote Worldwide</span>
        </div>
      </footer>

    </div>
  );
}
