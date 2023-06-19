import { ApiResponse } from "@/packages/types";

import { AxiosInstance } from "axios";
export interface Rpt_ProfileGuaranteeEffectParam {
  ApprovedDateFrom: string;
  ApprovedDateTo: string;
  StatusMortageEnd: string;
  TypeReport: string;
  MortageEndDateFrom: string;
  MortageEndDateTo: string;
  GrtBankCode: string;
  DateStartFrom: string;
  DateStartTo: string;
  DateEndFrom: string;
  DateEndTo: string;
  DocumentsStatus: string;
  PaymentEndDateTo: string;
  VIN: string;
  CarId: string;
  DealerCodeInput: string;
  DlrCtrNo: string;
  SOCode: string;
  BankGuaranteeNo: string;
  FlagDataWH: 1 | 0;
}

export interface Lst_Rpt_ProfileGuaranteeEffectData {
  cc_CarId: string;
  cv_VIN: string;
  cv_EngineNo: string;
  cv_CONo: string;
  osod_ApprovedDate: string;
  mcs_SpecDescription: string;
  cc_UnitPriceActual: number;
  pgd_GuaranteeValue: number;
  pgd_DateStart: string;
  pgd_DateEnd: string;
  GuarenteePmtAmount_AF: any;
  GuaranteeValue_Remain: number;
  pg_BankGuaranteeNo: string;
  pg_GuaranteeType: string;
  pg_BankCode: string;
  pg_BankCodeMonitor: any;
  pg_DateOpen: string;
  pg_DateExpired: string;
  pg_TermActual: number;
  ct_lrCtrNo: string;
  cc_SOCode: string;
  cdod_DeliveryOutDate: string;
  sdm_DlvEndDate: string;
  ctm_TransportMinutesNo: any;
  ctm_HTCAppr2DateTime: any;
  vhtci_HTCInvoiceCode: string;
  vtcgi_TCGInvoiceCode: string;
  cv_InvoiceNoFactory: string;
  cv_InvoiceFactorySearch: string;
  md_DealerCode: string;
  md_DealerName: string;
  TextReport: string;
  cv_MortageEndDate: any;
  cv_MortageBankCode: any;
  vattcg_TCGInvoiceCode: string;
  vattcg_TCGInvoiceDate: string;
  vattcg_TCGInvoiceNo: string;
  vattcg_OS_HDDT_InvoiceCode: string;
  vathtc_HTCInvoiceCode: string;
  vathtc_HTCInvoiceDate: string;
  vathtc_HTCInvoiceNo: string;
  vathtc_OS_HDDT_InvoiceCode: string;
}

interface RptStatisticHTCStockOut01Data {
  Lst_Rpt_ProfileGuaranteeEffect: Lst_Rpt_ProfileGuaranteeEffectData[];
}
export const useRptProfileGuaranteeEffect = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    RptProfileGuaranteeEffect_SearchHQ: async (
      params: Rpt_ProfileGuaranteeEffectParam
    ): Promise<ApiResponse<RptStatisticHTCStockOut01Data>> => {
      console.log("params:", params);
      return await apiBase.post<
        Rpt_ProfileGuaranteeEffectParam,
        ApiResponse<RptStatisticHTCStockOut01Data>
      >("/RptProfileGuaranteeEffect/SearchHQ", {
        ...params,
      });
    },
    RptProfileGuaranteeEffect_ExportDetailSearchHQ: async (
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
