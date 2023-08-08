import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface Rpt_PivotKHSXParam {
  DateFrom: string;
}

export interface Rpt_PivotKHSXRecord {
  AUTOID: string;
  MNFPLNO: string;
  MNFPLTYPE: string;
  SHOPCCCODE: string;
  LINECODE: string;
  ORDERNO: string;
  SPECCODE: string;
  LOTNO: string;
  MODELCODE: string;
  COLORCODE: string;
  CALENDARTYPE: string;
  DATE: string;
  QTYPLAN: string;
  MNFPLIDX: string;
  CREATEDTIME: string;
  CREATEBY: string;
  LUDTIME: string;
  LUBY: string;
  APPRDTIME: string;
  APPRBY: string;
  MNFPLSTATUS: string;
  REMARK: string;
  LOGLUDTIME: string;
  LOGLUBY: string;
  FACTORYCODE: string;
  MCS_SPECDESCRIPTION: string;
  MCC_COLORCODE: string;
  MCC_MODELCODE: string;
  MCC_COLOREXTNAME: string;
  MCC_COLOREXTNAMEVN: string;
  MCC_COLORINTNAME: string;
  MCC_COLORINTNAMEVN: string;
  MONHTMNFIDX: string;
  VIN_COLOR_VN_COMBINED: string;
  SHOPCCCODEIDX: string;
  LOTIDX: string;
  SHOPCCCODECP: string;
}

interface Rpt_PivotKHSXData {
  Lst_MMS_Rpt_MnfPlanSummary_ForMonth: Rpt_PivotKHSXRecord[];
}
export const useRpt_PivotKHSX = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    Rpt_PivotKHSX_SearchHQ: async (
      params: Rpt_PivotKHSXParam
    ): Promise<ApiResponse<Rpt_PivotKHSXData>> => {
      return await apiBase.post<
        Rpt_PivotKHSXParam,
        ApiResponse<Rpt_PivotKHSXData>
      >("/PivotKHSX/SearchHQ", {
        ...params,
      });
    },
    Rpt_PivotKHSX_ExportSearchHQ: async (
      params: Rpt_PivotKHSXParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_PivotKHSXParam, ApiResponse<string>>(
        "/PivotKHSX/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
