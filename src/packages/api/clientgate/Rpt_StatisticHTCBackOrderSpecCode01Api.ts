import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_StatisticHTCBackOrderSpecCode01Param {
  FlagDataWH: 1 | 0;
}

export interface Rpt_StatisticHTCBackOrderSpecCode01Record {
  MCSSPECCODE: string;
  MCSSPECDESCRIPTION: string;
  DUTYCOMPLETEDPERCENT_000: number;
  DUTYCOMPLETEDPERCENT_099: number;
  DUTYCOMPLETEDPERCENT_100: number;
  DUTYCOMPLETEDPERCENT_099X: number;
  DUTYCOMPLETEDPERCENT_100X: number;
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

interface Rpt_StatisticHTCBackOrderSpecCode01ParamData {
  Lst_RptStatistic_HTCBackOrder_SpecCode_01: Rpt_StatisticHTCBackOrderSpecCode01Record[];
}
export const useRpt_StatisticHTCBackOrderSpecCode01 = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_StatisticHTCBackOrderSpecCode01_SearchHQ: async (
      params: Rpt_StatisticHTCBackOrderSpecCode01Param
    ): Promise<ApiResponse<Rpt_StatisticHTCBackOrderSpecCode01ParamData>> => {
      return await apiBase.post<
        Rpt_StatisticHTCBackOrderSpecCode01Param,
        ApiResponse<Rpt_StatisticHTCBackOrderSpecCode01ParamData>
      >("/RptStatisticHTCBackOrderSpecCode01/SearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticHTCBackOrderSpecCode01_ExportSearchHQ: async (
      params: Rpt_StatisticHTCBackOrderSpecCode01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticHTCBackOrderSpecCode01Param,
        ApiResponse<string>
      >("/RptStatisticHTCBackOrderSpecCode01/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticHTCBackOrderSpecCode01_ExportDetailSearchHQ: async (
      params: Rpt_StatisticHTCBackOrderSpecCode01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticHTCBackOrderSpecCode01Param,
        ApiResponse<string>
      >("/RptStatisticHTCBackOrderSpecCode01/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
