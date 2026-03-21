import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topics, getTopicBySlug, getEpisodesByTopic } from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return {
    title: `${topic.name} Episodes on JRE`,
    description: `All Joe Rogan Experience episodes about ${topic.name.toLowerCase()}. ${topic.description}`,
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();
  const topicEpisodes = getEpisodesByTopic(slug);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <p className="episode-number" style={{ marginBottom: "0.5rem" }}>{topicEpisodes.length} episodes</p>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#F5F0E8", marginBottom: "0.75rem" }}>
        {topic.name}
      </h1>
      <p style={{ color: "#9A9A8A", marginBottom: "2.5rem" }}>{topic.description}</p>
      {topicEpisodes.length === 0 ? (
        <p style={{ color: "#555" }}>More episodes coming soon.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {topicEpisodes.map((ep) => <EpisodeCard key={ep.slug} episode={ep} />)}
        </div>
      )}
    </div>
  );
}
