"use client";
import Link from "next/link";
import { useState } from "react";
import { Episode } from "@/lib/data";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/episodes/${episode.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          background: "#111111",
          border: isHovered ? "1px solid #E85D04" : "1px solid #2a2a2a",
          borderRadius: "8px",
          overflow: "hidden",
          transition: "border-color 0.2s, transform 0.2s",
          cursor: "pointer",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail placeholder */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={`https://img.youtube.com/vi/${episode.youtubeId}/mqdefault.jpg`}
            alt={episode.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0.75rem",
              left: "0.75rem",
            }}
          >
            <span className="episode-number">JRE {episode.episodeNumber}</span>
          </div>
        </div>

        <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              textTransform: "uppercase",
              color: "#F5F0E8",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            {episode.guestName}
          </p>
          <p
            style={{
              color: "#9A9A8A",
              fontSize: "0.825rem",
              marginBottom: "0.75rem",
            }}
          >
            {new Date(episode.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p
            style={{
              color: "#b0a898",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {episode.tldr[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}
