import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  EReportType,
  Rpt_CarDeliveryOutButNotDutyCompleteParam,
} from "@/packages/api/clientgate/Rpt_CarDeliveryOutButNotDutyCompleteApi";
import { requiredType } from "@/packages/common/Validation_Rules";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format, isAfter, isBefore } from "date-fns";
import { DataGrid, LoadPanel, PivotGrid, ScrollView } from "devextreme-react";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";

import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
interface IReportParam {
  ReportType: EReportType;
  DateFrom: Date;
  DateTo: Date;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_CarDeliveryOutButNotDutyComplete = () => {
  const { t } = useI18n("Rpt_CarDeliveryOutButNotDutyComplete");
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
      "Rpt_CarDeliveryOutButNotDutyComplete",
      "Rpt_CarDeliveryOutButNotDutyComplete_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_CarDeliveryOutButNotDutyComplete_SearchHQ({
          ReportType: searchCondition.ReportType ?? "",
          DateFrom: searchCondition?.DateFrom
            ? format(searchCondition.DateFrom, "yyyy-MM-dd")
            : "",
          DateTo: searchCondition?.DateTo
            ? format(searchCondition.DateTo, "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_CarDeliveryOutButNotDutyCompleteParam);
        return (
          resp?.Data?.Lst_RptCarDeliveryOut_ButNotDutyComplete_ByDealer ??
          resp?.Data?.Lst_RptCarDeliveryOut_ButNotDutyComplete_BySpec
        );
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
      await api.Rpt_CarDeliveryOutButNotDutyComplete_ExportDetailSearchHQ({
        ReportType: searchCondition.ReportType ?? "",
        DateFrom: searchCondition?.DateFrom
          ? format(searchCondition.DateFrom, "yyyy-MM-dd")
          : "",
        DateTo: searchCondition?.DateTo
          ? format(searchCondition.DateTo, "yyyy-MM-dd")
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
      caption: t("ReportType"),
      dataField: t("ReportType"),
      editorType: "dxSelectBox",
      validationRules: [requiredType],
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "Spec",
            text: "Spec",
          },
          {
            value: "Dealer",
            text: "Dealer",
          },
        ],
      },
    },
    {
      caption: t("DateFrom"),
      dataField: "DateFrom",
      editorType: "dxDateBox",
      editorOptions: {
        ...dateBoxOptions,
        max: new Date(),
      },
      validationRules: [
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: (e: any) => {
            // console.log("==event", e);
            if (searchCondition.DateTo) {
              return !isAfter(e.value, searchCondition.DateTo);
            }
            return true;
          },
          message: t("DateFromMustBeBeforeDateTo"),
        },
      ],
    },

    {
      caption: t("DateTo"),
      dataField: "DateTo",
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
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

  useEffect(() => {
    if (data) {
      data.map((item: any, index: number) => (item.Id = index + 1));
    }
  }, [data]);

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: t("STT"),
        dataField: "Id",
      },
      {
        caption: t(""),
        alignment: "center",
        columns: [
          {
            dataField:
              searchCondition.ReportType === "Dealer"
                ? "DEALERCODE"
                : "SPECCODE",
            caption:
              searchCondition.ReportType === "Dealer"
                ? t("DEALERCODE")
                : t("SPECCODE"),
          },
          {
            dataField:
              searchCondition.ReportType === "Dealer"
                ? "DEALERNAME"
                : "SPECDESCRIPTION",
            caption:
              searchCondition.ReportType === "Dealer"
                ? t("DEALERNAME")
                : t("SPECDESCRIPTION"),
          },
        ],
      },
      {
        caption: t(
          "Ngày tồn của xe đã giao chưa hoàn thành nghĩa vụ giao xe tính từ ngày xuất kho"
        ),
        alignment: "center",
        columns: [
          {
            dataField: "SUM1_15",
            caption: t("SUM1_15"),
          },
          {
            dataField: "SUM16_30",
            caption: t("SUM16_30"),
          },

          {
            dataField: "SUM31_60",
            caption: t("SUM31_60"),
          },
          {
            dataField: "SUM61_180",
            caption: t("SUM61_180"),
          },

          {
            dataField: "SUM181_360",
            caption: t("SUM181_360"),
          },
          {
            dataField: "SUM361",
            caption: t("> SUM360"),
          },
          {
            caption: t("TOTALCAR"),
            dataField: "TOTALCAR",
          },
        ],
      },
    ],
    [isLoading]
  );

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
                storeKey={"Rpt_CarDeliveryOutButNotDutyComplete-search"}
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
                  dataSource={data ?? []}
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
              </ScrollView>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
