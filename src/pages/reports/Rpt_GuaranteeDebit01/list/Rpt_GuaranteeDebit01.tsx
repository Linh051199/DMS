import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_GuaranteeDebit01Param } from "@/packages/api/clientgate/Rpt_GuaranteeDebit01Api";
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
import { DataGrid, LoadPanel, PivotGrid } from "devextreme-react";
import { HeaderFilter, Scrolling, Sorting } from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  GrtNo: string;
  DateOpenFrom: Date;
  DateOpenTo: Date;
  StartDateTo: Date;
  PaymentDateEndTo: Date;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_GuaranteeDebit01 = () => {
  const { t } = useI18n("Rpt_GuaranteeDebit01");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();

  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    DateOpenTo: new Date(),
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "report",
      "Rpt_GuaranteeDebit01_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_GuaranteeDebit01_SearchHQ({
          DateOpenFrom: searchCondition.DateOpenFrom
            ? format(searchCondition.DateOpenFrom, "yyyy-MM-dd")
            : "",
          DateOpenTo: searchCondition.DateOpenTo
            ? format(searchCondition.DateOpenTo, "yyyy-MM-dd")
            : "",
          StartDateTo: searchCondition.StartDateTo
            ? format(searchCondition.StartDateTo, "yyyy-MM-dd")
            : "",
          PaymentDateEndTo: searchCondition.PaymentDateEndTo
            ? format(searchCondition.PaymentDateEndTo, "yyyy-MM-dd")
            : "",
          GrtNo: searchCondition.GrtNo ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_GuaranteeDebit01Param);
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
    const result = await api.Rpt_GuaranteeDebit01_ExportDetailSearchHQ({
      DateOpenFrom: searchCondition.DateOpenFrom
        ? format(searchCondition.DateOpenFrom, "yyyy-MM-dd")
        : "",
      DateOpenTo: searchCondition.DateOpenTo
        ? format(searchCondition.DateOpenTo, "yyyy-MM-dd")
        : "",
      StartDateTo: searchCondition.StartDateTo
        ? format(searchCondition.StartDateTo, "yyyy-MM-dd")
        : "",
      PaymentDateEndTo: searchCondition.PaymentDateEndTo
        ? format(searchCondition.PaymentDateEndTo, "yyyy-MM-dd")
        : "",
      GrtNo: searchCondition.GrtNo ?? "",
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
      caption: t("DateOpenFrom"),
      dataField: "DateOpenFrom",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
	max: new Date(),
      },
      validationRules: [
        RequiredField(t("DateOpenFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.DateOpenTo) {
              return !isAfter(value, searchCondition.DateOpenTo);
            }
            return true;
          },
          message: t("DateOpenFromMustBeBeforeDateOpenTo"),
        },
      ],
    },
    {
      caption: t("DateOpenTo"),
      dataField: "DateOpenTo",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("DateToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.DateOpenFrom);
          },
          message: t("DateOpenToMustBeAfterDateOpenFrom"),
        },
      ],
    },
    {
      dataField: "StartDateTo",
      visible: true,
      caption: t("StartDateTo"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    {
      dataField: "PaymentDateEndTo",
      visible: true,
      caption: t("PaymentDateEndTo"),
      editorType: "dxDateBox",
      editorOptions: dateBoxOptions,
    },
    {
      dataField: "GrtNo",
      caption: t("GrtNo"),
      visible: true,
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

  const columns: ColumnOptions[] = [
    {
      caption: "",
      alignment: "center",

      columns: [
        {
          dataField: "GUARANTEENO",
          caption: t("GUARANTEENO"),
        },
        {
          dataField: "DATEOPEN",
          caption: t("DATEOPEN"),
        },
        {
          dataField: "DATEEXPIRED",
          caption: t("DATEEXPIRED"),
        },
        {
          dataField: "BANKCODE",
          caption: t("BANKCODE"),
        },
        {
          dataField: "BANKGUARANTEENO",
          caption: t("BANKGUARANTEENO"),
        },
        {
          dataField: "DEALERCODE",
          caption: t("DEALERCODE"),
        },
      ],
    },

    {
      caption: "Tổng bảo lãnh",
      alignment: "center",
      columns: [
        {
          dataField: "TT_ALLCOUNT",
          caption: t("TT_ALLCOUNT"),
        },
        {
          dataField: "TT_ALLVALUE",
          caption: t("TT_ALLVALUE"),
        },
      ],
    },
    {
      caption: "Tổng bảo lãnh đã có hiệu lực",
      alignment: "center",
      columns: [
        {
          dataField: "TT_EFFCOUNT",
          caption: t("TT_EFFCOUNT"),
        },
        {
          dataField: "TT_EFFVALUE",
          caption: t("TT_EFFVALUE"),
        },
      ],
    },
    {
      caption: "",
      alignment: "center",
      columns: [
        {
          dataField: "TT_EFFRECEIVED",
          caption: t("TT_EFFRECEIVED"),
        },
        {
          dataField: "TT_EFFREMAIN",
          caption: t("TT_EFFREMAIN"),
        },
        {
          dataField: "DATEEND",
          caption: t("DATEEND"),
        },
        {
          dataField: "TT_DISCOUNTVALUE",
          caption: t("TT_DISCOUNTVALUE"),
        },
        {
          dataField: "DISCOUNTPMTVALUE",
          caption: t("DISCOUNTPMTVALUE"),
        },
        {
          dataField: "DISCOUNTPMTDATE",
          caption: t("DISCOUNTPMTDATE"),
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
                storeKey={"Rpt_GuaranteeDebit01-search"}
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
                dataSource={data?.Data?.Lst_RptGuarantee_Debit_01 ?? []}
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
