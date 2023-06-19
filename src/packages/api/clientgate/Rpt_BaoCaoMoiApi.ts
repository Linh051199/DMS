import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface RptBaoCaoMoiParam {
  // Date_From: string;
  // Date_To: string;
  FlagDataWH: 1 | 0;
}

export interface RptBaoCaoMoiRecord {
  CCDEALERCODE:string; 
  CCDEALERNAME:string; 
  CARID:string; 
  CCFLAGMAPVIN:string;
  OSOSOCODE:string; 
  OSODAPPROVEDDATE:string; 
  OSODAPPROVEDMONTH:string; 
  MODELCODE:string;
  SPECCODE:string;
  CVCOLOREXTCODE:string; 
  CVCOLOREXTNAMEVN:string; 
  CVCOLORINTCODE:string; 
  CVCOLORINTNAMEVN:string; 
  UNITPRICEACTUAL:string; 
  PMGDGUARANTEEVALUE:string; 
  DUTYDAYSDELIVERYENDDATE:string; 
  CDODDELIVERYOUTDATE: string;
  CDODDELIVERYENDDATE:string;
  STATUSCHUNG:string; 
  CVPRODUCTIONMONTH:string; 
  CVDOCUMENTSSTATUS:string; 
  DEPOSITDUTYENDDATE:string; 
  CVVIN:string; 
  CVSTOREDATE:string; 
  CVCODATE:string; 
  CVPRODTMONTH:string; 
  CVPRODTYEAR:string; 
  MYSTT_SELL:string; 
  DLSDDDEALNOPREVIOUS:string; 
  DLSDDDELIVERYDATE:string; 
  DLSDDDELIVERYSTATUS:string; 
  DLSDDFLAGCURRENT:string; 
  DLSDDEALERCODEOWNER:string; 
  DLSDDEALERCODESOURCE:string; 
  DEALERCODEFIRSTOWNER:string; 
  DELIVERYRANGETYPE:string; 
  PMPDAMOUNTTOTAL_DEPOSIT:string; 
  DUTYCOMPLETEDPERCENT_RANGE:string; 
  MCSSPECDESCRIPTION:string; 
  DUTYDAYSDELIVERYENDDATE_RANGE:string; 
  TOTAL:string;
  AREACODEDEALER:string; 
  AREANAMEDEALER:string; 
  HTCSTAFFINCHARGE:string; 
  COYEAR:string; 
  DOSOR_ORDERMONTH:string; 
  PRODUCTIONYEARACTUAL:string; 
  TRANSDELIVERYRANGETYPE:string; 
  TrangThaiBackOrderText:string; 
  GRT_PERCENT:string; 
  PAYMENT_DEPOSIT_PERCENT:string;
}
interface RptBaoCaoMoiData {
  Lst_Rpt_BaoCaoMoi: RptBaoCaoMoiRecord[];
}
export const useRptBaoCaoMoi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptBaoCaoMoi_SearchHQ: async (
      params: RptBaoCaoMoiParam
    ): Promise<ApiResponse<RptBaoCaoMoiData>> => {
      return await apiBase.post<
        RptBaoCaoMoiParam,
        ApiResponse<RptBaoCaoMoiData>
      >("/RptBaoCaoMoi/SearchHQ", {
        ...params,
      });
    },
    // RptBaoCaoMoi_ExportSearchDL: async (
    //   params: RptBaoCaoMoiParam
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<
    //     RptBaoCaoMoiParam,
    //     ApiResponse<string>
    //   >("/RptBaoCaoMoi/ExportSearchDL", {
    //     ...params,
    //   });
    // },
    RptBaoCaoMoi_ExportDetailSearchHQ: async (
      params: RptBaoCaoMoiParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptBaoCaoMoiParam,
        ApiResponse<string>
      >("/RptBaoCaoMoi/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
