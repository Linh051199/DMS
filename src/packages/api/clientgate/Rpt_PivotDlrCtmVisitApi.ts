import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface useRpt_PivotDlrCtmVisitParam {
  VisitDateFrom: string;
  VisitDateTo: string;
  FlagDataWH: 1 | 0;
}

export interface useRpt_PivotDlrCtmVisitRecord {
  Lst_RptPivot_DlrCtmVisit: {
    CTMVISITCODE: string;
    DEALERCODE: string;
    MODELCODE: string;
    GENDER: string;
    RANGEAGECODE: string;
    FLAGACTIVE: string;
    CREATEDDATE: string;
    CREATEDBY: string;
    VISITDTIME: string;
    LOGLUDATETIME: string;
    LOGLUBY: string;
    DEALERNAME: string;
    MODELNAME: string;
    RANGEAGENAME: string;
    TOTAL: number;
    GENDERNAME: string;
  };
}

export const useRpt_PivotDlrCtmVisit = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_PivotDlrCtmVisit_SearchHQ: async (
      params: useRpt_PivotDlrCtmVisitParam
    ): Promise<ApiResponse<useRpt_PivotDlrCtmVisitRecord>> => {
      return await apiBase.post<
        useRpt_PivotDlrCtmVisitParam,
        ApiResponse<useRpt_PivotDlrCtmVisitRecord>
      >("/RptPivotDlrCtmVisit/SearchHQ", {
        ...params,
      });
    },
    Rpt_PivotDlrCtmVisit_SearchDL: async (
      params: useRpt_PivotDlrCtmVisitParam
    ): Promise<ApiResponse<useRpt_PivotDlrCtmVisitRecord>> => {
      return await apiBase.post<
        useRpt_PivotDlrCtmVisitParam,
        ApiResponse<useRpt_PivotDlrCtmVisitRecord>
      >("/RptPivotDlrCtmVisit/SearchDL", {
        ...params,
      });
    },
    Rpt_PivotDlrCtmVisit_ExportSearchDL: async (
      params: useRpt_PivotDlrCtmVisitParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        useRpt_PivotDlrCtmVisitParam,
        ApiResponse<string>
      >("/RptPivotDlrCtmVisit/ExportDetailSearchDL", {
        ...params,
      });
    },
    Rpt_PivotDlrCtmVisit_ExportDetailSearchHQ: async (
      params: useRpt_PivotDlrCtmVisitParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        useRpt_PivotDlrCtmVisitParam,
        ApiResponse<string>
      >("/RptPivotDlrCtmVisit/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
