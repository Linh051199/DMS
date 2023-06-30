import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { HeaderPart } from "./header-part";
import "./point-regis.scss";
import { BaseGridView } from "@/packages/ui/base-gridview";
import { useConfiguration } from "@/packages/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { ColumnOptions } from "@packages/ui/base-gridview";

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
import { FlagActiveEnum, Mst_PointRegis, SearchParam } from "@/packages/types";

export const PointRegisPage = () => {
  const { t } = useI18n("Base");
  const config = useConfiguration();
  const gridRef: any = useRef<DataGrid>(null);
  const api = useClientgateApi();
  const setSeletedItems = useSetAtom(selectedItemAtom);
  const keyword = useAtomValue(keywordAtom);
  const showError = useSetAtom(showErrorAtom);

  // call API

  const { data, isLoading, refetch } = useQuery(
    ["Mst_PointRegis", keyword],
    () =>
      api.Mst_PointRegis_Search({
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

  const { data: listDealer } = useQuery(["listDealer"], () => {
    return api.Mst_Dealer_GetAllActive();
  });
  console.log("🚀 ~ listDealer:", listDealer);

  //HeaderPart
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_PointRegis_ImportExcel(file);
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
    const resp = await api.Mst_PointRegis_ExportTemplate();
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
    let dealerName = listDealer?.DataList?.find((i) => i.DealerCode === key);
    return dealerName?.DealerName;
  };

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: "Mã đại lý",
        dataField: "DealerCode",
        editorType: "dxSelectBox",
        width: 200,
        visible: true,
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "DealerCode",
            t("( Empty )")
          ),
        },
        editorOptions: {
          dataSource: listDealer?.DataList ?? [],
          validationMessage: "always",
          displayExpr: "DealerCode",
          valueExpr: "DealerCode",
          searchEnabled: true,
        },

        setCellValue: (newData: Partial<Mst_PointRegis>, value: string) => {
          newData.DealerCode = value;
          newData.md_DealerName = findDealerName(value);
        },
      },

      {
        caption: "Mã địa điểm",
        dataField: "PointRegisCode",
        editorType: "dxTextBox",
        width: 200,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "PointRegisCode"),
        },
      },

      {
        caption: "Tên đại lý",
        dataField: "md_DealerName",
        editorType: "dxTextBox",
        width: 200,
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "md_DealerName"),
        },
      },

      {
        caption: "Địa chỉ giao xe",
        dataField: "PointRegisName",
        editorType: "dxTextBox",
        width: 200,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "PointRegisName"),
        },
      },

      {
        caption: "Kinh độ",
        dataField: "MapLongitude",
        editorType: "dxTextBox",
        width: 200,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "MapLongitude"),
        },
      },

      {
        caption: "Vĩ độ",
        dataField: "MapLatitude",
        editorType: "dxTextBox",
        width: 200,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "MapLatitude"),
        },
      },

      {
        caption: "Bán kính",
        dataField: "Radius",
        editorType: "dxTextBox",
        width: 200,
        visible: true,
        editorOptions: {
          placeholder: "Nhập",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(data?.DataList, "Radius"),
        },
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
    [data]
  );

  const handleGridReady = (grid: any) => {
    gridRef.current = grid;
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "PointRegisCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "DealerCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      if (e.row?.isNewRow) {
        e.editorOptions.value = true;
      }
    }
    // if (e.dataField) {
    //   if (["DealerCode", "md_DealerName"].includes(e.dataField)) {
    //     if (e.row?.isNewRow === true) {
    //       e.editorName = "dxSelectBox";
    //     }
    //     if (e.dataField === "DealerCode") {
    //       e.editorOptions.dataSource = listDealer?.DataList ?? [];
    //     }
    //   }
    // }
  };

  const handleGridSelectionChanged = (rowKeys: string[]) => {
    setSeletedItems(rowKeys);
  };
  const handleDelete = async (key: Mst_PointRegis) => {
    const resp = await api.Mst_PointRegis_Delete(key);
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
    const res = await api.Mst_PointRegis_Create({ ...data });
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

  const handleUpdate = async (key: Mst_PointRegis, data: any) => {
    const resp = await api.Mst_PointRegis_Update(key, data);
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
        e.promise = handleUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_PointRegis_DeleteMultiple(rows);
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
    <AdminContentLayout className={"point-regis"}>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              Quản lý địa điểm nhận xe của đại lý
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
          keyExpr={["PointRegisCode", "DealerCode"]}
          storeKey={"port-columns"}
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
