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
import { LoadPanel, PivotGrid } from "devextreme-react";
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

// import {
//   Column,
//   ColumnChooser,
//   ColumnFixing,
//   HeaderFilter,
//   Pager,
//   Paging,
//   Scrolling,
//   Toolbar,
//   Item as ToolbarItem,
// } from "devextreme-react/data-grid";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { useRpt_DlrContractInstockParam } from "@/packages/api/clientgate/Rpt_DlrContractInstockApi";
import { ColumnOptions } from "@/types";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
interface IReportParam {
  MDDealerCodeConditionList: string;
  MAAreaCodeConditonList: string;
  DateBegin: string;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const BasePivot = () => {
  const { t } = useI18n("base");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {} as IReportParam
  );

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "report",
      "Rpt_DlrContractInstock_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_DlrContractInstock_SearchHQ({
          MDDealerCodeConditionList:
            searchCondition.MDDealerCodeConditionList ?? "",
          MAAreaCodeConditonList: searchCondition.MAAreaCodeConditonList ?? "",
          DateBegin: "2023",
          FlagDataWH: 1,
        } as useRpt_DlrContractInstockParam);
        return resp;
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

  //PivotGrid
  const fields = useMemo<Field[]>(() => {
    return [
      {
        caption: t("CarID"),
        dataField: "CarID",
        area: "data",
        showGrandTotals: true,
        showTotals: true,
        summaryType: "count",
        isMeasure: true, // allows the end-user to place this f
      },
      {
        caption: t("DUTYCOMPLETEDPERCENT_RANGE"),
        dataField: "DUTYCOMPLETEDPERCENT_RANGE",
        area: "row",
      },
      {
        caption: t("DUTYDAYS_RANGE"),
        dataField: "DUTYDAYS_RANGE",
        area: "row",
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_Rpt_DlrContractInstock,
  });

  // useEffect(() => {
  //   if (data) {
  //     data.Data?.Lst_Rpt_DuKienDongTienTT.map(
  //       (item: any, index: any) => (item.Id = index + 1)
  //     );
  //   }
  // }, [data]);

  // const columns: ColumnOptions[] = useMemo(() => {
  //   return [
  //     {
  //       dataField: "Id",
  //       // visible: true,
  //       caption: t("STT"),
  //       editorType: "dxSelectBox",
  //     },
  //     {
  //       dataField: "BANKCODE",
  //       // visible: true,
  //       caption: t("BANKCODE"),
  //     },
  //     {
  //       dataField: "BANKNAME_BL",
  //       // visible: true,
  //       caption: t("BANKNAME_BL"),
  //     },
  //     {
  //       dataField: "BANKCODEMONITOR",
  //       // visible: true,
  //       caption: t("BANKCODEMONITOR"),
  //     },
  //     {
  //       dataField: "BANKNAME_GS",
  //       // visible: true,
  //       caption: t("BANKNAME_GS"),
  //     },
  //     {
  //       dataField: "COUNTCARID",
  //       // visible: true,
  //       caption: t("COUNTCARID"),
  //     },
  //     {
  //       dataField: "GUARANTEEVALUE",
  //       // visible: true,
  //       caption: t("GUARANTEEVALUE"),
  //     },
  //     {
  //       dataField: "GUARANTEEVALUENOPAYMENT",
  //       // visible: true,
  //       caption: t("GUARANTEEVALUENOPAYMENT"),
  //     },
  //   ];
  // }, [isLoading]);

  // // =================================================================
  // const { saveState, loadState } = useSavedState<ColumnOptions[]>({
  //   storeKey: "Rpt_NXTQuyenDoiNo-columns",
  // });

  // const chooserVisible = useVisibilityControl({ defaultVisible: false });
  // const [realColumns, setColumnsState] = useReducer(
  //   (state: any, changes: any) => {
  //     saveState(changes);
  //     return changes;
  //   },
  //   columns
  // );
  // const onHiding = useCallback(() => {
  //   chooserVisible.close();
  // }, []);

  // const onApply = useCallback(
  //   (changes: any) => {
  //     setColumnsState(changes);
  //     chooserVisible.close();
  //   },
  //   [setColumnsState]
  // );

  // const renderColumnChooser = useCallback(() => {
  //   return (
  //     <CustomColumnChooser
  //       title={t("ToggleColumn")}
  //       applyText={t("Apply")}
  //       cancelText={t("Cancel")}
  //       selectAllText={t("SelectAll")}
  //       container={"#gridContainer"}
  //       button={"#myColumnChooser"}
  //       visible={chooserVisible.visible}
  //       columns={columns}
  //       onHiding={onHiding}
  //       onApply={onApply}
  //       actualColumns={realColumns}
  //     />
  //   );
  // }, [chooserVisible, realColumns, columns]);
  // const allToolbarItems: ToolbarItemProps[] = [
  //   {
  //     location: "after",
  //     render: renderColumnChooser,
  //   },
  // ];
  // const onToolbarPreparing = useCallback((e: any) => {
  //   e.toolbarOptions.items.push({
  //     widget: "dxButton",
  //     location: "after",
  //     options: {
  //       icon: "/images/icons/settings.svg",
  //       elementAttr: {
  //         id: "myColumnChooser",
  //       },
  //       onClick: () => chooserVisible.toggle(),
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   const savedState = loadState() === undefined ? columns : loadState();

  //   if (savedState) {
  //     const columnOrders = savedState.map(
  //       (column: ColumnOptions) => column.dataField
  //     );
  //     const outputColumns = columns.map((column: ColumnOptions) => {
  //       const filterResult = savedState.find(
  //         (c: ColumnOptions) => c.dataField === column.dataField
  //       );
  //       return {
  //         ...column,
  //         visible: filterResult ? filterResult.visible ?? true : false,
  //       };
  //     });
  //     outputColumns.sort(
  //       (a, b) =>
  //         columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
  //     );
  //     setColumnsState(outputColumns);
  //   }
  // }, []);

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
                storeKey={"base-search"}
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
              {!!data && data?.Data?.Lst_Rpt_DlrContractInstock && (
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
                  <StateStoring enabled={true} storageKey={"base"} />
                  <FieldPanel visible={true} />
                </PivotGrid>
              )}
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

// <DataGrid
// id="gridContainer"
// dataSource={data ?? []}
// showBorders={true}
// showRowLines={true}
// showColumnLines={true}
// remoteOperations={false}
// columnAutoWidth={true}
// cacheEnabled={true}
// noDataText={t("ThereIsNoData")}
// height={windowSize.height - 150}
// onToolbarPreparing={onToolbarPreparing}
// columnResizingMode="widget"
// allowColumnResizing={true}
// >
// <ColumnChooser enabled={true} />
// <ColumnFixing enabled={true} />
// <HeaderFilter allowSearch={true} visible={true} />
// <Scrolling
//   showScrollbar={"always"}
//   mode={"standard"}
//   rowRenderingMode={"standard"}
// />
// <Paging enabled={true} />
// <Pager visible={true} />
// <Toolbar>
//   {!!allToolbarItems &&
//     allToolbarItems.map((item, index) => {
//       return (
//         <ToolbarItem key={index} location={item.location}>
//           {item.widget === "dxButton" && (
//             <Button {...item.options} />
//           )}
//           {!!item.render && item.render()}
//         </ToolbarItem>
//       );
//     })}
// </Toolbar>

// {realColumns.map((column: ColumnOptions, index: number) => (
//   <Column key={index} {...column} />
// ))}
// </DataGrid>
