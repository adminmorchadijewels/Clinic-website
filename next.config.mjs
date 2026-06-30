/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholders are now local SVGs in /public/placeholders (see data.ts).
    // TODO: when real photos land on a CDN, add its hostname here.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      // Believable dummy founder headshot until a real portrait lands.
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  // three.js ships ESM that transpiles cleanly; transpilePackages keeps R3F deps happy.
  transpilePackages: ["three"],
};

export default nextConfig;
