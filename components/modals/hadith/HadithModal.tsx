import { useState, useEffect, SubmitEvent } from "react";
import { getHadithsAsync, type Hadith } from "imanikurd";

import { Flower2, PanelLeftClose, Sprout, X } from "lucide-react";

import DailyHadith from "./DailyHadith";

function HadithModal({ id }: { id: string }) {
  const [hadiths, setHadiths] = useState<Hadith[] | null>(null);
  const [readingMode, setReadingMode] = useState<boolean>(false);

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

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    if (readingMode) {
      e.preventDefault();
      setReadingMode(false);
    }
  };

  return (
    <dialog id={id} className="modal">
      <div
        className="modal-box py-4 h-full w-full rounded-none bg-neutral-content text-neutral hide-scrollbar"
        dir="rtl"
      >
        <form method="dialog" onSubmit={(e) => handleSubmit(e)}>
          <button className="cursor-pointer hover:bg-base-100/10 hover:scale-101 p-1.5 rounded-full absolute left-3 top-5 transition-all">
            {readingMode ? <PanelLeftClose /> : <X />}
          </button>
        </form>
        <section className="pt-12 text-base">
          <DailyHadith hadithsList={hadiths} />
        </section>
      </div>
    </dialog>
  );
}

export default HadithModal;
