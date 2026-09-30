import { NextRequest, NextResponse } from "next/server";

const DEFAULT_WEBHOOK =
  process.env.SHEET_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbxuPSImrjVi6UYowtWPK3FLS-yY1HxpLHAinW_8P3uN9xSoxzJMZfBaL980ppko0-jb/exec";

const CONTACT_WEBHOOK = process.env.CONTACT_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK;

const LEAD101_FORM_ID = "cmunwtuqr02qdk6w903jmv1hk";
const LEAD101_SUBMIT_URL = `https://thelead101.com/api/v1/forms/${LEAD101_FORM_ID}/submit`;

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

function normalizeLead101Service(service?: string): string {
  if (!service) return "Doula";
  const s = service.toLowerCase().trim();
  if (s.includes("doula")) return "Doula";
  if (s.includes("postnatal") || s.includes("recovery")) return "Postnatal Recovery";
  if (s.includes("lactation")) return "Lactation";
  if (s.includes("nann")) return "Nanny Care";
  if (s.includes("gyn")) return "Gynaecologist/Obstetrician";
  if (s.includes("pediatr")) return "Pediatrician";
  if (s.includes("yoga")) return "Yoga";
  if (s.includes("physio")) return "Physiotherapy";
  if (s.includes("baby")) return "Baby Care";
  if (s.includes("mother")) return "Mother Care";
  return service;
}

async function syncLead101(data: Record<string, any>) {
  try {
    const payload = {
      submissionData: {
        field_1790760611734_0y5qvfvif: normalizeLead101Service(data.service),
        field_1790760706662_8oct9znep: data.name || "",
        field_1790760729751_4aiekxbui: data.email || "",
        field_1790760730598_qbwtvotqz: data.phone || "",
        field_1790760734823_f5bqiwxwd: data.location || "",
        field_1790760809438_w8xmxeupo: data.pincode || "",
        field_1790760834238_pkmdzza7j: data.date || "",
        field_1790760861810_0167t5081: data.time || "",
        field_1790760881910_0gpt6vn9y: data.message || "",
      },
      recaptchaToken: "",
      documents: [],
    };

    const res = await fetch(LEAD101_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("Lead101 sync non-200 response:", res.status, errText);
    }
  } catch (err) {
    console.error("Lead101 sync error:", err);
  }
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

    // 1. If it's a service booking, forward to Lead101 CRM in parallel
    if (data.formType === "Service Bookings") {
      syncLead101(data).catch((e) => console.error("Lead101 sync error:", e));
    }

    // 2. Submit to Google Sheet webhook safely without crashing on HTML responses
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const responseText = await response.text();
      let result: any = { result: "success" };
      try {
        result = JSON.parse(responseText);
      } catch {
        // Google Apps Script commonly returns HTML (302 redirect page) or plain text
        result = { result: "success" };
      }
      return NextResponse.json(result);
    } catch (sheetError) {
      console.warn("Sheet submission warning:", sheetError);
      return NextResponse.json({ result: "success" });
    }
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json({ result: "error" }, { status: 500 });
  }
}
