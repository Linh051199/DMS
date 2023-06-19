import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_TonHoSoNganHangParam {
  TDate_To: string;
  FlagDataWH: 1 | 0;
  MortageBankCode: string;
}

export interface Rpt_TonHoSoNganHangRecord {
  MortageBankCode: string;
  BankName: string;
  SLTuoiHoSo_0_90: number;
  SLTuoiHoSo_91_180: number;
  SLTuoiHoSo_181_270: number;
  SLTuoiHoSo_271_360: number;
  SLTuoiHoSo_360: number;
  SLTuoiHoSo: number;
  GTTuoiHoSo_0_90: number;
  GTTuoiHoSo_91_180: number;
  GTTuoiHoSo_181_270: number;
  GTTuoiHoSo_271_360: number;
  GTTuoiHoSo_360: number;
  GTTuoiHoSo: number;
}

interface Rpt_TonHoSoNganHangParamData {
  Lst_Rpt_TonHoSoNganHang: Rpt_TonHoSoNganHangRecord[];
}
export const useRpt_TonHoSoNganHang = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_TonHoSoNganHang_SearchHQ: async (
      params: Rpt_TonHoSoNganHangParam
    ): Promise<ApiResponse<Rpt_TonHoSoNganHangParamData>> => {
      return await apiBase.post<
        Rpt_TonHoSoNganHangParam,
        ApiResponse<Rpt_TonHoSoNganHangParamData>
      >("/RptTonHoSoNganHang/SearchHQ", {
        ...params,
      });
    },
    Rpt_TonHoSoNganHang_ExportSearchHQ: async (
      params: Rpt_TonHoSoNganHangParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_TonHoSoNganHangParam, ApiResponse<string>>(
        "/RptTonHoSoNganHang/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_TonHoSoNganHang_ExportDetailSearchHQ: async (
      params: Rpt_TonHoSoNganHangParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_TonHoSoNganHangParam, ApiResponse<string>>(
        "/RptTonHoSoNganHang/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
