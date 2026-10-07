/**
 * ============================================================================
 *  VEXE DESIGN: SITE CONFIGURATION
 * ============================================================================
 *  This is the ONE file to edit for almost everything on the website.
 *  You do not need to be a developer. Change the text between the quote marks
 *  ("like this"), save the file, and the site updates.
 *
 *  Quick map of this file:
 *    1. BUSINESS      name, domain, email, phone, Instagram
 *    2. BRAND ASSETS  logo, favicon, hero image, social sharing image
 *    3. COLOURS       the whole colour palette
 *    4. SEO           page titles and descriptions
 *    5. HOMEPAGE      hero, positioning, process, "why Vexe"
 *    6. SERVICES      the five services
 *    7. PRICING       the three packages (prices, features, badges)
 *    8. PORTFOLIO     project cards (currently "Coming soon")
 *    9. INSTAGRAM     the showcase tiles
 *   10. FAQ           pricing page questions
 *
 *  Tip: keep the quote marks and commas exactly as they are. If the site shows
 *  an error after an edit, you have probably deleted a quote mark or a comma.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. BUSINESS DETAILS
// ---------------------------------------------------------------------------
const domain = "vexedesign.com"; // Your final domain, with no "https://" and no "www".

export const siteConfig = {
  /** Your business name. Shown in the header, footer, page titles and emails. */
  businessName: "Vexe Design",

  /** Short line used in the footer and in search results. */
  tagline: "Premium websites for ambitious businesses.",

  /** Your domain. Used for canonical URLs, the sitemap and social sharing. */
  domain,

  /** Full web address, built from the domain above. Don't edit this line. */
  siteUrl: `https://${domain}`,

  /** Where enquiries are shown as going to. (The real delivery address is set in .env.local; see the README.) */
  email: "contact@vexedesign.com",

  /** Phone number exactly as you want it displayed. */
  phone: "07730 424516",

  /** Phone number in international format with NO spaces. Used for tap-to-call links. */
  phoneHref: "tel:+447730424516",

  /** Instagram handle (shown on the site). */
  instagram: "@vexedesign",

  /** Link behind every Instagram button. */
  instagramUrl: "https://instagram.com/vexedesign",

  /** Year shown in the copyright line. */
  copyrightYear: 2026,

  // -------------------------------------------------------------------------
  // 2. BRAND ASSETS: replace the files in /public/images with your own,
  //    keeping the same file names, OR change the paths below.
  // -------------------------------------------------------------------------
  assets: {
    /**
     * Logo for DARK backgrounds (header, footer). Light artwork. SVG or PNG.
     * The current file is a vector recreation of the Vexe Design lockup;
     * if you have the original master SVG, drop it in with the same name.
     */
    logo: "/images/logo.svg",

    /** Logo for LIGHT backgrounds (dark artwork). */
    logoOnLight: "/images/logo-dark.svg",

    /** The V symbol on its own. */
    logoMark: "/images/logo-mark.svg",

    /** Width of the logo in the header, in pixels. Adjust if your logo is wider or narrower. */
    logoWidth: 124,

    /** Browser-tab icon (SVG) and the icon used when someone saves the site to their phone home screen (PNG, 180 × 180). */
    favicon: "/favicon.svg",
    appleTouchIcon: "/apple-touch-icon.png",

    /** Image shown when your link is shared on WhatsApp, Facebook, LinkedIn, X etc. 1200 × 630 px. */
    ogImage: "/images/og.png",

    /**
     * Optional hero/banner photo, for example "/images/hero.jpg".
     * Leave as "" to use the built-in animated visual (recommended until you
     * have a strong image). When set, the photo sits behind the headline with a
     * dark overlay so the text always stays readable.
     */
    heroImage: "",
  },

  // -------------------------------------------------------------------------
  // 3. COLOURS: any CSS colour works (hex is easiest, e.g. "#3F52F2").
  // -------------------------------------------------------------------------
  colors: {
    /** Vexe violet: buttons, highlights, the "most popular" package. Taken from the logo. */
    accent: "#5B3DF5",
    /** Lighter violet. Used for text and fine lines on dark backgrounds, where the main violet would be too dark to read. */
    accentBright: "#A797FF",
    /** Vexe ink (near-black from the logo): dark sections, header, footer, main text. */
    ink: "#14151A",
    /** Slightly lighter ink: cards and panels sitting on the dark background. */
    inkRaised: "#1D1E25",
    /** Vexe off-white (from the logo): the main page background. */
    paper: "#F5F4F0",
    /** Pure white: cards on the off-white background. */
    white: "#FFFFFF",
    /** Soft warm grey: borders, dividers, quiet details on light backgrounds. */
    mist: "#DEDCD5",
  },

  // -------------------------------------------------------------------------
  // 4. SEO: page titles and descriptions shown in Google
  // -------------------------------------------------------------------------
  seo: {
    home: {
      title: "Vexe Design | Premium Web Design for Ambitious Businesses",
      description:
        "Vexe Design creates premium, modern and conversion-focused websites for businesses that want to stand out online.",
    },
    services: {
      title: "Web Design Services for Garages, Trades and Local Businesses",
      description:
        "Website design, development, redesigns, responsive design and conversion-focused layouts from Vexe Design.",
    },
    pricing: {
      title: "Website Packages and Pricing",
      description:
        "Three clear website packages from £499: Essentials, Enhanced and Scale. Premium design built to generate enquiries.",
    },
    contact: {
      title: "Contact Us and Start Your Project",
      description:
        "Tell us about your business and your goals. Send an enquiry to Vexe Design for a website built to win you more customers.",
    },
  },

  // -------------------------------------------------------------------------
  // 5. HOMEPAGE
  // -------------------------------------------------------------------------

  /**
   * Your specialist sector. Vexe specialises in garages and service stations
   * but works with every trade and business. The specialism is mentioned in
   * the hero note, the services page and the FAQ; edit those lines to change it.
   */
  audience: {
    /** Singular, used for the example website in the hero mock-up ("Your Garage"). */
    singular: "garage",
  },

  hero: {
    /** The headline is split on the "|" so you control where the lines break. */
    headline: "We build websites|that move businesses|forward.",
    intro:
      "Premium websites for ambitious businesses. Designed to look exceptional, built to perform and to turn visitors into enquiries.",
    primaryCta: "Start Your Project",
    secondaryCta: "Explore Our Services",
    /** Short line under the buttons, beside the pulsing dot. */
    note: "Specialists in garages and service stations. Open to every trade and business.",
  },

  positioning: {
    heading: "Not just another website.",
    intro:
      "A website is the first thing most customers see of your business, and it decides whether they get in touch with you or with a competitor. Every site we build is shaped around four things.",
    pillars: [
      {
        title: "Brand",
        text: "Your colours, your tone and your character, so the site looks like your business and nobody else's.",
      },
      {
        title: "User experience",
        text: "Clear pages, honest navigation and no hunting. Visitors find what they came for within seconds.",
      },
      {
        title: "Performance",
        text: "Lean code and optimised images. Pages that load quickly on a phone with a weak signal.",
      },
      {
        title: "Conversion",
        text: "Every page leads somewhere: a call, an enquiry, a booking. Nothing is there just to fill space.",
      },
    ],
  },

  process: {
    heading: "From first call to live site.",
    intro: "Four steps, and you know where you are at each one.",
    steps: [
      {
        title: "Discover",
        text: "We learn how your business runs, who your customers are and what you want the site to do. You get a clear plan and a quote.",
      },
      {
        title: "Design",
        text: "We design the key pages around your brand, starting with mobile. You review them and we refine until you're happy.",
      },
      {
        title: "Build",
        text: "The approved design is built into a fast, responsive site, with your enquiry form working and the SEO basics in place.",
      },
      {
        title: "Launch",
        text: "We test everything, connect your domain and go live. Then we walk you through how it all works.",
      },
    ],
  },

  why: {
    heading: "Why not just use a website builder?",
    intro:
      "Builders are fine for a quick placeholder. They're not designed to make your business look like the best choice in town.",
    leftTitle: "A template builder",
    rightTitle: "Vexe Design",
    rows: [
      { left: "Starts from a template thousands of others use.", right: "Designed from scratch around your brand and your customers." },
      { left: "Heavy pages, slowed down by plug-ins and add-ons.", right: "Lean code, optimised images, built to load fast." },
      { left: "A desktop layout squeezed down for phones.", right: "Mobile layouts designed first, then scaled up." },
      { left: "A contact form tucked away in the footer.", right: "Every page leads to a call or an enquiry." },
      { left: "Search visibility left to chance.", right: "Structure, headings and metadata set up properly from day one." },
    ],
  },

  finalCta: {
    heading: "Ready to build something better?",
    text: "Tell us about your business. We'll tell you honestly what we'd build and what it would cost.",
    cta: "Start Your Project",
  },

  // -------------------------------------------------------------------------
  // 6. SERVICES (shown as cards on the homepage and in full on /services)
  //    `visual` picks the illustration: design | development | redesign |
  //    responsive | conversion
  //    `id` is used in links, e.g. /services#website-redesign
  // -------------------------------------------------------------------------
  services: [
    {
      id: "website-design",
      visual: "design",
      title: "Website Design",
      short: "Bespoke design shaped around your brand, your customers and what you need the site to achieve.",
      description:
        "Every site starts with your brand, your audience and your business goals, not a template. We design the layout, typography, colour and imagery so your business looks established and trustworthy from the first glance, and so the right customers know straight away that you're the one to call.",
      benefits: [
        "Designed around your brand and your customers",
        "Clear hierarchy that guides visitors to act",
        "A look that stands apart from local competitors",
        "Mobile, tablet and desktop designed together",
      ],
      cta: "Discuss your design",
      /** Which option is pre-selected in the enquiry form when this service's button is clicked. */
      formOption: "Website Design",
    },
    {
      id: "website-development",
      visual: "development",
      title: "Website Development",
      short: "Fast, clean, responsive builds that work properly on every device.",
      description:
        "A beautiful design is only half the job. We build with modern, lightweight code so pages load quickly, behave properly on every screen and stay easy to maintain. Your enquiry form is built, tested and connected to your inbox, not left as a mock-up.",
      benefits: [
        "Lightweight code and optimised images",
        "Working enquiry form delivered to your email",
        "Accessible, semantic structure",
        "SEO fundamentals built in",
      ],
      cta: "Discuss your build",
      /** Which option is pre-selected in the enquiry form when this service's button is clicked. */
      formOption: "Website Development",
    },
    {
      id: "website-redesign",
      visual: "redesign",
      title: "Website Redesign",
      short: "Turn an outdated, slow or confusing site into one you're proud to send people to.",
      description:
        "If your current site looks dated, loads slowly or is awkward on a phone, it's costing you enquiries. We keep what works, replace what doesn't and rebuild the whole thing into a modern, fast and clear experience that reflects the business you run today.",
      benefits: [
        "Keeps your existing content and what already works",
        "Modern look and a much faster feel",
        "Fixes poor mobile layouts",
        "Clearer routes to call or enquire",
      ],
      cta: "Get a redesign quote",
      /** Which option is pre-selected in the enquiry form when this service's button is clicked. */
      formOption: "Website Redesign",
    },
    {
      id: "responsive-design",
      visual: "responsive",
      title: "Responsive Design",
      short: "Layouts designed properly for phone, tablet and desktop, not just resized.",
      description:
        "Customers will visit on a phone in a car park, a tablet on the sofa and a laptop at work. We design each screen size on purpose, so text is comfortable to read, buttons are easy to tap and nothing is cramped or hidden.",
      benefits: [
        "Designed for mobile, tablet and desktop",
        "Large, easy-to-tap buttons",
        "Readable text at every size",
        "Tested across common screen sizes",
      ],
      cta: "Discuss responsive design",
      /** Which option is pre-selected in the enquiry form when this service's button is clicked. */
      formOption: "Website Design",
    },
    {
      id: "conversion-focused-design",
      visual: "conversion",
      title: "Conversion-Focused Design",
      short: "Layout, hierarchy and call-to-action placement planned to bring in more enquiries.",
      description:
        "Where a button sits, what a heading says and how a page is ordered all change how many visitors get in touch. We plan the layout, call-to-action placement, content hierarchy and user journey so contacting you is the natural next step on every page.",
      benefits: [
        "Calls to action placed where people decide",
        "Content ordered by what customers need to know",
        "Short, low-friction enquiry forms",
        "Trust signals in the right places",
      ],
      cta: "Improve your enquiries",
      /** Which option is pre-selected in the enquiry form when this service's button is clicked. */
      formOption: "Other",
    },
  ],

  // -------------------------------------------------------------------------
  // 7. PRICING: three packages.
  //    `featured: true` highlights a package with the badge. Only use it once.
  //    `includesNote` is shown above the list for packages that build on another.
  // -------------------------------------------------------------------------
  pricing: {
    heading: "Clear pricing. No surprises.",
    intro: "Three packages, each priced up front, so you know where you stand before we begin.",
    disclaimer: "All projects are tailored to your requirements. Final pricing may vary depending on scope.",
    badge: "Most popular",

    /** Ongoing monthly support, shown at the bottom of every package. */
    addOn: {
      label: "Add-on",
      name: "24/7 professional support",
      price: "£50",
      period: "a month",
    },

    packages: [
      {
        id: "essentials",
        name: "Essentials",
        price: "£499",
        description: "Everything you need to establish a professional online presence.",
        featured: false,
        includesNote: "",
        features: [
          "Standard 3-page website",
          "Bespoke responsive design",
          "Mobile & tablet optimisation",
          "Contact page",
          "Basic SEO setup",
          "Professional UI/UX",
          "Fast-loading website",
        ],
        cta: "Choose Essentials",
      },
      {
        id: "enhanced",
        name: "Enhanced",
        price: "£799",
        description: "A more powerful website built to generate enquiries and grow with your business.",
        featured: true,
        includesNote: "Everything in Essentials, plus:",
        features: [
          "Up to 5 pages",
          "Dedicated enquiries page",
          "Enquiry/contact form",
          "Customer name field",
          "Customer email field",
          "Customer phone number field",
          "Customer message field",
          "Enquiry notifications",
          "Enhanced SEO",
          "Advanced animations",
          "Enhanced user experience",
          "Conversion-focused layout",
          "Priority development",
        ],
        cta: "Choose Enhanced",
      },
      {
        id: "scale",
        name: "Scale",
        price: "£999",
        description: "For businesses ready for a larger, more advanced digital presence.",
        featured: false,
        includesNote: "",
        features: [
          "Larger multi-page website",
          "Advanced custom design",
          "Advanced animations",
          "Enhanced UX",
          "Advanced contact/enquiry functionality",
          "Conversion optimisation",
          "Advanced SEO setup",
          "Social media integration",
          "Performance optimisation",
          "Custom sections",
          "Scalable architecture",
          "Priority support",
        ],
        cta: "Choose Scale",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 8. PORTFOLIO: replace each "Coming soon" card with a real project.
  //    Set `comingSoon: false`, then fill in title, category, summary, image
  //    (e.g. "/images/portfolio/project-01.jpg") and `url`.
  // -------------------------------------------------------------------------
  portfolio: {
    heading: "Selected work.",
    intro: "Our first client projects will appear here. Each one will show the site, the thinking behind it and the result.",
    projects: [
      { id: "project-01", comingSoon: true, title: "Project 01", category: "Coming soon", summary: "", image: "", url: "" },
      { id: "project-02", comingSoon: true, title: "Project 02", category: "Coming soon", summary: "", image: "", url: "" },
      { id: "project-03", comingSoon: true, title: "Project 03", category: "Coming soon", summary: "", image: "", url: "" },
    ],
  },

  // -------------------------------------------------------------------------
  // 9. INSTAGRAM
  //    We do not connect to Instagram automatically. To show real posts, add
  //    them below, e.g. { image: "/images/instagram/post-1.jpg", alt: "…", url: "https://instagram.com/p/XXXX" }
  //    Leave the list empty to show the designed placeholder tiles.
  // -------------------------------------------------------------------------
  instagramSection: {
    heading: "See what we're creating.",
    text: "Behind-the-scenes builds, design details and finished projects. Follow along on Instagram.",
    cta: "Follow on Instagram",
    posts: [] as { image: string; alt: string; url: string }[],
  },

  // -------------------------------------------------------------------------
  // 10. FAQ (shown on the pricing page)
  // -------------------------------------------------------------------------
  faq: [
    {
      q: "Do you only work with garages?",
      a: "No. Garages and service stations are our specialism, so we know what drivers look for and what makes them pick up the phone. We bring the same care to every project, whether you're a tradesperson, a local service, a startup or a personal brand.",
    },
    {
      q: "Which package is right for my business?",
      a: "Essentials suits a business that needs a professional, mobile-friendly site with its services and contact details. Enhanced adds a proper enquiry form and extra pages, and is the one most businesses should consider. Scale is for larger or more complex sites. Not sure? Send an enquiry and we'll recommend one.",
    },
    {
      q: "Can I upgrade later?",
      a: "Yes. Sites are built to be added to, so you can move up a package or add pages as the business grows. We'll quote for any extra work first.",
    },
    {
      q: "Do the prices include hosting and a domain?",
      a: "Hosting and domain names are paid to the provider rather than to us, and costs vary. We'll explain the options, help you set them up and confirm any running costs in your quote.",
    },
    {
      q: "How do enquiries reach me?",
      a: "On Enhanced and Scale, enquiries from your website form are sent to your email address, so you can reply directly to the customer.",
    },
    {
      q: "What if I need something that isn't listed?",
      a: "Tell us. Every project is tailored to your requirements, and we'll be clear about any change to scope or price before we start.",
    },
  ],

  // -------------------------------------------------------------------------
  // NAVIGATION (header and footer links)
  // -------------------------------------------------------------------------
  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Start a Project", href: "/contact" },
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },

  // -------------------------------------------------------------------------
  // CONTACT FORM OPTIONS (these appear in the dropdowns on /contact)
  // -------------------------------------------------------------------------
  form: {
    services: ["Website Design", "Website Redesign", "Website Development", "Other"],
    budgets: ["£499", "£799", "£999", "£1,000+", "Not sure yet"],
    contactMethods: ["Email", "Phone", "Either is fine"],
  },
};

export type SiteConfig = typeof siteConfig;
export type Service = (typeof siteConfig.services)[number];
export type Package = (typeof siteConfig.pricing.packages)[number];
