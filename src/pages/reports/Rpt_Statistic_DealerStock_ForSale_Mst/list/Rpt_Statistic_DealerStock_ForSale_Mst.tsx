import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { RptStatistic_DealerStock_ForSale_MstParam } from "@/packages/api/clientgate/RptStatistic_DealerStock_ForSale_Mst";
import { Rpt_GuaranteeDebit01Param } from "@/packages/api/clientgate/Rpt_GuaranteeDebit01Api";
import { Rpt_SalesDelivery01Param } from "@/packages/api/clientgate/Rpt_SalesDelivery01Api";
import { RequiredField } from "@/packages/common/Validation_Rules";
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
  DateFrom: Date;
  DateTo: Date;
  FlagDataWH?: 1 | 0;
}

export const Rpt_Statistic_DealerStock_ForSale_Mst = () => {
  const { t } = useI18n("Rpt_Statistic_DealerStock_ForSale_Mst");
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
      "Rpt_Statistic_DealerStock_ForSale_Mst",
      "RptStatistic_DealerStock_ForSale_Mst_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptStatistic_DealerStock_ForSale_Mst_SearchHQ({
          DateFrom: format(searchCondition.DateFrom, "yyyy-MM-dd"),
          DateTo: searchCondition.DateTo
            ? format(searchCondition.DateTo, "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as RptStatistic_DealerStock_ForSale_MstParam);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(() => {}, []);
  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.RptStatisticHTCStockOutOnWay_ExportDetailSearchHQ({
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
      dataField: "DateFrom",
      caption: t("DateFrom"),
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
            if (searchCondition.DateTo) {
              return !isAfter(value, searchCondition.DateTo);
            }
            return true;
          },
          message: t("DateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      dataField: "DateTo",
      caption: t("DateTo"),
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
            return !isBefore(value, searchCondition.DateFrom);
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

  const handleSearch = useCallback(async (data: IReportParam) => {
    reloading();
  }, []);

  //PivotGrid
  const fields = useMemo<Field[]>(() => {
    return [
      {
        dataField: "CARID",
        area: "filter",
        areaIndex: 0,
      },

      {
        dataField: "VIN",
        area: "filter",
        areaIndex: 5,
      },

      {
        dataField: "CVMODELCODE",
        area: "row",
        areaIndex: 2,
        expanded: false,
      },
      {
        dataField: "CVCOLORCODE",
        area: "filter",
        areaIndex: 1,
      },

      {
        dataField: "DLSDDEALERCODESOURCE",
        area: "filter",
        areaIndex: 4,
      },
      {
        dataField: "DLSDDEALERCODEOWNER",
        area: "row",
        areaIndex: 0,
        expanded: false,
      },

      {
        dataField: "DSMSMNAME",
        area: "filter",
        areaIndex: 22,
      },
      {
        dataField: "NEXTDLSDDEALERCODEOWNER",
        area: "filter",
        areaIndex: 3,
      },

      {
        dataField: "NEXTDLSDDLSDDEALNO",
        area: "filter",
        areaIndex: 2,
      },

      {
        dataField: "TT_CARID",
        area: "data",
        areaIndex: 0,
      },
      {
        dataField: "MYSTATUS",
      },
      {
        dataField: "CVCUSTOMSCLEARANCEDATE",
        area: "filter",
        areaIndex: 7,
      },
      {
        dataField: "DUTYCOMPLETEDDATE",
        area: "filter",
        areaIndex: 8,
      },
      {
        dataField: "TOTALCOMPLETEDDATE",
        areaIndex: -1,
      },
      {
        dataField: "COCONLY_COMPLETEDDATE",
        area: "filter",
        areaIndex: 10,
      },
      {
        dataField: "CMP1_PAYMENTENDDATE_CBU30_CKD15",
        area: "filter",
        areaIndex: 9,
      },
      {
        dataField: "PRODUCTIONYEARACTUAL",
        area: "filter",
        areaIndex: 24,
      },
      {
        dataField: "PRODUCTIONYEAR",
        area: "filter",
        areaIndex: 11,
      },
      {
        dataField: "AC_SPECDESCRIPTION",
        area: "row",
        areaIndex: 3,
      },

      {
        dataField: "DLSDPRONVINCENAMEBUYER",
        area: "filter",
        areaIndex: 14,
      },
      {
        dataField: "CVMODELNAME",
      },
      {
        dataField: "SALESTYPENAMEVN",
        area: "filter",
        areaIndex: 13,
      },
      {
        dataField: "DLSDDEALERNAMEOWNER",
        area: "row",
        areaIndex: 1,
      },
      {
        dataField: "NEXTDLSDDDELIVERYMONTH",
        area: "filter",
        areaIndex: 12,
      },
      {
        dataField: "DCD_UNITPRICE",
        area: "filter",
        areaIndex: 15,
      },
      {
        dataField: "AREACODECUS",
      },
      {
        dataField: "AREANAMECUS",
        area: "filter",
        areaIndex: 18,
      },
      {
        dataField: "AREACODEDEALER",
      },
      {
        dataField: "AREANAMEDEALER",
        area: "filter",
        areaIndex: 16,
      },
      {
        dataField: "HTCSTAFFINCHARGE",
        area: "filter",
        areaIndex: 17,
      },
      {
        dataField: "COYEAR",
        area: "filter",
        areaIndex: 19,
      },
      {
        dataField: "SMCODE",
      },
      {
        dataField: "SMNAME",
      },
      {
        dataField: "DDDDELIVERYDATE",
        area: "filter",
        areaIndex: 23,
      },
      {
        dataField: "COLOREXTNAMEVN",
        area: "filter",
        areaIndex: 20,
      },
      {
        dataField: "COLORINTNAMEVN",
        area: "filter",
        areaIndex: 21,
      },
      {
        dataField: "COLORFEE",
      },
      {
        dataField: "COLOR_VN_COMBINED",
        area: "filter",
        areaIndex: 6,
      },
      {
        dataField: "COLOR_EN_COMBINED",
      },
      {
        dataField: "STATUSVALUE",
        area: "column",
        areaIndex: 0,
        expanded: false,
      },
      {
        dataField: "MyStatus",
        area: "column",
        areaIndex: 1,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_RptStatistic_DealerStock_ForSale_Mst,
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
            <div className="w-[200px]">
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"Rpt_Statistic_DealerStock_ForSale_Mst-search"}
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
              {!!data &&
                data?.Data?.Lst_RptStatistic_DealerStock_ForSale_Mst && (
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
                      storageKey={"Rpt_Statistic_DealerStock_ForSale_Mst"}
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
