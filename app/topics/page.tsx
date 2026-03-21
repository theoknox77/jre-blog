import type { Metadata } from "next";
import Link from "next/link";
import { topics } from "@/lib/data";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse JRE episodes by topic. DMT and psychedelics, MMA and fighting, hunting, science, conspiracy, politics, health, and more.",
};

const TOPIC_EMOJIS: Record<string, string> = {
  comedy: "😂", conspiracy: "👽", science: "🔬", health: "💪",
  mma: "🥊", hunting: "🦌", dmt: "🌀", politics: "🏛️",
};

export default function TopicsPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#F5F0E8", marginBottom: "0.5rem" }}>
        Topics
      </h1>
      <p style={{ color: "#9A9A8A", marginBottom: "2.5rem" }}>
        Browse every JRE episode by topic.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/topics/${topic.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ background: "#111111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1.75rem", transition: "border-color 0.2s" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                {TOPIC_EMOJIS[topic.slug] || "🎙️"}
              </div>
              <h2 style={{ fontSize: "1.5rem", color: "#F5F0E8", marginBottom: "0.5rem" }}>{topic.name}</h2>
              <p style={{ color: "#9A9A8A", fontSize: "0.875rem" }}>{topic.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
