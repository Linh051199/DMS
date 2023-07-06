import { formatDate } from "@/packages/common/date_utils";
import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
import { set } from "date-fns";

export interface Rpt_PivotRetailContractParam {
  TypeReport: 0 | 1;
  CreatedDateFrom: Date | string | "";
  MDDealerCodeConditionList: string;
  MAAreaCodeConditonList: string;
  DateBegin: string;
  CountTuan: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_PivotRetailContractRecord {
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
  COLTUAN: string;
  COLTHANG: string;
  COLTONCUOICHUAGIAO: string;
  COLPHATSINHTRONGKY: string;
}
interface Rpt_XuatHoSoParamData {
  Lst_Rpt_DlrContract: Rpt_PivotRetailContractRecord[];
}

export const useRpt_PivotRetailContractApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_PivotRetailContract_Search: async (
      param: Partial<Rpt_PivotRetailContractParam>
    ): Promise<ApiResponse<Rpt_XuatHoSoParamData>> => {
      return await apiBase.post<
        Rpt_PivotRetailContractParam,
        ApiResponse<Rpt_XuatHoSoParamData>
      >("/ReportPivotRetailContract/SearchHQ", {
        ...param,
        CreatedDateFrom: formatDate(param.CreatedDateFrom as Date),
        FlagDataWH: param.FlagDataWH ? 1 : 0,
      });
    },
    // Rpt_PivotRetailContract_SearchWeek: async (
    //   param: Partial<Rpt_PivotRetailContractParam>
    // ): Promise<ApiResponse<Rpt_XuatHoSoParamData>> => {
    //   return await apiBase.post<
    //     Rpt_PivotRetailContractParam,
    //     ApiResponse<Rpt_XuatHoSoParamData>
    //   >("/ReportPivotRetailContract/SearchHQ", {
    //     ...param,
    //     CreatedDateFrom: formatDate(param.CreatedDateFrom as Date),
    //     FlagDataWH: param.FlagDataWH ? 1 : 0,
    //   });
    // },
  };
};
