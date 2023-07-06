import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_MapVINParam {
  MapVINDateFrom: string;
  MapVINDateTo: string;
  DealerCodeInput: string;
  SOCode: string;
  MapVINStorage: string;
  MapVINType: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_MapVINRecord {
  CARID: string;
  DEALERCODE: string;
  MD_DEALERCODE: string;
  MD_DEALERNAME: string;
  MCS_SPECCODE: string;
  MCS_SPECDESCRIPTION: string;
  MCC_COLORCODE: string;
  MCC_COLORNAME: string;
  CV_VIN: string;
  CV_SPECCODE: string;
  CV_SPECDESCRIPTION: string;
  CV_COLORCODE: string;
  CV_COLORNAME: string;
  MAPVINDATE: string;
  MAPVINBY: string;
  OSO_CREATEDDATE: string;
  OSO_APPROVEDDATE2: string;
  OSO_SOTYPE: string;
  OSO_SOCODE: string;
  CV_PRODUCTIONMONTH: string;
  STOREDATE: string;
  COCONLY_COMPLETEDDATE: string;
  OSOD_APPROVEDDATE: string;
}

interface Rpt_MapVINData {
  Lst_Rpt_MapVIN?: Rpt_MapVINRecord[];
}
export const useRpt_MapVIN = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_MapVIN_SearchHQ: async (
      params: Rpt_MapVINParam
    ): Promise<ApiResponse<Rpt_MapVINData>> => {
      return await apiBase.post<Rpt_MapVINParam, ApiResponse<Rpt_MapVINData>>(
        "/RptMapVIN/SearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_MapVIN_ExportSearchHQ: async (
      params: Rpt_MapVINParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_MapVINParam, ApiResponse<string>>(
        "/RptMapVIN/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
