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
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { useVisibilityControl } from "@/packages/hooks";
import { Rpt_MapVINParam } from "@/packages/api/clientgate/Rpt_MapVINApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { isAfter, isBefore } from "date-fns";
interface IReportParam {
  MapVINDateFrom: any;
  MapVINDateTo: any;
  DealerCodeInput: string;
  SOCode: string;
  MapVINStorage: string;
  MapVINType: string;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_MapVIN = () => {
  const { t } = useI18n("Rpt_MapVIN");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    MapVINDateTo: new Date(),
    MapVINType: "",
  } as IReportParam);

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
        const resp = await api.Rpt_MapVIN_SearchHQ({
          MapVINDateFrom: searchCondition.MapVINDateFrom ?? "",
          MapVINDateTo: searchCondition.MapVINDateTo ?? "",
          DealerCodeInput: searchCondition.DealerCodeInput ?? "",
          SOCode: searchCondition.SOCode ?? "",
          MapVINStorage: searchCondition.MapVINStorage ?? "",
          MapVINType: searchCondition.MapVINType ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_MapVINParam);
        return resp?.Data?.Lst_Rpt_MapVIN;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: dealerCodeData } = useQuery({
    queryKey: ["dealerCode_In_Rpt_MapVIN"],
    queryFn: () => {
      return api.Mst_Dealer_GetAllActive();
    },
  });

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
    const result = await api.Rpt_MapVIN_ExportSearchHQ({
      MapVINDateFrom: searchCondition.MapVINDateFrom ?? "",
      MapVINDateTo: searchCondition.MapVINDateTo ?? "",
      DealerCodeInput: searchCondition.DealerCodeInput ?? "",
      SOCode: searchCondition.SOCode ?? "",
      MapVINStorage: searchCondition.MapVINStorage ?? "",
      MapVINType: searchCondition.MapVINType ?? "",
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
      caption: t("MapVINDateFrom"),
      dataField: "MapVINDateFrom",
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
        RequiredField(t("MapVINDateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.MapVINDateTo) {
              return !isAfter(value, searchCondition.MapVINDateTo);
            }
            return true;
          },
          message: t("MapVINDateFromMustBeBeforeMapVINDateTo"),
        },
      ],
    },
    {
      caption: t("MapVINDateTo"),
      dataField: "MapVINDateTo",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("MapVINDateToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.MapVINDateFrom);
          },
          message: t("MapVINDateToMustBeAfterDateFrom"),
        },
      ],
    },
    {
      dataField: "MapVINType",
      // visible: true,
      caption: t("MapVINType"),
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "",
            text: "Tất cả",
          },
          {
            value: "Auto",
            text: "Auto",
          },
          {
            value: "Manual",
            text: "Manual",
          },
        ],
      },
    },
    {
      dataField: "MapVINStorage",
      // visible: true,
      caption: t("MapVINStorage"),
      editorType: "dxTextBox",
    },
    {
      dataField: "DealerCodeInput",
      // visible: true,
      caption: t("DealerCodeInput"),
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: dealerCodeData?.DataList ?? [],
        valueExpr: "DealerCode",
        displayExpr: "DealerName",
        searchEnabled: true,
      },
    },
    {
      dataField: "SOCode",
      // visible: true,
      caption: t("SOCode"),
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
        caption: t("DEALERCODE"),
        dataField: "DEALERCODE",
        visible: true,
      },
      {
        caption: t("MD_DEALERNAME"),
        dataField: "MD_DEALERNAME",
        visible: true,
      },

      {
        caption: t("CARID"),
        dataField: "CARID",
        visible: true,
      },

      {
        caption: t("MCS_SPECCODE"),
        dataField: "MCS_SPECCODE",
        visible: true,
      },

      {
        caption: t("MCS_SPECDESCRIPTION"),
        dataField: "MCS_SPECDESCRIPTION",
        visible: true,
      },

      {
        caption: t("MCC_COLORCODE"),
        dataField: "MCC_COLORCODE",
        visible: true,
      },

      {
        caption: t("MCC_COLORNAME"),
        dataField: "MCC_COLORNAME",
        visible: true,
      },

      {
        caption: t("CV_SPECCODE"),
        dataField: "CV_SPECCODE",
        visible: true,
      },

      {
        caption: t("CV_SPECDESCRIPTION"),
        dataField: "CV_SPECDESCRIPTION",
        visible: true,
      },

      {
        caption: t("CV_COLORCODE"),
        dataField: "CV_COLORCODE",
        visible: true,
      },

      {
        caption: t("CV_VIN"),
        dataField: "CV_VIN",
        visible: true,
      },

      {
        caption: t("MAPVINSTORAGE"),
        dataField: "MAPVINSTORAGE",
        visible: true,
      },

      {
        caption: t("MAPVINBY"),
        dataField: "MAPVINBY",
        visible: true,
      },

      {
        caption: t("OSO_CREATEDDATE"),
        dataField: "OSO_CREATEDDATE",
        visible: true,
      },

      {
        caption: t("OSOD_APPROVEDDATE"),
        dataField: "OSOD_APPROVEDDATE",
        visible: true,
      },

      {
        caption: t("OSO_SOTYPE"),
        dataField: "OSO_SOTYPE",
        visible: true,
      },

      {
        caption: t("OSO_SOCODE"),
        dataField: "OSO_SOCODE",
        visible: true,
      },

      {
        caption: t("COCONLY_COMPLETEDDATE"),
        dataField: "COCONLY_COMPLETEDDATE",
        visible: true,
      },

      {
        caption: t("CV_PRODUCTIONMONTH"),
        dataField: "CV_PRODUCTIONMONTH",
        visible: true,
      },

      {
        caption: t("STOREDATE"),
        dataField: "STOREDATE",
        visible: true,
      },
    ];
  }, [isLoading]);

  // =================================================================
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_MapVIN-columns",
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
                storeKey={"Rpt_MapVIN-search"}
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
