import { ColumnOptions } from "@packages/ui/base-gridview";
import {
  ExcludeSpecialCharactersType,
  requiredType,
} from "@packages/common/Validation_Rules";
import { filterByFlagActive, uniqueFilterByDataField } from "@packages/common";
import { StatusButton } from "@packages/ui/status-button";
import { useI18n } from "@/i18n/useI18n";
import { Mst_Quota } from "@packages/types";
import { useSetAtom } from "jotai";
import { viewingDataAtom } from "@/pages/Mst_Quota/components/store";
import { nanoid } from "nanoid";
import { LinkCell } from "@/packages/ui/link-cell";
import CustomStore from "devextreme/data/custom_store";
import { useClientgateApi } from "@/packages/api";
import { useCallback } from "react";

interface UseDealerGridColumnsProps {
  data: Mst_Quota[];
}
export const useColumn = ({ data }: UseDealerGridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_Quota) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };
  const api = useClientgateApi();

  const lookupSpecDataSource = useCallback((options: any, key: string) => {
    return {
      store: new CustomStore({
        key: "SpecCode",
        loadMode: "raw",
        load: () => {
          if (!options.data?.[key]) {
            return api.Mst_CarSpec_GetAllActive().then((resp: any) => {
              return resp.DataList ?? [];
            });
          }
          return api
            .Mst_CarSpec_GetByModelCode(options.data?.[key] ?? "*")
            .then((resp) => {
              return resp.DataList ?? [];
            })
            .catch(() => {
              throw "Network error";
            });
        },
      }),
      filter: options.data?.[key]
        ? ["ModelCode", "=", options.data?.[key]]
        : null,
      sort: "SpecName",
    };
  }, []);

  const { t } = useI18n("Dealer");
  const columns: ColumnOptions[] = [
    {
      groupKey: "INFORMATION",
      dataField: "QuotaCode", // Mã chương trình
      caption: t("QuotaCode"), // title hiển thị ở màn hình
      editorType: "dxTextBox", // kiểu của column ( trong trường hợp này là input )
      columnIndex: 1, // vị trí cột được hiển thị trong popup ở theo hàng dọc
      validationRules: [requiredType, ExcludeSpecialCharactersType], // validate, không đc viết ký tự đặc biệt
      cellRender: ({ data, rowIndex, value }: any) => {
        // customize lại cột
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
      headerFilter: {
        // hiển thị headerFilter dữ liệu của cột đó theo tiêu chuẩn nào đó
        dataSource: uniqueFilterByDataField(data, "QuotaCode", t("( Empty )")),
      },
    },
    {
      groupKey: "INFORMATION",
      dataField: "QuotaName", // Tên chương trình
      caption: t("QuotaName"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 1,
      validationRules: [requiredType, ExcludeSpecialCharactersType],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "QuotaName", t("( Empty )")),
      },
    },
    {
      groupKey: "INFORMATION",
      dataField: "DealerCode", // Mã đại lý
      caption: t("DealerCode"),
      editorType: "dxSelectBox",
      validationRules: [requiredType],
      columnIndex: 1,
      // login cái hàm này là dùng đếm các phần tử trùng nhau mà data trả về sau khi call api với dữ liệu trường trong tên (param) truyền vào
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DealerCode", t("( Empty )")),
      },
      setCellValue: (newData: Partial<Mst_Quota>, value: string) => {
        newData.DealerCode = value;
        newData.md_DealerName = value;
      },
    },
    {
      groupKey: "INFORMATION",
      dataField: "md_DealerName", // Tên đại lý
      caption: t("md_DealerName"),
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },
      columnIndex: 1,
      // login cái hàm này là dùng đếm các phần tử trùng nhau mà data trả về sau khi call api với dữ liệu trường trong tên (param) truyền vào
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "md_DealerName",
          t("( Empty )")
        ),
      },
    },
    {
      groupKey: "INFORMATION",
      dataField: "SOApprDateFrom", // ngày duyệt đơn hàng
      caption: t("SOApprDateFrom"),
      editorType: "dxDateBox",
      editorOptions: {
        type: "date",
      },
      format: "yyyy-MM-dd",
      columnIndex: 1,
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "SOApprDateFrom",
          t("( Empty )")
        ),
      },
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "SOApprDateToInit",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION",
      dataField: "SOApprDateToInit", // Ngày duyệt đơn hàng khởi tạo
      caption: t("SOApprDateToInit"),
      editorType: "dxDateBox",
      editorOptions: {
        type: "date",
      },
      format: "yyyy-MM-dd",
      columnIndex: 1,
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "SOApprDateTo",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION",
      dataField: "SOApprDateTo", // Ngày duyệt đơn hàng đến
      caption: t("SOApprDateTo"),
      editorType: "dxDateBox",
      editorOptions: {
        type: "date",
      },
      format: "yyyy-MM-dd",
      columnIndex: 1,
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "ModelCondition",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION LOW",
      dataField: "ModelCondition", //Model điều kiện
      caption: t("ModelCondition"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 1,
      setCellValue: (newData: Partial<Mst_Quota>, value: string) => {
        newData.ModelCondition = value;
        newData.mcm1_ModelNameCondition = value;
        newData.SpecCodeCondition = "";
        newData.mcs1_SpecDescriptionCondition = "";
      },
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "mcm1_ModelNameCondition",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION LOW",
      dataField: "mcm1_ModelNameCondition", // Tên model điều kiện
      caption: t("mcm1_ModelNameCondition"),
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },

      columnIndex: 2,
    },
    {
      headerFilter: {
        // Mã spec điều kiện
        dataSource: uniqueFilterByDataField(
          data,
          "SpecCodeCondition",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION LOW",
      dataField: "SpecCodeCondition",
      caption: t("SpecCodeCondition"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 1,
      lookup: {
        dataSource: (options: any) =>
          lookupSpecDataSource(options, "ModelCondition"),
        displayExpr: "SpecCode",
        valueExpr: "SpecCode",
      },
      setCellValue: (newData: Partial<Mst_Quota>, value: string) => {
        newData.SpecCodeCondition = value;
        newData.mcs1_SpecDescriptionCondition = value;
      },
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "mcs1_SpecDescriptionCondition",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION LOW",
      dataField: "mcs1_SpecDescriptionCondition", // Mô tả xe điều kiện
      caption: t("mcs1_SpecDescriptionCondition"),
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },
      columnIndex: 2,
    },
    //
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "ModelCondition",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION LOW",
      dataField: "ModelPromotion", //Model điều kiện
      caption: t("ModelPromotion"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 1,
      setCellValue: (newData: Partial<Mst_Quota>, value: string) => {
        newData.ModelPromotion = value;
        newData.mcm2_ModelNamePromotion = value;
        newData.SpecCodePromotion = "";
        newData.mcs2_SpecDescriptionPromotion = "";
      },
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "mcm2_ModelNamePromotion",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION LOW",
      dataField: "mcm2_ModelNamePromotion", // Tên model điều kiện
      caption: t("mcm2_ModelNamePromotion"),
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },
      columnIndex: 2,
    },
    //
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "SpecCodePromotion",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION LOW",
      dataField: "SpecCodePromotion", // Mã spec ưu đãi
      caption: t("SpecCodePromotion"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 1,
      lookup: {
        dataSource: (options: any) =>
          lookupSpecDataSource(options, "ModelPromotion"),
        displayExpr: "SpecCode",
        valueExpr: "SpecCode",
      },
      setCellValue: (newData: Partial<Mst_Quota>, value: string) => {
        newData.SpecCodePromotion = value;
        newData.mcs2_SpecDescriptionPromotion = value;
      },
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data,
          "mcs2_SpecDescriptionPromotion",
          t("( Empty )")
        ),
      },
      groupKey: "INFORMATION LOW",
      dataField: "mcs2_SpecDescriptionPromotion", //Mô tả ưu đãi
      caption: t("mcs2_SpecDescriptionPromotion"),
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },
      columnIndex: 2,
    },
    {
      groupKey: "INFORMATION LOW",
      dataField: "QtyCondition", //Số lượng điều kiện
      caption: t("QtyCondition"),
      editorType: "dxNumberBox",
      columnIndex: 2,
    },
    {
      groupKey: "INFORMATION LOW",
      dataField: "QtyPromotion", //Số lượng ưu đãi
      caption: t("QtyPromotion"),
      editorType: "dxNumberBox",
      columnIndex: 2,
    },
    {
      headerFilter: {
        dataSource: filterByFlagActive(data, {
          true: t("Active"),
          false: t("Inactive"),
        }),
      },
      groupKey: "INFORMATION",
      dataField: "FlagActive", // trạng thái
      caption: t("FlagActive"),
      editorType: "dxSwitch",
      columnIndex: 2,
      visible: true,
      alignment: "center",
      width: 120,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
  ];

  return columns;
};
