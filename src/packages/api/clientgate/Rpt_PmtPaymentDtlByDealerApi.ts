import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_PmtPaymentDtl_ByDealerParam {
  DealerCodeInput: string;
  RptYear: Date | string;
  RptDateStart: Date | string;
  RptDateEnd: Date | string;
  FlagIsHTC: "HTC" | "HTV";
  FlagDataWH: 1 | 0;
}

export interface Rpt_PmtPaymentDtl_ByDealerRecord {
  DEALERCODE: string; //Mã đại lý
  CARID: string; //Mã xe
  MCS_SPECDESCRIPTION: string; //Mô tả xe
  OSOD_SOCODE: string | any; //Số đơn hàng
  PERIODBEGIN_OSOD_APPROVEDDATE: string; //Ngày xác nhận ĐH
  PERIODBEGIN_CDOD_DELIVERYOUTDATE: string; //Ngày xuất kho
  PERIODBEGIN_VHI_HTCINVOICEDATE: string; //Ngày xuất hóa đơn
  PERIODBEGIN_CV_MORTAGEENDDATE: string; //Ngày giao hồ sơ
  GiaCCDK: any; //Giá cuối cùng
  TOTALAMONTBEGINBEFOREDATEAPPR: string; //Đã thanh toán tới đầu kỳ (Ngày tiền về TT< Ngày xác nhận ĐH)
  TOTALAMONTBEGINAFTERDATEAPPR: string; //Đã thanh toán tới đầu kỳ (Ngày tiền về TT>=Ngày xác nhận ĐH)
  PERIODBEGIN_NOPMT: any; //Còn Phải thu đầu kỳ
  PERIODIN_APPROVEDDATE: string; //Ngày xác nhận ĐH
  PERIODIN_CDOD_DELIVERYOUTDATE: string; //Ngày xuất kho
  PERIODIN_VHI_HTCINVOICEDATE: string; //Ngày xuất HĐ
  PERIODIN_CV_MORTAGEENDDATE: string; //Ngày giao hồ sơ
  GiaCCPS: string; //Giá xe cuối cùng
  TOTALAMOUNTIN: string; //Thanh toán trong kỳ
  PERIODEND_OSOD_APPROVEDDATE: string; //Ngày xác nhận ĐH
  PERIODEND_CDOD_DELIVERYOUTDATE: string; //Ngày xuất kho
  PERIODEND_VHI_HTCINVOICEDATE: string; //Ngày xuất HĐ
  PERIODEND_CV_MORTAGEENDDATE: string; //Ngày giao hồ sơ
  GiaCCCK: any; //Giá xe cuối cùng
  PERIODEND_TOTALPMTCOC: any | string; //Cọc đã TT tới cuối kỳ
  PERIODEND_TOTALAMONTGUARANTEE: any | string; //Bảo lãnh đã TT tới cuối kỳ
  PERIODEND_TOTALPMTCOC_VTC: any | string; //Cọc đã thanh toán tới cuối kỳ (VTC)
  PERIODEND_TOTALPMTCOC_VV: any | string; //Cọc đã thanh toán tới cuối kỳ (VV)
  DEPOSITDUTYENDDATE: string; //Ngày hết hạn TT cọc
  PERIODEND_NODATESTARTGUARANTEEVALUE_NOHTCINVOICEDATE: string | number; //Số tiền
  PERIODEND_NODATESTARTGUARANTEEVALUE_HTCINVOICEDATE: string | number; //Số tiền
  PERIODEND_GUARANTEEVALUE: string | number; //Số tiền
  DATESTART: string; //Ngày hiệu lực
  DATEEXPIRED: string; //Ngày hết hạn
  PERIODEND_GUARANTEEVALUETCG: string | number; //Số tiền
  LOANSUPPORTDATEEND: string; //Hạn thanh toán
}

interface Rpt_PmtPaymentDtl_ByDealerData {
  Lst_Rpt_PmtPaymentDtl_ByDealer: Rpt_PmtPaymentDtl_ByDealerRecord[];
}
export const useRpt_PmtPaymentDtl_ByDealer = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_PmtPaymentDtlByDealer_SearchHQ: async (
      params: Rpt_PmtPaymentDtl_ByDealerParam
    ): Promise<ApiResponse<Rpt_PmtPaymentDtl_ByDealerData>> => {
      return await apiBase.post<
        Rpt_PmtPaymentDtl_ByDealerParam,
        ApiResponse<Rpt_PmtPaymentDtl_ByDealerData>
      >("/RptPmtPaymentDtlByDealer/SearchHQ", {
        ...params,
      });
    },
    Rpt_PmtPaymentDtlByDealer_ExportSearchHQ: async (
      params: Rpt_PmtPaymentDtl_ByDealerParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_PmtPaymentDtl_ByDealerParam,
        ApiResponse<string>
      >("/RptPmtPaymentDtlByDealer/ExportSearchHQ", {
        ...params,
      });
    },
    // Rpt_PmtPaymentDtlByDealer_ExportDetailSearchHQ: async (
    //   params: Rpt_PmtPaymentDtl_ByDealer
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<
    //     Rpt_PmtPaymentDtl_ByDealer,
    //     ApiResponse<string>
    //   >("/RptNXTQuyenDoiNo/ExportDetailSearchHQ", {
    //     ...params,
    //   });
    // },
  };
};
