import { siteConfig } from "@/site.config";

/**
 * Enquiry form schema and validation. Shared by the browser (instant feedback)
 * and the API route (the server never trusts the browser).
 */
export type EnquiryInput = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  budget: string;
  details: string;
  contactMethod: string;
  /** Honeypot. Real people never see or fill this in. */
  company: string;
};

export type EnquiryField = Exclude<keyof EnquiryInput, "company">;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryInput = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  service: "",
  budget: "",
  details: "",
  contactMethod: "",
  company: "",
};

export const LIMITS = { short: 120, details: 3000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// UK and international numbers: digits, spaces, +, brackets and dashes, 10–15 digits.
const PHONE = /^[+()\-\s\d]{10,22}$/;

export function validateField(field: EnquiryField, raw: string, all?: Partial<EnquiryInput>): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "fullName":
      if (!value) return "Enter your full name.";
      if (value.length < 2) return "Name must be at least 2 characters.";
      if (value.length > LIMITS.short) return "Name is too long.";
      return;
    case "businessName":
    case "website":
      if (value.length > LIMITS.short * 2) return "This is too long.";
      return;
    case "email":
      if (!value) return "Enter your email address.";
      if (!EMAIL.test(value)) return "Enter an email address like name@example.co.uk.";
      return;
    case "phone": {
      const digits = value.replace(/\D/g, "").length;
      const needed = all?.contactMethod === "Phone";
      if (!value) return needed ? "Enter a phone number so we can call you back." : undefined;
      if (!PHONE.test(value) || digits < 10 || digits > 15) return "Enter a phone number like 07700 900123.";
      return;
    }
    case "service":
      if (!value) return "Choose the service you need.";
      if (!siteConfig.form.services.includes(value)) return "Choose a service from the list.";
      return;
    case "budget":
      if (!value) return "Choose a budget, or select “Not sure yet”.";
      if (!siteConfig.form.budgets.includes(value)) return "Choose a budget from the list.";
      return;
    case "details":
      if (!value) return "Tell us a little about your project.";
      if (value.length < 20) return "Add a little more detail (at least 20 characters).";
      if (value.length > LIMITS.details) return `Keep this under ${LIMITS.details.toLocaleString("en-GB")} characters.`;
      return;
    case "contactMethod":
      if (!value) return "Choose how you'd like us to contact you.";
      if (!siteConfig.form.contactMethods.includes(value)) return "Choose an option from the list.";
      return;
  }
}

export const FIELD_ORDER: EnquiryField[] = [
  "fullName",
  "businessName",
  "email",
  "phone",
  "website",
  "service",
  "budget",
  "details",
  "contactMethod",
];

export function validateEnquiry(input: Partial<EnquiryInput>): EnquiryErrors {
  const errors: EnquiryErrors = {};
  for (const field of FIELD_ORDER) {
    const message = validateField(field, String(input[field] ?? ""), input);
    if (message) errors[field] = message;
  }
  return errors;
}

/** Map a pricing package id (from ?package=) to a budget option. */
export function budgetForPackage(id: string | undefined): string {
  const pkg = siteConfig.pricing.packages.find((p) => p.id === id);
  return pkg && siteConfig.form.budgets.includes(pkg.price) ? pkg.price : "";
}
