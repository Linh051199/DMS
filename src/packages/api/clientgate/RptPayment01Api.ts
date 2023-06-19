import { formatDate } from "@/packages/common/date_utils";
import {ApiResponse, RptPayment01Data, RptPaymentParam, RptPaymentRecord} from "@/packages/types";
import {AxiosInstance} from "axios";


export const useRptPayment01Api = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV"
  return {
    RptPayment01_ExportSearchTTCKDL: async (params: RptPaymentParam): Promise<ApiResponse<string>> => {
      return await apiBase.post<RptPaymentParam, ApiResponse<string>>("/RptPayment01/ExportSearchTTCKDL", {
        ...params,
        OSODAppDateFrom: formatDate(params.OSODAppDateFrom as Date),
        OSODAppDateTo: formatDate(params.OSODAppDateTo as Date),
        DealDateFrom: formatDate(params.DealDateFrom as Date),
        DealDateTo: formatDate(params.DealDateTo as Date),
        DateOpenFrom: formatDate(params.DateOpenFrom as Date),
        DateOpenTo: formatDate(params.DateOpenTo as Date),
        PMGDateEndFrom: formatDate(params.PMGDateEndFrom as Date),
        PMGDateEndTo: formatDate(params.PMGDateEndTo as Date),
        FlagDataWH: params.FlagDataWH ? 1 : 0
      })
    },
    RptPayment01_ExportDetailSearchDL: async (params: RptPaymentParam): Promise<ApiResponse<string>> => {
      return await apiBase.post<RptPaymentParam, ApiResponse<string>>("/RptPayment01/ExportDetailSearchDL", {
        ...params,
        OSODAppDateFrom: formatDate(params.OSODAppDateFrom as Date),
        OSODAppDateTo: formatDate(params.OSODAppDateTo as Date),
        DealDateFrom: formatDate(params.DealDateFrom as Date),
        DealDateTo: formatDate(params.DealDateTo as Date),
        DateOpenFrom: formatDate(params.DateOpenFrom as Date),
        DateOpenTo: formatDate(params.DateOpenTo as Date),
        PMGDateEndFrom: formatDate(params.PMGDateEndFrom as Date),
        PMGDateEndTo: formatDate(params.PMGDateEndTo as Date),
        FlagDataWH: params.FlagDataWH ? 1 : 0
      })
    },
    RptPayment01_ExportDL: async (params: RptPaymentParam): Promise<ApiResponse<string>> => {
      return await apiBase.post<RptPaymentParam, ApiResponse<string>>("/RptPayment01/ExportDL", {
        ...params,
        OSODAppDateFrom: formatDate(params.OSODAppDateFrom as Date),
        OSODAppDateTo: formatDate(params.OSODAppDateTo as Date),
        DealDateFrom: formatDate(params.DealDateFrom as Date),
        DealDateTo: formatDate(params.DealDateTo as Date),
        DateOpenFrom: formatDate(params.DateOpenFrom as Date),
        DateOpenTo: formatDate(params.DateOpenTo as Date),
        PMGDateEndFrom: formatDate(params.PMGDateEndFrom as Date),
        PMGDateEndTo: formatDate(params.PMGDateEndTo as Date),
        FlagDataWH: params.FlagDataWH ? 1 : 0
      })
    },
    RptPayment01_SearchDL: async (params: RptPaymentParam): Promise<ApiResponse<RptPayment01Data>> => {
      return await apiBase.post<RptPaymentParam, ApiResponse<RptPayment01Data>>("/RptPayment01/SearchDL", {
        ...params,
        OSODAppDateFrom: formatDate(params.OSODAppDateFrom as Date),
        OSODAppDateTo: formatDate(params.OSODAppDateTo as Date),
        DealDateFrom: formatDate(params.DealDateFrom as Date),
        DealDateTo: formatDate(params.DealDateTo as Date),
        DateOpenFrom: formatDate(params.DateOpenFrom as Date),
        DateOpenTo: formatDate(params.DateOpenTo as Date),
        PMGDateEndFrom: formatDate(params.PMGDateEndFrom as Date),
        PMGDateEndTo: formatDate(params.PMGDateEndTo as Date),
        FlagDataWH: params.FlagDataWH ? 1 : 0
      });
    },
  }
}
