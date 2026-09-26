import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { platformPageList } from "@/data/platformPages";
import { absoluteUrl, isPubliclyIndexable } from "@/lib/siteUrl";

export const publicPaths = [
  "/",
  ...platformPageList.map((page) => page.path),
  "/supported-files",
  "/how-it-works",
  "/privacy",
  "/guides",
  ...guides.map((guide) => `/guides/${guide.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return isPubliclyIndexable ? publicPaths.map((path) => ({ url: absoluteUrl(path) })) : [];
}
