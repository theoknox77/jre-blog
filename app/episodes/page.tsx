"use client";

import { useState, useMemo } from "react";
import { episodes } from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";

export default function EpisodesPage() {
  const [query, setQuery] = useState("");

  const sorted = useMemo(() => [...episodes].sort((a, b) => b.episodeNumber - a.episodeNumber), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((ep) =>
      ep.guestName.toLowerCase().includes(q) ||
      ep.episodeNumber.toString().includes(q) ||
      (ep.tags || []).some((t: string) => t.toLowerCase().includes(q)) ||
      (ep.tldr || []).some((t: string) => t.toLowerCase().includes(q))
    );
  }, [query, sorted]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#F5F0E8", marginBottom: "0.5rem" }}>
          All Episodes
        </h1>
        <p style={{ color: "#9A9A8A", marginBottom: "1.5rem" }}>
          {episodes.length} episodes documented. Every product mentioned, linked to Amazon.
        </p>

        {/* Search bar */}
        <div style={{ position: "relative", maxWidth: "520px" }}>
          <span style={{
            position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
            color: "#555", fontSize: "1.1rem", pointerEvents: "none"
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search by guest, episode number, or topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem 0.85rem 2.75rem",
              background: "#111",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              color: "#F5F0E8",
              fontSize: "1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "1.1rem"
              }}
            >✕</button>
          )}
        </div>

        {query && (
          <p style={{ color: "#9A9A8A", marginTop: "0.75rem", fontSize: "0.9rem" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "#555" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>No episodes found</p>
          <p style={{ fontSize: "0.9rem" }}>Try a different guest name or episode number</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.25rem",
        }}>
          {filtered.map((ep) => (
            <EpisodeCard key={ep.slug} episode={ep} />
          ))}
        </div>
      )}
    </div>
  );
}
