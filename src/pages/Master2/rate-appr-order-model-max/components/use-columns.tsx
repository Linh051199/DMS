import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { Mst_RateApprOrderModelMax } from "@/packages/types";
import { LinkCell } from "@/packages/ui/link-cell";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./store";

interface IuseColumn {
  data: Mst_RateApprOrderModelMax[];
}

export const useColumn = ({ data }: IuseColumn) => {
  const { t } = useI18n("Base");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_RateApprOrderModelMax) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      groupKey: "INFORMATION",
      caption: "Mã đại lý",
      dataField: "DealerCode",
      editorType: "dxSelectBox",
      columnIndex: 1,
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DealerCode"),
      },
      setCellValue: (
        newData: Partial<Mst_RateApprOrderModelMax>,
        value: string
      ) => {
        newData.DealerCode = value;
        newData.md_DealerName = value;
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên đại lý",
      dataField: "md_DealerName",
      editorType: "dxTextBox",
      columnIndex: 1,
      editorOptions: {
        readOnly: true,
      },
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "md_DealerName"),
      },
    },
    {
      groupKey: "INFORMATION",
      caption: "Mã model",
      dataField: "ModelCode",
      editorType: "dxSelectBox",
      columnIndex: 1,
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DealerCode"),
      },
      setCellValue: (
        newData: Partial<Mst_RateApprOrderModelMax>,
        value: string
      ) => {
        newData.ModelCode = value;
        newData.mcm_ModelName = value;
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tên model",
      dataField: "mcm_ModelName",
      editorType: "dxTextBox",
      columnIndex: 1,
      editorOptions: {
        readOnly: true,
      },
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "md_DealerName"),
      },
    },

    {
      groupKey: "INFORMATION",
      caption: "Tỉ lệ duyệt tối đa(%)",
      dataField: "RateApprMax",
      editorType: "dxTextBox",
      columnIndex: 2,
      editorOptions: {
        placeholder: "Nhập",
      },
      visible: true,

      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "RateApprMax"),
      },
    },
    {
      groupKey: "INFORMATION",

      headerFilter: {
        dataSource: filterByFlagActive(data, {
          true: t("Active"),
          false: t("Inactive"),
        }),
      },
      dataField: "FlagActive",
      caption: t("FlagActive"),
      editorType: "dxSwitch",
      columnIndex: 2,
      visible: true,
      alignment: "center",
      width: 120,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
  ];

  return columns;
};
