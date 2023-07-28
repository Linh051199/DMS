import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { useMemo, useRef, useState } from "react";
import { HeaderFormView } from "./header-form-view";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { LoadPanel } from "devextreme-react";
import { ViewList } from "./view-list";
import { match } from "ts-pattern";
import { toast } from "react-toastify";
import { useVisibilityControl } from "@packages/hooks";
import { ProgressPane } from "@/packages/components/progress-pane";
import { ProgressDone } from "@packages/components/progress-done";
import { QueryNames } from "../delivery-order-common";

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
export const DeliveryOrderDetailView = () => {
  const { t } = useI18n("DeliveryOrder");
  const params = useParams();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const clearQueriesCache = () => {
    queryClient.removeQueries([QueryNames.DELIVERY_ORDER]);
  };
  const { data, isLoading, remove } = useQuery({
    queryKey: [
      QueryNames.DELIVERY_ORDER,
      QueryNames.GET_DELIVERY_ORDER,
      params.code,
    ],
    queryFn: async () => {
      const resp = await api.CarDeliveryOrder_GetHQByDeliveryOrderNo(
        params.code!
      );
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
  const handleRejectP = async () => {
    const resp = await api.CarDeliveryOrder_Approve1RejectHQ(params.code!);
    if (!resp.isSuccess) {
      showError({
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
        message: resp.errorCode,
      });
    } else {
      toast.success(t("RejectedSuccessfully"));
      clearQueriesCache();
      navigate(-1);
    }
  };
  const handleRejectA1 = async () => {
    const resp = await api.CarDeliveryOrder_Approve2RejectHQ(params.code!);
    if (!resp.isSuccess) {
      showError({
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
        message: resp.errorCode,
      });
    } else {
      toast.success(t("RejectedSuccessfully"));
      clearQueriesCache();
      navigate(-1);
    }
  };
  const handleApproveP = async () => {
    const resp = await api.CarDeliveryOrder_Approve1ConfirmHQ(params.code!);
    if (!resp.isSuccess) {
      showError({
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
        message: resp.errorCode,
      });
    } else {
      toast.success(t("ApprovedSuccessfully"));
      clearQueriesCache();
      navigate(-1);
    }
  };
  const handleApproveA1 = async () => {
    const resp = await api.CarDeliveryOrder_Approve2ConfirmHQ(params.code!);
    if (!resp.isSuccess) {
      showError({
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
        message: resp.errorCode,
      });
    } else {
      toast.success(t("ApprovedSuccessfully"));
      clearQueriesCache();
      navigate(-1);
    }
  };

  const rightButtons = useMemo(() => {
    let buttons: BButtonProps[] = [];
    if (!!data && data.Lst_Car_DeliveryOrder.length > 0) {
      const order = data.Lst_Car_DeliveryOrder[0];
      const extendButtons: BButtonProps[] = match(order.DeliveryOrderStatus)
        .with("P", () => [
          {
            label: t("ApproveP"),
            className: "mx-1",
            onClick: handleApproveP,
          },
          {
            label: t("RejectP"),
            className: "mx-1",
            onClick: handleRejectP,
          },
        ])
        .with("A1", () => [
          {
            label: t("ApproveA1"),
            className: "mx-1",
            onClick: handleApproveA1,
          },
          {
            label: t("RejectA1"),
            className: "mx-1",
            onClick: handleRejectA1,
          },
        ])
        .otherwise(() => []);
      buttons = [...buttons, ...extendButtons];
    }

    buttons.push({
      label: t("Close"),
      className: "mx-1",
      type: "normal",
      onClick: handleCancel,
    });
    return buttons;
  }, [data]);
  const gridRef = useRef(null);

  const handleDeleteMultiple = async (keys: string[]) => {
    showDeleteAnimationControl.open();
    let isSuccess = true;
    let errors = [];
    for (const key of keys) {
      const resp = await api.CarDeliveryOrder_DeleteDetailHQ(
        data?.Lst_Car_DeliveryOrder?.[0]!,
        key
      );
      if (!resp.isSuccess) {
        isSuccess = false;
        errors.push(resp);
      }
    }
    if (isSuccess) {
      clearQueriesCache();
      showDeleteAnimationControl.close();
      showProgressDoneControl.open();
    } else {
      showDeleteAnimationControl.close();
      showError({
        debugInfo: errors[0].debugInfo,
        errorInfo: errors[0].errorInfo,
        message: errors[0].errorCode,
      });
    }
  };

  const checkData = async () => {
    const resp = await api.CarDeliveryOrder_GetHQByDeliveryOrderNo(
      params.code!
    );
    if (resp.isSuccess) {
      if (!resp.Data) {
        navigate(-1);
      }
    }
  };
  const queryClient = useQueryClient();

  const showDeleteAnimationControl = useVisibilityControl({
    defaultVisible: false,
  });
  const showProgressDoneControl = useVisibilityControl({
    defaultVisible: false,
  });
  const handleDeleteSingle = async (key: string) => {
    showDeleteAnimationControl.open();
    const resp = await api.CarDeliveryOrder_DeleteDetailHQ(
      data?.Lst_Car_DeliveryOrder?.[0]!,
      key
    );
    if (resp.isSuccess) {
      clearQueriesCache();
      showDeleteAnimationControl.close();
      showProgressDoneControl.open();
    } else {
      showDeleteAnimationControl.close();
      showError({
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
        message: resp.errorCode,
      });
    }
  };
  const onCloseProgressPane = () => {
    showDeleteAnimationControl.close();
  };
  const onCloseProgressDone = async () => {
    showProgressDoneControl.close();
    await checkData();
  };
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <LoadPanel
          visible={isLoading || showDeleteAnimationControl.visible}
          showPane={true}
          showIndicator={true}
        />
        {!!data && (
          <>
            <HeaderFormView data={data.Lst_Car_DeliveryOrder[0]} />
            <div className={"separator"} />
            <ViewList
              ref={gridRef}
              order={data.Lst_Car_DeliveryOrder[0]}
              cars={data?.Lst_Car_DeliveryOrderDetail ?? []}
              onDeleteMultiple={handleDeleteMultiple}
              onDeleteSingle={handleDeleteSingle}
              queryKey={["DeliveryOrderDetail", params.code!]}
            />
            <ProgressPane
              onHidding={onCloseProgressPane}
              visible={showDeleteAnimationControl.visible}
              text={t("InProgress")}
            />
            <ProgressDone
              visible={showProgressDoneControl.visible}
              text={t("ProgressDone")}
              onHidding={onCloseProgressDone}
            />
          </>
        )}
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
