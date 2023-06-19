import { ApiResponse } from "@/packages/types";

import { AxiosInstance } from "axios";
export interface Rpt_PmtGuaranteeBankMarketSum01Param {
  OpenDateFrom: string;
  OpenDateTo: string;
  Dealer: string;
  Bank: string;
  GuaranteeType: string;
  FlagHTC: string;
  GrtPaidStatus: string;
  FlagDataWH: 1 | 0;
}

export interface Lst_Rpt_PmtGuaranteeBankMarketSum01ParamData {
  FEEAVG: number;
  BANKCODEPARENT: string;
  MARKETPERCENT: number;
  MONTHOPEN: string;
  TOTALAMOUNT: string;
}

interface RptPmtGuaranteeBankMarketSum01Data {
  Lst_Rpt_PmtGuaranteeBankMarketSum_01: Lst_Rpt_PmtGuaranteeBankMarketSum01ParamData[];
}
export const useRpt_PmtGuaranteeBankMarketSum01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    RptPmtGuaranteeBankMarketSum01_SearchHQ: async (
      params: Rpt_PmtGuaranteeBankMarketSum01Param
    ): Promise<ApiResponse<RptPmtGuaranteeBankMarketSum01Data>> => {
      return await apiBase.post<
        Rpt_PmtGuaranteeBankMarketSum01Param,
        ApiResponse<RptPmtGuaranteeBankMarketSum01Data>
      >("/RptPmtGuaranteeBankMarketSum01/SearchHQ", {
        ...params,
      });
    },
    RptPmtGuaranteeBankMarketSum01_ExportDetailSearchHQ: async (
      params: Rpt_PmtGuaranteeBankMarketSum01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_PmtGuaranteeBankMarketSum01Param,
        ApiResponse<string>
      >("/RptPmtGuaranteeBankMarketSum01/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
