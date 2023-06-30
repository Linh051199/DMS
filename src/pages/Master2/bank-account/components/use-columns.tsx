import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { Mst_BankAccount } from "@/packages/types";
import { LinkCell } from "@/packages/ui/link-cell";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./bank-account-store";

interface IuseColumn {
  data: Mst_BankAccount[];
}

export const useColumn = ({ data }: IuseColumn) => {
  const { t } = useI18n("Base");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_BankAccount) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const flagEditorOptions = {
    searchEnabled: true,
    valueExpr: "value",
    displayExpr: "text",
    items: [
      {
        value: "1",
        text: "1",
      },
      {
        value: "0",
        text: "0",
      },
    ],
  };

  const columns: ColumnOptions[] = [
    {
      groupKey: "INFORMATION",
      caption: "Số tài khoản",
      dataField: "AccountNo",
      editorType: "dxTextBox",
      columnIndex: 1,
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "AccountNo"),
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
      caption: "Tên tài khoản",
      dataField: "AccountName",
      editorType: "dxTextBox",
      columnIndex: 1,
      visible: true,

      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "AccountName"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Mã đại lý",
      dataField: "DealerCode",
      editorType: "dxSelectBox",
      columnIndex: 1,
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DealerCode"),
      },
      setCellValue: (newData: Partial<Mst_BankAccount>, value: string) => {
        newData.DealerCode = value;
        newData.md_DealerName = value;
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên đại lý",
      dataField: "md_DealerName",
      editorType: "dxTextBox",
      columnIndex: 1,
      editorOptions: {
        readOnly: true,
      },
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "md_DealerName"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Mã ngân hàng",
      dataField: "BankCode",
      editorType: "dxSelectBox",
      columnIndex: 2,
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "BankCode"),
      },
      setCellValue: (newData: Partial<Mst_BankAccount>, value: string) => {
        newData.BankCode = value;
        newData.mb_BankName = value;
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên ngân hàng",
      dataField: "mb_BankName",
      editorType: "dxTextBox",
      columnIndex: 2,
      editorOptions: {
        readOnly: true,
      },
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "mb_BankName"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Là tài khoản công văn",
      dataField: "FlagAccGrtClaim",
      editorType: "dxSelectBox",
      columnIndex: 2,

      editorOptions: flagEditorOptions,
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FlagAccGrtClaim"),
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
