import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface Rpt_PivotPDIParam {
  FlagDataWH: 1 | 0;
}

export interface Rpt_PivotPDIRecord {
  VIN:string;
  MODELCODE:string;
  SPECCODE:string;
  COLORCODE:string;
  ORDERNOMMS:string;
  ORDCATEGORYTYPEMMS:string;
  ORDMONTHMMS:string;
  ORDERNOMMSDELIVERY:string;
  ORDCATEGORYTYPEMMSDELIVERY:string;
  ORDMONTHMMSDELIVERY:string;
  ORDERMONTHACTUAL:string;
  FINISHDTIME:string;
  ENGINENO:string;
  KEYNO:string;
  CREATEDDTIME:string;
  CREATEDBY:string;
  PLDTIME:string;
  PLBY:string;
  FLAGACTIVE:string;
  PDISTORAGESTATUS:string;
  REMARK:string
  LOGLUDATETIME:string;
  LOGLUBY:string;
  AVNSERIALNO:string;
  BATTERYNO:string;
  AVNCODE:string;
  AVNDATE:string;
  FLAGPMTAVN:string;
  VINYEAR:string;
  SPECCODE1:string;
  MODELCODE1:string;
  STDOPTCODE:string;
  GRADECODE:string;
  OCNCODE:string;
  ASSEMBLYSTATUS:string;
  SPECDESCRIPTION:string;
  FLAGACTIVE1:string;
  LOGLUDATETIME1:string;
  LOGLUBY1:string;
  FLAGINVOICEFACTORY:string;
  ROOTSPEC:string;
  REMARK1:string;
  FLAGAMBULANCE:string;
  NUMBEROFSEATS:string;
  QUOTADATE:string;
  MODELCODE2:string;
  COLORCODE1:string;
  COLOREXTTYPE:string;
  COLOREXTCODE:string;
  COLOREXTNAME:string;
  COLOREXTNAMEVN:string;
  COLORINTCODE:string;
  COLORINTNAME:string;
  COLORINTNAMEVN:string;
  COLORFEE:string;
  FLAGACTIVE2:string;
  REMARK2:string
  LOGLUDATETIME2:string;
  LOGLUBY2:string;
  MODELCODE3:string;
  MODELPRODUCTIONCODE:string;
  MODELNAME:string;
  SEGMENTTYPE:string;
  LOGLUDATETIME3:string;
  LOGLUBY3:string;
  FLAGBUSINESSPLAN:string;
  FLAGACTIVE3:string;
  QUOTADATE1:string;
  REFNO:string;
  WORKORDERNO:string;
  TOTAL:string;
  COLORNAME:string;
}

interface Rpt_PivotPDIData {
  Lst_PDI_VIN: Rpt_PivotPDIRecord[];
}
export const useRpt_PivotPDI = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    Rpt_PivotPDI_SearchHQ: async (
      params: Rpt_PivotPDIParam
    ): Promise<ApiResponse<Rpt_PivotPDIData>> => {
      return await apiBase.post<
        Rpt_PivotPDIParam,
        ApiResponse<Rpt_PivotPDIData>
      >("/PivotPDI/SearchHQ", {
        ...params,
      });
    },
    Rpt_PivotPDI_ExportDetailSearchHQ: async (
      params: Rpt_PivotPDIParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_PivotPDIParam, ApiResponse<string>>(
        "/PivotPDI/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
