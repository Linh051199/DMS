import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { RptSaleBaoCaoTongHopGetParam } from "@/packages/api/clientgate/Rpt_SaleBaoCaoTongHopGetApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button, DataGrid, LoadPanel, PivotGrid } from "devextreme-react";
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
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import {
  selectedColumnsItemsAtom,
  selectedSearchAtom,
} from "../components/store";
import { useReportColumns } from "../components/useReportColumns";
interface IReportParam {
  TDateReport: any;
  FlagDataWH: 1 | 0;
}

export const Rpt_SaleBaoCaoTongHop = () => {
  const { t } = useI18n("Rpt_SaleBaoCaoTongHop");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const setSearchItems = useSetAtom(selectedSearchAtom);
  const setColumnsItems = useSetAtom(selectedColumnsItemsAtom);

  const [searchCondition, setSearchCondition] =
    useState<RptSaleBaoCaoTongHopGetParam>({
      TDateReport: "",
      FlagDataWH: 0,
    } as RptSaleBaoCaoTongHopGetParam);
  const [columnAreaState, setColumnAreaState] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, refetch } = useQuery({
    queryKey: [
      "report",
      "RptSaleBaoCaoTongHopGet_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey === "0") {
        return [];
      }
      // debugger;
      const resp = await api.RptSaleBaoCaoTongHopGet_SearchHQ({
        TDateReport: searchCondition.TDateReport ?? "",
        FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
      } as RptSaleBaoCaoTongHopGetParam);
      if (resp.isSuccess) {
        const listDealerCode = resp?.Data?.ListDealerCode;
        if (listDealerCode) {
          const valueDealer = listDealerCode?.map((item) => {
            return {
              caption: t(item.AreaName),
              alignment: "center",
              dataField: item.AreaCode,
              columns: item.Lst_DealerCode.map((e: any) => {
                return {
                  dataField: e,
                  caption: e,
                };
              }),
            };
          });
          setColumnAreaState(valueDealer);
        }
        return resp.Data?.Lst_Rpt_Sale_BaoCaoTongHopGet ?? [];
      }
      return [];
    },
    enabled: true,
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.RptSaleBaoCaoTongHopGet_ExportSearchHQ(
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
    const result = await api.RptSaleBaoCaoTongHopGet_ExportSearchHQ({
      TDateReport: searchCondition.TDateReport ?? "",
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
    const startDate = new Date("2019-01-01");
    const endDate = new Date();

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

  useEffect(() => {
    searchCondition.TDateReport = yearDs()[1].text;
  }, []);

  const searchFields: IItemProps[] = [
    {
      dataField: "TDateReport",
      visible: true,
      caption: t("TDateReport"),
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: yearDs() ?? [],
        displayExpr: "text",
        valueExpr: "year",
        validationMessageMode: "always",
        validationGroup: "form",
      },
      validationRules: [RequiredField(t("TDateReportIsRequired"))],
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

  const handleSearch = useCallback(async (data: IReportParam) => {
    setSearchCondition(searchCondition);
    setSearchItems(searchCondition);
    setColumnsItems(columnAreaState);
    setLoading(true);
    reloading();
    await refetch();
    setLoading(false);
  }, []);

  // DataGrid
 

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_SaleBaoCaoTongHopGet-columns",
  });

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      const outputColumns = [...columns, ...columnAreaState];
      setColumnsState(outputColumns);
    }
  }, [data]);

  const columns = useReportColumns({
    data: data || [],
  });

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
            <div className="w-[200px]">
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"Rpt_SaleBaoCaoTongHop-search"}
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
              <DataGrid
                id="gridContainer"
                dataSource={data}
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
                {realColumns?.map((column: ColumnOptions, index: number) => (
                  <Column key={index} {...column} />
                ))}
              </DataGrid>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
