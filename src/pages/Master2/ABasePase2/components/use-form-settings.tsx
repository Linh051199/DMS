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
    //   if (c.dataField === "ModelCode") {
    //   return {
    //     ...c,
    //     visible: true,
    //     editorOptions: {
    //       displayExpr: "ModelCode",
    //       valueExpr: "ModelCode",
    //       searchEnabled: true,
    //       validationMessageMode: "always",
    //       dataSource: ModelCodeDs ?? [],
    //     },
    //   };
    // }

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
