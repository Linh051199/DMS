import {
  ApiResponse,
  Mst_InvoiceIDHTC,
  Mst_InvoiceIDHTCSearch,
  SearchParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_InvoiceIDHTCApi = (apiBase: AxiosInstance) => {
  return {
    Mst_InvoiceIDHTC_Search: async (
      params: Mst_InvoiceIDHTCSearch
    ): Promise<ApiResponse<Mst_InvoiceIDHTC>> => {
      console.log("params nè", params, {
        ...params,
      });
      return await apiBase.post<
        Mst_InvoiceIDHTCSearch,
        ApiResponse<Mst_InvoiceIDHTC>
      >("/MstInvoiceID/SearchHTC", {
        ...params,
      });
    },
    Mst_InvoiceIDHTC_GetAllActive: async (): Promise<
      ApiResponse<Mst_InvoiceIDHTC>
    > => {
      return await apiBase.post<string, ApiResponse<Mst_InvoiceIDHTC>>(
        "/MstInvoiceID/GetAllActiveHTC"
      );
    },

    Mst_InvoiceIDHTC_Update: async (
      key: any[],
      data: Partial<Mst_InvoiceIDHTC>
    ): Promise<ApiResponse<Mst_InvoiceIDHTC>> => {
      return await apiBase.post<
        Partial<Mst_InvoiceIDHTC>,
        ApiResponse<Mst_InvoiceIDHTC>
      >("/MstInvoiceID/UpdateHTC", {
        strJson: JSON.stringify({
          InvoiceIDCode: key,
          FlagActive: data.FlagActive,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_InvoiceIDHTC_Create: async (
      InvoiceIDCode: Partial<Mst_InvoiceIDHTC>
    ): Promise<ApiResponse<Mst_InvoiceIDHTC>> => {
      return await apiBase.post<
        Partial<Mst_InvoiceIDHTC>,
        ApiResponse<Mst_InvoiceIDHTC>
      >("/MstInvoiceID/CreateHTC", {
        strJson: JSON.stringify(InvoiceIDCode),
      });
    },

    Mst_InvoiceIDHTC_Delete: async (key: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InvoiceIDHTC>>(
        "/MstInvoiceID/DeleteHTC",
        {
          InvoiceIDCode: key,
        }
      );
    },

    Mst_InvoiceIDHTC_DeleteMultiple: async (listCode: any) => {
      const codeDelete = listCode.map((item: any) => ({ InvoiceIDCode: item }));
      return await apiBase.post<SearchParam, ApiResponse<Mst_InvoiceIDHTC>>(
        "/MstInvoiceID/DeleteMultipleHTC",
        {
          strJson: JSON.stringify(codeDelete),
        }
      );
    },

    Mst_InvoiceIDHTC_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstInvoiceID/ImportHTC",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_InvoiceIDHTC_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_InvoiceIDHTC>, ApiResponse<string>>(
        "/MstInvoiceID/ExportTemplate"
      );
    },

    Mst_InvoiceIDHTC_ExportExcel: async (
      keyword?: Partial<Mst_InvoiceIDHTCSearch>
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_InvoiceIDHTC>,
          ApiResponse<string>
        >("/MstInvoiceID/ExportHTC", {
          InvoiceIDCode: keyword?.InvoiceIDCode ?? "",
          CreatedDateFrom: keyword?.CreatedDateFrom ?? "",
          CreatedDateTo: keyword?.CreatedDateTo ?? "",
          FlagActive: keyword?.FlagActive ?? "",
        });
      }
    },

    Mst_InvoiceIDHTC_ExportByListCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_InvoiceIDHTC>,
          ApiResponse<string>
        >("/MstInvoiceID/ExportByListCodeHTC", {
          ListInvoiceIDCode: keys.join(","),
        });
      }
    },
  };
};
