import { NextRequest, NextResponse } from "next/server";

const DEFAULT_WEBHOOK =
  process.env.SHEET_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbxuPSImrjVi6UYowtWPK3FLS-yY1HxpLHAinW_8P3uN9xSoxzJMZfBaL980ppko0-jb/exec";

const CONTACT_WEBHOOK = process.env.CONTACT_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK;

function getWebhook(formType: string): string {
  if (formType === "Contact Enquiries") return CONTACT_WEBHOOK;
  return DEFAULT_WEBHOOK;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const webhookUrl = getWebhook(data.formType ?? "");

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      }),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Sheet submission error:", error);
    return NextResponse.json({ result: "error" }, { status: 500 });
  }
}
