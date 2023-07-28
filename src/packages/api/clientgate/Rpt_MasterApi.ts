import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_MasterParam {
  MonthFrom: any;
  MonthTo: any;
  CheckBanLe: 1 | 0;
  CheckTonKhoDaiLy: 1 | 0;
  CheckBanBuonHTC: 1 | 0;
  CheckTonKhoHTC: 1 | 0;
  CheckNhapHang: 1 | 0;
  CheckShipping: 1 | 0;
  CheckSanXuat: 1 | 0;
  CheckPI: 1 | 0;
  FlagDataWH: 1 | 0;
}

export interface Rpt_MasterRecord {
  INDEX: string;
  CVMODELCODE: string;
  MODELNAME: string;
  CVACTUALSPEC: string;
  AC_SPECDESCRIPTION: string;
  CVCOLORCODE: string;
  COLORNAME: string;
  Month_1: number;
  Month_2: number;
  Month_3: number;
  Month_4: number;
  Month_5: number;
  Month_6: number;
  Month_7: number;
  Month_8: number;
  Month_9: number;
  Month_10: number;
  Month_11: number;
  Month_12: number;
}

export interface Lst_ColumnMonthRecord {
  ColumnMonthKey: string;
  ColumnMonthValue: string;
}

interface Rpt_MasterParamData {
  Lst_ColumnMonth?: Lst_ColumnMonthRecord[];
  Lst_RptMaster_BanLe?: Rpt_MasterRecord[];
  Lst_RptMaster_TonKhoDaiLy?: Rpt_MasterRecord[];
  Lst_RptMaster_BanBuonHTC?: Rpt_MasterRecord[];
  Lst_RptMaster_TonKhoHTC?: Rpt_MasterRecord[];
  Lst_RptMaster_NhapHang?: Rpt_MasterRecord[];
  Lst_RptMaster_Shipping?: Rpt_MasterRecord[];
  Lst_RptMaster_SanXuat?: Rpt_MasterRecord[];
  Lst_RptMaster_DatHang?: Rpt_MasterRecord[];
}
export const useRpt_Master = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    Rpt_Master_SearchHQ: async (
      params: Rpt_MasterParam
    ): Promise<ApiResponse<Rpt_MasterParamData>> => {
      return await apiBase.post<
        Rpt_MasterParam,
        ApiResponse<Rpt_MasterParamData>
      >("/RptMaster/SearchHQ", {
        ...params,
        // TDate_To: params.TDate_To ?? ""
      });
    },
    Rpt_Master_ExportSearchHQ: async (
      params: Rpt_MasterParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_MasterParam, ApiResponse<string>>(
        "/RptMaster/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_Master_ExportDetailSearchHQ_BanLe: async (
      params: Rpt_MasterParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_MasterParam, ApiResponse<string>>(
        "/RptMaster/ExportDetailSearchHQ_BanLe",
        {
          MonthFrom: params.MonthFrom,
          MonthTo: params.MonthTo,
          FlagDataWH: params.FlagDataWH ? 1 : 0,
        }
      );
    },
    Rpt_Master_ExportDetailSearchHQ_Shipping: async (
      params: Rpt_MasterParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_MasterParam, ApiResponse<string>>(
        "/RptMaster/ExportDetailSearchHQ_Shipping",
        {
          MonthFrom: params.MonthFrom,
          MonthTo: params.MonthTo,
          FlagDataWH: params.FlagDataWH ? 1 : 0,
        }
      );
    },
    Rpt_Master_ExportDetailSearchHQ_BanBuonHTC: async (
      params: Rpt_MasterParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_MasterParam, ApiResponse<string>>(
        "/RptMaster/ExportDetailSearchHQ_BanBuonHTC",
        {
          MonthFrom: params.MonthFrom,
          MonthTo: params.MonthTo,
          FlagDataWH: params.FlagDataWH ? 1 : 0,
        }
      );
    },
    Rpt_Master_ExportDetailSearchHQ_NhapHang: async (
      params: Rpt_MasterParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_MasterParam, ApiResponse<string>>(
        "/RptMaster/ExportDetailSearchHQ_NhapHang",
        {
          MonthFrom: params.MonthFrom,
          MonthTo: params.MonthTo,
          FlagDataWH: params.FlagDataWH ? 1 : 0,
        }
      );
    },
  };
};
