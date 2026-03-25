import episodesData from "@/data/episodes.json";
import guestsData from "@/data/guests.json";
import topicsData from "@/data/topics.json";

export interface Product {
  name: string;
  description: string;
  amazonUrl: string;
  category: string;
}

export interface KeyMoment {
  label: string;
  timestamp: string;
  seconds: number;
}

export interface Episode {
  id: string;
  slug: string;
  episodeNumber: number;
  title: string;
  guestName: string;
  guestSlug: string;
  date: string;
  youtubeId: string;
  spotifyUrl: string;
  guestBio: string;
  guestWebsite: string;
  guestYoutube: string;
  guestTwitter: string;
  guestInstagram: string;
  guestNetflix?: string;
  tldr: string[];
  recap: string;
  keyMoments: KeyMoment[];
  quotes: string[];
  products: Product[];
  tags: string[];
  relatedEpisodes: string[];
  transcript?: string;
  hasTranscript?: boolean;
}

export interface Guest {
  id: string;
  slug: string;
  name: string;
  bio: string;
  website: string;
  youtube: string;
  twitter: string;
  instagram: string;
  latestProject: string;
  episodeSlugs: string[];
}

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
  episodeSlugs: string[];
}

export const episodes: Episode[] = episodesData as unknown as Episode[];
export const guests: Guest[] = guestsData as unknown as Guest[];
export const topics: Topic[] = topicsData as unknown as Topic[];

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}

export function getGuestBySlug(slug: string): Guest | undefined {
  return guests.find((g) => g.slug === slug);
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getEpisodesByGuest(guestSlug: string): Episode[] {
  return episodes.filter((e) => e.guestSlug === guestSlug);
}

export function getEpisodesByTopic(topicSlug: string): Episode[] {
  const topic = getTopicBySlug(topicSlug);
  if (!topic) return [];
  return episodes.filter((e) => topic.episodeSlugs.includes(e.slug));
}
