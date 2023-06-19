import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_StatisticGrpDealer03Param {
  FlagDataWH: 1 | 0;
}

export interface Rpt_StatisticGrpDealer03 {
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
  REPAIRREMARK: any;
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
  DLSDDDEALNO: any;
  DLSDDDELIVERYDATE: any;
  DLSDDDELIVERYSTATUS: any;
  TT_CARID: number;
  MDDEALERCODE: string;
  MDDEALERNAME: string;
}

interface RptStatisticHTCStockOut01Data {
  Lst_RptStatistic_GrpDealer03: Rpt_StatisticGrpDealer03[];
}
export const useRptStatisticGrpDealer03 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    RptStatisticGrpDealer03_SearchHQ: async (
      params: Rpt_StatisticGrpDealer03Param
    ): Promise<ApiResponse<RptStatisticHTCStockOut01Data>> => {
      console.log("===params", params);
      return await apiBase.post<
        Rpt_StatisticGrpDealer03Param,
        ApiResponse<RptStatisticHTCStockOut01Data>
      >("/RptStatisticGrpDealer03/SearchHQ", {
        ...params,
      });
    },
    Rpt_StatisticGrpDealer03_ExportDetailSearchHQ: async (
      params: Rpt_StatisticGrpDealer03Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_StatisticGrpDealer03Param,
        ApiResponse<string>
      >("/RptStatisticGrpDealer03/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
