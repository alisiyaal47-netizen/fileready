import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Checker } from "@/components/Checker";
import { OneFileEveryPlatform } from "@/components/OneFileEveryPlatform";
import { HowItWorks } from "@/components/HowItWorks";
import { PrivacySection } from "@/components/PrivacySection";
import { SupportedFiles } from "@/components/SupportedFiles";
import { Footer } from "@/components/Footer";

export default function Home() {
  return <div id="top"><Navbar /><main><Hero /><Checker /><OneFileEveryPlatform /><HowItWorks /><PrivacySection /><SupportedFiles /></main><Footer /></div>;
}
