"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouse    = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const rafId    = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const setHover = (val: boolean) => {
      if (innerRef.current) {
        innerRef.current.style.transform = `scale(${val ? 1.8 : 1})`;
        innerRef.current.style.borderColor = val ? "var(--accent)" : "rgba(255,255,255,0.2)";
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = val ? "0" : "1";
      }
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) setHover(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) setHover(false);
    };

    const tick = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot: exact cursor position, no lag */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 5, height: 5,
        marginLeft: -2.5, marginTop: -2.5,
        background: "var(--accent)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        transition: "opacity 0.2s",
      }} />
      {/* Ring wrapper: position only, no transition */}
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        marginLeft: -15, marginTop: -15,
        pointerEvents: "none",
        zIndex: 99998,
        willChange: "transform",
      }}>
        {/* Ring inner: scale + color, has spring transition */}
        <div ref={innerRef} style={{
          width: 30, height: 30,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s",
        }} />
      </div>
    </>
  );
}
