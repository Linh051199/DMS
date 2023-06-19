import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface RptSellCustomerDealer_ForSale_MstParam {
  DateFrom: string;
  DateTo: string;
  FlagDataWH: 1 | 0;
}

export interface RptSellCustomerDealer_ForSale_MstRecord {
  CARID: string;
  CVMODELCODE: string;
  NEXTDLSDDEALERCODEOWNER: string;
  CVCOLORCODE: string;
  DLSDDEALERCODEOWNER: string;
  DEALERNAME: string;
  DLSDDEALERCODESOURCE: string;
  NEXTDLSDDLSDDEALNO: string;
  MYSTATUS: string;
  VIN: string;
  TT_CARID: string;
  CVCUSTOMSCLEARANCEDATE: string;
  DUTYCOMPLETEDDATE: string;
  TOTALCOMPLETEDDATE: string;
  CMP1_PAYMENTENDDATE_CBU30_CKD15: string;
  COCONLY_COMPLETEDDATE: string;
  CCSPECCODE: string;
  CVCOLORCODE1: string;
  CVMODELCODE1: string;
  DLSDPRONVINCENAMEBUYER: string;
  DLSDDEALERNAMEOWNER: string;
  PRODUCTIONMONTH: string;
  PRODUCTIONYEAR: string;
  SOCODE: string;
  OSODAPPROVEDDATE: string;
  SALESTYPENAMEVN: string;
  NEXTDLSDDDELIVERYMONTH: string;
  DCD_UNITPRICE: string;
  AREACODECUS: string;
  AREANAMECUS: string;
  AREACODEDEALER: string;
  AREANAMEDEALER: string;
  HTCSTAFFINCHARGE: string;
  CODATE: string;
  COYEAR: string;
  SMCODE: string;
  SMNAME: string;
  DDDDELIVERYDATE: string;
  DD2DEALDATE: string;
  DCCREATEDDATE: string;
}

interface RptSellCustomerDealer_ForSale_MstData {
  Lst_RptSellCustomerDealer_ForSale_Mst: RptSellCustomerDealer_ForSale_MstRecord[];
}
export const useRptSellCustomerDealer_ForSale_Mst = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptSellCustomerDealer_ForSale_Mst_SearchHQ: async (
      params: RptSellCustomerDealer_ForSale_MstParam
    ): Promise<ApiResponse<RptSellCustomerDealer_ForSale_MstData>> => {
      return await apiBase.post<
        RptSellCustomerDealer_ForSale_MstParam,
        ApiResponse<RptSellCustomerDealer_ForSale_MstData>
      >("/RptSellCustomerDealerForSaleMst/SearchHQ", {
        ...params,
      });
    },
    RptSellCustomerDealer_ForSale_Mst_ExportDetailSearchHQ: async (
      params: RptSellCustomerDealer_ForSale_MstParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptSellCustomerDealer_ForSale_MstParam,
        ApiResponse<string>
      >("/RptSellCustomerDealerForSaleMst/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
