import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — The Nerd Company",
};

export default function TermsPage() {
  const W = { width: "min(720px, 90%)", margin: "0 auto" } as const;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Minimal header — no navbar */}
      <header className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <Link href="/" style={{ fontFamily: "var(--font-special-gothic)", fontSize: "1rem", color: "var(--fg)", textDecoration: "none", letterSpacing: "0.03em" }}>
          The Nerd Company
        </Link>
        <Link href="/" className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          ← Inicio
        </Link>
      </header>

      <main style={{ ...W, paddingTop: "4rem", paddingBottom: "6rem", flex: 1 }}>
        <p className="font-mono text-xs mb-4" style={{ color: "var(--fg-muted)" }}>// legal</p>
        <h1 className="font-display mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--fg)" }}>
          TERMS OF SERVICE
        </h1>
        <p className="font-mono text-xs mb-12" style={{ color: "var(--fg-muted)" }}>Last updated: {new Date().getFullYear()}</p>

        <div className="flex flex-col gap-8" style={{ color: "var(--fg-dim)", fontSize: "0.95rem", lineHeight: 1.8 }}>
          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and conditions outlined herein. If you do not agree to these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>2. Services</h2>
            <p>The Nerd Company provides AI consulting, development, and implementation services. The specific terms of any engagement will be outlined in a separate service agreement between The Nerd Company and the client.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>3. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and images, is the property of The Nerd Company and is protected by applicable intellectual property laws.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>4. Limitation of Liability</h2>
            <p>The Nerd Company shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our services, to the extent permitted by applicable law.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>5. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of any material changes by updating the date at the top of this page. Continued use of the website after any changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>6. Governing Law</h2>
            <p>These terms shall be governed by the laws of Argentina. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Buenos Aires, Argentina.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>7. Contact</h2>
            <p>For any questions about these Terms of Service, please contact us at <span style={{ color: "var(--accent)" }}>hellothere@thenerdcompany.com</span>.</p>
          </section>
        </div>
      </main>

      <footer className="px-6 py-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={W} className="flex flex-wrap gap-6 justify-between">
          <span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>© {new Date().getFullYear()} The Nerd Company</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="font-mono text-xs" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" className="font-mono text-xs" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
