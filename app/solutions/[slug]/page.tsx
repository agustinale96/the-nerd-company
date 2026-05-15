import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES, SERVICE_MAP } from "../data";
import { ServiceCard, WhenYouNeedItList, WhenYouNeedItRich, WhatYouNeedStepper, HorizontalScrollSection, StatementText } from "./HoverComponents";
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

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_MAP[slug];
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug);
  const isRedesigned = !!service.whatIs;

  const W = { width: "80%", margin: "0 auto" } as const;

  return (
    <div className="min-h-screen flex flex-col page-in" style={{ background: "var(--bg)" }}>

      <SiteHeader />

      {/* ── HERO ── */}
      <section className="services-texture" style={{ paddingTop: "calc(80px + 3rem)", paddingBottom: "3.5rem" }}>
        <div style={W}>
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
              <h1 className="font-display leading-tight"
                style={{ fontSize: "clamp(36px, 4.5vw, 68px)", color: "var(--fg)", textAlign: "left" }}>
                {(() => {
                  const words = service.name.toUpperCase().split(" ");
                  const last  = words.pop();
                  return <>{words.join(" ")} <span className="highlight-bar">{last}</span></>;
                })()}
              </h1>
              {isRedesigned ? (
                <p className="mt-6 max-w-2xl"
                  style={{ color: "var(--fg-dim)", fontSize: "clamp(15px, 1.5vw, 19px)", lineHeight: 1.6, textAlign: "left" }}>
                  {service.heroTagline}
                </p>
              ) : (
                <p className="font-mono mt-6 max-w-2xl"
                  style={{ color: "var(--fg-dim)", fontSize: "0.82rem", lineHeight: 1.85, textAlign: "left" }}>
                  {service.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {isRedesigned ? (
        <>
          {/* ── SECCIÓN A: CUÁNDO / SITUACIONES (si sectionWhenFirst) ── */}
          {service.sectionWhenFirst && (service.whenYouNeedItRich || service.whenYouNeedIt) && (
            <section style={{ borderTop: "1px solid var(--border)", paddingTop: "5rem", paddingBottom: "5rem" }}>
              <div style={W}>
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>{service.sectionWhenLabel ?? "// reconocé tu situación"}</p>
                <h2 className="font-display text-4xl sm:text-5xl mb-10" style={{ color: "var(--accent)", textAlign: "left" }}>
                  {service.sectionWhenTitle ?? "¿CUÁNDO LO NECESITÁS?"}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-stretch">
                  <div>
                    {service.whenYouNeedItRich
                      ? <WhenYouNeedItRich items={service.whenYouNeedItRich} />
                      : <WhenYouNeedItList items={service.whenYouNeedIt!} />
                    }
                    {service.whenYouNeedItClosing && (
                      <p className="mt-8" style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.8 }}>
                        {service.whenYouNeedItClosing}
                      </p>
                    )}
                    <div className="mt-10">
                      <Link href="/contact" className="btn-primary" style={{ display: "inline-block", width: "fit-content" }}>
                        Hablemos →
                      </Link>
                    </div>
                  </div>
                  <div style={{ overflow: "hidden", background: "rgba(255,255,255,0.02)", border: "1px dashed var(--border)" }} />
                </div>
              </div>
            </section>
          )}

          {/* ── QUÉ ES / QUÉ HACEMOS ── */}
          <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div style={{ ...W, display: "grid", gridTemplateColumns: "3fr 2fr", gap: "3rem", alignItems: "stretch" }}
              className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-stretch">
              <div>
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>{service.sectionWhatIsLabel ?? "// qué es"}</p>
                <h2 className="font-display text-4xl sm:text-5xl mb-8" style={{ color: "var(--accent)", textAlign: "left" }}>
                  {service.sectionWhatIsTitle ?? "¿QUÉ ES?"}
                </h2>
                <div className="flex flex-col gap-5">
                  {service.whatIs!.map((line, i) => (
                    <p key={i}
                      style={{ color: i === 0 ? "var(--fg)" : "var(--fg-dim)", fontSize: i === 0 ? "1.05rem" : "1rem", lineHeight: 1.8 }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div style={{ overflow: "hidden", background: "rgba(255,255,255,0.02)", border: "1px dashed var(--border)" }} />
            </div>
          </section>

          {/* ── CUÁNDO LO NECESITÁS — solo si NO es sectionWhenFirst ── */}
          {!service.sectionWhenFirst && (service.whenYouNeedItRich || service.whenYouNeedIt) && (
            <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", paddingTop: "5rem", paddingBottom: "5rem" }}>
              <div style={W}>
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>{service.sectionWhenLabel ?? "// reconocé tu situación"}</p>
                <h2 className="font-display text-4xl sm:text-5xl mb-10" style={{ color: "var(--accent)", textAlign: "left" }}>
                  {service.sectionWhenTitle ?? "¿CUÁNDO LO NECESITÁS?"}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-stretch">
                  <div>
                    {service.whenYouNeedItRich
                      ? <WhenYouNeedItRich items={service.whenYouNeedItRich} />
                      : <WhenYouNeedItList items={service.whenYouNeedIt!} />
                    }
                    {service.whenYouNeedItClosing && (
                      <p className="mt-8" style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.8 }}>
                        {service.whenYouNeedItClosing}
                      </p>
                    )}
                  </div>
                  <div style={{ overflow: "hidden", background: "rgba(255,255,255,0.02)", border: "1px dashed var(--border)" }} />
                </div>
              </div>
            </section>
          )}

          {/* ── STATEMENT ── */}
          {service.statement && !service.whenYouNeedItClosing && (
            <section style={{
              borderTop: "1px solid var(--border)",
              background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(168,255,60,0.07) 0%, #0b1c07 100%)",
            }}>
              <div style={{ ...W, paddingTop: "5rem", paddingBottom: "5rem" }}>
                <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "2rem" }}>
                  <StatementText text={service.statement} />
                </div>
              </div>
            </section>
          )}

          {/* ── CASOS DE USO — horizontal scroll ── */}
          {service.useCasesByIndustry && <HorizontalScrollSection items={service.useCasesByIndustry} />}


          {/* ── CÓMO FUNCIONA / CÓMO TRABAJAMOS ── */}
          <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div style={W}>
              <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>{service.sectionHowItWorksLabel ?? "// el proceso"}</p>
              <h2 className="font-display text-4xl sm:text-5xl mb-10" style={{ color: "var(--accent)", textAlign: "left" }}>
                {service.sectionHowItWorksTitle ?? "CÓMO FUNCIONA"}
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
                    <p style={{ fontSize: "1rem", color: "var(--fg-dim)", lineHeight: 1.75 }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link href="/contact" className="btn-primary" style={{ display: "inline-block", width: "fit-content" }}>
                  Iniciar proyecto →
                </Link>
              </div>
            </div>
          </section>

          {/* ── QUÉ OBTENÉS + POR QUÉ CON NOSOTROS ── */}
          {(service.whatYouGet || service.whyWithUs) && (
            <section style={{ borderTop: "1px solid var(--border)", paddingTop: "5rem", paddingBottom: "5rem" }}>
              <div style={{ ...W, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {service.whatYouGet && (
                  <div>
                    <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>// resultados</p>
                    <h2 className="font-display text-4xl sm:text-5xl mb-10" style={{ color: "var(--accent)", textAlign: "left" }}>
                      QUÉ OBTENÉS
                    </h2>
                    <ul className="flex flex-col gap-5">
                      {service.whatYouGet.map((item, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <span style={{ color: "var(--accent)", flexShrink: 0, fontSize: "1rem", marginTop: "0.1rem" }}>›</span>
                          <span style={{ fontSize: "1rem", color: "var(--fg-dim)", lineHeight: 1.75 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {service.whyWithUs && (
                  <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "4rem" }}
                    className="lg:border-l lg:pl-16 border-0 pl-0">
                    <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>// diferencial</p>
                    <h2 className="font-display text-4xl sm:text-5xl mb-10" style={{ color: "var(--accent)", textAlign: "left" }}>
                      POR QUÉ CON NOSOTROS
                    </h2>
                    <ul className="flex flex-col gap-5">
                      {service.whyWithUs.map((item, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <span style={{ color: "var(--accent)", flexShrink: 0, fontSize: "1rem", marginTop: "0.1rem" }}>›</span>
                          <span style={{ fontSize: "1rem", color: "var(--fg-dim)", lineHeight: 1.75 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}



        </>
      ) : (
        <>
          {/* ── OLD: QUÉ INCLUYE + CASOS DE USO ── */}
          <section style={{ borderTop: "1px solid var(--border)", paddingTop: "6rem", paddingBottom: "6rem" }}>
            <div style={W} className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="fade-up fade-up-delay-1">
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>// qué incluye</p>
                <h2 className="font-display text-4xl sm:text-5xl mb-8" style={{ color: "var(--accent)", textAlign: "left" }}>
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
                <p className="font-mono text-xs mb-3" style={{ color: "var(--fg-muted)" }}>// aplicaciones reales</p>
                <h2 className="font-display text-4xl sm:text-5xl mb-8" style={{ color: "var(--accent)", textAlign: "left" }}>
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
            <div style={{ ...W, paddingTop: "4rem", paddingBottom: "4rem" }}>
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

      {/* ── OTRAS SOLUCIONES ── */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div style={W} className="flex flex-col gap-8">
          <div>
            <p className="font-mono text-xs mb-2" style={{ color: "var(--fg-muted)" }}>// otras soluciones</p>
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--accent)", textAlign: "left" }}>OTRAS SOLUCIONES</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-texture" style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid var(--border)" }}>
        <div style={W}>
          <p className="font-mono text-xs mb-6" style={{ color: "var(--fg-muted)" }}>// siguiente paso</p>
          <h2 className="font-display leading-none"
            style={{ fontSize: "clamp(40px, 8vw, 80px)", color: "var(--fg)", lineHeight: 1, textAlign: "left" }}>
            {(() => {
              const title = service.ctaTitle ?? "¿LISTO PARA CONSTRUIR?";
              const words = title.split(" ");
              const last  = words.pop();
              return <>{words.join(" ")} <span className="highlight-bar">{last}</span></>;
            })()}
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-10">
            <p style={{ color: "var(--fg-dim)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "480px" }}>
              {service.ctaText ?? "Contanos tu problema. En 24hs te respondemos con un enfoque concreto."}
            </p>
            <Link href="/contact" className="btn-primary" style={{ display: "inline-block", width: "fit-content" }}>
              Iniciar proyecto →
            </Link>
          </div>
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
