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
  Chart,
  LoadPanel,
  PivotGrid,
  Popup,
  ScrollView,
} from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import {
  Export,
  FieldChooser,
  FieldPanel,
  Scrolling,
  StateStoring,
  LoadPanel as PivotLoadPanel,
} from "devextreme-react/pivot-grid";
import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { Rpt_PmtGuaranteeBankMarketSum01Param } from "@/packages/api/clientgate/Rpt_PmtGuaranteeBankMarketSum01Api";
import { RequiredField } from "@/packages/common/Validation_Rules";
import {
  ArgumentAxis,
  AxisLabel,
  ChartTitle,
  CommonAxisSettings,
  Grid,
  LoadingIndicator,
  Series,
  Size,
  Tooltip,
  ZoomAndPan,
} from "devextreme-react/chart";
import { SearchForm, isShowChartAtom } from "../components/search-form";
interface IReportParam {
  OpenDateFrom: any;
  OpenDateTo: any;
  Dealer: string;
  Bank: string;
  GuaranteeType: string;
  FlagHTC: string;
  GrtPaidStatus: string;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const RptPmtGuaranteeBankMarketSum01 = () => {
  const { t } = useI18n("RptPmtGuaranteeBankMarketSum01");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const isShowChartA = useAtomValue<boolean | undefined>(isShowChartAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    OpenDateTo: new Date(),
    Dealer: "",
    Bank: "",
    GuaranteeType: "",
    FlagHTC: "",
    GrtPaidStatus: "",
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "RptPmtGuaranteeBankMarketSum01",
      "RptPmtGuaranteeBankMarketSum01_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptPmtGuaranteeBankMarketSum01_SearchHQ({
          OpenDateFrom: searchCondition.OpenDateFrom
            ? format(searchCondition.OpenDateFrom, "yyyy-MM-dd")
            : "",
          OpenDateTo: searchCondition.OpenDateTo
            ? format(searchCondition.OpenDateTo, "yyyy-MM-dd")
            : "",
          Dealer: searchCondition.Dealer ?? "",
          Bank: searchCondition.Bank ?? "",
          GuaranteeType: searchCondition.GuaranteeType ?? "",
          FlagHTC: searchCondition.FlagHTC ?? "",
          GrtPaidStatus: searchCondition.GrtPaidStatus ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_PmtGuaranteeBankMarketSum01Param);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: bankList } = useQuery(
    ["BankList", "withAllOption"],
    async () => {
      const resp = await api.Mst_Bank_GetAllActive();
      if (resp.DataList) {
        return [{ BankCode: "", BankName: "Tất cả" }, ...resp.DataList];
      }
    },
    {}
  );

  const { data: dealerList } = useQuery(
    ["DealerList", "withAllOption"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList) {
        return [{ DealerCode: "", DealerName: "Tất cả" }, ...resp.DataList];
      }
    },
    {}
  );

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
    const result =
      await api.RptPmtGuaranteeBankMarketSum01_ExportDetailSearchHQ({
        OpenDateFrom: searchCondition.OpenDateFrom
          ? format(searchCondition.OpenDateFrom, "yyyy-MM-dd")
          : "",
        OpenDateTo: searchCondition.OpenDateTo
          ? format(searchCondition.OpenDateTo, "yyyy-MM-dd")
          : "",
        Dealer: searchCondition.Dealer ?? "",
        Bank: searchCondition.Bank ?? "",
        GuaranteeType: searchCondition.GuaranteeType ?? "",
        FlagHTC: searchCondition.FlagHTC ?? "",
        GrtPaidStatus: searchCondition.GrtPaidStatus ?? "",
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
      caption: t("OpenDateFrom"),
      dataField: "OpenDateFrom",
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
        RequiredField(t("OpenDateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.OpenDateTo) {
              return !isAfter(value, searchCondition.OpenDateTo);
            }
            return true;
          },
          message: t("OpenDateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: t("OpenDateTo"),
      dataField: "OpenDateTo",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("OpenDateToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.OpenDateFrom);
          },
          message: t("OpenDateToMustBeAfterOpenDateFrom"),
        },
      ],
    },

    {
      caption: t("GuaranteeType"),
      dataField: "GuaranteeType",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "title",
        valueExpr: "value",
        items: [
          {
            title: "Tất cả",
            value: "",
          },
          {
            title: "Bảo Lãnh",
            value: "BL",
          },
          {
            title: "LC trả chậm",
            value: "LCTC",
          },
          {
            title: "LC Upas",
            value: "LCUP",
          },
        ],
      },
    },

    {
      dataField: "Bank",
      visible: true,
      caption: t("Bank"),
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        dataSource: bankList ?? [],
        displayExpr: "BankName",
        valueExpr: "BankCode",
        validationGroup: "form",
        validationMessageMode: "always",
      },
    },

    {
      caption: t("FlagHTC"),
      dataField: "FlagHTC",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "title",
        valueExpr: "value",
        items: [
          {
            title: "Tất cả",
            value: "",
          },
          {
            title: "HTC",
            value: "HTC",
          },
          {
            title: "HTV",
            value: "HTV",
          },
        ],
      },
    },

    {
      dataField: "Dealer",
      visible: true,
      caption: t("Dealer"),
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        dataSource: dealerList ?? [],
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
        validationGroup: "form",
        validationMessageMode: "always",
      },
    },

    {
      caption: t("GrtPaidStatus"),
      dataField: "GrtPaidStatus",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "title",
        valueExpr: "value",
        items: [
          {
            title: "Tất cả",
            value: "",
          },
          {
            title: "Tất toán",
            value: "is not null",
          },
          {
            title: "Chưa tất toán",
            value: "is null",
          },
        ],
      },
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

  const setShowChartABC = useSetAtom<any>(isShowChartAtom);
  const handleTogglePopup = () => {
    setShowChartABC((visible: any) => !visible);
  };

  //PivotGrid
  const fields = useMemo<Field[]>(() => {
    return [
      {
        dataField: "FEEAVG",
        caption: t("FEEAVG(%)"),
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
        dataField: "MARKETPERCENT",
        caption: t("MARKETPERCENT(%)"),
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
        dataField: "TOTALAMOUNT",
        area: "data",
        areaIndex: 2,
        summaryType: "sum",
        customizeText: (e: any) => {
          return e.value ? `${e.value.toLocaleString()}` : e.value;
        },
      },
      {
        dataField: "BANKCODEPARENT",
        area: "row",
        areaIndex: 0,
      },
      {
        dataField: "MONTHOPEN",
        area: "column",
        areaIndex: 0,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_Rpt_PmtGuaranteeBankMarketSum_01,
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
            <div className="w-[300px]">
              {/* <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"RptPmtGuaranteeBankMarketSum01-search"}
              /> */}
              <SearchForm
                bankDs={bankList as any}
                dealerDs={dealerList as any}
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
            <div className="w-full mt-4">
              {!!data && data?.Data?.Lst_Rpt_PmtGuaranteeBankMarketSum_01 && (
                <PivotGrid
                  id="pivotgrid"
                  dataSource={dataSource}
                  allowSortingBySummary={true}
                  allowFiltering={true}
                  allowSorting={true}
                  showBorders={true}
                  disabled={false} // chặn người dùng không cho tương tác với màn hình giao diện
                  onCellClick={(e: any) => {}} // lấy ra thông in của cột khi mà mình click vào bất kì ô nào
                  onCellPrepared={(e: any) => {}} // Một chức năng được thực thi sau khi một ô lưới trục được tạo.
                  onContentReady={(e) => {}} // A function that is executed when the UI component is rendered and each time the component is repainted.
                  onContextMenuPreparing={(e) => {}} // A function that is executed * before the context menu is rendered. *
                  onExporting={(e) => {}} // A function that is executed before data is exported. // thực thi sau khi xuất file
                  onOptionChanged={(e) => {}} // A function that is executed after a UI component property is changed.
                  showColumnGrandTotals={true} // chỉ định hiển thị tổng tính tổng hay không
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
                    storageKey={"report-PmtGuaranteeBankMarketSum01"}
                  />
                  <FieldPanel visible={true} />
                </PivotGrid>
              )}
              <Popup
                visible={isShowChartA}
                // onHiding={this.hideInfo}
                showCloseButton={true}
                onHiding={handleTogglePopup}
                dragEnabled={false}
                hideOnOutsideClick={true}
                showTitle={true}
                title="Chart RptPmtGuaranteeBankMarketSum01"
                container=".dx-viewport"
                maxHeight={"80%"}
                maxWidth={"80%"}
              >
                <ScrollView>
                  <Chart
                    className={"ml-5"}
                    dataSource={
                      data?.Data?.Lst_Rpt_PmtGuaranteeBankMarketSum_01 ?? []
                      // newDataInChart
                    }
                    width={"90%"}
                  >
                    <ZoomAndPan
                      valueAxis="both"
                      argumentAxis="both"
                      dragToZoom={true}
                      allowMouseWheel={true}
                      panKey="shift"
                    />
                    <Size width={"90%"} height={500} />
                    <LoadingIndicator enabled={true} show={isLoading} />
                    <CommonAxisSettings
                      aggregatedPointsPosition=""
                      color={"#000"}
                    />
                    <ChartTitle
                      horizontalAlignment={"center"}
                      text={t("RptPmtGuaranteeBankMarketSum01")}
                    />
                    <Series
                      key="series-guarantee-bank-market"
                      color={"#F21917"}
                      width={1}
                      showInLegend={true}
                      name={t("RptPmtGuaranteeBankMarketSum01")}
                      type="line"
                      argumentField={"TOTALAMOUNT"}
                      valueField={"BANKCODEPARENT"}
                    />
                    <Tooltip
                      zIndex={10000}
                      enabled={true}
                      contentRender={(e) => (
                        <p>
                          - BANK: <b>{e.point.data.BANKCODEPARENT}</b> <br />-{" "}
                          <span>TOTALAMOUNT: {e.point.data.TOTALAMOUNT} </span>
                        </p>
                      )}
                    />
                    <ArgumentAxis
                      allowDecimals={false}
                      argumentType={"numeric"}
                    >
                      <AxisLabel format={"##"} />
                      <Grid visible={true} />
                    </ArgumentAxis>
                    <Export enabled={true} />
                  </Chart>
                </ScrollView>
              </Popup>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
