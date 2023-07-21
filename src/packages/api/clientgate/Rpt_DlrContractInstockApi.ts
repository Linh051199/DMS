import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface useRpt_DlrContractInstockParam {
  MDDealerCodeConditionList: string;
  MAAreaCodeConditonList: string;
  DateBegin: string;
  FlagDataWH: 1 | 0;
}

export interface useRpt_DlrContractInstockRecord {
  Lst_Rpt_DlrContractInstock: {
    Deadler?: any;
  };
}

export const useRpt_DlrContractInstock = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_DlrContractInstock_SearchHQ: async (
      params: useRpt_DlrContractInstockParam
    ): Promise<ApiResponse<useRpt_DlrContractInstockRecord>> => {
      return await apiBase.post<
        useRpt_DlrContractInstockParam,
        ApiResponse<useRpt_DlrContractInstockRecord>
      >("/RptDlrContractInstock/SearchHQ", {
        ...params,
      });
    },
    Rpt_DlrContractInstock_SearchDL: async (
      params: useRpt_DlrContractInstockParam
    ): Promise<ApiResponse<useRpt_DlrContractInstockRecord>> => {
      return await apiBase.post<
        useRpt_DlrContractInstockParam,
        ApiResponse<useRpt_DlrContractInstockRecord>
      >("/RptDlrContractInstock/SearchDL", {
        ...params,
      });
    },
    Rpt_DlrContractInstock_ExportSearchDL: async (
      params: useRpt_DlrContractInstockParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        useRpt_DlrContractInstockParam,
        ApiResponse<string>
      >("/RptDlrContractInstock/ExportDetailSearchDL", {
        ...params,
      });
    },
    Rpt_DlrContractInstock_ExportDetailSearchHQ: async (
      params: useRpt_DlrContractInstockParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        useRpt_DlrContractInstockParam,
        ApiResponse<string>
      >("/RptDlrContractInstock/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
