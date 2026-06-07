const STORAGE_KEY = "smartlife-reminders";

export function loadReminders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") || [];
  } catch {
    return [];
  }
}

export function saveReminders(reminders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  window.dispatchEvent(new Event("remindersUpdated"));
  return reminders;
}

export function formatDateTime(value) {
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
}

export function ensureNotificationPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
  return Notification.permission === "granted";
}

export function notifyReminder(reminder) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  new Notification("Rappel SmartLife", {
    body: `${reminder.title} • ${reminder.category}`,
    icon: "/logo.png",
  });
}

export function getUpcomingReminders(reminders) {
  const now = Date.now();
  return reminders
    .filter(r => !r.done && r.dateTime && new Date(r.dateTime).getTime() >= now)
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
}
