import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface Rpt_StatisticHTCStock02Param {
  FlagDataWH: 1 | 0;
}

export interface Rpt_StatisticHTCStock02Record {
  CARID: string;
  CCSPECCODE: string;
  CCMODELCODE: string;
  CCCOLORCODE: string;
  UNITPRICEINIT: string;
  UNITPRICEACTUAL: string;
  PAYMENTSTATUS: string;
  DELIVERYSTATUS: string;
  SELLSTATUS: string;
  VIN: string;
  VINLISTNO: string;
  PACKINGLISTNO: string;
  PRODUCTIONMONTH: string;
  CVSPECCODE: string;
  CVMODELCODE: string;
  CVCOLORCODE: string;
  ENGINENO: string;
  KEYNO: string;
  STORAGECODEINIT: string;
  STORAGECODECURRENT: string;
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
  LOAITHUNG: string;
  ACTUALSPEC: string;
  SERIALNO: string;
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
  DECLARATIONNO: string;
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
  DELIVERYSTARTDATE: string;
  DELIVERYOUTDATE: string;
  DELIVERYEXPECTEDDATE: string;
  DELIVERYENDDATE: string;
  TOTAL: string;
  MYDAYS: string;
  RANGE_DATE: string;
  UNITPRICE: string;
  COYEAR: string;
  CTPL_SHIPPINGDATESTART: string;
  CTPL_SHIPPINGDATEEND: string;
  CV_STOREDATE: string;
  CV_CQSTARTDATE: string;
  CV_CQENDDATE: string;
  CTT_TAXPAYMENTDATE: string;
  CV_CUSTOMSCLEARANCEDATE: string;
  CV_CODATE: string;
  CV_REPAIRREMARK: string;
  CV_DRFULLDOCDATE: string;
  CV_PRODUCTIONYEARACTUAL: string;
  PRODUCTION_YEAR: string;
  TOTALPRICE: string;
}

interface Rpt_StatisticHTCStock02Data {
  Lst_RptStatistic_HTCStock02: Rpt_StatisticHTCStock02Record[];
}
export const useRpt_StatisticHTCStock02 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    Rpt_StatisticHTCStock02_SearchHQ: async (
      params: Rpt_StatisticHTCStock02Param
    ): Promise<ApiResponse<Rpt_StatisticHTCStock02Data>> => {
      return await apiBase.post<
        Rpt_StatisticHTCStock02Param,
        ApiResponse<Rpt_StatisticHTCStock02Data>
      >("/RptStatisticHTCStock02/SearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticHTCStock02_ExportDetailSearchHQ: async (
      params: Rpt_StatisticHTCStock02Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticHTCStock02Param,
        ApiResponse<string>
      >("//RptStatisticHTCStock02/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
