import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_Statistic_DMS40CarDeliveryOrderParam {
  FlagDataWH?: number | "";
  Vin?: string | "";
  DealerCodeInput?: string;
}

export interface Rpt_Statistic_DMS40CarDeliveryOrderRecord {
  DEALERCODE: string;
  DEALERNAME: string;
  SOCODE: number;
  OSO_APPROVEDDATE2: number;
  TOTALAPPROVEDQUANTITY: number;
  TOTALUNITPRICEACTUAL: number;
  MAX_QTYDATEDELAYPMTCOC: number;
  MAX_QTYDATEDELAYOPENGRM: number;
  MAX_QTYDATEDELAYPMTGRM: number;
  MAX_QTYDATEDELAY60PMT: number;
  MAX_QTYDELAY40PMTREMAIN: number;
  TOTALDATEPENALTY: number;
  MDC_PENALTYPERCENT: number;
  AMOUNTPENALTYTTC: number;
  PENALIZEACTUAL: number;
}


interface Rpt_Statistic_DMS40CarDeliveryOrderData {
  Lst_Rpt_Statistic_DMS40CarDeliveryOrder?: Rpt_Statistic_DMS40CarDeliveryOrderRecord[];

}
export const useRpt_Statistic_DMS40CarDeliveryOrder = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_Statistic_DMS40CarDeliveryOrder_SearchHQ: async (
      params: Rpt_Statistic_DMS40CarDeliveryOrderParam
    ): Promise<ApiResponse<Rpt_Statistic_DMS40CarDeliveryOrderData>> => {
      return await apiBase.post<
        Rpt_Statistic_DMS40CarDeliveryOrderParam,
        ApiResponse<Rpt_Statistic_DMS40CarDeliveryOrderData>
      >("/RptStatisticDMS40CarDeliveryOrder/SearchHQ", {
        ...params,
      });
    },
    Rpt_Statistic_DMS40CarDeliveryOrder_ExportSearchHQ: async (
      params: Rpt_Statistic_DMS40CarDeliveryOrderParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_Statistic_DMS40CarDeliveryOrderParam, ApiResponse<string>>(
        "/RptStatisticDMS40CarDeliveryOrder/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_Statistic_DMS40CarDeliveryOrder_ExportDetailSearchHQ: async (
      params: Rpt_Statistic_DMS40CarDeliveryOrderParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_Statistic_DMS40CarDeliveryOrderParam, ApiResponse<string>>(
        "/RptStatisticDMS40CarDeliveryOrder/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
