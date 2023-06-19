import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface RptStatistic_DealerStock_ForSale_MstParam {
  DateFrom: string;
  DateTo: string;
  FlagDataWH: 1 | 0;
}

export interface RptStatistic_DealerStock_ForSale_MstRecord {
  DEALNO: string;
  CARID: string;
  DEALNOPREVIOUS: string;
  PLATENO: string;
  DELIVERYDATE: string;
  DELIVERYSTATUS: string;
  CONFIRMDATE: string;
  CONFIRMBY: string;
  FLAGCURRENT: string;
  CUSINVOICENO: string;
  CUSINVOICEDATE: string;
  LOGLUDATETIME: string;
  LOGLUBY: string;
  WARRANTYEXPIRESDATE: string;
  CUSCONFIRMEDWARRANTYDATE: string;
  SBHONLINECARID: string;
  PRICE: string;
  WARRANTYKM: string;
  DEALERCODEFIRSTOWNER: string;
  CCSPECCODE: string;
  CCMODELCODE: string;
  CCCOLORCODE: string;
  VIN: string;
  CVSPECCODE: string;
  CVMODELCODE: string;
  CVCOLORCODE: string;
  ACTUALSPEC: string;
  SERIALNO: string;
  CDODDELIVERYOUTDATE: string;
  CDODCONFIRMSTATUS: string;
  CDODDELIVERYENDDATE: string;
  DLSDDEALERCODESOURCE: string;
  DLSDDEALERCODEOWNER: string;
  DLSDDEALNOUSER: string;
  DLSDSALESTYPE: string;
  DLSDDEALDATE: string;
  DLSDFLAGINITDEAL: string;
  DLSDCUSTOMERCODEBUYER: string;
  DLSDDDEALNOPREVIOUS: string;
  DLSDDPLATENO: string;
  DLSDDDELIVERYDATE: string;
  DLSDDDELIVERYSTATUS: string;
  DLSDDFLAGCURRENT: string;
  DLSDDCUSINVOICENO: string;
  DLSDDCUSINVOICEDATE: string;
  DLSDDEALNO: string;
  DCDLRCONTRACTNO: string;
  DSMSMCODE: string;
  DSMSMNAME: string;
  NEXTDLSDDEALERCODEOWNER: string;
  NEXTDLSDDDELIVERYDATE: string;
  NEXTDLSDDDELIVERYSTATUS: string;
  NEXTDLSDDPLATENO: string;
  NEXTDLSDDLSDDEALNO: string;
  NEXTDSMSMCODE: string;
  NEXTDSMSMNAME: string;
  NEXTDCDLRCONTRACTNO: string;
  NEXTDLSDCUSTOMERCODEBUYER: string;
  NEXTDLSDDCUSINVOICENO: string;
  NEXTDLSDDCUSINVOICEDATE: string;
  NEXTDLSDSALESTYPE: string;
  MYSTT_SELL: string;
  MYSTT_STOCKIN: string;
  TT_CARID: string;
  MYSTATUS: string;
  CVCUSTOMSCLEARANCEDATE: string;
  DUTYCOMPLETEDDATE: string;
  TOTALCOMPLETEDDATE: string;
  COCONLY_COMPLETEDDATE: string;
  CMP1_PAYMENTENDDATE_CBU30_CKD15: string;
  CMP1_AMOUNTACCUM_CBU30_CKD15: string;
  CCUNITPRICEINIT: string;
  CCUNITPRICEACTUAL: string;
  PRODUCTIONMONTH: string;
  PRODUCTIONYEARACTUAL: string;
  PRODUCTIONYEAR: string;
  AC_SPECDESCRIPTION: string;
  SOCODE: string;
  OSODAPPROVEDDATE: string;
  CVCOLORCODECOMBINE: string;
  CVCOLORNAMECOMBINE: string;
  DLSDFULLNAMEBUYER: string;
  DLSDPRONVINCENAMEBUYER: string;
  CVMODELNAME: string;
  SALESTYPENAMEVN: string;
  DLSDDEALERNAMEOWNER: string;
  NEXTDLSDDDELIVERYMONTH: string;
  DCD_UNITPRICE: string;
  AREACODECUS: string;
  AREANAMECUS: string;
  AREACODEDEALER: string;
  AREANAMEDEALER: string;
  HTCSTAFFINCHARGE: string;
  COYEAR: string;
  SMCODE: string;
  SMNAME: string;
  DDDDELIVERYDATE: string;
  PRICENEW: string;
  DD2DEALDATE: string;
  DCCREATEDDATE: string;
  DISTRICTNAME: string;
  RATEPRICE: string;
  STDOPTDESCRIPTION: string;
  GRADECODE: string;
  GRADEDESCRIPTION: string;
  STDOPTCODE: string;
  OCNCODE: string;
  OCNDESCRIPTION: string;
  SPECDESCRIPTION: string;
  COLOREXTCODE: string;
  COLOREXTNAME: string;
  COLOREXTNAMEVN: string;
  COLOREXTTYPE: string;
  COLORINTCODE: string;
  COLORINTNAME: string;
  COLORINTNAMEVN: string;
  COLORFEE: string;
  COLOR_VN_COMBINED: string;
  COLOR_EN_COMBINED: string;
  STATUSVALUE: string;
  COLORCODE: string;
  PMPDAMOUNTTOTAL: string;
  CVLOCATION: string;
}

interface RptStatistic_DealerStock_ForSale_MstData {
  Lst_RptStatistic_DealerStock_ForSale_Mst: RptStatistic_DealerStock_ForSale_MstRecord[];
}
export const useRptStatistic_DealerStock_ForSale_Mst = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptStatistic_DealerStock_ForSale_Mst_SearchHQ: async (
      params: RptStatistic_DealerStock_ForSale_MstParam
    ): Promise<ApiResponse<RptStatistic_DealerStock_ForSale_MstData>> => {
      return await apiBase.post<
        RptStatistic_DealerStock_ForSale_MstParam,
        ApiResponse<RptStatistic_DealerStock_ForSale_MstData>
      >("/RptStatisticDealerStockForSaleMst/SearchHQ", {
        ...params,
      });
    },
    RptStatistic_DealerStock_ForSale_Mst_ExportDetailSearchHQ: async (
      params: RptStatistic_DealerStock_ForSale_MstParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptStatistic_DealerStock_ForSale_MstParam,
        ApiResponse<string>
      >("/RptStatisticDealerStockForSaleMst/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
