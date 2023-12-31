import {
  ApiResponse,
  DeleteCarColorParam,
  Mst_CarColor,
  SearchCarColor,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CarColorApi = (apiBase: AxiosInstance) => {
  return {
    Mst_CarColor_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_CarColor>,
        ApiResponse<Mst_CarColor>
      >("/MstCarColor/GetAllActive");
    },

    Mst_CarColor_GetByModelCode: async (ModelCode: string) => {
      return await apiBase.post<
        Partial<Mst_CarColor>,
        ApiResponse<Mst_CarColor>
      >("/MstCarColor/GetByModelCode", {
        ModelCode: ModelCode,
        FlagActive: "",
      });
    },
    Mst_CarColor_Search: async (
      params: any
    ): Promise<ApiResponse<Mst_CarColor>> => {
      return await apiBase.post<SearchCarColor, ApiResponse<Mst_CarColor>>(
        "/MstCarColor/Search",
        {
          ...params,
        }
      );
    },
    Mst_CarColor_Update: async (code: any, values: Partial<Mst_CarColor>) => {
      console.log("code, values:", code, Object.keys(values).join(","));
      return await apiBase.post<DeleteCarColorParam, ApiResponse<Mst_CarColor>>(
        "/MstCarColor/Update",
        {
          strJson: JSON.stringify({
            ...values,
            ModelCode: code.ModelCode,
            ColorCode: code.ColorCode,
          }),
          ColsUpd: Object.keys(values).join(","),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Mst_CarColor_Create: async (values: Partial<Mst_CarColor>) => {
      const data = {
        ...values,
        ModelCode: values.ModelCode ?? "",
        ColorCode: values.ColorCode ?? "",
        ColorExtType: values.ColorExtType ?? "",
        ColorExtCode: values.ColorExtCode ?? "",
        ColorExtName: values.ColorExtName ?? "",
        ColorExtNameVN: values.ColorExtNameVN ?? "",
        ColorIntCode: values.ColorIntCode ?? "",
        ColorIntName: values.ColorIntName ?? "",
        ColorIntNameVN: values.ColorIntNameVN ?? "",
        ColorFee: values.ColorFee ?? "",
        Remark: values.Remark ?? "",
      };
      return await apiBase.post<DeleteCarColorParam, ApiResponse<Mst_CarColor>>(
        "/MstCarColor/Create",
        {
          strJson: JSON.stringify(data as Mst_CarColor),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Mst_CarColor_Delete_Multiple: async (dataKey: string[]) => {
      return await apiBase.post<SearchCarColor, ApiResponse<Mst_CarColor>>(
        "/MstCarColor/DeleteMultiple",
        {
          strJson: JSON.stringify(
            dataKey.map((item: any) => ({
              ModelCode: item.ModelCode,
              ColorCode: item.ColorCode,
            }))
          ),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Mst_CarColor_Delete: async (
      code: DeleteCarColorParam
    ): Promise<ApiResponse<Mst_CarColor>> => {
      return await apiBase.post<DeleteCarColorParam, ApiResponse<Mst_CarColor>>(
        "/MstCarColor/Delete",
        {
          ModelCode: code.ModelCode,
          ColorCode: code.ColorCode,
        }
      );
    },
    Mst_CarColor_Export: async (
      searchCondition: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_CarColor>>(
        "/MstCarColor/Export",
        {
          FlagActive: "",
          ModelCode: "",
          ColorCode: "",
          ColorExtNameVn: "",
          ColorIntNameVN: "",
        }
      );
    },
    Mst_CarColor_Export_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_CarColor>>(
        "/MstCarColor/ExportTemplate"
      );
    },
    Mst_CarColor_ExportByListCarColorCode: async (
      selectedCodes: string[]
    ): Promise<ApiResponse<any>> => {
      const codeExport = selectedCodes
        .map((item: any) => [item.ModelCode, item.ColorCode].join(","))
        .join(";");
      return await apiBase.post<any, ApiResponse<any>>(
        "/MstCarColor/ExportByListCode",
        {
          ListModelCodeAndColorCode: codeExport,
        }
      );
    },
    Mst_CarColor_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstCarColor/Import",
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
