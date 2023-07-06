import { AdminContentLayout } from "@layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { useI18n } from "@/i18n/useI18n";
import { ReportPageHeader } from "@packages/ui/report-page-header";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { RptPaymentParam } from "@packages/types";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { useSetAtom } from "jotai";
import { useFlagOptions, useVisibilityControl } from "@packages/hooks";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { useClientgateApi } from "@packages/api";
import { useQuery } from "@tanstack/react-query";
import { set } from "date-fns";
import { Button, DataGrid, LoadPanel } from "devextreme-react";
import { useRptPayment01Columns } from "@/pages/reports/RptPayment01/components";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  HeaderFilter,
  Item as ToolbarItem,
  Pager,
  Paging,
  Scrolling,
  Toolbar,
} from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { useSavedState } from "@packages/ui/base-gridview/components/use-saved-state";
import { toast } from "react-toastify";
import { showErrorAtom } from "@packages/store";

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};
const now = new Date();
const firstDayOfMonth = set(now, { date: 1 });
export const RptPayment01Page = () => {
  const { t } = useI18n("RptPayment01");
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi

  const [isLoading, setLoading] = useState(false);
  const [searchCondition, setSearchCondition] = useState<RptPaymentParam>({
    DateOpenFrom: firstDayOfMonth,
    OSODAppDateFrom: firstDayOfMonth,
    DealDateFrom: firstDayOfMonth,
    Status: "",
    FlagEarlyCancel: "",
    FlagDataWH: false,
    FlagisHTC: "",
    GrtNo: "",
    VIN: "",
    SoCode: "",
    ModelCode: "",
    DealerCode: "",
    CPTCStatus: "",
  } as RptPaymentParam);

  const flagFieldOptions = useFlagOptions();

  const searchFields: IItemProps[] = [
    { dataField: "GrtNo", visible: true, caption: t("GrtNo") },
    { dataField: "VIN", visible: true, caption: t("VIN") },
    {
      dataField: "DateOpenFrom",
      visible: true,
      caption: t("DateOpenFrom"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    {
      dataField: "DateOpenTo",
      visible: true,
      caption: t("DateOpenTo"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    { dataField: "SoCode", visible: true, caption: t("SoCode") },
    { dataField: "ModelCode", visible: true, caption: t("ModelCode") },
    {
      dataField: "OSODAppDateFrom",
      visible: true,
      caption: t("OSODAppDateFrom"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    {
      dataField: "OSODAppDateTo",
      visible: true,
      caption: t("OSODAppDateTo"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    { dataField: "Status", visible: true, caption: t("Status") },
    {
      dataField: "DealDateFrom",
      visible: true,
      caption: t("DealDateFrom"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    {
      dataField: "DealDateTo",
      visible: true,
      caption: t("DealDateTo"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    {
      dataField: "PMGDateEndFrom",
      visible: true,
      caption: t("PMGDateEndFrom"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    {
      dataField: "PMGDateEndTo",
      visible: true,
      caption: t("PMGDateEndTo"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    { dataField: "DealerCode", visible: true, caption: t("DealerCode") },
    {
      dataField: "CPTCStatus",
      visible: true,
      caption: t("CPTCStatus"),
      editorType: "dxSelectBox",
      editorOptions: flagFieldOptions,
    },
    {
      dataField: "FlagEarlyCancel",
      visible: true,
      caption: t("FlagEarlyCancel"),
      editorType: "dxSelectBox",
      editorOptions: flagFieldOptions,
    },
    {
      dataField: "FlagisHTC",
      visible: true,
      caption: t("FlagisHTC"),
      editorType: "dxSelectBox",
      editorOptions: flagFieldOptions,
    },
    {
      dataField: "FlagDataWH",
      visible: true,
      label: {
        location: "left",
      },
      caption: t("FlagDataWH"),
      editorType: "dxCheckBox",
    },
  ];
  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      const outputColumns = columns.map((column: ColumnOptions) => {
        const filterResult = savedState.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        column.visible = filterResult ? filterResult.visible : false;
        return column;
      });
      setColumnsState(outputColumns);
    }
  }, []);

  const { data, refetch } = useQuery(
    ["report", "payment01", JSON.stringify(searchCondition)],
    () =>
      api.RptPayment01_SearchDL({
        ...searchCondition,
      }),
    {
      enabled: true,
    }
  );
  console.log("🚀 ~ data:", data);
  
  const handleExportExcelCKTT = useCallback(async () => {
    const response = await api.RptPayment01_ExportSearchTTCKDL(searchCondition);
    if (response.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = response.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
    }
  }, [searchCondition]);
  const handleExportExcel = useCallback(async () => {
    const response = await api.RptPayment01_ExportDL(searchCondition);
    if (response.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = response.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
    }
  }, [searchCondition]);
  const handleSearch = useCallback(async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
  }, []);

  const handleExportExcelDetail = useCallback(async () => {
    const resp = await api.RptPayment01_ExportDetailSearchDL(searchCondition);
    if (resp.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = resp.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  }, [searchCondition]);
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };
  const columns = useRptPayment01Columns({
    data: data?.Data?.Lst_RptPayment_01_Mst ?? [],
  });
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "rpt-payment01-columns",
  });

  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );
  const onHiding = useCallback(() => {
    chooserVisible.close();
  }, []);

  const onApply = useCallback(
    (changes: any) => {
      setColumnsState(changes);
      chooserVisible.close();
    },
    [setColumnsState]
  );

  const renderColumnChooser = useCallback(() => {
    return (
      <CustomColumnChooser
        title={t("ToggleColumn")}
        applyText={t("Apply")}
        cancelText={t("Cancel")}
        selectAllText={t("SelectAll")}
        container={"#gridContainer"}
        button={"#myColumnChooser"}
        visible={chooserVisible.visible}
        columns={columns}
        onHiding={onHiding}
        onApply={onApply}
        actualColumns={realColumns}
      />
    );
  }, [chooserVisible, realColumns, columns]);
  const allToolbarItems: ToolbarItemProps[] = [
    {
      location: "before",
      widget: "dxButton",
      options: {
        icon: "search",
        onClick: handleToggleSearchPanel,
      },
    },
    {
      location: "before",
      widget: "dxButton",
      options: {
        text: t("ExportExcelCKTT"),
        type: "default",
        onClick: handleExportExcelCKTT,
      },
    },
    {
      location: "before",
      widget: "dxButton",
      options: {
        text: t("ExportExcelDetail"),
        type: "default",
        onClick: handleExportExcelDetail,
      },
    },
    {
      location: "before",
      widget: "dxButton",
      options: {
        text: t("ExportExcel"),
        type: "default",
        onClick: handleExportExcel,
      },
    },
    {
      location: "after",
      render: renderColumnChooser,
    },
  ];
  const onToolbarPreparing = useCallback((e: any) => {
    e.toolbarOptions.items.push({
      widget: "dxButton",
      location: "after",
      options: {
        icon: "/images/icons/settings.svg",
        elementAttr: {
          id: "myColumnChooser",
        },
        onClick: () => chooserVisible.toggle(),
      },
    });
  }, []);

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <ReportPageHeader title={t("RptPayment01")} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[200px]"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"rpt-payment-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel visible={isLoading} />
            <DataGrid
              id="gridContainer"
              dataSource={data?.Data?.Lst_RptPayment_01_Mst ?? []}
              showBorders={true}
              showRowLines={true}
              showColumnLines={true}
              remoteOperations={false}
              columnAutoWidth={true}
              cacheEnabled={true}
              noDataText={t("ThereIsNoData")}
              height={windowSize.height - 150}
              onToolbarPreparing={onToolbarPreparing}
            >
              <ColumnChooser enabled={true} />
              <ColumnFixing enabled={true} />
              <HeaderFilter allowSearch={true} visible={true} />
              <Scrolling
                showScrollbar={"always"}
                mode={"standard"}
                rowRenderingMode={"standard"}
              />
              <Paging enabled={false} />
              <Pager visible={false} />
              <Toolbar>
                {!!allToolbarItems &&
                  allToolbarItems.map((item, index) => {
                    return (
                      <ToolbarItem key={index} location={item.location}>
                        {item.widget === "dxButton" && (
                          <Button {...item.options} />
                        )}
                        {!!item.render && item.render()}
                      </ToolbarItem>
                    );
                  })}
              </Toolbar>

              {realColumns.map((column: ColumnOptions, index: number) => (
                <Column key={index} {...column} />
              ))}
            </DataGrid>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
