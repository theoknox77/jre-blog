"use client";

interface ShareButtonsProps {
  title: string;
  url: string;
  episodeNumber?: number;
  guestName?: string;
}

export default function ShareButtons({ title, url, episodeNumber, guestName }: ShareButtonsProps) {
  const fullUrl = `https://jreindex.com${url}`;
  const tweetText = episodeNumber
    ? `JRE ${episodeNumber} with ${guestName} — full recap, timestamps, and everything mentioned: ${fullUrl}`
    : `${title} — ${fullUrl}`;

  const shares = [
    {
      label: "𝕏 Share",
      color: "#000",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
    },
    {
      label: "Facebook",
      color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
    {
      label: "Reddit",
      color: "#FF4500",
      href: `https://reddit.com/submit?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`,
    },
  ];

  function copyLink() {
    navigator.clipboard.writeText(fullUrl).then(() => {
      const btn = document.getElementById("copy-link-btn");
      if (btn) { btn.textContent = "✓ Copied"; setTimeout(() => { btn.textContent = "Copy Link"; }, 2000); }
    });
  }

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
      <span style={{ color: "#555", fontSize: "0.75rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginRight: "0.25rem" }}>
        Share
      </span>
      {shares.map(s => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: s.color,
            color: "#fff",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            padding: "0.3rem 0.8rem",
            borderRadius: "4px",
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          {s.label}
        </a>
      ))}
      <button
        id="copy-link-btn"
        onClick={copyLink}
        style={{
          background: "#1a1a1a",
          color: "#9A9A8A",
          border: "1px solid #2a2a2a",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          padding: "0.3rem 0.8rem",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "color 0.15s",
        }}
      >
        Copy Link
      </button>
    </div>
  );
}
