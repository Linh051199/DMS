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
import { format } from "date-fns";
import { LoadPanel, PivotGrid } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import {
  Export,
  FieldChooser,
  FieldPanel,
  Scrolling,
  StateStoring,
  LoadPanel as PivotLoadPanel,
} from "devextreme-react/pivot-grid";
import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { Rpt_DLSDealDetailLoanEUBankMarketSum01_Params } from "@/packages/api/clientgate/Rpt_DLSDealDetailLoanEUBankMarketSum01";
import { SearchForm } from "../components/Search-form";
interface IReportParam {
  DeliveryFrom: any;
  DeliveryTo: any;
  Dealer: any;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_DLSDealDetailLoanEUBankMarketSum01 = () => {
  const { t } = useI18n("Rpt_DLSDealDetailLoanEUBankMarketSum01");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {
      Dealer: "",
      DeliveryFrom: "",
      DeliveryTo: "",
    } as IReportParam
  );

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_DLSDealDetailLoanEUBankMarketSum01",
      "Rpt_DLSDealDetailLoanEUBankMarketSum01_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (!searchCondition.DeliveryFrom) {
        return [];
      }
      const resp = await api.Rpt_DLSDealDetailLoanEUBankMarketSum01_SearchHQ({
        ...searchCondition,
        DeliveryFrom: searchCondition.DeliveryFrom
          ? format(searchCondition.DeliveryFrom, "yyyy-MM")
          : "",
        DeliveryTo: searchCondition.DeliveryTo
          ? format(searchCondition.DeliveryTo, "yyyy-MM")
          : "",
      } as Rpt_DLSDealDetailLoanEUBankMarketSum01_Params);
      if (resp.isSuccess) {
        return resp.Data?.Lst_Rpt_DLSDealDetailLoanEUBankMarketSum_01 ?? [];
      }
      return [];
    },
    enabled: true,
  });
  console.log("🚀 ~ data:", data);

  const { data: dealerList } = useQuery(
    ["DealerList", "withAllOption"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList) {
        return [{ DealerCode: "", DealerName: "Tất cả" }, ...resp.DataList];
      }
    },
    {}
  );

  //PageHeader
  const handleExportDetail = useCallback(async () => {
    const result =
      await api.Rpt_DLSDealDetailLoanEUBankMarketSum01_ExportDetailSearchHQ({
        Dealer: searchCondition.Dealer ?? "",
        DeliveryFrom: searchCondition.DeliveryFrom
          ? format(searchCondition.DeliveryFrom, "yyyy-MM-dd")
          : "",
        DeliveryTo: searchCondition.DeliveryTo
          ? format(searchCondition.DeliveryTo, "yyyy-MM-dd")
          : "",
      });
    if (result.isSuccess && result.Data) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = result.Data;
    }
  }, []);
  const handleExport = useCallback(async () => {
    return;
  }, []);

  const handletoggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  const handleSearch = useCallback(async () => {
    setSearchCondition(searchCondition);
    setGettingData(true);
    reloading();
    // await refetch()
    setGettingData(false);
  }, []);

  //PivotGrid
  const fields = useMemo<Field[]>(() => {
    return [
      {
        caption: t("BankPercent"),
        dataField: "BankPercent",
        area: "filter",
        areaIndex: 9,
        summaryType: "sum",
      },
      {
        caption: t("BANKNAME"),
        dataField: "BANKNAME",
        area: "row",
        areaIndex: 1,
      },
      {
        caption: t("CARDID"),
        dataField: "CARID",
        area: "filter",
        areaIndex: 10,
      },
      {
        caption: t("DEALNO"),
        dataField: "DEALNO",
        area: "filter",
        areaIndex: 3,
      },
      { caption: t("BANKCODE"), dataField: "BANKCODE" },
      {
        caption: t("DEALDATE"),
        dataField: "DEALDATE",
        area: "filter",
        areaIndex: 7,
      },
      {
        caption: t("DEALMONTH"),
        dataField: "DEALMONTH",
        area: "filter",
        areaIndex: 2,
      },
      { caption: t("DELIVERYDATE"), dataField: "DELIVERYDATE" },
      { caption: t("DELIVERYDATE"), dataField: "DELIVERYMONTH" },
      { caption: t("SALESTYPE"), dataField: "SALESTYPE" },
      {
        caption: t("DEALERCODE"),
        dataField: "DEALERCODE",
        area: "filter",
        areaIndex: 4,
      },
      {
        caption: t("DEALERNAME"),
        dataField: "DEALERNAME",
        area: "filter",
        areaIndex: 5,
      },
      { caption: t("PROVINCECODE"), dataField: "PROVINCECODE" },
      { caption: t("PROVINCENAME"), dataField: "PROVINCENAME" },
      { caption: t("MODELCODE"), dataField: "MODELCODE" },
      { caption: t("SPECDESCRIPTION"), dataField: "SPECDESCRIPTION" },
      {
        caption: t("COYEAR"),
        dataField: "COYEAR",
        area: "filter",
        areaIndex: 8,
      },
      { caption: t("VIN"), dataField: "VIN", area: "filter", areaIndex: 1 },
      {
        caption: t("MP_BUYER_PROVINCECODE"),
        dataField: "MP_BUYER_PROVINCECODE",
      },
      {
        caption: t("MP_BUYER_PROVINCENAME"),
        dataField: "MP_BUYER_PROVINCENAME",
      },
      {
        caption: t("MD_BUYER_DISTRICTCODE"),
        dataField: "MD_BUYER_DISTRICTCODE",
      },
      {
        caption: t("MD_BUYER_DISTRICTNAME"),
        dataField: "MD_BUYER_DISTRICTNAME",
      },
      {
        caption: t("MP_DRIVER_PROVINCENAME"),
        dataField: "MP_DRIVER_PROVINCENAME",
      },
      {
        caption: t("MD_DRIVER_DISTRICTNAME"),
        dataField: "MD_DRIVER_DISTRICTNAME",
      },
      {
        caption: t("AREACODEDEALER"),
        dataField: "AREACODEDEALER",
        area: "filter",
        areaIndex: 6,
      },
      {
        caption: t("AREANAMEDEALER"),
        dataField: "AREANAMEDEALER",
        area: "filter",
        areaIndex: 11,
      },
      {
        caption: t("UNIPRICE"),
        dataField: "UNITPRICE",
        area: "filter",
        areaIndex: 0,
      },
      {
        caption: t("UNITPERCENT"),
        dataField: "UNITPERCENT",
        area: "data",
        areaIndex: 1,
      },
      { caption: t("CARQTY"), dataField: "CARQTY", area: "data", areaIndex: 0 },
      {
        caption: t("PAYMENTMETHOD"),
        dataField: "PAYMENTMETHOD",
        area: "row",
        areaIndex: 0,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data,
  });

  return (
    <>
      <AdminContentLayout className={"province-management"}>
        <AdminContentLayout.Slot name={"Header"}>
          <PageHeader
            onExportExcelDetail={handleExportDetail}
            onExportExcel={handleExport}
            toggleSearchPanel={handletoggleSearchPanel}
          ></PageHeader>
        </AdminContentLayout.Slot>
        <AdminContentLayout.Slot name={"Content"}>
          <ContentSearchPanelLayout>
            <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
              <div className={"w-[300px] h-full"}>
                <SearchForm
                  data={searchCondition}
                  onSearch={handleSearch}
                  dealerList={dealerList as any}
                />
              </div>
            </ContentSearchPanelLayout.Slot>
            <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
              <LoadPanel
                container={".dx-viewport"}
                shadingColor="rgba(0,0,0,0.4)"
                position={"center"}
                visible={isGetingData || isLoading}
              />
              <div className={"w-full mt-4"}>
                <PivotGrid
                  id="pivotgrid"
                  dataSource={dataSource}
                  allowSortingBySummary={true}
                  allowFiltering={true}
                  showBorders={true}
                  showColumnTotals={true}
                  showColumnGrandTotals={true}
                  showRowTotals={true}
                  showRowGrandTotals={true}
                  height={windowSize.height - 150}
                  allowExpandAll={true}
                  width={"100%"}
                >
                  <FieldChooser enabled={true} height={400} />
                  <PivotLoadPanel
                    enabled={true}
                    showPane={isGetingData || isLoading}
                    showIndicator={true}
                  />
                  <Export enabled={true} />
                  <StateStoring
                    enabled={true}
                    storageKey={"report-Rpt_DLSDealDetailLoanEUBankMarketSum01"}
                  />
                  <FieldPanel visible={true} />
                </PivotGrid>
              </div>
            </ContentSearchPanelLayout.Slot>
          </ContentSearchPanelLayout>
        </AdminContentLayout.Slot>
      </AdminContentLayout>
    </>
  );
};
