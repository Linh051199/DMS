import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_WOOrderAndSchedule01Param } from "@/packages/api/clientgate/Rpt_WOOrderAndSchedule01Api";
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
  SOType: string;
  IsSpecCode: 1 | 0;
  IsColorCode: 1 | 0;
  IsColorExtName: 1 | 0;
  IsColorIntName: 1 | 0;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_WOOrderAndSchedule01 = () => {
  const { t } = useI18n("Rpt_WOOrderAndSchedule01");
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
      "Rpt_WOOrderAndSchedule01",
      "Rpt_WOOrderAndSchedule01_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_WOOrderAndSchedule01_SearchHQ({
          SOType: searchCondition.SOType ?? "",
          IsSpecCode: searchCondition.SOType ? 1 : 0,
          IsColorCode: searchCondition.IsColorCode ? 1 : 0,
          IsColorExtName: searchCondition.IsColorExtName ? 1 : 0,
          IsColorIntName: searchCondition.IsColorIntName ? 1 : 0,
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_WOOrderAndSchedule01Param);
        return resp?.Data?.Lst_RptWO_OrderAndSchedule_01;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.Rpt_WOOrderAndSchedule01_ExportSearchHQ(
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
    const result = await api.Rpt_WOOrderAndSchedule01_ExportDetailSearchHQ({
      SOType: searchCondition.SOType ?? "",
      IsSpecCode: searchCondition.SOType ? 1 : 0,
      IsColorCode: searchCondition.IsColorCode ? 1 : 0,
      IsColorExtName: searchCondition.IsColorExtName ? 1 : 0,
      IsColorIntName: searchCondition.IsColorIntName ? 1 : 0,
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
      dataField: "SOType",
      visible: true,
      caption: t("SOType"),
      // validationRules: [RequiredField(t("SOTypeIsRequired"))],
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        validationMessageMode: "always",
        validationGroup: "form",
        dataSource: [
          {
            value: "",
            text: t("All"),
          },
          {
            value: "P",
            text: t("Plan"),
          },
          {
            value: "U",
            text: t("Unplan"),
          },
        ],
      },
    },
    {
      dataField: "IsSpecCode",
      visible: true,
      caption: t("IsSpecCode"),
      editorType: "dxCheckBox",
      label: {
        location: "left",
      },
    },

    {
      dataField: "IsColorCode",
      visible: true,
      caption: t("IsColorCode"),
      editorType: "dxCheckBox",
      label: {
        location: "left",
      },
    },

    {
      dataField: "IsColorExtName",
      visible: true,
      caption: t("IsColorExtName"),
      editorType: "dxCheckBox",
      label: {
        location: "left",
      },
    },

    {
      dataField: "IsColorIntName",
      visible: true,
      caption: t("IsColorIntName"),
      editorType: "dxCheckBox",
      label: {
        location: "left",
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
      data.map((item: any, index: number) => {
        item.Id = index + 1;
      });
    }
  }, [data]);

  // DataGrid
  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: t("STT"),
        dataField: "Id",
        alignment: "center",
      },

      {
        caption: t(""),
        alignment: "center",
        columns: [
          {
            dataField: "MCS_SPECDESCRIPTION",
            caption: t("MCS_SPECDESCRIPTION"),
          },
          {
            dataField: "MCS_SPECCODE",
            caption: t("MCS_SPECCODE"),
            visible: searchCondition?.IsSpecCode ? true : false,
          },
          {
            dataField: "MCC_COLORCODE",
            caption: t("MCC_COLORCODE"),
            visible: searchCondition?.IsColorCode ? true : false,
          },
          {
            dataField: "MCC_COLOREXTNAMEVN",
            caption: t("MCC_COLOREXTNAMEVN"),
            visible: searchCondition?.IsColorExtName ? true : false,
          },
          {
            dataField: "MCC_COLORINTNAMEVN",
            caption: t("MCC_COLORINTNAMEVN"),
            visible: searchCondition?.IsColorIntName ? true : false,
          },
        ],
      },
      {
        caption: t("Đơn hàng"),
        alignment: "center",
        visible: true,
        columns: [
          {
            caption: t("Đơn hàng xác nhận"),
            alignment: "center",
            columns: [
              {
                caption: t("PMPD_DUTYCOMPLETED_C0"),
                dataField: "PMPD_DUTYCOMPLETED_C0",
              },
              {
                caption: t("PMPD_DUTYCOMPLETED_C1"),
                dataField: "PMPD_DUTYCOMPLETED_C1",
              },
              {
                caption: t("PMPD_DUTYCOMPLETED_C100"),
                dataField: "PMPD_DUTYCOMPLETED_C100",
              },
            ],
          },
          {
            caption: t("Đơn hàng chưa xác nhận"),
            alignment: "center",
            columns: [
              {
                caption: t("OSOD_REQUESTEDQTY"),
                dataField: "OSOD_REQUESTEDQTY",
              },
            ],
          },
        ],
      },
      {
        caption: t("TOTAL1"),
        dataField: "TOTAL1",
      },
      {
        caption: t("Hàng hoá"),
        alignment: "center",
        visible: true,
        columns: [
          {
            caption: t("CVINSTOCK_QTY"),
            dataField: "CVINSTOCK_QTY",
          },
          {
            caption: t("CVATPORT_QTY"),
            dataField: "CVATPORT_QTY",
          },
          {
            caption: t("CVONSHIP_QTY"),
            dataField: "CVONSHIP_QTY",
          },
          {
            caption: t("WOSCHD_QTYFRAMING"),
            dataField: "WOSCHD_QTYFRAMING",
          },
          {
            caption: t("WOSCHD_QTYPLAN"),
            dataField: "WOSCHD_QTYPLAN",
          },
          {
            caption: t("WOSCHD_QTYREMAINORDER"),
            dataField: "WOSCHD_QTYREMAINORDER",
          },
        ],
      },
      {
        caption: t("TOTAL2"),
        dataField: "TOTAL2",
      },
      {
        caption: t("CHENHLECH"),
        dataField: "CHENHLECH",
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
            <div className="w-[300px]">
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"Rpt_WOOrderAndSchedule01-search"}
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
