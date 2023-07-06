import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_RevenueHTCInvoiceParam {
  strnrptYear?:  string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_RevenueHTCInvoiceRecord {
  DEALERCODE: string;
  DEALERNAME: string;
  COMPANYNAME: string;
  SOLUONG_01: number;
  TONGDOANHTHU_01: number;
  SOLUONG_02: number;
  TONGDOANHTHU_02: number;
  SOLUONG_03: number;
  TONGDOANHTHU_03: number;
  SOLUONG_04: number;
  TONGDOANHTHU_04: number;
  SOLUONG_05: number;
  TONGDOANHTHU_05: number;
  SOLUONG_06: number;
  TONGDOANHTHU_06: number;
  SOLUONG_07: number;
  TONGDOANHTHU_07: number;
  SOLUONG_08: number;
  TONGDOANHTHU_08: number;
  SOLUONG_09: number;
  TONGDOANHTHU_09: number;
  SOLUONG_10: number;
  TONGDOANHTHU_10: number;
  SOLUONG_11:number;
  TONGDOANHTHU_11: number;
  SOLUONG_12: number;
  TONGDOANHTHU_12: number;
  SOLUONG: number;
  TONGDOANHTHU: number;
  MODELCODE: string;
  ACTUALSPEC: string;
  SPECDESCRIPTION: string;
  ASSEMBLYSTATUS: string;
}

interface Rpt_RevenueHTCInvoiceParamData {
  Lst_Rpt_Revenue_HTCInvoice: Rpt_RevenueHTCInvoiceRecord[];
}
export const useRpt_RevenueHTCInvoice = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_RevenueHTCInvoice_SearchHQ: async (
      params: Rpt_RevenueHTCInvoiceParam
    ): Promise<ApiResponse<Rpt_RevenueHTCInvoiceParamData>> => {
      return await apiBase.post<
        Rpt_RevenueHTCInvoiceParam,
        ApiResponse<Rpt_RevenueHTCInvoiceParamData>
      >("/RptRevenueHTCInvoice/SearchHQ", {
        ...params,
      });
    },
    Rpt_RevenueHTCInvoice_ExportSearchHQ: async (
      params: Rpt_RevenueHTCInvoiceParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_RevenueHTCInvoiceParam, ApiResponse<string>>(
        "/RptRevenueHTCInvoice/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    // Rpt_RevenueHTCInvoice_ExportDetailSearchHQ: async (
    //   params: Rpt_RevenueHTCInvoiceParam
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<Rpt_RevenueHTCInvoiceParam, ApiResponse<string>>(
    //     "/RptRevenueHTCInvoice/ExportDetailSearchHQ",
    //     {
    //       ...params,
    //     }
    //   );
    // },
  };
};
