import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface RptStatisticDealerStock21Param {
  Date_From: string;
  Date_To: string;
  FlagDataWH: 1 | 0;
}

export interface RptStatisticDealerStock21Record {
  CarID: string;
  CVMODELCODE: string;
  NEXTDLSDDEALERCODEOWNER?: string;
  CVCOLORCODE: string;
  DLSDDEALERCODEOWNER: string;
  DLSDDEALERCODESOURCE: string;
  NEXTDLSDDLSDDEALNO?: string;
  MyStatus: string;
  VIN: string;
  TT_CARID: number;
  CVCUSTOMSCLEARANCEDATE: string;
  DUTYCOMPLETEDDATE: string;
  TOTALCOMPLETEDDATE: string;
  CMP1_PAYMENTENDDATE_CBU30_CKD15: string;
  COCONLY_COMPLETEDDATE: string;
  CCSPECCODE: string;
  CvMODELCODE: string;
}

interface RptStatisticDealerStock21Data {
  Lst_Rpt_Statistic_DealerStock_21_Mst: RptStatisticDealerStock21Record[];
}
export const useRptStatisticDealerStock21 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptStatisticDealerStock21_SearchDL: async (
      params: RptStatisticDealerStock21Param
    ): Promise<ApiResponse<RptStatisticDealerStock21Data>> => {
      return await apiBase.post<
        RptStatisticDealerStock21Param,
        ApiResponse<RptStatisticDealerStock21Data>
      >("/RptStatisticDealerStock21/SearchDL", {
        ...params,
      });
    },
    RptStatisticDealerStock21_ExportSearchDL: async (
      params: RptStatisticDealerStock21Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptStatisticDealerStock21Param,
        ApiResponse<string>
      >("/RptStatisticDealerStock21/ExportSearchDL", {
        ...params,
      });
    },
    RptStatisticDealerStock21_ExportDetailSearchDL: async (
      params: RptStatisticDealerStock21Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        RptStatisticDealerStock21Param,
        ApiResponse<string>
      >("/RptStatisticDealerStock21/ExportDetailSearchDL", {
        ...params,
      });
    },
  };
};
