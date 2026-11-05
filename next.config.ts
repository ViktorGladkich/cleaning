import type { NextConfig } from "next";

// Next.js bootstraps with inline scripts, and nonces would force dynamic rendering
// of these static pages, hence 'unsafe-inline'. The other directives still apply.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    qualities: [75, 90],
  },
  // URLs of the previous website, kept alive so existing Google rankings carry over.
  async redirects() {
    const moved: [string, string][] = [
      ["/leistungen", "/services"],
      ["/leistungen/unterhaltsreinigung", "/services/unterhaltsreinigung"],
      ["/leistungen/bauendreinigung", "/services/bauendreinigung"],
      ["/leistungen/glasreinigung", "/services/fensterreinigung"],
      ["/leistungen/praxis-und-hygienereinigung", "/services/bueroreinigung"],
      ["/leistungen/teppich-und-textilreinigung", "/services/polsterreinigung"],
      ["/leistungen/hotelreinigung", "/services/hotelreinigung"],
      ["/leistungen/treppenhausreinigung", "/services/treppenhausreinigung"],
      ["/leistungen/industrie-und-hallenreinigung", "/services/industrie-und-hallenreinigung"],
      ["/leistungen/entruempelungen", "/services/entruempelungen"],
      ["/bau/innenausbau-und-trockenbau", "/bau/trockenbau-innenausbau"],
      ["/bau/renovierung-und-sanierung", "/bau/renovierung-sanierung"],
      ["/bau/abbruch-und-bauvorbereitung", "/bau/abbruch-entkernung"],
      ["/bau/weitere-bauleistungen", "/bau"],
    ];
    return moved.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            // No includeSubDomains/preload: DNS and mail live elsewhere (WordPress.com, Titan)
            key: "Strict-Transport-Security",
            value: "max-age=63072000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
