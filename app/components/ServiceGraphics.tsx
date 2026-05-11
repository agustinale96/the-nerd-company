/* Animated SVG graphics for each service — terminal aesthetic */

/* ── 01: Neural network (IA aplicada a tu producto) ── */
function NeuralNet() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes nn-pulse   { 0%,100%{opacity:.2} 60%{opacity:1} }
        @keyframes nn-flow    { to{stroke-dashoffset:-22} }
        @keyframes nn-glow    { 0%,100%{opacity:.5;r:9} 50%{opacity:1;r:11} }
        .nn-node { animation: nn-pulse 2.4s ease-in-out infinite; }
        .nn-n2   { animation-delay:.5s; }
        .nn-n3   { animation-delay:1s; }
        .nn-n4   { animation-delay:.3s; }
        .nn-n5   { animation-delay:.8s; }
        .nn-line { stroke-dasharray:6 4; animation: nn-flow 1.8s linear infinite; }
        .nn-l2   { animation-delay:.25s; }
        .nn-l3   { animation-delay:.5s; }
        .nn-l4   { animation-delay:.75s; }
        .nn-l5   { animation-delay:1s; }
        .nn-l6   { animation-delay:1.25s; }
        .nn-out  { animation: nn-glow 1.6s ease-in-out infinite; }
      `}</style>

      {/* Input layer */}
      <circle cx="28" cy="28" r="8" stroke="var(--fg-dim)" strokeWidth="1.5" className="nn-node" />
      <circle cx="28" cy="65" r="8" stroke="var(--fg-dim)" strokeWidth="1.5" className="nn-node nn-n2" />
      <circle cx="28" cy="102" r="8" stroke="var(--fg-dim)" strokeWidth="1.5" className="nn-node nn-n3" />

      {/* Hidden layer */}
      <circle cx="100" cy="46" r="8" stroke="var(--fg-dim)" strokeWidth="1.5" className="nn-node nn-n4" />
      <circle cx="100" cy="84" r="8" stroke="var(--fg-dim)" strokeWidth="1.5" className="nn-node nn-n5" />

      {/* Output */}
      <circle cx="172" cy="65" r="9" stroke="var(--accent)" strokeWidth="1.5" fill="rgba(168,255,60,.08)" className="nn-out" />
      <circle cx="172" cy="65" r="4" fill="var(--accent)" opacity=".9" />

      {/* Connections in→hidden */}
      <line x1="36" y1="28"  x2="92" y2="46"  stroke="var(--fg-muted)" strokeWidth="1" className="nn-line" />
      <line x1="36" y1="28"  x2="92" y2="84"  stroke="var(--fg-muted)" strokeWidth="1" className="nn-line nn-l2" />
      <line x1="36" y1="65"  x2="92" y2="46"  stroke="var(--fg-muted)" strokeWidth="1" className="nn-line nn-l3" />
      <line x1="36" y1="65"  x2="92" y2="84"  stroke="var(--fg-muted)" strokeWidth="1" className="nn-line nn-l4" />
      <line x1="36" y1="102" x2="92" y2="46"  stroke="var(--fg-muted)" strokeWidth="1" className="nn-line nn-l5" />
      <line x1="36" y1="102" x2="92" y2="84"  stroke="var(--fg-muted)" strokeWidth="1" className="nn-line nn-l6" />

      {/* Connections hidden→output */}
      <line x1="108" y1="46" x2="163" y2="65" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity=".5" className="nn-line nn-l2" />
      <line x1="108" y1="84" x2="163" y2="65" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity=".5" className="nn-line nn-l4" />

      {/* Labels */}
      <text x="28" y="122" textAnchor="middle" fontSize="6" fill="var(--fg-muted)" fontFamily="monospace">INPUT</text>
      <text x="100" y="122" textAnchor="middle" fontSize="6" fill="var(--fg-muted)" fontFamily="monospace">HIDDEN</text>
      <text x="172" y="122" textAnchor="middle" fontSize="6" fill="var(--accent)" fontFamily="monospace">OUTPUT</text>
    </svg>
  );
}

/* ── 02: AI-powered product dashboard ── */
function ProductAI() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes pd-bar1 { 0%,5%{height:0;y:90} 40%,100%{height:40px;y:50} }
        @keyframes pd-bar2 { 0%,15%{height:0;y:90} 50%,100%{height:55px;y:35} }
        @keyframes pd-bar3 { 0%,25%{height:0;y:90} 60%,100%{height:28px;y:62} }
        @keyframes pd-badge { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes pd-scan  { 0%{y:22} 100%{y:95} }
        .pd-b1 { animation: pd-bar1 3s ease-out infinite; }
        .pd-b2 { animation: pd-bar2 3s ease-out infinite; }
        .pd-b3 { animation: pd-bar3 3s ease-out infinite; }
        .pd-badge { animation: pd-badge 1.8s ease-in-out infinite; }
        .pd-scan  { animation: pd-scan 2.5s linear infinite; opacity:.15; }
      `}</style>

      {/* Frame */}
      <rect x="4" y="4" width="192" height="122" rx="2" stroke="var(--border)" strokeWidth="1" fill="rgba(0,0,0,.35)" />
      {/* Title bar */}
      <rect x="4" y="4" width="192" height="18" fill="rgba(168,255,60,.05)" rx="2" />
      <circle cx="16" cy="13" r="3" fill="var(--fg-muted)" />
      <circle cx="26" cy="13" r="3" fill="var(--fg-muted)" />
      <circle cx="36" cy="13" r="3" fill="var(--fg-muted)" />
      <text x="100" y="17" textAnchor="middle" fontSize="7" fill="var(--fg-dim)" fontFamily="monospace">product.analyze()</text>

      {/* Baseline */}
      <line x1="20" y1="90" x2="140" y2="90" stroke="var(--border)" strokeWidth="1" />

      {/* Bars */}
      <rect x="30" width="22" rx="1" fill="var(--fg-dim)" fillOpacity=".5" className="pd-b1" />
      <rect x="65" width="22" rx="1" fill="var(--accent)" fillOpacity=".7" className="pd-b2" />
      <rect x="100" width="22" rx="1" fill="var(--fg-dim)" fillOpacity=".4" className="pd-b3" />

      {/* Scan line */}
      <rect x="4" width="192" height="2" fill="var(--accent)" className="pd-scan" />

      {/* AI badge */}
      <rect x="148" y="70" width="40" height="20" rx="2" stroke="var(--accent)" strokeWidth="1" fill="rgba(168,255,60,.05)" className="pd-badge" />
      <text x="168" y="83" textAnchor="middle" fontSize="8" fill="var(--accent)" fontFamily="monospace" fontWeight="bold">4.2×</text>
      <text x="168" y="100" textAnchor="middle" fontSize="6" fill="var(--fg-muted)" fontFamily="monospace">output</text>
    </svg>
  );
}

/* ── 03: Integration hub ── */
function HubConnect() {
  const sats = [
    { x: 100, y: 15,  d: "0s",    label: "API" },
    { x: 175, y: 52,  d: ".5s",   label: "CRM" },
    { x: 160, y: 112, d: "1s",    label: "ERP" },
    { x: 40,  y: 112, d: "1.5s",  label: "DB" },
    { x: 25,  y: 52,  d: "2s",    label: "WH" },
  ];

  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes hub-sat  { 0%,100%{opacity:.25} 50%{opacity:1} }
        @keyframes hub-line { to{stroke-dashoffset:-24} }
        @keyframes hub-core { 0%,100%{opacity:.7} 50%{opacity:1} }
        .hub-sat  { animation: hub-sat  2.8s ease-in-out infinite; }
        .hub-line { stroke-dasharray:5 4; animation: hub-line 2s linear infinite; }
        .hub-core { animation: hub-core 2s ease-in-out infinite; }
      `}</style>

      {/* Center */}
      <circle cx="100" cy="65" r="18" stroke="var(--accent)" strokeWidth="1.5" fill="rgba(168,255,60,.07)" className="hub-core" />
      <circle cx="100" cy="65" r="8"  fill="var(--accent)" opacity=".9" />
      <text x="100" y="69" textAnchor="middle" fontSize="6.5" fill="var(--bg)" fontFamily="monospace" fontWeight="bold">AI</text>

      {/* Satellites */}
      {sats.map((s, i) => (
        <g key={i}>
          <line
            x1="100" y1="65" x2={s.x} y2={s.y}
            stroke="var(--fg-dim)" strokeWidth="1"
            className="hub-line"
            style={{ animationDelay: s.d }}
          />
          <circle
            cx={s.x} cy={s.y} r="9"
            stroke="var(--fg-dim)" strokeWidth="1"
            fill="rgba(0,0,0,.4)"
            className="hub-sat"
            style={{ animationDelay: s.d }}
          />
          <text
            x={s.x} y={s.y + 3}
            textAnchor="middle" fontSize="5.5"
            fill="var(--fg-dim)" fontFamily="monospace"
            className="hub-sat"
            style={{ animationDelay: s.d }}
          >
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ServiceGraphic({ n }: { n: string }) {
  if (n === "01") return <NeuralNet />;
  if (n === "02") return <ProductAI />;
  if (n === "03") return <HubConnect />;
  return null;
}
