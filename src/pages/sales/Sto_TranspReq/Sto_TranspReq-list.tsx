import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { useNetworkNavigate, useStateRestore } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { ScrollView } from "devextreme-react";
import { SearchForm } from "./search-form/search-form";
import { useState } from "react";
import { Sto_TranspReq_Search } from "@/packages/types/sales/Sto_TranspReq";
import { formatDate } from "@/packages/common/date_utils";
import OrderList from "./order-list/order-list";

export const Sto_TranspReqManagementPage = () => {
  const { t } = useI18n("DeliveryOrderPage");
  const navigate = useNetworkNavigate();
  const windowSize = useWindowSize();

  const [searchCondition, setSearchCondition] = useState<
    Partial<Sto_TranspReq_Search>
  >({
    TranspReqNo: "", // Số yêu cầu vận tải
    CarId: "", // Mã xe
    VIN: "", // Số VIN
    TranspReqDtlStatus: "", // Trạng thái
    RefOrdNo: "", // Số Lệnh xuất xe
    TransporterCode: "", // Đơn vị vận tải
    CreatedDateFromTo: [new Date(), new Date()],
    // CreatedDateFrom: "", // Ngày tạo từ
    // CreatedDateTo: "", // Ngày tạo đến
    TranspReqType: "CARTRANSPORT", // Loại YCVT // Mặc đinh truyền: CARTRANSPORT
    FlagDataWH: false, // convert "1", "0" ở hàm gọi API
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const { data, onSave: onSaveState } = useStateRestore<
    Partial<Sto_TranspReq_Search>
  >("search-sto-transp-req", {});

  const handleSearch = (condition: Partial<Sto_TranspReq_Search>) => {
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

  const handleAddNew = () => {
    navigate("/sales/transpReq/manageTranspReq/new");
  };

  const handleViewDetail = (code: string) => {
    navigate(`/sales/transpReq/manageTranspReq/${code}`);
  };
  console.log("re-render");

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("TranspReqManage")}</div>
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
            <ScrollView height={"100%"}>
              {/* <OrderList /> */}
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
