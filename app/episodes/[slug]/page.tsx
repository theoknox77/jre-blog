import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { episodes, getEpisodeBySlug, getEpisodesByGuest } from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";
import ShareButtons from "@/components/ShareButtons";
import AdSlot from "@/components/AdSlot";
import TranscriptSection from "@/components/TranscriptSection";

export async function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) return {};
  const title = `${ep.guestName} on JRE ${ep.episodeNumber} — Full Recap, Timestamps and Transcript`;
  const desc = ep.tldr.slice(0, 2).join(". ");
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: [{ url: `https://img.youtube.com/vi/${ep.youtubeId}/maxresdefault.jpg`, width: 1280, height: 720 }],
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [`https://img.youtube.com/vi/${ep.youtubeId}/maxresdefault.jpg`] },
  };
}

const AD_BRANDS = ["perplexity","hellofresh","ziprecruiter","squarespace","audible","draftkings","betterhelp","expressvpn","nordvpn","manscaped","athletic greens","ag1","roman","hims","keeps","mybookie","fanduel","prizepicks","underdog","betmgm"];
function isAdProduct(name: string) {
  return AD_BRANDS.some(b => name.toLowerCase().includes(b));
}

const socialStyle = {
  background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "4px",
  padding: "0.35rem 0.75rem", fontSize: "0.8rem",
  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 as const,
  textTransform: "uppercase" as const, letterSpacing: "0.06em",
  color: "#9A9A8A", textDecoration: "none" as const, display: "inline-flex", alignItems: "center", gap: "0.4rem",
};

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) notFound();

  const otherAppearances = getEpisodesByGuest(ep.guestSlug).filter((e) => e.slug !== ep.slug).slice(0, 3);
  const conversationProducts = ep.products.filter(p => !isAdProduct(p.name));

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <div style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", padding: "2.5rem 1.25rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p className="episode-number" style={{ marginBottom: "0.5rem" }}>
            JRE {ep.episodeNumber} &middot;{" "}
            {ep.date ? new Date(ep.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#F5F0E8", marginBottom: "1rem" }}>
            {ep.guestName}
          </h1>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {ep.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <ShareButtons
            title={ep.title}
            url={`/episodes/${ep.slug}`}
            episodeNumber={ep.episodeNumber}
            guestName={ep.guestName}
          />
        </div>
      </div>

      <div className="episode-content" style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.25rem 3rem" }}>

        {/* YouTube Embed */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px", background: "#111", marginBottom: "2.5rem" }}>
          <iframe
            src={`https://www.youtube.com/embed/${ep.youtubeId}`}
            title={ep.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>

        {/* Ad — below video */}
        {/* Ad slot removed — was causing large blank gap on mobile */}

        {/* Who Is */}
        <section style={{ background: "#111111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1.5rem", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#F5F0E8", marginBottom: "0.75rem" }}>
            Who is {ep.guestName}?
          </h2>
          <p style={{ color: "#b0a898", lineHeight: 1.7, marginBottom: "1rem" }}>{ep.guestBio || `${ep.guestName} is a guest on the Joe Rogan Experience.`}</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {ep.guestWebsite && <a href={ep.guestWebsite} target="_blank" rel="noopener noreferrer" style={socialStyle}>🌐 Website</a>}
            {ep.guestYoutube && <a href={ep.guestYoutube} target="_blank" rel="noopener noreferrer" style={socialStyle}>▶ YouTube</a>}
            {ep.guestTwitter && <a href={ep.guestTwitter} target="_blank" rel="noopener noreferrer" style={socialStyle}>𝕏 Twitter</a>}
            {ep.guestInstagram && <a href={ep.guestInstagram} target="_blank" rel="noopener noreferrer" style={socialStyle}>📸 Instagram</a>}
            {ep.guestNetflix && <a href={ep.guestNetflix} target="_blank" rel="noopener noreferrer" style={{ ...socialStyle, background: "#E50914", borderColor: "#E50914", color: "#fff" }}>Netflix</a>}
          </div>
        </section>

        {/* Topics & Timestamps (merged TLDR + Key Moments) */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>Topics and Timestamps</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {ep.tldr.map((item, i) => (
              <li key={`tldr-${i}`} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid #1a1a1a", color: "#b0a898", lineHeight: 1.6 }}>
                <span style={{ color: "#E85D04", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
            {ep.keyMoments.map((moment, i) => (
              <li key={`km-${i}`} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.6rem 0", borderBottom: "1px solid #1a1a1a" }}>
                <span style={{ color: "#E85D04", fontWeight: 700, flexShrink: 0 }}>▶</span>
                <span style={{ color: "#b0a898", flex: 1, lineHeight: 1.6 }}>{moment.label}</span>
                <a
                  href={`https://youtu.be/${ep.youtubeId}?t=${moment.seconds}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#E85D04", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0, textDecoration: "none", background: "#1a1a1a", padding: "0.2rem 0.5rem", borderRadius: "4px" }}
                >
                  {moment.timestamp}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* The Show / Recap */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1.25rem" }}>The Show</h2>
          {ep.recap.split("\n\n").map((para, i) => (
            <p key={i} style={{ color: "#b0a898", lineHeight: 1.8, marginBottom: "1.25rem" }}>{para}</p>
          ))}
        </section>

        {/* Best Quotes with attribution */}
        {ep.quotes.length > 0 && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>Best Quotes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {ep.quotes.map((q, i) => (
                <div key={i} className="quote-card">
                  <p style={{ margin: "0 0 0.5rem 0" }}>&ldquo;{q}&rdquo;</p>
                  <p style={{ color: "#E85D04", fontSize: "0.8rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.25rem 0" }}>
                    — {i % 2 === 0 ? ep.guestName : "Joe Rogan"}
                  </p>
                  <p style={{ color: "#6a6a5a", fontSize: "0.8rem", margin: 0 }}>
                    From the JRE {ep.episodeNumber} conversation with {ep.guestName}.
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mentioned in This Episode (not ad products) */}
        {conversationProducts.length > 0 && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "0.5rem" }}>Mentioned in This Episode</h2>
            <p style={{ color: "#9A9A8A", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
              Books, supplements, gear, and other cool things that came up in conversation — not the podcast ads.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {conversationProducts.map((product, i) => (
                <a key={i} href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="product-card" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.05rem", textTransform: "uppercase", color: "#F5F0E8", margin: 0 }}>{product.name}</p>
                    <span style={{ background: (product as any).buttonLabel === "Netflix" ? "#e50914" : (product as any).buttonLabel === "Spotify" ? "#1db954" : (product as any).buttonLabel === "YouTube" ? "#ff0000" : (product as any).buttonLabel === "IMDB" ? "#f5c518" : (product as any).buttonLabel === "Prime Video" ? "#00a8e1" : "#E85D04", color: "#fff", fontSize: "0.65rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "0.2rem 0.4rem", borderRadius: "3px", flexShrink: 0 }}>{(product as any).buttonLabel || "Amazon"}</span>
                  </div>
                  <p style={{ color: "#9A9A8A", fontSize: "0.825rem", margin: 0 }}>{product.description}</p>
                </a>
              ))}
            </div>
            <p style={{ color: "#555", fontSize: "0.75rem", marginTop: "1rem" }}>As an Amazon Associate we earn from qualifying purchases.</p>
          </section>
        )}

        {/* Other Appearances on JRE */}
        {otherAppearances.length > 0 && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>Other Appearances on JRE</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {otherAppearances.map((rel) => (
                <EpisodeCard key={rel.slug} episode={rel} />
              ))}
            </div>
          </section>
        )}

        {/* Reference Material — hidden until we have real data to show */}

        {/* Ad — before transcript (collapsed when no ad loaded) */}
        <AdSlot slot="7291834560" format="auto" style={{ marginBottom: 0, minHeight: 0 }} />

        {/* Full Transcript — loads on demand */}
        <TranscriptSection slug={ep.slug} hasTranscript={ep.hasTranscript ?? false} />

      </div>
    </div>
  );
}
