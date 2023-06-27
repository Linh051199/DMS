import { atom } from "jotai";
import {
  FlagActiveEnum,
  Mst_Transporter,
  Search_Mst_Transporter,
} from "@packages/types";

export const selectedItemsAtom = atom<string[]>([]);

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<Mst_Transporter | undefined>(undefined);

export const viewingDataAtom = atom(
  (get) => {
    return {
      rowIndex: get(viewingRowAtom),
      item: get(viewingRowAtom),
    };
  },
  (get, set, data) => {
    if (!data) {
      set(viewingRowAtom, undefined);
      set(viewingItemAtom, undefined);
    } else {
      const { rowIndex, item } = data as any;
      set(viewingRowAtom, rowIndex);
      set(viewingItemAtom, item);
    }
  }
);
