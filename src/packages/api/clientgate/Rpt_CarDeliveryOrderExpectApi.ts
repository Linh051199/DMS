import { ApiResponse } from "@/packages/types"
import { AxiosInstance } from "axios"

export interface Rpt_CarDeliveryOrderExpectParam {
    FlagDataWH: 1 | 0,
    FlagTTCoc: 1 | 0
}


export interface Rpt_CarDeliveryOrderExpectRecord {
    CARID: string,
    SOCODE: string,
    SPECCODE: string,
    MODELCODE: string,
    COLORCODE: string,
    DEALERCODE: string,
    WORKORDERNOTEMP: string,
    UNITPRICEINIT: number,
    UNITPRICEACTUAL: number,
    PAYMENTSTATUS: string,
    DELIVERYSTATUS: string,
    MAPVINRANKING: number,
    FLAGALLOWCHANGEVIN: string,
    FLAGACTIVE: string,
    CREATEDDATE: string,
    CREATEDBY: string,
    VIN: string,
    MAPVINDATE: string,
    MAPVINBY: string,
    CARCANCELTYPE: string,
    CARCANCELREMARK: string,
    CARCANCELDATE: string,
    CARCANCELBY: string,
    SELLSTATUS: string,
    SELLDATE: string,
    SELLBY: string,
    LOGLUDATETIME: string,
    LOGLUBY: string,
    TTCSTATUS: string,
    CPTCSTATUS: string,
    MAPVINTYPE: string,
    MAPVINSTORAGE: string,
    FLAGDEALERCONTRACTDMS40: string,
    DLRCTRNO: string,
    FLAGTESTCAR: string,
    ATMVTYPE: string,
    ATMVNO: string,
    ROOTSPEC: string,
    TINVOICEPRICE: string,
    FLAGINVOICEADJ: string,
    COLORCODEROOT: string,
    FLAGMAPVIN: string,
    FLAGEARLYCANCEL: string,
    FLAGISHTC: string,
    MAPBYAREAROOTCODE: string,
    FLAGCARDELIVERYORDER: string,
    CTDCDDEALERCONTRACTNOUSER: string,
    OSOSOCODE: string,
    OSODAPPROVEDDATE: string,
    OSODDEPOSITDUTYENDDATE: string,
    MCSSPECCODE: string,
    MCSSPECDESCRIPTION: string,
    MCCCOLORCODE: string,
    MCCCOLOREXTCODE: string,
    MCCCOLOREXTNAME: string,
    MCCCOLOREXTNAMEVN: string,
    CVMODELCODE: string,
    CVACTUALSPEC: string,
    CVVIN: string,
    CVCOLORCODE: string,
    CVSTORAGECODECURRENT: string,
    CVSTOREDATE: string,
    CVCQSTARTDATE: string,
    CVCQEXPECTEDDATE: string,
    CVCQENDDATE: string,
    CVCODATE: string,
    CVDOCUMENTSSTATUS: string,
    CVDOCDELIVERYREQDATE: string,
    CVTAXPAYMENTDATE: string,
    CVMORTAGEENDDATE: string,
    PMGBANKGUARANTEENO: string,
    PMGBANKCODE: string,
    PMGGUARANTEESTATUS: string,
    PMGDATEOPEN: string,
    PMGDGUARANTEENO: string,
    PMGDGUARANTEEVALUE: string,
    PMGDGUARANTEEVALUEORG: string,
    PMGDGUARANTEEDETAILSTATUS: string,
    PMGDDATESTART: string,
    PMGDDATEEND: string,
    CTPLPORTCODE: string,
    CTPLSHIPPINGDATESTART: string,
    CTPLSHIPPINGDATEEND: string,
    CTPLSHIPPINGDATEENDEXPECTED: string,
    CTPLCREATEDDATE: string,
    CTPLCREATEDBY: string,
    CDODSTORAGECODE: string,
    CDODDELIVERYSTARTDATE: string,
    CDODDELIVERYOUTDATE: string,
    CDODDELIVERYENDDATE: string,
    CDODDELIVERYENDDATE1: string,
    MDDEALERCODE: string,
    MDDEALERNAME: string,
    CDOEXPECTEDDATEDF: string,
    CDOEXPECTEDDATEPM: string,
    PMPDAMOUNTTOTAL: number,
    DUTYCOMPLETEDDATE: string,
    CILDINVOICENO: string,
    DUTYCOMPLETEDDATETTC_TTBL: string,
    OSODDEPOSITDUTYENDDATE1: string,
    OSODREQUESTEDDATE: string,
    OSODAPPROVEDDATE1: string,
    CDODSTORAGECODE1: string,
    CDODDELIVERYSTARTDATE1: string,
    CDODDELIVERYOUTDATE1: string,
    CDODDELIVERYENDDATE2: string,
    PMPDAMOUNTTOTAL_GUARANTEE: string,
    PAYMENT_DEPOSIT_PERCENT: string,
    GRT_PERCENT: string,
    DUTYCOMPLETED_PERCENT: string,
    DUTYCOMPLETED_PERCENT_AF: string,
    GRT_PAYMENT_LEFT: string
}

interface Rpt_CarDeliveryOrderExpectData {
    Lst_Rpt_CarDeliveryOrderExpect: Rpt_CarDeliveryOrderExpectRecord[]
}

export const useRpt_CarDeliveryOrderExpectData = (apiBase: AxiosInstance) => {
    apiBase.defaults.headers["DealerCode"] = "HTC"
    return {
        Rpt_CarDeliveryOrderExpectData_SearchHQ: async (params: Rpt_CarDeliveryOrderExpectParam): Promise<ApiResponse<Rpt_CarDeliveryOrderExpectData>> => {
            console.log(34, params);
            return await apiBase.post<Rpt_CarDeliveryOrderExpectParam, ApiResponse<Rpt_CarDeliveryOrderExpectData>>("RptCarDeliveryOrderExpect/SearchHQ", {
                ...params,
            });
        },
        Rpt_CarDeliveryOrderExpectData_ExportDetailSearchHQ: async (params: Rpt_CarDeliveryOrderExpectParam): Promise<ApiResponse<string>> => {
            return await apiBase.post<Rpt_CarDeliveryOrderExpectParam, ApiResponse<string>>("/RptPivotRearrangeCB/ExportDetailSearchHQ", {
                ...params,
            });
        }
    }
}
