import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_StatisticHTCBackOrderSpecCode01PivotParam } from "@/packages/api/clientgate/Rpt_StatisticHTCBackOrderSpecCode01PivotApi";
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

export const Rpt_StatisticHTCBackOrderSpecCode01Pivot = () => {
  const { t } = useI18n("base");
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
      "Rpt_StatisticHTCBackOrderSpecCode01Pivot",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp =
          await api.Rpt_StatisticHTCBackOrderSpecCode01Pivot_SearchHQ({
            FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
          } as Rpt_StatisticHTCBackOrderSpecCode01PivotParam);
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
    const result =
      await api.Rpt_StatisticHTCBackOrderSpecCode01Pivot_ExportDetailSearchHQ({
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
        dataField: "CarID",
        area: "data",
        areaIndex: 0,
        summaryType: "count",
      },
      {
        dataField: "DUTYCOMPLETEDPERCENT_RANGE",
        area: "column",
        areaIndex: 0,
        expanded: false,
      },
      {
        dataField: "DUTYDAYS_RANGE",
        area: "column",
        areaIndex: 1,
      },
      {
        dataField: "CARID",
      },
      {
        dataField: "SOCODE",
        area: "filter",
        areaIndex: 7,
      },

      {
        dataField: "MODELCODE",
        area: "filter",
        areaIndex: 6,
      },

      {
        dataField: "VIN",
        area: "filter",
        areaIndex: 1,
      },

      {
        dataField: "LOAITHUNG",
        area: "filter",
        areaIndex: 9,
      },

      {
        dataField: "CVCOLOREXTCODE",
        area: "filter",
        areaIndex: 2,
      },
      {
        dataField: "CVCOLOREXTNAME",
        area: "filter",
        areaIndex: 3,
      },
      {
        dataField: "CVCOLOREXTNAMEVN",
      },
      {
        dataField: "CVCOLORINTCODE",
        area: "filter",
        areaIndex: 5,
      },
      {
        dataField: "CVCOLORINTNAME",
        area: "filter",
        areaIndex: 4,
      },

      {
        dataField: "MCSSPECDESCRIPTION",
        area: "row",
        areaIndex: 1,
      },
      {
        dataField: "CCDEALERCODE",
        area: "row",
        areaIndex: 0,
        expanded: false,
      },
      {
        dataField: "CCDEALERNAME",
        area: "filter",
        areaIndex: 0,
      },

      {
        dataField: "TRANSDELIVERYRANGETYPE",
        area: "filter",
        areaIndex: 8,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_RptStatistic_HTCBackOrder_SpecCode_01_Detail,
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
                storeKey={"Rpt_StatisticHTCBackOrderSpecCode01Pivot-search"}
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
                data?.Data
                  ?.Lst_RptStatistic_HTCBackOrder_SpecCode_01_Detail && (
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
                      storageKey={
                        "Rpt_StatisticHTCBackOrderSpecCode01Pivot-search"
                      }
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
