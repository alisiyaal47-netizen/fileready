import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { homeDescription, homeTitle } from "@/lib/seo";
import { isPubliclyIndexable, siteUrl } from "@/lib/siteUrl";
import "./globals.css";
import "./v11.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: homeTitle, template: "%s | FileReady" },
  description: homeDescription,
  applicationName: "FileReady",
  robots: { index: isPubliclyIndexable, follow: isPubliclyIndexable },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navbar />{children}<Footer /></body></html>;
}
