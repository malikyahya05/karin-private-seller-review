"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { SITE } from "@/lib/site";
function newRequestId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const h = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
const values = ["$1M–$1.5M", "$1.5M–$2M", "$2M–$3M", "$3M+", "Not sure"];
const timelines = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];
export default function LeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [timeline, setTimeline] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const doc = document as Document & {
      modelContext?: {
        registerTool: (
          tool: unknown,
          options: { signal: AbortSignal },
        ) => Promise<void> | void;
      };
    };
    if (!doc.modelContext?.registerTool) return;
    const lifecycle = new AbortController();
    const prepareSchema = z
      .object({
        name: z.string().max(100).optional(),
        phone: z.string().max(30).optional(),
        email: z.string().max(254).optional(),
        address: z.string().max(300).optional(),
        message: z.string().max(2000).optional(),
        estimatedValue: z
          .enum(["$1M–$1.5M", "$1.5M–$2M", "$2M–$3M", "$3M+", "Not sure"])
          .optional(),
        timeline: z
          .enum([
            "Within 3 months",
            "3–6 months",
            "6–12 months",
            "Just exploring",
          ])
          .optional(),
      })
      .strict();
    Promise.resolve(
      doc.modelContext.registerTool(
        {
          name: "prepare_seller_review_request",
          description:
            "Fill the visible seller-review form for the homeowner to review. Does not submit or store an inquiry. The homeowner must press the request button to submit.",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", maxLength: 100 },
              phone: { type: "string", maxLength: 30 },
              email: { type: "string", maxLength: 254 },
              address: { type: "string", maxLength: 300 },
              message: { type: "string", maxLength: 2000 },
              estimatedValue: { type: "string", enum: values },
              timeline: { type: "string", enum: timelines },
            },
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute: (input: unknown) => {
            const parsed = prepareSchema.safeParse(input);
            if (!parsed.success)
              return { error: "Invalid form details; nothing changed." };
            if (!formRef.current)
              return { error: "The form is no longer available." };
            for (const key of [
              "name",
              "phone",
              "email",
              "address",
              "message",
            ] as const) {
              const field = formRef.current.elements.namedItem(key) as
                | HTMLInputElement
                | HTMLTextAreaElement
                | null;
              if (field && parsed.data[key] !== undefined)
                field.value = parsed.data[key];
            }
            if (parsed.data.estimatedValue)
              setValue(parsed.data.estimatedValue);
            if (parsed.data.timeline) setTimeline(parsed.data.timeline);
            formRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            return { status: "prepared", submitted: false };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => {});
    return () => lifecycle.abort();
  }, []);
  const requestId = useRef("");
  const successRef = useRef<HTMLDivElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") || "");
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a phone number with at least 10 digits.");
      setState("error");
      form.querySelector<HTMLInputElement>("[name=phone]")?.focus();
      return;
    }
    setState("sending");
    setError("");
    if (!requestId.current) requestId.current = newRequestId();
    const params = new URLSearchParams(window.location.search);
    const attribution = Object.fromEntries(
      [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "gclid",
        "gbraid",
        "wbraid",
      ]
        .filter((k) => params.has(k))
        .map((k) => [k, params.get(k)?.slice(0, 300)]),
    );
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data),
          estimatedValue: value || "Not sure",
          timeline: timeline || "Just exploring",
          requestId: requestId.current,
          attribution,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || !result.ok)
        throw new Error(
          result.error ||
            "Your request could not be saved. Please try again or text Karin directly.",
        );
      setState("success");
      const w = window as Window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "seller_review_submitted",
        form_id: "private_seller_review",
      });
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Your request could not be saved. Please try again.",
      );
      setState("error");
    }
  }
  return (
    <div className="lead-form" id="seller-form">
      {state === "success" ? (
        <div
          className="form-success"
          ref={successRef}
          tabIndex={-1}
          role="status"
        >
          <div className="success-icon">
            <Check size={24} aria-hidden="true" />
          </div>
          <h3>Your next move starts with a conversation.</h3>
          <p>
            Your review request has been saved. Thank you for sharing a little
            about your property.
          </p>
          <p>You can also connect with Karin directly by text.</p>
          <a className="text-link" href={SITE.sms}>
            Text Karin · 817.291.4860
            <ArrowRight size={17} />
          </a>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={submit}
          aria-labelledby="form-title"
          aria-describedby="form-intro"
        >
          <h3 id="form-title">Request My Private Seller Review</h3>
          <p id="form-intro" className="form-intro">
            A few details to start an informed conversation.
            <br />
            Fields marked * are required.
          </p>
          <div className="form-fields">
            <div className="field full">
              <label htmlFor="seller-name">Name *</label>
              <input
                id="seller-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
              />
            </div>
            <div className="field phone">
              <label htmlFor="seller-phone">Phone *</label>
              <input
                id="seller-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={30}
                inputMode="tel"
              />
            </div>
            <div className="field email">
              <label htmlFor="seller-email">
                Email <span>(optional)</span>
              </label>
              <input
                id="seller-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
              />
            </div>
            <div className="field full">
              <label htmlFor="seller-address">Property Address *</label>
              <input
                id="seller-address"
                name="address"
                autoComplete="street-address"
                required
                maxLength={300}
                placeholder="Street address, city and ZIP"
              />
            </div>
            <div className="field value">
              <label htmlFor="seller-value">Estimated Property Value</label>
              <Select value={value} onValueChange={setValue}>
                <SelectTrigger id="seller-value" className="form-select">
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent
                  className="form-select-options"
                  position="popper"
                >
                  {values.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="field timeline">
              <label htmlFor="seller-timeline">Selling Timeline</label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger id="seller-timeline" className="form-select">
                  <SelectValue placeholder="Select a timeline" />
                </SelectTrigger>
                <SelectContent
                  className="form-select-options"
                  position="popper"
                >
                  {timelines.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="field full">
              <label htmlFor="seller-message">
                Message <span>(optional)</span>
              </label>
              <textarea
                id="seller-message"
                name="message"
                placeholder="What would be helpful for Karin to know?"
                maxLength={2000}
              />
            </div>
            <div className="honey" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                name="website"
                id="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </div>
          {state === "error" && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button
            className="button"
            type="submit"
            disabled={state === "sending"}
          >
            {state === "sending"
              ? "Saving Your Request…"
              : "Request My Private Seller Review"}
            {state === "sending" ? (
              <LoaderCircle
                size={17}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : (
              <ArrowRight aria-hidden="true" />
            )}
          </button>
          <p className="form-consent">
            By submitting, you request contact about your property by phone,
            text or email. No obligation. Your details are used to respond to
            this inquiry. <a href="/privacy">Privacy details</a>.
          </p>
        </form>
      )}
    </div>
  );
}
