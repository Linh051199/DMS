import {
  ApiResponse,
  DeleteDealerParam,
  FlagActiveEnum,
  Mst_BankAccount,
  SearchDealerParam,
  SearchParam,
  Search_Mst_BankAccount,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_BankAccount = (apiBase: AxiosInstance) => {
  return {
    Mst_BankAccount_Search: async (
      param: Partial<Search_Mst_BankAccount>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >("/MstBankAccount/Search", {
        ...param,
      });
    },
    Mst_BankAccount_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >("/MstBankAccount/GetAllActive");
    },

    Mst_Bank_GetAllActiveInBankCode: async (): Promise<
      ApiResponse<Mst_BankAccount>
    > => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >("/MstBank/GetAllActive");
    },

    Mst_BankAccount_Delete: async (
      key: Partial<Mst_BankAccount>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<string, ApiResponse<Mst_BankAccount>>(
        "/MstBankAccount/Delete",
        {
          ...key,
        }
      );
    },

    Mst_BankAccount_Create: async (values: Partial<Mst_BankAccount>) => {
      return await apiBase.post<
        DeleteDealerParam,
        ApiResponse<Mst_BankAccount>
      >(
        "/MstBankAccount/Create",
        {
          strJson: JSON.stringify({
            ...values,
            AccountNo: values.AccountNo,
            BankCode: values.BankCode,
            DealerCode: values.DealerCode,
            AccountName: values.AccountName,
            // FlagAccGrtClaim: "0",
            FlagAccGrtClaim: values.FlagAccGrtClaim ?? FlagActiveEnum.Inactive,
            // FlagActive: "1",
            FlagActive: !!values.FlagActive
              ? values.FlagActive
                ? FlagActiveEnum.Active
                : FlagActiveEnum.Inactive
              : FlagActiveEnum.Inactive,
            AccountNoHTC: null,
            md_DealerName: values.md_DealerName ?? "",
            mb_BankName: values.mb_BankName,
          } as any),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Mst_BankAccount_Update: async (
      key: Partial<Mst_BankAccount>,
      data: Partial<Mst_BankAccount>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post("/MstBankAccount/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    // ----------------EXPORT BẢN GHI ĐANG FLAGACTIVE = '1' ------------------------
    Mst_BankAccount_Export: async (
      searchCondition?: Partial<Search_Mst_BankAccount>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_BankAccount>>(
        "/MstBankAccount/Export",
        {
          // KeyWord: "",
          // FlagActive: "1",
          DealerCode: searchCondition?.DealerCode ?? "",
          AccountNo: searchCondition?.AccountNo ?? "",
          KeyWord: searchCondition?.KeyWord ?? "",
          FlagActive: searchCondition?.FlagActive ?? "1",
        }
      );
    },

    // ------------------EXPORT NHIỀU BẢN GHI KHI TICK CHỌN COLUMNS----------------
    Mst_BankAccount_ExportByListBankCode: async (
      selectedCodes: {
        AccountNo: string;
        BankCode: string;
      }[]
    ): Promise<ApiResponse<any>> => {
      let data = selectedCodes.reduce(
        (accumulator: any, currentValue: any) => {
          accumulator.ListAccountNo.push(currentValue.AccountNo);
          accumulator.ListBankCode.push(currentValue.BankCode);
          return accumulator;
        },
        {
          ListAccountNo: [],
          ListBankCode: [],
        }
      );

      data.ListAccountNo = data.ListAccountNo.join(",");
      data.ListBankCode = data.ListBankCode.join(",");
      return await apiBase.post<any, ApiResponse<Mst_BankAccount>>(
        "/MstBankAccount/ExportByListAccountNo",
        data
      );
    },

    Mst_BankAccount_Export_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_BankAccount>, ApiResponse<string>>(
        "/MstBankAccount/ExportTemplate"
      );
    },

    Mst_BankAccount_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_BankAccount>>(
        "/MstBankAccount/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_BankAccount_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstBankAccount/Import",
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
