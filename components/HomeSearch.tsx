"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { episodes, guests } from "@/lib/data";

type Result = {
  type: "episode" | "guest";
  label: string;
  sub: string;
  href: string;
};

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    const out: Result[] = [];

    // Episode number match
    const numMatch = q.match(/^#?(\d+)$/);
    if (numMatch) {
      const num = parseInt(numMatch[1]);
      const ep = episodes.find(e => e.episodeNumber === num);
      if (ep) out.push({ type: "episode", label: `JRE ${ep.episodeNumber} — ${ep.guestName}`, sub: ep.date ? new Date(ep.date).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "", href: `/episodes/${ep.slug}` });
    }

    // Guest name search
    const guestMatches = guests.filter(g => g.name.toLowerCase().includes(q)).slice(0, 4);
    for (const g of guestMatches) {
      const count = episodes.filter(e => e.guestSlug === g.slug).length;
      out.push({ type: "guest", label: g.name, sub: `${count} episode${count !== 1 ? "s" : ""}`, href: `/guests/${g.slug}` });
    }

    // Episode guest name search (for multi-word or partial)
    if (out.length < 6) {
      const epMatches = episodes.filter(e =>
        e.guestName.toLowerCase().includes(q) &&
        !guestMatches.some(g => g.name.toLowerCase() === e.guestName.toLowerCase())
      ).slice(0, 4);
      for (const ep of epMatches) {
        out.push({ type: "episode", label: `JRE ${ep.episodeNumber} — ${ep.guestName}`, sub: ep.date ? new Date(ep.date).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "", href: `/episodes/${ep.slug}` });
      }
    }

    return out.slice(0, 7);
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", maxWidth: "560px", margin: "0 auto" }}>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#555", pointerEvents: "none", fontSize: "1.1rem" }}>🔍</span>
        <input
          type="search"
          placeholder="Search by guest name or episode number..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          style={{
            width: "100%", boxSizing: "border-box",
            background: "#111", border: "2px solid #2a2a2a",
            borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem",
            color: "#F5F0E8", fontSize: "1rem", outline: "none",
            fontFamily: "inherit", transition: "border-color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#E85D04")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = query ? "#E85D04" : "#2a2a2a")}
        />
      </div>
      {open && results.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px",
          overflow: "hidden", zIndex: 100, boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
        }}>
          {results.map((r, i) => (
            <Link key={i} href={r.href} onClick={() => { setOpen(false); setQuery(""); }}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderBottom: i < results.length - 1 ? "1px solid #1a1a1a" : "none", textDecoration: "none", transition: "background 0.1s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1a1a1a")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: "0.9rem", opacity: 0.7, flexShrink: 0 }}>{r.type === "guest" ? "👤" : "🎙️"}</span>
              <span style={{ flex: 1 }}>
                <span style={{ color: "#F5F0E8", fontSize: "0.95rem", display: "block" }}>{r.label}</span>
                {r.sub && <span style={{ color: "#555", fontSize: "0.8rem" }}>{r.sub}</span>}
              </span>
              <span style={{ color: "#E85D04", fontSize: "0.75rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase" }}>
                {r.type === "guest" ? "Profile" : "Episode"}
              </span>
            </Link>
          ))}
        </div>
      )}
      {open && query.trim().length >= 2 && results.length === 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1rem", zIndex: 100, color: "#555", fontSize: "0.875rem" }}>
          No results for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
