import type { Metadata } from "next";
import { episodes } from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";

export const metadata: Metadata = {
  title: "All Episodes",
  description:
    "Browse every Joe Rogan Experience episode. Full recaps, transcripts, key moments, and every product mentioned — linked to Amazon.",
};

export default function EpisodesPage() {
  const sorted = [...episodes].sort((a, b) => b.episodeNumber - a.episodeNumber);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#F5F0E8", marginBottom: "0.5rem" }}>
          All Episodes
        </h1>
        <p style={{ color: "#9A9A8A" }}>
          {sorted.length} episodes documented. Every product mentioned, linked to Amazon.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {sorted.map((ep) => (
          <EpisodeCard key={ep.slug} episode={ep} />
        ))}
      </div>
    </div>
  );
}
