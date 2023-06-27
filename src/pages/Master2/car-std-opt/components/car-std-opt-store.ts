import { atom } from "jotai";
import { Mst_CarStdOpt } from "@/packages/types";

export const selectedItemsAtom = atom<string[]>([]);

export enum ViewMode {
  ReadOnly = "readonly",
  Edit = "edit",
}

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<Mst_CarStdOpt | undefined>(undefined);

export const viewingDataAtom = atom(
  (get) => {
    return {
      rowIndex: get(viewingRowAtom),
      item: get(viewingItemAtom),
    };
  },
  (get, set, data) => {
    if (!data) {
      set(viewingRowAtom, undefined), set(viewingItemAtom, undefined);
    } else {
      const { rowIndex, item } = data as any;
      set(viewingRowAtom, rowIndex);
      set(viewingItemAtom, item);
    }
  }
);
