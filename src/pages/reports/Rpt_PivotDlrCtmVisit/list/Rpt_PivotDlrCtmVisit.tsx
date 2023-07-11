import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useRpt_PivotDlrCtmVisitParam } from "@/packages/api/clientgate/Rpt_PivotDlrCtmVisitApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
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
import dxDateBox from "devextreme/ui/date_box";
import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";

interface IReportParam {
  VisitDateFrom: Date;
  VisitDateTo: Date;
  FlagDataWH: boolean;
}

export const Rpt_PivotDlrCtmVisit = () => {
  const { t } = useI18n("Rpt_PivotDlrCtmVisit");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {} as IReportParam
  );
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_PivotDlrCtmVisit",
      "Rpt_PivotDlrCtmVisit_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],

    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_PivotDlrCtmVisit_SearchHQ({
          VisitDateFrom: searchCondition.VisitDateFrom
            ? format(searchCondition.VisitDateFrom, "yyyy-MM-dd")
            : "",
          VisitDateTo: searchCondition.VisitDateTo
            ? format(searchCondition.VisitDateTo, "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as useRpt_PivotDlrCtmVisitParam);
        return resp;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const fields = useMemo<Field[]>(() => {
    return [
      {
        dataField: "TOTAL",
        area: "data",
        areaIndex: 0,
      },
      {
        dataField: "CTMVISITCODE",
        area: "filter",
        areaIndex: 3,
      },
      {
        dataField: "DEALERCODE",
        area: "row",
        areaIndex: 1,
      },
      {
        dataField: "MODELCODE",
        area: "filter",
        areaIndex: 1,
      },

      {
        dataField: "DEALERNAME",
        area: "row",
        areaIndex: 0,
      },
      {
        dataField: "MODELNAME",
        area: "filter",
        areaIndex: 2,
      },
      {
        dataField: "RANGEAGENAME",
        area: "filter",
        areaIndex: 0,
      },
      {
        dataField: "GENDERNAME",
        area: "column",
        areaIndex: 0,
      },
    ];
  }, [t]);

  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_RptPivot_DlrCtmVisit,
  });

  //PageHeader
  const handleExportExcel = useCallback(() => {}, []);
  const handleExportDetail = useCallback(async () => {
    const result = await api.Rpt_PivotDlrCtmVisit_ExportDetailSearchHQ({
      VisitDateFrom: searchCondition.VisitDateFrom
        ? format(searchCondition.VisitDateFrom, "yyyy-MM-dd")
        : "",
      VisitDateTo: searchCondition.VisitDateTo
        ? format(searchCondition.VisitDateTo, "yyyy-MM-dd")
        : "",
      FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
    });
    if (result.isSuccess && result.Data) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = result.Data;
    }
  }, []);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  //SearchPanelV2
  const searchFields: IItemProps[] = [
    {
      caption: "VisitDateFrom",
      dataField: "VisitDateFrom",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessage: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("DateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.VisitDateFrom) {
              return !isAfter(value, searchCondition.VisitDateFrom);
            }
            return true;
          },
          message: t("DateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: "VisitDateTo",
      dataField: "VisitDateTo",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessage: "always",
        showClearButton: true,
      },
      validationRules: [
        RequiredField(t("DateToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.VisitDateTo) {
              return !isBefore(value, searchCondition.VisitDateTo);
            }
            return true;
          },
          message: t("DateToMustBeAfterDateTo"),
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
  const handleSearch = useCallback(async (data: IReportParam) => {
    reloading();
  }, []);

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
          onExportExcel={handleExportExcel}
          onExportExcelDetail={handleExportDetail}
          toggleSearchPanel={handleToggleSearchPanel}
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
                storeKey={"Rpt_PivotDlrCtmVisit-search"}
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
              {!!data && data?.Data?.Lst_RptPivot_DlrCtmVisit && (
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
                    storageKey={"Rpt_PivotDlrCtmVisit"}
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
