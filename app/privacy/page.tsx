import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument, type LegalSection } from "@/components/LegalDocument";

/**
 * PRIVACY POLICY
 * Written to the UK GDPR / Data Protection Act 2018 transparency requirements
 * (ICO privacy notice checklist). Company details come from site.config.ts.
 * Update this page and LAST_UPDATED if you start using a new service provider,
 * collect new information or change how long you keep it.
 */
const DRAFT = false;
const LAST_UPDATED = "9 October 2026";

const { businessName, email, phone, phoneHref, domain, company } = siteConfig;
const mail = <a href={`mailto:${email}`}>{email}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {businessName} is a web design business run by {company.legalName}. In this policy, “we”, “us” and “our”
          mean {company.legalName}. We are the <strong>data controller</strong> for the personal information described
          here, which means we decide how and why it is used.
        </p>
        <ul>
          <li>
            <strong>Company:</strong> {company.legalName}, registered in {company.registeredIn}, company number{" "}
            {company.number}
          </li>
          <li>
            <strong>Registered office:</strong> {company.registeredOffice}
          </li>
          <li>
            <strong>Email:</strong> {mail}
          </li>
          <li>
            <strong>Phone:</strong> <a href={phoneHref}>{phone}</a>
          </li>
        </ul>
        <p>
          This policy explains what personal information we collect through {domain} and when you contact us, how we use
          it, who we share it with, how long we keep it and the rights you have.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "The information we collect",
    body: (
      <>
        <h3>When you send an enquiry through our website</h3>
        <p>Our enquiry form asks for:</p>
        <ul>
          <li>your full name, email address and, optionally, your phone number</li>
          <li>your business name and current website address (optional)</li>
          <li>the service you’re interested in, your budget and your preferred contact method</li>
          <li>anything you choose to tell us about your project</li>
        </ul>
        <p>
          Please don’t include sensitive information (such as health details) in your message, as we don’t need it.
        </p>

        <h3>When you email, call or message us</h3>
        <p>
          We receive whatever you send us, such as your name, contact details and the content of your message. If you
          contact us on Instagram, Instagram (Meta) also processes that conversation under its own privacy policy.
        </p>

        <h3>When you become a client</h3>
        <p>
          We keep the details needed to deliver your project and run our business: contact details, project
          correspondence, files and content you supply, quotes, invoices and payment records.
        </p>

        <h3>When you visit our website</h3>
        <p>
          Like all websites, our hosting provider processes technical information when you visit, such as your IP
          address, browser type and the pages requested. This is needed to deliver the website and protect it against
          misuse. When you submit the enquiry form, your IP address is also held briefly in temporary memory to stop
          spam. It is not saved to a database. We don’t use analytics, advertising or tracking tools, and we don’t
          set cookies (see section 8).
        </p>

        <h3>Do you have to give us your information?</h3>
        <p>
          No, contacting us is entirely voluntary. However, we need at least your name, email address and some details
          of your project to reply to an enquiry, and we need certain details to provide our services if you become a
          client.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information and our lawful basis",
    body: (
      <>
        <p>Data protection law requires us to have a lawful basis for each way we use personal information. Ours are:</p>
        <table>
          <thead>
            <tr>
              <th scope="col">What we use it for</th>
              <th scope="col">Lawful basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Replying to your enquiry and preparing a quote</td>
              <td>
                <strong>Steps before a contract</strong>, taken at your request. Where you contact us on behalf of a
                business, our <strong>legitimate interests</strong> in responding to business enquiries.
              </td>
            </tr>
            <tr>
              <td>Delivering the work you’ve asked us to do, and supporting you afterwards</td>
              <td>
                <strong>Contract</strong>: we need the information to carry out our agreement with you or your business.
              </td>
            </tr>
            <tr>
              <td>Keeping accounts, invoices and tax records</td>
              <td>
                <strong>Legal obligation</strong>: UK tax law requires us to keep business records.
              </td>
            </tr>
            <tr>
              <td>Keeping our website and enquiry form secure and free of spam</td>
              <td>
                <strong>Legitimate interests</strong> in protecting our website, our business and its visitors.
              </td>
            </tr>
            <tr>
              <td>Dealing with complaints and legal claims</td>
              <td>
                <strong>Legitimate interests</strong> in protecting our business and responding fairly to concerns.
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Where we rely on legitimate interests, we have considered your rights and expectations and are satisfied our
          use is proportionate. You can object at any time (see section 10).
        </p>
        <p>
          <strong>Marketing:</strong> we don’t send marketing emails or newsletters. If that changes, we will only send
          them where the law allows, for example with your agreement, and every message will include an easy way to
          opt out. We never sell your personal information.
        </p>
        <p>
          <strong>Automated decisions:</strong> we don’t make decisions about you using automated processing or
          profiling.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    body: (
      <>
        <p>
          We use a small number of trusted service providers to run our website and email. They process personal
          information only on our instructions and under contracts that require them to keep it secure.
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">Provider</th>
              <th scope="col">What they do for us</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vercel</td>
              <td>Hosts our website and runs the enquiry form</td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Delivers enquiry form submissions to our inbox by email</td>
            </tr>
            <tr>
              <td>Microsoft 365 (provided through GoDaddy)</td>
              <td>Our business email, where enquiries and correspondence are received and stored</td>
            </tr>
          </tbody>
        </table>
        <p>We may also share information:</p>
        <ul>
          <li>with professional advisers, such as our accountant or legal advisers, where necessary</li>
          <li>with the police, HMRC, courts or regulators where the law requires us to</li>
          <li>with a buyer or successor if our business is ever sold or restructured, under the same protections</li>
        </ul>
        <p>
          If you message us on Instagram, Meta processes your information as a separate controller under{" "}
          <a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noopener noreferrer">
            Instagram’s privacy policy
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <>
        <p>
          Some of our providers are based in, or use servers in, the United States and other countries outside the UK.
          When your information is transferred outside the UK, we make sure it is protected by a safeguard recognised
          under UK law. This means either the UK’s “data bridge” with the United States, where the provider is
          certified, or the UK International Data Transfer Addendum to the European Commission’s Standard Contractual
          Clauses, included in each provider’s data processing terms.
        </p>
        <p>You can ask us for more information about these safeguards using the contact details in section 1.</p>
      </>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    body: (
      <>
        <p>We keep personal information only for as long as we need it:</p>
        <ul>
          <li>
            <strong>Enquiries that don’t lead to a project:</strong> up to 12 months after our last contact, so we can
            pick up the conversation if you come back to us. Then we delete them.
          </li>
          <li>
            <strong>Client records, invoices and correspondence:</strong> 6 years after the end of the financial year in
            which our work together ends, to meet tax and legal requirements.
          </li>
          <li>
            <strong>Website technical logs:</strong> the short period set by our hosting provider, typically days rather
            than months.
          </li>
        </ul>
        <p>You can ask us to delete your information sooner. We will, unless we have to keep it by law.</p>
      </>
    ),
  },
  {
    id: "keeping-it-secure",
    title: "How we keep it secure",
    body: (
      <>
        <p>
          We take appropriate technical and organisational measures to protect your information. Our website is served
          only over encrypted connections (HTTPS), the keys used to send enquiry emails are stored securely and never
          exposed in the website itself, and access to your information is limited to the people who need it to work
          with you.
        </p>
        <p>
          No method of sending or storing information is completely secure. If a data breach affects your rights, we
          will tell you and the Information Commissioner’s Office where the law requires us to.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <>
        <p>
          Our website doesn’t set cookies or use similar tracking technologies, and we don’t use analytics or
          advertising tools. Our fonts and images are served from our own website, so your visit isn’t shared with
          third-party services.
        </p>
        <p>
          If we ever add cookies that aren’t strictly necessary, we will ask for your consent first and update our{" "}
          <Link href="/cookies">cookie policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Our services are for businesses and adults. Our website isn’t aimed at children, and we don’t knowingly collect
        information from anyone under 16.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under UK data protection law you have the right to:</p>
        <ul>
          <li>
            <strong>access</strong> the personal information we hold about you and receive a copy
          </li>
          <li>
            <strong>correct</strong> information that is wrong or incomplete
          </li>
          <li>
            <strong>delete</strong> your information in certain circumstances
          </li>
          <li>
            <strong>restrict</strong> how we use your information in certain circumstances
          </li>
          <li>
            <strong>object</strong> to our use of your information where we rely on legitimate interests
          </li>
          <li>
            <strong>data portability</strong>: receive information you gave us in a reusable format, or have it sent to
            another organisation, where we rely on contract
          </li>
          <li>
            <strong>withdraw consent</strong> at any time, where we rely on your consent
          </li>
        </ul>
        <p>
          To use any of these rights, email {mail}. There is usually no charge. We may ask you to confirm your identity,
          and we will respond within one month. If your request is complex we can extend this by up to two further
          months, and we will tell you if we need to.
        </p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Complaints",
    body: (
      <>
        <p>
          If you’re unhappy with how we’ve handled your personal information, please tell us first at {mail} so we can
          put it right. We will acknowledge your complaint and respond without undue delay.
        </p>
        <p>
          You also have the right to complain to the Information Commissioner’s Office (ICO), the UK’s data protection
          regulator:
        </p>
        <ul>
          <li>
            Website:{" "}
            <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
              ico.org.uk/make-a-complaint
            </a>
          </li>
          <li>Helpline: 0303 123 1113</li>
          <li>Post: Information Commissioner’s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time, for example if we start using a new service provider. The latest
        version will always be on this page, with the date it was last updated at the top. If we make significant
        changes that affect how we use information we already hold, we will tell you directly where appropriate.
      </p>
    ),
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${businessName} collects, uses and protects personal information, and your rights under UK data protection law.`,
  path: "/privacy",
  noIndex: DRAFT,
});

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="How we collect, use and look after your personal information, and the rights you have over it."
      lastUpdated={LAST_UPDATED}
      sections={sections}
      draft={DRAFT}
    />
  );
}
