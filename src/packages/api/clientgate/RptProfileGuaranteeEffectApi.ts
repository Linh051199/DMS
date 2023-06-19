import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface Rpt_ProfileGuaranteeEffectParam {
  DateFrom: string;
  DateTo: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_ProfileGuaranteeEffectRecord {
  cc_CarId: string;
  cv_VIN: string;
  cv_EngineNo: string;
  cv_CONo: string;
  osod_ApprovedDate: string;
  mcs_SpecDescription: string;
  cc_UnitPriceActual: string;
  pgd_GuaranteeValue: string;
  pgd_DateStart: string;
  pgd_DateEnd: string;
  GuarenteePmtAmount_AF: string;
  GuaranteeValue_Remain: string;
  pg_BankGuaranteeNo: string;
  pg_GuaranteeType: string;
  pg_BankCode: string;
  pg_BankCodeMonitor: string;
  pg_DateOpen: string;
  pg_DateExpired: string;
  pg_TermActual: string;
  ct_lrCtrNo: string;
  cc_SOCode: string;
  cdod_DeliveryOutDate: string;
  sdm_DlvEndDate: string;
  ctm_TransportMinutesNo: string;
  ctm_HTCAppr2DateTime: string;
  vhtci_HTCInvoiceCode: string;
  vtcgi_TCGInvoiceCode: string;
  cv_InvoiceNoFactory: string;
  cv_InvoiceFactorySearch: string;
  md_DealerCode: string;
  md_DealerName: string;
  TextReport: string;
  cv_MortageEndDate: string;
  cv_MortageBankCode: string;
  vattcg_TCGInvoiceCode: string;
  vattcg_TCGInvoiceDate: string;
  vattcg_TCGInvoiceNo: string;
  vattcg_OS_HDDT_InvoiceCode: string;
  vathtc_HTCInvoiceCode: string;
  vathtc_HTCInvoiceDate: string;
  vathtc_HTCInvoiceNo: string;
  vathtc_OS_HDDT_InvoiceCode: string;
}

interface Rpt_ProfileGuaranteeEffectData {
  Lst_Rpt_ProfileGuaranteeEffect: Rpt_ProfileGuaranteeEffectRecord[];
}
export const useRpt_ProfileGuaranteeEffect = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    Rpt_ProfileGuaranteeEffect_SearchHQ: async (
      params: Rpt_ProfileGuaranteeEffectParam
    ): Promise<ApiResponse<Rpt_ProfileGuaranteeEffectData>> => {
      return await apiBase.post<
        Rpt_ProfileGuaranteeEffectParam,
        ApiResponse<Rpt_ProfileGuaranteeEffectData>
      >("/RptProfileGuaranteeEffect/SearchHQ", {
        ...params,
      });
    },
    Rpt_ProfileGuaranteeEffect_ExportDetailSearchHQ: async (
      params: Rpt_ProfileGuaranteeEffectParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_ProfileGuaranteeEffectParam,
        ApiResponse<string>
      >("/RptProfileGuaranteeEffect/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
