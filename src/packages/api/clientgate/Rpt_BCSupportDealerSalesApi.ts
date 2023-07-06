import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_BCSupportDealerSalesParam {
  DealNo: string;
  CtmCode: string;
  indexCmbSupportType: number;
  DateUpdFrom: Date | string;
  DateUpdTo: Date | string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_BCSupportDealerSalesRecord {
  DealNo: string;
  UpdDTime: string;
  UpdBy: string;
  DealDateOld: string;
  DealDate: string;
  SalesTypeOld: string;
  SalesType: string;
  CustomerCodeBuyerOld: string;
  CustomerCodeBuyer: string;
  CustomerCodeHolderOld: string;
  CustomerCodeHolder: string;
  CustomerCodeDriverOld: string;
  CustomerCodeDriver: string;
  CtmCareFlagOld: string;
  CtmCareFlag: string;
  CtmCareUpdDateOld: string;
  CtmCareUpdDate: string;
  CtmCareUpdByOld: string;
  CtmCareUpdBy: string;
  FlagDel: string;
  LogLUDateTime: string;
  LogLUBy: string;
  Buyer_Name: string;
  Holder_Name: string;
  Driver_Name: string;
  Buyer_NameOld: string;
  Holder_NameOld: string;
  Driver_NameOld: string;
  DealerCode: string;
  FullName: string;
  FullNameEN: string;
  Address: string;
  PhoneNo: string;
  TaxCode: string;
  ProvinceCode: string;
  CreatedDate: string;
  CreatedBy: string;
  IDCardType: string;
  IDCardNo: string;
  Email: string;
  CustomerBaseCode: string;
  Gender: string;
  DateOfBirth: string;
  RangeAgeCode: null;
  DriverLicenseNo: null;
  DistrictCode: string;
  RepresentName: string;
  Position: string;
  CusAccountBank: string;
  FullNameOld: string;
  FullNameENOld: string;
  AddressOld: string;
  GenderOld: string;
  PhoneNoOld: string;
  TaxCodeOld: string;
  ProvinceCodeOld: string;
  CustomerBaseCodeOld: string;
  DateOfBirthOld: string;
  EmailOld: string;
  IDCardTypeOld: string;
  IDCardNoOld: string;
  DistrictCodeOld: string;
  RepresentNameOld: string;
  PositionOld: string;
  CusAccountBankOld: string;
  PlateNoOld: string;
  PlateNo: string;
  CustomerCode: string;
  CarId: string;
  DlsFileName: string;
  DlsFileNameOLD: string;
}

interface Rpt_BCSupportDealerSalesParamData {
  Lst_DLS_Upd?: Rpt_BCSupportDealerSalesRecord[];
  Lst_DLS_DealerCustomer_Upd?: Rpt_BCSupportDealerSalesRecord[];
}
export const useRpt_BCSupportDealerSales = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_BCSupportDealerSales_SearchHQ: async (
      params: Rpt_BCSupportDealerSalesParam
    ): Promise<ApiResponse<Rpt_BCSupportDealerSalesParamData>> => {
      return await apiBase.post<
        Rpt_BCSupportDealerSalesParam,
        ApiResponse<Rpt_BCSupportDealerSalesParamData>
      >("/RptBCSupportDealerSales/SearchHQ", {
        ...params,
      });
    },
    Rpt_BCSupportDealerSales_ExportSearchHQ: async (
      params: Rpt_BCSupportDealerSalesParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_BCSupportDealerSalesParam,
        ApiResponse<string>
      >("/RptBCSupportDealerSales/ExportSearchHQ", {
        ...params,
      });
    },
    // Rpt_BCSupportDealerSales_ExportDetailSearchHQ: async (
    //   params: Rpt_BCSupportDealerSalesParam
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<Rpt_BCSupportDealerSalesParam, ApiResponse<string>>(
    //     "/RptBCSupportDealerSales/ExportDetailSearchHQ",
    //     {
    //       ...params,
    //     }
    //   );
    // },
  };
};
