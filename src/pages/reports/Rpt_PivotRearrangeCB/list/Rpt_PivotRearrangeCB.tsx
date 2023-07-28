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
import { Rpt_PivotRearrangeCBParam } from "@/packages/api/clientgate/Rpt_PivotRearrangeCBApi";
interface IReportParam {
  TDate: any;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_PivotRearrangeCB = () => {
  const { t } = useI18n("Rpt_PivotRearrangeCB");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    TDate: new Date(),
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_PivotRearrangeCB",
      "Rpt_PivotRearrangeCB_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_PivotRearrangeCB_SearchHQ({
          TDate: searchCondition.TDate
            ? format(searchCondition.TDate, "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_PivotRearrangeCBParam);
        return resp;
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
    const result = await api.Rpt_PivotRearrangeCB_ExportDetailSearchHQ({
      TDate: searchCondition.TDate
        ? format(searchCondition.TDate, "yyyy-MM-dd")
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
      caption: t("TDate"),
      dataField: "TDate",
      visible: true,
      editorType: "dxDateBox",
      editorOptions: {
        ...dateBoxOptions,
        max: new Date(),
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
        dataField: "TOTAL",
        area: "data",
        areaIndex: 0,
        summaryType: "count",
      },
      {
        dataField: "Range_Date",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "StorageCodeTo",
        area: "row",
        areaIndex: 0,
      },
      {
        dataField: "SCDLoaiThung",
        area: "row",
        areaIndex: 2,
      },
      {
        dataField: "ColorExtNameVN",
        area: "row",
        areaIndex: 1,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_RptPivot_RearrangeCB,
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
                storeKey={"Rpt_PivotRearrangeCB-search"}
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
                  storageKey={"Rpt_PivotRearrangeCB"}
                />
                <FieldPanel visible={true} />
              </PivotGrid>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
