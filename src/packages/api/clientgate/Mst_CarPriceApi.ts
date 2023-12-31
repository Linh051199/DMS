import { formatDate } from "@/packages/common/date_utils";
import { ApiResponse, Mst_CarPrice, SearchCarPriceParam, SearchParam} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CarPrice = (apiBase: AxiosInstance) => {
  return {
    Mst_CarPrice_Search: async (
      params: Partial<SearchCarPriceParam>
    ): Promise<ApiResponse<Mst_CarPrice>> => {
      return await apiBase.post<
        Partial<SearchParam>,
        ApiResponse<Mst_CarPrice>
      >("/MstCarPrice/Search", {
        ...params,
        EffectiveDate: formatDate(params.EffectiveDate as Date),
      });
    },

    Mst_CarPrice_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_CarPrice>,
        ApiResponse<Mst_CarPrice>
      >("/MstCarPrice/GetAllActive");
    },

    Mst_CarPrice_GetByCode: async (
      SOType: string,
      SpecCode: string,
      EffectiveDate: string
    ): Promise<ApiResponse<Mst_CarPrice>> => {
      return await apiBase.post<string, ApiResponse<Mst_CarPrice>>(
        "/MstCarPrice/GetByCode",
        {
          SOType: SOType,
          SpecCode: SpecCode,
          EffectiveDate: EffectiveDate,
        }
      );
    },

    Mst_CarPrice_Update: async (
      key: any,
      data: Partial<Mst_CarPrice>
    ): Promise<ApiResponse<Mst_CarPrice>> => {
      return await apiBase.post<
        Partial<Mst_CarPrice>,
        ApiResponse<Mst_CarPrice>
      >("/MstCarPrice/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data),
      });
    },

    Mst_CarPrice_Create: async (
      SOType: Partial<Mst_CarPrice>
    ): Promise<ApiResponse<Mst_CarPrice>> => {
      return await apiBase.post<
        Partial<Mst_CarPrice>,
        ApiResponse<Mst_CarPrice>
      >("/MstCarPrice/Create", {
        strJson: JSON.stringify(SOType),
      });
    },

    Mst_CarPrice_Delete: async (SOType: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarPrice>>(
        "/MstCarPrice/Delete",
        { ...SOType }
      );
    },

    Mst_CarPrice_DeleteMultiple: async (key: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarPrice>>(
        "/MstCarPrice/DeleteMultiple",
        {
          strJson: JSON.stringify(
            key.map(({ SpecCode, SOType, EffectiveDate }) => ({
              SpecCode,
              SOType,
              EffectiveDate,
            }))
          ),
        }
      );
    },

    Mst_CarPrice_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstCarPrice/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_CarPrice_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_CarPrice>, ApiResponse<string>>(
        "/MstCarPrice/ExportTemplate",
        {}
      );
    },

    Mst_CarPrice_Export: async (data: Partial<Mst_CarPrice>): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<Partial<Mst_CarPrice>, ApiResponse<string>>(
          "/MstCarPrice/Export",
          {
            SOType: data.SOType,
            SpecCode: data.SpecCode,
            EffectiveDate: data.EffectiveDate
          }
        );
      }
    },


    Mst_CarPrice_ExportByListSOTypeAndSpecCodeAndEffectiveDate: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      const result = keys.reduce((prev: any, cur: any, index: any) => {
        return (prev += `${cur.SOType},${cur.SpecCode},${cur.EffectiveDate}${
          index !== keys.length - 1 ? ";" : ""
        }`);
      }, "");
      {
        return await apiBase.post<Partial<Mst_CarPrice>, ApiResponse<string>>(
          "/MstCarPrice/ExportByListCode",
          {
            ListSOTypeAndSpecCodeAndEffectiveDate: result
          }
        );
      }
    },
  };
};
