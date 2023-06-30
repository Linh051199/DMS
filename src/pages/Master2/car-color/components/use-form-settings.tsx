import { useI18n } from "@/i18n/useI18n";
import { zip } from "@/packages/common";
import { Mst_CarColor, Mst_CarModel } from "@/packages/types";
import { ColumnOptions, FormOptions } from "@/types";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
  listCarModel: Mst_CarModel[];
  listCarColor: Mst_CarColor[];
}

export const useFormSettings = ({
  columns: inputColumns,
  listCarModel,
  listCarColor,
}: UseFormSettingsProps) => {
  const { t } = useI18n("Base");

  const columns = inputColumns.map((c) => {
    if (c.dataField === "ModelCode") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "ModelCode",
          valueExpr: "ModelCode",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: listCarModel ?? [],
        },
      };
    } else if (c.dataField === "ColorExtType") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "ColorExtType",
          valueExpr: "ColorExtType",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: listCarColor ?? [],
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
