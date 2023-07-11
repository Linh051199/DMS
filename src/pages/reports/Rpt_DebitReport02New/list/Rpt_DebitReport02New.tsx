import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_DebitReport02NewParam } from "@/packages/api/clientgate/Rpt_DebitReport02NewApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format, isAfter, isBefore } from "date-fns";
import { DataGrid, LoadPanel } from "devextreme-react";
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
  PaymentDateFrom: Date;
  PaymentDateTo: Date;
  Dealer: string;
  DealerType: string;
  FlagIsHTC: string;
  FlagDataWH: 1 | 0;
}

export const Rpt_DebitReport02New = () => {
  const { t } = useI18n("Rpt_DebitReport02New");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();

  const [listSearchDealer, setListSearchDealer] = useState<any>([]);
  const [isGetingData, setGettingData] = useState(false);

  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {} as IReportParam
  );
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_DebitReport02New",
      "Rpt_DebitReport02New_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_DebitReport02New_SearchHQ({
          DateFrom: searchCondition.DateFrom
            ? format(searchCondition.DateFrom, "yyyy-MM-dd")
            : "",
          DateTo: searchCondition.DateTo
            ? format(searchCondition.DateTo, "yyyy-MM-dd")
            : "",
          PaymentDateFrom: searchCondition.PaymentDateFrom
            ? format(searchCondition.PaymentDateFrom, "yyyy-MM-dd")
            : "",
          PaymentDateTo: searchCondition.PaymentDateTo
            ? format(searchCondition.PaymentDateTo, "yyyy-MM-dd")
            : "",
          Dealer: searchCondition.Dealer ?? "",
          DealerType: searchCondition.DealerType ?? "",
          FlagIsHTC: searchCondition.FlagIsHTC ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_DebitReport02NewParam);
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

  useEffect(() => {
    if (listDealer?.DataList) {
      setListSearchDealer([
        { DealerCode: "", DealerName: "Tất Cả" },
        ...listDealer?.DataList,
      ]);
    }
  }, [listDealer?.DataList]);

  const listDealerType = [
    {
      DealerTypeCode: "",
      DealerTypeName: "Tất cả",
    },
    {
      DealerTypeCode: "0",
      DealerTypeName: "Đại lý thường",
    },
    {
      DealerTypeCode: "1",
      DealerTypeName: "Đại lý TCG",
    },
  ];

  const listFlagIsHTC = [
    {
      FlagIsHTCCode: "HTC",
      FlagIsHTCName: "Công ty Cổ phần Hyundai Thành Công Việt Nam",
    },
    {
      FlagIsHTCCode: "HTV",
      FlagIsHTCName:
        "Công Ty Cổ phần Liên Doanh Ô Tô Hyundai Thành Công Việt Nam",
    },
  ];

  const handleExportExcel = useCallback(() => {}, []);
  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.Rpt_DebitReport02New_ExportDetailSearchHQ({
      DateFrom: searchCondition.DateFrom
        ? format(searchCondition.DateFrom, "yyyy-MM-dd")
        : "",
      DateTo: searchCondition.DateTo
        ? format(searchCondition.DateTo, "yyyy-MM-dd")
        : "",
      PaymentDateFrom: searchCondition.PaymentDateFrom
        ? format(searchCondition.PaymentDateFrom, "yyyy-MM-dd")
        : "",
      PaymentDateTo: searchCondition.PaymentDateTo
        ? format(searchCondition.PaymentDateTo, "yyyy-MM-dd")
        : "",
      Dealer: searchCondition.Dealer ?? "",
      DealerType: searchCondition.DealerType ?? "",
      FlagIsHTC: searchCondition.FlagIsHTC ?? "",
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

  const searchFields: IItemProps[] = [
    {
      caption: t("DateFrom"),
      dataField: "DateFrom",
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
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.DateTo) {
              return !isAfter(value, searchCondition.DateTo);
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
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
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
      caption: t("PaymentDateFrom"),
      dataField: "PaymentDateFrom",
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
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.PaymentDateTo) {
              return !isAfter(value, searchCondition.PaymentDateTo);
            }
            return true;
          },
          message: t("DateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: t("PaymentDateTo"),
      dataField: "PaymentDateTo",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.PaymentDateFrom);
          },
          message: t("DateToMustBeAfterDateFrom"),
        },
      ],
    },

    {
      dataField: "Dealer",
      caption: t("Dealer"),
      visible: true,
      editorType: "dxSelectBox",
      // validationRules: [requiredType],
      editorOptions: {
        displayExpr: "DealerCode",
        valueExpr: "DealerCode",
        searchEnabled: true,
        validationMessageMode: "always",
        items: listSearchDealer ?? [],
      },
    },
    {
      dataField: "DealerType",
      caption: t("DealerType"),
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listDealerType ?? [],
        valueExpr: "DealerTypeCode",
        displayExpr: "DealerTypeName",
        searchEnabled: true,
      },
    },
    {
      dataField: "FlagIsHTC",
      caption: t("FlagIsHTC"),
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listFlagIsHTC ?? [],
        valueExpr: "FlagIsHTCCode",
        displayExpr: "FlagIsHTCName",
        searchEnabled: true,
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

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: t(""),
        alignments: "center",
        columns: [
          {
            dataField: "DEALERCODE",
            caption: t("DEALERCODE"),
          },
          {
            dataField: "DEALERNAME",
            caption: t("DEALERNAME"),
          },
        ],
      },
      {
        caption: t("Xe xuất hoá đơn"),
        alignments: "center",
        columns: [
          {
            caption: t(""),
            alignments: "center",
            columns: [
              {
                dataField: "RIT_QUANTITY",
                caption: t("RIT_QUANTITY"),
              },
              {
                dataField: "RIT_TOTAL",
                caption: t("RIT_TOTAL"),
              },
              {
                dataField: "RIT_TOTALRECEIVED",
                caption: t("RIT_TOTALRECEIVED"),
              },
            ],
          },

          {
            caption: t("Còn phải thu"),
            alignment: "center",
            columns: [
              {
                dataField: "RIT_REMAIN_GUARANTEE",
                caption: "RIT_REMAIN_GUARANTEE",
              },
              {
                dataField: "RIT_REMAIN_NONEGUARANTEE",
                caption: "RIT_REMAIN_NONEGUARANTEE",
              },
            ],
          },
        ],
      },
      {
        caption: t("Xe đã giao chưa xuất hóa đơn"),
        alignment: "center",
        columns: [
          {
            dataField: "RDT_QUANTITY",
            caption: t("RDT_QUANTITY"),
          },
          {
            dataField: "RDT_TOTAL",
            caption: t("RDT_TOTAL"),
          },
          {
            dataField: "RDT_TOTALRECEIVED",
            caption: t("RDT_TOTALRECEIVED"),
          },
          {
            dataField: "RDT_DEALERDEBT_POLICY_REMAIN",
            caption: t("RDT_DEALERDEBT_POLICY_REMAIN"),
          },
          {
            dataField: "RDT_REMAIN",
            caption: t("RDT_REMAIN"),
          },
        ],
      },
      {
        caption: t("Xe đã xác nhận nhưng chưa giao"),
        alignment: "center",
        columns: [
          {
            dataField: "ROT_QUANTITY",
            caption: t("ROT_QUANTITY"),
          },
          {
            dataField: "ROT_TOTAL",
            caption: t("ROT_TOTAL"),
          },
          {
            dataField: "ROT_TOTALRECEIVED",
            caption: t("ROT_TOTALRECEIVED"),
          },
          {
            dataField: "ROT_DEALERDEBT_POLICY_REMAIN",
            caption: t("ROT_DEALERDEBT_POLICY_REMAIN==="),
          },
        ],
      },
    ],
    [isLoading]
  );

  const handleSearch = useCallback(async (data: IReportParam) => {
    setGettingData(true);
    reloading();
    // await refetch()
    setGettingData(false);
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
                storeKey={"Rpt_DebitReport02New-search"}
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
            <div className="w-full h-full mt-4">
              <DataGrid
                id={"gridContainer"}
                dataSource={data?.Data?.Lst_RptDebitReport ?? []}
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
