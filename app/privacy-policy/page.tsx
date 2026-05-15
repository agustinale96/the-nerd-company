import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — The Nerd Company",
};

export default function PrivacyPolicyPage() {
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
          PRIVACY POLICY
        </h1>
        <p className="font-mono text-xs mb-12" style={{ color: "var(--fg-muted)" }}>Last updated: {new Date().getFullYear()}</p>

        <div className="flex flex-col gap-8" style={{ color: "var(--fg-dim)", fontSize: "0.95rem", lineHeight: 1.8 }}>
          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you fill out our contact form. This may include your name, email address, company name, and message content.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>2. How We Use Your Information</h2>
            <p>We use the information we collect to respond to your inquiries, communicate with you about our services, and improve our website and offerings. We do not sell, trade, or otherwise transfer your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>3. Data Retention</h2>
            <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable laws.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>4. Cookies</h2>
            <p>Our website may use cookies and similar tracking technologies to enhance your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at hellothere@thenerdcompany.com.</p>
          </section>

          <section>
            <h2 className="font-display mb-4" style={{ fontSize: "1.3rem", color: "var(--fg)" }}>6. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <span style={{ color: "var(--accent)" }}>hellothere@thenerdcompany.com</span>.</p>
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
