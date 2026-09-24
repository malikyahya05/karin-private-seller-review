import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy | Karin Kilburn Private Seller Review",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <main className="container privacy-content">
      <Link className="text-link" href="/">
        ← Back to your private seller review
      </Link>
      <h1>Your inquiry. Your privacy.</h1>
      <p>
        This notice explains how the Private Home Value & Selling Strategy
        Review request form handles the information you choose to provide.
      </p>
      <h2>Information you provide</h2>
      <p>
        The form collects your name, phone number, property address, and any
        email address, estimated value, selling timeline or message you include.
        Please avoid including financial account details or other sensitive
        documents in the message.
      </p>
      <h2>How your information is used</h2>
      <p>
        Your submission is stored to handle your inquiry and support a
        conversation about your property. Submitting the form requests a
        response about this inquiry; it does not enroll you in a marketing
        newsletter.
      </p>
      <h2>Technical information</h2>
      <p>
        Campaign parameters, when present in the page URL, are saved with the
        request to identify the source of an inquiry. A daily hashed network
        identifier helps limit repeated submissions. This page does not load
        advertising or analytics trackers.
      </p>
      <h2>Your choices</h2>
      <p>
        You may leave optional fields blank or contact Karin directly by text
        instead of using the form. To ask about your information, request a
        correction or deletion, or ask not to be contacted, text Karin at{" "}
        <a href="sms:+18172914860">817.291.4860</a>.
      </p>
      <h2>About the review</h2>
      <p>
        This is a consultation and market review, not a formal appraisal or
        guarantee of a sale price.
      </p>
    </main>
  );
}
