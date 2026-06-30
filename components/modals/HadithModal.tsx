import { useState, useEffect } from "react";
import { getHadithsAsync, type Hadith } from "imanikurd";

import { Flower, Sprout, X } from "lucide-react";

function HadithModal({ id }: { id: string }) {
  const [hadiths, setHadiths] = useState<Hadith[] | null>(null);
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    async function fetchHadiths() {
      try {
        const hadiths = await getHadithsAsync();
        setHadiths(hadiths);
      } catch (err) {
        console.error("Error loading hadiths", err);
      }
    }

    fetchHadiths();
  }, []);

  useEffect(() => {
    if (hadiths && hadiths.length > 0) {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - start.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const nameIndex = dayOfYear % hadiths.length;
      setDailyHadith(hadiths[nameIndex]);
    }
  }, [hadiths]);

  return (
    <dialog id={id} className="modal">
      <div
        className="modal-box h-full w-full rounded-none bg-neutral-content text-neutral"
        dir="rtl"
      >
        <form method="dialog">
          <button className="cursor-pointer hover:bg-base-100/10 hover:scale-101 p-1.5 rounded-full absolute left-3 top-5 transition-all">
            <X />
          </button>
        </form>

        <article className="flex flex-col pt-10 gap-6 h-full">
          {dailyHadith && (
            <>
              <header className="flex flex-col items-center gap-2">
                <span className="text-sm">
                  <Sprout className="mx-auto text-primary/90" />
                  فەرموودەی ڕۆژ
                </span>
                <p className="bg-base-100/5 shadow-xs p-2 rounded-full">
                  {dailyHadith.title}
                </p>
              </header>

              <hr className="border-base-100/40" />

              <p className="text-base font-bold leading-8">
                <Flower size={20} className="inline me-2 text-primary/80" />
                {dailyHadith.arabic}
              </p>

              <hr className="border-base-100/40" />

              <p className="text-md font-medium leading-8 ">
                <Flower size={20} className="inline me-2 text-primary/80" />
                {dailyHadith.kurdish}
              </p>
            </>
          )}
        </article>
      </div>
    </dialog>
  );
}

export default HadithModal;
