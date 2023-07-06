import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_StatisticPIInStockParam {
  ProductMonthFrom: Date | string;
  ProductMonthTo: Date | string;
  DateTo: Date | string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_StatisticPIInStockRecord {
  CCOCONTRACTNO: string;
  WWOWORKORDERNO: string;
  MODELCODE: string;
  SPECCODE: string;
  COLORCODE: string;
  SOLUONGPI: number;
  SOLUONGDALENTAU: number;
  SOLUONGDATOICANG: number;
  SOLUONGTONPI: number;
  COLOREXTCODE: string;
  COLOREXTNAME: string;
  COLOREXTNAMEVN: string;
  COLOREXTTYPE: string;
  COLORINTCODE: string;
  COLORINTNAME: string;
  COLORINTNAMEVN: string;
  COLORFEE: string;
  COLOR_VN_COMBINED: string;
  COLOR_EN_COMBINED: string;
}

interface Rpt_StatisticPIInStockParamData {
  Lst_RptStatistic_PIInStock: Rpt_StatisticPIInStockRecord[];
}
export const useRpt_StatisticPIInStock = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_StatisticPIInStock_SearchHQ: async (
      params: Rpt_StatisticPIInStockParam
    ): Promise<ApiResponse<Rpt_StatisticPIInStockParamData>> => {
      return await apiBase.post<
        Rpt_StatisticPIInStockParam,
        ApiResponse<Rpt_StatisticPIInStockParamData>
      >("/RptStatisticPIInStock/SearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticPIInStock_ExportSearchHQ: async (
      params: Rpt_StatisticPIInStockParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticPIInStockParam,
        ApiResponse<string>
      >("/RptStatisticPIInStock/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticPIInStock_ExportDetailSearchHQ: async (
      params: Rpt_StatisticPIInStockParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticPIInStockParam,
        ApiResponse<string>
      >("/RptStatisticPIInStock/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
