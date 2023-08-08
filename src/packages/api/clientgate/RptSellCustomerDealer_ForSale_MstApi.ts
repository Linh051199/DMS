import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface RptSellCustomerDealer_ForSale_MstParam {
  DateFrom: string;
  DateTo: string;
  FlagDataWH: 1 | 0;
}

export interface RptSellCustomerDealer_ForSale_MstRecord {
  CVMODELCODE: string;
  DLSDDEALERCODEOWNER: string;
  TT_CARID: string;
  DLSDDEALERNAMEOWNER: string;
}

interface RptSellCustomerDealer_ForSale_MstData {
  Lst_RptSellCustomerDealer_ForSale_Mst: RptSellCustomerDealer_ForSale_MstRecord[];
}
export const useRptSellCustomerDealer_ForSale_Mst = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptSellCustomerDealer_ForSale_Mst_SearchHQ: async (
      params: RptSellCustomerDealer_ForSale_MstParam
    ): Promise<ApiResponse<RptSellCustomerDealer_ForSale_MstData>> => {
      return await apiBase.post<
        RptSellCustomerDealer_ForSale_MstParam,
        ApiResponse<RptSellCustomerDealer_ForSale_MstData>
      >("/RptSellCustomerDealerForSaleMst/SearchHQ", {
        ...params,
      });
    },
    RptSellCustomerDealer_ForSale_Mst_ExportDetailSearchHQ: async (
      params: RptSellCustomerDealer_ForSale_MstParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptSellCustomerDealer_ForSale_MstParam,
        ApiResponse<string>
      >("/RptSellCustomerDealerForSaleMst/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
