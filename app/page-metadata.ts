import type { Metadata } from "next";
import { OG_IMAGE_URL, SITE_NAME } from "./event";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "es_AR",
      url: path,
      title,
      description,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: "Picante" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE_URL] },
  };
}
