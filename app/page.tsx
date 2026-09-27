import { Hero } from "@/components/Hero";
import { Checker } from "@/components/Checker";
import { OneFileEveryPlatform } from "@/components/OneFileEveryPlatform";
import { HowItWorks } from "@/components/HowItWorks";
import { PrivacySection } from "@/components/PrivacySection";
import { SupportedFiles } from "@/components/SupportedFiles";
import { HomeExplore } from "@/components/HomeExplore";
import { ScannerTunnel } from "@/components/ScannerTunnel";
import { BenefitsBento } from "@/components/BenefitsBento";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/siteUrl";
import { homeDescription, homeTitle, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: homeTitle, description: homeDescription, path: "/", home: true });

export default function Home() {
  return <main id="top"><Hero /><Checker /><ScannerTunnel /><OneFileEveryPlatform /><BenefitsBento /><HomeExplore /><HowItWorks /><PrivacySection /><SupportedFiles /><JsonLd data={[{ "@context": "https://schema.org", "@type": "WebSite", name: "FileReady", url: absoluteUrl("/"), description: homeDescription }, { "@context": "https://schema.org", "@type": "WebApplication", name: "FileReady", url: absoluteUrl("/"), description: homeDescription, applicationCategory: "UtilitiesApplication", operatingSystem: "Any modern browser", isAccessibleForFree: true }]} /></main>;
}
