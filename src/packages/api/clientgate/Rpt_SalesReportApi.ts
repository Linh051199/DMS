import {AxiosInstance} from "axios";
import {
  ApiResponse,
  RptSalesReportByDealerRecord,
  RptSalesReportByModelRecord,
  RptSalesReportParam,
  RptSalesReportParamDto
} from "@packages/types";
import {format} from "date-fns";

export const useRptSalesReportApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV"
  return {
    RptSalesReport_SearchByDealerHQ: async (param: Partial<RptSalesReportParamDto>) => {
      return await apiBase.post<RptSalesReportParam, ApiResponse<{
        Lst_RptStatistic_HTCStockOut02_ByDealer: RptSalesReportByDealerRecord[]
      }>>("/RptSalesReport/SearchByDealerHQ", {
        MonthReport: format(param.MonthReport!, "yyyy-MM-dd"),
        FlagDataWH: param.FlagDataWH ? 1 : 0,
        LstDealerCode: (param.DealerCodes ?? []).join(",")
      })
    },
    RptSalesReport_ExportSearchByDealerHQ: async (param: Partial<RptSalesReportParamDto>) => {
      return await apiBase.post<RptSalesReportParam, any>("/RptSalesReport/ExportSearchByDealerHQ", {
        MonthReport: format(param.MonthReport!, "yyyy-MM-dd"),
        FlagDataWH: param.FlagDataWH ? 1 : 0,
        LstDealerCode: (param.DealerCodes ?? []).join(",")
      })
    },
    RptSalesReport_SearchByModelHQ: async (param: Partial<RptSalesReportParamDto>) => {
      return await apiBase.post<RptSalesReportParam, ApiResponse<{
        Lst_RptStatistic_HTCStockOut02_ByModel: RptSalesReportByModelRecord[]
      }>>("/RptSalesReport/SearchByModelHQ", {
        MonthReport: format(param.MonthReport!, "yyyy-MM-dd"),
        FlagDataWH: param.FlagDataWH ? 1 : 0,
        LstModelCode: (param.ModelCodes ?? []).join(",")
      })
    },
    RptSalesReport_ExportSearchByModelHQ: async (param: Partial<RptSalesReportParamDto>) => {
      return await apiBase.post<RptSalesReportParam, any>("/RptSalesReport/ExportSearchByModelHQ", {
        MonthReport: format(param.MonthReport!, "yyyy-MM-dd"),
        FlagDataWH: param.FlagDataWH ? 1 : 0,
        LstModelCode: (param.ModelCodes ?? []).join(",")
      })
    },
  }
}
