import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_SalesPeriod01Param {
  ReportType?: "Model" | "Dealer" | "";
  Type: string;
  Year?: any;
  Quarter?: string;
  Month?: string;
  Dealer?: string;

}

export interface Rpt_SalesPeriod01Record {
  MDDEALERCODE: string;
  MDDEALERNAME: string;
  SPECDESCRIPTION: string;
  CCSPECCODE: string;
  CCMODELCODE: string;
  Z_CAR_DEALERINSTOCK_FROM: number;
  Z_CAR_BO_FROM: number;
  Z_CAR_CANCEL: number;
  Z_CAR_RECEIVED: number;
  Z_CAR_SOLD: number;
  Z_CAR_DEALERINSTOCK_TO: number;
  Z_CAR_BO_TO: number;
  Z_CAR_ORDER_REQUEST: number;
  Z_CAR_ORDER_APPROVE: number;
}


interface Rpt_SalesPeriod01ParamData {
  Lst_RptSales_Period_01_ByDealer?: Rpt_SalesPeriod01Record[];
  Lst_RptSales_Period_01_ByModel?: Rpt_SalesPeriod01Record[];
}
export const useRpt_SalesPeriod01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_SalesPeriod01_SearchHQ: async (
      params: Rpt_SalesPeriod01Param
    ): Promise<ApiResponse<Rpt_SalesPeriod01ParamData>> => {
      return await apiBase.post<
        Rpt_SalesPeriod01Param,
        ApiResponse<Rpt_SalesPeriod01ParamData>
      >("/RptSalesPeriod01/SearchHQ", {
        ...params,
      });
    },
    Rpt_SalesPeriod01_ExportSearchHQ: async (
      params: Rpt_SalesPeriod01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_SalesPeriod01Param, ApiResponse<string>>(
        "/RptSalesPeriod01/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_SalesPeriod01_ExportDetailSearchHQ: async (
      params: Rpt_SalesPeriod01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_SalesPeriod01Param, ApiResponse<string>>(
        "/RptSalesPeriod01/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
