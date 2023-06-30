import { useI18n } from "@/i18n/useI18n";
import { ProvinceDto } from "@/packages/api/clientgate/Mst_ProvinceApi";
import { zip } from "@/packages/common";
import { ColumnOptions, FormOptions } from "@/types";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
  listProvinceCode: any[];
  listBank: any[];
}

export const useFormSettings = ({
  columns: inputColumns,
  listProvinceCode,
  listBank,
}: UseFormSettingsProps) => {
  const { t } = useI18n("Base");

  const columns = inputColumns.map((c) => {
    if (c.dataField === "ProvinceCode") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "ProvinceCode",
          valueExpr: "ProvinceCode",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: listProvinceCode ?? [],
        },
      };
    } else if (c.dataField === "BankCodeParent") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "BankCodeParent",
          valueExpr: "BankCodeParent",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: listBank ?? [],
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
  const lowInformationFirstColumn = columns.filter(
    (c) => c.groupKey === "INFORMATION_LOW" && c.columnIndex === 1
  );
  const lowInformationSecondColumn = columns.filter(
    (c) => c.groupKey === "INFORMATION_LOW" && c.columnIndex === 2
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
      {
        itemType: "group",
        caption: "",
        colCount: 2,
        cssClass: "collapsible form-group",
        items: zip(lowInformationFirstColumn, lowInformationSecondColumn),
      },
    ],
  };
  return formSettings;
};
