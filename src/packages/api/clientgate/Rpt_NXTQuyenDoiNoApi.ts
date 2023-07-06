import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_NXTQuyenDoiNoParam {
  TDate_From: Date | string;
  TDate_To: Date | string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_NXTQuyenDoiNoRecord {
  BankCodeMonitor: string;
  GiaTriDauKy: number;
  GiaTriTangKy: number;
  GiaTriGiamKy: number;
  GiaTriCuoiKy: number;
  SLDauKy: number;
  SLTangKy: number;
  SLGiamKy: number;
  SLCuoiKy: number;
}

interface Rpt_NXTQuyenDoiNoParamData {
  Lst_Rpt_NXT_QuyenDoiNo: Rpt_NXTQuyenDoiNoRecord[];
}
export const useRpt_NXTQuyenDoiNo = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_NXTQuyenDoiNo_SearchHQ: async (
      params: Rpt_NXTQuyenDoiNoParam
    ): Promise<ApiResponse<Rpt_NXTQuyenDoiNoParamData>> => {
      return await apiBase.post<
        Rpt_NXTQuyenDoiNoParam,
        ApiResponse<Rpt_NXTQuyenDoiNoParamData>
      >("/RptNXTQuyenDoiNo/SearchHQ", {
        ...params,
      });
    },
    Rpt_NXTQuyenDoiNo_ExportSearchHQ: async (
      params: Rpt_NXTQuyenDoiNoParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_NXTQuyenDoiNoParam, ApiResponse<string>>(
        "/RptNXTQuyenDoiNo/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_NXTQuyenDoiNo_ExportDetailSearchHQ: async (
      params: Rpt_NXTQuyenDoiNoParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_NXTQuyenDoiNoParam, ApiResponse<string>>(
        "/RptNXTQuyenDoiNo/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
