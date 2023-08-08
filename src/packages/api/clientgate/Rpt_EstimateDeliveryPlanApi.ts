import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_EstimateDeliveryPlanParam {
  DateFrom: any;
  DateTo: any;
  FlagDataWH: 1 | 0;
}

export interface Rpt_EstimateDeliveryPlanRecord {
  DEALERCODE: string;
  SPECCODE: string;
  MODELCODE: string;
  COLOREXTCODE: string;
  DATE: string;
  APPROVEDDATE: string;
  APPROVEDMONTH: string;
  SOCODE: string;
  QTYCANMAPVIN: string;
  QTYCAN: string;
  QTYMAP: string;
  QTYNOTMAP: string;
  MODELNAME: string;
  DEALERNAME: string;
  SPECDESCRIPTION: string;
  COLOREXTNAMEVN: string;
  AREACODEDEALER: string;
  AREANAMEDEALER: string;
  HTCStaffInCharge: string;
}

interface Rpt_EstimateDeliveryPlanData {
  Rpt_Estimate_Delivery_Plan: Rpt_EstimateDeliveryPlanRecord[];
}
export const useRpt_EstimateDeliveryPlan = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    Rpt_EstimateDeliveryPlan_SearchHQ: async (
      params: Rpt_EstimateDeliveryPlanParam
    ): Promise<ApiResponse<Rpt_EstimateDeliveryPlanData>> => {
      return await apiBase.post<
        Rpt_EstimateDeliveryPlanParam,
        ApiResponse<Rpt_EstimateDeliveryPlanData>
      >("/RptEstimateDeliveryPlan/SearchHQ", {
        ...params,
      });
    },
    Rpt_EstimateDeliveryPlan_SearchDL: async (
      params: Rpt_EstimateDeliveryPlanParam
    ): Promise<ApiResponse<Rpt_EstimateDeliveryPlanData>> => {
      return await apiBase.post<
        Rpt_EstimateDeliveryPlanParam,
        ApiResponse<Rpt_EstimateDeliveryPlanData>
      >("/RptEstimateDeliveryPlan/SearchDL", {
        ...params,
      });
    },
    Rpt_EstimateDeliveryPlan_ExportSearchHQ: async (
      params: Rpt_EstimateDeliveryPlanParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_EstimateDeliveryPlanParam,
        ApiResponse<string>
      >("/RptEstimateDeliveryPlan/ExportSearchHQ", {
        ...params,
      });
    },
    Rpt_EstimateDeliveryPlan_ExportSearchDL: async (
      params: Rpt_EstimateDeliveryPlanParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_EstimateDeliveryPlanParam,
        ApiResponse<string>
      >("/RptEstimateDeliveryPlan/ExportSearchDL", {
        ...params,
      });
    },
  };
};
