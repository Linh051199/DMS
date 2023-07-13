import { useI18n } from "@/i18n/useI18n";
import {
  ListDealerCodeRecord,
  RptSaleBaoCaoTongHopGetRecord,
} from "@/packages/api/clientgate/Rpt_SaleBaoCaoTongHopGetApi";
import { ColumnOptions } from "@/types";
import { useAtomValue } from "jotai";
import { selectedColumnsItemsAtom, selectedSearchAtom } from "./store";

interface IUseReportColumnsProps {
  data: RptSaleBaoCaoTongHopGetRecord[];
  listDealer?: ListDealerCodeRecord[];
}

export const useReportColumns = ({
  data,
  listDealer,
}: IUseReportColumnsProps) => {
  const { t } = useI18n("Rpt_SaleBaoCaoTongHopGet");
  const selectedSearchItems = useAtomValue(selectedSearchAtom);
  const selectedColumnsItems = useAtomValue(selectedColumnsItemsAtom);
  console.log("🚀 ~ selectedColumnsItems:", selectedColumnsItems);
  return [
    {
      dataField: "Index",
      caption: t("Index"),
    },
    {
      dataField: "ChiTieu",
      caption: t("ChiTieu"),
    },
    ...selectedColumnsItems,
  ] as ColumnOptions[];
};
