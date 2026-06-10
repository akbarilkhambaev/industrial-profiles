import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createLeadMessage, createStatusKeyboard, escapeHtml, type LeadMessagePayload } from "@/lib/telegram-leads";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const leadSchema = z
  .object({
    source: z.string().trim().max(80).default("website"),
    lang: z.string().trim().max(10).default("ru"),
    page: z.string().trim().max(500).default(""),
    name: z.string().trim().min(1).max(120),
    company: z.string().trim().max(160).default(""),
    phone: z.string().trim().max(80).default(""),
    email: z.string().trim().max(160).default(""),
    category: z.string().trim().max(160).default(""),
    message: z.string().trim().max(3000).default(""),
    website: z.string().trim().max(200).default(""),
  })
  .superRefine((data, ctx) => {
    if (!data.phone && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone or email is required",
        path: ["email"],
      });
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid email",
        path: ["email"],
      });
    }
  });

export async function POST(request: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ error: "Telegram is not configured" }, { status: 500 });
  }

  const formData = await request.formData();
  const parsed = leadSchema.safeParse({
    source: getString(formData, "source"),
    lang: getString(formData, "lang"),
    page: getString(formData, "page") || request.headers.get("referer") || "",
    name: getString(formData, "name"),
    company: getString(formData, "company"),
    phone: getString(formData, "phone"),
    email: getString(formData, "email"),
    category: getString(formData, "category"),
    message: getString(formData, "message"),
    website: getString(formData, "website"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const leadData: LeadMessagePayload & { website: string } = {
    source: parsed.data.source || "website",
    lang: parsed.data.lang || "ru",
    page: parsed.data.page || "",
    name: parsed.data.name,
    company: parsed.data.company || "",
    phone: parsed.data.phone || "",
    email: parsed.data.email || "",
    category: parsed.data.category || "",
    message: parsed.data.message || "",
    website: parsed.data.website || "",
  };

  if (leadData.website) {
    return NextResponse.json({ ok: true });
  }

  const attachment = getAttachment(formData);
  if (attachment && attachment.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Attachment is too large" }, { status: 413 });
  }

  try {
    const messageResponse = await sendTelegramJson<{ message_id: number }>(botToken, "sendMessage", {
      chat_id: chatId,
      text: createLeadMessage(leadData),
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: createStatusKeyboard(),
    });

    let warning: string | undefined;

    if (attachment) {
      try {
        await sendTelegramDocument(botToken, chatId, attachment, messageResponse.result.message_id, leadData.name);
      } catch (error) {
        warning = "file_not_sent";
        console.error("Telegram document send failed", error);
      }
    }

    return NextResponse.json({ ok: true, warning });
  } catch (error) {
    console.error("Telegram message send failed", error);
    return NextResponse.json({ error: "Failed to send request" }, { status: 502 });
  }
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getAttachment(formData: FormData) {
  const value = formData.get("file");

  if (typeof File === "undefined" || !(value instanceof File) || value.size === 0) {
    return null;
  }

  return value;
}

async function sendTelegramJson<T>(botToken: string, method: string, body: Record<string, unknown>) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => null) as { ok?: boolean; result?: T; description?: string } | null;

  if (!response.ok || !data?.ok || !data.result) {
    throw new Error(data?.description || `Telegram ${method} failed`);
  }

  return data as { ok: true; result: T };
}

async function sendTelegramDocument(
  botToken: string,
  chatId: string,
  file: File,
  replyToMessageId: number,
  leadName: string,
) {
  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("document", file, file.name || "attachment");
  formData.append("caption", `Файл к заявке: ${escapeHtml(leadName)}`);
  formData.append("parse_mode", "HTML");
  formData.append("reply_to_message_id", String(replyToMessageId));

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json().catch(() => null) as { ok?: boolean; description?: string } | null;

  if (!response.ok || !data?.ok) {
    throw new Error(data?.description || "Telegram sendDocument failed");
  }
}
