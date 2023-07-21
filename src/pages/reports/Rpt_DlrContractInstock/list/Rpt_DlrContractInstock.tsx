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
import { format, getYear } from "date-fns";
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
import { useRpt_DlrContractInstockParam } from "@/packages/api/clientgate/Rpt_DlrContractInstockApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  MDDealerCodeConditionList: string;
  MAAreaCodeConditonList: string;
  DateBegin: string;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_DlrContractInstock = () => {
  const { t } = useI18n("Rpt_DlrContractInstock");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);

  const currentYear = getYear(new Date());
  const yearDataSource = Array.from(new Array(100), (x, i) => i).map((x) => ({
    value: currentYear - x,
    text: (currentYear - x).toString(),
  }));
  // useEffect(() => {
  //   setSearchCondition({
  //     ...searchCondition,
  //     DateBegin: yearDataSource[0].text,
  //   });
  // }, []);
  const [searchCondition, setSearchCondition] =
    useState<useRpt_DlrContractInstockParam>({
      MDDealerCodeConditionList: "",
      MAAreaCodeConditonList: "",
      DateBegin: yearDataSource[0].text,
      FlagDataWH: 1,
    } as useRpt_DlrContractInstockParam);

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
        const resp = await api.Rpt_DlrContractInstock_SearchHQ({
          MDDealerCodeConditionList:
            searchCondition.MDDealerCodeConditionList ?? "",
          MAAreaCodeConditonList: searchCondition.MAAreaCodeConditonList ?? "",
          DateBegin: searchCondition.DateBegin ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as useRpt_DlrContractInstockParam);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: listDealer } = useQuery({
    queryKey: ["listDealer"],
    queryFn: () => api.Mst_Dealer_GetAllActive(),
  });

  const { data: listArea } = useQuery({
    queryKey: ["listArea"],
    queryFn: () => api.Mst_Area_GetAllActive(),
  });

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.Rpt_DlrContractInstock_ExportSearchDL(
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
    const result = await api.Rpt_DlrContractInstock_ExportDetailSearchHQ({
      MDDealerCodeConditionList:
        searchCondition.MDDealerCodeConditionList ?? "",
      MAAreaCodeConditonList: searchCondition.MAAreaCodeConditonList ?? "",
      DateBegin: searchCondition.DateBegin ?? "",
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
      dataField: "DateBegin",
      caption: t("DateabcBegin"),
      editorType: "dxSelectBox",
      visible: true,
      validationRules: [RequiredField(t("YearIsRequired"))],
      editorOptions: {
        displayExpr: "value",
        valueExpr: "text",
        items: yearDataSource ?? [],
      },
    },
    {
      caption: t("AreaCodeConditonList"),
      dataField: "MAAreaCodeConditonList",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        displayExpr: "AreaName",
        valueExpr: "AreaCode",
        items: listArea?.DataList ?? [],
      },
    },
    {
      caption: t("DealerCodeConditionList"),
      dataField: "MDDealerCodeConditionList",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
        items: listDealer?.DataList ?? [],
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

  //PivotGrid
  const fields = useMemo<Field[]>(() => {
    return [
      {
        dataField: "DCDEALERCODE",
        area: "row",
        areaIndex: 0,
      },
      {
        dataField: "DEALERNAME",
        area: "row",
        areaIndex: 1,
      },
      {
        dataField: "MODELCODE",
        area: "row",
        areaIndex: 2,
      },
      {
        dataField: "COLORCODE",
        area: "row",
        areaIndex: 4,
      },

      {
        dataField: "SPECDESCRIPTION",
        area: "row",
        areaIndex: 3,
      },

      {
        dataField: "DLRCONTRACTNO",
        area: "filter",
        areaIndex: 1,
      },

      {
        dataField: "RD_INSTOCK",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "CREATEDDATE",
        area: "filter",
        areaIndex: 7,
      },

      {
        dataField: "FULLNAME",
        area: "filter",
        areaIndex: 0,
      },

      {
        dataField: "MP_PROVINCECODE",
        area: "filter",
        areaIndex: 8,
      },

      {
        dataField: "MD_DISTRICTCODE",
        area: "filter",
        areaIndex: 9,
      },

      {
        dataField: "DLRCONTRACTNOUSER",
        area: "filter",
        areaIndex: 2,
      },
      {
        dataField: "ADDRESS",
        area: "filter",
        areaIndex: 3,
      },
      {
        dataField: "SMCODE",
        area: "filter",
        areaIndex: 4,
      },

      {
        dataField: "SALESTYPE",
        area: "filter",
        areaIndex: 5,
      },

      {
        dataField: "DLVEXPECTEDDATE",
        area: "filter",
        areaIndex: 6,
      },
      {
        dataField: "UNITPRICE",
        area: "filter",
        areaIndex: 10,
      },
      {
        dataField: "TOTALPRICE",
        area: "data",
        areaIndex: 0,
      },

      {
        dataField: "AREANAMECUS",
        area: "filter",
        areaIndex: 12,
      },
      {
        dataField: "AREACODEDEALER",
        area: "filter",
        areaIndex: 11,
      },

      {
        dataField: "HTCSTAFFINCHARGE",
        area: "filter",
        areaIndex: 13,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_Rpt_DlrContractInstock,
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
                storeKey={"Rpt_DlrContractInstock-search"}
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
              {!!data && data?.Data?.Lst_Rpt_DlrContractInstock && (
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
                    storageKey={"Rpt_DlrContractInstock"}
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

//  <ScrollView height={windowSize.height - 120}>
// <DataGrid
//   id={"gridContainer"}
//   dataSource={
//     data?.Data?.Lst_RptStatistic_HTCBackOrder_SpecCode_01 ?? []
//   }
//   columns={columns}
//   showBorders={true}
//   showRowLines={true}
//   showColumnLines={true}
//   columnAutoWidth={true}
//   allowColumnResizing={false}
//   allowColumnReordering={false}
//   className={"mx-auto my-5"}
//   width={"100%"}
//   columnResizingMode="widget"
// >
//   <HeaderFilter allowSearch={true} visible={true} />
//   <Scrolling showScrollbar={"always"} />
//   <Sorting mode={"none"} />
// </DataGrid>
// </ScrollView>
