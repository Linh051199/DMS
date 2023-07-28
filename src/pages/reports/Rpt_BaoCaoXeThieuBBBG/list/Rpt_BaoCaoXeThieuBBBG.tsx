import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button, LoadPanel, PivotGrid } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";

import DataGrid, {
  Column,
  ColumnChooser,
  ColumnFixing,
  HeaderFilter,
  Pager,
  Paging,
  Scrolling,
  Toolbar,
  Item as ToolbarItem,
} from "devextreme-react/data-grid";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { useVisibilityControl } from "@/packages/hooks";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { Rpt_BaoCaoXeThieuBBBGParam } from "@/packages/api/clientgate/Rpt_BaoCaoXeThieuBBBGApi";
interface IReportParam {
  ReportTo: any;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_BaoCaoXeThieuBBBG = () => {
  const { t } = useI18n("Rpt_BaoCaoXeThieuBBBG");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    ReportTo: new Date(),
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_BaoCaoXeThieuBBBG",
      "Rpt_BaoCaoXeThieuBBBG_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_BaoCaoXeThieuBBBG_SearchHQ({
          ReportTo: searchCondition.ReportTo
            ? format(searchCondition.ReportTo, "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_BaoCaoXeThieuBBBGParam);
        return resp?.Data?.Lst_Rpt_BaoCaoXeThieuBBBG;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    // const response = await api.RptSaleBaoCaoTongHopGet_ExportSearchHQ(
    //   searchCondition
    // );
    // if (response.isSuccess) {
    //   toast.success(t("DownloadSuccessfully"));
    //   window.location.href = response.Data as string;
    // } else {
    //   toast.error(t("DownloadUnsuccessfully"));
    // }
  }, [searchCondition]);

  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.RptStatisticHTCStockOutOnWay_ExportDetailSearchHQ({
      FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
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
      caption: t("ReportTo"),
      dataField: "ReportTo",
      visible: true,
      editorType: "dxDateBox",
      editorOptions: { ...dateBoxOptions, max: new Date() },
    },
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
    setSearchCondition(searchCondition);
    setGettingData(true);
    reloading();
    // await refetch()
    setGettingData(false);
  }, []);

  useEffect(() => {
    if (data) {
      data.map((item: any, index: any) => (item.Id = index + 1));
    }
  }, [data]);

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "Id",
        visible: true,
        caption: t("STT"),
      },
      {
        caption: t("DEALERCODE"),
        dataField: "DEALERCODE",
        visible: true,
      },
      {
        caption: t("DEALERNAME"),
        dataField: "DEALERNAME",
        visible: true,
      },
      {
        caption: t("AREANAMEDEALER"),
        dataField: "AREANAMEDEALER",
        visible: true,
      },
      {
        caption: t("HTCSTAFFINCHARGE"),
        dataField: "HTCSTAFFINCHARGE",
        visible: true,
      },
      {
        caption: t("TONGSOVIN"),
        dataField: "TONGSOVIN",
        visible: true,
      },
      {
        caption: t("SOVINCHAMTRONGDINHMUC"),
        dataField: "SOVINCHAMTRONGDINHMUC",
        visible: true,
      },
      {
        caption: t("Số ngày chậm"),
        dataField: "SoNgayCham",
        alignment: "center",
        columns: [
          { caption: t("DAYS_RANGEBBBG_1_2"), dataField: "DAYS_RANGEBBBG_1_2" },
          { caption: t("DAYS_RANGEBBBG_3_6"), dataField: "DAYS_RANGEBBBG_3_6" },
          {
            caption: t("DAYS_RANGEBBBG_7_10"),
            dataField: "DAYS_RANGEBBBG_7_10",
          },
          {
            caption: t("DAYS_RANGEBBBG_11_15"),
            dataField: "DAYS_RANGEBBBG_11_15",
          },
          { caption: t("DAYS_RANGEBBBG_15"), dataField: "DAYS_RANGEBBBG_15" },
          { caption: t("TONGCHAMBBBG"), dataField: "TONGCHAMBBBG" },
        ],
      },
      {
        caption: t("TONGSONGAYCHAMTHEODAILY"),
        dataField: "TONGSONGAYCHAMTHEODAILY",
        visible: true,
      },
    ];
  }, [isLoading]);

  // =================================================================
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_BaoCaoXeThieuBBBG-columns",
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

  useEffect(() => {
    const savedState = loadState() === undefined ? columns : loadState();

    if (savedState) {
      const columnOrders = savedState.map(
        (column: ColumnOptions) => column.dataField
      );
      const outputColumns = columns.map((column: ColumnOptions) => {
        const filterResult = savedState.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        return {
          ...column,
          visible: filterResult ? filterResult.visible ?? true : false,
        };
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setColumnsState(outputColumns);
    }
  }, []);

  return (
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
            <div className="w-[300px]">
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"Rpt_BaoCaoXeThieuBBBG-search"}
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

            <DataGrid
              id="gridContainer"
              dataSource={data ?? []}
              showBorders={true}
              showRowLines={true}
              showColumnLines={true}
              remoteOperations={false}
              columnAutoWidth={true}
              cacheEnabled={true}
              noDataText={t("ThereIsNoData")}
              height={windowSize.height - 150}
              onToolbarPreparing={onToolbarPreparing}
              columnResizingMode="widget"
              allowColumnResizing={true}
            >
              <ColumnChooser enabled={true} />
              <ColumnFixing enabled={true} />
              <HeaderFilter allowSearch={true} visible={true} />
              <Scrolling
                showScrollbar={"always"}
                mode={"standard"}
                rowRenderingMode={"standard"}
              />
              <Paging enabled={true} />
              <Pager visible={true} />
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
