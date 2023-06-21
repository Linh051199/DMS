import {
  AdminPage,
  DealerManagementPage,
  DealerManagementPageClone,
  ProvinceManagementPage,
  ProvinceManagement,
  PortManagementPage,
  PortTypeManagementPage,
  BasePage,
  DistrictPage,
  ModelPage,
  OrderTypePage,
  AreaPage,
  DealerTypePage,
  TransporterCarPage,
} from "@/pages";
import { RouteItem } from "@/types";

export const adminRoutes: RouteItem[] = [
  {
    key: "admin",
    path: "admin",
    mainMenuTitle: "admin",
    mainMenuKey: "admin",
    permissionCode: "MNU_ADMIN",
    getPageElement: () => <AdminPage />,
  },
  {
    key: "PortTypeManagement", // Key menu con
    path: "admin/base", // Address trên browser
    subMenuTitle: "BasePage", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT_TYPE",

    getPageElement: () => <BasePage />,
  },
  {
    key: "dealerManagement",
    path: "admin/dealer",
    subMenuTitle: "dealerManagement",
    mainMenuKey: "admin",
    permissionCode: "MNU_ADMIN_DEALER",
    getPageElement: () => <DealerManagementPage />,
  },
  {
    key: "dealerManagement",
    path: "admin/dealerClone",
    subMenuTitle: "Quản lý đại lý (Clone)",
    mainMenuKey: "admin",
    permissionCode: "MNU_ADMIN_DEALER",
    getPageElement: () => <DealerManagementPageClone />,
  },
  {
    key: "provinceManagement", // Key menu con
    path: "admin/province", // Address trên browser
    subMenuTitle: "provinceManagement", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PROVINCE",
    getPageElement: () => <ProvinceManagementPage />,
  },
  {
    key: "provinceManagement", // Key menu con
    path: "admin/provinceClone", // Address trên browser
    subMenuTitle: "Quản lý Tỉnh/Thành Phố (Clone)", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PROVINCE",
    getPageElement: () => <ProvinceManagement />,
  },
  {
    key: "PortManagement", // Key menu con
    path: "admin/port", // Address trên browser
    subMenuTitle: "Quản lý Cảng", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT",

    getPageElement: () => <PortManagementPage />,
  },
  {
    key: "PortTypeManagement", // Key menu con
    path: "admin/portType", // Address trên browser
    subMenuTitle: "Quản lý loại Cảng", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT_TYPE",

    getPageElement: () => <PortTypeManagementPage />,
  },
  {
    key: "DistrictManagement", // Key menu con
    path: "admin/district", // Address trên browser
    subMenuTitle: "Quản lý Quận/Huyện", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT_TYPE",

    getPageElement: () => <DistrictPage />,
  },
  {
    key: "ModelManagement", // Key menu con
    path: "admin/model", // Address trên browser
    subMenuTitle: "Quản lý Model", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT_TYPE",

    getPageElement: () => <ModelPage />,
  },
  {
    key: "OrderTypeManagement", // Key menu con
    path: "admin/orderType", // Address trên browser
    subMenuTitle: "Quản lý loại đơn hàng", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT_TYPE",

    getPageElement: () => <OrderTypePage />,
  },
  {
    key: "AreaManagement", // Key menu con
    path: "admin/area", // Address trên browser
    subMenuTitle: "Quản lý khu vực", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_AREA",

    getPageElement: () => <AreaPage />,
  },
  {
    key: "AreaManagement", // Key menu con
    path: "admin/dealerType", // Address trên browser
    subMenuTitle: "Quản lý loại đại lý", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_AREA",

    getPageElement: () => <DealerTypePage />,
  },
  {
    key: "TrannsporterCarManagement", // Key menu con
    path: "admin/transporterCar", // Address trên browser
    subMenuTitle: "Quản lý xe vận chuyển của DVVT", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <TransporterCarPage />,
  },
];
