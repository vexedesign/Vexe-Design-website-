import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument, type LegalSection } from "@/components/LegalDocument";

/**
 * TERMS & CONDITIONS
 * Covers (1) use of this website and (2) the supply of web design services and
 * monthly support, to business and consumer clients. Written with reference to:
 * Consumer Rights Act 2015, Consumer Contracts Regulations 2013, Electronic
 * Commerce (EC Directive) Regulations 2002, Late Payment of Commercial Debts
 * (Interest) Act 1998, UK GDPR Article 28 and the Unfair Contract Terms Act 1977.
 * Company details come from site.config.ts. If you change a business term here
 * (deposit, payment days, support), update LAST_UPDATED. If you become VAT
 * registered, update the Prices section and add your VAT number under "who we are".
 */
const DRAFT = false;
const LAST_UPDATED = "9 October 2026";

const { businessName, email, phone, phoneHref, domain, pricing, company } = siteConfig;
const mail = <a href={`mailto:${email}`}>{email}</a>;
const packageList = pricing.packages.map((p) => `${p.name} (${p.price})`).join(", ");
const support = pricing.addOn;

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms and who we are",
    body: (
      <>
        <p>
          These terms apply when you use our website, {domain}, and when you buy services from us. Please read them
          carefully. By using our website or accepting a quote from us, you agree to them.
        </p>
        <ul>
          <li>
            <strong>Company:</strong> {company.legalName}, trading as {businessName}. Registered in{" "}
            {company.registeredIn}, company number {company.number}
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
          In these terms, “we”, “us” and “our” mean {company.legalName}. “You” means the person or business using our website
          or buying our services. A <strong>consumer</strong> is an individual acting for purposes outside their trade,
          business or profession. A <strong>business client</strong> is anyone else. Some sections apply differently
          depending on which you are, and we say so where that’s the case.
        </p>
      </>
    ),
  },
  {
    id: "website-use",
    title: "Using our website",
    body: (
      <>
        <p>
          You’re welcome to browse our website. The information on it is for general guidance about our services and
          may change. We try to keep it accurate and up to date, but it isn’t an offer to supply services and doesn’t
          form part of any agreement unless it is included in a quote.
        </p>
        <p>
          You must not misuse our website. That includes trying to gain unauthorised access, introducing viruses or
          harmful code, attacking it with automated traffic, or sending false enquiries.
        </p>
        <p>
          The design, text, graphics and code of our website belong to us or our licensors. You may view them and share
          links to our pages, but you may not copy or reuse them without our written permission.
        </p>
        <p>
          Our website links to other websites, such as Instagram. We don’t control those websites and aren’t responsible
          for their content or how they handle your information.
        </p>
      </>
    ),
  },
  {
    id: "services-and-quotes",
    title: "Our services and quotes",
    body: (
      <>
        <p>
          We design and build websites. Our packages are {packageList}. The package descriptions on our website show
          what each one typically includes. Because every project is tailored, the exact work we will do, the price and
          any timescales are set out in a <strong>written quote</strong> before we begin.
        </p>
        <p>
          A quote is valid for 30 days from the date we send it, unless it says otherwise. If what you
          need changes after you accept a quote, we will tell you how that affects the price and timescale, and agree
          it with you in writing before we do the extra work.
        </p>
        <p>
          If there is any conflict between your quote and these terms, the quote takes priority.
        </p>
      </>
    ),
  },
  {
    id: "prices",
    title: "Prices",
    body: (
      <>
        <p>
          Prices are in pounds sterling. We are not VAT registered, so no VAT is charged on our prices.
        </p>
        <p>
          Hosting, domain names, paid plug-ins, stock images and other third-party costs are not included in our
          package prices unless your quote says they are. We will explain any third-party costs before you commit to
          them.
        </p>
      </>
    ),
  },
  {
    id: "agreement",
    title: "How our agreement is formed",
    body: (
      <p>
        Our agreement with you starts when you accept our quote in writing (an email is fine) and we confirm we are
        starting work. Your accepted quote and these terms together make up the whole agreement between us. Nothing
        said before then forms part of it unless it is written into the quote.
      </p>
    ),
  },
  {
    id: "payment",
    title: "Payment",
    body: (
      <>
        <ul>
          <li>
            We ask for a 50% deposit before work begins. The balance is due when the website is ready to
            launch, and before it is made live.
          </li>
          <li>
            Invoices are payable within 14 days of the invoice date, by bank transfer to the account shown
            on the invoice.
          </li>
          <li>
            If payment is late, we may pause work, and delay launch or ongoing support, until it is made. We will tell
            you before doing so.
          </li>
          <li>
            <strong>Business clients:</strong> we may charge interest and fixed-sum compensation on late payments under
            the Late Payment of Commercial Debts (Interest) Act 1998.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-responsibilities",
    title: "What we need from you",
    body: (
      <>
        <p>To deliver your website on time, we need you to:</p>
        <ul>
          <li>give us the content, such as text, logos, photos and information, and any access we need, when we ask for it</li>
          <li>give feedback and approvals promptly, through one main contact if you’re a business</li>
          <li>make sure everything you supply is accurate, and that you own it or have permission to use it</li>
          <li>
            make sure your website’s content, including your business details, prices and any claims you make, complies
            with the laws that apply to your business
          </li>
        </ul>
        <p>
          You confirm that the content you supply won’t infringe anyone else’s rights. If we receive a claim because of
          content you supplied, you agree to cover our reasonable costs of dealing with it.
        </p>
        <p>
          If a project is put on hold because we haven’t heard from you for 60 days, we may close it and
          invoice for the work completed so far. We are happy to restart later, subject to our availability and an
          updated quote.
        </p>
      </>
    ),
  },
  {
    id: "timescales-and-revisions",
    title: "Timescales, feedback and revisions",
    body: (
      <>
        <p>
          Any timescales we give are our best estimate and depend on receiving your content and feedback on time. We
          will keep you updated if anything changes.
        </p>
        <p>
          Your quote includes two rounds of revisions at the design stage. Further revisions, or changes to
          an approved design, may be charged at our standard rate, which we will confirm with you before starting.
        </p>
        <p>
          Before launch we will ask you to review the finished website. Your approval confirms you are happy for it to
          go live.
        </p>
      </>
    ),
  },
  {
    id: "launch-and-third-parties",
    title: "Launch, hosting and third-party services",
    body: (
      <>
        <p>
          Websites rely on services from other companies, such as hosting providers, domain registrars and email
          services. Where you hold the account, for example your domain name, you are responsible for keeping it paid
          and renewed. Third-party services are provided under their own terms. We can’t control them and are not
          responsible for their outages, changes or prices.
        </p>
        <p>
          We build websites to work on current versions of the major browsers and on mobile, tablet and desktop
          devices. We can’t guarantee search engine rankings, a particular number of enquiries, or other business
          results. These depend on many factors outside our control.
        </p>
      </>
    ),
  },
  {
    id: "support",
    title: `${support.name} (${support.price} ${support.period})`,
    body: (
      <>
        <p>
          Our optional monthly support costs {support.price} {support.period}. It covers keeping your website online,
          secure and up to date, fixing faults, and a reasonable amount of small content changes each month, such as
          updating text, prices, opening hours or photos.
        </p>
        <p>
          You can report a problem at any time, day or night, by email or phone. We treat urgent issues, such as your
          website being down, as a priority, and aim to respond to everything else within one working day. New pages,
          new features and larger changes aren’t included and will be quoted separately before we start.
        </p>
        <p>
          Support runs month to month and is paid in advance. Either of us can end it by giving{" "}
          30 days’ written notice. We may change the monthly price by giving you at least 30 days’ notice,
          and you may cancel before the change takes effect.
        </p>
      </>
    ),
  },
  {
    id: "ownership",
    title: "Ownership of your website",
    body: (
      <>
        <p>
          <strong>Once you have paid all amounts due for your project in full</strong>, we transfer to you the
          copyright in the final designs and content we created specifically for you. On request, we will sign any
          document needed to confirm this. Until then, you may use the work only with our permission.
        </p>
        <p>
          We keep ownership of our own tools, reusable code, templates and know-how that existed before your project or
          weren’t made only for you. We give you a permanent, free licence to use them as part of your website.
        </p>
        <p>
          Some elements, such as fonts, stock images and software libraries, belong to third parties and are licensed
          under their own terms. Where a licence has to be in your name, we will tell you.
        </p>
        <p>
          You keep ownership of everything you supply to us, and you give us permission to use it to carry out your
          project.
        </p>
      </>
    ),
  },
  {
    id: "portfolio",
    title: "Our portfolio",
    body: (
      <p>
        Once your website is live, we may show it in our portfolio, on our website and on social media. If you’d rather
        we didn’t, tell us in writing and we won’t. We will never share confidential information about your business.
      </p>
    ),
  },
  {
    id: "fixes",
    title: "Fixes after launch",
    body: (
      <p>
        If you find a fault in the work we delivered within 30 days of launch, we will fix it free of
        charge. This doesn’t cover problems caused by changes made by you or anyone else, by third-party services, or
        by new requests. If you are a consumer, this is in addition to your legal rights under the Consumer Rights Act
        2015, which requires our services to be carried out with reasonable care and skill.
      </p>
    ),
  },
  {
    id: "cancellation",
    title: "Cancelling",
    body: (
      <>
        <h3>If you are a consumer</h3>
        <p>
          Because our agreement is made at a distance (online, by email or by phone), you have the legal right to cancel
          within <strong>14 days</strong> of the day our agreement is formed, without giving a reason. To cancel, send us
          a clear statement by email to {mail}. We will refund any money you have paid within 14 days of receiving your
          request, using the same payment method.
        </p>
        <p>
          If you ask us to start work within the 14-day period, you must pay for the work we have carried out up to the
          time you tell us you are cancelling. If we have fully completed the work at your request within the 14 days,
          you will lose the right to cancel.
        </p>
        <h3>If you are a business client</h3>
        <p>
          You can cancel a project at any time by telling us in writing. You will need to pay for the work we have
          carried out up to the date of cancellation, and any third-party costs we have already committed to for you.
          We will deduct these from any deposit you have paid and refund the rest, or invoice you for any shortfall.
        </p>
        <h3>If we need to cancel</h3>
        <p>
          We may end our agreement if you don’t pay amounts that are due, seriously break these terms, or ask us to do
          something unlawful. If we cancel for any other reason, we will refund any money you have paid for work we
          haven’t done.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Our responsibility to you",
    body: (
      <>
        <p>
          Nothing in these terms limits or excludes our liability for death or personal injury caused by our
          negligence, for fraud, or for anything else that cannot legally be limited or excluded. Nor do they affect
          your legal rights as a consumer.
        </p>
        <p>
          <strong>If you are a consumer</strong>, we are responsible for loss or damage you suffer that is a foreseeable
          result of our breaking these terms or failing to use reasonable care and skill. We are not responsible for
          losses that weren’t foreseeable, or for business losses if you use our services for a business.
        </p>
        <p>
          <strong>If you are a business client</strong>, we are not liable for loss of profits, revenue, business,
          goodwill or data, or for any indirect or consequential loss. Our total liability arising from any project is
          limited to the total fees you have paid us for that project.
        </p>
        <p>
          We are not responsible for delays or failures caused by events outside our reasonable control, such as
          failures of third-party services, internet outages or illness. If that happens, we will let you know and do
          what we reasonably can to limit the effect.
        </p>
        <p>
          We recommend keeping your own copies of the content you supply to us. Where we manage a website for you, we
          take reasonable steps to protect it, but we can’t guarantee it will be free from every interruption or
          security threat.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality-and-data",
    title: "Confidentiality and data protection",
    body: (
      <>
        <p>
          We keep information about your business confidential and only use it to provide our services, unless the law
          requires us to share it. Our <Link href="/privacy">privacy policy</Link> explains how we handle your personal
          information.
        </p>
        <p>
          <strong>Your customers’ data:</strong> where we host or manage your website, we may handle personal
          information on your behalf, such as enquiries submitted through your website’s contact form. In that case you
          are the data controller and we are your data processor. We will:
        </p>
        <ul>
          <li>process it only on your documented instructions, and only to provide our services to you</li>
          <li>make sure anyone who has access to it is bound to keep it confidential</li>
          <li>keep it secure with appropriate technical and organisational measures</li>
          <li>
            use other processors (such as hosting and email delivery providers) only under written terms that give the
            same protection, and tell you about any changes to them so you can object
          </li>
          <li>help you respond to requests from people exercising their data protection rights, and with your own security obligations</li>
          <li>tell you without undue delay if we become aware of a personal data breach affecting it</li>
          <li>delete or return it when our services end, unless the law requires us to keep it</li>
          <li>give you the information you reasonably need to show you are complying with data protection law</li>
        </ul>
        <p>
          You are responsible for having a lawful basis for collecting your customers’ data, and for having your own
          privacy policy on your website. We are happy to help you prepare one.
        </p>
      </>
    ),
  },
  {
    id: "complaints-and-law",
    title: "Complaints, disputes and the law that applies",
    body: (
      <>
        <p>
          If you’re unhappy with our work or service, please tell us at {mail}. We will try to resolve any concern
          quickly and fairly.
        </p>
        <p>
          These terms are governed by the law of England and Wales, and the courts of England and Wales will deal with
          any dispute. If you are a consumer living in Scotland or Northern Ireland, you may also bring proceedings in
          your local courts.
        </p>
        <p>
          If any part of these terms is found to be unenforceable, the rest will still apply. If we don’t enforce a
          right straight away, we can still enforce it later. Only you and we have rights under our agreement. No one
          else can enforce it.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. The version that applies to your project is the one published when
        you accepted your quote. Changes don’t affect agreements already made unless we both agree in writing. The date
        at the top shows when these terms were last updated.
      </p>
    ),
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms that apply to using the ${businessName} website and to our web design services and support.`,
  path: "/terms",
  noIndex: DRAFT,
});

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      intro="The terms that apply when you use our website and when we design, build and support a website for you."
      lastUpdated={LAST_UPDATED}
      sections={sections}
      draft={DRAFT}
    />
  );
}
