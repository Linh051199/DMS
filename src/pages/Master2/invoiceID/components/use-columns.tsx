import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { Mst_InvoiceIDType } from "@/packages/types";
import { LinkCell } from "@/packages/ui/link-cell";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@packages/ui/base-gridview";

import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./store";

interface IuseColumn {
  data: Mst_InvoiceIDType[];
}

export const useColumn = ({ data }: IuseColumn) => {
  const { t } = useI18n("Base");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_InvoiceIDType) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      groupKey: "INFORMATION",
      caption: "Số hiệu hoá đơn",
      dataField: "InvoiceIDCode",
      editorType: "dxTextBox",
      columnIndex: 1,
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "InvoiceIDCode"),
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
      caption: "Ngày tạo",
      dataField: "CreatedDate",
      editorType: "dxDateBox",
      columnIndex: 1,
      editorOptions: {
        type: "date",
      },
      format: "yyyy-MM-dd",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "CreatedDate"),
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
