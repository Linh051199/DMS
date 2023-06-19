import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface useRptPivotDlrTestDriverParam {
  DriverDateFrom: any;
  DriverDateTo: any;
  FlagDataWH: 1 | 0;
}

export interface useRptPivotDlrTestDriverRecord {
  Lst_RptPivot_Dlr_TestDriver: {
    DRIVETESTCODE: string;
    CUSTOMERCODE: string;
    DEALERCODE: string;
    DRIVERLICENSENO: string;
    MODELCODE: string;
    GENDER: string;
    RANGEAGECODE: string;
    FLAGACTIVE: string;
    CREATEDDATE: string;
    CREATEDBY: string;
    DRIVEDTIME: string;
    APPROVEDDATE: string;
    APPROVEDBY: string;
    DRIVERTESTSTATUS: string;
    LOGLUDATETIME: string;
    LOGLUBY: string;
    DRVTESTPLATENO: string;
    DRIVERTESTTYPE: string;
    DRIVERTESTGROUP: string;
    DEALERNAME: string;
    MODELNAME: string;
    RANGEAGENAME: string;
    DDCFULLNAME: string;
    DDCFULLNAMEEN: string;
    DDCADDRESS: string;
    DDCPHONENO: string;
    DDCTAXCODE: string;
    DDCEMAIL: string;
    DDCIDCARDNO: string;
    DDCIDCARDTYPE: string;
    TOTAL: number;
    GENDERNAME: string;
  };
}

export const useRpt_PivotDlrTestDriver = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_PivotDlrTestDriver_SearchHQ: async (
      params: useRptPivotDlrTestDriverParam
    ): Promise<ApiResponse<useRptPivotDlrTestDriverRecord>> => {
      return await apiBase.post<
        useRptPivotDlrTestDriverParam,
        ApiResponse<useRptPivotDlrTestDriverRecord>
      >("/RptPivotDlrTestDriver/SearchHQ", {
        ...params,
      });
    },
    Rpt_PivotDlrTestDriver_SearchDL: async (
      params: useRptPivotDlrTestDriverParam
    ): Promise<ApiResponse<useRptPivotDlrTestDriverRecord>> => {
      return await apiBase.post<
        useRptPivotDlrTestDriverParam,
        ApiResponse<useRptPivotDlrTestDriverRecord>
      >("/RptPivotDlrTestDriver/SearchDL", {
        ...params,
      });
    },
    Rpt_PivotDlrTestDriver_ExportSearchDL: async (
      params: useRptPivotDlrTestDriverParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        useRptPivotDlrTestDriverParam,
        ApiResponse<string>
      >("/RptPivotDlrTestDriver/ExportDetailSearchDL", {
        ...params,
      });
    },
    Rpt_PivotDlrTestDriver_ExportDetailSearchHQ: async (
      params: useRptPivotDlrTestDriverParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        useRptPivotDlrTestDriverParam,
        ApiResponse<string>
      >("/RptPivotDlrTestDriver/ExportDetailSearchHQ", {
        ...params,
      });
    },
  };
};
