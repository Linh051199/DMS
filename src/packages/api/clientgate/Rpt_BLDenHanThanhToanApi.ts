import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_BLDenHanThanhToanParam {
  TDate_From: string;
  TDate_To: string;
  ReportType: string;
  FlagDataWH: string | boolean;
}

export interface Rpt_BLDenHanThanhToanRecord {
  BankCode: string;
  BankName: string;
  NgayCham_0: number;
  NgayCham_1_2: number;
  NgayCham_3_6: number;
  NgayCham_6: number;
  CountCarId: number;
  GuaranteeValueNoPayment: number;
}

interface Rpt_BLDenHanThanhToanParamData {
  Lst_Rpt_BLDenHanThanhToan: Rpt_BLDenHanThanhToanRecord[];
}
export const useRpt_BLDenHanThanhToan = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_BLDenHanThanhToan_SearchHQ: async (
      params: Rpt_BLDenHanThanhToanParam
    ): Promise<ApiResponse<Rpt_BLDenHanThanhToanParamData>> => {
      return await apiBase.post<
        Rpt_BLDenHanThanhToanParam,
        ApiResponse<Rpt_BLDenHanThanhToanParamData>
      >("/RptBLDenHanThanhToan/SearchHQ", {
        ...params,
      });
    },
    Rpt_BLDenHanThanhToan_ExportSearchHQ: async (
      params: Rpt_BLDenHanThanhToanParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_BLDenHanThanhToanParam,
        ApiResponse<string>
      >("/RptBLDenHanThanhToan/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_BLDenHanThanhToan_ExportDetailSearchHQ: async (
      params: Rpt_BLDenHanThanhToanParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_BLDenHanThanhToanParam,
        ApiResponse<string>
      >("/RptBLDenHanThanhToan/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
