import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — JREINDEX",
  description: "Privacy policy for JREINDEX, the Joe Rogan Experience episode resource.",
};

const section = (title: string, content: string) => ({ title, content });

const sections = [
  section("Information We Collect", `JREINDEX is a static content website. We do not require you to create an account or provide personal information to use the site.

We use Google Analytics (GA4) to collect anonymous usage data including pages visited, time on site, device type, and general geographic region. This data is aggregated and cannot be used to identify you personally.

If you click on Amazon affiliate links, Amazon may collect information in accordance with their own privacy policy.`),

  section("Cookies", `We use cookies only for analytics purposes (Google Analytics). These cookies help us understand how visitors use the site so we can improve it.

You can disable cookies in your browser settings at any time. Disabling cookies will not affect your ability to use this site.`),

  section("Third-Party Services", `This site uses the following third-party services:

Google Analytics — anonymous traffic measurement. See Google's privacy policy at policies.google.com/privacy.

Amazon Associates — we participate in the Amazon Associates Program. When you click an Amazon link and make a purchase, we may earn a small commission at no extra cost to you. Amazon collects data per their privacy policy at amazon.com/privacy.

YouTube — episode videos are embedded from YouTube. YouTube may set cookies when you play a video. See Google's privacy policy for details.`),

  section("Advertising", `We display ads through Google AdSense. Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising at google.com/settings/ads.`),

  section("Data Retention", `We do not store personal data on our servers. Analytics data is retained by Google Analytics per their standard data retention policies.`),

  section("Children's Privacy", `This site is not directed at children under 13. We do not knowingly collect personal information from children.`),

  section("Changes to This Policy", `We may update this policy from time to time. The date at the top of this page reflects when it was last revised. Continued use of the site after changes constitutes acceptance of the updated policy.`),

  section("Contact", `If you have questions about this privacy policy, you can reach us at: privacy@jreindex.com`),
];

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.25rem" }}>
      <p className="episode-number" style={{ marginBottom: "0.5rem" }}>Legal</p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#F5F0E8", marginBottom: "0.5rem" }}>
        Privacy Policy
      </h1>
      <p style={{ color: "#555", fontSize: "0.85rem", marginBottom: "3rem" }}>
        Last updated: March 21, 2026
      </p>

      <p style={{ color: "#b0a898", lineHeight: 1.8, marginBottom: "2.5rem" }}>
        JREINDEX (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates jreindex.com. This page explains how we handle information when you use our site.
      </p>

      {sections.map((s) => (
        <section key={s.title} style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.3rem", color: "#F5F0E8", marginBottom: "0.75rem" }}>{s.title}</h2>
          {s.content.split("\n\n").map((para, i) => (
            <p key={i} style={{ color: "#b0a898", lineHeight: 1.8, marginBottom: "0.75rem" }}>{para}</p>
          ))}
        </section>
      ))}

      <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "2rem", marginTop: "2rem" }}>
        <p style={{ color: "#555", fontSize: "0.8rem" }}>
          JREINDEX is an independent fan resource. Not affiliated with Joe Rogan, Spotify, or any podcast network.
        </p>
      </div>
    </div>
  );
}
