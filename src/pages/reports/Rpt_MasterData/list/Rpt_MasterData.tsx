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
import { format, isAfter, isBefore } from "date-fns";
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
import { RptMasterDataParam } from "@/packages/api/clientgate/Rpt_MasterDataApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  RptMonthFrom: any;
  RptMonthTo: any;
  FlagDataWH: 1 | 0;
  DealerCodeInput: string;
  AreaCode: string;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_MasterData = () => {
  const { t } = useI18n("Rpt_MasterData");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    RptMonthTo: new Date(),
    DealerCodeInput: "",
    AreaCode: "",
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_MasterData",
      "RptMasterData_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.RptMasterData_SearchHQ({
          RptMonthFrom: searchCondition.RptMonthFrom
            ? format(searchCondition.RptMonthFrom as Date, "yyyy-MM-dd")
            : "",
          RptMonthTo: searchCondition.RptMonthTo
            ? format(searchCondition.RptMonthTo as Date, "yyyy-MM-dd")
            : "",
          DealerCodeInput: searchCondition.DealerCodeInput ?? "",
          AreaCode: searchCondition.AreaCode ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as RptMasterDataParam);
        return resp?.Data?.Lst_Rpt_MasterData;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: listDealer } = useQuery(
    ["listDealerCode_Rpt_PmtPaymentDtlByDealer"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList)
        return [...resp.DataList, { DealerCode: "", DealerName: "All" }];
    }
  );

  const { data: listArea } = useQuery(
    ["listAreaCode_Rpt_PmtPaymentDtlByDealer"],
    async () => {
      const resp = await api.Mst_Area_GetAllActive();
      if (resp.DataList)
        return [...resp.DataList, { AreaCode: "", AreaName: "All" }];
    }
  );

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
    const result = await api.RptMasterData_ExportDetailSearchHQ({
      RptMonthFrom: searchCondition.RptMonthFrom
        ? format(searchCondition.RptMonthFrom as Date, "yyyy-MM-dd")
        : "",
      RptMonthTo: searchCondition.RptMonthTo
        ? format(searchCondition.RptMonthTo as Date, "yyyy-MM-dd")
        : "",
      DealerCodeInput: searchCondition.DealerCodeInput ?? "",
      AreaCode: searchCondition.AreaCode ?? "",
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
      caption: t("RptMonthFrom"),
      dataField: "RptMonthFrom",
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
        RequiredField(t("RptMonthFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.RptMonthTo) {
              return !isAfter(value, searchCondition.RptMonthTo);
            }
            return true;
          },
          message: t("RptMonthFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: t("RptMonthTo"),
      dataField: "RptMonthTo",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("RptMonthToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.RptMonthFrom);
          },
          message: t("RptMonthToMustBeAfterRptMonthFrom"),
        },
      ],
    },
    {
      caption: t("DealerCodeInput"),
      dataField: "DealerCodeInput",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listDealer,
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
      },
    },
    {
      caption: t("AreaCode"),
      dataField: "AreaCode",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listArea,
        displayExpr: "AreaName",
        valueExpr: "AreaCode",
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
        dataField: "RptType",
        area: "row",
        areaIndex: 0,
      },
      {
        dataField: "DealerCode",
        area: "filter",
        areaIndex: 1,
      },
      {
        dataField: "ModelCode",
        area: "row",
        areaIndex: 1,
      },
      {
        dataField: "SpecCode",
        area: "row",
        areaIndex: 4,
      },
      {
        dataField: "ColorExtCode",
        area: "filter",
        areaIndex: 0,
      },
      {
        dataField: "RptMonth",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "Qty",
        area: "data",
        areaIndex: 0,
      },
      {
        dataField: "DealerName",
        area: "filter",
        areaIndex: 2,
      },
      {
        dataField: "ModelName",
        area: "row",
        areaIndex: 2,
      },
      {
        dataField: "SpecDescription",
        area: "row",
        areaIndex: 3,
      },
      {
        dataField: "ColorExtNameVN",
        area: "row",
        areaIndex: 5,
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
                storeKey={"Rpt_MasterData-search"}
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
                  <StateStoring enabled={true} storageKey={"Rpt_MasterData"} />
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
