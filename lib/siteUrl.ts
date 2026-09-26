const LOCAL_URL = "http://localhost:3000";

function configuredSiteUrl(): URL | null {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) return null;
    if (url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
    return url;
  } catch {
    return null;
  }
}

export const configuredUrl = configuredSiteUrl();
export const siteUrl = configuredUrl ?? new URL(LOCAL_URL);

// A deployed build without a real site URL must not advertise localhost canonicals to crawlers.
export const isPubliclyIndexable = process.env.NODE_ENV === "production" && configuredUrl !== null && configuredUrl.hostname !== "localhost" && configuredUrl.hostname !== "127.0.0.1";

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
