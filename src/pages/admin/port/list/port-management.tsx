import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  ExcludeSpecialCharactersType,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, SearchParam } from "@/packages/types";
import { BaseGridView } from "@/packages/ui/base-gridview";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import DataGrid, { HeaderFilter } from "devextreme-react/data-grid";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemAtom } from "../components/screen-atom";
import HeaderPart from "./header-part";
import "./port-management.scss";

export const PortManagementPage = () => {
  const { t } = useI18n("Port");
  const api = useClientgateApi();
  const keyWord = useAtomValue(keywordAtom);
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom);
  const gridRef: any = useRef<DataGrid>(null);
  const selectedItems = useSetAtom(selectedItemAtom);

  //Call API
  const {
    data: PortData,
    isLoading,
    refetch,
  } = useQuery(["Port", keyWord], () =>
    api.Mst_Port_Search({
      KeyWord: keyWord,
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as SearchParam)
  );

  useEffect(() => {
    if (!!PortData && !PortData?.DataList) {
      showError({
        message: t(PortData.errorCode),
        debugInfo: PortData.debugInfo,
        errorInfo: PortData.errorInfo,
      });
    }
  }, [PortData]);

  const { data: ProvinceCode } = useQuery(["ProvinceCode"], () =>
    api.Mst_Province_Search({
      KeyWord: "",
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as SearchParam)
  );

  //Headerpart
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_Port_Upload(file);
    if (resp.isSuccess) {
      toast.success(t("UploadSuccessfully"));
      await refetch();
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const onDownloadTemplate = async () => {
    const resp = await api.Mst_Port_DownloadTemplate();
    if (resp.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = resp.Data;
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  //BaseGridView
  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: "Mã cảng",
        dataField: "PortCode",
        editorType: "dxTextBox",
        width: 200,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(PortData?.DataList, "PortCode"),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Loại cảng",
        dataField: "PortType",
        editorType: "dxSelectBox",
        width: 200,
        visible: true,
        editorOptions: {
          dataSource: PortData?.DataList ?? [],
          validationMessage: "always",
          displayExpr: "PortType",
          valueExpr: "PortType",
          searchEnabled: true,
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            PortData?.DataList,
            "PortType",
            t("( Empty )")
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Tên cảng",
        dataField: "PortName",
        editorType: "dxTextBox",
        width: 350,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(PortData?.DataList, "PortName"),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Địa chỉ cảng",
        dataField: "PortAddress",
        editorType: "dxTextBox",
        width: 300,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(
            PortData?.DataList,
            "PortAddress"
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Mã tỉnh",
        dataField: "ProvinceCode",
        editorType: "dxSelectBox",
        width: 300,
        visible: true,
        editorOptions: {
          dataSource: ProvinceCode?.DataList ?? [],
          validationMessage: "always",
          displayExpr: "ProvinceCode",
          valueExpr: "ProvinceCode",
          searchEnabled: true,
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            PortData?.DataList,
            "ProvinceCode",
            t("( Empty )")
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Trạng thái",
        dataField: "FlagActive",
        editorType: "dxSwitch",
        dataType: "boolean",
        visible: true,
        alignment: "center",
        cellRender: (data: any) => {
          return <StatusButton isActive={data.FlagActive} />;
        },
        HeaderFilter: {
          dataSource: filterByFlagActive(PortData?.DataList, {
            true: t("Active"),
            false: t("InActive"),
          }),
        },
      },
    ],
    [PortData, ProvinceCode]
  );

  const handleGridReady = (grid: any) => {
    gridRef.current = grid;
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "PortCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "PortType") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "ProvinceCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      if (e.row?.isNewRow) {
        e.editorOptions.value = true;
      }
    }
  };

  const handleGridSelectionChanged = (rowKeys: string[]) => {
    selectedItems(rowKeys);
  };

  const handleDelete = async (key: string) => {
    const resp = await api.Mst_Port_Delete(key);
    if (resp.isSuccess) {
      toast.success("Delete Successfully");
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
  };

  const handleCreate = async (data: any) => {
    const res = await api.Mst_Port_Create({ ...data });
    if (res.isSuccess) {
      toast.success(t("CreateSuccessfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(res.errorCode),
      debugInfo: res.debugInfo,
      errorInfo: res.errorInfo,
    });
    throw new Error(res.errorCode);
  };

  const handleUpdate = async (key: string, data: any) => {
    const resp = await api.Mst_Port_Update(key, data);
    if (resp.isSuccess) {
      toast.success("Update Successfully");
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
    throw new Error(resp.errorCode);
  };

  const handleSaveRow = async (e: any) => {
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = handleDelete(id);
      } else if (type === "insert") {
        console.log("toggle");
        let newData = e.changes[0].data!;
        if (!Object.keys(newData).includes("FlagActive")) {
          newData = { ...newData, FlagActive: true };
        }
        e.promise = handleCreate(newData);
      } else if (type === "update") {
        e.promise = handleUpdate(e.changs[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_Port_DeleteMultiple(rows);
    if (resp.isSuccess) {
      toast.success(t("DeleteSuccessfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
    throw new Error(resp.errorCode);
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name={"Before"}>
            <div className="font-bold dx-font-m">Quản lý cảng</div>
          </PageHeaderLayout.Slot>

          <PageHeaderLayout.Slot name={"Center"}>
            <HeaderPart
              onAddNew={handleAddNew}
              onUploadFile={handleUploadFile}
              onDownloadTemplate={onDownloadTemplate}
            />
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <BaseGridView
          keyExpr="PortCode"
          storeKey={"port-columns"}
          defaultPageSize={config.PAGE_SIZE_10}
          isLoading={isLoading}
          dataSource={PortData?.DataList ?? []}
          columns={columns}
          allowSelection={true}
          allowInlineEdit={true}
          inlineEditMode={"row"}
          onReady={handleGridReady}
          onEditorPreparing={handleEditorPreparing}
          onSelectionChanged={handleGridSelectionChanged}
          onSaveRow={handleSaveRow}
          onDeleteRows={handleDeleteRows}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
