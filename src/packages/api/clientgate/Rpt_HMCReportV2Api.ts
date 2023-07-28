import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_HMCReportV2Param {
  DateFrom: string;
  DateTo : string;
  FlagDataWH: 1 | 0;
}



export const useRpt_HMCReportV2 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_HMCReportV2_ExportSearchHQ: async (
      params: Rpt_HMCReportV2Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_HMCReportV2Param,
        ApiResponse<string>
      >("/RptHMCReportV2/ExportSearchHQ", {
        ...params,
      });
    },

  };
};
