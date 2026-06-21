import { useState, useEffect } from "react";
import { useStorage } from "@/hooks/useStorage";
import { getPrayerTimesAsync, type PrayerTimings } from "imanikurd";

import { SORANI_NAMES } from "@/lib/consts";
import PrayersSectionSkeleton from "./PrayersSectionSkeleton";

function PrayersSection() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimings | null>(null);
  const [city] = useStorage("local:city", "Slemani");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimes() {
      try {
        const times = await getPrayerTimesAsync(city);
        setPrayerTimes(times);
      } catch (err) {
        console.error("Error loading prayer data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTimes();
  }, [city]);

  return (
    <section>
      {loading ? (
        <PrayersSectionSkeleton />
      ) : prayerTimes ? (
        <ul className="flex flex-col gap-6 px-10 pb-8 pt-6">
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
