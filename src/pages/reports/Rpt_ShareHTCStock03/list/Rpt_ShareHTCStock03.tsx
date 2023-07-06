import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useRpt_ShareHTCStock03Param } from "@/packages/api/clientgate/Rpt_ShareHTCStock03Api";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { IItemProps } from "devextreme-react/form";
import { LoadPanel, PivotGrid } from "devextreme-react";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { useQuery } from "@tanstack/react-query";
import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import {
  Export,
  FieldChooser,
  FieldPanel,
  Scrolling,
  StateStoring,
  LoadPanel as PivotLoadPanel,
} from "devextreme-react/pivot-grid";
import { requiredType } from "@/packages/common/Validation_Rules";

export const Rpt_ShareHTCStock03 = () => {
  const { t } = useI18n("Rpt_ShareHTCStock03");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const [searchCondition, setSearchCondition] =
    useState<useRpt_ShareHTCStock03Param>({} as useRpt_ShareHTCStock03Param);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const { data, isLoading } = useQuery({
    queryKey: [
      "report",
      "Rpt_ShareHTCStock03",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_ShareHTCStock03_SearchDL({
          DealerCodeInput: searchCondition.DealerCodeInput ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as useRpt_ShareHTCStock03Param);
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
  const handleExportExcel = useCallback(() => {}, []);
  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.Rpt_ShareHTCStock03_ExportDetailSearchHQ({
      DealerCodeInput: "",
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

  const handleSearch = useCallback(
    async (data: useRpt_ShareHTCStock03Param) => {
      reloading();
    },
    []
  );

  const searchFields: IItemProps[] = [
    {
      dataField: "DealerCodeInput",
      label: {
        text: t("Dealer Code Input"),
      },
      editorType: "dxSelectBox",
      visible: true,
      validationRules: [requiredType],
      editorOptions: {
        displayExpr: (item: any) => (item ? `${item.DealerName}` : ""),
        valueExpr: "DealerCode",
        searchEnabled: true,
        validationMessageMode: "always",
        items: listDealer?.DataList ?? [],
      },
    },
    {
      dataField: "FlagDataWH",
      visible: true,
      editorType: "dxCheckBox",
      label: {
        location: "left",
        text: t("FlagDataWH"),
      },
    },
  ];
  const fields = useMemo<Field[]>(() => {
    return [
      {
        dataField: "CARID",
        area: "row",
        areaIndex: 0,
        expanded: false,
      },
      {
        dataField: "CVCOLOREXTNAMEVN",
        area: "row",
        areaIndex: 4,
      },
      {
        dataField: "CVSPECDESCRIPTION",
        area: "row",
        areaIndex: 3,
      },
      {
        dataField: "AC_SPECDESCRIPTION",
        area: "row",
        areaIndex: 2,
      },
      {
        caption: t("TOTAL"),
        dataField: "TOTAL",
        area: "data",
        areaIndex: 0,
        showGrandTotals: true,
        showTotals: true,
        visible: true,
        summaryType: "count",
        isMeasure: true,
      },
      {
        dataField: "CCMODELCODE",
        area: "row",
        areaIndex: 1,
      },
      {
        dataField: "LOAITHUNG",
        area: "filter",
        areaIndex: 7,
      },

      {
        dataField: "DEALERCODE",
        area: "filter",
        areaIndex: 3,
      },

      {
        dataField: "CVCOLOREXTNAME",
        area: "filter",
        areaIndex: 4,
      },

      {
        dataField: "SOCODE",
        area: "filter",
        areaIndex: 2,
      },
      {
        dataField: "DELIVERYORDERNO",
        area: "filter",
        areaIndex: 5,
      },

      {
        dataField: "DUTYCOMPLETEDPERCENT",
        area: "filter",
        areaIndex: 1,
      },
      {
        dataField: "DUTYCOMPLETEDPERCENT_AF",
        area: "filter",
        areaIndex: 6,
      },

      {
        dataField: "COUPLE_COLOR_CODE",
        area: "filter",
        areaIndex: 0,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_RptShare_HTCStock03, //Lst_Rpt_BusinessPlan_Summary
  });

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
                storeKey={"rpt-statistic-htc-stock-out-on-way-search"}
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
            <div className={"w-full mt-4"}>
              {!!data && data.Data?.Lst_RptShare_HTCStock03 && (
                <PivotGrid
                  id="pivotgrid"
                  dataSource={dataSource}
                  allowSortingBySummary={true}
                  allowFiltering={true}
                  showBorders={true}
                  showColumnTotals={true}
                  showColumnGrandTotals={true}
                  showRowTotals={true}
                  showRowGrandTotals={true}
                  height={windowSize.height - 150}
                  allowExpandAll={true}
                >
                  <Scrolling mode={"virtual"} />
                  <FieldChooser enabled={true} height={400} />
                  <PivotLoadPanel
                    enabled={true}
                    showPane={true}
                    showIndicator={true}
                  />
                  <Export enabled={true} />
                  <StateStoring
                    enabled={true}
                    storageKey={"report-Rpt_ShareHTCStock03"}
                  />
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
