import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { useClientgateApi } from "@packages/api";
import { logger } from "@packages/logger";
import { showErrorAtom } from "@packages/store";
import { ReportPageHeader } from "@packages/ui/report-page-header";
import { useQuery } from "@tanstack/react-query";
import { format, getDaysInMonth } from "date-fns";
import { Button, Chart, LoadPanel } from "devextreme-react";
import {
  ArgumentAxis,
  ChartTitle,
  CommonAxisSettings,
  Grid,
  Series,
  Size,
  Tooltip,
} from "devextreme-react/chart";
import DataGrid, {
  Toolbar as GridToolbar,
  Item,
  Scrolling,
  Sorting,
  Summary,
  TotalItem,
  ColumnFixing,
  HeaderFilter,
} from "devextreme-react/data-grid";
import Toolbar from "devextreme-react/toolbar";
import { useSetAtom } from "jotai";
import { useCallback, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import ScrollView from "devextreme-react/scroll-view";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { nanoid } from "nanoid";
import { RptSalesReportParamDto, RptSalesReportRecord } from "@packages/types";
import {
  SearchForm,
  generateMonthData,
} from "@/pages/reports/Rpt_SalesReport/components/search-form";
import { ModelChart } from "../components/modal-chart";

export const Rpt_SalesReport = () => {
  const { t } = useI18n("RptSalesReport");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const [isLoading, setLoading] = useState(false);

  const { data: modelDs, isLoading: isLoadingModel } = useQuery(
    ["MstCarModel", "withAllOption"],
    async () => {
      const resp = await api.Mst_CarModel_GetAllActive();
      if (resp.isSuccess) {
        return resp.DataList ?? [];
      }
    },
    {}
  );

  const { data: dealerDs, isLoading: isLoadingDealer } = useQuery(
    ["MstDealer", "withAllOption"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.isSuccess) {
        return resp.DataList ?? [];
      }
    },
    {}
  );

  const [searchCondition, setSearchCondition] = useState<
    Partial<RptSalesReportParamDto>
  >({
    ReportBy: undefined,
    DealerCodes: [],
    ModelCodes: [],
    FlagDataWH: false,
  });
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const monthYearDs = generateMonthData();
  // console.log(86, monthYearDs)
  const {
    data: searchResult,
    isLoading: isLoadingSearch,
    refetch,
  } = useQuery<any, any, RptSalesReportRecord[], string[]>({
    queryKey: ["RptSalesReport", loadingKey, JSON.stringify(searchCondition)],
    queryFn: async () => {
      if (!searchCondition.MonthReport) {
        // return [];
        searchCondition.MonthReport = monthYearDs[0];
      }
      if (
        searchCondition.ReportBy === "D" &&
        (searchCondition.DealerCodes ?? []).length <= 0
      ) {
        return [];
      }
      if (
        searchCondition.ReportBy === "M" &&
        (searchCondition.ModelCodes ?? []).length <= 0
      ) {
        return [];
      }
      // console.log(110, searchCondition)
      return match(searchCondition.ReportBy)
        .with("D", async () => {
          const dealerResult = await api.RptSalesReport_SearchByDealerHQ(
            searchCondition
          );
          if (dealerResult.isSuccess) {
            return dealerResult.Data?.Lst_RptStatistic_HTCStockOut02_ByDealer;
          }
          return [];
        })
        .otherwise(async () => {
          const modelResult = await api.RptSalesReport_SearchByModelHQ(
            searchCondition
          );
          if (modelResult.isSuccess) {
            return modelResult.Data?.Lst_RptStatistic_HTCStockOut02_ByModel;
          }
          return [];
        });
    },
  });
  console.log("🚀 ~ searchResult:", searchResult);

  const handleExportExcel = useCallback(async () => {
    setLoading(true);
    const resp = await match(searchCondition.ReportBy)
      .with("D", async () => {
        return await api.RptSalesReport_ExportSearchByDealerHQ(searchCondition);
      })
      .otherwise(async () => {
        return await api.RptSalesReport_ExportSearchByModelHQ(searchCondition);
      });
    setLoading(false);
    logger.debug("response:", resp);
    if (resp.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = resp.Data;
    } else {
      alert(t("Failed call api"));
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  }, [searchCondition]);

  const handleExportDetailExcel = useCallback(async () => {
    setLoading(true);
    const resp = await match(searchCondition.ReportBy)
      .with("D", async () => {
        return await api.RptSalesReport_ExportDetailSearchByDealerHQ(
          searchCondition
        );
      })
      .otherwise(async () => {
        return await api.RptSalesReport_ExportDetailSearchByModelHQ(
          searchCondition
        );
      });
    setLoading(false);
    logger.debug("response:", resp);
    if (resp.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = resp.Data;
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  }, [searchCondition]);

  const handleSearch = useCallback(async () => {
    setSearchCondition(searchCondition);
    setLoading(true);
    reloading();
    // await refetch();
    setLoading(false);
  }, []);

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const toolbarItems = useMemo(() => {
    return [
      {
        widget: "dxButton",
        location: "before",
        options: {
          icon: "search",
          onClick: handleToggleSearchPanel,
        },
      },
    ];
  }, []);
  const zeroPad = (num: number, places: number) =>
    String(num).padStart(places, "0");
  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "DealerCode",
        caption: t("DealerCode"),
        visible: searchCondition.ReportBy === "D",
        columnResizingMode: "widget",
        allowColumnResizing: true,
      },
      {
        dataField: "DealerName",
        visible: searchCondition.ReportBy === "D",
        caption: t("DealerName"),
        columnResizingMode: "widget",
        allowColumnResizing: true,
      },
      {
        dataField: "CVModelCode",
        caption: t("ModelCode"),
        visible: searchCondition.ReportBy === "M",
      },
      {
        dataField: "ModelName",
        visible: searchCondition.ReportBy === "M",
        caption: t("ModelName"),
        columnResizingMode: "widget",
      },
      {
        dataField: "Level",
        caption: t("Level"),
      },
      {
        dataField: "Total",
        caption: t("Total"),
      },
      {
        caption: t("DayInMonth"),
        alignment: "center",
        columns: Array.from(
          new Array(getDaysInMonth(searchCondition.MonthReport ?? new Date())),
          (x, i) => i
        ).map((i) => ({
          dataField: `Day${zeroPad(i + 1, 2)}`,
          caption: i + 1,
        })),
      },
    ];
  }, [searchCondition, loadingKey]);

  const windowSize = useWindowSize();

  const renderDealerChart = useMemo(() => {
    return (
      <Chart
        className={"mx-auto my-5"}
        dataSource={searchResult ?? []}
        width={"90%"}
      >
        <Size width={"90%"} height={400} />
        <Tooltip enabled={true} />
        <CommonAxisSettings aggregatedPointsPosition="" color={"#000"} />
        <ChartTitle
          horizontalAlignment={"center"}
          text={`${t("Rpt_SalesReport")} ${format(
            searchCondition.MonthReport ?? new Date(),
            "yyyy-MM"
          )}`}
        />
        <Series
          key="series"
          color={"#4381BB"}
          showInLegend={false}
          type="bar"
          argumentField={"DealerCode"}
          valueField={"Total"}
        ></Series>
        <ArgumentAxis
          label={{
            rotationAngle: 90,
            overlappingBehavior: "rotate",
            textOverflow: "none",
          }}
        >
          <Grid visible={true} />
        </ArgumentAxis>
      </Chart>
    );
  }, [loadingKey, searchResult]);
  return (
    <>
      <AdminContentLayout className={"rpt-statistic-htc-stock-out"}>
        <AdminContentLayout.Slot name={"Header"}>
          <ReportPageHeader title={t("RptSalesReport")} />
        </AdminContentLayout.Slot>
        <AdminContentLayout.Slot name={"Content"}>
          <ContentSearchPanelLayout>
            <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
              <div className={"max-w-[300px] h-full p-2"}>
                <SearchForm
                  data={searchCondition}
                  onSearch={handleSearch}
                  dealerDs={dealerDs ?? []}
                  modelDs={modelDs ?? []}
                />
              </div>
            </ContentSearchPanelLayout.Slot>
            <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
              <Toolbar items={toolbarItems} />
              <ScrollView height={windowSize.height - 120} width={"100%"}>
                <LoadPanel visible={isLoading || isLoadingSearch} />
                <div className={"min-h-[400px]"}>
                  {searchCondition.ReportBy === "M" && (
                    <ModelChart dataSource={searchResult ?? []} />
                  )}
                  {searchCondition.ReportBy === "D" && renderDealerChart}
                </div>
                <DataGrid
                  id={"gridContainer"}
                  dataSource={searchResult ?? []}
                  showBorders={true}
                  showRowLines={true}
                  showColumnLines={true}
                  columns={columns}
                  columnAutoWidth={true}
                  allowColumnResizing={true}
                  allowColumnReordering={false}
                  className={"mx-auto my-5"}
                  width={"100%"}
                >
                  <ColumnFixing enabled={true} />
                  <Scrolling showScrollbar={"always"} />
                  <HeaderFilter visible={true} allowSearch={true} />

                  <GridToolbar visible={true}>
                    <Item location={"before"}>
                      <span className={"grid-title font-bold text-[#0E223D]"}>
                        {t("DataDetail")}
                      </span>
                    </Item>
                    <Item location={"before"}>
                      <Button
                        text={t("ExportExcel")}
                        type={"default"}
                        onClick={handleExportExcel}
                      />
                    </Item>
                    <Item location={"before"}>
                      <Button
                        text={t("ExportDetailExcel")}
                        type={"default"}
                        onClick={handleExportDetailExcel}
                      />
                    </Item>
                  </GridToolbar>
                  <Sorting mode={"single"} />
                  <Summary>
                    <TotalItem column={"Total"} summaryType={"sum"}></TotalItem>
                  </Summary>
                </DataGrid>
              </ScrollView>
            </ContentSearchPanelLayout.Slot>
          </ContentSearchPanelLayout>
        </AdminContentLayout.Slot>
      </AdminContentLayout>
    </>
  );
};
