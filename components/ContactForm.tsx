"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { siteConfig } from "@/site.config";
import {
  FIELD_ORDER,
  LIMITS,
  emptyEnquiry,
  validateEnquiry,
  validateField,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryInput,
} from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  defaultService?: string;
  defaultBudget?: string;
};

export function ContactForm({ defaultService = "", defaultBudget = "" }: ContactFormProps) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<EnquiryInput>({
    ...emptyEnquiry,
    service: siteConfig.form.services.includes(defaultService) ? defaultService : "",
    budget: defaultBudget,
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<{ code: string; message: string } | null>(null);

  const id = (f: string) => `${uid}-${f}`;

  function update(field: keyof EnquiryInput, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (field !== "company" && touched[field]) {
      setErrors((e) => ({ ...e, [field]: validateField(field, value, next) }));
    }
    // Phone becomes required when "Phone" is the preferred contact method.
    if (field === "contactMethod" && touched.phone) {
      setErrors((e) => ({ ...e, phone: validateField("phone", next.phone, next) }));
    }
  }

  const onChange = (field: keyof EnquiryInput) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    update(field, e.target.value);

  function onBlur(field: EnquiryField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, values[field], values) }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validateEnquiry(values);
    setErrors(found);
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { ok: boolean; code?: string; message?: string; errors?: EnquiryErrors } = await res
        .json()
        .catch(() => ({ ok: false }));

      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError({
        code: data.code ?? "unknown",
        message: data.message ?? "Your enquiry couldn't be sent just now.",
      });
      setStatus("error");
    } catch {
      setServerError({ code: "network", message: "We couldn't reach our server. Check your connection and try again." });
      setStatus("error");
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const showSummary = errorCount > 0 && FIELD_ORDER.every((f) => touched[f]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            aria-live="polite"
            className="flex min-h-[32rem] flex-col items-start justify-center py-6"
          >
            <span className="grid size-16 place-items-center rounded-full bg-accent text-white">
              <Icon name="check" size={28} strokeWidth={2.4} />
            </span>
            <h2 className="mt-8 font-display text-[2.4rem] leading-none tracking-[-0.03em] text-ink">Enquiry sent.</h2>
            <p className="mt-5 max-w-md text-lg text-slate">
              Thanks, {values.fullName.split(" ")[0]}. Your enquiry is with us and we&apos;ll be in touch by{" "}
              {values.contactMethod === "Phone" ? "phone" : values.contactMethod === "Email" ? "email" : "phone or email"}.
            </p>
            <p className="mt-3 max-w-md text-slate">
              Need us sooner? Call{" "}
              <a href={siteConfig.phoneHref} className="link-draw font-medium text-ink">
                {siteConfig.phone}
              </a>
              .
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            aria-describedby={`${id("required")}`}
            className="grid gap-x-5 gap-y-6 md:grid-cols-2"
          >
            <p id={id("required")} className="text-sm text-slate md:col-span-2">
              Fields marked <span aria-hidden="true" className="text-accent">*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>

            {showSummary && (
              <div role="alert" className="flex gap-3 rounded-2xl border border-[#c4322b]/30 bg-[#c4322b]/[0.06] p-4 text-sm text-[#a3271f] md:col-span-2">
                <Icon name="plus" size={18} className="mt-0.5 shrink-0 rotate-45" strokeWidth={2.2} />
                <span>
                  {errorCount === 1 ? "One field needs" : `${errorCount} fields need`} attention before you can send your enquiry.
                </span>
              </div>
            )}

            <Field label="Full name" required htmlFor={id("fullName")} error={errors.fullName}>
              <input
                id={id("fullName")}
                name="fullName"
                type="text"
                autoComplete="name"
                className="field"
                value={values.fullName}
                onChange={onChange("fullName")}
                onBlur={() => onBlur("fullName")}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? id("fullName-error") : undefined}
                aria-required="true"
                maxLength={LIMITS.short}
              />
            </Field>

            <Field label="Business name" htmlFor={id("businessName")} error={errors.businessName}>
              <input
                id={id("businessName")}
                name="businessName"
                type="text"
                autoComplete="organization"
                className="field"
                value={values.businessName}
                onChange={onChange("businessName")}
                onBlur={() => onBlur("businessName")}
                aria-invalid={!!errors.businessName}
                aria-describedby={errors.businessName ? id("businessName-error") : undefined}
                maxLength={LIMITS.short * 2}
              />
            </Field>

            <Field label="Email address" required htmlFor={id("email")} error={errors.email}>
              <input
                id={id("email")}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className="field"
                value={values.email}
                onChange={onChange("email")}
                onBlur={() => onBlur("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? id("email-error") : undefined}
                aria-required="true"
              />
            </Field>

            <Field
              label="Phone number"
              required={values.contactMethod === "Phone"}
              htmlFor={id("phone")}
              error={errors.phone}
            >
              <input
                id={id("phone")}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="field"
                value={values.phone}
                onChange={onChange("phone")}
                onBlur={() => onBlur("phone")}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? id("phone-error") : undefined}
              />
            </Field>

            <Field label="Current website" hint="If you have one" htmlFor={id("website")} error={errors.website} wide>
              <input
                id={id("website")}
                name="website"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="www.yourbusiness.co.uk"
                className="field"
                value={values.website}
                onChange={onChange("website")}
                onBlur={() => onBlur("website")}
                aria-invalid={!!errors.website}
                aria-describedby={
                  [id("website-hint"), errors.website ? id("website-error") : ""].filter(Boolean).join(" ") || undefined
                }
              />
            </Field>

            <Field label="Service required" required htmlFor={id("service")} error={errors.service}>
              <select
                id={id("service")}
                name="service"
                className={cn("field", !values.service && "text-slate")}
                value={values.service}
                onChange={onChange("service")}
                onBlur={() => onBlur("service")}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? id("service-error") : undefined}
                aria-required="true"
              >
                <option value="" disabled>
                  Choose a service
                </option>
                {siteConfig.form.services.map((s) => (
                  <option key={s} value={s} className="text-ink">
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Budget" required htmlFor={id("budget")} error={errors.budget}>
              <select
                id={id("budget")}
                name="budget"
                className={cn("field", !values.budget && "text-slate")}
                value={values.budget}
                onChange={onChange("budget")}
                onBlur={() => onBlur("budget")}
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? id("budget-error") : undefined}
                aria-required="true"
              >
                <option value="" disabled>
                  Choose a budget
                </option>
                {siteConfig.form.budgets.map((b) => (
                  <option key={b} value={b} className="text-ink">
                    {b}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Project details"
              required
              htmlFor={id("details")}
              error={errors.details}
              wide
              aside={
                <span className={cn("text-xs tabular-nums", values.details.length > LIMITS.details ? "text-[#c4322b]" : "text-slate")}>
                  {values.details.length.toLocaleString("en-GB")} / {LIMITS.details.toLocaleString("en-GB")}
                </span>
              }
            >
              <textarea
                id={id("details")}
                name="details"
                rows={6}
                placeholder="Tell us a little about your project..."
                className="field min-h-[10rem] resize-y leading-relaxed"
                value={values.details}
                onChange={onChange("details")}
                onBlur={() => onBlur("details")}
                aria-invalid={!!errors.details}
                aria-describedby={errors.details ? id("details-error") : undefined}
                aria-required="true"
              />
            </Field>

            <fieldset
              className="md:col-span-2"
              aria-invalid={!!errors.contactMethod}
              aria-describedby={errors.contactMethod ? id("contactMethod-error") : undefined}
            >
              <legend className="mb-3 text-[0.95rem] font-medium text-ink">
                Preferred contact method <span aria-hidden="true" className="text-accent">*</span>
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {siteConfig.form.contactMethods.map((m, i) => (
                  <label key={m} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={m}
                      checked={values.contactMethod === m}
                      onChange={onChange("contactMethod")}
                      onBlur={() => onBlur("contactMethod")}
                      className="peer sr-only"
                      required={i === 0}
                    />
                    <span
                      className={cn(
                        "inline-flex h-12 items-center gap-2.5 rounded-full border px-5 text-[0.95rem] transition-[background-color,border-color,color,box-shadow] duration-200",
                        "border-mist bg-white text-ink hover:border-ink/40",
                        "peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white",
                        "peer-focus-visible:ring-4 peer-focus-visible:ring-accent-wash peer-focus-visible:border-accent",
                        errors.contactMethod && "border-[#c4322b]",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-4 place-items-center rounded-full border",
                          values.contactMethod === m ? "border-white" : "border-ink/30",
                        )}
                      >
                        {values.contactMethod === m && <span className="size-2 rounded-full bg-white" />}
                      </span>
                      {m}
                    </span>
                  </label>
                ))}
              </div>
              {errors.contactMethod && <ErrorText id={id("contactMethod-error")}>{errors.contactMethod}</ErrorText>}
            </fieldset>

            {/* Honeypot: hidden from people and assistive technology */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={id("company")}>Leave this field empty</label>
              <input
                id={id("company")}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={onChange("company")}
              />
            </div>

            <div aria-live="assertive" className="md:col-span-2">
              {status === "error" && serverError && (
                <div role="alert" className="rounded-2xl border border-[#c4322b]/30 bg-[#c4322b]/[0.06] p-5 text-[0.95rem] text-ink">
                  <p className="font-semibold text-[#a3271f]">{serverError.message}</p>
                  <p className="mt-1.5 text-slate">
                    {serverError.code === "invalid"
                      ? "Check the highlighted fields and send it again."
                      : "Please try again, or contact us directly: "}
                    {serverError.code !== "invalid" && (
                      <>
                        <a href={`mailto:${siteConfig.email}`} className="link-draw font-medium text-ink">
                          {siteConfig.email}
                        </a>{" "}
                        or{" "}
                        <a href={siteConfig.phoneHref} className="link-draw font-medium text-ink">
                          {siteConfig.phone}
                        </a>
                        .
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
              <Button type="submit" size="lg" disabled={status === "submitting"} icon={status === "submitting" ? null : "arrow"}>
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                    Sending…
                  </span>
                ) : (
                  "Send Enquiry"
                )}
              </Button>
              <p className="max-w-xs text-xs leading-relaxed text-slate">
                We use your details to respond to your enquiry. See our{" "}
                <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  wide,
  aside,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  wide?: boolean;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", wide && "md:col-span-2")}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-[0.95rem] font-medium text-ink">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-accent">
              *
            </span>
          )}
          {hint && (
            <span id={`${htmlFor}-hint`} className="ml-2 font-normal text-slate">
              {hint}
            </span>
          )}
        </label>
        {aside}
      </div>
      {children}
      {error && <ErrorText id={`${htmlFor}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-[#b02a22]">
      <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v5h-1.5v-5Zm0 6h1.5V12h-1.5v-1.5Z" />
      </svg>
      {children}
    </p>
  );
}
