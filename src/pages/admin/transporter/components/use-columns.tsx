import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { Mst_Transporter } from "@/packages/types";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { StatusButton } from "@/packages/ui/status-button";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./transporter-store";

interface UseTransporterGridColumns {
  data: Mst_Transporter[];
}

export const useTransporterGridColumns = ({
  data,
}: UseTransporterGridColumns) => {
  const setViewingItem = useSetAtom(viewingDataAtom);

  const viewRow = (rowIndex: number, data: Mst_Transporter) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const { t } = useI18n("Transporter");
  const columns: ColumnOptions[] = [
    {
      dataField: "TransporterCode",
      caption: "Mã DVVT",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "TransporterCode"),
      },
    },

    {
      dataField: "TransporterName",
      caption: "Tên DVVT",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "TransporterName"),
      },
    },

    {
      dataField: "TransportContractNo",
      caption: "Số hợp đồng",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "TransportContractNo"),
      },
    },

    {
      dataField: "Address",
      caption: "Địa chỉ",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "Address"),
      },
    },

    {
      dataField: "PhoneNo",
      caption: "Số điện thoại",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PhoneNo"),
      },
    },

    {
      dataField: "FaxNo",
      caption: "Số FAX",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FaxNo"),
      },
    },

    {
      dataField: "DirectorFullName",
      caption: "Tên giám đốc",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DirectorFullName"),
      },
    },

    {
      dataField: "DirectorPhoneNo",
      caption: "Số điện thoại giám đốc",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DirectorPhoneNo"),
      },
    },

    {
      dataField: "ContactorFullName",
      caption: "Tên người đại diện",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ContactorFullName"),
      },
    },

    {
      dataField: "ContactorPhoneNo",
      caption: "Số điện thoại người đại diện",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ContactorPhoneNo"),
      },
    },

    {
      dataField: "Remark",
      caption: "Ghi chú",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "Remark"),
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
  // return array of the first item only

  return columns;
};
