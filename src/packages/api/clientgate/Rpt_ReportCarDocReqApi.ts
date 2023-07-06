import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_ReportCarDocReqParam {
  DateFrom: string;
  DateTo: string;
  Status: "A" | "P" | "";
  VinNo: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_ReportCarDocReqRecord {
  INDEX: string;
  VIN: string;
  MODELCODE: string;
  ENGINENO: string;
  MORTAGEENDDATE: string;
  BILLNO: any;
  STATUSMORTAGEEND: string;
  DRFULLDOCDATE: string;
  DREXPECTEDDATE: string;
  REDEEMDATE: string;
  TYPECB: string;
  LOAITHUNG: any;
  ACTUALSPEC: string;
  SERIALNO: string;
  LOCATION: any;
  INSPECTIONDATE: any;
  DECLARATIONNO: any;
  DOCDELIVERYREQDATE: any;
  TCGUNITPRICE: string;
  TAXPAYMENTDATE: string;
  FGFORMNO: string;
  ISSUEDDATE: string;
  QCNO: string;
  CLEARANCEFORMNO: string;
  CLEARANCEFORMDATE: string;
  CABINCERTIFICATENO: any;
  CABINCONO: any;
  CABININVOICENO: any;
  CABININVOICEDATE: any;
  CABINCERTIFICATEDATE: any;
  TINVOICEPRICE: string;
  FLAGSELLOSHTC: string;
  FLAGINVOICEADJ: any;
  HANDOVERBANKCODE: string;
  INVOICEFACTORYSEARCH: string;
  FLAGISHTC: string;
  INVOICENOTRANSFERRED: any;
  INVOICETRANSFERREDDATE: any;
  INVOICETRANSFERREDSEARCH: any;
  BATTERYNO: string;
  FLAGDOCREQ: string;
  AVNCODE: string;
  AVNDATE: string;
  AVNDATEIMPORT: any;
  INVOICESPECNAME: string;
  PRODUCTIONYEARACTUAL: any;
  VINYEAR: any;
  CDRLDRLISTCODE: string;
  CDRLCREATEDDATE: string;
  PGDDATESTART: string;
  PGDGUARANTEENO: string;
  CDRDDRDTLSTATUS: string;
  MBBANKNAME: string;
  MCSSPECDESCRIPTION: string;
}

interface Rpt_ReportCarDocReqData {
  Lst_Rpt_ReportCarDocReq: Rpt_ReportCarDocReqRecord[];
}
export const useRpt_ReportCarDocReq = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_ReportCarDocReq_SearchHQ: async (
      params: Rpt_ReportCarDocReqParam
    ): Promise<ApiResponse<Rpt_ReportCarDocReqData>> => {
      return await apiBase.post<
        Rpt_ReportCarDocReqParam,
        ApiResponse<Rpt_ReportCarDocReqData>
      >("/RptReportCarDocReq/SearchHQ", {
        ...params,
      });
    },
    Rpt_ReportCarDocReq_ExportSearchHQ: async (
      params: Rpt_ReportCarDocReqParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_ReportCarDocReqParam, ApiResponse<string>>(
        "/RptReportCarDocReq/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
