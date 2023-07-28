import {
  AdminPage,
  DeliveryOrderManagementPage,
  DeliveryOrderDetailPage,
} from "@/pages";
import { DeliveryOrderDetailClonePage } from "@/pages/sales/delivery-order-clone/delivery-order-detail-clone";
import { DeliveryOrderManagementClonePage } from "@/pages/sales/delivery-order-clone/delivery-order-list-clone";
import { RouteItem } from "@/types";

export const salesRoutes: RouteItem[] = [
  {
    key: "sales",
    path: "sales",
    mainMenuTitle: "sales",
    mainMenuKey: "sales",
    getPageElement: () => <AdminPage />,
  },
  {
    key: "delivery-order",
    path: "sales/deliveryOrder",
    subMenuTitle: "DeliveryOrder",
    mainMenuKey: "sales",
    items: [
      {
        key: "manageDeliveryOrder",
        path: "sales/deliveryOrder/manageDeliveryOrder",
        subMenuTitle: "DeliveryOrderManage",
        mainMenuKey: "sales",
        getPageElement: () => <DeliveryOrderManagementPage />,
      },
      {
        key: "manageDeliveryOrderDetail",
        path: "sales/deliveryOrder/manageDeliveryOrder/:code",
        mainMenuKey: "sales",
        getPageElement: () => <DeliveryOrderDetailPage />,
      },
      {
        key: "autoDeliveryCommandSetting",
        path: "sales/deliveryCommand/settings",
        subMenuTitle: "AutoDeliveryCommandSetting",
        mainMenuKey: "sales",
        getPageElement: () => <AdminPage />,
      },
    ],
  },

  {
    key: "delivery-order-clone",
    path: "sales/deliveryOrderClone",
    subMenuTitle: "DeliveryOrderClone",
    mainMenuKey: "sales",
    items: [
      {
        key: "manageDeliveryOrder",
        path: "sales/deliveryOrderClone/manageDeliveryOrder",
        subMenuTitle: "DeliveryOrderCloneManage",
        mainMenuKey: "sales",
        getPageElement: () => <DeliveryOrderManagementClonePage />,
      },
      {
        key: "manageDeliveryOrderCloneDetail",
        path: "sales/deliveryOrderClone/manageDeliveryOrderClone/:code",
        mainMenuKey: "sales",
        getPageElement: () => <DeliveryOrderDetailClonePage />,
      },
    ],
  },
];
