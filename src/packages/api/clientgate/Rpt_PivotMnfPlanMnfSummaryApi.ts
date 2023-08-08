import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface Rpt_PivotMnfPlanMnfSummaryParam {
  DateFrom: string;
  DateTo: string;
}

export interface Rpt_PivotMnfPlanMnfSummaryRecord {
  LOTNO:string;
  SHOPCCCODE:string;
  ORDERNO:string;
  SPECCODE:string;
  SPECDESCRIPTION:string;
  MODELCODE:string;
  MODELNAME:string;
  COLORCODE:string;
  COLORNAMEVN:string;
  EFFDATE:string;
  QTYMNF:string;
  QTYPLAN:string;
  QTYRESULT:string;
}

interface Rpt_PivotMnfPlanMnfSummaryData {
  Lst_MMS_Rpt_MnfPlan_MnfSummary: Rpt_PivotMnfPlanMnfSummaryRecord[];
}
export const useRpt_PivotMnfPlanMnfSummary = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    Rpt_PivotMnfPlanMnfSummary_SearchHQ: async (
      params: Rpt_PivotMnfPlanMnfSummaryParam
    ): Promise<ApiResponse<Rpt_PivotMnfPlanMnfSummaryData>> => {
      return await apiBase.post<
        Rpt_PivotMnfPlanMnfSummaryParam,
        ApiResponse<Rpt_PivotMnfPlanMnfSummaryData>
      >("/PivotMnfPlanMnfSummary/SearchHQ", {
        ...params,
      });
    },
  };
};
