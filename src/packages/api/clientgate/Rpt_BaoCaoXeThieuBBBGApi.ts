import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_BaoCaoXeThieuBBBGParam {
  ReportTo: Date | string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_BaoCaoXeThieuBBBGRecord {
  DEALERCODE: string;
  DEALERNAME: string;
  TONGSOVIN: number;
  SOVINCHAMTRONGDINHMUC: number;
  TONGSONGAYCHAMTHEODAILY: number;
  DAYS_RANGEBBBG_1_2: number;
  DAYS_RANGEBBBG_3_6: number;
  DAYS_RANGEBBBG_7_10: number;
  DAYS_RANGEBBBG_11_15: number;
  DAYS_RANGEBBBG_15: number;
  TONGCHAMBBBG: number;
  AREACODEDEALER: string;
  AREANAMEDEALER: string;
  HTCSTAFFINCHARGE: string;
}

interface Rpt_BaoCaoXeThieuBBBGParamData {
  Lst_Rpt_BaoCaoXeThieuBBBG: Rpt_BaoCaoXeThieuBBBGRecord[];
}
export const useRpt_BaoCaoXeThieuBBBG = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_BaoCaoXeThieuBBBG_SearchHQ: async (
      params: Rpt_BaoCaoXeThieuBBBGParam
    ): Promise<ApiResponse<Rpt_BaoCaoXeThieuBBBGParamData>> => {
      return await apiBase.post<
        Rpt_BaoCaoXeThieuBBBGParam,
        ApiResponse<Rpt_BaoCaoXeThieuBBBGParamData>
      >("/RptBaoCaoXeThieuBBBG/SearchHQ", {
        ...params,
      });
    },
    Rpt_BaoCaoXeThieuBBBG_ExportSearchHQ: async (
      params: Rpt_BaoCaoXeThieuBBBGParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_BaoCaoXeThieuBBBGParam,
        ApiResponse<string>
      >("/RptBaoCaoXeThieuBBBG/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_BaoCaoXeThieuBBBG_ExportDetailSearchHQ: async (
      params: Rpt_BaoCaoXeThieuBBBGParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_BaoCaoXeThieuBBBGParam,
        ApiResponse<string>
      >("/RptBaoCaoXeThieuBBBG/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
