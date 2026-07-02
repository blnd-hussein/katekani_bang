import { useState, useEffect } from "react";
import { type Hadith } from "imanikurd";

import { Flower, Sprout } from "lucide-react";

function DailyHadith({ hadithsList }: { hadithsList: Hadith[] | null }) {
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    if (hadithsList && hadithsList.length > 0) {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - start.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const nameIndex = dayOfYear % hadithsList.length;
      setDailyHadith(hadithsList[nameIndex]);
    }
  }, [hadithsList]);

  return (
    <article className="flex flex-col gap-6 h-full overflow-auto hide-scrollbar">
      {dailyHadith && (
        <>
          <header className="flex flex-col items-center gap-2">
            <span className="text-sm">
              <Sprout className="mx-auto text-primary/90" />
              فەرموودەی ڕۆژ
            </span>
            <p className="text-base bg-base-100/5 shadow-xs p-2 rounded-full">
              {dailyHadith.title}
            </p>
          </header>

          <hr className="border-base-100/40" />

          <p className="text-base font-bold leading-8">
            <Flower size={20} className="inline me-2 text-primary/80" />
            {dailyHadith.arabic}
          </p>

          <hr className="border-base-100/40" />

          <p className="text-base font-medium leading-8 ">
            <Flower size={20} className="inline me-2 text-primary/80" />
            {dailyHadith.kurdish}
          </p>
        </>
      )}
    </article>
  );
}

export default DailyHadith;
