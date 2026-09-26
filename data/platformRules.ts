export type FileFormat = "JPG" | "PNG" | "WebP" | "MP4" | "PDF";
export type PlatformId = "instagram" | "tiktok" | "whatsapp" | "gmail";

export interface FormatRule {
  maxBytes?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: { min: number; max: number; description: string };
}

export interface PlatformRule {
  id: PlatformId;
  name: string;
  useCase: string;
  note: string;
  sourceUrl: string;
  formats: Partial<Record<FileFormat, FormatRule>>;
}

const MB = 1_000_000;
const GB = 1_000_000_000;

/**
 * Reference profiles, not a promise that a third-party service will accept a file.
 * Instagram and TikTok values describe specific publishing flows; mobile apps can differ.
 * Review these sources when platform behavior changes.
 */
export const platformRules: PlatformRule[] = [
  {
    id: "instagram",
    name: "Instagram",
    useCase: "Feed JPG or MP4 basics",
    note: "JPG checks use a feed publishing reference. MP4 checks cover format only; reel-specific size, duration, audio, and codec are outside V1.",
    sourceUrl: "https://developers.facebook.com/docs/instagram-platform/content-publishing/",
    formats: {
      JPG: {
        maxBytes: 8 * MB,
        minWidth: 320,
        aspectRatio: { min: 0.8, max: 1.91, description: "4:5 to 1.91:1" },
      },
      MP4: {},
    },
  },
  {
    id: "tiktok",
    name: "TikTok",
    useCase: "Content Posting API reference",
    note: "Based on TikTok's publishing API. In-app limits and available formats may differ; codec, frame rate, and duration are not checked.",
    sourceUrl: "https://developers.tiktok.com/docs/en/content-posting-api-media-transfer-guide",
    formats: {
      JPG: { maxBytes: 20 * MB },
      WebP: { maxBytes: 20 * MB },
      MP4: { maxBytes: 4 * GB, minWidth: 360, minHeight: 360, maxWidth: 4096, maxHeight: 4096 },
    },
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    useCase: "Send as document",
    note: "Checks the documented 2 GB document sharing limit. Sending as photo or video can use different processing and limits.",
    sourceUrl: "https://faq.whatsapp.com/453914586839706/",
    formats: {
      JPG: { maxBytes: 2 * GB },
      PNG: { maxBytes: 2 * GB },
      WebP: { maxBytes: 2 * GB },
      MP4: { maxBytes: 2 * GB },
      PDF: { maxBytes: 2 * GB },
    },
  },
  {
    id: "gmail",
    name: "Gmail",
    useCase: "Personal account attachment",
    note: "The 25 MB limit applies to all attachments in one email. Workspace administrators may set other limits.",
    sourceUrl: "https://support.google.com/mail/answer/6584",
    formats: {
      JPG: { maxBytes: 25 * MB },
      PNG: { maxBytes: 25 * MB },
      WebP: { maxBytes: 25 * MB },
      MP4: { maxBytes: 25 * MB },
      PDF: { maxBytes: 25 * MB },
    },
  },
];

export const getPlatformRule = (id: PlatformId) =>
  platformRules.find((rule) => rule.id === id)!;
