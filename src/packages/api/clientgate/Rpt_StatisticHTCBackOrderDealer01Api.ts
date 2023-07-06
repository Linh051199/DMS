import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_StatisticHTCBackOrderDealer01Param {
  FlagDataWH: 1 | 0;
}

export interface Rpt_StatisticHTCBackOrderDealer01Record {
  CCDEALERCODE: string;
  CCDEALERNAME: string;
  DUTYCOMPLETEDPERCENT_000: number;
  DUTYCOMPLETEDPERCENT_099: number;
  DUTYCOMPLETEDPERCENT_100: number;
  DUTYCOMPLETEDPERCENT_099X:number;
  DUTYCOMPLETEDPERCENT_100X:number;
  DUTYCOMPLETEDPERCENT_100_00_15: number;
  DUTYCOMPLETEDPERCENT_100_16_30: number;
  DUTYCOMPLETEDPERCENT_100_31_45: number;
  DUTYCOMPLETEDPERCENT_100_46_60: number;
  DUTYCOMPLETEDPERCENT_100_61_ZZ: number;
  DUTYCOMPLETEDPERCENT_099_00_15: number;
  DUTYCOMPLETEDPERCENT_099_16_30: number;
  DUTYCOMPLETEDPERCENT_099_31_45: number;
  DUTYCOMPLETEDPERCENT_099_46_60: number;
  DUTYCOMPLETEDPERCENT_099_61_ZZ: number;
}

interface Rpt_StatisticHTCBackOrderDealer01ParamData {
  Lst_RptStatistic_HTCBackOrder_Dealer_01: Rpt_StatisticHTCBackOrderDealer01Record[];
}
export const useRpt_StatisticHTCBackOrderDealer01 = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_StatisticHTCBackOrderDealer01_SearchHQ: async (
      params: Rpt_StatisticHTCBackOrderDealer01Param
    ): Promise<ApiResponse<Rpt_StatisticHTCBackOrderDealer01ParamData>> => {
      return await apiBase.post<
        Rpt_StatisticHTCBackOrderDealer01Param,
        ApiResponse<Rpt_StatisticHTCBackOrderDealer01ParamData>
      >("/RptStatisticHTCBackOrderDealer01/SearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticHTCBackOrderDealer01_ExportSearchHQ: async (
      params: Rpt_StatisticHTCBackOrderDealer01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticHTCBackOrderDealer01Param,
        ApiResponse<string>
      >("/RptStatisticHTCBackOrderDealer01/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticHTCBackOrderDealer01_ExportDetailSearchHQ: async (
      params: Rpt_StatisticHTCBackOrderDealer01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticHTCBackOrderDealer01Param,
        ApiResponse<string>
      >("/RptStatisticHTCBackOrderDealer01/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
