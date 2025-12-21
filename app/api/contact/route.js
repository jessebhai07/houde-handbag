import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function getTransporterFromEnv() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP env missing (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS)");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure, // true for 465, false for 587
    auth: { user, pass },
    requireTLS: !secure, // helps STARTTLS on 587
    connectionTimeout: 25_000,
    greetingTimeout: 25_000,
    socketTimeout: 25_000,
    tls: { rejectUnauthorized: false },
  });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const inquiry = String(body?.inquiry || "").trim();

    if (!name || !email || !inquiry) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
    const fromName = process.env.CONTACT_FROM_NAME || "Website Contact";
    const fromUser = process.env.SMTP_USER;

    const transporter = getTransporterFromEnv();

    // Fail-fast: tells you immediately if host/port/auth is wrong
    await transporter.verify();

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeInquiry = escapeHtml(inquiry);

    // Important: many SMTP servers require FROM to be the authenticated mailbox
    const from = `"${fromName}" <${fromUser}>`;

    const adminMail = {
      from,
      to: toEmail,
      replyTo: email,
      subject: `New Inquiry: ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:16px;background:#f6f6f6">
          <div style="background:#fff;border-radius:10px;padding:16px">
            <h2 style="margin:0 0 10px;color:#d97706">New Inquiry</h2>
            <p><b>Name:</b> ${safeName}</p>
            <p><b>Email:</b> ${safeEmail}</p>
            <hr style="border:0;border-top:1px solid #eee;margin:12px 0"/>
            <div style="white-space:pre-wrap;line-height:1.55">${safeInquiry}</div>
          </div>
        </div>
      `,
    };

    const preview =
      safeInquiry.length > 200 ? safeInquiry.slice(0, 200) + "..." : safeInquiry;

    const autoReply = {
      from,
      to: email,
      subject: "We received your inquiry - Houde Handbag",
      html: `
        <div style="font-family:Arial,sans-serif;padding:16px;color:#111827">
          <p>Dear ${safeName},</p>
          <p>Thanks for reaching out. We received your message and will reply within 24 hours.</p>
          <div style="background:#fffbeb;border-left:4px solid #d97706;padding:12px;margin:12px 0;white-space:pre-wrap">
            ${preview}
          </div>
          <p>Best regards,<br/><b>${escapeHtml(fromName)} Team</b></p>
        </div>
      `,
    };

    const results = await Promise.allSettled([
      transporter.sendMail(adminMail),
      transporter.sendMail(autoReply),
    ]);

    const [adminRes, replyRes] = results;

    if (adminRes.status === "rejected" || replyRes.status === "rejected") {
      console.error("Send results:", results);
      return NextResponse.json(
        {
          message: "Email send failed",
          details: {
            admin: adminRes.status === "rejected" ? (adminRes.reason?.message || "failed") : "ok",
            reply: replyRes.status === "rejected" ? (replyRes.reason?.message || "failed") : "ok",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Sent" }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", {
      message: err?.message,
      code: err?.code,
      command: err?.command,
      response: err?.response,
      responseCode: err?.responseCode,
    });
    return NextResponse.json(
      { message: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
