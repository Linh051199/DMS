import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_StatisticGrpDealer01Param {
  FlagDataWH: 1 | 0;
}

export interface Rpt_StatisticGrpDealer01Record {
  MDDEALERCODE: string;
  MDDEALERNAME: string;
  DEALERCODE: string;
  TT_DATE: number;
  TT_MONTH: number;
  TT_YEAR: number;
  TT_STOCK: number;
}

interface Rpt_StatisticGrpDealer01ParamData {
  Lst_RptStatistic_GrpDealer01: Rpt_StatisticGrpDealer01Record[];
}
export const useRpt_StatisticGrpDealer01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_StatisticGrpDealer01_SearchHQ: async (
      params: Rpt_StatisticGrpDealer01Param
    ): Promise<ApiResponse<Rpt_StatisticGrpDealer01ParamData>> => {
      return await apiBase.post<
        Rpt_StatisticGrpDealer01Param,
        ApiResponse<Rpt_StatisticGrpDealer01ParamData>
      >("/RptStatisticGrpDealer01/SearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticGrpDealer01_ExportSearchHQ: async (
      params: Rpt_StatisticGrpDealer01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticGrpDealer01Param,
        ApiResponse<string>
      >("/RptStatisticGrpDealer01/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticGrpDealer01_ExportDetailSearchHQ: async (
      params: Rpt_StatisticGrpDealer01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticGrpDealer01Param,
        ApiResponse<string>
      >("/RptStatisticGrpDealer01/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
