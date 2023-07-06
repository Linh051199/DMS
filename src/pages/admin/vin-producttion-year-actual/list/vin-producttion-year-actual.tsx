import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { HeaderPart } from "./header-part";
import "./vin-producttion-year-actual.scss";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";

import { useConfiguration } from "@/packages/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { DataGrid } from "devextreme-react";
import { useClientgateApi } from "@/packages/api";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { keywordAtom, selectedItemAtom } from "../components/screen-atom";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import { useI18n } from "@/i18n/useI18n";
import {
  ExcludeSpecialCharactersType,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { StatusButton } from "@/packages/ui/status-button";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import {
  FlagActiveEnum,
  Mst_VINProductionYear_Actual,
  SearchParam,
} from "@/packages/types";

export const VINProductionYear_ActualPage = () => {
  const { t } = useI18n("Mst_VINProductionYear_Actual");
  const config = useConfiguration();
  const gridRef: any = useRef<DataGrid>(null);
  const api = useClientgateApi();
  const setSeletedItems = useSetAtom(selectedItemAtom);
  const keyword = useAtomValue(keywordAtom);
  const showError = useSetAtom(showErrorAtom);

  // call API

  const { data, isLoading, refetch } = useQuery(
    ["Mst_VINProductionYear_Actual", keyword],
    () =>
      api.Mst_VINProductionYear_Actual_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam)
  );
  console.log("Data: ", data);

  useEffect(() => {
    if (!!data && !data.isSuccess) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  //HeaderPart
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_VINProductionYear_Actual_Upload(file);
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

  const handleDownloadTemplate = async () => {
    const resp = await api.Mst_VINProductionYear_Actual_ExportExcel_Template();
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
      // {
      //   caption: "Loại xe",
      //   dataField: "PortType",
      //   editorType: "dxSelectBox",
      //   width: 200,
      //   visible: true,
      //   editorOptions: {
      //     dataSource: data?.DataList ?? [],
      //     validationMessage: "always",
      //     displayExpr: "PortType",
      //     valueExpr: "PortType",
      //     searchEnabled: true,
      //   },
      //   headerFilter: {
      //     dataSource: uniqueFilterByDataField(
      //       data?.DataList,
      //       "PortType",
      //       t("( Empty )")
      //     ),
      //   },
      //   validationRule: [requiredType, ExcludeSpecialCharactersType],
      // },
      // {
      //   caption: "Mã cảng",
      //   dataField: "PortCode",
      //   editorType: "dxTextBox",
      //   width: 200,
      //   visible: true,
      //   editorOptions: {
      //     placeholder: "Nhập",
      //     validationMessage: "always",
      //   },
      //   headerFilter: {
      //     alowwSearch: true,
      //     dataSource: uniqueFilterByDataField(data?.DataList, "PortCode"),
      //   },
      //   validationRule: [requiredType, ExcludeSpecialCharactersType],
      // },
      // {
      //   dataField: "FlagActive",
      //   caption: t("FlagActive"),
      //   editorType: "dxSwitch",
      //   dataType: "boolean",
      //   visible: true,
      //   alignment: "center",
      //   width: 150,
      //   cellRender: ({ data }: any) => {
      //     return <StatusButton isActive={data.FlagActive} />;
      //   },
      //   headerFilter: {
      //     dataSource: filterByFlagActive(data?.DataList, {
      //       true: t("Active"),
      //       false: t("Inactive"),
      //     }),
      //   },
      // },
    ],
    [data]
  );

  const handleGridReady = (grid: any) => {
    gridRef.current = grid;
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    // if (e.dataField === "PortCode") {
    //     e.editorOptions.readOnly = !e.row?.isNewRow;
    //   } else if (e.dataField === "PortType") {
    //     e.editorOptions.readOnly = !e.row?.isNewRow;
    //   } else if (e.dataField === "ProvinceCode") {
    //     e.editorOptions.readOnly = !e.row?.isNewRow;
    //   } else if (e.dataField === "FlagActive") {
    //     if (e.row?.isNewRow) {
    //       e.editorOptions.value = true;
    //     }
    //   }
  };

  const handleGridSelectionChanged = (rowKeys: string[]) => {
    setSeletedItems(rowKeys);
  };
  const handleDelete = async (key: Partial<Mst_VINProductionYear_Actual>) => {
    const resp = await api.Mst_VINProductionYear_Actual_Delete(key);
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
    const res = await api.Mst_VINProductionYear_Actual_Create({ ...data });
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

  const handleUpdate = async (
    key: Partial<Mst_VINProductionYear_Actual>,
    data: any
  ) => {
    const resp = await api.Mst_VINProductionYear_Actual_Update(key, data);
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

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_VINProductionYear_Actual_DeleteMultiple(rows);
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
    <AdminContentLayout className={"vin-producttion-year-actual"}>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              Thiết lập năm sản xuất thực tế cho VIN
            </div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center">
            <HeaderPart
              onAddNew={handleAddNew}
              onUploadFile={handleUploadFile}
              onDownloadTemplate={handleDownloadTemplate}
            />
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <BaseGridView
          keyExpr={["AssemblyStatus", "VINCharacters"]}
          storeKey={"Mst_VINProductionYear_Actual_Columns"}
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
          onSaveRow={handleSaveRow}
          onDeleteRows={handleDeleteRows}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
