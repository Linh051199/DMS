import { useI18n } from "@/i18n/useI18n";
import { zip } from "@/packages/common";
import { ColumnOptions, FormOptions } from "@/types";

interface useFromSettingsPropos {
  columns: ColumnOptions[];
}

export const useFormSettings = ({
  columns: inputColumns,
}: useFromSettingsPropos) => {
  const { t } = useI18n("Transporter");
  const columns = inputColumns.map((c) => {
    // if (c.dataField === "TransporterCode") {
    //   return {
    //     ...c,
    //     visible: true,
    //     editorOptions: {
    //       displayExpr: (item: any) =>
    //         item ? `${item.TransporterCode} - ${item.TransporterCode}` : "",
    //       valueExpr: "TransporterCode",
    //       searchEnabled: true,
    //       validationMessageMode: "always",
    //       items: TransporterCode ?? [],
    //     },
    //   };
    // }
    return {
      ...c,
      visible: true,
    };
  });
  const basicInformationFirstColumn = columns.filter(
    (c) => c.groupKey === "BASIC_INFORMATION" && c.columnIndex === 1
  );
  const basicInformationSecondColumn = columns.filter(
    (c) => c.groupKey === "BASIC_INFORMATION" && c.columnIndex === 2
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
