import { ApiResponse, Mst_CarAllocationByArea, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CarAllocationByAreaApi = (apiBase: AxiosInstance) => {
  return {
    Mst_CarAllocationByArea_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_CarAllocationByArea>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarAllocationByArea>>(
        "/MstCarAllocationByArea/Search",
        {
          ...params,
        }
      );
    },
    Mst_CarAllocationByArea_GetByCarCancelType: async (
      CarCancelType: string
    ): Promise<ApiResponse<Mst_CarAllocationByArea>> => {
      return await apiBase.post<string, ApiResponse<Mst_CarAllocationByArea>>(
        "/MstCarAllocationByArea/GetByCarCancelType",
        {
          CarCancelType: CarCancelType,
        }
      );
    },

    Mst_CarAllocationByArea_Update: async (
      key: string,
      data: Partial<Mst_CarAllocationByArea>
    ): Promise<ApiResponse<Mst_CarAllocationByArea>> => {
      return await apiBase.post<
        Partial<Mst_CarAllocationByArea>,
        ApiResponse<Mst_CarAllocationByArea>
      >("/MstCarAllocationByArea/Update", {
        strJson: JSON.stringify({
          CarCancelType: key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_CarAllocationByArea_Create: async (
      CarCancelType: Partial<Mst_CarAllocationByArea>
    ): Promise<ApiResponse<Mst_CarAllocationByArea>> => {
      return await apiBase.post<
        Partial<Mst_CarAllocationByArea>,
        ApiResponse<Mst_CarAllocationByArea>
      >("/MstCarAllocationByArea/Create", {
        strJson: JSON.stringify(CarCancelType),
      });
    },

    Mst_CarAllocationByArea_Delete: async (key: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarAllocationByArea>>(
        "/MstCarAllocationByArea/Delete",
        {
          ModelCode: key.ModelCode,
          SpecCode: key.SpecCode
        }
      );
    },

    Mst_CarAllocationByArea_DeleteMultiple: async (listCarCancelType: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarAllocationByArea>>(
        "/MstCarAllocationByArea/DeleteMultiple",
        {
          strJson: JSON.stringify(listCarCancelType),
        }
      );
    },

    Mst_CarAllocationByArea_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstCarAllocationByArea/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_CarAllocationByArea_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_CarAllocationByArea>,
        ApiResponse<string>
      >("/MstCarAllocationByArea/ExportTemplate", {});
    },

    Mst_CarAllocationByArea_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_CarAllocationByArea>,
          ApiResponse<string>
        >("/MstCarAllocationByArea/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_CarAllocationByArea_ExportByListCarCancelType: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      console.log(114, keys)
      const condition = keys.map((item: any) => {
        return {
          ModelCode: item.ModelCode,
          SpecCode: item.SpecCode
        };
      })
      return await apiBase.post<
        Partial<Mst_CarAllocationByArea>,
        ApiResponse<string>
      >("/MstCarAllocationByArea/ExportByListCarCancelType", {
        ...condition
      });
    },
  };
};
