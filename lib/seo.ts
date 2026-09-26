import type { Metadata } from "next";
import { absoluteUrl, isPubliclyIndexable, siteUrl } from "@/lib/siteUrl";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  home?: boolean;
}

export const homeTitle = "FileReady – Check File Size, Format & Upload Compatibility";
export const homeDescription = "Check whether your image, video or document meets upload requirements before you send it. Private, instant and browser-based.";

export function pageMetadata({ title, description, path, home = false }: PageMetadataOptions): Metadata {
  const fullTitle = home ? title : `${title} | FileReady`;
  return {
    metadataBase: siteUrl,
    title: home ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "FileReady",
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "FileReady — Check Before You Upload" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: isPubliclyIndexable,
      follow: isPubliclyIndexable,
      googleBot: { index: isPubliclyIndexable, follow: isPubliclyIndexable },
    },
  };
}
