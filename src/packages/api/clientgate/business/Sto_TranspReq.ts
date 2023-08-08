import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import {
  Sto_TranspReq,
  Sto_TranspReqDtl,
  Sto_TranspReq_Search,
  Sto_TranspReqResponse,
} from "@packages/types/sales/Sto_TranspReq";

import { formatDate } from "@packages/common/date_utils";

export const useSto_TranspReq = (apiBase: AxiosInstance) => {
  return {
    // Số yêu cầu vận tải
    GetSeqForStoTranspReq: async (): Promise<
      ApiResponse<Sto_TranspReqResponse>
    > => {
      return await apiBase.post<string, ApiResponse<Sto_TranspReqResponse>>(
        "/StoTranspReq/GetSeqForStoTranspReq"
      );
    },
    // End số yêu cầu vận tải

    // Tạo yêu cầu vận tải
    CreateHQ: async (
      objSto_TranspReq: Sto_TranspReq,
      selectedCars: any[]
    ): Promise<ApiResponse<Sto_TranspReqResponse>> => {
      const data = {
        Sto_TranspReq: {
          TranspReqNo: objSto_TranspReq.TranspReqNo,
          DealerCode: objSto_TranspReq.DealerCode,
          TransporterCode: objSto_TranspReq.TransporterCode,
        },
        Lst_Sto_TranspReqDtl: selectedCars.map((car) => ({
          //TranspReqType: "CARTRANSPORT",
          RefOrdNo: car.RefOrdNo,
          CarId: car.CarId,
          VIN: car.VIN,
        })),
      };
      return await apiBase.post<any, ApiResponse<Sto_TranspReqResponse>>(
        "/StoTranspReq/CreateHQ",
        {
          strJson: JSON.stringify(data),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    // End tạo yêu cầu vận tải

    // Thông tin chi tiết yêu cầu vận tải
    GetHQByTranspReqNo: async (
      param: Partial<Sto_TranspReq_Search>
    ): Promise<ApiResponse<Sto_TranspReqResponse>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      return await apiBase.post<string, ApiResponse<Sto_TranspReqResponse>>(
        param.FlagDataWH
          ? "/StoTranspReq/GetWHHQByTranspReqNo"
          : "/StoTranspReq/GetHQByTranspReqNo",
        { TranspReqNo: searchParam.TranspReqNo }
      );
    },
    // End thông tin chi tiết yêu cầu vận tải

    // Duyệt
    ApproveHQ: async (transpReqNo: string) => {
      return await apiBase.post<Sto_TranspReqResponse, ApiResponse<string>>(
        "/StoTranspReq/ApproveHQ",
        {
          TranspReqNo: transpReqNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    // End duyệt

    // Từ chối
    RejectHQ: async (transpReqNo: string) => {
      return await apiBase.post<Sto_TranspReqResponse, ApiResponse<string>>(
        "/StoTranspReq/RejectHQ",
        {
          TranspReqNo: transpReqNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    // End từ chối

    // Xóa xe trên lưới danh sách xe (màn hình chi tiết)
    DeleteDtlHQ: async (objSto_TranspReqDtl: Sto_TranspReqDtl) => {
      return await apiBase.post<Sto_TranspReqResponse, ApiResponse<string>>(
        "/StoTranspReq/DeleteDtlHQ",
        {
          TranspReqNo: objSto_TranspReqDtl.TranspReqNo,
          VIN: objSto_TranspReqDtl.VIN,
          //TranspReqType: objSto_TranspReqDtl.TranspReqType, // CARTRANSPORT
          RefOrdNo: objSto_TranspReqDtl.RefOrdNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // End xóa xe trên lưới danh sách xe (màn hình chi tiết)

    // Tìm kiếm yêu cầu vận tải
    SearchHQ: async (
      param: Partial<Sto_TranspReq_Search>
    ): Promise<ApiResponse<Sto_TranspReq>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreatedDateFromTo) {
        searchParam.CreatedDateFrom = param.CreatedDateFromTo[0]
          ? formatDate(param.CreatedDateFromTo[0])
          : "";
        searchParam.CreatedDateTo = param.CreatedDateFromTo[1]
          ? formatDate(param.CreatedDateFromTo[1])
          : "";
      }
      delete searchParam.CreatedDateFromTo;
      return await apiBase.post<
        Partial<Sto_TranspReq_Search>,
        ApiResponse<Sto_TranspReq>
      >(
        param.FlagDataWH
          ? "/StoTranspReq/SearchWHHQ"
          : "/StoTranspReq/SearchHQ",
        {
          ...searchParam,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    // End tìm kiếm yêu cầu vận tải

    // Import excel (import danh sách xe màn hình tạo)
    ImportCarHQ: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/StoTranspReq/ImportCarHQ",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    // End import excel (import danh sách xe màn hình tạo)

    // Export excel template (mẫu file excel import màn hình tạo)
    ExportTemplateCarHQ: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Sto_TranspReq>, ApiResponse<string>>(
        "/StoTranspReq/ExportTemplateCarHQ",
        {}
      );
    },
    // End export excel

    // Export excel
    ExportHQ: async (param: Partial<Sto_TranspReq_Search>) => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreatedDateFromTo) {
        searchParam.CreatedDateFrom = param.CreatedDateFromTo[0]
          ? formatDate(param.CreatedDateFromTo[0])
          : "";
        searchParam.CreatedDateTo = param.CreatedDateFromTo[1]
          ? formatDate(param.CreatedDateFromTo[1])
          : "";
      }
      delete searchParam.CreatedDateFromTo;
      return await apiBase.post<
        Partial<Sto_TranspReq_Search>,
        ApiResponse<string>
      >(
        param.FlagDataWH
          ? "/StoTranspReq/ExportWHHQ"
          : "/StoTranspReq/ExportHQ",
        {
          ...searchParam,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    // End export excel

    // Print
    // PrintTranspReqNo: async (transpReqNo: string, isHQ: boolean)
    PrintTranspReqNo: async (param: Partial<Sto_TranspReq_Search>) => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      return await apiBase.post<Sto_TranspReqResponse, ApiResponse<string>>(
        param.FlagDataWH
          ? "/StoTranspReq/PrintWHHQByTranspReqNo"
          : "/StoTranspReq/PrintHQByTranspReqNo",
        //`/CarDeliveryOrder/Print${isHQ ? "HQ" : "DL"}ByDeliveryOrderNo`,
        {
          TranspReqNo: searchParam.TranspReqNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    // End print
  };
};
