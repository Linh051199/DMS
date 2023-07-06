import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_StatisticHTCStock01Param {
  FlagDataWH: 1 | 0;
}

export interface Rpt_StatisticHTCStock01Record {
  CVMODELCODE:string,
  CVMODELNAME:string,
  CVSPECCODE:string,
  CVSPECDESCRIPTION:string,
  ACTUALSPEC:string,
  AC_SPECDESCRIPTION:string,
  TOTAL_ALL:number,
  TOTAL_MAPVINNOTLXX:number,
  TOTAL_LXXNOTXKHO:number,
  TOTAL_NOTMAPVIN:number,
  TOTAL_MAPVINNOTLXX_0_14:number,
  TOTAL_LXXNOTXKHO_0_14:number,
  TOTAL_NOTMAPVIN_0_14:number,
  TOTAL_MAPVINNOTLXX_15_30:number,
  TOTAL_LXXNOTXKHO_15_30:number,
  TOTAL_NOTMAPVIN_15_30:number,
  TOTAL_MAPVINNOTLXX_31_90:number,
  TOTAL_LXXNOTXKHO_31_90:number,
  TOTAL_NOTMAPVIN_31_90:number,
  TOTAL_MAPVINNOTLXX_91_180:number,
  TOTAL_LXXNOTXKHO_91_180:number,
  TOTAL_NOTMAPVIN_91_180:number,
  TOTAL_MAPVINNOTLXX_181_360:number,
  TOTAL_LXXNOTXKHO_181_360:number,
  TOTAL_NOTMAPVIN_181_360:number,
  TOTAL_MAPVINNOTLXX_361_365000:number,
  TOTAL_LXXNOTXKHO_361_365000:number,
  TOTAL_NOTMAPVIN_361_365000:number
}

interface Rpt_StatisticHTCStock01ParamData {
  Lst_RptStatistic_HTCStock01: Rpt_StatisticHTCStock01Record[];
}
export const useRpt_StatisticHTCStock01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_StatisticHTCStock01_SearchHQ: async (
      params: Rpt_StatisticHTCStock01Param
    ): Promise<ApiResponse<Rpt_StatisticHTCStock01ParamData>> => {
      return await apiBase.post<
        Rpt_StatisticHTCStock01Param,
        ApiResponse<Rpt_StatisticHTCStock01ParamData>
      >("/RptStatisticHTCStock01/SearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticHTCStock01_ExportSearchHQ: async (
      params: Rpt_StatisticHTCStock01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_StatisticHTCStock01Param, ApiResponse<string>>(
        "/RptStatisticHTCStock01/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_StatisticHTCStock01_ExportDetailSearchHQ: async (
      params: Rpt_StatisticHTCStock01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_StatisticHTCStock01Param, ApiResponse<string>>(
        "/RptStatisticHTCStock01/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
