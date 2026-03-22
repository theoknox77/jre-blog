"use client";

import { useState, useMemo, useEffect } from "react";
import { episodes } from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";

type SearchEntry = {
  slug: string;
  n: number;
  g: string;
  t: string[];
  d: string[];
  tx?: string;
};

export default function EpisodesPage() {
  const [query, setQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState<SearchEntry[]>([]);

  const sorted = useMemo(() => [...episodes].sort((a, b) => b.episodeNumber - a.episodeNumber), []);

  // Load search index once
  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data) => setSearchIndex(data))
      .catch(() => {});
  }, []);

  const episodeMap = useMemo(() => {
    const map = new Map<string, (typeof episodes)[0]>();
    for (const ep of episodes) map.set(ep.slug, ep);
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;

    // Score each episode
    const scored: Array<{ ep: (typeof episodes)[0]; score: number }> = [];

    for (const entry of searchIndex) {
      let score = 0;
      const ep = episodeMap.get(entry.slug);
      if (!ep) continue;

      const guestLower = entry.g.toLowerCase();
      const epStr = entry.n.toString();

      // Guest name match — highest priority
      if (guestLower.includes(q)) score += 100;
      // Episode number exact match
      if (epStr === q) score += 200;
      // Tags
      if (entry.t.some((t) => t.toLowerCase().includes(q))) score += 50;
      // TLDR bullets
      if (entry.d.some((d) => d.toLowerCase().includes(q))) score += 30;
      // Transcript excerpt
      if (entry.tx && entry.tx.toLowerCase().includes(q)) score += 20;

      if (score > 0) scored.push({ ep, score });
    }

    // Fallback: if no transcript index hits, search episodes data directly
    if (scored.length === 0) {
      return sorted.filter((ep) =>
        ep.guestName.toLowerCase().includes(q) ||
        ep.episodeNumber.toString().includes(q) ||
        (ep.tags || []).some((t: string) => t.toLowerCase().includes(q)) ||
        (ep.tldr || []).some((t: string) => t.toLowerCase().includes(q))
      );
    }

    return scored
      .sort((a, b) => b.score - a.score || b.ep.episodeNumber - a.ep.episodeNumber)
      .map((s) => s.ep);
  }, [query, sorted, searchIndex, episodeMap]);

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
        <div style={{ position: "relative", maxWidth: "560px" }}>
          <span style={{
            position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
            color: "#555", fontSize: "1.1rem", pointerEvents: "none"
          }}>🔍</span>
          <input
            type="text"
            placeholder='Search guests, topics, or anything said on the show...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.9rem 2.75rem 0.9rem 2.75rem",
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
                background: "none", border: "none", color: "#555", cursor: "pointer",
                fontSize: "1.2rem", padding: "0.25rem", minHeight: "unset"
              }}
            >✕</button>
          )}
        </div>

        {query && (
          <p style={{ color: "#9A9A8A", marginTop: "0.75rem", fontSize: "0.9rem" }}>
            {filtered.length === 0
              ? `No episodes found for "${query}"`
              : `${filtered.length} episode${filtered.length !== 1 ? "s" : ""} matching "${query}"`}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "#555" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>No episodes found</p>
          <p style={{ fontSize: "0.9rem" }}>Try a different guest name or topic</p>
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
