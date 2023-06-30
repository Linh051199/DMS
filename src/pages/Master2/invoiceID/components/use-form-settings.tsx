import { useI18n } from "@/i18n/useI18n";
import { zip } from "@/packages/common";
import { ColumnOptions, FormOptions } from "@/types";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
}

export const useFormSettings = ({
  columns: inputColumns,
}: UseFormSettingsProps) => {
  const { t } = useI18n("Base");

  const columns = inputColumns.map((c) => {
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
