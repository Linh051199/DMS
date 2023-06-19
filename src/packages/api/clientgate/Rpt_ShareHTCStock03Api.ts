import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface useRpt_ShareHTCStock03Param {
  DealerCodeInput: string;
  FlagDataWH: 1 | 0;
}

export interface useRpt_ShareHTCStock03Record {
  Lst_RptShare_HTCStock03: {
    CARID: string;
    CCSPECCODE: string;
    CCMODELCODE: string;
    CCCOLORCODE: string;
    UNITPRICEACTUAL: number;
    VIN: string;
    CVSPECCODE: string;
    CVMODELCODE: string;
    CVCOLORCODE: string;
    TYPECB: string;
    LOAITHUNG: string;
    ACTUALSPEC: string;
    SERIALNO: string;
    PRODUCTIONYEARACTUAL: string;
    LOAITHUNGTEXT: string;
    DEALERCODE: string;
    FLAGDIRECT: string;
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
    DELIVERYORDERNO: string;
    TOTAL: number;
    DEPOSITAMOUNTTOTAL: number;
    DUTYCOMPLETEDPERCENT: number;
    DUTYCOMPLETEDPERCENT_AF: number;
    TOTAL1: number;
    COUPLE_COLOR_CODE: string;
  };
}

export const useRpt_ShareHTCStock03 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_ShareHTCStock03_SearchHQ: async (
      params: useRpt_ShareHTCStock03Param
    ): Promise<ApiResponse<useRpt_ShareHTCStock03Record>> => {
      return await apiBase.post<
        useRpt_ShareHTCStock03Param,
        ApiResponse<useRpt_ShareHTCStock03Record>
      >("/RptShareHTCStock03/SearchHQ", {
        ...params,
      });
    },
    Rpt_ShareHTCStock03_SearchDL: async (
      params: useRpt_ShareHTCStock03Param
    ): Promise<ApiResponse<useRpt_ShareHTCStock03Record>> => {
      return await apiBase.post<
        useRpt_ShareHTCStock03Param,
        ApiResponse<useRpt_ShareHTCStock03Record>
      >("/RptShareHTCStock03/SearchDL", {
        ...params,
      });
    },
    Rpt_ShareHTCStock03_ExportSearchDL: async (
      params: useRpt_ShareHTCStock03Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        useRpt_ShareHTCStock03Param,
        ApiResponse<string>
      >("/RptShareHTCStock03/ExportDetailSearchDL", {
        ...params,
      });
    },
    Rpt_ShareHTCStock03_ExportDetailSearchHQ: async (
      params: useRpt_ShareHTCStock03Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        useRpt_ShareHTCStock03Param,
        ApiResponse<string>
      >("/RptShareHTCStock03/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
