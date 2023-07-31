import {
  AdminPage,
  BasePivot,
  RptPayment01Page,
  RptStaticGrpDealerInSock02,
  Rpt_BaoCaoMoi,
  Rpt_CarDeliveryOrderExpect,
  Rpt_CarDeliveryOutButNotDutyComplete,
  Rpt_DebitReport02New,
  Rpt_GuaranteeDebit01,
  Rpt_PivotDlrCtmVisit,
  Rpt_PivotDlrTestDriver,
  Rpt_PivotTransPlan,
  Rpt_ReportCarDocReq,
  Rpt_SaleBaoCaoTongHop,
  Rpt_SalesCtmCare01,
  Rpt_SalesDelivery01,
  Rpt_SalesPeriod01,
  Rpt_ShareHTCStock03,
  Rpt_SMCertificate,
  Rpt_StatisticGrpDealer02,
  Rpt_StatisticGrpDealer03,
  Rpt_StatisticGrpDealer03Clone,
  Rpt_StatisticHTCBackOrderDealer01,
  Rpt_StatisticHTCBackOrderSpecCode01,
  Rpt_StatisticHTCBackOrderSpecCode01Pivot,
  Rpt_StatisticHTCStock01,
  Rpt_StatisticHTCStockOut01,
  Rpt_StatisticHTCStockOutOnWay,
  Rpt_StatisticPIInStock,
  Rpt_Statistic_DealerStock_ForSale_Mst,
  Rpt_TonHoSoNganHang,
  Rpt_UpdSalesManByDelear,
  Rpt_WOOrderAndSchedule01,
  Rpt_DlrContractInstock,
  Rpt_Master,
  Rpt_XuatHoSo,
  Rpt_NhapXuatTonTrongKy,
  Rpt_DuKienDongTienTT_ChiTiet,
  Rpt_BLDenHanThanhToan,
  Rpt_NXTQuyenDoiNo,
  Rpt_RevenueHTCInvoice,
  RptSPLSPSupportRetail,
  Rpt_MapVIN,
  Rpt_Statistic_DMS40CarDeliveryOrder,
  Rpt_PmtPaymentDtlByDealer,
  Rpt_MasterData,
  Rpt_BusinessPlanSummary,
  Rpt_Statistic_HTC_CarDocReq,
  Rpt_PivotTransPlanF,
  Rpt_TheoDoiKiemTraDatHang,
  Rpt_BaoCaoXeThieuBBBG,
  Rpt_PivotRearrangeCB,
  Rpt_SalesReport,
  Rpt_DLSDealLoanEUBankMarketSum01,
  Rpt_PmtBankMarketSum01,
} from "@/pages";
import Rpt_DLSDealLoanEUBankMarketSum01_Tabs from "@/pages/reports/Rpt_DLSDealLoanEUBankMarketSum01/list/Rpt_DLSDealLoanEUBankMarketSum01_Tab";

import { RouteItem } from "@/types";
export const reportRoutes: RouteItem[] = [
  {
    key: "report",
    path: "report",
    permissionCode: "MNU_REPORT",
    mainMenuTitle: "report",
    mainMenuKey: "report",
    getPageElement: () => <AdminPage />,
  },
  // {
  //   key: "RptPayment01Page", // Key menu con
  //   path: "admin/rptPayment01", // Address trên browser
  //   subMenuTitle: "RptPayment01", // Title menu con
  //   mainMenuKey: "admin", // Key của menu cha
  //   permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

  // //   getPageElement: () => <RptPayment01Page />,
  // // },
  // {
  //   key: "Rpt_StatisticGrpDealer03", // Key menu con
  //   path: "admin/rptPayment03", // Address trên browser
  //   subMenuTitle: "Rpt_StatisticGrpDealer03", // Title menu con
  //   mainMenuKey: "admin", // Key của menu cha
  //   permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

  //   getPageElement: () => <Rpt_StatisticGrpDealer03 />,
  // },
  {
    key: "BasePivot", // Key menu con
    path: "report/basePivot", // Address trên browser
    subMenuTitle: "Base pivot", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <BasePivot />,
  },
  {
    key: "Rpt_StatisticGrpDealer03Clone", // Key menu con
    path: "report/rptPayment03clone", // Address trên browser
    subMenuTitle: "(R1)Rpt_Payment03clone", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticGrpDealer03Clone />,
  },
  {
    key: "Rpt_StatisticHTCStockOutOnWay", // Key menu con
    path: "report/rpt_StatisticHTCStockOutOnWay", // Address trên browser
    subMenuTitle: "(R1)Rpt_StatisticHTCStockOutOnWay", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCStockOutOnWay />,
  },

  {
    key: "Rpt_StatisticHTCBackOrderSpecCode01Pivot", // Key menu con
    path: "report/rpt_StatisticHTCBackOrderSpecCode01Pivot", // Address trên browser
    subMenuTitle: "(R1)Rpt_StatisticHTCBackOrderSpecCode01Pivot", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCBackOrderSpecCode01Pivot />,
  },
  {
    key: "RptStaticGrpDealerInSock02", // Key menu con
    path: "report/rptStaticGrpDealerInSock02", // Address trên browser
    subMenuTitle: "(R1)Rpt_StaticGrpDealerInSock02", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <RptStaticGrpDealerInSock02 />,
  },
  {
    key: "Rpt_BaoCaoMoi", // Key menu con
    path: "report/rpt_BaoCaoMoi", // Address trên browser
    subMenuTitle: "(R1)Rpt_BaoCaoMoi", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_BaoCaoMoi />,
  },

  {
    key: "Rpt_UpdSalesManByDelear", // Key menu con
    path: "report/rpt_UpdSalesManByDelear", // Address trên browser
    subMenuTitle: "(R1)Rpt_UpdSalesManByDelear", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_UpdSalesManByDelear />,
  },

  {
    key: "Rpt_Statistic_HTC_CarDocReq", // Key menu con
    path: "report/Rpt_Statistic_HTC_CarDocReq", // Address trên browser
    subMenuTitle: "(R1)Rpt_Statistic_HTC_CarDocReq", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_Statistic_HTC_CarDocReq />,
  },

  {
    key: "Rpt_ShareHTCStock03", // Key menu con
    path: "report/Rpt_ShareHTCStock03", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_ShareHTCStock03", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_ShareHTCStock03 />,
  },

  {
    key: "Rpt_PivotRearrangeCB", // Key menu con
    path: "report/Rpt_PivotRearrangeCB", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_PivotRearrangeCB", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PivotRearrangeCB />,
  },

  {
    key: "Rpt_StatisticGrpDealer02", // Key menu con
    path: "report/Rpt_StatisticGrpDealer02", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_StatisticGrpDealer02", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticGrpDealer02 />,
  },
  {
    key: "Rpt_PivotDlrCtmVisit", // Key menu con
    path: "report/Rpt_PivotDlrCtmVisit", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_PivotDlrCtmVisit", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PivotDlrCtmVisit />,
  },
  {
    key: "Rpt_GuaranteeDebit01", // Key menu con
    path: "report/Rpt_GuaranteeDebit01", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_GuaranteeDebit01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_GuaranteeDebit01 />,
  },
  {
    key: "Rpt_SalesDelivery01", // Key menu con
    path: "report/Rpt_SalesDelivery01", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_SalesDelivery01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SalesDelivery01 />,
  },
  {
    key: "Rpt_Statistic_DealerStock_ForSale_Mst", // Key menu con
    path: "report/Rpt_Statistic_DealerStock_ForSale_Mst", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_Statistic_DealerStock_ForSale_Mst", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_Statistic_DealerStock_ForSale_Mst />,
  },

  {
    key: "Rpt_PivotTransPlan", // Key menu con
    path: "report/Rpt_PivotTransPlan", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_PivotTransPlan", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PivotTransPlan />,
  },

  {
    key: "Rpt_PivotTransPlanF", // Key menu con
    path: "report/Rpt_PivotTransPlanF", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_PivotTransPlanF", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PivotTransPlanF />,
  },
  {
    key: "Rpt_CarDeliveryOrderExpect", // Key menu con
    path: "report/Rpt_CarDeliveryOrderExpect", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_CarDeliveryOrderExpect", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_CarDeliveryOrderExpect />,
  },

  {
    key: "Rpt_PivotDlrTestDriver", // Key menu con
    path: "report/Rpt_PivotDlrTestDriver", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_PivotDlrTestDriver", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PivotDlrTestDriver />,
  },
  {
    key: "Rpt_SalesCtmCare01", // Key menu con
    path: "report/Rpt_SalesCtmCare01", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_SalesCtmCare01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SalesCtmCare01 />,
  },
  {
    key: "Rpt_StatisticHTCStockOut01", // Key menu con
    path: "report/Rpt_StatisticHTCStockOut01", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_StatisticHTCStockOut01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCStockOut01 />,
  },
  {
    key: "Rpt_DlrContractInstock", // Key menu con
    path: "report/Rpt_DlrContractInstock", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_DlrContractInstock", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_DlrContractInstock />,
  },

  {
    key: "Rpt_Master", // Key menu con
    path: "report/Rpt_Master", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_Master", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_Master />,
  },
  {
    key: "RptSPLSPSupportRetail", // Key menu con
    path: "report/RptSPLSPSupportRetail", // Address trên browser
    subMenuTitle: "(R1.1)RptSPLSPSupportRetail", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <RptSPLSPSupportRetail />,
  },

  {
    key: "Rpt_MasterData", // Key menu con
    path: "report/Rpt_MasterData", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_MasterData", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_MasterData />,
  },

  {
    key: "Rpt_BusinessPlanSummary", // Key menu con
    path: "report/Rpt_BusinessPlanSummary", // Address trên browser
    subMenuTitle: "(R1.1)Rpt_BusinessPlanSummary", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_BusinessPlanSummary />,
  },

  {
    key: "Rpt_SalesPeriod01", // Key menu con
    path: "report/Rpt_SalesPeriod01", // Address trên browser
    subMenuTitle: "(R2)Rpt_SalesPeriod01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SalesPeriod01 />,
  },
  {
    key: "Rpt_StatisticHTCBackOrderSpecCode01", // Key menu con
    path: "report/Rpt_StatisticHTCBackOrderSpecCode01", // Address trên browser
    subMenuTitle: "(R2)Rpt_StatisticHTCBackOrderSpecCode01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCBackOrderSpecCode01 />,
  },
  {
    key: "Rpt_StatisticHTCStock01", // Key menu con
    path: "report/Rpt_StatisticHTCStock01", // Address trên browser
    subMenuTitle: "(R2)Rpt_StatisticHTCStock01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCStock01 />,
  },
  {
    key: "Rpt_SaleBaoCaoTongHop", // Key menu con
    path: "report/Rpt_SaleBaoCaoTongHop", // Address trên browser
    subMenuTitle: "(R2)Rpt_SaleBaoCaoTongHop", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SaleBaoCaoTongHop />,
  },
  {
    key: "Rpt_StatisticHTCBackOrderDealer01", // Key menu con
    path: "report/Rpt_StatisticHTCBackOrderDealer01", // Address trên browser
    subMenuTitle: "(R2)Rpt_StatisticHTCBackOrderDealer01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCBackOrderDealer01 />,
  },

  {
    key: "Rpt_XuatHoSo", // Key menu con
    path: "report/Rpt_XuatHoSo", // Address trên browser
    subMenuTitle: "(R2)Rpt_XuatHoSo", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_XuatHoSo />,
  },
  {
    key: "Rpt_NhapXuatTonTrongKy", // Key menu con
    path: "report/Rpt_NhapXuatTonTrongKy", // Address trên browser
    subMenuTitle: "(R2)Rpt_NhapXuatTonTrongKy", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_NhapXuatTonTrongKy />,
  },
  {
    key: "Rpt_RevenueHTCInvoice", // Key menu con
    path: "report/Rpt_RevenueHTCInvoice", // Address trên browser
    subMenuTitle: "(R2)Rpt_RevenueHTCInvoice", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_RevenueHTCInvoice />,
  },

  {
    key: "Rpt_DuKienDongTienTT_ChiTiet", // Key menu con
    path: "report/Rpt_DuKienDongTienTT_ChiTiet", // Address trên browser
    subMenuTitle: "(R2)Rpt_DuKienDongTienTT_ChiTiet", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_DuKienDongTienTT_ChiTiet />,
  },
  {
    key: "Rpt_NXTQuyenDoiNo", // Key menu con
    path: "report/Rpt_NXTQuyenDoiNo", // Address trên browser
    subMenuTitle: "(R2)Rpt_NXTQuyenDoiNo", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_NXTQuyenDoiNo />,
  },
  {
    key: "Rpt_BaoCaoXeThieuBBBG", // Key menu con
    path: "report/Rpt_BaoCaoXeThieuBBBG", // Address trên browser
    subMenuTitle: "(R2)Rpt_BaoCaoXeThieuBBBG", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_BaoCaoXeThieuBBBG />,
  },
  {
    key: "Rpt_BLDenHanThanhToan", // Key menu con
    path: "report/Rpt_BLDenHanThanhToan", // Address trên browser
    subMenuTitle: "(R2)Rpt_BLDenHanThanhToan", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_BLDenHanThanhToan />,
  },
  {
    key: "Rpt_CarDeliveryOutButNotDutyComplete", // Key menu con
    path: "report/Rpt_CarDeliveryOutButNotDutyComplete", // Address trên browser
    subMenuTitle: "(R2)Rpt_CarDeliveryOutButNotDutyComplete", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_CarDeliveryOutButNotDutyComplete />,
  },
  {
    key: "Rpt_ReportCarDocReq", // Key menu con
    path: "report/Rpt_ReportCarDocReq", // Address trên browser
    subMenuTitle: "(R2)Rpt_ReportCarDocReq", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_ReportCarDocReq />,
  },

  {
    key: "Rpt_StatisticPIInStock", // Key menu con
    path: "report/Rpt_StatisticPIInStock", // Address trên browser
    subMenuTitle: "(R2)Rpt_StatisticPIInStock", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticPIInStock />,
  },
  {
    key: "Rpt_TonHoSoNganHang", // Key menu con
    path: "report/Rpt_TonHoSoNganHang", // Address trên browser
    subMenuTitle: "(R2)Rpt_TonHoSoNganHang", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_TonHoSoNganHang />,
  },
  {
    key: "Rpt_WOOrderAndSchedule01", // Key menu con
    path: "report/Rpt_WOOrderAndSchedule01", // Address trên browser
    subMenuTitle: "(R2)Rpt_WOOrderAndSchedule01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_WOOrderAndSchedule01 />,
  },
  {
    key: "Rpt_DebitReport02New", // Key menu con
    path: "report/Rpt_DebitReport02New", // Address trên browser
    subMenuTitle: "(R2)Rpt_DebitReport02New", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_DebitReport02New />,
  },
  {
    key: "Rpt_MapVIN", // Key menu con
    path: "report/Rpt_MapVIN", // Address trên browser
    subMenuTitle: "(R2)Rpt_MapVIN", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_MapVIN />,
  },
  {
    key: "Rpt_Statistic_DMS40CarDeliveryOrder", // Key menu con
    path: "report/Rpt_Statistic_DMS40CarDeliveryOrder", // Address trên browser
    subMenuTitle: "(R2)Rpt_Statistic_DMS40CarDeliveryOrder", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_Statistic_DMS40CarDeliveryOrder />,
  },
  {
    key: "Rpt_PmtPaymentDtlByDealer", // Key menu con
    path: "report/Rpt_PmtPaymentDtlByDealer", // Address trên browser
    subMenuTitle: "(R2)Rpt_PmtPaymentDtlByDealer", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PmtPaymentDtlByDealer />,
  },

  {
    key: "Rpt_SMCertificate", // Key menu con
    path: "report/Rpt_SMCertificate", // Address trên browser
    subMenuTitle: "(R3)Rpt_SMCertificate", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SMCertificate />,
  },

  {
    key: "Rpt_TheoDoiKiemTraDatHang", // Key menu con
    path: "report/Rpt_TheoDoiKiemTraDatHang", // Address trên browser
    subMenuTitle: "(R3)Rpt_TheoDoiKiemTraDatHang", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_TheoDoiKiemTraDatHang />,
  },

  {
    key: "Rpt_SalesReport", // Key menu con
    path: "report/Rpt_SalesReport", // Address trên browser
    subMenuTitle: "(R4)Rpt_SalesReport", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SalesReport />,
  },

  {
    key: "Rpt_DLSDealLoanEUBankMarketSum01", // Key menu con
    path: "report/Rpt_DLSDealLoanEUBankMarketSum01", // Address trên browser
    subMenuTitle: "(R4)Rpt_DLSDealLoanEUBankMarketSum01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_DLSDealLoanEUBankMarketSum01_Tabs />,
  },

  {
    key: "Rpt_PmtBankMarketSum01", // Key menu con
    path: "report/Rpt_PmtBankMarketSum01", // Address trên browser
    subMenuTitle: "(R4)Rpt_PmtBankMarketSum01", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PmtBankMarketSum01 />,
  },
];
