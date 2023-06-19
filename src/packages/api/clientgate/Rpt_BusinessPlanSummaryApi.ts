import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface RptBusinessPlanSummaryParam {
  DealerCodeInput: string;
  BusinessPlanStatus: string;
  TimesPlan: string;
  YearPlan: any;
  Version: string;
  FlagDataWH: any;
}

export interface RptBusinessPlanSummaryRecord {
  PlanType: string;
  mcm_ModelCode: string;
  mcm_ModelName: string;
  AreaCodeDealer: string;
  AreaNameDealer: string;
  HTCStaffInCharge: string;
  BusinessPlanStatus: string;
  md_DealerCode: string;
  md_DealerName: string;
  ModelCode: string;
  MonthPlan: string;
  QtyMonth: number;
}

interface RptBusinessPlanSummaryData {
  Lst_Rpt_BusinessPlan_Summary: RptBusinessPlanSummaryRecord[];
}
export const useRpt_BusinessPlanSummaryApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptBusinessPlanSummary_SearchDL: async (
      params: RptBusinessPlanSummaryParam
    ): Promise<ApiResponse<RptBusinessPlanSummaryData>> => {
      return await apiBase.post<
        RptBusinessPlanSummaryParam,
        ApiResponse<RptBusinessPlanSummaryData>
      >("/RptBusinessPlanSummary/SearchDL", {
        ...params,
      });
    },
    RptBusinessPlanSummary_SearchHQ: async (
      params: RptBusinessPlanSummaryParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptBusinessPlanSummaryParam,
        ApiResponse<string>
      >("/RptBusinessPlanSummary/SearchHQ", {
        ...params,
      });
    },
  };
};
