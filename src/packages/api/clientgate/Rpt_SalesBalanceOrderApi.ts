import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_SalesBalanceOrderParam {
  dateFrom: string;
  dateTo: string;
  reportType: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_SalesBalanceOrderRecord {}

interface Rpt_SalesBalanceOrderData {
  Lst_Rpt_SalesBalanceOrder?: Rpt_SalesBalanceOrderRecord[];
}
export const useRptSalesBalanceOrder = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_SalesBalanceOrder_SearchHQ: async (
      params: Rpt_SalesBalanceOrderParam
    ): Promise<ApiResponse<Rpt_SalesBalanceOrderData>> => {
      return await apiBase.post<
        Rpt_SalesBalanceOrderParam,
        ApiResponse<Rpt_SalesBalanceOrderData>
      >("/RptSalesBalanceOrder/SearchHQ", {
        ...params,
      });
    },
    Rpt_SalesBalanceOrder_ExportSearchHQ: async (
      params: Rpt_SalesBalanceOrderParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_SalesBalanceOrderParam,
        ApiResponse<string>
      >("/RptSalesBalanceOrder/ExportSearchHQ", {
        ...params,
      });
    },
  };
};
