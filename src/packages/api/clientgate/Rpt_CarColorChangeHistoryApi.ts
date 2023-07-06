import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_CarColorChangeHistoryParam {
  CarID: string;
  SOCode: string;
  ChangeDateFrom: Date | string;
  ChangeDateTo: Date | string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_CarColorChangeHistoryRecord {
  CARID:string ;
  SOCODE:string ;
  MODELCODE:string ;
  SPECCODE:string ;
  CHANGEDATE:string ;
  DEALERCODE:string ;
  OLDCOLORCODE:string ;
  CHANGEBY:string ;
  NEWCOLORCODE:string ;
  LOGLUDATETIME:string;
  LOGLUBY:string ;
  NEWCOLORNAME:string ;
  OLDCOLORNAME:string ;
  MODELNAME:string ;
  STDOPTDESCRIPTION:string ;
  GRADECODE:string ;
  GRADEDESCRIPTION:string ;
  STDOPTCODE:string ;
  OCNCODE:string ;
  OCNDESCRIPTION:string ;
  SPECDESCRIPTION:string ;
}

interface Rpt_CarColorChangeHistoryParamData {
  Lst_Rpt_CarColorChangeHistory: Rpt_CarColorChangeHistoryRecord[];
}
export const useRpt_CarColorChangeHistory = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_CarColorChangeHistory_SearchHQ: async (
      params: Rpt_CarColorChangeHistoryParam
    ): Promise<ApiResponse<Rpt_CarColorChangeHistoryParamData>> => {
      return await apiBase.post<
        Rpt_CarColorChangeHistoryParam,
        ApiResponse<Rpt_CarColorChangeHistoryParamData>
      >("/RptCarColorChangeHistory/SearchHQ", {
        ...params,
      });
    },
    Rpt_CarColorChangeHistory_ExportSearchHQ: async (
      params: Rpt_CarColorChangeHistoryParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_CarColorChangeHistoryParam, ApiResponse<string>>(
        "/RptCarColorChangeHistory/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    // Rpt_CarColorChangeHistory_ExportDetailSearchHQ: async (
    //   params: Rpt_CarColorChangeHistoryParam
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<Rpt_CarColorChangeHistoryParam, ApiResponse<string>>(
    //     "/RptCarColorChangeHistory/ExportDetailSearchHQ",
    //     {
    //       ...params,
    //     }
    //   );
    // },
  };
};
