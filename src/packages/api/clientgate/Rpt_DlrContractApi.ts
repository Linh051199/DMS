import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_DlrContract_Params {
  CreatedDateFrom: string;
  CreatedDateTo: string;
  MDDealerCodeConditionList: string;
  MAAreaCodeConditonList: string;
  DateBegin: string;
  DeliveryDateFrom: string;
  DeliveryDateTo: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_DlrContract {
  DCDEALERCODE: string;
  DEALERNAME: string;
  SPECCODE: string;
  MODELCODE: string;
  COLORCODE: string;
  SPECDESCRIPTION: string;
  COLOREXTCODE: string;
  COLOREXTNAME: string;
  COLOREXTNAMEVN: string;
  DLRCONTRACTNO: string;
  TONDAUCHUAGIAO: string;
  PHATSINHTRONGKY: string;
  GIAOXETRONGKY: string;
  SOLUONGHUY: string;
  SOLUONGHUYRC: string;
  TONCUOICHUAGIAO: string;
  AREACODEDEALER: string;
  AREANAMEDEALER: string;
  HTCSTAFFINCHARGE: string;
  SMNAME: string;
  DDLCFULLNAME: string;
  DDLCADDRESS: string;
  BANKCODE: string;
  BANKNAME: string;
  SALESTYPENAMEVN: string;
  MPPROVINCENAME: string;
  MDTDISTRICTNAME: string;
  UNITPRICE: string;
  CREATEDDATE: string;
}

export const useRpt_DlrContractApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_DlrContract_SearchHQ: async (
      params: Partial<Rpt_DlrContract_Params>
    ) => {
      return await apiBase.post("/RptDlrContract/SearchHQ", {
        ...params,
      });
    },
    Rpt_DlrContract_ExportDetailSearchHQ: async (
      params: Partial<Rpt_DlrContract_Params>
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Partial<Rpt_DlrContract_Params>,
        ApiResponse<string>
      >("/RptDlrContract/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
