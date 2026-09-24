import { createHmac } from "node:crypto";
import { getDb } from "@/db";
import { reviewSchema } from "@/lib/review-schema";

export const runtime = "nodejs";
export const maxDuration = 30;
function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  // Next.js may use an internal hostname in request.url when self-hosted.
  // Host reflects the address actually used by the browser (including port).
  const publicHost = request.headers.get("host") || requestUrl.host;
  const expectedOrigin = `${requestUrl.protocol}//${publicHost}`;
  if (origin && origin !== expectedOrigin)
    return json({ error: "Please submit your request from this page." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json({ error: "Invalid request format." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 12000)
    return json({ error: "Please shorten your message and try again." }, 413);
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 12000)
      return json({ error: "Please shorten your message and try again." }, 413);
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      return json({ error: "Please check your details and try again." }, 400);
    }
    const parsed = reviewSchema.safeParse(data);
    if (!parsed.success)
      return json(
        {
          error:
            "Please check your name, phone, email and property address, then try again.",
        },
        400,
      );
    const p = parsed.data;
    const salt = process.env.RATE_LIMIT_SALT;
    if (!salt || salt.length < 32)
      throw new Error("RATE_LIMIT_SALT needs at least 32 characters.");
    const db = getDb();
    // Vercel supplies this header. Other hosts must provide a trusted proxy
    // before replacing the conservative shared local/self-hosted identifier.
    const ip = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for") || "unknown-vercel-client"
      : "local-or-self-hosted";
    const ipHash = createHmac("sha256", salt)
      .update(`${new Date().toISOString().slice(0, 10)}:${ip}`)
      .digest("hex");
    const now = Date.now();
    const webhook = process.env.LEAD_WEBHOOK_URL;
    const outcome = await db.begin(async (sql) => {
      // Serialize submissions for this daily IP hash across server instances.
      await sql`SELECT pg_advisory_xact_lock(hashtext(${ipHash}))`;
      const existing =
        await sql`SELECT id FROM seller_reviews WHERE id = ${p.requestId}::uuid`;
      if (existing.length) return "duplicate";
      const [count] =
        await sql`SELECT COUNT(*)::integer AS total FROM seller_reviews WHERE ip_hash = ${ipHash} AND created_at > ${now - 3600000}`;
      if (Number(count.total) >= 5) return "limited";
      const inserted = await sql`
        INSERT INTO seller_reviews (id, name, phone, email, address, estimated_value, timeline, message, attribution, created_at, ip_hash, notification_status)
        VALUES (${p.requestId}::uuid, ${p.name}, ${p.phone}, ${p.email}, ${p.address}, ${p.estimatedValue}, ${p.timeline}, ${p.message}, ${JSON.stringify(p.attribution)}::jsonb, ${now}, ${ipHash}, ${webhook ? "pending" : "not_configured"})
        ON CONFLICT (id) DO NOTHING RETURNING id`;
      return inserted.length ? "saved" : "duplicate";
    });
    if (outcome === "limited")
      return json(
        {
          error:
            "Several requests have already been received. Please text Karin at 817.291.4860 to connect directly.",
        },
        429,
      );
    if (outcome === "duplicate") return json({ ok: true });
    // Notify only after persistence. Notification failures never undo a saved lead.
    if (webhook) {
      let status = "failed";
      try {
        const endpoint = new URL(webhook);
        if (endpoint.protocol !== "https:") throw new Error("HTTPS required.");
        const response = await fetch(endpoint, {
          method: "POST",
          redirect: "error",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.LEAD_WEBHOOK_SECRET
              ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
              : {}),
          },
          body: JSON.stringify({
            id: p.requestId,
            name: p.name,
            phone: p.phone,
            email: p.email,
            address: p.address,
            estimatedValue: p.estimatedValue,
            timeline: p.timeline,
            message: p.message,
            attribution: p.attribution,
            createdAt: new Date(now).toISOString(),
          }),
          signal: AbortSignal.timeout(6000),
        });
        if (response.ok) status = "sent";
      } catch {
        console.error("Seller notification failed; the request remains saved.");
      }
      try {
        await db`UPDATE seller_reviews SET notification_status = ${status} WHERE id = ${p.requestId}::uuid`;
      } catch {
        console.error(
          "Could not update notification status; the request remains saved.",
        );
      }
    }
    return json({ ok: true }, 201);
  } catch {
    console.error(
      "Seller request could not be saved. Check server configuration and database availability.",
    );
    return json(
      {
        error:
          "Your request could not be saved. Please try again or text Karin at 817.291.4860.",
      },
      503,
    );
  }
}
