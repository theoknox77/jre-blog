"use client";
import { useState, useMemo } from "react";
import { episodes } from "@/lib/data";

const AD_BRANDS = ["perplexity","hellofresh","ziprecruiter","squarespace","audible","draftkings","betterhelp","expressvpn","nordvpn","manscaped","athletic greens","ag1","roman","hims","keeps","mybookie","fanduel","prizepicks","underdog","betmgm","onnit ad","cash app","door dash","doordash"];

const CATEGORIES = ["All", "Books", "Film", "Fitness Equipment", "Food & Drink", "Health", "Music", "Podcasts", "Sports", "Supplements", "Tech", "Other"];

export default function MentionedPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const allProducts = useMemo(() => {
    const products = episodes.flatMap(ep =>
      ep.products
        .filter(p => !AD_BRANDS.some(b => p.name.toLowerCase().includes(b)))
        .map(p => ({ ...p, episodeNumber: ep.episodeNumber, guestName: ep.guestName, episodeSlug: ep.slug }))
    );
    // Deduplicate by name
    const seen = new Set<string>();
    return products.filter(p => {
      const key = p.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const filtered = useMemo(() => {
    return allProducts.filter(p => {
      const matchesQuery = !query.trim() || p.name.toLowerCase().includes(query.toLowerCase()) || p.description?.toLowerCase().includes(query.toLowerCase());
      const matchesCat = activeCategory === "All" || p.category === activeCategory;
      return matchesQuery && matchesCat;
    });
  }, [allProducts, query, activeCategory]);

  // Bucket by category, sorted alphabetically within each
  const byCategory = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    for (const p of filtered) {
      const cat = (p.category || "Other").trim();
      if (!map[cat]) map[cat] = [];
      map[cat].push(p);
    }
    // Sort each bucket alphabetically by product name
    for (const cat in map) {
      map[cat].sort((a, b) => a.name.localeCompare(b.name));
    }
    return map;
  }, [filtered]);

  // Sort categories: Books first, Other last, rest alphabetical
  const sortedCategories = useMemo(() => {
    if (activeCategory !== "All") return [activeCategory];
    return Object.keys(byCategory).sort((a, b) => {
      if (a === "Books") return -1;
      if (b === "Books") return 1;
      if (a === "Other") return 1;
      if (b === "Other") return -1;
      return a.localeCompare(b);
    });
  }, [byCategory, activeCategory]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#F5F0E8", marginBottom: "0.5rem" }}>
        Everything Mentioned on JRE
      </h1>
      <p style={{ color: "#9A9A8A", marginBottom: "0.5rem" }}>
        Books, supplements, gear, and more — every cool thing brought up in conversation across {episodes.length} episodes. Not the podcast ads. The real stuff.
      </p>
      <p style={{ color: "#555", fontSize: "0.8rem", marginBottom: "2rem" }}>
        As an Amazon Associate we earn from qualifying purchases.
      </p>

      {/* Search + Filter */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
        <input
          type="search"
          placeholder="Search by name or description..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: "100%", maxWidth: "480px",
            background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px",
            padding: "0.75rem 1rem", color: "#F5F0E8", fontSize: "1rem",
            outline: "none", fontFamily: "inherit",
          }}
        />
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? "#E85D04" : "#111",
                color: activeCategory === cat ? "#fff" : "#9A9A8A",
                border: `1px solid ${activeCategory === cat ? "#E85D04" : "#2a2a2a"}`,
                borderRadius: "50px",
                padding: "0.4rem 1rem",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <p style={{ color: "#9A9A8A", fontSize: "0.85rem" }}>{filtered.length.toLocaleString()} items</p>
      </div>

      {/* Products by category */}
      {sortedCategories.map(cat => (
        <section key={cat} style={{ marginBottom: "4rem", paddingTop: "1rem" }} id={cat.toLowerCase().replace(/\s+/g, "-")}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", borderBottom: "2px solid #E85D04", paddingBottom: "0.75rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "2rem", textTransform: "uppercase", color: "#F5F0E8", margin: 0 }}>
              {cat}
            </h2>
            <span style={{ color: "#9A9A8A", fontSize: "0.85rem" }}>{(byCategory[cat] || []).length} items</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "1rem" }}>
            {(byCategory[cat] || []).map((product, i) => (
              <a key={i} href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="product-card" style={{ textDecoration: "none", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.05rem", textTransform: "uppercase", color: "#F5F0E8", margin: 0 }}>
                      {product.name}
                    </p>
                    <span style={{ background: "#E85D04", color: "#fff", fontSize: "0.6rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "0.2rem 0.4rem", borderRadius: "3px", flexShrink: 0 }}>
                      Amazon
                    </span>
                  </div>
                  {product.description && (
                    <p style={{ color: "#9A9A8A", fontSize: "0.85rem", marginBottom: "0.4rem", margin: "0 0 0.4rem" }}>
                      {product.description}
                    </p>
                  )}
                  <p style={{ color: "#555", fontSize: "0.75rem", margin: 0 }}>
                    Mentioned on JRE {product.episodeNumber} with {product.guestName}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <p style={{ color: "#555", textAlign: "center", marginTop: "3rem" }}>
          Nothing found for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}
