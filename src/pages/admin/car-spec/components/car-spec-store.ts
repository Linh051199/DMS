import {
  FlagActiveEnum,
  Mst_CarSpec,
  SearchMst_CarSpecParam,
} from "@/packages/types";
import { atom } from "jotai";

export const selectedItemsAtom = atom<string[]>([]);

export const viewingRowAtom = atom<number | undefined>(undefined);

export const viewingItemAtom = atom<Mst_CarSpec | undefined>(undefined);

export const viewingDataAtom = atom(
  (get) => {
    return {
      rowIndex: get(viewingRowAtom),
      item: get(viewingItemAtom),
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

export const searchConditionAtom = atom<SearchMst_CarSpecParam>({
  FlagActive: FlagActiveEnum.All,
  Ft_PageIndex: 0,
  Ft_PageSize: 9999,
  KeyWord: "",
  SpecCode: "",
  SpecDescription: "",
  AssemblyStatus: "",
});
