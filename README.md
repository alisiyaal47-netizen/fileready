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
