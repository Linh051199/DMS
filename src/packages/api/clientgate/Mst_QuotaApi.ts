import {
  ApiResponse,
  Mst_Quota,
  SearchParam,
  Search_Mst_Quota,
  Search_Mst_Quota_Param,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_Quota = (apiBase: AxiosInstance) => {
  return {
    Mst_Quota_Search: async (
      param: Partial<Search_Mst_Quota_Param>
    ): Promise<ApiResponse<Mst_Quota>> => {
      return await apiBase.post<Search_Mst_Quota_Param, ApiResponse<Mst_Quota>>(
        "/MstQuota/Search",
        {
          FlagActive: "",
          ...param,
        }
      );
    },

    Mst_Quota_Delete: async (
      key: Partial<Mst_Quota>
    ): Promise<ApiResponse<Mst_Quota>> => {
      return await apiBase.post<string, ApiResponse<Mst_Quota>>(
        "/MstQuota/Delete",
        {
          ...key,
        }
      );
    },

    Mst_Quota_Create: async (
      data: Partial<Mst_Quota>
    ): Promise<ApiResponse<Partial<Mst_Quota>>> => {
      return apiBase.post<Partial<Mst_Quota>, ApiResponse<Mst_Quota>>(
        "/MstQuota/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_Quota_Update: async (
      key: Partial<Mst_Quota>,
      data: Partial<Mst_Quota>
    ): Promise<ApiResponse<Mst_Quota>> => {
      return await apiBase.post("/MstQuota/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_Quota_ExportExcel: async (
      condition: Partial<Search_Mst_Quota>,
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      delete condition.Ft_PageIndex;
      delete condition.Ft_PageSize;
      return await apiBase.post<Partial<Mst_Quota>, ApiResponse<string>>(
        "/MstQuota/Export",
        { FlagActive: "", ...condition, KeyWord: "" }
      );
    },

    Mst_Quota_ExportByListCode: async (keys: any[]) => {
      return await apiBase.post<Partial<Mst_Quota>, ApiResponse<string>>(
        "/MstQuota/ExportByListQuotaCode",
        {
          ListQuotaCode: keys
            .map((item: Partial<Mst_Quota>) => {
              return item.QuotaCode;
            })
            .join(","),
          ListDealerCode: keys
            .map((item: Partial<Mst_Quota>) => {
              return item.DealerCode;
            })
            .join(","),
        }
      );
    },

    Mst_Quota_ExportExcel_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_Quota>, ApiResponse<string>>(
        "/MstQuota/ExportTemplate"
      );
    },

    Mst_Quota_DeleteMultiple: async (data: Partial<Mst_Quota>[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Quota>>(
        "/MstQuota/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_Quota_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstQuota/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  };
};
