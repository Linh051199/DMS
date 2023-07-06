import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_SalesDelivery01Param {
  TypeRpt?: "Model" | "Dealer" | "";
  Area: string;
  Dealer?: string;
  FlagDataWH?: 1 | 0;
}

export interface Rpt_SalesDelivery01Record {
  CCSPECCODE: string;
  CCMODELCODE: string;
  Z_CAR_DLV_INMONTH: number;
  Z_CAR_DLV_INYEAR: number;
  Z_CAR_DEALERINSTOCK: number;
  Z_CAR_BO_MAPVIN: number;
  Z_CAR_BO_FREEN2: number;
  Z_CAR_BO_FREEN1: number;
  Z_CAR_BO_FREEN: number;
  Z_CAR_BO: number;
  Z_CAR_DLSINSTOCKANDBO: number;
  SPECDESCRIPTION: string;
  FIELD_DP_DELIVERED_AND_MAPPED: number;
  FIELD_DP_YTD_AND_BO: number;
}

interface Rpt_SalesDelivery01ParamData {
  Lst_RptSalesDelivery01: Rpt_SalesDelivery01Record[];
}
export const useRpt_SalesDelivery01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_SalesDelivery01_SearchHQ: async (
      params: Rpt_SalesDelivery01Param
    ): Promise<ApiResponse<Rpt_SalesDelivery01ParamData>> => {
      return await apiBase.post<
        Rpt_SalesDelivery01Param,
        ApiResponse<Rpt_SalesDelivery01ParamData>
      >("/RptSalesDelivery01/SearchHQ", {
        ...params,
      });
    },
    Rpt_SalesDelivery01_ExportSearchHQ: async (
      params: Rpt_SalesDelivery01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_SalesDelivery01Param, ApiResponse<string>>(
        "/RptSalesDelivery01/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_SalesDelivery01_ExportDetailSearchHQ: async (
      params: Rpt_SalesDelivery01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_SalesDelivery01Param, ApiResponse<string>>(
        "/RptSalesDelivery01/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
