import { PlatformLandingPage } from "@/components/PlatformLandingPage";
import { platformPages } from "@/data/platformPages";
import { pageMetadata } from "@/lib/seo";

const page = platformPages.gmail;
export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path });
export default function GmailAttachmentChecker() { return <PlatformLandingPage id="gmail" />; }
