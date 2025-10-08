import { ThemeProvider } from "@/components/theme-provider";
import { getProfile } from "@/lib/content";
import type { Metadata } from "next";
import { Fira_Code, Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

// Generate metadata from profile.md
const profile = getProfile();
const siteTitle = `${profile.name} | ${profile.title}`;
const siteDescription = profile.summary;
const siteUrl = profile.website || 'https://jun.is-a.dev';

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
    images: profile.photo ? [
      {
        url: profile.photo,
        alt: profile.name,
      }
    ] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: profile.photo ? [profile.photo] : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
