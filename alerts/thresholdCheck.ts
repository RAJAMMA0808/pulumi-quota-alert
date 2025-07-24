import thresholds from "../config/thresholds.json";
import { sendSnsAlert } from "./notifier";

export async function handleAlert(service: string, usage: number, limit: number) {
  const percentage = (usage / limit) * 100;

  if (percentage >= thresholds.critical) {
    await sendSnsAlert(${service} CRITICAL usage: ${usage}/${limit} (${percentage.toFixed(2)}%));
  } else if (percentage >= thresholds.warning) {
    await sendSnsAlert(${service} WARNING usage: ${usage}/${limit} (${percentage.toFixed(2)}%));
  } else {
    console.log(${service} usage is healthy: ${usage}/${limit} (${percentage.toFixed(2)}%));
  }
}
