import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_TheoDoiKiemTraDatHangParam {
  YearPlan: string;
  DealerCodeInput: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_TheoDoiKiemTraDatHangRecord {
  ModelCode: string;
  SpecCode: string;
  SpecDescription: string;
  QtyEOrdN1_Old: string;
  OrdN1: number;
  OrdN2: number;
  OrdN3: number;
  OrdN4: number;
  OrdN5: number;
  OrdN6: number;
  OrdN7: number;
  OrdN8: number;
  OrdN9: number;
  OrdN10: number;
  OrdN11: number;
  OrdN12: number;
  EstN1: number;
  EstN2: number;
  EstN3: number;
  EstN4: number;
  EstN5: number;
  EstN6: number;
  EstN7: number;
  EstN8: number;
  EstN9: number;
  EstN10: number;
  EstN11: number;
  EstN12: number;
  DBKtraKHDH_Spec_KHDH_ModelN1: string;
  DBKtraKHDH_Spec_KHDH_ModelN2: string;
  DBKtraKHDH_Spec_KHDH_ModelN3: string;
  DBKtraKHDH_Spec_KHDH_ModelN4: string;
  DBKtraKHDH_Spec_KHDH_ModelN5: string;
  DBKtraKHDH_Spec_KHDH_ModelN6: string;
  DBKtraKHDH_Spec_KHDH_ModelN7: string;
  DBKtraKHDH_Spec_KHDH_ModelN8: string;
  DBKtraKHDH_Spec_KHDH_ModelN9: string;
  DBKtraKHDH_Spec_KHDH_ModelN10: string;
  DBKtraKHDH_Spec_KHDH_ModelN11: string;
  DBKtraKHDH_Spec_KHDH_ModelN12: string;
  SubKtraDH_KHDH_SpecN1: any;
  SubKtraDH_KHDH_SpecN2: any;
  SubKtraDH_KHDH_SpecN3: any;
  SubKtraDH_KHDH_SpecN4: any;
  SubKtraDH_KHDH_SpecN5: any;
  SubKtraDH_KHDH_SpecN6: any;
  SubKtraDH_KHDH_SpecN7: any;
  SubKtraDH_KHDH_SpecN8: any;
  SubKtraDH_KHDH_SpecN9: any;
  SubKtraDH_KHDH_SpecN10: any;
  SubKtraDH_KHDH_SpecN11: any;
  SubKtraDH_KHDH_SpecN12: any;
}

interface Rpt_TheoDoiKiemTraDatHangData {
  Lst_Rpt_TheoDoiKiemTraDatHang?: Rpt_TheoDoiKiemTraDatHangRecord[];
}
export const use_RptTheoDoiKiemTraDatHang = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_TheoDoiKiemTraDatHang_SearchHQ: async (
      params: Rpt_TheoDoiKiemTraDatHangParam
    ): Promise<ApiResponse<Rpt_TheoDoiKiemTraDatHangData>> => {
      return await apiBase.post<
        Rpt_TheoDoiKiemTraDatHangParam,
        ApiResponse<Rpt_TheoDoiKiemTraDatHangData>
      >("/RptTheoDoiKiemTraDatHang/SearchHQ", {
        ...params,
      });
    },
    Rpt_TheoDoiKiemTraDatHang_ExportSearchHQ: async (
      params: Rpt_TheoDoiKiemTraDatHangParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_TheoDoiKiemTraDatHangParam,
        ApiResponse<string>
      >("/RptTheoDoiKiemTraDatHang/ExportSearchHQ", {
        ...params,
      });
    },
  };
};
