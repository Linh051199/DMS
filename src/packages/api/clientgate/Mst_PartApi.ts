import {
  ApiResponse,
  Mst_Part,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_Part = (apiBase: AxiosInstance) => {
  return {
    Mst_Part_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_Part>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Part>>(
        "/MstPart/Search",
        {
          ...param,
        }
      );
    },

    Mst_Part_Delete: async (
      key: Partial<Mst_Part>
    ): Promise<ApiResponse<Mst_Part>> => {
      return await apiBase.post<string, ApiResponse<Mst_Part>>(
        "/MstPart/Delete",
        {
          ...key,
        }
      );
    },

    Mst_Part_Create: async (
      data: Partial<Mst_Part>
    ): Promise<ApiResponse<Partial<Mst_Part>>> => {
      return apiBase.post<
        Partial<Mst_Part>,
        ApiResponse<Mst_Part>
      >("/MstPart/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_Part_Update: async (
      key: Partial<Mst_Part>,
      data: Partial<Mst_Part>
    ): Promise<ApiResponse<Mst_Part>> => {
      return await apiBase.post("/MstPart/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_Part_ExportExcel: async (
      keys: Partial<Mst_Part>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_Part>,
          ApiResponse<string>
        >("/MstPart/ExportByListDealerCode", {
          ListPartCode: keys.join(",")
        });
      }

      return await apiBase.post<
        Partial<Mst_Part>,
        ApiResponse<string>
      >("/MstPart/Export", {
        KeyWord: keyword,
        FlagActive: "",
      });
    },

    Mst_Part_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_Part>,
        ApiResponse<string>
      >("/MstPart/ExportTemplate");
    },

    Mst_Part_DeleteMultiple: async (data: string[]) => {
      const condition = data.map((item) => {
        return { PartCode: item }
      })
      return await apiBase.post<SearchParam, ApiResponse<Mst_Part>>(
        "/MstPart/DeleteMultiple",
        {
          strJson: JSON.stringify(condition),
        }
      );
    },

    Mst_Part_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstPart/Import",
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
