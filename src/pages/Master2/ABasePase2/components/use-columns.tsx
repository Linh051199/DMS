import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { Mst_CarStdOpt } from "@/packages/types";
import { LinkCell } from "@/packages/ui/link-cell";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./base-store";

interface IuseColumn {
  data: Mst_CarStdOpt[];
}

export const useColumn = ({ data }: IuseColumn) => {
  const { t } = useI18n("Base");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_CarStdOpt) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      groupKey: "INFORMATION",
      caption: "Mã StandarOption",
      dataField: "StdOptCode",
      editorType: "dxTextBox",
      columnIndex: 1,
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "StdOptCode"),
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
      editorOptions: {
        placeholder: "Nhập",
      },
    },
    {
      groupKey: "INFORMATION",
      caption: "Mô tả",
      dataField: "StdOptDescription",
      editorType: "dxTextBox",
      columnIndex: 1,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "StdOptDescription"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Mã Model",
      dataField: "ModelCode",
      editorType: "dxSelectBox",
      columnIndex: 1,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ModelCode"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Mã Grande",
      dataField: "GradeCode",
      editorType: "dxTextBox",
      columnIndex: 2,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "GradeCode"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Mô tả Grande",
      dataField: "GradeDescription",
      editorType: "dxTextBox",
      columnIndex: 2,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "GradeDescription"),
      },
    },
  ];

  return columns;
};
