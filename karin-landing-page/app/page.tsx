import {
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import LeadForm from "@/components/site/lead-form";
import MobileCTA from "@/components/site/mobile-cta";
import { SITE } from "@/lib/site";

function ReviewLink({
  children = "Request My Private Seller Review",
  light = false,
  className = "",
}: {
  children?: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#request-review"
      className={`button ${light ? "light" : ""} ${className}`}
      data-cta="review"
    >
      {children}
      <ArrowRight aria-hidden="true" />
    </a>
  );
}
const steps = [
  [
    "YOUR PROPERTY",
    "The features, condition, location and characteristics that can influence buyer perception.",
  ],
  ["THE MARKET", "Relevant recent sales and current competing properties."],
  [
    "PREPARATION",
    "What may deserve attention before launch — and what may not be worth spending money on.",
  ],
  [
    "POSITIONING",
    "How pricing, presentation, timing and marketing can work together.",
  ],
  [
    "YOUR NEXT MOVE",
    "A clearer picture of what you could consider doing next.",
  ],
];
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Karin Kilburn",
    url: SITE.url,
    telephone: SITE.phone,
    description:
      "Private Home Value & Selling Strategy Review for homeowners considering selling a $1M+ property in Southlake and surrounding DFW luxury markets.",
    areaServed: [
      "Southlake",
      "Colleyville",
      "Grapevine",
      "Westlake",
      "Roanoke",
      "Keller",
      "Haslet",
      "Bedford",
      "Fort Worth",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Keller Williams Realty DFW Southlake",
    },
    sameAs: [
      "https://linktr.ee/teamkilburn",
      "https://www.linkedin.com/in/karinkilburn/",
      "https://www.facebook.com/karinkilburnrealtor/",
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#"
            aria-label="Karin Kilburn — back to top"
          >
            <span className="monogram" aria-hidden="true">
              KK
            </span>
            <div>
              <div className="brand-name">Karin Kilburn</div>
              <div className="brand-broker">
                Keller Williams Realty DFW Southlake
              </div>
            </div>
          </a>
          <div className="header-actions">
            <a href="#the-review" className="header-review">
              The Private Seller Review
            </a>
            <div className="header-text">
              <a href={SITE.sms} className="text-karin">
                <MessageSquare aria-hidden="true" />
                Text Karin
              </a>
              <div className="header-number">817.291.4860</div>
            </div>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Southlake & DFW Luxury Real Estate</p>
            <h1 id="hero-title">
              Before You List Your Southlake Home,{" "}
              <em>Know What You’re Really Working With.</em>
            </h1>
            <p className="hero-description">
              Considering selling a <strong>$1M+ property?</strong> Get a
              private <strong>Home Value & Selling Strategy Review</strong>{" "}
              before you choose a price, invest in preparation, or put your home
              on the market.
            </p>
            <ReviewLink />
            <p className="reassurance">
              <ShieldCheck aria-hidden="true" />
              Private consultation <span aria-hidden="true">·</span> No
              obligation
            </p>
          </div>
          <figure className="hero-photo">
            <img
              src="/images/hero.webp"
              alt="Stone exterior of 565 N Peytonville Avenue, an illustrative Southlake property"
              width="1247"
              height="936"
              fetchPriority="high"
            />
            <figcaption className="photo-caption">
              <span>Southlake, Texas</span>
              <a
                href="https://www.zillow.com/homedetails/565-N-Peytonville-Ave-Southlake-TX-76092/66642599_zpid/"
                target="_blank"
                rel="noopener noreferrer"
                title="Illustrative property; not presented as Karin’s listing"
              >
                Illustrative property ↗
              </a>
            </figcaption>
          </figure>
        </section>
        <section
          className="strategy-strip"
          aria-label="Your path to an informed selling decision"
        >
          <div className="container strategy-strip-inner">
            <div>
              <p className="eyebrow">
                A clear strategy. A considered next step.
              </p>
              <h2>Your home. Your goals. Your next move.</h2>
            </div>
            <div className="strategy-mini">
              <div className="mini-step">
                <span className="mini-number">01</span>
                <p>
                  <b>Understand your position</b>
                  <span>Property & competition</span>
                </p>
              </div>
              <div className="mini-step">
                <span className="mini-number">02</span>
                <p>
                  <b>Plan your preparation</b>
                  <span>Priorities & presentation</span>
                </p>
              </div>
              <div className="mini-step">
                <span className="mini-number">03</span>
                <p>
                  <b>Decide your next move</b>
                  <span>Pricing & a path forward</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container intro">
          <div>
            <p className="section-label eyebrow">Beyond the number</p>
            <h2>A $1M+ Home Deserves More Than an Online Estimate.</h2>
            <p className="intro-description">
              An online estimate can give you a number. It can’t tell you how
              your property compares with competing homes, which preparation may
              actually matter, or how the property should be positioned when it
              goes to market.
            </p>
            <a className="text-link" href="#request-review">
              Get My Private Seller Review
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="questions">
            {[
              "What makes this property different?",
              "What are buyers comparing it against?",
              "Which improvements are worth considering?",
              "How should the property be positioned?",
              "What does the current competition look like?",
            ].map((q, i) => (
              <div className="question" key={q}>
                <span>0{i + 1}</span>
                <p>{q}</p>
                <ArrowUpRight aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>
        <section className="offer" id="the-review">
          <div className="container">
            <div className="offer-heading">
              <div>
                <p className="section-label eyebrow">
                  Your private seller review
                </p>
                <h2>
                  What We’ll Look At <em>Together.</em>
                </h2>
              </div>
              <p>
                Five connected considerations.
                <br />
                One conversation about your property.
              </p>
            </div>
            <div className="review-steps">
              {steps.map(([title, desc], i) => (
                <article className="review-step" key={title}>
                  <div className="review-number">0{i + 1}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
            <div className="offer-bottom">
              <p className="disclaimer">
                This is a consultation and market review — not a formal
                appraisal or guarantee of a sale price.
              </p>
              <ReviewLink />
            </div>
          </div>
        </section>
        <section className="decisions">
          <div className="container decisions-inner">
            <div>
              <p className="section-label eyebrow light">
                Before the sign goes up
              </p>
              <h2>
                The Biggest Selling Decisions Are Made Before the Sign Goes in
                the Yard.
              </h2>
              <p className="decisions-intro">
                Before your home goes live, you may already have made decisions
                about price, preparation and positioning that affect how buyers
                respond.
              </p>
            </div>
            <div>
              <div className="decisions-list">
                {[
                  "What price should you ask?",
                  "What should you change — and what should you leave alone?",
                  "How should your property compete for buyer attention?",
                ].map((t, i) => (
                  <div className="decision" key={t}>
                    <span>0{i + 1}</span>
                    <h3>{t}</h3>
                  </div>
                ))}
              </div>
              <p className="decision-close">
                The question isn’t simply “What is my home worth?”
                <br />
                <em>
                  It’s “How should I bring this particular property to market?”
                </em>
              </p>
              <a className="text-link" href="#request-review">
                Let’s Look at Your Property
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section className="container karin" id="karin">
          <figure className="karin-photo">
            <img
              src="/images/karin.webp"
              alt="Karin Kilburn, REALTOR and Home Staging Expert"
              width="935"
              height="936"
              loading="lazy"
            />
            <figcaption className="portrait-name">
              Karin Kilburn<small>REALTOR® · Home Staging Expert®</small>
            </figcaption>
          </figure>
          <div className="karin-copy">
            <p className="section-label eyebrow">Meet your guide</p>
            <div className="quote-mark" aria-hidden="true">
              “
            </div>
            <blockquote>
              Good decisions are <em>BEST</em> decisions by being completely
              informed, not being sold.
            </blockquote>
            <p>
              Karin focuses on understanding the property, examining the details
              and helping clients make informed decisions rather than simply
              pushing them toward a transaction.
            </p>
            <div className="credentials">
              <span>REALTOR®</span>
              <span>Home Staging Expert®</span>
              <span>Keller Williams Realty DFW Southlake</span>
            </div>
            <a className="text-link" href="#request-review">
              Start a Conversation With Karin
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
        <section className="proof">
          <div className="container">
            <div className="proof-heading">
              <div>
                <p className="section-label eyebrow">
                  The details make a difference
                </p>
                <h2>See the Attention That Goes Into Preparing a Property.</h2>
              </div>
              <p>
                A closer look at property presentation from Karin’s publicly
                shared staging work.
              </p>
            </div>
            <div className="proof-gallery">
              <figure>
                <div className="proof-image">
                  <img
                    src="/images/staging-one.webp"
                    alt="Bright staged living room at 2916 Durango Place, a Bedford property represented by Karin Kilburn"
                    loading="lazy"
                    width="959"
                    height="640"
                  />
                  <span className="proof-tag">Property presentation</span>
                </div>
                <figcaption>
                  <div>
                    <h3>A thoughtful first impression.</h3>
                    <p>2916 Durango Place · Bedford</p>
                  </div>
                  <a
                    href={SITE.stagingTwo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Karin’s tour
                    <ArrowUpRight
                      size={14}
                      style={{ display: "inline", marginLeft: 5 }}
                    />
                  </a>
                </figcaption>
              </figure>
              <div className="proof-detail">
                <p className="eyebrow">Preparation in practice</p>
                <h3>A closer look at the details.</h3>
                <p>
                  Explore Karin’s property tours to see how rooms are prepared
                  and presented. Then consider what attention your own property
                  may need.
                </p>
                <div className="tour-links">
                  <a
                    href={SITE.stagingTwo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      2916 Durango Place<small>Bedford · Property tour</small>
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                  <a
                    href={SITE.stagingOne}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      2420 Durango Ridge Drive
                      <small>Bedford · Property tour</small>
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
                <a className="text-link" href="#request-review">
                  Discuss My Property
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="client-experiences">
              <div>
                <h3>Client Experiences</h3>
                <p className="approval-note">
                  Selected client stories are being prepared for this page.
                </p>
              </div>
              <div className="review-placeholder">
                <p className="eyebrow">Guidance through the sale</p>
                <p>Temporary space for an approved seller testimonial.</p>
              </div>
              <div className="review-placeholder">
                <p className="eyebrow">Preparation & presentation</p>
                <p>Temporary space for an approved seller testimonial.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="container qualify">
          <div>
            <p className="section-label eyebrow">For your next chapter</p>
            <h2>Is This Review For You?</h2>
            <p>
              For homeowners considering selling a $1M+ property in Southlake
              and surrounding DFW luxury markets who want clarity before
              committing to a listing.
            </p>
          </div>
          <div>
            <div className="area-label">
              Southlake & surrounding DFW luxury markets
            </div>
            <ul className="areas">
              {[
                "Southlake",
                "Colleyville",
                "Grapevine",
                "Westlake / Roanoke",
                "Keller",
                "Haslet",
                "Bedford",
                "Fort Worth / Eagle Mountain Lake",
              ].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="contact-section" id="request-review">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="section-label eyebrow light">
                Your next move starts here
              </p>
              <h2>
                Before You Decide How to Sell, Decide What Your Property Needs.
              </h2>
              <p>
                Start with a private conversation about your property, your
                goals and the strategy that may make sense for your situation.
              </p>
              <div className="next-steps">
                <div className="next-step">
                  <span>01</span>
                  <p>
                    <b>Tell Karin a little about your property.</b>
                    <span>Share the address and what you’re considering.</span>
                  </p>
                </div>
                <div className="next-step">
                  <span>02</span>
                  <p>
                    <b>Connect for your private conversation.</b>
                    <span>
                      Discuss your goals, your timeline and your questions.
                    </span>
                  </p>
                </div>
                <div className="next-step">
                  <span>03</span>
                  <p>
                    <b>Consider your next steps.</b>
                    <span>Explore the approach that fits your situation.</span>
                  </p>
                </div>
              </div>
              <div className="direct-contact">
                <p>Prefer to text? Contact Karin.</p>
                <a className="text-link" href={SITE.sms}>
                  <MessageSquare size={17} aria-hidden="true" />
                  817.291.4860
                  <ArrowRight aria-hidden="true" />
                </a>
                <small>No obligation. No pressure.</small>
              </div>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="footer-brand">Karin Kilburn, REALTOR®</div>
              <p className="footer-broker">
                Keller Williams Realty DFW Southlake
              </p>
            </div>
            <div className="footer-contact">
              <a href={SITE.sms}>Text Karin · 817.291.4860</a>
              <span>Southlake & DFW Luxury Real Estate</span>
            </div>
          </div>
          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <a
              href={SITE.consumerNotice}
              target="_blank"
              rel="noopener noreferrer"
            >
              Texas Real Estate Commission Consumer Protection Notice
            </a>
            <a href={SITE.iabs} target="_blank" rel="noopener noreferrer">
              Texas Real Estate Commission Information About Brokerage Services
            </a>
            <span>Equal Housing Opportunity</span>
          </div>
          <p className="footer-note">
            This review is a consultation and market discussion, not a formal
            appraisal or guarantee of value, sale price or timing. Each Keller
            Williams office is independently owned and operated.
          </p>
          <p className="copyright">
            © {new Date().getFullYear()} Karin Kilburn. All rights reserved.
          </p>
        </div>
      </footer>
      <MobileCTA />
    </>
  );
}
