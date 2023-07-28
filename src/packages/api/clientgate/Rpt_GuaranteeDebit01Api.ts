import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_GuaranteeDebit01Param {
  GrtNo: string;
  DateOpenFrom: Date | string | "";
  DateOpenTo: Date | string | "";
  StartDateTo: Date | string | "";
  PaymentDateEndTo: Date | string | "";
  FlagDataWH: 1 | 0;
}

export interface Rpt_GuaranteeDebit01Record {
  GUARANTEENO: string;
  DEALERCODE: string;
  BANKCODE: string;
  BANKGUARANTEENO: string;
  DATEOPEN: string;
  DATEEND: string;
  DATEEXPIRED: string;
  TERM: number;
  TERMACTUAL: number;
  TERMWARNING: number;
  TOTALAMOUNT: number;
  DISCOUNTPMTDATE: string;
  DISCOUNTPMTVALUE: string;
  GUARANTEESTATUS: string;
  CREATEDDATE: string;
  CREATEDBY: string;
  APPROVEDDATE: string;
  APPROVEDBY: string;
  REMARK: string;
  LOGLUDATETIME: string;
  LOGLUBY: string;
  BANKCODEMONITOR: string;
  DATEEND_DISCOUNT: string;
  GUARANTEETYPE: string;
  REMARKREJECT: string;
  DATERECIEVEGRTROOT: string;
  TYPEFEE: string;
  FEE: number;
  TT_ALLCOUNT: number;
  TT_ALLVALUE: number;
  TT_ACTCOUNT: number;
  TT_ACTVALUE: number;
  TT_EFFCOUNT: number;
  TT_EFFVALUE: number;
  TT_EFFRECEIVED: number;
  TT_DISCOUNTVALUE: number;
  TT_EFFREMAIN: number;
  BANKNAME: string ;
}

interface Rpt_GuaranteeDebit01ParamData {
  Lst_RptGuarantee_Debit_01: Rpt_GuaranteeDebit01Record[];
}
export const useRpt_GuaranteeDebit01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_GuaranteeDebit01_SearchHQ: async (
      params: Rpt_GuaranteeDebit01Param
    ): Promise<ApiResponse<Rpt_GuaranteeDebit01ParamData>> => {
      return await apiBase.post<
        Rpt_GuaranteeDebit01Param,
        ApiResponse<Rpt_GuaranteeDebit01ParamData>
      >("/RptGuaranteeDebit01/SearchHQ", {
        ...params,
      });
    },
    Rpt_GuaranteeDebit01_ExportSearchHQ: async (
      params: Rpt_GuaranteeDebit01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_GuaranteeDebit01Param, ApiResponse<string>>(
        "/RptGuaranteeDebit01/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_GuaranteeDebit01_ExportDetailSearchHQ: async (
      params: Rpt_GuaranteeDebit01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_GuaranteeDebit01Param, ApiResponse<string>>(
        "/RptGuaranteeDebit01/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
