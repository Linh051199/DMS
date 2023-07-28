import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { useNetworkNavigate, useStateRestore } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { ScrollView } from "devextreme-react";
import { SearchForm } from "./search-form/search-form";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { SearchCarDeliveryOrderParam } from "@/packages/types";
import { formatDate } from "@/packages/common/date_utils";
import { OrderList } from "./order-list/order-list";

export const DeliveryOrderManagementClonePage = () => {
  const { t } = useI18n("DeliveryOrderPage");
  const navigate = useNetworkNavigate();
  const windowSize = useWindowSize();

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

  const handleViewDetail = (code: string) => {
    navigate(`/sales/deliveryOrderClone/manageDeliveryOrderClone/${code}`);
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
  }, []);

  // navigate to AddNewPage
  const handleAddNew = () => {
    navigate("/sales/deliveryOrderClone/manageDeliveryOrderClone/new");
  };

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
