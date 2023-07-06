import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_PenaltyPmtDelayParam {
  FlagDataWH?: number | "";
  ApprovedDate2From?: string | "";
  ApprovedDate2To?: string;
  PaymentEndDateTo?: string;
  TTCStatus?: string;
  SOCode?: string;
  DealerCodeInput?: string;
  FlagisHTC?: number

}

export interface Rpt_PenaltyPmtDelayRecord {
  DEALERCODE: string;
  DEALERNAME: string;
  SOCODE: number;
  OSO_APPROVEDDATE2: number;
  TOTALAPPROVEDQUANTITY: number;
  TOTALUNITPRICEACTUAL: number;
  MAX_QTYDATEDELAYPMTCOC: number;
  MAX_QTYDATEDELAYOPENGRM: number;
  MAX_QTYDATEDELAYPMTGRM: number;
  MAX_QTYDATEDELAY60PMT: number;
  MAX_QTYDELAY40PMTREMAIN: number;
  TOTALDATEPENALTY: number;
  MDC_PENALTYPERCENT: number;
  AMOUNTPENALTYTTC: number;
  PENALIZEACTUAL: number;
}


interface Rpt_PenaltyPmtDelayData {
  Lst_Rpt_Ord_SalesOrder_CalcPmtDelayPenalty?: Rpt_PenaltyPmtDelayRecord[];

}
export const useRpt_PenaltyPmtDelay = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_PenaltyPmtDelay_SearchHQ: async (
      params: Rpt_PenaltyPmtDelayParam
    ): Promise<ApiResponse<Rpt_PenaltyPmtDelayData>> => {
      return await apiBase.post<
        Rpt_PenaltyPmtDelayParam,
        ApiResponse<Rpt_PenaltyPmtDelayData>
      >("/RptPenaltyPmtDelay/SearchHQ", {
        ...params,
      });
    },
    Rpt_PenaltyPmtDelay_ExportSearchHQ: async (
      params: Rpt_PenaltyPmtDelayParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_PenaltyPmtDelayParam, ApiResponse<string>>(
        "/RptPenaltyPmtDelay/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_PenaltyPmtDelay_ExportDetailSearchHQ: async (
      params: Rpt_PenaltyPmtDelayParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_PenaltyPmtDelayParam, ApiResponse<string>>(
        "/RptPenaltyPmtDelay/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
