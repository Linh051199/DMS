import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useI18n } from "@/i18n/useI18n";
import { ContentSearchPanelLayout } from "@layouts/content-searchpanel-layout";
import { SearchForm } from "./search-form";
import { useEffect, useState } from "react";
import { SearchCarDeliveryOrderParam } from "@packages/types";
import { BButton } from "@/packages/components/buttons";
import { formatDate } from "@packages/common/date_utils";
import { useNetworkNavigate, useStateRestore } from "@/packages/hooks";
import { OrderList } from "src/pages/sales/delivery-order/order-list";
import ScrollView from "devextreme-react/scroll-view";
import { useWindowSize } from "@packages/hooks/useWindowSize";

import "./delivery-order.scss";

export const DeliveryOrderManagementPage = () => {
  const { t } = useI18n("DeliveryOrderPage");
  const [searchCondition, setSearchCondition] = useState<
    Partial<SearchCarDeliveryOrderParam>
  >({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    CarId: "",
    DeliveryOrderNo: "",
    DealerCode: "",
    DeliveryOrderStatus: "",
    DeliveryVIN: "",
    SOCode: "",
    CreatedDateFromTo: [new Date(), new Date()],
    FlagDataWH: false,
  });
  const navigate = useNetworkNavigate();
  const handleViewDetail = (code: string) => {
    navigate(`/sales/deliveryOrder/manageDeliveryOrder/${code}`);
  };
  const { data, onSave: onSaveState } = useStateRestore<
    Partial<SearchCarDeliveryOrderParam>
  >("search-car-delivery-order", {});
  const handleSearch = (condition: Partial<SearchCarDeliveryOrderParam>) => {
    if (condition.CreatedDateFromTo && condition.CreatedDateFromTo.length > 0) {
      condition.CreatedDateFrom = condition.CreatedDateFromTo[0]
        ? formatDate(condition.CreatedDateFromTo[0])
        : undefined;
      condition.CreatedDateTo = condition.CreatedDateFromTo[1]
        ? formatDate(condition.CreatedDateFromTo[1])
        : undefined;
    }
    onSaveState(condition);
    setSearchCondition({
      ...condition,
    });
  };

  useEffect(() => {
    const newFormValue = {
      ...searchCondition,
      ...data,
    };
    setSearchCondition(newFormValue);
    // if (!!data && Object.keys(data).length > 0) {
    //   handleSearch(newFormValue);
    // }
  }, []);

  const handleAddNew = () => {
    navigate("/sales/deliveryOrder/manageDeliveryOrder/new");
  };
  const windowSize = useWindowSize();
  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("DeliveryCommandManage")}</div>
          <div className="ml-auto">
            <BButton
              iconName="plus"
              label={t("AddNew")}
              onClick={handleAddNew}
            />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <ScrollView
              height={windowSize.height - 130}
              className={"min-w-[300px]"}
            >
              <SearchForm data={searchCondition} onSearch={handleSearch} />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <ScrollView height={windowSize.height - 130}>
              <OrderList
                searchData={searchCondition}
                onViewDetail={handleViewDetail}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
