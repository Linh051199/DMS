import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { Mst_CarColor, Mst_CarModel } from "@/packages/types";
import { LinkCell } from "@/packages/ui/link-cell";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./car-color-store";

interface IuseColumn {
  data: Mst_CarColor[];
}

export const useColumn = ({ data }: IuseColumn) => {
  const { t } = useI18n("Base");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_CarColor) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      groupKey: "INFORMATION",
      caption: "Mã Model",
      dataField: "ModelCode",
      editorType: "dxSelectBox",
      columnIndex: 1,
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ModelCode"),
      },
      //   validationRules: [requiredType, ExcludeSpecialCharactersType],
      cellRender: ({ data, rowIndex, value }: any) => {
        // customize column
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
    },
    {
      groupKey: "INFORMATION",
      caption: "Mã màu",
      dataField: "ColorCode",
      editorType: "dxTextBox",
      columnIndex: 1,
      visible: true,

      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ColorCode"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Mã màu ngoại thất",
      dataField: "ColorExtCode",
      editorType: "dxTextBox",
      columnIndex: 1,
      visible: true,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ColorExtCode"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên màu ngoại thất",
      dataField: "ColorExtName",
      editorType: "dxTextBox",
      columnIndex: 1,
      visible: true,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ColorExtName"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên màu ngoại thất(TV)",
      dataField: "ColorExtNameVN",
      editorType: "dxTextBox",
      columnIndex: 1,
      visible: false,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ColorExtNameVN"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Mã màu nội thất",
      dataField: "ColorIntCode",
      editorType: "dxTextBox",
      columnIndex: 2,
      visible: true,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ColorIntCode"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên màu nội thất",
      dataField: "ColorIntName",
      editorType: "dxTextBox",
      columnIndex: 2,
      visible: true,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ColorIntName"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên màu nội thất(TV)",
      dataField: "ColorIntNameVN",
      editorType: "dxTextBox",
      columnIndex: 2,
      visible: false,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ColorIntNameVN"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Loại màu",
      dataField: "ColorExtType",
      editorType: "dxSelectBox",
      columnIndex: 1,
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ColorExtType"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Chi phí màu",
      dataField: "ColorFee",
      editorType: "dxTextBox",
      columnIndex: 2,
      visible: true,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ColorFee"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Ghi chú",
      dataField: "Remark",
      editorType: "dxTextBox",
      columnIndex: 2,
      visible: true,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "Remark"),
      },
    },
    {
      groupKey: "INFORMATION",

      headerFilter: {
        dataSource: filterByFlagActive(data, {
          true: t("Active"),
          false: t("Inactive"),
        }),
      },
      dataField: "FlagActive",
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
