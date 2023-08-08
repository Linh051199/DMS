import { ApiResponse, } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface RptStatisticGrpDealerInStock02Param {
    FlagDataWH: 1 | 0
}

export interface Rpt_StatisticGrpDealerInStock02Record {
    CCDEALERCODE: string,
    CCDEALERNAME: string,
    MODELCODE: string,
    TOTAL: number,
}

interface Rpt_StatisticGrpDealerInStock02Data {
    Lst_RptStatistic_GrpDealerInStock02: Rpt_StatisticGrpDealerInStock02Record[]
}

export const useRptStaticGrpDealerInSock02 = (apiBase: AxiosInstance) => {
    apiBase.defaults.headers["DealerCode"] = "HTC"
    return {
        RptStaticGrpDealerInSock02_SearchHQ: async (params: RptStatisticGrpDealerInStock02Param): Promise<ApiResponse<Rpt_StatisticGrpDealerInStock02Data>> => {
            return await apiBase.post<RptStatisticGrpDealerInStock02Param, ApiResponse<Rpt_StatisticGrpDealerInStock02Data>>("/RptStatisticGrpDealerInStock02/SearchHQ", {
                ...params,
            });
        },
        RptStaticGrpDealerInSock02_SearchDL: async (params: RptStatisticGrpDealerInStock02Param): Promise<ApiResponse<Rpt_StatisticGrpDealerInStock02Data>> => {
            return await apiBase.post<RptStatisticGrpDealerInStock02Param, ApiResponse<Rpt_StatisticGrpDealerInStock02Data>>("/RptStatisticGrpDealerInStock02/SearchDL", {
                ...params,
            });
        },
        RptStaticGrpDealerInSock02_ExportDetailSearchHQ: async (params: RptStatisticGrpDealerInStock02Param): Promise<ApiResponse<string>> => {
            return await apiBase.post<RptStatisticGrpDealerInStock02Param, ApiResponse<string>>("/RptStatisticGrpDealerInStock02/ExportDetailSearchDL", {
                ...params,
            });
        }
    }
}
