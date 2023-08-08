import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface RptDelayguaranteePaymentRealTimeParam {
  DealerCodeInput: string;
  FlagDataWH: 1 | 0;

}

export interface RptDelayguaranteePaymentRealTimeRecord {
  PERIODMONTH: string;
  CARID: string;
  AREACODE: string;
  AREANAME: string;
  DEALERCODE: string;
  DEALERNAME: string;
  OSOSOCODE: string;
  OSODAPPROVEDMONTH: string;
  OSODAPPROVEDDATE: string;
  MODELCODE: string;
  MODELNAME: string;
  SPECCODE: string;
  SPECDESCRIPTION: string;
  CVCOLOREXTCODE: string;
  CVCOLOREXTNAMEVN: string;
  CVCOLORINTCODE: string;
  CVCOLORINTNAMEVN: string;
  VIN: string;
  PRODUCTIONMONTH: string;
  UNITPRICEACTUAL: string;
  PMGDGUARANTEEVALUE: string;
  PMPDAMOUNTTOTAL_DEPOSIT: string;
  HTCSTAFFINCHARGE: string;
  STATUS: string;
  STOREDATE: string;
  DUTYCOMPLETEDPERCENT_RANGE: string;
  TRANSDELIVERYRANGETYPE: string;
  DEPOSITDUTYENDDATE: string;
  GRT_PERCENT: string;
  PAYMENT_DEPOSIT_PERCENT: string;
  TOTAL: string;
}

interface RptDelayguaranteePaymentRealTimeData {
    Lst_RptDelayguaranteePayment_RealTime: RptDelayguaranteePaymentRealTimeRecord[];
}
export const useRptDelayguaranteePaymentRealTime = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptDelayguaranteePaymentRealTime_SearchHQ: async (
      params: RptDelayguaranteePaymentRealTimeParam
    ): Promise<ApiResponse<RptDelayguaranteePaymentRealTimeData>> => {
      console.log("🚀 ~ params:", params)
      return await apiBase.post<
        RptDelayguaranteePaymentRealTimeParam,
        ApiResponse<RptDelayguaranteePaymentRealTimeData>
      >("/RptDelayguaranteePaymentRealTime/SearchHQ", {
        ...params,
      });
    },
    RptDelayguaranteePaymentRealTime_SearchDL: async (
      params: RptDelayguaranteePaymentRealTimeParam
    ): Promise<ApiResponse<RptDelayguaranteePaymentRealTimeData>> => {
      return await apiBase.post<
        RptDelayguaranteePaymentRealTimeParam,
        ApiResponse<RptDelayguaranteePaymentRealTimeData>
      >("/RptDelayguaranteePaymentRealTime/SearchDL", {
        ...params,
      });
    },
    RptDelayguaranteePaymentRealTime_ExportDetailSearchHQ: async (
      params: RptDelayguaranteePaymentRealTimeParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptDelayguaranteePaymentRealTimeParam,
        ApiResponse<string>
      >("/RptDelayguaranteePaymentRealTime/ExportDetailSearchHQ", {
        ...params,
      });
    },
    RptDelayguaranteePaymentRealTime_ExportDetailSearchDL: async (
      params: RptDelayguaranteePaymentRealTimeParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptDelayguaranteePaymentRealTimeParam,
        ApiResponse<string>
      >("/RptDelayguaranteePaymentRealTime/ExportDetailSearchDL", {
        ...params,
      });
    },
  };
};
