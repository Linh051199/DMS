import { useI18n } from "@/i18n/useI18n";
import { useRef, useState } from "react";

import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { DataGrid, LoadPanel } from "devextreme-react";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { IItemProps } from "devextreme-react/form";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_Dealer,
  SearchDealerParam,
} from "@/packages/types";
import { useClientgateApi } from "@/packages/api";
import { IPopupOptions } from "devextreme-react/popup";
import { GridViewPopup } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { flagEditorOptions } from "@/packages/common";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";

import { HeaderPart } from "@/pages/dealerClone/components/header-part";
import { selectedItemsAtom } from "@/pages/dealerClone/components/dealer-store";
import { useDealerGridColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-settings";
import { toast } from "react-toastify";
import { DealerPopupView } from "../components";

export const DealerManagementPageClone = () => {
  const { t } = useI18n("Dealer");
  let gridRef: any = useRef<DataGrid | null>(null);
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);

  const [searchCondition, setSearchCondition] = useState<
    Partial<SearchDealerParam>
  >({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: config.MAX_PAGE_ITEMS,
    KeyWord: "",
    DealerCode: "",
    DealerName: "",
    FlagAutoLXX: FlagActiveEnum.All,
    FlagAutoMapVIN: FlagActiveEnum.All,
    FlagAutoSOAppr: FlagActiveEnum.All,
  });

  const api = useClientgateApi();

  const { data, isLoading, refetch } = useQuery(
    ["dealer", JSON.stringify(searchCondition)],
    () =>
      api.Mst_Dealer_Search({
        ...searchCondition,
      })
  );

  const { data: provinceDs } = useQuery(["provinces"], () =>
    api.Mst_Province_Search({
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
      KeyWord: "",
    })
  );

  const { data: dealerTypeDs } = useQuery(["dealerTypes"], () =>
    api.Mst_DealerType_Search({
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
      KeyWord: "",
    })
  );

  const columns = useDealerGridColumns({ data: data?.DataList ?? [] });
  const handleSubmit = () => {
    gridRef.current?.instance?.saveEditData();
  };

  const handleCancel = () => {
    gridRef.current?.instance?.cancelEditData();
  };

  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: t("Dealer Information"),
    className: "dealer-information-popup",
    toolbarItems: [
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: t("Save"),
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
          text: t("Cancel"),
          type: "default",
          onClick: handleCancel,
        },
      },
    ],
  };

  const formSettings = useFormSettings({
    columns,
    provinceDs: provinceDs?.DataList,
    dealerTypeDs: dealerTypeDs?.DataList,
  });

  const handleSelectionChanged = (row: string[]) => {
    setSelectedItems(row);
  };

  const onCreate = async (data: Mst_Dealer) => {
    const { ...rest } = data;
    const resp = await api.Mst_Dealer_Create({
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

  const onDelete = async (id: string) => {
    const resp = await api.Mst_Dealer_Delete(id);
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

  const onModify = async (id: string, data: Mst_Dealer) => {
    const resp = await api.Mst_Dealer_Update(id, {
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

  const handleSavingRow = (e: any) => {
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        const data = e.changes[0].data!;

        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onModify(e.changes[0].key, e.changes[0].data!);
      }
    } else {
      e.promise = Promise.resolve();
      gridRef?.instance.cancelEditData();
    }
  };

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    if (["Dealercode", "DealerType", "ProvinceCode"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      e.editorOptions.value = true;
    } else if (["FlagActive", "FlagTCG"].includes(e.dataField!)) {
      e.editorOptions.value = "0";
    }
  };

  const handleEditRowChanges = () => {};

  const handleDeleteRows = async (ids: string[]) => {
    loadingControl.open();
    const resp = await api.Mst_Dealer_DeleteMultiple(ids);
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

  const handleEdit = (rowIndex: number) => {
    gridRef.current?.instance?.editRow(rowIndex);
  };

  const handleOnEditRow = (e: any) => {
    const { row, column } = e;
    handleEdit(row.rowIndex);
  };

  // toggle search panel
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  const handleAddNew = () => {
    gridRef.current?.instance?.addRow();
  };

  // SearchPanelComponent
  const flagFilterOptions = {
    searchEnables: true,
    valueExpr: "value",
    displayExpr: "text",
    item: [
      {
        value: "",
        text: t("All"),
      },
      {
        value: "1",
        text: "1",
      },
      {
        value: "0",
        text: "0",
      },
    ],
  };

  const searchConditions: IItemProps[] = [
    {
      caption: t("Dealer Code"),
      dataField: "DealerCode",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("Dealer Name"),
      dataField: "DealerName",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("Flag Auto LXX"),
      dataField: "FlagAutoLXX",
      editorType: "dxSelectBox",
      editorOptions: flagFilterOptions,
    },
    {
      dataField: "FlagAutoMapVIN",
      caption: t("Flag Auto Map VIN"),
      editorType: "dxSelectBox",
      editorOptions: flagFilterOptions,
    },
    {
      dataField: "FlagAutoSOAppr",
      caption: t("Flag Auto SO Appr"),
      editorType: "dxSelectBox",
      editorOptions: flagFilterOptions,
    },
    {
      caption: t("Flag Active"),
      dataField: "FlagActive",
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnables: true,
        valueExpr: "value",
        displayExpr: "text",
        item: [
          {
            value: "",
            text: t("All"),
          },
          {
            value: "1",
            text: "1",
          },
          {
            value: "0",
            text: "0",
          },
        ],
      },
    },
  ];

  const handleSearch = async (data: any) => {
    setSearchCondition({
      ...searchCondition,
      ...data,
    });
  };

  const loadingControl = useVisibilityControl({ defaultVisible: false });

  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <HeaderPart onAddNew={handleAddNew}></HeaderPart>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[200px]"}></div>
            <SearchPanelV2
              conditionFields={searchConditions}
              data={searchCondition}
              onSearch={handleSearch}
              storeKey={"dealer-search-panel"}
            ></SearchPanelV2>
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
                  isLoading={isLoading}
                  dataSource={data?.isSuccess ? data.DataList ?? [] : []}
                  columns={columns}
                  keyExpr={"DealerCode"}
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
                  storeKey={"dealer-management-columns"}
                />
                <DealerPopupView
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
