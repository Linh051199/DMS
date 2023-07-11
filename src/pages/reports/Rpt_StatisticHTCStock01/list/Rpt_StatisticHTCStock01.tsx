import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
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
import { DataGrid, LoadPanel } from "devextreme-react";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";

import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
interface IReportParam {
  FlagDataWH: 1 | 0;
}

export const Rpt_StatisticHTCStock01 = () => {
  const { t } = useI18n("Rpt_StatisticHTCStock01");
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
      "Rpt_StatisticHTCStock01",
      "Rpt_StatisticHTCStock01_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_StatisticHTCStock01_SearchHQ({
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as RptSalesCtmCare01Param);
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
    const result = await api.Rpt_StatisticHTCStock01_ExportDetailSearchHQ({
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

  useEffect(() => {
    if (data) {
      data?.Data?.Lst_RptStatistic_HTCStock01.map(
        (item: any, index: any) => (item.Id = index + 1)
      );
    }
  }, [data]);

  const columns: ColumnOptions[] = [
    {
      dataField: "Id",
      caption: t("STT"),
      visible: true,
    },
    {
      caption: t("Số ngày tồn kho"),
      alignment: "center",
      columns: [
        {
          caption: t("CVMODELCODE"),
          dataField: "CVMODELCODE",
        },

        {
          caption: t("CVMODELNAME"),
          dataField: "CVMODELNAME",
        },

        {
          caption: t("CVSPECDESCRIPTION"),
          dataField: "CVSPECDESCRIPTION",
        },

        {
          caption: t("AC_SPECDESCRIPTION"),
          dataField: "AC_SPECDESCRIPTION",
        },
      ],
    },

    {
      caption: t(""),
      alignment: "center",
      columns: [
        {
          caption: t("TOTAL_ALL"),
          dataField: "TOTAL_ALL",
        },

        {
          caption: t("TOTAL_LXXNOTXKHO"),
          dataField: "TOTAL_LXXNOTXKHO",
        },

        {
          caption: t("TOTAL_MAPVINNOTLXX"),
          dataField: "TOTAL_MAPVINNOTLXX",
        },

        {
          caption: t("TOTAL_NOTMAPVIN"),
          dataField: "TOTAL_NOTMAPVIN",
        },
      ],
    },

    {
      caption: t("0 - 14"),
      alignment: "center",
      columns: [
        {
          caption: t("TOTAL_LXXNOTXKHO_0_14"),
          dataField: "TOTAL_LXXNOTXKHO_0_14",
        },

        {
          caption: t("TOTAL_MAPVINNOTLXX_0_14"),
          dataField: "TOTAL_MAPVINNOTLXX_0_14",
        },

        {
          caption: t("TOTAL_NOTMAPVIN_0_14"),
          dataField: "TOTAL_NOTMAPVIN_0_14",
        },
      ],
    },

    {
      caption: t("15 - 30"),
      alignment: "center",
      columns: [
        {
          caption: t("TOTAL_MAPVINNOTLXX_15_30"),
          dataField: "TOTAL_MAPVINNOTLXX_15_30",
        },

        {
          caption: t("TOTAL_LXXNOTXKHO_15_30"),
          dataField: "TOTAL_LXXNOTXKHO_15_30",
        },

        {
          caption: t("TOTAL_NOTMAPVIN_15_30"),
          dataField: "TOTAL_NOTMAPVIN_15_30",
        },
      ],
    },

    {
      caption: t("31 - 90"),
      alignment: "center",
      columns: [
        {
          caption: t("TOTAL_MAPVINNOTLXX_31_90"),
          dataField: "TOTAL_MAPVINNOTLXX_31_90",
        },

        {
          caption: t("TOTAL_LXXNOTXKHO_31_90"),
          dataField: "TOTAL_LXXNOTXKHO_31_90",
        },

        {
          caption: t("TOTAL_NOTMAPVIN_31_90"),
          dataField: "TOTAL_NOTMAPVIN_31_90",
        },
      ],
    },

    {
      caption: t("91 - 180"),
      alignment: "center",
      columns: [
        {
          caption: t("TOTAL_MAPVINNOTLXX_91_180"),
          dataField: "TOTAL_MAPVINNOTLXX_91_180",
        },

        {
          caption: t("TOTAL_LXXNOTXKHO_91_180"),
          dataField: "TOTAL_LXXNOTXKHO_91_180",
        },

        {
          caption: t("TOTAL_NOTMAPVIN_91_180"),
          dataField: "TOTAL_NOTMAPVIN_91_180",
        },
      ],
    },

    {
      caption: t("181 - 360"),
      alignment: "center",
      columns: [
        {
          caption: t("TOTAL_MAPVINNOTLXX_181_360"),
          dataField: "TOTAL_MAPVINNOTLXX_181_360",
        },

        {
          caption: t("TOTAL_LXXNOTXKHO_181_360"),
          dataField: "TOTAL_LXXNOTXKHO_181_360",
        },

        {
          caption: t("TOTAL_NOTMAPVIN_181_360"),
          dataField: "TOTAL_NOTMAPVIN_181_360",
        },
      ],
    },

    {
      caption: t(">360"),
      alignment: "center",
      columns: [
        {
          caption: t("TOTAL_MAPVINNOTLXX_361_365000"),
          dataField: "TOTAL_MAPVINNOTLXX_361_365000",
        },

        {
          caption: t("TOTAL_LXXNOTXKHO_361_365000"),
          dataField: "TOTAL_LXXNOTXKHO_361_365000",
        },

        {
          caption: t("TOTAL_NOTMAPVIN_361_365000"),
          dataField: "TOTAL_NOTMAPVIN_361_365000",
        },
      ],
    },
  ];

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
                storeKey={"Rpt_StatisticHTCStock01-search"}
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
              <DataGrid
                id={"gridContainer"}
                dataSource={data?.Data?.Lst_RptStatistic_HTCStock01 ?? []}
                showBorders={true}
                showRowLines={true}
                showColumnLines={true}
                columns={columns}
                columnAutoWidth={true}
                allowColumnResizing={false}
                allowColumnReordering={false}
                className={"mx-auto my-5"}
                width={"100%"}
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
