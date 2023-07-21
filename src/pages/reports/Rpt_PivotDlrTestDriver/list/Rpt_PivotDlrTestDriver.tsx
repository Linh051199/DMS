import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useRptPivotDlrTestDriverParam } from "@/packages/api/clientgate/Rpt_PivotDlrTestDriverApt";
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
  DriverDateFrom: Date;
  DriverDateTo: Date;
  FlagDataWH: 1 | 0;
}

export const Rpt_PivotDlrTestDriver = () => {
  const { t } = useI18n("Rpt_PivotDlrTestDriver");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    DriverDateTo: new Date(),
  } as IReportParam);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_PivotDlrTestDriver",
      "Rpt_PivotDlrTestDriver_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],

    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_PivotDlrTestDriver_SearchHQ({
          DriverDateFrom: searchCondition.DriverDateFrom
            ? format(searchCondition.DriverDateFrom, "yyyy-MM-dd")
            : "",
          DriverDateTo: searchCondition.DriverDateTo
            ? format(searchCondition.DriverDateTo, "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as useRptPivotDlrTestDriverParam);
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
        dataField: "DEALERCODE",
        area: "row",
        areaIndex: 1,
      },
      {
        dataField: "MODELCODE",
        area: "filter",
        areaIndex: 7,
      },
      {
        dataField: "DEALERNAME",
        area: "row",
        areaIndex: 0,
        expanded: false,
      },
      {
        dataField: "MODELNAME",
        area: "filter",
        areaIndex: 8,
      },

      {
        dataField: "GENDERNAME",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "DRIVETESTCODE",
        area: "filter",
        areaIndex: 10,
      },

      {
        dataField: "DRIVERLICENSENO",
        area: "filter",
        areaIndex: 9,
      },

      {
        dataField: "RANGEAGECODE",
        area: "filter",
        areaIndex: 6,
      },

      {
        dataField: "DRVTESTPLATENO",
        area: "filter",
        areaIndex: 11,
      },
      {
        dataField: "DRIVERTESTTYPE",
        area: "filter",
        areaIndex: 12,
      },
      {
        dataField: "DRIVERTESTGROUP",
        area: "filter",
        areaIndex: 13,
      },
      {
        dataField: "DDCFULLNAME",
        area: "filter",
        areaIndex: 2,
      },

      {
        dataField: "DDCADDRESS",
        area: "filter",
        areaIndex: 3,
      },
      {
        dataField: "DDCPHONENO",
        area: "filter",
        areaIndex: 4,
      },

      {
        dataField: "DDCEMAIL",
        area: "filter",
        areaIndex: 5,
      },
      {
        dataField: "DDCIDCARDNO",
        area: "filter",
        areaIndex: 0,
      },
      {
        dataField: "DDCIDCARDTYPE",
        area: "filter",
        areaIndex: 1,
      },
    ];
  }, [t]);

  const dataSource = new PivotGridDataSource({
    fields: fields,
    store: data?.Data?.Lst_RptPivot_Dlr_TestDriver,
  });

  //PageHeader
  const handleExportExcel = useCallback(() => {}, []);
  const handleExportDetail = useCallback(async () => {
    const result = await api.Rpt_PivotDlrTestDriver_ExportDetailSearchHQ({
      DriverDateFrom: searchCondition.DriverDateFrom
        ? format(searchCondition.DriverDateFrom, "yyyy-MM-dd")
        : "",
      DriverDateTo: searchCondition.DriverDateTo
        ? format(searchCondition.DriverDateTo, "yyyy-MM-dd")
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
      caption: "DriverDateFrom",
      dataField: "DriverDateFrom",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessage: "always",
        showClearButton: true,
        max: new Date(),
      },
      validationRules: [
        RequiredField(t("DateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.DriverDateTo) {
              return !isAfter(value, searchCondition.DriverDateTo);
            }
            return true;
          },
          message: t("DateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: "DriverDateTo",
      dataField: "DriverDateTo",
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
            if (searchCondition.DriverDateFrom) {
              return !isBefore(value, searchCondition.DriverDateFrom);
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
                storeKey={"Rpt_PivotDlrTestDriver-search"}
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
              {!!data && data?.Data?.Lst_RptPivot_Dlr_TestDriver && (
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
                    storageKey={"Rpt_PivotDlrTestDriver"}
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
