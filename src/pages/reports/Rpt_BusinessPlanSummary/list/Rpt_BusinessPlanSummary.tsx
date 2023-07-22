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
import { format, getYear, isAfter, isBefore } from "date-fns";
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
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { RptBusinessPlanSummaryParam } from "@/packages/api/clientgate/Rpt_BusinessPlanSummaryApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  VisitDateFrom: any;
  VisitDateTo: any;
  DealerCodeInput: string;
  BusinessPlanStatus: string;
  TimesPlan: string;
  YearPlan: any;
  Version: string;
  FlagDataWH: any;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_BusinessPlanSummary = () => {
  const { t } = useI18n("Rpt_BusinessPlanSummary");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    DealerCodeInput: "",
    BusinessPlanStatus: "P",
    Version: "INIT",
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_BusinessPlanSummary",
      "RptBusinessPlanSummary_SearchDL",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptBusinessPlanSummary_SearchDL({
          DealerCodeInput: searchCondition.DealerCodeInput ?? "",
          BusinessPlanStatus: searchCondition.BusinessPlanStatus ?? "",
          TimesPlan: searchCondition.TimesPlan ?? "",
          YearPlan: searchCondition.YearPlan ?? "",
          Version: searchCondition.Version ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as RptBusinessPlanSummaryParam);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: listDealer } = useQuery(
    ["listDealerCode_Rpt_BusinessPlanSummary"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList)
        return [...resp.DataList, { DealerCode: "", DealerName: "All" }];
    }
  );

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.RptBusinessPlanSummary_SearchHQ(searchCondition);
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
    //   {
    //     caption: t("VisitDateFrom"),
    //     dataField: "VisitDateFrom",
    //     editorType: "dxDateBox",
    //     visible: true,
    //     editorOptions: {
    //       displayFormat: "yyyy-MM-dd",
    //       openOnFieldClick: true,
    //       validationMessageMode: "always",
    //       showClearButton: true,
    // max: new Date(),
    //     },
    //     validationRules: [
    //       RequiredField(t("VisitDateFromIsRequired")),
    //       {
    //         type: "custom",
    //         ignoreEmptyValue: true,
    //         validationCallback: ({ value }: any) => {
    //           if (searchCondition.VisitDateTo) {
    //             return !isAfter(value, searchCondition.VisitDateTo);
    //           }
    //           return true;
    //         },
    //         message: t("VisitDateFromMustBeBeforeDateTo"),
    //       },
    //     ],
    //   },
    //   {
    //     caption: t("VisitDateTo"),
    //     dataField: "VisitDateTo",
    //     editorType: "dxDateBox",
    //     visible: true,
    //     editorOptions: {
    //       displayFormat: "yyyy-MM-dd",
    //       openOnFieldClick: true,
    //       validationMessageMode: "always",
    //       showClearButton: true,
    //     },
    //     validationRules: [
    //       RequiredField(t("VisitDateToIsRequired")),
    //       {
    //         type: "custom",
    //         ignoreEmptyValue: true,
    //         validationCallback: ({ value }: any) => {
    //           return !isBefore(value, searchCondition.VisitDateFrom);
    //         },
    //         message: t("DateToMustBeAfterVisitDateFrom"),
    //       },
    //     ],
    //   },
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
      validationRules: [RequiredField(t("DealerCodeInputIsRequire"))],

    },
    {
      caption: t("YearPlan"),
      dataField: "YearPlan",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: yearDataSource,
        displayExpr: "text",
        valueExpr: "value",
      },
      validationRules: [RequiredField(t("YearPlanIsRequire"))],
    },
    {
      caption: t("BusinessPlanStatus"),
      dataField: "BusinessPlanStatus",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "P",
            text: t("P"),
          },
          {
            value: "A1",
            text: t("A1"),
          },
          {
            value: "A2",
            text: t("A2"),
          },
        ],
      },
    },
    {
      dataField: "TimesPlan",
      caption: t("Lần"),
      editorType: "dxNumberBox",
      visible: true,
      editorOptions: {
        placeholder: t("Nhập"),
      },
    },
    {
      dataField: "Version",
      caption: t("Version"),
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "INIT",
            text: t("INIT"),
          },
          {
            value: "ACTUAL",
            text: t("ACTUAL"),
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

  //PivotGrid
  const fields = useMemo<Field[]>(() => {
    return [
      {
        dataField: "PlanType",
        area: "row",
        areaIndex: 0,
      },
      {
        dataField: "mcm_ModelCode",
      },
      {
        dataField: "mcm_ModelName",
        area: "row",
        areaIndex: 1,
      },
      {
        dataField: "AreaCodeDealer",
        area: "filter",
        areaIndex: 1,
      },
      {
        dataField: "AreaNameDealer",
      },
      {
        dataField: "HTCStaffInCharge",
        area: "filter",
        areaIndex: 2,
      },
      {
        dataField: "BusinessPlanStatus",
      },
      {
        dataField: "md_DealerCode",
        area: "filter",
        areaIndex: 3,
      },
      {
        dataField: "md_DealerName",
        area: "filter",
        areaIndex: 0,
      },
      {
        dataField: "ModelCode",
        area: "filter",
        areaIndex: 4,
      },
      {
        dataField: "MonthPlan",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "QtyMonth",
        area: "data",
        areaIndex: 0,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_Rpt_BusinessPlan_Summary,
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
                storeKey={"Rpt_BusinessPlanSummary-search"}
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
              {!!data && data?.Data?.Lst_Rpt_BusinessPlan_Summary && (
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
                    storageKey={"Rpt_BusinessPlanSummary"}
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
