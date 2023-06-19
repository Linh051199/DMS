import { ApiResponse, Mst_InventoryCost, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_InventoryCost = (apiBase: AxiosInstance) => {
  return {
    Mst_InventoryCost_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_InventoryCost>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InventoryCost>>(
        "/MstInventoryCost/Search",
        {
          ...param,
        }
      );
    },

    Mst_InventoryCost_Delete: async (
      key: Partial<Mst_InventoryCost>
    ): Promise<ApiResponse<Mst_InventoryCost>> => {
      return await apiBase.post<string, ApiResponse<Mst_InventoryCost>>(
        "/MstInventoryCost/Delete",
        key
      );
    },

    Mst_InventoryCost_Create: async (
      data: Partial<Mst_InventoryCost>
    ): Promise<ApiResponse<Partial<Mst_InventoryCost>>> => {
      return apiBase.post<
        Partial<Mst_InventoryCost>,
        ApiResponse<Mst_InventoryCost>
      >("/MstInventoryCost/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_InventoryCost_Update: async (
      key: Partial<Mst_InventoryCost>,
      data: Partial<Mst_InventoryCost>
    ): Promise<ApiResponse<Mst_InventoryCost>> => {
      return await apiBase.post("/MstInventoryCost/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_InventoryCost_ExportExcel: async (
      keys: Partial<Mst_InventoryCost>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      console.log("key ", keys);
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_InventoryCost>,
          ApiResponse<string>
        >("/MstInventoryCost/ExportByListCostTypeCodeAndStorageCode", {
          ListCostTypeCodeAndStorageCode: [
            keys
              .map((item) => [item.CostTypeCode, item.StorageCode].join(","))
              .join(";"),
          ].join(","),
          // CostTypeCode: keys.map((item) => item.CostTypeCode).join(","),
          // StorageCode: keys.map((item) => item.StorageCode).join(","),
        });
      } else {
        return await apiBase.post<
          Partial<Mst_InventoryCost>,
          ApiResponse<string>
        >("/MstInventoryCost/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_InventoryCost_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_InventoryCost>,
        ApiResponse<string>
      >("/MstInventoryCost/ExportTemplate");
    },

    Mst_InventoryCost_DeleteMultiple: async (
      data: Partial<Mst_InventoryCost>[]
    ) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InventoryCost>>(
        "/MstInventoryCost/DeleteMultiple",
        {
          strJson: JSON.stringify(
            data.map((item: Partial<Mst_InventoryCost>) => ({
              CostTypeCode: item.CostTypeCode,
              StorageCode: item.StorageCode,
            }))
          ),
        }
      );
    },

    Mst_InventoryCost_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstInventoryCost/Import",
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
