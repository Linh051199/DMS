import { formatDate } from "@/packages/common/date_utils";
import {
  ApiResponse, RptHRSalesManParam,
  RptHRSalesManParamDto, RptHRSalesManRecord
} from "@/packages/types";
import {AxiosInstance} from "axios";
import {set} from "date-fns";


export const useRptHRSalesManApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV"
  return {
    RptHRSalesMan_SearchTypeDealerDL: async (param: Partial<RptHRSalesManParamDto>): Promise<ApiResponse<{ Lst_Rpt_HRSalesMan: RptHRSalesManRecord[] }>> => {
      return await apiBase.post<RptHRSalesManParam, ApiResponse<{ Lst_Rpt_HRSalesMan: RptHRSalesManRecord[] }>>("/RptHRSalesMan/SearchTypeDealerDL", {
        ...param,
        HRMonthFrom: formatDate(set(new Date(), {year: param.HRMonthFrom, month: 0, date: 1})),
        HRMonthTo: formatDate(set(new Date(), {year: param.HRMonthTo, month: 11, date: 31})),
        FlagDataWH: param.FlagDataWH ? 1 : 0
      })
    },
    RptHRSalesMan_SearchTypeDealerHQ: async (param: Partial<RptHRSalesManParamDto>): Promise<ApiResponse<{ Lst_Rpt_HRSalesMan: RptHRSalesManRecord[] }>> => {
      return await apiBase.post<RptHRSalesManParam, ApiResponse<{ Lst_Rpt_HRSalesMan: RptHRSalesManRecord[] }>>("/RptHRSalesMan/SearchTypeDealerHQ", {
        ...param,
        DealerCodeInput: param.DealerCodeInput ? param.DealerCodeInput.join(",") : "",
        HRMonthFrom: formatDate(set(new Date(), {year: param.HRMonthFrom, month: 0, date: 1})),
        HRMonthTo: formatDate(set(new Date(), {year: param.HRMonthTo, month: 11, date: 31})),
        FlagDataWH: param.FlagDataWH ? 1 : 0
      })
    },
    RptHRSalesMan_SearchTypeAreaDL: async (param: Partial<RptHRSalesManParamDto>): Promise<ApiResponse<{ Lst_Rpt_HRSalesMan: RptHRSalesManRecord[] }>> => {
      return await apiBase.post<RptHRSalesManParam, ApiResponse<{ Lst_Rpt_HRSalesMan: RptHRSalesManRecord[] }>>("/RptHRSalesMan/SearchTypeAreaDL", {
        ...param,
        HRMonthFrom: formatDate(set(new Date(), {year: param.HRMonthFrom, month: 0, date: 1})),
        HRMonthTo: formatDate(set(new Date(), {year: param.HRMonthTo, month: 11, date: 31})),
        FlagDataWH: param.FlagDataWH ? 1 : 0
      })
    },
    RptHRSalesMan_SearchTypeAreaHQ: async (param: Partial<RptHRSalesManParamDto>): Promise<ApiResponse<{ Lst_Rpt_HRSalesMan: RptHRSalesManRecord[] }>> => {
      return await apiBase.post<RptHRSalesManParam, ApiResponse<{ Lst_Rpt_HRSalesMan: RptHRSalesManRecord[] }>>("/RptHRSalesMan/SearchTypeAreaHQ", {
        ...param,
        HRMonthFrom: formatDate(set(new Date(), {year: param.HRMonthFrom, month: 0, date: 1})),
        HRMonthTo: formatDate(set(new Date(), {year: param.HRMonthTo, month: 11, date: 31})),
        FlagDataWH: param.FlagDataWH ? 1 : 0
      })
    },
    RptHRSalesMan_ExportSearchTypeDealerDL: async (param: Partial<RptHRSalesManParamDto>) => {
      return await apiBase.post<RptHRSalesManParam, any>("/RptHRSalesMan/ExportSearchTypeDealerDL", {
        ...param,
        HRMonthFrom: formatDate(set(new Date(), {year: param.HRMonthFrom, month: 0, date: 1})),
        HRMonthTo: formatDate(set(new Date(), {year: param.HRMonthTo, month: 11, date: 31})),
        FlagDataWH: param.FlagDataWH ? 1 : 0
      })
    },
    RptHRSalesMan_ExportSearchTypeAreaDL: async (param: Partial<RptHRSalesManParamDto>) => {
      return await apiBase.post<RptHRSalesManParam, any>("/RptHRSalesMan/ExportSearchTypeAreaDL", {
        ...param,
        HRMonthFrom: formatDate(set(new Date(), {year: param.HRMonthFrom, month: 0, date: 1})),
        HRMonthTo: formatDate(set(new Date(), {year: param.HRMonthTo, month: 11, date: 31})),
        FlagDataWH: param.FlagDataWH ? 1 : 0
      })
    },
    RptHRSalesMan_ExportSearchTypeAreaHQ: async (param: Partial<RptHRSalesManParamDto>) => {
      return await apiBase.post<RptHRSalesManParam, any>("/RptHRSalesMan/ExportSearchTypeAreaHQ", {
        ...param,
        HRMonthFrom: formatDate(set(new Date(), {year: param.HRMonthFrom, month: 0, date: 1})),
        HRMonthTo: formatDate(set(new Date(), {year: param.HRMonthTo, month: 11, date: 31})),
        FlagDataWH: param.FlagDataWH ? 1 : 0
      })
    },
  }
}
