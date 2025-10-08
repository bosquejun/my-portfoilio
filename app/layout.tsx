import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jun-Paul I. Bosque | Senior Full-Stack Developer",
  description: "Full-Stack Developer and Team Lead with 9 years of experience in Fintech and Blockchain. Skilled in Node.js, React.js, and AWS.",
  metadataBase: new URL('https://jun.is-a.dev'),
  openGraph: {
    title: "Jun-Paul I. Bosque | Senior Full-Stack Developer",
    description: "Full-Stack Developer and Team Lead with 9 years of experience in Fintech and Blockchain. Skilled in Node.js, React.js, and AWS.",
    url: 'https://jun.is-a.dev',
    siteName: 'Jun-Paul I. Bosque Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jun-Paul I. Bosque | Senior Full-Stack Developer",
    description: "Full-Stack Developer and Team Lead with 9 years of experience in Fintech and Blockchain.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
