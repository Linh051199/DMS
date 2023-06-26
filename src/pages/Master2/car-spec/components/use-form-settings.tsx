import { useI18n } from "@/i18n/useI18n";
import { zip } from "@/packages/common";
import { Mst_CarSpec } from "@/packages/types";
import { ColumnOptions, FormOptions } from "@/types";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
  carSpecDs?: Mst_CarSpec[];
}

export const useFormSettings = ({
  columns: inputColumns,
  carSpecDs,
}: UseFormSettingsProps) => {
  const { t } = useI18n("Base");

  const columns = inputColumns.map((c) => {
    if (c.dataField === "ModelCode") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: (item: any) => (item ? `${item.ModelCode}` : ""),
          valueExpr: "ModelCode",
          searchEnabled: true,
          validationMessageMode: "always",
          items: carSpecDs ?? [],
        },
      };
    } else if (c.dataField === "RootSpec") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: (item: any) => (item ? `${item.RootSpec}` : ""),
          valueExpr: "RootSpec",
          searchEnabled: true,
          validationMessageMode: "always",
          items: carSpecDs ?? [],
        },
      };
    } else if (c.dataField === "StdOptCode") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: (item: any) => (item ? `${item.StdOptCode}` : ""),
          valueExpr: "StdOptCode",
          searchEnabled: true,
          validationMessageMode: "always",
          items: carSpecDs ?? [],
        },
      };
    } else if (c.dataField === "OCNCode") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: (item: any) => (item ? `${item.OCNCode}` : ""),
          valueExpr: "OCNCode",
          searchEnabled: true,
          validationMessageMode: "always",
          items: carSpecDs ?? [],
        },
      };
    } else if (c.dataField === "AssemblyStatus") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: (item: any) => (item ? `${item.AssemblyStatus}` : ""),
          valueExpr: "AssemblyStatus",
          searchEnabled: true,
          validationMessageMode: "always",
          items: carSpecDs ?? [],
        },
      };
    } else if (c.dataField === "FlagInvoiceFactory") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: (item: any) =>
            item ? `${item.FlagInvoiceFactory}` : "",
          valueExpr: "FlagInvoiceFactory",
          searchEnabled: true,
          validationMessageMode: "always",
          items: carSpecDs ?? [],
        },
      };
    } else if (c.dataField === "FlagAmbulance") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: (item: any) =>
            item ? `${item.FlagAmbulance}` : "",
          valueExpr: "FlagAmbulance",
          searchEnabled: true,
          validationMessageMode: "always",
          items: carSpecDs ?? [],
        },
      };
    }
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
        caption: t("BASIC_INFORMATION"),
        colCount: 2,
        cssClass: "collapsible form-group",
        items: zip(basicInformationFirstColumn, basicInformationSecondColumn),
      },
    ],
  };

  return formSettings;
};
