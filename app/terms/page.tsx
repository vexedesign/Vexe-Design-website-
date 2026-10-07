import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for Vexe Design website projects.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      title="Terms & Conditions"
      intro="The terms that apply to using this website and working with us."
      sections={[
        { heading: "About these terms", prompt: "Who the terms are between and when they apply." },
        { heading: "Quotes and pricing", prompt: "How quotes work, what package prices include, and how changes in scope are handled." },
        { heading: "Payment", prompt: "Deposits, payment stages and accepted payment methods." },
        { heading: "Project timelines and approvals", prompt: "What you need from the client, and how revisions and sign-off work." },
        { heading: "Ownership and licensing", prompt: "Who owns the finished website, content and code once paid for." },
        { heading: "Liability", prompt: "Limits of liability, to be drafted by a qualified professional." },
        { heading: "Governing law", prompt: "The jurisdiction that applies, e.g. England and Wales." },
      ]}
    />
  );
}
