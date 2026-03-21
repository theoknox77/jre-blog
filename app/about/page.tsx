import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About JREINDEX — The Complete Joe Rogan Experience Resource",
  description: "JREINDEX is the most complete Joe Rogan Experience resource on the internet. Every episode, every guest, every product mentioned — all in one place.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <p className="episode-number" style={{ marginBottom: "0.5rem" }}>About</p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F5F0E8", marginBottom: "2rem" }}>
        The Most Complete JRE Resource on the Internet
      </h1>

      <p style={{ color: "#b0a898", lineHeight: 1.8, fontSize: "1.1rem", marginBottom: "2rem" }}>
        JREINDEX is an independent fan project documenting every episode of the Joe Rogan Experience — from episode 1 to the present. Full recaps, key moments with timestamps, best quotes, and every book, supplement, and piece of gear mentioned in conversation.
      </p>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#F5F0E8", marginBottom: "1rem" }}>What You Get</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1rem" }}>
          {[
            { icon: "📋", title: "Full Episode Recaps", desc: "Every episode summarized with TLDR bullets and a detailed breakdown of what was discussed." },
            { icon: "⏱️", title: "Key Moments with Timestamps", desc: "The best moments from each episode, linked directly to the exact spot in the YouTube video." },
            { icon: "💬", title: "Best Quotes", desc: "The most memorable lines from Joe and his guests, pulled from each conversation." },
            { icon: "🛒", title: "Everything Mentioned", desc: "Books, supplements, gear, and more — every cool thing brought up in conversation, linked to Amazon." },
            { icon: "👤", title: "Guest Profiles", desc: "2,000+ guests documented with bios, social links, and all their JRE appearances in one place." },
            { icon: "🔍", title: "Fully Searchable", desc: "Find any guest, episode, or topic instantly. Browse by category or search across the full archive." },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1.25rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", color: "#F5F0E8", marginBottom: "0.4rem" }}>{title}</p>
              <p style={{ color: "#9A9A8A", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#F5F0E8", marginBottom: "1rem" }}>The Numbers</h2>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {[
            { num: "2,471+", label: "Episodes Documented" },
            { num: "2,000+", label: "Guests Indexed" },
            { num: "2014", label: "Earliest Episode" },
            { num: "10,000+", label: "Products & Books" },
          ].map(({ num, label }) => (
            <div key={label} style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1.25rem 1.5rem", textAlign: "center", minWidth: "140px" }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "2rem", color: "#E85D04", margin: "0 0 0.25rem" }}>{num}</p>
              <p style={{ color: "#9A9A8A", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#F5F0E8", marginBottom: "1rem" }}>Amazon Affiliate Disclosure</h2>
        <p style={{ color: "#b0a898", lineHeight: 1.8 }}>
          JREINDEX participates in the Amazon Associates Program. When you click a product link and make a purchase on Amazon, we may earn a small commission at no additional cost to you. This helps keep the site free and running. We only link to products that were actually mentioned on the podcast — never paid placements.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#F5F0E8", marginBottom: "1rem" }}>Disclaimer</h2>
        <p style={{ color: "#b0a898", lineHeight: 1.8 }}>
          JREINDEX is an independent fan resource. We are not affiliated with Joe Rogan, Spotify, or any podcast network. All episode content is sourced from publicly available YouTube videos and podcasts. Timestamps and quotes are generated from publicly available audio/video.
        </p>
      </section>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
        <Link href="/episodes" style={{ background: "#E85D04", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "6px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none" }}>
          Browse Episodes
        </Link>
        <Link href="/guests" style={{ background: "#111", color: "#F5F0E8", border: "1px solid #2a2a2a", padding: "0.75rem 1.5rem", borderRadius: "6px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none" }}>
          Browse Guests
        </Link>
        <Link href="/privacy" style={{ background: "#111", color: "#9A9A8A", border: "1px solid #2a2a2a", padding: "0.75rem 1.5rem", borderRadius: "6px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none" }}>
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
