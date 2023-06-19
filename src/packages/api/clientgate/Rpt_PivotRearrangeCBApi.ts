import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_PivotRearrangeCBParam {
  TDate: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_PivotRearrangeCB {
  Range_Date: string;
  TOTAL: string;
  ttVIN: string;
  StoRearCBNo: string;
  StorageCodeTo: string;
  ModelName: string;
  SpecDescription: string;
  ColorIntNameVN: string;
  ColorExtNameVN: string;
  ApprovedDate: string;
  SCDLoaiThung: string;
}

interface RptPivotRearrangeCBParamData {
  Lst_RptPivot_RearrangeCB: Rpt_PivotRearrangeCB[];
}
export const useRpt_PivotRearrangeCBParam = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_PivotRearrangeCB_SearchHQ: async (
      params: Rpt_PivotRearrangeCBParam
    ): Promise<ApiResponse<RptPivotRearrangeCBParamData>> => {
      return await apiBase.post<
        Rpt_PivotRearrangeCBParam,
        ApiResponse<RptPivotRearrangeCBParamData>
      >("/RptPivotRearrangeCB/SearchHQ", {
        ...params,
      });
    },
    Rpt_PivotRearrangeCB_ExportDetailSearchHQ: async (
      params: Rpt_PivotRearrangeCBParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_PivotRearrangeCBParam, ApiResponse<string>>(
        "/RptPivotRearrangeCB/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
