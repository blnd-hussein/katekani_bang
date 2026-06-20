import { getNextPrayerAsync, type NextPrayer } from "imanikurd-prayer";

import { CITY, SORANI_NAMES } from "@/lib/consts";
import HeaderSkeleton from "./HeaderSkeleton";

function Header() {
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    async function fetchTimes() {
      try {
        const next = await getNextPrayerAsync(CITY);
        setNextPrayer(next);
      } catch (err) {
        console.error("Error loading prayer data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTimes();
  }, []);
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
    <header className="flex flex-col items-center justify-center gap-6 pt-12 font-bold">
      {loading ? (
        <HeaderSkeleton />
      ) : (
        <>
          <h1 className="text-3xl">
            {nextPrayer ? SORANI_NAMES[nextPrayer.name] : ""} پاش
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
