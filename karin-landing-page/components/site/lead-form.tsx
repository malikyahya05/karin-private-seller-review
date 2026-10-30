"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@formspree/react";
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
// Notification recipients are managed in Formspree, not in this public code.
const FORMSPREE_FORM_ID = "mbgdbwkk";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
const fieldLabels: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  address: "Property address",
  estimatedValue: "Estimated property value",
  timeline: "Selling timeline",
  message: "Message",
};
const values = ["$1M–$1.5M", "$1.5M–$2M", "$2M–$3M", "$3M+", "Not sure"];
const timelines = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];
export default function LeadForm() {
  const [state, sendToFormspree, resetSubmission] =
    useForm<Record<string, string>>(FORMSPREE_FORM_ID);
  const [error, setError] = useState("");
  const [invalidField, setInvalidField] = useState("");
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
  const inFlight = useRef(false);
  const conversionRecorded = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!state.succeeded) return;
    successRef.current?.focus();
    if (conversionRecorded.current) return;
    conversionRecorded.current = true;
    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "seller_review_submitted",
      form_id: "private_seller_review",
    });
  }, [state.succeeded]);
  useEffect(() => {
    if (state.errors) errorRef.current?.focus();
  }, [state.errors]);
  function fieldIsInvalid(field: string) {
    return (
      invalidField === field ||
      Boolean(state.errors?.getFieldErrors(field).length)
    );
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || state.submitting || state.succeeded) return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    resetSubmission();
    setError("");
    setInvalidField("");
    const data = new FormData(form);
    for (const field of ["name", "phone", "email", "address", "message"]) {
      data.set(field, String(data.get(field) || "").trim());
    }
    const checks = [
      {
        field: "name",
        valid: String(data.get("name")).length >= 2,
        message: "Please enter your name.",
      },
      {
        field: "phone",
        valid: String(data.get("phone")).replace(/\D/g, "").length >= 10,
        message: "Please enter a phone number with at least 10 digits.",
      },
      {
        field: "address",
        valid: String(data.get("address")).length >= 5,
        message: "Please enter your property address, including city and ZIP.",
      },
    ];
    const invalid = checks.find((check) => !check.valid);
    if (invalid) {
      setError(invalid.message);
      setInvalidField(invalid.field);
      const field = form.elements.namedItem(invalid.field) as HTMLInputElement;
      field?.focus();
      return;
    }
    // Email remains optional; when supplied, Formspree uses it for Reply-To.
    if (!data.get("email")) data.delete("email");
    const params = new URLSearchParams(window.location.search);
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "gbraid",
      "wbraid",
    ]) {
      const param = params.get(key);
      if (param) data.set(key, param.slice(0, 300));
    }
    inFlight.current = true;
    try {
      await sendToFormspree(data);
    } catch {
      resetSubmission();
      setError(
        "We couldn't confirm your request. Please try again or text Karin directly.",
      );
      requestAnimationFrame(() => errorRef.current?.focus());
    } finally {
      inFlight.current = false;
    }
  }
  return (
    <div className="lead-form" id="seller-form">
      {state.succeeded ? (
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
            Your review request has been received. Thank you for sharing a
            little about your property.
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
          action={FORMSPREE_ENDPOINT}
          method="POST"
          onSubmit={submit}
          aria-labelledby="form-title"
          aria-describedby="form-intro"
          aria-busy={state.submitting}
        >
          <input
            type="hidden"
            name="subject"
            value="New Private Seller Review Request — Karin Kilburn"
          />
          <input
            type="hidden"
            name="estimatedValue"
            value={value || "Not sure"}
          />
          <input
            type="hidden"
            name="timeline"
            value={timeline || "Just exploring"}
          />
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
                minLength={2}
                maxLength={100}
                aria-invalid={fieldIsInvalid("name") || undefined}
                aria-describedby={
                  fieldIsInvalid("name") ? "seller-form-error" : undefined
                }
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
                aria-invalid={fieldIsInvalid("phone") || undefined}
                aria-describedby={
                  fieldIsInvalid("phone") ? "seller-form-error" : undefined
                }
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
                aria-invalid={fieldIsInvalid("email") || undefined}
                aria-describedby={
                  fieldIsInvalid("email") ? "seller-form-error" : undefined
                }
              />
            </div>
            <div className="field full">
              <label htmlFor="seller-address">Property Address *</label>
              <input
                id="seller-address"
                name="address"
                autoComplete="street-address"
                required
                minLength={5}
                maxLength={300}
                placeholder="Street address, city and ZIP"
                aria-invalid={fieldIsInvalid("address") || undefined}
                aria-describedby={
                  fieldIsInvalid("address") ? "seller-form-error" : undefined
                }
              />
            </div>
            <div className="field value">
              <label htmlFor="seller-value">Estimated Property Value</label>
              <Select value={value} onValueChange={setValue}>
                <SelectTrigger
                  id="seller-value"
                  className="form-select"
                  aria-invalid={fieldIsInvalid("estimatedValue") || undefined}
                  aria-describedby={
                    fieldIsInvalid("estimatedValue")
                      ? "seller-form-error"
                      : undefined
                  }
                >
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
                <SelectTrigger
                  id="seller-timeline"
                  className="form-select"
                  aria-invalid={fieldIsInvalid("timeline") || undefined}
                  aria-describedby={
                    fieldIsInvalid("timeline") ? "seller-form-error" : undefined
                  }
                >
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
                aria-invalid={fieldIsInvalid("message") || undefined}
                aria-describedby={
                  fieldIsInvalid("message") ? "seller-form-error" : undefined
                }
              />
            </div>
            <div className="honey" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                name="_gotcha"
                id="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </div>
          {(error || state.errors) && (
            <div
              id="seller-form-error"
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              className="form-error"
            >
              <p>
                {error ||
                  "We couldn't confirm your request. Please check the details below, then try again or text Karin directly."}
              </p>
              {state.errors?.getFormErrors().map((item, index) => (
                <p key={`form-${index}`}>{item.message}</p>
              ))}
              {state.errors?.getAllFieldErrors().map(([field, errors]) => (
                <p key={field}>
                  {fieldLabels[field] || field}:{" "}
                  {errors.map((item) => item.message).join(" ")}
                </p>
              ))}
            </div>
          )}
          <button className="button" type="submit" disabled={state.submitting}>
            {state.submitting
              ? "Sending Your Request…"
              : "Request My Private Seller Review"}
            {state.submitting ? (
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
