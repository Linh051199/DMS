import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Mst_Quota, Search_Mst_Quota } from "@/packages/types";
import { GridViewPopup } from "@/packages/ui/base-gridview";
import { selecteItemsAtom } from "@/pages/Mst_Quota/components/store";
import { useQuery } from "@tanstack/react-query";
import { IPopupOptions } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { useRef, useState } from "react";
import HeaderPart from "../components/header-part";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { PopupViewComponent } from "../components";
import { toast } from "react-toastify";
import { DataGrid, LoadPanel } from "devextreme-react";
import { useColumn } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-settings";
import { convertDate, flagEditorOptions } from "@/packages/common";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { IItemProps } from "devextreme-react/form";
export const Mst_QuotaPage = () => {
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom); // state lưu trữ trạng thái đóng mở của nav search
  const setSelectedItems = useSetAtom(selecteItemsAtom); // state lưu trữ thông tin của items khi mà click radio
  let gridRef: any = useRef<DataGrid | null>(null);
  const { t } = useI18n("Mst_Quota"); // file biên dịch
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom); // state lưu trữ lỗi khi call api
  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const [searchCondition, setSearchCondition] = useState<
    Partial<Search_Mst_Quota>
  >({
    // state deafult của search
    SOApprDateFrom: "",
    SOApprDateToInit: "",
    SOApprDateTo: "",
    DealerCode: "",
    FlagActive: FlagActiveEnum.All, // FlagActiveEnum.All = ""
    Ft_PageIndex: 0,
    Ft_PageSize: config.MAX_PAGE_ITEMS, // config.MAX_PAGE_ITEMS = 999999
    KeyWord: "",
  });
  const api = useClientgateApi(); // api
  const { data, isLoading, refetch } = useQuery(
    // call api search
    ["Mst_Quota", JSON.stringify(searchCondition)],
    () => {
      return api.Mst_Quota_Search({
        ...searchCondition,
      });
    }
  );
  console.log("🚀 ~ data:", data);

  const { data: listDealer } = useQuery(["Dealer"], () => {
    return api.Mst_Dealer_GetAllActive();
  });

  const { data: listSpec } = useQuery(["Spec"], () => {
    return api.Mst_CarSpec_GetAllActive();
  });

  const { data: listModel } = useQuery(["Model"], () => {
    return api.Mst_CarModel_GetAllActive();
  });

  // re-render api search 
  const handleSearch = async (data: any) => {
    setSearchCondition({
      ...searchCondition,
      ...data,
      SOApprDateFrom: data?.SOApprDateFrom
        ? convertDate(data?.SOApprDateFrom)
        : "",
      SOApprDateToInit: data?.SOApprDateToInit
        ? convertDate(data?.SOApprDateToInit)
        : "",
      SOApprDateTo: data?.SOApprDateTo ? convertDate(data?.SOApprDateTo) : "",
    });
    // await refetch();
  };

  // các cột của gridview
  const columns = useColumn({
    data: data?.DataList ?? [],
  });

  // hàm thêm cột ở trong trường hợp popup thì là mở popup
  const handleAddNew = () => {
    gridRef.current.instance.addRow();
  };

  // hàm chuyển đổi trang thái từ detail sang edit
  const handleSubmit = () => {
    gridRef.current?._instance?.saveEditData();
  };

  // đóng popup
  const handleCancel = () => {
    gridRef.current?.instance?.cancelEditData();
  };

  // hàm delete
  const onDelete = async (id: Partial<Mst_Quota>) => {
    const resp = await api.Mst_Quota_Delete(id);
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

  // call api tạo
  const onCreate = async (data: Partial<Mst_Quota>) => {
    const resp = await api.Mst_Quota_Create({
      ...data,
      SOApprDateFrom: data?.SOApprDateFrom
        ? convertDate(new Date(data?.SOApprDateFrom))
        : "",
      SOApprDateTo: data?.SOApprDateTo
        ? convertDate(new Date(data?.SOApprDateTo))
        : "",
      SOApprDateToInit: data?.SOApprDateToInit
        ? convertDate(new Date(data?.SOApprDateToInit))
        : "",
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

  // call api delete multiple
  const handleDeleteRow = async (a: any) => {
    const resp = await api.Mst_Quota_DeleteMultiple(a);
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

  // call api update
  const onModify = async (
    key: Partial<Mst_Quota>,
    data: Partial<Mst_Quota>
  ) => {
    const resp = await api.Mst_Quota_Update(key, {
      ...data,
      SOApprDateFrom: data?.SOApprDateFrom
        ? convertDate(new Date(data?.SOApprDateFrom))
        : "",
      SOApprDateToInit: data?.SOApprDateToInit
        ? convertDate(new Date(data?.SOApprDateToInit))
        : "",
      SOApprDateTo: data?.SOApprDateTo
        ? convertDate(new Date(data?.SOApprDateTo))
        : "",
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

  // Thực thi action thêm sửa xóa
  const handleSavingRow = (e: any) => {
    if (e.changes && e.changes.length > 0) {
      console.log(336, e.changes[0]);
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
    }
    e.cancel = true;
  };

  // setting popup ( title , button )
  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: "Mst_Quota",
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

  // setup form
  const formSettings = useFormSettings({
    columns,
    listDealer: listDealer?.DataList,
    listModel: listModel?.DataList,
    listSpec: listSpec?.DataList,
  });

  // popup detail
  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    if (e.dataField) {
      if (e.dataField === "SpecCodeCondition") {
        if (e.row?.data.ModelCondition) {
          e.editorOptions.readOnly = false;
        } else {
          e.editorOptions.readOnly = true;
        }
      }
      if (e.dataField === "SpecCodePromotion") {
        if (e.row?.data.ModelPromotion) {
          e.editorOptions.readOnly = false;
        } else {
          e.editorOptions.readOnly = true;
        }
      }
      if (e.dataField === "FlagActive") {
        e.editorOptions.value = e.row?.isNewRow
          ? 1
          : e.row?.data.FlagActive == 1;
      }

      if (
        [
          "DealerCode",
          "md_DealerName",
          "ModelCondition",
          "mcm1_ModelNameCondition",
          "SpecCodeCondition",
          "mcs1_SpecDescriptionCondition",
          "ModelPromotion",
          "mcm2_ModelNamePromotion",
          "SpecCodePromotion",
          "mcs2_SpecDescriptionPromotion",
        ].includes(e.dataField)
      ) {
        if (e.row?.isNewRow === true) {
          e.editorName = "dxSelectBox";
        }
        if (["ModelCondition", "ModelPromotion"].includes(e.dataField)) {
          e.editorOptions.dataSource = listModel?.DataList ?? [];
        }
        if (e.dataField === "DealerCode") {
          e.editorOptions.dataSource = listDealer?.DataList ?? [];
        }
      }

      if (
        [
          "mcm1_ModelNameCondition",
          "mcs1_SpecDescriptionCondition",
          "mcm2_ModelNamePromotion",
          "mcs2_SpecDescriptionPromotion",
          "md_DealerName",
        ].includes(e.dataField)
      ) {
        e.editorOptions.readOnly = true;
      }
      if (e.row?.isEditing === true && !e.row.isNewRow) {
        if (
          !["SOApprDateTo", "FlagActive", "QtyPromotion"].includes(e.dataField)
        ) {
          e.editorOptions.readOnly = true;
        }
      }
      // SpecCodePromotion , SpecCodeCondition
    }
  };
  // set các row khi check vào state lưu trữ
  const handleSelectionChanged = (rows: string[]) => {
    setSelectedItems(rows);
  };

  // action đóng mở nav search (show or not show)
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  // hàm sửa row ( mở popup )
  const handleEdit = (rowIndex: number) => {
    // console.log("rowIndex ", rowIndex);
    gridRef.current?.instance?.editRow(rowIndex);
  };

  const handleOnEditRow = (e: any) => {
    const { row, column } = e;
    handleEdit(row.rowIndex);
  };
  const handleEditRowChanges = () => {};

  const formItems: IItemProps[] = [
    {
      caption: t("DealerCode"),
      dataField: "DealerCode",
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: listDealer?.DataList,
        displayExpr: "DealerCode",
        valueExpr: "DealerCode",
        placeholder: t("Input"),
      },
    },
    {
      dataField: "SOApprDateFrom",
      caption: t("SOApprDateFrom"),
      editorType: "dxDateBox",
      editorOptions: {
        type: "date",
      },
      // format: "yyyy-MM-dd",
    },
    {
      dataField: "SOApprDateTo",
      caption: t("SOApprDateTo"),
      editorType: "dxDateBox",
      editorOptions: {
        type: "date",
      },
      // format: "yyyy-MM-dd",
    },
    {
      dataField: "SOApprDateToInit",
      caption: t("SOApprDateToInit"),
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

  return (
    <AdminContentLayout className={"Mst_Quota"}>
      {/* Header */}
      <AdminContentLayout.Slot name={"Header"}>
        {/* có tác dụng là tạo dữ liệu vào trong data và thực thi các action nhự import excel , export excel*/}
        <HeaderPart
          onAddNew={handleAddNew}
          searchCondition={searchCondition}
        ></HeaderPart>
      </AdminContentLayout.Slot>
      {/* Content */}
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          {/* Search */}
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[200px]"}>
              {/* Search Component */}
              <SearchPanelV2
                conditionFields={formItems}
                storeKey="Mst_Quota_Search"
                data={searchCondition}
                onSearch={handleSearch}
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
                {/* GridView */}
                <GridViewPopup
                  isLoading={isLoading} // props dùng để render
                  dataSource={data?.isSuccess ? data.DataList ?? [] : []} // dữ liệu của gridview lấy từ api
                  columns={columns} // các cột ở trong grid view
                  keyExpr={["QuotaCode", "DealerCode"]} // khóa chính
                  popupSettings={popupSettings} // popup editor
                  formSettings={formSettings} // các cột ở trong popup
                  onReady={(ref) => (gridRef = ref)} // gắn ref
                  allowSelection={true} //cho phép chọn row hay không
                  onSelectionChanged={handleSelectionChanged} // dùng để lấy hàng khi tích chọn checkbox
                  onSaveRow={handleSavingRow} // thực hiện các action thêm sửa xóa
                  onEditorPreparing={handleEditorPreparing} // thực hiện hành động trước khi show màn hình thêm sửa xóa
                  onEditRow={handleOnEditRow}
                  onDeleteRows={handleDeleteRow} // hàm này để xóa multiple (  )
                  onEditRowChanges={handleEditRowChanges}
                  toolbarItems={[
                    //  button search và action của nó
                    {
                      location: "before",
                      widget: "dxButton",
                      options: {
                        icon: "search",
                        onClick: handleToggleSearchPanel,
                      },
                    },
                  ]}
                  storeKey={"Mst_Quota_Column"} // key lưu trữ giá trị grid view trong localstorage
                />
                {/* popup detail*/}
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
