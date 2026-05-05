"use client";

import { useState, useRef } from "react";

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMsg("That doesn't look like a valid email.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }

      if (!res.ok) throw new Error(data.error ?? "Unknown error");

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
  }

  const handleChange = (v: string) => {
    setEmail(v);
    if (status !== "idle" && status !== "loading") setStatus("idle");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-10 text-center">

        {/* Logo / wordmark */}
        <div className="fade-up fade-up-delay-1 flex flex-col items-center gap-1">
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            beta
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight cursor"
            style={{ letterSpacing: "-0.02em" }}
          >
            The Nerd Company
          </h1>
          <p className="text-sm mt-2" style={{ color: "#888" }}>
            Something nerdy is being built. Get early access.
          </p>
        </div>

        {/* Form */}
        {status !== "success" ? (
          <form
            onSubmit={handleSubmit}
            className="fade-up fade-up-delay-2 w-full flex flex-col gap-3"
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                disabled={status === "loading"}
                className="w-full px-4 py-3 text-sm rounded-md outline-none transition-all duration-200"
                style={{
                  background: "var(--border)",
                  color: "var(--fg)",
                  border: `1px solid ${
                    status === "error" ? "#ff4d4f" : "var(--muted)"
                  }`,
                  caretColor: "var(--accent)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(0,255,135,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    status === "error" ? "#ff4d4f" : "var(--muted)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="w-full py-3 text-sm font-semibold rounded-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                if (status !== "loading" && email) {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {status === "loading" ? "sending..." : "get early access →"}
            </button>

            {/* Inline feedback */}
            {status === "error" && (
              <p className="text-xs text-center" style={{ color: "#ff4d4f" }}>
                {errorMsg}
              </p>
            )}
            {status === "duplicate" && (
              <p className="text-xs text-center" style={{ color: "#faad14" }}>
                You&apos;re already on the list.
              </p>
            )}
          </form>
        ) : (
          <div
            className="fade-up fade-up-delay-2 w-full py-5 rounded-md text-center"
            style={{
              border: "1px solid var(--accent)",
              background: "rgba(0,255,135,0.05)",
            }}
          >
            <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
              ✓ you&apos;re on the list
            </p>
            <p className="text-xs mt-1" style={{ color: "#888" }}>
              we&apos;ll be in touch when it&apos;s ready.
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="fade-up fade-up-delay-3 text-xs" style={{ color: "#444" }}>
          © {new Date().getFullYear()} The Nerd Company
        </p>
      </div>
    </main>
  );
}
