import { useI18n } from "@/i18n/useI18n";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { Mst_Transporter } from "@/packages/types";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { StatusButton } from "@/packages/ui/status-button";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./transporter-store";
import { LinkCell } from "@/packages/ui/link-cell";
import { useCallback } from "react";
import CustomStore from "devextreme/data/custom_store";
import { useClientgateApi } from "@/packages/api";

interface UseTransporterGridColumns {
  data: Mst_Transporter[];
}

export const useTransporterGridColumns = ({
  data,
}: UseTransporterGridColumns) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const api = useClientgateApi();

  const viewRow = (rowIndex: number, data: Mst_Transporter) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  // const lookupSpecDataSource = useCallback((options: any, key: string) => {
  //   return {
  //     store: new CustomStore({
  //       key: "SpecCode",
  //       loadMode: "raw",
  //       load: () => {
  //         if (!options.data?.[key]) {
  //           return api.Mst_Transporter_GetAllActive().then((resp: any) => {
  //             return resp.DataList ?? [];
  //           });
  //         }
  //         return api
  //           .Mst_CarSpec_GetByModelCode(options.data?.[key] ?? "*")
  //           .then((resp) => {
  //             return resp.DataList ?? [];
  //           })
  //           .catch(() => {
  //             throw "Network error";
  //           });
  //       },
  //     }),
  //     filter: options.data?.[key]
  //       ? ["ModelCode", "=", options.data?.[key]]
  //       : null,
  //     sort: "SpecName",
  //   };
  // }, []);

  const { t } = useI18n("Transporter");
  const columns: ColumnOptions[] = [
    {
      groupKey: "BASIC_INFORMATION",
      dataField: "TransporterCode", // Mã chương trình
      caption: t("QuotaCode"), // title hiển thị ở màn hình
      editorType: "dxTextBox", // kiểu của column ( trong trường hợp này là input )
      columnIndex: 1, // vị trí cột được hiển thị trong popup ở theo hàng dọc
      validationRules: [requiredType,ExcludeSpecialCharactersType], // validate, không đc viết ký tự đặc biệt
      cellRender: ({ data, rowIndex, value }: any) => {
        // customize lại cột
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
      headerFilter: {
        // hiển thị headerFilter dữ liệu của cột đó theo tiêu chuẩn nào đó
        dataSource: uniqueFilterByDataField(data, "TransporterCode", t("( Empty )")),
      },
    },
    // {
    //   groupKey: "BASIC_INFORMATION",
    //   dataField: "TransporterCode", // Mã chương trình
    //   caption: "Mã DVVT", // title hiển thị ở màn hình
    //   editorType: "dxTextBox", // kiểu của column ( trong trường hợp này là input )
    //   columnIndex: 1, // vị trí cột được hiển thị trong popup ở theo hàng dọc
    //   validationRules: [requiredType,ExcludeSpecialCharactersType], // validate, không đc viết ký tự đặc biệt
    //   cellRender: ({ data, rowIndex, value }: any) => {
    //     // customize lại cột
    //     return (
    //       <LinkCell
    //         key={nanoid()}
    //         onClick={() => viewRow(rowIndex, data)}
    //         value={value}
    //       />
    //     );
    //   },
    //   headerFilter: {
    //     // hiển thị headerFilter dữ liệu của cột đó theo tiêu chuẩn nào đó
    //     dataSource: uniqueFilterByDataField(data, "TransporterCode", t("( Empty )")),
    //   },
    // },

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
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
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
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
      },
    },

    {
      dataField: "Address",
      caption: "Địa chỉ",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "Address"),
      },
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
      },
    },

    {
      dataField: "PhoneNo",
      caption: "Số điện thoại",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PhoneNo"),
      },
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
      },
    },

    {
      dataField: "FaxNo",
      caption: "Số FAX",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FaxNo"),
      },
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
      },
    },

    {
      dataField: "DirectorFullName",
      caption: "Tên giám đốc",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DirectorFullName"),
      },
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
      },
    },

    {
      dataField: "DirectorPhoneNo",
      caption: "Số điện thoại giám đốc",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DirectorPhoneNo"),
      },
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
      },
    },

    {
      dataField: "ContactorFullName",
      caption: "Tên người đại diện",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ContactorFullName"),
      },
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
      },
    },

    {
      dataField: "ContactorPhoneNo",
      caption: "Số điện thoại người đại diện",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "ContactorPhoneNo"),
      },
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
      },
    },

    {
      dataField: "Remark",
      caption: "Ghi chú",
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "Remark"),
      },
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Nhập vào",
      },
    },
    {
      dataField: "FlagActive",
      caption: "Trạng thái",
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
