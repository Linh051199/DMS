import {
  ApiResponse,
  Auto_MapVIN_StorageRate,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useAuto_MapVIN_StorageRate = (apiBase: AxiosInstance) => {
  return {
    Auto_MapVIN_StorageRate_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Auto_MapVIN_StorageRate>> => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Auto_MapVIN_StorageRate>
      >("/AutoMapVINStorageRate/Search", {
        ...param,
      });
    },

    Auto_MapVIN_StorageRate_Delete: async (
      key: Object
    ): Promise<ApiResponse<Auto_MapVIN_StorageRate>> => {
      return await apiBase.post<string, ApiResponse<Auto_MapVIN_StorageRate>>(
        "/AutoMapVINStorageRate/Delete",
        {
          ...key,
        }
      );
    },

    Auto_MapVIN_StorageRate_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Auto_MapVIN_StorageRate>
      >("/AutoMapVINStorageRate/DeleteMultiple", {
        strJson: JSON.stringify(data),
      });
    },

    Auto_MapVIN_StorageRate_Create: async (
      data: Partial<Auto_MapVIN_StorageRate>
    ): Promise<ApiResponse<Partial<Auto_MapVIN_StorageRate>>> => {
      return apiBase.post<
        Partial<Auto_MapVIN_StorageRate>,
        ApiResponse<Auto_MapVIN_StorageRate>
      >("/AutoMapVINStorageRate/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Auto_MapVIN_StorageRate_Update: async (
      key: Object,
      data: Partial<Auto_MapVIN_StorageRate>
    ): Promise<ApiResponse<Auto_MapVIN_StorageRate>> => {
      return await apiBase.post("/AutoMapVINStorageRate/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        // ColsUpd: Object.keys(data).join(","),
        ColsUpd: "MBVal,MTVal,MNVal",
      });
    },

    // Auto_MapVIN_StorageRate_ExportExcel: async (
    //   keyword?: string
    // ): Promise<ApiResponse<any>> => {
    //   return await apiBase.post<
    //     Partial<Auto_MapVIN_StorageRate>,
    //     ApiResponse<string>
    //   >("/AutoMapVINStorageRate/Export", {
    //     KeyWord: keyword,
    //     FlagActive: "",
    //   });
    // },

    // Auto_MapVIN_StorageRate_ExportByListCode: async (
    //   keys: any
    // ): Promise<ApiResponse<any>> => {
    //   console.log(81, keys)
    //   return await apiBase.post<
    //     Partial<Auto_MapVIN_StorageRate>,
    //     ApiResponse<string>
    //     >("/AutoMapVINDistributionSumRate/ExportByListCode", {
    //     ListModelCodeAndSpecCodeAndColorExtCode: keys.join(","),
    //   });
    // },

    Auto_MapVIN_StorageRate_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      console.log("key ", keys);
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Auto_MapVIN_StorageRate>,
          ApiResponse<string>
        >("/AutoMapVINDistributionSumRate/ExportByListCode", {
          ListModelCodeAndSpecCodeAndColorExtCode: keys.map((item: any) => {
            return item.ModelCode, item.SpecCode, item.ColorExtCode
          }),
        });
      } else {
        return await apiBase.post<
          Partial<Auto_MapVIN_StorageRate>,
          ApiResponse<string>
        >("/AutoMapVINStorageRate/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },
    Auto_MapVIN_StorageRate_ExportTemplate: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Auto_MapVIN_StorageRate>,
        ApiResponse<string>
      >("/AutoMapVINStorageRate/ExportTemplate");
    },

    Auto_MapVIN_StorageRate_Import: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/AutoMapVINStorageRate/Import",
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
