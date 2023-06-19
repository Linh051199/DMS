import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface RptStatistic_HTC_CarDocReqParam {
  FlagDataWH: 1 | 0;
  MDDealerCodeConditionList?: string;
  MAAreaCodeConditonList?: string;
  DateBegin?: number;
}

export interface RptStatistic_HTC_CarDocReqRecord {
  Lst_RptStatistic_HTC_CarDocReq: {
    DCDEALERCODE: string;
    DEALERNAME: string;
    MODELCODE: string;
    COLORCODE: string;
    SPECCODE: string;
    SPECDESCRIPTION: string;
    DCCREATEDDATE: string;
    DLRCONTRACTNO: string;
    TONDAUCHUAGIAO: string;
    PHATSINHTRONGKY: string;
    GIAOXETRONGKY: string;
    SOLUONGHUY: string;
    TONCUOICHUAGIAO: string;
    RANGEDATE: string;
    RD_INSTOCK: string;
    CREATEDDATE: string;
    CUSTOMERCODE: string;
    FULLNAME: string;
    DDC_SOHUU_CUSTOMERCODE: string;
    DDC_SOHUU_FULLNAME: string;
    MP_PROVINCECODE: string;
    M_PROVINCENAME: string;
    MD_DISTRICTCODE: string;
    MD_DISTRICTNAME: string;
    DLRCONTRACTNOUSER: string;
    ADDRESS: string;
    SMCODE: string;
    SMNAME: string;
    SALESTYPE: string;
    SALESTYPENAMEVN: string;
    BANKCODE: string;
    BANKNAME: string;
    DLVEXPECTEDDATE: string;
    UNITPRICE: string;
    TOTALPRICE: string;
    AREACODECUS: string;
    AREANAMECUS: string;
    AREACODEDEALER: string;
    AREANAMEDEALER: string;
    HTCSTAFFINCHARGE: string;
    COLOREXTNAMEVN: string;
  };
}

export const useRptStatistic_HTC_CarDocReq = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    RptStatistic_HTC_CarDocReq_SearchHQ: async (
      params: RptStatistic_HTC_CarDocReqParam
    ): Promise<ApiResponse<RptStatistic_HTC_CarDocReqRecord>> => {
      return await apiBase.post<
        RptStatistic_HTC_CarDocReqParam,
        ApiResponse<RptStatistic_HTC_CarDocReqRecord>
      >("/RptStatisticHTCCarDocReq/SearchHQ", {
        ...params,
      });
    },
    RptStatistic_HTC_CarDocReq_ExportDetailSearchHQ: async (
      params: RptStatistic_HTC_CarDocReqParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptStatistic_HTC_CarDocReqParam,
        ApiResponse<string>
      >("/RptStatisticHTCCarDocReq/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
