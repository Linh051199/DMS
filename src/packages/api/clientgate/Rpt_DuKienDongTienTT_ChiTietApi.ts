import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_DuKienDongTienTT_ChiTietParam {
  TDate_From: string;
  TDate_To: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_DuKienDongTienTT_ChiTietRecord {
  BANKCODE: string;
  BANKCODEMONITOR: string;
  BANKNAME_BL: string;
  BANKNAME_GS: string;
  COUNTCARID: string;
  GUARANTEEVALUE: string;
  GUARANTEEVALUENOPAYMENT: string;
}

interface Rpt_DuKienDongTienTT_ChiTietData {
  Lst_Rpt_DuKienDongTienTT: Rpt_DuKienDongTienTT_ChiTietRecord[];
}
export const useRpt_DuKienDongTienTT_ChiTiet = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_DuKienDongTienTT_ChiTiet_SearchHQ: async (
      params: Rpt_DuKienDongTienTT_ChiTietParam
    ): Promise<ApiResponse<Rpt_DuKienDongTienTT_ChiTietData>> => {
      return await apiBase.post<
        Rpt_DuKienDongTienTT_ChiTietParam,
        ApiResponse<Rpt_DuKienDongTienTT_ChiTietData>
      >("/RptDuKienDongTienTT/SearchHQ", {
        ...params,
      });
    },
    Rpt_DuKienDongTienTT_ChiTiet_ExportSearchHQ: async (
      params: Rpt_DuKienDongTienTT_ChiTietParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_DuKienDongTienTT_ChiTietParam,
        ApiResponse<string>
      >("/RptDuKienDongTienTT/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_DuKienDongTienTT_ChiTiet_ExportDetailSearchHQ: async (
      params: Rpt_DuKienDongTienTT_ChiTietParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_DuKienDongTienTT_ChiTietParam,
        ApiResponse<string>
      >("/RptDuKienDongTienTT/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
