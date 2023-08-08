import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface RptMinimumSurvivalRealTimeParam {
  DealerCodeInput: string;
  FlagDataWH: 1 | 0;
}

export interface RptMinimumSurvivalRealTimeRecord {
  DealerCode: string;
  DealerName: string;
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  QtyMinCar: string;
  QtyCar: string;
  QtyRemain: string;
}

interface RptMinimumSurvivalRealTimeData {
  Lst_RptMinimumSurvival_RealTime: RptMinimumSurvivalRealTimeRecord[];
}
export const useRptMinimumSurvivalRealTime = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptMinimumSurvivalRealTime_SearchHQ: async (
      params: RptMinimumSurvivalRealTimeParam
    ): Promise<ApiResponse<RptMinimumSurvivalRealTimeData>> => {
      console.log("🚀 ~ params:", params);
      return await apiBase.post<
        RptMinimumSurvivalRealTimeParam,
        ApiResponse<RptMinimumSurvivalRealTimeData>
      >("/RptMinimumSurvivalRealTime/SearchHQ", {
        ...params,
      });
    },
    RptMinimumSurvivalRealTime_SearchDL: async (
      params: RptMinimumSurvivalRealTimeParam
    ): Promise<ApiResponse<RptMinimumSurvivalRealTimeData>> => {
      return await apiBase.post<
        RptMinimumSurvivalRealTimeParam,
        ApiResponse<RptMinimumSurvivalRealTimeData>
      >("/RptMinimumSurvivalRealTime/SearchDL", {
        ...params,
      });
    },
    RptMinimumSurvivalRealTime_ExportDetailSearchHQ: async (
      params: RptMinimumSurvivalRealTimeParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptMinimumSurvivalRealTimeParam,
        ApiResponse<string>
      >("/RptMinimumSurvivalRealTime/ExportDetailSearchHQ", {
        ...params,
      });
    },
    RptMinimumSurvivalRealTime_ExportDetailSearchDL: async (
      params: RptMinimumSurvivalRealTimeParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptMinimumSurvivalRealTimeParam,
        ApiResponse<string>
      >("/RptMinimumSurvivalRealTime/ExportDetailSearchDL", {
        ...params,
      });
    },
  };
};
