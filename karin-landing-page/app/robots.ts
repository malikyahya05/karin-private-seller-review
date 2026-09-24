import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return SITE.indexable
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: SITE.url + "/sitemap.xml",
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
