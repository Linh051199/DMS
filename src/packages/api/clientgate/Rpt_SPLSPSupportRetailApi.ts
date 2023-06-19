import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface RptSPLSPSupportRetailParam {
  DealerCodeConditionList: any;
  SPSRCodeConditionList: any;
  TDate_From: string;
  TDate_To: string;
  HTCDatePayment_From: string;
  HTCDatePayment_To: string;
  SPNo: string;
  FlagDataWH: 1 | 0;
}

export interface RptSPLSPSupportRetail {
  DealerCode: string;
  TOTAL: string;
  SPSRCode: string;
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDesc: string;
  AmountSupport: string;
  SPNo: string;
  VIN: string;
  DateSupport: string;
  DeliveryDate: string;
  Approved_Date: string;
  Remark: string;
  FormBusinessSupportName: string;
  SPSRType: string;
  AreaName: string;
  HTCStaffInCharge: string;
  PRDiscountNo: string;
  DealDate: string;
  CreatedDate: string;
  Appr2Date: string;
  ProductionMonth: string;
  SMName: string;
  HTCDatePayment: string;
}

interface RptSPLSPSupportRetailData {
  Lst_Rpt_SPL_SPSupportRetail: RptSPLSPSupportRetail[];
}
export const useRpt_SPLSPSupportRetail = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    RptSPLSPSupportRetail_SearchHQ: async (
      params: RptSPLSPSupportRetailParam
    ): Promise<ApiResponse<RptSPLSPSupportRetailData>> => {
      console.log("===params", params);
      return await apiBase.post<
        RptSPLSPSupportRetailParam,
        ApiResponse<RptSPLSPSupportRetailData>
      >("/RptSPLSPSupportRetail/SearchHQ", {
        ...params,
      });
    },
    RptSPLSPSupportRetail_ExportDetailSearchHQ: async (
      params: RptSPLSPSupportRetailParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptSPLSPSupportRetailParam,
        ApiResponse<string>
      >("/RptSPLSPSupportRetail/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
