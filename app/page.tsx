import type { Metadata } from "next";
import Link from "next/link";
import { episodes, topics } from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";
import HomeSearch from "@/components/HomeSearch";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  metadataBase: new URL("https://jreindex.com"),
  title: "JREINDEX — Every Joe Rogan Episode. Every Guest. Everything Ever Mentioned.",
  description: "The most complete Joe Rogan Experience resource on the internet. Full episode recaps, transcripts, key moments with timestamps, and every book and cool thing they mentioned.",
  openGraph: {
    title: "JREINDEX — The Ultimate JRE Resource",
    description: "Every episode documented. Every guest indexed. Every cool thing mentioned — linked to Amazon.",
    images: [{ url: "https://jreindex.com/jre-curtain.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JREINDEX — Every JRE Episode, Guest & Product",
    description: "The most complete Joe Rogan Experience resource on the internet.",
    images: ["https://jreindex.com/jre-curtain.jpg"],
  },
};

const TOPIC_EMOJIS: Record<string, string> = {
  comedy: "😂",
  conspiracy: "👽",
  science: "🔬",
  health: "💪",
  mma: "🥊",
  hunting: "🦌",
  dmt: "🌀",
  politics: "🏛️",
};

export default function HomePage() {
  const latestEpisodes = episodes.slice(0, 12);

  return (
    <div>
      {/* Hero */}
      <section
        className="jre-hero-bg"
        style={{
          padding: "5rem 1.25rem 4rem",
          textAlign: "center",
          position: "relative",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        {/* Alien silhouette decoration */}
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "2rem",
            opacity: 0.06,
            fontSize: "8rem",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          👽
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "2rem",
            opacity: 0.06,
            fontSize: "5rem",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          🦌
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#E85D04",
              marginBottom: "1rem",
            }}
          >
            The Ultimate JRE Resource
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              marginBottom: "1.5rem",
              color: "#F5F0E8",
            }}
          >
            Every JRE Episode.{" "}
            <span style={{ color: "#E85D04" }}>Every Guest.</span>{" "}
            Everything Ever Mentioned.
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "#9A9A8A",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            The most complete Joe Rogan Experience resource on the internet. Full episode recaps,
            transcripts, key moments with timestamps, and every book and cool thing they mentioned.
          </p>
          <div style={{ width: "100%", marginBottom: "2rem" }}>
            <HomeSearch />
          </div>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link
              href="/episodes"
              style={{
                background: "#E85D04",
                color: "#fff",
                padding: "0.85rem 2rem",
                borderRadius: "6px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              Browse All Episodes
            </Link>
            <Link
              href="/guests"
              style={{
                background: "#F5F0E8",
                color: "#0a0a0a",
                padding: "0.85rem 2rem",
                borderRadius: "6px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              Browse Guests
            </Link>
          </div>
        </div>
      </section>

      {/* Ad — between hero and content */}
      {/* Stats Bar */}
      <section style={{ background: "#0a0a0a", borderBottom: "1px solid #1a1a1a", padding: "1.75rem 1.25rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem", textAlign: "center" }}>
          {[
            { num: "2,501", label: "Episodes" },
            { num: "2,024", label: "Guest Profiles" },
            { num: "2,420", label: "Episode Recaps" },
            { num: "10,436", label: "Quotes" },
            { num: "1,152", label: "Products Mentioned" },
            { num: "10,460", label: "Key Moments" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#E85D04", lineHeight: 1, marginBottom: "0.3rem" }}>{num}</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#9A9A8A", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        style={{
          padding: "4rem 1.25rem",
          borderBottom: "1px solid #1a1a1a",
          background: "#0d0d0d",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#F5F0E8",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            How It Works
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
            className="how-it-works-grid"
          >
            {[
              {
                icon: "🔍",
                title: "Find Your Episode",
                desc: "Search by guest name, topic, or episode number. Every episode from day one is here.",
              },
              {
                icon: "📋",
                title: "Read the Full Breakdown",
                desc: "TLDR bullets, a full recap, key moments with timestamps, and the best quotes — all in one place.",
              },
              {
                icon: "🛒",
                title: "Shop Everything Mentioned",
                desc: "Books, supplements, gear, and more — every cool thing brought up across 2,501 episodes, linked straight to Amazon.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#111111",
                  border: "1px solid #2a2a2a",
                  borderRadius: "8px",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{icon}</div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    color: "#F5F0E8",
                    marginBottom: "0.75rem",
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: "#9A9A8A", lineHeight: 1.6, fontSize: "0.95rem" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section style={{ padding: "4rem 1.25rem", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#F5F0E8" }}>
              Latest Episodes
            </h2>
            <Link
              href="/episodes"
              style={{
                color: "#E85D04",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              View All
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {latestEpisodes.map((ep) => (
              <EpisodeCard key={ep.slug} episode={ep} />
            ))}
          </div>
        </div>
      </section>

      {/* Ad between Latest Episodes and Topics */}
      <AdSlot slot="2847361590" format="horizontal" style={{ padding: "0.5rem 0", background: "#0a0a0a" }} />

      {/* Topics */}
      <section
        style={{
          padding: "4rem 1.25rem",
          background: "#0d0d0d",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#F5F0E8",
              marginBottom: "2rem",
            }}
          >
            Browse by Topic
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                style={{
                  background: "#111111",
                  border: "1px solid #2a2a2a",
                  borderRadius: "6px",
                  padding: "0.75rem 1.25rem",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#F5F0E8",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                <span>{TOPIC_EMOJIS[topic.slug] || "🎙️"}</span>
                {topic.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO text block */}
      <section style={{ padding: "3rem 1.25rem", background: "#0a0a0a" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.8 }}>
            JREClips documents every episode of the Joe Rogan Experience podcast. Each episode page includes a full recap,
            TLDR summary, key moments with YouTube timestamps, guest biography and social links, every product and book mentioned
            with Amazon links, and the full episode transcript for reference. We cover science episodes, MMA episodes, comedy guests,
            political conversations, UFO and conspiracy discussions, health and fitness content, and everything in between.
            Updated weekly as new episodes are released.
          </p>
        </div>
      </section>
    </div>
  );
}
