import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_ReportCarDocReqParam } from "@/packages/api/clientgate/Rpt_ReportCarDocReqApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format, isAfter, isBefore, set } from "date-fns";
import { DataGrid, LoadPanel, PivotGrid, ScrollView } from "devextreme-react";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";

import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
interface IReportParam {
  DateFrom: Date;
  DateTo: Date;
  Status: "A" | "P" | "";
  VinNo: string;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_ReportCarDocReq = () => {
  const { t } = useI18n("Rpt_ReportCarDocReq");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    DateTo: new Date(),
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_ReportCarDocReq",
      "Rpt_ReportCarDocReq_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_ReportCarDocReq_SearchHQ({
          DateFrom: searchCondition?.DateFrom
            ? format(searchCondition.DateFrom, "yyyy-MM-dd")
            : "",
          DateTo: searchCondition?.DateTo
            ? format(searchCondition.DateTo, "yyyy-MM-dd")
            : "",
          Status: searchCondition?.Status ?? "",
          VinNo: searchCondition?.VinNo ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_ReportCarDocReqParam);
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
      caption: t("DateFrom"),
      dataField: "DateFrom",
      editorType: "dxDateBox",
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
        max: new Date(),
      },
      validationRules: [
        RequiredField(t("DateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: (e: any) => {
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
        RequiredField(t("DateFromIsRequired")),

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
      dataField: "Status",
      caption: t("Status"),
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        valueExpr: "value",
        displayExpr: "text",
        items: [
          {
            value: "",
            text: t("Tất cả"),
          },
          {
            value: "A",
            text: t("Đã giao"),
          },
          {
            value: "P",
            text: t("Chưa giao"),
          },
        ],
      },
    },
    {
      dataField: "VinNo",
      caption: t("VinNo"),
      editorType: "dxTextBox",
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
      data?.Data?.Lst_Rpt_ReportCarDocReq.map(
        (item: any, index: number) => (item.Id = index + 1)
      );
    }
  }, [data]);

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: t("STT"),
        dataField: "Id",
      },

      {
        caption: t("MODELCODE"),
        dataField: "MODELCODE",
      },

      {
        caption: t("MCSSPECDESCRIPTION"),
        dataField: "MCSSPECDESCRIPTION",
      },

      {
        caption: t("VIN"),
        dataField: "VIN",
      },

      {
        caption: t("ENGINENO"),
        dataField: "ENGINENO",
      },

      {
        caption: t("STATUSMORTAGEEND"),
        dataField: "STATUSMORTAGEEND",
      },

      {
        caption: t("DRFULLDOCDATE"),
        dataField: "DRFULLDOCDATE",
      },
      {
        caption: t("DREXPECTEDDATE"),
        dataField: "DREXPECTEDDATE",
      },

      {
        caption: t("CDRDDRDTLSTATUS"),
        dataField: "CDRDDRDTLSTATUS",
      },

      {
        caption: t("CDRLCREATEDDATE"),
        dataField: "CDRLCREATEDDATE",
      },

      {
        caption: t("PGDGUARANTEENO"),
        dataField: "PGDGUARANTEENO",
      },
      {
        caption: t("MBBANKNAME"),
        dataField: "MBBANKNAME",
      },

      {
        caption: t("PGDDATESTART"),
        dataField: "PGDDATESTART",
      },

      {
        caption: t("MORTAGEENDDATE"),
        dataField: "MORTAGEENDDATE",
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
                storeKey={"Rpt_ReportCarDocReq-search"}
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
              <ScrollView height={windowSize.height - 120}>
                <DataGrid
                  id={"gridContainer"}
                  dataSource={data?.Data?.Lst_Rpt_ReportCarDocReq ?? []}
                  columns={columns}
                  showBorders={true}
                  showRowLines={true}
                  showColumnLines={true}
                  columnAutoWidth={true}
                  allowColumnResizing={true}
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
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
