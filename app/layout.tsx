import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FileReady - Check Your File Before You Upload",
  description: "Check file size, format, dimensions and compatibility before uploading to popular platforms. Private, instant and browser-based.",
  applicationName: "FileReady",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
