import { z } from "zod";
export const reviewSchema = z.object({
  requestId: z.string().uuid(),
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .min(10)
    .max(30)
    .refine((p) => p.replace(/\D/g, "").length >= 10),
  email: z.union([z.literal(""), z.string().email().max(254)]).default(""),
  address: z.string().trim().min(5).max(300),
  estimatedValue: z.enum([
    "$1M–$1.5M",
    "$1.5M–$2M",
    "$2M–$3M",
    "$3M+",
    "Not sure",
  ]),
  timeline: z.enum([
    "Within 3 months",
    "3–6 months",
    "6–12 months",
    "Just exploring",
  ]),
  message: z.string().trim().max(2000).default(""),
  website: z.literal("").optional(),
  attribution: z
    .record(z.string().max(300))
    .refine((a) =>
      Object.keys(a).every((k) =>
        [
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_content",
          "utm_term",
          "gclid",
          "gbraid",
          "wbraid",
        ].includes(k),
      ),
    )
    .default({}),
});
