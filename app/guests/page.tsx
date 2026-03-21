import type { Metadata } from "next";
import Link from "next/link";
import { guests, getEpisodesByGuest } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Guests",
  description:
    "Every guest who has appeared on the Joe Rogan Experience. Browse by name, see all episodes, and find every product they mentioned.",
};

export default function GuestsPage() {
  const guestsWithCount = guests
    .map((g) => ({ ...g, count: getEpisodesByGuest(g.slug).length }))
    .sort((a, b) => b.count - a.count);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#F5F0E8", marginBottom: "0.5rem" }}>
          All Guests
        </h1>
        <p style={{ color: "#9A9A8A" }}>
          {guestsWithCount.length} guests documented. Every appearance, every product mentioned.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {guestsWithCount.map((guest) => (
          <Link
            key={guest.slug}
            href={`/guests/${guest.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#111111",
                border: "1px solid #2a2a2a",
                borderRadius: "8px",
                padding: "1.5rem",
                transition: "border-color 0.2s",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    textTransform: "uppercase",
                    color: "#F5F0E8",
                    margin: 0,
                  }}
                >
                  {guest.name}
                </h2>
                <span
                  style={{
                    background: "#1a1a1a",
                    color: "#E85D04",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    flexShrink: 0,
                    marginLeft: "0.5rem",
                  }}
                >
                  {guest.count} {guest.count === 1 ? "episode" : "episodes"}
                </span>
              </div>
              <p
                style={{
                  color: "#9A9A8A",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {guest.bio}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
