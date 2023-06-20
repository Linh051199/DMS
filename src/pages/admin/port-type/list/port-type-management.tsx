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
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import HeaderPart from "./header-part";
import "./port-type-management.scss";

const PAGE_SIZE = 10;

export const PortTypeManagementPage = () => {
  const { t } = useI18n("PortType");
  const keyword = useAtomValue(keywordAtom);
  const api = useClientgateApi();
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom);
  const gridRef: any = useRef<DataGrid>(null);
  const setSlecteditems = useSetAtom(selectedItemsAtom);

  //Call API
  const {
    data: PortTypeData,
    isLoading,
    refetch,
  } = useQuery(["port-type", keyword], () =>
    api.getPortType({
      KeyWord: keyword,
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as SearchParam)
  );

  useEffect(() => {
    if (!!PortTypeData && !PortTypeData.isSuccess) {
      showError({
        message: t(PortTypeData.errorCode),
        debugInfo: PortTypeData.debugInfo,
        errorInfo: PortTypeData.errorInfo,
      });
    }
  }, [PortTypeData]);

  //HederPart
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  const handleUploadFile = async (file: File) => {
    const resp = await api.Mst_Port_Type_Upload(file);
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
    const resp = await api.Mst_PortType_ExportExcelTemplate();
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

  const handleDelete = async (id: string) => {
    const res = await api.Mst_PortType_Delete(id);
    if (res.isSuccess) {
      toast.success(t("DeleteSuccessfully"));
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

  const handleCreate = async (data: any) => {
    const res = await api.Mst_PortType_Create({ ...data });
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
    const res = await api.Mst_PortType_Update(key, data);
    if (res.isSuccess) {
      toast.success(t("UpdateSuccessfully"));
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

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: "Mã loại cảng",
        dataField: "PortType",
        editorType: "dxTextBox",
        width: 600,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessageMode: "always",
        },
        headerFilter: {
          allowSearch: true,
          dataSource: uniqueFilterByDataField(
            PortTypeData?.DataList,
            "PortType"
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },
      {
        caption: "Tên loại cảng",
        dataField: "PortTypeName",
        editorType: "dxTextBox",
        width: 600,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessageMode: "always",
        },
        headerFilter: {
          allowSearch: true,
          dataSource: uniqueFilterByDataField(
            PortTypeData?.DataList,
            "PortTypeName"
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },
      {
        caption: "Trạng thái",
        dataField: "FlagActive",
        editorType: "dxSwitch",
        visible: true,
        alignment: "center",
        width: 150,
        cellRender: (data: any) => {
          return <StatusButton isActive={data.FlagActive} />;
        },
        headerFilter: {
          dataSource: filterByFlagActive(PortTypeData?.DataList, {
            true: t("Active"),
            false: t("Inactive"),
          }),
        },
      },
    ],
    [PortTypeData]
  );

  const handleGridReady = (grid: any) => {
    gridRef.current = grid;
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "PortType") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive")
      if (e.row?.isNewRow) {
        e.editorOptions.value = true;
      }
  };

  const handleSelectionChanged = (rowKeys: string[]) => {
    setSlecteditems(rowKeys);
  };

  const handleSavingRow = async (e: any) => {
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];

      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = handleDelete(id);
      } else if (type === "insert") {
        let newData: any = e.changes[0].data!;
        if (!Object.keys(newData).includes("FlagActive")) {
          newData = {
            ...newData,
            FlagActive: true,
          };
        }
        e.promise = handleCreate(newData);
      } else if (type === "update") {
        e.promise = handleUpdate(e.changes[0].key, e.changes[0].data);
      }
    }
    e.cancel = true;
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_PortType_DeleteMultiple(rows);
    if (resp.isSuccess) {
      toast.success(t("DeleteSuccessfully"));
      await refetch();
      return true;
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
      return false;
    }
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name={"Before"}>
            <div className="font-bold dx-font-m">Quản lý loại cảng</div>
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
          isLoading={isLoading}
          defaultPageSize={PAGE_SIZE}
          dataSource={PortTypeData?.DataList ?? []}
          columns={columns}
          keyExpr="PortType"
          allowSelection={true}
          allowInlineEdit={true}
          onReady={handleGridReady}
          onEditorPreparing={handleEditorPreparing}
          onSelectionChanged={handleSelectionChanged}
          onSaveRow={handleSavingRow}
          inlineEditMode={"row"}
          onDeleteRows={handleDeleteRows}
          storeKey={"port-type-columns"}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
