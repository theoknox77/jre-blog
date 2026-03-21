import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { episodes, getEpisodeBySlug, getEpisodesByGuest } from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";

export async function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) return {};
  return {
    title: `${ep.guestName} on JRE ${ep.episodeNumber} — Full Recap, Products and Transcript`,
    description: ep.tldr.slice(0, 2).join(". "),
    openGraph: {
      title: `${ep.guestName} — JRE ${ep.episodeNumber}`,
      description: ep.tldr[0],
      images: [`https://img.youtube.com/vi/${ep.youtubeId}/maxresdefault.jpg`],
    },
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) notFound();

  const related = getEpisodesByGuest(ep.guestSlug).filter((e) => e.slug !== ep.slug);
  const otherRelated = ep.relatedEpisodes
    .map((s) => episodes.find((e) => e.slug === s))
    .filter(Boolean)
    .slice(0, 3);
  const allRelated = [...related, ...otherRelated].slice(0, 3) as typeof episodes;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ep.title,
    datePublished: ep.date,
    description: ep.tldr[0],
    image: `https://img.youtube.com/vi/${ep.youtubeId}/maxresdefault.jpg`,
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
          padding: "2.5rem 1.25rem 2rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p className="episode-number" style={{ marginBottom: "0.5rem" }}>
            JRE {ep.episodeNumber} &middot;{" "}
            {new Date(ep.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "#F5F0E8",
              marginBottom: "1rem",
            }}
          >
            {ep.guestName}
          </h1>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {ep.tags.map((tag) => (
              <Link key={tag} href={`/topics/${tag}`} className="tag">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.25rem" }}>
        {/* YouTube Embed */}
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            borderRadius: "8px",
            background: "#111",
            marginBottom: "2.5rem",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${ep.youtubeId}`}
            title={ep.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>

        {/* Guest Bio */}
        <section
          style={{
            background: "#111111",
            border: "1px solid #2a2a2a",
            borderRadius: "8px",
            padding: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", color: "#F5F0E8", marginBottom: "0.75rem" }}>
            Who is {ep.guestName}?
          </h2>
          <p style={{ color: "#b0a898", lineHeight: 1.7, marginBottom: "1rem" }}>
            {ep.guestBio}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {ep.guestWebsite && (
              <a
                href={ep.guestWebsite}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: "4px",
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.8rem",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#9A9A8A",
                  textDecoration: "none",
                }}
              >
                Website
              </a>
            )}
            {ep.guestYoutube && (
              <a href={ep.guestYoutube} target="_blank" rel="noopener noreferrer"
                style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "0.4rem 0.8rem", fontSize: "0.8rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9A9A8A", textDecoration: "none" }}>
                YouTube
              </a>
            )}
            {ep.guestTwitter && (
              <a href={ep.guestTwitter} target="_blank" rel="noopener noreferrer"
                style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "0.4rem 0.8rem", fontSize: "0.8rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9A9A8A", textDecoration: "none" }}>
                X / Twitter
              </a>
            )}
            {ep.guestNetflix && (
              <a href={ep.guestNetflix} target="_blank" rel="noopener noreferrer"
                style={{ background: "#E85D04", border: "1px solid #E85D04", borderRadius: "4px", padding: "0.4rem 0.8rem", fontSize: "0.8rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff", textDecoration: "none" }}>
                Watch on Netflix
              </a>
            )}
          </div>
        </section>

        {/* TLDR */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>
            TLDR — Key Topics and Moments
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {ep.tldr.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  padding: "0.6rem 0",
                  borderBottom: "1px solid #1a1a1a",
                  color: "#b0a898",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: "#E85D04", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Recap */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1.25rem" }}>
            The Show
          </h2>
          {ep.recap.split("\n\n").map((para, i) => (
            <p key={i} style={{ color: "#b0a898", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              {para}
            </p>
          ))}
        </section>

        {/* Key Moments */}
        {ep.keyMoments.length > 0 && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>
              Key Moments
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {ep.keyMoments.map((moment, i) => (
                <a
                  key={i}
                  href={`https://www.youtube.com/watch?v=${ep.youtubeId}&t=${moment.seconds}s`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#111111",
                    border: "1px solid #2a2a2a",
                    borderRadius: "6px",
                    padding: "0.9rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                >
                  <span style={{ color: "#b0a898", fontSize: "0.9rem" }}>{moment.label}</span>
                  <span
                    style={{
                      color: "#E85D04",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      flexShrink: 0,
                      marginLeft: "1rem",
                    }}
                  >
                    {moment.timestamp}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Quotes */}
        {ep.quotes.length > 0 && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>
              Best Quotes
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {ep.quotes.map((q, i) => (
                <blockquote key={i} className="quote-card" style={{ margin: 0 }}>
                  "{q}"
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* Products */}
        {ep.products.length > 0 && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "0.5rem" }}>
              Products and Books Mentioned
            </h2>
            <p style={{ color: "#9A9A8A", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
              Everything brought up in this episode — linked to Amazon.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {ep.products.map((product, i) => (
                <a
                  key={i}
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-card"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        textTransform: "uppercase",
                        color: "#F5F0E8",
                        margin: 0,
                      }}
                    >
                      {product.name}
                    </p>
                    <span
                      style={{
                        background: "#E85D04",
                        color: "#fff",
                        fontSize: "0.65rem",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "0.2rem 0.4rem",
                        borderRadius: "3px",
                        flexShrink: 0,
                      }}
                    >
                      Amazon
                    </span>
                  </div>
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

        {/* Related */}
        {allRelated.length > 0 && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>
              Related Episodes
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              {allRelated.map((rel) => (
                <EpisodeCard key={rel.slug} episode={rel} />
              ))}
            </div>
          </section>
        )}

        {/* Full Transcript */}
        <details className="transcript-toggle" style={{ marginBottom: "2rem" }}>
          <summary>Full Transcript (click to expand)</summary>
          <div className="transcript-content">
            <p>{ep.transcript}</p>
            <p style={{ color: "#555", marginTop: "1rem" }}>
              Full transcript available. Auto-generated captions may contain errors.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
