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
import {
  Button,
  DataGrid,
  LoadPanel,
  Resizable,
  ScrollView,
} from "devextreme-react";
import { IItemProps } from "devextreme-react/form";

import {
  Column,
  ColumnFixing,
  Toolbar as GridToolbar,
  HeaderFilter,
  Item,
  Paging,
  Scrolling,
  Search,
  Sorting,
  Summary,
  Toolbar,
  TotalItem,
} from "devextreme-react/data-grid";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { useVisibilityControl } from "@/packages/hooks";
import { Rpt_TheoDoiKiemTraDatHangParam } from "@/packages/api/clientgate/Rpt_TheoDoiKiemTraDatHangApi";
interface IReportParam {
  YearPlan: any;
  DealerCodeInput: any;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_TheoDoiKiemTraDatHang = () => {
  const { t } = useI18n("Rpt_TheoDoiKiemTraDatHang");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const [visible, setVisible] = useState(false);

  const [isGetingData, setGettingData] = useState(false);
  const [totalModelCode, setTotalModelCode] = useState([]);

  const [searchCondition, setSearchCondition] = useState<IReportParam>({
    YearPlan: format(Date.now(), "yyyy-MM"),
    DealerCodeInput: "",
  } as IReportParam);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "Rpt_TheoDoiKiemTraDatHang",
      "Rpt_TheoDoiKiemTraDatHang_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_TheoDoiKiemTraDatHang_SearchHQ({
          YearPlan: searchCondition.YearPlan ?? "",
          DealerCodeInput: searchCondition.DealerCodeInput ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_TheoDoiKiemTraDatHangParam);
        return resp?.Data?.Lst_Rpt_TheoDoiKiemTraDatHang;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  const { data: listDealer, isLoading: listDealerLoading } = useQuery(
    ["listDealerCode_Rpt_PmtPaymentDtlByDealer"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList)
        return [...resp.DataList, { DealerCode: "", DealerName: "All" }];
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
    const result = await api.RptStatisticHTCStockOutOnWay_ExportDetailSearchHQ({
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

  const yearDs = useCallback(() => {
    const yearList = [];
    // Set the start and end dates
    const startDate = new Date("2019-01-01");
    const endDate = new Date();

    // Loop through the months from end to start in descending order
    for (
      let date = endDate;
      date >= startDate;
      date.setMonth(date.getMonth() - 1)
    ) {
      const year = date.getFullYear(); // Get the year
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month and pad with leading zero if needed
      const yearMonth = `${year}-${month}`; // Concatenate the year and month
      yearList.push({ year: yearMonth, text: yearMonth });
    }

    return yearList; // Return the generated yearList
  }, [searchCondition, data]);

  //SearchPanelV2
  const searchFields: IItemProps[] = [
    {
      caption: t("YearPlan"),
      dataField: "YearPlan",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: yearDs() ?? [],
        displayExpr: "text",
        valueExpr: "year",
        validationMessageMode: "always",
        validationGroup: "form",
      },
    },

    {
      caption: t("DealerCodeInput"),
      dataField: "DealerCodeInput",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listDealer ?? [],
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
        validationMessageMode: "always",
        validationGroup: "form",
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

  useEffect(() => {
    if (data) {
      data.map((item: any, index: any) => (item.Id = index + 1));
    }
  }, [data]);

  const listMonthColumnsFirst = Array.from(
    { length: 12 },
    (data, index = 1) => {
      return {
        dataField: `OrdN${index + 1}`,
        caption: t(`OrdN${index + 1}`),
        visible: true,
      };
    }
  );

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "ID",
        caption: t("STT"),
        visible: true,
      },
      {
        dataField: "ModelCode",
        caption: t("ModelCode"),
        visible: true,
      },
      {
        dataField: "ModelName",
        caption: t("ModelName"),
        visible: true,
      },
      {
        dataField: "Year2019",
        caption: t(`Năm 2019`),
        visible: true,
      },
      {
        dataField: "KeHoachDatHang_NgayDuyet",
        caption: t(
          `Kế hoạch đặt hàng ${searchCondition.YearPlan ?? ""}
            - ngày duyệt ${format(Date.now(), "yyyy-MM-dd HH:mm:ss")} `
        ),
        alignment: "center",
        columns: [...listMonthColumnsFirst],
      },

      {
        dataField: "TotalInYear",
        caption: searchCondition.YearPlan
          ? t(`Year ${(searchCondition.YearPlan as string).substring(0, 4)}`)
          : "Year",
      },
      {
        caption: t("Percent"),
        dataField: "Percent",
        customizeText: (data: any) => {
          return `${data.value} %` ?? "";
        },
      },
    ];
  }, [isLoading]);

  const columnsSecond: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "ID",
        caption: t("STT"),
        visible: true,
      },
      {
        dataField: "ModelCode",
        caption: t("ModelCode"),
        visible: true,
      },
      {
        dataField: "SpecCode",
        caption: t("SpecCode"),
        visible: true,
      },
      {
        dataField: "SpecDescription",
        caption: t("SpecDescription"),
        visible: true,
      },
      {
        caption: t(`Tháng 1`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN1`,
            caption: t(`OrdN1`),
            visible: true,
          },
          {
            dataField: `EstN1`,
            caption: t(`EstN1`),
            visible: true,
          },
          {
            dataField: `EstN2`,
            caption: t(`EstN2`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN1}`,
            caption: t(`SubKtraDH_KHDH_SpecN1`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN2`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN2`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 2`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN2`,
            caption: t(`OrdN2`),
            visible: true,
          },
          {
            dataField: `EstN3`,
            caption: t(`EstN3`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN2}`,
            caption: t(`SubKtraDH_KHDH_SpecN2`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN3`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN3`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 3`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN3`,
            caption: t(`OrdN3`),
            visible: true,
          },
          {
            dataField: `EstN4`,
            caption: t(`EstN4`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN3}`,
            caption: t(`SubKtraDH_KHDH_SpecN3`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN4`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN4`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 4`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN4`,
            caption: t(`OrdN4`),
            visible: true,
          },
          {
            dataField: `EstN5`,
            caption: t(`EstN5`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN4}`,
            caption: t(`SubKtraDH_KHDH_SpecN4`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN5`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN5`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 5`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN5`,
            caption: t(`OrdN5`),
            visible: true,
          },
          {
            dataField: `EstN6`,
            caption: t(`EstN6`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN5}`,
            caption: t(`SubKtraDH_KHDH_SpecN5`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN6`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN6`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 6`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN6`,
            caption: t(`OrdN6`),
            visible: true,
          },
          {
            dataField: `EstN7`,
            caption: t(`EstN7`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN6}`,
            caption: t(`SubKtraDH_KHDH_SpecN6`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN7`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN7`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 7`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN7`,
            caption: t(`OrdN7`),
            visible: true,
          },
          {
            dataField: `EstN8`,
            caption: t(`EstN8`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN7}`,
            caption: t(`SubKtraDH_KHDH_SpecN7`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN8`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN8`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 8`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN8`,
            caption: t(`OrdN8`),
            visible: true,
          },
          {
            dataField: `EstN9`,
            caption: t(`EstN9`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN8}`,
            caption: t(`SubKtraDH_KHDH_SpecN8`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN9`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN9`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 9`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN9`,
            caption: t(`OrdN9`),
            visible: true,
          },
          {
            dataField: `EstN10`,
            caption: t(`EstN10`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN9}`,
            caption: t(`SubKtraDH_KHDH_SpecN9`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN10`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN10`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 10`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN10`,
            caption: t(`OrdN10`),
            visible: true,
          },
          {
            dataField: `EstN11`,
            caption: t(`EstN11`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN10}`,
            caption: t(`SubKtraDH_KHDH_SpecN10`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN11`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN11`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 11`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN11`,
            caption: t(`OrdN11`),
            visible: true,
          },
          {
            dataField: `EstN12`,
            caption: t(`EstN12`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN11}`,
            caption: t(`SubKtraDH_KHDH_SpecN11`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN12`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN12`),
            visible: true,
          },
        ],
      },
      {
        caption: t(`Tháng 12`),
        alignment: "center",
        columns: [
          {
            dataField: `OrdN12`,
            caption: t(`OrdN12`),
            visible: true,
          },
          {
            dataField: `EstN1`,
            caption: t(`EstN1`),
            visible: true,
          },
          {
            dataField: `SubKtraDH_KHDH_SpecN12}`,
            caption: t(`SubKtraDH_KHDH_SpecN12`),
            visible: true,
          },
          {
            dataField: `DBKtraKHDH_Spec_KHDH_ModelN1`,
            caption: t(`DBKtraKHDH_Spec_KHDH_ModelN1`),
            visible: true,
          },
        ],
      },
    ];
  }, [isLoading]);
  useEffect(() => {
    if (data) {
      // =================================================================
      const updatedOutput = data.reduce((accumulator: any, item, index) => {
        const existingItem: any = accumulator.find(
          (outputItem: any) => outputItem.ModelCode === item.ModelCode
        );
        if (existingItem) {
          existingItem.OrdN1 += item.OrdN1;
          existingItem.OrdN2 += item.OrdN2;
          existingItem.OrdN3 += item.OrdN3;
          existingItem.OrdN4 += item.OrdN4;
          existingItem.OrdN5 += item.OrdN5;
          existingItem.OrdN6 += item.OrdN6;
          existingItem.OrdN7 += item.OrdN7;
          existingItem.OrdN8 += item.OrdN8;
          existingItem.OrdN9 += item.OrdN9;
          existingItem.OrdN10 += item.OrdN10;
          existingItem.OrdN11 += item.OrdN11;
          existingItem.OrdN12 += item.OrdN12;
          // =================================================================
          existingItem.EstN1 += item.EstN1;
          existingItem.EstN2 += item.EstN2;
          existingItem.EstN3 += item.EstN3;
          existingItem.EstN4 += item.EstN4;
          existingItem.EstN5 += item.EstN5;
          existingItem.EstN6 += item.EstN6;
          existingItem.EstN7 += item.EstN7;
          existingItem.EstN8 += item.EstN8;
          existingItem.EstN9 += item.EstN9;
          existingItem.EstN10 += item.EstN10;
          existingItem.EstN11 += item.EstN11;
          existingItem.EstN12 += item.EstN12;
          // =================================================================
          existingItem.QtyEOrdN1_Old =
            Number(existingItem.QtyEOrdN1) + Number(item.QtyEOrdN1_Old);
          // =================================================================
          existingItem.DBKtraKHDH_Spec_KHDH_ModelN1 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN1, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN1, 10);
          existingItem.DBKtraKHDH_Spec_KHDH_ModelN2 += parseInt(
            item.DBKtraKHDH_Spec_KHDH_ModelN2,
            10
          );
          existingItem.DBKtraKHDH_Spec_KHDH_ModelN2 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN2, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN2, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN3 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN3, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN3, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN4 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN4, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN4, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN4 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN4, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN4, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN5 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN5, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN5, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN6 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN6, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN6, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN7 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN7, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN7, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN8 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN8, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN8, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN9 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN9, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN9, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN10 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN10, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN10, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN11 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN11, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN11, 10);

          existingItem.DBKtraKHDH_Spec_KHDH_ModelN12 =
            parseInt(existingItem.DBKtraKHDH_Spec_KHDH_ModelN12, 10) +
            parseInt(item.DBKtraKHDH_Spec_KHDH_ModelN12, 10);

          // existingItem.DBKtraKHDH_Spec_KHDH_ModelN12 += parseInt(
          //   item.DBKtraKHDH_Spec_KHDH_ModelN12,
          //   10
          // );
          // =================================================================
          existingItem.SubKtraDH_KHDH_SpecN1 += item.SubKtraDH_KHDH_SpecN1;
          existingItem.SubKtraDH_KHDH_SpecN2 += item.SubKtraDH_KHDH_SpecN2;
          existingItem.SubKtraDH_KHDH_SpecN3 += item.SubKtraDH_KHDH_SpecN3;
          existingItem.SubKtraDH_KHDH_SpecN4 += item.SubKtraDH_KHDH_SpecN4;
          existingItem.SubKtraDH_KHDH_SpecN5 += item.SubKtraDH_KHDH_SpecN5;
          existingItem.SubKtraDH_KHDH_SpecN6 += item.SubKtraDH_KHDH_SpecN6;
          existingItem.SubKtraDH_KHDH_SpecN7 += item.SubKtraDH_KHDH_SpecN7;
          existingItem.SubKtraDH_KHDH_SpecN8 += item.SubKtraDH_KHDH_SpecN8;
          existingItem.SubKtraDH_KHDH_SpecN9 += item.SubKtraDH_KHDH_SpecN9;
          existingItem.SubKtraDH_KHDH_SpecN10 += item.SubKtraDH_KHDH_SpecN10;
          existingItem.SubKtraDH_KHDH_SpecN11 += item.SubKtraDH_KHDH_SpecN11;
          existingItem.SubKtraDH_KHDH_SpecN12 += item.SubKtraDH_KHDH_SpecN12;
        } else {
          accumulator.push({ ...item });
        }
        return accumulator;
      }, []);

      const total = updatedOutput.reduce(
        (sum: any, item: any) =>
          sum +
          item.OrdN1 +
          item.OrdN2 +
          item.OrdN3 +
          item.OrdN4 +
          item.OrdN5 +
          item.OrdN6 +
          item.OrdN7 +
          item.OrdN8 +
          item.OrdN9 +
          item.OrdN10 +
          item.OrdN11 +
          item.OrdN12,
        0
      );

      const finalOutput = updatedOutput.map((item: any, index: number) => ({
        ID: index + 1,
        ...item,
        TotalInYear:
          item.OrdN1 +
          item.OrdN2 +
          item.OrdN3 +
          item.OrdN4 +
          item.OrdN5 +
          item.OrdN6 +
          item.OrdN7 +
          item.OrdN8 +
          item.OrdN9 +
          item.OrdN10 +
          item.OrdN11 +
          item.OrdN12,
        Percent: (
          ((item.OrdN1 +
            item.OrdN2 +
            item.OrdN3 +
            item.OrdN4 +
            item.OrdN5 +
            item.OrdN6 +
            item.OrdN7 +
            item.OrdN8 +
            item.OrdN9 +
            item.OrdN10 +
            item.OrdN11 +
            item.OrdN12) /
            total) *
          100
        ).toFixed(3),
      }));

      setTotalModelCode(finalOutput);
      // setTotalModelCode(updatedOutput);
    }
  }, [data, searchCondition.YearPlan]);

  useEffect(() => {
    if (data) {
      const propertiesToSum = [
        "OrdN1",
        "OrdN2",
        "OrdN3",
        "OrdN4",
        "OrdN5",
        "OrdN6",
        "OrdN7",
        "OrdN8",
        "OrdN9",
        "OrdN10",
        "OrdN11",
        "OrdN12",
      ];
      data.map((item: any, index: any) => {
        let output = propertiesToSum.reduce(
          (sum, property) => sum + item[property],
          0
        );
        return (
          (item.ID = index + 1),
          (item[`Year${searchCondition.YearPlan}`] = output)
        );
      });
    }
  }, [data]);

  // =================================================================
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_TheoDoiKiemTraDatHang-columns",
  });

  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );
  const onHiding = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onApply = useCallback(
    (changes: any) => {
      const latest = [...changes];
      realColumns.forEach((column: ColumnOptions) => {
        const found = changes.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        if (!found) {
          column.visible = false;
          latest.push(column);
        }
      });
      setColumnsState(latest);
      setVisible(false);
    },
    [setColumnsState, setVisible]
  );

  const renderColumnChooser = useCallback(() => {
    return (
      <CustomColumnChooser
        title={t("ToggleColumn")}
        applyText={t("Apply")}
        cancelText={t("Cancel")}
        selectAllText={t("SelectAll")}
        container={"#gridContainer"}
        button={"#myColumnChooser"}
        visible={chooserVisible.visible}
        columns={columns}
        onHiding={onHiding}
        onApply={onApply}
        actualColumns={realColumns}
      />
    );
  }, [chooserVisible, realColumns, columns]);

  const allToolbarItems: ToolbarItemProps[] = [
    {
      location: "after",
      render: renderColumnChooser,
    },
  ];
  const onToolbarPreparing = useCallback((e: any) => {
    e.toolbarOptions.items.push({
      widget: "dxButton",
      location: "after",
      options: {
        icon: "/images/icons/settings.svg",
        elementAttr: {
          id: "myColumnChooser",
        },
        onClick: () => setVisible(!visible),
      },
    });
  }, []);

  useEffect(() => {
    const savedState = loadState() === undefined ? columns : loadState();

    if (savedState) {
      const columnOrders = savedState.map(
        (column: ColumnOptions) => column.dataField
      );
      const outputColumns = columns.map((column: ColumnOptions) => {
        const filterResult = savedState.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        return {
          ...column,
          visible: filterResult ? filterResult.visible ?? true : false,
        };
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setColumnsState(outputColumns);
    }
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
                storeKey={"Rpt_TheoDoiKiemTraDatHang-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={isLoading || listDealerLoading}
              showIndicator={true}
              showPane={true}
            />
            <div className={"w-full mt-4"}>
              <div className={"w-full mt-4"}>
                <ScrollView height={windowSize.height - 120}>
                  <Resizable minWidth={400} minHeight={150} maxHeight={370}>
                    <DataGrid
                      id={"gridContainer"}
                      autoNavigateToFocusedRow={true}
                      dataSource={totalModelCode ?? []}
                      showBorders={true}
                      showRowLines={true}
                      showColumnLines={true}
                      // columns={columns as any[]}
                      columnAutoWidth={true}
                      allowColumnResizing={true}
                      columnResizingMode="widget"
                      allowColumnReordering={false}
                      className={"mx-auto my-5"}
                      width={"100%"}
                      height="100%"
                      onToolbarPreparing={onToolbarPreparing}
                    >
                      {realColumns.map((col: any) => (
                        <Column key={col.dataField} {...col} />
                      ))}
                      <HeaderFilter visible={true}>
                        <Search enabled={true} />
                      </HeaderFilter>
                      <ColumnFixing enabled={true} />
                      <Scrolling showScrollbar={"always"} />
                      <Sorting mode={"multiple"} />
                      <Paging enabled={false} />
                      <Toolbar>
                        <Item>
                          <CustomColumnChooser
                            title={t("ToggleColumn")}
                            applyText={t("Apply")}
                            cancelText={t("Cancel")}
                            selectAllText={t("SelectAll")}
                            container={"#gridContainer"}
                            button={"#myColumnChooser"}
                            visible={visible}
                            columns={columns}
                            actualColumns={realColumns}
                            onHiding={onHiding}
                            onApply={onApply}
                          />
                        </Item>
                      </Toolbar>
                      <Summary>
                        {<TotalItem column={"OrdN1"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN2"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN3"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN4"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN5"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN6"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN7"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN8"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN9"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN10"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN11"} summaryType={"sum"} />}
                        {<TotalItem column={"OrdN12"} summaryType={"sum"} />}
                        {
                          <TotalItem
                            column={"TotalInYear"}
                            summaryType={"sum"}
                          />
                        }
                        {<TotalItem column={"Percent"} summaryType={"sum"} />}
                      </Summary>
                    </DataGrid>
                  </Resizable>
                  <Resizable>
                    <DataGrid
                      id={"gridContainer"}
                      dataSource={data ?? []}
                      showBorders={true}
                      showRowLines={true}
                      allowColumnResizing={true}
                      columnResizingMode="widget"
                      showColumnLines={true}
                      columns={columnsSecond as any[]}
                      columnAutoWidth={true}
                      allowColumnReordering={false}
                      className={"mx-auto my-5"}
                      width={"100%"}
                      height={"100%"}
                    >
                      <HeaderFilter visible={true}>
                        <Search enabled={true} />
                      </HeaderFilter>
                      <ColumnFixing enabled={true} />
                      <Scrolling showScrollbar={"always"} />
                      <Paging enabled={false} />
                      <Sorting mode={"multiple"} />
                    </DataGrid>
                  </Resizable>
                  <Resizable>
                    <DataGrid
                      id={"gridContainer"}
                      dataSource={totalModelCode ?? []}
                      showBorders={true}
                      showRowLines={true}
                      showColumnLines={true}
                      columns={columnsSecond as any[]}
                      allowColumnResizing={true}
                      columnResizingMode="widget"
                      columnAutoWidth={true}
                      allowColumnReordering={false}
                      className={"mx-auto my-5"}
                      width={"100%"}
                      height={"100%"}
                    >
                      <HeaderFilter visible={true}>
                        <Search enabled={true} />
                      </HeaderFilter>
                      <ColumnFixing enabled={true} />
                      <Scrolling showScrollbar={"always"} />
                      <Paging enabled={false} />
                      <Sorting mode={"multiple"} />
                    </DataGrid>
                  </Resizable>
                </ScrollView>
              </div>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
