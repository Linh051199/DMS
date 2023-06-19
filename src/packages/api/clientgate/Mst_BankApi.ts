import { ApiResponse, DeleteBankParam, FlagActiveEnum, Mst_Bank, Mst_CarCancelType, Mst_CarColor, SearchBankParam, SearchCarColor, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_BankApi = (apiBase: AxiosInstance) => {
    return {
        Mst_Bank_Search: async (
            params: Partial<SearchBankParam>
        ): Promise<ApiResponse<Mst_Bank>> => {
            return await apiBase.post<
                Partial<SearchBankParam>,
                ApiResponse<Mst_Bank>
            >("/MstBank/Search", {
                ...params,
            });
        },

        // Mst_CarColor_Search: async (
        //     params: any
        // ): Promise<ApiResponse<Mst_CarColor>> => {
        //     return await apiBase.post<SearchCarColor, ApiResponse<Mst_CarColor>>(
        //         "/MstCarColor/Search",
        //         {
        //             ...params,
        //         }
        //     );
        // },

        Mst_Bank_GetByCarCancelType: async (
            CarCancelType: string
        ): Promise<ApiResponse<Mst_Bank>> => {
            return await apiBase.post<string, ApiResponse<Mst_Bank>>(
                "/MstBank/GetByCarCancelType",
                {
                    BankCode: CarCancelType,
                }
            );
        },

        Mst_Bank_Update: async (code: string, values: Partial<Mst_Bank>) => {
            return await apiBase.post<DeleteBankParam, ApiResponse<Mst_Bank>>(
                "/MstBank/Update",
                {
                    strJson: JSON.stringify({
                        BankCode: code,
                        ...values,
                        FlagActive: !!values.FlagActive
                            ? values.FlagActive
                                ? FlagActiveEnum.Active
                                : FlagActiveEnum.Inactive
                            : FlagActiveEnum.Inactive,
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

        Mst_Bank_GetAllActive: async (): Promise<ApiResponse<Mst_Bank>> => {
            return await apiBase.post<
                Partial<SearchBankParam>,
                ApiResponse<Mst_Bank>
            >("/MstBank/GetAllActive");
        },

        Mst_Bank_Create: async (values: Partial<Mst_Bank>) => {
            console.log(values);
            return await apiBase.post<DeleteBankParam, ApiResponse<Mst_Bank>>(
                "/MstBank/Create",
                {
                    strJson: JSON.stringify({
                        ...values,
                        BankName: values.BankName ?? "",
                        FlagPaymentBank: values.FlagPaymentBank ?? FlagActiveEnum.Inactive,
                        FlagMortageBank: values.FlagMortageBank ?? FlagActiveEnum.Inactive,
                        FlagActive: !!values.FlagActive
                            ? values.FlagActive
                                ? FlagActiveEnum.Active
                                : FlagActiveEnum.Inactive
                            : FlagActiveEnum.Inactive,
                        FlagMonitorBank: values.FlagMonitorBank ?? FlagActiveEnum.Inactive,
                        // NumberOfGuaranteeExt: 3.000000000000000e+001,
                        // LogLUDateTime: "2019-09-19 16:16:29",
                        // LogLUBy: "SYSADMIN",
                    } as Mst_Bank),
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
        },

        Mst_Bank_Delete: async (CarCancelType: string) => {
            return await apiBase.post<SearchParam, ApiResponse<Mst_Bank>>(
                "/MstBank/Delete",
                {
                    CarCancelType: CarCancelType,
                }
            );
        },

        Mst_Bank_DeleteMultiple: async (listCarCancelType: any[]) => {
            return await apiBase.post<SearchParam, ApiResponse<Mst_Bank>>(
                "/MstBank/DeleteMultiple",
                {
                    strJson: JSON.stringify(listCarCancelType),
                }
            );
        },

        Mst_Bank_ImportExcel: async (
            file: File
        ): Promise<ApiResponse<any>> => {
            const form = new FormData();
            form.append("file", file); // file is the file you want to upload

            return await apiBase.post<File, ApiResponse<any>>(
                "/MstBank/Import",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        },

        Mst_Bank_ExportTemplate: async (): Promise<ApiResponse<any>> => {
            return await apiBase.post<
                Partial<Mst_Bank>,
                ApiResponse<string>
            >("/MstBank/ExportTemplate", {});
        },

        Mst_Bank_ExportExcel: async (
            keyword?: string
        ): Promise<ApiResponse<any>> => {
            {
                return await apiBase.post<
                    Partial<Mst_Bank>,
                    ApiResponse<string>
                >("/MstBank/Export", {
                    KeyWord: keyword,
                    FlagActive: "",
                });
            }
        },

        Mst_Bank_ExportByListBankCodeType: async (
            keys: string[]
        ): Promise<ApiResponse<any>> => {
            return await apiBase.post<
                Partial<Mst_Bank>,
                ApiResponse<string>
            >("/MstBank/ExportByListBankCode", {
                ListBankCode: keys.join(","),
            });
        },
    };
};
