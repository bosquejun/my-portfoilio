import { getProfile } from "@/lib/content";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const profile = getProfile();
  const siteUrl = profile.website || "https://jun.is-a.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

