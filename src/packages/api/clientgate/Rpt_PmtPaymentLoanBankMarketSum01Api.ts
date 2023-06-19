import { ApiResponse } from "@/packages/types";

import { AxiosInstance } from "axios";
export interface Rpt_PmtPaymentLoanBankMarketSum01Param {
  MoneyIncomeFrom: string;
  MoneyIncomeTo: string;
  Dealer: string;
  Bank: string;
  FlagHTC: string;
  FlagDataWH: 1 | 0;
}

export interface Lst_Rpt_PmtPaymentLoanBankMarketSum01ParamData {
  BANKCODEPARENT: string;
  BANKNAME: string;
  PAYMENTENDMONTH: string;
  TOTALAMOUNT: number;
  MARKETPERCENT: number;
  INTERESTRATEAVG: number;
}

interface RptPmtPaymentLoanBankMarketSum01Data {
  Lst_Rpt_PmtPaymentLoanBankMarketSum_01: Lst_Rpt_PmtPaymentLoanBankMarketSum01ParamData[];
}
export const useRpt_PmtPaymentLoanBankMarketSum01 = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    RptPmtPaymentLoanBankMarketSum01_SearchHQ: async (
      params: Rpt_PmtPaymentLoanBankMarketSum01Param
    ): Promise<ApiResponse<RptPmtPaymentLoanBankMarketSum01Data>> => {
      return await apiBase.post<
        Rpt_PmtPaymentLoanBankMarketSum01Param,
        ApiResponse<RptPmtPaymentLoanBankMarketSum01Data>
      >("/RptPmtPaymentLoanBankMarketSum01/SearchHQ", {
        ...params,
      });
    },
    RptPmtPaymentLoanBankMarketSum01_ExportDetailSearchHQ: async (
      params: Rpt_PmtPaymentLoanBankMarketSum01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_PmtPaymentLoanBankMarketSum01Param,
        ApiResponse<string>
      >("/RptPmtPaymentLoanBankMarketSum01/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
