import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_DebitReport02NewParam {
  DateFrom: Date | string;
  DateTo: Date | string;
  PaymentDateFrom: Date | string;
  PaymentDateTo: Date | string;
  Dealer: string;
  DealerType: string;
  FlagIsHTC: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_DebitReport02NewRecord {
  DEALERCODE: string;
  DEALERNAME: string;
  RIT_QUANTITY: number;
  RIT_TOTAL: number;
  RIT_TOTALRECEIVED: number;
  RIT_REMAIN_GUARANTEE: number;
  RIT_REMAIN_NONEGUARANTEE: number;
  RDT_QUANTITY: number;
  RDT_TOTAL: number;
  RDT_TOTALRECEIVED: number;
  RDT_DEALERDEBT_POLICY_REMAIN: number;
  RDT_REMAIN: number;
  ROT_QUANTITY: number;
  ROT_TOTAL: number;
  ROT_TOTALRECEIVED: number;
  ROT_DEALERDEBT_POLICY_REMAIN: number;
}

interface Rpt_DebitReport02NewParamData {
  Lst_RptDebitReport: Rpt_DebitReport02NewRecord[];
}
export const useRpt_DebitReport02New = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_DebitReport02New_SearchHQ: async (
      params: Rpt_DebitReport02NewParam
    ): Promise<ApiResponse<Rpt_DebitReport02NewParamData>> => {
      return await apiBase.post<
        Rpt_DebitReport02NewParam,
        ApiResponse<Rpt_DebitReport02NewParamData>
      >("/RptDebitReport02New/SearchHQ", {
        ...params,
      });
    },
    Rpt_DebitReport02New_ExportSearchHQ: async (
      params: Rpt_DebitReport02NewParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_DebitReport02NewParam, ApiResponse<string>>(
        "/RptDebitReport02New/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_DebitReport02New_ExportDetailSearchHQ: async (
      params: Rpt_DebitReport02NewParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_DebitReport02NewParam, ApiResponse<string>>(
        "/RptDebitReport02New/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
