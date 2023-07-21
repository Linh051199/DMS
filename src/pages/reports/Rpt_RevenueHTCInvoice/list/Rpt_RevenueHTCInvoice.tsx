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
import { format, getYear } from "date-fns";
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
import { useRpt_DlrContractInstockParam } from "@/packages/api/clientgate/Rpt_DlrContractInstockApi";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { Rpt_RevenueHTCInvoiceParam } from "@/packages/api/clientgate/Rpt_RevenueHTCInvoiceApi";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { useVisibilityControl } from "@/packages/hooks";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  strnrptYear?: any;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

const currentYear = getYear(new Date());
const yearDataSource = Array.from(new Array(100), (x, i) => i).map((x) => ({
  value: currentYear - x,
  text: (currentYear - x).toString(),
}));

export const Rpt_RevenueHTCInvoice = () => {
  const { t } = useI18n("Rpt_RevenueHTCInvoice");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    strnrptYear: currentYear,
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_RevenueHTCInvoice",
      "Rpt_RevenueHTCInvoice_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_RevenueHTCInvoice_SearchHQ({
          strnrptYear: searchCondition.strnrptYear ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_RevenueHTCInvoiceParam);
        return resp.Data?.Lst_Rpt_Revenue_HTCInvoice;
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
      caption: t("strnrptYear"),
      dataField: "strnrptYear",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: yearDataSource,
        displayExpr: "text",
        valueExpr: "value",
      },
      validationRules: RequiredField(t("strnrptYearIsRequired!")),
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
        caption: t("STT"),
        dataField: "Id",
        alignment: "center",
        visible: true,
      },
      {
        dataField: "DEALERCODE",
        caption: t("DEALERCODE"),
      },
      {
        dataField: "DEALERNAME",
        caption: t("DEALERNAME"),
      },
      {
        dataField: "COMPANYNAME",
        caption: t("COMPANYNAME"),
      },
      {
        caption: t("Tháng 1"),
        dataField: "Tháng 1",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_01",
            caption: t("SOLUONG_01"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_01",
            caption: t("TONGDOANHTHU_01"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 2"),
        dataField: "Tháng 2",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_02",
            caption: t("SOLUONG_02"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_02",
            caption: t("TONGDOANHTHU_02"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 3"),
        dataField: "Tháng 3",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_03",
            caption: t("SOLUONG_03"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_03",
            caption: t("TONGDOANHTHU_03"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 4"),
        dataField: "Tháng 4",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_04",
            caption: t("SOLUONG_04"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_04",
            caption: t("TONGDOANHTHU_04"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 5"),
        dataField: "Tháng 5",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_05",
            caption: t("SOLUONG_05"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_05",
            caption: t("TONGDOANHTHU_05"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 6"),
        dataField: "Tháng 6",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_06",
            caption: t("SOLUONG_06"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_06",
            caption: t("TONGDOANHTHU_06"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 7"),
        dataField: "Tháng 7",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_07",
            caption: t("SOLUONG_07"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_07",
            caption: t("TONGDOANHTHU_07"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 8"),
        dataField: "Tháng 8",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_08",
            caption: t("SOLUONG_08"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_08",
            caption: t("TONGDOANHTHU_08"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 9"),
        dataField: "Tháng 9",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_09",
            caption: t("SOLUONG_09"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_09",
            caption: t("TONGDOANHTHU_09"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 10"),
        dataField: "Tháng 10",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_10",
            caption: t("SOLUONG_10"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_10",
            caption: t("TONGDOANHTHU_10"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 11"),
        dataField: "Tháng 11",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_11",
            caption: t("SOLUONG_11"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_11",
            caption: t("TONGDOANHTHU_11"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tháng 12"),
        dataField: "Tháng 12",
        alignment: "center",
        columns: [
          {
            dataField: "SOLUONG_12",
            caption: t("SOLUONG_12"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU_12",
            caption: t("TONGDOANHTHU_12"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tổng cộng"),
        alignment: "center",
        dataField: "Tổng cộng",
        columns: [
          {
            dataField: "SOLUONG",
            caption: t("SOLUONG"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "TONGDOANHTHU",
            caption: t("TONGDOANHTHU"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
    ];
  }, [isLoading]);

  // =================================================================
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_RevenueHTCInvoice-columns",
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
                storeKey={"Rpt_RevenueHTCInvoice-search"}
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
