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
import {
  Button,
  DataGrid,
  LoadPanel,
  PivotGrid,
  ScrollView,
} from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { Rpt_NXTQuyenDoiNoParam } from "@/packages/api/clientgate/Rpt_NXTQuyenDoiNoApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { useVisibilityControl } from "@/packages/hooks";
import {
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
interface IReportParam {
  TDate_From: any;
  TDate_To: any;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_NXTQuyenDoiNo = () => {
  const { t } = useI18n("Rpt_NXTQuyenDoiNo");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    TDate_To: new Date(),
    FlagDataWH: 0,
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_NXTQuyenDoiNo",
      "Rpt_NXTQuyenDoiNo_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_NXTQuyenDoiNo_SearchHQ({
          TDate_From: searchCondition.TDate_From ?? "",
          TDate_To: searchCondition.TDate_To ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_NXTQuyenDoiNoParam);
        return resp?.Data?.Lst_Rpt_NXT_QuyenDoiNo;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.Rpt_NXTQuyenDoiNo_ExportSearchHQ(
      searchCondition
    );
    if (response.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = response.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
    }
  }, [searchCondition]);

  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.Rpt_NXTQuyenDoiNo_ExportDetailSearchHQ({
      TDate_From: searchCondition.TDate_From ?? "",
      TDate_To: searchCondition.TDate_To ?? "",
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
      caption: t("TDate_From"),
      dataField: "TDate_From",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
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
        RequiredField(t("TDate_ToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.TDate_From);
          },
          message: t("TDate_ToMustBeAfterDateFrom"),
        },
      ],
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
        visible: true,
        alignment: "center",
      },
      {
        caption: t("BankCodeMonitor"),
        dataField: "BankCodeMonitor",
        visible: true,
      },
      {
        caption: t("Dầu kì"),
        alignment: "center",
        dataField: "Dầu kì",
        columns: [
          {
            caption: t("SLDauKy"),
            dataField: "SLDauKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            caption: t("GiaTriDauKy"),
            dataField: "GiaTriDauKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },

      {
        caption: t("Tăng"),
        alignment: "center",
        dataField: "Tăng",
        columns: [
          {
            caption: t("SLTangKy"),
            dataField: "SLTangKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            caption: t("GiaTriTangKy"),
            dataField: "GiaTriTangKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },

      {
        caption: t("Giảm"),
        alignment: "center",
        dataField: "Giảm",
        columns: [
          {
            caption: t("SLGiamKy"),
            dataField: "SLGiamKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            caption: t("GiaTriGiamKy"),
            dataField: "GiaTriGiamKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },

      {
        caption: t("Cuối kì"),
        alignment: "center",
        dataField: "Cuối kì",
        columns: [
          {
            caption: t("SLCuoiKy"),
            dataField: "SLCuoiKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            caption: t("GiaTriCuoiKy"),
            dataField: "GiaTriCuoiKy",
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
    storeKey: "Rpt_NXTQuyenDoiNo-columns",
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
                storeKey={"Rpt_NXTQuyenDoiNo-search"}
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
