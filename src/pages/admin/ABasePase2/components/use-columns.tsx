import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { Mst_Dealer, Mst_Transporter } from "@/packages/types";
import { LinkCell } from "@/packages/ui/link-cell";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./base-store";

interface IUseBaseGridColumnsProps {
  data: Mst_Transporter[];
}

export const UseBaseGridColumns = ({ data }: IUseBaseGridColumnsProps) => {
  const { t } = useI18n("Base");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_Transporter) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "TransporterCode",
      caption: t("TransporterCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
      setCellValue: (newData: any, value: any) => {
        newData.DealerCode = value;
        newData.BUCode = `HTV.${value}`;
        newData.BUPattern = `HTV.${value}%`;
      },
      validationRules: [
        RequiredField(t("DealerCodeIsRequired")),
        ExcludeSpecialCharactersType,
      ],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "TransporterCode",
      caption: t("Dealer Type"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxSelectBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "TransporterCode"),
      },
    },
    {
      dataField: "FlagActive",
      caption: t("Status"),
      editorType: "dxSwitch",
      columnIndex: 2,
      headerFilter: {
        dataSource: filterByFlagActive(data ?? [], {
          true: t("Active"),
          false: t("Inactive"),
        }),
      },
      groupKey: "BASIC_INFORMATION",
      visible: true,
      width: 100,
      cellRender: ({ data }: any) => {
        return <StatusButton key={nanoid()} isActive={data.FlagActive} />;
      },
    },
  ];

  return columns;
};
