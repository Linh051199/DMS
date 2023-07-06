import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { HeaderPart } from "./header-part";
import "./inventory-min.scss";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";

import { useConfiguration } from "@/packages/hooks";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";
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
  Mst_MinInventory,
  SearchParam,
} from "@/packages/types";
import CustomStore from "devextreme/data/custom_store";

export const InventoryMinPage = () => {
  const { t } = useI18n("Mst_MinInventory");
  const config = useConfiguration();
  const gridRef: any = useRef<DataGrid>(null);
  const api = useClientgateApi();
  const setSeletedItems = useSetAtom(selectedItemAtom);
  const keyword = useAtomValue(keywordAtom);
  const showError = useSetAtom(showErrorAtom);

  // call API

  const { data, isLoading, refetch } = useQuery(
    ["Mst_MinInventory", keyword],
    () =>
      api.Mst_MinInventory_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam)
  );
  console.log("Data: ", data);

  const { data: listModel } = useQuery(["listModel"], () => {
    return api.Mst_CarModel_GetAllActive();
  });
  const { data: listSpec } = useQuery(["listSpec"], () => {
    return api.Mst_CarSpec_GetAllActive();
  });

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
    const resp = await api.Mst_MinInventory_Upload(file);
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
    const resp = await api.Mst_MinInventory_ExportExcel_Template();
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

  const findModelName = (key: any) => {
    const findModelName = listModel?.DataList?.find((i) => i.ModelCode === key);
    return findModelName?.ModelName;
  };

  const findSpecDesc = (key: any) => {
    const findSpecDesc = listSpec?.DataList?.find((i) => i.SpecCode === key);
    return findSpecDesc?.SpecDescription;
  };

  const lookupSpecDataSource = useCallback((options: any, key: string) => {
    return {
      store: new CustomStore({
        key: "SpecCode",
        loadMode: "raw",
        load: () => {
          if (!options.data?.[key]) {
            return api.Mst_CarSpec_GetAllActive().then((resp: any) => {
              return resp.DataList ?? [];
            });
          }
          return api
            .Mst_CarSpec_GetByModelCode(options.data?.[key] ?? "*")
            .then((resp) => {
              return resp.DataList ?? [];
            })
            .catch(() => {
              throw "Network error";
            });
        },
      }),
      filter: options.data?.[key]
        ? ["ModelCode", "=", options.data?.[key]]
        : null,
      sort: "SpecName",
    };
  }, []);

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: "Mã Model",
        dataField: "ModelCode",
        editorType: "dxSelectBox",
        visible: true,
        editorOptions: {
          dataSource: listModel?.DataList ?? [],
          validationMessage: "always",
          displayExpr: "ModelCode",
          valueExpr: "ModelCode",
          searchEnabled: true,
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "ModelCode",
            t("( Empty )")
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
        setCellValue: (newData: Partial<Mst_MinInventory>, value: string) => {
          newData.ModelCode = value;
          newData.ModelName = findModelName(value);
          newData.SpecCode = "";
        },
      },
      {
        caption: "Tên Model",
        dataField: "ModelName",
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "ModelName"),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Mã Spec",
        dataField: "SpecCode",
        editorType: "dxSelectBox",
        visible: true,

        lookup: {
          dataSource: (options: any) =>
            lookupSpecDataSource(options, "ModelCode"),
          displayExpr: "SpecCode",
          valueExpr: "SpecCode",
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "SpecCode",
            t("( Empty )")
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
        setCellValue: (newData: Partial<Mst_MinInventory>, value: string) => {
          newData.SpecCode = value;
          newData.SpecDescription = findSpecDesc(value);
        },
      },
      {
        caption: "Đặc tả xe",
        dataField: "SpecDescription",
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "SpecDescription"
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Tồn kho tối thiểu",
        dataField: "QtyInv",
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "QtyInv"),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        dataField: "FlagActive",
        caption: t("FlagActive"),
        editorType: "dxSwitch",
        dataType: "boolean",
        visible: true,
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
    ],
    [data, listModel]
  );

  const handleGridReady = (grid: any) => {
    gridRef.current = grid;
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField) {
      if (e.dataField === "SpecCode") {
        if (e.row?.data.ModelCode) {
          e.editorOptions.readOnly = false;
        } else {
          e.editorOptions.readOnly = true;
        }
      }
      if (e.row?.isEditing === true && !e.row.isNewRow) {
        if (["ModelCode", "SpecCode"].includes(e.dataField)) {
          e.editorOptions.readOnly = true;
        }
      }
    }
  };

  const handleGridSelectionChanged = (rowKeys: string[]) => {
    setSeletedItems(rowKeys);
  };
  const handleDelete = async (key: Partial<Mst_MinInventory>) => {
    const resp = await api.Mst_MinInventory_Delete(key);
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
    const res = await api.Mst_MinInventory_Create({ ...data });
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

  const handleUpdate = async (key: Partial<Mst_MinInventory>, data: any) => {
    const resp = await api.Mst_MinInventory_Update(key, data);
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
    const resp = await api.Mst_MinInventory_DeleteMultiple(rows);
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
    <AdminContentLayout className={"inventory-min"}>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              Thiết lập tồn kho tối thiểu
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
          keyExpr={["ModelCode", "SpecCode"]}
          storeKey={"Mst_MinInventory_Columns"}
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
