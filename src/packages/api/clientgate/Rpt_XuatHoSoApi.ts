import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_XuatHoSoParam {
  TDate_From: Date | string;
  TDate_To: Date | string | "";
  FlagDataWH: 1 | 0;
}

export interface Rpt_XuatHoSoRecord {
  TypeReport: string;
  TextReport: string;
  SoLuong: number;
  GiaTri: number;
}

interface Rpt_XuatHoSoParamData {
  Lst_Rpt_XuatHoSo: Rpt_XuatHoSoRecord[];
}
export const useRpt_XuatHoSo = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_XuatHoSo_SearchHQ: async (
      params: Rpt_XuatHoSoParam
    ): Promise<ApiResponse<Rpt_XuatHoSoParamData>> => {
      return await apiBase.post<
        Rpt_XuatHoSoParam,
        ApiResponse<Rpt_XuatHoSoParamData>
      >("/RptXuatHoSo/SearchHQ", {
        ...params,
        TDate_To: params.TDate_To ?? ""
      });
    },
    Rpt_XuatHoSo_ExportSearchHQ: async (
      params: Rpt_XuatHoSoParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_XuatHoSoParam, ApiResponse<string>>(
        "/RptXuatHoSo/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_XuatHoSo_ExportDetailSearchHQ: async (
      params: Rpt_XuatHoSoParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_XuatHoSoParam, ApiResponse<string>>(
        "/RptXuatHoSo/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
