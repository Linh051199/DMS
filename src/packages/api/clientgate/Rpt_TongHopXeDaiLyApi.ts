import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_TongHopXeDaiLyParam {
  DealerCodeInput: string;
  AreaCode: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_TongHopXeDaiLy {
  CCDEALERCODE: string;
  CCDEALERNAME: string;
  MODELCODE: string;
  MCM_MODELNAME: string;
  CV_ACTUALSPEC: string;
  MCS_SPECDESCRIPTION: string;
  COLORCODECOMBINE: string;
  COLORNAMECOMBINE: string;
  STATUSCHUNG: string;
  QTY: string;
}

interface RptStatisticHTCStockOut01Data {
  Lst_Rpt_SummaryCarAtDealer: Rpt_TongHopXeDaiLy[];
}
export const useRptTongHopXeDaiLy = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_TongHopXeDaiLy_SearchHQ: async (
      params: Rpt_TongHopXeDaiLyParam
    ): Promise<ApiResponse<RptStatisticHTCStockOut01Data>> => {
      return await apiBase.post<
        Rpt_TongHopXeDaiLyParam,
        ApiResponse<RptStatisticHTCStockOut01Data>
      >("/RptTongHopXeDaiLy/SearchHQ", {
        ...params,
      });
    },
    Rpt_TongHopXeDaiLy_ExportSearchHQ: async (
      params: Rpt_TongHopXeDaiLyParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_TongHopXeDaiLyParam, ApiResponse<string>>(
        "/RptTongHopXeDaiLy/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
