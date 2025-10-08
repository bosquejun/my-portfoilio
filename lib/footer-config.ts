export const FOOTER_CONFIG = {
  builtWith: "Built with Next.js • Motion • Shadcn UI • TailwindCSS",
  showWebsite: true,
  copyright: (name: string) => `© ${new Date().getFullYear()} ${name}. All rights reserved.`,
} as const;
