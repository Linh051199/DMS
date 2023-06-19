import {ApiResponse,} from "@/packages/types";
import {AxiosError, AxiosInstance} from "axios";

export interface RptStatisticHTCBackOrderSpecCode01Param {
  // DateFrom: string;
  // DateTo: string;
  FlagDataWH: 1 | 0
}

export interface RptStatisticHTCBackOrderSpecCode01Record {
  CARID: string;
  SOCODE: string;
  SPECCODE?: string;
  MODELCODE: string;
  COLORCODE: string;
  DEALERCODE: string;
  WORKORDERNOTEMP?: string;
  UNITPRICEINIT: string;
  UNITPRICEACTUAL: string;
  PAYMENTSTATUS: string;
  DELIVERYSTATUS: string;
  MAPVINRANKING: string;
  FLAGALLOWCHANGEVIN: string;
  FLAGACTIVE: string;
  CREATEDDATE: string;
  CREATEDBY: string;
  VIN: string;
  MAPVINDATE: string;
  MAPVINBY: string;
  CARCANCELTYPE: string;
  CARCANCELREMARK: string;
  CARCANCELDATE: string;
  CARCANCELBY: string;
  SELLSTATUS: string;
  SELLDATE: string;
  SELLBY: string;
  LOGLUDATETIME: string;
  LOGLUBY: string;
  TTCSTATUS: string;
  CPTCSTATUS: string;
  MAPVINTYPE: string;
  MAPVINSTORAGE: string;
  FLAGDEALERCONTRACTDMS40: string;
  DLRCTRNO: string;
  FLAGTESTCAR: string;
  ATMVTYPE: string;
  ATMVNO : string;
  ROOTSPEC: string;
  TINVOICEPRICE: string;
  FLAGINVOICEADJ: string;
  COLORCODEROOT: string;
  FLAGMAPVIN: string;
  FLAGEARLYCANCEL: string;
  FLAGISHTC: string;
  MAPBYAREAROOTCODE: string;
  FLAGCARDELIVERYORDER: string;
  PMPDAMOUNTTOTAL: string;
  OSOSOCODE: string;
  CVVIN: string;
  CVVINLISTNO: string;
  CVPRODUCTIONMONTH: string;
  CVWORKORDERNO: string;
  CVSPECCODE: string;
  CVMODELCODE: string;
  CVCOLORCODE: string;
  CVHMCORDERNO: string;
  CVHMCUNITORDERNO: string;
  CVENGINENO: string;
  CVKEYNO: string;
  CVPACKINGLISTNO: string;
  CVSTORAGECODEINIT: string;
  CVSTORAGECODECURRENT: string;
  CVSTOREDATE: string;
  CVFLAGREPAIR: string;
  CVREPAIRREMARK: string;
  CVCQEXPECTEDDATE: string;
  CVCQSTARTDATE: string;
  CVCQENDDATE: string;
  CVCUSTOMSCLEARANCEDATE: string;
  CVCODATE: string;
  CVDOCUMENTSSTATUS: string;
  CVREMARK: string;
  MORTAGEBANKCODE: string;
  MORTAGESTARTDATE: string;
  MORTAGEENDDATE: string;
  TYPECB : string;
  LOAITHUNG : string;
  ACTUALSPEC : string;
  SERIALNO : string;
  CVBILLNO : string;
  CVINVOICENOFACTORY : string;
  CVINVOICEFACTORYDATE : string;
  CVLOCATION : string;
  CVDREXPECTEDDATE : string;
  CVDRFULLDOCDATE : string;
  CVSTATUSMORTAGEEND : string;
  CVFLAGISHTC : string;
  LOAITHUNGTEXT : string;
  PMGDGUARANTEENO : string;
  PMGDGUARANTEEVALUE : string;
  PMGDGUARANTEEVALUEORG : string;
  PMGDGUARANTEEDETAILSTATUS : string;
  PMGDDATESTART : string;
  PMGDDATEEND : string;
  PMGBANKGUARANTEENO : string;
  PMGBANKCODE : string;
  PMGGUARANTEESTATUS : string;
  PMGDATEOPEN : string;
  CTDCDDEALERCONTRACTNO : string;
  CTDCDCARID : string;
  CTDCDUNITPRICE : string;
  CTDCDDEALERCONTRACTNOUSER : string;
  CTDCDCONTRACTSTATUS : string;
  DUTYCOMPLETEDAMOUNT : number;
  DUTYCOMPLETEDDATE : string;
  CILDINVOICENO : string;
  CVCOLOREXTTYPE : string;
  CVCOLOREXTCODE : string;
  CVCOLOREXTNAME : string;
  CVCOLOREXTNAMEVN : string;
  CVCOLORINTCODE : string;
  CVCOLORINTNAME : string;
  CVCOLORINTNAMEVN : string;
  DEPOSITDUTYENDDATE : string;
  OSODAPPROVEDDATE : string;
  DUTYDAYS : number;
  DUTYCOMPLETEDPERCENT : number;
  MCSSPECCODE : string;
  MCSSPECDESCRIPTION : string;
  CCDEALERCODE : string;
  CCDEALERNAME : string;
  DUTYCOMPLETEDPERCENT_000 : number;
  DUTYCOMPLETEDPERCENT_099 : number;
  DUTYCOMPLETEDPERCENT_100 : number;
  DUTYCOMPLETEDPERCENT_099X : number;
  DUTYCOMPLETEDPERCENT_100X : number;
  DUTYCOMPLETEDPERCENT_100_00_15 : number;
  DUTYCOMPLETEDPERCENT_100_16_30 : number;
  DUTYCOMPLETEDPERCENT_100_31_45 : number;
  DUTYCOMPLETEDPERCENT_100_46_60 : number;
  DUTYCOMPLETEDPERCENT_100_61_ZZ : number;
  DUTYCOMPLETEDPERCENT_099_00_15 : number;
  DUTYCOMPLETEDPERCENT_099_16_30 : number;
  DUTYCOMPLETEDPERCENT_099_31_45 : number;
  DUTYCOMPLETEDPERCENT_099_46_60 : number;
  DUTYCOMPLETEDPERCENT_099_61_ZZ : number;
  DUTYCOMPLETEDPERCENT_RANGE : string;
  DUTYDAYS_RANGE : string;
  TOTAL : number;
  REFDATE : string;
  DELIVERYRANGETYPE : string;
  TRANSDELIVERYRANGETYPE : string;
}

interface RptStatisticHTCBackOrderSpecCode01Data {
  Lst_RptStatistic_HTCBackOrder_SpecCode_01: RptStatisticHTCBackOrderSpecCode01Record[] 
}
export const useRptStatisticHTCBackOrderSpecCode01 = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV"

  return {
    RptStatisticHTCBackOrderSpecCode01_SearchHQ: async (params: RptStatisticHTCBackOrderSpecCode01Param): Promise<ApiResponse<RptStatisticHTCBackOrderSpecCode01Data>> => {
          // console.log(96, params)
      return await apiBase.post<RptStatisticHTCBackOrderSpecCode01Param, ApiResponse<RptStatisticHTCBackOrderSpecCode01Data>>("/RptStatisticHTCBackOrderSpecCode01/SearchHQ", {
        ...params,
      });
    },
    // RptStatisticHTCBackOrderSpecCode01_ExportSearchDL: async (params: RptStatisticHTCBackOrderSpecCode01Param): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<RptStatisticHTCBackOrderSpecCode01Param, ApiResponse<string>>("/RptStatisticHTCBackOrderSpecCode01/ExportSearchDL", {
    //     ...params,
    //   });
    // },
    RptStatisticHTCBackOrderSpecCode01_ExportDetailSearchHQ: async (params: RptStatisticHTCBackOrderSpecCode01Param): Promise<ApiResponse<string>> => {
      return await apiBase.post<RptStatisticHTCBackOrderSpecCode01Param, ApiResponse<string>>("/RptStatisticHTCBackOrderSpecCode01/ExportDetailSearchHQ", {
        ...params,
      });
    }
  }
}
