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
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { useVisibilityControl } from "@/packages/hooks";
import { Rpt_Statistic_DMS40CarDeliveryOrderParam } from "@/packages/api/clientgate/Rpt_Statistic_DMS40CarDeliveryOrderApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  FlagDataWH?: number | "";
  Vin?: string | "";
  DealerCodeInput?: string;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_Statistic_DMS40CarDeliveryOrder = () => {
  const { t } = useI18n("Rpt_Statistic_DMS40CarDeliveryOrder");
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
      "Rpt_Statistic_DMS40CarDeliveryOrder",
      "Rpt_Statistic_DMS40CarDeliveryOrder_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_Statistic_DMS40CarDeliveryOrder_SearchHQ({
          DealerCodeInput: searchCondition.DealerCodeInput ?? "",
          Vin: searchCondition.Vin ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_Statistic_DMS40CarDeliveryOrderParam);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: listDealer } = useQuery(["dealer"], () =>
    api.Mst_Dealer_GetAllActive()
  );

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response =
      await api.Rpt_Statistic_DMS40CarDeliveryOrder_ExportSearchHQ(
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
    const result =
      await api.Rpt_Statistic_DMS40CarDeliveryOrder_ExportDetailSearchHQ({
        DealerCodeInput: searchCondition.DealerCodeInput ?? "",
        Vin: searchCondition.Vin ?? "",
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
      caption: t("DealerCodeInput"),
      dataField: "DealerCodeInput",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listDealer?.DataList ?? [],
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
      },
      validationRules: [RequiredField(t("MapVINDateFromIsRequired"))],
    },
    {
      caption: t("Vin"),
      dataField: "Vin",
      visible: true,
      editorType: "dxTextBox",
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
      data?.Data?.Lst_Rpt_Statistic_DMS40CarDeliveryOrder?.map(
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
        alignment: "center",
      },

      {
        dataField: "DealerCode",
        caption: t("DealerCode"),
        visible: true,
      },
      {
        dataField: "CarId",
        caption: t("CarId"),
        visible: true,
      },
      {
        dataField: "VIN",
        caption: t("VIN"),
      },
      {
        dataField: "ModelCode",
        caption: t("ModelCode"),
      },
      {
        dataField: "mcm_ModelName",
        caption: t("mcm_ModelName"),
      },
      {
        dataField: "SpecCode",
        caption: t("SpecCode"),
      },
      {
        dataField: "ColorCode",
        caption: t("ColorCode"),
      },
      {
        dataField: "mcc_ColorName",
        caption: t("mcc_ColorName"),
      },
      {
        dataField: "CQStartDate",
        caption: t("CQStartDate"),
      },
      {
        dataField: "TaxPaymentDate",
        caption: t("TaxPaymentDate"),
      },
      {
        dataField: "DutyCompletedAmount_AF",
        caption: t("DutyCompletedAmount_AF"),
      },
      {
        dataField: "DUTYCOMPLETEPERCENT_AF",
        caption: t("DUTYCOMPLETEPERCENT_AF"),
      },
      {
        dataField: "CarDueDate",
        caption: t("CarDueDate"),
      },
      {
        dataField: "ssr_StorageRearrangeNo",
        caption: t("ssr_StorageRearrangeNo"),
      },
      {
        dataField: "ssr_CreatedDate",
        caption: t("ssr_CreatedDate"),
      },
    ];
  }, [isLoading]);

  // =================================================================
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_Statistic_DMS40CarDeliveryOrder-columns",
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
                storeKey={"Rpt_Statistic_DMS40CarDeliveryOrder-search"}
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
              dataSource={
                data?.Data?.Lst_Rpt_Statistic_DMS40CarDeliveryOrder ?? []
              }
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
