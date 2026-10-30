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
        Your submission is sent to Formspree, the service used to receive and
        store these inquiries and send email notifications to the designated
        recipient managing them. The information is used to respond to your
        inquiry and support a conversation about your property. Submitting the
        form does not enroll you in a marketing newsletter. Read{" "}
        <a href="https://formspree.io/legal/privacy-policy/">
          Formspree’s privacy policy
        </a>{" "}
        for details about its handling of information.
      </p>
      <h2>Technical information</h2>
      <p>
        Campaign parameters, when present in the page URL, are saved with the
        request to identify the source of an inquiry. Formspree receives
        technical information associated with the request, and its submission
        processing may include spam and security checks. The site also makes a
        submission-confirmation event available to any analytics tools its
        operator connects; that event contains no contact or property details.
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
