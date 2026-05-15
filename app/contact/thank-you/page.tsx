import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mensaje enviado — The Nerd Company",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(6,12,6,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
        <Link href="/" className="text-lg select-none" style={{ fontFamily: "var(--font-special-gothic)", color: "var(--fg)", letterSpacing: "0.03em" }}>
          The Nerd Company
        </Link>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 py-16">
        <div className="w-full max-w-[600px] mx-auto flex flex-col gap-6 page-in">
          <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>✓ transmisión recibida</span>
          <h1 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--fg)", lineHeight: 1 }}>
            MENSAJE<br />ENVIADO.
          </h1>
          <p className="font-mono text-sm" style={{ color: "var(--fg-dim)", lineHeight: 1.75 }}>
            Respondemos en menos de 24 horas.<br />
            Mientras tanto, podés conocer más sobre lo que hacemos.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/" className="btn-primary" style={{ width: "fit-content" }}>← Volver al inicio</Link>
            <Link href="/solutions" className="btn-ghost" style={{ width: "fit-content" }}>Ver soluciones →</Link>
          </div>
        </div>
      </main>

    </div>
  );
}
