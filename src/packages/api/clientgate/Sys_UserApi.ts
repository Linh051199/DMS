import { ApiResponse } from "@/packages/types";
import { AxiosError, AxiosInstance } from "axios";

export interface Sys_UserParam {
  KeyWord: string;
  UserCode: string;
  DealerCode: string;
  BankCode: string;
  TransporterCode: string;
  InsCompanyCode: string;
  FlagActive: string;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}

export interface Sys_UserRecord {
  UserCode: string;
  UserName: string;
  UserPassword: string;
  Email: string;
  DealerCode: string;
  BankCode: string;
  TransporterCode: string;
  InsCompanyCode: string;
  Language: string;
  PhoneNo: string;
  TimeZone: string;
  UserID: string;
  FlagSysAdmin: boolean;
  FlagSysViewer: string;
  FlagActive: boolean;
  LogLUDTimeUTC: string;
  LogLUBy: string;
  md_DealerName: string;
  mb_BankName: string;
  mt_TransporterName: string;
  mic_InsCompanyName: string;
  SUDealerCode: string;
  SUBankCode: string;
  SUFlagActive: string;
  SUTransporterCode: string;
  SUInsCompanyCode: string;
  NetworkID: string;
  UserPasswordNew: string;
  EMail: string;
  MST: string;
  OrganCode: string;
  DepartmentCode: string;
  Position: string;
  VerificationCode: string;
  Avatar: string;
  UUID: string;
  FlagDLAdmin: string;
  FlagNNTAdmin: string;
  OrgID: string;
  CustomerCodeSys: string;
  CustomerCode: string;
  CustomerName: string;
  ACId: string;
  ACAvatar: string;
  ACEmail: string;
  ACLanguage: string;
  ACName: string;
  ACPhone: string;
  ACTimeZone: string;
  mo_OrganCode: string;
  mo_OrganName: string;
  mdept_DepartmentCode: string;
  mdept_DepartmentName: string;
  mnnt_DealerType: string;
  ctitctg_CustomerGrpCode: string;
}

interface Sys_UserData {
  DataList: Sys_UserRecord[];
}
export const useSys_user = (apiBase: AxiosInstance) => {
  return {
    Sys_user_SearchHQ: async (
      params: Partial<Sys_UserParam>
    ): Promise<ApiResponse<Sys_UserData>> => {
      return await apiBase.post<Sys_UserParam, ApiResponse<Sys_UserData>>(
        "/SysUser/SearchHQ",
        {
          ...params,
        }
      );
    },
    Sys_user_GetAllActive: async (): Promise<ApiResponse<Sys_UserData>> => {
      return await apiBase.post<Sys_UserParam, ApiResponse<Sys_UserData>>(
        "/SysUser/GetAllActive",
        {}
      );
    },
    Sys_user_DeleteHQ: async (
      code: any
    ): Promise<ApiResponse<Sys_UserData>> => {
      return await apiBase.post<Sys_UserParam, ApiResponse<Sys_UserData>>(
        "/SysUser/DeleteHQ",
        {
          UserCode: code[0].UserCode,
        }
      );
    },
    Sys_user_DeleteDL: async (): Promise<ApiResponse<Sys_UserData>> => {
      return await apiBase.post<Sys_UserParam, ApiResponse<Sys_UserData>>(
        "/SysUser/DeleteDL",
        {}
      );
    },
    Sys_user_UpdateHQ: async (
      code: any,
      values: any
    ): Promise<ApiResponse<Sys_UserData>> => {
      return await apiBase.post<Sys_UserParam, ApiResponse<Sys_UserData>>(
        "/SysUser/UpdateHQ",
        {
          strJson: JSON.stringify({
            UserCode: code.UserCode,
            FlagActive: values.FlagActive,
          }),
          ColsUpd: Object.keys("FlagActive"),
        }
      );
    },
    Sys_user_CreateHQ: async (
      values: any
    ): Promise<ApiResponse<Sys_UserData>> => {
      return await apiBase.post<Sys_UserParam, ApiResponse<Sys_UserData>>(
        "/SysUser/CreateHQ",
        {
          strJson: JSON.stringify({
            DealerCode: values.Selection === "DealerCode" ? values.Caption : "",
            BankCode: values.Selection === "BankCode" ? values.Caption : "",
            TransporterCode:
              values.Selection === "TransporterCode" ? values.Caption : "",
            InsCompanyCode:
              values.Selection === "InsCompanyCode" ? values.Caption : "",
            FlagSysAdmin: values.FlagSysAdmin ?? "",
            FlagSysViewer: values.FlagSysViewer ?? "",
            TimeZone: values.TimeZone ?? "",
            Language: values.Language ?? "",
            UserID: "",
            UserCode: values.UserCode ?? "",
            UserName: values.UserName ?? "",
            UserPassword: values.UserPassword ?? "",
            PhoneNo: values.PhoneNo ?? "",
            Email: values.Email ?? "",
          }),
        }
      );
    },
  };
};
