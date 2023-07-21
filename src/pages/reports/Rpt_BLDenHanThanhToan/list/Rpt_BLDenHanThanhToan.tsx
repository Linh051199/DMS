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
import { format, isAfter, isBefore } from "date-fns";
import { DataGrid, LoadPanel, PivotGrid, ScrollView } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import {
  Column,
  ColumnFixing,
  HeaderFilter,
  Item,
  Paging,
  Scrolling,
  Sorting,
  Toolbar,
} from "devextreme-react/data-grid";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { ColumnOptions } from "@/types";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  TDate_From: Date | number;
  TDate_To: Date | number;
  ReportType: string;
  FlagDataWH: string | boolean;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_BLDenHanThanhToan = () => {
  const { t } = useI18n("Rpt_BLDenHanThanhToan");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    TDate_To: new Date(),
    ReportType: "0",
    FlagDataWH: false,
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_BLDenHanThanhToan",
      "Rpt_BLDenHanThanhToan_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_BLDenHanThanhToan_SearchHQ({
          ...searchCondition,
          FlagDataWH: searchCondition.FlagDataWH ? "1" : "0",
        } as any);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.Rpt_BLDenHanThanhToan_ExportSearchHQ({
      ...searchCondition,
      FlagDataWH: searchCondition.FlagDataWH ? "1" : "0",
    } as any);
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
  const listReportTypeRpt = [
    {
      ReportTypeName: "Chưa thanh toán đủ",
      ReportTypeValue: "0",
    },
    {
      ReportTypeName: "Đã thanh toán đủ",
      ReportTypeValue: "1",
    },
  ];
  const searchFields: IItemProps[] = [
    {
      caption: t("TDate_From"),
      dataField: "TDate_From",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
        max: new Date(),
      },
      validationRules: [
        RequiredField(t("TDate_FromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.TDate_To) {
              return !isAfter(value, searchCondition.TDate_To);
            }
            return true;
          },
          message: t("TDate_FromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: t("TDate_To"),
      dataField: "TDate_To",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("DateToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.TDate_From);
          },
          message: t("DateToMustBeAfterTDate_From"),
        },
      ],
    },
    {
      dataField: "ReportType",
      caption: t("ReportType"),
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listReportTypeRpt ?? [],
        valueExpr: "ReportTypeValue",
        displayExpr: "ReportTypeName",
        searchEnabled: true,
      },
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
      data.Data?.Lst_Rpt_BLDenHanThanhToan.map(
        (item: any, index: any) => (item.Id = index + 1)
      );
    }
  }, [data]);

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        caption: t("STT"),
        dataField: "Id",
        visible: true,
      },
      {
        caption: t("BankCode"),
        dataField: "BankCode",
        visible: true,
      },
      {
        caption: t("BankName"),
        dataField: "BankName",
        visible: true,
      },

      {
        caption: t("Số ngày chậm thanh toán BL"),
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("NgayCham_0"),
            dataField: "NgayCham_0",
          },

          {
            caption: t("NgayCham_1_2"),
            dataField: "NgayCham_1_2",
          },

          {
            caption: t("NgayCham_3_6"),
            dataField: "NgayCham_3_6",
          },

          {
            caption: t("NgayCham_6"),
            dataField: "NgayCham_6",
          },
        ],
      },

      {
        caption: t("CountCarId"),
        dataField: "CountCarId",
        visible: true,
      },

      {
        caption: t("GuaranteeValueNoPayment"),
        dataField: "GuaranteeValueNoPayment",
        visible: true,
        customizeText: (e: any) => {
          return e.value.toLocaleString();
        },
      },
    ];
  }, [isLoading]);

  // =================================================================
  const [visible, setVisible] = useState(false);

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_DuKienDongTienTT_ChiTiet-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );

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
  const onToolbarPreparing = useCallback((e: any) => {
    e.toolbarOptions.items.push({
      widget: "dxButton",
      location: "after",
      options: {
        icon: "/images/icons/settings.svg",
        elementAttr: {
          id: "myColumnChooser",
        },
        onClick: () => setVisible(!visible),
      },
    });
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
                storeKey={"Rpt_BLDenHanThanhToan-search"}
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
              <ScrollView height={windowSize.height - 120}>
                <DataGrid
                  id={"gridContainer"}
                  dataSource={data?.Data?.Lst_Rpt_BLDenHanThanhToan ?? []}
                  showBorders={true}
                  showRowLines={true}
                  showColumnLines={true}
                  onToolbarPreparing={onToolbarPreparing}
                  columnAutoWidth={true}
                  allowColumnResizing={true}
                  columnResizingMode="widget"
                  allowColumnReordering={false}
                  className={"mx-auto my-5"}
                  width={"100%"}
                >
                  <HeaderFilter allowSearch={true} visible={true} />
                  <ColumnFixing enabled={true} />
                  <Scrolling showScrollbar={"always"} />
                  <Paging defaultPageSize={50} />
                  <Sorting mode={"multiple"} />
                  {realColumns.map((col: any) => (
                    <Column key={col.dataField} {...col} />
                  ))}
                  <Toolbar>
                    <Item>
                      <CustomColumnChooser
                        title={t("ToggleColumn")}
                        applyText={t("Apply")}
                        cancelText={t("Cancel")}
                        selectAllText={t("SelectAll")}
                        container={"#gridContainer"}
                        button={"#myColumnChooser"}
                        visible={visible}
                        columns={columns}
                        actualColumns={realColumns}
                        onHiding={onHiding}
                        onApply={onApply}
                      />
                    </Item>
                  </Toolbar>
                </DataGrid>
              </ScrollView>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
