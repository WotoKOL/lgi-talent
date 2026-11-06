import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const CONTACT_EMAIL = "market@lgi.com";
const productTypes = new Set([
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
]);

class PayloadTooLargeError extends Error {}

async function readBoundedJson(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) throw new PayloadTooLargeError();
  if (!request.body) throw new SyntaxError("Empty request");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new PayloadTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body));
}

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .includes("application/json")
  ) {
    return json({ message: "Please submit the contact form as JSON." }, 415);
  }

  let raw: unknown;
  try {
    raw = await readBoundedJson(request);
  } catch (error) {
    return error instanceof PayloadTooLargeError
      ? json(
          {
            message:
              "Your inquiry is too long. Please shorten it and try again.",
          },
          413,
        )
      : json(
          { message: "We couldn’t read your inquiry. Please try again." },
          400,
        );
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return json({ message: "Please complete the contact form." }, 400);
  }

  const input = raw as Record<string, unknown>;
  const value = (name: string) =>
    typeof input[name] === "string" ? input[name].trim() : "";
  if (
    input.website !== undefined &&
    (typeof input.website !== "string" || value("website"))
  ) {
    return json(
      {
        message:
          "We couldn’t process this inquiry. Please email market@lgi.com.",
      },
      400,
    );
  }

  const audience = input.audience;
  if (audience !== "brand" && audience !== "creator") {
    return json(
      { message: "Choose whether you’re contacting us as a brand or creator." },
      400,
    );
  }

  const fieldErrors: Record<string, string> = {};
  const email = value("email");
  const message = value("message");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (message.length > 3000)
    fieldErrors.message = "Keep your message under 3,000 characters.";
  if (
    input.message !== undefined &&
    input.message !== null &&
    typeof input.message !== "string"
  ) {
    fieldErrors.message = "Enter your message as text.";
  }
  if (input.consent !== true)
    fieldErrors.consent = "Please agree to the privacy policy.";

  const company = value("company");
  const productType = value("productType");
  const firstName = value("firstName");
  const lastName = value("lastName");
  const fullName = `${firstName} ${lastName}`;
  const phone = value("phone");
  const whatsapp = value("whatsapp");
  const channelUrl = value("channelUrl");
  if (!firstName || firstName.length > 120)
    fieldErrors.firstName = "Enter a first name of up to 120 characters.";
  if (!lastName || lastName.length > 120)
    fieldErrors.lastName = "Enter a last name of up to 120 characters.";
  if (
    phone.length > 80 ||
    (input.phone !== undefined && input.phone !== null && typeof input.phone !== "string")
  )
    fieldErrors.phone = "Enter a phone number of up to 80 characters.";

  if (audience === "brand") {
    if (!company || company.length > 120)
      fieldErrors.company = "Enter a company name of up to 120 characters.";
    if (!productTypes.has(productType))
      fieldErrors.productType = "Choose your product category.";
  } else {
    if (whatsapp.length > 80)
      fieldErrors.whatsapp = "Keep your WhatsApp number under 80 characters.";
    try {
      const url = new URL(channelUrl);
      if (
        channelUrl.length > 2048 ||
        !["http:", "https:"].includes(url.protocol) ||
        !url.hostname ||
        url.username ||
        url.password
      ) {
        throw new Error("Invalid channel URL");
      }
    } catch {
      fieldErrors.channelUrl = "Enter a valid channel URL, including https://.";
    }
  }

  if (Object.keys(fieldErrors).length) {
    return json(
      { message: "Please check the highlighted fields.", fieldErrors },
      400,
    );
  }

  const inquiry = {
    audience,
    firstName,
    lastName,
    fullName,
    email,
    phone,
    message,
    ...(audience === "brand"
      ? { company, productType }
      : { whatsapp, channelUrl }),
    consent: true,
  };
  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();

  // Without a configured delivery service, prepare a real email draft. This
  // response explicitly does not indicate that an inquiry has been delivered.
  if (!webhook) {
    const subject = `LGI ${audience === "brand" ? "brand" : "creator"} inquiry — ${audience === "brand" ? company : fullName}`;
    const lines = [
      "Hello LGI team,",
      "",
      `First name: ${firstName}`,
      `Last name: ${lastName}`,
      ...(audience === "brand" ? [`Company: ${company}`] : []),
      `Email: ${email}`,
      ...(phone ? [`Phone: ${phone}`] : []),
      ...(audience === "brand"
        ? [`Product category: ${productType}`]
        : [
            `Channel: ${channelUrl}`,
            ...(whatsapp ? [`WhatsApp: ${whatsapp}`] : []),
          ]),
      "",
      ...(message ? [message, ""] : []),
      "I agree to the LGI Privacy Policy and to being contacted about this inquiry.",
    ];
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    return json({
      mode: "email",
      message: "Open your email app to send your inquiry to market@lgi.com.",
      mailto,
    });
  }

  let webhookUrl: URL;
  try {
    webhookUrl = new URL(webhook);
    if (!["http:", "https:"].includes(webhookUrl.protocol))
      throw new Error("Invalid webhook protocol");
  } catch {
    return json(
      {
        message:
          "Our contact service is unavailable. Please email market@lgi.com.",
      },
      503,
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...inquiry,
        source: "lgi-website",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok) {
      return json(
        {
          message:
            "We couldn’t deliver your inquiry. Please try again, or email market@lgi.com.",
        },
        502,
      );
    }
    return json({
      mode: "delivered",
      message: "Your inquiry has been received.",
    });
  } catch {
    return json(
      {
        message:
          "Our contact service is temporarily unavailable. Please try again, or email market@lgi.com.",
      },
      503,
    );
  }
}
