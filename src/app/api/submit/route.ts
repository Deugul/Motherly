import { NextRequest, NextResponse } from "next/server";

const DEFAULT_WEBHOOK =
  process.env.SHEET_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbxuPSImrjVi6UYowtWPK3FLS-yY1HxpLHAinW_8P3uN9xSoxzJMZfBaL980ppko0-jb/exec";

const CONTACT_WEBHOOK = process.env.CONTACT_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK;

function getWebhook(formType: string): string {
  if (formType === "Contact Enquiries") return CONTACT_WEBHOOK;
  return DEFAULT_WEBHOOK;
}

const PHONE_REQUIRED_FORM_TYPES = new Set([
  "Contact Enquiries",
  "Doctor Partnership Application",
  "Service Bookings",
]);

function isValidPhone(value: unknown): value is string {
  return typeof value === "string" && /^\d{10}$/.test(value);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const webhookUrl = getWebhook(data.formType ?? "");

    if (PHONE_REQUIRED_FORM_TYPES.has(data.formType) && !isValidPhone(data.phone)) {
      return NextResponse.json(
        { result: "error", message: "A valid 10-digit phone number is required." },
        { status: 400 }
      );
    }

    const { phone, location, pincode, ...rest } = data;
    const payload = {
      ...rest,
      ...(phone !== undefined && { "Phone number": phone }),
      ...(location !== undefined && { "Location": location }),
      ...(pincode !== undefined && { "Pincode": pincode }),
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Sheet submission error:", error);
    return NextResponse.json({ result: "error" }, { status: 500 });
  }
}
