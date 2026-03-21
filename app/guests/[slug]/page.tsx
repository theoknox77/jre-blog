import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guests, getGuestBySlug, getEpisodesByGuest } from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";

export async function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guest = getGuestBySlug(slug);
  if (!guest) return {};
  const count = getEpisodesByGuest(slug).length;
  return {
    title: `${guest.name} — All JRE Appearances (${count} Episodes)`,
    description: `${guest.name} has appeared on the Joe Rogan Experience ${count} time${count === 1 ? "" : "s"}. ${guest.bio}`,
    openGraph: {
      title: `${guest.name} on JRE`,
      description: `All ${count} Joe Rogan Experience appearances by ${guest.name}`,
    },
  };
}

export default async function GuestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = getGuestBySlug(slug);
  if (!guest) notFound();

  const guestEpisodes = getEpisodesByGuest(slug).sort(
    (a, b) => b.episodeNumber - a.episodeNumber
  );

  // Aggregate all products across episodes
  const allProducts = guestEpisodes.flatMap((ep) => ep.products);
  const uniqueProducts = allProducts.filter(
    (p, i, arr) => arr.findIndex((pp) => pp.name === p.name) === i
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: guest.name,
    description: guest.bio,
    url: guest.website || undefined,
    sameAs: [guest.twitter, guest.youtube, guest.instagram].filter(Boolean),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div
        style={{
          background: "#0d0d0d",
          borderBottom: "1px solid #1a1a1a",
          padding: "3rem 1.25rem 2.5rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p className="episode-number" style={{ marginBottom: "0.5rem" }}>
            {guestEpisodes.length} JRE {guestEpisodes.length === 1 ? "Appearance" : "Appearances"}
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "#F5F0E8",
              marginBottom: "1rem",
            }}
          >
            {guest.name}
          </h1>
          <p style={{ color: "#b0a898", lineHeight: 1.7, maxWidth: "650px", marginBottom: "1.25rem" }}>
            {guest.bio}
          </p>
          {guest.latestProject && (
            <p style={{ color: "#E85D04", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
              Latest: {guest.latestProject}
            </p>
          )}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {guest.website && (
              <a href={guest.website} target="_blank" rel="noopener noreferrer"
                style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "0.4rem 0.8rem", fontSize: "0.8rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9A9A8A", textDecoration: "none" }}>
                Website
              </a>
            )}
            {guest.youtube && (
              <a href={guest.youtube} target="_blank" rel="noopener noreferrer"
                style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "0.4rem 0.8rem", fontSize: "0.8rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9A9A8A", textDecoration: "none" }}>
                YouTube
              </a>
            )}
            {guest.twitter && (
              <a href={guest.twitter} target="_blank" rel="noopener noreferrer"
                style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "0.4rem 0.8rem", fontSize: "0.8rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9A9A8A", textDecoration: "none" }}>
                X / Twitter
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.25rem" }}>
        {/* All Episodes */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1.25rem" }}>
            All JRE Appearances
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {guestEpisodes.map((ep) => (
              <EpisodeCard key={ep.slug} episode={ep} />
            ))}
          </div>
        </section>

        {/* Products mentioned */}
        {uniqueProducts.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "0.5rem" }}>
              Products and Books {guest.name} Has Mentioned
            </h2>
            <p style={{ color: "#9A9A8A", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
              Everything mentioned across all appearances — linked to Amazon.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {uniqueProducts.map((product, i) => (
                <a
                  key={i}
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-card"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      textTransform: "uppercase",
                      color: "#F5F0E8",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {product.name}
                  </p>
                  <p style={{ color: "#9A9A8A", fontSize: "0.825rem", margin: 0 }}>
                    {product.description}
                  </p>
                </a>
              ))}
            </div>
            <p style={{ color: "#555", fontSize: "0.75rem", marginTop: "1rem" }}>
              As an Amazon Associate we earn from qualifying purchases.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
