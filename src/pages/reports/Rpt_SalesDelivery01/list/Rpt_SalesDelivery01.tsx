import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_GuaranteeDebit01Param } from "@/packages/api/clientgate/Rpt_GuaranteeDebit01Api";
import { Rpt_SalesDelivery01Param } from "@/packages/api/clientgate/Rpt_SalesDelivery01Api";
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
import { format } from "date-fns";
import { DataGrid, LoadPanel, PivotGrid } from "devextreme-react";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";

import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
interface IReportParam {
  TypeRpt?: "Model" | "Dealer";
  Area: string;
  Dealer?: string;
  FlagDataWH?: 1 | 0;
}

export const Rpt_SalesDelivery01 = () => {
  const { t } = useI18n("Rpt_SalesDelivery01");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {} as IReportParam
  );
  const [listSearchDealer, setListSearchDealer] = useState<any>([]);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_SalesDelivery01",
      "Rpt_SalesDelivery01_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_SalesDelivery01_SearchHQ({
          TypeRpt: searchCondition.TypeRpt ?? "",
          Area: searchCondition.Area ?? "",
          Dealer: searchCondition.Dealer ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_SalesDelivery01Param);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: listDealer } = useQuery(["dealer"], () =>
    api.Mst_Dealer_GetAllActive()
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

  useEffect(() => {
    if (listDealer?.DataList) {
      setListSearchDealer([
        { DealerCode: "", DealerName: "Tất Cả" },
        ...listDealer?.DataList,
      ]);
    }
  }, [listDealer?.DataList]);
  const listArea = [
    {
      AreaCode: "",
      AreaName: "Tất cả",
    },
    {
      AreaCode: "MB",
      AreaName: "Miền Bắc",
    },
    {
      AreaCode: "MT",
      AreaName: "Miền Trung",
    },
    {
      AreaCode: "MN",
      AreaName: "Miền Nam",
    },
  ];
  const searchFields: IItemProps[] = [
    {
      dataField: "TypeRpt",
      visible: true,
      caption: t("TypeRpt"),
      validationRules: [RequiredField(t("TypeRptIsRequired"))],
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        validationMessageMode: "always",
        validationGroup: "form",
        onValueChanged: (e: any) => {
          // change report type, have to re-render
          reloading();
        },
        dataSource: [
          {
            value: "Dealer",
            text: t("Dealer"),
          },
          {
            value: "Model",
            text: t("Model"),
          },
        ],
      },
    },
    {
      dataField: "Area",
      caption: t("Area"),
      disabled: searchCondition?.TypeRpt === "Dealer" ? true : false,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listArea ?? [],
        valueExpr: "AreaCode",
        displayExpr: "AreaName",
        searchEnabled: true,
      },
    },
    {
      dataField: "DealerCode",
      caption: t("DealerCode"),
      disabled: searchCondition?.TypeRpt === "Dealer" ? true : false,
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
        searchEnabled: true,
        validationMessageMode: "always",
        items: listSearchDealer || [],
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
    reloading();
  }, []);

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "SPECDESCRIPTION",
        caption: t("SPECDESCRIPTION"),
      },
      {
        dataField: "CCMODELCODE",
        caption: t("CCMODELCODE"),
      },

      {
        caption: t("HTC giao xe"),
        alignment: "center",
        columns: [
          {
            dataField: "Z_CAR_DLV_INMONTH",
            caption: t("Z_CAR_DLV_INMONTH"),
          },
          {
            dataField: "Z_CAR_DLV_INYEAR",
            caption: t("Z_CAR_DLV_INYEAR"),
          },
        ],
      },
      {
        dataField: "Z_CAR_DEALERINSTOCK",
        caption: t("Z_CAR_DEALERINSTOCK"),
      },
      {
        caption: t("Xe chưa giao (B/O)"),
        alignment: "center",
        columns: [
          {
            dataField: "Z_CAR_BO_MAPVIN",
            caption: t("Z_CAR_BO_MAPVIN"),
          },
          {
            dataField: "Z_CAR_BO_FREEN2",
            caption: t("Z_CAR_BO_FREEN2"),
          },
          {
            dataField: "Z_CAR_BO_FREEN1",
            caption: t("Z_CAR_BO_FREEN1"),
          },
          {
            dataField: "Z_CAR_BO_FREEN",
            caption: t("Z_CAR_BO_FREEN"),
          },
          {
            dataField: "Z_CAR_BO",
            caption: t("Z_CAR_BO"),
          },
        ],
      },
      {
        dataField: "Z_CAR_DLSINSTOCKANDBO",
        caption: t("Z_CAR_DLSINSTOCKANDBO"),
      },
      {
        caption: t("Tiến độ giao xe"),
        alignment: "center",
        columns: [
          {
            dataField: "FIELD_DP_DELIVERED_AND_MAPPED",
            caption: t("FIELD_DP_DELIVERED_AND_MAPPED"),
          },
          {
            dataField: "FIELD_DP_YTD_AND_BO",
            caption: t("FIELD_DP_YTD_AND_BO"),
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
                storeKey={"Rpt_SalesDelivery01-search"}
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
                dataSource={data?.Data?.Lst_RptSalesDelivery01 ?? []}
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
                {/* <Summary>
                  <TotalItem column={"Total"} summaryType={"sum"}></TotalItem>
                </Summary> */}
              </DataGrid>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
