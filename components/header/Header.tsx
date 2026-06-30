import { useState, useEffect } from "react";

import { useStorage } from "@/hooks/useStorage";
import { getNextPrayerAsync, getCityName, type NextPrayer } from "imanikurd";

import { PRAYER_TIMES } from "@/lib/consts";
import HeaderSkeleton from "./HeaderSkeleton";

function Header() {
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [loading, setLoading] = useState(true);
  const [city] = useStorage("local:city", "Slemani");

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    async function fetchTimes() {
      try {
        const next = await getNextPrayerAsync(city);
        setNextPrayer(next);
      } catch (err) {
        console.error("Error loading prayer data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTimes();
  }, [city, refreshTrigger]);

  useEffect(() => {
    if (!nextPrayer) return;

    const [targetHours, targetMinutes] = nextPrayer.time.split(":").map(Number);

    const targetDate = new Date();
    targetDate.setHours(targetHours, targetMinutes, 0, 0);

    if (targetDate.getTime() < Date.now()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setTimeout(() => setRefreshTrigger((prev) => prev + 1), 1000);

        return;
      }

      setTimeLeft({
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer]);

  return (
    <header className="flex flex-col items-center justify-center gap-6 pt-16 font-bold">
      {loading ? (
        <HeaderSkeleton />
      ) : (
        <>
          <h1 className="text-3xl relative">
            <span className="text-sm absolute -top-7 left-1/2 transform -translate-x-1/2">
              {getCityName(city)}
            </span>
            {nextPrayer ? PRAYER_TIMES[nextPrayer.name].label : ""} پاش
          </h1>
          <h2 className="text-3xl" dir="ltr">
            <span className="countdown font-mono">
              <span
                style={
                  {
                    "--value": timeLeft.hours,
                    "--digits": 2,
                  } as React.CSSProperties
                }
              ></span>
              :
              <span
                style={
                  {
                    "--value": timeLeft.minutes,
                    "--digits": 2,
                  } as React.CSSProperties
                }
              ></span>
              :
              <span
                style={
                  {
                    "--value": timeLeft.seconds,
                    "--digits": 2,
                  } as React.CSSProperties
                }
              ></span>
            </span>
          </h2>
        </>
      )}
    </header>
  );
}

export default Header;
