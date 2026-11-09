"use client";

import Link from "next/link";
import { Forminit } from "forminit";
import { Fragment, useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  buildContactSubmission,
  CONTACT_FORMINIT_ID,
  contactSubmissionError,
  type ContactAudience,
} from "@/lib/forminit-contact";

type Audience = ContactAudience;
type FieldErrors = Partial<Record<string, string>>;
type Feedback = {
  kind: "error" | "success";
  message: string;
} | null;

const forminit = new Forminit();

const productTypes = [
  "Gaming & peripherals",
  "Food & beverage",
  "E-cigarettes & vaping",
  "Health & wellness",
  "Fashion & apparel",
  "Bags & accessories",
  "Beauty & cosmetics",
  "Personal care",
  "Consumer electronics",
  "Hardware & tools",
  "Home & household",
  "Baby & maternity",
  "Toys",
  "Outdoor & sports",
  "Automotive accessories",
  "Technology",
  "Art",
  "Architecture",
  "Business & finance",
  "Travel",
  "Education",
  "Luxury goods",
  "Other",
];

function validate(
  data: Record<string, unknown>,
  audience: Audience,
): FieldErrors {
  const errors: FieldErrors = {};
  const value = (name: string) => String(data[name] ?? "").trim();

  if (!value("firstName") || value("firstName").length > 120)
    errors.firstName = "Enter a first name of up to 120 characters.";
  if (!value("lastName") || value("lastName").length > 120)
    errors.lastName = "Enter a last name of up to 120 characters.";
  if (value("phone").length > 80)
    errors.phone = "Keep your phone number under 80 characters.";
  if (
    value("email").length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (audience === "brand") {
    if (!value("company") || value("company").length > 120)
      errors.company = "Enter a company name of up to 120 characters.";
    if (!productTypes.includes(value("productType"))) {
      errors.productType = "Choose your product category.";
    }
  } else {
    if (value("whatsapp").length > 80)
      errors.whatsapp = "Keep your WhatsApp number under 80 characters.";
    try {
      const channel = new URL(value("channelUrl"));
      if (
        value("channelUrl").length > 2048 ||
        !["https:", "http:"].includes(channel.protocol) ||
        !channel.hostname ||
        channel.username ||
        channel.password
      ) {
        throw new Error("Invalid URL");
      }
    } catch {
      errors.channelUrl = "Enter your full channel URL, including https://.";
    }
  }

  if (!value("message"))
    errors.message = "Tell us a little about your plans.";
  else if (value("message").length > 3000)
    errors.message = "Keep your message under 3,000 characters.";
  if (data.consent !== true)
    errors.consent = "Please agree to the privacy policy.";
  return errors;
}

export function ContactForm({ audience = "brand" }: { audience?: Audience }) {
  const formId = useId();
  const [activeAudience, setActiveAudience] = useState<Audience>(audience);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const pendingFocusRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!isSubmitting && pendingFocusRef.current) {
      document.getElementById(pendingFocusRef.current)?.focus();
      pendingFocusRef.current = undefined;
    }
  }, [isSubmitting]);

  function focusError(nextErrors: FieldErrors) {
    const firstError = Object.keys(nextErrors)[0];
    if (!firstError) return;
    const target = `${formId}-${firstError}`;
    if (submittingRef.current) {
      // Provider errors arrive while inputs are disabled; focus after unlocking.
      pendingFocusRef.current = target;
    } else {
      document.getElementById(target)?.focus();
    }
  }

  function selectAudience(nextAudience: Audience) {
    if (submittingRef.current) return;
    setActiveAudience(nextAudience);
    setErrors({});
    setFeedback(null);
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    if (feedback) setFeedback(null);
    const name = (event.target as HTMLInputElement).name;
    if (name && errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, unknown> = {
      audience: activeAudience,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"),
      consent: formData.get("consent") === "on",
      ...(activeAudience === "brand"
        ? {
            company: formData.get("company"),
            productType: formData.get("productType"),
          }
        : {
            whatsapp: formData.get("whatsapp"),
            channelUrl: formData.get("channelUrl"),
          }),
    };
    const nextErrors = validate(data, activeAudience);
    setErrors(nextErrors);
    setFeedback(null);

    if (Object.keys(nextErrors).length) {
      focusError(nextErrors);
      return;
    }

    if (formData.get("website")) {
      setFeedback({
        kind: "error",
        message: "We couldn’t process this inquiry. Please email linkingglobal@wotokol.com.",
      });
      return;
    }

    const submission = buildContactSubmission(formData, activeAudience);
    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const { data: received, error } = await forminit.submit(
        CONTACT_FORMINIT_ID,
        submission,
      );
      if (error || typeof received?.hashId !== "string" || !received.hashId) {
        const result = contactSubmissionError(error);
        setErrors(result.fieldErrors);
        focusError(result.fieldErrors);
        setFeedback({
          kind: "error",
          message: result.message,
        });
        return;
      }

      setFeedback({
        kind: "success",
        message:
          "Thanks for reaching out. Your inquiry has been received, and our team will be in touch.",
      });
      form.reset();
    } catch {
      setFeedback({
        kind: "error",
        message:
          "We couldn’t send your inquiry. Please try again, or email linkingglobal@wotokol.com.",
      });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  const fieldProps = (name: string) => ({
    id: `${formId}-${name}`,
    name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${formId}-${name}-error` : undefined,
  });
  const fieldError = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`${formId}-${name}-error`}>
        {errors[name]}
      </span>
    ) : null;

  return (
    <div className="contact-form">
      <div
        className="form-tabs"
        role="tablist"
        aria-label="Choose your inquiry type"
      >
        {(["brand", "creator"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`${formId}-tab-${tab}`}
            aria-selected={activeAudience === tab}
            aria-controls={`${formId}-panel`}
            tabIndex={activeAudience === tab ? 0 : -1}
            disabled={isSubmitting}
            onClick={() => selectAudience(tab)}
            onKeyDown={(event) => {
              if (
                ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? "brand"
                    : event.key === "End"
                      ? "creator"
                      : tab === "brand"
                        ? "creator"
                        : "brand";
                selectAudience(next);
                document.getElementById(`${formId}-tab-${next}`)?.focus();
              }
            }}
          >
            I’m a {tab === "brand" ? "Brand" : "Creator"}
            <span aria-hidden="true"> ↗</span>
          </button>
        ))}
      </div>

      <form
        id={`${formId}-panel`}
        role="tabpanel"
        aria-labelledby={`${formId}-tab-${activeAudience}`}
        aria-busy={isSubmitting}
        onSubmit={handleSubmit}
        onChange={handleChange}
        noValidate
      >
        <p className="form-intro">
          {activeAudience === "brand"
            ? "Tell us about your brand, target markets, and marketing goals. We’ll recommend the right approach for your campaign."
            : "Connect with global brands and get expert support, deal management, and long-term representation."}
        </p>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor={`${formId}-firstName`}>
              First Name <span aria-hidden="true">*</span>
            </label>
            <input
              {...fieldProps("firstName")}
              autoComplete="given-name"
              placeholder="First name"
              maxLength={120}
              required
              disabled={isSubmitting}
            />
            {fieldError("firstName")}
          </div>
          <div className="form-field">
            <label htmlFor={`${formId}-lastName`}>
              Last Name <span aria-hidden="true">*</span>
            </label>
            <input
              {...fieldProps("lastName")}
              autoComplete="family-name"
              placeholder="Last name"
              maxLength={120}
              required
              disabled={isSubmitting}
            />
            {fieldError("lastName")}
          </div>
          <div className="form-field">
            <label htmlFor={`${formId}-email`}>
              Email address <span aria-hidden="true">*</span>
            </label>
            <input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              maxLength={254}
              required
              disabled={isSubmitting}
            />
            {fieldError("email")}
          </div>
          <div className="form-field">
            <label htmlFor={`${formId}-phone`}>
              Phone <span className="field-optional">(optional)</span>
            </label>
            <input
              {...fieldProps("phone")}
              type="tel"
              autoComplete="tel"
              placeholder="Include your country code"
              maxLength={80}
              disabled={isSubmitting}
            />
            {fieldError("phone")}
          </div>
          {activeAudience === "brand" ? (
            <Fragment key="brand-fields">
              <div className="form-field">
                <label htmlFor={`${formId}-company`}>
                  Company name <span aria-hidden="true">*</span>
                </label>
                <input
                  {...fieldProps("company")}
                  autoComplete="organization"
                  placeholder="Your brand"
                  maxLength={120}
                  required
                  disabled={isSubmitting}
                />
                {fieldError("company")}
              </div>
              <div className="form-field">
                <label htmlFor={`${formId}-productType`}>
                  Product category <span aria-hidden="true">*</span>
                </label>
                <select
                  {...fieldProps("productType")}
                  defaultValue=""
                  required
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {productTypes.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
                {fieldError("productType")}
              </div>
            </Fragment>
          ) : (
            <div className="form-field" key="creator-whatsapp">
              <label htmlFor={`${formId}-whatsapp`}>
                WhatsApp <span className="field-optional">(optional)</span>
              </label>
              <input
                {...fieldProps("whatsapp")}
                type="tel"
                autoComplete="off"
                placeholder="Include your country code"
                maxLength={80}
                disabled={isSubmitting}
              />
              {fieldError("whatsapp")}
            </div>
          )}
          {activeAudience === "creator" && (
            <div className="form-field">
              <label htmlFor={`${formId}-channelUrl`}>
                Channel URL <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("channelUrl")}
                type="url"
                autoComplete="url"
                placeholder="https://youtube.com/@yourchannel"
                maxLength={2048}
                required
                disabled={isSubmitting}
              />
              {fieldError("channelUrl")}
            </div>
          )}
          <div className="form-field field-full">
            <label htmlFor={`${formId}-message`}>
              A little about your plans <span aria-hidden="true">*</span>
            </label>
            <textarea
              {...fieldProps("message")}
              placeholder={
                activeAudience === "brand"
                  ? "What would you like to make happen?"
                  : "Tell us about your content and dream collaborations."
              }
              rows={4}
              maxLength={3000}
              required
              disabled={isSubmitting}
            />
            {fieldError("message")}
          </div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              overflow: "hidden",
              clipPath: "inset(50%)",
            }}
          >
            <label htmlFor={`${formId}-website`}>Leave this field empty</label>
            <input
              id={`${formId}-website`}
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="form-field field-full">
            <label className="form-consent" htmlFor={`${formId}-consent`}>
              <input
                {...fieldProps("consent")}
                type="checkbox"
                required
                disabled={isSubmitting}
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Privacy Policy (opens in a new tab)"
                >
                  Privacy Policy
                </Link>{" "}
                and to being contacted about my inquiry.
              </span>
            </label>
            {fieldError("consent")}
          </div>
        </div>

        <button
          className="button button-primary form-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="form-spinner" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              {activeAudience === "brand"
                ? "Submit inquiry"
                : "Apply to join LGI"}{" "}
              <span aria-hidden="true">↗</span>
            </>
          )}
        </button>
        <p className="form-note">
          Prefer email? <a href="mailto:linkingglobal@wotokol.com">linkingglobal@wotokol.com</a>
        </p>

        {feedback && (
          <div
            className={`form-feedback form-feedback-${feedback.kind}`}
            role={feedback.kind === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            <p>{feedback.message}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
