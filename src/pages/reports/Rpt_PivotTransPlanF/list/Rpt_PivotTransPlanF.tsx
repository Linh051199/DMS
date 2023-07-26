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
import { Rpt_PivotTransPlanFParam } from "@/packages/api/clientgate/Rpt_PivotTransPlanFApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface IReportParam {
  FlagDataWH: 1 | 0;
  ExpectedDateFrom: any;
  SDMDlvStartDateFrom: any;
  SDMDlvStartDateTo: any;
  ExpectedDateTo: any;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_PivotTransPlanF = () => {
  const { t } = useI18n("Rpt_PivotTransPlanF");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    SDMDlvStartDateTo: new Date(),
    ExpectedDateTo: new Date(),
  } as IReportParam);

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
        const resp = await api.Rpt_PivotTransPlanF_SearchHQ({
          ExpectedDateFrom: searchCondition?.ExpectedDateFrom
            ? format(searchCondition.ExpectedDateFrom, "yyyy-MM-dd")
            : "",
          ExpectedDateTo: searchCondition?.ExpectedDateTo
            ? format(searchCondition.ExpectedDateTo, "yyyy-MM-dd")
            : "",
          SDMDlvStartDateFrom: searchCondition?.SDMDlvStartDateFrom
            ? format(searchCondition.SDMDlvStartDateFrom, "yyyy-MM-dd")
            : "",
          SDMDlvStartDateTo: searchCondition?.SDMDlvStartDateTo
            ? format(searchCondition.SDMDlvStartDateTo, "yyyy-MM-dd")
            : "",

          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_PivotTransPlanFParam);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const response = await api.Rpt_PivotTransPlanF_ExportSearchDL(
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
    const result = await api.Rpt_PivotTransPlanF_ExportDetailSearchHQ({
      ExpectedDateFrom: searchCondition?.ExpectedDateFrom
        ? format(searchCondition.ExpectedDateFrom, "yyyy-MM-dd")
        : "",
      ExpectedDateTo: searchCondition?.ExpectedDateTo
        ? format(searchCondition.ExpectedDateTo, "yyyy-MM-dd")
        : "",
      SDMDlvStartDateFrom: searchCondition?.SDMDlvStartDateFrom
        ? format(searchCondition.SDMDlvStartDateFrom, "yyyy-MM-dd")
        : "",
      SDMDlvStartDateTo: searchCondition?.SDMDlvStartDateTo
        ? format(searchCondition.SDMDlvStartDateTo, "yyyy-MM-dd")
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
      dataField: "SDMDlvStartDateFrom",
      caption: t("SDMDlvStartDateFrom"),
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
        RequiredField(t("SDMDlvStartDateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.SDMDlvStartDateTo) {
              return !isAfter(value, searchCondition.SDMDlvStartDateTo);
            }
            return true;
          },
          message: t("SDMDlvStartDateFromMustBeBeforeSDMDlvStartDateTo"),
        },
      ],
    },
    {
      dataField: "SDMDlvStartDateTo",
      caption: t("SDMDlvStartDateTo"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("SDMDlvStartDateToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.SDMDlvStartDateFrom);
          },
          message: t("SDMDlvStartDateToMustBeAfterExpectedDateFrom"),
        },
      ],
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
        dataField: "VIN",
        area: "filter",
        areaIndex: 4,
      },
      {
        dataField: "MODELCODE",
        area: "row",
        areaIndex: 1,
      },

      {
        dataField: "MCMMODELNAME",
        area: "filter",
        areaIndex: 5,
      },

      {
        dataField: "MDDEALERCODE",
        area: "filter",
        areaIndex: 2,
      },
      {
        dataField: "STORAGECODE",
        area: "filter",
        areaIndex: 3,
      },

      {
        dataField: "TRANSPORTERNAME",
        area: "row",
        areaIndex: 0,
        expanded: false,
      },

      {
        dataField: "TINHGIAO_HUYENGIAO",
        area: "filter",
        areaIndex: 0,
      },
      {
        dataField: "TINHNHAN_HUYENNHAN",
        area: "filter",
        areaIndex: 1,
      },
      {
        dataField: "FLAG_CHUNGCHUNG",
        area: "column",
        areaIndex: 0,
        expanded: false,
      },
      {
        dataField: "TOTAL",
        area: "data",
        areaIndex: 0,
      },
      {
        dataField: "NGAYVT",
        area: "column",
        areaIndex: 1,
      },
    ];
  }, [t]);
  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_Rpt_PivotTransPlan,
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
                storeKey={"Rpt_PivotTransPlanF-search"}
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
              {!!data && data?.Data?.Lst_Rpt_PivotTransPlan && (
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
                    storageKey={"Rpt_PivotTransPlanF"}
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
