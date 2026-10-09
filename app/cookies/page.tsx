import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument, type LegalSection } from "@/components/LegalDocument";

/**
 * COOKIE POLICY
 * Written to the Privacy and Electronic Communications Regulations 2003 (PECR)
 * and ICO guidance. Accurate for the site as built: no cookies, no browser
 * storage, no third-party scripts. If you ever add analytics, embeds (YouTube,
 * maps, Instagram feeds) or a chat widget, this page must be updated and a
 * consent banner added BEFORE they go live.
 */
const DRAFT = false;
const LAST_UPDATED = "9 October 2026";

const { businessName, email, domain } = siteConfig;
const mail = <a href={`mailto:${email}`}>{email}</a>;

const sections: LegalSection[] = [
  {
    id: "summary",
    title: "The short version",
    body: (
      <p>
        <strong>Our website doesn’t use cookies.</strong> We don’t use analytics, advertising, tracking pixels or
        social media plug-ins, and we don’t store anything in your browser. So there is nothing for you to accept or
        decline, and we don’t show a cookie banner.
      </p>
    ),
  },
  {
    id: "what-are-cookies",
    title: "What cookies are",
    body: (
      <>
        <p>
          Cookies are small text files that a website saves on your device when you visit. They are often used to
          remember your preferences, keep you signed in, measure how a site is used or show you targeted adverts.
          Similar technologies include local storage, tracking pixels and device fingerprinting. This policy covers all
          of them.
        </p>
        <p>
          Under UK law (the Privacy and Electronic Communications Regulations), websites must ask for your consent before
          using cookies or similar technologies, unless they are strictly necessary to provide a service you have asked
          for.
        </p>
      </>
    ),
  },
  {
    id: "what-we-use",
    title: "What we use on this website",
    body: (
      <>
        <p>We have designed {domain} to work without them:</p>
        <ul>
          <li>
            <strong>No cookies</strong> are set when you browse the site or send us an enquiry.
          </li>
          <li>
            <strong>No local storage</strong> or other browser storage is used.
          </li>
          <li>
            <strong>No analytics or tracking</strong> tools, such as Google Analytics or Meta Pixel.
          </li>
          <li>
            <strong>No advertising</strong> or retargeting technology.
          </li>
          <li>
            <strong>No third-party content</strong> loads on our pages. Our fonts and images are served from our own
            website, so your visit isn’t shared with other companies.
          </li>
        </ul>
        <p>
          Our hosting provider processes basic technical information, such as your IP address, to deliver the website and
          protect it from misuse. This doesn’t involve storing anything on your device. Our{" "}
          <Link href="/privacy">privacy policy</Link> explains how we handle it.
        </p>
      </>
    ),
  },
  {
    id: "other-websites",
    title: "Links to other websites",
    body: (
      <p>
        Our website contains links to other sites, such as our Instagram profile. If you follow one of these links, that
        website may set its own cookies under its own policy, which we don’t control. We recommend reading the cookie
        and privacy policies of any site you visit.
      </p>
    ),
  },
  {
    id: "managing-cookies",
    title: "Managing cookies in your browser",
    body: (
      <>
        <p>
          Although we don’t use cookies, you can control them for every website you visit through your browser settings.
          You can view, block or delete cookies there:
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-gb/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-GB/kb/clear-cookies-and-site-data-firefox"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
        </ul>
        <p>
          The ICO’s guide to{" "}
          <a href="https://ico.org.uk/for-the-public/online/cookies/" target="_blank" rel="noopener noreferrer">
            cookies and how to control them
          </a>{" "}
          has more information.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If we ever add cookies or similar technologies that aren’t strictly necessary, for example to measure how the
        website is used, we will update this policy first and ask for your consent before they are used. The date at
        the top shows when this policy was last updated.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        If you have any questions about this policy, email {businessName} at {mail}.
      </p>
    ),
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: `${businessName}'s website doesn't use cookies, analytics or tracking. Read how we keep your visit private.`,
  path: "/cookies",
  noIndex: DRAFT,
});

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      intro="Our website doesn’t use cookies or tracking. Here’s what that means, and how to control cookies elsewhere."
      lastUpdated={LAST_UPDATED}
      sections={sections}
      draft={DRAFT}
    />
  );
}
