import { useI18n } from "@/i18n/useI18n";
import {
  filterByFlagActive,
  flagEditorOptions,
  uniqueFilterByDataField,
} from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { Mst_BankDealer, Mst_Dealer } from "@/packages/types";
import { LinkCell } from "@/packages/ui/link-cell";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./bank-dealer-store";

interface IuseColumn {
  data: Mst_BankDealer[];
  listBankCode: any[];
  listDealerCode: Mst_Dealer[];
}

export const useColumnEdit = ({
  data,
  listBankCode,
  listDealerCode,
}: IuseColumn) => {
  const { t } = useI18n("Base");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_BankDealer) => {
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

  const findBankName = (id: any) => {
    let bankName = listBankCode.find((l) => {
      return l.BankCode === id;
    });
    return bankName.BankName;
  };

  const findDealerName = (id: any) => {
    let dealerName = listDealerCode.find((l) => {
      return l.DealerCode === id;
    });
    return dealerName?.DealerName;
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
      setCellValue: (newData: Partial<Mst_BankDealer>, value: string) => {
        newData.BankCode = value;
        newData.BankName = findBankName(value);
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên ngân hàng",
      dataField: "BankName",
      editorType: "dxTextBox",
      columnIndex: 1,
      editorOptions: {
        readOnly: true,
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "BankName"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Mã đại lý",
      dataField: "DealerCode",
      editorType: "dxTextBox",
      columnIndex: 1,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DealerCode"),
      },
      setCellValue: (newData: Partial<Mst_BankDealer>, value: string) => {
        newData.DealerCode = value;
        newData.DealerName = findDealerName(value);
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên đại lý",
      dataField: "DealerName",
      editorType: "dxTextBox",
      columnIndex: 1,
      editorOptions: {
        readOnly: true,
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DealerName"),
      },
    },
    {
      groupKey: "INFORMATION",
      caption: "Là ngân hàng bảo lãnh",
      dataField: "FlagBankGrt",
      editorType: "dxSelectBox",
      columnIndex: 2,
      editorOptions: flagEditorOptions,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FlagBankGrt"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Là ngân hàng cho vay",
      dataField: "FlagBankPmt",
      editorType: "dxSelectBox",
      columnIndex: 2,
      editorOptions: flagEditorOptions,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FlagBankPmt"),
      },
    },
  ];

  return columns;
};
