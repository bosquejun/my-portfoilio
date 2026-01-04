import { ThemeProvider } from "@/components/theme-provider";
import { getProfile, getSkills, getExperience } from "@/lib/content";
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
const siteUrl = profile.website || "https://jun.is-a.dev";

// Generate keywords from skills and experience
const skills = getSkills();
const experience = getExperience();
const allSkills = skills.flatMap((cat) => cat.skills);
const keywords = [
  profile.title,
  "Full Stack Developer",
  "Software Engineer",
  "Web Developer",
  ...allSkills.slice(0, 10), // Top 10 skills
  ...experience.map((exp) => exp.company),
  profile.location,
].filter(Boolean);

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${profile.name}`,
  },
  description: siteDescription,
  keywords: keywords.join(", "),
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    locale: "en_US",
    type: "website",
    images: profile.photo
      ? [
          {
            url: `${siteUrl}${profile.photo}`,
            alt: profile.name,
            width: 1200,
            height: 630,
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: profile.github.split("/").pop() || undefined,
    images: profile.photo ? [`${siteUrl}${profile.photo}`] : undefined,
  },
  verification: {
    // Add your verification codes here if needed
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  other: {
    // Resource hints for performance
    "dns-prefetch": "https://fonts.googleapis.com https://fonts.gstatic.com",
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
