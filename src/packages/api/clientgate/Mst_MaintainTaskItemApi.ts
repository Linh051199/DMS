import { ApiResponse, Mst_CostType, Mst_MaintainTaskItem, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_MaintainTaskItemApi = (apiBase: AxiosInstance) => {
  return {
    Mst_MaintainTaskItem_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_MaintainTaskItem>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_MaintainTaskItem>>(
        "/MstMaintainTaskItem/Search",
        {
          ...param,
        }
      );
    },

    Mst_MaintainTaskItem_Delete: async (
      key: Partial<Mst_MaintainTaskItem>
    ): Promise<ApiResponse<Mst_MaintainTaskItem>> => {
      return await apiBase.post<string, ApiResponse<Mst_MaintainTaskItem>>(
        "/MstMaintainTaskItem/Delete",
        {
          ...key,
        }
      );
    },

    Mst_MaintainTaskItem_Create: async (
      data: Partial<Mst_MaintainTaskItem>
    ): Promise<ApiResponse<Partial<Mst_MaintainTaskItem>>> => {
      console.log(data)
      return apiBase.post<
        Partial<Mst_MaintainTaskItem>,
        ApiResponse<Mst_MaintainTaskItem>
      >("/MstMaintainTaskItem/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_MaintainTaskItem_Update: async (
      key: Partial<Mst_MaintainTaskItem>,
      data: Partial<Mst_MaintainTaskItem>
    ): Promise<ApiResponse<Mst_MaintainTaskItem>> => {
      return await apiBase.post("/MstMaintainTaskItem/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_MaintainTaskItem_ExportExcel: async (
      keys: Partial<Mst_MaintainTaskItem>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_MaintainTaskItem>,
          ApiResponse<string>
        >("/MstMaintainTaskItem/ExportByListDealerCode", {
          // ListDealerCode: keys
          //   .map((item: Partial<Mst_MaintainTaskItem>) => item.DealerCode)
          //   .join(","),
          // ListModelCode: keys
          //   .map((item: Partial<Mst_MaintainTaskItem>) => item.ModelCode)
          //   .join(","),
        });
      }

      return await apiBase.post<
        Partial<Mst_MaintainTaskItem>,
        ApiResponse<string>
      >("/MstMaintainTaskItem/Export", {
        KeyWord: keyword,
        FlagActive: "",
      });
    },

    Mst_MaintainTaskItem_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_MaintainTaskItem>,
        ApiResponse<string>
      >("/MstMaintainTaskItem/ExportTemplate");
    },

    Mst_MaintainTaskItem_DeleteMultiple: async (data: string[]) => {
      data.map((item) => {
        console.log(item)
      })
      return await apiBase.post<SearchParam, ApiResponse<Mst_MaintainTaskItem>>(
        "/MstMaintainTaskItem/DeleteMultiplee",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_MaintainTaskItem_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstMaintainTaskItem/Import",
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
