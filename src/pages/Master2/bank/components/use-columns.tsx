import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { Mst_Bank } from "@/packages/types";
import { LinkCell } from "@/packages/ui/link-cell";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./bank-store";

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

interface IuseColumn {
  data: Mst_Bank[];
}

export const useColumn = ({ data }: IuseColumn) => {
  const { t } = useI18n("Mst_Bank");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_Bank) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      groupKey: "INFORMATION",
      caption: "Mã ngân hàng",
      dataField: "BankCode",
      editorType: "dxTextBox",
      columnIndex: 1,
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "BankCode"),
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
      setCellValue: (newData: any, value: any) => {
        newData.BankCode = value;
        newData.BankBUCode = `HTV.${value}`;
        newData.BankBUPattern = `HTV.${value}%`;
      },
      editorOptions: {
        placeholder: "Nhập",
      },
    },
    {
      groupKey: "INFORMATION",
      caption: "Mã ngân hàng cha",
      dataField: "BankCodeParent",
      editorType: "dxSelectBox",
      columnIndex: 1,
      editorOptions: {
        placeholder: "Nhập",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "BankCodeParent"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên ngân hàng",
      dataField: "BankName",
      editorType: "dxTextBox",
      columnIndex: 1,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "BankName"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Số điện thoại",
      dataField: "PhoneNo",
      editorType: "dxTextBox",
      columnIndex: 1,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PhoneNo"),
      },
    },

    {
      groupKey: "INFORMATION_LOW",
      caption: "Số Fax",
      dataField: "FaxNo",
      editorType: "dxTextBox",
      columnIndex: 1,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FaxNo"),
      },
    },

    {
      groupKey: "INFORMATION_LOW",
      caption: t("BenBankCode"),
      dataField: "BenBankCode",
      editorType: "dxTextBox",
      columnIndex: 1,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "BenBankCode"),
      },
    },

    {
      groupKey: "INFORMATION_LOW",
      caption: "BU Code",
      dataField: "BankBUCode",
      editorType: "dxTextBox",
      columnIndex: 1,
      editorOptions: {
        readOnly: true,
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "BankBUCode"),
      },
    },

    {
      groupKey: "INFORMATION_LOW",
      caption: "BU Pattern",
      dataField: "BankBUPattern",
      editorType: "dxTextBox",
      columnIndex: 1,
      editorOptions: {
        readOnly: true,
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "BankBUPattern"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Email",
      dataField: "PICEmail",
      editorType: "dxTextBox",
      columnIndex: 2,
      width: 300,
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PICEmail"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Địa chỉ",
      dataField: "Address",
      editorType: "dxTextBox",
      columnIndex: 2,
      width: 300,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "Address"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tỉnh/TP",
      dataField: "ProvinceCode",
      editorType: "dxSelectBox",
      columnIndex: 1,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ProvinceCode"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Là ngân hàng thế chấp",
      dataField: "FlagMortageBank",
      editorType: "dxSelectBox",
      editorOptions: flagEditorOptions,
      columnIndex: 2,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FlagMortageBank"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Là ngân hàng giám sát",
      dataField: "FlagMonitorBank",
      editorType: "dxSelectBox",
      editorOptions: flagEditorOptions,
      columnIndex: 2,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FlagMonitorBank"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Là ngân hàng nhận",
      dataField: "FlagPaymentBank",
      columnIndex: 2,
      editorType: "dxSelectBox",
      editorOptions: flagEditorOptions,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FlagPaymentBank"),
      },
    },

    {
      groupKey: "INFORMATION_LOW",
      headerFilter: {
        dataSource: filterByFlagActive(data, {
          true: t("Active"),
          false: t("Inactive"),
        }),
      },
      dataField: "FlagActive",
      caption: "Trạng thái",
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
