import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_DuBaoDatHang5THTMVParam {
  rptCode: string
  flagIsMonth: string
  createDateFrom: string
  createDateTo: string
}

export interface Rpt_DuBaoDatHang5THTMVRecord {
  RptDBDH5TCode: string   // Mã lần tổng hợp
  FlagIsMonth: number   // loại báo cáo
  MonthOrWeek: string   // tháng/tuần
  CreatedDate: string   // thời gian tạo
  Index: number   // STT
  Status: string   // 
  Check: string
}

interface Rpt_DuBaoDatHang5THTMVData {
  Lst_Rpt_DuBaoDatHang5THTMV: Rpt_DuBaoDatHang5THTMVRecord[];
}
export const useRpt_DuBaoDatHang5THTMV = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_DuBaoDatHang5THTMV_SearchHQ: async (
      params: Rpt_DuBaoDatHang5THTMVParam
    ): Promise<ApiResponse<Rpt_DuBaoDatHang5THTMVData>> => {
      return await apiBase.post<
        Rpt_DuBaoDatHang5THTMVParam,
        ApiResponse<Rpt_DuBaoDatHang5THTMVData>
      >("/RptDuBaoDatHang5THTMV/SearchHQ", {
        ...params,
      });
    },
    Rpt_DuBaoDatHang5THTMV_ExportSearchHQ: async (
      params: Rpt_DuBaoDatHang5THTMVParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_DuBaoDatHang5THTMVParam,
        ApiResponse<string>
      >("/RptDuBaoDatHang5THTMV/ExportSearchHQ", {
        ...params,
      });
    },
  };
};
