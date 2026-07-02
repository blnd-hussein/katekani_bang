import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getHadithAsync, type Hadith } from "imanikurd";

import { Flower, Flower2 } from "lucide-react";

interface HadithListProps {
  hadithsList: Hadith[] | null;

  readingMode: boolean;
  setReadingMode: Dispatch<SetStateAction<boolean>>;
}

function HadithList(props: HadithListProps) {
  const [selectedHadith, setSelectedHadith] = useState<Hadith | undefined>(
    undefined,
  );

  useEffect(() => {
    async function fetchDhikrContent() {
      try {
        if (!selectedHadith) return;
        const content = await getHadithAsync(selectedHadith.id);
        setSelectedHadith(content);
        props.setReadingMode(true);
      } catch (err) {
        console.error("Error loading prayer data:", err);
      }
    }

    fetchDhikrContent();
  }, [selectedHadith]);

  useEffect(() => {
    if (!props.readingMode) setSelectedHadith(undefined);
  }, [props.readingMode]);

  return (
    <div className="h-full">
      <ul className="overflow-y-auto h-full space-y-2 hide-scrollbar">
        {selectedHadith ? (
          <li
            className="space-y-2 bg-base-100/10 p-5 rounded-lg leading-8"
            key={selectedHadith.id}
          >
            <p>
              <Flower className="inline me-1.5 text-primary/60" size={20} />
              {selectedHadith.arabic}
            </p>
            <p className="text-neutral/80">{selectedHadith.kurdish}</p>
          </li>
        ) : (
          props.hadithsList?.map((hadith, index) => {
            return (
              <li key={hadith.id}>
                <button
                  className="flex justify-between items-center bg-base-100/10 cursor-pointer hover:bg-base-100/20 p-4 rounded-xl w-full"
                  onClick={() => setSelectedHadith(hadith)}
                >
                  <span className="text-right">
                    <Flower2 className="inline me-2 text-primary/60" />
                    {hadith.title}
                  </span>
                  <span>{index + 1}</span>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default HadithList;
