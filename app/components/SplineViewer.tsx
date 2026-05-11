"use client";
import { useEffect, useRef } from "react";

export default function SplineViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector('script[src*="spline-viewer"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.12.92/build/spline-viewer.js";
      document.head.appendChild(script);
    }

    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute("url", url);
    viewer.style.cssText = "width:100%;height:100%;display:block;";

    const container = containerRef.current;
    if (container) container.appendChild(viewer);

    return () => {
      if (container && viewer.parentNode === container) container.removeChild(viewer);
    };
  }, [url]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
