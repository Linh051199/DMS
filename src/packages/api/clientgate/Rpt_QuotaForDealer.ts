import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_QuotaForDealerParam {
  DealerCode: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_QuotaForDealerRecord {
  DealerCode: string;
  SpecCode: string;
  QtyQuota: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  UpdateBy: string;
  UpdateDTime: string;
  md_DealerName: string;
  mcm_ModelCode: string;
  mcm_ModelName: string;
  mcs_SpecDescription: string;
}

interface Rpt_QuotaForDealerData {
  Lst_Mng_Quota: Rpt_QuotaForDealerRecord[];
}
export const useRpt_QuotaForDealer = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    Rpt_QuotaForDealer_SearchByDealerCode: async (
      params: Rpt_QuotaForDealerParam
    ): Promise<ApiResponse<Rpt_QuotaForDealerData>> => {
      console.log("🚀 ~ params:", params);
      return await apiBase.post<
        Rpt_QuotaForDealerParam,
        ApiResponse<Rpt_QuotaForDealerData>
      >("/RptQuotaForDealer/SearchByDealerCode", {
        ...params,
      });
    },
    Rpt_QuotaForDealer_ExportByDealerCode: async (
      params: Rpt_QuotaForDealerParam
    ): Promise<ApiResponse<Rpt_QuotaForDealerData>> => {
      return await apiBase.post<
        Rpt_QuotaForDealerParam,
        ApiResponse<Rpt_QuotaForDealerData>
      >("/RptQuotaForDealer/ExportByDealerCode", {
        ...params,
      });
    },
  };
};
