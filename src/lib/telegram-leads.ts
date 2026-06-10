import "server-only";

export type LeadStatus = "contacted" | "not_contacted";

const CALLBACK_PREFIX = "lead_status:";
const STATUS_MARKER = "\n\nСтатус:";

export const leadStatusLabels: Record<LeadStatus, string> = {
  contacted: "✅ Связались",
  not_contacted: "⏳ Не связались",
};

export function parseLeadStatusCallback(data: string | undefined | null): LeadStatus | null {
  if (!data?.startsWith(CALLBACK_PREFIX)) {
    return null;
  }

  const status = data.slice(CALLBACK_PREFIX.length);
  return status === "contacted" || status === "not_contacted" ? status : null;
}

export function createStatusKeyboard(activeStatus?: LeadStatus) {
  return {
    inline_keyboard: [
      [
        {
          text: activeStatus === "contacted" ? "✅ Связались" : "Связались",
          callback_data: `${CALLBACK_PREFIX}contacted`,
        },
        {
          text: activeStatus === "not_contacted" ? "⏳ Не связались" : "Не связались",
          callback_data: `${CALLBACK_PREFIX}not_contacted`,
        },
      ],
    ],
  };
}

export interface LeadMessagePayload {
  source: string;
  lang: string;
  page: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  category: string;
  message: string;
}

export function createLeadMessage(payload: LeadMessagePayload) {
  const rows = [
    ["Источник", getSourceLabel(payload.source)],
    ["Язык", payload.lang || "ru"],
    ["Страница", payload.page],
    ["Имя", payload.name],
    ["Компания", payload.company],
    ["Телефон", payload.phone],
    ["Email", payload.email],
    ["Категория", payload.category],
    ["Сообщение", payload.message],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `<b>${label}:</b> ${escapeHtml(value)}`);

  return [
    "<b>Новая заявка с сайта</b>",
    rows.join("\n"),
    "<b>Статус:</b> 🆕 Новая",
  ].join("\n\n");
}

export function appendLeadStatus(message: string, status: LeadStatus, actor: string, date: string) {
  const baseMessage = stripLeadStatus(message);

  return [
    baseMessage,
    `Статус: ${leadStatusLabels[status]}`,
    `Ответственный: ${actor}`,
    `Время: ${date}`,
  ].join("\n\n");
}

export function formatStatusDate(date = new Date()) {
  const timeZone = process.env.TELEGRAM_STATUS_TIMEZONE || "Asia/Tashkent";

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone,
  }).format(date);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripLeadStatus(message: string) {
  const markerIndex = message.lastIndexOf(STATUS_MARKER);
  return (markerIndex === -1 ? message : message.slice(0, markerIndex)).trim();
}

function getSourceLabel(source: string) {
  const labels: Record<string, string> = {
    home_request: "Главная форма",
    contacts_page: "Страница контактов",
  };

  return labels[source] || source;
}
