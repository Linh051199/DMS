import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_DLSDealDetailLoanEUBankMarketSum01_Params {
  DeliveryFrom: any;
  DeliveryTo: any;
  Dealer: any;
}

export interface Rpt_DLSDealDetailLoanEUBankMarketSum01_Record {
  Lst_Rpt_DLSDealDetailLoanEUBankMarketSum_01: any[];
}

export const useRpt_DLSDealDetailLoanEUBankMarketSum01Api = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealDetailerCode"] = "HTV";

  return {
    Rpt_DLSDealDetailLoanEUBankMarketSum01_SearchHQ: async (
      params: Rpt_DLSDealDetailLoanEUBankMarketSum01_Params
    ): Promise<ApiResponse<Rpt_DLSDealDetailLoanEUBankMarketSum01_Record>> => {
      return await apiBase.post<
        Rpt_DLSDealDetailLoanEUBankMarketSum01_Params,
        ApiResponse<Rpt_DLSDealDetailLoanEUBankMarketSum01_Record>
      >("/RptDLSDealDetailLoanEUBankMarketSum01/SearchHQ", {
        ...params,
      });
    },
    Rpt_DLSDealDetailLoanEUBankMarketSum01_SearchDL: async (
      params: Rpt_DLSDealDetailLoanEUBankMarketSum01_Params
    ): Promise<ApiResponse<Rpt_DLSDealDetailLoanEUBankMarketSum01_Record>> => {
      return await apiBase.post<
        Rpt_DLSDealDetailLoanEUBankMarketSum01_Params,
        ApiResponse<Rpt_DLSDealDetailLoanEUBankMarketSum01_Record>
      >("/RptDLSDealDetailLoanEUBankMarketSum01/SearchDL", {
        ...params,
      });
    },
    Rpt_DLSDealDetailLoanEUBankMarketSum01_ExportDetailSearchHQ: async (
      params: Rpt_DLSDealDetailLoanEUBankMarketSum01_Params
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_DLSDealDetailLoanEUBankMarketSum01_Params,
        ApiResponse<any>
      >("/RptDLSDealDetailLoanEUBankMarketSum01/ExportDetailSearchHQ", {
        ...params,
      });
    },
    Rpt_DLSDealDetailLoanEUBankMarketSum01_ExportDetailSearchDL: async (
      params: Rpt_DLSDealDetailLoanEUBankMarketSum01_Params
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_DLSDealDetailLoanEUBankMarketSum01_Params,
        ApiResponse<any>
      >("/RptDLSDealDetailLoanEUBankMarketSum01/ExportDetailSearchDL", {
        ...params,
      });
    },
  };
};
