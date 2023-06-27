import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { IItemProps } from "devextreme-react/form";
import { useRef, useState } from "react";
import { HeaderPart, TransporterPopupView } from "../components";
import {
  FlagActiveEnum,
  Mst_Transporter,
  Search_Mst_Transporter,
} from "@packages/types";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { DataGrid, LoadPanel } from "devextreme-react";
import { GridViewPopup } from "@/packages/ui/base-gridview";
import { IPopupOptions } from "devextreme-react/popup";
import { useFormSettings } from "../components/use-form-settings";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@/packages/api";
import { useTransporterGridColumns } from "../components/use-columns";
import { useI18n } from "@/i18n/useI18n";
import { useSetAtom } from "jotai";
import { selectedItemsAtom } from "../components/transporter-store";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";

export const TransporterPage = () => {
  const { t } = useI18n("transporter");
  const config = useConfiguration();
  let gridRef: any = useRef<DataGrid>(null);
  const api = useClientgateApi();
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);
  const loadingControl = useVisibilityControl({ defaultVisible: false }); //Load panel

  const [searchCondition, setSearchCondition] = useState<
    Partial<Search_Mst_Transporter>
  >({
    FlagActive: FlagActiveEnum.All,
    KeyWord: "",
    Ft_PageIndex: 0,
    Ft_PageSize: config.MAX_PAGE_ITEMS,
    TransporterCode: "",
    TransporterName: "",
  });

  const { data, isLoading, refetch } = useQuery(
    ["transporter", JSON.stringify(searchCondition)],
    () =>
      api.Mst_Transporter__Search({
        ...searchCondition,
      })
  );
  console.log("🚀 ~ data:", data);

  const columns = useTransporterGridColumns({ data: data?.DataList ?? [] });

  const handleSubmit = () => {
    gridRef.current.instance.saveEditData();
  };

  const handleCancel = () => {
    gridRef.current?.instance?.cancelEditData();
  };

  const handleDelete = async (id: string) => {
    const resp = await api.Mst_Transporter_Delete(id);
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

  const handleUpdate = async (id: string, data: Mst_Transporter) => {
    const resp = await api.Mst_Transporter_Update(id, {
      ...data,
    });
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

  const handleCreate = async (data: Mst_Transporter & { __KEY__: string }) => {
    const { __KEY__, ...rest } = data;
    const resp = await api.Mst_Transporter_Create({
      ...rest,
    });
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
  //HeaderPart
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  //SearchPanelV2
  const handleSearch = async (data: any) => {
    setSearchCondition({
      ...searchCondition,
      ...data,
    });
  };


  //GridViewPopup
  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: "Thông tin DVVT",
    className: "transporter-information-popup",
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
          type: "default",
          onClick: handleCancel,
        },
      },
    ],
  };

  const formSettings = useFormSettings({
    columns,
  });

  const searchConditions: IItemProps[] = [
    {
      caption: "Mã DVVT",
      dataField: "TransporterCode",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: "Nhập",
      },
    },
    {
      caption: "Tên DVVT",
      dataField: "TransporterName",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: "Nhập",
      },
    },
    {
      caption: "Trạng thái",
      dataField: "FlagActive",
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        valueExpr: "value",
        displayExpr: "text",
        items: [
          {
            value: "",
            text: "Tất cả",
          },
          {
            value: "1",
            text: "Hoạt động",
          },
          {
            value: "0",
            text: "Không hoạt động",
          },
        ],
      },
    },
  ];

  const handleSelectionChanged = (rows: string[]) => {
    setSelectedItems(rows);
  };

  const handleSavingRow = async (e: any) => {
    if (e.changes && e.changes.length > 0) {
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
  };

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    if (["TransporterCode"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      e.editorOptions.value = true;
    }
  };

  const handleEditRowChanges = () => {};

  const handleDeleteRows = async (ids: string[]) => {
    loadingControl.open();
    const resp = await api.Mst_Transporter_DeleteMultiple(ids);
    loadingControl.close();
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

  const handleOnEditRow = (e: any) => {
    const { row, column } = e;
    handleEdit(row.rowIndex);
  };

  //Toggle search panel
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  //TransporterPopupView
  const handleEdit = (rowIndex: number) => {
    gridRef.current?.instance?.editRow(rowIndex);
  };

  return (
    <AdminContentLayout clasName={"transporter"}>
      <AdminContentLayout.Slot name={"Header"}>
        <HeaderPart onAddNew={handleAddNew} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className="w-[200px]">
              <SearchPanelV2
                conditionFields={searchConditions}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"transporter-search-panel"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={loadingControl.visible}
              showIndicator={true}
              showPane={true}
            />
            {!loadingControl.visible && (
              <>
                <GridViewPopup
                  keyExpr={["TransporterCode"]}
                  isLoading={isLoading}
                  dataSource={data?.isSuccess ? data.DataList ?? [] : []}
                  columns={columns}
                  popupSettings={popupSettings}
                  formSettings={formSettings}
                  onReady={(ref) => (gridRef = ref)}
                  allowSelection={true}
                  onSelectionChanged={handleSelectionChanged}
                  onSaveRow={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onEditRowChanges={handleEditRowChanges}
                  onDeleteRows={handleDeleteRows}
                  onEditRow={handleOnEditRow}
                  toolbarItems={[
                    {
                      location: "before",
                      widget: "dxButton",
                      options: {
                        icon: "search",
                        onClick: handleToggleSearchPanel,
                      },
                    },
                  ]}
                  storeKey={"transporter-management-columns"}
                />
                <TransporterPopupView
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
