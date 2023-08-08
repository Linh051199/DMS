import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Rpt_PivotQLDatHangTraHangParam {
  OrderNo: string;
  ModelCode: string;
  CreateDTimeFrom: string;
  CreateDTimeTo: string;
  OrderStatusQtyReturn: string;
  ApprDTimeFrom: string;
  ApprDTimeTo: string;
  OrdMonth: string;
  FlagDataWH: 1 | 0;
}

export interface Rpt_PivotQLDatHangTraHang {
  ORDERNO: string; // số đơn hàng
  MODELCODE: string; //
  COLORCODE: string; //
  SPECCODE: string; //
  QTYORDMONTHN0: string; // Số lượng đặt hàng
  QTYAPPRMONTHN0: string; // Số lượng xác nhận
  CREATEDTIME: string; // ngày tạo
  APPRDTIME: string; // ngày duyệt đơn hàng
  ORDMONTH: string; // tháng đặt hàng
  APPRMONTH: string; // tháng XNĐH
  MODELNAME: string; //
  SPECDESCRIPTION: string; // mô tả xe
  COLORNAME: string; //
  OCNCODE: string; // // OCN
  QTYVINPL: string; // Số lượng xe trả (nhập kho HTC)
  QTYREMAIN: string; // Số lượng xe chưa trả
  TTDonHang: string; // tính trạng đơn hàng
}

interface RptPivotQLDatHangTraHangParamData {
  Lst_Rpt_Statistic_MnfPlOrder: Rpt_PivotQLDatHangTraHang[];
}
export const useRptPivotQLDatHangTraHang = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    RptPivotQLDatHangTraHang_SearchHQ: async (
      params: Rpt_PivotQLDatHangTraHangParam
    ): Promise<ApiResponse<RptPivotQLDatHangTraHangParamData>> => {
      return await apiBase.post<
        Rpt_PivotQLDatHangTraHang,
        ApiResponse<RptPivotQLDatHangTraHangParamData>
      >("/RptPivotQLDatHangTraHang/SearchHQ", {
        ...params,
      });
    },
    RptPivotQLDatHangTraHang_ExportSearchHQ: async (
      params: Rpt_PivotQLDatHangTraHangParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Rpt_PivotQLDatHangTraHang, ApiResponse<string>>(
        "/RptPivotQLDatHangTraHang/ExportSearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
