import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  process.env.SHEET_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbxuPSImrjVi6UYowtWPK3FLS-yY1HxpLHAinW_8P3uN9xSoxzJMZfBaL980ppko0-jb/exec";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const response = await fetch(WEBHOOK_URL, {
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
