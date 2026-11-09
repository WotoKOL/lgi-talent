export type ContactAudience = "brand" | "creator";

// Both audiences use this single free-plan form. New fields must follow fi-{type}-{name}.
// Field rules: https://forminit.com/setup.md
export const CONTACT_FORMINIT_ID = "m5lh8nrxrei";

export function buildContactSubmission(
  input: FormData,
  audience: ContactAudience,
): FormData {
  const value = (name: string) => {
    const entry = input.get(name);
    return typeof entry === "string" ? entry.trim() : "";
  };
  const submission = new FormData();
  const fields = {
    "fi-text-audience": audience,
    "fi-sender-firstName": value("firstName").replace(/[\u2018\u2019]/g, "'"),
    "fi-sender-lastName": value("lastName").replace(/[\u2018\u2019]/g, "'"),
    "fi-sender-email": value("email"),
    "fi-sender-phone": value("phone"),
    "fi-text-message": value("message"),
    // Keep a common schema; Forminit ignores empty, non-applicable values.
    "fi-sender-company": audience === "brand" ? value("company") : "",
    "fi-select-productType": audience === "brand" ? value("productType") : "",
    "fi-phone-whatsapp": audience === "creator" ? value("whatsapp") : "",
    "fi-url-channelUrl": audience === "creator" ? value("channelUrl") : "",
    "fi-checkbox-consent": input.get("consent") === "on" ? "yes" : "",
    "fi-text-source": "lgi-website",
    "fi-text-submittedAt": new Date().toISOString(),
    _gotcha: value("website"),
  };

  for (const [name, entry] of Object.entries(fields)) {
    submission.append(name, entry);
  }
  return submission;
}

type SubmissionError = {
  error?: string;
  code?: number;
  fieldName?: string;
  message?: string;
};

const fieldErrors: Record<string, { field: string; message: string }> = {
  "sender.firstName": {
    field: "firstName",
    message: "Use letters, spaces, hyphens, apostrophes, and periods in your first name.",
  },
  "sender.lastName": {
    field: "lastName",
    message: "Use letters, spaces, hyphens, apostrophes, and periods in your last name.",
  },
  "sender.email": {
    field: "email",
    message: "Enter a valid email address.",
  },
  "sender.phone": {
    field: "phone",
    message: "Enter a valid phone number with a + and country code.",
  },
  "sender.company": {
    field: "company",
    message: "Enter a company name of up to 120 characters.",
  },
  productType: {
    field: "productType",
    message: "Choose your product category.",
  },
  whatsapp: {
    field: "whatsapp",
    message: "Enter a valid WhatsApp number with a + and country code.",
  },
  channelUrl: {
    field: "channelUrl",
    message: "Enter your full channel URL, including https://.",
  },
  message: {
    field: "message",
    message: "Enter your plans using 1 to 3,000 characters.",
  },
  consent: {
    field: "consent",
    message: "Please agree to the privacy policy.",
  },
};

export function contactSubmissionError(error?: SubmissionError) {
  const field =
    error?.fieldName ?? /['"]([^'"]+)['"]/.exec(error?.message ?? "")?.[1];
  const fieldError = field ? fieldErrors[field] : undefined;
  if (fieldError) {
    return {
      message: "Please check the highlighted field.",
      fieldErrors: { [fieldError.field]: fieldError.message },
    };
  }
  return {
    message:
      error?.error === "TOO_MANY_REQUESTS" || error?.code === 429
        ? "Please wait a few seconds before trying again, or email linkingglobal@wotokol.com."
        : "We couldn’t send your inquiry. Please try again, or email linkingglobal@wotokol.com.",
    fieldErrors: {},
  };
}
