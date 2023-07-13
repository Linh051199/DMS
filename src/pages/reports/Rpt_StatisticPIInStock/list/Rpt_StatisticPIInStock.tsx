import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_StatisticPIInStockParam } from "@/packages/api/clientgate/Rpt_StatisticPIInStockApi";
import { convertDate } from "@/packages/common";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format, getYear, set } from "date-fns";
import { DataGrid, LoadPanel, PivotGrid, ScrollView } from "devextreme-react";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
interface IReportParam {
  ProductMonthFrom: Date;
  ProductMonthTo: Date;
  DateTo: Date;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_StatisticPIInStock = () => {
  const { t } = useI18n("Rpt_StatisticPIInStock");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {} as IReportParam
  );

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_StatisticPIInStock",
      "Rpt_StatisticPIInStock_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_StatisticPIInStock_SearchHQ({
          ProductMonthFrom: convertDate(searchCondition.ProductMonthFrom),
          ProductMonthTo: convertDate(searchCondition.ProductMonthTo),
          DateTo: searchCondition.DateTo
            ? format(searchCondition.DateTo, "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_StatisticPIInStockParam);

        return resp?.Data?.Lst_RptStatistic_PIInStock;
      } else {
        return null;
      }
    },
    enabled: true,
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(() => {}, []);
  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.Rpt_StatisticPIInStock_ExportDetailSearchHQ({
      ProductMonthFrom: convertDate(searchCondition.ProductMonthFrom),
      ProductMonthTo: convertDate(searchCondition.ProductMonthTo),
      DateTo: searchCondition.DateTo
        ? format(searchCondition.DateTo, "yyyy-MM-dd")
        : "",
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

  const searchFields: IItemProps[] = [
    {
      dataField: "ProductMonthFrom",
      visible: true,
      caption: t("ProductMonthFrom"),
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
      dataField: "ProductMonthTo",
      visible: true,
      caption: t("ProductMonthTo"),
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
      dataField: "DateTo",
      visible: true,
      caption: t("DateTo"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
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
    reloading();
  }, []);

  useEffect(() => {
    if (data) {
      data.map((item: any, index: any) => (item.Id = index + 1));
    }
  }, [data]);

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "Id",
        caption: t("STT"),
        visible: true,
      },
      {
        dataField: "CCOCONTRACTNO",
        caption: t("CCOCONTRACTNO"),
      },
      {
        dataField: "MODELCODE",
        caption: t("MODELCODE"),
      },
      {
        dataField: "SPECCODE",
        caption: t("SPECCODE"),
      },
      {
        dataField: "WWOWORKORDERNO",
        caption: t("WWOWORKORDERNO"),
      },
      {
        dataField: "COLORCODE",
        caption: t("COLORCODE"),
      },
      {
        dataField: "COLOR_VN_COMBINED",
        caption: t("COLOR_VN_COMBINED"),
      },
      {
        dataField: "SOLUONGPI",
        caption: t("SOLUONGPI"),
      },
      {
        dataField: "SOLUONGTONPI",
        caption: t("SOLUONGTONPI"),
      },
      {
        dataField: "SOLUONGDALENTAU",
        caption: t("SOLUONGDALENTAU"),
      },
      {
        dataField: "SOLUONGDATOICANG",
        caption: t("SOLUONGDATOICANG"),
      },
    ];
  }, [isLoading]);

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
                storeKey={"Rpt_StatisticPIInStock-search"}
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
