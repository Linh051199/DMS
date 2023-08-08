import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export enum EReportType {
  DealerCode = "Dealer",
  Spec = "Spec",
}

export interface Rpt_CarDeliveryOutButNotDutyCompleteParam {
  ReportType: EReportType | "";
  DateFrom: string;
  DateTo: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_CarDeliveryOutButNotDutyCompleteRecord {
  SPECCODE?: string; // Spec Code
  SPECDESCRIPTION?: string; // Đặc tả xe
  DEALERCODE?: string;
  DEALERNAME?: string;
  SUM1_15: string; // 1-15
  SUM16_30: string; // 16-30
  SUM31_60: string; // 31-60
  SUM61_180: string; // 60-180
  SUM181_360: string; // 81-360
  SUM361: string; // Trên 360
  TOTALCAR: string; // Tổng
}

interface Rpt_CarDeliveryOutButNotDutyCompleteData {
  Lst_RptCarDeliveryOut_ButNotDutyComplete_ByDealer?: Rpt_CarDeliveryOutButNotDutyCompleteRecord[];
  Lst_RptCarDeliveryOut_ButNotDutyComplete_BySpec?: Rpt_CarDeliveryOutButNotDutyCompleteRecord[];
}
export const useRpt_CarDeliveryOutButNotDutyComplete = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_CarDeliveryOutButNotDutyComplete_SearchHQ: async (
      params: Rpt_CarDeliveryOutButNotDutyCompleteParam
    ): Promise<ApiResponse<Rpt_CarDeliveryOutButNotDutyCompleteData>> => {
      return await apiBase.post<
        Rpt_CarDeliveryOutButNotDutyCompleteParam,
        ApiResponse<Rpt_CarDeliveryOutButNotDutyCompleteData>
      >("/RptCarDeliveryOutButNotDutyComplete/SearchHQ", {
        ...params,
      });
    },
    Rpt_CarDeliveryOutButNotDutyComplete_ExportSearchHQ: async (
      params: Rpt_CarDeliveryOutButNotDutyCompleteParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_CarDeliveryOutButNotDutyCompleteParam,
        ApiResponse<string>
      >("/RptCarDeliveryOutButNotDutyComplete/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_CarDeliveryOutButNotDutyComplete_ExportDetailSearchHQ: async (
      params: Rpt_CarDeliveryOutButNotDutyCompleteParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_CarDeliveryOutButNotDutyCompleteParam,
        ApiResponse<string>
      >("/RptCarDeliveryOutButNotDutyComplete/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
