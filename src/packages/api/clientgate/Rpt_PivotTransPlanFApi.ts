import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_PivotTransPlanFParam {
    FlagDataWH: 1 | 0;
    ExpectedDateFrom: string;
    SDMDlvStartDateFrom: string;
    SDMDlvStartDateTo: string;
    ExpectedDateTo: string;

}

export interface Rpt_PivotTransPlanFRecord {
    Lst_Rpt_PivotTransPlan: {
        VIN: string;
        MODELCODE: string;
        NGAYCHUNGCHUNG: string;
        MCMMODELNAME: string;
        MDDEALERNAME: string;
        MDDEALERCODE: string;
        STORAGECODE: string;
        TRANSPORTERCODE: string;
        TRANSPORTERNAME: string;
        TENTINHGIAO: string;
        TENTINHNHAN: string;
        TENHUYENGIAO: string;
        TENHUYENNHAN: string;
        TINHGIAO_HUYENGIAO: string;
        TINHNHAN_HUYENNHAN: string;
        FLAG_CHUNGCHUNG: string;
        TOTAL: string;
        NGAYVT: string;
    };
}

export const useRpt_PivotTransPlanF = (apiBase: AxiosInstance) => {
    apiBase.defaults.headers["DealerCode"] = "HTV";
    return {
        Rpt_PivotTransPlanF_SearchHQ: async (
            params: Rpt_PivotTransPlanFParam
        ): Promise<ApiResponse<Rpt_PivotTransPlanFRecord>> => {
            return await apiBase.post<
                Rpt_PivotTransPlanFParam,
                ApiResponse<Rpt_PivotTransPlanFRecord>
            >("/RptPivotTransPlanF/SearchHQ", {
                ...params,
            });
        },
        Rpt_PivotTransPlanF_ExportSearchDL: async (
            params: Rpt_PivotTransPlanFParam
        ): Promise<ApiResponse<string>> => {
            return await apiBase.post<Rpt_PivotTransPlanFParam, ApiResponse<string>>(
                "/RptPivotTransPlanF/ExportSearchDL",
                {
                    ...params,
                }
            );
        },
        Rpt_PivotTransPlanF_ExportDetailSearchHQ: async (
            params: Rpt_PivotTransPlanFParam
        ): Promise<ApiResponse<string>> => {
            return await apiBase.post<Rpt_PivotTransPlanFParam, ApiResponse<string>>(
                "/RptPivotTransPlanF/ExportDetailSearchHQ",
                {
                    ...params,
                }
            );
        },
    };
};
