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
import { FlagActiveEnum } from "@/packages/types";
import { BaseGridView } from "@/packages/ui/base-gridview";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "devextreme-react";
import { ValidationRule } from "devextreme-react/form";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";

export const ContractUpdateTypePage = () => {
  const { t } = useI18n("Contract");
  const config = useConfiguration();
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemAtom);
  const gridRef: any = useRef<DataGrid>(null);

  //Call API
  const { data, isLoading, refetch } = useQuery(
    ["contractUpdateType", keyword],
    () =>
      api.Mst_ContractUpdateType_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      })
  );
  console.log("🚀 ~ data:", data);

  useEffect(() => {
    if (!!data && !data.DataList) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  //HeaderPart
  const handleAddNew = () => {
    gridRef?.current?.instance.addRow();
  };
  const handleDownloadTemplate = () => {};
  const handleUploadFile = () => {};

  //BaseGridView
  const columns: ColumnOptions[] = [
    {
      caption: "Mã loại huỷ hợp đồng",
      dataField: "ContractUpdateType",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placehoder: "Nhập",
        validationMessage: "always",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "ContractUpdateType"
        ),
        allowSearch: true,
      },
    },

    {
      caption: "Tên loại huỷ hợp đồng",
      dataField: "ContractUpdateTypeName",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placehoder: "Nhập",
        validationMessage: "always",
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "ContractUpdateTypeName"
        ),
        allowSearch: true,
      },
    },
    {
      caption: "Trạng thái",
      dataField: "FlagActive",
      visible: true,
      editorType: "dxSwitch",
      alignment: "center",
      width: 150,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
      headerFilter: {
        dataSource: filterByFlagActive(data?.DataList, {
          true: t("Active"),
          false: t("Inactive"),
        }),
      },
    },
  ];

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    if (e.dataField === "ContractUpdateType") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      if (e.row?.isNewRow) {
        e.editorOptions.value = true;
      }
    }
  };

  const handleGridReady = useCallback((grid: any) => {
    gridRef.current = grid;
  }, []);

  const handleCreate = async (data: any) => {
    const resp = await api.Mst_ContractUpdateType_Create(data);
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

  const handleUpdate = async (key: string[], data: any) => {
    const resp = await api.Mst_ContractUpdateType_Update(key, data);
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

  const handleDelete = async (key: string) => {
    const resp = await api.Mst_ContractUpdateType_Delete(key);
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

  const handleSaveRow = async (e: any) => {
    console.log("🚀 ~ e:", e);
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];

      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = handleDelete(id);
      } else if (type === "insert") {
        let newData = e.changes[0].data;
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

  const handleGridSelectionChanged = (rowKeys: string[]) => {
    setSelectedItems(rowKeys);
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_ContractUpdateType_DeleteMultiple(rows);
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
            <div className="font bold dx-font-m">Quản lý loại huỷ hợp đồng</div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name={"Center"}>
            <HeaderPart
              onAddNew={handleAddNew}
              onDownloadTemplate={handleDownloadTemplate}
              onUploadFile={handleUploadFile}
            />
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <BaseGridView
          keyExpr="ContractUpdateTypeName"
          storeKey={"contract-update-type-columns"}
          defaultPageSize={config.PAGE_SIZE}
          isLoading={isLoading}
          dataSource={data?.DataList ?? []}
          columns={columns}
          allowInlineEdit={true}
          allowSelection={true}
          inlineEditMode={"row"}
          onReady={handleGridReady}
          onSelectionChanged={handleGridSelectionChanged}
          onEditorPreparing={handleEditorPreparing}
          onDeleteRows={handleDeleteRows}
          onSaveRow={handleSaveRow}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
