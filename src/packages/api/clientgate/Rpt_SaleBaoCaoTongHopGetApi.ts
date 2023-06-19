import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface RptSaleBaoCaoTongHopGetParam {
  TDateReport: any;
  FlagDataWH: 1 | 0;
}

export interface RptSaleBaoCaoTongHopGetRecord {
  Index:number,
  ChiTieu: string,
  VN065_1: string,
  VN066: string,
  VN061: string,
  VN098: string,
  VN041: string,
  VN040: string,
  VN071: string,
  VN042: string,
  VN030: string,
  VN059: string,
  VN054: string,
  VN068: string,
  VN009: string,
  VN029: string,
  VN089: string,
  VN049: string,
  VN012: string,
  VN063: string,
  VN055_1: string,
  VC004: string,
  VC060_1: string,
  VC074: string,
  VC096: string,
  VC006: string,
  VC020: string,
  VC076: string,
  VC021: string,
  VC077: string,
  VC062: string,
  VC048: string,
  VC037: string,
  VS039: string,
  VS058: string,
  VS057: string,
  VS036: string,
  VS032: string,
  VS046: string,
  VS034: string,
  VS070: string,
  VS065: string,
  VS092: string,
  VS067: string,
  VS086: string,
  VS073: string,
}

interface RptSaleBaoCaoTongHopGetData {
  Lst_Rpt_Sale_BaoCaoTongHopGet: RptSaleBaoCaoTongHopGetRecord[];
}
export const useRptSaleBaoCaoTongHopGet = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptSaleBaoCaoTongHopGet_SearchHQ: async (
      params: RptSaleBaoCaoTongHopGetParam
    ): Promise<ApiResponse<RptSaleBaoCaoTongHopGetData>> => {
      return await apiBase.post<
        RptSaleBaoCaoTongHopGetParam,
        ApiResponse<RptSaleBaoCaoTongHopGetData>
      >("/RptSaleBaoCaoTongHopGet/SearchHQ", {
        ...params,
      });
    },
    RptSaleBaoCaoTongHopGet_ExportSearchHQ: async (
      params: RptSaleBaoCaoTongHopGetParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptSaleBaoCaoTongHopGetParam,
        ApiResponse<string>
      >("/RptSaleBaoCaoTongHopGet/ExportSearchHQ", {
        ...params,
      });
    },
    // RptSaleBaoCaoTongHopGet_ExportDetailSearchHQ: async (
    //   params: RptSaleBaoCaoTongHopGetParam
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<
    //     RptSaleBaoCaoTongHopGetParam,
    //     ApiResponse<string>
    //   >("/RptSaleBaoCaoTongHopGet/ExportDetailSearchHQ", {
    //     ...params,
    //   });
    // },
  };
};
