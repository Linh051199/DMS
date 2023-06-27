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
  TransporterDiverPage,
  CarOCNPage,
  TransporterPage,
  Mst_QuotaPage,
  CarInvoicePage,
  StoragePage,
  PaymentTypePage,
  CarCancelPage,
  PlantPage,
  DealerSalesGroupTypePage,
  BasePage2,
  CarSpecPage,
  CarStdOptPage,
  DealerSalesTypePage,
  ContractUpdateTypePage,
  CustomerBasePage,
  InsuranceTypePage,
  StorageGlobalPage,
  DealerStorageGlobalPage,
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

  // {
  //   key: "dealerManagement",
  //   path: "admin/dealer",
  //   subMenuTitle: "dealerManagement",
  //   mainMenuKey: "admin",
  //   permissionCode: "MNU_ADMIN_DEALER",
  //   getPageElement: () => <DealerManagementPage />,
  // },

  {
    key: "PortTypeManagement", // Key menu con
    path: "admin/base", // Address trên browser
    subMenuTitle: "Master1", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT_TYPE",

    getPageElement: () => <BasePage />,
  },
  {
    key: "DealerTypeManagement", // Key menu con
    path: "admin/dealerType", // Address trên browser
    subMenuTitle: "Quản lý loại đại lý", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_AREA",

    getPageElement: () => <DealerTypePage />,
  },
  {
    key: "DealerStorageGlobalManagement", // Key menu con
    path: "admin/dealerStorageGlobal", // Address trên browser
    subMenuTitle: "Thiết lập kho khu vực cho đại lý", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_AREA",

    getPageElement: () => <DealerStorageGlobalPage />,
  },

  {
    key: "DealerSalesTypeManagement", // Key menu con
    path: "admin/dealerSalesType", // Address trên browser
    subMenuTitle: "Quản lý loại hình bán lẻ", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_AREA",

    getPageElement: () => <DealerSalesTypePage />,
  },

  {
    key: "DealerSalesGroupTypeManagement", // Key menu con
    path: "admin/dealerSalesGroupType", // Address trên browser
    subMenuTitle: "Quản lý nhóm loại hình bán lẻ", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_AREA",

    getPageElement: () => <DealerSalesGroupTypePage />,
  },
  // {
  //   key: "provinceManagement", // Key menu con
  //   path: "admin/province", // Address trên browser
  //   subMenuTitle: "provinceManagement", // Title menu con
  //   mainMenuKey: "admin", // Key của menu cha
  //   permissionCode: "MNU_ADMIN_PROVINCE",
  //   getPageElement: () => <ProvinceManagementPage />,
  // },
  {
    key: "provinceManagement", // Key menu con
    path: "admin/provinceClone", // Address trên browser
    subMenuTitle: "Quản lý Tỉnh/Thành Phố (Clone)", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PROVINCE",
    getPageElement: () => <ProvinceManagement />,
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
    key: "AreaManagement", // Key menu con
    path: "admin/area", // Address trên browser
    subMenuTitle: "Quản lý khu vực", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_AREA",

    getPageElement: () => <AreaPage />,
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
    key: "OrderTypeManagement", // Key menu con
    path: "admin/orderType", // Address trên browser
    subMenuTitle: "Quản lý loại đơn hàng", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT_TYPE",

    getPageElement: () => <OrderTypePage />,
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
    key: "StorageModalManagement", // Key menu con
    path: "admin/storageModal", // Address trên browser
    subMenuTitle: "Thiết lập kho toàn quốc theo modal", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT_TYPE",

    getPageElement: () => <StorageGlobalPage />,
  },

  {
    key: "Car-OCNManagement", // Key menu con
    path: "admin/carOCN", // Address trên browser
    subMenuTitle: "Quản lý Car-OCN", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PORT_TYPE",

    getPageElement: () => <CarOCNPage />,
  },

  {
    key: "CarCancelManagement", // Key menu con
    path: "admin/carCancel", // Address trên browser
    subMenuTitle: "Quản lý PT huỷ xe", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_CAR_CANCEL_TYPE",

    getPageElement: () => <CarCancelPage />,
  },

  {
    key: "TrannsporterCarManagement", // Key menu con
    path: "admin/transporterCar", // Address trên browser
    subMenuTitle: "Quản lý xe vận chuyển của DVVT", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <TransporterCarPage />,
  },

  {
    key: "TrannsporterDriverManagement", // Key menu con
    path: "admin/transporterDriver", // Address trên browser
    subMenuTitle: "Quản lý lái xe của DVVT", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <TransporterDiverPage />,
  },
  {
    key: "CarInvoiceManagement", // Key menu con
    path: "admin/carInvoice", // Address trên browser
    subMenuTitle: "Quản lý thông tin xe xuất hoá đơn", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_CARINVOICE",

    getPageElement: () => <CarInvoicePage />,
  },
  {
    key: "StorageManagement", // Key menu con
    path: "admin/storage", // Address trên browser
    subMenuTitle: "Quản lý kho bãi", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <StoragePage />,
  },
  {
    key: "PlantManagement", // Key menu con
    path: "admin/plant", // Address trên browser
    subMenuTitle: "Quản lý nhà máy", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PLANT",

    getPageElement: () => <PlantPage />,
  },
  {
    key: "PaymentTypeManagement", // Key menu con
    path: "admin/paymentType", // Address trên browser
    subMenuTitle: "Quản lý phương thức thanh toán", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PAYMENT_TYPE",

    getPageElement: () => <PaymentTypePage />,
  },
  {
    key: "ContractUpdateTypeManagement", // Key menu con
    path: "admin/contractUpdateType", // Address trên browser
    subMenuTitle: "Quản lý loại huỷ hợp đồng", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PLANT",

    getPageElement: () => <ContractUpdateTypePage />,
  },

  {
    key: "CustomerBaseManagement", // Key menu con
    path: "admin/customerBase", // Address trên browser
    subMenuTitle: "Quản lý nguồn khách hàng", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PLANT",

    getPageElement: () => <CustomerBasePage />,
  },

  {
    key: "InsuranceTypeManagement", // Key menu con
    path: "admin/insuranceType", // Address trên browser
    subMenuTitle: "Quản lý loại hình bảo hiểm", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_PLANT",

    getPageElement: () => <InsuranceTypePage />,
  },

  // -------------------------------------------------------------------------------------------------------------------
  {
    key: "Master2Management", // Key menu con
    path: "admin/base2", // Address trên browser
    subMenuTitle: "Master2", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <BasePage2 />,
  },

  {
    key: "QuotaManagement", // Key menu con
    path: "admin/quota", // Address trên browser
    subMenuTitle: "Quản lý Quota", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <Mst_QuotaPage />,
  },

  {
    key: "CarSpecManagement", // Key menu con
    path: "admin/carSpec", // Address trên browser
    subMenuTitle: "Quản lý đặc tả xe", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <CarSpecPage />,
  },
  {
    key: "dealerManagement",
    path: "admin/dealerClone",
    subMenuTitle: "Quản lý đại lý ",
    mainMenuKey: "admin",
    permissionCode: "MNU_ADMIN_DEALER",
    getPageElement: () => <DealerManagementPageClone />,
  },
  {
    key: "TrannsporterManagement", // Key menu con
    path: "admin/transporter", // Address trên browser
    subMenuTitle: "Quản lý đơn vị vận tải", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <TransporterPage />,
  },

  {
    key: "CarStdOptManagement", // Key menu con
    path: "admin/carStdOpt", // Address trên browser
    subMenuTitle: "Quản lý tuỳ chọn cơ bản", // Title menu con
    mainMenuKey: "admin", // Key của menu cha
    permissionCode: "MNU_ADMIN_MST_TRANSPORTERCAR",

    getPageElement: () => <CarStdOptPage />,
  },
];
