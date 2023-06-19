import {
  AdminPage,
  DealerManagementPage,
  DealerManagementPageClone,
  ProvinceManagementPage,
  ProvinceManagement,
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
];
