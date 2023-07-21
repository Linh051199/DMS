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
import { useSavedState } from "@/packages/ui/base-gridview/components";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { useVisibilityControl } from "@/packages/hooks";
import { Rpt_PmtPaymentDtl_ByDealerParam } from "@/packages/api/clientgate/Rpt_PmtPaymentDtlByDealerApi";
import {
  format,
  formatDistance,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  set,
} from "date-fns";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  DealerCodeInput: string;
  RptYear: number | string;
  RptDateStart: Date | string;
  RptDateEnd: Date | string | number;
  FlagIsHTC: string;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

const validateTimeStartDayOfMonth =
  +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0] < 10
    ? set(Date.now(), { month: +getMonth(Date.now()) - 1, date: 1 }) // lấy ngày 1 tháng trước
    : set(Date.now(), { date: 1 }); // lấy ngày 1 tháng hiện tại

export const Rpt_PmtPaymentDtlByDealer = () => {
  const { t } = useI18n("Rpt_PmtPaymentDtlByDealer");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    RptDateEnd: new Date(),
    DealerCodeInput: "",
    FlagIsHTC: "",
    RptDateStart: validateTimeStartDayOfMonth,
    RptYear: getYear(Date.now()),
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_PmtPaymentDtlByDealer",
      "Rpt_PmtPaymentDtlByDealer_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_PmtPaymentDtlByDealer_SearchHQ({
          DealerCodeInput: searchCondition.DealerCodeInput ?? "",
          RptYear: searchCondition.RptYear ?? "",
          RptDateStart: searchCondition.RptDateStart
            ? format(searchCondition.RptDateStart as Date, "yyyy-MM-dd")
            : "",
          RptDateEnd: searchCondition.RptDateEnd
            ? format(searchCondition.RptDateEnd as Date, "yyyy-MM-dd")
            : "",
          FlagIsHTC: searchCondition.FlagIsHTC ?? "",

          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_PmtPaymentDtl_ByDealerParam);
        return resp?.Data?.Lst_Rpt_PmtPaymentDtl_ByDealer;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: listDealer } = useQuery(
    ["listDealerCode_Rpt_PmtPaymentDtlByDealer"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList)
        return [...resp.DataList, { DealerCode: "", DealerName: "All" }];
    }
  );

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.Rpt_PmtPaymentDtlByDealer_ExportSearchHQ({
      DealerCodeInput: searchCondition.DealerCodeInput ?? "",
      RptYear: searchCondition.RptYear ?? "",
      RptDateStart: searchCondition.RptDateStart
        ? format(searchCondition.RptDateStart as Date, "yyyy-MM-dd")
        : "",
      RptDateEnd: searchCondition.RptDateEnd
        ? format(searchCondition.RptDateEnd as Date, "yyyy-MM-dd")
        : "",
      FlagIsHTC: searchCondition.FlagIsHTC ?? "",

      FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
    } as Rpt_PmtPaymentDtl_ByDealerParam);
    if (response.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = response.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
    }
  }, [searchCondition]);

  const handleExportExcelDetail = useCallback(async () => {
    // const result = await api.RptStatisticHTCStockOutOnWay_ExportDetailSearchHQ({
    //   FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
    // });
    // if (result.isSuccess && result.Data) {
    //   toast.success(t("DownloadSuccessfully"));
    //   window.location.href = result.Data;
    // }
  }, []);

  const handletoggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  //SearchPanelV2

  const currentYear = getYear(new Date());
  const yearDataSource = Array.from(new Array(100), (x, i) => i).map((x) => ({
    value: currentYear - x,
    text: (currentYear - x).toString(),
  }));

  const searchFields: IItemProps[] = [
    {
      caption: t("RptYear"),
      dataField: "RptYear",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: yearDataSource,
        displayExpr: "text",
        valueExpr: "value",
      },
    },
    {
      caption: t("FlagIsHTC"),
      dataField: "FlagIsHTC",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "",
            text: t("All"),
          },
          {
            value: "HTC",
            text: t("HTC"),
          },
          {
            value: "HTV",
            text: t("HTV"),
          },
        ],
      },
    },
    {
      caption: t("DealerCodeInput"),
      dataField: "DealerCodeInput",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listDealer,
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
      },
    },
    {
      caption: t("RptDateStart"),
      dataField: "RptDateStart",
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
        RequiredField(t("RptDateStartIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.RptDateEnd) {
              return !isAfter(value, searchCondition.RptDateEnd as Date);
            }
            return true;
          },
          message: t("RptDateStartMustBeBeforeRptDateEnd"),
        },
      ],
    },
    {
      caption: t("RptDateEnd"),
      dataField: "RptDateEnd",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("RptDateEndIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.RptDateStart as Date);
          },
          message: t("RptDateEndMustBeAfterRptDateStart"),
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
        caption: t("Thông tin xe"),
        dataField: "ThongTinXe",
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("STT"),
            dataField: "Id",
          },
          {
            caption: t("DEALERCODE"),
            dataField: "DEALERCODE",
            customizeText: function (cellInfo: any) {
              return typeof cellInfo.value !== "string"
                ? "Null"
                : `${cellInfo.value}`;
            },
          },

          {
            caption: t("CARID"),
            dataField: "CARID",
          },

          {
            caption: t("MCS_SPECDESCRIPTION"),
            dataField: "MCS_SPECDESCRIPTION",
          },

          {
            caption: t("OSOD_SOCODE"),
            dataField: "OSOD_SOCODE",
          },
        ],
      },

      {
        caption: t("Số đầu kỳ"),
        dataField: "SoDauky",
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("PERIODBEGIN_OSOD_APPROVEDDATE"),
            dataField: "PERIODBEGIN_OSOD_APPROVEDDATE",
          },

          {
            caption: t("PERIODBEGIN_CDOD_DELIVERYOUTDATE"),
            dataField: "PERIODBEGIN_CDOD_DELIVERYOUTDATE",
          },

          {
            caption: t("PERIODBEGIN_VHI_HTCINVOICEDATE"),
            dataField: "PERIODBEGIN_VHI_HTCINVOICEDATE",
          },

          {
            caption: t("PERIODBEGIN_CV_MORTAGEENDDATE"),
            dataField: "PERIODBEGIN_CV_MORTAGEENDDATE",
          },
          {
            caption: t("GiaCCDK"),
            dataField: "GiaCCDK",
          },

          {
            caption: t("TOTALAMONTBEGINBEFOREDATEAPPR"),
            dataField: "TOTALAMONTBEGINBEFOREDATEAPPR",
          },

          {
            caption: t("TOTALAMONTBEGINAFTERDATEAPPR"),
            dataField: "TOTALAMONTBEGINAFTERDATEAPPR",
          },

          {
            caption: t("PERIODBEGIN_NOPMT"),
            dataField: "PERIODBEGIN_NOPMT",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },

      {
        caption: t("Số phát sinh"),
        dataField: "SoPhatSinh",
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("PERIODIN_APPROVEDDATE"),
            dataField: "PERIODIN_APPROVEDDATE",
          },

          {
            caption: t("PERIODIN_CDOD_DELIVERYOUTDATE"),
            dataField: "PERIODIN_CDOD_DELIVERYOUTDATE",
          },

          {
            caption: t("PERIODIN_VHI_HTCINVOICEDATE"),
            dataField: "PERIODIN_VHI_HTCINVOICEDATE",
          },

          {
            caption: t("PERIODIN_CV_MORTAGEENDDATE"),
            dataField: "PERIODIN_CV_MORTAGEENDDATE",
          },
          {
            caption: t("GiaCCPS"),
            dataField: "GiaCCPS",
          },

          {
            caption: t("TOTALAMOUNTIN"),
            dataField: "TOTALAMOUNTIN",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },

      {
        caption: t("Số cuối kỳ"),
        dataField: "SoCuoiky",
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("PERIODEND_OSOD_APPROVEDDATE"),
            dataField: "PERIODEND_OSOD_APPROVEDDATE",
          },

          {
            caption: t("PERIODEND_CDOD_DELIVERYOUTDATE"),
            dataField: "PERIODEND_CDOD_DELIVERYOUTDATE",
          },

          {
            caption: t("PERIODEND_VHI_HTCINVOICEDATE"),
            dataField: "PERIODEND_VHI_HTCINVOICEDATE",
          },

          {
            caption: t("PERIODEND_CV_MORTAGEENDDATE"),
            dataField: "PERIODEND_CV_MORTAGEENDDATE",
          },
          {
            caption: t("GiaCCCK"),
            dataField: "GiaCCCK",
          },

          {
            caption: t("PERIODEND_TOTALPMTCOC"),
            dataField: "PERIODEND_TOTALPMTCOC",
          },
          {
            caption: t("PERIODEND_TOTALPMTCOC_VTC"),
            dataField: "PERIODEND_TOTALPMTCOC_VTC",
          },
          {
            caption: t("PERIODEND_TOTALPMTCOC_VV"),
            dataField: "PERIODEND_TOTALPMTCOC_VV",
          },
          {
            caption: t("PERIODEND_TOTALAMONTGUARANTEE"),
            dataField: "PERIODEND_TOTALAMONTGUARANTEE",
          },
        ],
      },

      {
        caption: t("Phải thu cuối kỳ"),
        dataField: "PhaiThuCuoiky",
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("Đại lý uỷ quyền"),
            alignment: "center",
            columns: [
              {
                caption: t(""),
                columns: [
                  {
                    caption: t("PERIODEND_TOTALNOPMTCOC"),
                    dataField: "PERIODEND_TOTALNOPMTCOC",
                    customizeText: (e: any) => {
                      return e.value.toLocaleString();
                    },
                  },
                  {
                    caption: t("DEPOSITDUTYENDDATE"),
                    dataField: "DEPOSITDUTYENDDATE",
                  },
                ],
              },
              {
                caption: t("Chưa xuất hoá đơn chưa hiệu lực"),
                alignment: "center",
                columns: [
                  {
                    caption: t(
                      "PERIODEND_NODATESTARTGUARANTEEVALUE_NOHTCINVOICEDATE"
                    ),
                    dataField:
                      "PERIODEND_NODATESTARTGUARANTEEVALUE_NOHTCINVOICEDATE",
                    customizeText: (e: any) => {
                      return e.value.toLocaleString();
                    },
                  },
                ],
              },
              {
                caption: t("Đã xuất hoá đơn chưa hiệu lực"),
                alignment: "center",
                columns: [
                  {
                    caption: t(
                      "PERIODEND_NODATESTARTGUARANTEEVALUE_HTCINVOICEDATE"
                    ),
                    dataField:
                      "PERIODEND_NODATESTARTGUARANTEEVALUE_HTCINVOICEDATE",
                    customizeText: (e: any) => {
                      return e.value.toLocaleString();
                    },
                  },
                ],
              },
              {
                caption: t("Đã hiệu lực"),
                alignment: "center",
                columns: [
                  {
                    caption: t("PERIODEND_GUARANTEEVALUE"),
                    dataField: "PERIODEND_GUARANTEEVALUE",
                    customizeText: (e: any) => {
                      return e.value.toLocaleString();
                    },
                  },
                  {
                    caption: t("DATESTART"),
                    dataField: "DATESTART",
                  },
                  {
                    caption: t("DATEEXPIRED"),
                    dataField: "DATEEXPIRED",
                  },
                ],
              },
            ],
          },
          {
            caption: t("Đại lý TCG"),
            alignment: "center",
            columns: [
              {
                caption: t("PERIODEND_GUARANTEEVALUETCG"),
                dataField: "PERIODEND_GUARANTEEVALUETCG",
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
              {
                caption: t("LOANSUPPORTDATEEND"),
                dataField: "LOANSUPPORTDATEEND",
              },
            ],
          },
        ],
      },
    ];
  }, [isLoading]);

  // =================================================================
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_PmtPaymentDtlByDealer-columns",
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
                storeKey={"Rpt_PmtPaymentDtlByDealer-search"}
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
