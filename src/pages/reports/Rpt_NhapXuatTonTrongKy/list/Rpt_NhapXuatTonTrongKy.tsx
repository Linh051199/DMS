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
import { format, isAfter, isBefore, set } from "date-fns";
import { DataGrid, LoadPanel, PivotGrid, ScrollView } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { useRpt_DlrContractInstockParam } from "@/packages/api/clientgate/Rpt_DlrContractInstockApi";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { Rpt_NhapXuatTonTrongKyParam } from "@/packages/api/clientgate/Rpt_NhapXuatTonTrongKyApi";
import { ColumnOptions } from "@/types";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  TDate_From: Date;
  TDate_To: Date;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

const now = new Date();

export const Rpt_NhapXuatTonTrongKy = () => {
  const { t } = useI18n("Rpt_NhapXuatTonTrongKy");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    TDate_To: now,
    FlagDataWH: 0,
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "report",
      "Rpt_DlrContractInstock_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_NhapXuatTonTrongKy_SearchHQ({
          TDate_From: searchCondition.TDate_From ?? "",
          TDate_To: searchCondition.TDate_To ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_NhapXuatTonTrongKyParam);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.Rpt_NhapXuatTonTrongKy_ExportSearchHQ(
      searchCondition
    );
    if (response.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = response.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
    }
  }, [searchCondition]);

  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.Rpt_NhapXuatTonTrongKy_ExportDetailSearchHQ({
      TDate_From: searchCondition.TDate_From ?? "",
      TDate_To: searchCondition.TDate_To ?? "",
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
      caption: t("TDate_From"),
      dataField: "TDate_From",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: dateBoxOptions,
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
          message: t("DateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: t("TDate_To"),
      dataField: "TDate_To",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: dateBoxOptions,
      validationRules: [
        RequiredField(t("TDate_ToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.TDate_To);
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

  const handleSearch = useCallback(async () => {
    setSearchCondition(searchCondition);
    setGettingData(true);
    reloading();
    // await refetch()
    setGettingData(false);
  }, []);

  useEffect(() => {
    if (data) {
      data.Data?.Lst_Rpt_NhapXuatTonTrongKy.map((item: any, index: number) => {
        item.ID = index + 1;
      });
    }
  }, [data]);

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        caption: t("STT"),
        dataField: "ID",
        visible: true,
        alignment: "center",
      },
      {
        caption: t("MortageBankCode"),
        dataField: "MortageBankCode",
        visible: true,
      },
      {
        caption: t("Đầu kỳ"),
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("SoLuongDauKy"),
            dataField: "SoLuongDauKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            caption: t("GiaTriDauKy"),
            dataField: "GiaTriDauKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Tăng"),
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("SoLuongTang"),
            dataField: "SoLuongTang",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            caption: t("GiaTriTang"),
            dataField: "GiaTriTang",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Giảm"),
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("SoLuongGiam"),
            dataField: "SoLuongGiam",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            caption: t("GiaTriGiam"),
            dataField: "GiaTriGiam",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
        ],
      },
      {
        caption: t("Cuối kỳ"),
        visible: true,
        alignment: "center",
        columns: [
          {
            caption: t("SoLuongCuoiKy"),
            dataField: "SoLuongCuoiKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
          },
          {
            caption: t("GiaTriCuoiKy"),
            dataField: "GiaTriCuoiKy",
            customizeText: (e: any) => {
              return e.value.toLocaleString();
            },
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
            <div className="w-[300px]">
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"Rpt_NhapXuatTonTrongKy-search"}
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
                  dataSource={data?.Data?.Lst_Rpt_NhapXuatTonTrongKy ?? []}
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
