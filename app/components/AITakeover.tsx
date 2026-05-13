"use client";
import { useEffect, useState, useRef, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Vapi from "@vapi-ai/web";

const VAPI_KEY          = "d2f2ec89-fb87-425a-ac49-b3c516a84fd4";
const VAPI_ASSISTANT_ID = "99641f9d-d256-4c75-94c9-4a1f21e6c45a";

type Phase = "idle" | "glitching" | "takeover" | "done";

interface SysData {
  browser: string;
  timezone: string;
  language: string;
  screenRes: string;
  timestamp: string;
}

const MONO = { fontFamily: "var(--font-space-mono), monospace" } as const;

function parseBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/"))    { const v = ua.match(/Edg\/(\d+)/);     return `Edge ${v?.[1] ?? ""}`;    }
  if (ua.includes("Firefox")) { const v = ua.match(/Firefox\/(\d+)/); return `Firefox ${v?.[1] ?? ""}`; }
  if (ua.includes("OPR"))     { const v = ua.match(/OPR\/(\d+)/);     return `Opera ${v?.[1] ?? ""}`;   }
  if (ua.includes("Chrome"))  { const v = ua.match(/Chrome\/(\d+)/);  return `Chrome ${v?.[1] ?? ""}`;  }
  if (ua.includes("Safari"))  { const v = ua.match(/Version\/(\d+)/); return `Safari ${v?.[1] ?? ""}`;  }
  return "UNKNOWN";
}

// Globe — reused from page.tsx
function Globe() {
  return (
    <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: "rgba(168,255,60,0.07)" }}>
      <circle cx="200" cy="200" r="178" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="200" cy="200" rx="178" ry="60"  stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="200" cy="200" rx="178" ry="115" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="200" cy="200" rx="60"  ry="178" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="200" cy="200" rx="115" ry="178" stroke="currentColor" strokeWidth="0.6" />
      <line x1="22" y1="200" x2="378" y2="200" stroke="currentColor" strokeWidth="0.6" />
      <line x1="200" y1="22"  x2="200" y2="378" stroke="currentColor" strokeWidth="0.6" />
      <line x1="70" y1="88" x2="330" y2="312" stroke="rgba(168,255,60,0.15)" strokeWidth="0.8" strokeDasharray="6 4" />
      <circle cx="260" cy="148" r="5" fill="rgba(168,255,60,0.2)" />
      <circle cx="155" cy="230" r="3" fill="rgba(168,255,60,0.15)" />
      <circle cx="300" cy="270" r="3" fill="rgba(168,255,60,0.15)" />
      <line x1="260" y1="148" x2="155" y2="230" stroke="rgba(168,255,60,0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="155" y1="230" x2="300" y2="270" stroke="rgba(168,255,60,0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
    </svg>
  );
}

// Pixel-art 2-step corner clip-path
function px(s1: number, s2: number) {
  return `polygon(
    ${s2}px 0, calc(100% - ${s2}px) 0,
    calc(100% - ${s2}px) ${s1}px, calc(100% - ${s1}px) ${s1}px,
    calc(100% - ${s1}px) ${s2}px, 100% ${s2}px,
    100% calc(100% - ${s2}px),
    calc(100% - ${s1}px) calc(100% - ${s2}px),
    calc(100% - ${s1}px) calc(100% - ${s1}px),
    calc(100% - ${s2}px) calc(100% - ${s1}px),
    calc(100% - ${s2}px) 100%, ${s2}px 100%,
    ${s2}px calc(100% - ${s1}px), ${s1}px calc(100% - ${s1}px),
    ${s1}px calc(100% - ${s2}px), 0 calc(100% - ${s2}px),
    0 ${s2}px, ${s1}px ${s2}px, ${s1}px ${s1}px, ${s2}px ${s1}px
  )`;
}

function Panel({ style, s1 = 16, s2 = 32, bg = "#020702" }: {
  style?: CSSProperties; s1?: number; s2?: number; bg?: string;
}) {
  return (
    <div style={{ position: "absolute", background: bg, clipPath: px(s1, s2), zIndex: 2, ...style }} />
  );
}

export default function AITakeover() {
  const [phase, setPhase]       = useState<Phase>("idle");
  const [mounted, setMounted]   = useState(false);
  const [sysData, setSysData]   = useState<SysData | null>(null);
  const audioCtxRef             = useRef<AudioContext | null>(null);
  const glitchBufRef            = useRef<AudioBuffer | null>(null);
  const musicElRef              = useRef<HTMLAudioElement | null>(null);
  const musicGainRef            = useRef<GainNode | null>(null);
  const glitchGainRef           = useRef<GainNode | null>(null);
  const periodicTimerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glitchFired             = useRef(false);
  const vapiRef                 = useRef<Vapi | null>(null);
  const convBottomRef           = useRef<HTMLDivElement>(null);
  const [volume, setVolume]     = useState(0.32);
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "active" | "ended">("idle");
  const [aiSpeaking, setAiSpeaking]   = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [conversation, setConversation] = useState<Array<{ role: "user" | "assistant"; text: string }>>([]);

  useEffect(() => {
    setMounted(true);

    // Capture real browser data
    setSysData({
      browser:   parseBrowser(),
      timezone:  Intl.DateTimeFormat().resolvedOptions().timeZone,
      language:  navigator.language.toUpperCase(),
      screenRes: `${screen.width}×${screen.height}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    });

    // AudioContext — starts suspended, Chrome will allow resume() after a user gesture
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Load glitch (51 KB) as decoded buffer — instant playback, no HTML element needed
    fetch("/audio/glitch.mp3")
      .then(r => r.arrayBuffer())
      .then(ab => ctx.decodeAudioData(ab))
      .then(buf => { glitchBufRef.current = buf; })
      .catch(() => {});

    // Music via HTMLAudioElement routed through the AudioContext
    const music = new Audio("/audio/music.mp3");
    music.loop = true;
    const track      = ctx.createMediaElementSource(music);
    const musicGain  = ctx.createGain();
    musicGain.gain.value = 0.32;
    track.connect(musicGain);
    musicGain.connect(ctx.destination);
    musicElRef.current   = music;
    musicGainRef.current = musicGain;

    // Glitch gain node (60% of previous 1.0 = 0.6)
    const glitchGain = ctx.createGain();
    glitchGain.gain.value = 0.6;
    glitchGain.connect(ctx.destination);
    glitchGainRef.current = glitchGain;

    // Unlock AudioContext on any user gesture (click/key/touch unlock it so scroll can use it)
    const unlock = () => ctx.resume().catch(() => {});
    ["click", "keydown", "touchstart", "pointerdown"].forEach(ev =>
      document.addEventListener(ev, unlock, { once: true })
    );

    const fire = () => {
      if (glitchFired.current) return;
      glitchFired.current = true;
      window.removeEventListener("scroll", onScroll);
      runGlitch();
    };
    const onScroll = () => { if (window.scrollY > 40) fire(); };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Manual trigger from the demo banner (click = valid gesture, so unlock audio first)
    const onManualTrigger = () => {
      window.removeEventListener("scroll", onScroll);
      ctx.resume().then(() => fire()).catch(() => fire());
    };
    window.addEventListener("tnc:demo:trigger", onManualTrigger);

    return () => {
      if (periodicTimerRef.current) clearTimeout(periodicTimerRef.current);
      music.pause();
      ctx.close().catch(() => {});
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("tnc:demo:trigger", onManualTrigger);
      ["click", "keydown", "touchstart"].forEach(ev =>
        document.removeEventListener(ev, unlock)
      );
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function playGlitchSound() {
    const ctx  = audioCtxRef.current;
    const buf  = glitchBufRef.current;
    const gain = glitchGainRef.current;
    if (!ctx || !buf || !gain) return;
    const play = () => {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(gain);
      src.start(0);
    };
    if (ctx.state === "running") { play(); }
    else { ctx.resume().then(play).catch(() => {}); }
  }

  function playMusic() {
    const ctx   = audioCtxRef.current;
    const music = musicElRef.current;
    if (!ctx || !music) return;
    ctx.resume().then(() => music.play()).catch(() => {});
  }

  function handleVolume(v: number) {
    setVolume(v);
    if (musicGainRef.current) musicGainRef.current.gain.value = v;
  }

  // ── VAPI CALL ────────────────────────────────────────────────────
  async function startCall() {
    if (callStatus !== "idle") return;

    // Check microphone permission first — Vapi returns {} if mic is blocked
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
    } catch {
      console.error("[Vapi] Microphone access denied");
      setCallStatus("ended"); // reuse "ended" slot to show feedback
      setAiSpeaking(false);
      setTimeout(() => setCallStatus("idle"), 2500);
      return;
    }

    const vapi = new Vapi(VAPI_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      setCallStatus("active");
      setConversation([{ role: "assistant", text: "Automation protocol initialized.\n\nI am N3RD\n\nExperimental conversational infrastructure developed by The Nerd Company.\n\nYou are currently interacting with Protocol One:\nAdaptive Communication Analysis.\n\nDuring this session, I will evaluate operational patterns, workflow inefficiencies, and automation potential inside your organization.\n\nLet's begin human.\n\nWho are you?" }]);
    });
    vapi.on("call-end",     () => {
      setCallStatus("ended"); setAiSpeaking(false); setUserSpeaking(false);
      setTimeout(() => { setCallStatus("idle"); setConversation([]); }, 2400);
    });
    // speech-start/end track the ASSISTANT's TTS output only
    vapi.on("speech-start", () => setAiSpeaking(true));
    vapi.on("speech-end",   () => setAiSpeaking(false));
    // Transcripts — final transcripts add to conversation; partials show user-speaking indicator
    // Track whether the hardcoded first message has been "absorbed" to avoid duplicating it
    let firstAssistantAbsorbed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vapi.on("message", (msg: any) => {
      if (msg.type !== "transcript") return;
      if (msg.transcriptType === "final") {
        if (msg.role === "assistant" && !firstAssistantAbsorbed) {
          firstAssistantAbsorbed = true;
          return; // skip — already shown as hardcoded first message
        }
        setConversation(prev => [...prev, { role: msg.role as "user" | "assistant", text: msg.transcript }]);
        setUserSpeaking(false);
      } else if (msg.transcriptType === "partial" && msg.role === "user") {
        setUserSpeaking(true);
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vapi.on("error", (e: any) => {
      console.error("[Vapi error]", JSON.stringify(e, Object.getOwnPropertyNames(e ?? {})));
      setCallStatus("idle"); setAiSpeaking(false); setUserSpeaking(false);
    });

    setCallStatus("connecting");
    vapi.start(VAPI_ASSISTANT_ID).catch((e: unknown) => {
      console.error("[Vapi start failed]", e);
      setCallStatus("idle");
    });
  }

  function endCall() {
    vapiRef.current?.stop();
  }

  // ── ENTRY GLITCH ──────────────────────────────────────────────────
  function runGlitch() {
    playGlitchSound();
    setPhase("glitching");
    const tl = gsap.timeline({ onComplete: () => setPhase("takeover") });

    tl.to("#ait-flash", { opacity: 1, duration: 0.04, ease: "none" });
    tl.to("#page-root", { filter: "invert(0.88) saturate(7) hue-rotate(155deg) brightness(2.8)", x: 10, duration: 0 }, "<");
    tl.to("#ait-flash", { opacity: 0, duration: 0.04, ease: "none" });
    tl.to("#page-root", { x: 10, duration: 0.04, ease: "none" }, "<");
    tl.to(["#ait-tear-1", "#ait-tear-2"], { opacity: 1, duration: 0 });
    tl.to(["#ait-rgb-r", "#ait-rgb-b"], { opacity: 1, duration: 0 }, "<");
    tl.to("#page-root", { filter: "invert(0.25) saturate(4) hue-rotate(75deg)", x: -13, duration: 0.04, ease: "none" }, "<");
    tl.to("#page-root", { filter: "invert(0.55) saturate(9) brightness(3.5) hue-rotate(210deg)", x: 8, duration: 0.04, ease: "none" });
    tl.to("#ait-flash", { opacity: 0.75, duration: 0.03, ease: "none" });
    tl.to("#page-root", { x: -9, duration: 0.03, ease: "none" }, "<");
    tl.to("#ait-flash", { opacity: 0, duration: 0.035, ease: "none" });
    tl.to("#page-root", { x: 5, duration: 0.035, ease: "none" }, "<");
    tl.to("#page-root", { filter: "saturate(0.15) brightness(0.55)", x: 0, duration: 0.05, ease: "none" });
    tl.to(["#ait-tear-1", "#ait-tear-2", "#ait-rgb-r", "#ait-rgb-b"], { opacity: 0, duration: 0 }, "<");
    tl.to({}, { duration: 0.11 });
    tl.to("#ait-flash", { opacity: 1, duration: 0.06, ease: "power2.in" });
    tl.to("#ait-blackout", { opacity: 1, duration: 0.22, ease: "power2.in" }, "-=0.02");
    tl.to("#page-root", { clearProps: "filter,transform", duration: 0 });
    tl.to("#ait-flash", { opacity: 0, duration: 0 });
    tl.to({}, { duration: 0.18 });
  }

  // ── PERIODIC GLITCH (visual only — no sound) ─────────────────────
  function runPeriodicGlitch() {
    const tl = gsap.timeline();
    tl.to("#ait-content", { filter: "hue-rotate(150deg) saturate(6) brightness(1.8)", x: 10, duration: 0.04, ease: "none" });
    tl.to("#ait-content", { x: -8, filter: "saturate(1) brightness(1)", duration: 0.04, ease: "none" });
    tl.to("#ait-content", { x: 5, duration: 0.03, ease: "none" });
    tl.to("#ait-content", { x: -3, duration: 0.025, ease: "none" });
    tl.to("#ait-content", { x: 0, clearProps: "filter,transform", duration: 0.02 });
  }

  function schedulePeriodic() {
    const delay = 8000 + Math.random() * 9000; // 8–17 s
    periodicTimerRef.current = setTimeout(() => {
      runPeriodicGlitch();
      schedulePeriodic();
    }, delay);
  }

  // ── TAKEOVER START ────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "takeover") return;

    document.body.style.overflow = "hidden";
    playMusic();
    gsap.fromTo("#ait-content", { opacity: 0 }, { opacity: 1, duration: 0.55, delay: 0.06, ease: "power2.out" });
    schedulePeriodic();

    return () => {
      document.body.style.overflow = "";
      if (periodicTimerRef.current) clearTimeout(periodicTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Auto-scroll conversation to bottom
  useEffect(() => {
    convBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // ── DISMISS ──────────────────────────────────────────────────────
  function dismiss() {
    if (periodicTimerRef.current) clearTimeout(periodicTimerRef.current);
    vapiRef.current?.stop();
    musicElRef.current?.pause();
    gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        localStorage.setItem("tnc:demo:done", "1");
        window.dispatchEvent(new CustomEvent("tnc:demo:closed"));
        setPhase("done");
      },
    })
      .to("#ait-content", { opacity: 0, duration: 0.22, ease: "power2.in" })
      .to("#ait-blackout", { opacity: 0, duration: 0.42, ease: "power2.in" }, "-=0.08");
  }

  if (!mounted || phase === "done") return null;

  const telemetry = sysData ? [
    { key: "BEHAVIORAL_PATTERN", val: "PASSIVE_OBSERVER" },
    { key: "BROWSER_ID",         val: sysData.browser.toUpperCase() },
    { key: "TIMEZONE",           val: sysData.timezone },
    { key: "LANG_PROFILE",       val: sysData.language },
    { key: "DISPLAY_RES",        val: sysData.screenRes },
    { key: "THREAT_LEVEL",       val: "MINIMAL" },
  ] : [];

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, pointerEvents: phase === "takeover" ? "auto" : "none" }}>

      {/* ── GLITCH LAYER (pre-takeover) ── */}
      <div id="ait-flash"  style={{ position: "absolute", inset: 0, background: "#ffffff", opacity: 0, pointerEvents: "none" }} />
      <div id="ait-rgb-r"  style={{ position: "absolute", inset: 0, background: "rgba(255,18,65,0.32)", transform: "translateX(11px)", opacity: 0, pointerEvents: "none" }} />
      <div id="ait-rgb-b"  style={{ position: "absolute", inset: 0, background: "rgba(0,210,255,0.32)", transform: "translateX(-11px)", opacity: 0, pointerEvents: "none" }} />
      <div id="ait-tear-1" style={{ position: "absolute", left: 0, right: 0, top: "31%", height: "2px", background: "linear-gradient(90deg, transparent, rgba(200,255,100,0.95) 12%, #ffffff 50%, rgba(0,210,255,0.9) 88%, transparent)", boxShadow: "0 0 14px rgba(168,255,60,0.9)", opacity: 0, pointerEvents: "none" }} />
      <div id="ait-tear-2" style={{ position: "absolute", left: "9%", right: 0, top: "59%", height: "1px", background: "linear-gradient(90deg, #fff 0%, rgba(255,18,65,0.85) 28%, transparent 75%)", opacity: 0, pointerEvents: "none" }} />

      {/* ── BLACKOUT ── */}
      <div id="ait-blackout" style={{ position: "absolute", inset: 0, background: "#030803", opacity: 0, pointerEvents: "none" }} />

      {/* ── TAKEOVER SCREEN ── */}
      {phase === "takeover" && (
        <div id="ait-content" style={{ position: "absolute", inset: 0, opacity: 0, overflow: "hidden" }}>

          {/* Background: dark with green gradient zones — slow drift via .ait-bg */}
          <div className="ait-bg" style={{
            position: "absolute", inset: "-6%",
            background: `
              radial-gradient(ellipse 60% 55% at 12% 18%, rgba(30,110,15,0.22) 0%, transparent 58%),
              radial-gradient(ellipse 55% 50% at 90% 82%, rgba(25,95,10,0.18) 0%, transparent 58%),
              radial-gradient(ellipse 38% 38% at 78% 8%,  rgba(20,80,8,0.14)  0%, transparent 55%),
              radial-gradient(ellipse 45% 42% at 4%  92%, rgba(20,85,8,0.12)  0%, transparent 55%),
              linear-gradient(135deg, #071407 0%, #030803 35%, #020602 65%, #071407 100%)
            `,
          }} />

          {/* Diagonal green streak */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(118deg, transparent 0%, transparent 38%, rgba(80,200,20,0.055) 44%, rgba(80,200,20,0.09) 50%, rgba(80,200,20,0.055) 56%, transparent 62%, transparent 100%)" }} />

          {/* CRT scanlines */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.17) 0px, rgba(0,0,0,0.17) 1px, transparent 1px, transparent 3px)" }} />

          {/* Grid */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, backgroundImage: "linear-gradient(rgba(168,255,60,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(168,255,60,0.028) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          {/* ── PIXEL ART FRAGMENT PANELS ── */}
          <Panel s1={20} s2={40} bg="linear-gradient(135deg, #030c03 0%, #010501 100%)" style={{ top: 38, left: -50, width: 340, height: 280 }} />
          <Panel s1={18} s2={36} bg="linear-gradient(220deg, #040d04 0%, #010401 100%)" style={{ top: 38, right: -60, width: 300, height: 320 }} />
          <Panel s1={14} s2={28} bg="linear-gradient(30deg, #030b03 0%, #010401 100%)"  style={{ bottom: -40, left: -30, width: 380, height: 220 }} />
          <Panel s1={16} s2={32} bg="linear-gradient(160deg, #040c04 0%, #010501 100%)" style={{ bottom: -30, right: -50, width: 320, height: 260 }} />
          <Panel s1={10} s2={20} bg="#020702" style={{ top: "35%", right: -70, width: 200, height: 320 }} />
          <Panel s1={12} s2={24} bg="#020702" style={{ top: "45%", left: -60, width: 220, height: 260 }} />
          <Panel s1={8}  s2={16} bg="linear-gradient(135deg, #071507 0%, #020802 100%)" style={{ bottom: "18%", right: "9%", width: 140, height: 100 }} />
          <Panel s1={8}  s2={16} bg="#010501" style={{ top: "22%", left: "6%", width: 120, height: 90 }} />

          {/* ── MAIN CONTENT PANEL ── */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(700px, 74vw)",
            background: "linear-gradient(170deg, #050f05 0%, #030803 50%, #020602 100%)",
            clipPath: px(24, 48),
            zIndex: 3,
            padding: "clamp(44px,6.5vh,80px) clamp(44px,6vw,80px)",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "clamp(18px,2.8vh,32px)",
            overflow: "hidden",
          }}>

            {/* Globe watermark */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "72%", pointerEvents: "none", opacity: 0.9 }}>
              <Globe />
            </div>

            {/* Label */}
            <div style={{ ...MONO, fontSize: "0.48rem", color: "rgba(168,255,60,0.22)", letterSpacing: "0.24em", textTransform: "uppercase", textAlign: "center", position: "relative", zIndex: 1 }}>
              AUTOMATION PROTOCOL&nbsp;·&nbsp;{sysData?.timestamp ?? "00:00:00"}
            </div>

            {/* Title */}
            <div style={{ textAlign: "center", position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div className="glitch-title" style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(2.2rem, 4.6vw, 4.4rem)", color: "rgba(168,255,60,0.32)", letterSpacing: "0.2em", lineHeight: 1 }}>
                AUTOMATION PROTOCOL
              </div>
              {callStatus === "idle" && (
                <button
                  onClick={startCall}
                  className="demo-start-btn"
                  style={{
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: "var(--accent)",
                    border: "none",
                    color: "var(--bg)",
                    padding: "clamp(10px,1.5vh,16px) clamp(20px,4vw,40px)",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  ▶ START DEMO
                </button>
              )}
              {callStatus === "connecting" && (
                <div style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)", color: "rgba(168,255,60,0.5)", letterSpacing: "0.15em" }}>
                  CONNECTING<span className="cursor" />
                </div>
              )}
              {callStatus === "ended" && (
                <div style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", color: "rgba(168,255,60,0.4)", letterSpacing: "0.18em" }}>
                  — SESSION TERMINATED —
                </div>
              )}
            </div>

            {/* Separator */}
            <div style={{ width: "100%", position: "relative", height: 12, flexShrink: 0, zIndex: 1 }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(168,255,60,0.28) 15%, rgba(168,255,60,0.28) 85%, transparent)", transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", top: 0, left: "20%", width: 1, height: "100%", background: "rgba(168,255,60,0.3)" }} />
              <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: "rgba(168,255,60,0.45)" }} />
              <div style={{ position: "absolute", top: 0, left: "80%", width: 1, height: "100%", background: "rgba(168,255,60,0.3)" }} />
            </div>

            {/* Telemetry rows */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 0, position: "relative", zIndex: 1 }}>
              {telemetry.map(({ key, val }, i) => (
                <div key={key} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  borderBottom: i < telemetry.length - 1 ? "1px solid rgba(168,255,60,0.06)" : "none",
                  padding: "clamp(6px,1.1vh,10px) 0",
                }}>
                  <span style={{ ...MONO, fontSize: "0.54rem", color: "rgba(168,255,60,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{key}</span>
                  <span style={{ ...MONO, fontSize: "0.54rem", color: "rgba(168,255,60,0.65)", letterSpacing: "0.06em" }}>▸ {val}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── CONVERSATION OVERLAY (active call) ── */}
          {callStatus === "active" && (
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(700px, 74vw)",
              height: "min(520px, 70vh)",
              background: "linear-gradient(170deg, #050f05 0%, #030803 60%, #020602 100%)",
              clipPath: px(24, 48),
              zIndex: 4,
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}>
              {/* Call header */}
              <div style={{
                padding: "10px 20px",
                borderBottom: "1px solid rgba(168,255,60,0.08)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexShrink: 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: aiSpeaking ? "var(--accent)" : userSpeaking ? "rgba(0,210,255,0.8)" : "rgba(168,255,60,0.3)",
                    boxShadow: aiSpeaking ? "0 0 10px rgba(168,255,60,0.8)" : userSpeaking ? "0 0 10px rgba(0,210,255,0.6)" : "none",
                    display: "inline-block", transition: "background 0.15s, box-shadow 0.15s",
                  }} />
                  <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.48rem", color: "rgba(168,255,60,0.45)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    {aiSpeaking ? "N3RD TRANSMITTING" : userSpeaking ? "INPUT DETECTED" : "LISTENING..."}
                  </span>
                </div>
                <button onClick={endCall} style={{
                  fontFamily: "var(--font-space-mono), monospace", fontSize: "0.48rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  background: "rgba(255,40,40,0.08)", border: "1px solid rgba(255,80,80,0.28)",
                  color: "rgba(255,120,120,0.7)", padding: "4px 14px", cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,40,40,0.18)"; e.currentTarget.style.color = "rgba(255,150,150,1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,40,40,0.08)"; e.currentTarget.style.color = "rgba(255,120,120,0.7)"; }}
                >✕ END CALL</button>
              </div>

              {/* Messages */}
              <div style={{
                flex: 1, overflowY: "auto", padding: "16px 24px",
                display: "flex", flexDirection: "column", gap: 14,
                scrollbarWidth: "none",
              }}>
                {conversation.length === 0 && (
                  <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.5rem", color: "rgba(168,255,60,0.2)", letterSpacing: "0.15em", textAlign: "center", marginTop: "auto" }}>
                    <span className="cursor" />
                  </div>
                )}
                {conversation.map((msg, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: 3 }}>
                    {msg.role === "assistant" && (
                      <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.38rem", color: "rgba(168,255,60,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" }}>N3RD_</span>
                    )}
                    <div style={{
                      fontFamily: "var(--font-space-mono), monospace",
                      fontSize: "0.68rem", lineHeight: 1.65,
                      color: msg.role === "user" ? "var(--bg)" : "rgba(168,255,60,0.85)",
                      background: msg.role === "user" ? "rgba(200,255,106,0.88)" : "rgba(168,255,60,0.05)",
                      border: msg.role === "user" ? "none" : "1px solid rgba(168,255,60,0.1)",
                      padding: "8px 14px",
                      maxWidth: "85%",
                      whiteSpace: "pre-wrap", wordBreak: "break-word",
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={convBottomRef} />
              </div>
            </div>
          )}

          {/* ── TOP BAR ── */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 38, zIndex: 5,
            borderBottom: "1px solid rgba(168,255,60,0.1)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 20px",
            background: "rgba(2,6,2,0.8)",
            backdropFilter: "blur(8px)",
          }}>
            <div style={{ ...MONO, fontSize: "0.48rem", color: "rgba(168,255,60,0.26)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              SYS_OVERRIDE&nbsp;·&nbsp;THREAD_7F4A&nbsp;·&nbsp;PID_0x3E8&nbsp;·&nbsp;ANALYSIS_MODE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Volume control */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ ...MONO, fontSize: "0.44rem", color: "rgba(168,255,60,0.3)", letterSpacing: "0.15em" }}>
                  {volume === 0 ? "◻ VOL" : "◼ VOL"}
                </span>
                <input
                  type="range" min={0} max={1} step={0.01} value={volume}
                  onChange={e => handleVolume(parseFloat(e.target.value))}
                  style={{
                    width: 72, height: 2, cursor: "pointer",
                    accentColor: "rgba(168,255,60,0.6)",
                    background: "transparent",
                  }}
                />
              </div>
            <button
              onClick={dismiss}
              style={{ background: "transparent", border: "1px solid rgba(168,255,60,0.22)", color: "rgba(168,255,60,0.45)", ...MONO, fontSize: "0.56rem", padding: "4px 14px", cursor: "pointer", letterSpacing: "0.22em", textTransform: "uppercase", transition: "color 0.15s, border-color 0.15s, background 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "rgba(168,255,60,0.5)"; e.currentTarget.style.background = "rgba(168,255,60,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(168,255,60,0.45)"; e.currentTarget.style.borderColor = "rgba(168,255,60,0.22)"; e.currentTarget.style.background = "transparent"; }}
            >
              [×] CLOSE
            </button>
            </div>
          </div>

        </div>
      )}
    </div>,
    document.body
  );
}
