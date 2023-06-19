import {AxiosInstance} from "axios";
import {
  ApiResponse,
  RptStatisticHTCStockOut02ByDealerRecord,
  RptStatisticHTCStockOut02ByModelRecord,
  RptStatisticHTCStockOut02Param,
  RptStatisticHTCStockOut02ParamDto
} from "@packages/types";
import {format} from "date-fns";

export const useRptStatisticHTCStockOut02Api = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV"
  return {
    RptStatisticHTCStockOut02_SearchByDealerDL: async (param: Partial<RptStatisticHTCStockOut02ParamDto>) => {
      return await apiBase.post<RptStatisticHTCStockOut02Param, ApiResponse<{
        Lst_RptStatistic_HTCStockOut02_ByDealer: RptStatisticHTCStockOut02ByDealerRecord[]
      }>>("/RptStatisticHTCStockOut02/SearchByDealerDL", {
        MonthReport: format(param.MonthReport!, "yyyy-MM-dd"),
        FlagDataWH: param.FlagDataWH ? 1 : 0,
        LstDealerCode: (param.DealerCodes ?? []).join(",")
      })
    },
    RptStatisticHTCStockOut02_ExportSearchByDealerDL: async (param: Partial<RptStatisticHTCStockOut02ParamDto>) => {
      return await apiBase.post<RptStatisticHTCStockOut02Param, any>("/RptStatisticHTCStockOut02/ExportSearchByDealerDL", {
        MonthReport: format(param.MonthReport!, "yyyy-MM-dd"),
        FlagDataWH: param.FlagDataWH ? 1 : 0,
        LstDealerCode: (param.DealerCodes ?? []).join(",")
      })
    },
    RptStatisticHTCStockOut02_SearchByModelDL: async (param: Partial<RptStatisticHTCStockOut02ParamDto>) => {
      return await apiBase.post<RptStatisticHTCStockOut02Param, ApiResponse<{
        Lst_RptStatistic_HTCStockOut02_ByModel: RptStatisticHTCStockOut02ByModelRecord[]
      }>>("/RptStatisticHTCStockOut02/SearchByModelDL", {
        MonthReport: format(param.MonthReport!, "yyyy-MM-dd"),
        FlagDataWH: param.FlagDataWH ? 1 : 0,
        LstModelCode: (param.ModelCodes ?? []).join(",")
      })
    },
    RptStatisticHTCStockOut02_ExportSearchByModelDL: async (param: Partial<RptStatisticHTCStockOut02ParamDto>) => {
      return await apiBase.post<RptStatisticHTCStockOut02Param, any>("/RptStatisticHTCStockOut02/ExportSearchByModelDL", {
        MonthReport: format(param.MonthReport!, "yyyy-MM-dd"),
        FlagDataWH: param.FlagDataWH ? 1 : 0,
        LstModelCode: (param.ModelCodes ?? []).join(",")
      })
    },
  }
}
