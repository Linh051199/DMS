import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_PivotRevenueBySpecParam {
  strnrptYear?:  string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_PivotRevenueBySpecRecord {
  DEALERCODE: string;
  DEALERNAME: string;
  COMPANYNAME: string;
  SOLUONG_01: number;
  TONGDOANHTHU_01: number;
  SOLUONG_02: number;
  TONGDOANHTHU_02: number;
  SOLUONG_03: number;
  TONGDOANHTHU_03: number;
  SOLUONG_04: number;
  TONGDOANHTHU_04: number;
  SOLUONG_05: number;
  TONGDOANHTHU_05: number;
  SOLUONG_06: number;
  TONGDOANHTHU_06: number;
  SOLUONG_07: number;
  TONGDOANHTHU_07: number;
  SOLUONG_08: number;
  TONGDOANHTHU_08: number;
  SOLUONG_09: number;
  TONGDOANHTHU_09: number;
  SOLUONG_10: number;
  TONGDOANHTHU_10: number;
  SOLUONG_11:number;
  TONGDOANHTHU_11: number;
  SOLUONG_12: number;
  TONGDOANHTHU_12: number;
  SOLUONG: number;
  TONGDOANHTHU: number;
  MODELCODE: string;
  ACTUALSPEC: string;
  SPECDESCRIPTION: string;
  ASSEMBLYSTATUS: string;
}

interface Rpt_PivotRevenueBySpecParamData {
  Lst_Rpt_Revenue_HTCInvoice: Rpt_PivotRevenueBySpecRecord[];
}
export const useRpt_PivotRevenueBySpec = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_PivotRevenueBySpec_SearchHQ: async (
      params: Rpt_PivotRevenueBySpecParam
    ): Promise<ApiResponse<Rpt_PivotRevenueBySpecParamData>> => {
      return await apiBase.post<
        Rpt_PivotRevenueBySpecParam,
        ApiResponse<Rpt_PivotRevenueBySpecParamData>
      >("/ReportPivotRevenueBySpec/SearchHQ", {
        ...params,
      });
    },
    Rpt_PivotRevenueBySpec_ExportSearchHQ: async (
      params: Rpt_PivotRevenueBySpecParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_PivotRevenueBySpecParam, ApiResponse<string>>(
        "/ReportPivotRevenueBySpec/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    // Rpt_PivotRevenueBySpec_ExportDetailSearchHQ: async (
    //   params: Rpt_PivotRevenueBySpecParam
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<Rpt_PivotRevenueBySpecParam, ApiResponse<string>>(
    //     "/ReportPivotRevenueBySpec/ExportDetailSearchHQ",
    //     {
    //       ...params,
    //     }
    //   );
    // },
  };
};
