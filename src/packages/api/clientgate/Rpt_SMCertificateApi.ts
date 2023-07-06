import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_SMCertificateParam {
  HRMonth?: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_SMCertificateRecord {
  AreaCode: string; // mã vùng
  AreaName: string; // tên vùng
  DealerCode: string; // mã đại lý
  DealerName: string; // tên đại lý
  HRMonth: string; // tháng
  Rate: string; // tỉ lệ nhân viên có chứng chỉ
  SMType: string; // loại  nhân viên
  TotalQtySM: string; // số lượng nhân viên
  TotalQtySMOtherNone: string; // số lượng nhân viên có chứng chỉ
}

interface Rpt_SMCertificateData {
  Lst_Rpt_SMCertificate: Rpt_SMCertificateRecord[];
}
export const useRpt_SMCertificate = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_SMCertificate_SearchHQ: async (
      params: Rpt_SMCertificateParam
    ): Promise<ApiResponse<Rpt_SMCertificateData>> => {
      return await apiBase.post<
        Rpt_SMCertificateParam,
        ApiResponse<Rpt_SMCertificateData>
      >("/RptSMCertificate/SearchHQ", {
        ...params,
      });
    },
    Rpt_SMCertificate_ExportSearchHQ: async (
      params: Rpt_SMCertificateParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_SMCertificateParam, ApiResponse<string>>(
        "/RptSMCertificate/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
    Rpt_SMCertificate_ExportSearchDetailHQ: async (
      params: Rpt_SMCertificateParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_SMCertificateParam, ApiResponse<string>>(
        "/RptSMCertificate/ExportDetailSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
