import { useI18n } from "@/i18n/useI18n";
import { Rpt_PivotRearrangeCBParam } from "@/packages/api/clientgate/Rpt_PivotRearrangeCBApi";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { useClientgateApi } from "@packages/api";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, isAfter, isBefore } from "date-fns";
import { Chart, LoadPanel, PieChart, ScrollView } from "devextreme-react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { IItemProps } from "devextreme-react/form";
import PivotGrid, {
  Export,
  FieldChooser,
  FieldPanel,
  LoadPanel as PivotLoadPanel,
  Scrolling,
  StateStoring,
} from "devextreme-react/pivot-grid";
import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { Rpt_PmtGuaranteeBankMarketSum01Param } from "@/packages/api/clientgate/Rpt_PmtGuaranteeBankMarketSum01Api";
import { SearchForm, isShowChartAtom } from "../components/search-form";
import { LoadingIndicator, Size } from "devextreme-react/bar-gauge";
import {
  Aggregation,
  ArgumentAxis,
  AxisLabel,
  ChartTitle,
  CommonAxisSettings,
  CommonSeriesSettings,
  Grid,
  Label,
  Legend,
  Margin,
  Point,
  Series,
  Tooltip,
  ZoomAndPan,
} from "devextreme-react/chart";
// import { Series } from "devextreme-react/pie-chart";
// import { Tooltip } from "devextreme-react/chart";
import { Rpt_PmtPaymentLoanBankMarketSum01Param } from "@/packages/api/clientgate/Rpt_PmtPaymentLoanBankMarketSum01Api";
import { Value } from "devextreme-react/range-selector";
interface ReportParam {
  MoneyIncomeFrom: Date | null;
  MoneyIncomeTo: Date | null;
  Dealer: string;
  Bank: string;
  FlagHTC: string;
  FlagDataWH: 1 | 0;
}

const TooltipTemplate = (info?: any) => {
  return (
    <div className="state-tooltip">
      <div className="capital">
        <span className="caption">Capital{info?.point?.data?.TOTALAMOUNT}</span>
      </div>
    </div>
  );
};

export const RptPmtPaymentLoanBankMarketSum01 = () => {
  const [isGetingData, setGettingData] = useState(false);
  const isShowChartA = useAtomValue<boolean | undefined>(isShowChartAtom);
  const setShowChartABC = useSetAtom<any>(isShowChartAtom);
  const handleTogglePopup = () => {
    setShowChartABC((visible: any) => !visible);
  };
  const { t } = useI18n("RptPmtPaymentLoanBankMarketSum01");

  const [searchCondition, setSearchCondition] = useState<ReportParam>({
    MoneyIncomeFrom: null,
    MoneyIncomeTo: new Date(),
    Dealer: "",
    Bank: "",
    FlagHTC: "",
    FlagDataWH: 0,
  } as ReportParam);

  const windowSize = useWindowSize();
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();

  // đóng mở form search
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  // call data
  // const test = useQueryClient
  const { data, isLoading } = useQuery({
    queryKey: [
      "report_RptPmtPaymentLoanBankMarketSum01_SearchHQ",
      "RptPmtPaymentLoanBankMarketSum01",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptPmtPaymentLoanBankMarketSum01_SearchHQ({
          MoneyIncomeFrom: searchCondition.MoneyIncomeFrom
            ? format(searchCondition.MoneyIncomeFrom, "yyyy-MM-dd")
            : "",
          MoneyIncomeTo: searchCondition.MoneyIncomeTo
            ? format(searchCondition.MoneyIncomeTo, "yyyy-MM-dd")
            : "",
          Dealer: searchCondition.Dealer ?? "",
          Bank: searchCondition.Bank ?? "",
          FlagHTC: searchCondition.FlagHTC ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_PmtPaymentLoanBankMarketSum01Param);

        return resp;
      } else {
        return null;
      }
    },
    // enabled: false,
  });
  // =============DEALERCODE================
  const { data: dealerCodeData } = useQuery({
    queryKey: ["dealerCode_In_Rpt_RptPmtPaymentLoanBankMarketSum01"],
    queryFn: () => {
      return api.Mst_Dealer_GetAllActive();
    },
  });
  // =============BANKCODE================
  const { data: bankCodeData } = useQuery({
    queryKey: ["bankCode_In_Rpt_RptPmtPaymentLoanBankMarketSum01"],
    queryFn: () => {
      return api.Mst_Bank_GetAllActive();
    },
  });
  // hàm search khi thực hiện tìm kiếm
  const handleSearch = useCallback(async () => {
    // setGettingData(true);
    reloading();

    // setGettingData(false);
  }, []);

  const fields = useMemo<Field[]>(() => {
    return [
      {
        caption: t("BANKNAME"),
        dataField: "BANKNAME",
        area: "row",
        areaIndex: 0,
      },
      {
        caption: t("INTERESTRATEAVG (%)"),
        dataField: "INTERESTRATEAVG",
        area: "data",
        areaIndex: 0,
        summaryType: "sum",
        customizeText: (cellInfo: {
          value?: string | number | Date;
          valueText?: string;
        }) => {
          return cellInfo.valueText
            ? `${cellInfo.valueText} %`
            : `${cellInfo.valueText}`;
        },
      },
      {
        caption: t("MARKETPERCENT (%)"),
        dataField: "MARKETPERCENT",
        area: "data",
        areaIndex: 1,
        summaryType: "sum",
        customizeText: (cellInfo: {
          value?: string | number | Date;
          valueText?: string;
        }) => {
          return cellInfo.valueText
            ? `${cellInfo.valueText} %`
            : `${cellInfo.valueText}`;
        },
      },
      {
        caption: t("TOTALAMOUNT"),
        dataField: "TOTALAMOUNT",
        area: "data",
        areaIndex: 2,
        summaryType: "sum",
        customizeText: (e: any) => {
          return e.value ? `${e.value.toLocaleString()}` : e.value;
        },
      },
      {
        caption: t("PAYMENTENDMONTH"),
        dataField: "PAYMENTENDMONTH",
        area: "column",
        areaIndex: 0,
      },
    ];
  }, [t]);
  // cấu hình dataSource

  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_Rpt_PmtPaymentLoanBankMarketSum_01,
    onLoadingChanged: (isLoading) => {
      // console.log("onLoadingChanged", isLoading);
    },
    // store: newDataInChart ?? [],
  });
  // hàm export excel  chi tiết
  const handleExportDetail = useCallback(async () => {
    const result =
      await api.RptPmtPaymentLoanBankMarketSum01_ExportDetailSearchHQ({
        MoneyIncomeFrom: searchCondition.MoneyIncomeFrom
          ? format(searchCondition.MoneyIncomeFrom, "yyyy-MM-dd")
          : "",
        MoneyIncomeTo: searchCondition.MoneyIncomeTo
          ? format(searchCondition.MoneyIncomeTo, "yyyy-MM-dd")
          : "",
        Dealer: searchCondition.Dealer ?? "",
        Bank: searchCondition.Bank ?? "",
        FlagHTC: searchCondition.FlagHTC ?? "",
        FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
      });
    if (result.isSuccess && result.Data) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = result.Data;
    }
  }, []);
  // hàm export excel all
  const handleExport = useCallback(async () => {}, []);

  return (
    <>
      <AdminContentLayout className={"province-management"}>
        <AdminContentLayout.Slot name={"Header"}>
          <PageHeader
            onExportExcelDetail={handleExportDetail}
            onExportExcel={handleExport}
            toggleSearchPanel={handleToggleSearchPanel}
          ></PageHeader>
        </AdminContentLayout.Slot>
        <AdminContentLayout.Slot name={"Content"}>
          <ContentSearchPanelLayout>
            <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
              <div className={"w-[300px] h-full"}>
                <SearchForm
                  bankDs={bankCodeData?.DataList ?? []}
                  dealerDs={dealerCodeData?.DataList ?? []}
                  onSearch={handleSearch}
                  data={searchCondition}
                ></SearchForm>
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
                {!!data &&
                  data.Data?.Lst_Rpt_PmtPaymentLoanBankMarketSum_01 &&
                  !isLoading && (
                    <PivotGrid
                      id="pivotgrid"
                      dataSource={dataSource}
                      allowSortingBySummary={true}
                      allowSorting={true}
                      allowFiltering={true}
                      showBorders={true}
                      disabled={false} // chặn người dùng không cho tương tác với màn hình giao diện
                      onCellClick={(e: any) => {}} // lấy ra thông in của cột khi mà mình click vào bất kì ô nào
                      onCellPrepared={(e: any) => {}} // Một chức năng được thực thi sau khi một ô lưới trục được tạo.
                      onContentReady={(e) => {}} // A function that is executed when the UI component is rendered and each time the component is repainted.
                      onContextMenuPreparing={(e) => {}} // A function that is executed * before the context menu is rendered. *
                      onExporting={(e) => {}} // A function that is executed before data is exported. // thực thi sau khi xuất file
                      onOptionChanged={(e) => {}} // A function that is executed after a UI component property is changed.
                      showColumnGrandTotals={false} // chỉ định hiển thị tổng tính tổng hay không
                      showColumnTotals={true} // chỉ định có hiện cột tính tổng của cột hay không
                      showRowGrandTotals={true} // ngược lại với showColumnGrandTotals
                      showRowTotals={true} // ngược lại với showColumnTotals
                      showTotalsPrior={"none"} // 'both' | 'columns' | 'none' | 'rows' => default: 'none'
                      height={windowSize.height - 150}
                      allowExpandAll={true}
                    >
                      <Scrolling mode={"virtual"} />
                      {/* cho phép ấn và hiển thị cột theo mong muốn */}
                      <FieldChooser enabled={true} height={400} />
                      <PivotLoadPanel
                        enabled={true}
                        showPane={true}
                        showIndicator={true}
                      />
                      {/* cho phép người dùng xuất file */}
                      <Export enabled={true} />
                      {/* lưu cấu hình pivot vào trong local storage  */}
                      <StateStoring
                        enabled={true}
                        storageKey={"report-RptPmtPaymentLoanBankMarketSum01"}
                      />
                      <FieldPanel visible={true} />
                    </PivotGrid>
                  )}
                <Popup
                  visible={isShowChartA} // đoạn này check để mở
                  // onHiding={this.hideInfo}
                  showCloseButton={true}
                  onHiding={handleTogglePopup}
                  dragEnabled={false}
                  hideOnOutsideClick={true}
                  showTitle={true}
                  title="Chart RptPmtPaymentLoanBankMarketSum01"
                  container=".dx-viewport"
                  maxHeight={"80%"}
                  maxWidth={"80%"}
                >
                  <ScrollView>
                    <Chart
                      id="chart-payment-bank-market"
                      className={"ml-5"}
                      dataSource={
                        data?.Data?.Lst_Rpt_PmtPaymentLoanBankMarketSum_01 ?? []
                      }
                      width={"90%"}
                      // style={{ zIndex: 1000000 }}
                    >
                      <Series
                        key="series-payment-loan-bank-market"
                        color={"#76f217"}
                        width={0.5}
                        showInLegend={true}
                        name={t("RptPmtPaymentLoanBankMarketSum01")}
                        type="line"
                        argumentField={"INTERESTRATEAVG"}
                        valueField={"BANKCODEPARENT"}
                      />
                      <Tooltip
                        zIndex={10000}
                        enabled={true}
                        // contentRender={TooltipTemplate}
                        contentRender={(e) => {
                          return (
                            <p>
                              - BANK: <b>{e.point.data.BANKCODEPARENT}</b>{" "}
                              <br />-{" "}
                              <span>
                                INTERESTRATEAVG (%) :{" "}
                                {e.point.data.INTERESTRATEAVG}
                              </span>
                            </p>
                          );
                        }}
                      />
                      <Size width={"90%"} height={500} />
                      <LoadingIndicator enabled={true} show={isLoading} />
                      <CommonAxisSettings
                        aggregatedPointsPosition=""
                        color={"#000"}
                      />
                      <ZoomAndPan
                        valueAxis="both"
                        argumentAxis="both"
                        dragToZoom={true}
                        allowMouseWheel={true}
                        panKey="shift"
                      />
                      <ChartTitle
                        horizontalAlignment={"center"}
                        text={t("RptPmtPaymentLoanBankMarketSum01")}
                      />
                      <ArgumentAxis
                        allowDecimals={true}
                        argumentType={"numeric"}
                      >
                        <AxisLabel format={"##"} />
                        <Grid visible={true} />
                      </ArgumentAxis>
                      <Export enabled={true} />{" "}
                    </Chart>
                  </ScrollView>
                </Popup>
              </div>
            </ContentSearchPanelLayout.Slot>
          </ContentSearchPanelLayout>
        </AdminContentLayout.Slot>
      </AdminContentLayout>
    </>
  );
};
