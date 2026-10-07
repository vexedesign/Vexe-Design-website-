import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "How Vexe Design uses cookies and similar technologies.",
  path: "/cookies",
  noIndex: true,
});

export default function CookiesPage() {
  return (
    <LegalPage
      label="Legal"
      title="Cookie Policy"
      intro="How this website uses cookies and similar technologies."
      sections={[
        { heading: "What cookies are", prompt: "A short, plain-English explanation of cookies and similar technologies." },
        { heading: "Cookies we use", prompt: "As built, this site sets no tracking or advertising cookies. If you add analytics or embeds later, list each cookie, its purpose and duration here." },
        { heading: "Managing cookies", prompt: "How visitors can control cookies, and a consent banner if you introduce non-essential cookies." },
        { heading: "Changes to this policy", prompt: "How and when you will update this policy." },
      ]}
    />
  );
}
