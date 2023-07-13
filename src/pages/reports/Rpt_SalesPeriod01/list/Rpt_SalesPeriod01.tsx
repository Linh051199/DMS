import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_SalesPeriod01Param } from "@/packages/api/clientgate/Rpt_SalesPeriod01Api";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format, getYear } from "date-fns";
import { DataGrid, LoadPanel, PivotGrid, ScrollView } from "devextreme-react";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
interface IReportParam {
  ReportType?: "Model" | "Dealer" | "";
  Type: string;
  Year?: string;
  Quarter?: string;
  Month?: string;
  Dealer?: string;
}

export const Rpt_SalesPeriod01 = () => {
  const { t } = useI18n("Rpt_SalesPeriod01");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [listSearchDealer, setListSearchDealer] = useState<any>([]);
  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {} as IReportParam
  );

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_SalesPeriod01",
      "Rpt_SalesPeriod01_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_SalesPeriod01_SearchHQ({
          ReportType: searchCondition.ReportType ?? "",
          Type: searchCondition.Type ?? "",
          Dealer: searchCondition.Dealer ?? "",
          Year: searchCondition.Year ?? "",
          Quarter: searchCondition.Quarter ?? "",
          Month: searchCondition.Month ?? "",
        } as Rpt_SalesPeriod01Param);
        return searchCondition?.ReportType == "Dealer"
          ? resp?.Data?.Lst_RptSales_Period_01_ByDealer
          : resp?.Data?.Lst_RptSales_Period_01_ByModel;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: listDealer } = useQuery(["dealer"], () =>
    api.Mst_Dealer_GetAllActive()
  );

  useEffect(() => {
    if (listDealer?.DataList) {
      setListSearchDealer([
        { DealerCode: "", DealerName: "Tất Cả" },
        ...listDealer?.DataList,
      ]);
    }
  }, [listDealer?.DataList]);

  const currentYear = getYear(new Date());

  const yearDataSource = Array.from(new Array(100), (x, i) => i).map((x) => ({
    value: currentYear - x,
    text: (currentYear - x).toString(),
  }));
  const listQuarter = [
    {
      value: "1",
    },
    {
      value: "2",
    },
    {
      value: "3",
    },
    {
      value: "4",
    },
  ];
  const monthDataSource = Array.from(new Array(12), (x, i) => i).map((x) => ({
    value: 12 - x,
    text: (12 - x).toString(),
  }));

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.Rpt_SalesPeriod01_ExportSearchHQ(
      searchCondition
    );
    if (response.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = response.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
    }
  }, []);
  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.Rpt_SalesPeriod01_ExportDetailSearchHQ({
      ReportType: searchCondition.ReportType ?? "",
      Type: searchCondition.Type ?? "",
      Dealer: searchCondition.Dealer ?? "",
      Year: searchCondition.Year ?? "",
      Quarter: searchCondition.Quarter ?? "",
      Month: searchCondition.Month ?? "",
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
      caption: t("ReportType"),
      dataField: "ReportType",
      visible: true,
      editorType: "dxSelectBox",
      validationRules: [RequiredField(t("ReportTypeIsRequired"))],
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        validationMessageMode: "always",
        validationGroup: "form",
        onValueChanged: (e: any) => {
          setSearchCondition({ ...searchCondition, ReportType: e.value });
        },
        dataSource: [
          {
            value: "Dealer",
            text: t("Dealer"),
          },
          {
            value: "Model",
            text: t("Model"),
          },
        ],
      },
    },

    {
      caption: t("Type"),
      dataField: "Type",
      visible: true,
      editorType: "dxSelectBox",
      validationRules: [RequiredField(t("ReportTypeIsRequired"))],
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        validationMessageMode: "always",
        validationGroup: "form",
        onValueChanged: (e: any) => {
          setSearchCondition({ ...searchCondition, Type: e.value });
        },
        items: [
          {
            value: "Year",
            text: t("Year"),
          },
          {
            value: "Quarter",
            text: t("Quarter"),
          },
          {
            value: "Month",
            text: t("Month"),
          },
        ],
      },
    },

    {
      caption: t("Year"),
      dataField: "Year",
      visible: true,
      editorType: "dxSelectBox",
      validationRules: [RequiredField(t("ReportTypeIsRequired"))],
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: yearDataSource ?? [],
      },
    },

    {
      dataField: "Quarter",
      caption: t("Quarter"),
      editorType: "dxSelectBox",
      disabled:
        searchCondition?.Type === "Month" || searchCondition?.Type == "Year"
          ? true
          : false,
      editorOptions: {
        displayExpr: "value",
        valueExpr: "value",
        items: listQuarter ?? [],
      },
    },
    {
      dataField: "Month",
      caption: t("Month"),
      editorType: "dxSelectBox",
      disabled:
        searchCondition?.Type === "Quarter" || searchCondition?.Type == "Year"
          ? true
          : false,
      editorOptions: {
        displayExpr: "value",
        valueExpr: "value",
        items: monthDataSource ?? [],
      },
    },

    {
      dataField: "Dealer",
      caption: t("Dealer"),
      disabled: searchCondition?.ReportType === "Model" ? true : false,
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "DealerCode",
        valueExpr: "DealerCode",
        searchEnabled: true,
        validationMessageMode: "always",
        dataSource: listSearchDealer || [],
      },
    },
  ];

  const handleSearch = useCallback(async (data: IReportParam) => {
    setGettingData(true);
    reloading();
    // await refetch()
    setGettingData(false);
  }, []);

  // DataGrid

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        dataField:
          searchCondition?.ReportType === "Dealer"
            ? "MDDEALERCODE"
            : "CCMODELCODE",
        caption: t(
          searchCondition?.ReportType === "Dealer"
            ? "MDDEALERCODE"
            : "CCMODELCODE"
        ),
        visible: true,
      },

      {
        dataField:
          searchCondition?.ReportType === "Dealer"
            ? "MDDEALERNAME"
            : "CCSPECCODE",
        caption: t(
          searchCondition?.ReportType === "Dealer"
            ? "MDDEALERNAME"
            : "CCSPECCODE"
        ),
        visible: true,
      },

      {
        dataField:
          searchCondition?.ReportType === "Dealer"
            ? "Mã vùng"
            : "SPECDESCRIPTION",
        caption: t(
          searchCondition?.ReportType === "Dealer" ? "" : "SPECDESCRIPTION"
        ),
        visible: true,
      },

      {
        caption: t("Z_CAR_DEALERINSTOCK_FROM"),
        dataField: t("Z_CAR_DEALERINSTOCK_FROM"),
        visible: true,
      },

      {
        caption: t("Z_CAR_BO_FROM"),
        dataField: t("Z_CAR_BO_FROM"),
        visible: true,
      },

      {
        caption: t("Z_CAR_ORDER_REQUEST"),
        dataField: t("Z_CAR_ORDER_REQUEST"),
        visible: true,
      },

      {
        caption: t("Z_CAR_ORDER_APPROVE"),
        dataField: t("Z_CAR_ORDER_APPROVE"),
        visible: true,
      },

      {
        caption: t("Z_CAR_CANCEL"),
        dataField: t("Z_CAR_CANCEL"),
        visible: true,
      },

      {
        caption: t("Z_CAR_RECEIVED"),
        dataField: t("Z_CAR_RECEIVED"),
        visible: true,
      },

      {
        caption: t("Z_CAR_SOLD"),
        dataField: t("Z_CAR_SOLD"),
        visible: true,
      },

      {
        caption: t("Z_CAR_DEALERINSTOCK_TO"),
        dataField: t("Z_CAR_DEALERINSTOCK_TO"),
        visible: true,
      },

      {
        caption: t("Z_CAR_BO_TO"),
        dataField: t("Z_CAR_BO_TO"),
        visible: true,
      },
    ],
    [isLoading, searchCondition.ReportType]
  );

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
              <ScrollView height={windowSize.height - 120}>
                <DataGrid
                  id={"gridContainer"}
                  dataSource={data ?? []}
                  columns={columns}
                  showBorders={true}
                  showRowLines={true}
                  showColumnLines={true}
                  columnAutoWidth={true}
                  allowColumnResizing={false}
                  allowColumnReordering={false}
                  className={"mx-auto my-5"}
                  width={"100%"}
                  columnResizingMode="widget"
                >
                  <HeaderFilter allowSearch={true} visible={true} />
                  <Scrolling showScrollbar={"always"} />
                  <Sorting mode={"none"} />
                </DataGrid>
              </ScrollView>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
