import type { MetadataRoute } from "next";
import { SEO_DESCRIPTION, SITE_NAME } from "./event";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Picathon Cyberseguridad 2026",
    short_name: SITE_NAME,
    description: SEO_DESCRIPTION,
    start_url: "/",
    display: "browser",
    lang: "es-AR",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
