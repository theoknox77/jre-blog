import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "2.5rem 1.25rem", marginTop: "4rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "1.3rem", textTransform: "uppercase", color: "#F5F0E8", marginBottom: "0.5rem" }}>
              JRE<span style={{ color: "#E85D04" }}>INDEX</span>
            </p>
            <p style={{ color: "#9A9A8A", fontSize: "0.875rem", maxWidth: "300px" }}>
              The most complete Joe Rogan Experience resource. Every episode documented. Everything ever mentioned.
            </p>
          </div>
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#E85D04", marginBottom: "0.75rem" }}>
                Browse
              </p>
              {[
                { href: "/episodes", label: "All Episodes" },
                { href: "/guests", label: "All Guests" },
                { href: "/mentioned", label: "Mentioned" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ display: "block", color: "#9A9A8A", fontSize: "0.875rem", marginBottom: "0.4rem", textDecoration: "none" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "1.5rem", color: "#666", fontSize: "0.75rem" }}>
          <p>
            JREINDEX is an independent fan resource. Not affiliated with Joe Rogan or Spotify. As an Amazon Associate we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
