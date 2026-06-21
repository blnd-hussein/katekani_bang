import { useState, useEffect } from "react";
import { storage } from "#imports";

export function useStorage<T>(
  key:
    | `local:${string}`
    | `session:${string}`
    | `sync:${string}`
    | `managed:${string}`,
  fallback: T,
) {
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    storage.getItem<T>(key).then((res: T | null) => {
      if (res !== null && res !== undefined) {
        setValue(res);
      }
    });

    const unwatch = storage.watch<T>(key, (newVal) => {
      if (newVal !== null && newVal !== undefined) {
        setValue(newVal);
      } else {
        setValue(fallback);
      }
    });

    return () => {
      unwatch();
    };
  }, [key, fallback]);

  const setStorageValue = async (newValue: T) => {
    setValue(newValue);
    await storage.setItem(key, newValue);
  };

  return [value, setStorageValue] as const;
}
