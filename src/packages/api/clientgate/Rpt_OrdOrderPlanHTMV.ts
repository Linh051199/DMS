import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_OrdOrderPlanHTMVParam {
  Code: string;
  ReportType: string;
  CreatedDateFrom: any;
  CreatedDateTo: any;
}

export interface Rpt_OrdOrderPlanHTMVRecord {
  Index: string;
  ORDERPLANNO: string;
  PeriodDate: string;
  FlagIsMonth: string;
  CreatedDate: string;
  CreatedBy: string;
  UpdateDTime: string;
  UpdateBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

interface Rpt_OrdOrderPlanHTMVData {
  Lst_Ord_OrderPlan_HTMV: Rpt_OrdOrderPlanHTMVRecord[];
}
export const useRpt_OrdOrderPlanHTMV = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    Rpt_OrdOrderPlanHTMV_SearchHQ: async (
      params: Rpt_OrdOrderPlanHTMVParam
    ): Promise<ApiResponse<Rpt_OrdOrderPlanHTMVData>> => {
      return await apiBase.post<
        Rpt_OrdOrderPlanHTMVParam,
        ApiResponse<Rpt_OrdOrderPlanHTMVData>
      >("/OrdOrderPlanHTMV/SearchHQ", {
        ...params,
      });
    },
    Rpt_OrdOrderPlanHTMV_GetHQByCode: async (
      params: Rpt_OrdOrderPlanHTMVParam
    ): Promise<ApiResponse<Rpt_OrdOrderPlanHTMVData>> => {
      return await apiBase.post<
        Rpt_OrdOrderPlanHTMVParam,
        ApiResponse<Rpt_OrdOrderPlanHTMVData>
      >("/OrdOrderPlanHTMV/GetHQByCode", {
        ...params,
      });
    },
    Rpt_OrdOrderPlanHTMV_ExprortDetailHQ: async (
      params: Rpt_OrdOrderPlanHTMVParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_OrdOrderPlanHTMVParam, ApiResponse<string>>(
        "/OrdOrderPlanHTMV/ExprortDetailHQ",
        {
          ...params,
        }
      );
    },
  };
};
