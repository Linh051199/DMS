import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_DLSDealLoanEUBankMarketSum01_Params {
  MonthFrom: any;
  MonthTo: any;
  Bank: any;
  Dealer: any;
}

export interface Rpt_DLSDealLoanEUBankMarketSum01_Record {
  Lst_Rpt_DLSDealLoanEUBankMarketSum_01: any[];
}

export const useRpt_DLSDealLoanEUBankMarketSum01Api = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_DLSDealLoanEUBankMarketSum01_SearchHQ: async (
      params: Rpt_DLSDealLoanEUBankMarketSum01_Params
    ): Promise<ApiResponse<Rpt_DLSDealLoanEUBankMarketSum01_Record>> => {
      return await apiBase.post<
        Rpt_DLSDealLoanEUBankMarketSum01_Params,
        ApiResponse<Rpt_DLSDealLoanEUBankMarketSum01_Record>
      >("/RptDLSDealLoanEUBankMarketSum01/SearchHQ", {
        ...params,
      });
    },
    Rpt_DLSDealLoanEUBankMarketSum01_SearchDL: async (
      params: Rpt_DLSDealLoanEUBankMarketSum01_Params
    ): Promise<ApiResponse<Rpt_DLSDealLoanEUBankMarketSum01_Record>> => {
      return await apiBase.post<
        Rpt_DLSDealLoanEUBankMarketSum01_Params,
        ApiResponse<Rpt_DLSDealLoanEUBankMarketSum01_Record>
      >("/RptDLSDealLoanEUBankMarketSum01/SearchDL", {
        ...params,
      });
    },
    Rpt_DLSDealLoanEUBankMarketSum01_ExportDetailSearchHQ: async (
      params: Rpt_DLSDealLoanEUBankMarketSum01_Params
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_DLSDealLoanEUBankMarketSum01_Params,
        ApiResponse<any>
      >("/RptDLSDealLoanEUBankMarketSum01/ExportDetailSearchHQ", {
        ...params,
      });
    },
    Rpt_DLSDealLoanEUBankMarketSum01_ExportDetailSearchDL: async (
      params: Rpt_DLSDealLoanEUBankMarketSum01_Params
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_DLSDealLoanEUBankMarketSum01_Params,
        ApiResponse<any>
      >("/RptDLSDealLoanEUBankMarketSum01/ExportDetailSearchDL", {
        ...params,
      });
    },
  };
};
