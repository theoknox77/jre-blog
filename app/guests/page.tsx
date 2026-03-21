"use client";
import { useState } from "react";
import Link from "next/link";
import { guests, getEpisodesByGuest } from "@/lib/data";

export default function GuestsPage() {
  const guestsWithCount = guests
    .map((g) => ({ ...g, count: getEpisodesByGuest(g.slug).length }))
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
            <div style={{ background: "#111111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1.5rem", transition: "border-color 0.2s", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.3rem", textTransform: "uppercase", color: "#F5F0E8", margin: 0 }}>
                  {guest.name}
                </h2>
                <span style={{ background: "#1a1a1a", color: "#E85D04", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "0.2rem 0.5rem", borderRadius: "4px", flexShrink: 0, marginLeft: "0.5rem" }}>
                  {guest.count} {guest.count === 1 ? "episode" : "episodes"}
                </span>
              </div>
              <p style={{ color: "#9A9A8A", fontSize: "0.9rem", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {guest.bio || `${guest.name} has appeared on the Joe Rogan Experience ${guest.count} time${guest.count !== 1 ? "s" : ""}.`}
              </p>
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
