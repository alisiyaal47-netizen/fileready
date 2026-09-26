import type { MetadataRoute } from "next";
import { absoluteUrl, isPubliclyIndexable } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPubliclyIndexable
      ? { userAgent: "*", allow: "/", disallow: ["/api/"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: isPubliclyIndexable ? absoluteUrl("/sitemap.xml") : undefined,
  };
}
