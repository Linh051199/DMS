import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface RptStatistic_HTCStock03Param {
  TDate: string;
  FlagDataWH: 1 | 0;
}

export interface RptStatistic_HTCStock03Record {
  Lst_RptStatistic_HTCStock03: {
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
    PRODUCTIONYEARACTUAL: string;
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
    REFDATE: string;
    DELIVERYRANGETYPE: string;
    TOTAL1: string;
    TRANSDELIVERYRANGETYPE: string;
  };
}

export const useRptStatistic_HTCStock03 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    RptStatistic_HTCStock03_SearchHQ: async (
      params: RptStatistic_HTCStock03Param
    ): Promise<ApiResponse<RptStatistic_HTCStock03Record>> => {
      return await apiBase.post<
        RptStatistic_HTCStock03Param,
        ApiResponse<RptStatistic_HTCStock03Record>
      >("/RptStatisticHTCStock03/SearchHQ", {
        ...params,
      });
    },
    RptStatistic_HTCStock03_ExportSearchDL: async (
      params: RptStatistic_HTCStock03Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptStatistic_HTCStock03Param,
        ApiResponse<string>
      >("/RptStatisticHTCStock03/ExportSearchDL", {
        ...params,
      });
    },
    RptStatistic_HTCStock03_ExportDetailSearchHQ: async (
      params: RptStatistic_HTCStock03Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptStatistic_HTCStock03Param,
        ApiResponse<string>
      >("/RptStatisticHTCStock03/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
