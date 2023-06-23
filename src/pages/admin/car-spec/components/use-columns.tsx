import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { Mst_CarSpec } from "@/packages/types";
import { LinkCell } from "@/packages/ui/link-cell";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./car-spec-store";

interface IUseBaseGridColumnsProps {
  data: Mst_CarSpec[];
}

export const UseCarSpecGridColumns = ({ data }: IUseBaseGridColumnsProps) => {
  const { t } = useI18n("Base");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_CarSpec) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    // {
    //   dataField: "TransporterCode",
    //   caption: t("TransporterCode"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   cellRender: ({ data, rowIndex, value }: any) => {
    //     return (
    //       <LinkCell
    //         key={nanoid()}
    //         onClick={() => viewRow(rowIndex, data)}
    //         value={value}
    //       />
    //     );
    //   },
    //   setCellValue: (newData: any, value: any) => {
    //     newData.DealerCode = value;
    //     newData.BUCode = `HTV.${value}`;
    //     newData.BUPattern = `HTV.${value}%`;
    //   },
    //   validationRules: [
    //     RequiredField(t("DealerCodeIsRequired")),
    //     ExcludeSpecialCharactersType,
    //   ],
    //   editorOptions: {
    //     placeholder: t("Input"),
    //     validationMessageMode: "always",
    //   },
    // },

    {
      dataField: "ModelCode",
      caption: "Mã Model",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxSelectBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ModelCode"),
      },
    },
    {
      dataField: "SpecCode",
      caption: "Mã spec",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "SpecCode"),
      },
    },
    {
      dataField: "RootSpec",
      caption: "RootSpec",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxSelectBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "RootSpec"),
      },
    },
    {
      dataField: "SpecDescription",
      caption: "Mô tả spec",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "SpecDescription"),
      },
    },
    {
      dataField: "StdOptCode",
      caption: "Mã StandarOption",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxSelectBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "StdOptCode"),
      },
    },

    {
      dataField: "OCNCode",
      caption: "Mã OCN",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxSelectBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "OCNCode"),
      },
    },

    {
      dataField: "GradeCode",
      caption: "Mã Grande",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "GradeCode"),
      },
    },

    {
      dataField: "AssemblyStatus",
      caption: "Trạng thái lắp ráp",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxSelectBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "AssemblyStatus"),
      },
    },

    {
      dataField: "FlagInvoiceFactory",
      caption: "Cần số hoá đơn nhà máy",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxSelectBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FlagInvoiceFactory"),
      },
    },

    {
      dataField: "FlagAmbulance",
      caption: "Là xe cứu thương",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxSelectBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FlagAmbulance"),
      },
    },

    {
      dataField: "NumberOfSeats",
      caption: "Số chỗ ngồi",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "NumberOfSeats"),
      },
    },

    {
      dataField: "QuotaDate",
      caption: "Ngày tính Quota mapVIN",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "QuotaDate"),
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
