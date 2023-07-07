import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_StatisticHTCBackOrderSpecCode01Param } from "@/packages/api/clientgate/Rpt_StatisticHTCBackOrderSpecCode01Api";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { DataGrid, LoadPanel, PivotGrid } from "devextreme-react";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";

import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { IReportParam } from "../components/header";
import { PageHeader } from "../components/page-header";

export const Rpt_StatisticHTCBackOrderSpecCode01 = () => {
  const { t } = useI18n("Rpt_StatisticHTCBackOrderSpecCode01");
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
      "Rpt_StatisticHTCBackOrderSpecCode01",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_StatisticHTCBackOrderSpecCode01_SearchHQ({
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_StatisticHTCBackOrderSpecCode01Param);
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
  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        caption: t(""),
        alignment: "center",
        columns: [
          {
            dataField: "MCSSPECDESCRIPTION",
            caption: t("MCSSPECDESCRIPTION"),
          },
        ],
      },
      {
        caption: t("% hoàn thành nghĩa vụ giao xe"),
        alignment: "center",
        columns: [
          {
            dataField: "DUTYCOMPLETEDPERCENT_000",
            caption: t("DUTYCOMPLETEDPERCENT_000"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_099",
            caption: t("DUTYCOMPLETEDPERCENT_099"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_100",
            caption: t("DUTYCOMPLETEDPERCENT_100"),
          },
        ],
      },
      {
        caption: t(""),
        alignment: "center",
        columns: [
          {
            dataField: "DUTYCOMPLETEDPERCENT_100X",
            caption: t("DUTYCOMPLETEDPERCENT_100X"),
          },
        ],
      },
      {
        caption: t("Ngày tồn của xe đủ 100% nghĩa vụ giao xe"),
        alignment: "center",
        columns: [
          {
            dataField: "DUTYCOMPLETEDPERCENT_100_00_15",
            caption: t("DUTYCOMPLETEDPERCENT_100_00_15"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_100_16_30",
            caption: t("DUTYCOMPLETEDPERCENT_100_16_30"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_100_31_45",
            caption: t("DUTYCOMPLETEDPERCENT_100_31_45"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_100_46_60",
            caption: t("DUTYCOMPLETEDPERCENT_100_46_60"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_100_61_ZZ",
            caption: t("DUTYCOMPLETEDPERCENT_100_61_ZZ"),
          },
        ],
      },
      {
        caption: t("Ngày tồn của xe chưa hoàn thành đủ 100% nghĩa vụ giao xe"),
        alignment: "center",
        columns: [
          {
            dataField: "DUTYCOMPLETEDPERCENT_099_00_15",
            caption: t("DUTYCOMPLETEDPERCENT_099_00_15"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_099_16_30",
            caption: t("DUTYCOMPLETEDPERCENT_099_16_30"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_099_31_45",
            caption: t("DUTYCOMPLETEDPERCENT_099_31_45"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_099_46_60",
            caption: t("DUTYCOMPLETEDPERCENT_099_46_60"),
          },
          {
            dataField: "DUTYCOMPLETEDPERCENT_099_61_ZZ",
            caption: t("DUTYCOMPLETEDPERCENT_099_61_ZZ"),
          },
        ],
      },
    ];
  }, [isLoading]);

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
                storeKey={"Rpt_StatisticHTCBackOrderSpecCode01-search"}
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
              <DataGrid
                id={"gridContainer"}
                dataSource={
                  data?.Data?.Lst_RptStatistic_HTCBackOrder_SpecCode_01 ?? []
                }
                columns={columns}
                showBorders={true}
                showRowLines={true}
                showColumnLines={true}
                columnAutoWidth={true}
                allowColumnResizing={false}
                allowColumnReordering={false}
                className={"mx-auto my-5"}
                width={"100%"}
                columnResizingMode="widget"
              >
                <HeaderFilter allowSearch={true} visible={true} />
                <Scrolling showScrollbar={"always"} />
                <Sorting mode={"none"} />
              </DataGrid>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
