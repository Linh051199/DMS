import { useI18n } from "@/i18n/useI18n";
import { zip } from "@/packages/common";
import { Mst_CarModel, Mst_CarStdOpt } from "@/packages/types";
import { ColumnOptions, FormOptions } from "@/types";

interface IUseColumnSettingsProps {
  columns: ColumnOptions[];
  CarStdOptDs?: Mst_CarStdOpt[];
  ModelCodeDs?: Mst_CarModel[];
}

export const useFormSettings = ({
  columns: inputColumn,
  CarStdOptDs,
  ModelCodeDs,
}: IUseColumnSettingsProps) => {
  const { t } = useI18n("Mst_CarStdOpt");

  const columns = inputColumn.map((c) => {
    if (c.dataField === "ModelCode") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "ModelCode",
          valueExpr: "ModelCode",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: ModelCodeDs ?? [],
        },
      };
    }

    return {
      ...c,
      visible: true,
    };
  });

  const listInfo = columns.filter((c) => c.groupKey === "INFORMATION");

  // const listInfoFirstColumn = columns.filter(
  //   (c) => c.groupKey === "INFORMATION" && c.columnIndex === 1
  // );
  // const listInfoSecondColumn = columns.filter(
  //   (c) => c.groupKey === "INFORMATION" && c.columnIndex === 2
  // );
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
        disableCollapsible: true,
        caption: "Thông tin",
        colCount: 2,
        cssClass: "collapsible form-group",
        items: zip(basicInformationFirstColumn, basicInformationSecondColumn),
      },
    ],
  };
  return formSettings;
};
