import {ApiResponse,} from "@/packages/types";
import {AxiosError, AxiosInstance} from "axios";

export interface RptStatisticHTCStockOutOnWayParam {
  // DateFrom: string;
  // DateTo: string;
  FlagDataWH: 1 | 0
}

export interface RptStatisticHTCStockOutOnWayRecord {
  CARID: string;
  DEALERCODE: string;
  CCSPECCODE?: string;
  CCMODELCODE: string;
  CCCOLORCODE: string;
  CCSOCODE: string;
  VIN?: string;
  CVSPECCODE: string;
  CVMODELCODE: string;
  CVCOLORCODE: string;
  CVENGINENO: string;
  CVKEYNO: string;
  TYPECB: string;
  LOAITHUNG: string;
  LOAITHUNGTEXT: string;
  DELIVERYORDERNO: string;
  CDODSTORAGECODE: string;
  CDODDELIVERYVIN: string;
  CDODDELIVERYSTARTDATE: string;
  CDODDELIVERYOUTDATE: string;
  CDODDELIVERYEXPECTEDDATE: string;
  CDODTRANSPORTMINUTESEXPECTEDDATE: string;
  TRANSPORTREQNO: string;
  CTRTRANSPORTERCODE: string;
  TOTAL: number;
  TRANSPORTERNAME: string;
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
  COLOREXTTYPE : string;
  COLORINTCODE: string;
  COLORINTNAME: string;
  COLORINTNAMEVN: string;
  COLORFEE: string;
  COLOR_VN_COMBINED: string;
  COLOR_EN_COMBINED: string;
  
}

interface RptStatisticHTCStockOutOnWayData {
  Lst_RptStatistic_HTCStockOutOnWay: RptStatisticHTCStockOutOnWayRecord[] 
}
export const useRptStatisticHTCStockOutOnWay = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV"

  return {
    RptStatisticHTCStockOutOnWay_SearchHQ: async (params: RptStatisticHTCStockOutOnWayParam): Promise<ApiResponse<RptStatisticHTCStockOutOnWayData>> => {
          // console.log(96, params)
      return await apiBase.post<RptStatisticHTCStockOutOnWayParam, ApiResponse<RptStatisticHTCStockOutOnWayData>>("/RptStatisticHTCStockOutOnWay/SearchHQ", {
        ...params,
      });
    },
    // RptStatisticHTCStockOutOnWay_ExportSearchDL: async (params: RptStatisticHTCStockOutOnWayParam): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<RptStatisticHTCStockOutOnWayParam, ApiResponse<string>>("/RptStatisticHTCStockOutOnWay/ExportSearchDL", {
    //     ...params,
    //   });
    // },
    RptStatisticHTCStockOutOnWay_ExportDetailSearchHQ: async (params: RptStatisticHTCStockOutOnWayParam): Promise<ApiResponse<string>> => {
      return await apiBase.post<RptStatisticHTCStockOutOnWayParam, ApiResponse<string>>("/RptStatisticHTCStockOutOnWay/ExportDetailSearchHQ", {
        ...params,
      });
    }
  }
}
