import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface RptSalesCtmCare01Param {
  DeliveryDateFrom: string;
  DeliveryDateTo: string;
  CreateDealDateFrom: string;
  CreateDealDateTo: string;
  CtmCareUpdDateFrom: string;
  CtmCareUpdDateTo: string;
  FlagDataWH: 1 | 0;
}

export interface RptSalesCtmCare01Record {
  DEALNO: string;
  CARID: string;
  DEALNOPREVIOUS: string;
  PLATENO: string;
  DELIVERYDATE: string;
  DELIVERYSTATUS: string;
  CONFIRMDATE: string;
  CONFIRMBY: string;
  FLAGCURRENT: string;
  CUSINVOICENO: string;
  CUSINVOICEDATE: string;
  LOGLUDATETIME: string;
  LOGLUBY: string;
  WARRANTYEXPIRESDATE: string;
  CUSCONFIRMEDWARRANTYDATE: string;
  SBHONLINECARID: string;
  PRICE: number;
  WARRANTYKM: number;
  TT_CARID: number;
  DLSD_DEALERCODE: string;
  DLSD_DEALERCODEBUYER: string;
  DLSD_SALESTYPE: string;
  DLSD_DEALDATE: string;
  DLSD_CREATEDDATE: string;
  DLSD_FLAGINITDEAL: string;
  DLSD_CTMCAREFLAG: string;
  DLSD_CTMCAREUPDDATE: string;
  CC_DEALERCODE: string;
  CV_VIN: string;
  CV_SPECCODE: string;
  CV_MODELCODE: string;
  CV_COLORCODE: string;
  CV_ENGINENO: string;
  CV_KEYNO: string;
  ACTUALSPEC: string;
  SERIALNO: string;
  DLSDC_DRIVER_PROVINCECODE: string;
  AREACODECUS: string;
  AREANAMECUS: string;
  AREACODEDEALER: string;
  AREANAMEDEALER: string;
  HTCSTAFFINCHARGE: string;
  CC_UNITPRICEACTUAL: number;
  STDOPTDESCRIPTION: string;
  GRADECODE: string;
  GRADEDESCRIPTION: string;
  STDOPTCODE: string;
  OCNCODE: string;
  OCNDESCRIPTION: string;
  SPECDESCRIPTION: string;
  AC_STDOPTDESCRIPTION: string;
  AC_GRADECODE: string;
  AC_GRADEDESCRIPTION: string;
  AC_STDOPTCODE: string;
  AC_OCNCODE: string;
  AC_OCNDESCRIPTION: string;
  AC_SPECDESCRIPTION: string;
  PROVINCENAME: string;
}

interface RptSalesCtmCare01Data {
  Lst_RptSales_CtmCare_01: RptSalesCtmCare01Record[];
}
export const useRptSalesCtmCare01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";

  return {
    RptSalesCtmCare01_SearchHQ: async (
      params: RptSalesCtmCare01Param
    ): Promise<ApiResponse<RptSalesCtmCare01Data>> => {
      return await apiBase.post<
        RptSalesCtmCare01Param,
        ApiResponse<RptSalesCtmCare01Data>
      >("/RptSalesCtmCare01/SearchHQ", {
        ...params,
      });
    },
    RptSalesCtmCare01_ExportDetailSearchHQ: async (
      params: RptSalesCtmCare01Param
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<RptSalesCtmCare01Param, ApiResponse<string>>(
        "/RptSalesCtmCare01/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
