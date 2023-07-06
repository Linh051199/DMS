import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_NhapXuatTonTrongKyParam {
  TDate_From: Date | string;
  TDate_To: Date | string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_NhapXuatTonTrongKyRecord {
  MortageBankCode: string;
  SoLuongDauKy:number;
  SoLuongTang: number;
  SoLuongGiam: number;
  SoLuongCuoiKy: number;
  GiaTriDauKy: number;
  GiaTriTang: number;
  GiaTriGiam: number;
  GiaTriCuoiKy:number;
}

interface Rpt_NhapXuatTonTrongKyParamData {
  Lst_Rpt_NhapXuatTonTrongKy: Rpt_NhapXuatTonTrongKyRecord[];
}
export const useRpt_NhapXuatTonTrongKy = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_NhapXuatTonTrongKy_SearchHQ: async (
      params: Rpt_NhapXuatTonTrongKyParam
    ): Promise<ApiResponse<Rpt_NhapXuatTonTrongKyParamData>> => {
      return await apiBase.post<
        Rpt_NhapXuatTonTrongKyParam,
        ApiResponse<Rpt_NhapXuatTonTrongKyParamData>
      >("/RptNhapXuatTonTrongKy/SearchHQ", {
        ...params,
      });
    },
    Rpt_NhapXuatTonTrongKy_ExportSearchHQ: async (
      params: Rpt_NhapXuatTonTrongKyParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_NhapXuatTonTrongKyParam,
        ApiResponse<string>
      >("/RptNhapXuatTonTrongKy/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_NhapXuatTonTrongKy_ExportDetailSearchHQ: async (
      params: Rpt_NhapXuatTonTrongKyParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_NhapXuatTonTrongKyParam,
        ApiResponse<string>
      >("/RptNhapXuatTonTrongKy/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
