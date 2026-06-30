import { useState, useEffect } from "react";

import { getPrayerCitiesAsync, getCityName } from "imanikurd";
import { Bell, Clock, MapPin, X } from "lucide-react";

import { useStorage } from "@/hooks/useStorage";
import { BACKGROUNDS } from "@/lib/consts";

function SettingsModal({ id }: { id: string }) {
  const [prayerCities, setPrayerCities] = useState<String[] | null>(null);
  const [city, setCity] = useStorage("local:city", "Slemani");

  const [notifyOnTime, setNotifyOnTime] = useStorage(
    "local:notifyOnTime",
    true,
  );
  const [notifyBefore, setNotifyBefore] = useStorage(
    "local:notifyBefore",
    "نەخێر",
  );
  const [backgroundIndex, setBackgroundIndex] = useStorage(
    "local:bgIndex",
    "a",
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        const cities = await getPrayerCitiesAsync();
        setPrayerCities(cities);
      } catch (err) {
        console.error("Error loading prayer data:", err);
      }
    }

    fetchCities();
  }, []);

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

        <section className="mt-10 space-y-5">
          <h3 className="font-bold text-lg">ڕێکخستن</h3>

          <ul className="flex flex-col gap-7 text-sm">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                ناوچەی بانگدان
              </div>
              <select
                className="select border-none w-36 outline-none bg-[#cdcfd2] shadow-xs cursor-pointer space-y-2.5"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {prayerCities?.map((c) => {
                  return (
                    <option
                      key={c.toString()}
                      value={c.toString()}
                      className={`py-2 px-1.2 bg-base-100/10 active:text-neutral ${c.toString() === city && "bg-primary! text-primary-content"}`}
                    >
                      {getCityName(c.toString())}
                    </option>
                  );
                })}
              </select>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                ئاگادارکردنەوە پێش بانگ
              </div>
              <select
                className="select border-none w-36 outline-none bg-[#cdcfd2] shadow-xs cursor-pointer space-y-2.5"
                value={notifyBefore}
                onChange={(e) => setNotifyBefore(e.target.value)}
              >
                <option
                  value="نەخێر"
                  className="py-2 px-1 bg-base-100/10 active:text-neutral"
                >
                  نەخێر
                </option>
                <option
                  value="5"
                  className="py-2 px-1 bg-base-100/10 active:text-neutral"
                >
                  5 خوولەک
                </option>
                <option
                  value="10"
                  className="py-2 px-1 bg-base-100/10 active:text-neutral"
                >
                  10 خوولەک
                </option>
                <option
                  value="15"
                  className="py-2 px-1 bg-base-100/10 active:text-neutral"
                >
                  15 خوولەک
                </option>
                <option
                  value="20"
                  className="py-2 px-1 bg-base-100/10 active:text-neutral"
                >
                  20 خوولەک
                </option>
              </select>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={20} />
                ئاگادارکردنەوە کاتی بانگ
              </div>
              <fieldset className="fieldset">
                <label className="label">
                  <input
                    type="checkbox"
                    checked={notifyOnTime}
                    onChange={(e) => setNotifyOnTime(e.target.checked)}
                    className="checkbox border-base-100/50 bg-base-100/10 text-base-100"
                  />
                </label>
              </fieldset>
            </li>

            <li className="border-b border-base-100/40"></li>

            <li className="space-y-3">
              <h4 className="text-lg">وێنەی باکگراوند</h4>

              <div className="flex justify-evenly overflow-x-auto gap-4 p-2 hide-scrollbar">
                {BACKGROUNDS.map((bg) => (
                  <img
                    key={bg.id}
                    src={bg.src}
                    alt={`Background ${bg.id.toUpperCase()}`}
                    onClick={() => setBackgroundIndex(bg.id)}
                    className={`min-w-28 h-42 object-cover cursor-pointer rounded-md transition-all duration-200 ${
                      backgroundIndex === bg.id
                        ? "ring-4 ring-primary scale-105"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </li>
          </ul>
        </section>
      </div>
    </dialog>
  );
}

export default SettingsModal;
