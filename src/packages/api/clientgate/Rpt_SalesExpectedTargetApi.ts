import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_SalesExpectedTargetParam {
  rptSaleExpTgNo: string
  yearRpt: number | string
  createDateFrom: string
  createDateTo: string
}

export interface Rpt_SalesExpectedTargetRecord {
  STT: number, // số thứ tự
  CreateDTime: string, // ngày tạo
  RptSaleExpTgNo: string, // mã báo cáo 
  YearRpt: number, // năm báo cáo
  CreateBy: string, // người tạo
}

interface Rpt_SalesExpectedTargetData {
  Lst_Rpt_SalesExpectedTarget: Rpt_SalesExpectedTargetRecord[];
}
export const useRpt_SalesExpectedTarget = (
  apiBase: AxiosInstance
) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_SalesExpectedTarget_SearchHQ: async (
      params: Rpt_SalesExpectedTargetParam
    ): Promise<ApiResponse<Rpt_SalesExpectedTargetData>> => {
      return await apiBase.post<
        Rpt_SalesExpectedTargetParam,
        ApiResponse<Rpt_SalesExpectedTargetData>
      >("/RptSalesExpectedTarget/SearchHQ", {
        ...params,
      });
    },
  };
};
