import { PlatformLandingPage } from "@/components/PlatformLandingPage";
import { platformPages } from "@/data/platformPages";
import { pageMetadata } from "@/lib/seo";

const page = platformPages.tiktok;
export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path });
export default function TikTokFileChecker() { return <PlatformLandingPage id="tiktok" />; }
