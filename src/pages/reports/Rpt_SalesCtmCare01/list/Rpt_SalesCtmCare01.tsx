import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useI18n } from "@/i18n/useI18n";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { useClientgateApi } from "@packages/api";
import { format, isAfter, isBefore } from "date-fns";
import PivotGrid, {
  Export,
  FieldChooser,
  FieldPanel,
  LoadPanel as PivotLoadPanel,
  Scrolling,
  StateStoring,
} from "devextreme-react/pivot-grid";
import { useQuery } from "@tanstack/react-query";
import { RptStatisticDealerStock21Param } from "@packages/api/clientgate/RptStatisticDealerStock21";
import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { toast } from "react-toastify";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { IItemProps } from "devextreme-react/form";
import { useAtomValue, useSetAtom } from "jotai";
import { RequiredField } from "@packages/common/Validation_Rules";
import { LoadPanel } from "devextreme-react";
import { nanoid } from "nanoid";
import { PageHeader } from "../components/page-header";

interface ReportParam {
  DeliveryDateFrom: Date;
  DeliveryDateTo: Date;
  CreateDealDateFrom: Date;
  CreateDealDateTo: Date;
  CtmCareUpdDateFrom: Date;
  CtmCareUpdDateTo: Date;
  FlagDataWH: 1 | 0;
}

export const Rpt_SalesCtmCare01 = () => {
  const { t } = useI18n("RptSalesCtmCare01");

  const [searchCondition, setSearchCondition] = useState<ReportParam>({
    DeliveryDateTo: new Date(),
    CreateDealDateTo: new Date(),
    CtmCareUpdDateTo: new Date(),
  } as ReportParam);
  const windowSize = useWindowSize();
  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "report",
      "Rpt_SalesCtmCare01",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (!searchCondition.DeliveryDateFrom) {
        return [];
      }
      const resp = await api.RptSalesCtmCare01_SearchHQ({
        DeliveryDateFrom: searchCondition?.DeliveryDateFrom
          ? format(searchCondition?.DeliveryDateFrom, "yyyy-MM-dd")
          : "",
        DeliveryDateTo: searchCondition?.DeliveryDateTo
          ? format(searchCondition?.DeliveryDateTo, "yyyy-MM-dd")
          : "",
        CreateDealDateFrom: searchCondition?.CreateDealDateFrom
          ? format(searchCondition?.CreateDealDateFrom, "yyyy-MM-dd")
          : "",
        CreateDealDateTo: searchCondition?.CreateDealDateTo
          ? format(searchCondition?.CreateDealDateTo, "yyyy-MM-dd")
          : "",
        CtmCareUpdDateFrom: searchCondition?.CtmCareUpdDateFrom
          ? format(searchCondition?.CtmCareUpdDateFrom, "yyyy-MM-dd")
          : "",
        CtmCareUpdDateTo: searchCondition?.CtmCareUpdDateTo
          ? format(searchCondition?.CtmCareUpdDateTo, "yyyy-MM-dd")
          : "",
        FlagDataWH: searchCondition?.FlagDataWH ? 1 : 0,
      } as any);
      if (resp.isSuccess) {
        return resp.Data?.Lst_RptSales_CtmCare_01 ?? [];
      }
      return [];
    },
    enabled: true,
  });
  const handleSearch = useCallback(async (data: ReportParam) => {
    setGettingData(true);
    reloading();
    await refetch();
    setGettingData(false);
  }, []);

  const fields = useMemo<Field[]>(() => {
    return [
      {
        caption: t("TT_CARID"),
        dataField: "TT_CARID",
        area: "data",
        areaIndex: 0,
        summaryType: "count",
      },

      {
        caption: t("SPECDESCRIPTION"),
        dataField: "SPECDESCRIPTION",
        area: "row",
        areaIndex: 1,
        expanded: false,
      },
      {
        caption: t("AC_SPECDESCRIPTION"),
        dataField: "AC_SPECDESCRIPTION",
        area: "row",
        areaIndex: 2,
        expanded: false,
      },

      {
        caption: t("DLSD_DEALERCODE"),
        dataField: "DLSD_DEALERCODE",
        area: "row",
        areaIndex: 0,
        expanded: false,
      },

      {
        caption: t("VIN"),
        dataField: "VIN",
        area: "filter",
        areaIndex: 4,
        expanded: false,
      },

      {
        caption: t("PROVINCENAME"),
        dataField: "PROVINCENAME",
        area: "filter",
        areaIndex: 2,
        expanded: false,
      },

      {
        caption: t("DELIVERYDATE"),
        dataField: "DELIVERYDATE",
        area: "filter",
        areaIndex: 3,
        expanded: false,
      },

      {
        caption: t("AREANAMEDEALER"),
        dataField: "AREANAMEDEALER",
        area: "filter",
        areaIndex: 5,
      },

      {
        caption: t("HTCSTAFFINCHARGE"),
        dataField: "HTCSTAFFINCHARGE",
        area: "filter",
        areaIndex: 0,
      },

      {
        caption: t("AREANAMECUS"),
        dataField: "AREANAMECUS",
        area: "filter",
        areaIndex: 1,
        expanded: false,
      },
    ];
  }, [t]);

  const handleExportDetail = useCallback(async () => {
    const result = await api.RptSalesCtmCare01_ExportDetailSearchHQ({
      DeliveryDateFrom: format(searchCondition.DeliveryDateFrom, "yyyy-MM-dd"),
      DeliveryDateTo: searchCondition.DeliveryDateTo
        ? format(searchCondition.DeliveryDateTo, "yyyy-MM-dd")
        : "",
      CreateDealDateFrom: format(
        searchCondition.CreateDealDateFrom,
        "yyyy-MM-dd"
      ),
      CreateDealDateTo: searchCondition.CreateDealDateTo
        ? format(searchCondition.CreateDealDateTo, "yyyy-MM-dd")
        : "",
      CtmCareUpdDateFrom: format(
        searchCondition.CtmCareUpdDateFrom,
        "yyyy-MM-dd"
      ),
      CtmCareUpdDateTo: searchCondition.CtmCareUpdDateTo
        ? format(searchCondition.CtmCareUpdDateTo, "yyyy-MM-dd")
        : "",
      FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
    });
    if (result.isSuccess && result.Data) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = result.Data;
    }
  }, []);

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  const searchFields: IItemProps[] = [
    {
      dataField: "DeliveryDateFrom",
      caption: t("DeliveryDateFrom"),
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
        RequiredField(t("DateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.DeliveryDateTo) {
              return !isAfter(value, searchCondition.DeliveryDateTo);
            }
            return true;
          },
          message: t("DateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      dataField: "DeliveryDateTo",
      caption: t("DeliveryDateTo"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("DateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.DeliveryDateFrom);
          },
          message: t("DateToMustBeAfterDateFrom"),
        },
      ],
    },
    {
      dataField: "CreateDealDateFrom",
      caption: t("CreateDealDateFrom"),
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
        // RequiredField(t("DateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.CreateDealDateTo) {
              return !isAfter(value, searchCondition.CreateDealDateTo);
            }
            return true;
          },
          message: t("DateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      dataField: "CreateDealDateTo",
      caption: t("CreateDealDateTo"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        // RequiredField(t("DateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.CreateDealDateFrom);
          },
          message: t("DateToMustBeAfterDateFrom"),
        },
      ],
    },
    {
      dataField: "CtmCareUpdDateFrom",
      caption: t("CtmCareUpdDateFrom"),
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
        // RequiredField(t("DateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.CtmCareUpdDateTo) {
              return !isAfter(value, searchCondition.CtmCareUpdDateTo);
            }
            return true;
          },
          message: t("DateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      dataField: "CtmCareUpdDateTo",
      caption: t("CtmCareUpdDateTo"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        // RequiredField(t("DateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.CtmCareUpdDateFrom);
          },
          message: t("DateToMustBeAfterDateFrom"),
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
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data,
  });
  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
          onExportExcelDetail={handleExportDetail}
          onExportExcel={() => {}}
          toggleSearchPanel={handleToggleSearchPanel}
        ></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px] h-full"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"sales-ctm-care-01-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={isGetingData || isLoading}
            />
            <div className={"w-full mt-4"}>
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
                width={"100%"}
              >
                <FieldChooser enabled={true} height={400} />
                <PivotLoadPanel
                  enabled={true}
                  showPane={isGetingData || isLoading}
                  showIndicator={true}
                />
                <Export enabled={true} />
                <StateStoring
                  enabled={true}
                  storageKey={"report-RptSalesCtmCare01"}
                />
                <FieldPanel visible={true} />
              </PivotGrid>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
