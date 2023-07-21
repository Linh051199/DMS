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
import { format, set } from "date-fns";
import {
  Button,
  DataGrid,
  LoadPanel,
  PivotGrid,
  Resizable,
  ScrollView,
} from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { Rpt_MasterParam } from "@/packages/api/clientgate/Rpt_MasterApi";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  HeaderFilter,
  Pager,
  Paging,
  Scrolling,
  Sorting,
} from "devextreme-react/data-grid";
import { ColumnOptions } from "@/types";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { useReportColumns } from "../components/useReportColumns";
import { uniqueFilterByDataField } from "@/packages/common";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
interface IReportParam {
  MonthFrom: any;
  MonthTo: any;
  CheckBanLe: 1 | 0;
  CheckTonKhoDaiLy: 1 | 0;
  CheckBanBuonHTC: 1 | 0;
  CheckTonKhoHTC: 1 | 0;
  CheckNhapHang: 1 | 0;
  CheckShipping: 1 | 0;
  CheckSanXuat: 1 | 0;
  CheckPI: 1 | 0;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

const now = new Date();
const firstMonthOfYear = set(now, { date: 1, month: 0 });
const lastMonthOfYear = set(now, { date: 1, month: 11 });

export const Rpt_Master = () => {
  const { t } = useI18n("Rpt_Master");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [selectValues, setSelectedValues] = useState<string[]>([]);
  const [isGetingData, setGettingData] = useState(false);
  const [columnMonth, setColumnsMonth] = useState<any[]>([]);
  const [loadingValue, setLoadingValue] = useState(false);
  const [visible, setVisible] = useState(false);

  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    MonthFrom: format(firstMonthOfYear, "yyyy-MM"),
    MonthTo: format(lastMonthOfYear, "yyyy-MM"),
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const { data, isLoading } = useQuery({
    queryKey: [
      "report",
      "Rpt_Master",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_Master_SearchHQ({
          MonthFrom: searchCondition.MonthFrom ?? "",
          MonthTo: searchCondition.MonthTo ?? "",
          CheckBanLe: searchCondition.CheckBanLe ? 1 : 0,
          CheckTonKhoDaiLy: searchCondition.CheckTonKhoDaiLy ? 1 : 0,
          CheckBanBuonHTC: searchCondition?.CheckBanBuonHTC ? 1 : 0,
          CheckTonKhoHTC: searchCondition.CheckTonKhoHTC ? 1 : 0,
          CheckNhapHang: searchCondition.CheckNhapHang ? 1 : 0,
          CheckShipping: searchCondition.CheckShipping ? 1 : 0,
          CheckSanXuat: searchCondition.CheckSanXuat ? 1 : 0,
          CheckPI: searchCondition.CheckPI ? 1 : 0,
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_MasterParam);

        if (resp.isSuccess) {
          setLoadingValue(true);
          const listMonth = resp?.Data?.Lst_ColumnMonth;
          if (listMonth) {
            const listColumnsMonth = listMonth?.map((e) => {
              return {
                dataField: e?.ColumnMonthKey,
                caption: t(e?.ColumnMonthValue),
                visible: true,
                headerFilter: {
                  visible: true,
                  dataSource: uniqueFilterByDataField(
                    listMonth,
                    "ColumnMonthKey"
                  ),
                },
              };
            });
            setColumnsMonth(listColumnsMonth);
            setLoadingValue(false);
          }
        }
        return resp?.Data;
      } else {
        return null;
      }
    },
    enabled: true,
  });
  console.log("🚀 ~ data:", data);

  //PageHeader

  const values = [
    {
      name: "CheckBanLe",
      value: "CheckBanLe",
    },
    {
      name: "CheckTonKhoDaiLy",
      value: "CheckTonKhoDaiLy",
    },
    {
      name: "CheckBanBuonHTC",
      value: "CheckBanBuonHTC",
    },
    {
      name: "CheckTonKhoHTC",
      value: "CheckTonKhoHTC",
    },
    {
      name: "CheckNhapHang",
      value: "CheckNhapHang",
    },
    {
      name: "CheckShipping",
      value: "CheckShipping",
    },
    {
      name: "CheckSanXuat",
      value: "CheckSanXuat",
    },
    {
      name: "CheckPI",
      value: "CheckPI",
    },
  ];
  const handleExportExcel = useCallback(async () => {
    values.forEach((e) => {
      selectValues.forEach((v: string) => {
        if (e.name === v) {
          setSearchCondition((prevCondition) => ({
            ...prevCondition,
            [e.name]: 1,
          }));
          return 0;
        }
      });
    });
    const response = await api.Rpt_Master_ExportSearchHQ(searchCondition);
    if (response.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = response.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
    }
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

  const yearDs = useCallback(() => {
    const yearList = [];

    // Set the start and end dates
    const startDate = new Date("2000-01-01");
    const endDate = set(now, { date: 1, month: 11 });

    // Loop through the months from end to start in descending order
    for (
      let date = endDate;
      date >= startDate;
      date.setMonth(date.getMonth() - 1)
    ) {
      const year = date.getFullYear(); // Get the year
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month and pad with leading zero if needed
      const yearMonth = `${year}-${month}`; // Concatenate the year and month
      yearList.push({ year: yearMonth, text: yearMonth });
    }

    return yearList; // Return the generated yearList
  }, [searchCondition, data]);

  const searchFields: IItemProps[] = [
    {
      dataField: "MonthFrom",
      visible: true,
      caption: t("MonthFrom"),
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: yearDs() ?? [],
        displayExpr: "text",
        valueExpr: "year",
        validationMessageMode: "always",
        validationGroup: "form",
      },
    },
    {
      dataField: "MonthTo",
      visible: true,
      caption: t("MonthTo"),
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: yearDs() ?? [],
        displayExpr: "text",
        valueExpr: "year",
        validationMessageMode: "always",
        validationGroup: "form",
      },
    },
    {
      dataField: "Loại báo cáo",
      visible: true,
      caption: t("Loại báo cáo"),
      editorType: "dxTagBox",
      editorOptions: {
        onValueChanged: (e: any) => setSelectedValues(e.value),
        value: selectValues,
        multiline: true,
        hideSelectedItems: true,
        showSelectionControls: true,
        applyValueMode: "useButtons",
        searchEnabled: true,
        height: "auto", // để height auto thì đỡ bị vỡ giao diện
        dataSource: values ?? [],
        displayExpr: "name",
        valueExpr: "value",
        validationGroup: "form",
        validationMessageMode: "always",
      },
      validationRules: [RequiredField(t("Required"))],
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

  const dataList = [
    ...(data?.Lst_RptMaster_BanBuonHTC || []),
    ...(data?.Lst_RptMaster_BanLe || []),
    ...(data?.Lst_RptMaster_DatHang || []),
    ...(data?.Lst_RptMaster_NhapHang || []),
    ...(data?.Lst_RptMaster_SanXuat || []),
    ...(data?.Lst_RptMaster_Shipping || []),
    ...(data?.Lst_RptMaster_TonKhoDaiLy || []),
    ...(data?.Lst_RptMaster_TonKhoHTC || []),
  ];

  // const columns = useReportColumns({
  //   data: dataList,
  //   columnsMonth: columnMonth ?? [],
  // });

  const columns = useReportColumns({
    data: dataList,
    columnsMonth: columnMonth ?? [],
  });


  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_Mapter-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );

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

  const handleSearch = useCallback(async () => {
    setGettingData(true);
    reloading();
    values.forEach((e) => {
      selectValues.forEach((v: string) => {
        if (e.name === v) {
          setSearchCondition((prevCondition) => ({
            ...prevCondition,
            [e.name]: 1,
          }));
          return 0;
        }
      });
    });
    setGettingData(false);
  }, [searchCondition, selectValues]);

  const onHiding = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onApply = useCallback(
    (changes: any) => {
      const latest = [...changes];
      realColumns.forEach((column: ColumnOptions) => {
        const found = changes.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        if (!found) {
          column.visible = false;
          latest.push(column);
        }
      });
      setColumnsState(latest);
      setVisible(false);
    },
    [setColumnsState, setVisible]
  );

  const renderValue = useCallback(() => {
    if (isLoading) {
      return <></>;
    } else {
      return (
        <>
          <div id="placeViewToggleColumns" className={"w-full mt-4"}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                id="CustomColumn"
                style={{ marginRight: "16px" }}
                icon={"/images/icons/settings.svg"}
                onClick={() => setVisible(!visible)}
              />
            </div>

            <div>
              <CustomColumnChooser
                position="right"
                title={t("ToggleColumn")}
                applyText={t("Apply")}
                cancelText={t("Cancel")}
                selectAllText={t("SelectAll")}
                container={"#placeViewToggleColumns"} // chỉ định địa điểm mà cái này sẽ xuất hiện
                button={"#CustomColumn"}
                visible={visible}
                columns={columns}
                actualColumns={realColumns}
                onHiding={onHiding}
                onApply={onApply}
              />
            </div>

            <ScrollView height={windowSize.height - 120}>
              {searchCondition.CheckBanLe == 1 && (
                <Resizable minWidth={400} minHeight={150} maxHeight={370}>
                  <h3>Báo cáo bán lẻ</h3>
                  <DataGrid
                    id="gridContainer"
                    dataSource={data?.Lst_RptMaster_BanLe ?? []}
                    className="Bang1"
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    remoteOperations={false}
                    columnAutoWidth={true}
                    cacheEnabled={true}
                    noDataText={t("ThereIsNoData")}
                    // height={windowSize.height - 150}
                    width={"100%"}
                    height="100%"
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

                    {realColumns.map((column: ColumnOptions, index: number) => (
                      <Column key={index} {...column} />
                    ))}
                  </DataGrid>
                </Resizable>
              )}
              {searchCondition.CheckTonKhoDaiLy == 1 && (
                <Resizable>
                  <h3>Báo cáo tồn kho đại lý</h3>
                  <DataGrid
                    id="gridContainer"
                    className="Bang2"
                    dataSource={data?.Lst_RptMaster_TonKhoDaiLy ?? []}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    remoteOperations={false}
                    columnAutoWidth={true}
                    cacheEnabled={true}
                    noDataText={t("ThereIsNoData")}
                    // height={windowSize.height - 150}
                    width={"100%"}
                    height="100%"
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

                    {realColumns.map((column: ColumnOptions, index: number) => {
                      return <Column key={index} {...column} />;
                    })}
                  </DataGrid>
                </Resizable>
              )}
              {searchCondition.CheckBanBuonHTC == 1 && (
                <Resizable>
                  <h3>Báo cáo bán buôn HTC</h3>
                  <DataGrid
                    id="gridContainer"
                    className="Bang3"
                    dataSource={data?.Lst_RptMaster_BanBuonHTC ?? []}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    remoteOperations={false}
                    columnAutoWidth={true}
                    cacheEnabled={true}
                    noDataText={t("ThereIsNoData")}
                    // height={windowSize.height - 150}
                    width={"100%"}
                    height="100%"
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

                    {realColumns.map((column: ColumnOptions, index: number) => (
                      <Column key={index} {...column} />
                    ))}
                  </DataGrid>
                </Resizable>
              )}
              {searchCondition.CheckTonKhoHTC == 1 && (
                <Resizable>
                  <h3>Báo cáo tồn kho HTC</h3>
                  <DataGrid
                    id="gridContainer"
                    className="Bang4"
                    dataSource={data?.Lst_RptMaster_TonKhoHTC ?? []}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    remoteOperations={false}
                    columnAutoWidth={true}
                    cacheEnabled={true}
                    noDataText={t("ThereIsNoData")}
                    // height={windowSize.height - 150}
                    width={"100%"}
                    height="100%"
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

                    {realColumns.map((column: ColumnOptions, index: number) => (
                      <Column key={index} {...column} />
                    ))}
                  </DataGrid>
                </Resizable>
              )}
              {searchCondition.CheckNhapHang == 1 && (
                <Resizable>
                  <h3>Báo cáo nhập hàng</h3>
                  <DataGrid
                    id="gridContainer"
                    className="Bang5"
                    dataSource={data?.Lst_RptMaster_NhapHang ?? []}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    remoteOperations={false}
                    columnAutoWidth={true}
                    cacheEnabled={true}
                    noDataText={t("ThereIsNoData")}
                    // height={windowSize.height - 150}
                    width={"100%"}
                    height="100%"
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

                    {realColumns.map((column: ColumnOptions, index: number) => (
                      <Column key={index} {...column} />
                    ))}
                  </DataGrid>
                </Resizable>
              )}
              {searchCondition.CheckShipping == 1 && (
                <Resizable>
                  <h3>Báo cáo shipping</h3>
                  <DataGrid
                    id="gridContainer"
                    className="Bang6"
                    dataSource={data?.Lst_RptMaster_Shipping ?? []}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    remoteOperations={false}
                    columnAutoWidth={true}
                    cacheEnabled={true}
                    noDataText={t("ThereIsNoData")}
                    // height={windowSize.height - 150}
                    width={"100%"}
                    height="100%"
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

                    {realColumns.map((column: ColumnOptions, index: number) => (
                      <Column key={index} {...column} />
                    ))}
                  </DataGrid>
                </Resizable>
              )}
              {searchCondition.CheckSanXuat == 1 && (
                <Resizable>
                  <h3>Báo cáo sản xuất</h3>
                  <DataGrid
                    id="gridContainer"
                    className="Bang7"
                    dataSource={data?.Lst_RptMaster_SanXuat ?? []}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    remoteOperations={false}
                    columnAutoWidth={true}
                    cacheEnabled={true}
                    noDataText={t("ThereIsNoData")}
                    // height={windowSize.height - 150}
                    width={"100%"}
                    height="100%"
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

                    {realColumns.map((column: ColumnOptions, index: number) => (
                      <Column key={index} {...column} />
                    ))}
                  </DataGrid>
                </Resizable>
              )}
              {searchCondition.CheckPI == 1 && (
                <Resizable>
                  <h3>Báo cáo PI (Đặt hàng)</h3>
                  <DataGrid
                    id="gridContainer"
                    className="Bang8"
                    dataSource={data?.Lst_RptMaster_DatHang ?? []}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    remoteOperations={false}
                    columnAutoWidth={true}
                    cacheEnabled={true}
                    noDataText={t("ThereIsNoData")}
                    // height={windowSize.height - 150}
                    width={"100%"}
                    height="100%"
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

                    {realColumns.map((column: ColumnOptions, index: number) => (
                      <Column key={index} {...column} />
                    ))}
                  </DataGrid>
                </Resizable>
              )}
            </ScrollView>
          </div>
        </>
      );
    }
  }, [columns, isLoading]);

  // I want to restore columns from localStorage if it exists
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
                storeKey={"Rpt_Master-search"}
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
            {renderValue()}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
