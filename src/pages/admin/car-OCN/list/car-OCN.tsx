import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { uniqueFilterByDataField } from "@/packages/common";
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
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import "./car-OCN.scss";
import { HeaderPart } from "./header-part";

export const CarOCNPage = () => {
  const { t } = useI18n("Car");
  const api = useClientgateApi();
  const config = useConfiguration();
  const gridRef: any = useRef<DataGrid>(null);
  const keyword = useAtomValue(keywordAtom);
  const setSeletedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  //Call API
  const { data, isLoading, refetch } = useQuery(["carOCN", keyword], () =>
    api.Mst_CarOCN_Search({
      KeyWord: keyword,
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as SearchParam)
  );

  useEffect(() => {
    if (!!data && !data.DataList) {
      showError({
        message: data.errorCode,
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  console.log("🚀 ~ data:", data);
  //HeaderPart
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  const handleDownloadTemplate = async () => {
    const resp = await api.Mst_CarOCN_ExportTemplate();
    if (resp.isSuccess) {
      toast.success("Upload Successfully!");
      await refetch();
    } else {
      showError({
        message: resp.errorCode,
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_CarOCN_ImportExcel(file);
    if (resp.isSuccess) {
      toast.success("Upload Successfully!");
      await refetch();
    } else {
      showError({
        message: resp.errorCode,
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  //BaseGridView

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: "Mã model",
        dataField: "ModelCode",
        editorType: "dxTextBox",
        width: 200,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(data?.DataList, "ModelCode"),
          alowwSearch: true,
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },
      {
        caption: "Mã OCN",
        dataField: "OCNCode",
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(data?.DataList, "OCNCode"),
          alowwSearch: true,
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Mô tả OCN",
        dataField: "OCNDescription",
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(data?.DataList, "OCNDescription"),
          alowwSearch: true,
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },
    ],
    [data]
  );

  const handleDelete = async (key: string) => {
    const resp = await api.Mst_CarOCN_Delete(key);
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
    const res = await api.Mst_CarOCN_Create({ ...data });
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
    const resp = await api.Mst_CarOCN_Update(key, data);
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
        let newData = e.changes[0].data!;
        e.promise = handleCreate(newData);
      } else if (type === "update") {
        e.promise = handleUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "ModelCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "OCNCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_CarOCN_DeleteMultiple(rows);
    if (resp.isSuccess) {
      toast.success("Delete successfully!");
      await refetch();
    } else {
      showError({
        message: resp.errorCode,
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const handleSelectionChanged = (rowKeys: string[]) => {
    setSeletedItems(rowKeys);
  };

  const handleGridReadly = useCallback((grid: any) => {
    gridRef.current = grid;
  }, []);

  return (
    <AdminContentLayout className={"car-OCN"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name={"Before"}>
            <div className="font-bold dx-font-m">Quản lý OCN</div>
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
          keyExpr={["ModelCode", "OCNCode"]}
          storeKey="car-ocn-columns"
          onReady={handleGridReadly}
          defaultPageSize={config.PAGE_SIZE}
          dataSource={data?.DataList ?? []}
          isLoading={isLoading}
          columns={columns}
          allowSelection={true}
          allowInlineEdit={true}
          inlineEditMode={"row"}
          onSelectionChanged={handleSelectionChanged}
          onDeleteRows={handleDeleteRows}
          onEditorPreparing={handleEditorPreparing}
          onSaveRow={handleSaveRow}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
