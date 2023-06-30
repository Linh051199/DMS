import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { HeaderPart } from "./header-part";
import "./district.scss";
import { BaseGridView } from "@/packages/ui/base-gridview";
import { useConfiguration } from "@/packages/hooks";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { ColumnOptions } from "@/types";
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
import { FlagActiveEnum, SearchParam } from "@/packages/types";

export const DistrictPage = () => {
  const { t } = useI18n("District");
  const config = useConfiguration();
  const gridRef: any = useRef<DataGrid>(null);
  const api = useClientgateApi();
  const selectedItems = useSetAtom(selectedItemAtom);
  const showError = useSetAtom(showErrorAtom);
  const keyword = useAtomValue(keywordAtom);

  // call API

  const {
    data: districtData,
    isLoading,
    refetch,
  } = useQuery(["District", keyword], () =>
    api.Mst_District_Search({
      KeyWord: keyword,
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as SearchParam)
  );

  useEffect(() => {
    if (!!districtData && !districtData.isSuccess) {
      showError({
        message: t(districtData.errorCode),
        debugInfo: districtData.debugInfo,
        errorInfo: districtData.errorInfo,
      });
    }
  }, [districtData]);

  //HeaderPart
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_District_Upload(file);
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
    const resp = await api.Mst_District_ExportTemplate();
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
        caption: "Mã quận/huyện",
        dataField: "DistrictCode",
        editorType: "dxTextBox",
        width: 200,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessageMode: "always",
        },
        headerFilter: {
          allowSearch: true,
          dataSource: uniqueFilterByDataField(
            districtData?.DataList,
            "DistrictCode"
          ),
        },
        validationRules: [requiredType, ExcludeSpecialCharactersType],
      },
      {
        caption: "Mã tỉnh",
        dataField: "ProvinceCode",
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(
            districtData?.DataList,
            "ProvinceCode"
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },
      {
        caption: "Tên quận/huyện",
        dataField: "DistrictName",
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(
            districtData?.DataList,
            "DistrictName"
          ),
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
          dataSource: filterByFlagActive(districtData?.DataList, {
            true: t("Active"),
            false: t("Inactive"),
          }),
        },
      },
    ],
    [districtData]
  );

  const handleGridReady = (grid: any) => {
    gridRef.current = grid;
  };
  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "DistrictCode") {
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
    const resp = await api.Mst_District_Delete(key);
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
    const res = await api.Mst_District_Create({ ...data });
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
    const res = await api.Mst_District_Update(key, data);
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

  const handleSaveRow = async (e: any) => {
    console.log("🚀 ~ e:", e);
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
    const resp = await api.Mst_District_Delete_Multiple(rows);
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
    <AdminContentLayout className={"district"}>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">Quản lý Quận/Huyện</div>
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
          keyExpr={["DistrictCode",'ProvinceCode']}
          storeKey={"district-columns"}
          defaultPageSize={config.PAGE_SIZE}
          isLoading={isLoading}
          dataSource={districtData?.DataList ?? []}
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
