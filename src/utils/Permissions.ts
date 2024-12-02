export function hasNotificationPermission() {
  return "Notification" in window && Notification.permission === "granted";
}
