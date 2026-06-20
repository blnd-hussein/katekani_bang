import { useState, useEffect } from "react";
import { getPrayerTimesAsync, type PrayerTimings } from "imanikurd-prayer";

import { CITY, SORANI_NAMES } from "@/lib/consts";
import PrayersSectionSkeleton from "./PrayersSectionSkeleton";

function PrayersSection() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimes() {
      try {
        const times = await getPrayerTimesAsync(CITY);
        setPrayerTimes(times);
      } catch (err) {
        console.error("Error loading prayer data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTimes();
  }, []);

  return (
    <section>
      {loading ? (
        <PrayersSectionSkeleton />
      ) : prayerTimes ? (
        <ul className="flex flex-col gap-6 p-10">
          {Object.entries(prayerTimes).map(([name, time]) => (
            <li
              key={name}
              className="flex justify-between items-center text-lg"
            >
              <span className="font-mono">{time}</span>
              <span>{SORANI_NAMES[name]}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center p-10 text-lg text-error">
          کێشەیەک ڕوویدا
        </div>
      )}
    </section>
  );
}

export default PrayersSection;
