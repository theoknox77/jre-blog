"use client";

import { useState } from "react";

interface TranscriptSectionProps {
  slug: string;
  hasTranscript: boolean;
}

export default function TranscriptSection({ slug, hasTranscript }: TranscriptSectionProps) {
  const [open, setOpen] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleOpen() {
    if (!open && !transcript && hasTranscript) {
      setLoading(true);
      try {
        const res = await fetch(`/transcripts/${slug}.json`);
        const data = await res.json();
        setTranscript(data.transcript);
      } catch {
        setOpen(false); // just close if it fails — no error message
      }
      setLoading(false);
    }
    setOpen((o) => !o);
  }

  if (!hasTranscript) return null;

  return (
    <div className="transcript-toggle" style={{ marginBottom: "1.5rem" }}>
      {/* Header row — click to toggle */}
      <div
        onClick={handleOpen}
        role="button"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          cursor: "pointer",
          listStyle: "none",
          userSelect: "none",
        }}
      >
        <span>Full Transcript</span>
        <span style={{
          color: "#9A9A8A",
          fontSize: "0.75rem",
          transition: "transform 0.2s",
          display: "inline-block",
          transform: open ? "rotate(180deg)" : "none",
        }}>▼</span>
      </div>

      {/* Content — rendered below header, not clipped */}
      {open && (
        <div
          className="transcript-content"
          style={{ paddingBottom: "2rem" }}
        >
          {loading ? (
            <p style={{ color: "#555", padding: "1rem 0" }}>Loading transcript...</p>
          ) : transcript ? (
            <>
              {transcript
                .split(/(?<=[.!?])\s+/)
                .reduce((paras: string[][], sentence: string) => {
                  const last = paras[paras.length - 1];
                  if (!last || last.join(' ').length > 700) {
                    paras.push([sentence]);
                  } else {
                    last.push(sentence);
                  }
                  return paras;
                }, [])
                .map((para: string[], i: number) => (
                  <p key={i}>{para.join(' ')}</p>
                ))}
              <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "1rem" }}>
                Auto-generated transcript. May contain errors.
              </p>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
