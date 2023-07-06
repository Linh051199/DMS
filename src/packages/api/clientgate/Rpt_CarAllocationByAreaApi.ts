import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_CarAllocationByAreaParam {
  ReportMonth: Date | string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_CarAllocationByAreaRecord {
  MODELCODE: string;
  MODELNAME: string;
  SPECCODE: string;
  SPECDESCRIPTION: string;
  SLMAPVINAREAMB: number;
  SLMAPVINAREAMT: number;
  SLMAPVINAREAMN: number;
  SLXEPHANBOMB: number;
  SLXEPHANBOMT: number;
  SLXEPHANBOMN: number;
  SLXECONTHIEUMB: number;
  SLXECONTHIEUMT: number;
  SLXECONTHIEUMN: number;
  SLMAPVIN: number;
  SLTONKHOHT: number;
  SLTONG: number;
}

interface Rpt_CarAllocationByAreaParamData {
  Lst_Rpt_CarAllocationByArea: Rpt_CarAllocationByAreaRecord[];
}
export const useRpt_CarAllocationByArea = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_CarAllocationByArea_SearchHQ: async (
      params: Rpt_CarAllocationByAreaParam
    ): Promise<ApiResponse<Rpt_CarAllocationByAreaParamData>> => {
      return await apiBase.post<
        Rpt_CarAllocationByAreaParam,
        ApiResponse<Rpt_CarAllocationByAreaParamData>
      >("/RptCarAllocationByArea/SearchHQ", {
        ...params,
      });
    },
    Rpt_CarAllocationByArea_ExportSearchHQ: async (
      params: Rpt_CarAllocationByAreaParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_CarAllocationByAreaParam,
        ApiResponse<string>
      >("/RptCarAllocationByArea/ExportSearchHQ", {
        ...params,
      });
    },
    // Rpt_CarAllocationByArea_ExportDetailSearchHQ: async (
    //   params: Rpt_CarAllocationByAreaParam
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<
    //     Rpt_CarAllocationByAreaParam,
    //     ApiResponse<string>
    //   >("/RptCarAllocationByArea/ExportDetailSearchHQ", {
    //     ...params,
    //   });
    // },
  };
};
