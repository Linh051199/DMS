import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_StockInHTCParam {
  FlagDataWH: 1 | 0;
}

export interface Rpt_StockInHTCRecord {
  MODELCODE: string,
  SpecDescription: string,
  COLORCODE:string,
  COLOR_VN_COMBINED: string,
  TOTAL: number,
}

interface Rpt_StockInHTCParamData {
  Lst_RptStockInHTC: Rpt_StockInHTCRecord[];
}
export const useRpt_StockInHTC = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_StockInHTC_SearchHQ: async (
      params: Rpt_StockInHTCParam
    ): Promise<ApiResponse<Rpt_StockInHTCParamData>> => {
      return await apiBase.post<
        Rpt_StockInHTCParam,
        ApiResponse<Rpt_StockInHTCParamData>
      >("/RptStockInHTC/SearchHQ", {
        ...params,
      });
    },
    Rpt_StockInHTC_ExportSearchHQ: async (
      params: Rpt_StockInHTCParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_StockInHTCParam, ApiResponse<string>>(
        "/RptStockInHTC/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_StockInHTC_ExportDetailSearchHQ: async (
      params: Rpt_StockInHTCParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_StockInHTCParam, ApiResponse<string>>(
        "/RptStockInHTC/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
