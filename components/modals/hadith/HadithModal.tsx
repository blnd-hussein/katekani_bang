import { useState, useEffect, Activity } from "react";
import { Flower2, Sprout, X } from "lucide-react";
import { getHadithsAsync, type Hadith } from "imanikurd";

import DailyHadith from "./DailyHadith";
import HadithList from "./HadithList";

function HadithModal({ id }: { id: string }) {
  const [hadiths, setHadiths] = useState<Hadith[] | null>(null);
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

  return (
    <dialog id={id} className="modal">
      <div
        className="modal-box py-4 h-full w-full rounded-none bg-neutral-content text-neutral"
        dir="rtl"
      >
        <form method="dialog">
          <button className="cursor-pointer hover:bg-base-100/10 hover:scale-101 p-1.5 rounded-full absolute left-3 top-4 transition-all">
            <X />
          </button>
        </form>

        <section className="grid grid-rows-[460px__60px] gap-2 place-content-between pt-8 h-full overflow-clip">
          <>
            <Activity mode={activeSection === "daily" ? "visible" : "hidden"}>
              <DailyHadith hadithsList={hadiths} />
            </Activity>

            <Activity mode={activeSection === "all" ? "visible" : "hidden"}>
              <HadithList />
            </Activity>
          </>

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
