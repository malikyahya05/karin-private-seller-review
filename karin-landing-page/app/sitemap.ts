import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return SITE.indexable
    ? [{ url: SITE.url, changeFrequency: "monthly", priority: 1 }]
    : [];
}
