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
import { useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { Rpt_ProfileGuaranteeEffectParam } from "@/packages/api/clientgate/Rpt_ProfileGuaranteeEffectApi";
import { useSearchForm } from "../components/search-form";
import { IReportParam, searchConditionAtom } from "../components/store";




export const Rpt_ProfileGuaranteeEffect = () => {
  const { t } = useI18n("Rpt_ProfileGuaranteeEffect");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const searchCondition = useAtomValue(searchConditionAtom);
  const setSearchCondition = useSetAtom(searchConditionAtom);



  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_ProfileGuaranteeEffect",
      "RptProfileGuaranteeEffect_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptProfileGuaranteeEffect_SearchHQ({
          ApprovedDateFrom: searchCondition.ApprovedDateFrom
            ? format(searchCondition.ApprovedDateFrom, "yyyy-MM-dd")
            : "",
          ApprovedDateTo: searchCondition.ApprovedDateTo
            ? format(searchCondition.ApprovedDateTo, "yyyy-MM-dd")
            : "",
          StatusMortageEnd: searchCondition.StatusMortageEnd
            ? format(searchCondition.StatusMortageEnd, "yyyy-MM-dd")
            : "",
          MortageEndDateFrom: searchCondition.MortageEndDateFrom
            ? format(searchCondition.MortageEndDateFrom, "yyyy-MM-dd")
            : "",
          MortageEndDateTo: searchCondition.MortageEndDateTo
            ? format(searchCondition.MortageEndDateTo, "yyyy-MM-dd")
            : "",
          DateStartFrom: searchCondition.DateStartFrom
            ? format(searchCondition.DateStartFrom, "yyyy-MM-dd")
            : "",
          DateStartTo: searchCondition.DateStartTo
            ? format(searchCondition.DateStartTo, "yyyy-MM-dd")
            : "",
          DateEndFrom: searchCondition.DateEndFrom
            ? format(searchCondition.DateEndFrom, "yyyy-MM-dd")
            : "",
          DateEndTo: searchCondition.DateEndTo
            ? format(searchCondition.DateEndTo, "yyyy-MM-dd")
            : "",
          PaymentEndDateTo: searchCondition.PaymentEndDateTo
            ? format(searchCondition.PaymentEndDateTo, "yyyy-MM-dd")
            : "",
          TypeReport: searchCondition.TypeReport ?? "",
          GrtBankCode: searchCondition.GrtBankCode ?? "",
          DocumentsStatus: searchCondition.DocumentsStatus ?? "",
          VIN: searchCondition.VIN ?? "",
          CarId: searchCondition.CarId ?? "",
          DealerCodeInput: searchCondition.DealerCodeInput ?? "",
          DlrCtrNo: searchCondition.DlrCtrNo ?? "",
          SOCode: searchCondition.SOCode ?? "",
          BankGuaranteeNo: searchCondition.BankGuaranteeNo ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_ProfileGuaranteeEffectParam);
        return resp?.Data?.Lst_Rpt_ProfileGuaranteeEffect;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    // const response = await api.RptSaleBaoCaoTongHopGet_ExportSearchHQ(
    //   searchCondition
    // );
    // if (response.isSuccess) {
    //   toast.success(t("DownloadSuccessfully"));
    //   window.location.href = response.Data as string;
    // } else {
    //   toast.error(t("DownloadUnsuccessfully"));
    // }
  }, [searchCondition]);

  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.RptProfileGuaranteeEffect_ExportDetailSearchHQ({
      ApprovedDateFrom: searchCondition.ApprovedDateFrom
        ? format(searchCondition.ApprovedDateFrom, "yyyy-MM-dd")
        : "",
      ApprovedDateTo: searchCondition.ApprovedDateTo
        ? format(searchCondition.ApprovedDateTo, "yyyy-MM-dd")
        : "",
      StatusMortageEnd: searchCondition.StatusMortageEnd
        ? format(searchCondition.StatusMortageEnd, "yyyy-MM-dd")
        : "",
      MortageEndDateFrom: searchCondition.MortageEndDateFrom
        ? format(searchCondition.MortageEndDateFrom, "yyyy-MM-dd")
        : "",
      MortageEndDateTo: searchCondition.MortageEndDateTo
        ? format(searchCondition.MortageEndDateTo, "yyyy-MM-dd")
        : "",
      DateStartFrom: searchCondition.DateStartFrom
        ? format(searchCondition.DateStartFrom, "yyyy-MM-dd")
        : "",
      DateStartTo: searchCondition.DateStartTo
        ? format(searchCondition.DateStartTo, "yyyy-MM-dd")
        : "",
      DateEndFrom: searchCondition.DateEndFrom
        ? format(searchCondition.DateEndFrom, "yyyy-MM-dd")
        : "",
      DateEndTo: searchCondition.DateEndTo
        ? format(searchCondition.DateEndTo, "yyyy-MM-dd")
        : "",
      PaymentEndDateTo: searchCondition.PaymentEndDateTo
        ? format(searchCondition.PaymentEndDateTo, "yyyy-MM-dd")
        : "",
      TypeReport: searchCondition.TypeReport ?? "",
      GrtBankCode: searchCondition.GrtBankCode ?? "",
      DocumentsStatus: searchCondition.DocumentsStatus ?? "",
      VIN: searchCondition.VIN ?? "",
      CarId: searchCondition.CarId ?? "",
      DealerCodeInput: searchCondition.DealerCodeInput ?? "",
      DlrCtrNo: searchCondition.DlrCtrNo ?? "",
      SOCode: searchCondition.SOCode ?? "",
      BankGuaranteeNo: searchCondition.BankGuaranteeNo ?? "",
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
  const searchFields = useSearchForm()
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
        caption: t("CarID"),
        dataField: "CarID",
        area: "data",
        showGrandTotals: true,
        showTotals: true,
        summaryType: "count",
        isMeasure: true, // allows the end-user to place this f
      },
      {
        caption: t("DUTYCOMPLETEDPERCENT_RANGE"),
        dataField: "DUTYCOMPLETEDPERCENT_RANGE",
        area: "row",
      },
      {
        caption: t("DUTYDAYS_RANGE"),
        dataField: "DUTYDAYS_RANGE",
        area: "row",
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data as any,
  });
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
                storeKey={"Rpt_ProfileGuaranteeEffect-search"}
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
              {!!data && (
                <PivotGrid
                  id="pivotgrid"
                  dataSource={dataSource}
                  allowSortingBySummary={true}
                  allowFiltering={true}
                  showBorders={true}
                  disabled={false} // chặn người dùng không cho tương tác với màn hình giao diện
                  onCellClick={(e: any) => {}} // lấy ra thông in của cột khi mà mình click vào bất kì ô nào
                  onCellPrepared={(e: any) => {}} // Một chức năng được thực thi sau khi một ô lưới trục được tạo.
                  onContentReady={(e) => {}} // A function that is executed when the UI component is rendered and each time the component is repainted.
                  onContextMenuPreparing={(e) => {}} // A function that is executed * before the context menu is rendered. *
                  onExporting={(e) => {}} // A function that is executed before data is exported. // thực thi sau khi xuất file
                  onOptionChanged={(e) => {}} // A function that is executed after a UI component property is changed.
                  showColumnGrandTotals={true} // chỉ định hiển thị tổng tính tổng hay không
                  showColumnTotals={true} // chỉ định có hiện cột tính tổng của cột hay không
                  showRowGrandTotals={true} // ngược lại với showColumnGrandTotals
                  showRowTotals={true} // ngược lại với showColumnTotals
                  showTotalsPrior={"none"} // 'both' | 'columns' | 'none' | 'rows' => default: 'none'
                  height={windowSize.height - 150}
                  // width={200}
                  allowExpandAll={true}
                >
                  <Scrolling mode={"virtual"} />
                  {/* cho phép ấn và hiển thị cột theo mong muốn */}
                  <FieldChooser enabled={true} height={400} />
                  <PivotLoadPanel
                    enabled={true}
                    showPane={true}
                    showIndicator={true}
                  />

                  {/* cho phép người dùng xuất file */}
                  <Export enabled={true} />
                  {/* lưu cấu hình pivot vào trong local storage  */}
                  <StateStoring
                    enabled={true}
                    storageKey={"Rpt_ProfileGuaranteeEffect"}
                  />
                  <FieldPanel visible={true} />
                </PivotGrid>
              )}
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
