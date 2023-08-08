import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { RptStatisticHTCStockOutOnWayParam } from "@/packages/api/clientgate/Rpt_StatisticHTCStockOutOnWayApi";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useQuery } from "@tanstack/react-query";
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
  FlagDataWH: boolean;
}

export const Rpt_StatisticHTCStockOutOnWay = () => {
  const { t } = useI18n("Rpt_StatisticHTCStockOutOnWay");
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
      "report",
      "Rpt_StatisticHTCStockOutOnWay",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptStatisticHTCStockOutOnWay_SearchHQ({
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as RptStatisticHTCStockOutOnWayParam);
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
        dataField: "DEALERCODE",
        area: "row",
        areaIndex: 4,
      },
      {
        dataField: "CARID",
        area: "filter",
        areaIndex: 0,
      },
      {
        dataField: "VIN",
        area: "row",
        areaIndex: 2,
        expanded: false,
      },
      {
        dataField: "LOAITHUNG",
        area: "row",
        areaIndex: 9,
      },
      {
        dataField: "CDODSTORAGECODE",
        area: "row",
        areaIndex: 5,
      },
      {
        dataField: "CDODDELIVERYSTARTDATE",
        area: "row",
        areaIndex: 7,
      },
      {
        dataField: "CDODDELIVERYOUTDATE",
        area: "row",
        areaIndex: 6,
      },
      {
        dataField: "CDODDELIVERYEXPECTEDDATE",
        area: "row",
        areaIndex: 8,
      },
      {
        dataField: "TOTAL",
        area: "data",
        areaIndex: 0,
        summaryType: "count",
      },
      {
        dataField: "TRANSPORTERNAME",
        area: "row",
        areaIndex: 0,
        expanded: false,
      },
      {
        dataField: "SPECDESCRIPTION",
        area: "row",
        areaIndex: 1,
        expanded: false,
      },
      {
        dataField: "COLOR_VN_COMBINED",
        area: "row",
        areaIndex: 3,
      },

      {
        dataField: "CCSOCODE",
        area: "filter",
        areaIndex: 6,
      },

      {
        dataField: "CVCOLORCODE",
        area: "filter",
        areaIndex: 1,
      },
      {
        dataField: "CVENGINENO",
        area: "filter",
        areaIndex: 5,
      },

      {
        dataField: "DELIVERYORDERNO",
        area: "filter",
        areaIndex: 3,
      },

      {
        dataField: "CTRTRANSPORTERCODE",
        area: "filter",
        areaIndex: 4,
      },

      {
        dataField: "COLOR_EN_COMBINED",
        area: "filter",
        areaIndex: 2,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_RptStatistic_HTCStockOutOnWay,
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
                storeKey={"rpt-statistic-htc-stock-out-on-way-search"}
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
              {!!data && data?.Data?.Lst_RptStatistic_HTCStockOutOnWay && (
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
                    storageKey={"rpt-statistic-htc-stock-out-on-way-search"}
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
