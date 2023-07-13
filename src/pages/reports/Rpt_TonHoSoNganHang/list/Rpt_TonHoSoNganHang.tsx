import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_TonHoSoNganHangParam } from "@/packages/api/clientgate/Rpt_TonHoSoNganHangApi";
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
import { DataGrid, LoadPanel, PivotGrid, ScrollView } from "devextreme-react";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
interface IReportParam {
  TDate_To: Date;
  FlagDataWH: 1 | 0;
  MortageBankCode: string;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_TonHoSoNganHang = () => {
  const { t } = useI18n("Rpt_TonHoSoNganHang");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {} as IReportParam
  );

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_TonHoSoNganHang",
      "Rpt_TonHoSoNganHang_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_TonHoSoNganHang_SearchHQ({
          TDate_To: searchCondition?.TDate_To
            ? format(searchCondition.TDate_To, "yyyy-MM-dd")
            : "",
          MortageBankCode: searchCondition?.MortageBankCode ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_TonHoSoNganHangParam);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: listBank } = useQuery(["dealer"], () =>
    api.Mst_Bank_GetAllActive()
  );

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
      caption: t("TDate_To"),
      dataField: "TDate_To",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        ...dateBoxOptions,
      },
    },
    {
      dataField: "MortageBankCode",
      caption: t("MortageBankCode"),
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        displayExpr: "BankCode",
        valueExpr: "BankCode",
        searchEnabled: true,
        validationMessageMode: "always",
        items: listBank?.DataList ?? [],
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

  const handleSearch = useCallback(async (data: IReportParam) => {
    setSearchCondition(searchCondition);
    setGettingData(true);
    reloading();
    // await refetch()
    setGettingData(false);
  }, []);

  useEffect(() => {
    if (data) {
      data?.Data?.Lst_Rpt_TonHoSoNganHang.map(
        (item: any, index: any) => (item.Id = index + 1)
      );
    }
  }, [data]);

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        dataField: "Id",
        caption: t("STT"),
        visible: true,
      },
      {
        caption: t("MortageBankCode"),
        dataField: "MortageBankCode",
        alignments: "center",
        visible: true,
      },

      {
        caption: t("Tổng hợp"),
        alignments: "center",
        visible: true,
        columns: [
          {
            dataField: "SLTuoiHoSo",
            caption: t("SLTuoiHoSo"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            dataField: "GTTuoiHoSo",
            caption: t("GTTuoiHoSo"),
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },

      {
        caption: t("Tuổi hồ sơ"),
        alignment: "center",
        columns: [
          {
            caption: t("0 - 90 ngày"),
            alignment: "center",
            columns: [
              {
                dataField: "SLTuoiHoSo_0_90",
                caption: t("SLTuoiHoSo_0_90"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
              {
                dataField: "GTTuoiHoSo_0_90",
                caption: t("GTTuoiHoSo_0_90"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
            ],
          },
          {
            caption: t("91 - 180 ngày"),
            alignment: "center",
            columns: [
              {
                dataField: "SLTuoiHoSo_91_180",
                caption: t("SLTuoiHoSo_91_180"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
              {
                dataField: "GTTuoiHoSo_91_180",
                caption: t("GTTuoiHoSo_91_180"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
            ],
          },
          {
            caption: t("181 - 270 ngày"),
            alignment: "center",
            columns: [
              {
                dataField: "SLTuoiHoSo_181_270",
                caption: t("SLTuoiHoSo_181_270"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
              {
                dataField: "GTTuoiHoSo_181_270",
                caption: t("GTTuoiHoSo_181_270"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
            ],
          },
          {
            caption: t("271 - 360 ngày"),
            alignment: "center",
            columns: [
              {
                dataField: "SLTuoiHoSo_271_360",
                caption: t("SLTuoiHoSo_271_360"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
              {
                dataField: "GTTuoiHoSo_271_360",
                caption: t("GTTuoiHoSo_271_360"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
            ],
          },
          {
            caption: t(" >360 ngày"),
            alignment: "center",
            columns: [
              {
                dataField: "SLTuoiHoSo_360",
                caption: t("SLTuoiHoSo_360"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
              {
                dataField: "GTTuoiHoSo_360",
                caption: t("GTTuoiHoSo_360"),
                customizeText: (e: any) => {
                  return e.value.toLocaleString();
                },
              },
            ],
          },
        ],
      },
    ],
    [isLoading]
  );
  useEffect(() => {
    searchCondition.TDate_To = new Date();
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
                storeKey={"Rpt_TonHoSoNganHang-search"}
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
              <ScrollView height={windowSize.height - 120}>
                <DataGrid
                  id={"gridContainer"}
                  dataSource={data?.Data?.Lst_Rpt_TonHoSoNganHang ?? []}
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
              </ScrollView>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
