import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { DeleteMultipleConfirmationBox } from "@/packages/components/delete-confirm-box";
import { SubGrid } from "@/packages/components/sub-grid";
import { useVisibilityControl } from "@/packages/hooks";
import { Car_CarForLXX } from "@/packages/types";
import { ColumnOptions } from "@/types";
import { DataGrid, ScrollView, TextArea } from "devextreme-react";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { ForwardedRef, MutableRefObject, forwardRef, useState } from "react";
import { SearchCar } from "../search-car/search-car";

interface ICarListProps {}

export const CarList = forwardRef(
  ({}: ICarListProps, ref: ForwardedRef<DataGrid>) => {
    const { t } = useI18n("DeliveryOrder");
    const showSelectCarPopup = useVisibilityControl({ defaultVisible: false });
    const deleteButtonAvailable = useVisibilityControl({
      defaultVisible: false,
    });
    const deleteConfirmationVisible = useVisibilityControl({
      defaultVisible: false,
    });

    const [carList, setCarList] = useState<Car_CarForLXX[]>([]);

    //handle actions
    const handleStartAddCar = () => {
      showSelectCarPopup.open();
    };

    const handleDeleteCars = () => {
      deleteConfirmationVisible.open();
    };

    const handleSelectionChanged = (e: any) => {
      if (ref) {
        const gridRef = ref as MutableRefObject<DataGrid>;
        if (
          gridRef &&
          gridRef.current.instance.getSelectedRowKeys().length > 0
        ) {
          deleteButtonAvailable.open();
          return;
        }
      }
      deleteButtonAvailable.close();
    };

    const handleDeleteRows = (keys: any[]) => {
      keys.forEach((key) => {
        setCarList(
          carList.filter((car) => {
            return car.CarId !== key;
          })
        );
      });
    };

    const handleSelectedCars = (selectedCars: Car_CarForLXX[]) => {
      // filter out items in `selectedCars` and already in `carList`
      const newItems = selectedCars.filter((item) => {
        return !carList.some((selectedCar) => {
          return item.CarId === selectedCar.CarId;
        });
      });
      setCarList([...carList, ...(newItems ?? [])]);
    };

    const onDeleteConfirmed = () => {
      const gridRef = ref as MutableRefObject<DataGrid>;
      const selectedRows = gridRef.current?.instance.getSelectedRowKeys();
      if (selectedRows?.length > 0) {
        const remainingCarList = carList.filter((car) => {
          return !selectedRows.includes(car.CarId);
        });
        setCarList(remainingCarList);
      }
      deleteConfirmationVisible.close();
    };

    const onCancelDelete = () => {
      deleteConfirmationVisible.close();
    };

    // SubGrid
    const subGridToolbars: IToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return <div className={"font-bold"}>{t("CarList")}</div>;
        },
      },
      {
        location: "before",
        render: () => {
          return <BButton label={t("AddNewCar")} onClick={handleStartAddCar} />;
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <BButton
              visible={deleteButtonAvailable.visible}
              label={t("Delete")}
              onClick={handleDeleteCars}
            />
          );
        },
      },
      {
        location: "after",
        render: () => {
          return (
            <div className={""}>
              {t("TotalRow")}: {carList.length}
            </div>
          );
        },
      },
    ];

    const columns: ColumnOptions[] = [
      {
        dataField: "Remark",
        caption: t("Remark"),
        editorType: "dxTextBox",
        visible: true,
        width: 200,
        cellRender: (e: any) => {
          console.log("e:", e);
          const {
            component: gridInstance,
            value,
            column: { dataField },
            rowIndex,
            columnIndex,
          } = e;
          return (
            <div>
              <TextArea
                defaultValue={value}
                onValueChanged={(ev: any) => {
                  gridInstance.cellValue(rowIndex, dataField, ev.value);
                }}
              />
            </div>
          );
        },
      },
      {
        dataField: "MyIdxSeq",
        caption: t("STT"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        cellRender: ({ rowIndex }: any) => {
          return <div>{rowIndex + 1}</div>;
        },
      },
      {
        dataField: "CarId",
        caption: t("CarId"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "DealerCode",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DealerCode"),
      },
      {
        dataField: "OSOSOCode",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("OSOSOCode"),
      },
      {
        dataField: "OSODApprovedDate",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("OSODApprovedDate"),
      },
      {
        dataField: "VIN",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("VIN"),
      },
      {
        dataField: "ModelCode",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("ModelCode"),
      },
      {
        dataField: "ModelName",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("ModelName"),
      },
      {
        dataField: "SpecCode",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SpecCode"),
      },
      {
        dataField: "SpecDescription",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SpecDescription"),
      },
      {
        dataField: "VINColorCode",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("VINColorCode"),
      },
      {
        dataField: "VIN_Color_VN_Combined",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("VIN_Color_VN_Combined"),
      },
      {
        dataField: "STORAGECODECURRENT",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("STORAGECODECURRENT"),
      },
      {
        dataField: "UNITPRICEACTUAL",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("UNITPRICEACTUAL"),
      },
      {
        dataField: "PMPDAMOUNTTOTAL",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("PMPDAMOUNTTOTAL"),
      },
      {
        dataField: "Payment_Deposit_Percent",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Payment_Deposit_Percent"),
      },
      {
        dataField: "Grt_Percent",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Grt_Percent"),
      },
      {
        dataField: "Payment_Percent",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Payment_Percent"),
      },
      {
        dataField: "DutyCompleted_Percent",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DutyCompleted_Percent"),
      },
      {
        dataField: "DutyCompleted_Percent_AF",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DutyCompleted_Percent_AF"),
      },
      {
        dataField: "CarCancelRemark",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("CarCancelRemark"),
      },
      {
        dataField: "MapVINDate",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("MapVINDate"),
      },
      {
        dataField: "SSR_REARRANGESTATUS",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SSR_REARRANGESTATUS"),
      },
      {
        dataField: "OCNCode",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("OCNCode"),
      },
      {
        dataField: "CVEngineNo",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("CVEngineNo"),
      },
      {
        dataField: "DlrCtrNo",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DlrCtrNo"),
      },
    ];

    return (
      <ScrollView>
        <SubGrid
          ref={ref}
          keyExpr={"CarId"}
          toolbarItems={subGridToolbars}
          dataSource={carList}
          columns={columns}
          showActions={true}
          onSelectionChanged={handleSelectionChanged}
          storeKey={"delivery-order-create-car-list-columns"}
          onDeleteRows={handleDeleteRows}
        />
        <SearchCar
          visible={showSelectCarPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => showSelectCarPopup.close()}
          onSelectedCars={handleSelectedCars}
        />
        <DeleteMultipleConfirmationBox
          title={t("Delete")}
          message={t("DeleteMultipleConfirmationMessage")}
          onYesClick={onDeleteConfirmed}
          visible={deleteConfirmationVisible.visible}
          onNoClick={onCancelDelete}
        />
      </ScrollView>
    );
  }
);
