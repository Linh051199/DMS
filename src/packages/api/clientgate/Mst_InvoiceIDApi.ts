import {
  ApiResponse,
  Mst_InvoiceIDSearch,
  Mst_InvoiceIDType,
  SearchParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_InvoiceIDApi = (apiBase: AxiosInstance) => {
  return {
    Mst_InvoiceID_Search: async (
      params: Mst_InvoiceIDSearch
    ): Promise<ApiResponse<Mst_InvoiceIDType>> => {
      return await apiBase.post<
        Mst_InvoiceIDSearch,
        ApiResponse<Mst_InvoiceIDType>
      >("/MstInvoiceID/SearchTCG", {
        ...params,
      });
    },
    Mst_InvoiceID_GetAllActive: async (): Promise<
      ApiResponse<Mst_InvoiceIDType>
    > => {
      return await apiBase.post<string, ApiResponse<Mst_InvoiceIDType>>(
        "/MstInvoiceID/GetAllActiveTCG"
      );
    },

    Mst_InvoiceID_Update: async (
      key: any[],
      data: Partial<Mst_InvoiceIDType>
    ): Promise<ApiResponse<Mst_InvoiceIDType>> => {
      return await apiBase.post<
        Partial<Mst_InvoiceIDType>,
        ApiResponse<Mst_InvoiceIDType>
      >("/MstInvoiceID/UpdateTCG", {
        strJson: JSON.stringify({
          InvoiceIDCode: key,
          FlagActive: data.FlagActive,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_InvoiceID_Create: async (
      InvoiceIDCode: Partial<Mst_InvoiceIDType>
    ): Promise<ApiResponse<Mst_InvoiceIDType>> => {
      return await apiBase.post<
        Partial<Mst_InvoiceIDType>,
        ApiResponse<Mst_InvoiceIDType>
      >("/MstInvoiceID/CreateTCG", {
        strJson: JSON.stringify(InvoiceIDCode),
      });
    },

    Mst_InvoiceID_Delete: async (key: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InvoiceIDType>>(
        "/MstInvoiceID/DeleteTCG",
        {
          InvoiceIDCode: key,
        }
      );
    },

    Mst_InvoiceID_DeleteMultiple: async (listCode: any) => {
      const codeDelete = listCode.map((item: any) => ({ InvoiceIDCode: item }));
      return await apiBase.post<SearchParam, ApiResponse<Mst_InvoiceIDType>>(
        "/MstInvoiceID/DeleteMultipleTCG",
        {
          strJson: JSON.stringify(codeDelete),
        }
      );
    },

    Mst_InvoiceID_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstInvoiceID/ImportTCG",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_InvoiceID_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_InvoiceIDType>,
        ApiResponse<string>
      >("/MstInvoiceID/ExportTemplateTCG", {});
    },

    Mst_InvoiceID_ExportExcel: async (
      keyword?: Partial<Mst_InvoiceIDSearch>
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_InvoiceIDType>,
          ApiResponse<string>
        >("/MstInvoiceID/ExportTCG", {
          InvoiceIDCode: keyword?.InvoiceIDCode ?? "",
          CreatedDateFrom: keyword?.CreatedDateFrom ?? "",
          CreatedDateTo: keyword?.CreatedDateTo ?? "",
          FlagActive: keyword?.FlagActive ?? "",
        });
      }
    },

    Mst_InvoiceID_ExportByListCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_InvoiceIDType>,
          ApiResponse<string>
        >("/MstInvoiceID/ExportByListCodeTCG", {
          ListInvoiceIDCode: keys.join(","),
        });
      }
    },
  };
};
