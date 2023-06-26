import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum } from "@/packages/types";
import { BaseGridView } from "@/packages/ui/base-gridview";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { keyWordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";
import "./customer-base.scss";
import { DataGrid } from "devextreme-react";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import { StatusButton } from "@/packages/ui/status-button";
import { toast } from "react-toastify";
import { Mst_CustomerBaseDto } from "@/packages/api/clientgate/Mst_CustomerBaseApi";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";

export const CustomerBasePage = () => {
  const { t } = useI18n("CustomerBase");
  const api = useClientgateApi();
  const config = useConfiguration();
  const gridRef: any = useRef<DataGrid>(null);
  const showError = useSetAtom(showErrorAtom);
  const keyWord = useAtomValue(keyWordAtom);
  const setSlectedItems = useSetAtom(selectedItemsAtom);

  // Call API
  const { data, isLoading, refetch } = useQuery(["CustomerBase", keyWord], () =>
    api.Mst_CustomerBase_Search({
      KeyWord: keyWord,
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
  }, []);

  //HeaderPart
  const handleAddNew = () => {
    gridRef?.current?.instance.addRow();
  };

  const handleDownloadTemplate = async () => {
    const resp = await api.Mst_CustomerBase_ExportExcel_Template();
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

  const handleUploadFile = async (file: File) => {
    const resp = await api.Mst_CustomerBase_Upload(file);
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

  //BaseGridView
  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: "Mã nguồn khách hàng",
        dataField: "CustomerBaseCode",
        visible: true,
        editorType: "dxTextBox",
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "CustomerBaseCode"
          ),
          allowSearch: true,
        },
      },

      {
        caption: "Tên nguồn khách hàng",
        dataField: "CustomerBaseName",
        visible: true,
        editorType: "dxTextBox",
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "CustomerBaseName"
          ),
          allowSearch: true,
        },
      },

      {
        caption: "Trạng thái",
        dataField: "FlagActive",
        visible: true,
        editorType: "dxSwitch",
        width: 200,
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
    ],
    [data]
  );

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    if (e.dataField === "CustomerBaseCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      if (e.row?.isNewRow) {
        e.editorOptions.value = true;
      }
    }
  };

  const handleCreate = async (data: any) => {
    const resp = await api.Mst_CustomerBase_Create(data);
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

  const handleUpdate = async (key: string, data: any) => {
    const resp = await api.Mst_CustomerBase_Update(key, data);
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

  const handleDelete = async (key: string) => {
    const resp = await api.Mst_CustomerBase_Delete(key);
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

  const handleSaveRow = async (e: any) => {
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = handleDelete(id);
      } else if (type === "insert") {
        let newData = e.changes[0].data!;
        if (!Object.keys(newData).includes("FlagActive")) {
          newData = { ...newData, FlagActive: true };
        }
        e.promise = handleCreate(newData);
      } else if (type === "update") {
        e.promise = handleUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const handleGridSelectionChanged = (rowKeys: string[]) => {
    setSlectedItems(rowKeys);
  };

  const handleGridReady = useCallback((grid: any) => {
    gridRef.current = grid;
  }, []);

  const handleGridDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_CustomerBase_DeleteMultiple(rows);
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
    <AdminContentLayout className={"customer-base"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">Quản lý nguồn khách hàng</div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center">
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
          keyExpr="CustomerBaseCode"
          storeKey={"customer-base-columns"}
          defaultPageSize={config.PAGE_SIZE}
          isLoading={isLoading}
          dataSource={data?.DataList ?? []}
          columns={columns}
          allowSelection={true}
          allowInlineEdit={true}
          inlineEditMode={"row"}
          onReady={handleGridReady}
          onEditorPreparing={handleEditorPreparing}
          onSelectionChanged={handleGridSelectionChanged}
          onDeleteRows={handleGridDeleteRows}
          onSaveRow={handleSaveRow}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
