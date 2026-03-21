import type { Metadata } from "next";
import { episodes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Every Product Mentioned on JRE",
  description:
    "Every book, supplement, fitness equipment, tech product, and gear item ever mentioned on the Joe Rogan Experience — linked to Amazon.",
};

export default function ProductsPage() {
  // Aggregate all products across all episodes
  const allProducts = episodes.flatMap((ep) =>
    ep.products.map((p) => ({ ...p, episodeNumber: ep.episodeNumber, guestName: ep.guestName, episodeSlug: ep.slug }))
  );

  // Group by category
  const byCategory: Record<string, typeof allProducts> = {};
  for (const p of allProducts) {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  }

  const categoryOrder = ["Books", "Supplements", "Fitness Equipment", "Tech", "Food & Drink", "Other"];
  const sortedCategories = [
    ...categoryOrder.filter((c) => byCategory[c]),
    ...Object.keys(byCategory).filter((c) => !categoryOrder.includes(c)),
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#F5F0E8", marginBottom: "0.5rem" }}>
        Every Product Mentioned on JRE
      </h1>
      <p style={{ color: "#9A9A8A", marginBottom: "0.75rem" }}>
        Every book, supplement, gear item, and product brought up across {episodes.length} documented episodes.
      </p>
      <p style={{ color: "#555", fontSize: "0.8rem", marginBottom: "3rem" }}>
        As an Amazon Associate we earn from qualifying purchases.
      </p>

      {sortedCategories.map((cat) => (
        <section key={cat} style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1.25rem", borderBottom: "1px solid #1a1a1a", paddingBottom: "0.75rem" }}>
            {cat}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {byCategory[cat].map((product, i) => (
              <a key={i} href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="product-card" style={{ textDecoration: "none", display: "block" }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.05rem", textTransform: "uppercase", color: "#F5F0E8", marginBottom: "0.4rem" }}>
                  {product.name}
                </p>
                <p style={{ color: "#9A9A8A", fontSize: "0.825rem", marginBottom: "0.6rem" }}>
                  {product.description}
                </p>
                <p style={{ color: "#555", fontSize: "0.75rem" }}>
                  Mentioned on JRE {product.episodeNumber} with {product.guestName}
                </p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
