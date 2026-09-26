import type { PlatformId } from "@/data/platformRules";

export interface PlatformPageContent {
  id: PlatformId;
  path: string;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  checksIntroduction: string;
  problemsHeading: string;
  problems: Array<{ title: string; detail: string }>;
  guidance: string;
  related: Array<{ href: string; label: string }>;
}

export const platformPages: Record<PlatformId, PlatformPageContent> = {
  instagram: {
    id: "instagram",
    path: "/instagram-file-checker",
    title: "Instagram File Checker for Feed JPGs and MP4 Basics",
    description: "Check a JPG feed image's size, width and aspect ratio, or inspect an MP4's basic file details before an Instagram upload. Private browser-based checking.",
    heading: "Check your file for Instagram",
    introduction: "A feed image can look fine on your device but still sit outside the reference profile you plan to use. FileReady checks a JPG against the feed image rules below and reads basic MP4 details locally. Upload a file to see the result.",
    checksIntroduction: "For JPG feed images, FileReady checks format, file size, minimum width and aspect ratio. MP4 has a basic format check here; this profile does not validate reel-specific limits.",
    problemsHeading: "Why an Instagram upload may need attention",
    problems: [
      { title: "The feed image is outside the checked frame", detail: "A JPG outside the configured 4:5 to 1.91:1 feed range will be flagged so you can crop or export it again." },
      { title: "The image is too narrow or large for this reference", detail: "The checker compares JPG width and bytes with the feed profile. It reports the actual values, not a general promise that every Instagram flow will accept the file." },
      { title: "The video has a property V1 cannot inspect", detail: "An MP4 may still run into codec, duration, audio or post-type rules. FileReady does not check those properties yet." },
    ],
    guidance: "This is a feed JPG reference plus a basic MP4 check. Instagram's app and publishing API can behave differently. If your result says “Not checked,” confirm that requirement in the upload flow you use.",
    related: [
      { href: "/guides/how-to-check-image-dimensions", label: "Learn how to check image dimensions" },
      { href: "/tiktok-file-checker", label: "Check a file for TikTok" },
      { href: "/supported-files", label: "See all supported file types" },
    ],
  },
  tiktok: {
    id: "tiktok",
    path: "/tiktok-file-checker",
    title: "TikTok File Checker for MP4, JPG and WebP",
    description: "Check MP4 size and resolution or JPG and WebP image size against FileReady's TikTok Content Posting API reference. Results stay in your browser.",
    heading: "Check your file for TikTok",
    introduction: "The right export depends on whether you are posting a video or image. FileReady uses a clearly labeled Content Posting API reference: it checks MP4 size and resolution, and JPG or WebP image size, without sending the file anywhere.",
    checksIntroduction: "The MP4 reference includes format, bytes and width and height. The JPG and WebP reference includes format and bytes. Aspect ratio, frame rate, codec and duration are not validated.",
    problemsHeading: "Common reasons to check before posting",
    problems: [
      { title: "The MP4 is outside the size or resolution reference", detail: "A file can be the right format but still exceed the configured limit or fall outside the listed picture size range." },
      { title: "The file format is outside this publishing profile", detail: "The reference covers MP4 video and JPG or WebP images. A format failure describes this profile, not every possible TikTok app flow." },
      { title: "The browser cannot read the video", detail: "FileReady needs the browser to read video metadata for dimensions. Some codecs or damaged files prevent that inspection." },
    ],
    guidance: "These checks follow TikTok's Content Posting API reference. The consumer app can differ, and a passing result cannot confirm codec, frame rate, duration or account-specific upload rules.",
    related: [
      { href: "/guides/why-wont-my-video-upload", label: "Troubleshoot a video upload" },
      { href: "/guides/unsupported-file-format", label: "Understand unsupported formats" },
      { href: "/instagram-file-checker", label: "Check a file for Instagram" },
    ],
  },
  whatsapp: {
    id: "whatsapp",
    path: "/whatsapp-file-checker",
    title: "WhatsApp File Checker for Document Sharing",
    description: "Check a JPG, PNG, WebP, MP4 or PDF against FileReady's WhatsApp document-sharing size reference. Local inspection, with no file upload.",
    heading: "Check a file for WhatsApp document sharing",
    introduction: "Sending a file as a document is different from sending it as a photo or video. This checker focuses on the documented document-sharing size reference and accepts the five file types FileReady can inspect.",
    checksIntroduction: "FileReady checks detected format and file size against its WhatsApp document profile. It can display image or video dimensions, but this profile has no resolution or aspect ratio rule.",
    problemsHeading: "What to check before sending",
    problems: [
      { title: "The document is over the configured size", detail: "The result shows the file's actual size and whether it falls within the document-sharing reference." },
      { title: "You are using the photo or video flow", detail: "WhatsApp may process media differently. A document result should not be treated as a guarantee for sending through a media picker." },
      { title: "The file itself cannot be read", detail: "A damaged image, an unreadable MP4 or an incomplete PDF can fail local inspection before destination checks begin." },
    ],
    guidance: "This page covers sending as a document. It does not predict compression, playback or upload behavior when you send a file as photo or video.",
    related: [
      { href: "/guides/how-to-check-file-size", label: "Learn how to check file size" },
      { href: "/gmail-attachment-checker", label: "Check a Gmail attachment" },
      { href: "/privacy", label: "Read how local inspection works" },
    ],
  },
  gmail: {
    id: "gmail",
    path: "/gmail-attachment-checker",
    title: "Gmail Attachment Size Checker",
    description: "Check whether one JPG, PNG, WebP, MP4 or PDF fits the personal Gmail attachment size reference before sending. Private and browser-based.",
    heading: "Check your Gmail attachment",
    introduction: "A large attachment can turn into a Drive link instead of a regular attachment. FileReady compares one selected file with the personal Gmail attachment size reference and displays its detected format and size.",
    checksIntroduction: "The check covers one file's detected format and bytes. Gmail's stated limit applies to the combined attachments in a message, so this result cannot account for files you add separately.",
    problemsHeading: "Why an attachment may still not send",
    problems: [
      { title: "The file is over the attachment reference", detail: "The checker shows the difference clearly and suggests exporting a smaller file or using a sharing link." },
      { title: "Several attachments add up", detail: "A passing single-file result may no longer apply after you add other attachments to the same email." },
      { title: "Your account has different limits", detail: "A Workspace administrator may set a different rule. FileReady uses the personal Gmail reference and does not inspect your account settings." },
    ],
    guidance: "This is a single-file precheck for a personal Gmail account. It does not send an email or test Gmail account, storage, or organization settings.",
    related: [
      { href: "/guides/how-to-check-file-size", label: "Learn how to check file size" },
      { href: "/whatsapp-file-checker", label: "Check WhatsApp document sharing" },
      { href: "/supported-files", label: "See formats FileReady can inspect" },
    ],
  },
};

export const platformPageList = [platformPages.instagram, platformPages.tiktok, platformPages.whatsapp, platformPages.gmail];
