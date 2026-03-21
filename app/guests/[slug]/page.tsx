import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guests, getGuestBySlug, getEpisodesByGuest } from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";

export async function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guest = getGuestBySlug(slug);
  if (!guest) return {};
  const title = `${guest.name} on the Joe Rogan Experience — All Episodes`;
  const desc = guest.bio || `Every JRE appearance by ${guest.name}, with full recaps, key moments, and everything mentioned.`;
  return {
    title,
    description: desc,
    openGraph: { title, description: desc },
    twitter: { card: "summary", title, description: desc },
  };
}

const AMAZON_TAG = "selfcaremap-20";
const AD_BRANDS = ["perplexity","hellofresh","ziprecruiter","squarespace","audible","draftkings","betterhelp","expressvpn","nordvpn","manscaped","athletic greens","ag1","roman","hims","keeps","mybookie","fanduel","prizepicks","underdog","betmgm"];

const socialStyle = {
  background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "4px",
  padding: "0.35rem 0.75rem", fontSize: "0.8rem",
  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 as const,
  textTransform: "uppercase" as const, letterSpacing: "0.06em",
  color: "#9A9A8A", textDecoration: "none" as const, display: "inline-flex" as const, alignItems: "center" as const, gap: "0.4rem",
};

export default async function GuestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guest = getGuestBySlug(slug);
  if (!guest) notFound();

  const guestEpisodes = getEpisodesByGuest(slug).sort((a, b) => (b.episodeNumber || 0) - (a.episodeNumber || 0));

  // Aggregate all products this guest has been associated with
  const allProducts = guestEpisodes
    .flatMap(ep => ep.products.map(p => ({ ...p, episodeSlug: ep.slug, episodeNumber: ep.episodeNumber })))
    .filter(p => !AD_BRANDS.some(b => p.name.toLowerCase().includes(b)));

  // Deduplicate by name
  const seen = new Set<string>();
  const uniqueProducts = allProducts.filter(p => {
    const key = p.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 12);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.25rem" }}>

      {/* Guest Bio Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p className="episode-number" style={{ marginBottom: "0.5rem" }}>
          {guestEpisodes.length} appearance{guestEpisodes.length !== 1 ? "s" : ""} on JRE
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)", color: "#F5F0E8", marginBottom: "1.25rem" }}>
          {guest.name}
        </h1>
        <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1.5rem", marginBottom: "1.25rem" }}>
          <p style={{ color: "#b0a898", lineHeight: 1.8, fontSize: "1rem", margin: 0 }}>
            {guest.bio && guest.bio.length > 60
              ? guest.bio
              : `${guest.name} is a recurring guest on the Joe Rogan Experience, having appeared ${guestEpisodes.length} time${guestEpisodes.length !== 1 ? "s" : ""}. Their conversations with Joe span a wide range of topics and consistently rank among the most-discussed episodes.`}
          </p>
        </div>

        {/* Social Links */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {guest.website && <a href={guest.website} target="_blank" rel="noopener noreferrer" style={socialStyle}>🌐 Website</a>}
          {guest.youtube && <a href={guest.youtube} target="_blank" rel="noopener noreferrer" style={socialStyle}>▶ YouTube</a>}
          {guest.twitter && <a href={guest.twitter} target="_blank" rel="noopener noreferrer" style={socialStyle}>𝕏 Twitter</a>}
          {guest.instagram && <a href={guest.instagram} target="_blank" rel="noopener noreferrer" style={socialStyle}>📸 Instagram</a>}
        </div>
      </div>

      {/* Products / Books associated with this guest */}
      {uniqueProducts.length > 0 && (
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.6rem", color: "#F5F0E8", marginBottom: "0.5rem" }}>Books and Products</h2>
          <p style={{ color: "#9A9A8A", fontSize: "0.85rem", marginBottom: "1rem" }}>
            Things mentioned across {guest.name}&apos;s JRE appearances — linked to Amazon.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.75rem" }}>
            {uniqueProducts.map((p, i) => (
              <a key={i} href={`https://www.amazon.com/s?k=${encodeURIComponent(p.name)}&tag=${AMAZON_TAG}`} target="_blank" rel="noopener noreferrer"
                className="product-card" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", color: "#F5F0E8", margin: 0 }}>{p.name}</p>
                  <span style={{ background: "#E85D04", color: "#fff", fontSize: "0.6rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", padding: "0.15rem 0.35rem", borderRadius: "3px", flexShrink: 0 }}>Amazon</span>
                </div>
                <p style={{ color: "#9A9A8A", fontSize: "0.8rem", margin: 0 }}>{p.description}</p>
              </a>
            ))}
          </div>
          <p style={{ color: "#555", fontSize: "0.75rem", marginTop: "0.75rem" }}>As an Amazon Associate we earn from qualifying purchases.</p>
        </section>
      )}

      {/* All Episodes */}
      <section>
        <h2 style={{ fontSize: "1.6rem", color: "#F5F0E8", marginBottom: "1rem" }}>
          All JRE Appearances ({guestEpisodes.length})
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {guestEpisodes.map((ep) => (
            <EpisodeCard key={ep.slug} episode={ep} />
          ))}
        </div>
      </section>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/guests" style={{ color: "#E85D04", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.9rem" }}>
          ← All Guests
        </Link>
      </div>
    </div>
  );
}
