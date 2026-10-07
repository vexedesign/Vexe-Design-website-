import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Vexe Design collects, uses and protects personal information.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      intro="How we collect, use and look after personal information."
      sections={[
        { heading: "Who we are", prompt: "Your legal business name, address and contact details as the data controller." },
        { heading: "Information we collect", prompt: "What the enquiry form collects (name, business, email, phone, website, project details) and any other data you hold." },
        { heading: "How we use it", prompt: "The purposes, e.g. replying to enquiries and providing quotes, and the lawful basis under UK GDPR for each." },
        { heading: "Who we share it with", prompt: "Service providers that process data for you, e.g. your email delivery provider and website host." },
        { heading: "How long we keep it", prompt: "Your retention periods for enquiries and client records." },
        { heading: "Your rights", prompt: "Access, correction, erasure, objection and the right to complain to the Information Commissioner's Office (ICO)." },
      ]}
    />
  );
}
