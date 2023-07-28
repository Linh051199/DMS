import { ApiResponse, } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface RptStatisticGrpDealerInStock02Param {
    FlagDataWH: 1 | 0
}

export interface Rpt_StatisticGrpDealerInStock02Record {
    CCDEALERCODE: string,
    CCDEALERNAME: string,
    CARID: string,
    OSODAPPROVEDDATE: string,
    OSODAPPROVEDMONTH: string,
    MODELCODE: string,
    CVCOLOREXTCODE: string,
    CVCOLOREXTNAMEVN: string,
    CVCOLORINTCODE: string,
    CVCOLORINTNAMEVN: string,
    UNITPRICEACTUAL: number,
    CDODDELIVERYOUTDATE: string,
    CDODDELIVERYENDDATE: string,
    STATUSCHUNG: string,
    CVPRODTMONTH: string,
    CVPRODTYEAR: string,
    DUTYCOMPLETEDPERCENT_RANGE: string,
    OSOSOCODE: string,
    MCSSPECDESCRIPTION: string,
    DUTYDAYSDELIVERYENDDATE_RANGE: string,
    DELIVERYRANGETYPE: string,
    PMGDGUARANTEEVALUE: number,
    PMPDAMOUNTTOTAL_DEPOSIT: number,
    TOTAL: number,
    AREACODEDEALER: string,
    AREANAMEDEALER: string,
    HTCSTAFFINCHARGE: string,
    CVCODATE: string,
    COYEAR: string,
    DOSOR_ORDERMONTH: string,
    CCFLAGMAPVIN: string,
    SPECCODE: string,
    SPECDESCRIPTION: string,
    MODELNAME: string
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
