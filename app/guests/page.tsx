"use client";
import { useState } from "react";
import Link from "next/link";
import { guests, getEpisodesByGuest, episodes } from "@/lib/data";

export default function GuestsPage() {
  // Build a map: guestSlug → latest episode youtubeId for thumbnail
  const guestThumb: Record<string, string> = {};
  [...episodes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach(ep => { if (ep.guestSlug && ep.youtubeId && !guestThumb[ep.guestSlug]) guestThumb[ep.guestSlug] = ep.youtubeId; });

  const guestsWithCount = guests
    .map((g) => ({ ...g, count: getEpisodesByGuest(g.slug).length, thumb: guestThumb[g.slug] || "" }))
    .sort((a, b) => b.count - a.count);

  const [query, setQuery] = useState("");
  const filtered = query.trim()
    ? guestsWithCount.filter(g => g.name.toLowerCase().includes(query.toLowerCase()))
    : guestsWithCount;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#F5F0E8", marginBottom: "0.5rem" }}>All Guests</h1>
        <p style={{ color: "#9A9A8A", marginBottom: "1.5rem" }}>
          {guestsWithCount.length} guests documented. Every appearance, every product mentioned.
        </p>
        <input
          type="search"
          placeholder="Search guests by name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: "100%", maxWidth: "480px",
            background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px",
            padding: "0.75rem 1rem", color: "#F5F0E8", fontSize: "1rem",
            outline: "none", fontFamily: "inherit",
          }}
        />
        {query && <p style={{ color: "#9A9A8A", fontSize: "0.85rem", marginTop: "0.75rem" }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "1rem" }}>
        {filtered.map((guest) => (
          <Link key={guest.slug} href={`/guests/${guest.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ background: "#111111", border: "1px solid #2a2a2a", borderRadius: "8px", overflow: "hidden", transition: "border-color 0.2s", cursor: "pointer", display: "flex", alignItems: "stretch" }}>
              {guest.thumb && (
                <div style={{ width: "90px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                  <img
                    src={`https://img.youtube.com/vi/${guest.thumb}/mqdefault.jpg`}
                    alt={guest.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    loading="lazy"
                  />
                </div>
              )}
              <div style={{ padding: "1rem 1.25rem", flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.2rem", textTransform: "uppercase", color: "#F5F0E8", margin: 0, lineHeight: 1.2 }}>
                    {guest.name}
                  </h2>
                  <span style={{ background: "#1a1a1a", color: "#E85D04", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.75rem", padding: "0.15rem 0.45rem", borderRadius: "4px", flexShrink: 0, marginLeft: "0.5rem", whiteSpace: "nowrap" }}>
                    {guest.count}×
                  </span>
                </div>
                <p style={{ color: "#9A9A8A", fontSize: "0.82rem", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {guest.bio || `${guest.name} has appeared on JRE ${guest.count} time${guest.count !== 1 ? "s" : ""}.`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: "#555", textAlign: "center", marginTop: "3rem" }}>No guests found for &ldquo;{query}&rdquo;</p>
      )}
    </div>
  );
}
