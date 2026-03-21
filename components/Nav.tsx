"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: "#0a0a0a", borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <Link href="/" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontWeight: 900, fontSize: "1.4rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "#F5F0E8", textDecoration: "none" }}>
          JRE<span style={{ color: "#E85D04" }}>INDEX</span>
        </Link>
        <div className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { href: "/episodes", label: "Episodes" },
            { href: "/guests", label: "Guests" },
            { href: "/mentioned", label: "Mentioned" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9A9A8A", textDecoration: "none" }}>
              {label}
            </Link>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "none" }} className="mobile-menu-btn" aria-label="Toggle menu">
          <span style={{ display: "block", width: "22px", height: "2px", background: "#F5F0E8", marginBottom: "5px" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "#F5F0E8", marginBottom: "5px" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "#F5F0E8" }} />
        </button>
      </div>
      {open && (
        <div style={{ background: "#111111", borderTop: "1px solid #2a2a2a", padding: "1rem 1.25rem" }}>
          {[
            { href: "/episodes", label: "Episodes" },
            { href: "/guests", label: "Guests" },
            { href: "/mentioned", label: "Mentioned" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#F5F0E8", padding: "0.75rem 0", borderBottom: "1px solid #2a2a2a", textDecoration: "none" }}>
              {label}
            </Link>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
