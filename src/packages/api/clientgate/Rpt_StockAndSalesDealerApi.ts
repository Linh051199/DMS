import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_StockAndSalesDealerParam {
  QtyMonth: number;
  Status: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_StockAndSalesDealerRecord {
  DealerCode: string // mã đại lý
  DealerName: string // tên đại lý
  ModelCode: string // mã model
  ModelName: string // tên model
  QtySaleTotal: string // Tổng tình trạng xe
  QtyTonKho: string
  QtySaleAvg: string // Trung bình bán hàng
  TiLe: string // Tỉ lệ
}

interface Rpt_StockAndSalesDealerParamData {
  Lst_Rpt_StockAndSalesDealer: Rpt_StockAndSalesDealerRecord[];
}
export const useRpt_StockAndSalesDealer = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_StockAndSalesDealer_SearchHQ: async (
      params: Rpt_StockAndSalesDealerParam
    ): Promise<ApiResponse<Rpt_StockAndSalesDealerParamData>> => {
      return await apiBase.post<
        Rpt_StockAndSalesDealerParam,
        ApiResponse<Rpt_StockAndSalesDealerParamData>
      >("/RptStockAndSalesDealer/SearchHQ", {
        ...params,
      });
    },
    Rpt_StockAndSalesDealer_ExportSearchHQ: async (
      params: Rpt_StockAndSalesDealerParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StockAndSalesDealerParam,
        ApiResponse<string>
      >("/RptStockAndSalesDealer/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_StockAndSalesDealer_ExportDetailSearchHQ: async (
      params: Rpt_StockAndSalesDealerParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StockAndSalesDealerParam,
        ApiResponse<string>
      >("/RptStockAndSalesDealer/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
