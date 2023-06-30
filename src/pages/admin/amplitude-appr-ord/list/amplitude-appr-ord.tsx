import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { HeaderPart } from "./header-part";
import "./amplitude-appr-ord.scss";
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
  Mst_AmplitudeApprOrd,
  SearchParam,
} from "@/packages/types";

export const AmplitudeApprOrdPage = () => {
  const { t } = useI18n("Mst_AmplitudeApprOrd");
  const config = useConfiguration();
  const gridRef: any = useRef<DataGrid>(null);
  const api = useClientgateApi();
  const setSeletedItems = useSetAtom(selectedItemAtom);
  const keyword = useAtomValue(keywordAtom);
  const showError = useSetAtom(showErrorAtom);

  // call API

  const { data, isLoading, refetch } = useQuery(
    ["AmplitudeApprOrd", keyword],
    () =>
      api.Mst_AmplitudeApprOrd_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam)
  );
  console.log("Data: ", data);

  const { data: listDealer, isLoading: isLoadingDealer } = useQuery(
    ["dealers"],
    () => {
      return api.Mst_Dealer_GetAllActive();
    }
  );
  console.log("🚀 ~ listDealer:", listDealer);

  const { data: listModel, isLoading: isLoadingModel } = useQuery(
    ["models"],
    () =>
      api.Mst_CarModel_Search({
        KeyWord: "",
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam)
  );
  console.log("listModel: ", listModel);

  useEffect(() => {
    if (!!data && !data.isSuccess) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);
  useEffect(() => {
    return () => {
      refetch();
    };
  }, []);

  //HeaderPart
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_AmplitudeApprOrd_Upload(file);
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
    const resp = await api.Mst_AmplitudeApprOrd_ExportExcel_Template();
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

  const findModelName = (key: any) => {
    let modelName = listModel?.DataList?.find((i) => i.ModelCode === key);
    return modelName?.ModelName;
  };

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        dataField: "DealerCode",
        caption: t("DealerCode"),
        editorType: "dxSelectBox",
        visible: true,
        headerFilter: {
          items: uniqueFilterByDataField(
            data?.DataList,
            "DealerCode",
            t("( Empty )")
          ),
        },
        validationRules: [requiredType],
        editorOptions: {
          dataSource: listDealer?.DataList ?? [],
          validationMessageMode: "always",
          displayExpr: "DealerCode",
          valueExpr: "DealerCode",
          searchEnabled: true,
        },
        setCellValue: (
          newData: Partial<Mst_AmplitudeApprOrd>,
          value: string
        ) => {
          newData.DealerCode = value;
          newData.md_DealerName = findDealerName(value);
        },
      },
      {
        caption: t("md_DealerName"),
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
        caption: "Mã model",
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
        validationRule: [requiredType],
        setCellValue: (
          newData: Partial<Mst_AmplitudeApprOrd>,
          value: string
        ) => {
          newData.ModelCode = value;
          newData.mcm_ModelName = findModelName(value);
        },
      },
      {
        caption: "Tên model",
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
        caption: "Biên độ đặt hàng(%)",
        dataField: "AmplitudeOrdMax",
        editorType: "dxTextBox",

        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "AmplitudeOrdMax"
          ),
        },
        validationRule: [requiredType, ExcludeSpecialCharactersType],
      },

      {
        caption: "Biên độ kế hoạch dự kiến(%)",
        dataField: "AmplitudePlanMax",
        editorType: "dxTextBox",

        visible: true,
        editorOptions: {
          placeholder: "Nhập",
          validationMessage: "always",
        },
        headerFilter: {
          alowwSearch: true,
          dataSource: uniqueFilterByDataField(
            data?.DataList,
            "AmplitudePlanMax"
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
          dataSource: filterByFlagActive(data?.DataList, {
            true: t("Active"),
            false: t("Inactive"),
          }),
        },
      },
    ],
    [data,listDealer,listModel]
  );

  const handleGridReady = (grid: any) => {
    gridRef.current = grid;
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "DealerCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "ModelCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      if (e.row?.isNewRow) {
        e.editorOptions.value = true;
      }
    }
  };

  const handleGridSelectionChanged = (rowKeys: string[]) => {
    setSeletedItems(rowKeys);
  };
  const handleDelete = async (key: Mst_AmplitudeApprOrd) => {
    const resp = await api.Mst_AmplitudeApprOrd_Create(key);
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
    const res = await api.Mst_AmplitudeApprOrd_Create({ ...data });
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

  const handleUpdate = async (key: Mst_AmplitudeApprOrd, data: any) => {
    const resp = await api.Mst_AmplitudeApprOrd_Update(key, data);
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
    const resp = await api.Mst_AmplitudeApprOrd_DeleteMultiple(rows);
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
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              Quản lý tỉ lệ đặt hàng kế hoạch
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
          keyExpr={["DealerCode", "ModelCode"]}
          storeKey={"amplitude-appr-ord-columns"}
          defaultPageSize={config.PAGE_SIZE}
          isLoading={isLoading || isLoadingModel || isLoadingDealer}
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
