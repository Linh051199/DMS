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
} from "@/pages";

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
    subMenuTitle: "Báo cáo tồn kho chi tiết nội bộ", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticGrpDealer03Clone />,
  },
  {
    key: "Rpt_StatisticHTCStockOutOnWay", // Key menu con
    path: "report/rpt_StatisticHTCStockOutOnWay", // Address trên browser
    subMenuTitle: "Báo cáo xe trên đường", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCStockOutOnWay />,
  },

  {
    key: "Rpt_StatisticHTCBackOrderSpecCode01Pivot", // Key menu con
    path: "report/rpt_StatisticHTCBackOrderSpecCode01Pivot", // Address trên browser
    subMenuTitle: "Báo cáo pivot back order", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCBackOrderSpecCode01Pivot />,
  },
  {
    key: "RptStaticGrpDealerInSock02", // Key menu con
    path: "report/rptStaticGrpDealerInSock02", // Address trên browser
    subMenuTitle: "Báo cáo tồn kho ĐL", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <RptStaticGrpDealerInSock02 />,
  },
  {
    key: "Rpt_BaoCaoMoi", // Key menu con
    path: "report/rpt_BaoCaoMoi", // Address trên browser
    subMenuTitle: "Báo cáo tổng hợp tình trạng xe chưa bán của đại lý", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_BaoCaoMoi />,
  },

  {
    key: "Rpt_UpdSalesManByDelear", // Key menu con
    path: "report/rpt_UpdSalesManByDelear", // Address trên browser
    subMenuTitle: "Báo cáo theo dõi cập nhật nhân viên", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_UpdSalesManByDelear />,
  },
  {
    key: "Rpt_StatisticHTCBackOrderSpecCode01", // Key menu con
    path: "report/Rpt_StatisticHTCBackOrderSpecCode01", // Address trên browser
    subMenuTitle: "Báo cáo back order theo đặc tả xe", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCBackOrderSpecCode01 />,
  },
  {
    key: "Rpt_StatisticHTCStock01", // Key menu con
    path: "report/Rpt_StatisticHTCStock01", // Address trên browser
    subMenuTitle: "Báo cáo tồn kho theo tuổi tồn", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCStock01 />,
  },
  {
    key: "Rpt_SaleBaoCaoTongHop", // Key menu con
    path: "report/Rpt_SaleBaoCaoTongHop", // Address trên browser
    subMenuTitle: "Báo cáo Tổng hợp", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SaleBaoCaoTongHop />,
  },
  {
    key: "Rpt_StatisticHTCBackOrderDealer01", // Key menu con
    path: "report/Rpt_StatisticHTCBackOrderDealer01", // Address trên browser
    subMenuTitle: "Báo cáo back order theo đại lý", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCBackOrderDealer01 />,
  },
  {
    key: "Rpt_CarDeliveryOutButNotDutyComplete", // Key menu con
    path: "report/Rpt_CarDeliveryOutButNotDutyComplete", // Address trên browser
    subMenuTitle: "Báo cáo xe đã xuất nhưng chưa hoàn thành nghĩa vụ giao xe", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_CarDeliveryOutButNotDutyComplete />,
  },
  {
    key: "Rpt_ReportCarDocReq", // Key menu con
    path: "report/Rpt_ReportCarDocReq", // Address trên browser
    subMenuTitle: "Báo cáo ĐGNT", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_ReportCarDocReq />,
  },
  {
    key: "Rpt_SMCertificate", // Key menu con
    path: "report/Rpt_SMCertificate", // Address trên browser
    subMenuTitle: "Báo cáo chứng chỉ", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SMCertificate />,
  },
  {
    key: "Rpt_StatisticPIInStock", // Key menu con
    path: "report/Rpt_StatisticPIInStock", // Address trên browser
    subMenuTitle: "Báo cáo tồn PI", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticPIInStock />,
  },
  {
    key: "Rpt_TonHoSoNganHang", // Key menu con
    path: "report/Rpt_TonHoSoNganHang", // Address trên browser
    subMenuTitle: "Báo cáo tồn hồ sơ ngân hàng", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_TonHoSoNganHang />,
  },
  {
    key: "Rpt_DebitReport02New", // Key menu con
    path: "report/Rpt_DebitReport02New", // Address trên browser
    subMenuTitle: "Báo cáo công nợ", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_DebitReport02New />,
  },

  {
    key: "Rpt_SalesPeriod01", // Key menu con
    path: "report/Rpt_SalesPeriod01", // Address trên browser
    subMenuTitle: "Báo cáo kinh doanh theo kỳ", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SalesPeriod01 />,
  },
  {
    key: "Rpt_ShareHTCStock03", // Key menu con
    path: "report/rpt_ShareHTCStock03", // Address trên browser
    subMenuTitle: "Thông tin kế hoạch giao xe", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_ShareHTCStock03 />,
  },
  {
    key: "Rpt_StatisticGrpDealer02", // Key menu con
    path: "report/Rpt_StatisticGrpDealer02", // Address trên browser
    subMenuTitle: "Báo cáo bán hàng chi tiết DL nội bộ", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticGrpDealer02 />,
  },
  {
    key: "Rpt_PivotDlrCtmVisit", // Key menu con
    path: "report/Rpt_PivotDlrCtmVisit", // Address trên browser
    subMenuTitle: "Báo cáo Pivot thống kê khách thăm Showroom", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PivotDlrCtmVisit />,
  },
  {
    key: "Rpt_GuaranteeDebit01", // Key menu con
    path: "report/Rpt_GuaranteeDebit01", // Address trên browser
    subMenuTitle: "Báo cáo phải thu bảo lãnh", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_GuaranteeDebit01 />,
  },
  {
    key: "Rpt_SalesDelivery01", // Key menu con
    path: "report/Rpt_SalesDelivery01", // Address trên browser
    subMenuTitle: "Báo cáo giao xe", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SalesDelivery01 />,
  },
  {
    key: "Rpt_Statistic_DealerStock_ForSale_Mst", // Key menu con
    path: "report/Rpt_Statistic_DealerStock_ForSale_Mst", // Address trên browser
    subMenuTitle: "Báo cáo phân tích bán hàng và tồn kho của DL", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_Statistic_DealerStock_ForSale_Mst />,
  },

  {
    key: "Rpt_PivotTransPlan", // Key menu con
    path: "report/Rpt_PivotTransPlan", // Address trên browser
    subMenuTitle: "Báo cáo Pivot kế hoạch vận tải", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PivotTransPlan />,
  },

  {
    key: "Rpt_CarDeliveryOrderExpect", // Key menu con
    path: "report/Rpt_CarDeliveryOrderExpect", // Address trên browser
    subMenuTitle: "Báo cáo dự kiến có lệnh xuất xe", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_CarDeliveryOrderExpect />,
  },

  {
    key: "Rpt_PivotDlrTestDriver", // Key menu con
    path: "report/Rpt_PivotDlrTestDriver", // Address trên browser
    subMenuTitle: "Báo cáo Pivot thống kê khách thử lái xe", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_PivotDlrTestDriver />,
  },
  {
    key: "Rpt_SalesCtmCare01", // Key menu con
    path: "report/Rpt_SalesCtmCare01", // Address trên browser
    subMenuTitle: "Báo cáo thống kê xe được kiểm chứng", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_SalesCtmCare01 />,
  },
  {
    key: "Rpt_StatisticHTCStockOut01", // Key menu con
    path: "report/Rpt_StatisticHTCStockOut01", // Address trên browser
    subMenuTitle: "Báo cáo LXX, xuất kho", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_StatisticHTCStockOut01 />,
  },
];
