import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { SubGrid } from "@/packages/components/sub-grid";
import { useVisibilityControl } from "@/packages/hooks";
import { CarDeliveryOrder, CarDeliveryOrderDetail } from "@/packages/types";
import { DeleteConfirmationBox } from "@/packages/ui/modal";
import { ColumnOptions } from "@/types";
import { DataGrid, ScrollView } from "devextreme-react";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { ForwardedRef, MutableRefObject, forwardRef, useRef } from "react";

interface ICarListProps {
  order: CarDeliveryOrder;
  cars: CarDeliveryOrderDetail[];
  onDeleteSingle: (key: string) => void;
  onDeleteMultiple: (keys: string[]) => void;
  queryKey: string[];
}

export const ViewDetailList = forwardRef(
  (
    { cars, order, onDeleteSingle, onDeleteMultiple, queryKey }: ICarListProps,
    ref: ForwardedRef<DataGrid>
  ) => {
    const { t } = useI18n("DeliveryOrder");
    const controlConfirmBoxVisible = useVisibilityControl({
      defaultVisible: false,
    });
    const confirmDeleteSingleVisible = useVisibilityControl({
      defaultVisible: false,
    });
    const deleteVisible = useVisibilityControl({ defaultVisible: false });
    const onCancelDelete = () => {
      controlConfirmBoxVisible.close();
    };

    const deletingItemRef = useRef<any>(null);

    const columns: ColumnOptions[] = [
      {
        dataField: "MyIdxSeq",
        caption: t("STT"),
        visible: true,
        cellRender: ({ rowIndex }: any) => {
          return <div>{rowIndex + 1}</div>;
        },
      },
      {
        dataField: "DeliveryOrderNo",
        visible: true,
        caption: t("DeliveryOrderNo"),
      },
      {
        dataField: "CarId",
        visible: true,
        caption: t("CarId"),
      },
      {
        dataField: "StorageCode",
        visible: true,
        caption: t("StorageCode"),
      },
      {
        dataField: "DeliveryVIN",
        visible: true,
        caption: t("DeliveryVIN"),
      },
      {
        dataField: "DeliveryStartDate",
        visible: true,
        caption: t("DeliveryStartDate"),
      },
      {
        dataField: "DeliveryOutDate",
        visible: true,
        caption: t("DeliveryOutDate"),
      },
      {
        dataField: "DeliveryExpectedDate",
        visible: true,
        caption: t("DeliveryExpectedDate"),
      },
      {
        dataField: "TransportMinutesExpectedDate",
        visible: true,
        caption: t("TransportMinutesExpectedDate"),
      },
      {
        dataField: "DeliveryEndDate",
        visible: true,
        caption: t("DeliveryEndDate"),
      },
      {
        dataField: "DeliveryRemark",
        visible: true,
        caption: t("DeliveryRemark"),
      },
      {
        dataField: "ConfirmRemark",
        visible: true,
        caption: t("ConfirmRemark"),
      },
      {
        dataField: "ConfirmStatus",
        visible: true,
        caption: t("ConfirmStatus"),
      },
      {
        dataField: "ConfirmDate",
        visible: true,
        caption: t("ConfirmDate"),
      },
      {
        dataField: "ConfirmBy",
        visible: true,
        caption: t("ConfirmBy"),
      },
      {
        dataField: "LogLUDateTime",
        visible: true,
        caption: t("LogLUDateTime"),
      },
      {
        dataField: "LogLUBy",
        visible: true,
        caption: t("LogLUBy"),
      },
      {
        dataField: "ModelCode",
        visible: true,
        caption: t("ModelCode"),
      },
      {
        dataField: "ColorCode",
        visible: true,
        caption: t("ColorCode"),
      },
      {
        dataField: "SpecCode",
        visible: true,
        caption: t("SpecCode"),
      },
      {
        dataField: "SpecDescription",
        visible: true,
        caption: t("SpecDescription"),
      },
      {
        dataField: "ActualSpec",
        visible: true,
        caption: t("ActualSpec"),
      },
      {
        dataField: "AC_SpecDescription",
        visible: true,
        caption: t("AC_SpecDescription"),
      },
      {
        dataField: "PMGBankGuaranteeNo",
        visible: true,
        caption: t("PMGBankGuaranteeNo"),
      },
      {
        dataField: "VINColorCode",
        visible: true,
        caption: t("VINColorCode"),
      },
      {
        dataField: "VIN_Color_VN_Combined",
        visible: true,
        caption: t("VIN_Color_VN_Combined"),
      },
      {
        dataField: "CVEngineNo",
        visible: true,
        caption: t("CVEngineNo"),
      },
      {
        dataField: "PaymentPercent",
        visible: true,
        caption: t("PaymentPercent"),
      },
      {
        dataField: "GuaranteePercent",
        visible: true,
        caption: t("GuaranteePercent"),
      },
      {
        dataField: "OSOSOCode",
        visible: true,
        caption: t("OSOSOCode"),
      },
      {
        dataField: "CVLocation",
        visible: true,
        caption: t("CVLocation"),
      },
      {
        dataField: "OSODCarDueDate",
        visible: true,
        caption: t("OSODCarDueDate"),
      },
      {
        dataField: "OCNCode",
        visible: true,
        caption: t("OCNCode"),
      },
      {
        dataField: "UnitPriceActual",
        visible: true,
        caption: t("UnitPriceActual"),
      },
      {
        dataField: "BankCode",
        visible: true,
        caption: t("BankCode"),
      },
      {
        dataField: "cdo_ApprovedDate2",
        visible: true,
        caption: t("cdo_ApprovedDate2"),
      },
    ];

    // Handle actions
    const handleDelete = () => {
      const gridRef = ref as MutableRefObject<DataGrid>;
      if (
        gridRef &&
        gridRef.current &&
        gridRef.current.instance.getSelectedRowKeys().length === 0
      ) {
        return;
      }
      controlConfirmBoxVisible.open();
    };

    const handleSelectionChanged = (e: any) => {
      const gridRef = ref as MutableRefObject<DataGrid>;
      if (
        gridRef &&
        gridRef.current &&
        gridRef.current?.instance.getSelectedRowsData().length > 0
      ) {
        if (!["R"].includes(order.DeliveryOrderStatus)) {
          deleteVisible.open();
        }
      } else {
        deleteVisible.close();
      }
    };

    const handleStartDelete = (key: string) => {
      // set value to input via ref
      localStorage.setItem("carDeliveryOrderDeleteItem", key);
      confirmDeleteSingleVisible.open();
    };

    const handleDeleteSingle = () => {
      // get selected item from input via ref
      const selectedItem = localStorage.getItem("carDeliveryOrderDeleteItem");
      if (selectedItem) {
        onDeleteSingle(selectedItem);
        localStorage.removeItem("carDeliveryOrderDeleteItem");
      }
    };

    const onCancelDeleteSingle = () => {
      confirmDeleteSingleVisible.close();
      localStorage.removeItem("carDeliveryOrderDeleteItem");
    };

    const onDelete = async () => {
      const gridRef = ref as MutableRefObject<DataGrid>;
      const keys = gridRef.current?.instance.getSelectedRowKeys();
      onDeleteMultiple(keys);
    };

    const subGridToolbars: IToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return <div className={"font-bold mr-2"}>{t("CarList")}</div>;
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <BButton
              label={t("Delete")}
              onClick={handleDelete}
              visible={deleteVisible.visible}
            />
          );
        },
      },
      {
        location: "after",
        render: () => {
          return (
            <div className={""}>
              {t("TotalRow")}: {cars.length}
            </div>
          );
        },
      },
    ];
    return (
      <ScrollView>
        <SubGrid
          ref={ref}
          toolbarItems={subGridToolbars}
          dataSource={cars}
          columns={columns}
          onSelectionChanged={handleSelectionChanged}
          onStartDelete={handleStartDelete}
          showActions={true}
          keyExpr={"CarId"}
        />
        <input type={"hidden"} ref={deletingItemRef} value={""} />
        <div>
          <DeleteConfirmationBox
            control={controlConfirmBoxVisible}
            title={t("Are you sure to delete selected records")}
            onYesClick={onDelete}
            onNoClick={onCancelDelete}
          />
        </div>
        <div>
          <DeleteConfirmationBox
            control={confirmDeleteSingleVisible}
            title={t("DeleteSingleConfirm")}
            onYesClick={handleDeleteSingle}
            onNoClick={onCancelDeleteSingle}
          />
        </div>
      </ScrollView>
    );
  }
);
