import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gomes App Portfolio",
    short_name: "Gomes App",
    description: "Portfolio profissional de desenvolvimento FullStack",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1040",
    theme_color: "#1a1040",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
