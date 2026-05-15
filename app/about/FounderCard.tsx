"use client";

type Props = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin: string;
};

export default function FounderCard({ name, role, bio, photo, linkedin }: Props) {
  return (
    <div className="flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Photo */}
      <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", filter: "grayscale(20%)" }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-mono font-bold" style={{ fontSize: "1rem", color: "var(--fg)" }}>{name}</h2>
          <span className="font-mono uppercase tracking-widest" style={{ fontSize: "0.6rem", color: "var(--accent)", opacity: 0.7 }}>{role}</span>
        </div>
        <p className="font-mono" style={{ fontSize: "0.73rem", color: "var(--fg-dim)", lineHeight: 1.8 }}>{bio}</p>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono uppercase tracking-widest"
          style={{ fontSize: "0.68rem", color: "var(--fg-dim)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, width: "fit-content" }}
          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}
        >
          LinkedIn →
        </a>
      </div>

    </div>
  );
}
