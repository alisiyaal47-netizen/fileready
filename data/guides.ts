export interface GuideSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  heading: string;
  lead: string;
  checkerHref: string;
  checkerLabel: string;
  sections: GuideSection[];
  related: Array<{ href: string; label: string }>;
}

export const guides: Guide[] = [
  {
    slug: "why-wont-my-video-upload",
    title: "Why Won't My Video Upload? A Practical File Check",
    description: "Troubleshoot a video upload by checking its actual format, size and dimensions, then learn which video properties FileReady cannot confirm yet.",
    heading: "Why won't my video upload?",
    lead: "Start with the file itself. A video can have an MP4 name but an unreadable header, a size outside a destination profile, or dimensions the platform does not expect. FileReady can test those basics before you retry.",
    checkerHref: "/tiktok-file-checker#checker",
    checkerLabel: "Check your video for TikTok",
    sections: [
      { heading: "Check the detected format", paragraphs: ["The filename alone does not prove what is inside a file. FileReady reads the header to detect a supported MP4. If the file is not recognized, export a new MP4 from the original project instead of renaming its extension."] },
      { heading: "Compare size and dimensions", paragraphs: ["Choose the destination you are uploading to. The result shows your video's measured bytes and browser-readable width and height beside the rules available for that destination. A failed check points to the value that needs to change."] },
      { heading: "Know what this check cannot settle", paragraphs: ["A passing result is a precheck, not an upload test. FileReady V1 does not inspect video codec, frame rate, audio, or platform-specific duration rules. If the basic checks pass but the upload still fails, confirm those export settings in your editor and retry in the destination app."] },
    ],
    related: [{ href: "/instagram-file-checker", label: "Check an Instagram file" }, { href: "/guides/unsupported-file-format", label: "Understand unsupported file formats" }],
  },
  {
    slug: "unsupported-file-format",
    title: "Unsupported File Format: What to Check Next",
    description: "Learn why a file extension may not match its real format, how FileReady detects supported files, and what to do when a destination profile excludes a format.",
    heading: "What does “unsupported file format” mean?",
    lead: "The message can refer to two different things: FileReady cannot identify the file, or the selected destination profile does not include its detected format. The next step depends on which message you see.",
    checkerHref: "/#checker",
    checkerLabel: "Check your file's detected format",
    sections: [
      { heading: "If FileReady cannot read the file", paragraphs: ["FileReady recognizes JPG, PNG, WebP, MP4, and PDF from file signatures. A different type, an empty file, or a damaged header produces an error before any platform comparison. Renaming the file does not change its actual format."] },
      { heading: "If the destination profile excludes it", paragraphs: ["The file itself may be valid, but the selected reference profile can support fewer formats. Read the Format row in your result and the page's profile note. The result describes that profile, not every possible upload method in an app."] },
      { heading: "Export a fresh copy", paragraphs: ["If you have the source project, export in a format listed for your intended destination, then check the new file. FileReady does not convert or repair files in V1. Keep the original until the new export opens correctly and passes the checks you need."] },
    ],
    related: [{ href: "/supported-files", label: "See supported file types" }, { href: "/guides/why-wont-my-video-upload", label: "Troubleshoot a video upload" }],
  },
  {
    slug: "how-to-check-file-size",
    title: "How to Check File Size Before Uploading",
    description: "Find a file's size, understand why a single-file check may differ from a combined attachment limit, and compare it with a destination reference.",
    heading: "How to check a file's size before uploading",
    lead: "Choose the file in FileReady and its size appears immediately. Then select a destination to see whether the measured bytes fit the size rule in that reference profile.",
    checkerHref: "/gmail-attachment-checker#checker",
    checkerLabel: "Check a Gmail attachment's size",
    sections: [
      { heading: "Read the number that matters", paragraphs: ["FileReady reads the browser File object's byte count and displays it in readable units. If a destination profile has a size rule, the result compares the actual byte value rather than rounding the displayed number first."] },
      { heading: "Check the whole upload context", paragraphs: ["Some services apply limits to a group of files. Gmail's personal-account attachment reference applies to the total attachments in one message. FileReady V1 checks one file at a time, so add up any other attachments separately before sending."] },
      { heading: "If your file is too large", paragraphs: ["Export a smaller copy in the source app when practical, or use the destination's supported sharing-link flow. FileReady does not compress or upload the file for you."] },
    ],
    related: [{ href: "/whatsapp-file-checker", label: "Check WhatsApp document sharing" }, { href: "/guides/how-to-check-image-dimensions", label: "Check image dimensions" }],
  },
  {
    slug: "how-to-check-image-dimensions",
    title: "How to Check Image Dimensions and Aspect Ratio",
    description: "See an image's pixel dimensions and aspect ratio locally, then compare them with the rules in the selected upload destination profile.",
    heading: "How to check image dimensions and aspect ratio",
    lead: "Image dimensions are width and height in pixels. Aspect ratio describes their relationship. FileReady reads both from the image in your browser and reports them next to the destination checks that apply.",
    checkerHref: "/instagram-file-checker#checker",
    checkerLabel: "Check an Instagram feed image",
    sections: [
      { heading: "Measure the original file", paragraphs: ["Drop a JPG, PNG, or WebP into the checker. Your browser decodes it locally so FileReady can display width, height, and a simplified aspect ratio. If the browser cannot decode the image, the checker reports an error instead of guessing."] },
      { heading: "Compare with the right profile", paragraphs: ["Select the intended destination. The Instagram JPG feed reference includes width and aspect ratio checks; other profiles may have no image dimension rule. “Not checked” means FileReady has no relevant rule in that profile, not that every size is accepted."] },
      { heading: "Adjust without losing the source", paragraphs: ["If a check fails, crop or resize a copy in your image editor and export it again. Recheck the exported file, since changing the canvas or crop can also affect its final file size."] },
    ],
    related: [{ href: "/supported-files", label: "See supported image formats" }, { href: "/guides/how-to-check-file-size", label: "Check the exported file size" }],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
