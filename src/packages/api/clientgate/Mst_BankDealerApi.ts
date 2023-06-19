import { ApiResponse, Mst_BankDealer, SearchParam, Search_Mst_BankDealer } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_BankDealer = (apiBase: AxiosInstance) => {
  return {
    Mst_BankDealer_Search: async (
      params: Partial<SearchParam>
    ): Promise<ApiResponse<Mst_BankDealer>> => {
      return await apiBase.post<
        Partial<SearchParam>,
        ApiResponse<Mst_BankDealer>
      >("/MstBankDealer/Search", {
        ...params,
      });
    },

    Mst_BankDealer_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_BankDealer>,
        ApiResponse<Mst_BankDealer>
      >("/MstBankDealer/GetAllActive");
    },

    Mst_BankDealer_GetByBankCodeAndDealerCode: async (
      BankCode: string,
      DealerCode:string
    ): Promise<ApiResponse<Mst_BankDealer>> => {
      return await apiBase.post<string, ApiResponse<Mst_BankDealer>>(
        "/MstBankDealer/GetByBankCodeAndDealerCode",
        {
          BankCode: BankCode,
          DealerCode: DealerCode
        }
      );
    },

    Mst_BankDealer_Update: async (
      key: any,
      data: Partial<Mst_BankDealer>
    ): Promise<ApiResponse<Mst_BankDealer>> => {
      
      return await apiBase.post<
        Partial<Mst_BankDealer>,
        ApiResponse<Mst_BankDealer>
      >("/MstBankDealer/Update", {
        strJson: JSON.stringify({
          BankCode:key.BankCode,
          DealerCode: key.DealerCode,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(','),
      });
    },

    Mst_BankDealer_Create: async (
      values: Partial<Mst_BankDealer>
    ): Promise<ApiResponse<Mst_BankDealer>> => {
      return await apiBase.post<
        Partial<Mst_BankDealer>,
        ApiResponse<Mst_BankDealer>
      >("/MstBankDealer/Create", {
        strJson: JSON.stringify({
          ...values
        }),
      });
    },

    Mst_BankDealer_Delete: async (BankCode: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_BankDealer>>(
        "/MstBankDealer/Delete",
        { ...BankCode }
      );
    },

    Mst_BankDealer_DeleteMultiple: async (key: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_BankDealer>>(
        "/MstBankDealer/DeleteMultiple",
        {
          strJson: JSON.stringify(key
          ),
        }
      );
    },
    Mst_BankDealer_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstBankDealer/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_BankDealer_ExportTemplate: async (

    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_BankDealer>, ApiResponse<string>>(
        "/MstBankDealer/ExportTemplate",
        {}
      );
    },

    // Mst_BankDealer_Export:async (
    // params: any
    
    // ): Promise<ApiResponse<any>> => {
    //   {
    //     return await apiBase.post<
    //       Partial<Mst_BankDealer>,
    //       ApiResponse<string>
    //     >("/MstBankDealer/Export", {
        
    //       params
    //     });
    //   }
    // },
    Mst_BankDealer_Export: async (
      searchCondition?: Partial<Search_Mst_BankDealer>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_BankDealer>>(
        "/MstBankDealer/Export",
        {
          // KeyWord: "",
          // FlagActive: "1",
          DealerCode: searchCondition?.DealerCode ?? "",
          BankCode: searchCondition?.BankCode ?? "",
          FlagActive: searchCondition?.FlagActive ?? "1",
        }
      );
    },

    Mst_BankDealer_ExportByListBankCodeAndDealerCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      const result = keys.reduce((prev: any, cur: any, index: any) => {
        return (prev += `${cur.BankCode},${cur.DealerCode}${
          index !== keys.length - 1 ? ";" : ""
        }`);
      }, "");
     
      {
        return await apiBase.post<Partial<Mst_BankDealer>, ApiResponse<string>>(
          "/MstBankDealer/ExportByListBankCodeAndDealerCode",
          {
            ListBankCodeAndDealerCode: result,
          }
        );
      }
    },
  };
};
