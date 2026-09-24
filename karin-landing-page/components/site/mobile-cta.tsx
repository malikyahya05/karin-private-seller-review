"use client";
import { useEffect, useState } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { SITE } from "@/lib/site";
export default function MobileCTA() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const form = document.getElementById("seller-form");
    if (!form) return;
    const observer = new IntersectionObserver(
      ([e]) => setHidden(e.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className={`mobile-cta ${hidden ? "hidden" : ""}`}
      aria-hidden={hidden || undefined}
    >
      <a
        href="#request-review"
        className="button"
        tabIndex={hidden ? -1 : undefined}
      >
        Request My Seller Review
        <ArrowRight aria-hidden="true" />
      </a>
      <a
        href={SITE.sms}
        className="text-karin"
        tabIndex={hidden ? -1 : undefined}
      >
        <MessageSquare aria-hidden="true" />
        Text Karin
      </a>
    </div>
  );
}
