import { useI18n } from "@/i18n/useI18n";
import { zip } from "@/packages/common";
import { Mst_Bank, Mst_Dealer } from "@/packages/types";
import { ColumnOptions, FormOptions } from "@/types";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
  listDealer?: Mst_Dealer[];
  listBankCode?: Mst_Bank[];
}

export const useFormSettings = ({
  columns: inputColumns,
  listDealer,
  listBankCode,
}: UseFormSettingsProps) => {
  const { t } = useI18n("Base");

  const columns = inputColumns.map((c) => {
    if (c.dataField === "DealerCode") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "DealerCode",
          valueExpr: "DealerCode",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: listDealer ?? [],
        },
      };
    }
    if (c.dataField === "md_DealerName") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "DealerName",
          valueExpr: "DealerCode",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: listDealer ?? [],
        },
      };
    }

    if (c.dataField === "BankCode") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "BankCode",
          valueExpr: "BankCode",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: listBankCode ?? [],
        },
      };
    }
    if (c.dataField === "mb_BankName") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "BankName",
          valueExpr: "BankCode",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: listBankCode ?? [],
        },
      };
    }
    return {
      ...c,
      visible: true,
    };
  });

  const basicInformationFirstColumn = columns.filter(
    (c) => c.groupKey === "INFORMATION" && c.columnIndex === 1
  );
  const basicInformationSecondColumn = columns.filter(
    (c) => c.groupKey === "INFORMATION" && c.columnIndex === 2
  );

  const formSettings: FormOptions = {
    colCount: 1,
    labelLocation: "left",
    items: [
      {
        itemType: "group",
        caption: "Thông tin cơ bản",
        colCount: 2,
        cssClass: "collapsible form-group",
        items: zip(basicInformationFirstColumn, basicInformationSecondColumn),
      },
    ],
  };
  return formSettings;
};
