# FileReady

**Check Before You Upload.** FileReady is a privacy-first file checker for common upload destinations. Choose a local JPG, PNG, WebP, MP4, or PDF, inspect its details, then compare it with an Instagram, TikTok, WhatsApp, or Gmail reference profile.

## Tech stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 with a small component stylesheet
- Framer Motion for lightweight interface transitions
- Browser File, Blob, image, video, and object URL APIs

There is no backend API, database, authentication, analytics, or file upload in V1.

## Local setup

Use Node.js 20.9 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. Quality checks:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Architecture

- `app/` — page, metadata, and responsive styles.
- `components/` — home sections and the interactive checker flow.
- `lib/inspectFile.ts` — detects file format from header bytes and reads image or video dimensions locally.
- `lib/validateFile.ts` — reusable format, size, resolution, and aspect ratio checks.
- `data/platformRules.ts` — destination profiles, limits, notes, and source links. Update this file as platform rules change.
- `data/platformPages.ts` and `data/guides.ts` — distinct public page copy and scalable guide content, separate from validation rules.
- `lib/seo.ts` and `lib/siteUrl.ts` — shared metadata and origin configuration.

The checker reads only the small header needed for detection. Image and video metadata are loaded through temporary `blob:` URLs, which are revoked after inspection. Nothing is transmitted to FileReady. The browser loads normal application assets when the site opens; this privacy promise concerns the selected file.

## Supported formats and reference profiles

FileReady recognizes JPG, PNG, WebP, MP4, and PDF by file signature rather than filename alone. Instagram uses a JPG feed-image and basic MP4 reference. TikTok uses its Content Posting API reference. WhatsApp checks document sharing. Gmail checks the personal account attachment limit. The result describes the specific checks that ran; “Not checked” means no relevant rule exists in that profile.

These profiles are **guidance, not a guarantee of acceptance**. Third-party behavior can depend on post type, device, account, app version, transcoding, and multiple attachments. For example, Gmail's 25 MB limit applies to the total attachments in one message. Reference links appear in each result.

## Current V1 limitations

- One file is checked at a time. No batch checks, conversion, or compression.
- MP4 codec, frame rate, audio, and duration restrictions are not validated. A video must be readable by the current browser to extract dimensions.
- PDF structural validation checks its header and end marker; the checker does not parse pages or guarantee that every page is readable.
- Platform limits and accepted formats can change. Destination profiles should be reviewed regularly.
- The Instagram reference is intentionally conservative: its image checks follow the cited JPG publishing flow. An Instagram app may accept other formats or convert them.

## Roadmap

Add explicit post types (for example, Instagram feed versus Reels), verify more media properties, support additional destinations, and offer optional batch checking while keeping inspection local.

## SEO architecture

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` or the deployment environment to the site's **real HTTPS origin**, with no path or trailing query. `.env.example` shows the variable. Rebuild after changing it. With no valid origin, the app runs against `http://localhost:3000`, but production metadata and `robots.txt` prevent indexing so localhost never becomes a public canonical. A real domain is required before launch.

- **Metadata and canonicals:** `lib/seo.ts` creates unique titles, descriptions, canonical URLs, Open Graph and Twitter cards for every indexable route. The root layout provides the title template. Canonicals use only the route pathname, so query parameters do not produce duplicate URLs.
- **Discovery:** `app/sitemap.ts` lists the homepage, four platform checkers, three supporting pages, the guide hub, and four guides when a production origin is configured. `app/robots.ts` then allows public pages and points to that sitemap. In unconfigured builds it disallows crawling and leaves the sitemap empty. Temporary checker results exist only in browser state and have no URL to index; unknown routes return a noindex 404.
- **Structured data:** The homepage has `WebSite` and `WebApplication` JSON-LD. Platform pages have `WebApplication` and visible breadcrumb data. Each guide has `Article` and breadcrumb data. There are no ratings, review claims, or fabricated publication dates.
- **Landing pages:** `/instagram-file-checker`, `/tiktok-file-checker`, `/whatsapp-file-checker`, and `/gmail-attachment-checker` use the same checker and `data/platformRules.ts`, with distinct explanations of what each profile can and cannot verify.
- **Guides and links:** `/guides/[slug]` renders four concise troubleshooting guides. The homepage links to destination pages and guides; platform pages and guides link to related checks, while the main navigation points to `/supported-files`, `/how-it-works`, and `/privacy`.
- **Social preview:** `app/opengraph-image.tsx` produces a small, reusable 1200 × 630 PNG at build time using the five-color palette. No remote image asset is loaded.
- **Performance:** The hero file animation uses CSS, so the main headline and decorative visual do not require client-side Framer Motion. The checker retains small client-side result transitions. A system font avoids font-network requests and layout shifts; there are no raster images that need `next/image`. The mobile layout simplifies decoration and respects reduced motion. The target is LCP below 2.5 s, INP below 200 ms, and CLS below 0.1; measure these on a deployed site with real devices and traffic rather than assuming a local build meets them.

After connecting a real domain, set `NEXT_PUBLIC_SITE_URL`, rebuild and deploy, verify the live canonical and social image URLs, submit `/sitemap.xml` to Search Console, and measure Core Web Vitals on mobile.
