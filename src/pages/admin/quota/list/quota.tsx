import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { HeaderPart } from "./header-part";
import "./quota.scss";
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
import { FlagActiveEnum, Mng_Quota, SearchParam } from "@/packages/types";
import { string } from "ts-pattern/dist/patterns";
import CustomStore from "devextreme/data/custom_store";

export const QuotaPage = () => {
  const { t } = useI18n("Mng_Quota");
  const config = useConfiguration();
  const gridRef: any = useRef<DataGrid>(null);
  const api = useClientgateApi();
  const setSeletedItems = useSetAtom(selectedItemAtom);
  const keyword = useAtomValue(keywordAtom);
  const showError = useSetAtom(showErrorAtom);

  // call API

  const { data, isLoading, refetch } = useQuery(["Mng_Quota", keyword], () =>
    api.Mng_Quota_Search({
      KeyWord: keyword,
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as SearchParam)
  );
  console.log("Data: ", data);

  const { data: listDealer } = useQuery(["listDealer"], () => {
    return api.Mst_Dealer_GetAllActive();
  });

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
    const resp = await api.Mng_Quota_Upload(file);
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
    const resp = await api.Mng_Quota_ExportExcel_Template();
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

  const findDealerName = (key: any) => {
    const findDealerName = listDealer?.DataList?.find(
      (i) => i.DealerCode === key
    );
    return findDealerName?.DealerName;
  };

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
        caption: "Mã đại lý",
        dataField: "DealerCode",
        editorType: "dxSelectBox",

        visible: true,
        editorOptions: {
          dataSource: listDealer?.DataList ?? [],
          validationMessage: "always",
          displayExpr: "DealerCode",
          valueExpr: "DealerCode",
          searchEnabled: true,
        },
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "DealerCode",
            t("( Empty )")
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],

        setCellValue: (newData: Partial<Mng_Quota>, value: string) => {
          newData.DealerCode = value;
          newData.md_DealerName = findDealerName(value);
          newData.SpecCode = "";
        },
      },
      {
        caption: "Tên đại lý",
        dataField: "md_DealerName",
        editorType: "dxTextBox",

        visible: true,
        editorOptions: {
          readOnly: true,
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "md_DealerName"),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Mã Model",
        dataField: "mcm_ModelCode",
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
            "mcm_ModelCode",
            t("( Empty )")
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],

        setCellValue: (newData: Partial<Mng_Quota>, value: string) => {
          newData.mcm_ModelCode = value;
          newData.mcm_ModelName = findModelName(value);
          newData.SpecCode = "";
        },
      },
      {
        caption: "Tên Model",
        dataField: "mcm_ModelName",
        editorType: "dxTextBox",

        visible: true,
        editorOptions: {
          readOnly: true,
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "mcm_ModelName"),
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
            lookupSpecDataSource(options, "mcm_ModelCode"),
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
        setCellValue: (newData: Partial<Mng_Quota>, value: string) => {
          newData.SpecCode = value;
          newData.mcs_SpecDescription = findSpecDesc(value);
        },
      },

      {
        caption: "Mô tả xe",
        dataField: "mcs_SpecDescription",
        editorType: "dxTextBox",

        visible: true,
        editorOptions: {
          readOnly: true,
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "mcs_SpecDescription"
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Quota hiện tại",
        dataField: "QtyQuota",
        editorType: "dxTextBox",

        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "QtyQuota"),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "User cập nhật",
        dataField: "UpdateBy",
        editorType: "dxTextBox",

        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "UpdateBy"),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },
    ],
    [data, listDealer, listModel]
  );

  const handleGridReady = (grid: any) => {
    gridRef.current = grid;
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "DealerCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "mcm_ModelCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "SpecCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "UpdateBy") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleGridSelectionChanged = (rowKeys: string[]) => {
    setSeletedItems(rowKeys);
  };
  const handleDelete = async (key: string) => {
    const resp = await api.Mng_Quota_Delete(key);
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
    const res = await api.Mng_Quota_Create({ ...data });
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

  const handleUpdate = async (key: string, data: Partial<Mng_Quota>) => {
    const resp = await api.Mng_Quota_Update(key, data);
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
    const resp = await api.Mng_Quota_Delete(rows[0]);
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
    <AdminContentLayout className={"quota"}>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">Quản lý danh sách Quota</div>
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
          keyExpr={["DealerCode", "SpecCode"]}
          storeKey={"Mng_Quota_Columns"}
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
