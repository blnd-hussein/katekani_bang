import { useState, useEffect, SubmitEvent } from "react";

import {
  getDhikrCategoriesAsync,
  getDhikrByCategoryAsync,
  type DhikrCategory,
  type DhikrItem,
} from "imanikurd";

import { Flower, Flower2, PanelLeftClose, X } from "lucide-react";

function DhikrModal({ id }: { id: string }) {
  const [dhikrCategories, setDhikrCategories] = useState<
    DhikrCategory[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<DhikrCategory | null>(null);
  const [dhikrContent, setDhikrContent] = useState<DhikrItem[] | null>(null);

  useEffect(() => {
    async function fetchDhikrCategories() {
      try {
        const categories = await getDhikrCategoriesAsync();
        setDhikrCategories(categories);
      } catch (err) {
        console.error("Error loading prayer data:", err);
      }
    }

    fetchDhikrCategories();
  }, []);

  useEffect(() => {
    async function fetchDhikrContent() {
      try {
        if (!selectedCategory) return;
        const content = await getDhikrByCategoryAsync(selectedCategory.id);
        setDhikrContent(content);
      } catch (err) {
        console.error("Error loading prayer data:", err);
      }
    }

    fetchDhikrContent();
  }, [selectedCategory]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    if (selectedCategory) {
      e.preventDefault();
      setSelectedCategory(null);
    }
  };

  return (
    <dialog id={id} className="modal">
      <div
        className="modal-box h-full w-full overflow-clip rounded-none bg-neutral-content text-neutral"
        dir="rtl"
      >
        <form method="dialog" onSubmit={(e) => handleSubmit(e)}>
          <button className="cursor-pointer hover:bg-base-100/10 hover:scale-101 p-1.5 rounded-full absolute left-3 top-5 transition-all">
            {selectedCategory ? <PanelLeftClose /> : <X />}
          </button>
        </form>

        <section className="h-138 pt-12">
          <ul className="overflow-y-auto h-full space-y-2 hide-scrollbar">
            {selectedCategory
              ? dhikrContent &&
                dhikrContent.map((dhikr) => {
                  return (
                    <li
                      className="space-y-2 bg-base-100/10 p-5 rounded-lg"
                      key={dhikr.id}
                    >
                      <p>
                        <Flower
                          className="inline me-1.5 text-primary/60"
                          size={20}
                        />
                        {dhikr.arabic}
                      </p>
                      <p className="text-neutral/80">{dhikr.kurdish}</p>
                    </li>
                  );
                })
              : dhikrCategories?.map((category, index) => {
                  return (
                    <li key={category.id}>
                      <button
                        className="flex justify-between items-center bg-base-100/10 cursor-pointer hover:bg-base-100/20 p-4 rounded-xl w-full"
                        onClick={() => setSelectedCategory(category)}
                      >
                        <span className="text-right">
                          <Flower2 className="inline me-2 text-primary/60" />
                          {category.name}
                        </span>
                        <span>{index + 1}</span>
                      </button>
                    </li>
                  );
                })}
          </ul>
        </section>
      </div>
    </dialog>
  );
}

export default DhikrModal;
