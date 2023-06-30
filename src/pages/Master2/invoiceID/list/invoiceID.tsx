import { useRef, useState } from "react";
import { DataGrid, LoadPanel } from "devextreme-react";
import {
  HeaderPart,
  PopupViewComponent,
  selectedItemsAtom,
  useColumn,
  useFormSettings,
} from "../components";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  FlagActiveEnum,
  Mst_CarStdOpt,
  Mst_InvoiceIDSearch,
} from "@/packages/types";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@/packages/api";
import { useAtomValue, useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { useI18n } from "@/i18n/useI18n";
import { toast } from "react-toastify";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { GridViewPopup } from "@/packages/ui/base-gridview";
import { IPopupOptions } from "devextreme-react/popup";
import { IItemProps } from "devextreme-react/form";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { convertDate, flagEditorOptions } from "@/packages/common";

export const InvoiceIDPage = () => {
  const { t } = useI18n("base");
  let gridRef: any = useRef<DataGrid>(null);
  const config = useConfiguration();
  const api = useClientgateApi();
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);
  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const [searchCondition, setSearchCondition] = useState<
    Partial<Mst_InvoiceIDSearch>
  >({
    //state default of search
    InvoiceIDCode: "",
    CreatedDateFrom: "",
    CreatedDateTo: "",
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: config.MAX_PAGE_ITEMS,
  });

  //Call API
  const { data, isLoading, refetch } = useQuery(
    ["Mst_InvoiceID_Search", JSON.stringify(searchCondition)],
    () => {
      return api.Mst_InvoiceID_Search({
        ...searchCondition,
      });
    }
  );
  console.log("🚀 ~ data:", data);

  //Handle
  // re-render API search
  const handleSearch = async (data: any) => {
    setSearchCondition({
      ...searchCondition,
      ...data,
      CreatedDateFrom: data?.CreatedDate
        ? convertDate(data?.CreatedDateFrom)
        : "",
      CreatedDateTo: data?.CreatedDate ? convertDate(data?.CreatedDateTo) : "",
    });
  };

  // function edit row( open popup)
  const handleEdit = (rowIndex: number) => {
    gridRef.current?.instance?.editRow(rowIndex);
  };

  // delete row
  const handleDelete = async (id: Partial<Mst_CarStdOpt>) => {
    const resp = await api.Mst_InvoiceID_Delete(id);
    if (resp.isSuccess) {
      toast.success(t("Delete Successfully"));
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

  // create row
  const handleCreate = async (data: Partial<Mst_CarStdOpt>) => {
    const resp = await api.Mst_InvoiceID_Create(data);
    if (resp.isSuccess) {
      toast.success(t("Create Successfully"));
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

  //update row
  const handleUpdate = async (key: any, data: Partial<Mst_CarStdOpt>) => {
    const resp = await api.Mst_InvoiceID_Update(key, data);
    if (resp.isSuccess) {
      toast.success(t("Update Successfully"));
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

  // action C-D-U
  const handleSaveRow = (e: any) => {
    if (e.changes && e.changes.length > 0) {
      console.log(336, e.changes[0]);
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = handleDelete(id);
      } else if (type === "insert") {
        const data = e.changes[0].data!;
        e.promise = handleCreate(data);
      } else if (type === "update") {
        e.promise = handleUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  // set row checked in GlobalStore
  const handleSelectionChanged = (rows: string[]) => {
    setSelectedItems(rows);
  };

  // popup  detail
  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    if (["InvoiceIDCode", "CreatedDate"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleEditRow = (e: any) => {
    const { row, column } = e;
    handleEdit(row.rowIndex);
  };

  // call API delete multiple
  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_InvoiceID_DeleteMultiple(rows);
    if (resp.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
  };

  const handleEditRowChanges = () => {};

  // toggle open-close SearchPanel
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  // Function change state Detail -> Edit
  const handleSubmit = () => {
    gridRef.current?.instance?.saveEditData();
  };

  // Close popup
  const handleCancel = () => {
    gridRef.current?.instance?.cancelEditData();
  };

  //HeaderPart
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  //SearchPanelV2
  const fromItems: IItemProps[] = [
    {
      caption: t("InvoiceIDCode"),
      dataField: "InvoiceIDCode",
      editorType: "dxTextBox",
    },
    {
      dataField: "CreatedDateFrom",
      caption: t("CreatedDateFrom"),
      editorType: "dxDateBox",
      editorOptions: {
        type: "date",
      },
      // format: "yyyy-MM-dd",
    },
    {
      dataField: "CreatedDateTo",
      caption: t("CreatedDateTo"),
      editorType: "dxDateBox",
      editorOptions: {
        type: "date",
      },
      // format: "yyyy-MM-dd",
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      editorType: "dxSelectBox",
      editorOptions: flagEditorOptions,
    },
  ];

  //GridViewPopup
  // column
  const columns = useColumn({
    data: data?.DataList ?? [],
  });

  // setting popup (title, buttons)
  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: "Mst_CarStdOpt",
    toolbarItems: [
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: "LƯU",
          stylingMode: "contained",
          type: "default",
          onClick: handleSubmit,
        },
      },
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: "BỎ QUA",
          stylingMode: "contained",
          type: "default",
          onClick: handleCancel,
        },
      },
    ],
  };

  // setup form setting
  const formSettings = useFormSettings({
    columns,
  });

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <HeaderPart onAddNew={handleAddNew} searchCondition={searchCondition} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className="w-[200px]">
              <SearchPanelV2
                conditionFields={fromItems}
                data={searchCondition}
                storeKey="Mst_InvoiceID"
                onSearch={handleSearch}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewprt"}
              shadingColor="0,0,0,0.4"
              position={"center"}
              visible={loadingControl.visible}
              showIndicator={true}
              showPane={true}
            />
            {!loadingControl.visible && (
              <>
                <GridViewPopup
                  keyExpr="InvoiceIDCode"
                  storeKey={"Mst_InvoiceID_Column"}
                  isLoading={isLoading}
                  dataSource={data?.isSuccess ? data.DataList ?? [] : []}
                  columns={columns}
                  popupSettings={popupSettings}
                  formSettings={formSettings}
                  allowSelection={true}
                  onReady={(ref) => (gridRef = ref)}
                  onSelectionChanged={handleSelectionChanged}
                  onEditorPreparing={handleEditorPreparing}
                  onEditRow={handleEditRow}
                  onDeleteRows={handleDeleteRows}
                  onEditRowChanges={handleEditRowChanges}
                  onSaveRow={handleSaveRow}
                  toolbarItems={[
                    // Button search and action
                    {
                      location: "Before",
                      widget: "dxButton",
                      options: {
                        icon: "search",
                        onClick: handleToggleSearchPanel,
                      },
                    },
                  ]}
                />
                <PopupViewComponent
                  onEdit={handleEdit}
                  formSettings={formSettings}
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
