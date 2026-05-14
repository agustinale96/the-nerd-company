import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES, SERVICE_MAP } from "../data";
import { ServiceCard, WhenYouNeedItList, WhatYouNeedStepper, HorizontalScrollSection, StatementText } from "./HoverComponents";
import SiteHeader from "../../components/SiteHeader";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_MAP[slug];
  if (!service) return {};
  return {
    title: `${service.name} — The Nerd Company`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_MAP[slug];
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug);
  const isRedesigned = !!service.whatIs;

  return (
    <div className="min-h-screen flex flex-col page-in" style={{ background: "var(--bg)" }}>

      <SiteHeader />

      {/* ── HERO ── */}
      <section className="services-texture px-6" style={{ paddingTop: "calc(80px + 3rem)", paddingBottom: "3.5rem" }}>
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="relative">
            <span className="font-display select-none pointer-events-none"
              style={{
                fontSize: "clamp(100px, 22vw, 220px)",
                lineHeight: 1,
                color: "rgba(168,255,60,0.04)",
                position: "absolute",
                top: 0,
                left: -12,
                zIndex: 0,
              }}>
              {service.n}
            </span>
            <div className="relative" style={{ zIndex: 1, paddingTop: "clamp(36px, 6vw, 70px)" }}>
              <h1 className="font-display leading-none glitch-title"
                style={{ fontSize: "clamp(48px, 8vw, 110px)", color: "var(--fg)" }}>
                {service.name.toUpperCase()}
              </h1>
              {isRedesigned ? (
                <p className="mt-8 max-w-2xl"
                  style={{ color: "var(--fg)", fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.5 }}>
                  {service.heroTagline}
                </p>
              ) : (
                <p className="font-mono mt-8 max-w-2xl"
                  style={{ color: "var(--fg-dim)", fontSize: "0.82rem", lineHeight: 1.85 }}>
                  {service.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {isRedesigned ? (
        <>
          {/* ── QUÉ ES — split layout ── */}
          <section className="px-6 py-20" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
              <div>
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// qué es</p>
                <h2 className="font-display text-4xl sm:text-5xl mb-8" style={{ color: "var(--fg)" }}>
                  ¿QUÉ ES?
                </h2>
                <div className="flex flex-col gap-5">
                  {service.whatIs!.map((line, i) => (
                    <p key={i} className="font-mono"
                      style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.8 }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {service.serviceImage && (
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.serviceImage}
                    alt={service.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(0.65) saturate(0.7)",
                      display: "block",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(168,255,60,0.08) 0%, transparent 60%)",
                    border: "1px solid rgba(168,255,60,0.15)",
                  }} />
                </div>
              )}
            </div>
          </section>

          {/* ── CUÁNDO LO NECESITÁS — sticky image + fancy list ── */}
          <section className="px-6 py-20" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
            <div className="w-full max-w-[1200px] mx-auto">
              <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// reconocé tu situación</p>
              <h2 className="font-display text-4xl sm:text-5xl mb-10" style={{ color: "var(--fg)" }}>
                ¿CUÁNDO LO NECESITÁS?
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">
                <WhenYouNeedItList items={service.whenYouNeedIt!} />

                {service.serviceImage && (
                  <div style={{ position: "sticky", top: "6rem", overflow: "hidden", aspectRatio: "3/4" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.serviceImage}
                      alt=""
                      aria-hidden
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.5) saturate(0.6)",
                        display: "block",
                      }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, var(--bg-alt) 0%, transparent 45%)",
                    }} />
                    <div style={{
                      position: "absolute", inset: 0,
                      border: "1px solid rgba(168,255,60,0.12)",
                    }} />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── STATEMENT ── */}
          {service.statement && (
            <section style={{
              borderTop: "1px solid var(--border)",
              background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(168,255,60,0.07) 0%, #0b1c07 100%)",
            }}>
              <div className="w-full max-w-[1200px] mx-auto px-6 py-20">
                <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "2rem" }}>
                  <StatementText text={service.statement} />
                </div>
              </div>
            </section>
          )}

          {/* ── CASOS DE USO — horizontal scroll ── */}
          <HorizontalScrollSection items={service.useCasesByIndustry!} />

          {/* ── CÓMO FUNCIONA ── */}
          <section className="px-6 py-20" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
            <div className="w-full max-w-[1200px] mx-auto">
              <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// el proceso</p>
              <h2 className="font-display text-4xl sm:text-5xl mb-10" style={{ color: "var(--fg)" }}>
                CÓMO FUNCIONA
              </h2>
              <div className={`grid gap-8 grid-cols-1 sm:grid-cols-2 ${(service.howItWorks!.length > 4) ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                {service.howItWorks!.map((step, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <span className="font-display"
                      style={{ fontSize: "3.5rem", color: "rgba(168,255,60,0.12)", lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-mono text-xs" style={{ color: "var(--accent)" }}>
                      {step.title.toUpperCase()}
                    </p>
                    <p className="font-mono"
                      style={{ fontSize: "1rem", color: "var(--fg-dim)", lineHeight: 1.75 }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── VARIANTES / CÓMO ES EL PROCESO DE TRABAJO ── */}
          {service.variants && (
            <section className="px-6 py-20" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="w-full max-w-[1200px] mx-auto">
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>
                  {service.sectionVariantsTitle ? "// proceso de trabajo" : "// modalidades"}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl mb-10" style={{ color: "var(--fg)" }}>
                  {service.sectionVariantsTitle ?? "VARIANTES"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.variants.map((v, i) => (
                    <div key={i} style={{
                      border: "1px solid var(--border)",
                      padding: "2rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      background: "rgba(0,0,0,0.2)",
                    }}>
                      <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", color: "var(--fg)" }}>
                        {v.name}
                      </p>
                      <p className="font-mono" style={{ fontSize: "0.95rem", color: "var(--fg-dim)", lineHeight: 1.75 }}>
                        {v.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── QUÉ NECESITÁS / QUÉ TIPO DE EMPRESAS ── */}
          {(service.whatYouNeed || service.targetCompanies) && (
          <section className="px-6 py-20" style={{ borderTop: "1px solid var(--border)", background: service.targetCompanies ? "var(--bg-alt)" : undefined }}>
            <div className={`w-full max-w-[1200px] mx-auto grid grid-cols-1 gap-16 items-start ${service.targetCompanies ? "" : "lg:grid-cols-[1fr_1fr]"}`}>
              <div>
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>
                  {service.targetCompanies ? "// perfil de cliente" : "// requisitos"}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl mb-3" style={{ color: "var(--fg)" }}>
                  {service.sectionWhatYouNeedTitle ?? "QUÉ NECESITÁS"}
                </h2>
                <h2 className="font-display text-4xl sm:text-5xl mb-10" style={{ color: "var(--fg)" }}>
                  {service.sectionWhatYouNeedSubtitle ?? "PARA EMPEZAR"}
                </h2>
                <p className="font-mono" style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.75 }}>
                  {service.targetCompanies
                    ? "El perfil de organización que mayor valor obtiene de este servicio."
                    : "Expandí cada punto para ver el detalle. No hace falta que tengas todo antes de la primera reunión."}
                </p>
              </div>
              {service.targetCompanies
                ? <WhenYouNeedItList items={service.targetCompanies} />
                : <WhatYouNeedStepper items={service.whatYouNeed!} />}
            </div>
          </section>
          )}

        </>
      ) : (
        <>
          {/* ── OLD: QUÉ INCLUYE + CASOS DE USO ── */}
          <section className="px-6 py-24" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="fade-up fade-up-delay-1">
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// qué incluye</p>
                <h2 className="font-display text-4xl sm:text-5xl mb-8" style={{ color: "var(--fg)" }}>
                  QUÉ INCLUYE
                </h2>
                <ul className="flex flex-col gap-4">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start"
                      style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", color: "var(--fg-dim)", lineHeight: 1.7 }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fade-up fade-up-delay-2">
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-dim)" }}>// aplicaciones reales</p>
                <h2 className="font-display text-4xl sm:text-5xl mb-8" style={{ color: "var(--fg)" }}>
                  CASOS DE USO
                </h2>
                <ul className="flex flex-col gap-4">
                  {service.useCases.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start"
                      style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", color: "rgba(168,255,60,0.45)", lineHeight: 1.7 }}>
                      <span style={{ color: "rgba(168,255,60,0.3)", flexShrink: 0, marginTop: 2 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── OLD: DIFERENCIADOR ── */}
          <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
              <div className="term-box max-w-3xl">
                <p style={{ color: "var(--fg-dim)", lineHeight: 1.8, fontSize: "0.78rem" }}>
                  Combinamos investigación aplicada en inteligencia artificial, entrenamiento de modelos personalizados,
                  sistemas agentic e infraestructura AI para construir soluciones reales de alto impacto empresarial.
                  El foco está en desarrollar sistemas productivos y escalables capaces de integrarse con procesos
                  reales de negocio y generar valor operacional medible.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── OTROS SERVICIOS ── */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8">
          <div>
            <p className="font-mono text-xs mb-2" style={{ color: "var(--fg-dim)" }}>// otros servicios</p>
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--fg)" }}>OTROS SERVICIOS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-texture px-6" style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto">
          <p className="font-mono text-xs mb-6" style={{ color: "var(--fg-dim)" }}>// siguiente paso</p>
          <h2 className="font-display leading-none"
            style={{ fontSize: "clamp(40px, 8vw, 80px)", color: "var(--fg)", lineHeight: 1 }}>
            ¿LISTO PARA <span className="highlight-bar">CONSTRUIR?</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-10">
            <p className="font-mono" style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "480px" }}>
              {service.ctaText ?? "Contanos tu problema. En 24hs te respondemos con un enfoque concreto."}
            </p>
            <Link href="/contacto" className="btn-primary" style={{ display: "inline-block", width: "fit-content" }}>
              Iniciar proyecto →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-10 mt-auto" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span style={{ fontFamily: "var(--font-special-gothic)", fontSize: "1rem", letterSpacing: "0.03em", color: "var(--fg)" }}>
              The Nerd Company
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>Buenos Aires — Remote Worldwide</span>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="font-mono text-xs" style={{ color: "var(--fg-dim)" }}>hellothere@thenerdcompany.com</span>
            <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>
              Open for selected projects · © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
