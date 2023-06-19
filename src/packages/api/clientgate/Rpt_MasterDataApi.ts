import { ApiResponse, } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface RptMasterDataParam {
  RptMonthFrom: string;
  RptMonthTo: string;
  FlagDataWH: 1 | 0
  DealerCodeInput: string
  AreaCode: string
}

export interface Rpt_MasterDataRecord {
  RptType: string,
  DealerCode: string,
  ModelCode: string,
  SpecCode: string,
  ColorExtCode: string,
  RptMonth: string,
  Qty: number,
  DealerName: string,
  ModelName: string,
  SpecDescription: string,
  ColorExtNameVN: string
}

interface Rpt_MasterData {
  Lst_Rpt_MasterData: Rpt_MasterDataRecord[]
}

export const useRptMasterData = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTC"
  return {
    RptMasterData_SearchHQ: async (params: RptMasterDataParam): Promise<ApiResponse<Rpt_MasterData>> => {
      console.log(34, params);
      return await apiBase.post<RptMasterDataParam, ApiResponse<Rpt_MasterData>>("/RptMasterData/SearchHQ", {
        ...params,
      });
    },
    RptMasterData_ExportDetailSearchHQ: async (params: RptMasterDataParam): Promise<ApiResponse<string>> => {
      return await apiBase.post<RptMasterDataParam, ApiResponse<string>>("/RptMasterData/ExportDetailSearchDL", {
        ...params,
      });
    }
  }
}
