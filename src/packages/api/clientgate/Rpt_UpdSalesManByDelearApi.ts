import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface RptUpdSalesManByDelearParam {
  // Date_From: string;
  // Date_To: string;
  FlagDataWH: 1 | 0;
}

export interface RptUpdSalesManByDelearRecord {
  DealerCode: string;
  DealerName: string;
  SMCode: string;
  LastestUpdDateTime: string;

}

interface RptUpdSalesManByDelearData {
  Lst_Rpt_UpdSalesManByDealer: RptUpdSalesManByDelearRecord[];
}
export const useRptUpdSalesManByDelear = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptUpdSalesManByDelear_SearchHQ: async (
      params: RptUpdSalesManByDelearParam
    ): Promise<ApiResponse<RptUpdSalesManByDelearData>> => {
      return await apiBase.post<
        RptUpdSalesManByDelearParam,
        ApiResponse<RptUpdSalesManByDelearData>
      >("/RptUpdSalesManByDelear/SearchHQ", {
        ...params,
      });
    },
    RptUpdSalesManByDelear_ExportSearchHQ: async (
      params: RptUpdSalesManByDelearParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptUpdSalesManByDelearParam,
        ApiResponse<string>
      >("/RptUpdSalesManByDelear/ExportSearchHQ", {
        ...params,
      });
    },
    // RptUpdSalesManByDelear_ExportDetailSearchHQ: async (
    //   params: RptUpdSalesManByDelearParam
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<
    //     RptUpdSalesManByDelearParam,
    //     ApiResponse<string>
    //   >("/RptUpdSalesManByDelear/ExportDetailSearchHQ", {
    //     ...params,
    //   });
    // },
  };
};
