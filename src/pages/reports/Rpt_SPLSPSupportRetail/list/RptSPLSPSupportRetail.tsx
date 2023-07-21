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
import { isAfter, isBefore } from "date-fns";
import { LoadPanel, PivotGrid } from "devextreme-react";
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

import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { RptSPLSPSupportRetailParam } from "@/packages/api/clientgate/Rpt_SPLSPSupportRetailApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  DealerCodeConditionList: any;
  SPSRCodeConditionList: any;
  TDate_From: any;
  TDate_To: any;
  HTCDatePayment_From: any;
  HTCDatePayment_To: any;
  SPNo: string;
  FlagDataWH: 1 | 0;
}

export const RptSPLSPSupportRetail = () => {
  const { t } = useI18n("RptSPLSPSupportRetail");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    TDate_To: new Date(),
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "RptSPLSPSupportRetail",
      "RptSPLSPSupportRetail_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptSPLSPSupportRetail_SearchHQ({
          DealerCodeConditionList:
            searchCondition.DealerCodeConditionList ?? "",
          SPSRCodeConditionList: searchCondition.SPSRCodeConditionList ?? "",
          TDate_From: searchCondition.TDate_From ?? "",
          TDate_To: searchCondition.TDate_To ?? "",
          HTCDatePayment_From: searchCondition.HTCDatePayment_From ?? "",
          HTCDatePayment_To: searchCondition.HTCDatePayment_To ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
          SPNo: searchCondition.SPNo ?? "",
        } as RptSPLSPSupportRetailParam);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: dealerCodeData } = useQuery({
    queryKey: ["dealerCode_In_Rpt_ProfileGuaranteeEffect"],
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
    const result = await api.RptSPLSPSupportRetail_ExportDetailSearchHQ({
      DealerCodeConditionList: searchCondition.DealerCodeConditionList ?? "",
      SPSRCodeConditionList: searchCondition.SPSRCodeConditionList ?? "",
      TDate_From: searchCondition.TDate_From ?? "",
      TDate_To: searchCondition.TDate_To ?? "",
      HTCDatePayment_From: searchCondition.HTCDatePayment_From ?? "",
      HTCDatePayment_To: searchCondition.HTCDatePayment_To ?? "",
      FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
      SPNo: searchCondition.SPNo ?? "",
    });
    if (result.isSuccess && result.Data) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = result.Data;
    }
  }, []);

  const handletoggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

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

  //SearchPanelV2
  const searchFields: IItemProps[] = [
    {
      caption: t("DealerCodeConditionList"),
      dataField: "DealerCodeConditionList",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: dealerCodeData?.DataList ?? [],
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
      },
    },
    {
      caption: t("SPSRCodeConditionList"),
      dataField: "SPSRCodeConditionList",
      visible: true,
      editorType: "dxTextBox",
    },

    {
      caption: t("SPNo"),
      dataField: "SPNo",
      visible: true,
      editorType: "dxTextBox",
    },
    {
      caption: t("TDate_From"),
      dataField: "TDate_From",
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
        RequiredField(t("TDate_FromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.TDate_To) {
              return !isAfter(value, searchCondition.TDate_To);
            }
            return true;
          },
          message: t("TDate_FromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: t("TDate_To"),
      dataField: "TDate_To",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("DateToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.TDate_From);
          },
          message: t("DateToMustBeAfterTDate_From"),
        },
      ],
    },

    {
      caption: t("HTCDatePayment_From"),
      dataField: "HTCDatePayment_From",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: yearDs() ?? [],
        displayExpr: "text",
        valueExpr: "year",
        validationMessageMode: "always",
        validationGroup: "form",
      },

      validationRules: [
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.HTCDatePayment_To) {
              return !isAfter(value, searchCondition.HTCDatePayment_To);
            }
            return true;
          },
          message: t("HTCDatePayment_FromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: t("HTCDatePayment_To"),
      dataField: "HTCDatePayment_To",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: yearDs() ?? [],
        displayExpr: "text",
        valueExpr: "year",
        validationMessageMode: "always",
        validationGroup: "form",
      },

      validationRules: [
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.HTCDatePayment_From);
          },
          message: t("HTCDatePayment_ToMustBeAfterHTCDatePayment_From"),
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

  //PivotGrid
  const fields = useMemo<Field[]>(() => {
    return [
      {
        dataField: "DealerCode",
        area: "row",
        areaIndex: 0,
      },
      {
        dataField: "TOTAL",
        area: "data",
        areaIndex: 0,
      },
      {
        dataField: "SPSRCode",
        area: "row",
        areaIndex: 1,
      },

      {
        dataField: "AmountSupport",
        area: "row",
        areaIndex: 4,
        customizeText: (e: any) => {
          return e.value.toLocaleString();
        },
      },
      {
        dataField: "SPNo",
        area: "row",
        areaIndex: 2,
      },

      {
        dataField: "DateSupport",
        area: "row",
        areaIndex: 3,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_Rpt_SPL_SPSupportRetail,
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
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"RptSPLSPSupportRetail-search"}
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
              {!!data && data?.Data?.Lst_Rpt_SPL_SPSupportRetail && (
                <PivotGrid
                  id="pivotgrid"
                  dataSource={dataSource}
                  allowSortingBySummary={true}
                  allowFiltering={true}
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
                  // width={200}
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
                    storageKey={"RptSPLSPSupportRetail"}
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
