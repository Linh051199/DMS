import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderFormEdit } from "./header-form-edit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { useRef } from "react";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { CarList } from "./car-list";
import Form from "devextreme-react/form";
import { DataGrid, LoadPanel } from "devextreme-react";
import { toast } from "react-toastify";
import { QueryNames } from "@/pages/sales/delivery-order/delivery-order-common";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("DeliveryOrder");
  return (
    <div className="w-full flex items-center justify-between h-[55px] p-2">
      <div>{t("CreateNewDeliveryOrder")}</div>
      <div>
        {rightButtons.map((button, idx) => (
          <BButton key={idx} {...button} />
        ))}
      </div>
    </div>
  );
};
export const DeliveryOrderCreateNew = () => {
  const { t } = useI18n("DeliveryOrder");
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };
  const queryClient = useQueryClient();
  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      label: t("Save"),
      onClick: async (e: any) => {
        const validate = formRef.current?.instance.validate();
        if (!validate?.isValid) {
          return;
        }
        const formData = formRef.current?.instance.option("formData");
        const selectedCars = gridRef.current?.instance.getDataSource().items();
        if (!selectedCars) {
          toast.error(t("SelectedCarsIsRequired"));
        } else {
          const resp = await api.CarDeliveryOrder_CreateHQ(
            formData,
            selectedCars ?? []
          );
          if (resp.isSuccess) {
            toast.success(t("CreatedSuccessfully"));
            queryClient.removeQueries([QueryNames.DELIVERY_ORDER]);
            navigate(-1);
          } else {
            showError({
              debugInfo: resp.debugInfo,
              errorInfo: resp.errorInfo,
              message: resp.errorCode,
            });
          }
        }
      },
      className: "mx-1",
    },
    {
      label: t("Cancel"),
      className: "mx-1",
      type: "normal",
      onClick: handleCancel,
    },
  ];
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const { data: newCode, isLoading: isGettingNewCode } = useQuery({
    queryKey: [QueryNames.DELIVERY_ORDER, QueryNames.GET_DELIVERY_ORDER, "new"],
    queryFn: async () => {
      const resp = await api.CarDeliveryOrder_GetSeqForCarDeliveryOrder();
      if (resp.isSuccess) {
        return resp.Data;
      }
      showError({
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
        message: resp.errorCode,
      });
      return null;
    },
  });

  const { data: dealerList, isLoading: isGettingDealerList } = useQuery({
    queryKey: [
      QueryNames.DELIVERY_ORDER,
      QueryNames.GET_DELIVERY_ORDER,
      "dealer-list",
    ],
    queryFn: async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.isSuccess) {
        return resp.DataList;
      }
      showError({
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
        message: resp.errorCode,
      });
      return null;
    },
  });

  const gridRef = useRef<DataGrid>(null);
  const formRef = useRef<Form>(null);
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <LoadPanel
          visible={isGettingNewCode}
          showPane={true}
          showIndicator={true}
        />
        {!!newCode && !!dealerList && (
          <>
            <HeaderFormEdit
              code={newCode}
              ref={formRef}
              dealerList={dealerList}
            />
            <div className={"separator"} />
            <CarList ref={gridRef} />
          </>
        )}
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
