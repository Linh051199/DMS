import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_StatisticHTCStockOut01Param {
  DealerCodeInput: string;
  SOCode: string;
  OSOApprovedDate2From: string;
  OSOApprovedDate2To: string;
  CDODeliveryOutDateFrom: string;
  CDODeliveryOutDateTo: string;
  OSOApprovedDateFrom: string;
  OSOApprovedDateTo: string;
  ModelCode: string;
  CDOApprovedDate2From: string;
  CDOApprovedDate2To: string;
  CDOCreatedDateFrom: string;
  CDOCreatedDateTo: string;
  HTCInvoiceDateFrom: string;
  HTCInvoiceDateTo: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_StatisticHTCStockOut01 {
  CARID: string;
  CCSPECCODE: string;
  CCMODELCODE: string;
  CCCOLORCODE: string;
  UNITPRICEINIT: number;
  UNITPRICEACTUAL: number;
  PAYMENTSTATUS: string;
  DELIVERYSTATUS: string;
  SELLSTATUS: string;
  VIN: string;
  VINLISTNO: any;
  PACKINGLISTNO: string;
  PRODUCTIONMONTH: any;
  CVSPECCODE: string;
  CVMODELCODE: string;
  CVCOLORCODE: string;
  ENGINENO: string;
  KEYNO: string;
  STORAGECODEINIT: string;
  STORAGECODECURRENT: any;
  STOREDATE: string;
  FLAGREPAIR: string;
  REPAIRREMARK: string;
  CQEXPECTEDDATE: string;
  CQSTARTDATE: string;
  CQENDDATE: string;
  CUSTOMSCLEARANCEDATE: string;
  CODATE: string;
  DOCUMENTSSTATUS: string;
  TYPECB: string;
  LOAITHUNG: any;
  ACTUALSPEC: string;
  SERIALNO: string;
  PRODUCTIONYEARACTUAL: any;
  LOAITHUNGTEXT: string;
  DEALERCODE: string;
  DEALERNAME: string;
  FLAGDIRECT: string;
  DEALERCODEDEFAULT: string;
  DEALERNAMEDEFAULT: string;
  ISHTC: string;
  CVSPECDESCRIPTION: string;
  CVMODELNAME: string;
  CVCOLOREXTTYPE: string;
  CVCOLOREXTCODE: string;
  CVCOLOREXTNAME: string;
  CVCOLOREXTNAMEVN: string;
  CVCOLORINTCODE: string;
  CVCOLORINTNAME: string;
  CVCOLORINTNAMEVN: string;
  AC_SPECDESCRIPTION: string;
  SOCODE: string;
  LCNO: string;
  DECLARATIONNO: any;
  PORTCODE: string;
  SHIPPINGDATESTART: string;
  SHIPPINGDATEEND: string;
  GUARANTEENO: string;
  GUARANTEEDETAILSTATUS: string;
  BANKGUARANTEENO: string;
  BANKCODE: string;
  GUARANTEESTATUS: string;
  DELIVERYORDERNO: string;
  STORAGECODEDELIVERY: string;
  DELIVERYSTARTDATE: any;
  DELIVERYOUTDATE: string;
  DELIVERYEXPECTEDDATE: any;
  DELIVERYENDDATE: string;
  TOTAL: number;
  OSO_APPROVEDDATE2: string;
  OSO_APPROVEDMONTH2: string;
  OSOD_APPROVEDDATE: any;
  CDO_APPROVEDDATE2: string;
  CDO_APPROVEDDATE2MONTH: string;
  CDOD_DELIVERYOUTMONTH: string;
  PRODUCTIONYEAR: any;
  COYEAR: string;
  MD_DEALERCODE: string;
  MD_DEALERNAME: string;
  MD_HTCSTAFFINCHARGE: string;
  MA2_AREACODE: string;
  MA2_AREANAME: string;
  DOSOR_MONTHORDER: string;
  HTCINVOICECODE: string;
  HTCINVOICEDATE: string;
  HTCINVOICEDATEMONTH: string;
}

interface RptStatisticHTCStockOut01Data {
  Lst_RptStatistic_HTCStockOut01_Detail: Rpt_StatisticHTCStockOut01[];
}
export const useRptStatisticHTCStockOut01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    RptStatisticHTCStockOut01_SearchHQ: async (
      params: Rpt_StatisticHTCStockOut01Param
    ): Promise<ApiResponse<RptStatisticHTCStockOut01Data>> => {
      return await apiBase.post<
        Rpt_StatisticHTCStockOut01Param,
        ApiResponse<RptStatisticHTCStockOut01Data>
      >("/RptStatisticHTCStockOut01/SearchHQ", {
        ...params,
      });
    },
    RptStatisticHTCStockOut01_ExportDetailSearchHQ: async (
      params: Rpt_StatisticHTCStockOut01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticHTCStockOut01Param,
        ApiResponse<string>
      >("/RptStatisticHTCStockOut01/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
