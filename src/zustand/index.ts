import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  tldrStorage: ResponseSchema[];
  addData: (data: ResponseSchema) => void;
};

const useBotStore = create<Store>()(
  persist(
    (set) => ({
      tldrStorage: <ResponseSchema[]>[],
      addData(data) {
        set((state) => {
          return {
            tldrStorage: [...state.tldrStorage, data],
          };
        });
      },
    }), //end of setter function for create
    {
      name: "tldr-storage",
    }
  )
);

export { useBotStore };
