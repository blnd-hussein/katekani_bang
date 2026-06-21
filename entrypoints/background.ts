import { storage, defineBackground } from "#imports";
import { getNextPrayerAsync } from "imanikurd-prayer";

import { SORANI_NAMES } from "@/lib/consts";

export default defineBackground(() => {
  async function scheduleNextPrayerAlarms() {
    // Clear any existing alarms first
    await browser.alarms.clearAll();

    const city = (await storage.getItem<string>("local:city")) || "Slemani";
    const notifyOnTime = await storage.getItem<boolean>("local:notifyOnTime");
    const notifyBefore =
      (await storage.getItem<string>("local:notifyBefore")) || "نەخێر";

    const nextPrayer = await getNextPrayerAsync(city);
    if (!nextPrayer) return;

    // Calculate exact timestamp for the prayer
    const [targetHours, targetMinutes] = nextPrayer.time.split(":").map(Number);
    const targetDate = new Date();
    targetDate.setHours(targetHours, targetMinutes, 0, 0);

    if (targetDate.getTime() < Date.now()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }
    const targetTimeMs = targetDate.getTime();

    // Schedule the "On Time" alarm
    if (notifyOnTime !== false) {
      // Defaults to true if null
      browser.alarms.create(`prayer-time-${nextPrayer.name}`, {
        when: targetTimeMs,
      });
    }

    // Schedule the "Before Time" alarm
    if (notifyBefore !== "نەخێر") {
      const minutesBefore = parseInt(notifyBefore, 10);
      const earlyTimeMs = targetTimeMs - minutesBefore * 60 * 1000;

      // Only set the early alarm if that time hasn't already passed!
      if (earlyTimeMs > Date.now()) {
        browser.alarms.create(
          `prayer-early-${nextPrayer.name}-${minutesBefore}`,
          {
            when: earlyTimeMs,
          },
        );
      }
    }
  }

  // 2. Listen for Alarms going off
  browser.alarms.onAlarm.addListener((alarm) => {
    const isEarly = alarm.name.startsWith("prayer-early-");
    const isOnTime = alarm.name.startsWith("prayer-time-");

    // Extract prayer name from alarm name (e.g., "prayer-time-Fajr" -> "Fajr")
    const parts = alarm.name.split("-");
    const prayerName = isEarly ? parts[2] : parts[2];
    const kurdishName = SORANI_NAMES[prayerName] || prayerName;

    if (isOnTime) {
      browser.notifications.create({
        type: "basic",
        iconUrl: "/icon/128.png",
        title: `کاتی بانگە`,
        message: `کاتی ${kurdishName}ە`,
      });

      // Wait 1 minute, then calculate the NEXT prayer.
      // (Delay ensures we don't accidentally fetch the current prayer again)
      setTimeout(scheduleNextPrayerAlarms, 60000);
    }

    if (isEarly) {
      const minutes = parts[3]; // e.g., "prayer-early-Fajr-5" -> "5"
      browser.notifications.create({
        type: "basic",
        iconUrl: "/icon/128.png",
        title: "نزیکبوونەوەی کاتی بانگ",
        message: `تەنها ${minutes} خوولەک ماوە بۆ ${kurdishName}.`,
      });
    }
  });

  // 3. Watch for User Changes in the UI
  // If they change settings in the modal, we must instantly recalculate the alarms
  storage.watch("local:city", scheduleNextPrayerAlarms);
  storage.watch("local:notifyOnTime", scheduleNextPrayerAlarms);
  storage.watch("local:notifyBefore", scheduleNextPrayerAlarms);

  // 4. Run once when the extension starts
  scheduleNextPrayerAlarms();
});
