import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_PivotTransPlanParam {
  FlagDataWH: 1 | 0;
  ExpectedDateFrom: string;
  SDMDlvStartDateFrom: string;
  SDMDlvStartDateTo: string;
  ExpectedDateTo: string;
  
}

export interface Rpt_PivotTransPlanRecord {
  Lst_Rpt_PivotTransPlan: {
    VIN: string;
    MODELCODE: string;
    NGAYCHUNGCHUNG: string;
    MCMMODELNAME: string;
    MDDEALERNAME: string;
    MDDEALERCODE: string;
    STORAGECODE: string;
    TRANSPORTERCODE: string;
    TRANSPORTERNAME: string;
    TENTINHGIAO: string;
    TENTINHNHAN: string;
    TENHUYENGIAO: string;
    TENHUYENNHAN: string;
    TINHGIAO_HUYENGIAO: string;
    TINHNHAN_HUYENNHAN: string;
    FLAG_CHUNGCHUNG: string;
    TOTAL: string;
    NGAYVT: string;
  };
}

export const useRpt_PivotTransPlan = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_PivotTransPlan_SearchHQ: async (
      params: Rpt_PivotTransPlanParam
    ): Promise<ApiResponse<Rpt_PivotTransPlanRecord>> => {
      return await apiBase.post<
        Rpt_PivotTransPlanParam,
        ApiResponse<Rpt_PivotTransPlanRecord>
      >("/RptPivotTransPlan/SearchHQ", {
        ...params,
      });
    },
    Rpt_PivotTransPlan_ExportSearchDL: async (
      params: Rpt_PivotTransPlanParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_PivotTransPlanParam, ApiResponse<string>>(
        "/RptPivotTransPlan/ExportSearchDL",
        {
          ...params,
        }
      );
    },
    Rpt_PivotTransPlan_ExportDetailSearchHQ: async (
      params: Rpt_PivotTransPlanParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_PivotTransPlanParam, ApiResponse<string>>(
        "/RptPivotTransPlan/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
