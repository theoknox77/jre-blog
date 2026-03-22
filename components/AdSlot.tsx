"use client";
import { useEffect } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle";
  style?: React.CSSProperties;
}

export default function AdSlot({ slot, format = "auto", style }: AdSlotProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div style={{ textAlign: "center", overflow: "hidden", ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7066928956398194"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
