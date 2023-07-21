import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_StatisticHTCStockOut01Param } from "@/packages/api/clientgate/Rpt_StatisticHTCStockOut01";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useQuery } from "@tanstack/react-query";
import { format, isAfter, isBefore } from "date-fns";
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
interface IReportParam {
  DealerCodeInput: string;
  SOCode: string;
  ModelCode: string;
  OSOApprovedDate2From: Date;
  OSOApprovedDate2To: Date;
  CDODeliveryOutDateFrom: Date;
  CDODeliveryOutDateTo: Date;
  OSOApprovedDateFrom: Date;
  OSOApprovedDateTo: Date;
  CDOApprovedDate2From: Date;
  CDOApprovedDate2To: Date;
  CDOCreatedDateFrom: Date;
  CDOCreatedDateTo: Date;
  HTCInvoiceDateFrom: Date;
  HTCInvoiceDateTo: Date;
  FlagDataWH: 1 | 0;
}

export const Rpt_StatisticHTCStockOut01 = () => {
  const { t } = useI18n("Rpt_StatisticHTCStockOut01");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    OSOApprovedDate2To: new Date(),
    CDODeliveryOutDateTo: new Date(),
    OSOApprovedDateTo: new Date(),
    CDOApprovedDate2To: new Date(),
    CDOCreatedDateTo: new Date(),
    HTCInvoiceDateTo: new Date(),
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_StatisticHTCStockOut01",
      "RptStatisticHTCStockOut01_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptStatisticHTCStockOut01_SearchHQ({
          DealerCodeInput: searchCondition.DealerCodeInput ?? "",
          SOCode: searchCondition.SOCode ?? "",
          ModelCode: searchCondition.ModelCode ?? "",
          OSOApprovedDate2From: searchCondition.OSOApprovedDate2From
            ? format(searchCondition.OSOApprovedDate2From, "yyyy-MM-dd")
            : "",
          OSOApprovedDate2To: searchCondition.OSOApprovedDate2To
            ? format(searchCondition.OSOApprovedDate2To, "yyyy-MM-dd")
            : "",
          CDODeliveryOutDateFrom: searchCondition.CDODeliveryOutDateFrom
            ? format(searchCondition.CDODeliveryOutDateFrom, "yyyy-MM-dd")
            : "",
          CDODeliveryOutDateTo: searchCondition.CDODeliveryOutDateTo
            ? format(searchCondition.CDODeliveryOutDateTo, "yyyy-MM-dd")
            : "",
          OSOApprovedDateFrom: searchCondition.OSOApprovedDateFrom
            ? format(searchCondition.OSOApprovedDateFrom, "yyyy-MM-dd")
            : "",
          OSOApprovedDateTo: searchCondition.OSOApprovedDateTo
            ? format(searchCondition.OSOApprovedDateTo, "yyyy-MM-dd")
            : "",
          CDOApprovedDate2From: searchCondition.CDOApprovedDate2From
            ? format(searchCondition.CDOApprovedDate2From, "yyyy-MM-dd")
            : "",
          CDOApprovedDate2To: searchCondition.CDOApprovedDate2To
            ? format(searchCondition.CDOApprovedDate2To, "yyyy-MM-dd")
            : "",
          CDOCreatedDateFrom: searchCondition.CDOCreatedDateFrom
            ? format(searchCondition.CDOCreatedDateFrom, "yyyy-MM-dd")
            : "",
          CDOCreatedDateTo: searchCondition.CDOCreatedDateTo
            ? format(searchCondition.CDOCreatedDateTo, "yyyy-MM-dd")
            : "",
          HTCInvoiceDateFrom: searchCondition.HTCInvoiceDateFrom
            ? format(searchCondition.HTCInvoiceDateFrom, "yyyy-MM-dd")
            : "",
          HTCInvoiceDateTo: searchCondition.HTCInvoiceDateTo
            ? format(searchCondition.HTCInvoiceDateTo, "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_StatisticHTCStockOut01Param);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: modalCodeData } = useQuery({
    queryKey: ["modalCode_In_RptStatisticHTCStockOut01"],
    queryFn: () => {
      return api.Mst_CarModel_GetAllActive();
    },
  });
  const { data: dealerCodeData } = useQuery({
    queryKey: ["dealerCode_In_RptStatisticHTCStockOut01"],
    queryFn: () => {
      return api.Mst_Dealer_GetAllActive();
    },
  });
  //PageHeader
  const handleExportExcel = useCallback(() => {}, []);
  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.RptStatisticHTCStockOut01_ExportDetailSearchHQ({
      DealerCodeInput: searchCondition.DealerCodeInput ?? "",
      SOCode: searchCondition.SOCode ?? "",
      ModelCode: searchCondition.ModelCode ?? "",
      OSOApprovedDate2From: searchCondition.OSOApprovedDate2From
        ? format(searchCondition.OSOApprovedDate2From, "yyyy-MM-dd")
        : "",
      OSOApprovedDate2To: searchCondition.OSOApprovedDate2To
        ? format(searchCondition.OSOApprovedDate2To, "yyyy-MM-dd")
        : "",
      CDODeliveryOutDateFrom: searchCondition.CDODeliveryOutDateFrom
        ? format(searchCondition.CDODeliveryOutDateFrom, "yyyy-MM-dd")
        : "",
      CDODeliveryOutDateTo: searchCondition.CDODeliveryOutDateTo
        ? format(searchCondition.CDODeliveryOutDateTo, "yyyy-MM-dd")
        : "",
      OSOApprovedDateFrom: searchCondition.OSOApprovedDateFrom
        ? format(searchCondition.OSOApprovedDateFrom, "yyyy-MM-dd")
        : "",
      OSOApprovedDateTo: searchCondition.OSOApprovedDateTo
        ? format(searchCondition.OSOApprovedDateTo, "yyyy-MM-dd")
        : "",
      CDOApprovedDate2From: searchCondition.CDOApprovedDate2From
        ? format(searchCondition.CDOApprovedDate2From, "yyyy-MM-dd")
        : "",
      CDOApprovedDate2To: searchCondition.CDOApprovedDate2To
        ? format(searchCondition.CDOApprovedDate2To, "yyyy-MM-dd")
        : "",
      CDOCreatedDateFrom: searchCondition.CDOCreatedDateFrom
        ? format(searchCondition.CDOCreatedDateFrom, "yyyy-MM-dd")
        : "",
      CDOCreatedDateTo: searchCondition.CDOCreatedDateTo
        ? format(searchCondition.CDOCreatedDateTo, "yyyy-MM-dd")
        : "",
      HTCInvoiceDateFrom: searchCondition.HTCInvoiceDateFrom
        ? format(searchCondition.HTCInvoiceDateFrom, "yyyy-MM-dd")
        : "",
      HTCInvoiceDateTo: searchCondition.HTCInvoiceDateTo
        ? format(searchCondition.HTCInvoiceDateTo, "yyyy-MM-dd")
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
  const searchFields: IItemProps[] = [
    {
      caption: "DealerCodeInput",
      dataField: "DealerCodeInput",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: dealerCodeData?.DataList ?? [],
        valueExpr: "DealerCode",
        displayExpr: "DealerCode",
        searchEnabled: true,
      },
    },
    {
      dataField: "SOCode",
      caption: t("SOCode"),
      visible: true,
    },

    {
      dataField: "HTCInvoiceDateFrom",
      caption: t("HTCInvoiceDateFrom"),
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
          validationCallback: (e: any) => {
            // console.log("==event", e);
            if (searchCondition.HTCInvoiceDateTo) {
              return !isAfter(e.value, searchCondition.HTCInvoiceDateTo);
            }
            return true;
          },
          message: t("HTCInvoiceDateFromMustBeBeforeHTCInvoiceDateTo"),
        },
      ],
    },
    {
      dataField: "HTCInvoiceDateTo",
      caption: t("HTCInvoiceDateTo"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.HTCInvoiceDateFrom);
          },
          message: t("HTCInvoiceDateToMustBeAfterHTCInvoiceDateFrom"),
        },
      ],
    },

    {
      dataField: "CDODeliveryOutDateFrom",
      caption: t("CDODeliveryOutDateFrom"),
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
          validationCallback: (e: any) => {
            // console.log("==event", e);
            if (searchCondition.CDODeliveryOutDateTo) {
              return !isAfter(e.value, searchCondition.CDODeliveryOutDateTo);
            }
            return true;
          },
          message: t("CDODeliveryOutDateFromMustBeBeforeCDODeliveryOutDateTo"),
        },
      ],
    },
    {
      dataField: "CDODeliveryOutDateTo",
      caption: t("CDODeliveryOutDateTo"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.CDODeliveryOutDateFrom);
          },
          message: t("CDODeliveryOutDateToMustBeAfterCDODeliveryOutDateFrom"),
        },
      ],
    },

    {
      dataField: "ModelCode",
      caption: t("ModelCode"),
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: modalCodeData?.DataList ?? [],
        valueExpr: "ModelCode",
        displayExpr: "ModelCode",
        searchEnabled: true,
      },
    },

    {
      dataField: "CDOApprovedDate2From",
      caption: t("CDOApprovedDate2From"),
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
          validationCallback: (e: any) => {
            // console.log("==event", e);
            if (searchCondition.CDOApprovedDate2To) {
              return !isAfter(e.value, searchCondition.CDOApprovedDate2To);
            }
            return true;
          },
          message: t("CDOApprovedDate2FromMustBeBeforeCDOApprovedDate2To"),
        },
      ],
    },
    {
      dataField: "CDOApprovedDate2To",
      caption: t("CDOApprovedDate2To"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.CDOApprovedDate2From);
          },
          message: t("CDOApprovedDate2ToMustBeAfterCDOApprovedDate2From"),
        },
      ],
    },

    {
      dataField: "CDOCreatedDateFrom",
      caption: t("CDOCreatedDateFrom"),
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
          validationCallback: (e: any) => {
            // console.log("==event", e);
            if (searchCondition.CDOCreatedDateTo) {
              return !isAfter(e.value, searchCondition.CDOCreatedDateTo);
            }
            return true;
          },
          message: t("CDOCreatedDateFromMustBeBeforeCDOCreatedDateTo"),
        },
      ],
    },
    {
      dataField: "CDOCreatedDateTo",
      caption: t("CDOCreatedDateTo"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.CDOCreatedDateFrom);
          },
          message: t("CDOCreatedDateToMustBeAfterCDOCreatedDateFrom"),
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

  const handleSearch = useCallback(async (data: IReportParam) => {
    reloading();
  }, []);

  //PivotGrid
  const fields = useMemo<Field[]>(() => {
    return [
      {
        dataField: "CCMODELCODE",
        area: "row",
        areaIndex: 0,
        expanded: false,
      },

      {
        dataField: "UNITPRICEACTUAL",
        area: "filter",
        areaIndex: 11,
      },

      {
        dataField: "VIN",
        area: "filter",
        areaIndex: 12,
      },

      {
        dataField: "STOREDATE",
        area: "filter",
        areaIndex: 13,
      },

      {
        dataField: "PRODUCTIONYEARACTUAL",
        area: "filter",
        areaIndex: 23,
      },

      {
        dataField: "DEALERCODEDEFAULT",
        area: "filter",
        areaIndex: 0,
      },
      {
        dataField: "DEALERNAMEDEFAULT",
        area: "filter",
        areaIndex: 1,
      },
      {
        dataField: "ISHTC",
      },
      {
        dataField: "CVSPECDESCRIPTION",
        area: "row",
        areaIndex: 2,
      },
      {
        dataField: "CVMODELNAME",
        area: "row",
        areaIndex: 1,
        expanded: false,
      },

      {
        dataField: "CVCOLOREXTNAMEVN",
        area: "filter",
        areaIndex: 14,
      },

      {
        dataField: "SOCODE",
        area: "filter",
        areaIndex: 2,
      },

      {
        dataField: "STORAGECODEDELIVERY",
        area: "filter",
        areaIndex: 10,
      },

      {
        dataField: "DELIVERYOUTDATE",
        area: "filter",
        areaIndex: 7,
      },

      {
        dataField: "DELIVERYENDDATE",
        area: "filter",
        areaIndex: 9,
      },
      {
        dataField: "TOTAL",
        area: "data",
        areaIndex: 0,
      },
      {
        dataField: "OSO_APPROVEDDATE2",
        area: "filter",
        areaIndex: 3,
      },
      {
        dataField: "OSO_APPROVEDMONTH2",
        area: "filter",
        areaIndex: 4,
      },
      {
        dataField: "OSOD_APPROVEDDATE",
        area: "filter",
        areaIndex: 15,
      },
      {
        dataField: "CDO_APPROVEDDATE2",
        area: "filter",
        areaIndex: 6,
      },
      {
        dataField: "CDO_APPROVEDDATE2MONTH",
        area: "filter",
        areaIndex: 21,
      },
      {
        dataField: "CDOD_DELIVERYOUTMONTH",
        area: "filter",
        areaIndex: 8,
      },
      {
        dataField: "PRODUCTIONYEAR",
        area: "filter",
        areaIndex: 5,
      },
      {
        dataField: "COYEAR",
        area: "filter",
        areaIndex: 18,
      },

      {
        dataField: "MD_HTCSTAFFINCHARGE",
        area: "filter",
        areaIndex: 17,
      },
      {
        dataField: "MA2_AREACODE",
        area: "filter",
        areaIndex: 16,
      },

      {
        dataField: "DOSOR_MONTHORDER",
        area: "filter",
        areaIndex: 19,
      },

      {
        dataField: "HTCINVOICEDATE",
        area: "filter",
        areaIndex: 20,
      },
      {
        dataField: "HTCINVOICEDATEMONTH",
        area: "filter",
        areaIndex: 22,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_RptStatistic_HTCStockOut01_Detail,
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
                storeKey={"Rpt_StatisticHTCStockOut01-search"}
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
              {!!data && data?.Data?.Lst_RptStatistic_HTCStockOut01_Detail && (
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
                    storageKey={"Rpt_StatisticHTCStockOut01"}
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
