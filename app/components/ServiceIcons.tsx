type P = { className?: string; style?: React.CSSProperties };

export function MLIcon({ className, style }: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} style={style}>
      <line x1="6" y1="34" x2="6" y2="6"  stroke="currentColor" strokeWidth="1"   opacity="0.3"/>
      <line x1="6" y1="34" x2="34" y2="34" stroke="currentColor" strokeWidth="1"   opacity="0.3"/>
      <circle cx="11" cy="30" r="2"  fill="currentColor" opacity="0.6"/>
      <circle cx="17" cy="24" r="2"  fill="currentColor" opacity="0.6"/>
      <circle cx="22" cy="19" r="2"  fill="currentColor" opacity="0.6"/>
      <circle cx="27" cy="14" r="2"  fill="currentColor" opacity="0.6"/>
      <circle cx="32" cy="9"  r="2"  fill="currentColor" opacity="0.6"/>
      <line x1="8" y1="33" x2="34" y2="7"  stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2" opacity="0.55"/>
    </svg>
  );
}

export function DLIcon({ className, style }: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} style={style}>
      <circle cx="7"  cy="15" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.65"/>
      <circle cx="7"  cy="25" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.65"/>
      <circle cx="20" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.65"/>
      <circle cx="20" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.65"/>
      <circle cx="20" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.65"/>
      <circle cx="33" cy="20" r="3"   fill="currentColor"   opacity="0.85"/>
      <line x1="9.5" y1="15" x2="17.5" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.25"/>
      <line x1="9.5" y1="15" x2="17.5" y2="20" stroke="currentColor" strokeWidth="0.6" opacity="0.25"/>
      <line x1="9.5" y1="15" x2="17.5" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.25"/>
      <line x1="9.5" y1="25" x2="17.5" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.25"/>
      <line x1="9.5" y1="25" x2="17.5" y2="20" stroke="currentColor" strokeWidth="0.6" opacity="0.25"/>
      <line x1="9.5" y1="25" x2="17.5" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.25"/>
      <line x1="22.5" y1="10" x2="30"   y2="20" stroke="currentColor" strokeWidth="0.7" opacity="0.3"/>
      <line x1="22.5" y1="20" x2="30"   y2="20" stroke="currentColor" strokeWidth="0.7" opacity="0.3"/>
      <line x1="22.5" y1="30" x2="30"   y2="20" stroke="currentColor" strokeWidth="0.7" opacity="0.3"/>
    </svg>
  );
}

export function LLMIcon({ className, style }: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} style={style}>
      <rect x="5" y="5" width="30" height="30" rx="1.5" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="10" y1="13" x2="30" y2="13" stroke="currentColor" strokeWidth="1.3" opacity="0.4"/>
      <line x1="10" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1.3" opacity="0.4"/>
      <rect x="10" y="22" width="18" height="4" rx="0.5" fill="currentColor" opacity="0.15"/>
      <line x1="10" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.9"/>
      <line x1="29" y1="22" x2="29" y2="26" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="10" y1="30" x2="19" y2="30" stroke="currentColor" strokeWidth="1.3" opacity="0.22"/>
    </svg>
  );
}

export function AgentsIcon({ className, style }: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} style={style}>
      <circle cx="20" cy="20" r="4.5" stroke="currentColor" strokeWidth="1.5" opacity="0.9"/>
      <circle cx="20" cy="20" r="2"   fill="currentColor"   opacity="0.7"/>
      <circle cx="20" cy="7"  r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
      <circle cx="31" cy="28" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
      <circle cx="9"  cy="28" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
      <line x1="20"   y1="9.5"  x2="20"   y2="15.5" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 1.5" opacity="0.45"/>
      <line x1="28.8" y1="26.2" x2="24"   y2="23"   stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 1.5" opacity="0.45"/>
      <line x1="11.2" y1="26.2" x2="16"   y2="23"   stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 1.5" opacity="0.45"/>
    </svg>
  );
}

export function E2EIcon({ className, style }: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} style={style}>
      <rect x="5" y="5"  width="30" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.85"/>
      <rect x="5" y="16" width="30" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
      <rect x="5" y="27" width="30" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" fill="currentColor" fillOpacity="0.18"/>
      <line x1="18" y1="13.5" x2="20" y2="16" stroke="currentColor" strokeWidth="0.9" opacity="0.45"/>
      <line x1="20" y1="13"   x2="20" y2="16" stroke="currentColor" strokeWidth="0.9" opacity="0.45"/>
      <line x1="22" y1="13.5" x2="20" y2="16" stroke="currentColor" strokeWidth="0.9" opacity="0.45"/>
      <line x1="18" y1="24.5" x2="20" y2="27" stroke="currentColor" strokeWidth="0.9" opacity="0.45"/>
      <line x1="20" y1="24"   x2="20" y2="27" stroke="currentColor" strokeWidth="0.9" opacity="0.45"/>
      <line x1="22" y1="24.5" x2="20" y2="27" stroke="currentColor" strokeWidth="0.9" opacity="0.45"/>
    </svg>
  );
}

export const SERVICE_ICONS: Record<string, (props: P) => React.ReactElement> = {
  "machine-learning": MLIcon,
  "deep-learning":    DLIcon,
  "llm-custom":       LLMIcon,
  "agentes-ia":       AgentsIcon,
  "end-to-end":       E2EIcon,
};
