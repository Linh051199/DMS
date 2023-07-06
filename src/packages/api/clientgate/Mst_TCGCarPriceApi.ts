import {
  ApiResponse,
  DeleteBankParam,
  DeleteDealerParam,
  DeleteTCGCarPriceParam,
  FlagActiveEnum,
  Mst_Bank,
  Mst_CarCancelType,
  Mst_TCGCarPrice,
  SearchParam,
  SearchTCGCarPriceParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";
import { formatDate } from "@/packages/common/date_utils";

export const useMst_TCGCarPriceApi = (apiBase: AxiosInstance) => {
  const convertDate = (param: Date) => {
    var date = new Date(param);
    var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    return dateString;
  };
  return {
    Mst_TCGCarPrice_Search: async (
      params: Partial<SearchTCGCarPriceParam>
    ): Promise<ApiResponse<Mst_TCGCarPrice>> => {
      return await apiBase.post<
        Partial<SearchTCGCarPriceParam>,
        ApiResponse<Mst_TCGCarPrice>
      >("/MstTCGCarPrice/Search", {
        ...params,
        EffectiveDate: formatDate(params.EffectiveDate as Date),
      });
    },

    Mst_TCGCarPrice_GetByCarCancelType: async (
      CarCancelType: string
    ): Promise<ApiResponse<Mst_TCGCarPrice>> => {
      return await apiBase.post<string, ApiResponse<Mst_TCGCarPrice>>(
        "/MstTCGCarPrice/GetByCarCancelType",
        {
          BankCode: CarCancelType,
        }
      );
    },

    Mst_TCGCarPrice_Update: async (
      key: Partial<DeleteTCGCarPriceParam>,
      values: Partial<Mst_TCGCarPrice>
    ) => {
      return await apiBase.post<DeleteBankParam, ApiResponse<Mst_TCGCarPrice>>(
        "/MstTCGCarPrice/Update",
        {
          strJson: JSON.stringify({
            ...key,
            ...values,
          }),
          ColsUpd: Object.keys(values),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Mst_TCGCarPrice_GetAllActive: async (): Promise<
      ApiResponse<Mst_TCGCarPrice>
    > => {
      return await apiBase.post<
        Partial<SearchTCGCarPriceParam>,
        ApiResponse<Mst_TCGCarPrice>
      >("/MstTCGCarPrice/GetAllActive");
    },

    Mst_TCGCarPrice_Create: async (values: Partial<Mst_TCGCarPrice>) => {
      console.log(56, convertDate(values?.EffectiveDate as Date));

      return await apiBase.post<DeleteBankParam, ApiResponse<Mst_TCGCarPrice>>(
        "/MstTCGCarPrice/Create",
        {
          strJson: JSON.stringify({
            ...values,
            EffectiveDate: convertDate(values?.EffectiveDate as Date),
          } as Mst_TCGCarPrice),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Mst_TCGCarPrice_Delete: async (SOType: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_TCGCarPrice>>(
        "/MstTCGCarPrice/Delete",
        { ...SOType }
      );
    },

    Mst_TCGCarPrice_DeleteMultiple: async (key: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_TCGCarPrice>>(
        "/MstTCGCarPrice/DeleteMultiple",
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

    Mst_TCGCarPrice_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/MstTCGCarPrice/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_TCGCarPrice_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_TCGCarPrice>, ApiResponse<string>>(
        "/MstTCGCarPrice/ExportTemplate",
        {}
      );
    },

    // Mst_TCGCarPrice_ExportExcel: async (
    //   keyword?: string
    // ): Promise<ApiResponse<any>> => {
    //   {
    //     return await apiBase.post<
    //       Partial<Mst_TCGCarPrice>,
    //       ApiResponse<string>
    //     >("/MstTCGCarPrice/Export", {
    //       KeyWord: keyword,
    //       FlagActive: "",
    //     });
    //   }
    // },

    Mst_TCGCarPrice_ExportExcel: async (data: Partial<Mst_TCGCarPrice>): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<Partial<Mst_TCGCarPrice>, ApiResponse<string>>(
          "/MstTCGCarPrice/Export",
          {
            SOType: data.SOType,
            SpecCode: data.SpecCode,
            EffectiveDate: data.EffectiveDate
          }
        );
      }
    },

    // Mst_TCGCarPrice_ExportByListCode: async (
    //   selectedCodes: any
    // ): Promise<ApiResponse<any>> => {
    //   return await apiBase.post<any, ApiResponse<DeleteTCGCarPriceParam>>(
    //     "/MstTCGCarPrice/ExportByListCode",
    //     {
    //       ListSOType: selectedCodes
    //         .map((item: Partial<Mst_TCGCarPrice>) => item.SOType)
    //         .join(","),
    //       ListSpecCode: selectedCodes
    //         .map((item: Partial<Mst_TCGCarPrice>) => item.SpecCode)
    //         .join(","),
    //       ListEffectiveDate: selectedCodes
    //         .map((item: Partial<Mst_TCGCarPrice>) => item.EffectiveDate)
    //         .join(","),
    //     }
    //   );
    // },

    Mst_TCGCarPrice_ExportByListCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      const result = keys.reduce((prev: any, cur: any, index: any) => {
        return (prev += `${cur.SOType},${cur.SpecCode},${cur.EffectiveDate}${
          index !== keys.length - 1 ? ";" : ""
        }`);
      }, "");
      {
        return await apiBase.post<Partial<Mst_TCGCarPrice>, ApiResponse<string>>(
          "/MstCarPrice/ExportByListCode",
          {
            ListSOTypeAndSpecCodeAndEffectiveDate: result
          }
        );
      }
    },
  };
};
