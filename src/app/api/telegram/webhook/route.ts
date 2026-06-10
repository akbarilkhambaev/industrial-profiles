import { NextRequest, NextResponse } from "next/server";
import {
  appendLeadStatus,
  createStatusKeyboard,
  formatStatusDate,
  parseLeadStatusCallback,
} from "@/lib/telegram-leads";

export const runtime = "nodejs";

interface TelegramUser {
  id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

interface TelegramWebhookUpdate {
  callback_query?: {
    id: string;
    data?: string;
    from?: TelegramUser;
    message?: {
      message_id: number;
      text?: string;
      caption?: string;
      chat: {
        id: number | string;
      };
    };
  };
}

export async function POST(request: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return NextResponse.json({ error: "Telegram is not configured" }, { status: 500 });
  }

  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Telegram webhook secret is not configured" }, { status: 500 });
  }

  if (request.headers.get("x-telegram-bot-api-secret-token") !== webhookSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const update = await request.json().catch(() => null) as TelegramWebhookUpdate | null;
  const callbackQuery = update?.callback_query;

  if (!callbackQuery) {
    return NextResponse.json({ ok: true });
  }

  const status = parseLeadStatusCallback(callbackQuery.data);
  if (!status) {
    await answerCallbackQuery(botToken, callbackQuery.id, "Неизвестное действие");
    return NextResponse.json({ ok: true });
  }

  const message = callbackQuery.message;
  if (!message) {
    await answerCallbackQuery(botToken, callbackQuery.id, "Сообщение недоступно");
    return NextResponse.json({ ok: true });
  }

  if (!(await canUpdateLeadStatus(botToken, message.chat.id, callbackQuery.from?.id))) {
    await answerCallbackQuery(botToken, callbackQuery.id, "Недостаточно прав");
    return NextResponse.json({ ok: true });
  }

  const actor = formatActor(callbackQuery.from);
  const updatedMessage = appendLeadStatus(message.text || message.caption || "", status, actor, formatStatusDate());

  try {
    if (message.text) {
      await sendTelegramJson(botToken, "editMessageText", {
        chat_id: message.chat.id,
        message_id: message.message_id,
        text: updatedMessage,
        reply_markup: createStatusKeyboard(status),
      });
    } else {
      await sendTelegramJson(botToken, "editMessageCaption", {
        chat_id: message.chat.id,
        message_id: message.message_id,
        caption: updatedMessage,
        reply_markup: createStatusKeyboard(status),
      });
    }

    await answerCallbackQuery(botToken, callbackQuery.id, "Статус обновлен");
  } catch (error) {
    console.error("Telegram status update failed", error);
    await answerCallbackQuery(botToken, callbackQuery.id, "Не удалось обновить статус");
  }

  return NextResponse.json({ ok: true });
}

async function canUpdateLeadStatus(botToken: string, chatId: number | string, userId: number | undefined) {
  if (!userId) {
    return false;
  }

  const allowedIds = getAllowedAdminIds();

  if (allowedIds.length) {
    return allowedIds.includes(String(userId));
  }

  return isTelegramChatAdmin(botToken, chatId, userId);
}

function getAllowedAdminIds() {
  return (process.env.TELEGRAM_ALLOWED_USER_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

async function isTelegramChatAdmin(botToken: string, chatId: number | string, userId: number) {
  try {
    const data = await sendTelegramJson<{ status?: string }>(botToken, "getChatMember", {
      chat_id: chatId,
      user_id: userId,
    });

    return data.result.status === "creator" || data.result.status === "administrator";
  } catch (error) {
    console.error("Telegram admin check failed", error);
    return false;
  }
}

function formatActor(user: TelegramUser | undefined) {
  if (!user) {
    return "unknown";
  }

  if (user.username) {
    return `@${user.username}`;
  }

  return [user.first_name, user.last_name].filter(Boolean).join(" ") || String(user.id || "unknown");
}

async function answerCallbackQuery(botToken: string, callbackQueryId: string, text: string) {
  await sendTelegramJson(botToken, "answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
  }).catch((error) => {
    console.error("Telegram answerCallbackQuery failed", error);
  });
}

async function sendTelegramJson<T = unknown>(botToken: string, method: string, body: Record<string, unknown>) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => null) as { ok?: boolean; result?: T; description?: string } | null;

  if (!response.ok || !data?.ok) {
    throw new Error(data?.description || `Telegram ${method} failed`);
  }

  return data as { ok: true; result: T };
}
