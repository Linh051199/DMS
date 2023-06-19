import {ApiResponse,} from "@/packages/types";
import {AxiosError, AxiosInstance} from "axios";

export interface RptStatisticGrpDealer02Param {
  DateFrom: string;
  DateTo: string;
  FlagDataWH: 1 | 0
}

export interface RptStatisticGrpDealer02Record {
  CARID: string;
  CCSPECCODE: string;
  CCMODELCODE?: string;
  CCCOLORCODE: string;
  UNITPRICEINIT: number;
  UNITPRICEACTUAL: number;
  PAYMENTSTATUS?: string;
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
  DEALERNAME : string;
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
  DLSDDDEALNO: string;
  DLSDDDELIVERYDATE: string;
  DLSDDDELIVERYSTATUS: string;
  TT_CARID: string;
  MDDEALERCODE: string;
  MDDEALERNAME: string;
}

interface RptStatisticGrpDealer02Data {
  Lst_RptStatistic_GrpDealer02: RptStatisticGrpDealer02Record[] 
}
export const useRptStatisticGrpDealer02 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV"

  return {
    RptStatisticGrpDealer02_SearchHQ: async (params: RptStatisticGrpDealer02Param): Promise<ApiResponse<RptStatisticGrpDealer02Data>> => {
          // console.log(96, params)
      return await apiBase.post<RptStatisticGrpDealer02Param, ApiResponse<RptStatisticGrpDealer02Data>>("/RptStatisticGrpDealer02/SearchHQ", {
        ...params,
      });
    },
    // RptStatisticGrpDealer02_ExportSearchDL: async (params: RptStatisticGrpDealer02Param): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<RptStatisticGrpDealer02Param, ApiResponse<string>>("/RptStatisticGrpDealer02/ExportSearchDL", {
    //     ...params,
    //   });
    // },
    RptStatisticGrpDealer02_ExportDetailSearchHQ: async (params: RptStatisticGrpDealer02Param): Promise<ApiResponse<string>> => {
      return await apiBase.post<RptStatisticGrpDealer02Param, ApiResponse<string>>("/RptStatisticGrpDealer02/ExportDetailSearchHQ", {
        ...params,
      });
    }
  }
}
