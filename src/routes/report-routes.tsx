import {
  AdminPage,
  BasePivot,
  RptPayment01Page,
  RptStaticGrpDealerInSock02,
  Rpt_BaoCaoMoi,
  Rpt_ShareHTCStock03,
  Rpt_StatisticGrpDealer03,
  Rpt_StatisticGrpDealer03Clone,
  Rpt_StatisticHTCBackOrderSpecCode01Pivot,
  Rpt_StatisticHTCStockOutOnWay,
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
    key: "Rpt_ShareHTCStock03", // Key menu con
    path: "report/rpt_ShareHTCStock03", // Address trên browser
    subMenuTitle: "Thông tin kế hoạch giao xe", // Title menu con
    mainMenuKey: "report", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Rpt_ShareHTCStock03 />,
  },
];
