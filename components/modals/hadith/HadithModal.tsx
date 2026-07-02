import { useState, useEffect, SubmitEvent } from "react";
import { getHadithsAsync, type Hadith } from "imanikurd";

import { Flower2, PanelLeftClose, Sprout, X } from "lucide-react";

import DailyHadith from "./DailyHadith";
import HadithList from "./HadithList";

function HadithModal({ id }: { id: string }) {
  const [hadiths, setHadiths] = useState<Hadith[] | null>(null);
  const [readingMode, setReadingMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<"daily" | "all">("daily");

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
        className="modal-box py-4 h-full w-full rounded-none bg-neutral-content text-neutral"
        dir="rtl"
      >
        <form method="dialog" onSubmit={(e) => handleSubmit(e)}>
          <button className="cursor-pointer hover:bg-base-100/10 hover:scale-101 p-1.5 rounded-full absolute left-3 top-5 transition-all">
            {readingMode ? <PanelLeftClose /> : <X />}
          </button>
        </form>

        <section className="grid grid-rows-[450px__60px] gap-2 place-content-between pt-12 h-full overflow-clip">
          <section className="min-w-[26.970rem]">
            {activeSection === "daily" ? (
              <DailyHadith hadithsList={hadiths} />
            ) : (
              <HadithList
                hadithsList={hadiths}
                readingMode={readingMode}
                setReadingMode={setReadingMode}
              />
            )}
          </section>

          <nav className="flex justify-evenly items-center bg-base-100/10 rounded-full shadow-xs w-46 mx-auto">
            <button
              className={`cursor-pointer ${activeSection === "all" && "text-primary"}`}
              onClick={() => setActiveSection("all")}
            >
              <Flower2 size={25} className="hover:scale-105 active:scale-100" />
            </button>

            <button
              className={`cursor-pointer ${activeSection === "daily" && "text-primary"}`}
              onClick={() => setActiveSection("daily")}
            >
              <Sprout size={26} className="hover:scale-105 active:scale-100" />
            </button>
          </nav>
        </section>
      </div>
    </dialog>
  );
}

export default HadithModal;
