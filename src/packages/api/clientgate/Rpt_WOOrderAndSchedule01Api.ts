import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_WOOrderAndSchedule01Param {
  SOType: string;
  IsSpecCode: 1 | 0;
  IsColorCode: 1 | 0;
  IsColorExtName: 1 | 0;
  IsColorIntName: 1 | 0;
  FlagDataWH: 1 | 0;
}

export interface Rpt_WOOrderAndSchedule01Record {
  MCS_SPECCODE:string ;
  MCS_SPECDESCRIPTION:string ;
  MCC_COLORCODE:string ;
  MCC_COLOREXTNAMEVN:string ;
  MCC_COLORINTNAMEVN:string ;
  PMPD_DUTYCOMPLETED_C0:string ;
  PMPD_DUTYCOMPLETED_C1:string ;
  PMPD_DUTYCOMPLETED_C100:string ;
  PMPD_DUTYCOMPLETED_CA:string ;
  OSOD_REQUESTEDQTY:string ;
  CVINSTOCK_QTY:string ;
  CVATPORT_QTY:string ;
  CVONSHIP_QTY:string ;
  WOSCHD_QTYORDER:string ;
  WOSCHD_QTYPRODUCT:string ;
  WOSCHD_QTYVIN:string ;
  WOSCHD_QTYFRAMING:string ;
  WOSCHD_QTYREMAIN:string ;
  WOSCHD_QTYPLAN:string ;
  WOSCHD_QTYREMAINORDER:string ;
  TOTAL1:string ;
  TOTAL2:string ;
  CHENHLECH:string ;
}

interface Rpt_WOOrderAndSchedule01ParamData {
  Lst_RptWO_OrderAndSchedule_01: Rpt_WOOrderAndSchedule01Record[];
}
export const useRpt_WOOrderAndSchedule01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_WOOrderAndSchedule01_SearchHQ: async (
      params: Rpt_WOOrderAndSchedule01Param
    ): Promise<ApiResponse<Rpt_WOOrderAndSchedule01ParamData>> => {
      return await apiBase.post<
        Rpt_WOOrderAndSchedule01Param,
        ApiResponse<Rpt_WOOrderAndSchedule01ParamData>
      >("/RptWOOrderAndSchedule01/SearchHQ", {
        ...params,
      });
    },
    Rpt_WOOrderAndSchedule01_ExportSearchHQ: async (
      params: Rpt_WOOrderAndSchedule01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_WOOrderAndSchedule01Param, ApiResponse<string>>(
        "/RptWOOrderAndSchedule01/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_WOOrderAndSchedule01_ExportDetailSearchHQ: async (
      params: Rpt_WOOrderAndSchedule01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_WOOrderAndSchedule01Param, ApiResponse<string>>(
        "/RptWOOrderAndSchedule01/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
