import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { LoadPanel, PivotGrid, Popup } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import {
  Export,
  FieldChooser,
  FieldPanel,
  Scrolling,
  StateStoring,
  LoadPanel as PivotLoadPanel,
} from "devextreme-react/pivot-grid";
import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { SearchForm, openPopup } from "../components/search-form";
import { Rpt_DLSDealLoanEUBankMarketSum01_Params } from "@/packages/api/clientgate/Rpt_DLSDealLoanEUBankMarketSum01";
import { CustomChart } from "./Custom-Chart";

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_DLSDealLoanEUBankMarketSum01 = () => {
  const { t } = useI18n("Rpt_DLSDealLoanEUBankMarketSum01");
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const isOpenPopup = useAtomValue(openPopup);
  const setOpenPopup = useSetAtom(openPopup);

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition] = useState<
    Partial<Rpt_DLSDealLoanEUBankMarketSum01_Params>
  >({
    Dealer: "",
    Bank: "",
    MonthFrom: "",
    MonthTo: "",
  });

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_DLSDealLoanEUBankMarketSum01",
      "Rpt_DLSDealLoanEUBankMarketSum01_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (!searchCondition.MonthFrom) {
        return [];
      }
      const resp = await api.Rpt_DLSDealLoanEUBankMarketSum01_SearchHQ({
        ...searchCondition,
        MonthFrom: searchCondition.MonthFrom
          ? format(searchCondition.MonthFrom, "yyyy-MM")
          : "",
        MonthTo: searchCondition.MonthTo
          ? format(searchCondition.MonthTo, "yyyy-MM")
          : "",
      } as Rpt_DLSDealLoanEUBankMarketSum01_Params);
      if (resp.isSuccess) {
        return resp.Data?.Lst_Rpt_DLSDealLoanEUBankMarketSum_01 ?? [];
      }
      return [];
    },
    enabled: true,
  });
  console.log("🚀 ~ data:", data);

  const { data: bankList } = useQuery(
    ["BankList", "withAllOption"],
    async () => {
      const resp = await api.Mst_Bank_GetAllActive();
      if (resp.DataList) {
        return [{ BankCode: "", BankName: "Tất cả" }, ...resp.DataList];
      }
    },
    {}
  );

  const { data: dealerList } = useQuery(
    ["DealerList", "withAllOption"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList) {
        return [{ DealerCode: "", DealerName: "Tất cả" }, ...resp.DataList];
      }
    },
    {}
  );

  //PageHeader
  const handleExportExcel = () => {};

  const handleExportExcelDetail = useCallback(async () => {
    const result =
      await api.Rpt_DLSDealLoanEUBankMarketSum01_ExportDetailSearchHQ({
        Dealer: searchCondition.Dealer ?? "",
        Bank: searchCondition.Bank ?? "",
        MonthFrom: searchCondition.MonthFrom
          ? format(searchCondition.MonthFrom, "yyyy-MM")
          : "",
        MonthTo: searchCondition.MonthTo
          ? format(searchCondition.MonthTo, "yyyy-MM")
          : "",
      });
    if (result.isSuccess && result.Data) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = result.Data;
    }
  }, []);

  const handletoggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  //SearchPanelV2
  const searchFields: IItemProps[] = [
    {
      dataField: "FlagDataWH",
      visible: true,
      caption: t("FlagDataWH"),
      editorType: "dxCheckBox",
      label: {
        location: "left",
      },
    },
  ];

  const handleSearch = useCallback(async () => {
    setGettingData(true);
    reloading();
    // await refetch()
    setGettingData(false);
  }, []);

  //PivotGrid
  const fields = useMemo<Field[]>(() => {
    return [
      {
        caption: t("BankCode"),
        dataField: "BankCode",
        area: "row",
        areaIndex: 0,
      },

      {
        caption: t("BankPercent"),
        dataField: "BankPercent",
        area: "data",
        areaIndex: 0,
        summaryType: "sum",
      },

      {
        caption: t("BankName"),
        dataField: "BankName",
        areaIndex: -1,
      },

      {
        caption: t("DealMonth"),
        dataField: "DealMonth",
        area: "column",
        areaIndex: 0,
      },

      {
        caption: t("Qty"),
        dataField: "Qty",
      },

      {
        caption: t("QtyAll"),
        dataField: "QtyAll",
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data,
  });

  const togglePopup = () => {
    setOpenPopup(!isOpenPopup);
  };

  const renderPopup = useMemo(() => {
    return (
      <Popup
        visible={isOpenPopup}
        hideOnOutsideClick={true}
        onHiding={togglePopup}
        title="Chart preview"
        showCloseButton
        contentRender={() => <CustomChart dataSource={data || []} />}
        width="90vw"
        height="90vh"
        resizeEnabled={true}
      />
    );
  }, [data, isOpenPopup]);

  return (
    <>
      <AdminContentLayout>
        <AdminContentLayout.Slot name={"Header"}>
          <PageHeader
            onExportExcel={handleExportExcel}
            onExportExcelDetail={handleExportExcelDetail}
            toggleSearchPanel={handletoggleSearchPanel}
          />
        </AdminContentLayout.Slot>
        <AdminContentLayout.Slot name={"Content"}>
          <ContentSearchPanelLayout>
            <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
              <div className={"w-[300px] h-full"}>
                <SearchForm
                  data={searchCondition}
                  onSearch={handleSearch}
                  dealerList={dealerList as any}
                  bankList={bankList as any}
                />
              </div>
            </ContentSearchPanelLayout.Slot>
            <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
              <LoadPanel
                container={".dx-viewport"}
                shadingColor="rgba(0,0,0,0.4)"
                position={"center"}
                visible={isLoading}
                showIndicator={true}
                showPane={true}
              />
              <div className="w-full mt-4">
                {!!data && (
                  <PivotGrid
                    id="pivotgrid"
                    dataSource={dataSource}
                    allowSortingBySummary={true}
                    allowFiltering={true}
                    showBorders={true}
                    disabled={false} // chặn người dùng không cho tương tác với màn hình giao diện
                    onCellClick={(e: any) => {}} // lấy ra thông in của cột khi mà mình click vào bất kì ô nào
                    onCellPrepared={(e: any) => {}} // Một chức năng được thực thi sau khi một ô lưới trục được tạo.
                    onContentReady={(e) => {}} // A function that is executed when the UI component is rendered and each time the component is repainted.
                    onContextMenuPreparing={(e) => {}} // A function that is executed * before the context menu is rendered. *
                    onExporting={(e) => {}} // A function that is executed before data is exported. // thực thi sau khi xuất file
                    onOptionChanged={(e) => {}} // A function that is executed after a UI component property is changed.
                    showColumnGrandTotals={true} // chỉ định hiển thị tổng tính tổng hay không
                    showColumnTotals={true} // chỉ định có hiện cột tính tổng của cột hay không
                    showRowGrandTotals={true} // ngược lại với showColumnGrandTotals
                    showRowTotals={true} // ngược lại với showColumnTotals
                    showTotalsPrior={"none"} // 'both' | 'columns' | 'none' | 'rows' => default: 'none'
                    height={windowSize.height - 150}
                    // width={200}
                    allowExpandAll={true}
                  >
                    <Scrolling mode={"virtual"} />
                    {/* cho phép ấn và hiển thị cột theo mong muốn */}
                    <FieldChooser enabled={true} height={400} />
                    <PivotLoadPanel
                      enabled={true}
                      showPane={true}
                      showIndicator={true}
                    />

                    {/* cho phép người dùng xuất file */}
                    <Export enabled={true} />
                    {/* lưu cấu hình pivot vào trong local storage  */}
                    <StateStoring
                      enabled={true}
                      storageKey={"Rpt_DLSDealLoanEUBankMarketSum01"}
                    />
                    <FieldPanel visible={true} />
                  </PivotGrid>
                )}
              </div>
            </ContentSearchPanelLayout.Slot>
          </ContentSearchPanelLayout>
        </AdminContentLayout.Slot>
      </AdminContentLayout>
      {renderPopup}
    </>
  );
};
