import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useI18n } from "@/i18n/useI18n";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { useClientgateApi } from "@packages/api";
import PivotGrid, {
  Export,
  FieldChooser,
  FieldPanel,
  LoadPanel as PivotLoadPanel,
  Scrolling,
  StateStoring,
} from "devextreme-react/pivot-grid";
import { useQuery } from "@tanstack/react-query";
import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { PageHeader } from "../components";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { LoadPanel } from "devextreme-react";
import { nanoid } from "nanoid";
import { Rpt_StatisticGrpDealer03Param } from "@/packages/api/clientgate/Rpt_StatisticGrpDealer03Api";
import { toast } from "react-toastify";
import { requiredType } from "@/packages/common/Validation_Rules";
interface ReportParam {
  FlagDataWH: boolean;
}
export const Rpt_StatisticGrpDealer03 = () => {
  const [isGetingData, setGettingData] = useState(false);
  const { t } = useI18n("Rpt_StatisticGrpDealer03");

  const [searchCondition, setSearchCondition] = useState<ReportParam>(
    {} as ReportParam
  );

  const windowSize = useWindowSize();
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();

  // đóng mở form search
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  // call data
  const { data, isLoading } = useQuery({
    queryKey: [
      "report_RptStatisticGrpDealer03_SearchHQ",
      "RptStatisticGrpDealer03",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptStatisticGrpDealer03_SearchHQ({
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_StatisticGrpDealer03Param);
        return resp;
      } else {
        return null;
      }
    },
    // enabled: false,
  });
  console.log("🚀 ~ data:", data);
  // hàm search khi thực hiện tìm kiếm
  const handleSearch = useCallback(async (data: ReportParam) => {
    // setGettingData(true);
    reloading();

    // setGettingData(false);
  }, []);

  // các trường trong pivot
  const fields = useMemo<Field[]>(() => {
    return [
      {
        caption: t("TOTAL"),
        dataField: "TOTAL",
        area: "data",
        showGrandTotals: true,
        showTotals: true,
        summaryType: "count",
        isMeasure: true, // allows the end-user to place this f
      },
      {
        caption: t("CVMODELNAME"),
        dataField: "CVMODELNAME",
        area: "row",
        areaIndex: 0,
      },

      {
        caption: t("DEALERNAME"),
        dataField: "DEALERNAME",
        area: "column",
        areaIndex: 1,
      },
      {
        caption: t("DEALERCODE"),
        dataField: "DEALERCODE",
        area: "column",
        areaIndex: 2,
      },
      {
        label: {
          text: t("CVMODELCODE"),
        },
        dataField: "CVMODELCODE",
        area: "filter",
        areaIndex: 3,
      },
    ];
  }, [t]);
  // cấu hình dataSource

  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_RptStatistic_GrpDealer03,
  });
  // hàm export excel  chi tiết
  const handleExportDetail = useCallback(async () => {
    const result = await api.Rpt_StatisticGrpDealer03_ExportDetailSearchHQ({
      FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
    });
    if (result.isSuccess && result.Data) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = result.Data;
    }
  }, []);
  // hàm export excel all
  const handleExport = useCallback(async () => {}, []);

  // form search
  const searchFields: IItemProps[] = [
    {
      dataField: "FlagDataWH",
      visible: true,
      caption: t("FlagDataWH"),
      editorType: "dxCheckBox",
    },
  ];

  return (
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
            <div className={"w-[200px] h-full"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"rpt-statistic-grp-dealer03-search"}
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

            <div className={"w-full mt-4"}>
              {!!data && data.Data?.Lst_RptStatistic_GrpDealer03 && (
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
                    storageKey={"report-Rpt-StatisticGrpDealer03"}
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
